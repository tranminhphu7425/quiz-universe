"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NotFoundPage;
var jsx_runtime_1 = require("react/jsx-runtime");
// src/pages/not-found/NotFoundPage.tsx
var react_router_dom_1 = require("react-router-dom");
function NotFoundPage() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center justify-center min-h-[60vh] text-center px-4", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-6xl font-bold text-brand mb-4", children: "404" }), (0, jsx_runtime_1.jsx)("p", { className: "text-muted-foreground mb-6", children: "Xin l\u1ED7i, trang b\u1EA1n t\u00ECm ki\u1EBFm kh\u00F4ng t\u1ED3n t\u1EA1i ho\u1EB7c \u0111\u00E3 b\u1ECB di chuy\u1EC3n." }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/", className: "px-4 py-2 rounded-lg bg-brand text-brand-foreground font-medium", children: "V\u1EC1 trang ch\u1EE7" })] }));
}
