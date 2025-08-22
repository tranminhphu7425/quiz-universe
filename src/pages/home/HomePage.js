"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HomePage;
var jsx_runtime_1 = require("react/jsx-runtime");
// src/pages/home/HomePage.tsx
var react_router_dom_1 = require("react-router-dom");
var react_1 = require("react");
var framer_motion_1 = require("framer-motion");
var lucide_react_1 = require("lucide-react");
var AuthProvider_1 = require("@/app/providers/AuthProvider");
var FeatureCard_1 = require("@/widgets/FeatureCard");
var StepCard_1 = require("@/widgets/StepCard");
var HeroIllustration_1 = require("@/widgets/HeroIllustration");
var Floatting_1 = require("@/shared/ui/Floatting");
var lucide_react_2 = require("lucide-react");
var lucide_react_3 = require("lucide-react");
var FadeInOnView_1 = require("@/shared/ui/FadeInOnView");
/**
 * HomePage (inspired by Home.jsx layout)
 * - Hero gradient + blur blobs
 * - CTA buttons, badges
 * - Feature grid (Question bank / Exam builder / Admin)
 * - How-it-works steps (3 bước)
 * - Testimonials
 * - Final CTA
 */
function HomePage() {
    var user = (0, AuthProvider_1.useAuth)().user;
    var testimonials = (0, react_1.useMemo)(function () { return [
        {
            id: 1,
            name: "Nguyễn Văn A",
            comment: "Ngân hàng câu hỏi phong phú, tạo đề nhanh. Lần đầu dùng đã thấy mượt.",
            rating: 5,
            role: "Giảng viên",
        },
        {
            id: 2,
            name: "Trần Thị B",
            comment: "Làm bài ổn định, chấm theo điểm từng câu rõ ràng. Dễ xem lại kết quả.",
            rating: 4,
            role: "Sinh viên",
        },
        {
            id: 3,
            name: "Lê Văn C",
            comment: "Quy trình tạo đề/đăng bài hợp lý, hỗ trợ danh mục theo môn học.",
            rating: 5,
            role: "Quản trị",
        },
    ]; }, []);
    // SVG tile (data URL) dùng làm họa tiết nền mờ như Home.jsx
    var tileUrl = encodeURIComponent("\n    <svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160' fill='none'>\n      <g stroke='#10b981' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>\n        <!-- Book -->\n        <path d='M28 36h40a8 8 0 018 8v44H36a8 8 0 01-8-8V36z' opacity='0.7'/>\n        <path d='M28 52h48' opacity='0.6'/>\n        <!-- Checklist -->\n        <rect x='96' y='28' width='36' height='28' rx='4' />\n        <path d='M100 36h18M100 44h18' opacity='0.6'/>\n        <path d='M120 36l6 6M126 36l-6 6' />\n        <!-- Star badge -->\n        <path d='M40 116l8 4l8-4l-2 9l6 6l-9 1l-3 8l-3-8l-9-1l6-6z' />\n        <!-- Shield -->\n        <path d='M112 100c10 0 20-6 20-14v-6c-7 2-13 3-20 3s-13-1-20-3v6c0 8 10 14 20 14z' />\n      </g>\n    </svg>\n  ");
    var steps = [
        {
            step: 1,
            title: "Chuẩn bị",
            desc: "Chọn môn học, cấu trúc đề, danh sách câu hỏi.",
            icon: (0, jsx_runtime_1.jsx)(lucide_react_3.ClipboardList, { className: "h-5 w-5" }),
            accent: "from-emerald-500 to-teal-400",
        },
        {
            step: 2,
            title: "Tạo & phát đề",
            desc: "Thiết lập thời lượng, điểm từng câu, phát đề cho lớp.",
            icon: (0, jsx_runtime_1.jsx)(lucide_react_3.Send, { className: "h-5 w-5" }),
            accent: "from-amber-500 to-pink-500",
        },
        {
            step: 3,
            title: "Làm & chấm",
            desc: "Sinh viên làm bài; hệ thống chấm theo cấu hình điểm.",
            icon: (0, jsx_runtime_1.jsx)(lucide_react_3.CheckCircle2, { className: "h-5 w-5" }),
            accent: "from-indigo-500 to-purple-500",
        },
    ];
    var container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 },
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "home-page bg-slate-50 dark:bg-slate-800", children: [(0, jsx_runtime_1.jsxs)("section", { className: "relative overflow-hidden", children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" }), (0, jsx_runtime_1.jsx)("div", { "aria-hidden": true, className: "pointer-events-none absolute inset-y-0 left-0 w-[120%] md:w-full opacity-10", style: {
                            backgroundImage: "url(\"data:image/svg+xml;utf8,".concat(tileUrl, "\")"),
                            backgroundRepeat: "repeat",
                            backgroundSize: "160px 160px",
                            maskImage: "radial-gradient(1200px 400px at left center, #000 70%, transparent 100%)",
                            WebkitMaskImage: "radial-gradient(1200px 400px at left center, #000 70%, transparent 100%)",
                        } }), (0, jsx_runtime_1.jsx)("div", { className: "pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl dark:bg-emerald-400/10" }), (0, jsx_runtime_1.jsx)("div", { className: "pointer-events-none absolute -right-16 top-10 h-64 w-64 rounded-full bg-white/10 blur-2xl dark:bg-purple-400/10" }), (0, jsx_runtime_1.jsxs)("div", { className: "relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-10 px-6 py-16 lg:flex-row md:items-center md:justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "max-w-xl text-center text-white md:text-left", children: [(0, jsx_runtime_1.jsxs)(framer_motion_1.motion.div, { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { type: "spring", stiffness: 160, damping: 18 }, className: "mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/20 backdrop-blur dark:bg-white/5 dark:ring-white/10", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Sparkles, { className: "h-4 w-4" }), "QuizUniverse \u2022 Ng\u00E2n h\u00E0ng tr\u1EAFc nghi\u1EC7m"] }), (0, jsx_runtime_1.jsxs)(framer_motion_1.motion.h1, { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.05 }, className: "text-[2.5rem] md:text-[3rem] font-black leading-tight", children: ["Ch\u00E0o m\u1EEBng \u0111\u1EBFn v\u1EDBi ", (0, jsx_runtime_1.jsx)("span", { className: "\r\n            bg-gradient-to-r \r\n            from-purple-500 via-pink-500 to-amber-500 \r\n            bg-clip-text \r\n            text-transparent\r\n            animate-gradient\r\n            glow-text font-[Poppins]\r\n          ", children: "QuizUniverse" })] }), (0, jsx_runtime_1.jsx)(framer_motion_1.motion.p, { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 }, className: "mt-4 w-full text-center lg:text-left text-white/90 dark:text-gray-300", children: "Kho l\u01B0u tr\u1EEF ng\u00E2n h\u00E0ng c\u00E2u h\u1ECFi theo t\u1EEBng m\u00F4n. T\u1EA1o \u0111\u1EC1 t\u1EEB nhi\u1EC1u ng\u00E2n h\u00E0ng ho\u1EB7c t\u00E0i li\u1EC7u c\u00F3 s\u1EB5n. Chuy\u1EC3n t\u00E0i li\u1EC7u gi\u00E1o tr\u00ECnh sang c\u00E2u h\u1ECFi tr\u1EAFc nghi\u1EC7m." }), (0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.15 }, className: "mt-6 flex flex-wrap justify-center gap-4 md:justify-start", children: user ? ((0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { to: "/app", className: "inline-flex items-center gap-2 rounded-full bg-yellow-400 px-6 py-2.5 font-semibold text-emerald-950 shadow hover:brightness-105", children: ["V\u00E0o b\u1EA3ng \u0111i\u1EC1u khi\u1EC3n ", (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, { className: "h-4 w-4" })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/login", className: "inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-2.5 font-medium text-white ring-1 ring-white/30 hover:bg-white/15 dark:bg-white/5 dark:ring-white/10", children: "\u0110\u0103ng nh\u1EADp" }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/register", className: "inline-flex items-center gap-2 rounded-full bg-yellow-400 px-6 py-2.5 font-semibold text-emerald-950 shadow hover:brightness-105", children: "\u0110\u0103ng k\u00FD" })] })) })] }), (0, jsx_runtime_1.jsx)(HeroIllustration_1.default, {}), (0, jsx_runtime_1.jsx)(Floatting_1.default, { distance: 12, duration: 7, className: "pointer-events-none absolute -top-6 -left-8", children: (0, jsx_runtime_1.jsx)("div", { className: "rounded-xl bg-gradient-to-br from-amber-300 to-rose-300 p-2 shadow-lg -rotate-6", children: (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-black text-rose-700", children: "FUN!" }) }) }), (0, jsx_runtime_1.jsx)(Floatting_1.default, { distance: 10, duration: 6, className: "pointer-events-none absolute top-12 -right-6", children: (0, jsx_runtime_1.jsx)("div", { className: "rounded-full bg-gradient-to-br from-purple-400 to-indigo-400 p-3 shadow-xl rotate-12", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Sparkles, { className: "h-4 w-4 text-white" }) }) }), (0, jsx_runtime_1.jsx)(Floatting_1.default, { distance: 14, duration: 8, className: "pointer-events-none absolute bottom-12 left-6", children: (0, jsx_runtime_1.jsx)("div", { className: "rounded-xl bg-gradient-to-br from-emerald-300 to-cyan-300 px-3 py-1 shadow-lg rotate-3", children: (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold text-emerald-900", children: "NEW!" }) }) }), (0, jsx_runtime_1.jsx)(Floatting_1.default, { distance: 9, duration: 9, className: "pointer-events-none absolute bottom-4 right-10", children: (0, jsx_runtime_1.jsx)("div", { className: "rounded-full bg-gradient-to-tr from-pink-300 to-yellow-300 p-2 shadow-lg -rotate-12", children: (0, jsx_runtime_1.jsx)(lucide_react_2.Heart, { className: "h-4 w-4 text-pink-700" }) }) })] })] }), (0, jsx_runtime_1.jsxs)("section", { className: "\r\n  mx-auto max-w-7xl px-6 py-20\r\n  bg-white/0\r\n  \r\n", children: [(0, jsx_runtime_1.jsxs)("div", { className: "mb-8 text-center", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-3xl font-bold text-emerald-900 dark:text-emerald-300", children: "C\u00E1c t\u00EDnh n\u0103ng ch\u00EDnh" }), (0, jsx_runtime_1.jsx)("p", { className: "mt-2 text-emerald-800/80 dark:text-slate-300/80", children: "C\u00E1c c\u00F4ng c\u1EE5 sinh vi\u00EAn trong vi\u1EC7c t\u1EA1o v\u00E0 l\u00E0m b\u00E0i \u00F4n t\u1EADp" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3", children: [(0, jsx_runtime_1.jsx)(FeatureCard_1.default, { title: "Ng\u00E2n h\u00E0ng c\u00E2u h\u1ECFi", description: "Ch\u1EE9a c\u00E1c c\u00E2u h\u1ECFi \u00F4n t\u1EADp theo t\u1EEBng m\u00F4n, \u0111\u01B0\u1EE3c thu th\u1EADp t\u1EEB nhi\u1EC1u ngu\u1ED3n t\u00E0i li\u1EC7u v\u00E0 gi\u1EA3ng vi\u00EAn kh\u00E1c nhau.", to: "/app/questions", cta: "Xem danh s\u00E1ch", icon: (0, jsx_runtime_1.jsx)(lucide_react_1.BookOpen, { className: "h-5 w-5 text-emerald-600 dark:text-emerald-300" }) }), (0, jsx_runtime_1.jsx)(FeatureCard_1.default, { title: "T\u1EA1o \u0111\u1EC1 thi", description: "Cho ph\u00E9p t\u1EA1o \u0111\u1EC1 thi t\u1EEB ng\u00E2n h\u00E0ng c\u00E2u h\u1ECFi ho\u1EB7c upload t\u00E0i li\u1EC7u c\u00E1 nh\u00E2n v\u00E0 t\u1EA1o tr\u1EAFc nghi\u1EC7m t\u1EEB t\u00E0i li\u1EC7u \u0111\u00F3.", to: "/app/exams/create", cta: "T\u1EA1o \u0111\u1EC1", icon: (0, jsx_runtime_1.jsx)(lucide_react_1.ListChecks, { className: "h-5 w-5 text-emerald-600 dark:text-emerald-300" }) }), (0, jsx_runtime_1.jsx)(FeatureCard_1.default, { title: "Qu\u1EA3n tr\u1ECB", description: "Qu\u1EA3n l\u00FD ng\u01B0\u1EDDi d\u00F9ng & vai tr\u00F2 (Admin h\u1EC7 th\u1ED1ng / Admin tr\u01B0\u1EDDng).", to: "/app/admin", cta: "V\u00E0o trang qu\u1EA3n tr\u1ECB", icon: (0, jsx_runtime_1.jsx)(lucide_react_1.ShieldCheck, { className: "h-5 w-5 text-emerald-600 dark:text-emerald-300" }) })] })] }), (0, jsx_runtime_1.jsx)("section", { className: "bg-emerald-50 dark:bg-slate-900", children: (0, jsx_runtime_1.jsxs)("div", { className: "container mx-auto max-w-7xl px-6 py-12", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-3xl font-bold text-emerald-900 dark:text-emerald-300", children: "C\u00E1ch ho\u1EA1t \u0111\u1ED9ng" }), (0, jsx_runtime_1.jsx)("p", { className: "mt-2 text-emerald-800/80 dark:text-slate-300/80", children: "Ch\u1EC9 v\u1EDBi 3 b\u01B0\u1EDBc \u0111\u01A1n gi\u1EA3n \u0111\u1EC3 t\u1ED5 ch\u1EE9c ho\u1EB7c l\u00E0m b\u00E0i thi" })] }), (0, jsx_runtime_1.jsx)(FadeInOnView_1.default, { amount: 0.2, margin: "0px 0px -10% 0px", children: (0, jsx_runtime_1.jsx)("div", { className: "mt-8 grid grid-cols-1 gap-6 md:grid-cols-3", children: steps.map(function (s, i) { return ((0, jsx_runtime_1.jsx)(StepCard_1.default, { step: s.step, title: s.title, desc: s.desc, icon: s.icon, accent: s.accent, isLast: i === steps.length - 1 }, s.step)); }) }) })] }) }), (0, jsx_runtime_1.jsxs)("section", { className: "\r\n    py-20 mx-auto max-w-7xl px-6\r\n    transition-colors duration-300\r\n  ", children: [(0, jsx_runtime_1.jsxs)("div", { className: "mb-12 text-center", children: [(0, jsx_runtime_1.jsx)(framer_motion_1.motion.h2, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, transition: { type: "spring", stiffness: 120, damping: 14 }, viewport: { once: true }, className: "text-3xl font-bold text-emerald-900 dark:text-emerald-300", children: "Nh\u1EADn x\u00E9t t\u1EEB ng\u01B0\u1EDDi d\u00F9ng" }), (0, jsx_runtime_1.jsx)(framer_motion_1.motion.p, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, transition: { delay: 0.1 }, viewport: { once: true }, className: "mt-2 text-emerald-800/80 dark:text-slate-300/80", children: "\u0110\u00E1nh gi\u00E1 c\u1EE7a gi\u1EA3ng vi\u00EAn v\u00E0 sinh vi\u00EAn v\u1EC1 QuizUniverse" })] }), (0, jsx_runtime_1.jsx)("div", { className: "grid gap-8 sm:grid-cols-2 lg:grid-cols-3", children: testimonials.map(function (t, idx) { return ((0, jsx_runtime_1.jsxs)(framer_motion_1.motion.div, { initial: { opacity: 0, y: 40, rotate: -2 }, whileInView: { opacity: 1, y: 0, rotate: 0 }, transition: { delay: idx * 0.15, type: "spring", stiffness: 140, damping: 15 }, viewport: { once: true }, whileHover: { scale: 1.05, rotate: 1 }, className: "rounded-xl border border-emerald-100 dark:border-slate-800 \r\n                   bg-gradient-to-br from-white to-emerald-50 dark:from-slate-900 dark:to-slate-800\r\n                   p-6 shadow-lg hover:shadow-xl transition-transform duration-300", children: [(0, jsx_runtime_1.jsxs)("div", { className: "mb-3", children: [(0, jsx_runtime_1.jsx)("div", { className: "font-semibold text-emerald-700 dark:text-emerald-300", children: t.name }), (0, jsx_runtime_1.jsx)("div", { className: "text-xs text-gray-500 dark:text-gray-400", children: t.role })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mb-3 flex items-center gap-1", children: [Array.from({ length: t.rating }).map(function (_, i) { return ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.span, { initial: { scale: 0 }, animate: { scale: 1 }, transition: { delay: 0.2 + i * 0.05, type: "spring" }, className: "text-amber-400", children: "\u2605" }, i)); }), Array.from({ length: 5 - t.rating }).map(function (_, i) { return ((0, jsx_runtime_1.jsx)("span", { className: "text-gray-300 dark:text-gray-600", children: "\u2605" }, i)); })] }), (0, jsx_runtime_1.jsxs)(framer_motion_1.motion.p, { initial: { opacity: 0 }, whileInView: { opacity: 1 }, transition: { delay: 0.3 }, viewport: { once: true }, className: "text-gray-700 dark:text-gray-300 text-sm leading-relaxed italic", children: ["\u201C", t.comment, "\u201D"] })] }, t.id)); }) })] }), (0, jsx_runtime_1.jsx)("section", { className: "bg-emerald-600 dark:bg-emerald-900", children: (0, jsx_runtime_1.jsxs)("div", { className: "container mx-auto max-w-7xl px-6 py-12 text-center text-white", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-3xl font-bold", children: "S\u1EB5n s\u00E0ng t\u1ED5 ch\u1EE9c b\u00E0i thi?" }), (0, jsx_runtime_1.jsx)("p", { className: "mx-auto mt-2 max-w-2xl text-white/90 dark:text-gray-300", children: "\u0110\u0103ng k\u00FD ngay \u0111\u1EC3 b\u1EAFt \u0111\u1EA7u t\u1EA1o ng\u00E2n h\u00E0ng c\u00E2u h\u1ECFi & \u0111\u1EC1 thi c\u1EE7a b\u1EA1n." }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-6 flex items-center justify-center gap-3", children: [(0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { to: "/app/exams/create", className: "inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 font-semibold text-emerald-700 hover:brightness-95 dark:bg-emerald-400 dark:text-emerald-900 dark:hover:brightness-110", children: ["T\u1EA1o \u0111\u1EC1 ngay ", (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, { className: "h-4 w-4" })] }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/app", className: "inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-2.5 font-medium text-white ring-1 ring-white/30 hover:bg-white/15 dark:bg-emerald-800 dark:text-gray-100 dark:ring-emerald-700 dark:hover:bg-emerald-700/60", children: "Xem b\u1EA3ng \u0111i\u1EC1u khi\u1EC3n" })] })] }) })] }));
}
