import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";


function FeatureCard({
  title,
  description,
  to,
  cta,
  icon,
}: {
  title: string;
  description: string;
  to: string;
  cta: string;
  icon: React.ReactNode;
}) {
  return (
    <motion.div
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ type: "spring", stiffness: 160, damping: 18 }}

  className="
    relative group rounded-2xl border p-5 shadow-sm
    border-emerald-100 bg-white
    hover:shadow-md hover:bg-white/95
    dark:border-emerald-900/40 dark:bg-slate-900/70 dark:hover:bg-slate-900
    transition-colors  
  "
>
  {/* viền sáng nhẹ khi hover (chỉ trang trí) */}
  <div
    aria-hidden
    className="
      pointer-events-none absolute inset-0 rounded-2xl opacity-0
      group-hover:opacity-100 transition-opacity
      bg-gradient-to-br from-emerald-200/10 via-transparent to-sky-300/10
      dark:from-emerald-500/10 dark:to-sky-500/10
    "
  />

  <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-200">
    {icon}
    <div className="text-lg font-semibold">{title}</div>
  </div>

  <p className="mt-1 mb-10 text-emerald-800/80 dark:text-slate-300/80">
    {description}
  </p>

  <div className="absolute bottom-5 left-5">
    <Link
      to={to}
      className="
        inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium shadow
        bg-emerald-600 text-white hover:bg-emerald-700
        focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70 focus-visible:ring-offset-2
        dark:bg-emerald-500 dark:hover:bg-emerald-600
        dark:focus-visible:ring-emerald-400/60 dark:focus-visible:ring-offset-slate-900
      "
    >
      {cta}
      <ArrowRight className="h-4 w-4" />
    </Link>
  </div>
</motion.div>

  );
}


export default  FeatureCard;
