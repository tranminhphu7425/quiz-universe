"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Footer;
var jsx_runtime_1 = require("react/jsx-runtime");
// Auto-generated
var react_1 = require("react");
var framer_motion_1 = require("framer-motion");
var lucide_react_1 = require("lucide-react");
var quizuniverselogo_png_1 = require("@/assets/images/logo/quizuniverselogo.png");
var ThemeToggle_1 = require("@/shared/ui/ThemeToggle");
var Floatting_1 = require("@/shared/ui/Floatting");
/* -------------------------------- helpers -------------------------------- */
var cn = function () {
    var a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        a[_i] = arguments[_i];
    }
    return a.filter(Boolean).join(" ");
};
function Wobble(_a) {
    var children = _a.children, className = _a.className;
    return ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { className: className, whileHover: { rotate: [0, -3, 3, -2, 2, 0], transition: { duration: 0.6 } }, whileTap: { scale: 0.96 }, children: children }));
}
/* ------------------------------- component ------------------------------- */
function Footer(_a) {
    var _b = _a.groups, groups = _b === void 0 ? [
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
    ] : _b, onSubscribe = _a.onSubscribe;
    var _c = (0, react_1.useState)(""), email = _c[0], setEmail = _c[1];
    var _d = (0, react_1.useState)(false), sent = _d[0], setSent = _d[1];
    var _e = (0, react_1.useState)(false), loading = _e[0], setLoading = _e[1];
    function handleSubmit(e) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        e.preventDefault();
                        if (!email)
                            return [2 /*return*/];
                        setLoading(true);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 3, 4]);
                        return [4 /*yield*/, (onSubscribe === null || onSubscribe === void 0 ? void 0 : onSubscribe(email))];
                    case 2:
                        _a.sent();
                        setSent(true);
                        setEmail("");
                        return [3 /*break*/, 4];
                    case 3:
                        setLoading(false);
                        setTimeout(function () { return setSent(false); }, 2000);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    return ((0, jsx_runtime_1.jsx)("footer", { className: "relative overflow-hidden", children: (0, jsx_runtime_1.jsxs)("div", { className: "relative bg-gradient-to-b from-sky-50 to-white dark:from-slate-900 dark:to-slate-950", children: [(0, jsx_runtime_1.jsxs)("div", { className: "absolute inset-0 pointer-events-none", children: [(0, jsx_runtime_1.jsx)(Floatting_1.default, { delay: 0.4, duration: 10, className: "absolute left-8 top-6", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Sparkles, { className: "h-5 w-5 text-sky-400 dark:text-sky-300" }) }), (0, jsx_runtime_1.jsx)(Floatting_1.default, { delay: 1, duration: 9, distance: 18, className: "absolute right-10 top-10", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Heart, { className: "h-5 w-5 text-rose-400 dark:text-rose-300" }) }), (0, jsx_runtime_1.jsx)(Floatting_1.default, { delay: 1.6, duration: 8, distance: 16, className: "absolute right-1/3 bottom-6", children: (0, jsx_runtime_1.jsx)(lucide_react_1.ShieldCheck, { className: "h-5 w-5 text-emerald-500 dark:text-emerald-400" }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mx-auto max-w-7xl px-4 py-12", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)("img", { src: quizuniverselogo_png_1.default, className: "h-8 w-8", alt: "logo" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { className: "text-lg font-extrabold text-sky-900 dark:text-sky-100", children: "QuizUniverse" }), (0, jsx_runtime_1.jsx)("div", { className: "-mt-0.5 text-[10px] uppercase tracking-wider text-sky-600 dark:text-slate-400", children: "Cartoon Footer" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(Wobble, { children: (0, jsx_runtime_1.jsx)("a", { href: "#", className: "inline-flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sky-700 hover:bg-sky-200\r\n                             dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700", "aria-label": "GitHub", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Github, { className: "h-5 w-5" }) }) }), (0, jsx_runtime_1.jsx)(Wobble, { children: (0, jsx_runtime_1.jsx)("a", { href: "#", className: "inline-flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sky-700 hover:bg-sky-200\r\n                             dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700", "aria-label": "Twitter", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Twitter, { className: "h-5 w-5" }) }) }), (0, jsx_runtime_1.jsx)(Wobble, { children: (0, jsx_runtime_1.jsx)("a", { href: "#", className: "inline-flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sky-700 hover:bg-sky-200\r\n                             dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700", "aria-label": "Community", children: (0, jsx_runtime_1.jsx)(lucide_react_1.MessageCircle, { className: "h-5 w-5" }) }) }), (0, jsx_runtime_1.jsx)(Wobble, { children: (0, jsx_runtime_1.jsx)("a", { href: "mailto:hello@example.com", className: "inline-flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sky-700 hover:bg-sky-200\r\n                             dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700", "aria-label": "Email", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Mail, { className: "h-5 w-5" }) }) })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-4", children: groups.map(function (g) { return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { className: "text-sm font-bold text-sky-900 dark:text-sky-100", children: g.title }), (0, jsx_runtime_1.jsx)("ul", { className: "mt-3 space-y-2 text-sm text-sky-800/80 dark:text-slate-300", children: g.links.map(function (l) { return ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("a", __assign({ className: "hover:text-sky-900 dark:hover:text-sky-200", href: l.href }, (l.external ? { target: "_blank", rel: "noreferrer" } : {}), { children: l.label })) }, l.label)); }) })] }, g.title)); }) }), (0, jsx_runtime_1.jsxs)("div", { className: "relative mt-10", children: [(0, jsx_runtime_1.jsxs)(framer_motion_1.motion.div, { initial: { y: 16, opacity: 0 }, whileInView: { y: 0, opacity: 1 }, viewport: { once: true, amount: 0.4 }, transition: { type: "spring", stiffness: 140, damping: 16 }, className: "rounded-3xl border border-sky-200 bg-white p-4 shadow-sm\r\n                         dark:border-slate-700 dark:bg-slate-900", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2 text-sky-900 dark:text-slate-100", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Sparkles, { className: "h-5 w-5 text-sky-500 dark:text-sky-300" }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm font-medium", children: "Theo d\u00F5i b\u1EA3n tin c\u1EADp nh\u1EADt" })] }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, className: "flex w-full max-w-md items-center gap-2", children: [(0, jsx_runtime_1.jsx)("input", { type: "email", value: email, onChange: function (e) { return setEmail(e.target.value); }, placeholder: "you@example.com", className: "flex-1 rounded-xl border border-sky-200 bg-sky-50/60 px-3 py-2 text-sm outline-none\r\n                               placeholder:text-sky-400 focus:border-sky-300 focus:bg-white\r\n                               dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100\r\n                               dark:placeholder:text-slate-400 dark:focus:bg-slate-900", required: true }), (0, jsx_runtime_1.jsx)(Wobble, { children: (0, jsx_runtime_1.jsx)("button", { type: "submit", disabled: loading, className: "rounded-xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white shadow\r\n                                 hover:bg-sky-600 disabled:opacity-60", children: loading ? "Đang gửi…" : "Đăng ký" }) })] })] }), (0, jsx_runtime_1.jsx)(framer_motion_1.AnimatePresence, { children: sent && ((0, jsx_runtime_1.jsxs)(framer_motion_1.motion.div, { className: "mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700\r\n                               dark:bg-emerald-900/30 dark:text-emerald-300", initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -6 }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Send, { className: "h-3.5 w-3.5" }), " \u0110\u00E3 g\u1EEDi! H\u00E3y ki\u1EC3m tra email c\u1EE7a b\u1EA1n."] })) })] }), (0, jsx_runtime_1.jsx)(Floatting_1.default, { distance: 12, duration: 7, className: "pointer-events-none absolute -top-4 -left-4", children: (0, jsx_runtime_1.jsx)("div", { className: "rounded-xl bg-gradient-to-br from-amber-300 to-rose-300 p-2 shadow-lg -rotate-6", children: (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-black text-rose-700", children: "FUN!" }) }) }), (0, jsx_runtime_1.jsx)(Floatting_1.default, { distance: 10, duration: 8, className: "pointer-events-none absolute -bottom-4 -right-4", children: (0, jsx_runtime_1.jsx)("div", { className: "rounded-2xl bg-gradient-to-br from-emerald-300 to-sky-300 p-2 shadow-lg rotate-6", children: (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-black text-emerald-800", children: "WOW!" }) }) })] }), (0, jsx_runtime_1.jsx)("div", { className: "mt-8 grid gap-3 sm:grid-cols-3", children: [
                                { icon: (0, jsx_runtime_1.jsx)(lucide_react_1.BookOpen, { className: "h-4 w-4" }), label: "Tài liệu đầy đủ" },
                                { icon: (0, jsx_runtime_1.jsx)(lucide_react_1.ShieldCheck, { className: "h-4 w-4" }), label: "Bảo mật ưu tiên" },
                                { icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Sparkles, { className: "h-4 w-4" }), label: "Giao diện sinh động" },
                            ].map(function (b, i) { return ((0, jsx_runtime_1.jsxs)(framer_motion_1.motion.div, { whileHover: { y: -2 }, className: "inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1.5 text-[11px] font-semibold text-sky-700 ring-1 ring-sky-100\r\n                           dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700", children: [b.icon, b.label] }, i)); }) }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-8 flex flex-col items-center justify-between gap-3 border-t border-sky-100 pt-4 text-xs text-sky-700/80 sm:flex-row\r\n                          dark:border-slate-800 dark:text-slate-400", children: [(0, jsx_runtime_1.jsx)(ThemeToggle_1.default, {}), (0, jsx_runtime_1.jsxs)("div", { children: ["\u00A9 ", new Date().getFullYear(), " QuizUniverse. All rights reserved."] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)("a", { href: "#", className: "hover:text-sky-900 dark:hover:text-sky-200", children: "\u0110i\u1EC1u kho\u1EA3n" }), (0, jsx_runtime_1.jsx)("a", { href: "#", className: "hover:text-sky-900 dark:hover:text-sky-200", children: "B\u1EA3o m\u1EADt" }), (0, jsx_runtime_1.jsx)("a", { href: "#", className: "hover:text-sky-900 dark:hover:text-sky-200", children: "Cookies" })] })] })] })] }) }));
}
