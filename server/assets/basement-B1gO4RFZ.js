import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { s as searchAnime, t as translateToThai } from "./router-Cd4Agyoa.js";
import "@tanstack/react-query";
import "@tanstack/react-router";
const POSTS = [{
  id: 1,
  title: "Attack on Titan — ทำไมเอเรนถึงต้อง 'รัมเบิล' โลก",
  excerpt: "วิเคราะห์การตัดสินใจของเอเรน เยเกอร์ ในตอนจบ และทำไมมิกาสะถึงคือกุญแจสำคัญ",
  tag: "ทฤษฎี",
  content: "หลังเอเรนได้พลังไททันบรรพชนและเห็นความทรงจำตลอดเส้นเวลา เขามองเห็นว่าโลกภายนอกพร้อมจะกวาดล้างชาวเอลเดียให้สิ้นซาก ทางเลือกของเขาคือ 'รัมเบิล' ปลดปล่อยไททันยักษ์เหยียบโลก 80% เพื่อทำให้เพื่อนของเขากลายเป็นวีรบุรุษที่หยุดเขาได้\n\nจุดสำคัญที่หลายคนมองข้ามคือ — เอเรนรู้มาตลอดว่า 'มิกาสะ' จะเป็นคนปลิดชีพเขา เพราะเฉพาะคนที่รักเขาสุดหัวใจเท่านั้นที่จะทำลายพลังยมีร์ที่ผูกอยู่กับความเจ็บปวด 2,000 ปีของยมีร์ ฟริตซ์ได้ ตอนจบจึงไม่ใช่โศกนาฏกรรม แต่คือ 'พิธีปลดปล่อย' ที่เอเรนวางแผนไว้ตั้งแต่ต้นคัฟ",
  image: "https://cdn.myanimelist.net/images/anime/10/47347l.jpg"
}, {
  id: 2,
  title: "Demon Slayer — ความลับของลมหายใจพระอาทิตย์",
  excerpt: "ทำไมยอริอิจิถึงเกือบฆ่ามุซันสำเร็จ และเนซึโกะข้ามขีดจำกัดของอสูรได้อย่างไร",
  tag: "วิเคราะห์",
  content: "ยุคเฮอัน — ยอริอิจิ ทสึกิคุนิ คือมนุษย์คนเดียวที่ใช้ 'ลมหายใจพระอาทิตย์' ดั้งเดิม เขาเกือบฆ่ามุซันสำเร็จในการเจอกันครั้งแรก แต่ร่างของมุซันแยกออกเป็น 1,800 ชิ้นเพื่อหนีตาย\n\nลมหายใจอื่นทั้งหมด (น้ำ ไฟ สายฟ้า ลม หิน) คือ 'เวอร์ชันที่อ่อนลง' ของลมหายใจพระอาทิตย์ เพราะไม่มีใครเลียนแบบยอริอิจิได้\n\nส่วนเนซึโกะ — เธอเอาชนะแสงอาทิตย์ได้เพราะมุซันฉีดเลือดให้เธอในปริมาณที่ทำให้ 'วิวัฒนาการ' ไปอีกขั้น เป้าหมายของมุซันมาตลอด คือสร้างอสูรที่กินแดดได้ ดังนั้นการล่าเนซึโกะของเขาในเรื่อง คือการพยายามดูดกลืนผลงานที่ตัวเองทำพลาดให้เป็นของตัวเองคัฟ",
  image: "https://cdn.myanimelist.net/images/anime/1286/99889l.jpg"
}, {
  id: 3,
  title: "Jujutsu Kaisen — โกโจ vs ซุคุนะ ใครแข็งแกร่งกว่ากันจริง?",
  excerpt: "เจาะลึก Six Eyes, Limitless และเหตุผลที่โกโจพ่ายแพ้ในศึกชินจูกุ",
  tag: "สปอยล์ยับ",
  content: "โกโจ ซาโตรุ มีทั้ง 'Six Eyes' (ดวงตาหกแฉก) และเทคนิคสายเลือด 'Limitless' พร้อมกัน ซึ่งเกิดขึ้นครั้งแรกในรอบ 400 ปี Six Eyes ทำให้เขามองเห็นพลังคำสาประดับโมเลกุล จึงใช้ Limitless แบบประหยัดพลังได้\n\nในศึกชินจูกุ ซุคุนะที่สิงร่างเมงุมิ ใช้ Domain Expansion 'Malevolent Shrine' ที่ไม่ต้องสร้างกำแพง — ตัดทุกอย่างในรัศมี 200 เมตรอัตโนมัติ ขณะที่ Domain ของโกโจ 'Unlimited Void' ยัดข้อมูลอนันต์เข้าสมองคู่ต่อสู้\n\nจุดแพ้ของโกโจคือ — เขาประมาท 'เทคนิคสายเลือดสิบเงา' ของเมงุมิที่ซุคุนะปลดล็อกได้สมบูรณ์ ทำให้โดน 'มะฮึรากะ' โจมตี และครั้งที่สองที่ใช้ไม่ได้ผล สุดท้ายโกโจถูกตัดครึ่งในสภาพยิ้มคัฟ",
  image: "https://cdn.myanimelist.net/images/anime/1171/109222l.jpg"
}, {
  id: 4,
  title: "Frieren — ทำไม 'ฮิมเมล' ถึงเปลี่ยนใจฟรีเร็นได้",
  excerpt: "วิเคราะห์ธีมเวลา ความตาย และความรักที่ไม่ทันได้พูดออกมา",
  tag: "วิเคราะห์",
  content: "ฟรีเร็น เป็นเอลฟ์อายุพันกว่าปี สำหรับเธอ 10 ปีของการผจญภัยกับฮิมเมลคือแค่ 'หนึ่งฤดูใบไม้ผลิ' เธอไม่ได้พยายามจดจำเพื่อนมนุษย์ เพราะรู้ว่าพวกเขาจะตายเร็ว\n\nแต่หลังฮิมเมลตาย ฟรีเร็นเริ่มออกเดินทางอีกครั้งเพื่อ 'ทำความเข้าใจมนุษย์' — สิ่งที่เธอไม่เคยสนใจในตอนที่ฮิมเมลยังอยู่ ทุกตอนคือบทเรียนเล็กๆ ที่ฮิมเมลเคยพยายามสอน แต่เธอเพิ่งเก็ตหลังเขาจากไป\n\nธีมแท้จริงของเรื่องคือ — 'ความเสียดายไม่ใช่ความเจ็บ แต่คือแรงผลักให้เราเข้าใจคนที่จากไป' ตอนจบที่ฟรีเร็นยอมรับว่า 'อยากเจอฮิมเมลอีกครั้ง' คือจุดที่เธอกลายเป็นมนุษย์มากกว่าเอลฟ์คัฟ",
  image: "https://cdn.myanimelist.net/images/anime/1015/138006l.jpg"
}];
function BasementPage() {
  const [agreed, setAgreed] = useState(false);
  const [active, setActive] = useState(null);
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [picked, setPicked] = useState(null);
  const [pickedSyn, setPickedSyn] = useState("");
  useEffect(() => {
    document.documentElement.classList.add("dark");
    return () => document.documentElement.classList.remove("dark");
  }, []);
  async function runSearch(e) {
    e?.preventDefault();
    if (!query.trim()) return;
    setSearching(true);
    setPicked(null);
    try {
      const r = await searchAnime(query);
      setResults(r.slice(0, 8));
    } catch {
      setResults([]);
    } finally {
      setSearching(false);
    }
  }
  async function pickAnime(a) {
    setPicked(a);
    setPickedSyn("");
    if (a.synopsis) {
      try {
        const th = await translateToThai(a.synopsis);
        setPickedSyn(th);
      } catch {
        setPickedSyn(a.synopsis);
      }
    }
  }
  if (!agreed) {
    return /* @__PURE__ */ jsxs("div", { className: "max-w-2xl mx-auto px-4 py-16 text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "text-6xl mb-4", children: "🕯️" }),
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-foreground", children: "ห้องใต้ดิน — The Basement" }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 p-6 rounded-3xl bg-card border border-destructive/40", children: [
        /* @__PURE__ */ jsx("div", { className: "text-destructive font-bold text-lg", children: "⚠️ คำเตือน: สปอยล์ยับๆ" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-foreground/80", children: "โซนนี้เต็มไปด้วยทฤษฎี การวิเคราะห์ และเนื้อหาสปอยล์เจาะลึก หากยังไม่ดูจบ อาจเสียอรรถรสในการรับชมได้ น้องคัฟเตือนแล้วนะคัฟ!" }),
        /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setAgreed(true), className: "mt-5 px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-bold hover:opacity-90", children: "เข้าใจแล้ว พาฉันเข้าไป" })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-4 py-10", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between flex-wrap gap-4 mb-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("h1", { className: "text-4xl font-bold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("span", { children: "🕯️" }),
          " ห้องใต้ดิน"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-foreground/70 mt-2", children: "บทความวิเคราะห์ ทฤษฎี และสปอยล์เจาะลึกแบบจัดเต็ม" })
      ] }),
      /* @__PURE__ */ jsx("span", { className: "text-xs px-3 py-1.5 rounded-full bg-destructive/20 text-destructive font-bold border border-destructive/30", children: "🚫 SPOILER ZONE" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-5", children: POSTS.map((p) => /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setActive(p), className: "group text-left rounded-3xl bg-gradient-to-br from-card to-card/60 border border-border hover:border-primary/60 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "h-44 relative overflow-hidden bg-muted", children: [
        /* @__PURE__ */ jsx("img", { src: p.image, alt: p.title, loading: "lazy", className: "absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" }),
        /* @__PURE__ */ jsx("span", { className: "absolute top-3 left-3 text-[10px] px-2.5 py-1 rounded-full bg-background/80 backdrop-blur text-destructive font-bold border border-destructive/40", children: p.tag })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-5", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-base font-bold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2", children: p.title }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-foreground/65 mt-2 line-clamp-3 leading-relaxed", children: p.excerpt }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 text-xs text-primary font-bold flex items-center gap-1 group-hover:gap-2 transition-all", children: [
          "อ่านสปอยล์เต็ม ",
          /* @__PURE__ */ jsx("span", { children: "→" })
        ] })
      ] })
    ] }, p.id)) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-10 rounded-3xl border border-border bg-card/70 p-5", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-foreground flex items-center gap-2", children: "🔎 ค้นหาสปอยล์อนิเมะที่อยากอ่าน" }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-foreground/60 mt-1", children: "ดึงข้อมูลจาก MyAnimeList (Jikan API) แล้วลิงก์ต่อไปยังแหล่งวิเคราะห์ที่น่าเชื่อถือ — Fandom Wiki, Wikipedia, Reddit" }),
      /* @__PURE__ */ jsxs("form", { onSubmit: runSearch, className: "mt-4 flex gap-2", children: [
        /* @__PURE__ */ jsx("input", { value: query, onChange: (e) => setQuery(e.target.value), placeholder: "พิมพ์ชื่อเรื่อง (ไทย/อังกฤษ) เช่น Frieren, ดาบพิฆาตอสูร", className: "flex-1 bg-input rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring text-foreground" }),
        /* @__PURE__ */ jsx("button", { type: "submit", disabled: searching, className: "px-5 rounded-full bg-primary text-primary-foreground text-sm font-bold disabled:opacity-50", children: searching ? "กำลังหา..." : "ค้นหา" })
      ] }),
      results.length > 0 && !picked && /* @__PURE__ */ jsx("div", { className: "mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3", children: results.map((a) => /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => pickAnime(a), className: "text-left rounded-2xl overflow-hidden border border-border hover:border-primary/60 bg-background/40 transition", children: [
        /* @__PURE__ */ jsx("div", { className: "aspect-[2/3] bg-muted overflow-hidden", children: /* @__PURE__ */ jsx("img", { src: a.images.jpg.image_url, alt: a.title, loading: "lazy", className: "w-full h-full object-cover" }) }),
        /* @__PURE__ */ jsxs("div", { className: "p-2", children: [
          /* @__PURE__ */ jsx("div", { className: "text-xs font-bold text-foreground line-clamp-2", children: a.title }),
          /* @__PURE__ */ jsxs("div", { className: "text-[10px] text-foreground/60 mt-0.5", children: [
            "⭐ ",
            a.score ?? "-",
            " • ",
            a.episodes ?? "?",
            " ตอน"
          ] })
        ] })
      ] }, a.mal_id)) }),
      picked && /* @__PURE__ */ jsxs("div", { className: "mt-4 p-4 rounded-2xl bg-background/40 border border-border", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
          /* @__PURE__ */ jsx("img", { src: picked.images.jpg.image_url, alt: picked.title, className: "w-24 sm:w-32 rounded-xl object-cover" }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-2", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-foreground", children: picked.title }),
              /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setPicked(null), className: "text-foreground/60 hover:text-foreground text-sm", "aria-label": "ปิด", children: "✕" })
            ] }),
            picked.title_english && /* @__PURE__ */ jsx("div", { className: "text-xs text-foreground/60", children: picked.title_english }),
            /* @__PURE__ */ jsxs("div", { className: "text-xs text-foreground/70 mt-1", children: [
              "⭐ ",
              picked.score ?? "-",
              " • ",
              picked.episodes ?? "?",
              " ตอน"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-foreground/85 mt-3 leading-relaxed whitespace-pre-wrap", children: pickedSyn || (picked.synopsis ? "น้องคัฟกำลังแปล..." : "ไม่มีเรื่องย่อ") })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
          /* @__PURE__ */ jsx("div", { className: "text-xs font-bold text-foreground/80 mb-2", children: "📚 แหล่งสปอยล์/วิเคราะห์ที่น่าเชื่อถือ" }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: [{
            label: "MyAnimeList",
            url: `https://myanimelist.net/anime/${picked.mal_id}`
          }, {
            label: "Fandom Wiki",
            url: `https://www.google.com/search?q=${encodeURIComponent((picked.title_english || picked.title) + " fandom wiki spoilers")}`
          }, {
            label: "Wikipedia",
            url: `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(picked.title_english || picked.title)}`
          }, {
            label: "Reddit r/anime",
            url: `https://www.reddit.com/r/anime/search/?q=${encodeURIComponent((picked.title_english || picked.title) + " ending explained")}&restrict_sr=1`
          }, {
            label: "AniList",
            url: `https://anilist.co/search/anime?search=${encodeURIComponent(picked.title_english || picked.title)}`
          }].map((s) => /* @__PURE__ */ jsxs("a", { href: s.url, target: "_blank", rel: "noreferrer", className: "px-3 py-1.5 rounded-full text-xs font-semibold bg-primary/80 text-primary-foreground hover:bg-primary", children: [
            "🔗 ",
            s.label
          ] }, s.label)) })
        ] })
      ] })
    ] }),
    active && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4", onClick: () => setActive(null), children: /* @__PURE__ */ jsxs("div", { className: "relative bg-card border border-border rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto", onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setActive(null), "aria-label": "ปิด", className: "absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-background/90 border border-border text-foreground/70 hover:text-foreground hover:bg-background flex items-center justify-center text-lg shadow", children: "✕" }),
      /* @__PURE__ */ jsxs("div", { className: "h-56 relative overflow-hidden rounded-t-3xl bg-muted", children: [
        /* @__PURE__ */ jsx("img", { src: active.image, alt: active.title, className: "absolute inset-0 w-full h-full object-cover" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" }),
        /* @__PURE__ */ jsx("span", { className: "absolute bottom-3 left-4 text-xs px-2 py-1 rounded-full bg-destructive/30 text-destructive font-bold border border-destructive/40 backdrop-blur", children: active.tag })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-foreground", children: active.title }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-foreground/85 leading-relaxed whitespace-pre-wrap", children: active.content })
      ] })
    ] }) })
  ] });
}
export {
  BasementPage as component
};
