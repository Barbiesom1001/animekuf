import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useRouterState, Link, createRootRouteWithContext, useRouter, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
const appCss = "/assets/styles-D8OWryDd.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const tabs = [
  { to: "/", label: "หน้าแนะนำ", icon: "/tab-star.png" },
  { to: "/schedule", label: "ตารางฉาย", icon: "/tab-map.png" },
  { to: "/basement", label: "ห้องใต้ดิน", icon: "/tab-candle.png" }
];
function Navbar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-30 backdrop-blur-md bg-background/70 border-b border-border", children: /* @__PURE__ */ jsxs("nav", { className: "max-w-7xl mx-auto px-4 py-3 flex items-center gap-4", children: [
    /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2 group", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: "/kuf-headtop.png",
          alt: "น้องคัฟ",
          className: "w-12 h-12 object-contain object-top drop-shadow-sm",
          style: { objectPosition: "center top" }
        }
      ),
      /* @__PURE__ */ jsxs("span", { className: "text-2xl font-bold tracking-tight text-foreground", children: [
        "Anime",
        /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Kuf" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "ml-auto flex items-center gap-1 sm:gap-2 bg-secondary/60 p-1 rounded-full", children: tabs.map((t) => {
      const active = path === t.to;
      return /* @__PURE__ */ jsxs(
        Link,
        {
          to: t.to,
          className: `px-3 sm:px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-1.5 ${active ? "bg-primary text-primary-foreground shadow-sm scale-105" : "text-foreground/70 hover:text-foreground hover:bg-background/60 hover:scale-102"}`,
          children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: t.icon,
                alt: t.label,
                className: "w-6 h-6 object-contain animate-duration-300 select-none drop-shadow-sm group-hover:scale-110 transition-transform",
                draggable: false
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: t.label })
          ]
        },
        t.to
      );
    }) })
  ] }) });
}
const BASE = "https://api.jikan.moe/v4";
async function fetchJSON(url2) {
  const res = await fetch(url2);
  if (!res.ok) throw new Error("Jikan error " + res.status);
  return res.json();
}
async function getTopAnime() {
  const j = await fetchJSON(`${BASE}/top/anime?limit=24`);
  return j.data;
}
async function getByGenre(genreId) {
  if (genreId === -1) {
    const ids = [52299, 34902, 37976, 37430, 48569, 31043, 36474, 39468];
    const results = await Promise.all(
      ids.map(
        (id) => fetchJSON(`${BASE}/anime/${id}`).then((r) => r.data).catch(() => null)
      )
    );
    return results.filter((a) => !!a);
  }
  const j = await fetchJSON(
    `${BASE}/anime?genres=${genreId}&order_by=score&sort=desc&limit=24&sfw=true`
  );
  return j.data;
}
const THAI_ALIAS = {
  "ดาบพิฆาตอสูร": "Demon Slayer",
  "ผ่าพิภพไททัน": "Attack on Titan",
  "วันพีช": "One Piece",
  "นารูโตะ": "Naruto",
  "มหาเวทย์ผนึกมาร": "Jujutsu Kaisen",
  "นักเตะแข้งสายฟ้า": "Inazuma Eleven",
  "ฮันเตอร์": "Hunter x Hunter",
  "โคนัน": "Detective Conan",
  "ดราก้อนบอล": "Dragon Ball",
  "บลีช": "Bleach",
  "วันพันช์แมน": "One Punch Man",
  "สไปร์ทแฟมิลี่": "Spy x Family",
  "สไปแฟมิลี่": "Spy x Family",
  "ไชเก็ง": "Chainsaw Man",
  "เชนซอว์แมน": "Chainsaw Man",
  "เทพมรณะ": "Bleach",
  "ฟรีเร็น": "Frieren",
  "มหาศึกคนชนเทพ": "Record of Ragnarok",
  "เจ้าหญิงผู้น่ารังเกียจ": "Bibliophile Princess",
  "อนิเมะ": "anime"
};
function thaiToEnglishQuery(q) {
  let out = q;
  for (const [th, en] of Object.entries(THAI_ALIAS)) {
    if (out.includes(th)) out = out.replace(th, en);
  }
  return out;
}
async function searchAnime(q) {
  if (!q.trim()) return [];
  let query = q.trim();
  if (/[\u0E00-\u0E7F]/.test(query)) {
    query = thaiToEnglishQuery(query);
    if (/[\u0E00-\u0E7F]/.test(query)) {
      try {
        const { translateToEnglish: translateToEnglish2 } = await Promise.resolve().then(() => translate);
        query = await translateToEnglish2(query);
      } catch {
      }
    }
  }
  const j = await fetchJSON(
    `${BASE}/anime?q=${encodeURIComponent(query)}&limit=20&sfw=true`
  );
  return j.data;
}
const GENRES = [
  { id: 1, name: "แอคชั่น", emoji: "⚔️" },
  { id: 2, name: "ผจญภัย", emoji: "🗺️" },
  { id: 62, name: "ต่างโลก", emoji: "🌌" },
  { id: 4, name: "ตลก", emoji: "😆" },
  { id: 30, name: "กีฬา", emoji: "⚽" },
  { id: 7, name: "สืบสวน", emoji: "🔍" },
  { id: 10, name: "แฟนตาซี", emoji: "🪄" },
  { id: 22, name: "โรแมนซ์", emoji: "💖" },
  { id: 24, name: "ไซไฟ", emoji: "🚀" },
  { id: -1, name: "เกต/ดันเจี้ยน", emoji: "🌀" }
];
function statusToThai(s) {
  if (!s) return "ไม่ทราบสถานะ";
  const m = {
    "Currently Airing": "กำลังออนแอร์",
    "Finished Airing": "จบแล้ว",
    "Not yet aired": "กำลังจะมา"
  };
  return m[s] ?? s;
}
const CACHE_KEY = "kuf-tr-cache-v1";
const CACHE_KEY_EN = "kuf-tr-cache-en-v1";
function readCache(key) {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(key) || "{}");
  } catch {
    return {};
  }
}
function writeCache(key, c) {
  try {
    localStorage.setItem(key, JSON.stringify(c));
  } catch {
  }
}
async function mymemory(text, pair) {
  const chunks = text.match(/[\s\S]{1,450}/g) || [text];
  const out = [];
  for (const ch of chunks) {
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(ch)}&langpair=${pair}`
    );
    const j = await res.json();
    out.push(j?.responseData?.translatedText || ch);
  }
  return out.join(" ");
}
async function translateToThai(text) {
  if (!text) return "";
  const trimmed = text.trim();
  if (!trimmed) return "";
  if (/[\u0E00-\u0E7F]/.test(trimmed)) return trimmed;
  const cache = readCache(CACHE_KEY);
  if (cache[trimmed]) return cache[trimmed];
  try {
    const out = await mymemory(trimmed, "en|th");
    cache[trimmed] = out;
    writeCache(CACHE_KEY, cache);
    return out;
  } catch {
    return trimmed;
  }
}
async function translateToEnglish(text) {
  if (!text) return "";
  const trimmed = text.trim();
  if (!trimmed) return "";
  if (!/[\u0E00-\u0E7F]/.test(trimmed)) return trimmed;
  const cache = readCache(CACHE_KEY_EN);
  if (cache[trimmed]) return cache[trimmed];
  try {
    const out = await mymemory(trimmed, "th|en");
    cache[trimmed] = out;
    writeCache(CACHE_KEY_EN, cache);
    return out;
  } catch {
    return trimmed;
  }
}
const translate = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  translateToEnglish,
  translateToThai
}, Symbol.toStringTag, { value: "Module" }));
function KufHead({ size = 72 }) {
  return /* @__PURE__ */ jsx(
    "img",
    {
      src: "/kuf-head.png",
      alt: "น้องคัฟ",
      style: { width: size, height: size },
      className: "object-contain drop-shadow-md select-none",
      draggable: false
    }
  );
}
function kufify(text) {
  let t = text.replace(/ครับ/g, "คัฟ").replace(/รอสักครู่/g, "").replace(/ขอไปเช็คข้อมูลก่อน/g, "").replace(/โปรดรอ/g, "").replace(/กำลังตรวจสอบ/g, "").trim();
  if (!t) t = "น้องคัฟอยู่ตรงนี้";
  if (!/คัฟ[\s!?\.]*$/.test(t)) {
    t = t.replace(/[\.!?。]*$/, "") + "คัฟ";
  }
  return t;
}
const GREETING = "สวัสดีคัฟ! พิมพ์ชื่อเรื่อง หรือบอกแนวที่ชอบ (เช่น แอคชั่น ฮันเตอร์ โรแมนซ์) มาได้เลยคัฟ";
function detectIntent(qRaw) {
  const q = qRaw.trim().toLowerCase();
  if (!q) return { kind: "greet" };
  if (/^(สวัสดี|หวัดดี|ดีจ้า|hi|hello|hey|ฮัลโหล)/.test(q)) return { kind: "greet" };
  if (/(ขอบคุณ|ขอบใจ|thanks|thank you)/.test(q)) return { kind: "thanks" };
  for (const g of GENRES) {
    if (q.includes(g.name.toLowerCase())) return { kind: "genre", payload: g.id };
  }
  if (/(ฮันเตอร์|hunter|เกต|ดันเจี้ยน|ดันเจียน|gate|dungeon|solo leveling)/.test(q)) {
    return { kind: "genre", payload: -1 };
  }
  return { kind: "search", payload: qRaw };
}
function KufChat() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef(null);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("kuf-chat-v1");
      if (raw) setMsgs(JSON.parse(raw));
    } catch {
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("kuf-chat-v1", JSON.stringify(msgs));
    scrollRef.current?.scrollTo({ top: 99999, behavior: "smooth" });
  }, [msgs]);
  useEffect(() => {
    if (open && msgs.length === 0) {
      setMsgs([{ role: "kuf", text: kufify(GREETING) }]);
    }
  }, [open, msgs.length]);
  async function send() {
    const q = input.trim();
    if (!q || busy) return;
    setInput("");
    setMsgs((m) => [...m, { role: "user", text: q }]);
    setBusy(true);
    try {
      const intent = detectIntent(q);
      if (intent.kind === "greet") {
        setMsgs((m) => [...m, { role: "kuf", text: kufify("สวัสดีคัฟ อยากให้แนะนำเรื่องอะไรดี") }]);
        return;
      }
      if (intent.kind === "thanks") {
        setMsgs((m) => [...m, { role: "kuf", text: kufify("ยินดีคัฟ") }]);
        return;
      }
      if (intent.kind === "genre") {
        const list = await getByGenre(intent.payload);
        const top = list.slice(0, 3);
        if (top.length === 0) {
          setMsgs((m) => [...m, { role: "kuf", text: kufify("ยังไม่เจอเรื่องในแนวนี้คัฟ") }]);
          return;
        }
        const lines = top.map((a2) => `• ${a2.title} (⭐${a2.score ?? "-"})`);
        setMsgs((m) => [...m, { role: "kuf", text: kufify(`แนะนำ 3 เรื่องคัฟ:
${lines.join("\n")}`) }]);
        return;
      }
      const results = await searchAnime(q);
      if (results.length === 0) {
        setMsgs((m) => [...m, { role: "kuf", text: kufify(`หาเรื่อง "${q}" ไม่เจอคัฟ`) }]);
        return;
      }
      const a = results[0];
      const syn = a.synopsis ? await translateToThai(a.synopsis) : "";
      const short = syn.length > 220 ? syn.slice(0, 220) + "..." : syn;
      setMsgs((m) => [
        ...m,
        { role: "kuf", text: kufify(`${a.title} (⭐${a.score ?? "-"} • ${a.episodes ?? "?"} ตอน)
${short || "ยังไม่มีเรื่องย่อ"}`) }
      ]);
    } catch {
      setMsgs((m) => [...m, { role: "kuf", text: kufify("เน็ตน้องคัฟกระตุก ลองใหม่อีกทีคัฟ") }]);
    } finally {
      setBusy(false);
    }
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        "aria-label": "คุยกับน้องคัฟ",
        onClick: () => setOpen((v) => !v),
        className: "fixed bottom-5 right-5 z-40 hover:scale-105 transition-transform drop-shadow-xl",
        children: /* @__PURE__ */ jsx(KufHead, { size: 72 })
      }
    ),
    open && /* @__PURE__ */ jsxs("div", { className: "fixed bottom-24 right-5 z-40 w-[min(360px,calc(100vw-2rem))] h-[480px] flex flex-col bg-card border border-border rounded-3xl shadow-2xl overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "px-4 py-3 bg-kuf-pink/60 border-b border-border flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(KufHead, { size: 36 }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "text-sm font-bold text-foreground", children: "น้องคัฟ" }),
          /* @__PURE__ */ jsx("div", { className: "text-[10px] text-foreground/70", children: "ออนไลน์ พร้อมป้ายยาคัฟ" })
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: () => setOpen(false), className: "ml-auto text-foreground/60 hover:text-foreground", children: "✕" })
      ] }),
      /* @__PURE__ */ jsxs("div", { ref: scrollRef, className: "flex-1 overflow-y-auto p-3 space-y-2 text-sm", children: [
        msgs.map((m, i) => /* @__PURE__ */ jsx(
          "div",
          {
            className: `max-w-[85%] whitespace-pre-wrap px-3 py-2 rounded-2xl ${m.role === "user" ? "ml-auto bg-primary text-primary-foreground rounded-br-sm" : "bg-secondary text-secondary-foreground rounded-bl-sm"}`,
            children: m.text
          },
          i
        )),
        busy && /* @__PURE__ */ jsx("div", { className: "bg-secondary text-secondary-foreground px-3 py-2 rounded-2xl rounded-bl-sm w-fit text-xs opacity-80", children: "น้องคัฟกำลังคิดอยู่..." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-2 border-t border-border flex gap-2", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            value: input,
            onChange: (e) => setInput(e.target.value),
            onKeyDown: (e) => e.key === "Enter" && send(),
            placeholder: "พิมพ์คุยกับน้องคัฟ...",
            className: "flex-1 bg-input rounded-full px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring text-foreground"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: send,
            disabled: busy,
            className: "px-4 rounded-full bg-primary text-primary-foreground text-sm font-bold disabled:opacity-50",
            children: "ส่ง"
          }
        )
      ] })
    ] })
  ] });
}
const url = "/__l5e/assets-v1/5785fca6-fe0b-402f-915d-79b6dff47335/pastel-bg.png";
const pastelBg = {
  url
};
const LINE_OA_URL = "https://line.me/R/ti/p/@677gdesw";
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$3 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "AnimeKuf — ศูนย์รวมอนิเมะกับน้องคัฟ" },
      { name: "description", content: "แพลตฟอร์มแนะนำอนิเมะกับน้องคัฟ ค้นหา เช็คตารางฉาย และวิเคราะห์สปอยล์" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "AnimeKuf — ศูนย์รวมอนิเมะกับน้องคัฟ" },
      { name: "twitter:title", content: "AnimeKuf — ศูนย์รวมอนิเมะกับน้องคัฟ" },
      { property: "og:description", content: "แพลตฟอร์มแนะนำอนิเมะกับน้องคัฟ ค้นหา เช็คตารางฉาย และวิเคราะห์สปอยล์" },
      { name: "twitter:description", content: "แพลตฟอร์มแนะนำอนิเมะกับน้องคัฟ ค้นหา เช็คตารางฉาย และวิเคราะห์สปอยล์" },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/b6d3fed3-5dbd-48d6-a0f0-26d22d8b3f84/id-preview-872a3455--182022a7-06dc-4969-bd99-77d1d2dc089d.lovable.app-1780562204450.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/b6d3fed3-5dbd-48d6-a0f0-26d22d8b3f84/id-preview-872a3455--182022a7-06dc-4969-bd99-77d1d2dc089d.lovable.app-1780562204450.png" },
      { name: "twitter:card", content: "summary_large_image" }
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Mali:wght@400;600;700&display=swap" },
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "th", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$3.useRouteContext();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const showBg = !path.startsWith("/basement");
  return /* @__PURE__ */ jsxs(QueryClientProvider, { client: queryClient, children: [
    showBg && /* @__PURE__ */ jsx(
      "div",
      {
        "aria-hidden": true,
        className: "fixed inset-0 z-0 pointer-events-none bg-cover bg-center bg-no-repeat",
        style: { backgroundImage: `url(${pastelBg.url})` }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col relative z-10", children: [
      /* @__PURE__ */ jsx(Navbar, {}),
      /* @__PURE__ */ jsx("main", { className: "flex-1", children: /* @__PURE__ */ jsx(Outlet, {}) }),
      /* @__PURE__ */ jsx(KufChat, {}),
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: LINE_OA_URL,
          target: "_blank",
          rel: "noopener noreferrer",
          "aria-label": "เพิ่มเพื่อน LINE น้องคัฟ",
          className: "fixed bottom-5 left-5 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#06C755] text-white font-bold text-sm shadow-xl hover:scale-105 transition-transform",
          children: [
            /* @__PURE__ */ jsx("span", { className: "text-base", children: "💬" }),
            /* @__PURE__ */ jsx("span", { children: "LINE น้องคัฟ" })
          ]
        }
      )
    ] })
  ] });
}
const $$splitComponentImporter$2 = () => import("./schedule-DzjPMomk.js");
const Route$2 = createFileRoute("/schedule")({
  head: () => ({
    meta: [{
      title: "ตารางฉาย & ช่องทางดู — AnimeKuf"
    }, {
      name: "description",
      content: "ค้นหาอนิเมะทุกเรื่องบนโลก พร้อมสถานะออนแอร์และช่องทางดูถูกลิขสิทธิ์ในไทย"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./basement-B1gO4RFZ.js");
const Route$1 = createFileRoute("/basement")({
  head: () => ({
    meta: [{
      title: "ห้องใต้ดิน — โซนวิเคราะห์สปอยล์ | AnimeKuf"
    }, {
      name: "description",
      content: "บทความและทฤษฎีเจาะลึกพล็อตอนิเมะแบบสปอยล์ยับ"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-D8KhvE9b.js");
const Route = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "AnimeKuf — ศูนย์รวมอนิเมะกับน้องคัฟ"
    }, {
      name: "description",
      content: "แพลตฟอร์มแนะนำอนิเมะภาษาไทย โดยน้องคัฟ พร้อมเรื่องย่อแปลไทยอัตโนมัติ"
    }, {
      property: "og:title",
      content: "AnimeKuf — ศูนย์รวมอนิเมะกับน้องคัฟ"
    }, {
      property: "og:description",
      content: "ค้นหา แนะนำ และเช็คช่องทางดูอนิเมะถูกลิขสิทธิ์ในไทย"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const ScheduleRoute = Route$2.update({
  id: "/schedule",
  path: "/schedule",
  getParentRoute: () => Route$3
});
const BasementRoute = Route$1.update({
  id: "/basement",
  path: "/basement",
  getParentRoute: () => Route$3
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$3
});
const rootRouteChildren = {
  IndexRoute,
  BasementRoute,
  ScheduleRoute
};
const routeTree = Route$3._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  GENRES as G,
  statusToThai as a,
  getByGenre as b,
  getTopAnime as g,
  router as r,
  searchAnime as s,
  translateToThai as t
};
