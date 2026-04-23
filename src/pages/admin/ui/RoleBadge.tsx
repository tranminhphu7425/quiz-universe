import { ShieldCheck, GraduationCap, User } from "lucide-react";

export function RoleBadge({ role }: { role: string }) {
  const config: Record<string, { bg: string; text: string; icon: React.ReactNode; label: string }> = {
    admin: {
      bg: "bg-indigo-100 dark:bg-indigo-500/20",
      text: "text-indigo-700 dark:text-indigo-300",
      icon: <ShieldCheck className="h-3 w-3" />,
      label: "Admin",
    },
    teacher: {
      bg: "bg-emerald-100 dark:bg-emerald-500/20",
      text: "text-emerald-700 dark:text-emerald-300",
      icon: <GraduationCap className="h-3 w-3" />,
      label: "Giảng viên",
    },
    user: {
      bg: "bg-amber-100 dark:bg-amber-500/20",
      text: "text-amber-700 dark:text-amber-300",
      icon: <User className="h-3 w-3" />,
      label: "Sinh viên",
    },
  };

  const c = config[role] || config.user;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${c.bg} ${c.text}`}
    >
      {c.icon}
      {c.label}
    </span>
  );
}
