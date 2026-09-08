import { motion } from "framer-motion";
import {
  MdFormatQuote as Quote,
  MdPersonOutline as User
} from 'react-icons/md';

interface TestimonialCardProps {
  name: string;
  role: string;
  rating: number;
  comment: string;
  avatar?: string;
  index?: number;
}

export function TestimonialCard({
  name,
  role,
  rating,
  comment,
  avatar,
  index = 0
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 160,
        damping: 18,
        delay: index * 0.1
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="
        relative group min-w-[320px] max-w-sm rounded-xl
        bg-gradient-to-br from-white to-emerald-50 
        dark:from-slate-900 dark:to-slate-800
        p-6 shadow-lg hover:shadow-2xl
        border border-emerald-100 dark:border-slate-700
        transition-all duration-300
        overflow-hidden
      "
    >
      {/* Gradient border effect on hover */}
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

      {/* Corner decorations */}
      <div className="pointer-events-none absolute top-0 right-0 w-20 h-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-10 h-10 bg-emerald-500/5 dark:bg-emerald-400/5 rounded-bl-2xl" />
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 w-20 h-20 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-10 h-10 bg-emerald-500/5 dark:bg-emerald-400/5 rounded-tr-2xl" />
      </div>

      {/* Quote icon */}
      <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
        <Quote className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
      </div>

      {/* Avatar and info section */}
      <div className="relative flex items-center gap-3 mb-4">
        {/* Avatar */}
        <motion.div
          whileHover={{ scale: 1.05, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="
            relative flex-shrink-0 w-12 h-12 rounded-full 
            bg-gradient-to-br from-emerald-400 to-teal-500
            flex items-center justify-center shadow-md
            group-hover:shadow-lg transition-all duration-300
          "
        >
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <User className="w-6 h-6 text-white" />
          )}
          {/* Online indicator */}
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white dark:border-slate-800" />
        </motion.div>

        {/* Name and role */}
        <div className="flex-1">
          <motion.div
            className="font-semibold text-emerald-700 dark:text-emerald-300 text-lg"
            whileHover={{ x: 4 }}
          >
            {name}
          </motion.div>
          <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
            {role}
          </div>
        </div>
      </div>

      {/* Decorative line */}
      <div className="w-12 h-0.5 bg-gradient-to-r from-emerald-300 to-teal-300 dark:from-emerald-600 dark:to-teal-600 rounded-full mb-3 group-hover:w-20 transition-all duration-300" />

      {/* Stars rating with animation */}
      <motion.div
        className="mb-3 flex items-center gap-1"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        {Array.from({ length: rating }).map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="text-amber-400 text-lg"
          >
            ★
          </motion.span>
        ))}
        {Array.from({ length: 5 - rating }).map((_, i) => (
          <span key={i} className="text-gray-300 dark:text-gray-600 text-lg">
            ★
          </span>
        ))}

        {/* Rating number */}
        <span className="ml-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
          {rating}.0
        </span>
      </motion.div>

      {/* Comment with quote marks */}
      <div className="relative">
        {/* Opening quote */}
        <Quote className="absolute -top-1 -left-1 w-4 h-4 text-emerald-300 dark:text-emerald-600 opacity-50" />

        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed italic pl-4">
          {comment}
        </p>

        {/* Closing quote */}
        <Quote className="absolute -bottom-1 -right-1 w-4 h-4 text-emerald-300 dark:text-emerald-600 opacity-50 rotate-180" />
      </div>

      {/* Progress bar at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-100 via-emerald-200 to-teal-100 dark:from-emerald-900 dark:via-emerald-800 dark:to-teal-900 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 dark:from-emerald-400 dark:to-teal-400"
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

export default TestimonialCard;
