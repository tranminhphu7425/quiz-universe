import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Loader2, User, Shield, CheckCircle, XCircle } from "lucide-react";
// import { cn } from "@/shared/utils/cn";
// import { getAdminUsers } from "@/shared/api/adminApi";

interface UserType {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "banned" | "pending";
}

const sampleUsers: UserType[] = [
  { id: 1, name: "Nguyễn Văn A", email: "a@example.com", role: "ADMIN", status: "active" },
  { id: 2, name: "Trần Thị B", email: "b@example.com", role: "TEACHER", status: "active" },
  { id: 3, name: "Lê Văn C", email: "c@example.com", role: "STUDENT", status: "pending" },
  { id: 4, name: "Phạm D", email: "d@example.com", role: "STUDENT", status: "banned" },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [err, setErr] = useState<string | null>(null);

//   useEffect(() => {
//     setLoading(true);
//     getAdminUsers()
//       .then(setUsers)
//       .catch((e) => {
//         console.warn("⚠️ Lỗi API, dùng dữ liệu mẫu:", e);
//         setErr("Đang dùng dữ liệu mẫu");
//         setUsers(sampleUsers);
//       })
//       .finally(() => setLoading(false));
//   }, []);

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.email.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* ===== HEADER ===== */}
      <section className="border-b border-slate-200 bg-white/70 py-6 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/70">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Shield className="h-6 w-6 text-indigo-500" /> Quản lý người dùng
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Theo dõi và quản lý tất cả tài khoản trong hệ thống.
          </p>
        </div>
      </section>

      {/* ===== SEARCH BAR ===== */}
      <section className="mx-auto max-w-7xl px-6 py-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm theo tên hoặc email..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-9 py-2 text-sm text-slate-800 shadow-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
        </div>
        {err && <p className="mt-3 text-amber-500 text-sm">{err}</p>}
      </section>

      {/* ===== USERS TABLE ===== */}
      <main className="mx-auto max-w-7xl px-6 pb-10">
        {loading ? (
          <div className="flex items-center gap-2 text-slate-500">
            <Loader2 className="h-4 w-4 animate-spin" /> Đang tải danh sách người dùng...
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-slate-500">Không có người dùng nào phù hợp.</div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100/80 text-slate-600 dark:bg-slate-800/50 dark:text-slate-300">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Người dùng</th>
                  <th className="px-4 py-3 text-left font-medium">Email</th>
                  <th className="px-4 py-3 text-left font-medium">Vai trò</th>
                  <th className="px-4 py-3 text-left font-medium">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u, i) => (
                  <motion.tr
                    key={u.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    // className={cn(
                    //   "border-t border-slate-100 dark:border-slate-800",
                    //   "hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors"
                    // )}
                  >
                    <td className="px-4 py-3 flex items-center gap-2">
                      <div className="grid h-8 w-8 place-items-center rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-200">
                        <User className="h-4 w-4" />
                      </div>
                      <span className="font-medium text-slate-900 dark:text-slate-100">{u.name}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{u.email}</td>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-300">
                      {/* <span
                        className={cn(
                          "rounded-full px-2.5 py-0.5 text-xs font-medium",
                          u.role === "ADMIN"
                            ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300"
                            : u.role === "TEACHER"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
                            : "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300"
                        )}
                      >
                        {u.role}
                      </span> */}
                    </td>
                    <td className="px-4 py-3">
                      {u.status === "active" && (
                        <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                          <CheckCircle className="h-4 w-4" /> Hoạt động
                        </span>
                      )}
                      {u.status === "pending" && (
                        <span className="inline-flex items-center gap-1 text-amber-500">
                          <ClockIcon /> Chờ duyệt
                        </span>
                      )}
                      {u.status === "banned" && (
                        <span className="inline-flex items-center gap-1 text-rose-500">
                          <XCircle className="h-4 w-4" /> Vô hiệu hóa
                        </span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </main>
    </div>
  );
}

function ClockIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 8v4l2 2m6-2a8 8 0 11-16 0 8 8 0 0116 0z"
      />
    </svg>
  );
}