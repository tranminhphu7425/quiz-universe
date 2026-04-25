// src/app/pages/SubjectDetailPage.tsx
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen, Clock, Tag, ArrowLeft, Edit, Download,
  Share2, Copy, ChevronRight, Users, Globe, Lock,
  FileText, BarChart3, Calendar, Hash, Award,
  BookMarked, Link as LinkIcon, CheckCircle2
} from "lucide-react";
import { useAuth } from "@/app/providers/AuthProvider";
import { favoriteService } from "@/shared/api/favoriteApi";
import type { FavoriteSubject } from "@/shared/types/favorite";
import { fetchSubjectById } from "@/shared/api/subjectApi";
import type { Subject } from "@/shared/types/subject";

import { StatCard } from "./ui/StatCard";
import { ActionButton } from "./ui/ActionButton";

export default function SubjectDetailPage() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [subject, setSubject] = useState<Subject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

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
            const favorites = await favoriteService.getFavoriteSubjects();
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
        await favoriteService.removeFavoriteSubject(subject.subjectId);
        setIsFavorite(false);
      } else {
        await favoriteService.addFavoriteSubject(subject.subjectId);
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
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-400">Đang tải thông tin môn học...</p>
        </div>
      </div>
    );
  }

  // Hiển thị error (chỉ khi có lỗi thực sự)
  if (!subject || error) {
    return (
      <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-[#030712] selection:bg-rose-500/30 transition-colors duration-500">
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
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-400 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="mx-auto max-w-7xl px-6 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/80 mb-6">
            <Link
              to="/subjects"
              className="hover:text-white transition-colors"
            >
              Môn học
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white font-medium">{subject.code}</span>
          </nav>

          {/* Main header content */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white">
                      <Hash className="h-3 w-3" />
                      {subject.code}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white">
                      <Globe className="h-3 w-3" />
                      Công khai
                    </span>
                  </div>
                  <h1 className="text-3xl font-bold text-white">{subject.name}</h1>
                </div>
              </div>

              {subject.description && (
                <p className="text-white/90 max-w-3xl">
                  {subject.description}
                </p>
              )}

              <div className="flex items-center gap-4 mt-6 text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Ngày tạo: {new Date(subject.createdAt).toLocaleDateString('vi-VN')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  <span>Trạng thái: Đang hoạt động</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3">
              {user && (
                <button
                  onClick={handleToggleFavorite}
                  className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 font-medium transition-colors ${isFavorite
                    ? "bg-rose-500 text-white hover:bg-rose-600"
                    : "bg-white/20 text-white hover:bg-white/30"
                    }`}
                >
                  {isFavorite ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      Đã yêu thích
                    </>
                  ) : (
                    <>
                      <Award className="h-4 w-4" />
                      Yêu thích
                    </>
                  )}
                </button>
              )}

              <ActionButton
                icon={Share2}
                label="Chia sẻ"
                onClick={handleShare}
              />

              {(user?.role === "admin" || user?.role === "teacher") && (
                <ActionButton
                  icon={Edit}
                  label="Chỉnh sửa"
                  onClick={handleEdit}
                  variant="primary"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-8">
          {/* Stats section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Thống kê
              </h2>
              <div className="flex items-center gap-3">
                <ActionButton
                  icon={BookMarked}
                  label="Tạo bài kiểm tra"
                  onClick={handleCreateQuiz}
                  variant="primary"
                />
                <ActionButton
                  icon={FileText}
                  label="Thêm câu hỏi"
                  onClick={handleAddQuestion}
                />
              </div>
            </div>

            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <StatCard
                icon={FileText}
                label="Tổng câu hỏi"
                value={stats.totalQuestions}
              />
              <StatCard
                icon={BookMarked}
                label="Bài kiểm tra"
                value={stats.totalQuizzes}
              />
              <StatCard
                icon={BookOpen}
                label="Tài liệu"
                value={stats.totalDocuments}
              />
              <StatCard
                icon={BarChart3}
                label="Độ khó trung bình"
                value={stats.avgDifficulty}
                color="text-amber-600"
              />
              <StatCard
                icon={Clock}
                label="Cập nhật lần cuối"
                value={stats.lastUpdated}
                color="text-blue-600"
              />
            </div> */}
          </section>

          {/* Quick actions */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Hành động nhanh
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group cursor-pointer"
              >
                <Link
                  to={`/questions?subjectId=${subject.subjectId}`}
                  className="block rounded-xl bg-white dark:bg-slate-800 p-6 border border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-500 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-lg bg-emerald-100 dark:bg-emerald-500/20">
                      <FileText className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                    Xem câu hỏi
                  </h3>
                  {/* <p className="text-sm text-slate-600 dark:text-slate-400">
                    Xem tất cả {stats.totalQuestions} câu hỏi trong môn học này
                  </p> */}
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group cursor-pointer"
              >
                <Link
                  to={`/quizzes?subjectId=${subject.subjectId}`}
                  className="block rounded-xl bg-white dark:bg-slate-800 p-6 border border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-500 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-500/20">
                      <BookMarked className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                    Bài kiểm tra
                  </h3>
                  {/* <p className="text-sm text-slate-600 dark:text-slate-400">
                    Xem {stats.totalQuizzes} bài kiểm tra được tạo từ môn học này
                  </p> */}
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group cursor-pointer"
              >
                <Link
                  to={`/documents?subjectId=${subject.subjectId}`}
                  className="block rounded-xl bg-white dark:bg-slate-800 p-6 border border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-500 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-500/20">
                      <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-purple-600 transition-colors" />
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                    Tài liệu
                  </h3>
                  {/* <p className="text-sm text-slate-600 dark:text-slate-400">
                    Xem {stats.totalDocuments} tài liệu học tập liên quan
                  </p> */}
                </Link>
              </motion.div>
            </div>
          </section>

          {/* Recent activity (placeholder) */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Hoạt động gần đây
            </h2>

            <div className="rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="p-6 text-center text-slate-500 dark:text-slate-400">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Chưa có hoạt động nào gần đây</p>
                <p className="text-sm mt-2">Các hoạt động về câu hỏi, bài kiểm tra sẽ hiển thị tại đây</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}