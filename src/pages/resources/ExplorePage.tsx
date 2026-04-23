import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  Folder,
  FileText,
  ArrowRight,
  Home,
  ChevronRight,
  Search,
  Grid,
  List,
  SortAsc,
  SortDesc,
  FolderOpen,
  File,
  Download,
  Calendar,
  Clock,
  ExternalLink
} from "lucide-react";
import AnimatedGradientBackground from "@/shared/ui/AnimatedGradientBackground";
import { normalizeText } from "@/shared/utils/textUtils";

type FileItem = {
  name: string;
  path: string;
  type: string;
  link: string;
  lastModified?: string;
};

type FolderItem = {
  name: string;
  type: string;
  path: string;
  driveId?: string;
  children?: any[];
  lastModified?: string;
};

type SortOption = 'name-asc' | 'name-desc' | 'type' | 'date';

export default function ExplorePage() {
  const [folders, setFolders] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPath, setCurrentPath] = useState<string>("");
  const [currentItems, setCurrentItems] = useState<any[]>([]);
  const [pathHistory, setPathHistory] = useState<string[]>([""]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortOption, setSortOption] = useState<SortOption>('name-asc');
  const [currentDriveId, setCurrentDriveId] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();

  // Thêm state để kiểm soát hiệu năng
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [displayLimit, setDisplayLimit] = useState(40);

  // Sync searchQuery with URL params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("search");
    if (q) {
      setSearchQuery(q);
      setDebouncedSearchQuery(q); // Set immediately for better UX when navigating from dashboard
    }
  }, [location.search]);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      setDisplayLimit(40); // Reset limit khi search mới
    }, 1000);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Shortcut Ctrl + K to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Root folder ID từ Google Drive URL trong generate-tree.cjs
  const ROOT_DRIVE_ID = "1NqnO17ZVH91Np0aCKXvBwIMOowt5bh6c";

  /** Tìm driveId của folder theo path */
  const findDriveIdByPath = (items: any[], targetPath: string): string | null => {
    for (const item of items) {
      if (item.path === targetPath && item.type === "folder") {
        return item.driveId || null;
      }
      if (item.children) {
        const result = findDriveIdByPath(item.children, targetPath);
        if (result) return result;
      }
    }
    return null;
  };

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}/files.json`)
      .then((res) => res.json())
      .then((data) => {
        setFolders(data.folders);
        setCurrentItems(data.folders);
        setCurrentDriveId(ROOT_DRIVE_ID);
      });
  }, []);

  const navigateToPath = (path: string) => {
    setCurrentPath(path);
    setDisplayLimit(40); // Reset limit khi đổi thư mục

    const pathIndex = pathHistory.indexOf(path);
    if (pathIndex === -1) {
      setPathHistory([...pathHistory, path]);
    } else {
      setPathHistory(pathHistory.slice(0, pathIndex + 1));
    }

    if (!path) {
      setCurrentItems(folders);
      setCurrentDriveId(ROOT_DRIVE_ID);
      return;
    }

    const findItemsByPath = (items: any[], targetPath: string): any[] | null => {
      for (const item of items) {
        if (item.path === targetPath && item.children) {
          return item.children;
        }
        if (item.children) {
          const result = findItemsByPath(item.children, targetPath);
          if (result) return result;
        }
      }
      return null;
    };

    const items = findItemsByPath(folders, path);
    setCurrentItems(items || folders);

    // Tìm driveId cho folder hiện tại
    const driveId = findDriveIdByPath(folders, path);
    setCurrentDriveId(driveId);
  };

  const goBack = () => {
    if (pathHistory.length > 1) {
      const newHistory = [...pathHistory];
      newHistory.pop();
      const previousPath = newHistory[newHistory.length - 1];
      setPathHistory(newHistory);
      navigateToPath(previousPath);
    }
  };

  const getSortedItems = (items: any[]) => {
    const sorted = [...items];

    sorted.sort((a, b) => {
      // Ưu tiên thư mục trước
      if (a.type === 'folder' && b.type !== 'folder') return -1;
      if (a.type !== 'folder' && b.type === 'folder') return 1;

      switch (sortOption) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'type':
          if (a.type === b.type) {
            return a.name.localeCompare(b.name);
          }
          return a.type.localeCompare(b.type);
        case 'date':
          // Nếu có thông tin lastModified thì sort theo đó
          if (a.lastModified && b.lastModified) {
            return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
          }
          return 0;
        default:
          return 0;
      }
    });

    return sorted;
  };

  const searchAllItems = (items: any[], query: string): any[] => {
    let results: any[] = [];
    const normalizedQuery = normalizeText(query);

    for (const item of items) {
      if (normalizeText(item.name).includes(normalizedQuery)) {
        results.push(item);
      }
      if (item.children) {
        results = [...results, ...searchAllItems(item.children, query)];
      }
    }
    return results;
  };

  const filteredItems = React.useMemo(() => {
    return getSortedItems(
      debouncedSearchQuery
        ? searchAllItems(folders, debouncedSearchQuery)
        : currentItems
    );
  }, [debouncedSearchQuery, currentItems, folders, sortOption]);

  const displayedItems = filteredItems.slice(0, displayLimit);

  const getBreadcrumbItems = () => {
    if (!currentPath) return [];

    const parts = currentPath.split('/').filter(part => part);
    const breadcrumb = [];

    let current = "";
    for (const part of parts) {
      current = current ? `${current}/${part}` : `/${part}`;
      breadcrumb.push({ name: part, path: current });
    }

    return breadcrumb;
  };

  const getFileIcon = (type: string) => {
    const icons: Record<string, { icon: string, color: string }> = {
      pdf: { icon: "📕", color: "text-red-500" },
      docx: { icon: "📘", color: "text-blue-500" },
      doc: { icon: "📘", color: "text-blue-500" },
      jpg: { icon: "🖼️", color: "text-purple-500" },
      png: { icon: "🖼️", color: "text-purple-500" },
      rar: { icon: "📦", color: "text-orange-500" },
      zip: { icon: "📦", color: "text-orange-500" },
      cdm: { icon: "🗄️", color: "text-cyan-500" },
      cdb: { icon: "🗄️", color: "text-cyan-500" },
      bpm: { icon: "📊", color: "text-green-500" },
      bpb: { icon: "📊", color: "text-green-500" },
      pdm: { icon: "🗃️", color: "text-indigo-500" },
      pdb: { icon: "🗃️", color: "text-indigo-500" },
      ldm: { icon: "🗂️", color: "text-pink-500" },
      ldb: { icon: "🗂️", color: "text-pink-500" },
      sws: { icon: "💼", color: "text-yellow-500" },
    };

    return icons[type.toLowerCase()] || { icon: "📄", color: "text-slate-500" };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900 dark:to-gray-900">


      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">

        <AnimatedGradientBackground />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-10 md:py-12">
          <div className="text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 160, damping: 18 }}
              className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/20 backdrop-blur dark:bg-white/5 dark:ring-white/10"
            >
              <span className="text-base">📚</span>
              <span className="text-white/90 dark:text-gray-200 text-[11px]">Thư viện tài nguyên • Dành cho sinh viên CTU</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
              className="text-3xl md:text-4xl font-black text-white mb-2"
            >
              <span className="text-white dark:text-gray-100">
                Trình duyệt tài nguyên
              </span>
            </motion.h1>

            {/* Decorative line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "60px" }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="h-0.5 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full mx-auto mb-3"
            />

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white/85 dark:text-gray-300 text-sm md:text-base max-w-2xl mx-auto"
            >
              Khám phá và mở tài liệu từ các học phần một cách dễ dàng
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative max-w-xl mx-auto mt-5"
            >
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-300 dark:text-emerald-400 h-4 w-4 transition-colors group-focus-within:text-yellow-300" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Tìm kiếm tài liệu, thư mục..."
                  className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-300/50 focus:bg-white/15 transition-all text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />

                {/* Shortcut hint */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 text-[10px] font-semibold text-white/60 bg-white/10 rounded-md">Ctrl</kbd>
                  <kbd className="px-1.5 py-0.5 text-[10px] font-semibold text-white/60 bg-white/10 rounded-md">K</kbd>
                </div>
              </div>

              {/* Quick filters */}
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                <span className="text-[10px] text-white/50">Nhanh:</span>
                {["Bài giảng", "Đề thi", "Tài liệu", "Slide"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/70 hover:bg-white/20 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0 opacity-15">
          <svg className="w-full h-8" preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
            <path d="M321.39 56.44c58-10.79 114.16-30.13 172-41.86 82.39-16.72 168.19-17.73 250.45-.39C823.78 31 906.67 72 985.66 92.83c70.05 18.48 146.53 26.09 214.34 3V0H0V27.35A600.21 600.21 0 00321.39 56.44z" fill="currentColor" />
          </svg>
        </div>
      </section>

      {/* ===== CONTROL BAR ===== */}
      <div className="sticky top-12 z-20 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-6 py-3">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'grid'
                  ? 'bg-white dark:bg-slate-600 shadow-sm'
                  : 'hover:bg-white/50 dark:hover:bg-slate-600/50'
                  }`}
              >
                <Grid className={`h-4 w-4 ${viewMode === 'grid' ? 'text-emerald-600' : 'text-slate-500'}`} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'list'
                  ? 'bg-white dark:bg-slate-600 shadow-sm'
                  : 'hover:bg-white/50 dark:hover:bg-slate-600/50'
                  }`}
              >
                <List className={`h-4 w-4 ${viewMode === 'list' ? 'text-emerald-600' : 'text-slate-500'}`} />
              </button>
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-3">
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
                  onClick={() => setSortOption('type')}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${sortOption === 'type'
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-400'
                    }`}
                >
                  Loại
                </button>
                <button
                  onClick={() => setSortOption('date')}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-colors ${sortOption === 'date'
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-400'
                    }`}
                >
                  <Calendar className="h-3 w-3" />
                  Ngày
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="text-sm text-slate-600 dark:text-slate-400">
              {filteredItems.length} mục
            </div>
          </div>
        </div>
      </div>

      {/* ===== BREADCRUMB ===== */}
      <div className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="mx-auto max-w-7xl px-6 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap flex-1 min-w-0">
              <button
                onClick={() => navigateToPath("")}
                className="flex items-center gap-1 text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 shrink-0"
              >
                <Home className="h-4 w-4" />
                Trang chủ
              </button>

              {getBreadcrumbItems().map((item, index) => (
                <React.Fragment key={item.path}>
                  <ChevronRight className="h-4 w-4 text-slate-400 shrink-0" />
                  <button
                    onClick={() => navigateToPath(item.path)}
                    className={`text-sm truncate max-w-[150px] sm:max-w-[200px] shrink-0 ${index === getBreadcrumbItems().length - 1
                      ? "font-semibold text-emerald-700 dark:text-emerald-300"
                      : "text-slate-600 dark:text-slate-400 hover:text-emerald-600"
                      }`}
                    title={item.name}
                  >
                    {item.name}
                  </button>
                </React.Fragment>
              ))}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {currentDriveId && (
                <a
                  href={`https://drive.google.com/drive/folders/${currentDriveId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium
                    bg-blue-50 text-blue-600 hover:bg-blue-100
                    dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/40
                    transition-colors border border-blue-200 dark:border-blue-800"
                  title="Mở thư mục này trong Google Drive"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Mở trong Drive
                </a>
              )}
              {pathHistory.length > 1 && (
                <button
                  onClick={goBack}
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-emerald-600 flex items-center gap-1"
                >
                  ← Quay lại
                </button>
              )}
            </div>
          </div>
        </div>
      </div>



      {/* ===== CONTENT ===== */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        <AnimatePresence mode="wait">
          {filteredItems.length > 0 ? (
            <motion.div
              key={viewMode + sortOption}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="transition-all duration-300"
            >
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {displayedItems.map((item, i) => (
                    <ItemCard
                      key={i}
                      item={item}
                      viewMode={viewMode}
                      getFileIcon={getFileIcon}
                      onClick={() => {
                        if (item.type === "folder") {
                          navigateToPath(item.path);
                          setSearchQuery("");
                        } else {
                          window.open(item.link, "_blank");
                        }
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {displayedItems.map((item, i) => (
                    <ItemCard
                      key={i}
                      item={item}
                      viewMode={viewMode}
                      getFileIcon={getFileIcon}
                      onClick={() => {
                        if (item.type === "folder") {
                          navigateToPath(item.path);
                        } else {
                          window.open(item.link, "_blank");
                        }
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Nút Xem thêm */}
              {displayLimit < filteredItems.length && (
                <div className="mt-10 flex justify-center">
                  <button
                    onClick={() => setDisplayLimit(prev => prev + 40)}
                    className="flex items-center gap-2 px-8 py-3 rounded-full bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all shadow-sm"
                  >
                    🚀 Xem thêm ({filteredItems.length - displayLimit} mục còn lại)
                  </button>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <FileText className="h-16 w-16 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
              <p className="text-lg text-slate-500 dark:text-slate-400">
                {searchQuery ? "Không tìm thấy kết quả phù hợp" : "Đang tải dữ liệu..."}
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-4 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700"
                >
                  Xóa tìm kiếm
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

import { ItemCard } from "./ui/ItemCard";