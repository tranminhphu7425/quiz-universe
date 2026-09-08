import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MdFavoriteBorder as Heart,
  MdNoteAdd as FilePlus2,
  MdAutoStories as BookOpen,
  MdArrowForward as ArrowRight,
  MdDeleteOutline as Trash2,
  MdInsertChartOutlined as BarChart3,
  MdCheckCircle as CheckCircle,
  MdCalendarToday as Calendar,
  MdAdsClick as Target,
  MdBookmark as BookMarked,
  MdHelpCenter as FileQuestion,
  MdAutoAwesome as Sparkles,
  MdEmojiEvents as Trophy,
  MdPsychology as Brain,
  MdHistory as History,
  MdFlashOn as Zap,
  MdLocalActivity as Activity,
  MdBarChart as BarChart,
  MdPieChartOutline as PieChart,
  MdLibraryAddCheck as BookCheck
} from 'react-icons/md';

import { useAuth } from "@/app/providers/AuthProvider";
import { favoriteService } from "@/shared/api/favoriteApi";
import TypewriterText from "@/shared/ui/TypewriterText";
// import OrbitingSkills from "@/shared/ui/OrbitingSkills";
import { FavoriteQuestionBank, FavoriteSubject } from "@/shared/types/favorite";
import AnimatedGradientBackground from "@/shared/ui/AnimatedGradientBackground";
import { UserLearningStats, RecentActivity } from "@/shared/types/dashboard";

// =============================
// Types & interfaces
// =============================

// =============================
// Dashboard Page
// =============================
export default function DashboardPage() {
  const user = useAuth();
  const [questionBankFavorites, setQuestionBankFavorites] = useState<FavoriteQuestionBank[]>([]);
  const [subjectFavorites, setSubjectFavorites] = useState<FavoriteSubject[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'stats' | 'recent'>('overview');
  const [userStats] = useState<UserLearningStats>({
    totalQuestions: 0,
    completedSets: 0,
    totalStudyTime: 0,
    accuracy: 85,
    streak: 7,
    level: 3,
    xp: 450
  });

  const User = user?.user;


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
        if (!User) return;
        const questionBankData = await favoriteService.getQuestionBanks();
        const subjectData = await favoriteService.getSubjects();
        setQuestionBankFavorites(questionBankData);
        setSubjectFavorites(subjectData);
        console.log("Chay subject data", subjectData);

      } catch (err) {
        console.error(err);
      }
    };

    loadFavorite();
  }, [User]);

  async function removeFavorite(s: FavoriteQuestionBank | FavoriteSubject) {
    try {
      if (!User) return;
      if ('bankId' in s) {
        await favoriteService.removeQuestionBank(s.bankId);
        setQuestionBankFavorites(prev => prev.filter(fav => fav.bankId !== s.bankId));
      } else {
        await favoriteService.removeSubject(s.subjectId);
        setSubjectFavorites(prev => prev.filter(fav => fav.subjectId !== s.subjectId));
      }
    }
    catch (e) {
      console.error("Failed to remove favorite:", e);
    }
  }

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
      label: 'Công cụ tiện ích cho sinh viên CTU',
      to: '/ctu',
      color: 'from-blue-500 to-indigo-600',
      shadow: 'shadow-indigo-500/25',
      iconBg: 'bg-blue-300/30',
      className: 'col-span-2'
    },
  ];

  const upcomingDeadlines = [
    { title: 'Bài tập CT296', dueDate: '2024-06-15', subject: 'CT296', priority: 'high' },
    { title: 'Ôn thi cuối kỳ', dueDate: '2024-06-20', subject: 'Toàn bộ', priority: 'medium' },
    { title: 'Bài tập lớn', dueDate: '2024-06-25', subject: 'CTDL', priority: 'high' },
    { title: 'Bài tập lớn', dueDate: '2024-06-25', subject: 'CTDL', priority: 'high' },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/50 to-slate-50 dark:from-slate-900 dark:via-gray-900/50 dark:to-slate-900">




      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        <AnimatedGradientBackground />


        <div className="relative z-10 mx-auto max-w-7xl px-6 py-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
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

                  {/* Favorites Queston_bank Section */}
                  <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                    <div className="mb-6 flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white inline-flex items-center gap-2">
                          <Heart className="h-5 w-5 text-rose-500" />
                          Bộ câu hỏi yêu thích
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                          Truy cập nhanh các bộ câu hỏi bạn yêu thích
                        </p>
                      </div>
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                        {questionBankFavorites.length} bộ
                      </span>
                    </div>

                    {questionBankFavorites.length === 0 ? (
                      <div className="rounded-xl border-2 border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
                        <Heart className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-700" />
                        <p className="mt-3 font-medium text-slate-700 dark:text-slate-300">Chưa có bộ câu hỏi yêu thích</p>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                          Bấm vào ♥ ở các bộ câu hỏi để thêm vào đây
                        </p>
                        <Link
                          to="/subjects"
                          className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                        >
                          <BookOpen className="h-4 w-4" />
                          Khám phá bộ câu hỏi
                        </Link>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {questionBankFavorites.map((questionBank) => (
                          <motion.div
                            key={questionBank.bankId}
                            whileHover={{ y: -4 }}
                            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 to-white p-4 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700"
                          >
                            <button
                              onClick={() => removeFavorite(questionBank)}
                              className="absolute right-3 top-3 rounded-full p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-500 dark:hover:bg-rose-900/20"
                              title="Bỏ yêu thích"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>


                            <div className="flex h-full gap-3 flex-col justify-between">
                              <div className="flex items-start gap-3">
                                <div className="rounded-lg bg-emerald-100 p-2 dark:bg-emerald-900/30">
                                  <BookMarked className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                </div>



                                <div className="flex-1">
                                  <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                                    {questionBank.subjectName || 'Không có tên môn'}
                                  </p>
                                  <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                                    {questionBank.bankName}
                                  </h3>




                                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                    {questionBank.bankDescription || 'Không có mã môn'}
                                  </p>

                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Link
                                  to={`/questions/subject/${questionBank.bankId}`}
                                  className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-3 py-1 text-xs font-medium text-white hover:bg-emerald-700"
                                >
                                  Học ngay
                                  <ArrowRight className="h-3 w-3" />
                                </Link>
                                <Link
                                  to={`/resources?search=${questionBank.subjectName}`}
                                  className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300"
                                >
                                  <FileQuestion className="h-3 w-3" />
                                  Tài liệu
                                </Link>
                              </div>

                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>


                  {/* Favorites Subject Section */}
                  <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                    <div className="mb-6 flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white inline-flex items-center gap-2">
                          <Heart className="h-5 w-5 text-rose-500" />
                          Bộ môn yêu thích
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                          Truy cập nhanh các môn học bạn yêu thích
                        </p>
                      </div>
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                        {subjectFavorites.length} môn
                      </span>
                    </div>

                    {subjectFavorites.length === 0 ? (
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
                        {subjectFavorites.map((subject) => (
                          <motion.div
                            key={subject.subjectId}
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

                            <div className="flex flex-col items-start gap-3 h-full justify-between">
                              <div className="flex items-start gap-3">
                                <div className="rounded-lg bg-emerald-100 p-2 dark:bg-emerald-900/30">
                                  <BookMarked className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                                    {subject.subjectName}
                                  </h3>
                                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                    {subject.subjectCode || 'Không có mã môn'}
                                  </p>

                                </div>
                              </div>
                              <div className="mt-3 flex items-center gap-2">
                                <Link
                                  to={`/questions/subject/${subject.subjectId}`}
                                  className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-3 py-1 text-xs font-medium text-white hover:bg-emerald-700"
                                >
                                  Thông tin
                                  <ArrowRight className="h-3 w-3" />
                                </Link>
                                <Link
                                  to={`/resources?search=${subject.subjectName}`}
                                  className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300"
                                >
                                  <FileQuestion className="h-3 w-3" />
                                  Tài liệu
                                </Link>
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
              to="/question-bank/create"
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