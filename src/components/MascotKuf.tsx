import kufImg from "@/assets/kuf-only.png";

interface Props { size?: number; waving?: boolean; className?: string }

export function MascotKuf({ size = 96, waving = true, className = "" }: Props) {
  return (
    <div
      className={`relative inline-block kuf-bounce ${className}`}
      style={{ width: size, height: size }}
      aria-label="น้องคัฟ"
    >
      <img
        src={kufImg}
        alt="น้องคัฟ"
        className={
          (waving ? "kuf-wave " : "") +
          "w-full h-full object-contain drop-shadow-md select-none"
        }
        draggable={false}
      />
    </div>
  );
}
