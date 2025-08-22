"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SubjectPage;
var jsx_runtime_1 = require("react/jsx-runtime");
// Auto-generated
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var framer_motion_1 = require("framer-motion");
var lucide_react_1 = require("lucide-react");
var Floatting_1 = require("@/shared/ui/Floatting");
// ===== MOCK DATA (thay bằng fetch API của bạn) =====
var MOCK = [
    {
        id: "q1",
        subject: "Toán",
        chapter: "Hàm số",
        difficulty: "easy",
        type: "MCQ",
        tags: ["hàm số bậc nhất", "cơ bản"],
        content: "Cho hàm số y = ax + b (a ≠ 0). Tìm <i>hệ số góc</i> của đồ thị?",
        approved: true,
        updatedAt: "2025-08-10T08:30:00Z",
    },
    {
        id: "q2",
        subject: "Lịch sử Đảng",
        chapter: "Cương lĩnh 1930",
        difficulty: "medium",
        type: "TRUE_FALSE",
        tags: ["cương lĩnh", "1930"],
        content: "Cương lĩnh chính trị đầu tiên do Nguyễn Ái Quốc soạn thảo. (Đ/S)",
        approved: true,
        updatedAt: "2025-07-21T03:20:00Z",
    },
    {
        id: "q3",
        subject: "Vật lý",
        chapter: "Điện học",
        difficulty: "hard",
        type: "FILL_BLANK",
        tags: ["điện trở", "định luật Ôm"],
        content: "Điền vào chỗ trống: I = __ / R.",
        approved: false,
        updatedAt: "2025-08-15T13:00:00Z",
    },
    {
        id: "q4",
        subject: "Toán",
        chapter: "Xác suất",
        difficulty: "medium",
        type: "MCQ",
        tags: ["biến cố", "tổ hợp"],
        content: "Xác suất của biến cố chắc chắn là bao nhiêu?",
        approved: true,
        updatedAt: "2025-06-02T10:10:00Z",
    },
];
// Map màu theo độ khó
var DIFFICULTY_MAP = {
    easy: { text: "text-emerald-800 dark:text-emerald-100", bg: "bg-emerald-100 dark:bg-emerald-500/20", ring: "ring-emerald-200/70 dark:ring-emerald-500/30" },
    medium: { text: "text-amber-800 dark:text-amber-100", bg: "bg-amber-100 dark:bg-amber-500/20", ring: "ring-amber-200/70 dark:ring-amber-500/30" },
    hard: { text: "text-rose-800 dark:text-rose-100", bg: "bg-rose-100 dark:bg-rose-500/20", ring: "ring-rose-200/70 dark:ring-rose-500/30" },
};
function SubjectPage() {
    // ======= FILTER STATE =======
    var _a = (0, react_1.useState)(""), q = _a[0], setQ = _a[1];
    var _b = (0, react_1.useState)("all"), subject = _b[0], setSubject = _b[1];
    var _c = (0, react_1.useState)("all"), diff = _c[0], setDiff = _c[1];
    var _d = (0, react_1.useState)("all"), type = _d[0], setType = _d[1];
    var _e = (0, react_1.useState)(false), onlyApproved = _e[0], setOnlyApproved = _e[1];
    // ======= PAGINATION =======
    var _f = (0, react_1.useState)(1), page = _f[0], setPage = _f[1];
    var pageSize = 6;
    var subjects = (0, react_1.useMemo)(function () { return __spreadArray(["all"], Array.from(new Set(MOCK.map(function (m) { return m.subject; }))), true); }, []);
    var types = ["all", "MCQ", "TRUE_FALSE", "FILL_BLANK"];
    var diffs = ["all", "easy", "medium", "hard"];
    // ======= FILTERING =======
    var filtered = (0, react_1.useMemo)(function () {
        var kw = q.trim().toLowerCase();
        return MOCK.filter(function (item) {
            var _a;
            var okQ = !kw || (item.content.toLowerCase().includes(kw) ||
                item.subject.toLowerCase().includes(kw) ||
                ((_a = item.chapter) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(kw)) ||
                item.tags.some(function (t) { return t.toLowerCase().includes(kw); }));
            var okSubject = subject === "all" || item.subject === subject;
            var okDiff = diff === "all" || item.difficulty === diff;
            var okType = type === "all" || item.type === type;
            var okApproved = !onlyApproved || item.approved;
            return okQ && okSubject && okDiff && okType && okApproved;
        });
    }, [q, subject, diff, type, onlyApproved]);
    var totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    var pageData = filtered.slice((page - 1) * pageSize, page * pageSize);
    // reset page khi filter đổi
    var handleFilterChange = function (setter) { return function (v) {
        setter(v);
        setPage(1);
    }; };
    var tileUrl = (0, react_1.useMemo)(function () {
        return encodeURIComponent("\n        <svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160' fill='none'>\n          <g stroke='#10b981' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>\n            <path d='M28 36h40a8 8 0 018 8v44H36a8 8 0 01-8-8V36z' opacity='0.7'/>\n            <path d='M28 52h48' opacity='0.6'/>\n            <rect x='96' y='28' width='36' height='28' rx='4' />\n            <path d='M100 36h18M100 44h18' opacity='0.6'/>\n          </g>\n        </svg>\n      ");
    }, []);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "relative min-h-screen bg-slate-50 dark:bg-slate-950", children: [(0, jsx_runtime_1.jsxs)("section", { className: "relative overflow-hidden", children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0  bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-400\r\n                  dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" }), (0, jsx_runtime_1.jsx)("div", { "aria-hidden": true, className: "pointer-events-none absolute inset-y-0 left-0 w-[120%] md:w-full opacity-10 dark:opacity-[0.15]", style: {
                            backgroundImage: "url(\"data:image/svg+xml;utf8,".concat(tileUrl, "\")"),
                            backgroundRepeat: "repeat",
                            backgroundSize: "160px 160px",
                            maskImage: "radial-gradient(1200px 400px at left center, #000 70%, transparent 100%)",
                            WebkitMaskImage: "radial-gradient(1200px 400px at left center, #000 70%, transparent 100%)",
                        } }), (0, jsx_runtime_1.jsx)("div", { className: "pointer-events-none absolute z-0 -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl dark:bg-emerald-400/20" }), (0, jsx_runtime_1.jsx)("div", { className: "pointer-events-none absolute z-0 -right-16 top-10 h-64 w-64 rounded-full bg-white/10 blur-2xl dark:bg-purple-400/20" }), (0, jsx_runtime_1.jsxs)(framer_motion_1.motion.div, { className: "relative z-10 text-center mx-auto max-w-6xl px-6 py-20", children: [(0, jsx_runtime_1.jsxs)("div", { className: "mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center ", children: [(0, jsx_runtime_1.jsxs)("div", { className: "w-full lg:w-auto", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-3xl font-black leading-tight text-white text-center lg:text-left", children: "Ng\u00E2n h\u00E0ng c\u00E2u h\u1ECFi" }), (0, jsx_runtime_1.jsx)("p", { className: "mt-1 text-white/90 dark:text-gray-300 text-center lg:text-left ", children: "T\u00ECm ki\u1EBFm, l\u1ECDc theo m\u00F4n/ch\u01B0\u01A1ng/\u0111\u1ED9 kh\u00F3/lo\u1EA1i. T\u1EA1o \u0111\u1EC1 t\u1EEB nhi\u1EC1u ngu\u1ED3n." })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3 justify-center w-full lg:w-auto", children: [(0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { to: "/app/questions/import", className: "inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/30 hover:bg-white/15 dark:bg-white/5 dark:ring-white/10", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.FilePlus2, { className: "h-4 w-4" }), " Nh\u1EADp t\u1EEB t\u00E0i li\u1EC7u"] }), (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { to: "/app/questions/create", className: "inline-flex items-center gap-2 rounded-full bg-yellow-400 px-5 py-2 text-sm font-semibold text-emerald-950 shadow hover:brightness-105", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.PlusCircle, { className: "h-4 w-4" }), " Th\u00EAm c\u00E2u h\u1ECFi"] })] })] }), (0, jsx_runtime_1.jsx)(Floatting_1.default, { distance: 12, duration: 7, className: "pointer-events-none absolute top-16 left-8", children: (0, jsx_runtime_1.jsx)("div", { className: "rounded-xl bg-gradient-to-br from-amber-300 to-rose-300 px-3 py-1 shadow-lg -rotate-6", children: (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-black text-rose-700", children: "QUESTIONS" }) }) }), (0, jsx_runtime_1.jsx)(Floatting_1.default, { distance: 10, duration: 6, className: "pointer-events-none absolute top-16 right-10", children: (0, jsx_runtime_1.jsx)("div", { className: "rounded-full bg-gradient-to-br from-purple-400 to-indigo-400 p-3 shadow-xl rotate-12", children: (0, jsx_runtime_1.jsx)(lucide_react_1.BookOpen, { className: "h-4 w-4 text-white" }) }) })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "relative z-10 mx-auto max-w-7xl px-6 pb-20", children: [(0, jsx_runtime_1.jsxs)(framer_motion_1.motion.div, { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, className: "mb-6 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md dark:border-gray-700 dark:bg-gray-800/50", children: [(0, jsx_runtime_1.jsxs)("div", { className: "grid gap-3 md:grid-cols-5", children: [(0, jsx_runtime_1.jsxs)("div", { className: "md:col-span-2", children: [(0, jsx_runtime_1.jsx)("label", { className: "mb-1 block text-xs font-medium text-white/90 dark:text-gray-200", children: "T\u00ECm ki\u1EBFm" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2 rounded-xl bg-white/80 px-3 py-2 ring-1 ring-black/10 focus-within:ring-2 focus-within:ring-emerald-400 dark:bg-slate-900/70 dark:ring-white/10", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Search, { className: "h-4 w-4 text-emerald-600 dark:text-emerald-300" }), (0, jsx_runtime_1.jsx)("input", { value: q, onChange: function (e) { return handleFilterChange(setQ)(e.target.value); }, placeholder: "T\u1EEB kh\u00F3a: n\u1ED9i dung, m\u00F4n, tags\u2026", className: "w-full bg-transparent p-1 text-sm text-gray-800 placeholder:text-gray-500 focus:outline-none dark:text-gray-100 dark:placeholder:text-gray-400" })] })] }), (0, jsx_runtime_1.jsx)(SelectBox, { label: "M\u00F4n h\u1ECDc", value: subject, onChange: function (v) { return handleFilterChange(setSubject)(v); }, options: subjects }), (0, jsx_runtime_1.jsx)(SelectBox, { label: "Lo\u1EA1i c\u00E2u h\u1ECFi", value: type, onChange: function (v) { return handleFilterChange(setType)(v); }, options: types }), (0, jsx_runtime_1.jsx)(SelectBox, { label: "\u0110\u1ED9 kh\u00F3", value: diff, onChange: function (v) { return handleFilterChange(setDiff)(v); }, options: diffs })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-3 flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("label", { className: "inline-flex cursor-pointer items-center gap-2 text-xs text-gray-700 dark:text-gray-300", children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", checked: onlyApproved, onChange: function (e) { return handleFilterChange(setOnlyApproved)(e.target.checked); }, className: "h-4 w-4 rounded border-white/20 bg-white/20 text-emerald-500 focus:ring-emerald-400 dark:border-gray-600" }), "Ch\u1EC9 hi\u1EC3n th\u1ECB c\u00E2u h\u1ECFi \u0111\u00E3 ki\u1EC3m duy\u1EC7t"] }), (0, jsx_runtime_1.jsxs)("div", { className: "hidden items-center gap-2 text-xs text-white/90 dark:text-gray-300 md:flex", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Filter, { className: "h-4 w-4" }), " ", filtered.length, " k\u1EBFt qu\u1EA3"] })] })] }), filtered.length === 0 ? ((0, jsx_runtime_1.jsx)(EmptyState, {})) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: pageData.map(function (it) { return ((0, jsx_runtime_1.jsx)(QuestionCard, { q: it }, it.id)); }) }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-6 flex items-center justify-center gap-2", children: [(0, jsx_runtime_1.jsxs)("button", { onClick: function () { return setPage(function (p) { return Math.max(1, p - 1); }); }, disabled: page === 1, className: "inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-sm text-white ring-1 ring-white/20 disabled:opacity-50 dark:bg-white/5 dark:ring-white/10", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ChevronLeft, { className: "h-4 w-4" }), " Tr\u01B0\u1EDBc"] }), (0, jsx_runtime_1.jsxs)("span", { className: "text-sm text-white/90 dark:text-gray-300", children: ["Trang ", page, "/", totalPages] }), (0, jsx_runtime_1.jsxs)("button", { onClick: function () { return setPage(function (p) { return Math.min(totalPages, p + 1); }); }, disabled: page === totalPages, className: "inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-sm text-white ring-1 ring-white/20 disabled:opacity-50 dark:bg-white/5 dark:ring-white/10", children: ["Sau ", (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronRight, { className: "h-4 w-4" })] })] })] }))] })] }));
}
function SelectBox(_a) {
    var label = _a.label, value = _a.value, onChange = _a.onChange, options = _a.options;
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "mb-1 block text-xs font-medium text-white/90 dark:text-gray-200", children: label }), (0, jsx_runtime_1.jsx)("select", { value: value, onChange: function (e) { return onChange(e.target.value); }, className: "w-full rounded-xl bg-white/80 px-3 py-2 text-sm text-gray-800 ring-1 ring-black/10 focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:bg-slate-900/70 dark:text-gray-100 dark:ring-white/10", children: options.map(function (op) { return ((0, jsx_runtime_1.jsx)("option", { value: op, children: op === "all" ? "Tất cả" : op }, op)); }) })] }));
}
function QuestionCard(_a) {
    var q = _a.q;
    var d = DIFFICULTY_MAP[q.difficulty];
    return ((0, jsx_runtime_1.jsxs)(framer_motion_1.motion.div, { initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { type: "spring", stiffness: 160, damping: 16 }, whileHover: { y: -4, scale: 1.01 }, className: "rounded-xl border border-emerald-100/60 bg-white p-4 shadow-lg transition\r\n                 dark:border-slate-800 dark:bg-slate-900", children: [(0, jsx_runtime_1.jsxs)("div", { className: "mb-2 flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.BookOpen, { className: "h-4 w-4 text-emerald-600 dark:text-emerald-300" }), (0, jsx_runtime_1.jsxs)("div", { className: "text-sm font-semibold text-emerald-800 dark:text-emerald-200", children: [q.subject, q.chapter ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-emerald-900/70 dark:text-emerald-300/70", children: [" \u2022 ", q.chapter] }) : null] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "inline-flex items-center gap-2 rounded-full px-2 py-0.5 text-xs ring ".concat(d.bg, " ").concat(d.text, " ").concat(d.ring), children: [(0, jsx_runtime_1.jsx)("span", { className: "font-semibold", children: q.difficulty === "easy" ? "Dễ" : q.difficulty === "medium" ? "Trung bình" : "Khó" }), (0, jsx_runtime_1.jsx)("span", { className: "text-[10px] opacity-80", children: q.type === "MCQ" ? "MCQ" : q.type === "TRUE_FALSE" ? "Đ/S" : "Điền" })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "prose prose-sm max-w-none text-gray-700 dark:prose-invert dark:text-gray-300", dangerouslySetInnerHTML: { __html: truncateHtml(q.content, 160) } }), (0, jsx_runtime_1.jsx)("div", { className: "mt-3 flex flex-wrap items-center gap-2", children: q.tags.map(function (t) { return ((0, jsx_runtime_1.jsxs)("span", { className: "inline-flex items-center gap-1 rounded-md bg-emerald-100 px-2 py-0.5 text-xs text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-100", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Tag, { className: "h-3 w-3" }), " ", t] }, t)); }) }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-3 flex items-center justify-between text-xs", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2 text-emerald-900/70 dark:text-slate-300/70", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Clock, { className: "h-3.5 w-3.5" }), (0, jsx_runtime_1.jsxs)("span", { children: ["C\u1EADp nh\u1EADt: ", new Date(q.updatedAt).toLocaleDateString()] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs\r\n                        bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-100", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle2, { className: "h-3.5 w-3.5 ".concat(q.approved ? "" : "opacity-40") }), q.approved ? "Đã kiểm duyệt" : "Chờ duyệt"] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-4 flex items-center justify-end gap-2", children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/app/questions/".concat(q.id), className: "rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-emerald-900 ring-1 ring-emerald-200 hover:bg-emerald-50 dark:bg-white/5 dark:text-emerald-200 dark:ring-slate-700 dark:hover:bg-slate-800", children: "Xem chi ti\u1EBFt" }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/app/questions/".concat(q.id, "/edit"), className: "rounded-full bg-yellow-400 px-3 py-1.5 text-xs font-semibold text-emerald-950 shadow hover:brightness-105", children: "S\u1EEDa" })] })] }));
}
function EmptyState() {
    return ((0, jsx_runtime_1.jsx)("div", { className: "grid place-items-center rounded-2xl border border-dashed border-emerald-300/40 p-10 text-center dark:border-slate-700", children: (0, jsx_runtime_1.jsxs)("div", { className: "mx-auto max-w-md", children: [(0, jsx_runtime_1.jsxs)("div", { className: "mb-2 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-100", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Filter, { className: "h-4 w-4" }), " Kh\u00F4ng c\u00F3 k\u1EBFt qu\u1EA3 ph\u00F9 h\u1EE3p"] }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-emerald-900/80 dark:text-slate-300/80", children: "H\u00E3y th\u1EED t\u1EEB kh\u00F3a kh\u00E1c ho\u1EB7c b\u1ECF b\u1EDBt b\u1ED9 l\u1ECDc." }), (0, jsx_runtime_1.jsx)("div", { className: "mt-4 flex justify-center gap-2", children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { to: "/app/questions/create", className: "inline-flex items-center gap-2 rounded-full bg-yellow-400 px-4 py-2 text-sm font-semibold text-emerald-950 shadow hover:brightness-105", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.PlusCircle, { className: "h-4 w-4" }), " Th\u00EAm c\u00E2u h\u1ECFi"] }) })] }) }));
}
// cắt ngắn nội dung HTML mà không vỡ tag đơn giản (thô – đủ xài cho preview)
function truncateHtml(html, maxLen) {
    var txt = html.replace(/<[^>]+>/g, "");
    var s = txt.length > maxLen ? txt.slice(0, maxLen - 1) + "…" : txt;
    return s;
}
