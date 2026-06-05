import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimeCard } from "@/components/AnimeCard";
import { GENRES, getByGenre, getTopAnime, type Anime } from "@/lib/jikan";
import kufHero from "@/assets/kuf-hero.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AnimeKuf — ศูนย์รวมอนิเมะกับน้องคัฟ" },
      { name: "description", content: "แพลตฟอร์มแนะนำอนิเมะภาษาไทย โดยน้องคัฟ พร้อมเรื่องย่อแปลไทยอัตโนมัติ" },
      { property: "og:title", content: "AnimeKuf — ศูนย์รวมอนิเมะกับน้องคัฟ" },
      { property: "og:description", content: "ค้นหา แนะนำ และเช็คช่องทางดูอนิเมะถูกลิขสิทธิ์ในไทย" },
    ],
  }),
  component: Index,
});

function Index() {
  const [genre, setGenre] = useState<number | null>(null);
  const [list, setList] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    (genre == null ? getTopAnime() : getByGenre(genre))
      .then((d) => alive && setList(d))
      .catch(() => alive && setList([]))
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, [genre]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <section className="rounded-3xl bg-card/55 backdrop-blur-md p-6 sm:p-10 border border-white/40 shadow-lg">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img src={kufHero.url} alt="น้องคัฟ" className="w-40 sm:w-52 h-auto object-contain drop-shadow-lg" />
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug text-foreground">
              โฮ่ยยย! ยินดีต้อนรับสู่ <span className="text-primary">AnimeKuf</span>!
              น้องคัฟมาแล้วคัฟป๊มมม
            </h1>
            <p className="mt-3 text-base text-foreground/80">
              วันนี้คุณอยากหาอนิเมะแนวไหน หรืออยากให้น้องคัฟช่วยแนะนำเรื่องอะไร บอกมาได้เลยนะคัฟ!
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-bold mb-3 text-foreground">เลือกแนวที่ชอบ</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 gap-3">
          <button
            onClick={() => setGenre(null)}
            className={`p-3 rounded-2xl border text-center transition-all ${
              genre == null
                ? "bg-primary text-primary-foreground border-primary shadow"
                : "bg-card text-foreground border-border hover:-translate-y-0.5"
            }`}
          >
            <div className="text-xl">⭐</div>
            <div className="text-xs font-bold mt-1">ยอดนิยม</div>
          </button>
          {GENRES.map((g) => (
            <button
              key={g.id}
              onClick={() => setGenre(g.id)}
              className={`p-3 rounded-2xl border text-center transition-all ${
                genre === g.id
                  ? "bg-primary text-primary-foreground border-primary shadow"
                  : "bg-card text-foreground border-border hover:-translate-y-0.5"
              }`}
            >
              <div className="text-xl">{g.emoji}</div>
              <div className="text-xs font-bold mt-1">{g.name}</div>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-bold mb-3 text-foreground">
          {genre == null ? "🔥 อนิเมะยอดนิยมตลอดกาล" : "การ์ดประจำแนว"}
        </h2>
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="aspect-[2/3] bg-muted rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {list.map((a) => (
              <AnimeCard key={a.mal_id} anime={a} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
