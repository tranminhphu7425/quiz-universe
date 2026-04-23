import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, Globe, Users, Lock, BookOpen, Clock } from "lucide-react";
import { SubjectCardGridProps } from "./SubjectCardGrid";

export function SubjectCardList({ bank, isFavorite, isSelected, onToggleFavorite, onToggleSelect, userRole, userId, onDelete }: SubjectCardGridProps) {
  const visibilityIcon = {
    'PUBLIC': { icon: Globe, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    'ORG': { icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    'PRIVATE': { icon: Lock, color: 'text-amber-600', bg: 'bg-amber-100' }
  }[bank.visibility];

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
              <div className="mb-1 flex items-center gap-2">
                <span className={`inline-flex items-center gap-1 rounded-md ${visibilityIcon.bg} px-2 py-0.5 text-xs font-semibold ${visibilityIcon.color}`}>
                  <visibilityIcon.icon className="h-3 w-3" />
                  {bank.visibility === 'PUBLIC' ? 'Công khai' : bank.visibility === 'ORG' ? 'Nội bộ' : 'Riêng tư'}
                </span>
                <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700 dark:bg-slate-700 dark:text-slate-300">
                  <BookOpen className="h-3 w-3" />
                  {bank.questionCount} câu
                </span>
              </div>

              <h3 className="text-base font-bold text-emerald-900 dark:text-emerald-200 truncate">
                {bank.name}
              </h3>

              {bank.description && (
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                  {bank.description}
                </p>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 ml-4">
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

              <div className="flex items-center gap-1">
                <Link
                  to={`/questions/question-bank/${bank.bankId}`}
                  className="inline-flex items-center gap-1 rounded-lg bg-yellow-400 px-3 py-1.5 text-sm font-semibold text-emerald-950 shadow hover:brightness-105"
                >
                  Xem
                </Link>
                {(userRole === "admin" || userRole === "editor" || String(bank.createdBy) === String(userId)) && (
                  <Link
                    to={`/questions/question-bank/${bank.bankId}/edit`}
                    className="inline-flex items-center gap-1 rounded-lg bg-emerald-400 px-3 py-1.5 text-sm font-semibold text-emerald-950 shadow hover:brightness-105"
                  >
                    Sửa
                  </Link>
                )}

                {(userRole === "admin" || String(bank.createdBy) === String(userId)) && onDelete && (
                  <button
                    onClick={() => onDelete(bank.bankId)}
                    className="inline-flex items-center gap-1 rounded-lg bg-rose-500 px-3 py-1.5 text-sm font-semibold text-white shadow hover:bg-rose-600"
                  >
                    Xóa
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Footer info */}
          <div className="mt-3 flex flex-wrap items-center gap-4 border-t border-slate-100 dark:border-slate-800 pt-3">
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
              <span className="font-medium">Môn:</span>
              <span>{bank.subjectName}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
              <span className="font-medium">Người tạo:</span>
              <span>{bank.creatorName}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
              <Clock className="h-3.5 w-3.5" />
              <span>{new Date(bank.createdAt).toLocaleDateString('vi-VN')}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
