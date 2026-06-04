import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/basement")({
  head: () => ({
    meta: [
      { title: "ห้องใต้ดิน — โซนวิเคราะห์สปอยล์ | AnimeKuf" },
      { name: "description", content: "บทความและทฤษฎีเจาะลึกพล็อตอนิเมะแบบสปอยล์ยับ" },
    ],
  }),
  component: BasementPage,
});

const POSTS = [
  {
    id: 1,
    title: "ทฤษฎีตอนจบ Attack on Titan — เอเรนเลือกถูกแล้วจริงหรือ?",
    excerpt: "เจาะลึกแรงจูงใจของเอเรน เยเกอร์ และคำถามที่ยังไม่ได้รับคำตอบ...",
    tag: "ทฤษฎี",
  },
  {
    id: 2,
    title: "ไทม์ไลน์ Demon Slayer ที่หลายคนมองข้าม",
    excerpt: "เรียงลำดับเหตุการณ์ตั้งแต่ยุคเฮอันถึงไทโช พร้อมจุดเชื่อมโยงสำคัญ...",
    tag: "วิเคราะห์",
  },
  {
    id: 3,
    title: "Jujutsu Kaisen — ความจริงเรื่องคำสาปและพลังลับของโกโจ",
    excerpt: "ทำไมโกโจถึงแข็งแกร่งขนาดนั้น และอะไรคือจุดอ่อนที่ซ่อนอยู่...",
    tag: "สปอยล์ยับ",
  },
];

function BasementPage() {
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    return () => document.documentElement.classList.remove("dark");
  }, []);

  if (!agreed) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">🕯️</div>
        <h1 className="text-3xl font-bold text-foreground">ห้องใต้ดิน — The Basement</h1>
        <div className="mt-6 p-6 rounded-3xl bg-card border border-destructive/40">
          <div className="text-destructive font-bold text-lg">⚠️ คำเตือน: สปอยล์ยับๆ</div>
          <p className="mt-2 text-foreground/80">
            โซนนี้เต็มไปด้วยทฤษฎี การวิเคราะห์ และเนื้อหาสปอยล์เจาะลึก
            หากยังไม่ดูจบ อาจเสียอรรถรสในการรับชมได้
            น้องคัฟเตือนแล้วนะคัฟ!
          </p>
          <button
            onClick={() => setAgreed(true)}
            className="mt-5 px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-bold hover:opacity-90"
          >
            เข้าใจแล้ว พาฉันเข้าไป
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-foreground">🕯️ ห้องใต้ดิน</h1>
      <p className="text-foreground/70 mt-1">บทความวิเคราะห์ ทฤษฎี และสปอยล์เจาะลึก</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {POSTS.map((p) => (
          <article
            key={p.id}
            className="p-5 rounded-2xl bg-card border border-border hover:border-primary/60 transition-colors cursor-pointer"
          >
            <span className="text-xs px-2 py-1 rounded-full bg-destructive/20 text-destructive font-bold">
              {p.tag}
            </span>
            <h2 className="text-lg font-bold mt-3 text-foreground">{p.title}</h2>
            <p className="text-sm text-foreground/70 mt-2 line-clamp-3">{p.excerpt}</p>
            <div className="mt-4 text-xs text-primary font-bold">อ่านต่อ →</div>
          </article>
        ))}
      </div>
    </div>
  );
}
