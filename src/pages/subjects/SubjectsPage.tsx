import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen, Search, Filter, PlusCircle,
  ChevronLeft, ChevronRight, Grid, List, SortAsc,
  SortDesc, Calendar, Download, MoreVertical,
  ChevronDown, Star, Users, Lock, Globe,
  ChevronUp, Library, Sparkles
} from "lucide-react";
import Floating from "@/shared/ui/Floatting";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchSubjects } from "@/shared/api/subjectApi";
import type { Subject } from "@/shared/types/subject";
import { useAuth } from "@/app/providers/AuthProvider";
import { favoriteService } from "@/shared/api/favoriteApi";
import { FavoriteSubject } from "@/shared/types/favorite";
import AnimatedGradientBackground from "@/shared/ui/AnimatedGradientBackground";
import { toast } from "react-hot-toast";

// Sort options
type SortOption = 'name-asc' | 'name-desc' | 'date-asc' | 'date-desc' | 'popularity-desc';
type ViewMode = 'grid' | 'list';

/** Map UI sort option → Spring sort param (field,direction) */
function toSortParam(opt: SortOption): string {
  switch (opt) {
    case 'name-asc': return 'name,asc';
    case 'name-desc': return 'name,desc';
    case 'date-asc': return 'createdAt,asc';
    case 'date-desc': return 'createdAt,desc';
    case 'popularity-desc': return 'bankCount,desc';
    default: return 'createdAt,desc';
  }
}

export default function SubjectsPage() {
  // ======= SEARCH & FILTER STATE =======
  const [searchInput, setSearchInput] = useState("");
  const [keyword, setKeyword] = useState(""); // debounced value sent to API
  const [onlyApproved, setOnlyApproved] = useState(false);

  // ======= VIEW & SORT STATE =======
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortOption, setSortOption] = useState<SortOption>('popularity-desc');
  const [selectedSubjects, setSelectedSubjects] = useState<Set<number>>(new Set());
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // ======= BACKEND PAGINATION =======
  const [page, setPage] = useState(1); // 1-based UI page
  const pageSize = 12;

  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [checkOnline, setCheckOnline] = useState(true);

  // Debounce search input 400ms → update keyword → reset page
  useEffect(() => {
    const timer = setTimeout(() => {
      setKeyword(searchInput);
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput]);
  
  // ======= FETCH DATA WITH BACKEND PAGINATION =======
  const {
    data: pageResult,
    isLoading: isLoadingSubjects,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["subjects", { page, pageSize, keyword, sort: sortOption, checkOnline }],
    queryFn: async () => {
    

      try {
        return await fetchSubjects({
          page: page - 1, // Spring Data: 0-based
          size: pageSize,
          keyword: keyword || undefined,
          sort: toSortParam(sortOption),
        });
      } catch (error) {
        setCheckOnline(false);
        console.error("Fetch failed:", error);
        throw error;
      }
    },
    placeholderData: (prev) => prev, // keep previous data while loading next page
  });

console.log(pageResult);

  const subjects: Subject[] = pageResult?.content ?? [];
  const totalPages = pageResult?.totalPages ?? 1;
  const totalElements = pageResult?.totalElements ?? 0;

  const { data: favoriteIds = new Set<number>() } = useQuery({
    queryKey: ["favorites", user?.id],
    queryFn: async () => {
      if (!user) return new Set<number>();
      const favs = await favoriteService.getFavoriteSubjects();
      return new Set(favs.map((s: FavoriteSubject) => s.subjectId));
    },
    enabled: !!user,
    meta: { disableGlobalToast: true },
  });

  // ======= MUTATIONS =======
  const toggleFavoriteMutation = useMutation({
    mutationFn: async (id: number) => {
      const isFav = favoriteIds.has(id);
      if (isFav) await favoriteService.removeFavoriteSubject(id);
      else await favoriteService.addFavoriteSubject(id);
      return { id, isFav };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites", user?.id] });
    },
  });

  // ======= HANDLERS =======
  const handleSortChange = (value: string) => {
    const valid: SortOption[] = ['name-asc', 'name-desc', 'date-asc', 'date-desc', 'popularity-desc'];
    setSortOption(valid.includes(value as SortOption) ? (value as SortOption) : 'date-desc');
    setPage(1);
    setSelectedSubjects(new Set());
  };

  const toggleFavorite = (id: number) => {
    if (!user) return;
    toggleFavoriteMutation.mutate(id);
  };

  const toggleSelectSubject = (id: number) => {
    setSelectedSubjects(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const selectAllSubjects = () => {
    if (selectedSubjects.size === subjects.length) {
      setSelectedSubjects(new Set());
    } else {
      setSelectedSubjects(new Set(subjects.map(s => s.subjectId)));
    }
  };

  const clearSelection = () => setSelectedSubjects(new Set());


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
                    <option value="popularity-desc">Phổ biến</option>
                    <option value="name-asc">Tên (A → Z)</option>
                    <option value="name-desc">Tên (Z → A)</option>
                    <option value="date-desc">Ngày (mới nhất)</option>
                    <option value="date-asc">Ngày (cũ nhất)</option>
                    
                  </select>
                </div>

                {/* Desktop: Vẫn giữ các button như cũ */}
                <div className="hidden md:flex md:items-center md:gap-6">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Sắp xếp:</span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSortOption('popularity-desc')}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-colors ${sortOption === 'popularity-desc'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-400'
                        }`}
                    >
                      <Sparkles className="h-3 w-3" />
                      Phổ biến
                    </button>
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
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
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

              </div>


              {/* Approved toggle */}
              <div className="mt-3 flex items-center justify-between">


                <div className="hidden items-center gap-2 text-xs text-white/90 dark:text-gray-300 md:flex">
                  <Filter className="h-4 w-4" /> {totalElements} kết quả
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
        {isLoadingSubjects && !isPlaceholderData ? (
          <LoadingState />
        ) : subjects.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="flex flex-col">
            <div
              className={`flex-1 transition-opacity duration-200 ${isPlaceholderData ? 'opacity-60' : 'opacity-100'} ${viewMode === 'grid'
                  ? 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3 items-start'
                  : 'space-y-4'
                }`}
            >
              {subjects.map((subject) => (
                viewMode === 'grid' ? (
                  <SubjectCardGrid
                    key={subject.subjectId}
                    subject={subject}
                    isFavorite={favoriteIds.has(subject.subjectId)}
                    isSelected={selectedSubjects.has(subject.subjectId)}
                    onToggleFavorite={() => toggleFavorite(subject.subjectId)}
                    onToggleSelect={() => toggleSelectSubject(subject.subjectId)}
                    userRole={user?.role}
                  />
                ) : (
                  <SubjectCardList
                    key={subject.subjectId}
                    subject={subject}
                    isFavorite={favoriteIds.has(subject.subjectId)}
                    isSelected={selectedSubjects.has(subject.subjectId)}
                    onToggleFavorite={() => toggleFavorite(subject.subjectId)}
                    onToggleSelect={() => toggleSelectSubject(subject.subjectId)}
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
                disabled={page === totalPages || isPlaceholderData}
                className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-700 ring-1 ring-slate-200 disabled:opacity-50 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700"
              >
                Sau <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import { SubjectCardGrid, type SubjectCardGridProps } from "./ui/SubjectCardGrid";
import { SubjectCardList } from "./ui/SubjectCardList";
import { LoadingState, ErrorState, EmptyState } from "./ui/States";