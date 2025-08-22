import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import { FaDesktop, FaSun, FaMoon } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
const MODES = [
    { key: "system", label: "System", Icon: FaDesktop },
    { key: "light", label: "Light", Icon: FaSun },
    { key: "dark", label: "Dark", Icon: FaMoon },
];
export default function ThemeToggle() {
    const [theme, setTheme] = useState("system"); // Default to system
    const [isMounted, setIsMounted] = useState(false); // Track if component mounted
    const isSystemDark = useMemo(() => window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches, []);
    // Initialize theme after mount to avoid SSR mismatch
    useEffect(() => {
        const stored = localStorage.getItem("theme");
        setTheme(stored === "light" || stored === "dark" ? stored : "system");
        setIsMounted(true);
    }, []);
    const setThemeAndStore = (mode) => {
        setTheme(mode);
        localStorage.setItem("theme", mode);
    };
    // Apply theme changes
    useEffect(() => {
        if (!isMounted)
            return; // Don't apply until mounted
        const root = document.documentElement;
        const dark = theme === "dark" ||
            (theme === "system" && isSystemDark);
        root.classList.add("theme-switch");
        if (dark) {
            root.classList.add("dark");
        }
        else {
            root.classList.remove("dark");
        }
        const t = setTimeout(() => root.classList.remove("theme-switch"), 300);
        return () => clearTimeout(t);
    }, [theme, isSystemDark, isMounted]);
    // Watch system theme changes
    useEffect(() => {
        if (!isMounted)
            return;
        const mq = window.matchMedia("(prefers-color-scheme: dark)");
        const handler = () => {
            if (theme === "system") {
                const root = document.documentElement;
                root.classList.add("theme-switch");
                if (isSystemDark) {
                    root.classList.add("dark");
                }
                else {
                    root.classList.remove("dark");
                }
                setTimeout(() => root.classList.remove("theme-switch"), 300);
            }
        };
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, [theme, isSystemDark, isMounted]);
    if (!isMounted) {
        return (_jsx("div", { className: "relative inline-flex rounded-full bg-slate-400 p-1 backdrop-blur supports-[backdrop-filter]:bg-slate-500/40", children: MODES.map(({ key, Icon }) => (_jsx("button", { className: "h-8 w-8 opacity-0", children: _jsx(Icon, {}) }, key))) }));
    }
    return (_jsxs("div", { className: "relative inline-flex rounded-full bg-slate-400 p-1 backdrop-blur supports-[backdrop-filter]:bg-slate-500/40", children: [_jsx(motion.div, { layoutId: "thumb", className: "absolute top-1 bottom-1 w-8 rounded-full bg-sky-500", style: {
                    left: theme === "system" ? 4 :
                        theme === "light" ? 36 : 68
                }, transition: { type: "spring", stiffness: 450, damping: 30 } }), MODES.map(({ key, Icon }) => {
                const active = theme === key;
                return (_jsx("button", { "aria-label": `${key} mode`, onClick: () => setThemeAndStore(key), className: "relative z-10 grid h-8 w-8 place-items-center", children: _jsx(AnimatePresence, { mode: "wait", initial: false, children: _jsx(motion.span, { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.8 }, transition: { duration: 0.15 }, className: active ? "text-black dark:text-white" : "text-slate-300 hover:text-white", children: _jsx(Icon, { className: active ? "text-current" : "text-gray-800/50 dark:text-white/50" }) }, active ? "on" : "off") }) }, key));
            })] }));
}
