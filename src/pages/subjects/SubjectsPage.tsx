// Auto-generated
import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen, Search, Filter, Clock, PlusCircle,
  ChevronLeft, ChevronRight, Grid, List, SortAsc,
  SortDesc, Calendar, Download, MoreVertical,
  ChevronDown, Star, Users, Lock, Globe,
  ChevronUp, Library, Sparkles
} from "lucide-react";
import { Heart } from "lucide-react";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import Floating from "@/shared/ui/Floatting";

type Difficulty = "easy" | "medium" | "hard";
type QType = "MCQ" | "TRUE_FALSE" | "FILL_BLANK";


import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAllSubjects } from "@/shared/api/subjectApi";
import type { Subject } from "@/shared/types/subject";
import { useAuth } from "@/app/providers/AuthProvider";
import { favoriteService } from "@/shared/api/favoriteApi";
import { FavoriteSubject } from "@/shared/types/favorite";
import AnimatedGradientBackground from "@/components/ui/AnimatedGradientBackground";
import { toast } from "react-hot-toast";

// Sort options
type SortOption = 'name-asc' | 'name-desc' | 'date-asc' | 'date-desc' | 'questions-asc' | 'questions-desc' | 'visibility';
type ViewMode = 'grid' | 'list';

export default function SubjectsPage() {
  // ======= FILTER Subjects
  const [q, setQ] = useState("");
  const [diff, setDiff] = useState<"all" | Difficulty>("all");
  const [type, setType] = useState<"all" | QType>("all");
  const [onlyApproved, setOnlyApproved] = useState(false);

  // ======= VIEW & SORT STATE =======
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortOption, setSortOption] = useState<SortOption>('date-desc');
  const [selectedSubjects, setSelectedSubjects] = useState<Set<number>>(new Set());
  const [showBulkActions, setShowBulkActions] = useState(false);
  // Thêm vào phần state khai báo
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // ======= PAGINATION =======
  const [page, setPage] = useState(1);
  const pageSize = 12;

  const types = ["all", "MCQ", "TRUE_FALSE", "FILL_BLANK"] as const;
  const diffs = ["all", "easy", "medium", "hard"] as const;

  const { user } = useAuth();
  const queryClient = useQueryClient();

  // ======= FETCH DATA WITH REACT QUERY =======
  const { data: subjects = [], isLoading: isLoadingSubjects } = useQuery({
    queryKey: ["subjects"],
    queryFn: async () => {
      try {
        return await fetchAllSubjects();
      } catch (e) {
        // Fallback local data if API fails
        const local = await fetch("/quiz-universe/data/subjects.json");
        toast.error("Kết nối đến API thất bại, đang sử dụng dữ liệu nội bộ");
        return (await local.json()) as Subject[];
      }
    },
  });

  const { data: favoriteIds = new Set<number>() } = useQuery({
    queryKey: ["favorites", user?.id],
    queryFn: async () => {
      if (!user) return new Set<number>();
      const favs = await favoriteService.getFavoriteSubjects();
      return new Set(favs.map((s: FavoriteSubject) => s.subjectId));
    },
    enabled: !!user,
    meta: { disableGlobalToast: true }
  });

  // ======= MUTATIONS =======
  const toggleFavoriteMutation = useMutation({
    mutationFn: async (id: number) => {
      const isFav = favoriteIds.has(id);
      if (isFav) {
        await favoriteService.removeFavoriteSubject(id);
      } else {
        await favoriteService.addFavoriteSubject(id);
      }
      return { id, isFav };
    },
    onSuccess: () => {
      // Tự động làm mới danh sách yêu thích sau khi thay đổi
      queryClient.invalidateQueries({ queryKey: ["favorites", user?.id] });
    },
  });


  const handleSortChange = (value: string) => {
    const validOptions: SortOption[] = [
      'name-asc', 'name-desc',
      'date-asc', 'date-desc',
      'questions-asc', 'questions-desc',
      'visibility'
    ];

    if (validOptions.includes(value as SortOption)) {
      setSortOption(value as SortOption);
    } else {
      setSortOption('date-desc');
    }
  };

  const toggleFavorite = (id: number) => {
    if (!user) return;
    toggleFavoriteMutation.mutate(id);
  };

  const toggleSelectSubject = (id: number) => {
    setSelectedSubjects(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const selectAllSubjects = () => {
    if (selectedSubjects.size === filtered.length) {
      setSelectedSubjects(new Set());
    } else {
      setSelectedSubjects(new Set(filtered.map(subject => subject.id)));
    }
  };

  const clearSelection = () => {
    setSelectedSubjects(new Set());
  };

  // ======= FILTERING & SORTING =======
  const filtered = useMemo(() => {
    const result = subjects.filter(subject => {
      // Text search
      const kw = normalizeText(q);
      if (kw && !normalizeText(subject.name).includes(kw) &&
        !normalizeText(subject.description || "").includes(kw)) {
        return false;
      }
      return true;
    });

    // Sorting
    result.sort((a, b) => {
      switch (sortOption) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'date-asc':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'date-desc':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });

    return result;
  }, [q, subjects, onlyApproved, sortOption]);

  function normalizeText(str: string) {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

  // Reset page khi filter đổi
  const handleFilterChange = <T,>(setter: (v: T) => void) => (v: T) => {
    setter(v);
    setPage(1);
    setSelectedSubjects(new Set()); // Clear selection when filters change
  };



  // Bulk actions handlers
  const handleBulkFavorite = async () => {
    for (const id of selectedSubjects) {
      await toggleFavorite(id);
    }
    clearSelection();
  };

  const handleBulkVisibilityChange = async (visibility: 'PRIVATE' | 'ORG' | 'PUBLIC') => {
    // Implement bulk visibility change
    console.log(`Change ${selectedSubjects.size} subjects to ${visibility}`);
    clearSelection();
  };

  const handleBulkExport = async () => {
    // Implement bulk export
    console.log(`Export ${selectedSubjects.size} subjects`);
    clearSelection();
  };

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-900">
      <section className="relative overflow-hidden bg-emerald-600 dark:bg-slate-950">
        <AnimatedGradientBackground />
        
        {/* Hero section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 py-8 md:py-12"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            {/* Left Section - Title & Description */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
              className="w-full lg:w-auto text-center lg:text-left"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4">
                <Library className="w-3.5 h-3.5 text-yellow-300" />
                <span className="text-xs font-medium text-white/90">Quản lý học thuật</span>
              </div>

              {/* Title with gradient */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
                <span className="bg-gradient-to-r from-white via-yellow-100 to-amber-200 bg-clip-text text-transparent">
                  Danh mục môn học
                </span>
              </h1>

              {/* Decorative underline */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "80px" }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="h-1 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full mt-3 mb-4 mx-auto lg:mx-0"
              />

              {/* Description */}
              <p className="text-white/80 dark:text-gray-200 text-base md:text-lg max-w-xl leading-relaxed mx-auto lg:mx-0">
                Khám phá kho tàng môn học, bộ đề thi và tài liệu ôn tập được phân loại khoa học.
              </p>

              {/* Quick stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap justify-center lg:justify-start gap-4 mt-6"
              >
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  <span className="text-xs text-white/70">Cấu trúc FSD chuẩn</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                  <span className="text-xs text-white/70">500+ Học phần</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                  <span className="text-xs text-white/70">Tự động hóa AI</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Section - Action Buttons */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto"
            >
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="create"
                  className="group relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold shadow-lg transition-all duration-300 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-emerald-950 hover:shadow-xl w-full sm:w-auto"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <PlusCircle className="h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
                  <span className="relative z-10">Thêm môn học mới</span>
                  <ChevronRight className="h-4 w-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/question-banks"
                  className="group relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold shadow-lg transition-all duration-300 bg-white/10 backdrop-blur-sm text-white border border-white/30 hover:bg-white/20 w-full sm:w-auto"
                >
                  <BookOpen className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Kho ngân hàng câu hỏi</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Floating Decorations */}
          <Floating distance={15} duration={7} className="pointer-events-none absolute top-10 left-10 z-0 hidden lg:block">
            <motion.div
              animate={{ rotate: [-6, 0, -6] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 px-4 py-2 shadow-xl opacity-20"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="h-3 w-3 text-white" />
                <span className="text-xs font-black text-white tracking-wider uppercase">Subjects</span>
              </div>
            </motion.div>
          </Floating>

          <Floating distance={12} duration={6} className="pointer-events-none absolute top-20 right-20 z-0 hidden lg:block">
            <motion.div
              animate={{ rotate: [12, 0, 12] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 p-4 shadow-xl opacity-20"
            >
              <BookOpen className="h-6 w-6 text-white" />
            </motion.div>
          </Floating>
        </motion.div>
      </section>

      {/* ===== CONTROL BAR ===== */}

      <div className="sticky mb-5 top-16 z-20 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-6 py-3">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Left: View Toggle & Bulk Selection */}
            <div className="flex items-center gap-4">
              {/* View Toggle */}
              <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-600 shadow-sm'
                    : 'hover:bg-white/50 dark:hover:bg-slate-600/50'
                    }`}
                  title="Chế độ lưới"
                >
                  <Grid className={`h-4 w-4 ${viewMode === 'grid' ? 'text-emerald-600' : 'text-slate-500'}`} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${viewMode === 'list'
                    ? 'bg-white dark:bg-slate-600 shadow-sm'
                    : 'hover:bg-white/50 dark:hover:bg-slate-600/50'
                    }`}
                  title="Chế độ danh sách"
                >
                  <List className={`h-4 w-4 ${viewMode === 'list' ? 'text-emerald-600' : 'text-slate-500'}`} />
                </button>
              </div>

              {/* Bulk Selection */}
              {selectedSubjects.size > 0 && (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedSubjects.size === filtered.length}
                      onChange={selectAllSubjects}
                      className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {selectedSubjects.size} mục đã chọn
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleBulkFavorite}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-400"
                      title="Thêm vào yêu thích"
                    >
                      <Star className="h-3 w-3" />
                      Yêu thích
                    </button>
                    <button
                      onClick={() => setShowBulkActions(!showBulkActions)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-400"
                    >
                      <MoreVertical className="h-3 w-3" />
                      Thao tác
                    </button>
                    {showBulkActions && (
                      <div className="absolute mt-10 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 p-2 z-30">
                        <button
                          onClick={() => handleBulkVisibilityChange('PUBLIC')}
                          className="flex items-center gap-2 px-3 py-2 w-full text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
                        >
                          <Globe className="h-4 w-4 text-emerald-600" />
                          Đặt công khai
                        </button>
                        <button
                          onClick={() => handleBulkVisibilityChange('ORG')}
                          className="flex items-center gap-2 px-3 py-2 w-full text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
                        >
                          <Users className="h-4 w-4 text-blue-600" />
                          Đặt nội bộ
                        </button>
                        <button
                          onClick={() => handleBulkVisibilityChange('PRIVATE')}
                          className="flex items-center gap-2 px-3 py-2 w-full text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
                        >
                          <Lock className="h-4 w-4 text-amber-600" />
                          Đặt riêng tư
                        </button>
                        <button
                          onClick={handleBulkExport}
                          className="flex items-center gap-2 px-3 py-2 w-full text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
                        >
                          <Download className="h-4 w-4" />
                          Xuất
                        </button>
                      </div>
                    )}
                    <button
                      onClick={clearSelection}
                      className="px-3 py-1.5 text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400"
                    >
                      Bỏ chọn
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Middle: Sort Options */}
            {/* <div className="flex items-center gap-3">
                
              </div> */}

            {/* Right: Stats */}
            {/* Trong Control Bar, thêm vào phần Right: Stats */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
              <div className="flex items-center justify-between md:justify-start gap-4">
                {/* Mobile: Dropdown sắp xếp */}
                <div className="md:hidden flex-1">
                  <select
                    value={sortOption}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg text-sm bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400 transition-colors"
                  >
                    <option value="name-asc">Tên (A → Z)</option>
                    <option value="name-desc">Tên (Z → A)</option>
                    <option value="date-desc">Ngày (mới nhất)</option>
                    <option value="date-asc">Ngày (cũ nhất)</option>
                    <option value="questions-desc">Số tài liệu (nhiều nhất)</option>
                    <option value="questions-asc">Số tài liệu (ít nhất)</option>
                    {/* <option value="visibility">Quyền xem</option> */}
                  </select>
                </div>

                {/* Desktop: Vẫn giữ các button như cũ */}
                <div className="hidden md:flex md:items-center md:gap-6">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Sắp xếp:</span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSortOption(sortOption === 'name-asc' ? 'name-desc' : 'name-asc')}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-colors ${sortOption.startsWith('name')
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-400'
                        }`}
                    >
                      {sortOption === 'name-asc' ? <SortAsc className="h-3 w-3" /> : <SortDesc className="h-3 w-3" />}
                      Tên
                    </button>
                    <button
                      onClick={() => setSortOption(sortOption === 'date-desc' ? 'date-asc' : 'date-desc')}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-colors ${sortOption.startsWith('date')
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-400'
                        }`}
                    >
                      <Calendar className="h-3 w-3" />
                      Ngày {sortOption === 'date-desc' ? '↓' : '↑'}
                    </button>
                    <button
                      onClick={() => setSortOption(sortOption === 'questions-desc' ? 'questions-asc' : 'questions-desc')}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-colors ${sortOption.startsWith('questions')
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-400'
                        }`}
                    >
                      <BookOpen className="h-3 w-3" />
                      Số tài liệu {sortOption === 'questions-desc' ? '↓' : '↑'}
                    </button>
                    {/* <button
                      onClick={() => setSortOption('visibility')}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-colors ${sortOption === 'visibility'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-400'
                        }`}
                    >
                      <Eye className="h-3 w-3" />
                      Quyền xem
                    </button> */}
                  </div>
                </div>

                {/* Nút toggle filters (luôn hiển thị) */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${showFilters
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-400'
                    }`}
                >
                  <Filter className="h-4 w-4" />
                  <span className="hidden sm:inline">Bộ lọc</span>
                  {showFilters ? (
                    <ChevronUp className="h-3 w-3" />
                  ) : (
                    <ChevronDown className="h-3 w-3" />
                  )}
                </button>
              </div>

              {/* Hiển thị số lượng mục */}
              {/* <div className="text-sm text-slate-600 dark:text-slate-400">
    {filtered.length} mục
  </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-20">

        {/* Filter bar - chỉ hiển thị khi showFilters = true */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {/* Toàn bộ nội dung filter bar hiện tại ở đây */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className=" mb-5 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md dark:border-gray-700 dark:bg-gray-800/50"
            >

              <div className="grid gap-3 md:grid-cols-5">
                {/* Search */}
                <div className="md:col-span-2">
                  <label className="mb-1 block text-xs font-medium text-white/90 dark:text-gray-200">
                    Tìm kiếm
                  </label>
                  <div className="flex items-center gap-2 rounded-xl bg-white/80 px-3 py-2 ring-1 ring-black/10 focus-within:ring-2 focus-within:ring-emerald-400 dark:bg-slate-900/70 dark:ring-white/10">
                    <Search className="h-4 w-4 text-emerald-600 dark:text-emerald-300" />
                    <input
                      value={q}
                      onChange={(e) => handleFilterChange(setQ)(e.target.value)}
                      placeholder="Từ khóa: tên, mô tả, môn học…"
                      className="w-full bg-transparent p-1 text-sm text-gray-800 placeholder:text-gray-500 focus:outline-none dark:text-gray-100 dark:placeholder:text-gray-400"
                    />
                  </div>
                </div>

                {/* Visibility Filter */}
                {/* <div>
                  <label className="mb-1 block text-xs font-medium text-white/90 dark:text-gray-200">
                    Quyền xem
                  </label>
                  <select
                    value={visibilityFilter}
                    onChange={(e) => handleFilterChange(setVisibilityFilter)(e.target.value as any)}
                    className="w-full rounded-xl bg-white/80 px-3 py-2 text-sm text-gray-800 ring-1 ring-black/10 focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:bg-slate-900/70 dark:text-gray-100 dark:ring-white/10"
                  >
                    {visibilityOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div> */}

                {/* Type filter (placeholders) */}
                <div>
                  <label className="mb-1 block text-xs font-medium text-white/90 dark:text-gray-200">
                    Loại câu hỏi
                  </label>
                  <select
                    value={type}
                    onChange={(e) => handleFilterChange(setType)(e.target.value as any)}
                    className="w-full rounded-xl bg-white/80 px-3 py-2 text-sm text-gray-800 ring-1 ring-black/10 focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:bg-slate-900/70 dark:text-gray-100 dark:ring-white/10"
                  >
                    {types.map(op => (
                      <option key={op} value={op}>
                        {op === "all" ? "Tất cả" : op}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Difficulty filter (placeholder) */}
                <div>
                  <label className="mb-1 block text-xs font-medium text-white/90 dark:text-gray-200">
                    Độ khó
                  </label>
                  <select
                    value={diff}
                    onChange={(e) => handleFilterChange(setDiff)(e.target.value as any)}
                    className="w-full rounded-xl bg-white/80 px-3 py-2 text-sm text-gray-800 ring-1 ring-black/10 focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:bg-slate-900/70 dark:text-gray-100 dark:ring-white/10"
                  >
                    {diffs.map(op => (
                      <option key={op} value={op}>
                        {op === "all" ? "Tất cả" : op}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Approved toggle */}
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <label className="inline-flex cursor-pointer items-center gap-2 text-xs text-gray-700 dark:text-gray-300">
                    <input
                      type="checkbox"
                      checked={onlyApproved}
                      onChange={(e) => handleFilterChange(setOnlyApproved)(e.target.checked)}
                      className="h-4 w-4 rounded border-white/20 bg-white/20 text-emerald-500 focus:ring-emerald-400 dark:border-gray-600"
                    />
                    Chỉ hiển thị ngân hàng đã kiểm duyệt
                  </label>

                  {/* Select all checkbox for mobile */}
                  {filtered.length > 0 && (
                    <label className="inline-flex cursor-pointer items-center gap-2 text-xs text-gray-700 dark:text-gray-300">
                      <input
                        type="checkbox"
                        checked={selectedSubjects.size === filtered.length}
                        onChange={selectAllSubjects}
                        className="h-4 w-4 rounded border-white/20 bg-white/20 text-emerald-500 focus:ring-emerald-400 dark:border-gray-600"
                      />
                      Chọn tất cả
                    </label>
                  )}
                </div>

                <div className="hidden items-center gap-2 text-xs text-white/90 dark:text-gray-300 md:flex">
                  <Filter className="h-4 w-4" /> {filtered.length} kết quả
                  {selectedSubjects.size > 0 && (
                    <span className="ml-2 px-2 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-medium">
                      {selectedSubjects.size} đã chọn
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}


        {/* List */}
        {isLoadingSubjects ? (
          <LoadingState />
        ) : filtered.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className={viewMode === 'grid'
              ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              : "space-y-4"
            }>
              {pageData.map((subject) => (
                viewMode === 'grid' ? (
                  <SubjectCardGrid
                    key={subject.id}
                    subject={subject}
                    isFavorite={favoriteIds.has(subject.id)}
                    isSelected={selectedSubjects.has(subject.id)}
                    onToggleFavorite={() => toggleFavorite(subject.id)}
                    onToggleSelect={() => toggleSelectSubject(subject.id)}
                    userRole={user?.role}
                  />
                ) : (
                  <SubjectCardList
                    key={subject.id}
                    subject={subject}
                    isFavorite={favoriteIds.has(subject.id)}
                    isSelected={selectedSubjects.has(subject.id)}
                    onToggleFavorite={() => toggleFavorite(subject.id)}
                    onToggleSelect={() => toggleSelectSubject(subject.id)}
                    userRole={user?.role}
                  />
                )
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-6 flex items-center justify-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-700 ring-1 ring-slate-200 disabled:opacity-50 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700"
              >
                <ChevronLeft className="h-4 w-4" /> Trước
              </button>
              <span className="text-sm text-slate-600 dark:text-slate-300">
                Trang {page}/{totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-700 ring-1 ring-slate-200 disabled:opacity-50 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700"
              >
                Sau <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Grid View Card
type SubjectCardGridProps = {
  subject: Subject;
  isFavorite: boolean;
  isSelected: boolean;
  onToggleFavorite: () => void;
  onToggleSelect: () => void;
  userRole?: string;
};

function SubjectCardGrid({ subject, isFavorite, isSelected, onToggleFavorite, onToggleSelect, userRole }: SubjectCardGridProps) {
  // const visibilityIcon = {
  //   'PUBLIC': { icon: Globe, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  //   'ORG': { icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
  //   'PRIVATE': { icon: Lock, color: 'text-amber-600', bg: 'bg-amber-100' }
  // }[subject.visibility];

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 160, damping: 16 }}

      className={`flex flex-col justify-between relative rounded-xl border ${isSelected
        ? 'border-emerald-400 dark:border-emerald-500 ring-2 ring-emerald-200 dark:ring-emerald-500/30'
        : 'border-emerald-100/60 dark:border-slate-800'
        } bg-white p-4 shadow-lg transition dark:bg-slate-900`}
    >
      <div className="grow flex flex-col">

        <div>
          {/* Selection checkbox */}
          <div className="absolute top-3 right-3">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={onToggleSelect}
              className="h-5 w-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
            />
          </div>

          <div className="mb-2 flex flex-col items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              {/* Visibility badge */}
              {/* <div className="mb-1 flex items-center gap-2">
                <span className={`inline-flex items-center gap-1 rounded-md ${visibilityIcon.bg} px-2 py-0.5 text-xs font-semibold ${visibilityIcon.color}`}>
                  <visibilityIcon.icon className="h-3 w-3" />
                  {subject.visibility === 'PUBLIC' ? 'Công khai' : subject.visibility === 'ORG' ? 'Nội bộ' : 'Riêng tư'}
                </span>
                {subject.questionCount > 0 && (
                  <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700 dark:bg-slate-700 dark:text-slate-300">
                    <BookOpen className="h-3 w-3" />
                    {subject.questionCount} câu
                  </span>
                )}
              </div> */}

              <h3 className="mt-1 text-base font-bold text-emerald-900 dark:text-emerald-200">
                {subject.code} - {subject.name}
              </h3>
            </div>
          </div>
        </div>
        <div className="flex flex-col grow justify-between">

          {subject.description ? (
            <p className="line-clamp-3 text-sm text-gray-700 dark:text-gray-300 mb-3">{subject.description}</p>
          ) : (
            <p className="text-sm italic text-gray-500 dark:text-gray-400 mb-3">Chưa có mô tả</p>
          )}

          {/* Subject info
          <div className="mb-3">
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
              <span className="font-medium">Môn:</span>
              <span className="truncate">{subject.name}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
              <span className="font-medium">Mô tả:</span>
              <span className="truncate">{subject.description}</span>
            </div>
          </div> */}

        </div>

      </div>
      <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3">
        <div className="flex items-center gap-2 text-xs text-emerald-900/70 dark:text-slate-300/70">
          <Clock className="h-3.5 w-3.5" />
          <span>{new Date(subject.createdAt).toLocaleDateString('vi-VN')}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Nút yêu thích */}
          <button
            onClick={onToggleFavorite}
            className="transition hover:scale-105 active:scale-95"
            aria-label={isFavorite ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
          >
            {isFavorite ? (
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            ) : (
              <Heart className="w-5 h-5 text-red-500" />
            )}
          </button>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {(userRole === "admin" || userRole === "editor") && (
              <Link
                to={`/subjects/${subject.id}/edit`}
                className="inline-flex items-center gap-1 rounded-lg bg-red-400 px-2 py-1 text-xs font-semibold text-emerald-950 shadow hover:brightness-105"
              >
                Sửa
              </Link>
            )}
            <Link
              to={`/subjects/${subject.id}`}
              className="inline-flex items-center gap-1 rounded-lg bg-yellow-400 px-2 py-1 text-xs font-semibold text-emerald-950 shadow hover:brightness-105"
            >
              Xem
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// List View Card
function SubjectCardList({ subject, isFavorite, isSelected, onToggleFavorite, onToggleSelect, userRole }: SubjectCardGridProps) {
  // const visibilityIcon = {
  //   'PUBLIC': { icon: Globe, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  //   'ORG': { icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
  //   'PRIVATE': { icon: Lock, color: 'text-amber-600', bg: 'bg-amber-100' }
  // }[subject.visibility];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      whileHover={{ x: 4 }}
      className={`relative rounded-xl border ${isSelected
        ? 'border-emerald-400 dark:border-emerald-500 ring-2 ring-emerald-200 dark:ring-emerald-500/30'
        : 'border-emerald-100/60 dark:border-slate-800'
        } bg-white p-4 shadow-sm transition dark:bg-slate-900`}
    >
      <div className="flex items-start gap-4">
        {/* Selection checkbox */}
        <div className="pt-1">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onToggleSelect}
            className="h-5 w-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
          />
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="min-w-0">
              {/* <div className="mb-1 flex items-center gap-2">
                <span className={`inline-flex items-center gap-1 rounded-md ${visibilityIcon.bg} px-2 py-0.5 text-xs font-semibold ${visibilityIcon.color}`}>
                  <visibilityIcon.icon className="h-3 w-3" />
                  {subject.visibility === 'PUBLIC' ? 'Công khai' : subject.visibility === 'ORG' ? 'Nội bộ' : 'Riêng tư'}
                </span>
                <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700 dark:bg-slate-700 dark:text-slate-300">
                  <BookOpen className="h-3 w-3" />
                  {subject.questionCount} câu
                </span>
              </div> */}

              <h3 className="text-base font-bold text-emerald-900 dark:text-emerald-200 truncate">
               {subject.code} - {subject.name}
              </h3>

              {subject.description && (
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                  {subject.description}
                </p>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-4 ml-4">
              <button
                onClick={onToggleFavorite}
                className="transition hover:scale-105 active:scale-95"
                aria-label={isFavorite ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
              >
                {isFavorite ? (
                  <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                ) : (
                  <Heart className="w-5 h-5 text-red-500" />
                )}
              </button>

              <div className="flex items-center gap-4">
                <Link
                  to={`/subjects/${subject.id}`}
                  className="inline-flex items-center gap-1 rounded-lg bg-yellow-400 px-3 py-1.5 text-sm font-semibold text-emerald-950 shadow hover:brightness-105"
                >
                  Xem
                </Link>
                {(userRole === "admin" || userRole === "editor") && (
                  <Link
                    to={`/subjects/${subject.id}/edit`}
                    className="inline-flex items-center gap-1 rounded-lg bg-red-400 px-3 py-1.5 text-sm font-semibold text-emerald-950 shadow hover:brightness-105"
                  >
                    Sửa
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Footer info
          <div className="mt-3 flex flex-wrap items-center gap-4 border-t border-slate-100 dark:border-slate-800 pt-3">
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
              <span className="font-medium">Môn:</span>
              <span>{subject.subjectName}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
              <span className="font-medium">Người tạo:</span>
              <span>{subject.creatorName}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
              <Clock className="h-3.5 w-3.5" />
              <span>{new Date(subject.createdAt).toLocaleDateString('vi-VN')}</span>
            </div>
          </div> */}
        </div>
      </div>
    </motion.div>
  );
}

// Loading, Error, Empty states remain the same...
function LoadingState() {
  return (
    <div className="grid place-items-center rounded-2xl border border-dashed border-emerald-300/40 p-10 text-center dark:border-slate-700">
      <div className="animate-pulse">
        <div className="mb-2 h-8 w-48 rounded bg-emerald-200/60 dark:bg-emerald-500/20" />
        <div className="mx-auto h-8 w-72 rounded bg-emerald-200/40 dark:bg-emerald-500/10" />
      </div>
    </div>
  );
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="grid place-items-center rounded-2xl border border-dashed border-rose-300/40 p-10 text-center dark:border-rose-700/50">
      <div className="mx-auto max-w-md">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-800 dark:bg-rose-500/20 dark:text-rose-100">
          <AlertTriangle className="h-4 w-4" />
          Lỗi tải dữ liệu
        </div>
        <p className="text-sm text-rose-900/80 dark:text-rose-100/80">
          {message || "Không thể tải dữ liệu."}
        </p>
        <div className="mt-4 flex justify-center">
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-rose-900 ring-1 ring-rose-200 hover:bg-rose-50 dark:bg-white/5 dark:text-rose-100 dark:ring-rose-700 dark:hover:bg-slate-800"
          >
            <RefreshCcw className="h-4 w-4" /> Thử lại
          </button>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="grid place-items-center rounded-2xl border border-dashed border-emerald-300/40 p-10 text-center dark:border-slate-700">
      <div className="mx-auto max-w-md">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-100">
          <Filter className="h-4 w-4" /> Không có kết quả phù hợp
        </div>
        <p className="text-sm text-emerald-900/80 dark:text-slate-300/80">
          Hãy thử từ khóa khác hoặc bỏ bớt bộ lọc.
        </p>
        <div className="mt-4 flex justify-center gap-2">
          <Link
            to="/subjects/create"
            className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-4 py-2 text-sm font-semibold text-emerald-950 shadow hover:brightness-105"
          >
            <PlusCircle className="h-4 w-4" /> Thêm môn học mới
          </Link>
        </div>
      </div>
    </div>
  );
}