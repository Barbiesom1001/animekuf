import { useEffect, useState } from "react";
import type { Anime } from "@/lib/jikan";
import { statusToThai } from "@/lib/jikan";
import { translateToThai } from "@/lib/translate";
import { getStreaming } from "@/lib/streaming";

export function AnimeCard({ anime }: { anime: Anime }) {
  const [open, setOpen] = useState(false);
  const [thaiSyn, setThaiSyn] = useState<string>("");
  const [showOriginal, setShowOriginal] = useState(false);

  useEffect(() => {
    if (open && !thaiSyn && anime.synopsis) {
      translateToThai(anime.synopsis).then(setThaiSyn);
    }
  }, [open, thaiSyn, anime.synopsis]);

  const streams = getStreaming(anime.mal_id, anime.title);

  return (
    <div className="group relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="block w-full text-left rounded-2xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
      >
        <div className="aspect-[2/3] relative overflow-hidden bg-muted">
          <img
            src={anime.images.jpg.large_image_url}
            alt={anime.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {anime.score != null && (
            <span className="absolute top-2 left-2 bg-background/90 text-foreground text-xs font-bold px-2 py-1 rounded-full shadow">
              ⭐ {anime.score.toFixed(1)}
            </span>
          )}
        </div>
        <div className="p-3">
          <h3 className="text-sm font-bold text-foreground line-clamp-2 min-h-[2.5rem]">
            {anime.title}
          </h3>
          <div className="mt-2 flex flex-wrap gap-1">
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-kuf-cream text-foreground/80 border border-border">
              คำบรรยายไทย
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-kuf-pink text-foreground/80 border border-border">
              พากย์ไทย
            </span>
          </div>
        </div>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-card text-card-foreground rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-border"
            onClick={(e) => e.stopPropagation()}
          >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="ปิด"
            className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-background/90 border border-border text-foreground/70 hover:text-foreground hover:bg-background flex items-center justify-center text-lg shadow"
          >
            ✕
          </button>
          <div className="relative grid sm:grid-cols-[200px_1fr] gap-4 p-5">
              <img
                src={anime.images.jpg.large_image_url}
                alt={anime.title}
                className="rounded-2xl w-full aspect-[2/3] object-cover"
              />
              <div>
                <h2 className="text-xl font-bold">{anime.title}</h2>
                {anime.title_english && (
                  <p className="text-sm text-muted-foreground">{anime.title_english}</p>
                )}
                <div className="flex flex-wrap gap-2 mt-3 text-xs">
                  <span className="px-2 py-1 rounded-full bg-kuf-sky">⭐ {anime.score ?? "-"}</span>
                  <span className="px-2 py-1 rounded-full bg-kuf-peach">🎬 {anime.episodes ?? "?"} ตอน</span>
                  <span className="px-2 py-1 rounded-full bg-kuf-pink">{statusToThai(anime.status)}</span>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm">เรื่องย่อ</h3>
                    {anime.synopsis && (
                      <button
                        className="text-xs text-primary hover:underline"
                        onClick={() => setShowOriginal((v) => !v)}
                      >
                        {showOriginal ? "ดูภาษาไทย" : "ดูต้นฉบับ EN"}
                      </button>
                    )}
                  </div>
                  <p className="text-sm mt-1 text-foreground/85 leading-relaxed">
                    {showOriginal
                      ? anime.synopsis || "ไม่มีเรื่องย่อ"
                      : thaiSyn || (anime.synopsis ? "น้องคัฟกำลังแปลให้คัฟ..." : "ไม่มีเรื่องย่อ")}
                  </p>
                </div>
                <div className="mt-4">
                  <h3 className="font-bold text-sm">ดูถูกลิขสิทธิ์ที่</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {streams.map((s) => (
                      <a
                        key={s.name}
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-full text-xs font-semibold text-white shadow hover:opacity-90"
                        style={{ background: s.color }}
                      >
                        ▶ {s.name}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="mt-4 p-3 rounded-2xl bg-kuf-cream border border-border">
                  <div className="text-xs font-bold mb-1">💖 กล่องน้องคัฟชวนดู</div>
                  <p className="text-xs text-foreground/80">
                    เรื่องนี้น้องคัฟดูแล้วฟินมากกก ลองเปิดตอนแรกดูก่อนก็ได้นะคัฟ
                    รับรองว่าติดงอมแงมแน่นอนคัฟ!
                  </p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="mt-4 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-bold"
                >
                  ปิดหน้าต่าง
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
