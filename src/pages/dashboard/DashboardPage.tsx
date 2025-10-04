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
  Tag,
} from "lucide-react";

import LoadingState from "@/widgets/LoadingState";
import Floating from "@/shared/ui/Floatting";
import { useAuth } from "@/app/providers/AuthProvider";
import { Subject } from "@/shared/api/subjectApi";
import favoriteApi, {fetchFavorites} from "@/shared/api/favoriteApi";
import TypewriterText from "@/shared/ui/TypewriterText";
import OrbitingSkills from "@/shared/ui/OrbitingSkills";


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



// =============================
// Dashboard Page
// =============================
export default function DashboardPage() {
  const user = useAuth();


  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState<Subject[]>([]);
  const User = user?.user;
  const token = localStorage.getItem("auth_token");


  useEffect(() => {
    const loadFavorite = async () => {

      try {
        const data = await fetchFavorites(User?.id, token!);
        setFavorites(data);
      } catch (err) {
        console.error(err);
      }
    };

    loadFavorite();
  }, []);

  useEffect(() => {
    console.log("Favorite subjects updated:", favorites);
  }, [favorites]);

  async function removeFavorite(s: Subject) {
    try {
      await favoriteApi.delete(`/subjects/${s.id}/favorite?userId=${User?.id}`, {
        headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`, // ✅ gửi token trong header
  },
      });
      setFavorites(prev => prev.filter(fav => fav.id !== s.id));
    }
    catch (e) {
      console.error("Failed to remove favorite:", e);
    }
  }



  return (
    <div className="relative z-9 min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
        <OrbitingSkills/>
        {/* Soft blobs */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl dark:bg-emerald-400/10" />
        <div className="pointer-events-none absolute -right-16 top-10 h-64 w-64 rounded-full bg-white/10 blur-2xl dark:bg-purple-400/10" />

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 py-14 md:flex-row md:justify-between">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 160, damping: 18 }}>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/20 backdrop-blur">
              <Star className="h-4 w-4" /> Bảng điều khiển
            </div>
            <TypewriterText text={`Xin chào${User?.name ? `, ${User.name}` : "!"} 👋`}  className="text-[2rem] md:text-[2.4rem] font-black leading-tight text-white"/>
              
          
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
      <section className="relative z-9 mx-auto max-w-7xl px-6 mt-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={<Heart className="h-4 w-4" />} label="Yêu thích" value={favorites.length} hint="bộ câu hỏi" />
          <StatCard icon={<ListChecks className="h-4 w-4" />} label="Của tôi" value={1} hint="bộ câu hỏi" />
          <StatCard icon={<BookOpen className="h-4 w-4" />} label="Tổng số câu" value={1} hint="ước tính" />
          <StatCard icon={<Clock className="h-4 w-4" />} label="Hoạt động" value={new Date().toLocaleDateString()} hint="ngày cập nhật" />
        </div>
      </section>

      {/* ===== CONTENT ===== */}
      <main className="relative mx-auto max-w-7xl px-6 py-10">
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
                <span className="text-xs text-slate-500 dark:text-slate-400">{favorites.length} mục</span>
              </header>
              {favorites.length === 0 ? (
                <EmptyBox
                  title="Chưa có bộ câu hỏi yêu thích"
                  desc="Hãy đánh dấu ♥ ở danh sách đề hoặc câu hỏi để lưu tại đây."
                  action={<Link to="/subjects" className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-3 py-1.5 text-sm text-white hover:brightness-110"><BookOpen className="h-4 w-4" /> Duyệt môn</Link>}
                />
              ) : (
                <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                  {favorites.map((s) => (
                    <li key={s.id} className="py-3">
                      <SetRow s={s}
                        onRemove={() => removeFavorite(s)}
                        primaryAction={{ to: s.id ? `/questions/subject/${s.id}` : `#`, label: "Làm ngay" }}
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
              {/* {mySets.length === 0 ? (
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
              )} */}
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
  s: Subject;
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
          {s.name && (
            <span className="inline-flex items-center gap-1 rounded-md bg-emerald-100 px-2 py-0.5 text-[11px] font-medium text-emerald-800 ring-1 ring-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-100 dark:ring-emerald-800">
              <Tag className="h-3 w-3" /> {s.code}
            </span>
          )}
        </div>
        {/* <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{s.} câu hỏi</div> */}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {primaryAction && (
            <Link to={s.id ? `/questions/subject/${s.id}` : `#`} className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-3 py-1.5 text-xs text-white hover:brightness-110">
              {primaryAction.label} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}

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
