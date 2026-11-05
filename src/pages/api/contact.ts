import type { APIRoute } from "astro";

export const prerender = false;

const NAME_MAX_LENGTH = 120;
const EMAIL_MAX_LENGTH = 254;
const MESSAGE_MAX_LENGTH = 5000;
const BODY_MAX_BYTES = 20_000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONTACT_RECIPIENT = "paolocattani0501@gmail.com";
const CONTACT_SENDER = {
  name: "Paolo Cattani",
  email: "contact@paolocattani.me",
} as const;

interface ContactRequest {
  readonly name: string;
  readonly email: string;
  readonly message: string;
  readonly website: string;
}

interface ContactResponse {
  readonly ok: boolean;
  readonly error?: "invalid" | "unavailable";
}

/**
 * Sends a validated contact message to the site inbox.
 */
export const POST: APIRoute = async ({ request, locals }) => {
  const payload = await readContactRequest(request);
  if (payload && payload.website !== "") {
    return jsonResponse({ ok: true }, 200);
  }
  if (!payload || !isValidContact(payload)) {
    return jsonResponse({ ok: false, error: "invalid" }, 400);
  }
  const email = locals.runtime?.env?.EMAIL;
  if (!email) {
    return jsonResponse({ ok: false, error: "unavailable" }, 503);
  }
  try {
    await email.send(buildContactMessage(payload));
    return jsonResponse({ ok: true }, 200);
  } catch (error: unknown) {
    console.error("Contact email failed", readErrorCode(error));
    return jsonResponse({ ok: false, error: "unavailable" }, 503);
  }
};

function jsonResponse(body: ContactResponse, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

async function readContactRequest(request: Request): Promise<ContactRequest | null> {
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(contentLength) && contentLength > BODY_MAX_BYTES) return null;
  const body: unknown = await request.json().catch(() => null);
  if (!isRecord(body)) return null;
  if (typeof body.name !== "string" || typeof body.email !== "string") return null;
  if (typeof body.message !== "string") return null;
  const website = typeof body.website === "string" ? body.website.trim() : "";
  return {
    name: body.name.trim(),
    email: body.email.trim(),
    message: body.message.trim(),
    website,
  };
}

function isValidContact(payload: ContactRequest): boolean {
  if (payload.name.length < 1 || payload.name.length > NAME_MAX_LENGTH) return false;
  if (payload.email.length < 3 || payload.email.length > EMAIL_MAX_LENGTH) return false;
  if (!EMAIL_PATTERN.test(payload.email)) return false;
  if (payload.message.length < 1 || payload.message.length > MESSAGE_MAX_LENGTH) return false;
  return payload.website.length <= EMAIL_MAX_LENGTH;
}

function buildContactMessage(payload: ContactRequest): ContactEmailMessage {
  const name = singleLine(payload.name);
  const email = singleLine(payload.email);
  const text = [`Nome: ${name}`, `Email: ${email}`, "", payload.message].join("\n");
  return {
    from: CONTACT_SENDER,
    to: CONTACT_RECIPIENT,
    replyTo: { name, email },
    subject: `Sito: ${name}`,
    text,
    html: `<p><strong>${escapeHtml(name)}</strong><br>${escapeHtml(email)}</p><p>${escapeHtml(payload.message).replaceAll("\n", "<br>")}</p>`,
  };
}

function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function readErrorCode(error: unknown): string {
  if (typeof error === "object" && error !== null && "code" in error) {
    return String(error.code);
  }
  return "unknown";
}
