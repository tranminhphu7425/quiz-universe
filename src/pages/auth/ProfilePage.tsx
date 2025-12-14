// src/pages/profile/ProfilePage.tsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Building2,
  Shield,
  Edit,
  Calendar,
  BookOpen,
  Award,
  History,
  Star,
  ChevronRight,
  UserCircle,
  Briefcase,
  GraduationCap,
  Clock,
  FileText,
} from "lucide-react";
import { useAuth } from "@/app/providers/AuthProvider";
import FadeInOnView from "@/shared/ui/FadeInOnView";
import GradientText from "@/shared/ui/GradientText";

export default function ProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Mô phỏng thời gian loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Tính avatar fallback
  const getAvatarFallback = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  // Xác định màu sắc theo role
  const getRoleColor = (role: string) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800";
      case "teacher":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800";
      case "student":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300 border-gray-200 dark:border-gray-800";
    }
  };

  // Xác định icon theo role
  const getRoleIcon = (role: string) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return <Shield className="h-4 w-4" />;
      case "teacher":
        return <GraduationCap className="h-4 w-4" />;
      case "student":
        return <UserCircle className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  // Format ngày tham gia
  const formatJoinDate = (dateString?: string) => {
    if (!dateString) return "Chưa có thông tin";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Mock stats (trong thực tế sẽ lấy từ API)
  const userStats = {
    subjectsStudied: 12,
    quizzesTaken: 45,
    averageScore: 87,
    hoursSpent: 156,
    streakDays: 7,
    rank: "Top 15%",
  };

  // Mock recent activity
  const recentActivity = [
    { id: 1, action: "Hoàn thành bài kiểm tra Toán cao cấp", time: "2 giờ trước", score: "92/100" },
    { id: 2, action: "Tạo bộ câu hỏi Lập trình Python", time: "1 ngày trước", type: "creation" },
    { id: 3, action: "Tham gia diễn đàn thảo luận", time: "2 ngày trước", type: "forum" },
    { id: 4, action: "Đạt huy hiệu 'Học tập chăm chỉ'", time: "3 ngày trước", type: "badge" },
  ];

  // Nếu user không tồn tại (chưa đăng nhập)
  if (!user && !loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="mb-6">
            <UserCircle className="h-20 w-20 text-gray-400 dark:text-gray-600 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">
            Vui lòng đăng nhập
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Bạn cần đăng nhập để xem thông tin hồ sơ.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 px-5 py-3 font-semibold text-white shadow-lg hover:from-emerald-600 hover:to-green-600 transition-all"
            >
              Đăng nhập
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-200 px-5 py-3 font-medium text-emerald-700 hover:bg-emerald-50 dark:border-slate-600 dark:text-emerald-300 dark:hover:bg-emerald-900/20 transition-all"
            >
              Về trang chủ
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page bg-slate-50 dark:bg-slate-900 min-h-screen">
      {/* ====== HEADER ====== */}
      <section className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Blur blobs */}
        <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-white/10 blur-2xl dark:bg-emerald-400/10" />
        <div className="pointer-events-none absolute -right-16 top-10 h-64 w-64 rounded-full bg-white/10 blur-2xl dark:bg-purple-400/10" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-white">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 160, damping: 18 }}
                className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/20 backdrop-blur dark:bg-white/5 dark:ring-white/10"
              >
                <UserCircle className="h-4 w-4 text-white dark:text-emerald-300" />
                <span className="text-white dark:text-gray-200">Hồ sơ cá nhân • QuizUniverse</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="text-3xl md:text-4xl font-black leading-tight text-white dark:text-gray-100"
              >
                Hồ sơ của{" "}
                <GradientText className="text-3xl md:text-4xl font-black">
                  {loading ? "..." : user?.name || "Bạn"}
                </GradientText>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-4 text-white/90 dark:text-gray-300 max-w-2xl"
              >
                Xem và quản lý thông tin cá nhân, thành tích học tập và hoạt động gần đây.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-emerald-400/20 to-teal-400/20 blur-xl" />
                <div className="relative rounded-2xl bg-white/10 dark:bg-white/5 p-8 backdrop-blur-xl border border-white/20">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="inline-flex p-3 rounded-full bg-emerald-500/20 dark:bg-emerald-400/20">
                        <Award className="h-8 w-8 text-emerald-300 dark:text-emerald-200" />
                      </div>
                      <div className="mt-3 text-2xl font-bold text-white">
                        {userStats.rank}
                      </div>
                      <div className="text-sm text-white/80">Xếp hạng</div>
                    </div>
                    <div className="text-center">
                      <div className="inline-flex p-3 rounded-full bg-blue-500/20 dark:bg-blue-400/20">
                        <Star className="h-8 w-8 text-blue-300 dark:text-blue-200" />
                      </div>
                      <div className="mt-3 text-2xl font-bold text-white">
                        {userStats.averageScore}%
                      </div>
                      <div className="text-sm text-white/80">Điểm trung bình</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ====== MAIN CONTENT ====== */}
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left sidebar - Profile Card */}
          <div className="lg:col-span-1">
            <FadeInOnView amount={0.2}>
              <div className="sticky top-8 space-y-6">
                {/* Profile Card */}
                <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-xl border border-emerald-100 dark:border-slate-700">
                  {/* Avatar & Name */}
                  <div className="flex flex-col items-center text-center mb-6">
                    {loading ? (
                      <div className="h-32 w-32 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse mb-4"></div>
                    ) : (
                      <>
                        <div className="relative mb-4">
                          <div className="h-32 w-32 rounded-full bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                            {getAvatarFallback(user?.name || "U")}
                          </div>
                          <div className="absolute -bottom-2 -right-2 rounded-full bg-white dark:bg-slate-800 p-2 shadow-lg">
                            <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center">
                              <User className="h-4 w-4 text-white" />
                            </div>
                          </div>
                        </div>
                        <h2 className="text-2xl font-bold text-emerald-900 dark:text-emerald-300">
                          {user?.name}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                          @{user?.username || user?.email?.split("@")[0] || "user"}
                        </p>
                      </>
                    )}
                  </div>

                  {/* User Info */}
                  <div className="space-y-4">
                    {/* Email */}
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-emerald-50 dark:bg-emerald-900/20 p-2">
                        <Mail className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-500 dark:text-gray-400">Email</div>
                        {loading ? (
                          <div className="h-5 w-40 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                        ) : (
                          <div className="font-medium text-gray-700 dark:text-gray-300 truncate">
                            {user?.email}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Role */}
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-emerald-50 dark:bg-emerald-900/20 p-2">
                        {loading ? (
                          <div className="h-5 w-5 bg-slate-200 dark:bg-slate-700 rounded"></div>
                        ) : (
                          getRoleIcon(user?.role || "")
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-500 dark:text-gray-400">Vai trò</div>
                        {loading ? (
                          <div className="h-5 w-24 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                        ) : (
                          <div className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${getRoleColor(user?.role || "")} border`}>
                            {getRoleIcon(user?.role || "")}
                            <span>
                              {user?.role === "admin" && "Quản trị viên"}
                              {user?.role === "teacher" && "Giáo viên"}
                              {user?.role === "user" && "Học sinh/Sinh viên"}
                              {!["admin", "teacher", "student"].includes(user?.role || "") && user?.role}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* University */}
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-emerald-50 dark:bg-emerald-900/20 p-2">
                        <Building2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-500 dark:text-gray-400">Trường/Đơn vị</div>
                        {loading ? (
                          <div className="h-5 w-48 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                        ) : (
                          <div className="font-medium text-gray-700 dark:text-gray-300">
                            {user?.university?.universityName || "Chưa cập nhật"}
                            {user?.university?.universityCode && (
                              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                                ({user.university.universityCode})
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Major */}
                    {user?.major && (
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-emerald-50 dark:bg-emerald-900/20 p-2">
                          <BookOpen className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-gray-500 dark:text-gray-400">Ngành học</div>
                          {loading ? (
                            <div className="h-5 w-40 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                          ) : (
                            <div className="font-medium text-gray-700 dark:text-gray-300">
                              {user.major.majorName}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                   
                  </div>

                  {/* Edit Profile Button */}
                  <div className="mt-8 pt-6 border-t border-emerald-100 dark:border-slate-700">
                    <Link
                      to="/settings"
                      className="flex items-center justify-center gap-2 w-full rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 dark:from-emerald-600 dark:to-green-600 px-4 py-3 font-semibold text-white shadow-lg hover:from-emerald-600 hover:to-green-600 dark:hover:from-emerald-700 dark:hover:to-green-700 transition-all"
                    >
                      <Edit className="h-5 w-5" />
                      Chỉnh sửa hồ sơ
                    </Link>
                  </div>
                </div>

                {/* Stats Card */}
                <div className="rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-400/10 dark:from-emerald-900/30 dark:to-teal-900/30 p-6 border border-emerald-200/50 dark:border-emerald-700/30">
                  <h3 className="mb-4 text-lg font-bold text-emerald-900 dark:text-emerald-300">
                    Thống kê học tập
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Môn đã học</span>
                      </div>
                      <span className="font-bold text-emerald-700 dark:text-emerald-300">
                        {userStats.subjectsStudied}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Bài kiểm tra</span>
                      </div>
                      <span className="font-bold text-emerald-700 dark:text-emerald-300">
                        {userStats.quizzesTaken}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Giờ học</span>
                      </div>
                      <span className="font-bold text-emerald-700 dark:text-emerald-300">
                        {userStats.hoursSpent}h
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Xếp hạng</span>
                      </div>
                      <span className="font-bold text-emerald-700 dark:text-emerald-300">
                        {userStats.rank}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInOnView>
          </div>

          {/* Right content - Activity & Details */}
          <div className="lg:col-span-2">
            <FadeInOnView amount={0.1}>
              <div className="space-y-8">
                {/* Recent Activity */}
                <div className="rounded-2xl bg-white dark:bg-slate-900 shadow-xl border border-emerald-100 dark:border-slate-700 overflow-hidden">
                  <div className="border-b border-emerald-100 dark:border-slate-700 px-6 py-4">
                    <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-2">
                      <History className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      Hoạt động gần đây
                    </h3>
                  </div>
                  <div className="p-6">
                    {loading ? (
                      // Skeleton loading
                      <div className="space-y-4">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse"></div>
                            <div className="flex-1">
                              <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-2"></div>
                              <div className="h-3 w-1/4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : recentActivity.length > 0 ? (
                      <div className="space-y-4">
                        {recentActivity.map((activity) => (
                          <div
                            key={activity.id}
                            className="flex items-start gap-3 rounded-lg border border-emerald-50 dark:border-slate-800 p-4 hover:bg-emerald-50/50 dark:hover:bg-slate-800/50 transition-all"
                          >
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                              {activity.type === "creation" ? (
                                <FileText className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                              ) : activity.type === "forum" ? (
                                <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                              ) : activity.type === "badge" ? (
                                <Award className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                              ) : (
                                <BookOpen className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-700 dark:text-gray-300">
                                {activity.action}
                              </p>
                              <div className="flex items-center gap-4 mt-1">
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {activity.time}
                                </span>
                                {activity.score && (
                                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                                    {activity.score}
                                  </span>
                                )}
                              </div>
                            </div>
                            <ChevronRight className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <History className="h-12 w-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-500 dark:text-gray-400">
                          Chưa có hoạt động nào gần đây.
                        </p>
                      </div>
                    )}

                    <div className="mt-6 pt-6 border-t border-emerald-100 dark:border-slate-700">
                      <Link
                        to="/dashboard"
                        className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                      >
                        Xem tất cả hoạt động
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Badges/Achievements */}
                <div className="rounded-2xl bg-white dark:bg-slate-900 shadow-xl border border-emerald-100 dark:border-slate-700 overflow-hidden">
                  <div className="border-b border-emerald-100 dark:border-slate-700 px-6 py-4">
                    <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-2">
                      <Award className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      Huy hiệu & Thành tích
                    </h3>
                  </div>
                  <div className="p-6">
                    {loading ? (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className="h-24 rounded-xl bg-slate-200 dark:bg-slate-700 animate-pulse"
                          ></div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Award className="h-16 w-16 text-amber-400 dark:text-amber-500 mx-auto mb-4" />
                        <h4 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-2">
                          Bạn chưa có huy hiệu nào
                        </h4>
                        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
                          Hoàn thành bài kiểm tra và tham gia tích cực để nhận được huy hiệu!
                        </p>
                        <Link
                          to="/subjects"
                          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600 px-5 py-2.5 font-semibold text-white shadow-lg hover:from-amber-600 hover:to-orange-600 dark:hover:from-amber-700 dark:hover:to-orange-700 transition-all"
                        >
                          Khám phá bài kiểm tra
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </FadeInOnView>
          </div>
        </div>
      </div>
    </div>
  );
}