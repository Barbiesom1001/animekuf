// Free MyMemory translation API, browser-side, with localStorage cache.
const CACHE_KEY = "kuf-tr-cache-v1";
const CACHE_KEY_EN = "kuf-tr-cache-en-v1";

type Cache = Record<string, string>;
function readCache(key: string): Cache {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem(key) || "{}"); } catch { return {}; }
}
function writeCache(key: string, c: Cache) {
  try { localStorage.setItem(key, JSON.stringify(c)); } catch {}
}

async function mymemory(text: string, pair: string): Promise<string> {
  const chunks = text.match(/[\s\S]{1,450}/g) || [text];
  const out: string[] = [];
  for (const ch of chunks) {
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(ch)}&langpair=${pair}`
    );
    const j = await res.json();
    out.push(j?.responseData?.translatedText || ch);
  }
  return out.join(" ");
}

export async function translateToThai(text: string): Promise<string> {
  if (!text) return "";
  const trimmed = text.trim();
  if (!trimmed) return "";
  if (/[\u0E00-\u0E7F]/.test(trimmed)) return trimmed;
  const cache = readCache(CACHE_KEY);
  if (cache[trimmed]) return cache[trimmed];
  try {
    const out = await mymemory(trimmed, "en|th");
    cache[trimmed] = out;
    writeCache(CACHE_KEY, cache);
    return out;
  } catch { return trimmed; }
}

export async function translateToEnglish(text: string): Promise<string> {
  if (!text) return "";
  const trimmed = text.trim();
  if (!trimmed) return "";
  // No Thai chars? assume already English/romaji
  if (!/[\u0E00-\u0E7F]/.test(trimmed)) return trimmed;
  const cache = readCache(CACHE_KEY_EN);
  if (cache[trimmed]) return cache[trimmed];
  try {
    const out = await mymemory(trimmed, "th|en");
    cache[trimmed] = out;
    writeCache(CACHE_KEY_EN, cache);
    return out;
  } catch { return trimmed; }
}
