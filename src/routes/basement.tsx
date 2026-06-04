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

interface Post {
  id: number;
  title: string;
  excerpt: string;
  tag: string;
  content: string;
}

const POSTS: Post[] = [
  {
    id: 1,
    title: "ทฤษฎีตอนจบ Attack on Titan — เอเรนเลือกถูกแล้วจริงหรือ?",
    excerpt: "เจาะลึกแรงจูงใจของเอเรน เยเกอร์ และคำถามที่ยังไม่ได้รับคำตอบ...",
    tag: "ทฤษฎี",
    content:
      "เอเรนเลือกเดินบน 'เส้นทางที่หลีกเลี่ยงไม่ได้' หลังเห็นความทรงจำในอนาคต การปลดปล่อยไททันเป็นการบีบให้โลกรวมตัวต่อต้านพาราดี เพื่อให้เพื่อนของเขากลายเป็นวีรบุรุษ แต่คำถามคือ — ถ้าเขาเลือกไม่ทำ จะมีทางออกอื่นจริงไหม? ทฤษฎีบอกว่าพลังของยมีร์ผูกกับเจตจำนงของเอเรนทั้งหมด การทำลายล้าง 80% ของโลกอาจเป็นทางเลือกที่ 'น้อยที่สุด' ที่เขาเห็นในไทม์ไลน์ทั้งหมดคัฟ",
  },
  {
    id: 2,
    title: "ไทม์ไลน์ Demon Slayer ที่หลายคนมองข้าม",
    excerpt: "เรียงลำดับเหตุการณ์ตั้งแต่ยุคเฮอันถึงไทโช พร้อมจุดเชื่อมโยงสำคัญ...",
    tag: "วิเคราะห์",
    content:
      "เรื่องเริ่มยุคเฮอัน เมื่อมุซันได้รับการรักษาจากหมอจนกลายเป็นอมตะแต่กลัวแสงอาทิตย์ — ยอริอิจิ ผู้ใช้ลมหายใจพระอาทิตย์คนแรกเกือบฆ่ามุซันได้ แต่พลาด ทำให้มุซันแตกออกเป็น 7 ส่วนกลายเป็น 'จันทราตอนบน' ต้นกำเนิด เนซึโกะรอดเพราะเลือดมุซันที่ฉีดให้เธอ 'ผิดพลาด' ทำให้เธอเอาชนะความหิวโหยและเดินทะลุแสงแดดได้คัฟ",
  },
  {
    id: 3,
    title: "Jujutsu Kaisen — ความจริงเรื่องคำสาปและพลังลับของโกโจ",
    excerpt: "ทำไมโกโจถึงแข็งแกร่งขนาดนั้น และอะไรคือจุดอ่อนที่ซ่อนอยู่...",
    tag: "สปอยล์ยับ",
    content:
      "โกโจมีทั้ง 'Limitless' และ 'Six Eyes' พร้อมกัน — ครั้งแรกในรอบหลายร้อยปี Six Eyes ทำให้เขาใช้พลังโดยแทบไม่เปลืองพลังคำสาป ส่วน Limitless ทำให้ระยะห่างระหว่างเขากับคู่ต่อสู้ไม่มีวันถึง 0 จุดอ่อนคือ — ถ้าเจอคู่ต่อสู้ที่บิดเบือนกฎพื้นที่ระดับ Domain Expansion ได้สมบูรณ์กว่า โกโจอาจเสียเปรียบ ซึ่งคือสิ่งที่ซุคุนะใช้ในศึกสุดท้ายคัฟ",
  },
];

function BasementPage() {
  const [agreed, setAgreed] = useState(false);
  const [active, setActive] = useState<Post | null>(null);

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
            type="button"
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
          <button
            key={p.id}
            type="button"
            onClick={() => setActive(p)}
            className="text-left p-5 rounded-2xl bg-card border border-border hover:border-primary/60 hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <span className="text-xs px-2 py-1 rounded-full bg-destructive/20 text-destructive font-bold">
              {p.tag}
            </span>
            <h2 className="text-lg font-bold mt-3 text-foreground">{p.title}</h2>
            <p className="text-sm text-foreground/70 mt-2 line-clamp-3">{p.excerpt}</p>
            <div className="mt-4 text-xs text-primary font-bold">อ่านต่อ →</div>
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActive(null)}
        >
          <div
            className="bg-card border border-border rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-3">
              <span className="text-xs px-2 py-1 rounded-full bg-destructive/20 text-destructive font-bold">
                {active.tag}
              </span>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="ml-auto text-foreground/60 hover:text-foreground text-xl leading-none"
                aria-label="ปิด"
              >
                ✕
              </button>
            </div>
            <h2 className="text-2xl font-bold mt-3 text-foreground">{active.title}</h2>
            <p className="mt-4 text-foreground/85 leading-relaxed whitespace-pre-wrap">
              {active.content}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
