"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Layout = Layout;
var jsx_runtime_1 = require("react/jsx-runtime");
// src/app/layout.tsx
var react_router_dom_1 = require("react-router-dom");
var Header_1 = require("@/widgets/Header");
var Footer_1 = require("@/widgets/Footer");
function Layout() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col min-h-screen", children: [(0, jsx_runtime_1.jsx)(Header_1.default, {}), (0, jsx_runtime_1.jsxs)("main", { className: "flex-grow", children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Outlet, {}), " "] }), (0, jsx_runtime_1.jsx)(Footer_1.default, {})] }));
}
