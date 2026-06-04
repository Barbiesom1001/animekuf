// Jikan v4 (MyAnimeList) — public, no key required
const BASE = "https://api.jikan.moe/v4";

export interface Anime {
  mal_id: number;
  title: string;
  title_english?: string | null;
  title_japanese?: string | null;
  images: { jpg: { large_image_url: string; image_url: string } };
  score?: number | null;
  episodes?: number | null;
  status?: string | null;
  synopsis?: string | null;
  genres?: { name: string }[];
  year?: number | null;
}

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Jikan error " + res.status);
  return res.json();
}

export async function getTopAnime(): Promise<Anime[]> {
  const j = await fetchJSON<{ data: Anime[] }>(`${BASE}/top/anime?limit=24`);
  return j.data;
}

export async function getByGenre(genreId: number): Promise<Anime[]> {
  // -1 = curated Hunter/Gate & Dungeon list (ประตูมิติ + ฮันเตอร์เคลียร์ดันเจี้ยน)
  if (genreId === -1) {
    const ids = [52299, 34902, 37976, 37430, 48569, 31043, 36474, 39468];
    const results = await Promise.all(
      ids.map((id) =>
        fetchJSON<{ data: Anime }>(`${BASE}/anime/${id}`)
          .then((r) => r.data)
          .catch(() => null)
      )
    );
    return results.filter((a): a is Anime => !!a);
  }
  const j = await fetchJSON<{ data: Anime[] }>(
    `${BASE}/anime?genres=${genreId}&order_by=score&sort=desc&limit=24&sfw=true`
  );
  return j.data;
}

// Common Thai → English anime title aliases (Jikan only indexes EN/JP titles)
const THAI_ALIAS: Record<string, string> = {
  "ดาบพิฆาตอสูร": "Demon Slayer",
  "ผ่าพิภพไททัน": "Attack on Titan",
  "วันพีช": "One Piece",
  "นารูโตะ": "Naruto",
  "มหาเวทย์ผนึกมาร": "Jujutsu Kaisen",
  "นักเตะแข้งสายฟ้า": "Inazuma Eleven",
  "ฮันเตอร์": "Hunter x Hunter",
  "โคนัน": "Detective Conan",
  "ดราก้อนบอล": "Dragon Ball",
  "บลีช": "Bleach",
  "วันพันช์แมน": "One Punch Man",
  "สไปร์ทแฟมิลี่": "Spy x Family",
  "สไปแฟมิลี่": "Spy x Family",
  "ไชเก็ง": "Chainsaw Man",
  "เชนซอว์แมน": "Chainsaw Man",
  "เทพมรณะ": "Bleach",
  "ฟรีเร็น": "Frieren",
  "มหาศึกคนชนเทพ": "Record of Ragnarok",
  "เจ้าหญิงผู้น่ารังเกียจ": "Bibliophile Princess",
  "อนิเมะ": "anime",
};

function thaiToEnglishQuery(q: string): string {
  let out = q;
  for (const [th, en] of Object.entries(THAI_ALIAS)) {
    if (out.includes(th)) out = out.replace(th, en);
  }
  return out;
}

export async function searchAnime(q: string): Promise<Anime[]> {
  if (!q.trim()) return [];
  let query = q.trim();
  // Jikan can't search Thai script — translate / alias first
  if (/[\u0E00-\u0E7F]/.test(query)) {
    query = thaiToEnglishQuery(query);
    if (/[\u0E00-\u0E7F]/.test(query)) {
      try {
        const { translateToEnglish } = await import("./translate");
        query = await translateToEnglish(query);
      } catch {}
    }
  }
  const j = await fetchJSON<{ data: Anime[] }>(
    `${BASE}/anime?q=${encodeURIComponent(query)}&limit=20&sfw=true`
  );
  return j.data;
}

export const GENRES = [
  { id: 1, name: "แอคชั่น", emoji: "⚔️" },
  { id: 2, name: "ผจญภัย", emoji: "🗺️" },
  { id: 62, name: "ต่างโลก", emoji: "🌌" },
  { id: 4, name: "ตลก", emoji: "😆" },
  { id: 30, name: "กีฬา", emoji: "⚽" },
  { id: 7, name: "สืบสวน", emoji: "🔍" },
  { id: 10, name: "แฟนตาซี", emoji: "🪄" },
  { id: 22, name: "โรแมนซ์", emoji: "💖" },
  { id: 24, name: "ไซไฟ", emoji: "🚀" },
  { id: -1, name: "เกต/ดันเจี้ยน", emoji: "🌀" },
] as const;

export function statusToThai(s?: string | null): string {
  if (!s) return "ไม่ทราบสถานะ";
  const m: Record<string, string> = {
    "Currently Airing": "กำลังออนแอร์",
    "Finished Airing": "จบแล้ว",
    "Not yet aired": "กำลังจะมา",
  };
  return m[s] ?? s;
}
