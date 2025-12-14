import { Loader2 } from "lucide-react";

type LoadingStateProps = {
  /** Số “thẻ câu hỏi” giả lập trong lúc tải */
  count?: number;
};

export default function LoadingState({ count = 10 }: LoadingStateProps) {
  return (
    <div className="space-y-6">
      {/* Header loading (tùy chọn): tổng câu, trạng thái,... */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="h-9 w-28 rounded-xl bg-slate-200/80 dark:bg-slate-700 animate-pulse" />
        <div className="h-9 w-36 rounded-xl bg-slate-200/80 dark:bg-slate-700 animate-pulse" />
        <div className="h-9 w-44 rounded-xl bg-slate-200/80 dark:bg-slate-700 animate-pulse" />
        <div className="ml-auto inline-flex items-center gap-2 text-slate-500 dark:text-slate-400">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Đang tải câu hỏi…</span>
        </div>
      </div>

      {/* Card skeletons */}
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          {/* Số thứ tự + stem */}
          <div className="mb-4 flex items-start gap-3">
            <div className="h-6 w-6 rounded-md bg-slate-200 dark:bg-slate-700 animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-4/5 rounded bg-slate-200 dark:bg-slate-700 animate-pulse" />
              <div className="h-4 w-2/3 rounded bg-slate-200 dark:bg-slate-700 animate-pulse" />
            </div>
            <div className="h-7 w-24 rounded-lg bg-slate-200 dark:bg-slate-700 animate-pulse" />
          </div>

          {/* Options */}
          <div className="grid gap-2">
            {Array.from({ length: 4 }).map((__, j) => (
              <div
                key={j}
                className="flex items-start gap-3 rounded-xl border p-3 animate-pulse border-slate-200 dark:border-slate-700"
              >
                <div className="mt-1 h-4 w-4 rounded-full bg-slate-200 dark:bg-slate-700" />
                <div className="h-4 w-3/4 rounded bg-slate-200 dark:bg-slate-700" />
              </div>
            ))}
          </div>

        </div>
      ))}
    </div>
  );
}
