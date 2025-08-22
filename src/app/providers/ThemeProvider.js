"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeProvider = ThemeProvider;
exports.useTheme = useTheme;
var jsx_runtime_1 = require("react/jsx-runtime");
// src/app/providers/ThemeProvider.tsx
var react_1 = require("react");
var ThemeContext = (0, react_1.createContext)(undefined);
function ThemeProvider(_a) {
    var children = _a.children;
    var _b = (0, react_1.useState)("light"), theme = _b[0], setThemeState = _b[1];
    (0, react_1.useEffect)(function () {
        var saved = localStorage.getItem("quiz-theme");
        if (saved) {
            setThemeState(saved);
            document.documentElement.classList.toggle("dark", saved === "dark");
        }
        else {
            var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            setThemeState(prefersDark ? "dark" : "light");
            document.documentElement.classList.toggle("dark", prefersDark);
        }
    }, []);
    var setTheme = function (t) {
        setThemeState(t);
        localStorage.setItem("quiz-theme", t);
        document.documentElement.classList.toggle("dark", t === "dark");
    };
    var toggleTheme = function () { return setTheme(theme === "light" ? "dark" : "light"); };
    return ((0, jsx_runtime_1.jsx)(ThemeContext.Provider, { value: { theme: theme, toggleTheme: toggleTheme, setTheme: setTheme }, children: children }));
}
function useTheme() {
    var ctx = (0, react_1.useContext)(ThemeContext);
    if (!ctx)
        throw new Error("useTheme must be used within <ThemeProvider>");
    return ctx;
}
