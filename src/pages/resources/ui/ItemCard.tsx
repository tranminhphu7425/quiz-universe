import { motion } from "framer-motion";
import { FolderOpen, Download, Clock } from "lucide-react";

export function ItemCard({
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
