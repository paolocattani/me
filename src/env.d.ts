/// <reference types="astro/client" />

interface ContactEmailMessage {
  from: { name: string; email: string };
  to: string;
  replyTo: { name: string; email: string };
  subject: string;
  text: string;
  html: string;
}

interface ContactEmailBinding {
  send(message: ContactEmailMessage): Promise<{ messageId: string }>;
}

interface Env {
  BLOG_BUCKET?: R2Bucket;
  EMAIL?: ContactEmailBinding;
}

interface R2ObjectBody {
  body: ReadableStream;
  bodyUsed: boolean;
  text(): Promise<string>;
}

interface R2Bucket {
  get(key: string): Promise<R2ObjectBody | null>;
  list(options?: {
    prefix?: string;
  }): Promise<{ objects: Array<{ key: string; uploaded?: Date }> }>;
}

type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

declare namespace App {
  interface Locals extends Runtime {}
}
