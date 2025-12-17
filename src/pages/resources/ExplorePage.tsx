import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
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
  Clock
} from "lucide-react";

type FileItem = {
  name: string;
  path: string;
  type: string;
  link: string;
  lastModified?: string;
};

type Folder = {
  name: string;
  type: string;
  path: string;
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

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}/files.json`)
      .then((res) => res.json())
      .then((data) => {
        setFolders(data.folders);
        setCurrentItems(data.folders);
      });
  }, []);

  const navigateToPath = (path: string) => {
    setCurrentPath(path);

    const pathIndex = pathHistory.indexOf(path);
    if (pathIndex === -1) {
      setPathHistory([...pathHistory, path]);
    } else {
      setPathHistory(pathHistory.slice(0, pathIndex + 1));
    }

    if (!path) {
      setCurrentItems(folders);
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

  const filteredItems = getSortedItems(
    currentItems.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

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
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            className="text-5xl font-black text-white mb-4"
          >
            📂 Trình duyệt tài nguyên
          </motion.h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Khám phá và mở tài liệu từ các học phần một cách dễ dàng
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative max-w-2xl mx-auto"
          >
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-500" />
            <input
              type="text"
              placeholder="Tìm kiếm tài liệu, thư mục..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </motion.div>
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

            {pathHistory.length > 1 && (
              <button
                onClick={goBack}
                className="ml-2 text-sm text-slate-600 dark:text-slate-400 hover:text-emerald-600 flex items-center gap-1 shrink-0"
              >
                ← Quay lại
              </button>
            )}
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
                  {filteredItems.map((item, i) => (
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
                  {filteredItems.map((item, i) => (
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

function ItemCard({
  item,
  viewMode,
  getFileIcon,
  onClick
}: {
  item: any;
  viewMode: 'grid' | 'list';
  getFileIcon: (type: string) => { icon: string, color: string };
  onClick: () => void;
}) {
  const isFolder = item.type === "folder";
  const fileIcon = getFileIcon(item.type);

  if (viewMode === 'grid') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        onClick={onClick}
        className={`group cursor-pointer rounded-xl p-4 transition-all duration-300 ${isFolder
            ? "bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-emerald-900/10 border border-emerald-200 dark:border-emerald-800 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-lg"
            : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-md"
          }`}
      >
        <div className="flex items-start gap-3">
          <div className={`text-2xl ${!isFolder ? fileIcon.color : ''}`}>
            {isFolder ? "📁" : fileIcon.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-800 dark:text-slate-200 truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              {item.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-xs px-2 py-0.5 rounded-full ${isFolder
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                  : "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400"
                }`}>
                {isFolder ? "Thư mục" : item.type.toUpperCase()}
              </span>
              {!isFolder && item.lastModified && (
                <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {new Date(item.lastModified).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
          {isFolder ? (
            <FolderOpen className="h-5 w-5 text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
          ) : (
            <Download className="h-4 w-4 text-slate-400 group-hover:text-emerald-500" />
          )}
        </div>
      </motion.div>
    );
  }

  // List View
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 4, transition: { duration: 0.2 } }}
      onClick={onClick}
      className={`group cursor-pointer rounded-lg p-4 transition-all duration-300 ${isFolder
          ? "bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/10 dark:to-emerald-900/5 border border-emerald-100 dark:border-emerald-800/50 hover:border-emerald-300 dark:hover:border-emerald-700"
          : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-700"
        }`}
    >
      <div className="flex items-center gap-4">
        <div className={`text-2xl ${!isFolder ? fileIcon.color : ''} flex-shrink-0`}>
          {isFolder ? "📁" : fileIcon.icon}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-slate-800 dark:text-slate-200 truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {item.name}
              </h3>
              <div className="flex items-center gap-3 mt-1">
                <span className={`text-xs px-2 py-0.5 rounded-full ${isFolder
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                    : "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400"
                  }`}>
                  {isFolder ? "Thư mục" : item.type.toUpperCase()}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[200px]">
                  {item.path}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 ml-4">
              {item.lastModified && (
                <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 whitespace-nowrap">
                  <Clock className="h-3 w-3" />
                  {new Date(item.lastModified).toLocaleDateString()}
                </span>
              )}

              {isFolder ? (
                <FolderOpen className="h-5 w-5 text-slate-400 group-hover:text-emerald-500 transition-colors" />
              ) : (
                <Download className="h-4 w-4 text-slate-400 group-hover:text-emerald-500 transition-colors" />
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}