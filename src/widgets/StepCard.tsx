// src/widgets/StepCard.tsx
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

interface StepCardProps {
  step: number;
  title: string;
  desc: string;
  className?: string;
}

export default function StepCard({ step, title, desc, icon, accent = "from-emerald-500 to-teal-400", isLast }: {
  step: number;
  title: string;
  desc: string;
  icon?: React.ReactNode;
  accent?: string;
  isLast?: boolean;
}) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className={`
    rounded-xl relative
    bg-white shadow-md p-6 transition hover:shadow-xl 
    dark:bg-slate-900 dark:border dark:border-emerald-900/40 dark:shadow-slate-800/50
   "}
  `}
    >
      <div
        className="
      mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full 
      bg-emerald-100 text-emerald-700 
      dark:bg-emerald-500/10 dark:text-emerald-300
    "
      >
        <span className="text-2xl font-bold">{step}</span>
      </div>

      {/* Icon + tiêu đề */}
      <div className="mb-2 flex items-center justify-center gap-4">
        <div
          className={`grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br ${accent} text-white shadow`}
        >
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-200">
          {title}
        </h3>
      </div>
      <p className="mt-2 text-center text-emerald-800/80 dark:text-slate-300/80">
        {desc}
      </p>

      {/* Mũi tên gợi hướng (chỉ hiện giữa các bước, desktop) */}
      {!isLast && (
        <div className="pointer-events-none absolute right-[-18px] top-1/2 hidden -translate-y-1/2 md:block">
          <svg width="40" height="40" viewBox="0 0 24 24" className="opacity-60 dark:opacity-70">
            <path
              d="M5 12h12m0 0l-4-4m4 4l-4 4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-emerald-500 dark:text-slate-400"
            />
          </svg>
        </div>
      )}
    </motion.div>

  );
}
