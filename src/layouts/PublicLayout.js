"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PublicLayout;
var jsx_runtime_1 = require("react/jsx-runtime");
// Auto-generated
// src/layouts/PublicLayout.tsx
var react_router_dom_1 = require("react-router-dom");
function PublicLayout() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "min-h-screen flex flex-col bg-background text-foreground", children: [(0, jsx_runtime_1.jsxs)("header", { className: "h-14 border-b border-muted/60 bg-card/80 backdrop-blur flex items-center px-4", children: [(0, jsx_runtime_1.jsxs)("a", { href: "/", className: "flex items-center gap-2 text-sm font-semibold", children: [(0, jsx_runtime_1.jsx)("img", { src: "/favicon.svg", alt: "", className: "h-5 w-5" }), "QuizUniverse"] }), (0, jsx_runtime_1.jsx)("nav", { className: "ml-auto text-sm" })] }), (0, jsx_runtime_1.jsx)("main", { className: "flex-1", children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Outlet, {}) }), (0, jsx_runtime_1.jsxs)("footer", { className: "border-t border-muted/60 px-4 py-3 text-xs text-muted-foreground", children: ["\u00A9 ", new Date().getFullYear(), " QuizUniverse"] })] }));
}
