import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Auto-generated
import { useNavigate } from "react-router-dom";
const TENANTS = [
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
export default function TenantsPage() {
    const navigate = useNavigate();
    return (_jsxs("div", { className: "mx-auto max-w-4xl px-4 py-10", children: [_jsx("h1", { className: "text-2xl font-bold mb-6", children: "Ch\u1ECDn tr\u01B0\u1EDDng" }), _jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: TENANTS.map((t) => (_jsxs("button", { onClick: () => navigate(`/${t.id}`), className: "group rounded-xl border border-muted/60 bg-card p-4 hover:shadow-sm transition", children: [t.logo && (_jsx("img", { src: t.logo, alt: t.name, className: "h-12 mb-3 object-contain group-hover:scale-105 transition-transform" })), _jsx("div", { className: "font-semibold text-lg mb-1", children: t.name }), _jsx("p", { className: "text-sm text-muted-foreground", children: t.description })] }, t.id))) })] }));
}
