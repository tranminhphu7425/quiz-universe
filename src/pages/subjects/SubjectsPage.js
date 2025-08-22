import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// Auto-generated
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Search, Filter, CheckCircle2, Clock, Tag, PlusCircle, ChevronLeft, ChevronRight, FilePlus2 } from "lucide-react";
import Floating from "@/shared/ui/Floatting";
// ===== MOCK DATA (thay bằng fetch API của bạn) =====
const MOCK = [
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
const DIFFICULTY_MAP = {
    easy: { text: "text-emerald-800 dark:text-emerald-100", bg: "bg-emerald-100 dark:bg-emerald-500/20", ring: "ring-emerald-200/70 dark:ring-emerald-500/30" },
    medium: { text: "text-amber-800 dark:text-amber-100", bg: "bg-amber-100 dark:bg-amber-500/20", ring: "ring-amber-200/70 dark:ring-amber-500/30" },
    hard: { text: "text-rose-800 dark:text-rose-100", bg: "bg-rose-100 dark:bg-rose-500/20", ring: "ring-rose-200/70 dark:ring-rose-500/30" },
};
export default function SubjectPage() {
    // ======= FILTER STATE =======
    const [q, setQ] = useState("");
    const [subject, setSubject] = useState("all");
    const [diff, setDiff] = useState("all");
    const [type, setType] = useState("all");
    const [onlyApproved, setOnlyApproved] = useState(false);
    // ======= PAGINATION =======
    const [page, setPage] = useState(1);
    const pageSize = 6;
    const subjects = useMemo(() => ["all", ...Array.from(new Set(MOCK.map(m => m.subject)))], []);
    const types = ["all", "MCQ", "TRUE_FALSE", "FILL_BLANK"];
    const diffs = ["all", "easy", "medium", "hard"];
    // ======= FILTERING =======
    const filtered = useMemo(() => {
        const kw = q.trim().toLowerCase();
        return MOCK.filter(item => {
            const okQ = !kw || (item.content.toLowerCase().includes(kw) ||
                item.subject.toLowerCase().includes(kw) ||
                (item.chapter?.toLowerCase().includes(kw)) ||
                item.tags.some(t => t.toLowerCase().includes(kw)));
            const okSubject = subject === "all" || item.subject === subject;
            const okDiff = diff === "all" || item.difficulty === diff;
            const okType = type === "all" || item.type === type;
            const okApproved = !onlyApproved || item.approved;
            return okQ && okSubject && okDiff && okType && okApproved;
        });
    }, [q, subject, diff, type, onlyApproved]);
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);
    // reset page khi filter đổi
    const handleFilterChange = (setter) => (v) => {
        setter(v);
        setPage(1);
    };
    const tileUrl = useMemo(() => encodeURIComponent(`
        <svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160' fill='none'>
          <g stroke='#10b981' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>
            <path d='M28 36h40a8 8 0 018 8v44H36a8 8 0 01-8-8V36z' opacity='0.7'/>
            <path d='M28 52h48' opacity='0.6'/>
            <rect x='96' y='28' width='36' height='28' rx='4' />
            <path d='M100 36h18M100 44h18' opacity='0.6'/>
          </g>
        </svg>
      `), []);
    return (_jsxs("div", { className: "relative min-h-screen bg-slate-50 dark:bg-slate-950", children: [_jsxs("section", { className: "relative overflow-hidden", children: [_jsx("div", { className: "absolute inset-0  bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-400\r\n                  dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" }), _jsx("div", { "aria-hidden": true, className: "pointer-events-none absolute inset-y-0 left-0 w-[120%] md:w-full opacity-10 dark:opacity-[0.15]", style: {
                            backgroundImage: `url("data:image/svg+xml;utf8,${tileUrl}")`,
                            backgroundRepeat: "repeat",
                            backgroundSize: "160px 160px",
                            maskImage: "radial-gradient(1200px 400px at left center, #000 70%, transparent 100%)",
                            WebkitMaskImage: "radial-gradient(1200px 400px at left center, #000 70%, transparent 100%)",
                        } }), _jsx("div", { className: "pointer-events-none absolute z-0 -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl dark:bg-emerald-400/20" }), _jsx("div", { className: "pointer-events-none absolute z-0 -right-16 top-10 h-64 w-64 rounded-full bg-white/10 blur-2xl dark:bg-purple-400/20" }), _jsxs(motion.div, { className: "relative z-10 text-center mx-auto max-w-6xl px-6 py-20", children: [_jsxs("div", { className: "mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center ", children: [_jsxs("div", { className: "w-full lg:w-auto", children: [_jsx("h1", { className: "text-3xl font-black leading-tight text-white text-center lg:text-left", children: "Ng\u00E2n h\u00E0ng c\u00E2u h\u1ECFi" }), _jsx("p", { className: "mt-1 text-white/90 dark:text-gray-300 text-center lg:text-left ", children: "T\u00ECm ki\u1EBFm, l\u1ECDc theo m\u00F4n/ch\u01B0\u01A1ng/\u0111\u1ED9 kh\u00F3/lo\u1EA1i. T\u1EA1o \u0111\u1EC1 t\u1EEB nhi\u1EC1u ngu\u1ED3n." })] }), _jsxs("div", { className: "flex items-center gap-3 justify-center w-full lg:w-auto", children: [_jsxs(Link, { to: "/app/questions/import", className: "inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/30 hover:bg-white/15 dark:bg-white/5 dark:ring-white/10", children: [_jsx(FilePlus2, { className: "h-4 w-4" }), " Nh\u1EADp t\u1EEB t\u00E0i li\u1EC7u"] }), _jsxs(Link, { to: "/app/questions/create", className: "inline-flex items-center gap-2 rounded-full bg-yellow-400 px-5 py-2 text-sm font-semibold text-emerald-950 shadow hover:brightness-105", children: [_jsx(PlusCircle, { className: "h-4 w-4" }), " Th\u00EAm c\u00E2u h\u1ECFi"] })] })] }), _jsx(Floating, { distance: 12, duration: 7, className: "pointer-events-none absolute top-16 left-8", children: _jsx("div", { className: "rounded-xl bg-gradient-to-br from-amber-300 to-rose-300 px-3 py-1 shadow-lg -rotate-6", children: _jsx("span", { className: "text-xs font-black text-rose-700", children: "QUESTIONS" }) }) }), _jsx(Floating, { distance: 10, duration: 6, className: "pointer-events-none absolute top-16 right-10", children: _jsx("div", { className: "rounded-full bg-gradient-to-br from-purple-400 to-indigo-400 p-3 shadow-xl rotate-12", children: _jsx(BookOpen, { className: "h-4 w-4 text-white" }) }) })] })] }), _jsxs("div", { className: "relative z-10 mx-auto max-w-7xl px-6 pb-20", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, className: "mb-6 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md dark:border-gray-700 dark:bg-gray-800/50", children: [_jsxs("div", { className: "grid gap-3 md:grid-cols-5", children: [_jsxs("div", { className: "md:col-span-2", children: [_jsx("label", { className: "mb-1 block text-xs font-medium text-white/90 dark:text-gray-200", children: "T\u00ECm ki\u1EBFm" }), _jsxs("div", { className: "flex items-center gap-2 rounded-xl bg-white/80 px-3 py-2 ring-1 ring-black/10 focus-within:ring-2 focus-within:ring-emerald-400 dark:bg-slate-900/70 dark:ring-white/10", children: [_jsx(Search, { className: "h-4 w-4 text-emerald-600 dark:text-emerald-300" }), _jsx("input", { value: q, onChange: (e) => handleFilterChange(setQ)(e.target.value), placeholder: "T\u1EEB kh\u00F3a: n\u1ED9i dung, m\u00F4n, tags\u2026", className: "w-full bg-transparent p-1 text-sm text-gray-800 placeholder:text-gray-500 focus:outline-none dark:text-gray-100 dark:placeholder:text-gray-400" })] })] }), _jsx(SelectBox, { label: "M\u00F4n h\u1ECDc", value: subject, onChange: (v) => handleFilterChange(setSubject)(v), options: subjects }), _jsx(SelectBox, { label: "Lo\u1EA1i c\u00E2u h\u1ECFi", value: type, onChange: (v) => handleFilterChange(setType)(v), options: types }), _jsx(SelectBox, { label: "\u0110\u1ED9 kh\u00F3", value: diff, onChange: (v) => handleFilterChange(setDiff)(v), options: diffs })] }), _jsxs("div", { className: "mt-3 flex items-center justify-between", children: [_jsxs("label", { className: "inline-flex cursor-pointer items-center gap-2 text-xs text-gray-700 dark:text-gray-300", children: [_jsx("input", { type: "checkbox", checked: onlyApproved, onChange: (e) => handleFilterChange(setOnlyApproved)(e.target.checked), className: "h-4 w-4 rounded border-white/20 bg-white/20 text-emerald-500 focus:ring-emerald-400 dark:border-gray-600" }), "Ch\u1EC9 hi\u1EC3n th\u1ECB c\u00E2u h\u1ECFi \u0111\u00E3 ki\u1EC3m duy\u1EC7t"] }), _jsxs("div", { className: "hidden items-center gap-2 text-xs text-white/90 dark:text-gray-300 md:flex", children: [_jsx(Filter, { className: "h-4 w-4" }), " ", filtered.length, " k\u1EBFt qu\u1EA3"] })] })] }), filtered.length === 0 ? (_jsx(EmptyState, {})) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: pageData.map((it) => (_jsx(QuestionCard, { q: it }, it.id))) }), _jsxs("div", { className: "mt-6 flex items-center justify-center gap-2", children: [_jsxs("button", { onClick: () => setPage((p) => Math.max(1, p - 1)), disabled: page === 1, className: "inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-sm text-white ring-1 ring-white/20 disabled:opacity-50 dark:bg-white/5 dark:ring-white/10", children: [_jsx(ChevronLeft, { className: "h-4 w-4" }), " Tr\u01B0\u1EDBc"] }), _jsxs("span", { className: "text-sm text-white/90 dark:text-gray-300", children: ["Trang ", page, "/", totalPages] }), _jsxs("button", { onClick: () => setPage((p) => Math.min(totalPages, p + 1)), disabled: page === totalPages, className: "inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-sm text-white ring-1 ring-white/20 disabled:opacity-50 dark:bg-white/5 dark:ring-white/10", children: ["Sau ", _jsx(ChevronRight, { className: "h-4 w-4" })] })] })] }))] })] }));
}
function SelectBox({ label, value, onChange, options, }) {
    return (_jsxs("div", { children: [_jsx("label", { className: "mb-1 block text-xs font-medium text-white/90 dark:text-gray-200", children: label }), _jsx("select", { value: value, onChange: (e) => onChange(e.target.value), className: "w-full rounded-xl bg-white/80 px-3 py-2 text-sm text-gray-800 ring-1 ring-black/10 focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:bg-slate-900/70 dark:text-gray-100 dark:ring-white/10", children: options.map((op) => (_jsx("option", { value: op, children: op === "all" ? "Tất cả" : op }, op))) })] }));
}
function QuestionCard({ q }) {
    const d = DIFFICULTY_MAP[q.difficulty];
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { type: "spring", stiffness: 160, damping: 16 }, whileHover: { y: -4, scale: 1.01 }, className: "rounded-xl border border-emerald-100/60 bg-white p-4 shadow-lg transition\r\n                 dark:border-slate-800 dark:bg-slate-900", children: [_jsxs("div", { className: "mb-2 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(BookOpen, { className: "h-4 w-4 text-emerald-600 dark:text-emerald-300" }), _jsxs("div", { className: "text-sm font-semibold text-emerald-800 dark:text-emerald-200", children: [q.subject, q.chapter ? _jsxs("span", { className: "text-xs text-emerald-900/70 dark:text-emerald-300/70", children: [" \u2022 ", q.chapter] }) : null] })] }), _jsxs("div", { className: `inline-flex items-center gap-2 rounded-full px-2 py-0.5 text-xs ring ${d.bg} ${d.text} ${d.ring}`, children: [_jsx("span", { className: "font-semibold", children: q.difficulty === "easy" ? "Dễ" : q.difficulty === "medium" ? "Trung bình" : "Khó" }), _jsx("span", { className: "text-[10px] opacity-80", children: q.type === "MCQ" ? "MCQ" : q.type === "TRUE_FALSE" ? "Đ/S" : "Điền" })] })] }), _jsx("div", { className: "prose prose-sm max-w-none text-gray-700 dark:prose-invert dark:text-gray-300", dangerouslySetInnerHTML: { __html: truncateHtml(q.content, 160) } }), _jsx("div", { className: "mt-3 flex flex-wrap items-center gap-2", children: q.tags.map((t) => (_jsxs("span", { className: "inline-flex items-center gap-1 rounded-md bg-emerald-100 px-2 py-0.5 text-xs text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-100", children: [_jsx(Tag, { className: "h-3 w-3" }), " ", t] }, t))) }), _jsxs("div", { className: "mt-3 flex items-center justify-between text-xs", children: [_jsxs("div", { className: "flex items-center gap-2 text-emerald-900/70 dark:text-slate-300/70", children: [_jsx(Clock, { className: "h-3.5 w-3.5" }), _jsxs("span", { children: ["C\u1EADp nh\u1EADt: ", new Date(q.updatedAt).toLocaleDateString()] })] }), _jsxs("div", { className: "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs\r\n                        bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-100", children: [_jsx(CheckCircle2, { className: `h-3.5 w-3.5 ${q.approved ? "" : "opacity-40"}` }), q.approved ? "Đã kiểm duyệt" : "Chờ duyệt"] })] }), _jsxs("div", { className: "mt-4 flex items-center justify-end gap-2", children: [_jsx(Link, { to: `/app/questions/${q.id}`, className: "rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-emerald-900 ring-1 ring-emerald-200 hover:bg-emerald-50 dark:bg-white/5 dark:text-emerald-200 dark:ring-slate-700 dark:hover:bg-slate-800", children: "Xem chi ti\u1EBFt" }), _jsx(Link, { to: `/app/questions/${q.id}/edit`, className: "rounded-full bg-yellow-400 px-3 py-1.5 text-xs font-semibold text-emerald-950 shadow hover:brightness-105", children: "S\u1EEDa" })] })] }));
}
function EmptyState() {
    return (_jsx("div", { className: "grid place-items-center rounded-2xl border border-dashed border-emerald-300/40 p-10 text-center dark:border-slate-700", children: _jsxs("div", { className: "mx-auto max-w-md", children: [_jsxs("div", { className: "mb-2 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-100", children: [_jsx(Filter, { className: "h-4 w-4" }), " Kh\u00F4ng c\u00F3 k\u1EBFt qu\u1EA3 ph\u00F9 h\u1EE3p"] }), _jsx("p", { className: "text-sm text-emerald-900/80 dark:text-slate-300/80", children: "H\u00E3y th\u1EED t\u1EEB kh\u00F3a kh\u00E1c ho\u1EB7c b\u1ECF b\u1EDBt b\u1ED9 l\u1ECDc." }), _jsx("div", { className: "mt-4 flex justify-center gap-2", children: _jsxs(Link, { to: "/app/questions/create", className: "inline-flex items-center gap-2 rounded-full bg-yellow-400 px-4 py-2 text-sm font-semibold text-emerald-950 shadow hover:brightness-105", children: [_jsx(PlusCircle, { className: "h-4 w-4" }), " Th\u00EAm c\u00E2u h\u1ECFi"] }) })] }) }));
}
// cắt ngắn nội dung HTML mà không vỡ tag đơn giản (thô – đủ xài cho preview)
function truncateHtml(html, maxLen) {
    const txt = html.replace(/<[^>]+>/g, "");
    const s = txt.length > maxLen ? txt.slice(0, maxLen - 1) + "…" : txt;
    return s;
}
