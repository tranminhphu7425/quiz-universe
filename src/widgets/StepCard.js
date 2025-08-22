import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/widgets/StepCard.tsx
import { motion } from "framer-motion";
export default function StepCard({ step, title, desc, icon, accent = "from-emerald-500 to-teal-400", isLast }) {
    return (_jsxs(motion.div, { whileHover: { y: -3 }, className: `
    rounded-xl relative
    bg-white shadow-md p-6 transition hover:shadow-xl 
    dark:bg-slate-900 dark:border dark:border-emerald-900/40 dark:shadow-slate-800/50
   "}
  `, children: [_jsx("div", { className: "\r\n      mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full \r\n      bg-emerald-100 text-emerald-700 \r\n      dark:bg-emerald-500/10 dark:text-emerald-300\r\n    ", children: _jsx("span", { className: "text-2xl font-bold", children: step }) }), _jsxs("div", { className: "mb-2 flex items-center justify-center gap-4", children: [_jsx("div", { className: `grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br ${accent} text-white shadow`, children: icon }), _jsx("h3", { className: "text-lg font-semibold text-emerald-900 dark:text-emerald-200", children: title })] }), _jsx("p", { className: "mt-2 text-center text-emerald-800/80 dark:text-slate-300/80", children: desc }), !isLast && (_jsx("div", { className: "pointer-events-none absolute right-[-18px] top-1/2 hidden -translate-y-1/2 md:block", children: _jsx("svg", { width: "40", height: "40", viewBox: "0 0 24 24", className: "opacity-60 dark:opacity-70", children: _jsx("path", { d: "M5 12h12m0 0l-4-4m4 4l-4 4", fill: "none", stroke: "currentColor", strokeWidth: "2", className: "text-emerald-500 dark:text-slate-400" }) }) }))] }));
}
