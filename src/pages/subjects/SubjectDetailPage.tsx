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
import { fetchSubjectNameById } from "@/shared/api/subjectApi";
import type { Subject, SubjectNameResponse } from "@/shared/types/subject";

// Component con cho thống kê
function StatCard({ icon: Icon, label, value, color = "text-emerald-600" }: {
  icon: any;
  label: string;
  value: string | number;
  color?: string;
}) {
  return (
    <div className="rounded-xl bg-white/50 dark:bg-slate-800/50 p-4 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${color.replace('text-', 'bg-')}/10`}>
          <Icon className={`h-5 w-5 ${color}`} />
        </div>
        <div>
          <p className="text-sm text-slate-600 dark:text-slate-400">{label}</p>
          <p className="text-xl font-bold text-slate-900 dark:text-white">{value}</p>
        </div>
      </div>
    </div>
  );
}

// Component con cho action button
function ActionButton({ icon: Icon, label, onClick, variant = "default" }: {
  icon: any;
  label: string;
  onClick: () => void;
  variant?: "default" | "primary" | "danger";
}) {
  const variants = {
    default: "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300",
    primary: "bg-emerald-500 text-white hover:bg-emerald-600",
    danger: "bg-rose-500 text-white hover:bg-rose-600"
  };

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 font-medium transition-colors ${variants[variant]}`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

export default function SubjectDetailPage() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [subject, setSubject] = useState<Subject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Giả lập dữ liệu thống kê (trong thực tế sẽ fetch từ API)
  const [stats, setStats] = useState({
    totalQuestions: 0,
    totalQuizzes: 0,
    totalDocuments: 0,
    avgDifficulty: "Chưa có",
    lastUpdated: "Chưa có"
  });

  // Fetch subject details
  useEffect(() => {
    async function loadSubject() {
      if (!subjectId) return;
      
      try {
        setLoading(true);
        
        // Fetch tên môn học trước
        const nameData: SubjectNameResponse = await fetchSubjectNameById(Number(subjectId));
        
        // Giả lập dữ liệu đầy đủ (trong thực tế sẽ có API lấy thông tin đầy đủ)
        const mockSubject: Subject = {
          id: Number(subjectId),
          code: `MH${subjectId.padStart(3, '0')}`,
          name: nameData.name,
          description: "Môn học này cung cấp kiến thức nền tảng về lập trình và thuật toán. Bao gồm các chủ đề như cấu trúc dữ liệu, giải thuật, lập trình hướng đối tượng và các nguyên lý cơ bản của khoa học máy tính.",
          createdAt: "2024-01-15T08:30:00Z"
        };
        
        setSubject(mockSubject);
        
        // Fetch thông tin yêu thích
        if (user) {
          try {
            const favorites = await favoriteService.getFavoriteSubjects();
            setIsFavorite(favorites.some((fav: FavoriteSubject) => fav.subjectId === Number(subjectId)));
          } catch (err) {
            console.error("Lỗi khi lấy danh sách yêu thích:", err);
          }
        }
        
        // Giả lập fetch thống kê
        // Trong thực tế: fetch từ API thống kê
        setStats({
          totalQuestions: 125,
          totalQuizzes: 8,
          totalDocuments: 15,
          avgDifficulty: "Trung bình",
          lastUpdated: "2 ngày trước"
        });
        
      } catch (err: any) {
        setError(err.message || "Không thể tải thông tin môn học");
        console.error("Lỗi khi tải thông tin môn học:", err);
      } finally {
        setLoading(false);
      }
    }
    
    loadSubject();
  }, [subjectId, user]);

  const handleToggleFavorite = async () => {
    if (!user || !subject) return;
    
    try {
      if (isFavorite) {
        await favoriteService.removeFavoriteSubject(subject.id);
        setIsFavorite(false);
      } else {
        await favoriteService.addFavoriteSubject(subject.id);
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
      navigate(`/subject/${subject.id}/edit`);
    }
  };

  const handleCreateQuiz = () => {
    if (subject) {
      navigate(`/quiz/create?subjectId=${subject.id}`);
    }
  };

  const handleAddQuestion = () => {
    if (subject) {
      navigate(`/questions/create?subjectId=${subject.id}`);
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

  if (error || !subject) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-rose-100 px-3 py-1 text-sm font-semibold text-rose-800 dark:bg-rose-500/20 dark:text-rose-100">
            <BookOpen className="h-4 w-4" />
            Lỗi
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            {error || "Môn học không tồn tại"}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Không thể tìm thấy thông tin môn học bạn yêu cầu.
          </p>
          <button
            onClick={() => navigate("/subjects")}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 font-medium text-white hover:bg-emerald-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại danh sách môn học
          </button>
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
                  className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 font-medium transition-colors ${
                    isFavorite
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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
            </div>
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
                  to={`/questions?subjectId=${subject.id}`}
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
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Xem tất cả {stats.totalQuestions} câu hỏi trong môn học này
                  </p>
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group cursor-pointer"
              >
                <Link
                  to={`/quizzes?subjectId=${subject.id}`}
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
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Xem {stats.totalQuizzes} bài kiểm tra được tạo từ môn học này
                  </p>
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group cursor-pointer"
              >
                <Link
                  to={`/documents?subjectId=${subject.id}`}
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
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Xem {stats.totalDocuments} tài liệu học tập liên quan
                  </p>
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