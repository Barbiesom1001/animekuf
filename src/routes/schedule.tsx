import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimeCard } from "@/components/AnimeCard";
import { searchAnime, statusToThai, type Anime } from "@/lib/jikan";

export const Route = createFileRoute("/schedule")({
  head: () => ({
    meta: [
      { title: "ตารางฉาย & ช่องทางดู — AnimeKuf" },
      { name: "description", content: "ค้นหาอนิเมะทุกเรื่องบนโลก พร้อมสถานะออนแอร์และช่องทางดูถูกลิขสิทธิ์ในไทย" },
    ],
  }),
  component: SchedulePage,
});

function SchedulePage() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      if (!q.trim()) { setResults([]); return; }
      setLoading(true);
      searchAnime(q).then(setResults).catch(() => setResults([])).finally(() => setLoading(false));
    }, 500);
    return () => clearTimeout(t);
  }, [q]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="rounded-3xl bg-card border border-border p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-foreground">📅 ตารางฉาย & ช่องทางดู</h1>
        <p className="text-sm text-foreground/70 mt-1">
          พิมพ์ชื่ออนิเมะเรื่องไหนก็ได้บนโลก น้องคัฟจะดึงข้อมูลสดจาก MyAnimeList มาให้คัฟ
        </p>
        <div className="mt-4 relative">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="🔍 พิมพ์ชื่ออนิเมะ เช่น Naruto, ดาบพิฆาตอสูร..."
            className="w-full bg-input border border-border rounded-full px-5 py-3 text-foreground outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <div className="mt-6">
        {!q.trim() && (
          <div className="text-center py-16 text-foreground/60">
            เริ่มพิมพ์ชื่อเรื่องเพื่อค้นหาคัฟ ✨
          </div>
        )}
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[2/3] bg-muted rounded-2xl animate-pulse" />
            ))}
          </div>
        )}
        {!loading && results.length > 0 && (
          <>
            <div className="flex gap-2 mb-3 text-xs flex-wrap">
              <span className="px-2 py-1 rounded-full bg-green-200 text-green-900">● กำลังออนแอร์</span>
              <span className="px-2 py-1 rounded-full bg-gray-200 text-gray-900">● จบแล้ว</span>
              <span className="px-2 py-1 rounded-full bg-yellow-200 text-yellow-900">● กำลังจะมา</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {results.map((a) => (
                <div key={a.mal_id} className="relative">
                  <AnimeCard anime={a} />
                  <span className="absolute top-2 right-2 z-10 text-[10px] font-bold px-2 py-1 rounded-full bg-background/90 border border-border shadow">
                    {statusToThai(a.status)}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
        {!loading && q.trim() && results.length === 0 && (
          <div className="text-center py-16 text-foreground/60">ไม่เจอเรื่องที่ค้นหาเลยคัฟ ลองใหม่นะ 🥲</div>
        )}
      </div>
    </div>
  );
}
