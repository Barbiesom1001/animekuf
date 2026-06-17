import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { A as AnimeCard } from "./AnimeCard-CTqDFtrj.js";
import { s as searchAnime, a as statusToThai } from "./router-Cd4Agyoa.js";
import "@tanstack/react-query";
import "@tanstack/react-router";
function SchedulePage() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => {
      if (!q.trim()) {
        setResults([]);
        return;
      }
      setLoading(true);
      searchAnime(q).then(setResults).catch(() => setResults([])).finally(() => setLoading(false));
    }, 500);
    return () => clearTimeout(t);
  }, [q]);
  return /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "rounded-3xl bg-card border border-border p-6 shadow-sm", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-foreground", children: "📅 ตารางฉาย & ช่องทางดู" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-foreground/70 mt-1", children: "พิมพ์ชื่ออนิเมะเรื่องไหนก็ได้บนโลก น้องคัฟจะดึงข้อมูลสดจาก MyAnimeList มาให้คัฟ" }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 relative", children: /* @__PURE__ */ jsx("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "🔍 พิมพ์ชื่ออนิเมะ เช่น Naruto, ดาบพิฆาตอสูร...", className: "w-full bg-input border border-border rounded-full px-5 py-3 text-foreground outline-none focus:ring-2 focus:ring-ring" }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
      !q.trim() && /* @__PURE__ */ jsx("div", { className: "text-center py-16 text-foreground/60", children: "เริ่มพิมพ์ชื่อเรื่องเพื่อค้นหาคัฟ ✨" }),
      loading && /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4", children: Array.from({
        length: 8
      }).map((_, i) => /* @__PURE__ */ jsx("div", { className: "aspect-[2/3] bg-muted rounded-2xl animate-pulse" }, i)) }),
      !loading && results.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mb-3 text-xs flex-wrap", children: [
          /* @__PURE__ */ jsx("span", { className: "px-2 py-1 rounded-full bg-green-200 text-green-900", children: "● กำลังออนแอร์" }),
          /* @__PURE__ */ jsx("span", { className: "px-2 py-1 rounded-full bg-gray-200 text-gray-900", children: "● จบแล้ว" }),
          /* @__PURE__ */ jsx("span", { className: "px-2 py-1 rounded-full bg-yellow-200 text-yellow-900", children: "● กำลังจะมา" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4", children: results.map((a) => /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(AnimeCard, { anime: a }),
          /* @__PURE__ */ jsx("span", { className: "absolute top-2 right-2 z-10 text-[10px] font-bold px-2 py-1 rounded-full bg-background/90 border border-border shadow", children: statusToThai(a.status) })
        ] }, a.mal_id)) })
      ] }),
      !loading && q.trim() && results.length === 0 && /* @__PURE__ */ jsx("div", { className: "text-center py-16 text-foreground/60", children: "ไม่เจอเรื่องที่ค้นหาเลยคัฟ ลองใหม่นะ 🥲" })
    ] })
  ] });
}
export {
  SchedulePage as component
};
