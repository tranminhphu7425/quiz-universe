export function StatCard({ icon: Icon, label, value, color = "text-emerald-600" }: {
  icon: any;
  label: string;
  value: string | number;
  color?: string;
}) {
  return (
    <div className="rounded-xl bg-white/50 dark:bg-slate-800/50 p-4 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${color.replace('text-', 'bg-')}/10`}>
          <Icon className={`h-5 w-5 ${color}`} />
        </div>
        <div>
          <p className="text-sm text-slate-600 dark:text-slate-400">{label}</p>
          <p className="text-xl font-bold text-slate-900 dark:text-white">{value}</p>
        </div>
      </div>
    </div>
  );
}
