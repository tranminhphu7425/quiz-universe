// Auto-generated
import { useMemo, useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MdAutoStories as BookOpen,
  MdSearch as Search,
  MdFilterList as Filter,
  MdAccessTime as Clock,
  MdAddCircleOutline as PlusCircle,
  MdChevronLeft as ChevronLeft,
  MdChevronRight as ChevronRight,
  MdGridView as Grid,
  MdList as List,
  MdArrowUpward as SortAsc,
  MdArrowDownward as SortDesc,
  MdCalendarToday as Calendar,
  MdDownload as Download,
  MdVisibility as Eye,
  MdMoreVert as MoreVertical,
  MdExpandMore as ChevronDown,
  MdStarOutline as Star,
  MdPeopleOutline as Users,
  MdLockOutline as Lock,
  MdPublic as Globe,
  MdExpandLess as ChevronUp,
  MdAutoAwesome as Sparkles,
  MdLocalLibrary as Library
} from 'react-icons/md';
import {
  MdModeEdit as Edit2,
  MdDeleteOutline as Trash2,
  MdArrowForward as ArrowRight
} from 'react-icons/md';
import {
  MdFavoriteBorder as Heart
} from 'react-icons/md';
import {
  MdWarning as AlertTriangle,
  MdRefresh as RefreshCcw
} from 'react-icons/md';
import Floating from "@/shared/ui/Floatting";

type Difficulty = "easy" | "medium" | "hard";
type QType = "MCQ" | "TRUE_FALSE" | "FILL_BLANK";


import { QuestionBankApi } from "@/shared/api/questionBanksApi";
import type { QuestionBank } from "@/shared/types/questionBank";
import { useAuth } from "@/app/providers/AuthProvider";
import { favoriteService } from "@/shared/api/favoriteApi";
import { FavoriteQuestionBank } from "@/shared/types/favorite";
import AnimatedGradientBackground from "@/shared/ui/AnimatedGradientBackground";
import { normalizeText } from "@/shared/utils/textUtils";

// Sort options
type SortOption = 'name-asc' | 'name-desc' | 'date-asc' | 'date-desc' | 'questions-asc' | 'questions-desc' | 'visibility';
type ViewMode = 'grid' | 'list';

/** Map UI sort option → Spring sort param (field,direction) */
function toSortParam(opt: SortOption): string {
  switch (opt) {
    case 'name-asc': return 'name,asc';
    case 'name-desc': return 'name,desc';
    case 'date-asc': return 'createdAt,asc';
    case 'date-desc': return 'createdAt,desc';
    case 'questions-asc': return 'questionCount,asc';
    case 'questions-desc': return 'questionCount,desc';
    case 'visibility': return 'visibility,asc';
    default: return 'createdAt,desc';
  }
}

import { usePagination } from '@/shared/hooks/usePagination';

export default function QuestionBanksPage() {
  const [searchParams] = useSearchParams();
  const urlSearch = searchParams.get("search") || "";

  // ======= PAGINATION & SEARCH HOOK =======
  const {
    page,
    size: pageSize,
    keyword: q,
    sort,
    setPage,
    handleSearch,
    changeSort,
  } = usePagination({
    initialPage: 1,
    initialSize: 12,
    initialSort: 'date-desc',
    initialKeyword: urlSearch
  });
  const sortOption = sort as SortOption;
  const setSortOption = changeSort;

  // ======= SEARCH DEBOUNCE =======
  const [searchInput, setSearchInput] = useState(urlSearch);

  useEffect(() => {
    // Nếu keyword thay đổi từ bên ngoài (URL), cập nhật lại searchInput
    if (urlSearch && !searchInput) {
      setSearchInput(urlSearch);
    }
  }, [urlSearch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(searchInput);
    }, 1000);
    return () => clearTimeout(timer);
  }, [searchInput, handleSearch]);

  // ======= FILTER QuestionBanks
  const [diff, setDiff] = useState<"all" | Difficulty>("all");
  const [type, setType] = useState<"all" | QType>("all");
  const [onlyApproved, setOnlyApproved] = useState(false);
  const [visibilityFilter, setVisibilityFilter] = useState<'all' | 'PRIVATE' | 'ORG' | 'PUBLIC'>('all');
  const [checkOnline, setCheckOnline] = useState(true);

  // ======= DATA FETCHING (React Query) =======
  const { data: pageResult, isLoading, error: queryError } = useQuery({
    queryKey: ['question-banks', page, pageSize, q, sortOption],
    queryFn: async () => {

      try {
        const params = {
          page: page - 1,
          size: pageSize,
          sort: toSortParam(sortOption)
        };

        if (q) {
          return await QuestionBankApi.search(normalizeText(q), params);
        }
        return await QuestionBankApi.getAll(params);
      } catch (err) {
        setCheckOnline(false);
      }
    },
    placeholderData: (prev) => prev,
  });

  const questionBanks: QuestionBank[] = pageResult?.content ?? [];
  const totalPages = pageResult?.totalPages ?? 1;
  const totalElements = pageResult?.totalElements ?? 0;

  // ======= VIEW & SORT STATE =======
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedBanks, setSelectedBanks] = useState<Set<number>>(new Set());
  const [showBulkActions, setShowBulkActions] = useState(false);
  // Thêm vào phần state khai báo
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // State for delete modal
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const types = ["all", "MCQ", "TRUE_FALSE", "FILL_BLANK"] as const;
  const diffs = ["all", "easy", "medium", "hard"] as const;
  const visibilityOptions = [
    { value: 'all', label: 'Tất cả', icon: Eye },
    { value: 'PUBLIC', label: 'Công khai', icon: Globe, color: 'text-emerald-600' },
    { value: 'ORG', label: 'Nội bộ', icon: Users, color: 'text-blue-600' },
    { value: 'PRIVATE', label: 'Riêng tư', icon: Lock, color: 'text-amber-600' }
  ];

  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const { user } = useAuth();


  const handleSortChange = (value: string) => {
    const validOptions: SortOption[] = [
      'name-asc', 'name-desc',
      'date-asc', 'date-desc',
      'questions-asc', 'questions-desc',
      'visibility'
    ];

    if (validOptions.includes(value as SortOption)) {
      changeSort(value);
    } else {
      // Fallback nếu giá trị không hợp lệ
      changeSort('date-desc');
    }
  };

  const toggleFavorite = async (bankId: number) => {
    const isFav = favorites.has(bankId);
    if (!user) return;
    try {
      if (isFav) {
        await favoriteService.removeQuestionBank(bankId);
        setFavorites(prev => {
          const next = new Set(prev);
          next.delete(bankId);
          return next;
        });
      } else {
        await favoriteService.addQuestionBank(bankId);
        setFavorites(prev => new Set(prev).add(bankId));
      }
    } catch (err) {
      console.error("Lỗi khi cập nhật yêu thích", err);
    }
  };

  const toggleSelectBank = (bankId: number) => {
    setSelectedBanks(prev => {
      const next = new Set(prev);
      if (next.has(bankId)) {
        next.delete(bankId);
      } else {
        next.add(bankId);
      }
      return next;
    });
  };

  const selectAllBanks = () => {
    if (selectedBanks.size === questionBanks.length) {
      setSelectedBanks(new Set());
    } else {
      setSelectedBanks(new Set(questionBanks.map(bank => bank.bankId)));
    }
  };

  const clearSelection = () => {
    setSelectedBanks(new Set());
  };

  // Removed manual fetchData in favor of useQuery
  useEffect(() => {
    const loadFavorite = async () => {
      try {
        if (!user) return;
        const data = await favoriteService.getQuestionBanks();
        setFavorites(new Set(data.map((s: FavoriteQuestionBank) => s.bankId)));
      } catch (err) {
        console.error(err);
      }
    };
    loadFavorite();
  }, [user]);

  // Reset page khi filter đổi
  const handleFilterChange = <T,>(setter: (v: T) => void) => (v: T) => {
    setter(v);
    setPage(1);
    setSelectedBanks(new Set()); // Clear selection when filters change
  };



  // Bulk actions handlers
  const handleBulkFavorite = async () => {
    for (const bankId of selectedBanks) {
      if (!favorites.has(bankId)) {
        await toggleFavorite(bankId);
      }
    }
    clearSelection();
  };

  const handleDeleteBank = (bankId: number) => {
    setDeleteConfirmId(bankId);
  };

  const queryClient = useQueryClient();

  const handleConfirmDelete = async () => {
    if (deleteConfirmId === null) return;
    try {
      await QuestionBankApi.delete(deleteConfirmId);
      toast.success("Đã xóa bộ câu hỏi thành công");
      queryClient.invalidateQueries({ queryKey: ['question-banks'] });
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Lỗi khi xóa bộ câu hỏi");
    } finally {
      setDeleteConfirmId(null);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-900">
      <section className="relative overflow-hidden">

        <AnimatedGradientBackground />

        {/* Hero section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 py-8 md:py-12"
        >
          <div className="flex flex-col lg:flex-row  justify-between content-center gap-6">
            {/* Left Section - Title & Description */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
              className="w-full lg:w-auto"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4">
                <Library className="w-3.5 h-3.5 text-yellow-300" />
                <span className="text-xs font-medium text-white/90">Ngân hàng câu hỏi</span>
              </div>

              {/* Title with gradient */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
                <GradientText>
                  Ngân hàng câu hỏi
                </GradientText>
              </h1>

              {/* Decorative underline */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "80px" }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="h-1 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full mt-3 mb-4"
              />

              {/* Description */}
              <p className="text-white/80 dark:text-gray-200 text-base md:text-lg max-w-xl leading-relaxed">
                Tìm kiếm, lọc theo môn/chương/độ khó/loại. Tạo đề từ nhiều nguồn.
              </p>

              {/* Quick stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex gap-4 mt-4"
              >
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  <span className="text-xs text-white/70">Hơn 10.000 câu hỏi</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                  <span className="text-xs text-white/70">50+ môn học</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                  <span className="text-xs text-white/70">Cập nhật liên tục</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Section - Action Buttons */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
              className="flex flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto"
            >
              {/* Primary Button - Create Question Bank */}
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/question-bank/create"
                  className="group relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold shadow-lg transition-all duration-300 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-emerald-950 hover:shadow-xl"
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

                  <PlusCircle className="h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
                  <span className="relative z-10">Thêm bộ câu hỏi mới</span>
                  <ChevronRight className="h-4 w-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </motion.div>

              {/* Secondary Button - View All Subjects */}
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/subjects"
                  className="group relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold shadow-lg transition-all duration-300 bg-white/10 backdrop-blur-sm text-white border border-white/30 hover:bg-white/20"
                >
                  <BookOpen className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Hiển thị tất cả môn học</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Floating Decorations */}
          {/* Decoration 1 - Question Badge */}
          <Floating distance={15} duration={7} className="pointer-events-none absolute top-20 left-5 z-0 hidden lg:block">
            <motion.div
              animate={{ rotate: [-6, 0, -6] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 px-4 py-2 shadow-xl"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="h-3 w-3 text-white" />
                <span className="text-xs font-black text-white tracking-wider">QUESTIONS</span>
                <Sparkles className="h-3 w-3 text-white" />
              </div>
            </motion.div>
          </Floating>

          {/* Decoration 2 - Book Icon */}
          <Floating distance={12} duration={6} className="pointer-events-none absolute top-24 right-8 z-0 hidden lg:block">
            <motion.div
              animate={{ rotate: [12, 0, 12] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 p-3 shadow-xl"
            >
              <BookOpen className="h-5 w-5 text-white" />
            </motion.div>
          </Floating>

          {/* Decoration 3 - Plus Icon */}
          <Floating distance={10} duration={8} className="pointer-events-none absolute bottom-0 right-1/4 z-0 hidden lg:block">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 p-2 shadow-lg"
            >
              <PlusCircle className="h-4 w-4 text-white" />
            </motion.div>
          </Floating>

          {/* Decoration 4 - Small dots */}
          <div className="pointer-events-none absolute top-1/2 left-10 -z-0 hidden xl:block">
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
                  className="w-1 h-1 rounded-full bg-white/40"
                />
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-10 right-20 -z-0 hidden xl:block">
            <div className="flex gap-1">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 4, delay: i * 0.3, repeat: Infinity }}
                  className="w-1 h-1 rounded-full bg-white/30"
                />
              ))}
            </div>
          </div>
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
              {selectedBanks.size > 0 && (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedBanks.size === questionBanks.length && questionBanks.length > 0}
                      onChange={selectAllBanks}
                      className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {selectedBanks.size} mục đã chọn
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
                      onClick={clearSelection}
                      className="px-3 py-1.5 text-sm text-slate-600 hover:text-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
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
                    <option value="questions-desc">Số câu (nhiều nhất)</option>
                    <option value="questions-asc">Số câu (ít nhất)</option>
                    <option value="visibility">Quyền xem</option>
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
                      Số câu {sortOption === 'questions-desc' ? '↓' : '↑'}
                    </button>
                    <button
                      onClick={() => setSortOption('visibility')}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-colors ${sortOption === 'visibility'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-400'
                        }`}
                    >
                      <Eye className="h-3 w-3" />
                      Quyền xem
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
                <div>
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
                </div>

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
                  {questionBanks.length > 0 && (
                    <label className="inline-flex cursor-pointer items-center gap-2 text-xs text-gray-700 dark:text-gray-300">
                      <input
                        type="checkbox"
                        checked={selectedBanks.size === questionBanks.length}
                        onChange={selectAllBanks}
                        className="h-4 w-4 rounded border-white/20 bg-white/20 text-emerald-500 focus:ring-emerald-400 dark:border-gray-600"
                      />
                      Chọn tất cả
                    </label>
                  )}
                </div>

                <div className="hidden items-center gap-2 text-xs text-white/90 dark:text-gray-300 md:flex">
                  <Filter className="h-4 w-4" /> {totalElements} kết quả
                  {selectedBanks.size > 0 && (
                    <span className="ml-2 px-2 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-medium">
                      {selectedBanks.size} đã chọn
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}


        {/* List */}
        {isLoading ? (
          <LoadingState />
        ) : questionBanks.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className={viewMode === 'grid'
              ? "grid gap-4 md:grid-cols-2 xl:grid-cols-3"
              : "space-y-4"
            }>
              {questionBanks.map((bank) => (
                viewMode === 'grid' ? (
                  <QuestionBankCardGrid
                    key={bank.bankId}
                    bank={bank}
                    isFavorite={favorites.has(bank.bankId)}
                    isSelected={selectedBanks.has(bank.bankId)}
                    onToggleFavorite={() => toggleFavorite(bank.bankId)}
                    onToggleSelect={() => toggleSelectBank(bank.bankId)}
                    userRole={user?.role}
                    userId={user?.id}
                    onDelete={() => handleDeleteBank(bank.bankId)}
                  />
                ) : (
                  <QuestionBankCardList
                    key={bank.bankId}
                    bank={bank}
                    isFavorite={favorites.has(bank.bankId)}
                    isSelected={selectedBanks.has(bank.bankId)}
                    onToggleFavorite={() => toggleFavorite(bank.bankId)}
                    onToggleSelect={() => toggleSelectBank(bank.bankId)}
                    userRole={user?.role}
                    userId={user?.id}
                    onDelete={() => handleDeleteBank(bank.bankId)}
                  />
                )
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-6 flex items-center justify-center gap-2">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-700 ring-1 ring-slate-200 disabled:opacity-50 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700"
              >
                <ChevronLeft className="h-4 w-4" /> Trước
              </button>
              <span className="text-sm text-slate-600 dark:text-slate-300">
                Trang {page}/{totalPages}
              </span>
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page >= totalPages}
                className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-700 ring-1 ring-slate-200 disabled:opacity-50 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700"
              >
                Sau <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </>
        )}
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full text-red-600 dark:text-red-400">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Xóa bộ câu hỏi</h3>
            </div>

            <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm leading-relaxed">
              Bạn có chắc chắn muốn xóa bộ câu hỏi này không? Bộ câu hỏi sẽ được đưa vào thùng rác (xóa mềm).
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 dark:text-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 shadow-sm shadow-red-500/20 rounded-lg transition-all active:scale-95"
              >
                Đồng ý xóa
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

import { QuestionBankCardGrid, type QuestionBankCardGridProps } from "./ui/QuestionBankCardGrid";
import { QuestionBankCardList } from "./ui/QuestionBankCardList";
import { LoadingState, ErrorState, EmptyState } from "./ui/States";
import GradientText from "@/shared/ui/GradientText";
