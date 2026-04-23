import { useState } from "react";

export function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="py-3">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{q}</span>
        <span className="ml-4 text-xs text-slate-500 dark:text-slate-400">{open ? "Ẩn" : "Xem"}</span>
      </button>
      {open && (
        <div className="mt-2 text-sm text-slate-700 opacity-90 dark:text-slate-300">{a}</div>
      )}
    </div>
  );
}
