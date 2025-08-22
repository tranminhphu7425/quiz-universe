import { jsx as _jsx } from "react/jsx-runtime";
// src/app/providers/ThemeProvider.tsx
import { useEffect, useState, useContext, createContext } from "react";
const ThemeContext = createContext(undefined);
export function ThemeProvider({ children }) {
    const [theme, setThemeState] = useState("light");
    useEffect(() => {
        const saved = localStorage.getItem("quiz-theme");
        if (saved) {
            setThemeState(saved);
            document.documentElement.classList.toggle("dark", saved === "dark");
        }
        else {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            setThemeState(prefersDark ? "dark" : "light");
            document.documentElement.classList.toggle("dark", prefersDark);
        }
    }, []);
    const setTheme = (t) => {
        setThemeState(t);
        localStorage.setItem("quiz-theme", t);
        document.documentElement.classList.toggle("dark", t === "dark");
    };
    const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
    return (_jsx(ThemeContext.Provider, { value: { theme, toggleTheme, setTheme }, children: children }));
}
export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx)
        throw new Error("useTheme must be used within <ThemeProvider>");
    return ctx;
}
