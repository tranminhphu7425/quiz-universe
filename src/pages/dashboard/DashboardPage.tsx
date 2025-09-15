import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Heart,
  ListChecks,
  FolderPlus,
  FilePlus2,
  BookOpen,
  ArrowRight,
  Trash2,
  ExternalLink,
  Star,
  Clock,
} from "lucide-react";

import LoadingState from "@/widgets/LoadingState";
import Floating from "@/shared/ui/Floatting";
import { useAuth } from "@/app/providers/AuthProvider";

// =============================
// Types & mockable interfaces
// =============================
export type QuestionSet = {
  id: number;
  name: string;
  subjectId?: number | null;
  subjectName?: string | null;
  questionsCount: number;
  createdAt?: string;
  updatedAt?: string;
  // owner info (optional)
  ownerId?: number | string;
  ownerName?: string;
};

// LocalStorage keys (can be swapped to API later)
const LS_FAVORITES_KEY = "quizuv_favorite_sets";
const LS_MYSETS_KEY = "quizuv_my_sets";

function loadFromLS<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function saveToLS<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

// =============================
// Dashboard Page
// =============================
export default function DashboardPage() {
  const { user } = useAuth();

  const [favSets, setFavSets] = useState<QuestionSet[]>([]);
  const [mySets, setMySets] = useState<QuestionSet[]>([]);
  const [loading, setLoading] = useState(true);

  // mock initial seed for demo if empty
  useEffect(() => {
    const fav = loadFromLS<QuestionSet[]>(LS_FAVORITES_KEY, []);
    const mine = loadFromLS<QuestionSet[]>(LS_MYSETS_KEY, []);

    // Minimal demo seeds (only if both empty)
    if (!fav.length && !mine.length) {
      const seedFav: QuestionSet[] = [
        {
          id: 101,
          name: "Cơ sở Lập trình • Giữa kì ôn tập",
          subjectId: 4,
          subjectName: "CS101 – Cơ sở Lập trình",
          questionsCount: 50,
          createdAt: new Date().toISOString(),
        },
        {
          id: 102,
          name: "CT175 – Đồ thị (Chương 1–3)",
          subjectId: 12,
          subjectName: "CT175 – Lý thuyết đồ thị",
          questionsCount: 40,
          createdAt: new Date().toISOString(),
        },
      ];
      const seedMine: QuestionSet[] = [
        {
          id: 201,
          name: "OOP – Chương 2: Kế thừa & Đa hình",
          subjectId: 8,
          subjectName: "CSE201 – Lập trình Hướng Đối Tượng",
          questionsCount: 35,
          createdAt: new Date().toISOString(),
          ownerId: user?.id ?? 1,
          ownerName: user?.name ?? "Tôi",
        },
      ];
      saveToLS(LS_FAVORITES_KEY, seedFav);
      saveToLS(LS_MYSETS_KEY, seedMine);
      setFavSets(seedFav);
      setMySets(seedMine);
      setLoading(false);
      return;
    }

    setFavSets(fav);
    setMySets(mine);
    setLoading(false);
  }, [user?.id, user?.name]);

  const totalFav = favSets.length;
  const totalMine = mySets.length;
  const totalQuestions = useMemo(
    () => favSets.reduce((s, x) => s + (x.questionsCount || 0), 0) + mySets.reduce((s, x) => s + (x.questionsCount || 0), 0),
    [favSets, mySets]
  );

  function removeFavorite(id: number) {
    setFavSets((cur) => {
      const next = cur.filter((x) => x.id !== id);
      saveToLS(LS_FAVORITES_KEY, next);
      return next;
    });
  }

  function removeMySet(id: number) {
    setMySets((cur) => {
      const next = cur.filter((x) => x.id !== id);
      saveToLS(LS_MYSETS_KEY, next);
      return next;
    });
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />

        {/* Soft blobs */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl dark:bg-emerald-400/10" />
        <div className="pointer-events-none absolute -right-16 top-10 h-64 w-64 rounded-full bg-white/10 blur-2xl dark:bg-purple-400/10" />

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 py-14 md:flex-row md:justify-between">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 160, damping: 18 }}>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/20 backdrop-blur">
              <Star className="h-4 w-4" /> Bảng điều khiển
            </div>
            <h1 className="text-[2rem] md:text-[2.4rem] font-black leading-tight text-white">
              Xin chào{user?.name ? `, ${user.name}` : "!"} 👋
            </h1>
            <p className="mt-1 max-w-xl text-white/90">
              Tóm tắt nhanh những bộ câu hỏi bạn yêu thích và bạn đã tạo.
            </p>
          </motion.div>

          {/* Quick actions */}
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.05 }} className="flex flex-wrap items-center gap-3">
            <Link to="/subjects" className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white ring-1 ring-white/30 hover:bg-white/15 dark:bg-white/5 dark:ring-white/10">
              <BookOpen className="h-4 w-4" /> Duyệt môn học
            </Link>
            <Link to="/app/questions/create" className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-5 py-2 text-sm font-semibold text-emerald-950 shadow hover:brightness-105">
              <FilePlus2 className="h-4 w-4" /> Tạo bộ câu hỏi
            </Link>
          </motion.div>

          {/* Floating decor */}
          <Floating distance={12} duration={7} className="pointer-events-none absolute top-6 left-6">
            <div className="rounded-xl bg-gradient-to-br from-amber-300 to-rose-300 px-3 py-1 shadow-lg -rotate-6">
              <span className="text-xs font-black text-rose-700">DASH</span>
            </div>
          </Floating>
          <Floating distance={10} duration={6} className="pointer-events-none absolute top-6 right-8">
            <div className="rounded-full bg-gradient-to-br from-purple-400 to-indigo-400 p-3 shadow-xl rotate-12">
              <Heart className="h-4 w-4 text-white" />
            </div>
          </Floating>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="mx-auto max-w-7xl px-6 -mt-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={<Heart className="h-4 w-4" />} label="Yêu thích" value={totalFav} hint="bộ câu hỏi" />
          <StatCard icon={<ListChecks className="h-4 w-4" />} label="Của tôi" value={totalMine} hint="bộ câu hỏi" />
          <StatCard icon={<BookOpen className="h-4 w-4" />} label="Tổng số câu" value={totalQuestions} hint="ước tính" />
          <StatCard icon={<Clock className="h-4 w-4" />} label="Hoạt động" value={new Date().toLocaleDateString()} hint="ngày cập nhật" />
        </div>
      </section>

      {/* ===== CONTENT ===== */}
      <main className="mx-auto max-w-7xl px-6 py-10">
        {loading ? (
          <LoadingState count={6} />
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Favorites */}
            <section className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <header className="mb-3 flex items-center justify-between">
                <h2 className="text-base font-bold text-emerald-900 dark:text-emerald-200 inline-flex items-center gap-2">
                  <Heart className="h-4 w-4" /> Bộ câu hỏi yêu thích
                </h2>
                <span className="text-xs text-slate-500 dark:text-slate-400">{totalFav} mục</span>
              </header>
              {favSets.length === 0 ? (
                <EmptyBox
                  title="Chưa có bộ câu hỏi yêu thích"
                  desc="Hãy đánh dấu ♥ ở danh sách đề hoặc câu hỏi để lưu tại đây."
                  action={<Link to="/subjects" className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-3 py-1.5 text-sm text-white hover:brightness-110"><BookOpen className="h-4 w-4" /> Duyệt môn</Link>}
                />
              ) : (
                <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                  {favSets.map((s) => (
                    <li key={s.id} className="py-3">
                      <SetRow s={s}
                        onRemove={() => removeFavorite(s.id)}
                        primaryAction={{ to: s.subjectId ? `/questions/subject/${s.subjectId}` : `#`, label: "Làm ngay" }}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* My sets */}
            <section className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <header className="mb-3 flex items-center justify-between">
                <h2 className="text-base font-bold text-emerald-900 dark:text-emerald-200 inline-flex items-center gap-2">
                  <ListChecks className="h-4 w-4" /> Bộ câu hỏi của tôi
                </h2>
                <div className="flex items-center gap-2">
                  <Link to="/app/questions/create" className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-3 py-1.5 text-xs font-semibold text-emerald-950 shadow hover:brightness-105">
                    <FolderPlus className="h-4 w-4" /> Tạo mới
                  </Link>
                </div>
              </header>
              {mySets.length === 0 ? (
                <EmptyBox
                  title="Bạn chưa tạo bộ câu hỏi nào"
                  desc="Bắt đầu bằng cách tạo bộ mới rồi thêm câu hỏi."
                  action={<Link to="/app/questions/create" className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-3 py-1.5 text-sm font-semibold text-emerald-950 shadow hover:brightness-105"><FilePlus2 className="h-4 w-4" /> Tạo bộ mới</Link>}
                />
              ) : (
                <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                  {mySets.map((s) => (
                    <li key={s.id} className="py-3">
                      <SetRow s={s}
                        onRemove={() => removeMySet(s.id)}
                        primaryAction={{ to: s.subjectId ? `/questions/subject/${s.subjectId}/edit` : `#`, label: "Quản lý" }}
                        removableLabel="Xoá khỏi của tôi"
                      />
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        )}
      </main>
    </div>
  );
}

// =============================
// Sub-components
// =============================
function StatCard({ icon, label, value, hint }: { icon: React.ReactNode; label: string; value: number | string; hint?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 140, damping: 16 }} className="rounded-2xl border border-white/40 bg-white/80 p-4 shadow-sm backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/60">
      <div className="flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200">
          {icon}
        </div>
        <div className="min-w-0">
          <div className="text-xs text-slate-500 dark:text-slate-400">{label}</div>
          <div className="text-lg font-bold text-slate-900 dark:text-slate-100">{value}</div>
          {hint && <div className="text-[11px] text-slate-400 dark:text-slate-500">{hint}</div>}
        </div>
      </div>
    </motion.div>
  );
}

function EmptyBox({ title, desc, action }: { title: string; desc: string; action?: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center dark:border-slate-700">
      <p className="font-semibold text-slate-700 dark:text-slate-200">{title}</p>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{desc}</p>
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}

function SetRow({ s, onRemove, primaryAction, removableLabel = "Bỏ khỏi yêu thích" }: {
  s: QuestionSet;
  onRemove?: () => void;
  primaryAction?: { to: string; label: string };
  removableLabel?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200">
        <ListChecks className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <div className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">{s.name}</div>
          {s.subjectName && (
            <span className="inline-flex items-center gap-1 rounded-md bg-emerald-100 px-2 py-0.5 text-[11px] font-medium text-emerald-800 ring-1 ring-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-100 dark:ring-emerald-800">
              <BookOpen className="h-3 w-3" /> {s.subjectName}
            </span>
          )}
        </div>
        <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{s.questionsCount} câu hỏi</div>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {primaryAction && (
            <Link to={primaryAction.to} className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-3 py-1.5 text-xs text-white hover:brightness-110">
              {primaryAction.label} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
          <Link to={s.subjectId ? `/questions/subject/${s.subjectId}` : `#`} className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700 dark:hover:bg-slate-700">
            Xem <ExternalLink className="h-3.5 w-3.5" />
          </Link>
          {onRemove && (
            <button onClick={onRemove} className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-3 py-1.5 text-xs text-rose-700 ring-1 ring-rose-200 hover:bg-rose-100 dark:bg-rose-900/20 dark:text-rose-300 dark:ring-rose-800">
              <Trash2 className="h-3.5 w-3.5" /> {removableLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
