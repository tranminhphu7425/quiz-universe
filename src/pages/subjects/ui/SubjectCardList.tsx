import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  MdFavoriteBorder as Heart,
  MdAutoStories as BookOpen,
  MdAccessTime as Clock,
  MdModeEdit as Edit2,
  MdVisibility as Eye,
  MdArrowForward as ArrowRight
} from 'react-icons/md';
import { SubjectCardGridProps } from "./SubjectCardGrid";

export function SubjectCardList({ subject, isFavorite, isSelected, onToggleFavorite, onToggleSelect, userRole }: SubjectCardGridProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      whileHover={{ x: 4 }}
      className={`group relative rounded-xl border transition-all duration-300 ${
        isSelected
          ? 'border-emerald-400 dark:border-emerald-500 ring-2 ring-emerald-200 dark:ring-emerald-500/30 shadow-md'
          : 'border-emerald-100/60 dark:border-slate-800 hover:border-emerald-200 dark:hover:border-slate-700'
      } bg-white p-4 shadow-sm hover:shadow-md dark:bg-slate-900`}
    >
      <div className="flex items-start gap-4">
        {/* Selection checkbox */}
        <div className="pt-1">
          <motion.label
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative flex items-center justify-center"
          >
            <input
              type="checkbox"
              checked={isSelected}
              onChange={onToggleSelect}
              className="h-5 w-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 focus:ring-offset-2 cursor-pointer transition-all duration-200"
            />
            {isSelected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute inset-0 rounded-full bg-emerald-400/20"
              />
            )}
          </motion.label>
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="mb-1 flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                  {subject.code}
                </span>
                {subject.bankCount !== undefined && subject.bankCount > 0 && (
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700 dark:bg-slate-700 dark:text-slate-300">
                    <BookOpen className="h-3 w-3" />
                    {subject.bankCount} ngân hàng
                  </span>
                )}
              </div>

              <motion.h3 
                whileHover={{ x: 2 }}
                className="text-base font-bold text-emerald-900 dark:text-emerald-200 truncate"
              >
                {subject.name}
              </motion.h3>

              {subject.description && (
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                  {subject.description}
                </p>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3 ml-4 shrink-0">
              <motion.button
                onClick={onToggleFavorite}
                whileHover={{ scale: 1.15, rotate: isFavorite ? -10 : 10 }}
                whileTap={{ scale: 0.9 }}
                className="relative p-1.5 rounded-full hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                aria-label={isFavorite ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
              >
                {isFavorite ? (
                  <Heart className="w-5 h-5 text-red-500 fill-red-500 drop-shadow-sm" />
                ) : (
                  <Heart className="w-5 h-5 text-red-500" />
                )}
              </motion.button>

              <div className="flex items-center gap-2">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to={`/subjects/${subject.subjectId}`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-yellow-400 to-amber-500 px-3 py-1.5 text-xs font-bold text-emerald-950 shadow-sm hover:shadow-md transition-all duration-300 group/link"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    Xem
                    <ArrowRight className="h-3.5 w-3.5 group-hover/link:translate-x-0.5 transition-transform duration-300" />
                  </Link>
                </motion.div>
                
                {(userRole === "admin" || userRole === "editor") && (
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      to={`/subjects/${subject.subjectId}/edit`}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                      Sửa
                    </Link>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Footer info */}
          <div className="mt-3 flex items-center gap-4 border-t border-slate-100 dark:border-slate-800 pt-3">
            <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
              <Clock className="h-3.5 w-3.5" />
              <span>Đã tạo: {new Date(subject.createdAt).toLocaleDateString('vi-VN')}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
