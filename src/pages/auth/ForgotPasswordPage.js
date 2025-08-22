import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Sparkles, ArrowRight, Heart, HelpCircle } from "lucide-react";
import Floating from "@/shared/ui/Floatting"; // dùng cùng import như các trang trước
import { useAuth } from "@/app/providers/AuthProvider";
export default function ForgotPasswordPage() {
    const { requestPasswordReset, loading } = useAuth();
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);
    const [error, setError] = useState(null);
    const tileUrl = useMemo(() => encodeURIComponent(`
      <svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160' fill='none'>
        <g stroke='#10b981' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>
          <path d='M28 36h40a8 8 0 018 8v44H36a8 8 0 01-8-8V36z' opacity='0.7'/>
          <path d='M28 52h48' opacity='0.6'/>
          <rect x='96' y='28' width='36' height='28' rx='4' />
          <path d='M100 36h18M100 44h18' opacity='0.6'/>
          <path d='M120 36l6 6M126 36l-6 6' />
          <path d='M40 116l8 4l8-4l-2 9l6 6l-9 1l-3 8l-3-8l-9-1l6-6z' />
          <path d='M112 100c10 0 20-6 20-14v-6c-7 2-13 3-20 3s-13-1-20-3v6c0 8 10 14 20 14z' />
        </g>
      </svg>
    `), []);
    const onSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            // Tùy API của bạn: ưu tiên requestPasswordReset(email); nếu không có thì resetPassword({ email })
            await requestPasswordReset(email);
            setSent(true);
        }
        catch (err) {
            setError(err?.message ?? "Không thể gửi email đặt lại mật khẩu. Vui lòng thử lại.");
        }
    };
    return (_jsxs("div", { className: "relative min-h-screen overflow-hidden bg-slate-50 dark:bg-slate-950", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" }), _jsx("div", { "aria-hidden": true, className: "pointer-events-none absolute inset-y-0 left-0 w-[120%] md:w-full opacity-10", style: {
                    backgroundImage: `url("data:image/svg+xml;utf8,${tileUrl}")`,
                    backgroundRepeat: "repeat",
                    backgroundSize: "160px 160px",
                    maskImage: "radial-gradient(1200px 400px at left center, #000 70%, transparent 100%)",
                    WebkitMaskImage: "radial-gradient(1200px 400px at left center, #000 70%, transparent 100%)",
                } }), _jsx("div", { className: "pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl dark:bg-emerald-400/10" }), _jsx("div", { className: "pointer-events-none absolute -right-16 top-10 h-64 w-64 rounded-full bg-white/10 blur-2xl dark:bg-purple-400/10" }), _jsx(Floating, { distance: 12, duration: 7, className: "pointer-events-none absolute top-16 left-8", children: _jsx("div", { className: "rounded-xl bg-gradient-to-br from-amber-300 to-rose-300 px-3 py-1 shadow-lg -rotate-6", children: _jsx("span", { className: "text-xs font-black text-rose-700", children: "RESET!" }) }) }), _jsx(Floating, { distance: 10, duration: 6, className: "pointer-events-none absolute bottom-20 right-10", children: _jsx("div", { className: "rounded-full bg-gradient-to-br from-purple-400 to-indigo-400 p-3 shadow-xl rotate-12", children: _jsx(Sparkles, { className: "h-4 w-4 text-white" }) }) }), _jsx(Floating, { distance: 9, duration: 9, className: "pointer-events-none absolute bottom-6 left-10", children: _jsx("div", { className: "rounded-full bg-gradient-to-tr from-pink-300 to-yellow-300 p-2 shadow-lg -rotate-12", children: _jsx(Heart, { className: "h-4 w-4 text-pink-700" }) }) }), _jsx("div", { className: "relative z-10 mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-16", children: _jsxs(motion.div, { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { type: "spring", stiffness: 160, damping: 18 }, className: "w-full max-w-md", children: [_jsxs("div", { className: "mb-6 text-center", children: [_jsxs("div", { className: "mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/20 backdrop-blur dark:bg-white/5 dark:ring-white/10", children: [_jsx(HelpCircle, { className: "h-4 w-4" }), "QuizUniverse \u2022 Qu\u00EAn m\u1EADt kh\u1EA9u"] }), _jsx("h1", { className: "text-3xl font-black leading-tight text-white", children: _jsx("span", { className: "\r\n      bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 \r\n      bg-clip-text text-transparent glow-text font-['Be Vietnam Pro']\r\n      dark:drop-shadow-none\r\n    ", style: {
                                            textShadow: "0px 2px 2px rgba(0,0,0,0.1)" // chỉ áp cho light
                                        }, children: "\u0110\u1EB7t l\u1EA1i m\u1EADt kh\u1EA9u" }) }), _jsx("p", { className: "mt-2 text-white/90 dark:text-gray-300", children: "Nh\u1EADp email c\u1EE7a b\u1EA1n, ch\u00FAng t\u00F4i s\u1EBD g\u1EEDi li\u00EAn k\u1EBFt \u0111\u1EB7t l\u1EA1i m\u1EADt kh\u1EA9u." })] }), _jsxs(motion.form, { onSubmit: onSubmit, initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.05 }, className: "rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-md\r\n                       dark:border-gray-700 dark:bg-gray-800/50", children: [_jsx("label", { className: "mb-2 block text-sm font-medium text-white dark:text-gray-200", children: "Email" }), _jsxs("div", { className: "mb-3 flex items-center gap-2 rounded-xl bg-white/80 px-3 py-2 ring-1 ring-black/10 focus-within:ring-2 focus-within:ring-emerald-400 dark:bg-slate-900/70 dark:ring-white/10", children: [_jsx(Mail, { className: "h-4 w-4 text-emerald-600 dark:text-emerald-300" }), _jsx("input", { type: "email", required: true, placeholder: "you@example.com", className: "w-full bg-transparent p-2 text-sm text-gray-800 placeholder:text-gray-500 focus:outline-none dark:text-gray-100 dark:placeholder:text-gray-400", value: email, onChange: (e) => setEmail(e.target.value), autoComplete: "email" })] }), error && (_jsx("div", { className: "mb-3 rounded-lg bg-rose-500/15 px-3 py-2 text-sm text-rose-100 ring-1 ring-rose-500/30", children: error })), sent ? (_jsx("div", { className: "mb-2 rounded-lg bg-emerald-500/15 px-3 py-2 text-sm text-emerald-100 ring-1 ring-emerald-500/30", children: "\u0110\u00E3 g\u1EEDi email \u0111\u1EB7t l\u1EA1i m\u1EADt kh\u1EA9u. Vui l\u00F2ng ki\u1EC3m tra h\u1ED9p th\u01B0 c\u1EE7a b\u1EA1n." })) : null, _jsxs(motion.button, { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, type: "submit", disabled: loading || sent, className: "mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full\r\n                         bg-yellow-400 px-6 py-2.5 font-semibold text-emerald-950 shadow\r\n                         hover:brightness-105 disabled:opacity-70 disabled:cursor-not-allowed", children: [loading ? "Đang gửi..." : sent ? "Đã gửi" : "Gửi liên kết đặt lại", _jsx(ArrowRight, { className: "h-4 w-4" })] }), _jsx("div", { className: "my-4 h-px bg-white/20 dark:bg-white/10" }), _jsxs("p", { className: "text-center text-sm text-white/90 dark:text-gray-300", children: ["Nh\u1EDB m\u1EADt kh\u1EA9u r\u1ED3i?", " ", _jsx(Link, { to: "/login", className: "font-semibold text-amber-300 underline-offset-2 hover:underline", children: "\u0110\u0103ng nh\u1EADp" })] })] })] }) })] }));
}
