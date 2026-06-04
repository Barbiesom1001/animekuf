import { Link, useRouterState } from "@tanstack/react-router";
import { MascotKuf } from "./MascotKuf";

const tabs = [
  { to: "/", label: "หน้าแนะนำ", emoji: "✨" },
  { to: "/schedule", label: "ตารางฉาย", emoji: "📅" },
  { to: "/basement", label: "ห้องใต้ดิน", emoji: "🕯️" },
] as const;

export function Navbar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-background/70 border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 group">
          <MascotKuf size={44} />
          <span className="text-2xl font-bold tracking-tight text-foreground">
            Anime<span className="text-primary">Kuf</span>
          </span>
        </Link>
        <div className="ml-auto flex items-center gap-1 sm:gap-2 bg-secondary/60 p-1 rounded-full">
          {tabs.map((t) => {
            const active = path === t.to;
            return (
              <Link
                key={t.to}
                to={t.to}
                className={`px-3 sm:px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-foreground/70 hover:text-foreground hover:bg-background/60"
                }`}
              >
                <span className="mr-1">{t.emoji}</span>
                <span className="hidden sm:inline">{t.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
