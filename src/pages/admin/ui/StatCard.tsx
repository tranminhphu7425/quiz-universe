import { motion } from "framer-motion";

export function StatCard({
  icon,
  label,
  value,
  color = "emerald",
  hint,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  color?: string;
  hint?: string;
}) {
  const colorMap: Record<string, string> = {
    slate: "bg-slate-100 text-slate-700 dark:bg-slate-500/20 dark:text-slate-200",
    indigo: "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-200",
    emerald: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200",
    amber: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200",
    green: "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-200",
    red: "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-200",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 140, damping: 16 }}
      className="rounded-xl border border-white/40 bg-white/90 p-3 shadow-sm backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/60"
    >
      <div className="flex items-center gap-2.5">
        <div
          className={`grid h-8 w-8 place-items-center rounded-lg ${
            colorMap[color] || colorMap.slate
          }`}
        >
          {icon}
        </div>
        <div className="min-w-0">
          <div className="text-xs text-slate-500 dark:text-slate-400">{label}</div>
          <div className="text-lg font-bold text-slate-900 dark:text-slate-100">{value}</div>
          {hint && <div className="text-[11px] text-slate-400 dark:text-slate-500">{hint}</div>}
        </div>
      </div>
    </motion.div>
  );
}
