const KEY = "marketplace-recent-searches";

export function getRecentSearches(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed.filter((v) => typeof v === "string") as string[]) : [];
  } catch {
    return [];
  }
}

export function addRecentSearch(term: string): void {
  if (typeof window === "undefined") return;
  const value = term.trim();
  if (!value) return;
  const next = [value, ...getRecentSearches().filter((t) => t !== value)].slice(0, 6);
  window.localStorage.setItem(KEY, JSON.stringify(next));
}

export function clearRecentSearches(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
}
