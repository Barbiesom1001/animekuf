export interface Streaming {
  name: string;
  url: string;
  color: string;
}

// ช่องทางดูถูกลิขสิทธิ์ในไทย (อัปเดตปัจจุบัน) — ไม่รวม Crunchyroll เพราะไม่เปิดให้บริการในไทย
const N = (q: string) => `https://www.netflix.com/search?q=${encodeURIComponent(q)}`;
const B = (q: string) => `https://www.bilibili.tv/en/search-result?q=${encodeURIComponent(q)}`;
const IQ = (q: string) => `https://www.iq.com/search?query=${encodeURIComponent(q)}`;
const T = (q: string) => `https://trueid.net/search?keyword=${encodeURIComponent(q)}`;
const P = (q: string) => `https://www.primevideo.com/search/?phrase=${encodeURIComponent(q)}`;
const D = (q: string) => `https://www.disneyplus.com/search?q=${encodeURIComponent(q)}`;

const NETFLIX = (q: string): Streaming => ({ name: "Netflix", url: N(q), color: "#E50914" });
const BILI = (q: string): Streaming => ({ name: "Bilibili", url: B(q), color: "#00A1D6" });
const IQIYI = (q: string): Streaming => ({ name: "iQIYI", url: IQ(q), color: "#00BE06" });
const TRUEID = (q: string): Streaming => ({ name: "TrueID", url: T(q), color: "#FF0000" });
const PRIME = (q: string): Streaming => ({ name: "Prime Video", url: P(q), color: "#1399FF" });
const DISNEY = (q: string): Streaming => ({ name: "Disney+ Hotstar", url: D(q), color: "#0E47BB" });

// MAL id → ช่องทางที่มีลิขสิทธิ์ในไทยจริง (real-time)
const MAP: Record<number, (t: string) => Streaming[]> = {
  38000: (t) => [NETFLIX(t), BILI(t), IQIYI(t)],        // Demon Slayer
  16498: (t) => [NETFLIX(t), BILI(t)],                  // Attack on Titan
  40748: (t) => [NETFLIX(t), BILI(t)],                  // Jujutsu Kaisen
  52991: (t) => [BILI(t), IQIYI(t)],                    // Frieren
  21:    (t) => [NETFLIX(t), BILI(t), IQIYI(t)],        // One Piece
  50265: (t) => [NETFLIX(t), BILI(t)],                  // Spy x Family
  44511: (t) => [BILI(t), PRIME(t)],                    // Chainsaw Man
  11061: (t) => [NETFLIX(t), BILI(t)],                  // Hunter x Hunter (2011)
  1735:  (t) => [NETFLIX(t), BILI(t)],                  // Naruto Shippuden
  31964: (t) => [NETFLIX(t), BILI(t)],                  // My Hero Academia
  42249: (t) => [BILI(t), IQIYI(t)],                    // Tokyo Revengers
  52299: (t) => [NETFLIX(t), BILI(t)],                  // Solo Leveling
  37430: (t) => [NETFLIX(t), BILI(t)],                  // That Time I Got Reincarnated as a Slime
  39535: (t) => [NETFLIX(t), BILI(t)],                  // Mob Psycho 100 II
  9253:  (t) => [NETFLIX(t), BILI(t)],                  // Steins;Gate
  53516: (t) => [BILI(t), IQIYI(t)],                    // JJK S2
  48583: (t) => [NETFLIX(t), BILI(t)],                  // Re:Zero S2
};

const FALLBACK = (q: string): Streaming[] => [NETFLIX(q), BILI(q), IQIYI(q), PRIME(q), TRUEID(q), DISNEY(q)];

export function getStreaming(malId: number, title: string): Streaming[] {
  if (MAP[malId]) return MAP[malId](title);
  return FALLBACK(title);
}
