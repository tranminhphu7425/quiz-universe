// import { SortAsc } from "lucide-react";

// type Props = {
//     viewMode: 'grid' | 'list';
//     setViewMode: (mode: 'grid' | 'list') => void;
//     sortOption: string;
//     setSortOption: (opt: string) => void;
//     total: number;
// };

// export function ControlBar({
//     viewMode,
//     setViewMode,
//     sortOption,
//     setSortOption,
//     total,
// }: Props) {
//     return (
//         <>
//             {/* ===== CONTROL BAR ===== */}
//             <div className="sticky top-12 z-20 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700">
//                 <div className="mx-auto max-w-7xl px-6 py-3">
//                     <div className="flex flex-wrap items-center justify-between gap-4">
//                         {/* View Toggle */}
//                         <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
//                             <button
//                                 onClick={() => setViewMode('grid')}
//                                 className={`p-2 rounded-md transition-colors ${viewMode === 'grid'
//                                     ? 'bg-white dark:bg-slate-600 shadow-sm'
//                                     : 'hover:bg-white/50 dark:hover:bg-slate-600/50'
//                                     }`}
//                             >
//                                 <Grid className={`h-4 w-4 ${viewMode === 'grid' ? 'text-emerald-600' : 'text-slate-500'}`} />
//                             </button>
//                             <button
//                                 onClick={() => setViewMode('list')}
//                                 className={`p-2 rounded-md transition-colors ${viewMode === 'list'
//                                     ? 'bg-white dark:bg-slate-600 shadow-sm'
//                                     : 'hover:bg-white/50 dark:hover:bg-slate-600/50'
//                                     }`}
//                             >
//                                 <List className={`h-4 w-4 ${viewMode === 'list' ? 'text-emerald-600' : 'text-slate-500'}`} />
//                             </button>
//                         </div>

//                         {/* Sort Options */}
//                         <div className="flex items-center gap-3">
//                             <span className="text-sm text-slate-600 dark:text-slate-400">Sắp xếp:</span>
//                             <div className="flex flex-wrap gap-2">
//                                 <button
//                                     onClick={() => setSortOption(sortOption === 'name-asc' ? 'name-desc' : 'name-asc')}
//                                     className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-colors ${sortOption.startsWith('name')
//                                         ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
//                                         : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-400'
//                                         }`}
//                                 >
//                                     {sortOption === 'name-asc' ? <SortAsc className="h-3 w-3" /> : <SortDesc className="h-3 w-3" />}
//                                     Tên
//                                 </button>
//                                 <button
//                                     onClick={() => setSortOption('type')}
//                                     className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${sortOption === 'type'
//                                         ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
//                                         : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-400'
//                                         }`}
//                                 >
//                                     Loại
//                                 </button>
//                                 <button
//                                     onClick={() => setSortOption('date')}
//                                     className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-colors ${sortOption === 'date'
//                                         ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
//                                         : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-400'
//                                         }`}
//                                 >
//                                     <Calendar className="h-3 w-3" />
//                                     Ngày
//                                 </button>
//                             </div>
//                         </div>

//                         {/* Stats */}
//                         <div className="text-sm text-slate-600 dark:text-slate-400">
//                             {filteredItems.length} mục
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }
