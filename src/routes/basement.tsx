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
  image: string;
}

const POSTS: Post[] = [
  {
    id: 1,
    title: "Attack on Titan — ทำไมเอเรนถึงต้อง 'รัมเบิล' โลก",
    excerpt: "วิเคราะห์การตัดสินใจของเอเรน เยเกอร์ ในตอนจบ และทำไมมิกาสะถึงคือกุญแจสำคัญ",
    tag: "ทฤษฎี",
    content:
      "หลังเอเรนได้พลังไททันบรรพชนและเห็นความทรงจำตลอดเส้นเวลา เขามองเห็นว่าโลกภายนอกพร้อมจะกวาดล้างชาวเอลเดียให้สิ้นซาก ทางเลือกของเขาคือ 'รัมเบิล' ปลดปล่อยไททันยักษ์เหยียบโลก 80% เพื่อทำให้เพื่อนของเขากลายเป็นวีรบุรุษที่หยุดเขาได้\n\nจุดสำคัญที่หลายคนมองข้ามคือ — เอเรนรู้มาตลอดว่า 'มิกาสะ' จะเป็นคนปลิดชีพเขา เพราะเฉพาะคนที่รักเขาสุดหัวใจเท่านั้นที่จะทำลายพลังยมีร์ที่ผูกอยู่กับความเจ็บปวด 2,000 ปีของยมีร์ ฟริตซ์ได้ ตอนจบจึงไม่ใช่โศกนาฏกรรม แต่คือ 'พิธีปลดปล่อย' ที่เอเรนวางแผนไว้ตั้งแต่ต้นคัฟ",
    image: "https://cdn.myanimelist.net/images/anime/10/47347l.jpg",
  },
  {
    id: 2,
    title: "Demon Slayer — ความลับของลมหายใจพระอาทิตย์",
    excerpt: "ทำไมยอริอิจิถึงเกือบฆ่ามุซันสำเร็จ และเนซึโกะข้ามขีดจำกัดของอสูรได้อย่างไร",
    tag: "วิเคราะห์",
    content:
      "ยุคเฮอัน — ยอริอิจิ ทสึกิคุนิ คือมนุษย์คนเดียวที่ใช้ 'ลมหายใจพระอาทิตย์' ดั้งเดิม เขาเกือบฆ่ามุซันสำเร็จในการเจอกันครั้งแรก แต่ร่างของมุซันแยกออกเป็น 1,800 ชิ้นเพื่อหนีตาย\n\nลมหายใจอื่นทั้งหมด (น้ำ ไฟ สายฟ้า ลม หิน) คือ 'เวอร์ชันที่อ่อนลง' ของลมหายใจพระอาทิตย์ เพราะไม่มีใครเลียนแบบยอริอิจิได้\n\nส่วนเนซึโกะ — เธอเอาชนะแสงอาทิตย์ได้เพราะมุซันฉีดเลือดให้เธอในปริมาณที่ทำให้ 'วิวัฒนาการ' ไปอีกขั้น เป้าหมายของมุซันมาตลอด คือสร้างอสูรที่กินแดดได้ ดังนั้นการล่าเนซึโกะของเขาในเรื่อง คือการพยายามดูดกลืนผลงานที่ตัวเองทำพลาดให้เป็นของตัวเองคัฟ",
    image: "https://cdn.myanimelist.net/images/anime/1286/99889l.jpg",
  },
  {
    id: 3,
    title: "Jujutsu Kaisen — โกโจ vs ซุคุนะ ใครแข็งแกร่งกว่ากันจริง?",
    excerpt: "เจาะลึก Six Eyes, Limitless และเหตุผลที่โกโจพ่ายแพ้ในศึกชินจูกุ",
    tag: "สปอยล์ยับ",
    content:
      "โกโจ ซาโตรุ มีทั้ง 'Six Eyes' (ดวงตาหกแฉก) และเทคนิคสายเลือด 'Limitless' พร้อมกัน ซึ่งเกิดขึ้นครั้งแรกในรอบ 400 ปี Six Eyes ทำให้เขามองเห็นพลังคำสาประดับโมเลกุล จึงใช้ Limitless แบบประหยัดพลังได้\n\nในศึกชินจูกุ ซุคุนะที่สิงร่างเมงุมิ ใช้ Domain Expansion 'Malevolent Shrine' ที่ไม่ต้องสร้างกำแพง — ตัดทุกอย่างในรัศมี 200 เมตรอัตโนมัติ ขณะที่ Domain ของโกโจ 'Unlimited Void' ยัดข้อมูลอนันต์เข้าสมองคู่ต่อสู้\n\nจุดแพ้ของโกโจคือ — เขาประมาท 'เทคนิคสายเลือดสิบเงา' ของเมงุมิที่ซุคุนะปลดล็อกได้สมบูรณ์ ทำให้โดน 'มะฮึรากะ' โจมตี และครั้งที่สองที่ใช้ไม่ได้ผล สุดท้ายโกโจถูกตัดครึ่งในสภาพยิ้มคัฟ",
    image: "https://cdn.myanimelist.net/images/anime/1171/109222l.jpg",
  },
  {
    id: 4,
    title: "Frieren — ทำไม 'ฮิมเมล' ถึงเปลี่ยนใจฟรีเร็นได้",
    excerpt: "วิเคราะห์ธีมเวลา ความตาย และความรักที่ไม่ทันได้พูดออกมา",
    tag: "วิเคราะห์",
    content:
      "ฟรีเร็น เป็นเอลฟ์อายุพันกว่าปี สำหรับเธอ 10 ปีของการผจญภัยกับฮิมเมลคือแค่ 'หนึ่งฤดูใบไม้ผลิ' เธอไม่ได้พยายามจดจำเพื่อนมนุษย์ เพราะรู้ว่าพวกเขาจะตายเร็ว\n\nแต่หลังฮิมเมลตาย ฟรีเร็นเริ่มออกเดินทางอีกครั้งเพื่อ 'ทำความเข้าใจมนุษย์' — สิ่งที่เธอไม่เคยสนใจในตอนที่ฮิมเมลยังอยู่ ทุกตอนคือบทเรียนเล็กๆ ที่ฮิมเมลเคยพยายามสอน แต่เธอเพิ่งเก็ตหลังเขาจากไป\n\nธีมแท้จริงของเรื่องคือ — 'ความเสียดายไม่ใช่ความเจ็บ แต่คือแรงผลักให้เราเข้าใจคนที่จากไป' ตอนจบที่ฟรีเร็นยอมรับว่า 'อยากเจอฮิมเมลอีกครั้ง' คือจุดที่เธอกลายเป็นมนุษย์มากกว่าเอลฟ์คัฟ",
    image: "https://cdn.myanimelist.net/images/anime/1015/138006l.jpg",
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
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground flex items-center gap-2">
            <span>🕯️</span> ห้องใต้ดิน
          </h1>
          <p className="text-foreground/70 mt-2">บทความวิเคราะห์ ทฤษฎี และสปอยล์เจาะลึกแบบจัดเต็ม</p>
        </div>
        <span className="text-xs px-3 py-1.5 rounded-full bg-destructive/20 text-destructive font-bold border border-destructive/30">
          🚫 SPOILER ZONE
        </span>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {POSTS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setActive(p)}
            className="group text-left rounded-3xl bg-gradient-to-br from-card to-card/60 border border-border hover:border-primary/60 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
          >
            <div className="h-44 relative overflow-hidden bg-muted">
              <img
                src={p.image}
                alt={p.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
              <span className="absolute top-3 left-3 text-[10px] px-2.5 py-1 rounded-full bg-background/80 backdrop-blur text-destructive font-bold border border-destructive/40">
                {p.tag}
              </span>
            </div>
            <div className="p-5">
              <h2 className="text-base font-bold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
                {p.title}
              </h2>
              <p className="text-sm text-foreground/65 mt-2 line-clamp-3 leading-relaxed">{p.excerpt}</p>
              <div className="mt-4 text-xs text-primary font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                อ่านสปอยล์เต็ม <span>→</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActive(null)}
        >
          <div
            className="relative bg-card border border-border rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="ปิด"
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-background/90 border border-border text-foreground/70 hover:text-foreground hover:bg-background flex items-center justify-center text-lg shadow"
            >
              ✕
            </button>
            <div className="h-56 relative overflow-hidden rounded-t-3xl bg-muted">
              <img src={active.image} alt={active.title} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
              <span className="absolute bottom-3 left-4 text-xs px-2 py-1 rounded-full bg-destructive/30 text-destructive font-bold border border-destructive/40 backdrop-blur">
                {active.tag}
              </span>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-foreground">{active.title}</h2>
              <p className="mt-4 text-foreground/85 leading-relaxed whitespace-pre-wrap">
                {active.content}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
