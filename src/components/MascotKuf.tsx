import kufImg from "@/assets/kuf-only.png";

interface Props {
  size?: number;
  animated?: boolean;
  className?: string;
}

/**
 * น้องคัฟ mascot.
 * - When `animated` is true (home page only): the hand waves left↔right,
 *   subtle blink + mouth jiggle overlay.
 * - When false: completely static.
 */
export function MascotKuf({ size = 96, animated = false, className = "" }: Props) {
  return (
    <div
      className={`relative inline-block ${className}`}
      style={{ width: size, height: size }}
      aria-label="น้องคัฟ"
    >
      <img
        src={kufImg}
        alt="น้องคัฟ"
        className={
          (animated ? "kuf-wave-hand " : "") +
          "w-full h-full object-contain drop-shadow-md select-none"
        }
        draggable={false}
      />
      {animated && (
        <>
          {/* eye blink overlay */}
          <span
            className="kuf-blink-lid absolute"
            style={{
              top: "38%",
              left: "30%",
              width: "40%",
              height: "6%",
              borderRadius: "50%",
              background: "currentColor",
              color: "var(--kuf-cream, #fde8c9)",
              pointerEvents: "none",
            }}
          />
          {/* mouth bob overlay (tiny pink dot) */}
          <span
            className="kuf-mouth absolute"
            style={{
              top: "56%",
              left: "47%",
              width: "6%",
              height: "4%",
              borderRadius: "50%",
              background: "rgba(220,80,110,0.0)",
              pointerEvents: "none",
            }}
          />
        </>
      )}
    </div>
  );
}
