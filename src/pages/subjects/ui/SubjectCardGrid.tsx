import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  MdFavoriteBorder as Heart,
  MdAccessTime as Clock,
  MdAutoStories as BookOpen,
  MdAutoAwesome as Sparkles,
  MdModeEdit as Edit2,
  MdVisibility as Eye,
  MdArrowForward as ArrowRight
} from 'react-icons/md';
import { Subject } from "@/shared/types/subject";

export type SubjectCardGridProps = {
  subject: Subject;
  isFavorite: boolean;
  isSelected: boolean;
  onToggleFavorite: () => void;
  onToggleSelect: () => void;
  userRole?: string;
};

export function SubjectCardGrid({ subject, isFavorite, isSelected, onToggleFavorite, onToggleSelect, userRole }: SubjectCardGridProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 160, damping: 16 }}
      whileHover={{ y: -8, scale: 1.01 }}
      className={`h-full min-h-[260px] group relative flex flex-col justify-between rounded-xl border transition-all duration-300 ${isSelected
          ? 'border-emerald-400 dark:border-emerald-500 ring-2 ring-emerald-200 dark:ring-emerald-500/30 shadow-lg shadow-emerald-100 dark:shadow-emerald-950/30'
          : 'border-emerald-100/60 dark:border-slate-800 hover:border-emerald-200 dark:hover:border-slate-700'
        } bg-white p-5 shadow-lg hover:shadow-2xl dark:bg-slate-900`}
    >
      {/* Gradient border effect on hover */}
      <div
        className={`absolute h-full inset-0 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isSelected ? 'opacity-100' : ''
          }`}
        style={{ padding: '2px', mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor' }}
      />

      {/* Corner decorations */}
      <div className="pointer-events-none absolute top-0 right-0 w-20 h-20 overflow-hidden">
        <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-bl-3xl transition-all duration-300 group-hover:scale-150 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`} />
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 w-20 h-20 overflow-hidden">
        <div className={`absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 rounded-tr-3xl transition-all duration-300 group-hover:scale-150 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`} />
      </div>

      <div className="grow flex flex-col relative z-10">
        <div>
          {/* Selection checkbox */}
          <div className="absolute top-3 right-3">
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

          <div className="mb-3 flex flex-col items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              {/* Badges */}
              <div className="mb-2 flex items-center gap-2 flex-wrap">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 shadow-sm"
                >
                  <span className="font-bold">{subject.code}</span>
                </motion.span>

                {subject.bankCount != null && subject.bankCount > 0 && (
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300 shadow-sm"
                  >
                    <BookOpen className="h-3 w-3" />
                    {subject.bankCount?.toLocaleString()} ngân hàng
                  </motion.span>
                )}

                {/* New badge if recently created */}
                {new Date(subject.createdAt).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm"
                  >
                    <Sparkles className="h-2.5 w-2.5" />
                    Mới
                  </motion.span>
                )}
              </div>

              {/* Title */}
              <motion.h3
                whileHover={{ x: 4 }}
                className="mt-1 text-lg font-bold bg-gradient-to-r from-emerald-900 to-emerald-700 dark:from-emerald-200 dark:to-emerald-400 bg-clip-text text-transparent"
              >
                {subject.name}
              </motion.h3>
            </div>
          </div>
        </div>

        <div className="flex flex-col grow justify-between">
          {/* Description */}
          {subject.description ? (
            <motion.p
              whileHover={{ opacity: 0.9 }}
              className="line-clamp-3 text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed"
            >
              {subject.description}
            </motion.p>
          ) : (
            <p className="text-sm italic text-gray-400 dark:text-gray-500 mb-4 flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-400" />
              Chưa có mô tả
            </p>
          )}
        </div>
      </div>

      {/* Footer actions */}
      <div className="relative z-10 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4 mt-2">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 text-xs text-emerald-900/70 dark:text-slate-300/70"
        >
          <Clock className="h-3.5 w-3.5" />
          <span>{new Date(subject.createdAt).toLocaleDateString('vi-VN')}</span>
        </motion.div>

        <div className="flex items-center gap-2">
          {/* Favorite button */}
          <motion.button
            onClick={onToggleFavorite}
            whileHover={{ scale: 1.15, rotate: isFavorite ? -10 : 10 }}
            whileTap={{ scale: 0.9 }}
            className="relative transition-all duration-200 p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-950/30"
            aria-label={isFavorite ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
          >
            {isFavorite ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Heart className="w-5 h-5 text-red-500 fill-red-500 drop-shadow-md" />
              </motion.div>
            ) : (
              <Heart className="w-5 h-5 text-red-500 transition-all duration-200 group-hover:scale-110" />
            )}

            {isFavorite && (
              <motion.div
                className="absolute inset-0 rounded-full bg-red-400/30"
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            )}
          </motion.button>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5">
            {(userRole === "admin" || userRole === "editor") && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to={`/subjects/${subject.subjectId}/edit`}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 px-3 py-1.5 text-xs font-semibold text-white shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <Edit2 className="h-3 w-3" />
                  Sửa
                </Link>
              </motion.div>
            )}

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to={`/subjects/${subject.subjectId}`}
                className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-yellow-400 to-amber-500 px-3 py-1.5 text-xs font-semibold text-emerald-950 shadow-md hover:shadow-lg transition-all duration-300 group/link"
              >
                <Eye className="h-3 w-3" />
                Xem
                <ArrowRight className="h-3 w-3 group-hover/link:translate-x-0.5 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Progress bar at bottom on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-100 via-emerald-200 to-teal-100 dark:from-emerald-900 dark:via-emerald-800 dark:to-teal-900 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 dark:from-emerald-400 dark:to-teal-400"
          initial={{ width: "0%" }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}
