import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Auto-generated
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Twitter, MessageCircle, Mail, Heart, Sparkles, Send, ShieldCheck, BookOpen } from "lucide-react";
import Logo from "@/assets/images/logo/quizuniverselogo.png";
import ThemeToggle from "@/shared/ui/ThemeToggle";
import Floating from "@/shared/ui/Floatting";
/* -------------------------------- helpers -------------------------------- */
const cn = (...a) => a.filter(Boolean).join(" ");
function Wobble({ children, className }) {
    return (_jsx(motion.div, { className: className, whileHover: { rotate: [0, -3, 3, -2, 2, 0], transition: { duration: 0.6 } }, whileTap: { scale: 0.96 }, children: children }));
}
/* ------------------------------- component ------------------------------- */
export default function Footer({ groups = [
    {
        title: "Sản phẩm",
        links: [
            { label: "Ngân hàng câu hỏi", href: "#" },
            { label: "Tạo đề", href: "#" },
            { label: "Chấm & Báo cáo", href: "#" },
        ],
    },
    {
        title: "Tài nguyên",
        links: [
            { label: "Tài liệu", href: "#" },
            { label: "Hướng dẫn nhanh", href: "#" },
            { label: "Cộng đồng", href: "#" },
        ],
    },
    {
        title: "Công ty",
        links: [
            { label: "Giới thiệu", href: "#" },
            { label: "Liên hệ", href: "#" },
            { label: "Tuyển dụng", href: "#" },
        ],
    },
    {
        title: "Pháp lý",
        links: [
            { label: "Điều khoản", href: "#" },
            { label: "Bảo mật", href: "#" },
            { label: "Cookies", href: "#" },
        ],
    },
], onSubscribe, }) {
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);
    async function handleSubmit(e) {
        e.preventDefault();
        if (!email)
            return;
        setLoading(true);
        try {
            await onSubscribe?.(email);
            setSent(true);
            setEmail("");
        }
        finally {
            setLoading(false);
            setTimeout(() => setSent(false), 2000);
        }
    }
    return (_jsx("footer", { className: "relative overflow-hidden", children: _jsxs("div", { className: "relative bg-gradient-to-b from-sky-50 to-white dark:from-slate-900 dark:to-slate-950", children: [_jsxs("div", { className: "absolute inset-0 pointer-events-none", children: [_jsx(Floating, { delay: 0.4, duration: 10, className: "absolute left-8 top-6", children: _jsx(Sparkles, { className: "h-5 w-5 text-sky-400 dark:text-sky-300" }) }), _jsx(Floating, { delay: 1, duration: 9, distance: 18, className: "absolute right-10 top-10", children: _jsx(Heart, { className: "h-5 w-5 text-rose-400 dark:text-rose-300" }) }), _jsx(Floating, { delay: 1.6, duration: 8, distance: 16, className: "absolute right-1/3 bottom-6", children: _jsx(ShieldCheck, { className: "h-5 w-5 text-emerald-500 dark:text-emerald-400" }) })] }), _jsxs("div", { className: "mx-auto max-w-7xl px-4 py-12", children: [_jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("img", { src: Logo, className: "h-8 w-8", alt: "logo" }), _jsxs("div", { children: [_jsx("div", { className: "text-lg font-extrabold text-sky-900 dark:text-sky-100", children: "QuizUniverse" }), _jsx("div", { className: "-mt-0.5 text-[10px] uppercase tracking-wider text-sky-600 dark:text-slate-400", children: "Cartoon Footer" })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Wobble, { children: _jsx("a", { href: "#", className: "inline-flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sky-700 hover:bg-sky-200\r\n                             dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700", "aria-label": "GitHub", children: _jsx(Github, { className: "h-5 w-5" }) }) }), _jsx(Wobble, { children: _jsx("a", { href: "#", className: "inline-flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sky-700 hover:bg-sky-200\r\n                             dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700", "aria-label": "Twitter", children: _jsx(Twitter, { className: "h-5 w-5" }) }) }), _jsx(Wobble, { children: _jsx("a", { href: "#", className: "inline-flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sky-700 hover:bg-sky-200\r\n                             dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700", "aria-label": "Community", children: _jsx(MessageCircle, { className: "h-5 w-5" }) }) }), _jsx(Wobble, { children: _jsx("a", { href: "mailto:hello@example.com", className: "inline-flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sky-700 hover:bg-sky-200\r\n                             dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700", "aria-label": "Email", children: _jsx(Mail, { className: "h-5 w-5" }) }) })] })] }), _jsx("div", { className: "mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-4", children: groups.map((g) => (_jsxs("div", { children: [_jsx("div", { className: "text-sm font-bold text-sky-900 dark:text-sky-100", children: g.title }), _jsx("ul", { className: "mt-3 space-y-2 text-sm text-sky-800/80 dark:text-slate-300", children: g.links.map((l) => (_jsx("li", { children: _jsx("a", { className: "hover:text-sky-900 dark:hover:text-sky-200", href: l.href, ...(l.external ? { target: "_blank", rel: "noreferrer" } : {}), children: l.label }) }, l.label))) })] }, g.title))) }), _jsxs("div", { className: "relative mt-10", children: [_jsxs(motion.div, { initial: { y: 16, opacity: 0 }, whileInView: { y: 0, opacity: 1 }, viewport: { once: true, amount: 0.4 }, transition: { type: "spring", stiffness: 140, damping: 16 }, className: "rounded-3xl border border-sky-200 bg-white p-4 shadow-sm\r\n                         dark:border-slate-700 dark:bg-slate-900", children: [_jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between", children: [_jsxs("div", { className: "flex items-center gap-2 text-sky-900 dark:text-slate-100", children: [_jsx(Sparkles, { className: "h-5 w-5 text-sky-500 dark:text-sky-300" }), _jsx("div", { className: "text-sm font-medium", children: "Theo d\u00F5i b\u1EA3n tin c\u1EADp nh\u1EADt" })] }), _jsxs("form", { onSubmit: handleSubmit, className: "flex w-full max-w-md items-center gap-2", children: [_jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "you@example.com", className: "flex-1 rounded-xl border border-sky-200 bg-sky-50/60 px-3 py-2 text-sm outline-none\r\n                               placeholder:text-sky-400 focus:border-sky-300 focus:bg-white\r\n                               dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100\r\n                               dark:placeholder:text-slate-400 dark:focus:bg-slate-900", required: true }), _jsx(Wobble, { children: _jsx("button", { type: "submit", disabled: loading, className: "rounded-xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white shadow\r\n                                 hover:bg-sky-600 disabled:opacity-60", children: loading ? "Đang gửi…" : "Đăng ký" }) })] })] }), _jsx(AnimatePresence, { children: sent && (_jsxs(motion.div, { className: "mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700\r\n                               dark:bg-emerald-900/30 dark:text-emerald-300", initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -6 }, children: [_jsx(Send, { className: "h-3.5 w-3.5" }), " \u0110\u00E3 g\u1EEDi! H\u00E3y ki\u1EC3m tra email c\u1EE7a b\u1EA1n."] })) })] }), _jsx(Floating, { distance: 12, duration: 7, className: "pointer-events-none absolute -top-4 -left-4", children: _jsx("div", { className: "rounded-xl bg-gradient-to-br from-amber-300 to-rose-300 p-2 shadow-lg -rotate-6", children: _jsx("span", { className: "text-xs font-black text-rose-700", children: "FUN!" }) }) }), _jsx(Floating, { distance: 10, duration: 8, className: "pointer-events-none absolute -bottom-4 -right-4", children: _jsx("div", { className: "rounded-2xl bg-gradient-to-br from-emerald-300 to-sky-300 p-2 shadow-lg rotate-6", children: _jsx("span", { className: "text-xs font-black text-emerald-800", children: "WOW!" }) }) })] }), _jsx("div", { className: "mt-8 grid gap-3 sm:grid-cols-3", children: [
                                { icon: _jsx(BookOpen, { className: "h-4 w-4" }), label: "Tài liệu đầy đủ" },
                                { icon: _jsx(ShieldCheck, { className: "h-4 w-4" }), label: "Bảo mật ưu tiên" },
                                { icon: _jsx(Sparkles, { className: "h-4 w-4" }), label: "Giao diện sinh động" },
                            ].map((b, i) => (_jsxs(motion.div, { whileHover: { y: -2 }, className: "inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1.5 text-[11px] font-semibold text-sky-700 ring-1 ring-sky-100\r\n                           dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700", children: [b.icon, b.label] }, i))) }), _jsxs("div", { className: "mt-8 flex flex-col items-center justify-between gap-3 border-t border-sky-100 pt-4 text-xs text-sky-700/80 sm:flex-row\r\n                          dark:border-slate-800 dark:text-slate-400", children: [_jsx(ThemeToggle, {}), _jsxs("div", { children: ["\u00A9 ", new Date().getFullYear(), " QuizUniverse. All rights reserved."] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("a", { href: "#", className: "hover:text-sky-900 dark:hover:text-sky-200", children: "\u0110i\u1EC1u kho\u1EA3n" }), _jsx("a", { href: "#", className: "hover:text-sky-900 dark:hover:text-sky-200", children: "B\u1EA3o m\u1EADt" }), _jsx("a", { href: "#", className: "hover:text-sky-900 dark:hover:text-sky-200", children: "Cookies" })] })] })] })] }) }));
}
