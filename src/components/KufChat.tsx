import { useEffect, useRef, useState } from "react";
import { MascotKuf } from "./MascotKuf";
import { searchAnime, getByGenre, GENRES } from "@/lib/jikan";
import { translateToThai } from "@/lib/translate";

interface Msg { role: "user" | "kuf"; text: string }

// Force every bot line to end with "คัฟ" and strip any "ครับ" / wait phrases.
function kufify(text: string): string {
  let t = text
    .replace(/ครับ/g, "คัฟ")
    .replace(/รอสักครู่/g, "")
    .replace(/ขอไปเช็คข้อมูลก่อน/g, "")
    .replace(/โปรดรอ/g, "")
    .replace(/กำลังตรวจสอบ/g, "")
    .trim();
  if (!t) t = "น้องคัฟอยู่ตรงนี้";
  if (!/คัฟ[\s!?\.]*$/.test(t)) {
    t = t.replace(/[\.!?。]*$/, "") + "คัฟ";
  }
  return t;
}

const GREETING =
  "สวัสดีคัฟ! พิมพ์ชื่อเรื่อง หรือบอกแนวที่ชอบ (เช่น แอคชั่น ฮันเตอร์ โรแมนซ์) มาได้เลยคัฟ";

// Lightweight intent detection — answer only what's asked.
function detectIntent(qRaw: string): { kind: "greet" | "thanks" | "genre" | "search"; payload?: string | number } {
  const q = qRaw.trim().toLowerCase();
  if (!q) return { kind: "greet" };
  if (/^(สวัสดี|หวัดดี|ดีจ้า|hi|hello|hey|ฮัลโหล)/.test(q)) return { kind: "greet" };
  if (/(ขอบคุณ|ขอบใจ|thanks|thank you)/.test(q)) return { kind: "thanks" };

  // genre intent: "แนะนำ <แนว>" or "อยากดูแนว <x>" or just a bare genre word
  for (const g of GENRES) {
    if (q.includes(g.name.toLowerCase())) return { kind: "genre", payload: g.id };
  }
  // Hunter alias even if not in GENRES list
  if (/(ฮันเตอร์|hunter)/.test(q)) {
    const hunter = GENRES.find((g) => g.name === "ฮันเตอร์");
    if (hunter) return { kind: "genre", payload: hunter.id };
  }
  return { kind: "search", payload: qRaw };
}

export function KufChat() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("kuf-chat-v1");
      if (raw) setMsgs(JSON.parse(raw));
    } catch {}
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
        const list = await getByGenre(intent.payload as number);
        const top = list.slice(0, 3);
        if (top.length === 0) {
          setMsgs((m) => [...m, { role: "kuf", text: kufify("ยังไม่เจอเรื่องในแนวนี้คัฟ") }]);
          return;
        }
        const lines = top.map((a) => `• ${a.title} (⭐${a.score ?? "-"})`);
        setMsgs((m) => [...m, { role: "kuf", text: kufify(`แนะนำ 3 เรื่องคัฟ:\n${lines.join("\n")}`) }]);
        return;
      }
      // search
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
        { role: "kuf", text: kufify(`${a.title} (⭐${a.score ?? "-"} • ${a.episodes ?? "?"} ตอน)\n${short || "ยังไม่มีเรื่องย่อ"}`) },
      ]);
    } catch {
      setMsgs((m) => [...m, { role: "kuf", text: kufify("เน็ตน้องคัฟกระตุก ลองใหม่อีกทีคัฟ") }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button
        aria-label="คุยกับน้องคัฟ"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-40 hover:scale-105 transition-transform drop-shadow-xl"
      >
        <MascotKuf size={72} />
      </button>

      {open && (
        <div className="fixed bottom-24 right-5 z-40 w-[min(360px,calc(100vw-2rem))] h-[480px] flex flex-col bg-card border border-border rounded-3xl shadow-2xl overflow-hidden">
          <div className="px-4 py-3 bg-kuf-pink/60 border-b border-border flex items-center gap-2">
            <MascotKuf size={36} />
            <div>
              <div className="text-sm font-bold text-foreground">น้องคัฟ</div>
              <div className="text-[10px] text-foreground/70">ออนไลน์ พร้อมป้ายยาคัฟ</div>
            </div>
            <button onClick={() => setOpen(false)} className="ml-auto text-foreground/60 hover:text-foreground">✕</button>
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] whitespace-pre-wrap px-3 py-2 rounded-2xl ${
                  m.role === "user"
                    ? "ml-auto bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-secondary text-secondary-foreground rounded-bl-sm"
                }`}
              >
                {m.text}
              </div>
            ))}
            {busy && (
              <div className="bg-secondary text-secondary-foreground px-3 py-2 rounded-2xl rounded-bl-sm w-fit text-xs opacity-80">
                น้องคัฟกำลังคิดอยู่...
              </div>
            )}
          </div>
          <div className="p-2 border-t border-border flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="พิมพ์คุยกับน้องคัฟ..."
              className="flex-1 bg-input rounded-full px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring text-foreground"
            />
            <button
              onClick={send}
              disabled={busy}
              className="px-4 rounded-full bg-primary text-primary-foreground text-sm font-bold disabled:opacity-50"
            >
              ส่ง
            </button>
          </div>
        </div>
      )}
    </>
  );
}
