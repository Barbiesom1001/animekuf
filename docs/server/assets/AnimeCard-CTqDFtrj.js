import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { t as translateToThai, a as statusToThai } from "./router-Cd4Agyoa.js";
const N = (q) => `https://www.netflix.com/search?q=${encodeURIComponent(q)}`;
const B = (q) => `https://www.bilibili.tv/en/search-result?q=${encodeURIComponent(q)}`;
const IQ = (q) => `https://www.iq.com/search?query=${encodeURIComponent(q)}`;
const T = (q) => `https://trueid.net/search?keyword=${encodeURIComponent(q)}`;
const P = (q) => `https://www.primevideo.com/search/?phrase=${encodeURIComponent(q)}`;
const D = (q) => `https://www.disneyplus.com/search?q=${encodeURIComponent(q)}`;
const NETFLIX = (q) => ({ name: "Netflix", url: N(q), color: "#E50914" });
const BILI = (q) => ({ name: "Bilibili", url: B(q), color: "#00A1D6" });
const IQIYI = (q) => ({ name: "iQIYI", url: IQ(q), color: "#00BE06" });
const TRUEID = (q) => ({ name: "TrueID", url: T(q), color: "#FF0000" });
const PRIME = (q) => ({ name: "Prime Video", url: P(q), color: "#1399FF" });
const DISNEY = (q) => ({ name: "Disney+ Hotstar", url: D(q), color: "#0E47BB" });
const MAP = {
  38e3: (t) => [NETFLIX(t), BILI(t), IQIYI(t)],
  // Demon Slayer
  16498: (t) => [NETFLIX(t), BILI(t)],
  // Attack on Titan
  40748: (t) => [NETFLIX(t), BILI(t)],
  // Jujutsu Kaisen
  52991: (t) => [BILI(t), IQIYI(t)],
  // Frieren
  21: (t) => [NETFLIX(t), BILI(t), IQIYI(t)],
  // One Piece
  50265: (t) => [NETFLIX(t), BILI(t)],
  // Spy x Family
  44511: (t) => [BILI(t), PRIME(t)],
  // Chainsaw Man
  11061: (t) => [NETFLIX(t), BILI(t)],
  // Hunter x Hunter (2011)
  1735: (t) => [NETFLIX(t), BILI(t)],
  // Naruto Shippuden
  31964: (t) => [NETFLIX(t), BILI(t)],
  // My Hero Academia
  42249: (t) => [BILI(t), IQIYI(t)],
  // Tokyo Revengers
  52299: (t) => [NETFLIX(t), BILI(t)],
  // Solo Leveling
  37430: (t) => [NETFLIX(t), BILI(t)],
  // That Time I Got Reincarnated as a Slime
  39535: (t) => [NETFLIX(t), BILI(t)],
  // Mob Psycho 100 II
  9253: (t) => [NETFLIX(t), BILI(t)],
  // Steins;Gate
  53516: (t) => [BILI(t), IQIYI(t)],
  // JJK S2
  48583: (t) => [NETFLIX(t), BILI(t)]
  // Re:Zero S2
};
const FALLBACK = (q) => [NETFLIX(q), BILI(q), IQIYI(q), PRIME(q), TRUEID(q), DISNEY(q)];
function getStreaming(malId, title) {
  if (MAP[malId]) return MAP[malId](title);
  return FALLBACK(title);
}
function AnimeCard({ anime }) {
  const [open, setOpen] = useState(false);
  const [thaiSyn, setThaiSyn] = useState("");
  const [showOriginal, setShowOriginal] = useState(false);
  useEffect(() => {
    if (open && !thaiSyn && anime.synopsis) {
      translateToThai(anime.synopsis).then(setThaiSyn);
    }
  }, [open, thaiSyn, anime.synopsis]);
  const streams = getStreaming(anime.mal_id, anime.title);
  return /* @__PURE__ */ jsxs("div", { className: "group relative", children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: () => setOpen((v) => !v),
        className: "block w-full text-left rounded-2xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "aspect-[2/3] relative overflow-hidden bg-muted", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: anime.images.jpg.large_image_url,
                alt: anime.title,
                loading: "lazy",
                className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              }
            ),
            anime.score != null && /* @__PURE__ */ jsxs("span", { className: "absolute top-2 left-2 bg-background/90 text-foreground text-xs font-bold px-2 py-1 rounded-full shadow", children: [
              "⭐ ",
              anime.score.toFixed(1)
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-3", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold text-foreground line-clamp-2 min-h-[2.5rem]", children: anime.title }),
            /* @__PURE__ */ jsxs("div", { className: "mt-2 flex flex-wrap gap-1", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[10px] px-2 py-0.5 rounded-full bg-kuf-cream text-foreground/80 border border-border", children: "คำบรรยายไทย" }),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] px-2 py-0.5 rounded-full bg-kuf-pink text-foreground/80 border border-border", children: "พากย์ไทย" })
            ] })
          ] })
        ]
      }
    ),
    open && /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in",
        onClick: () => setOpen(false),
        children: /* @__PURE__ */ jsxs(
          "div",
          {
            className: "relative bg-card text-card-foreground rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-border",
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setOpen(false),
                  "aria-label": "ปิด",
                  className: "absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-background/90 border border-border text-foreground/70 hover:text-foreground hover:bg-background flex items-center justify-center text-lg shadow",
                  children: "✕"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "relative grid sm:grid-cols-[200px_1fr] gap-4 p-5", children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: anime.images.jpg.large_image_url,
                    alt: anime.title,
                    className: "rounded-2xl w-full aspect-[2/3] object-cover"
                  }
                ),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold", children: anime.title }),
                  anime.title_english && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: anime.title_english }),
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 mt-3 text-xs", children: [
                    /* @__PURE__ */ jsxs("span", { className: "px-2 py-1 rounded-full bg-kuf-sky", children: [
                      "⭐ ",
                      anime.score ?? "-"
                    ] }),
                    /* @__PURE__ */ jsxs("span", { className: "px-2 py-1 rounded-full bg-kuf-peach", children: [
                      "🎬 ",
                      anime.episodes ?? "?",
                      " ตอน"
                    ] }),
                    /* @__PURE__ */ jsx("span", { className: "px-2 py-1 rounded-full bg-kuf-pink", children: statusToThai(anime.status) })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                      /* @__PURE__ */ jsx("h3", { className: "font-bold text-sm", children: "เรื่องย่อ" }),
                      anime.synopsis && /* @__PURE__ */ jsx(
                        "button",
                        {
                          className: "text-xs text-primary hover:underline",
                          onClick: () => setShowOriginal((v) => !v),
                          children: showOriginal ? "ดูภาษาไทย" : "ดูต้นฉบับ EN"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm mt-1 text-foreground/85 leading-relaxed", children: showOriginal ? anime.synopsis || "ไม่มีเรื่องย่อ" : thaiSyn || (anime.synopsis ? "น้องคัฟกำลังแปลให้คัฟ..." : "ไม่มีเรื่องย่อ") })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
                    /* @__PURE__ */ jsx("h3", { className: "font-bold text-sm", children: "ดูถูกลิขสิทธิ์ที่" }),
                    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mt-2", children: streams.map((s) => /* @__PURE__ */ jsxs(
                      "a",
                      {
                        href: s.url,
                        target: "_blank",
                        rel: "noreferrer",
                        className: "px-3 py-1.5 rounded-full text-xs font-semibold text-white shadow hover:opacity-90",
                        style: { background: s.color },
                        children: [
                          "▶ ",
                          s.name
                        ]
                      },
                      s.name
                    )) })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "mt-4 p-3 rounded-2xl bg-kuf-cream border border-border", children: [
                    /* @__PURE__ */ jsx("div", { className: "text-xs font-bold mb-1", children: "💖 กล่องน้องคัฟชวนดู" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-foreground/80", children: "เรื่องนี้น้องคัฟดูแล้วฟินมากกก ลองเปิดตอนแรกดูก่อนก็ได้นะคัฟ รับรองว่าติดงอมแงมแน่นอนคัฟ!" })
                  ] }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => setOpen(false),
                      className: "mt-4 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-bold",
                      children: "ปิดหน้าต่าง"
                    }
                  )
                ] })
              ] })
            ]
          }
        )
      }
    )
  ] });
}
export {
  AnimeCard as A
};
