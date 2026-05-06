import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MdAutoStories as BookOpen,
  MdAccessTime as Clock,
  MdLocalOffer as Tag,
  MdArrowBack as ArrowLeft,
  MdEdit as Edit,
  MdDownload as Download,
  MdShare as Share2,
  MdContentCopy as Copy,
  MdChevronRight as ChevronRight,
  MdPeopleOutline as Users,
  MdPublic as Globe,
  MdLockOutline as Lock,
  MdDescription as FileText,
  MdInsertChartOutlined as BarChart3,
  MdCalendarToday as Calendar,
  MdNumbers as Hash,
  MdEmojiEvents as Award,
  MdBookmark as BookMarked,
  MdLink as LinkIcon,
  MdCheckCircleOutline as CheckCircle2,
  MdAutoAwesome as Sparkles,
  MdRocketLaunch as Rocket,
  MdLayers as Layers
} from 'react-icons/md';
import { useAuth } from "@/app/providers/AuthProvider";
import { favoriteService } from "@/shared/api/favoriteApi";
import type { FavoriteSubject } from "@/shared/types/favorite";
import { fetchSubjectById } from "@/shared/api/subjectApi";
import type { Subject } from "@/shared/types/subject";
import { QuestionBankApi } from "@/shared/api/questionBanksApi";

import { StatCard } from "./ui/StatCard";
import { ActionButton } from "./ui/ActionButton";
import { useQuery } from "@tanstack/react-query";
import AnimatedGradientBackground from "@/shared/ui/AnimatedGradientBackground";
import GradientText from "@/shared/ui/GradientText";
import Floating from "@/shared/ui/Floatting";
import FadeInOnView from "@/shared/ui/FadeInOnView";
import { QuestionBankCardGrid } from "@/pages/question-banks/ui/QuestionBankCardGrid";

export default function SubjectDetailPage() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [subject, setSubject] = useState<Subject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);


  // 1. Chuyển đổi subjectId sang number
  const numericSubjectId = subjectId ? parseInt(subjectId, 10) : NaN;

  const {
    data: pageResult,
    isLoading: isLoadingSubjects,
  } = useQuery({
    // 2. Sử dụng numericSubjectId trong queryKey
    queryKey: ["subjects", { subjectId: numericSubjectId }],
    queryFn: async () => {
      // 3. Truyền con số đã chuyển đổi vào API
      return await QuestionBankApi.getBySubject(numericSubjectId, {
        page: 0,
        size: 3,
      });
    },
    // 4. CHỈ CHẠY query này nếu numericSubjectId là một con số hợp lệ
    enabled: !isNaN(numericSubjectId),
  });



  // Fetch subject details
  useEffect(() => {
    if (!subjectId) return;
    const ac = new AbortController();
    const id = Number(subjectId);

    async function loadSubject() {
      try {
        setLoading(true);
        setError(null);

        // Gọi trực tiếp API /subjects/:id (backend đã hỗ trợ)
        const found = await fetchSubjectById(id, ac.signal);

        // Set cả subject và loading cùng lúc để tránh flash
        setSubject(found);
        setLoading(false);

        // Fetch thông tin yêu thích (không block render chính)
        if (user) {
          try {
            const favorites = await favoriteService.getSubjects();
            setIsFavorite(favorites.some((fav: FavoriteSubject) => fav.subjectId === id));
          } catch (err) {
            console.warn("Không thể tải danh sách yêu thích:", err);
          }
        }
      } catch (err: any) {
        // Bỏ qua lỗi do cancel request (Axios: CanceledError, native: AbortError)
        if (err?.name === "AbortError" || err?.code === "ERR_CANCELED") return;
        setError(err.message || "Không thể tải thông tin môn học");
        setLoading(false);
      }
    }

    loadSubject();
    return () => ac.abort();
  }, [subjectId, user]);

  const handleToggleFavorite = async () => {
    if (!user || !subject) return;

    try {
      if (isFavorite) {
        await favoriteService.removeSubject(subject.subjectId);
        setIsFavorite(false);
      } else {
        await favoriteService.addSubject(subject.subjectId);
        setIsFavorite(true);
      }
    } catch (err) {
      console.error("Lỗi khi cập nhật yêu thích:", err);
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert("Đã sao chép liên kết vào clipboard!");
    });
  };

  const handleEdit = () => {
    if (subject) {
      navigate(`/subjects/${subject.subjectId}/edit`);
    }
  };

  const handleCreateQuiz = () => {
    if (subject) {
      navigate(`/exams/create?subjectId=${subject.subjectId}`);
    }
  };

  const handleAddQuestion = () => {
    if (subject) {
      navigate(`/questions/create?subjectId=${subject.subjectId}`);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
            className="rounded-full bg-gradient-to-tr from-emerald-400 to-teal-500 p-4 shadow-lg"
          >
            <BookOpen className="h-8 w-8 text-white" />
          </motion.div>
          <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
            Đang tải thông tin môn học...
          </p>
        </div>
      </div>
    );
  }

  // Hiển thị error (chỉ khi có lỗi thực sự)
  if (!subject || error) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-[#030712] selection:bg-rose-500/30 transition-colors duration-500">
        {/* Background Orbs */}
        <div className="absolute top-0 -left-4 w-96 h-96 bg-rose-400/30 dark:bg-rose-500/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-70 dark:opacity-20 animate-blob" />
        <div className="absolute top-0 -right-4 w-96 h-96 bg-purple-400/30 dark:bg-purple-500/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-70 dark:opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-orange-400/30 dark:bg-orange-500/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-70 dark:opacity-20 animate-blob animation-delay-4000" />

        {/* Grid & Noise Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-20 pointer-events-none" />
        <div className="absolute inset-0 bg-grid-slate-200/[0.5] dark:bg-grid-white/[0.02] bg-[bottom_1px_center] pointer-events-none" />

        <div className="relative z-10 max-w-2xl px-6 text-center">
          {/* Animated Icon Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative inline-block mb-10"
          >
            <div className="absolute inset-0 bg-rose-500 blur-3xl opacity-20 dark:opacity-30 animate-pulse" />
            <div className="relative bg-white/40 dark:bg-slate-900/50 backdrop-blur-2xl border border-slate-200/50 dark:border-white/10 p-8 rounded-[2.5rem] shadow-2xl dark:shadow-none">
              <BookOpen className="w-16 h-16 text-rose-600 dark:text-rose-400 animate-bounce" />
            </div>
          </motion.div>

          {/* Error Text - Adaptable Gradient */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[80px] font-black leading-none tracking-tighter sm:text-[120px]"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-slate-900 via-slate-700 to-slate-400/50 dark:from-white dark:via-white dark:to-white/20 select-none">
              Lỗi
            </span>
          </motion.h1>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6"
          >
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl tracking-tight">
              {error || "Môn học không tồn tại"}
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 text-md max-w-lg mx-auto leading-relaxed font-medium">
              Không thể tìm thấy thông tin môn học bạn yêu cầu. Vui lòng kiểm tra lại đường dẫn hoặc quay lại trang danh sách.
            </p>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <button
              onClick={() => navigate("/subjects")}
              className="group flex items-center gap-3 px-7 py-3.5 rounded-2xl bg-slate-200/50 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-300/50 dark:border-white/10 text-slate-700 dark:text-slate-200 transition-all active:scale-95 font-semibold"
            >
              <ArrowLeft className="w-5 h-5 text-slate-500 dark:text-slate-400 group-hover:-translate-x-1 transition-transform" />
              Quay lại danh sách môn học
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* ====== HEADER ====== */}
      <section className="relative overflow-hidden pt-12 pb-24">
        <AnimatedGradientBackground />

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-10">
            <Link
              to="/subjects"
              className="hover:text-white transition-colors flex items-center gap-1 font-medium"
            >
              <Layers className="h-4 w-4" />
              Môn học
            </Link>
            <ChevronRight className="h-4 w-4 opacity-50" />
            <span className="text-white font-bold tracking-tight bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm ring-1 ring-white/20">
              {subject.code}
            </span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 160, damping: 18 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold ring-1 ring-white/20 backdrop-blur-md"
              >
                <Sparkles className="h-4 w-4 text-yellow-300" />
                <span className="text-emerald-50 uppercase tracking-wider">Chi tiết môn học</span>
              </motion.div>

              <div className="flex flex-col lg:flex-row lg:items-center gap-6 mb-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mx-auto lg:mx-0 p-5 rounded-[2rem] bg-white/10 backdrop-blur-xl ring-1 ring-white/30 shadow-2xl shadow-emerald-500/20"
                >
                  <BookOpen className="h-12 w-12 text-white" />
                </motion.div>
                <div>
                  <motion.h1
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    className="text-4xl md:text-5xl font-black text-white leading-tight"
                  >
                    <GradientText className="text-4xl md:text-6xl font-black mx-auto lg:mx-0">
                      {subject.name}
                    </GradientText>
                  </motion.h1>

                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-wrap justify-center lg:justify-start items-center gap-3 mt-4"
                  >
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-100 ring-1 ring-emerald-500/30 backdrop-blur-sm">
                      <Hash className="h-3.5 w-3.5 text-emerald-300" />
                      {subject.code}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/20 px-3 py-1 text-xs font-bold text-blue-100 ring-1 ring-blue-500/30 backdrop-blur-sm">
                      <Globe className="h-3.5 w-3.5 text-blue-300" />
                      Công khai
                    </span>
                  </motion.div>
                </div>
              </div>

              {subject.description && (
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="text-white/80 dark:text-emerald-50/70 max-w-3xl text-lg leading-relaxed mb-8 mx-auto lg:mx-0"
                >
                  {subject.description}
                </motion.p>
              )}

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap justify-center lg:justify-start items-center gap-6 text-white/60 text-sm font-medium"
              >
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 ring-1 ring-white/10">
                  <Calendar className="h-4 w-4 text-emerald-400" />
                  <span>Ngày tạo: <span className="text-white">{new Date(subject.createdAt).toLocaleDateString('vi-VN')}</span></span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 ring-1 ring-white/10">
                  <Clock className="h-4 w-4 text-emerald-400" />
                  <span>Cập nhật: <span className="text-white">Vừa xong</span></span>
                </div>
              </motion.div>
            </div>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25 }}
              className="flex flex-col sm:flex-row lg:flex-col gap-4 min-w-[240px]"
            >
              {user && (
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleToggleFavorite}
                  className={`relative overflow-hidden group flex items-center justify-center gap-3 rounded-2xl px-6 py-4 font-black transition-all shadow-xl ${isFavorite
                    ? "bg-rose-500 text-white shadow-rose-500/20 ring-1 ring-rose-400"
                    : "bg-white/10 text-white backdrop-blur-xl ring-1 ring-white/20 hover:bg-white/20 shadow-black/20"
                    }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  {isFavorite ? (
                    <>
                      <CheckCircle2 className="h-6 w-6" />
                      Hủy quan tâm
                    </>
                  ) : (
                    <>
                      <Award className="h-6 w-6" />
                      Yêu thích
                    </>
                  )}
                </motion.button>
              )}

              <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShare}
                  className="flex items-center justify-center gap-3 rounded-2xl bg-white/10 text-white px-6 py-4 font-bold backdrop-blur-xl ring-1 ring-white/20 hover:bg-white/20 shadow-xl transition-all"
                >
                  <Share2 className="h-5 w-5" />
                  Chia sẻ
                </motion.button>

                {(user?.role === "admin" || user?.role === "teacher") && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleEdit}
                    className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-4 font-black shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all ring-1 ring-emerald-400"
                  >
                    <Edit className="h-5 w-5" />
                    Chỉnh sửa
                  </motion.button>
                )}
              </div>
            </motion.div>
          </div>

          {/* Floating decorations */}
          <Floating distance={15} duration={7} className="pointer-events-none absolute top-12 left-1/2">
            <div className="rounded-full bg-emerald-400/20 p-4 blur-2xl h-32 w-32" />
          </Floating>
          <Floating distance={20} duration={8} className="pointer-events-none absolute bottom-12 right-24">
            <div className="rounded-full bg-purple-400/10 p-6 blur-3xl h-48 w-48" />
          </Floating>
        </div>
      </section>

      {/* ====== MAIN CONTENT ====== */}
      <div className="mx-auto max-w-7xl px-6 -mt-12 relative z-20 pb-24">
        <div className="grid gap-16">
          {/* Quick actions & Stats */}
          <FadeInOnView amount={0.1}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Actions */}
              <div className="lg:col-span-8">
                <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                  <h2 className="text-3xl font-black text-slate-800 dark:text-emerald-50 tracking-tight flex items-center gap-3">
                    <div className="p-2.5 rounded-2xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 shadow-inner ring-1 ring-emerald-200 dark:ring-emerald-800">
                      <Rocket className="h-7 w-7" />
                    </div>
                    Thao tác nhanh
                  </h2>
                  <div className="flex items-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleCreateQuiz}
                      className="group flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3.5 font-black text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all ring-1 ring-emerald-400"
                    >
                      <BookMarked className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                      Tạo Bài kiểm tra
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleAddQuestion}
                      className="group flex items-center gap-2.5 rounded-2xl bg-white dark:bg-slate-900 px-6 py-3.5 font-bold text-slate-700 dark:text-emerald-100 border border-slate-200 dark:border-emerald-900/50 shadow-md hover:shadow-xl transition-all"
                    >
                      <FileText className="h-5 w-5 text-emerald-500 group-hover:-translate-y-1 transition-transform" />
                      Thêm Câu hỏi
                    </motion.button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      to: `/questions?subjectId=${subject.subjectId}`,
                      icon: FileText,
                      title: "Danh sách Câu hỏi",
                      desc: "Xem tất cả các câu hỏi có trong môn học này.",
                      color: "emerald",
                      bg: "bg-emerald-50 dark:bg-emerald-500/10",
                      text: "text-emerald-600 dark:text-emerald-400"
                    },
                    {
                      to: `/quizzes?subjectId=${subject.subjectId}`,
                      icon: BookMarked,
                      title: "Bài kiểm tra",
                      desc: "Danh sách các bài thi trắc nghiệm hiện có.",
                      color: "blue",
                      bg: "bg-blue-50 dark:bg-blue-500/10",
                      text: "text-blue-600 dark:text-blue-400"
                    },
                    {
                      to: `/resources?search=${subject.code}`,
                      icon: BookOpen,
                      title: "Kho tài liệu",
                      desc: "Các tài liệu học tập và đề cương liên quan.",
                      color: "purple",
                      bg: "bg-purple-50 dark:bg-purple-500/10",
                      text: "text-purple-600 dark:text-purple-400"
                    }
                  ].map((item, idx) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ y: -8, scale: 1.01 }}
                      className="group relative"
                    >
                      <Link
                        to={item.to}
                        className="block h-full rounded-[2.5rem] bg-white dark:bg-slate-900 p-8 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:border-emerald-300 dark:hover:border-emerald-500/50 transition-all duration-500 overflow-hidden"
                      >
                        {/* Gradient border effect on hover */}
                        <div
                          className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            padding: '2px',
                            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                            WebkitMaskComposite: 'xor'
                          }}
                        />

                        {/* Corner decorations */}
                        <div className="pointer-events-none absolute top-0 right-0 w-24 h-24 overflow-hidden">
                          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-bl-3xl transition-all duration-500 group-hover:scale-150 opacity-0 group-hover:opacity-100" />
                        </div>
                        <div className="pointer-events-none absolute bottom-0 left-0 w-24 h-24 overflow-hidden">
                          <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 rounded-tr-3xl transition-all duration-500 group-hover:scale-150 opacity-0 group-hover:opacity-100" />
                        </div>

                        <div className="relative z-10">
                          <div className="flex items-start justify-between mb-8">
                            <div className={`p-4 rounded-2xl ${item.bg} ring-1 ring-slate-100 dark:ring-emerald-900/30 shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                              <item.icon className={`h-8 w-8 ${item.text}`} />
                            </div>
                            <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
                              <ChevronRight className="h-5 w-5" />
                            </div>
                          </div>
                          <h3 className="text-xl font-black text-slate-800 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-sm text-slate-500 dark:text-emerald-100/50 leading-relaxed font-medium">
                            {item.desc}
                          </p>
                        </div>

                        {/* Progress bar at bottom on hover */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-100 dark:bg-slate-800/50">
                          <motion.div
                            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
                            initial={{ width: "0%" }}
                            whileHover={{ width: "100%" }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                          />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Stats Sidebar */}
              <div className="lg:col-span-4">
                <div className="rounded-[2.5rem] bg-slate-900 p-10 text-white shadow-2xl relative overflow-hidden group">
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-400 via-transparent to-transparent group-hover:scale-150 transition-transform duration-1000" />

                  <h3 className="text-2xl font-black mb-8 flex items-center gap-3 relative z-10">
                    <BarChart3 className="h-7 w-7 text-emerald-400" />
                    Thống kê môn học
                  </h3>

                  <div className="space-y-8 relative z-10">
                    {[
                      { label: "Tổng số Câu hỏi", value: "1,248", icon: FileText, color: "text-emerald-400" },
                      { label: "Bài kiểm tra khả thi", value: "24", icon: BookMarked, color: "text-blue-400" },
                      { label: "Độ phổ biến", value: "Cao", icon: Award, color: "text-amber-400" }
                    ].map((stat) => (
                      <div key={stat.label} className="flex items-center justify-between group/item">
                        <div className="flex items-center gap-4">
                          <div className="p-2.5 rounded-xl bg-white/5 ring-1 ring-white/10 group-hover/item:bg-white/10 transition-colors">
                            <stat.icon className={`h-5 w-5 ${stat.color}`} />
                          </div>
                          <span className="text-sm font-bold text-white/60">{stat.label}</span>
                        </div>
                        <span className="text-xl font-black tracking-tight">{stat.value}</span>
                      </div>
                    ))}
                  </div>


                </div>
              </div>
            </div>
          </FadeInOnView>

          {/* Question Banks Section */}
          <section>
            <FadeInOnView amount={0.1}>
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-3xl font-black text-slate-800 dark:text-emerald-50 tracking-tight flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 shadow-inner ring-1 ring-emerald-200 dark:ring-emerald-800">
                    <Layers className="h-7 w-7" />
                  </div>
                  Bộ câu hỏi nổi bật
                </h2>
                <Link
                  to={`/question-banks?search=${subject.name}`}
                  className="group flex items-center gap-2 text-sm font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-5 py-2.5 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-all"
                >
                  Khám phá tất cả <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </FadeInOnView>

            {/* Loading State (Skeleton) */}
            {isLoadingSubjects && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-64 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 animate-pulse" />
                ))}
              </div>
            )}

            {/* Empty State */}
            {!isLoadingSubjects && pageResult?.content.length === 0 && (
              <FadeInOnView amount={0.2}>
                <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800 shadow-inner">
                  <div className="mx-auto w-24 h-24 bg-slate-50 dark:bg-slate-800/50 rounded-full flex items-center justify-center mb-6 ring-1 ring-slate-100 dark:ring-slate-700">
                    <FileText className="h-10 w-10 text-slate-300" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-2">Chưa có dữ liệu bộ câu hỏi</h3>
                  <p className="text-slate-500 dark:text-emerald-100/40 max-w-md mx-auto font-medium">Hiện chưa có bộ câu hỏi nào được liên kết với môn học này. Hãy khởi tạo bộ câu hỏi đầu tiên!</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-10 px-8 py-4 bg-emerald-500 text-white font-black rounded-2xl shadow-xl shadow-emerald-500/20"
                  >
                    Khởi tạo ngay
                  </motion.button>
                </div>
              </FadeInOnView>
            )}

            {/* Grid Layout for Question Banks */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pageResult?.content.map((bank, index) => (
                <FadeInOnView key={bank.bankId} amount={0.1} delay={index * 0.1}>
                  <QuestionBankCardGrid
                    bank={bank}
                    isFavorite={false}
                    isSelected={false}
                    onToggleFavorite={() => {}}
                    onToggleSelect={() => {}}
                    userId={user?.userId}
                    userRole={user?.role}
                  />
                </FadeInOnView>
              ))}
            </div>
          </section>

          {/* Recent activity */}
          <FadeInOnView amount={0.2}>
            <section>
              <h2 className="text-3xl font-black text-slate-800 dark:text-emerald-50 tracking-tight flex items-center gap-3 mb-10">
                <div className="p-2.5 rounded-2xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 shadow-inner ring-1 ring-emerald-200 dark:ring-emerald-800">
                  <Clock className="h-7 w-7" />
                </div>
                Hoạt động gần đây
              </h2>

              <div className="rounded-[3rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-none">
                <div className="p-16 text-center">
                  <div className="relative inline-block mb-8">
                    <div className="absolute inset-0 bg-emerald-500 blur-3xl opacity-10 animate-pulse" />
                    <div className="relative p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50 ring-1 ring-slate-100 dark:ring-slate-700">
                      <FileText className="h-16 w-16 text-slate-200 dark:text-slate-700" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-2">Hệ thống đang sẵn sàng</h3>
                  <p className="text-slate-500 dark:text-emerald-100/30 max-w-md mx-auto font-medium">Chưa phát hiện hoạt động mới trong chu kỳ này. Mọi tương tác của bạn sẽ được ghi lại tại đây.</p>
                </div>
              </div>
            </section>
          </FadeInOnView>
        </div>
      </div>
    </div>
  );
}