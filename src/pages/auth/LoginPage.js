"use strict";
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
exports.default = LoginPage;
var jsx_runtime_1 = require("react/jsx-runtime");
// Auto-generated
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var framer_motion_1 = require("framer-motion");
var lucide_react_1 = require("lucide-react");
var Floatting_1 = require("@/shared/ui/Floatting");
var AuthProvider_1 = require("@/app/providers/AuthProvider");
function LoginPage() {
    var _this = this;
    var _a;
    var _b = (_a = AuthProvider_1.useAuth === null || AuthProvider_1.useAuth === void 0 ? void 0 : (0, AuthProvider_1.useAuth)()) !== null && _a !== void 0 ? _a : { login: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); }); }, loading: false }, login = _b.login, loading = _b.loading;
    var _c = (0, react_1.useState)(""), email = _c[0], setEmail = _c[1];
    var _d = (0, react_1.useState)(""), password = _d[0], setPassword = _d[1];
    var _e = (0, react_1.useState)(true), remember = _e[0], setRemember = _e[1];
    var _f = (0, react_1.useState)(null), error = _f[0], setError = _f[1];
    // SVG tile giống HomePage để đồng bộ họa tiết nền
    var tileUrl = (0, react_1.useMemo)(function () {
        return encodeURIComponent("\n      <svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160' fill='none'>\n        <g stroke='#10b981' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>\n          <path d='M28 36h40a8 8 0 018 8v44H36a8 8 0 01-8-8V36z' opacity='0.7'/>\n          <path d='M28 52h48' opacity='0.6'/>\n          <rect x='96' y='28' width='36' height='28' rx='4' />\n          <path d='M100 36h18M100 44h18' opacity='0.6'/>\n          <path d='M120 36l6 6M126 36l-6 6' />\n          <path d='M40 116l8 4l8-4l-2 9l6 6l-9 1l-3 8l-3-8l-9-1l6-6z' />\n          <path d='M112 100c10 0 20-6 20-14v-6c-7 2-13 3-20 3s-13-1-20-3v6c0 8 10 14 20 14z' />\n        </g>\n      </svg>\n    ");
    }, []);
    var onSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var err_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    e.preventDefault();
                    setError(null);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    // Tùy backend: login(email, password, { remember })
                    return [4 /*yield*/, (login === null || login === void 0 ? void 0 : login(email, password, { remember: remember }))];
                case 2:
                    // Tùy backend: login(email, password, { remember })
                    _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _b.sent();
                    setError((_a = err_1 === null || err_1 === void 0 ? void 0 : err_1.message) !== null && _a !== void 0 ? _a : "Đăng nhập thất bại. Vui lòng thử lại.");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "relative min-h-screen overflow-hidden bg-slate-50 dark:bg-slate-950", children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" }), (0, jsx_runtime_1.jsx)("div", { "aria-hidden": true, className: "pointer-events-none absolute inset-y-0 left-0 w-[120%] md:w-full opacity-10", style: {
                    backgroundImage: "url(\"data:image/svg+xml;utf8,".concat(tileUrl, "\")"),
                    backgroundRepeat: "repeat",
                    backgroundSize: "160px 160px",
                    maskImage: "radial-gradient(1200px 400px at left center, #000 70%, transparent 100%)",
                    WebkitMaskImage: "radial-gradient(1200px 400px at left center, #000 70%, transparent 100%)",
                } }), (0, jsx_runtime_1.jsx)("div", { className: "pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl dark:bg-emerald-400/10" }), (0, jsx_runtime_1.jsx)("div", { className: "pointer-events-none absolute -right-16 top-10 h-64 w-64 rounded-full bg-white/10 blur-2xl dark:bg-purple-400/10" }), (0, jsx_runtime_1.jsx)(Floatting_1.default, { distance: 12, duration: 7, className: "pointer-events-none absolute top-16 left-8", children: (0, jsx_runtime_1.jsx)("div", { className: "rounded-xl bg-gradient-to-br from-amber-300 to-rose-300 px-3 py-1 shadow-lg -rotate-6", children: (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-black text-rose-700", children: "HELLO!" }) }) }), (0, jsx_runtime_1.jsx)(Floatting_1.default, { distance: 10, duration: 6, className: "pointer-events-none absolute bottom-20 right-10", children: (0, jsx_runtime_1.jsx)("div", { className: "rounded-full bg-gradient-to-br from-purple-400 to-indigo-400 p-3 shadow-xl rotate-12", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Sparkles, { className: "h-4 w-4 text-white" }) }) }), (0, jsx_runtime_1.jsx)(Floatting_1.default, { distance: 9, duration: 9, className: "pointer-events-none absolute bottom-6 left-10", children: (0, jsx_runtime_1.jsx)("div", { className: "rounded-full bg-gradient-to-tr from-pink-300 to-yellow-300 p-2 shadow-lg -rotate-12", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Heart, { className: "h-4 w-4 text-pink-700" }) }) }), (0, jsx_runtime_1.jsx)("div", { className: "relative z-10 mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-16", children: (0, jsx_runtime_1.jsxs)(framer_motion_1.motion.div, { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { type: "spring", stiffness: 160, damping: 18 }, className: "w-full max-w-md", children: [(0, jsx_runtime_1.jsxs)("div", { className: "mb-6 text-center", children: [(0, jsx_runtime_1.jsxs)("div", { className: "mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/20 backdrop-blur dark:bg-white/5 dark:ring-white/10", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Sparkles, { className: "h-4 w-4" }), "QuizUniverse \u2022 \u0110\u0103ng nh\u1EADp"] }), (0, jsx_runtime_1.jsx)("h1", { className: "text-4xl font-black leading-tight text-white", children: (0, jsx_runtime_1.jsx)("span", { className: "\r\n      bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 \r\n      bg-clip-text text-transparent glow-text font-['Be Vietnam Pro']\r\n      dark:drop-shadow-none\r\n    ", style: {
                                            textShadow: "0px 2px 2px rgba(0,0,0,0.1)" // chỉ áp cho light
                                        }, children: "Ch\u00E0o m\u1EEBng tr\u1EDF l\u1EA1i" }) }), (0, jsx_runtime_1.jsx)("p", { className: "mt-2 text-white/90 dark:text-gray-300", children: "Ti\u1EBFp t\u1EE5c v\u1EDBi t\u00E0i kho\u1EA3n c\u1EE7a b\u1EA1n \u0111\u1EC3 truy c\u1EADp ng\u00E2n h\u00E0ng c\u00E2u h\u1ECFi." })] }), (0, jsx_runtime_1.jsxs)(framer_motion_1.motion.form, { onSubmit: onSubmit, initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.05 }, className: "rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-md\r\n                       dark:border-gray-700 dark:bg-gray-800/50", children: [(0, jsx_runtime_1.jsx)("label", { className: "mb-2 block text-sm font-medium text-white dark:text-gray-200", children: "Email" }), (0, jsx_runtime_1.jsxs)("div", { className: "mb-4 flex items-center gap-2 rounded-xl bg-white/80 px-3 py-2 ring-1 ring-black/10 focus-within:ring-2 focus-within:ring-emerald-400 dark:bg-slate-900/70 dark:ring-white/10", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Mail, { className: "h-4 w-4 text-emerald-600 dark:text-emerald-300" }), (0, jsx_runtime_1.jsx)("input", { type: "email", required: true, placeholder: "you@example.com", className: "w-full bg-transparent p-2 text-sm text-gray-800 placeholder:text-gray-500 focus:outline-none dark:text-gray-100 dark:placeholder:text-gray-400", value: email, onChange: function (e) { return setEmail(e.target.value); }, autoComplete: "email" })] }), (0, jsx_runtime_1.jsx)("label", { className: "mb-2 block text-sm font-medium text-white dark:text-gray-200", children: "M\u1EADt kh\u1EA9u" }), (0, jsx_runtime_1.jsxs)("div", { className: "mb-2 flex items-center gap-2 rounded-xl bg-white/80 px-3 py-2 ring-1 ring-black/10 focus-within:ring-2 focus-within:ring-emerald-400 dark:bg-slate-900/70 dark:ring-white/10", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Lock, { className: "h-4 w-4 text-emerald-600 dark:text-emerald-300" }), (0, jsx_runtime_1.jsx)("input", { type: "password", required: true, placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", className: "w-full bg-transparent p-2 text-sm text-gray-800 placeholder:text-gray-500 focus:outline-none dark:text-gray-100 dark:placeholder:text-gray-400", value: password, onChange: function (e) { return setPassword(e.target.value); }, autoComplete: "current-password" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mb-4 flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("label", { className: "inline-flex cursor-pointer items-center gap-2 text-xs text-white/90 dark:text-gray-300", children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", checked: remember, onChange: function (e) { return setRemember(e.target.checked); }, className: "h-4 w-4 rounded border-white/20 bg-white/20 text-emerald-500 focus:ring-emerald-400 dark:border-gray-600" }), "Ghi nh\u1EDB \u0111\u0103ng nh\u1EADp"] }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/forgot-password", className: "text-xs font-medium text-emerald-100 underline-offset-2 hover:underline dark:text-emerald-300", children: "Qu\u00EAn m\u1EADt kh\u1EA9u?" })] }), error && ((0, jsx_runtime_1.jsx)("div", { className: "mb-4 rounded-lg bg-rose-500/15 px-3 py-2 text-sm text-rose-100 ring-1 ring-rose-500/30", children: error })), (0, jsx_runtime_1.jsxs)(framer_motion_1.motion.button, { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, type: "submit", disabled: loading, className: "mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full\r\n                         bg-yellow-400 px-6 py-2.5 font-semibold text-emerald-950 shadow\r\n                         hover:brightness-105 disabled:opacity-70 disabled:cursor-not-allowed", children: [loading ? "Đang đăng nhập..." : "Đăng nhập", (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, { className: "h-4 w-4" })] }), (0, jsx_runtime_1.jsx)("div", { className: "my-4 h-px bg-white/20 dark:bg-white/10" }), (0, jsx_runtime_1.jsxs)("p", { className: "text-center text-sm text-white/90 dark:text-gray-300", children: ["Ch\u01B0a c\u00F3 t\u00E0i kho\u1EA3n?", " ", (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/register", className: "font-semibold text-amber-300 underline-offset-2 hover:underline", children: "\u0110\u0103ng k\u00FD ngay" })] })] })] }) })] }));
}
