import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
// import { getAdminStats } from "@/shared/api/adminApi"; // 👈 Bạn cần tạo API tương ứng

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setErr(null);
    // getAdminStats()
    //   .then(setStats)
    //   .catch((e) => setErr(e?.message || "Lỗi khi tải thống kê"))
    //   .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 px-6 py-8">
      <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-6">
        🛠️ Bảng điều khiển quản trị
      </h1>

      {loading ? (
        <div className="flex items-center gap-2 text-slate-500">
          <Loader2 className="h-4 w-4 animate-spin" />
          Đang tải thống kê...
        </div>
      ) : err ? (
        <div className="text-red-500">{err}</div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <StatCard label="👤 Người dùng" value={stats.users} to="/admin/users" />
          <StatCard label="📚 Môn học" value={stats.subjects} to="/admin/subjects" />
          <StatCard label="❓ Câu hỏi" value={stats.questions} to="/admin/questions" />
          <StatCard label="✔️ Câu đã duyệt" value={stats.approved} />
          <StatCard label="📝 Câu đang chờ duyệt" value={stats.pending} />
        </motion.div>
      )}
    </div>
  );
}

function StatCard({ label, value, to }: { label: string; value: number; to?: string }) {
  const content = (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="text-sm text-slate-500 dark:text-slate-400">{label}</div>
      <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{value}</div>
    </div>
  );
  return to ? <Link to={to}>{content}</Link> : content;
}
