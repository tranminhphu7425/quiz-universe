"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TenantsPage;
var jsx_runtime_1 = require("react/jsx-runtime");
// Auto-generated
var react_router_dom_1 = require("react-router-dom");
var TENANTS = [
    {
        id: "hcmus",
        name: "Đại học Khoa học Tự nhiên",
        description: "Ngân hàng trắc nghiệm cho HCMUS",
        logo: "/tenant-assets/hcmus-logo.png",
    },
    {
        id: "hust",
        name: "Đại học Bách Khoa Hà Nội",
        description: "Ngân hàng trắc nghiệm cho HUST",
        logo: "/tenant-assets/hust-logo.png",
    },
    {
        id: "uet",
        name: "Đại học Công nghệ - ĐHQGHN",
        description: "Ngân hàng trắc nghiệm cho UET",
        logo: "/tenant-assets/uet-logo.png",
    },
];
function TenantsPage() {
    var navigate = (0, react_router_dom_1.useNavigate)();
    return ((0, jsx_runtime_1.jsxs)("div", { className: "mx-auto max-w-4xl px-4 py-10", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-2xl font-bold mb-6", children: "Ch\u1ECDn tr\u01B0\u1EDDng" }), (0, jsx_runtime_1.jsx)("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: TENANTS.map(function (t) { return ((0, jsx_runtime_1.jsxs)("button", { onClick: function () { return navigate("/".concat(t.id)); }, className: "group rounded-xl border border-muted/60 bg-card p-4 hover:shadow-sm transition", children: [t.logo && ((0, jsx_runtime_1.jsx)("img", { src: t.logo, alt: t.name, className: "h-12 mb-3 object-contain group-hover:scale-105 transition-transform" })), (0, jsx_runtime_1.jsx)("div", { className: "font-semibold text-lg mb-1", children: t.name }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted-foreground", children: t.description })] }, t.id)); }) })] }));
}
