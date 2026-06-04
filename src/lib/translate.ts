// Free MyMemory translation API, browser-side, with localStorage cache.
const CACHE_KEY = "kuf-tr-cache-v1";

type Cache = Record<string, string>;
function readCache(): Cache {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem(CACHE_KEY) || "{}"); } catch { return {}; }
}
function writeCache(c: Cache) {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify(c)); } catch {}
}

export async function translateToThai(text: string): Promise<string> {
  if (!text) return "";
  const trimmed = text.trim();
  if (trimmed.length === 0) return "";
  // Heuristic: if already contains Thai, return as is.
  if (/[\u0E00-\u0E7F]/.test(trimmed)) return trimmed;
  const cache = readCache();
  if (cache[trimmed]) return cache[trimmed];
  try {
    // MyMemory: ~500 char limit per request, split if needed
    const chunks = trimmed.match(/[\s\S]{1,450}/g) || [trimmed];
    const out: string[] = [];
    for (const ch of chunks) {
      const res = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(ch)}&langpair=en|th`
      );
      const j = await res.json();
      out.push(j?.responseData?.translatedText || ch);
    }
    const joined = out.join(" ");
    cache[trimmed] = joined;
    writeCache(cache);
    return joined;
  } catch {
    return trimmed;
  }
}
