import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  MdFavoriteBorder as Heart,
  MdAccessTime as Clock
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
      className={`flex flex-col justify-between relative rounded-xl border ${isSelected
        ? 'border-emerald-400 dark:border-emerald-500 ring-2 ring-emerald-200 dark:ring-emerald-500/30'
        : 'border-emerald-100/60 dark:border-slate-800'
        } bg-white p-4 shadow-lg transition dark:bg-slate-900 h-[180px]`}
    >
      <div className="grow flex flex-col">
        <div>
          {/* Selection checkbox */}
          <div className="absolute top-3 right-3">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={onToggleSelect}
              className="h-5 w-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
            />
          </div>

          <div className="mb-2 flex flex-col items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="mt-1 text-base font-bold text-emerald-900 dark:text-emerald-200">
                  {subject.code} - {subject.name}
                </h3>
                {subject.bankCount !== undefined && subject.bankCount > 0 && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                    {subject.bankCount} ngân hàng
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col grow justify-between">
          {subject.description ? (
            <p className="line-clamp-3 text-sm text-gray-700 dark:text-gray-300 mb-3">{subject.description}</p>
          ) : (
            <p className="text-sm italic text-gray-500 dark:text-gray-400 mb-3">Chưa có mô tả</p>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3">
        <div className="flex items-center gap-2 text-xs text-emerald-900/70 dark:text-slate-300/70">
          <Clock className="h-3.5 w-3.5" />
          <span>{new Date(subject.createdAt).toLocaleDateString('vi-VN')}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Nút yêu thích */}
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

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {(userRole === "admin" || userRole === "editor") && (
              <Link
                to={`/subjects/${subject.subjectId}/edit`}
                className="inline-flex items-center gap-1 rounded-lg bg-red-400 px-2 py-1 text-xs font-semibold text-emerald-950 shadow hover:brightness-105"
              >
                Sửa
              </Link>
            )}
            <Link
              to={`/subjects/${subject.subjectId}`}
              className="inline-flex items-center gap-1 rounded-lg bg-yellow-400 px-2 py-1 text-xs font-semibold text-emerald-950 shadow hover:brightness-105"
            >
              Xem
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
