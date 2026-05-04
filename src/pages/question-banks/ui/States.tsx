import {
  MdWarning as AlertTriangle,
  MdFilterList as Filter,
  MdRefresh as RefreshCcw,
  MdAddCircleOutline as PlusCircle
} from 'react-icons/md';
import { Link } from "react-router-dom";

export function LoadingState() {
  return (
    <div className="grid place-items-center rounded-2xl border border-dashed border-emerald-300/40 p-10 text-center dark:border-slate-700">
      <div className="animate-pulse">
        <div className="mb-2 h-8 w-48 rounded bg-emerald-200/60 dark:bg-emerald-500/20" />
        <div className="mx-auto h-8 w-72 rounded bg-emerald-200/40 dark:bg-emerald-500/10" />
      </div>
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="grid place-items-center rounded-2xl border border-dashed border-rose-300/40 p-10 text-center dark:border-rose-700/50">
      <div className="mx-auto max-w-md">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-800 dark:bg-rose-500/20 dark:text-rose-100">
          <AlertTriangle className="h-4 w-4" />
          Lỗi tải dữ liệu
        </div>
        <p className="text-sm text-rose-900/80 dark:text-rose-100/80">
          {message || "Không thể tải dữ liệu."}
        </p>
        <div className="mt-4 flex justify-center">
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-rose-900 ring-1 ring-rose-200 hover:bg-rose-50 dark:bg-white/5 dark:text-rose-100 dark:ring-rose-700 dark:hover:bg-slate-800"
          >
            <RefreshCcw className="h-4 w-4" /> Thử lại
          </button>
        </div>
      </div>
    </div>
  );
}

export function EmptyState() {
  return (
    <div className="grid place-items-center rounded-2xl border border-dashed border-emerald-300/40 p-10 text-center dark:border-slate-700">
      <div className="mx-auto max-w-md">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-100">
          <Filter className="h-4 w-4" /> Không có kết quả phù hợp
        </div>
        <p className="text-sm text-emerald-900/80 dark:text-slate-300/80">
          Hãy thử từ khóa khác hoặc bỏ bớt bộ lọc.
        </p>
        <div className="mt-4 flex justify-center gap-2">
          <Link
            to="/question-bank/create"
            className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-4 py-2 text-sm font-semibold text-emerald-950 shadow hover:brightness-105"
          >
            <PlusCircle className="h-4 w-4" /> Thêm ngân hàng mới
          </Link>
        </div>
      </div>
    </div>
  );
}
