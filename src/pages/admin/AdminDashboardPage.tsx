import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  MdLoop as Loader2,
  MdPeopleOutline as Users,
  MdAutoStories as BookOpen,
  MdStorage as Database,
  MdCheckCircle as CheckCircle,
  MdAccessTime as Clock,
  MdAssignment as ClipboardList,
  MdLocalOffer as Tag,
  MdLayers as Layers,
  MdCloudUpload as UploadCloud
} from 'react-icons/md';
import { motion } from "framer-motion";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";
import { getAdminStats } from "@/shared/api/adminApi";

const sampleStats = {
  users: 25,
  subjects: 8,
  banks: 5,
  questions: 320,
  approved: 210,
  pending: 90,
  exams: 4,
  tags: 12,
  topics: 20,
  imports: 3,
};

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setErr(null);
    getAdminStats()
      .then((data) => {
        // Merge fetched data with sample stats for properties not yet implemented in backend
        setStats({ ...sampleStats, ...data });
      })
      .catch((e) => {
        console.warn("⚠️ Lỗi API, dùng sampleStats:", e);
        setErr("Không thể lấy dữ liệu thực tế, hiện đang dùng dữ liệu mẫu");
        setStats(sampleStats);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 160, damping: 18 }}
          >

            <h1 className="text-3xl md:text-4xl font-black leading-tight text-white">
              🛠️ Bảng điều khiển quản trị
            </h1>
            <p className="mt-2 max-w-xl mx-auto text-white/80">
              Theo dõi toàn bộ người dùng, môn học, câu hỏi và kỳ thi trong hệ thống.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="mx-auto max-w-7xl px-6 -mt-6">
        {loading ? (
          <div className="flex items-center gap-2 text-slate-500">
            <Loader2 className="h-4 w-4 animate-spin" />
            Đang tải thống kê...
          </div>
        ) : (
          <>
            {err && <div className="text-amber-500 mb-4">{err}</div>}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard icon={<Users className="h-4 w-4" />} label="Người dùng" value={stats.users} hint="tài khoản" />
              <StatCard icon={<BookOpen className="h-4 w-4" />} label="Môn học" value={stats.subjects} hint="trong hệ thống" />
              <StatCard icon={<Database className="h-4 w-4" />} label="Ngân hàng câu" value={stats.banks} hint="đang quản lý" />
              <StatCard icon={<ClipboardList className="h-4 w-4" />} label="Câu hỏi" value={stats.questions} hint="tổng cộng" />
              <StatCard icon={<CheckCircle className="h-4 w-4" />} label="Đã duyệt" value={stats.approved} />
              <StatCard icon={<Clock className="h-4 w-4" />} label="Chờ duyệt" value={stats.pending} />
              <StatCard icon={<Layers className="h-4 w-4" />} label="Chủ đề" value={stats.topics} />
              <StatCard icon={<Tag className="h-4 w-4" />} label="Tags" value={stats.tags} />
              <StatCard icon={<UploadCloud className="h-4 w-4" />} label="Import Jobs" value={stats.imports} />
            </div>
          </>
        )}
      </section>

      {/* ===== CONTENT ===== */}
      <main className="mx-auto max-w-7xl px-6 py-10">
        {!loading && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Biểu đồ cột */}
            <section className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <header className="mb-3">
                <h2 className="text-base font-bold text-emerald-900 dark:text-emerald-200 inline-flex items-center gap-2">
                  <ClipboardList className="h-4 w-4" /> Thống kê câu hỏi
                </h2>
              </header>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={[
                    { name: "Tổng", value: stats.questions },
                    { name: "Đã duyệt", value: stats.approved },
                    { name: "Chờ duyệt", value: stats.pending },
                  ]}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </section>

            {/* Biểu đồ tròn */}
            <section className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <header className="mb-3">
                <h2 className="text-base font-bold text-emerald-900 dark:text-emerald-200 inline-flex items-center gap-2">
                  <Database className="h-4 w-4" /> Phân bố hệ thống
                </h2>
              </header>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={[
                      { name: "Người dùng", value: stats.users },
                      { name: "Môn học", value: stats.subjects },
                      { name: "Kỳ thi", value: stats.exams },
                    ]}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                    dataKey="value"
                  >
                    <Cell fill="#6366f1" />
                    <Cell fill="#f59e0b" />
                    <Cell fill="#10b981" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}

import { StatCard } from "./ui/StatCard";
