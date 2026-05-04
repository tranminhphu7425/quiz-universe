// src/pages/profile/ProfilePage.tsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  MdPersonOutline as User,
  MdMailOutline as Mail,
  MdBusiness as Building2,
  MdShield as Shield,
  MdEdit as Edit,
  MdAutoStories as BookOpen,
  MdEmojiEvents as Award,
  MdHistory as History,
  MdStarOutline as Star,
  MdChevronRight as ChevronRight,
  MdAccountCircle as UserCircle,
  MdSchool as GraduationCap,
  MdAccessTime as Clock,
  MdDescription as FileText,
  MdAutoAwesome as Sparkles,
  MdEmojiEvents as Trophy,
  MdFlashOn as Zap,
  MdAdsClick as Target,
  MdNoteAdd as FilePlus2,
  MdPsychology as Brain,
  MdArrowForward as ArrowRight
} from 'react-icons/md';
import { useAuth } from "@/app/providers/AuthProvider";
import FadeInOnView from "@/shared/ui/FadeInOnView";
import GradientText from "@/shared/ui/GradientText";
import TypewriterText from "@/shared/ui/TypewriterText";
import AnimatedGradientBackground from "@/shared/ui/AnimatedGradientBackground";

export default function ProfilePage() {
  const { user } = useAuth();

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
        return <Shield className="h-4 w-4 text-red-600 dark:text-red-400" />;
      case "teacher":
        return <GraduationCap className="h-4 w-4 text-blue-600 dark:text-blue-400" />;
      case "student":
        return <UserCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />;
      default:
        return <User className="h-4 w-4" />;
    }
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

  const quickActions = [
    {
      icon: <FilePlus2 className="h-5 w-5" />,
      label: 'Tạo bộ câu hỏi mới',
      to: '/question-bank/create',
      color: 'from-amber-400 to-orange-500',
      shadow: 'shadow-orange-500/25',
      iconBg: 'bg-amber-300/30'
    },
    {
      icon: <Brain className="h-5 w-5" />,
      label: 'Ôn tập ngay',
      to: '/review',
      color: 'from-rose-400 to-pink-500',
      shadow: 'shadow-rose-500/25',
      iconBg: 'bg-rose-300/30'
    },
    {
      icon: <Zap className="h-5 w-5" />,
      label: 'Công cụ cho sinh viên CTU',
      to: '/ctu',
      color: 'from-blue-500 to-indigo-600',
      shadow: 'shadow-indigo-500/25',
      iconBg: 'bg-blue-300/30',
      className: 'col-span-2'
    },
  ];


  return (
    <div className="profile-page bg-slate-50 dark:bg-slate-900 min-h-screen">
      {/* ====== HEADER ====== */}
      <section className="relative overflow-hidden">
        <AnimatedGradientBackground />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-16">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1"
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold text-white ring-1 ring-white/30 backdrop-blur-md">
                <Sparkles className="h-4 w-4" />
                Chào mừng trở lại!
              </div>

              <TypewriterText
                text={`Xin chào, ${user?.name || "Học viên"}! 👋`}
                className="text-4xl md:text-5xl font-black leading-tight text-white mb-3"
              />

              <p className="mb-6 max-w-2xl text-lg text-white/90">
                Xem và quản lý thông tin cá nhân, thành tích học tập và hoạt động gần đây của bạn tại Quiz Universe.
              </p>

              {/* User Stats Badges */}
              <div className="flex flex-wrap gap-3">
                <div className="rounded-full bg-white/20 px-3 py-1.5 text-xs text-white backdrop-blur-md flex items-center gap-1">
                  <Trophy className="h-3 w-3" />
                  Hạng {userStats.rank}
                </div>
                <div className="rounded-full bg-white/20 px-3 py-1.5 text-xs text-white backdrop-blur-md flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  {userStats.streakDays} ngày liên tiếp
                </div>
                <div className="rounded-full bg-white/20 px-3 py-1.5 text-xs text-white backdrop-blur-md flex items-center gap-1">
                  <Target className="h-3 w-3" />
                  {userStats.averageScore}% chính xác
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className={action.className}
                >
                  <Link
                    to={action.to}
                    className={`group relative flex items-center justify-between gap-4 overflow-hidden rounded-2xl bg-gradient-to-br ${action.color} p-4 shadow-lg ${action.shadow} transition-all duration-300`}
                  >
                    {/* Background Decorative Element */}
                    <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-white/10 transition-transform duration-500 group-hover:scale-150" />
                    <div className="absolute -left-4 -bottom-4 h-16 w-16 rounded-full bg-black/5 transition-transform duration-500 group-hover:scale-150" />

                    <div className="flex items-center gap-3 relative z-10">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${action.iconBg} border border-white/20 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12`}>
                        <div className="text-white">
                          {action.icon}
                        </div>
                      </div>
                      <div className="font-bold text-white tracking-tight text-sm md:text-base">
                        {action.label}
                      </div>
                    </div>

                    <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
                      <ArrowRight className="h-4 w-4 text-white" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
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