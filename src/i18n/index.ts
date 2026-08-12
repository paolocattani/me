import en from "./en.json";
import it from "./it.json";

const messages: Record<string, Record<string, unknown>> = { en, it };

const DEFAULT_LOCALE = "en";
const SUPPORTED_LOCALES = ["en", "it"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

/**
 * Returns whether the given string is a supported locale.
 */
export function isSupportedLocale(locale: string): locale is Locale {
  return SUPPORTED_LOCALES.includes(locale as Locale);
}

/**
 * Returns the locale to use (supported locale or default).
 */
export function resolveLocale(locale: string | undefined): Locale {
  if (locale && isSupportedLocale(locale)) return locale;
  return DEFAULT_LOCALE;
}

/**
 * Gets a nested value from an object by dot-separated key (e.g. "home.tagline").
 */
function getNested(obj: Record<string, unknown>, key: string): unknown {
  const parts = key.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (current === null || current === undefined) return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return current;
}

/**
 * Returns the raw value at key for the locale (string, array, or object). Use for nested data like experience.jobs.
 */
export function get<T = unknown>(locale: Locale, key: string): T | undefined {
  const localeMessages = messages[locale] ?? messages[DEFAULT_LOCALE];
  const value = getNested(
    localeMessages as Record<string, unknown>,
    key
  ) as T | undefined;
  if (value !== undefined) return value;
  return getNested(
    messages[DEFAULT_LOCALE] as Record<string, unknown>,
    key
  ) as T | undefined;
}

/**
 * Translates a key for the given locale. Supports dot notation (e.g. "home.tagline").
 * Replaces {year} in strings with the current year when passed in options.
 */
export function t(
  locale: Locale,
  key: string,
  options?: { year?: number }
): string {
  const localeMessages = messages[locale] ?? messages[DEFAULT_LOCALE];
  const value = getNested(
    localeMessages as Record<string, unknown>,
    key
  ) as string | undefined;
  if (value === undefined) {
    const fallback = getNested(
      messages[DEFAULT_LOCALE] as Record<string, unknown>,
      key
    ) as string | undefined;
    if (fallback === undefined) return key;
    return interpolate(fallback, options);
  }
  return interpolate(value, options);
}

function interpolate(
  str: string,
  options?: { year?: number }
): string {
  if (!options) return str;
  let result = str;
  if (options.year !== undefined) {
    result = result.replace(/\{year\}/g, String(options.year));
  }
  return result;
}

export { SUPPORTED_LOCALES, DEFAULT_LOCALE };
