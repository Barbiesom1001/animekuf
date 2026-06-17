import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { A as AnimeCard } from "./AnimeCard-CTqDFtrj.js";
import { g as getTopAnime, b as getByGenre, G as GENRES } from "./router-Cd4Agyoa.js";
import "@tanstack/react-query";
import "@tanstack/react-router";
const url = "/__l5e/assets-v1/26c4cd0b-8d2d-4d16-9b7d-fc133eaf219c/kuf-hero.png";
const kufHero = {
  url
};
function Index() {
  const [genre, setGenre] = useState(null);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let alive = true;
    setLoading(true);
    (genre == null ? getTopAnime() : getByGenre(genre)).then((d) => alive && setList(d)).catch(() => alive && setList([])).finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [genre]);
  return /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsx("section", { className: "rounded-3xl bg-card/55 backdrop-blur-md p-6 sm:p-10 border border-white/40 shadow-lg", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center gap-6", children: [
      /* @__PURE__ */ jsx("img", { src: kufHero.url, alt: "น้องคัฟ", className: "w-40 sm:w-52 h-auto object-contain drop-shadow-lg" }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 text-center sm:text-left", children: [
        /* @__PURE__ */ jsxs("h1", { className: "text-2xl sm:text-3xl md:text-4xl font-bold leading-snug text-foreground", children: [
          "โฮ่ยยย! ยินดีต้อนรับสู่ ",
          /* @__PURE__ */ jsx("span", { className: "text-primary", children: "AnimeKuf" }),
          "! น้องคัฟมาแล้วคัฟป๊มมม"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-base text-foreground/80", children: "วันนี้คุณอยากหาอนิเมะแนวไหน หรืออยากให้น้องคัฟช่วยแนะนำเรื่องอะไร บอกมาได้เลยนะคัฟ!" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "mt-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold mb-3 text-foreground", children: "เลือกแนวที่ชอบ" }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 gap-3", children: [
        /* @__PURE__ */ jsxs("button", { onClick: () => setGenre(null), className: `p-3 rounded-2xl border text-center transition-all ${genre == null ? "bg-primary text-primary-foreground border-primary shadow" : "bg-card text-foreground border-border hover:-translate-y-0.5"}`, children: [
          /* @__PURE__ */ jsx("div", { className: "text-xl", children: "⭐" }),
          /* @__PURE__ */ jsx("div", { className: "text-xs font-bold mt-1", children: "ยอดนิยม" })
        ] }),
        GENRES.map((g) => /* @__PURE__ */ jsxs("button", { onClick: () => setGenre(g.id), className: `p-3 rounded-2xl border text-center transition-all ${genre === g.id ? "bg-primary text-primary-foreground border-primary shadow" : "bg-card text-foreground border-border hover:-translate-y-0.5"}`, children: [
          /* @__PURE__ */ jsx("div", { className: "text-xl", children: g.emoji }),
          /* @__PURE__ */ jsx("div", { className: "text-xs font-bold mt-1", children: g.name })
        ] }, g.id))
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mt-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold mb-3 text-foreground", children: genre == null ? "🔥 อนิเมะยอดนิยมตลอดกาล" : "การ์ดประจำแนว" }),
      loading ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4", children: Array.from({
        length: 12
      }).map((_, i) => /* @__PURE__ */ jsx("div", { className: "aspect-[2/3] bg-muted rounded-2xl animate-pulse" }, i)) }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4", children: list.map((a) => /* @__PURE__ */ jsx(AnimeCard, { anime: a }, a.mal_id)) })
    ] })
  ] });
}
export {
  Index as component
};
