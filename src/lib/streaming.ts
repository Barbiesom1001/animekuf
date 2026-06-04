export interface Streaming {
  name: string;
  url: string;
  color: string;
}

// Real Thai-licensed streaming platforms (อ้างอิงข้อมูล ณ ปี 2026)
const N = (q: string) => `https://www.netflix.com/search?q=${encodeURIComponent(q)}`;
const B = (q: string) => `https://www.bilibili.tv/en/search-result?q=${encodeURIComponent(q)}`;
const IQ = (q: string) => `https://www.iq.com/search?query=${encodeURIComponent(q)}`;
const T = (q: string) => `https://trueid.net/search?keyword=${encodeURIComponent(q)}`;
const P = (q: string) => `https://www.primevideo.com/search/?phrase=${encodeURIComponent(q)}`;
const C = (q: string) => `https://www.crunchyroll.com/search?q=${encodeURIComponent(q)}`;

const NETFLIX = (q: string): Streaming => ({ name: "Netflix", url: N(q), color: "#E50914" });
const BILI = (q: string): Streaming => ({ name: "Bilibili", url: B(q), color: "#00A1D6" });
const IQIYI = (q: string): Streaming => ({ name: "iQIYI", url: IQ(q), color: "#00BE06" });
const TRUEID = (q: string): Streaming => ({ name: "TrueID", url: T(q), color: "#FF0000" });
const PRIME = (q: string): Streaming => ({ name: "Prime Video", url: P(q), color: "#1399FF" });
const CRUNCHY = (q: string): Streaming => ({ name: "Crunchyroll", url: C(q), color: "#F47521" });

// MAL id → ช่องทางที่มีลิขสิทธิ์ในไทยจริง (อัปเดต 2026)
const MAP: Record<number, (t: string) => Streaming[]> = {
  // Demon Slayer
  38000: (t) => [NETFLIX(t), BILI(t), IQIYI(t)],
  // Attack on Titan
  16498: (t) => [NETFLIX(t), BILI(t)],
  // Jujutsu Kaisen
  40748: (t) => [NETFLIX(t), BILI(t)],
  // Frieren: Beyond Journey's End
  52991: (t) => [BILI(t), CRUNCHY(t)],
  // One Piece
  21: (t) => [NETFLIX(t), BILI(t), IQIYI(t)],
  // Spy x Family
  50265: (t) => [NETFLIX(t), BILI(t), CRUNCHY(t)],
  // Chainsaw Man
  44511: (t) => [BILI(t), PRIME(t)],
  // Hunter x Hunter (2011)
  11061: (t) => [NETFLIX(t), BILI(t)],
  // Naruto Shippuden
  1735: (t) => [NETFLIX(t), BILI(t)],
  // My Hero Academia
  31964: (t) => [NETFLIX(t), BILI(t), CRUNCHY(t)],
  // Tokyo Revengers
  42249: (t) => [BILI(t), IQIYI(t)],
};

const FALLBACK = (q: string): Streaming[] => [NETFLIX(q), BILI(q), CRUNCHY(q), IQIYI(q), TRUEID(q)];

export function getStreaming(malId: number, title: string): Streaming[] {
  if (MAP[malId]) return MAP[malId](title);
  return FALLBACK(title);
}
