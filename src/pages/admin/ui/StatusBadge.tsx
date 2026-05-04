import {
  MdCheckCircle as CheckCircle,
  MdHighlightOff as XCircle
} from 'react-icons/md';

export function StatusBadge({ isActive }: { isActive: boolean | null }) {
  if (isActive === false) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-full px-2.5 py-0.5">
        <XCircle className="h-3 w-3" />
        Vô hiệu
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 rounded-full px-2.5 py-0.5">
      <CheckCircle className="h-3 w-3" />
      Hoạt động
    </span>
  );
}
