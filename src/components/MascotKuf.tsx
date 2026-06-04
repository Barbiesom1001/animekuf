import kufAsset from "@/assets/kuf.png.asset.json";

interface Props { size?: number; waving?: boolean; className?: string }

export function MascotKuf({ size = 96, waving = true, className = "" }: Props) {
  return (
    <div
      className={`relative inline-block kuf-bounce ${className}`}
      style={{ width: size, height: size }}
      aria-label="น้องคัฟ"
    >
      <img
        src={kufAsset.url}
        alt="น้องคัฟ"
        className={waving ? "kuf-wave w-full h-full object-contain drop-shadow-md" : "w-full h-full object-contain drop-shadow-md"}
        draggable={false}
      />
      {/* blink overlay — soft cream rectangles over eyes area */}
      <div
        className="kuf-blink absolute pointer-events-none"
        style={{
          top: "44%", left: "30%", width: "12%", height: "4%",
          background: "var(--kuf-cream)", borderRadius: 2,
        }}
      />
      <div
        className="kuf-blink absolute pointer-events-none"
        style={{
          top: "44%", left: "58%", width: "12%", height: "4%",
          background: "var(--kuf-cream)", borderRadius: 2,
        }}
      />
    </div>
  );
}
