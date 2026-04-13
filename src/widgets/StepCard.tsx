// src/widgets/StepCard.tsx
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface StepCardProps {
  step: number;
  title: string;
  desc: string;
  icon?: React.ReactNode;
  accent?: string;
  isLast?: boolean;
  index?: number;
}

export default function StepCard({ 
  step, 
  title, 
  desc, 
  icon, 
  accent = "from-emerald-500 to-teal-400", 
  isLast = false,
  index = 0 
}: StepCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 160, 
        damping: 18,
        delay: index * 0.1
      }}
      whileHover={{ y: -8 }}
      className="
        relative group rounded-xl
        bg-white shadow-md p-6 transition-all duration-300
        hover:shadow-xl hover:bg-white/95
        dark:bg-slate-900 dark:border dark:border-emerald-900/40 
        dark:shadow-slate-800/50 dark:hover:bg-slate-900/95
        overflow-hidden
      "
    >
      {/* Gradient border effect */}
      <div
        aria-hidden
        className="
          pointer-events-none absolute inset-0 rounded-xl opacity-0
          group-hover:opacity-100 transition-opacity duration-500
          bg-gradient-to-r from-emerald-400/20 via-emerald-500/20 to-teal-400/20
          dark:from-emerald-500/20 dark:via-emerald-400/20 dark:to-teal-400/20
        "
      />

      {/* Shimmer effect */}
      <div
        aria-hidden
        className="
          pointer-events-none absolute -inset-full rounded-xl opacity-0
          group-hover:opacity-100 transition-opacity duration-700
          bg-gradient-to-r from-transparent via-white/30 to-transparent
          -skew-x-12
        "
        style={{
          animation: "shimmer 2s ease-in-out infinite",
        }}
      />

      {/* Corner decoration */}
      <div className="pointer-events-none absolute top-0 right-0 w-16 h-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-8 h-8 bg-emerald-500/5 dark:bg-emerald-400/5 rounded-bl-xl" />
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 w-16 h-16 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-8 h-8 bg-emerald-500/5 dark:bg-emerald-400/5 rounded-tr-xl" />
      </div>

      {/* Step number with animation */}
      <motion.div
        whileHover={{ scale: 1.05, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="
          mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full 
          bg-gradient-to-br from-emerald-100 to-emerald-50
          dark:from-emerald-500/20 dark:to-emerald-400/10
          text-emerald-700 dark:text-emerald-300
          shadow-md group-hover:shadow-lg transition-all duration-300
          relative
        "
      >
        <span className="text-2xl font-bold">{step}</span>
        {/* Decorative ring */}
        <div className="absolute inset-0 rounded-full border-2 border-emerald-200 dark:border-emerald-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.div>

      {/* Icon + title */}
      <motion.div 
        className="mb-3 flex items-center justify-center gap-3"
        whileHover={{ x: 4 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div
          className={`
            grid h-9 w-9 place-items-center rounded-lg 
            bg-gradient-to-br ${accent} text-white shadow-md
            group-hover:shadow-lg transition-all duration-300
            relative overflow-hidden
          `}
        >
          {icon}
          {/* Icon shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
        </div>
        <h3 className="text-lg font-semibold bg-gradient-to-r from-emerald-900 to-emerald-700 dark:from-emerald-200 dark:to-emerald-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
          {title}
        </h3>
        <Sparkles className="w-3.5 h-3.5 text-emerald-500 opacity-0 group-hover:opacity-100 transition-all duration-300" />
      </motion.div>

      {/* Decorative line */}
      <div className="w-16 h-0.5 bg-gradient-to-r from-emerald-200 to-teal-100 dark:from-emerald-800 dark:to-teal-700 rounded-full mx-auto mb-3 group-hover:w-24 transition-all duration-300" />

      {/* Description */}
      <p className="mt-2 text-center text-emerald-800/80 dark:text-slate-300/80 leading-relaxed group-hover:text-emerald-800 dark:group-hover:text-slate-200 transition-colors duration-300">
        {desc}
      </p>

      {/* Progress indicator at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-100 via-emerald-200 to-teal-100 dark:from-emerald-900 dark:via-emerald-800 dark:to-teal-900 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 dark:from-emerald-400 dark:to-teal-400"
          initial={{ width: "0%" }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      {/* Arrow between steps (chỉ hiện giữa các bước, desktop) */}
      {!isLast && (
        <div className="pointer-events-none absolute -right-5 top-1/2 hidden -translate-y-1/2 md:block z-10">
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut"
            }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" className="opacity-60 dark:opacity-70">
              <path
                d="M5 12h12m0 0l-4-4m4 4l-4 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-emerald-500 dark:text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-slate-300 transition-colors duration-300"
              />
            </svg>
          </motion.div>
        </div>
      )}

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
      `}</style>
    </motion.div>
  );
}