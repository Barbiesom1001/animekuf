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
  const j = await fetchJSON<{ data: Anime[] }>(
    `${BASE}/anime?genres=${genreId}&order_by=score&sort=desc&limit=24&sfw=true`
  );
  return j.data;
}

export async function searchAnime(q: string): Promise<Anime[]> {
  if (!q.trim()) return [];
  const j = await fetchJSON<{ data: Anime[] }>(
    `${BASE}/anime?q=${encodeURIComponent(q)}&limit=20&sfw=true`
  );
  return j.data;
}

export const GENRES = [
  { id: 1, name: "แอคชั่น", emoji: "⚔️" },
  { id: 62, name: "ต่างโลก", emoji: "🌌" },
  { id: 4, name: "ตลก", emoji: "😆" },
  { id: 30, name: "กีฬา", emoji: "⚽" },
  { id: 7, name: "สืบสวน", emoji: "🔍" },
  { id: 10, name: "แฟนตาซี", emoji: "🪄" },
  { id: 22, name: "โรแมนซ์", emoji: "💖" },
  { id: 24, name: "ไซไฟ", emoji: "🚀" },
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
