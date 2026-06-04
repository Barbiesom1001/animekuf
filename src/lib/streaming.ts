export interface Streaming {
  name: string;
  url: string;
  color: string;
}

// Manual mapping table for Thai-licensed streaming per MAL id.
const MAP: Record<number, Streaming[]> = {
  // Demon Slayer
  38000: [
    { name: "Netflix", url: "https://www.netflix.com/search?q=demon+slayer", color: "#E50914" },
    { name: "iQIYI", url: "https://www.iq.com/search?query=demon+slayer", color: "#00BE06" },
  ],
  // Attack on Titan
  16498: [
    { name: "Netflix", url: "https://www.netflix.com/search?q=attack+on+titan", color: "#E50914" },
    { name: "TrueID", url: "https://trueid.net/search?q=attack+on+titan", color: "#FF0000" },
  ],
};

const FALLBACK: Streaming[] = [
  { name: "Netflix", url: "https://www.netflix.com/search?q=", color: "#E50914" },
  { name: "iQIYI", url: "https://www.iq.com/search?query=", color: "#00BE06" },
  { name: "TrueID", url: "https://trueid.net/search?q=", color: "#FF0000" },
  { name: "Prime Video", url: "https://www.primevideo.com/search/?phrase=", color: "#1399FF" },
  { name: "Bilibili", url: "https://www.bilibili.tv/en/search-result?q=", color: "#00A1D6" },
];

export function getStreaming(malId: number, title: string): Streaming[] {
  if (MAP[malId]) return MAP[malId];
  return FALLBACK.map((s) => ({ ...s, url: s.url + encodeURIComponent(title) }));
}
