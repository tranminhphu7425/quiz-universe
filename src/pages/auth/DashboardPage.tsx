import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  ListChecks,
  FolderPlus,
  FilePlus2,
  BookOpen,
  ArrowRight,
  Trash2,
  ExternalLink,
  Star,
  Clock,
  Tag,
  BarChart3,
  TrendingUp,
  Eye,
  CheckCircle,
  Download,
  Share2,
  Users,
  Calendar,
  Target,
  BookMarked,
  FileQuestion,
  Sparkles,
  Bell,
  Settings,
  Trophy,
  Brain,
  History,
  Zap,
  Activity,
  BarChart,
  PieChart,
  BookCheck,
  GraduationCap
} from "lucide-react";

import LoadingState from "@/widgets/LoadingState";
import Floating from "@/shared/ui/Floatting";
import { useAuth } from "@/app/providers/AuthProvider";
import { Subject } from "@/shared/api/subjectApi";
import favoriteApi, { fetchFavorites } from "@/shared/api/favoriteApi";
import TypewriterText from "@/shared/ui/TypewriterText";
import OrbitingSkills from "@/shared/ui/OrbitingSkills";

// =============================
// Types & interfaces
// =============================
export type QuestionSet = {
  id: number;
  name: string;
  subjectId?: number | null;
  subjectName?: string | null;
  questionsCount: number;
  createdAt?: string;
  updatedAt?: string;
  ownerId?: number | string;
  ownerName?: string;
  progress?: number;
};

type UserStats = {
  totalQuestions: number;
  completedSets: number;
  totalStudyTime: number;
  accuracy: number;
  streak: number;
  level: number;
  xp: number;
};

type RecentActivity = {
  id: number;
  type: 'practice' | 'create' | 'favorite' | 'complete';
  title: string;
  description: string;
  subjectName?: string;
  timestamp: string;
  icon: React.ReactNode;
  color: string;
};

// =============================
// Dashboard Page
// =============================
export default function DashboardPage() {
  const user = useAuth();
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState<Subject[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'stats' | 'recent'>('overview');
  const [userStats, setUserStats] = useState<UserStats>({
    totalQuestions: 0,
    completedSets: 0,
    totalStudyTime: 0,
    accuracy: 85,
    streak: 7,
    level: 3,
    xp: 450
  });

  const User = user?.user;
  const token = localStorage.getItem("auth_token");

  // Mock recent activities
  const recentActivities: RecentActivity[] = [
    {
      id: 1,
      type: 'practice',
      title: 'Hoàn thành bài tập CT296',
      description: 'Đã làm xong 20/25 câu hỏi',
      subjectName: 'CT296',
      timestamp: '2 giờ trước',
      icon: <CheckCircle className="h-4 w-4" />,
      color: 'text-green-500 bg-green-100 dark:bg-green-900/30'
    },
    {
      id: 2,
      type: 'favorite',
      title: 'Đã thêm vào yêu thích',
      description: 'CTDL & GT - Bài tập chương 3',
      subjectName: 'CTDL',
      timestamp: 'Hôm qua',
      icon: <Heart className="h-4 w-4" />,
      color: 'text-rose-500 bg-rose-100 dark:bg-rose-900/30'
    },
    {
      id: 3,
      type: 'complete',
      title: 'Đạt mốc học tập',
      description: 'Đã học liên tiếp 7 ngày',
      timestamp: '3 ngày trước',
      icon: <Trophy className="h-4 w-4" />,
      color: 'text-amber-500 bg-amber-100 dark:bg-amber-900/30'
    }
  ];

  useEffect(() => {
    const loadFavorite = async () => {
      try {
        const data = await fetchFavorites(User?.id, token!);
        setFavorites(data);
      } catch (err) {
        console.error(err);
      }
    };

    loadFavorite();
  }, []);

  async function removeFavorite(s: Subject) {
    try {
      await favoriteApi.delete(`/subjects/${s.id}/favorite?userId=${User?.id}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      setFavorites(prev => prev.filter(fav => fav.id !== s.id));
    }
    catch (e) {
      console.error("Failed to remove favorite:", e);
    }
  }

  const quickActions = [
    { icon: <FilePlus2 />, label: 'Tạo bộ câu hỏi mới', to: '/question_bank/create', color: 'bg-yellow-500' },

    { icon: <Brain />, label: 'Ôn tập', to: '/review', color: 'bg-red-400' },

    // { icon: <FolderPlus />, label: 'Tải lên tài liệu', to: '/files/upload', color: 'bg-blue-400' },

  ];

  const upcomingDeadlines = [
    { title: 'Bài tập CT296', dueDate: '2024-06-15', subject: 'CT296', priority: 'high' },
    { title: 'Ôn thi cuối kỳ', dueDate: '2024-06-20', subject: 'Toàn bộ', priority: 'medium' },
    { title: 'Bài tập lớn', dueDate: '2024-06-25', subject: 'CTDL', priority: 'high' }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/50 to-slate-50 dark:from-slate-900 dark:via-gray-900/50 dark:to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(16,185,129,0.05)_25%,rgba(16,185,129,0.05)_50%,transparent_50%,transparent_75%,rgba(16,185,129,0.05)_75%)] bg-[length:20px_20px]" />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />

        {/* Animated background elements */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 -top-24 h-96 w-96 animate-pulse rounded-full bg-white/10 blur-3xl dark:bg-emerald-400/10" />
          <div className="absolute -right-16 top-10 h-80 w-80 animate-pulse rounded-full bg-white/10 blur-3xl dark:bg-purple-400/10" />
          <div className="absolute bottom-10 left-1/3 h-64 w-64 animate-pulse rounded-full bg-white/5 blur-3xl dark:bg-blue-400/10" />
        </div>

        <OrbitingSkills />

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
                text={`Xin chào, ${User?.name || "Học viên"}! 👋`}
                className="text-4xl md:text-5xl font-black leading-tight text-white mb-3"
              />

              <p className="mb-6 max-w-2xl text-lg text-white/90">
                Tiếp tục hành trình học tập của bạn. Hôm nay bạn muốn làm gì?
              </p>

              {/* User Stats Badges */}
              <div className="flex flex-wrap gap-3">
                <div className="rounded-full bg-white/20 px-3 py-1.5 text-xs text-white backdrop-blur-md flex items-center gap-1">
                  <Trophy className="h-3 w-3" />
                  Cấp {userStats.level}
                </div>
                <div className="rounded-full bg-white/20 px-3 py-1.5 text-xs text-white backdrop-blur-md flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  {userStats.streak} ngày liên tiếp
                </div>
                <div className="rounded-full bg-white/20 px-3 py-1.5 text-xs text-white backdrop-blur-md flex items-center gap-1">
                  <Target className="h-3 w-3" />
                  {userStats.accuracy}% chính xác
                </div>
              </div>
            </motion.div>

            {/* Quick Actions Grid */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-2 gap-3"
            >
              {quickActions.map((action, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to={action.to}
                    className={`flex items-center gap-3 group relative overflow-hidden rounded-xl
                backdrop-blur-md px-4 py-3
               transition-all hover:bg-white/15" ${action.color} `}
                  >
                   

                    {/* Icon */}
                    <div className="relative z-10 flex-shrink-0">
                      {action.icon}
                    </div>

                    {/* Label */}
                    <div className="relative z-10 font-medium text-white whitespace-nowrap">
                      {action.label}
                    </div>

                    {/* Arrow */}
                    <ArrowRight
                      className="relative z-10 h-4 w-4 text-white/60
                 group-hover:text-white
                 group-hover:translate-x-1 transition-all"
                    />
                  </Link>
                </motion.div>

              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <main className="relative z-10 mx-auto max-w-7xl px-6 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="inline-flex rounded-lg bg-white/50 p-1 backdrop-blur-sm dark:bg-slate-800/50">
            {[
              { id: 'overview', label: 'Tổng quan', icon: <BarChart3 className="h-4 w-4" /> },
              { id: 'stats', label: 'Thống kê', icon: <Activity className="h-4 w-4" /> },
              { id: 'recent', label: 'Hoạt động', icon: <History className="h-4 w-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all ${activeTab === tab.id
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'text-slate-600 hover:text-emerald-600 dark:text-slate-300'
                  }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Progress & Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Tổng số câu hỏi', value: userStats.totalQuestions, icon: <FileQuestion />, color: 'bg-blue-500' },
                      { label: 'Độ chính xác', value: `${userStats.accuracy}%`, icon: <Target />, color: 'bg-emerald-500' },
                      { label: 'Bộ đã hoàn thành', value: userStats.completedSets, icon: <CheckCircle />, color: 'bg-purple-500' },
                      { label: 'Chuỗi học tập', value: `${userStats.streak} ngày`, icon: <Zap />, color: 'bg-amber-500' }
                    ].map((stat, index) => (
                      <div key={index} className="rounded-2xl bg-white p-4 shadow-sm dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</div>
                            <div className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
                          </div>
                          <div className={`${stat.color} p-2 rounded-lg text-white`}>
                            {stat.icon}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Favorites Section */}
                  <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                    <div className="mb-6 flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white inline-flex items-center gap-2">
                          <Heart className="h-5 w-5 text-rose-500" />
                          Môn học yêu thích
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                          Truy cập nhanh các môn học bạn yêu thích
                        </p>
                      </div>
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                        {favorites.length} môn
                      </span>
                    </div>

                    {favorites.length === 0 ? (
                      <div className="rounded-xl border-2 border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
                        <Heart className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-700" />
                        <p className="mt-3 font-medium text-slate-700 dark:text-slate-300">Chưa có môn học yêu thích</p>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                          Bấm vào ♥ ở các môn học để thêm vào đây
                        </p>
                        <Link
                          to="/subjects"
                          className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                        >
                          <BookOpen className="h-4 w-4" />
                          Khám phá môn học
                        </Link>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {favorites.map((subject) => (
                          <motion.div
                            key={subject.id}
                            whileHover={{ y: -4 }}
                            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 to-white p-4 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700"
                          >
                            <button
                              onClick={() => removeFavorite(subject)}
                              className="absolute right-3 top-3 rounded-full p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-500 dark:hover:bg-rose-900/20"
                              title="Bỏ yêu thích"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>

                            <div className="flex items-start gap-3">
                              <div className="rounded-lg bg-emerald-100 p-2 dark:bg-emerald-900/30">
                                <BookMarked className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                                  {subject.name}
                                </h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                  {subject.code || 'Không có mã môn'}
                                </p>
                                <div className="mt-3 flex items-center gap-2">
                                  <Link
                                    to={`/questions/subject/${subject.id}`}
                                    className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-3 py-1 text-xs font-medium text-white hover:bg-emerald-700"
                                  >
                                    Học ngay
                                    <ArrowRight className="h-3 w-3" />
                                  </Link>
                                  <Link
                                    to={`/files/subject/${subject.id}`}
                                    className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300"
                                  >
                                    <FileQuestion className="h-3 w-3" />
                                    Tài liệu
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Upcoming Deadlines */}
                  <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 p-6 shadow-sm dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800/30">
                    <h2 className="mb-4 text-lg font-bold text-slate-900 dark:text-white inline-flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-amber-600" />
                      Hạn sắp tới
                    </h2>
                    <div className="space-y-4">
                      {upcomingDeadlines.map((deadline, index) => (
                        <div key={index} className="rounded-lg bg-white/80 p-3 dark:bg-slate-800/80">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium text-slate-900 dark:text-white">{deadline.title}</h4>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                {deadline.subject} • {deadline.dueDate}
                              </p>
                            </div>
                            <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${deadline.priority === 'high'
                              ? 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400'
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                              }`}>
                              {deadline.priority === 'high' ? 'Cao' : 'Trung bình'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Activities */}
                  <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                    <h2 className="mb-4 text-lg font-bold text-slate-900 dark:text-white inline-flex items-center gap-2">
                      <History className="h-5 w-5 text-purple-600" />
                      Hoạt động gần đây
                    </h2>
                    <div className="space-y-4">
                      {recentActivities.map((activity) => (
                        <div key={activity.id} className="flex items-start gap-3">
                          <div className={`rounded-lg p-2 ${activity.color}`}>
                            {activity.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-slate-900 dark:text-white">{activity.title}</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{activity.description}</p>
                            <span className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                              {activity.timestamp}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Tips */}
                  <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-green-50 p-6 shadow-sm dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-200 dark:border-emerald-800/30">
                    <h2 className="mb-3 text-lg font-bold text-slate-900 dark:text-white inline-flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-emerald-600" />
                      Mẹo học tập
                    </h2>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <div className="mt-0.5 rounded-full bg-emerald-100 p-1 dark:bg-emerald-900/30">
                          <CheckCircle className="h-3 w-3 text-emerald-600" />
                        </div>
                        <span className="text-sm text-slate-700 dark:text-slate-300">
                          Ôn tập 30 phút mỗi ngày giúp cải thiện 40% khả năng ghi nhớ
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="mt-0.5 rounded-full bg-emerald-100 p-1 dark:bg-emerald-900/30">
                          <CheckCircle className="h-3 w-3 text-emerald-600" />
                        </div>
                        <span className="text-sm text-slate-700 dark:text-slate-300">
                          Tạo flashcards cho các công thức quan trọng
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'stats' && (
              <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">Thống kê học tập</h2>
                {/* Stats charts would go here */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 p-6 dark:from-blue-900/20 dark:to-cyan-900/20">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="font-semibold text-slate-900 dark:text-white">Tiến độ học tập</h3>
                      <BarChart className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="h-48 flex items-center justify-center rounded-lg bg-white/50 dark:bg-slate-800/50">
                      <p className="text-slate-400">Biểu đồ sẽ được hiển thị ở đây</p>
                    </div>
                  </div>
                  <div className="rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 p-6 dark:from-purple-900/20 dark:to-pink-900/20">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="font-semibold text-slate-900 dark:text-white">Phân bổ thời gian</h3>
                      <PieChart className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="h-48 flex items-center justify-center rounded-lg bg-white/50 dark:bg-slate-800/50">
                      <p className="text-slate-400">Biểu đồ sẽ được hiển thị ở đây</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'recent' && (
              <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">Lịch sử hoạt động</h2>
                {/* Activity log would go here */}
                <div className="space-y-4">
                  {[...recentActivities, ...recentActivities].map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 rounded-lg border border-slate-200 p-4 dark:border-slate-700">
                      <div className={`rounded-lg p-3 ${activity.color}`}>
                        {activity.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-slate-900 dark:text-white">{activity.title}</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{activity.description}</p>
                      </div>
                      <span className="text-sm text-slate-400">{activity.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Bottom Action Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 p-6 shadow-lg"
        >
          <div>
            <h3 className="text-xl font-bold text-white">Sẵn sàng học tập?</h3>
            <p className="mt-1 text-emerald-100">
              Bắt đầu phiên học mới và đạt được mục tiêu của bạn
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/app/questions/create"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-semibold text-emerald-600 hover:bg-emerald-50"
            >
              <FilePlus2 className="h-4 w-4" />
              Tạo đề thi mới
            </Link>
            <Link
              to="/subjects"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-800/30 px-5 py-2.5 font-medium text-white hover:bg-emerald-800/50"
            >
              <BookCheck className="h-4 w-4" />
              Ôn tập ngay
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}