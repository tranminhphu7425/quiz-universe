export function ActionButton({ icon: Icon, label, onClick, variant = "default" }: {
  icon: any;
  label: string;
  onClick: () => void;
  variant?: "default" | "primary" | "danger";
}) {
  const variants = {
    default: "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300",
    primary: "bg-emerald-500 text-white hover:bg-emerald-600",
    danger: "bg-rose-500 text-white hover:bg-rose-600"
  };

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 font-medium transition-colors ${variants[variant]}`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}
