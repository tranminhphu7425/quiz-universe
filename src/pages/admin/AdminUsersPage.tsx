import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Loader2,
  User,
  ShieldCheck,
  CheckCircle,
  XCircle,
  Clock,
  UserCog,
  Trash2,
  GraduationCap,
  Building2,
  Mail,
  Phone,
  Users,
  Filter,
  RefreshCw,
  ToggleLeft,
  ToggleRight,
  AlertTriangle,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  getAdminUsers,
  updateUserRole,
  toggleUserActive,
  deleteAdminUser,
  type AdminUser,
} from "@/shared/api/adminApi";

/* ===================== CONSTANTS ===================== */

const ROLES = [
  { value: "admin", label: "Admin", color: "indigo" },
  { value: "teacher", label: "Giảng viên", color: "emerald" },
  { value: "user", label: "Sinh viên", color: "amber" },
];

type RoleFilter = "all" | "admin" | "teacher" | "user";
type StatusFilter = "all" | "active" | "inactive";

/* ===================== MAIN PAGE ===================== */

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [err, setErr] = useState<string | null>(null);

  // Modal states
  const [editingRole, setEditingRole] = useState<{ userId: string; currentRole: string } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<AdminUser | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchUsers = () => {
    setLoading(true);
    setErr(null);
    getAdminUsers()
      .then((data) => {
        setUsers(data);
      })
      .catch((e) => {
        console.warn("⚠️ Lỗi API:", e);
        setErr("Không thể tải danh sách người dùng. Vui lòng thử lại.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /* ---- Filtering ---- */
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchSearch =
        (u.name ?? "").toLowerCase().includes(query.toLowerCase()) ||
        (u.email ?? "").toLowerCase().includes(query.toLowerCase()) ||
        (u.username ?? "").toLowerCase().includes(query.toLowerCase());

      const matchRole = roleFilter === "all" || u.role === roleFilter;

      const matchStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && u.isActive !== false) ||
        (statusFilter === "inactive" && u.isActive === false);

      return matchSearch && matchRole && matchStatus;
    });
  }, [users, query, roleFilter, statusFilter]);

  /* ---- Stats ---- */
  const stats = useMemo(() => {
    return {
      total: users.length,
      admins: users.filter((u) => u.role === "admin").length,
      teachers: users.filter((u) => u.role === "teacher").length,
      students: users.filter((u) => u.role === "user").length,
      active: users.filter((u) => u.isActive !== false).length,
      inactive: users.filter((u) => u.isActive === false).length,
    };
  }, [users]);

  /* ---- Actions ---- */
  const handleToggleActive = async (userId: string) => {
    setActionLoading(userId);
    try {
      const updated = await toggleUserActive(userId);
      setUsers((prev) => prev.map((u) => (u.id === userId ? updated : u)));
      toast.success(
        updated.isActive ? "Đã kích hoạt tài khoản" : "Đã vô hiệu hóa tài khoản"
      );
    } catch {
      toast.error("Không thể thay đổi trạng thái");
    } finally {
      setActionLoading(null);
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    setActionLoading(userId);
    try {
      const updated = await updateUserRole(userId, newRole);
      setUsers((prev) => prev.map((u) => (u.id === userId ? updated : u)));
      toast.success("Đã cập nhật vai trò");
      setEditingRole(null);
    } catch {
      toast.error("Không thể cập nhật vai trò");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (userId: string) => {
    setActionLoading(userId);
    try {
      await deleteAdminUser(userId);
      setUsers((prev) => prev.filter((u) => u.id !== userId));
      toast.success("Đã xóa người dùng");
      setConfirmDelete(null);
    } catch {
      toast.error("Không thể xóa người dùng");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* ===== HEADER ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 160, damping: 18 }}
          >
          
            <h1 className="text-3xl md:text-4xl font-black leading-tight text-white">
              👤 Quản lý người dùng
            </h1>
            <p className="mt-2 max-w-xl mx-auto text-white/80">
              Theo dõi, quản lý vai trò và trạng thái tất cả tài khoản trong hệ thống.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== STATS CARDS ===== */}
      <section className="mx-auto max-w-7xl px-6 -mt-6">
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          <StatCard
            icon={<Users className="h-4 w-4" />}
            label="Tổng"
            value={stats.total}
            color="slate"
          />
          <StatCard
            icon={<ShieldCheck className="h-4 w-4" />}
            label="Admin"
            value={stats.admins}
            color="indigo"
          />
          <StatCard
            icon={<GraduationCap className="h-4 w-4" />}
            label="Giảng viên"
            value={stats.teachers}
            color="emerald"
          />
          <StatCard
            icon={<User className="h-4 w-4" />}
            label="Sinh viên"
            value={stats.students}
            color="amber"
          />
          <StatCard
            icon={<CheckCircle className="h-4 w-4" />}
            label="Hoạt động"
            value={stats.active}
            color="green"
          />
          <StatCard
            icon={<XCircle className="h-4 w-4" />}
            label="Vô hiệu"
            value={stats.inactive}
            color="red"
          />
        </div>
      </section>

      {/* ===== TOOLBAR ===== */}
      <section className="mx-auto max-w-7xl px-6 py-6">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm theo tên, email hoặc username..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-9 py-2 text-sm text-slate-800 shadow-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>

          {/* Role filter */}
          <div className="flex items-center gap-1 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-1">
            <Filter className="h-4 w-4 text-slate-400 ml-2" />
            {(["all", "admin", "teacher", "user"] as RoleFilter[]).map((r) => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  roleFilter === r
                    ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
                }`}
              >
                {r === "all"
                  ? "Tất cả"
                  : r === "admin"
                  ? "Admin"
                  : r === "teacher"
                  ? "GV"
                  : "SV"}
              </button>
            ))}
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-1 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-1">
            {(["all", "active", "inactive"] as StatusFilter[]).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  statusFilter === s
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
                }`}
              >
                {s === "all" ? "Mọi TT" : s === "active" ? "Hoạt động" : "Vô hiệu"}
              </button>
            ))}
          </div>

          {/* Refresh */}
          <button
            onClick={fetchUsers}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Làm mới
          </button>

          {/* Count */}
          <span className="text-sm text-slate-500 dark:text-slate-400 ml-auto">
            {filteredUsers.length}/{users.length} người dùng
          </span>
        </div>

        {err && (
          <div className="mt-3 flex items-center gap-2 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg px-4 py-2">
            <AlertTriangle className="h-4 w-4" />
            {err}
            <button onClick={fetchUsers} className="ml-auto underline hover:no-underline">
              Thử lại
            </button>
          </div>
        )}
      </section>

      {/* ===== USERS TABLE ===== */}
      <main className="mx-auto max-w-7xl px-6 pb-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-3 py-20">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
            <p className="text-slate-500">Đang tải danh sách người dùng...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-16">
            <Users className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <p className="text-slate-500 dark:text-slate-400">
              {query || roleFilter !== "all" || statusFilter !== "all"
                ? "Không tìm thấy người dùng phù hợp với bộ lọc."
                : "Chưa có người dùng nào trong hệ thống."}
            </p>
            {(query || roleFilter !== "all" || statusFilter !== "all") && (
              <button
                onClick={() => {
                  setQuery("");
                  setRoleFilter("all");
                  setStatusFilter("all");
                }}
                className="mt-3 text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
              >
                Xóa bộ lọc
              </button>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50/80 text-slate-600 dark:bg-slate-800/50 dark:text-slate-300">
                  <tr>
                    <th className="px-4 py-3.5 text-left font-semibold">Người dùng</th>
                    <th className="px-4 py-3.5 text-left font-semibold">Email</th>
                    <th className="px-4 py-3.5 text-left font-semibold">Vai trò</th>
                    <th className="px-4 py-3.5 text-left font-semibold">Trạng thái</th>
                    <th className="px-4 py-3.5 text-left font-semibold">Trường / Ngành</th>
                    <th className="px-4 py-3.5 text-left font-semibold">Ngày tạo</th>
                    <th className="px-4 py-3.5 text-center font-semibold">Hành động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <AnimatePresence>
                    {filteredUsers.map((u, i) => (
                      <motion.tr
                        key={u.id}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: i * 0.02 }}
                        className="hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors"
                      >
                        {/* User Info */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-700 dark:from-indigo-500/20 dark:to-purple-500/20 dark:text-indigo-200 font-bold text-sm">
                              {(u.name ?? u.username ?? "?").charAt(0).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <div className="font-medium text-slate-900 dark:text-slate-100 truncate">
                                {u.name || u.username || "—"}
                              </div>
                              {u.username && u.name && (
                                <div className="text-xs text-slate-400 truncate">@{u.username}</div>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Email */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                            <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                            <span className="truncate max-w-[180px]">{u.email || "—"}</span>
                          </div>
                          {u.phone && (
                            <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                              <Phone className="h-3 w-3" />
                              {u.phone}
                            </div>
                          )}
                        </td>

                        {/* Role */}
                        <td className="px-4 py-3">
                          <RoleBadge role={u.role} />
                        </td>

                        {/* Status */}
                        <td className="px-4 py-3">
                          <StatusBadge isActive={u.isActive} />
                        </td>

                        {/* University / Major */}
                        <td className="px-4 py-3">
                          {u.university ? (
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-300">
                                <Building2 className="h-3 w-3 text-slate-400" />
                                <span className="truncate max-w-[140px]">
                                  {u.university.universityName}
                                </span>
                              </div>
                              {u.major && (
                                <div className="flex items-center gap-1 text-xs text-slate-400">
                                  <GraduationCap className="h-3 w-3" />
                                  <span className="truncate max-w-[140px]">
                                    {u.major.majorName}
                                  </span>
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="text-xs text-slate-400">—</span>
                          )}
                        </td>

                        {/* Created At */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                            <Clock className="h-3 w-3" />
                            {u.createdAt
                              ? new Date(u.createdAt).toLocaleDateString("vi-VN")
                              : "—"}
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-1">
                            {/* Toggle active */}
                            <button
                              onClick={() => handleToggleActive(u.id)}
                              disabled={actionLoading === u.id}
                              className={`p-1.5 rounded-lg transition-colors ${
                                u.isActive !== false
                                  ? "text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30"
                                  : "text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                              }`}
                              title={u.isActive !== false ? "Vô hiệu hóa" : "Kích hoạt"}
                            >
                              {actionLoading === u.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : u.isActive !== false ? (
                                <ToggleRight className="h-4 w-4" />
                              ) : (
                                <ToggleLeft className="h-4 w-4" />
                              )}
                            </button>

                            {/* Edit role */}
                            <button
                              onClick={() =>
                                setEditingRole({ userId: u.id, currentRole: u.role })
                              }
                              className="p-1.5 rounded-lg text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-900/30 transition-colors"
                              title="Đổi vai trò"
                            >
                              <UserCog className="h-4 w-4" />
                            </button>

                            {/* Delete */}
                            <button
                              onClick={() => setConfirmDelete(u)}
                              className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                              title="Xóa người dùng"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </main>

      {/* ===== ROLE EDIT MODAL ===== */}
      <AnimatePresence>
        {editingRole && (
          <ModalOverlay onClose={() => setEditingRole(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 w-full max-w-sm mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <UserCog className="h-5 w-5 text-indigo-500" />
                  Đổi vai trò
                </h3>
                <button
                  onClick={() => setEditingRole(null)}
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  <X className="h-4 w-4 text-slate-400" />
                </button>
              </div>

              <div className="space-y-2">
                {ROLES.map((role) => (
                  <button
                    key={role.value}
                    onClick={() => handleRoleChange(editingRole.userId, role.value)}
                    disabled={actionLoading === editingRole.userId}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${
                      editingRole.currentRole === role.value
                        ? "border-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 dark:border-indigo-600"
                        : "border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700"
                    }`}
                  >
                    <RoleBadge role={role.value} />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                      {role.label}
                    </span>
                    {editingRole.currentRole === role.value && (
                      <CheckCircle className="h-4 w-4 text-indigo-500 ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </ModalOverlay>
        )}
      </AnimatePresence>

      {/* ===== DELETE CONFIRM MODAL ===== */}
      <AnimatePresence>
        {confirmDelete && (
          <ModalOverlay onClose={() => setConfirmDelete(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 w-full max-w-sm mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-4">
                <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-red-100 dark:bg-red-900/30">
                  <AlertTriangle className="h-6 w-6 text-red-500" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Xác nhận xóa
                </h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Bạn có chắc muốn xóa người dùng{" "}
                  <span className="font-semibold text-slate-700 dark:text-slate-200">
                    {confirmDelete.name || confirmDelete.email}
                  </span>
                  ? Hành động này không thể hoàn tác.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="flex-1 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={() => handleDelete(confirmDelete.id)}
                  disabled={actionLoading === confirmDelete.id}
                  className="flex-1 px-4 py-2 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors flex items-center justify-center gap-1.5"
                >
                  {actionLoading === confirmDelete.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                  Xóa
                </button>
              </div>
            </motion.div>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ===================== SUB-COMPONENTS ===================== */

function ModalOverlay({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      {children}
    </motion.div>
  );
}

function RoleBadge({ role }: { role: string }) {
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

function StatusBadge({ isActive }: { isActive: boolean | null }) {
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

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}) {
  const colorMap: Record<string, string> = {
    slate: "bg-slate-100 text-slate-700 dark:bg-slate-500/20 dark:text-slate-200",
    indigo: "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-200",
    emerald: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200",
    amber: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200",
    green: "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-200",
    red: "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-200",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 140, damping: 16 }}
      className="rounded-xl border border-white/40 bg-white/90 p-3 shadow-sm backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/60"
    >
      <div className="flex items-center gap-2.5">
        <div
          className={`grid h-8 w-8 place-items-center rounded-lg ${
            colorMap[color] || colorMap.slate
          }`}
        >
          {icon}
        </div>
        <div>
          <div className="text-xs text-slate-500 dark:text-slate-400">{label}</div>
          <div className="text-lg font-bold text-slate-900 dark:text-slate-100">{value}</div>
        </div>
      </div>
    </motion.div>
  );
}