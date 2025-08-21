// Auto-generated
// src/layouts/DashboardLayout.tsx
import { NavLink, Outlet, useLocation, useMatches, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { cn } from "../shared/lib/array"; // hoặc tạo 1 helper cn() riêng; tạm dùng join
import { useAuth } from "../shared/hooks/useAuth.tsx";

// Nếu dùng lucide-react:
// import { LayoutDashboard, ListChecks, FilePlus2, Settings, Users, LogOut, Menu } from "lucide-react";

function useBreadcrumbs() {
  // Tạo breadcrumb từ matches hoặc từ URL
  const matches = useMatches();
  const location = useLocation();

  // Nếu route có handle.breadcrumb thì ưu tiên (chưa set thì fallback theo URL)
  const handled = matches
    .map((m: any) => m.handle?.breadcrumb)
    .filter(Boolean) as { label: string; to?: string }[];

  if (handled.length) return handled;

  const parts = location.pathname.split("/").filter(Boolean);
  const crumbs = parts.map((p, i) => {
    const to = "/" + parts.slice(0, i + 1).join("/");
    return { label: decodeURIComponent(p), to };
  });
  return crumbs;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <div className="px-3 text-[10px] uppercase tracking-wider text-muted-foreground/80 mt-4 mb-2">{children}</div>;
}

type MenuItem = { to: string; label: string; end?: boolean };

export default function DashboardLayout() {
  const { tenantId = "default" } = useParams();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(true);
  const crumbs = useBreadcrumbs();

  // Menu theo vai trò
  const baseMenu: MenuItem[] = useMemo(
    () => [
      { to: `/${tenantId}/app`, label: "Tổng quan", end: true },
      { to: `/${tenantId}/app/questions`, label: "Câu hỏi" },
      { to: `/${tenantId}/app/exams/create`, label: "Tạo đề" },
    ],
    [tenantId]
  );

  const adminMenu: MenuItem[] = useMemo(
    () => (user && (user.role === "SYSTEM_ADMIN" || user.role === "SCHOOL_ADMIN")
      ? [{ to: `/${tenantId}/app/admin`, label: "Quản trị" }]
      : []),
    [tenantId, user]
  );

  // Đóng sidebar khi vào mobile
  useEffect(() => {
    const onResize = () => setOpen(window.innerWidth >= 1024); // lg
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] bg-background text-foreground">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 border-r border-muted/60 bg-card transition-transform lg:static lg:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-14 border-b border-muted/60 flex items-center px-4 gap-2">
          <img src="/favicon.svg" className="h-5 w-5" alt="" />
          <div className="font-semibold">QuizUniverse</div>
        </div>

        <nav className="px-2 py-3 text-sm">
          <SectionTitle>Điều hướng</SectionTitle>
          <ul className="space-y-1">
            {baseMenu.map((m) => (
              <li key={m.to}>
                <NavLink
                  to={m.to}
                  end={m.end}
                  className={({ isActive }) =>
                    "flex items-center gap-2 rounded-md px-3 py-2 transition hover:bg-muted " +
                    (isActive ? "bg-muted text-foreground" : "text-muted-foreground")
                  }
                >
                  {/* Icon ví dụ: <LayoutDashboard className="h-4 w-4" /> */}
                  <span>{m.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          {adminMenu.length > 0 && (
            <>
              <SectionTitle>Quản trị</SectionTitle>
              <ul className="space-y-1">
                {adminMenu.map((m) => (
                  <li key={m.to}>
                    <NavLink
                      to={m.to}
                      className={({ isActive }) =>
                        "flex items-center gap-2 rounded-md px-3 py-2 transition hover:bg-muted " +
                        (isActive ? "bg-muted text-foreground" : "text-muted-foreground")
                      }
                    >
                      {/* <Settings className="h-4 w-4" /> */}
                      <span>{m.label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </>
          )}
        </nav>

        <div className="mt-auto px-3 py-3 text-xs text-muted-foreground/90">
          <div>Tenant: <span className="font-medium text-foreground">{tenantId}</span></div>
          {user && <div>User: <span className="font-medium text-foreground">{user.name}</span></div>}
        </div>
      </aside>

      {/* Main */}
      <div className="lg:ml-0 ml-0 flex min-h-screen flex-col">
        {/* Header */}
        <header className="h-14 border-b border-muted/60 bg-card/80 backdrop-blur flex items-center gap-2 px-3">
          <button
            className="inline-flex items-center justify-center rounded-md px-2 py-1 border border-muted lg:hidden"
            onClick={() => setOpen((s) => !s)}
            aria-label="Toggle sidebar"
            title="Mở/đóng menu"
          >
            {/* <Menu className="h-4 w-4" /> */}
            ☰
          </button>

          <div className="ml-1 text-sm text-muted-foreground">
            Trường: <span className="font-medium text-foreground">{tenantId}</span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <a
              className="hidden sm:inline-flex rounded-md border border-muted px-3 py-1.5 text-sm"
              href={`/${tenantId}`}
            >
              Trang công khai
            </a>
            {user ? (
              <button
                onClick={logout}
                className="rounded-md bg-brand text-brand-foreground px-3 py-1.5 text-sm"
                title="Đăng xuất"
              >
                Đăng xuất
              </button>
            ) : (
              <NavLink
                to={`/${tenantId}/login`}
                className="rounded-md bg-brand text-brand-foreground px-3 py-1.5 text-sm"
              >
                Đăng nhập
              </NavLink>
            )}
          </div>
        </header>

        {/* Breadcrumbs */}
        <div className="px-4 py-2 border-b border-muted/60 text-xs text-muted-foreground">
          <nav className="flex flex-wrap items-center gap-1">
            {crumbs.map((c, i) => (
              <span key={c.to} className="inline-flex items-center gap-1">
                {i > 0 && <span className="opacity-60">/</span>}
                <NavLink to={c.to} className="hover:underline">
                  {c.label}
                </NavLink>
              </span>
            ))}
          </nav>
        </div>

        {/* Content */}
        <main className="flex-1 px-4 py-4">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="border-t border-muted/60 px-4 py-3 text-xs text-muted-foreground">
          © {new Date().getFullYear()} QuizUniverse
        </footer>
      </div>
    </div>
  );
}

// Nếu bạn chưa có helper cn(), tạm thay bằng:
// function cn(...cls: (string | false | null | undefined)[]) {
//   return cls.filter(Boolean).join(" ");
// }
