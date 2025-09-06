// Auto-generated
// src/layouts/PublicLayout.tsx
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="h-14 border-b border-muted/60 bg-card/80 backdrop-blur flex items-center px-4">
        <a href="/" className="flex items-center gap-2 text-sm font-semibold">
          <img src="/favicon.svg" alt="" className="h-5 w-5" />
          QuizUniverse
        </a>
        <nav className="ml-auto text-sm">
          {/* đặt link công khai nếu cần */}
        </nav>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-muted/60 px-4 py-3 text-xs text-muted-foreground">
        © {new Date().getFullYear()} QuizUniverse
      </footer>
    </div>
  );
}
