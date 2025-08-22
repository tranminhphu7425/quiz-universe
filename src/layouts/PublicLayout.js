import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Auto-generated
// src/layouts/PublicLayout.tsx
import { Outlet } from "react-router-dom";
export default function PublicLayout() {
    return (_jsxs("div", { className: "min-h-screen flex flex-col bg-background text-foreground", children: [_jsxs("header", { className: "h-14 border-b border-muted/60 bg-card/80 backdrop-blur flex items-center px-4", children: [_jsxs("a", { href: "/", className: "flex items-center gap-2 text-sm font-semibold", children: [_jsx("img", { src: "/favicon.svg", alt: "", className: "h-5 w-5" }), "QuizUniverse"] }), _jsx("nav", { className: "ml-auto text-sm" })] }), _jsx("main", { className: "flex-1", children: _jsx(Outlet, {}) }), _jsxs("footer", { className: "border-t border-muted/60 px-4 py-3 text-xs text-muted-foreground", children: ["\u00A9 ", new Date().getFullYear(), " QuizUniverse"] })] }));
}
