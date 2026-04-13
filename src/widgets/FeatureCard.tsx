import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

function FeatureCard({
  title,
  description,
  to,
  cta,
  icon,
  index = 0,
}: {
  title: string;
  description: string;
  to: string;
  cta: string;
  icon: React.ReactNode;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 160, 
        damping: 18,
        delay: index * 0.05
      }}
      whileHover={{ y: -4 }}
      className="
        relative group rounded-2xl border p-5 shadow-sm
        border-emerald-100 bg-white
        hover:shadow-md hover:bg-white/95
        dark:border-emerald-900/40 dark:bg-slate-800/70 dark:hover:bg-slate-800
        transition-all duration-300
        overflow-hidden
      "
    >
      {/* viền sáng nhẹ khi hover (chỉ trang trí) */}
      <div
        aria-hidden
        className="
          pointer-events-none absolute inset-0 rounded-2xl opacity-0
          group-hover:opacity-100 transition-opacity duration-500
          bg-gradient-to-br from-emerald-200/10 via-transparent to-sky-300/10
          dark:from-emerald-500/10 dark:to-sky-500/10
        "
      />

      {/* Hiệu ứng shimmer khi hover */}
      <div
        aria-hidden
        className="
          pointer-events-none absolute -inset-full rounded-2xl opacity-0
          group-hover:opacity-100 transition-opacity duration-700
          bg-gradient-to-r from-transparent via-white/30 to-transparent
          -skew-x-12
        "
        style={{
          animation: "shimmer 2s ease-in-out infinite",
        }}
      />

      {/* Góc trang trí */}
      <div className="pointer-events-none absolute top-0 right-0 w-12 h-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-6 h-6 bg-emerald-500/5 dark:bg-emerald-400/5 rounded-bl-xl" />
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 w-12 h-12 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-6 h-6 bg-emerald-500/5 dark:bg-emerald-400/5 rounded-tr-xl" />
      </div>

      {/* Icon với hiệu ứng hover */}
      <motion.div 
        className="flex items-center gap-2 text-emerald-900 dark:text-emerald-200 mb-3"
        whileHover={{ x: 4 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="relative">
          <div className="transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
            {icon}
          </div>
          {/* Chấm nhỏ trang trí */}
          <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="text-lg font-semibold group-hover:bg-gradient-to-r group-hover:from-emerald-900 group-hover:to-emerald-700 dark:group-hover:from-emerald-200 dark:group-hover:to-emerald-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
          {title}
        </div>
        <Sparkles className="w-3.5 h-3.5 text-emerald-500 opacity-0 group-hover:opacity-100 transition-all duration-300 -ml-1" />
      </motion.div>

      {/* Đường kẻ trang trí */}
      <div className="w-12 h-0.5 bg-gradient-to-r from-emerald-200 to-emerald-100 dark:from-emerald-800 dark:to-emerald-700 rounded-full mb-3 group-hover:w-20 transition-all duration-300" />

      <p className="mb-10 text-emerald-800/80 dark:text-slate-300/80 leading-relaxed">
        {description}
      </p>

      {/* Button với hiệu ứng */}
      <div className="absolute bottom-5 left-5">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            to={to}
            className="
              inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium shadow
              bg-emerald-600 text-white hover:bg-emerald-700
              focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70 focus-visible:ring-offset-2
              dark:bg-emerald-500 dark:hover:bg-emerald-600
              dark:focus-visible:ring-emerald-400/60 dark:focus-visible:ring-offset-slate-900
              transition-all duration-300
              relative overflow-hidden
              group/btn
            "
          >
            <span className="relative z-10">{cta}</span>
            <motion.div
              animate={{ x: [0, 3, 0] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut"
              }}
              className="relative z-10"
            >
              <ArrowRight className="h-4 w-4" />
            </motion.div>
            
            {/* Hiệu ứng ripple trên button */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-500" />
          </Link>
        </motion.div>
      </div>

      {/* Thanh progress bar dưới đáy */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-100 via-emerald-200 to-emerald-100 dark:from-emerald-900 dark:via-emerald-800 dark:to-emerald-900 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 dark:from-emerald-400 dark:to-emerald-500"
          initial={{ width: "0%" }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
      `}</style>
    </motion.div>
  );
}

export default FeatureCard;