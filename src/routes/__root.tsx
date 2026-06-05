import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Navbar } from "../components/Navbar";
import { KufChat } from "../components/KufChat";
import pastelBg from "../assets/pastel-bg.png.asset.json";

const LINE_OA_URL = "https://line.me/R/ti/p/@677gdesw";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
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
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Mali:wght@400;600;700&display=swap" },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="th">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const showBg = !path.startsWith("/basement");

  return (
    <QueryClientProvider client={queryClient}>
      {showBg && (
        <div
          aria-hidden
          className="fixed inset-0 -z-10 pointer-events-none bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${pastelBg.url})` }}
        />
      )}
      <div className="min-h-screen flex flex-col relative">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <KufChat />
        <a
          href={LINE_OA_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="เพิ่มเพื่อน LINE น้องคัฟ"
          className="fixed bottom-5 left-5 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#06C755] text-white font-bold text-sm shadow-xl hover:scale-105 transition-transform"
        >
          <span className="text-base">💬</span>
          <span>LINE น้องคัฟ</span>
        </a>
      </div>
    </QueryClientProvider>
  );
}
