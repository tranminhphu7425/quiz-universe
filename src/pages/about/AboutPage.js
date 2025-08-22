"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AboutPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var framer_motion_1 = require("framer-motion");
var lucide_react_1 = require("lucide-react");
var stats = [
    { label: "Ngân hàng câu hỏi", value: "25,000+" },
    { label: "Môn học", value: "40+" },
    { label: "Trường sử dụng", value: "60+" },
    { label: "Bài thi đã tạo", value: "120,000+" },
];
var values = [
    {
        icon: (0, jsx_runtime_1.jsx)(lucide_react_1.BookOpen, { className: "h-5 w-5" }),
        title: "Mở & Chuẩn hoá",
        desc: "Chuẩn dữ liệu câu hỏi thống nhất, dễ tái sử dụng giữa các lớp và khoa.",
    },
    {
        icon: (0, jsx_runtime_1.jsx)(lucide_react_1.ShieldCheck, { className: "h-5 w-5" }),
        title: "Tin cậy",
        desc: "Bảo mật người dùng, phân quyền vai trò rõ ràng (GV/SV/Quản trị).",
    },
    {
        icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Rocket, { className: "h-5 w-5" }),
        title: "Nhanh & Vui",
        desc: "Tạo đề trong vài phút, giao diện thân thiện, trải nghiệm mượt mà.",
    },
];
var team = [
    { name: "Phú Trần Minh", role: "Founder / Full-stack", avatar: "" },
    { name: "Nguyễn Văn A", role: "Backend Engineer", avatar: "" },
    { name: "Trần Thị B", role: "UI/UX Designer", avatar: "" },
];
function AboutPage() {
    var tileUrl = (0, react_1.useMemo)(function () {
        return encodeURIComponent("\n      <svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160' fill='none'>\n        <g stroke='#10b981' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>\n          <path d='M28 36h40a8 8 0 018 8v44H36a8 8 0 01-8-8V36z' opacity='0.7'/>\n          <path d='M28 52h48' opacity='0.6'/>\n          <rect x='96' y='28' width='36' height='28' rx='4' />\n          <path d='M100 36h18M100 44h18' opacity='0.6'/>\n        </g>\n      </svg>\n    ");
    }, []);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "min-h-screen bg-slate-50 dark:bg-slate-800", children: [(0, jsx_runtime_1.jsxs)("section", { className: "relative overflow-hidden", children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0  bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-400\r\n                  dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" }), (0, jsx_runtime_1.jsx)("div", { "aria-hidden": true, className: "pointer-events-none absolute inset-y-0 left-0 w-[120%] md:w-full opacity-10 dark:opacity-[0.15]", style: {
                            backgroundImage: "url(\"data:image/svg+xml;utf8,".concat(tileUrl, "\")"),
                            backgroundRepeat: "repeat",
                            backgroundSize: "160px 160px",
                            maskImage: "radial-gradient(1200px 400px at left center, #000 70%, transparent 100%)",
                            WebkitMaskImage: "radial-gradient(1200px 400px at left center, #000 70%, transparent 100%)",
                        } }), (0, jsx_runtime_1.jsx)("div", { className: "pointer-events-none absolute z-0 -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl dark:bg-emerald-400/20" }), (0, jsx_runtime_1.jsx)("div", { className: "pointer-events-none absolute z-0 -right-16 top-10 h-64 w-64 rounded-full bg-white/10 blur-2xl dark:bg-purple-400/20" }), (0, jsx_runtime_1.jsxs)(framer_motion_1.motion.div, { className: "relative z-10 text-center mx-auto max-w-6xl px-6 py-20", children: [(0, jsx_runtime_1.jsxs)("div", { className: "mb-3 inline-flex items-center gap-2 rounded-full\r\n                    bg-white/60 px-3 py-1 text-xs font-semibold\r\n                    text-emerald-900 ring-1 ring-emerald-300/50 backdrop-blur\r\n                    dark:bg-white/5 dark:text-white dark:ring-white/10", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Users2, { className: "h-4 w-4" }), "V\u1EC1 QuizUniverse"] }), (0, jsx_runtime_1.jsx)("h1", { className: "text-4xl font-black leading-tight text-white", children: "N\u1EC1n t\u1EA3ng ng\u00E2n h\u00E0ng & t\u1EA1o \u0111\u1EC1 thi hi\u1EC7n \u0111\u1EA1i" }), (0, jsx_runtime_1.jsx)("p", { className: "mt-3 text-white/90 dark:text-gray-300", children: "Gi\u00FAp gi\u1EA3ng vi\u00EAn chu\u1EA9n ho\u00E1 n\u1ED9i dung, sinh vi\u00EAn luy\u1EC7n t\u1EADp hi\u1EC7u qu\u1EA3 v\u00E0 nh\u00E0 tr\u01B0\u1EDDng qu\u1EA3n tr\u1ECB d\u1EC5 d\u00E0ng." })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "relative z-0", children: [(0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-2 gap-4 sm:grid-cols-4  mx-auto max-w-6xl px-6 pt-20", children: stats.map(function (s) { return ((0, jsx_runtime_1.jsxs)(framer_motion_1.motion.div, { className: "rounded-2xl border border-white/20 bg-white/10 p-4 text-center shadow backdrop-blur-md \r\n                    dark:border-gray-700 dark:bg-gray-800/70 dark:text-gray-100", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-xl font-bold text-gray-800 dark:text-white", children: s.value }), (0, jsx_runtime_1.jsx)("div", { className: "mt-1 text-xs text-gray-600 dark:text-gray-300", children: s.label })] }, s.label)); }) }), (0, jsx_runtime_1.jsx)("div", { className: "mt-14 grid gap-6 md:grid-cols-3  mx-auto max-w-6xl px-6", children: values.map(function (v, i) { return ((0, jsx_runtime_1.jsxs)(framer_motion_1.motion.div, { className: "rounded-2xl border border-white/20 bg-white/10 p-6 shadow-lg backdrop-blur-md\r\n                    dark:border-gray-700 dark:bg-gray-800/70 dark:text-gray-100", children: [(0, jsx_runtime_1.jsxs)("div", { className: "mb-3 inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-gray-800 ring-1 ring-white/20 \r\n                         dark:bg-white/10 dark:text-gray-200 dark:ring-white/15", children: [v.icon, (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold", children: v.title })] }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-700 dark:text-gray-300", children: v.desc })] }, i)); }) }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-14  mx-auto max-w-6xl px-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-200", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Trophy, { className: "h-5 w-5 text-amber-300" }), (0, jsx_runtime_1.jsx)("h2", { className: "text-xl font-semibold", children: "C\u1ED9t m\u1ED1c n\u1ED5i b\u1EADt" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "relative pl-6", children: [(0, jsx_runtime_1.jsx)("span", { className: "absolute left-2 top-0 h-full w-px bg-gray-300 dark:bg-gray-600" }), (0, jsx_runtime_1.jsxs)("ul", { className: "space-y-6 text-gray-700 dark:text-gray-300", children: [(0, jsx_runtime_1.jsxs)("li", { className: "relative", children: [(0, jsx_runtime_1.jsx)("span", { className: "absolute -left-[7px] top-1 grid h-3 w-3 place-items-center rounded-full bg-emerald-400 ring-4 ring-emerald-400/30" }), "2024 \u2014 Kh\u1EDFi t\u1EA1o d\u1EF1 \u00E1n, th\u1EED nghi\u1EC7m t\u1EA1i 2 khoa."] }), (0, jsx_runtime_1.jsxs)("li", { className: "relative", children: [(0, jsx_runtime_1.jsx)("span", { className: "absolute -left-[7px] top-1 grid h-3 w-3 place-items-center rounded-full bg-emerald-400 ring-4 ring-emerald-400/30" }), "2025 \u2014 Ra m\u1EAFt QuizUniverse 1.0, h\u1ED7 tr\u1EE3 t\u1EA1o \u0111\u1EC1 t\u1EEB t\u00E0i li\u1EC7u."] })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-16  mx-auto max-w-6xl px-6 pb-10", children: [(0, jsx_runtime_1.jsxs)("div", { className: "mb-6 flex items-center gap-2 text-gray-800 dark:text-gray-200", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Users2, { className: "h-5 w-5 text-amber-300" }), (0, jsx_runtime_1.jsx)("h2", { className: "text-xl font-semibold", children: "Nh\u00F3m ph\u00E1t tri\u1EC3n" })] }), (0, jsx_runtime_1.jsx)("div", { className: "grid gap-6 sm:grid-cols-2 md:grid-cols-3", children: team.map(function (m, i) { return ((0, jsx_runtime_1.jsxs)(framer_motion_1.motion.div, { className: "rounded-2xl border border-white/20 bg-white/10 p-5 shadow-lg backdrop-blur-md\r\n                      dark:border-gray-700 dark:bg-gray-800/70 dark:text-gray-100", children: [(0, jsx_runtime_1.jsxs)("div", { className: "mb-3 flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)("div", { className: "grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-400 text-white", children: m.name.charAt(0) }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { className: "font-semibold text-gray-800 dark:text-white", children: m.name }), (0, jsx_runtime_1.jsx)("div", { className: "text-xs text-gray-600 dark:text-gray-400", children: m.role })] })] }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-700 dark:text-gray-300", children: "\u0110am m\u00EA gi\u00E1o d\u1EE5c s\u1ED1 & tr\u1EA3i nghi\u1EC7m h\u1ECDc t\u1EADp l\u1EA5y ng\u01B0\u1EDDi d\u00F9ng l\u00E0m trung t\u00E2m." })] }, m.name)); }) })] })] })] }));
}
