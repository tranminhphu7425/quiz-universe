"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DashboardLayout;
var jsx_runtime_1 = require("react/jsx-runtime");
// Auto-generated
// src/layouts/DashboardLayout.tsx
var react_router_dom_1 = require("react-router-dom");
var react_1 = require("react");
var array_1 = require("../shared/lib/array"); // hoặc tạo 1 helper cn() riêng; tạm dùng join
var useAuth_tsx_1 = require("../shared/hooks/useAuth.tsx");
// Nếu dùng lucide-react:
// import { LayoutDashboard, ListChecks, FilePlus2, Settings, Users, LogOut, Menu } from "lucide-react";
function useBreadcrumbs() {
    // Tạo breadcrumb từ matches hoặc từ URL
    var matches = (0, react_router_dom_1.useMatches)();
    var location = (0, react_router_dom_1.useLocation)();
    // Nếu route có handle.breadcrumb thì ưu tiên (chưa set thì fallback theo URL)
    var handled = matches
        .map(function (m) { var _a; return (_a = m.handle) === null || _a === void 0 ? void 0 : _a.breadcrumb; })
        .filter(Boolean);
    if (handled.length)
        return handled;
    var parts = location.pathname.split("/").filter(Boolean);
    var crumbs = parts.map(function (p, i) {
        var to = "/" + parts.slice(0, i + 1).join("/");
        return { label: decodeURIComponent(p), to: to };
    });
    return crumbs;
}
function SectionTitle(_a) {
    var children = _a.children;
    return (0, jsx_runtime_1.jsx)("div", { className: "px-3 text-[10px] uppercase tracking-wider text-muted-foreground/80 mt-4 mb-2", children: children });
}
function DashboardLayout() {
    var _a = (0, react_router_dom_1.useParams)().tenantId, tenantId = _a === void 0 ? "default" : _a;
    var _b = (0, useAuth_tsx_1.useAuth)(), user = _b.user, logout = _b.logout;
    var _c = (0, react_1.useState)(true), open = _c[0], setOpen = _c[1];
    var crumbs = useBreadcrumbs();
    // Menu theo vai trò
    var baseMenu = (0, react_1.useMemo)(function () { return [
        { to: "/".concat(tenantId, "/app"), label: "Tổng quan", end: true },
        { to: "/".concat(tenantId, "/app/questions"), label: "Câu hỏi" },
        { to: "/".concat(tenantId, "/app/exams/create"), label: "Tạo đề" },
    ]; }, [tenantId]);
    var adminMenu = (0, react_1.useMemo)(function () { return (user && (user.role === "SYSTEM_ADMIN" || user.role === "SCHOOL_ADMIN")
        ? [{ to: "/".concat(tenantId, "/app/admin"), label: "Quản trị" }]
        : []); }, [tenantId, user]);
    // Đóng sidebar khi vào mobile
    (0, react_1.useEffect)(function () {
        var onResize = function () { return setOpen(window.innerWidth >= 1024); }; // lg
        onResize();
        window.addEventListener("resize", onResize);
        return function () { return window.removeEventListener("resize", onResize); };
    }, []);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "min-h-screen grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] bg-background text-foreground", children: [(0, jsx_runtime_1.jsxs)("aside", { className: (0, array_1.cn)("fixed inset-y-0 left-0 z-40 w-64 border-r border-muted/60 bg-card transition-transform lg:static lg:translate-x-0", open ? "translate-x-0" : "-translate-x-full"), children: [(0, jsx_runtime_1.jsxs)("div", { className: "h-14 border-b border-muted/60 flex items-center px-4 gap-2", children: [(0, jsx_runtime_1.jsx)("img", { src: "/favicon.svg", className: "h-5 w-5", alt: "" }), (0, jsx_runtime_1.jsx)("div", { className: "font-semibold", children: "QuizUniverse" })] }), (0, jsx_runtime_1.jsxs)("nav", { className: "px-2 py-3 text-sm", children: [(0, jsx_runtime_1.jsx)(SectionTitle, { children: "\u0110i\u1EC1u h\u01B0\u1EDBng" }), (0, jsx_runtime_1.jsx)("ul", { className: "space-y-1", children: baseMenu.map(function (m) { return ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.NavLink, { to: m.to, end: m.end, className: function (_a) {
                                            var isActive = _a.isActive;
                                            return "flex items-center gap-2 rounded-md px-3 py-2 transition hover:bg-muted " +
                                                (isActive ? "bg-muted text-foreground" : "text-muted-foreground");
                                        }, children: (0, jsx_runtime_1.jsx)("span", { children: m.label }) }) }, m.to)); }) }), adminMenu.length > 0 && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(SectionTitle, { children: "Qu\u1EA3n tr\u1ECB" }), (0, jsx_runtime_1.jsx)("ul", { className: "space-y-1", children: adminMenu.map(function (m) { return ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.NavLink, { to: m.to, className: function (_a) {
                                                    var isActive = _a.isActive;
                                                    return "flex items-center gap-2 rounded-md px-3 py-2 transition hover:bg-muted " +
                                                        (isActive ? "bg-muted text-foreground" : "text-muted-foreground");
                                                }, children: (0, jsx_runtime_1.jsx)("span", { children: m.label }) }) }, m.to)); }) })] }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-auto px-3 py-3 text-xs text-muted-foreground/90", children: [(0, jsx_runtime_1.jsxs)("div", { children: ["Tenant: ", (0, jsx_runtime_1.jsx)("span", { className: "font-medium text-foreground", children: tenantId })] }), user && (0, jsx_runtime_1.jsxs)("div", { children: ["User: ", (0, jsx_runtime_1.jsx)("span", { className: "font-medium text-foreground", children: user.name })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "lg:ml-0 ml-0 flex min-h-screen flex-col", children: [(0, jsx_runtime_1.jsxs)("header", { className: "h-14 border-b border-muted/60 bg-card/80 backdrop-blur flex items-center gap-2 px-3", children: [(0, jsx_runtime_1.jsx)("button", { className: "inline-flex items-center justify-center rounded-md px-2 py-1 border border-muted lg:hidden", onClick: function () { return setOpen(function (s) { return !s; }); }, "aria-label": "Toggle sidebar", title: "M\u1EDF/\u0111\u00F3ng menu", children: "\u2630" }), (0, jsx_runtime_1.jsxs)("div", { className: "ml-1 text-sm text-muted-foreground", children: ["Tr\u01B0\u1EDDng: ", (0, jsx_runtime_1.jsx)("span", { className: "font-medium text-foreground", children: tenantId })] }), (0, jsx_runtime_1.jsxs)("div", { className: "ml-auto flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("a", { className: "hidden sm:inline-flex rounded-md border border-muted px-3 py-1.5 text-sm", href: "/".concat(tenantId), children: "Trang c\u00F4ng khai" }), user ? ((0, jsx_runtime_1.jsx)("button", { onClick: logout, className: "rounded-md bg-brand text-brand-foreground px-3 py-1.5 text-sm", title: "\u0110\u0103ng xu\u1EA5t", children: "\u0110\u0103ng xu\u1EA5t" })) : ((0, jsx_runtime_1.jsx)(react_router_dom_1.NavLink, { to: "/".concat(tenantId, "/login"), className: "rounded-md bg-brand text-brand-foreground px-3 py-1.5 text-sm", children: "\u0110\u0103ng nh\u1EADp" }))] })] }), (0, jsx_runtime_1.jsx)("div", { className: "px-4 py-2 border-b border-muted/60 text-xs text-muted-foreground", children: (0, jsx_runtime_1.jsx)("nav", { className: "flex flex-wrap items-center gap-1", children: crumbs.map(function (c, i) { return ((0, jsx_runtime_1.jsxs)("span", { className: "inline-flex items-center gap-1", children: [i > 0 && (0, jsx_runtime_1.jsx)("span", { className: "opacity-60", children: "/" }), (0, jsx_runtime_1.jsx)(react_router_dom_1.NavLink, { to: c.to, className: "hover:underline", children: c.label })] }, c.to)); }) }) }), (0, jsx_runtime_1.jsx)("main", { className: "flex-1 px-4 py-4", children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Outlet, {}) }), (0, jsx_runtime_1.jsxs)("footer", { className: "border-t border-muted/60 px-4 py-3 text-xs text-muted-foreground", children: ["\u00A9 ", new Date().getFullYear(), " QuizUniverse"] })] })] }));
}
