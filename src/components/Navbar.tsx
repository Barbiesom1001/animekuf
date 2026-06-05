import { Link, useRouterState } from "@tanstack/react-router";
import kufNavbar from "@/assets/kuf-navbar.png.asset.json";

const tabs = [
  { to: "/", label: "หน้าแนะนำ", icon: "/tab-star.png" },
  { to: "/schedule", label: "ตารางฉาย", icon: "/tab-map.png" },
  { to: "/basement", label: "ห้องใต้ดิน", icon: "/tab-candle.png" },
] as const;

export function Navbar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-background/70 border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src="/kuf-headtop.png" 
            alt="น้องคัฟ"
            className="w-12 h-12 object-contain object-top drop-shadow-sm"
            style={{ objectPosition: "center top" }}
          />
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
                className={`px-3 sm:px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  active
                    ? "bg-primary text-primary-foreground shadow-sm scale-105"
                    : "text-foreground/70 hover:text-foreground hover:bg-background/60 hover:scale-102"
                }`}
              >
                <img 
                  src={t.icon} 
                  alt={t.label} 
                  className="w-6 h-6 object-contain animate-duration-300 select-none drop-shadow-sm group-hover:scale-110 transition-transform"
                  draggable={false}
                />
                <span className="hidden sm:inline">{t.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}