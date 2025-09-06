import { useEffect, useMemo, useState } from "react";
import { FaDesktop, FaSun, FaMoon } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

type ThemeMode = "light" | "dark" | "system";

const MODES: { key: ThemeMode; label: string; Icon: React.ComponentType<React.SVGProps<SVGSVGElement>> }[] = [
  { key: "system", label: "System", Icon: FaDesktop },
  { key: "light",  label: "Light",  Icon: FaSun },
  { key: "dark",   label: "Dark",   Icon: FaMoon },
];

export default function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>("system"); // Default to system
  const [isMounted, setIsMounted] = useState(false); // Track if component mounted

  const isSystemDark = useMemo(
    () => window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches,
    []
  );

  // Initialize theme after mount to avoid SSR mismatch
  useEffect(() => {
    const stored = localStorage.getItem("theme") as ThemeMode | null;
    setTheme(stored === "light" || stored === "dark" ? stored : "system");
    setIsMounted(true);
  }, []);

  const setThemeAndStore = (mode: ThemeMode) => {
    setTheme(mode);
    localStorage.setItem("theme", mode);
  };

  // Apply theme changes
  useEffect(() => {
    if (!isMounted) return; // Don't apply until mounted

    const root = document.documentElement;
    const dark = 
      theme === "dark" || 
      (theme === "system" && isSystemDark);

    root.classList.add("theme-switch");
    if (dark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    const t = setTimeout(() => root.classList.remove("theme-switch"), 300);
    return () => clearTimeout(t);
  }, [theme, isSystemDark, isMounted]);

  // Watch system theme changes
  useEffect(() => {
    if (!isMounted) return;

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (theme === "system") {
        const root = document.documentElement;
        root.classList.add("theme-switch");
        
        if (isSystemDark) {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
        
        setTimeout(() => root.classList.remove("theme-switch"), 300);
      }
    };
    
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme, isSystemDark, isMounted]);

  if (!isMounted) {
    return (
      <div className="relative inline-flex rounded-full bg-slate-400 p-1 backdrop-blur supports-[backdrop-filter]:bg-slate-500/40">
        {MODES.map(({ key, Icon }) => (
          <button key={key} className="h-8 w-8 opacity-0">
            <Icon />
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="relative inline-flex rounded-full bg-slate-400 p-1 backdrop-blur supports-[backdrop-filter]:bg-slate-500/40">
      <motion.div
        layoutId="thumb"
        className="absolute top-1 bottom-1 w-8 rounded-full bg-sky-500"
        style={{
          left:
            theme === "system" ? 4 :
            theme === "light"  ? 36 : 68
        }}
        transition={{ type: "spring", stiffness: 450, damping: 30 }}
      />
      
      {MODES.map(({ key, Icon }) => {
        const active = theme === key;
        return (
          <button
            key={key}
            aria-label={`${key} mode`}
            onClick={() => setThemeAndStore(key)}
            className="relative z-10 grid h-8 w-8 place-items-center"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={active ? "on" : "off"}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                className={active ? "text-black dark:text-white" : "text-slate-300 hover:text-white"}
              >
                <Icon className={active ? "text-current" : "text-gray-800/50 dark:text-white/50"} />
              </motion.span>
            </AnimatePresence>
          </button>
        );
      })}
    </div>
  );
}