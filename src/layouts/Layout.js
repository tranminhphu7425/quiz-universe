import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/app/layout.tsx
import { Outlet } from "react-router-dom";
import Header from "@/widgets/Header";
import Footer from "@/widgets/Footer";
export function Layout() {
    return (_jsxs("div", { className: "flex flex-col min-h-screen", children: [_jsx(Header, {}), _jsxs("main", { className: "flex-grow", children: [_jsx(Outlet, {}), " "] }), _jsx(Footer, {})] }));
}
