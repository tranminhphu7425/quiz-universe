import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { SubjectCardGridProps } from "./SubjectCardGrid";

export function SubjectCardList({ subject, isFavorite, isSelected, onToggleFavorite, onToggleSelect, userRole }: SubjectCardGridProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      whileHover={{ x: 4 }}
      className={`relative rounded-xl border ${isSelected
        ? 'border-emerald-400 dark:border-emerald-500 ring-2 ring-emerald-200 dark:ring-emerald-500/30'
        : 'border-emerald-100/60 dark:border-slate-800'
        } bg-white p-4 shadow-sm transition dark:bg-slate-900`}
    >
      <div className="flex items-start gap-4">
        {/* Selection checkbox */}
        <div className="pt-1">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onToggleSelect}
            className="h-5 w-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
          />
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="min-w-0">
              <h3 className="text-base font-bold text-emerald-900 dark:text-emerald-200 truncate">
               {subject.code} - {subject.name}
              </h3>

              {subject.description && (
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                  {subject.description}
                </p>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-4 ml-4">
              <button
                onClick={onToggleFavorite}
                className="transition hover:scale-105 active:scale-95"
                aria-label={isFavorite ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
              >
                {isFavorite ? (
                  <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                ) : (
                  <Heart className="w-5 h-5 text-red-500" />
                )}
              </button>

              <div className="flex items-center gap-4">
                <Link
                  to={`/subjects/${subject.subjectId}`}
                  className="inline-flex items-center gap-1 rounded-lg bg-yellow-400 px-3 py-1.5 text-sm font-semibold text-emerald-950 shadow hover:brightness-105"
                >
                  Xem
                </Link>
                {(userRole === "admin" || userRole === "editor") && (
                  <Link
                    to={`/subjects/${subject.subjectId}/edit`}
                    className="inline-flex items-center gap-1 rounded-lg bg-red-400 px-3 py-1.5 text-sm font-semibold text-emerald-950 shadow hover:brightness-105"
                  >
                    Sửa
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
