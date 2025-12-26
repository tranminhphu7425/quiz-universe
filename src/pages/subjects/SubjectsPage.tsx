// Auto-generated
import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen, Search, Filter, CheckCircle2, Clock, Tag, PlusCircle,
  ChevronLeft, ChevronRight, FilePlus2, Grid, List, SortAsc,
  SortDesc, Calendar, Download, Eye, EyeOff, MoreVertical,
  ChevronDown, Star, Users, Lock, Globe,
  ChevronUp
} from "lucide-react";
import { Heart, HeartOff } from "lucide-react";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import Floating from "@/shared/ui/Floatting";
import { set } from "zod";

type Difficulty = "easy" | "medium" | "hard";
type QType = "MCQ" | "TRUE_FALSE" | "FILL_BLANK";


import { fetchAllSubjects } from "@/shared/api/subjectApi";
import type { Subject } from "@/shared/types/subject";
import { useAuth } from "@/app/providers/AuthProvider";
import { favoriteService } from "@/shared/api/favoriteApi";
import { FavoriteSubject } from "@/shared/types/favorite";

// Map màu theo độ khó
const DIFFICULTY_MAP: Record<Difficulty, { text: string; bg: string; ring: string }> = {
  easy: { text: "text-emerald-800 dark:text-emerald-100", bg: "bg-emerald-100 dark:bg-emerald-500/20", ring: "ring-emerald-200/70 dark:ring-emerald-500/30" },
  medium: { text: "text-amber-800 dark:text-amber-100", bg: "bg-amber-100 dark:bg-amber-500/20", ring: "ring-amber-200/70 dark:ring-amber-500/30" },
  hard: { text: "text-rose-800 dark:text-rose-100", bg: "bg-rose-100 dark:bg-rose-500/20", ring: "ring-rose-200/70 dark:ring-rose-500/30" },
};

// Sort options
type SortOption = 'name-asc' | 'name-desc' | 'date-asc' | 'date-desc' | 'questions-asc' | 'questions-desc' | 'visibility';
type ViewMode = 'grid' | 'list';

export default function SubjectsPage() {
  // ======= FILTER Subjects
  const [q, setQ] = useState("");
  const [diff, setDiff] = useState<"all" | Difficulty>("all");
  const [type, setType] = useState<"all" | QType>("all");
  const [onlyApproved, setOnlyApproved] = useState(false);
  // const [visibilityFilter, setVisibilityFilter] = useState<'all' | 'PRIVATE' | 'ORG' | 'PUBLIC'>('all');
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Subject[]>([]);

  // ======= VIEW & SORT STATE =======
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortOption, setSortOption] = useState<SortOption>('date-desc');
  const [selectedSubjects, setSelectedSubjects] = useState<Set<number>>(new Set());
  const [showBulkActions, setShowBulkActions] = useState(false);
  // Thêm vào phần state khai báo
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const token = localStorage.getItem("auth_token");

  // ======= PAGINATION =======
  const [page, setPage] = useState(1);
  const pageSize = 12;

  const types = ["all", "MCQ", "TRUE_FALSE", "FILL_BLANK"] as const;
  const diffs = ["all", "easy", "medium", "hard"] as const;
  // const visibilityOptions = [
  //   { value: 'all', label: 'Tất cả', icon: Eye },
  //   { value: 'PUBLIC', label: 'Công khai', icon: Globe, color: 'text-emerald-600' },
  //   { value: 'ORG', label: 'Nội bộ', icon: Users, color: 'text-blue-600' },
  //   { value: 'PRIVATE', label: 'Riêng tư', icon: Lock, color: 'text-amber-600' }
  // ];

  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const { user, logout } = useAuth();


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
      // Fallback nếu giá trị không hợp lệ
      setSortOption('date-desc');
    }
  };

  const toggleFavorite = async (id: number) => {
    const isFav = favorites.has(id);
    if (!user) return;
    try {
      if (isFav) {
        await favoriteService.removeFavoriteSubject(id);
        setFavorites(prev => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      } else {
        await favoriteService.addFavoriteSubject(id);
        setFavorites(prev => new Set(prev).add(id));
      }
    } catch (err) {
      console.error("Lỗi khi cập nhật yêu thích", err);
    }
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

  useEffect(() => {
    const loadFavorite = async () => {
      try {
        if (!user) return;
        const data = await favoriteService.getFavoriteSubjects();
        setFavorites(new Set(data.map((s: FavoriteSubject) => s.subjectId)));
      } catch (err) {
        console.error(err);
      }
    };

    loadFavorite();
  }, []);

  async function fetchData() {
    setLoading(true);
    setErr(null);

    (async () => {
      try {
        const list = await fetchAllSubjects();
        setData(list);
      } catch (e: any) {
        if (e?.name === "AbortError") return;
        setErr("Không thể lấy dữ liệu từ API. Đang dùng dữ liệu cục bộ!");
        const local = await fetch("/quiz-universe/data/Subjects.json");
        setData((await local.json()) as Subject[]);
      } finally {
        setLoading(false);
      }
    })();

    return;
  }

  useEffect(() => {
    fetchData();
  }, []);

  // ======= FILTERING & SORTING =======
  const filtered = useMemo(() => {
    let result = data.filter(subject => {
      // Text search
      const kw = normalizeText(q);
      if (kw && !normalizeText(subject.name).includes(kw) &&
        !normalizeText(subject.description || "").includes(kw)) {
        return false;
      }

      // // Visibility filter
      // if (visibilityFilter !== 'all' && subject.visibility !== visibilityFilter) {
      //   return false;
      // }

      // // Only show approved (if applicable)
      // if (onlyApproved) {
      //   // You might need to add an 'approved' field to Subject type
      //   // For now, we'll filter by visibility PUBLIC as "approved"
      //   if (subject.visibility !== 'PUBLIC') {
      //     return false;
      //   }
      // }

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
        // case 'questions-asc':
        //   return (a.questionCount || 0) - (b.questionCount || 0);
        // case 'questions-desc':
        //   return (b.questionCount || 0) - (a.questionCount || 0);
        // case 'visibility':
        //   const order = { 'PUBLIC': 1, 'ORG': 2, 'PRIVATE': 3 };
        //   return (order[a.visibility] || 4) - (order[b.visibility] || 4);
        default:
          return 0;
      }
    });

    return result;
  }, [q, data, onlyApproved, sortOption]);

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

  const tileUrl = useMemo(
    () =>
      encodeURIComponent(`
        <svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160' fill='none'>
          <g stroke='#10b981' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>
            <path d='M28 36h40a8 8 0 018 8v44H36a8 8 0 01-8-8V36z' opacity='0.7'/>
            <path d='M28 52h48' opacity='0.6'/>
            <rect x='96' y='28' width='36' height='28' rx='4' />
            <path d='M100 36h18M100 44h18' opacity='0.6'/>
          </g>
        </svg>
      `),
    []
  );

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
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <section className="relative overflow-hidden">
        {/* Gradient nền */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-400
                      dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />

        {/* Tile mờ */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-[120%] md:w-full opacity-10 dark:opacity-[0.15]"
          style={{
            backgroundImage: `url("data:image/svg+xml;utf8,${tileUrl}")`,
            backgroundRepeat: "repeat",
            backgroundSize: "160px 160px",
            maskImage: "radial-gradient(1200px 400px at left center, #000 70%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(1200px 400px at left center, #000 70%, transparent 100%)",
          }}
        />

        {/* Blur blobs */}
        <div className="pointer-events-none absolute z-0 -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl dark:bg-emerald-400/20" />
        <div className="pointer-events-none absolute z-0 -right-16 top-10 h-64 w-64 rounded-full bg-white/10 blur-2xl dark:bg-purple-400/20" />

        {/* Hero section */}
        <motion.div className="relative z-10 text-center mx-auto max-w-6xl px-6 py-20">
          <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center ">
            <div className="w-full lg:w-auto">
              <h1 className="text-3xl font-black leading-tight text-white text-center lg:text-left">
                Tất cả các môn
              </h1>
              <p className="mt-1 text-white/90 dark:text-gray-300 text-center lg:text-left">
                Tìm kiếm, lọc theo trường/ bộ môn.
              </p>
            </div>

            <div className="flex items-center gap-3 justify-center w-full lg:w-auto">
              <Link
                to="subject/create"
                className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-5 py-2 text-sm font-semibold text-emerald-950 shadow hover:brightness-105"
              >
                <PlusCircle className="h-4 w-4" /> Thêm môn mới
              </Link>
            </div>
          </div>

          {/* Floating decor */}
          <Floating distance={12} duration={7} className="pointer-events-none absolute top-16 left-8">
            <div className="rounded-xl bg-gradient-to-br from-amber-300 to-rose-300 px-3 py-1 shadow-lg -rotate-6">
              <span className="text-xs font-black text-rose-700">SUBJECT</span>
            </div>
          </Floating>

          <Floating distance={10} duration={6} className="pointer-events-none absolute top-16 right-10">
            <div className="rounded-full bg-gradient-to-br from-purple-400 to-indigo-400 p-3 shadow-xl rotate-12">
              <BookOpen className="h-4 w-4 text-white" />
            </div>
          </Floating>
        </motion.div>
      </section>

      {/* ===== CONTROL BAR ===== */}

      <div className="sticky mb-5 top-12 z-20 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700">
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
        {loading ? (
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
                    isFavorite={favorites.has(subject.id)}
                    isSelected={selectedSubjects.has(subject.id)}
                    onToggleFavorite={() => toggleFavorite(subject.id)}
                    onToggleSelect={() => toggleSelectSubject(subject.id)}
                    userRole={user?.role}
                  />
                ) : (
                  <SubjectCardList
                    key={subject.id}
                    subject={subject}
                    isFavorite={favorites.has(subject.id)}
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
                className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-sm text-white ring-1 ring-white/20 disabled:opacity-50 dark:bg-white/5 dark:ring-white/10"
              >
                <ChevronLeft className="h-4 w-4" /> Trước
              </button>
              <span className="text-sm text-white/90 dark:text-gray-300">
                Trang {page}/{totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-sm text-white ring-1 ring-white/20 disabled:opacity-50 dark:bg-white/5 dark:ring-white/10"
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
                to={`/subject/${subject.id}/edit`}
                className="inline-flex items-center gap-1 rounded-lg bg-red-400 px-2 py-1 text-xs font-semibold text-emerald-950 shadow hover:brightness-105"
              >
                Sửa
              </Link>
            )}
            <Link
              to={`/subject/${subject.id}`}
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
                  to={`/subject/${subject.id}`}
                  className="inline-flex items-center gap-1 rounded-lg bg-yellow-400 px-3 py-1.5 text-sm font-semibold text-emerald-950 shadow hover:brightness-105"
                >
                  Xem
                </Link>
                {(userRole === "admin" || userRole === "editor") && (
                  <Link
                    to={`/subject/${subject.id}/edit`}
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
            to="/subject/create"
            className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-4 py-2 text-sm font-semibold text-emerald-950 shadow hover:brightness-105"
          >
            <PlusCircle className="h-4 w-4" /> Thêm môn học mới
          </Link>
        </div>
      </div>
    </div>
  );
}