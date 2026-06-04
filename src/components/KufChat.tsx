import { useEffect, useRef, useState } from "react";
import { MascotKuf } from "./MascotKuf";
import { searchAnime } from "@/lib/jikan";
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
  // ensure ends with คัฟ
  if (!/คัฟ[\s!?\.]*$/.test(t)) {
    t = t.replace(/[\.!?。]*$/, "") + "คัฟ";
  }
  return t;
}

const GREETING =
  "โฮ่ยยย! สวัสดีคัฟ น้องคัฟเองคัฟ! อยากให้ช่วยหาอนิเมะเรื่องไหน หรืออยากให้แนะนำแนวอะไรดี พิมพ์ชื่อเรื่องหรือแนวที่ชอบมาได้เลยคัฟ!";

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
      const results = await searchAnime(q);
      if (results.length === 0) {
        setMsgs((m) => [...m, { role: "kuf", text: kufify(`อืมม น้องคัฟหาเรื่อง "${q}" ไม่เจอเลย ลองพิมพ์ชื่อใหม่ดูนะ`) }]);
      } else {
        const top = results.slice(0, 3);
        const lines = await Promise.all(
          top.map(async (a) => {
            const syn = a.synopsis ? (await translateToThai(a.synopsis)).slice(0, 110) + "..." : "";
            return `• ${a.title} (⭐${a.score ?? "-"}) ${syn}`;
          })
        );
        setMsgs((m) => [
          ...m,
          { role: "kuf", text: kufify(`เจอแล้วคัฟ! น้องคัฟแนะนำเรื่องเหล่านี้:\n${lines.join("\n")}`) },
        ]);
      }
    } catch {
      setMsgs((m) => [...m, { role: "kuf", text: kufify("เน็ตน้องคัฟกระตุกนิดนึง ลองใหม่อีกทีนะ") }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button
        aria-label="คุยกับน้องคัฟ"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-40 rounded-full bg-card border border-border shadow-lg p-2 hover:scale-105 transition-transform"
      >
        <MascotKuf size={64} />
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
