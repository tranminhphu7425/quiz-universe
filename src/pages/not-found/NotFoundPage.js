import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/not-found/NotFoundPage.tsx
import { Link } from "react-router-dom";
export default function NotFoundPage() {
    return (_jsxs("div", { className: "flex flex-col items-center justify-center min-h-[60vh] text-center px-4", children: [_jsx("h1", { className: "text-6xl font-bold text-brand mb-4", children: "404" }), _jsx("p", { className: "text-muted-foreground mb-6", children: "Xin l\u1ED7i, trang b\u1EA1n t\u00ECm ki\u1EBFm kh\u00F4ng t\u1ED3n t\u1EA1i ho\u1EB7c \u0111\u00E3 b\u1ECB di chuy\u1EC3n." }), _jsx(Link, { to: "/", className: "px-4 py-2 rounded-lg bg-brand text-brand-foreground font-medium", children: "V\u1EC1 trang ch\u1EE7" })] }));
}
