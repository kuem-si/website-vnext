export type Locale = "en" | "sl";

export const DEFAULT_LOCALE: Locale = "en";
export const SUPPORTED_LOCALES: Locale[] = ["en", "sl"];

function stripBase(pathname: string): string {
  const baseUrl = import.meta.env.BASE_URL ?? "/";
  const base = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  if (base && base !== "/" && pathname.startsWith(base)) {
    return pathname.slice(base.length) || "/";
  }
  return pathname;
}

export function getLocaleFromPath(pathname: string): Locale {
  const cleanPath = stripBase(pathname).replace(/^\/+/, "");
  const firstSegment = cleanPath.split("/")[0];
  return firstSegment === "sl" ? "sl" : DEFAULT_LOCALE;
}

export function stripLocalePrefix(pathname: string): string {
  const normalizedBase = stripBase(pathname);
  const normalized = normalizedBase.startsWith("/") ? normalizedBase : `/${normalizedBase}`;
  if (normalized === "/sl") {
    return "/";
  }
  if (normalized.startsWith("/sl/")) {
    return normalized.slice(3) || "/";
  }
  return normalized;
}

export function withLocale(pathname: string, locale: Locale): string {
  const route = stripLocalePrefix(pathname);
  if (locale === DEFAULT_LOCALE) {
    return route;
  }
  return route === "/" ? "/sl" : `/sl${route}`;
}

export function toggleLocale(pathname: string): string {
  const currentLocale = getLocaleFromPath(pathname);
  return withLocale(pathname, currentLocale === "en" ? "sl" : "en");
}
