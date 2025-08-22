"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ThemeToggle;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var fa_1 = require("react-icons/fa");
var framer_motion_1 = require("framer-motion");
var MODES = [
    { key: "system", label: "System", Icon: fa_1.FaDesktop },
    { key: "light", label: "Light", Icon: fa_1.FaSun },
    { key: "dark", label: "Dark", Icon: fa_1.FaMoon },
];
function ThemeToggle() {
    var _a = (0, react_1.useState)("system"), theme = _a[0], setTheme = _a[1]; // Default to system
    var _b = (0, react_1.useState)(false), isMounted = _b[0], setIsMounted = _b[1]; // Track if component mounted
    var isSystemDark = (0, react_1.useMemo)(function () { return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches; }, []);
    // Initialize theme after mount to avoid SSR mismatch
    (0, react_1.useEffect)(function () {
        var stored = localStorage.getItem("theme");
        setTheme(stored === "light" || stored === "dark" ? stored : "system");
        setIsMounted(true);
    }, []);
    var setThemeAndStore = function (mode) {
        setTheme(mode);
        localStorage.setItem("theme", mode);
    };
    // Apply theme changes
    (0, react_1.useEffect)(function () {
        if (!isMounted)
            return; // Don't apply until mounted
        var root = document.documentElement;
        var dark = theme === "dark" ||
            (theme === "system" && isSystemDark);
        root.classList.add("theme-switch");
        if (dark) {
            root.classList.add("dark");
        }
        else {
            root.classList.remove("dark");
        }
        var t = setTimeout(function () { return root.classList.remove("theme-switch"); }, 300);
        return function () { return clearTimeout(t); };
    }, [theme, isSystemDark, isMounted]);
    // Watch system theme changes
    (0, react_1.useEffect)(function () {
        if (!isMounted)
            return;
        var mq = window.matchMedia("(prefers-color-scheme: dark)");
        var handler = function () {
            if (theme === "system") {
                var root_1 = document.documentElement;
                root_1.classList.add("theme-switch");
                if (isSystemDark) {
                    root_1.classList.add("dark");
                }
                else {
                    root_1.classList.remove("dark");
                }
                setTimeout(function () { return root_1.classList.remove("theme-switch"); }, 300);
            }
        };
        mq.addEventListener("change", handler);
        return function () { return mq.removeEventListener("change", handler); };
    }, [theme, isSystemDark, isMounted]);
    if (!isMounted) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "relative inline-flex rounded-full bg-slate-400 p-1 backdrop-blur supports-[backdrop-filter]:bg-slate-500/40", children: MODES.map(function (_a) {
                var key = _a.key, Icon = _a.Icon;
                return ((0, jsx_runtime_1.jsx)("button", { className: "h-8 w-8 opacity-0", children: (0, jsx_runtime_1.jsx)(Icon, {}) }, key));
            }) }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "relative inline-flex rounded-full bg-slate-400 p-1 backdrop-blur supports-[backdrop-filter]:bg-slate-500/40", children: [(0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { layoutId: "thumb", className: "absolute top-1 bottom-1 w-8 rounded-full bg-sky-500", style: {
                    left: theme === "system" ? 4 :
                        theme === "light" ? 36 : 68
                }, transition: { type: "spring", stiffness: 450, damping: 30 } }), MODES.map(function (_a) {
                var key = _a.key, Icon = _a.Icon;
                var active = theme === key;
                return ((0, jsx_runtime_1.jsx)("button", { "aria-label": "".concat(key, " mode"), onClick: function () { return setThemeAndStore(key); }, className: "relative z-10 grid h-8 w-8 place-items-center", children: (0, jsx_runtime_1.jsx)(framer_motion_1.AnimatePresence, { mode: "wait", initial: false, children: (0, jsx_runtime_1.jsx)(framer_motion_1.motion.span, { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.8 }, transition: { duration: 0.15 }, className: active ? "text-black dark:text-white" : "text-slate-300 hover:text-white", children: (0, jsx_runtime_1.jsx)(Icon, { className: active ? "text-current" : "text-gray-800/50 dark:text-white/50" }) }, active ? "on" : "off") }) }, key));
            })] }));
}
