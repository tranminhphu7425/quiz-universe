export function PolicyItem({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-xl border border-slate-200 p-3 dark:border-slate-800">
      <div className="flex items-start gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200">
          {icon}
        </div>
        <div className="min-w-0">
          <div className="font-semibold">{title}</div>
          <p className="mt-1 text-sm opacity-90">{desc}</p>
        </div>
      </div>
    </div>
  );
}
