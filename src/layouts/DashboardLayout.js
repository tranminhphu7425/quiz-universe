import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// Auto-generated
// src/layouts/DashboardLayout.tsx
import { NavLink, Outlet, useLocation, useMatches, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { cn } from "../shared/lib/array"; // hoặc tạo 1 helper cn() riêng; tạm dùng join
import { useAuth } from "../shared/hooks/useAuth";
// Nếu dùng lucide-react:
// import { LayoutDashboard, ListChecks, FilePlus2, Settings, Users, LogOut, Menu } from "lucide-react";
function useBreadcrumbs() {
    // Tạo breadcrumb từ matches hoặc từ URL
    const matches = useMatches();
    const location = useLocation();
    // Nếu route có handle.breadcrumb thì ưu tiên (chưa set thì fallback theo URL)
    const handled = matches
        .map((m) => m.handle?.breadcrumb)
        .filter(Boolean);
    if (handled.length)
        return handled;
    const parts = location.pathname.split("/").filter(Boolean);
    const crumbs = parts.map((p, i) => {
        const to = "/" + parts.slice(0, i + 1).join("/");
        return { label: decodeURIComponent(p), to };
    });
    return crumbs;
}
function SectionTitle({ children }) {
    return _jsx("div", { className: "px-3 text-[10px] uppercase tracking-wider text-muted-foreground/80 mt-4 mb-2", children: children });
}
export default function DashboardLayout() {
    const { tenantId = "default" } = useParams();
    const { user, logout } = useAuth();
    const [open, setOpen] = useState(true);
    const crumbs = useBreadcrumbs();
    // Menu theo vai trò
    const baseMenu = useMemo(() => [
        { to: `/${tenantId}/app`, label: "Tổng quan", end: true },
        { to: `/${tenantId}/app/questions`, label: "Câu hỏi" },
        { to: `/${tenantId}/app/exams/create`, label: "Tạo đề" },
    ], [tenantId]);
    const adminMenu = useMemo(() => (user && (user.role === "SYSTEM_ADMIN" || user.role === "SCHOOL_ADMIN")
        ? [{ to: `/${tenantId}/app/admin`, label: "Quản trị" }]
        : []), [tenantId, user]);
    // Đóng sidebar khi vào mobile
    useEffect(() => {
        const onResize = () => setOpen(window.innerWidth >= 1024); // lg
        onResize();
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);
    return (_jsxs("div", { className: "min-h-screen grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] bg-background text-foreground", children: [_jsxs("aside", { className: cn("fixed inset-y-0 left-0 z-40 w-64 border-r border-muted/60 bg-card transition-transform lg:static lg:translate-x-0", open ? "translate-x-0" : "-translate-x-full"), children: [_jsxs("div", { className: "h-14 border-b border-muted/60 flex items-center px-4 gap-2", children: [_jsx("img", { src: "/favicon.svg", className: "h-5 w-5", alt: "" }), _jsx("div", { className: "font-semibold", children: "QuizUniverse" })] }), _jsxs("nav", { className: "px-2 py-3 text-sm", children: [_jsx(SectionTitle, { children: "\u0110i\u1EC1u h\u01B0\u1EDBng" }), _jsx("ul", { className: "space-y-1", children: baseMenu.map((m) => (_jsx("li", { children: _jsx(NavLink, { to: m.to, end: m.end, className: ({ isActive }) => "flex items-center gap-2 rounded-md px-3 py-2 transition hover:bg-muted " +
                                            (isActive ? "bg-muted text-foreground" : "text-muted-foreground"), children: _jsx("span", { children: m.label }) }) }, m.to))) }), adminMenu.length > 0 && (_jsxs(_Fragment, { children: [_jsx(SectionTitle, { children: "Qu\u1EA3n tr\u1ECB" }), _jsx("ul", { className: "space-y-1", children: adminMenu.map((m) => (_jsx("li", { children: _jsx(NavLink, { to: (m.to ?? "#"), className: ({ isActive }) => "flex items-center gap-2 rounded-md px-3 py-2 transition hover:bg-muted " +
                                                    (isActive ? "bg-muted text-foreground" : "text-muted-foreground"), children: _jsx("span", { children: m.label }) }) }, m.to))) })] }))] }), _jsxs("div", { className: "mt-auto px-3 py-3 text-xs text-muted-foreground/90", children: [_jsxs("div", { children: ["Tenant: ", _jsx("span", { className: "font-medium text-foreground", children: tenantId })] }), user && _jsxs("div", { children: ["User: ", _jsx("span", { className: "font-medium text-foreground", children: user.name })] })] })] }), _jsxs("div", { className: "lg:ml-0 ml-0 flex min-h-screen flex-col", children: [_jsxs("header", { className: "h-14 border-b border-muted/60 bg-card/80 backdrop-blur flex items-center gap-2 px-3", children: [_jsx("button", { className: "inline-flex items-center justify-center rounded-md px-2 py-1 border border-muted lg:hidden", onClick: () => setOpen((s) => !s), "aria-label": "Toggle sidebar", title: "M\u1EDF/\u0111\u00F3ng menu", children: "\u2630" }), _jsxs("div", { className: "ml-1 text-sm text-muted-foreground", children: ["Tr\u01B0\u1EDDng: ", _jsx("span", { className: "font-medium text-foreground", children: tenantId })] }), _jsxs("div", { className: "ml-auto flex items-center gap-2", children: [_jsx("a", { className: "hidden sm:inline-flex rounded-md border border-muted px-3 py-1.5 text-sm", href: `/${tenantId}`, children: "Trang c\u00F4ng khai" }), user ? (_jsx("button", { onClick: logout, className: "rounded-md bg-brand text-brand-foreground px-3 py-1.5 text-sm", title: "\u0110\u0103ng xu\u1EA5t", children: "\u0110\u0103ng xu\u1EA5t" })) : (_jsx(NavLink, { to: `/${tenantId}/login`, className: "rounded-md bg-brand text-brand-foreground px-3 py-1.5 text-sm", children: "\u0110\u0103ng nh\u1EADp" }))] })] }), _jsx("div", { className: "px-4 py-2 border-b border-muted/60 text-xs text-muted-foreground", children: _jsx("nav", { className: "flex flex-wrap items-center gap-1", children: crumbs.map((c, i) => (_jsxs("span", { className: "inline-flex items-center gap-1", children: [i > 0 && _jsx("span", { className: "opacity-60", children: "/" }), _jsx(NavLink, { to: (c.to ?? "#"), className: "hover:underline", children: c.label })] }, c.to))) }) }), _jsx("main", { className: "flex-1 px-4 py-4", children: _jsx(Outlet, {}) }), _jsxs("footer", { className: "border-t border-muted/60 px-4 py-3 text-xs text-muted-foreground", children: ["\u00A9 ", new Date().getFullYear(), " QuizUniverse"] })] })] }));
}
