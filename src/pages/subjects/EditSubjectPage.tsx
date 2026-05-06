import { toast } from "react-hot-toast";
import { fetchAllSubjects, updateSubject } from "@/shared/api/subjectApi";
import type { Subject } from "@/shared/types/subject";
import AnimatedGradientBackground from "@/shared/ui/AnimatedGradientBackground";
import GradientText from "@/shared/ui/GradientText";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  MdBrush as PenTool,
  MdAutoAwesome as Sparkles,
  MdAutoStories as BookOpen,
  MdCheckCircleOutline as CheckCircle2,
  MdErrorOutline as AlertCircle,
  MdEditNote as Edit3,
  MdShare as Share2,
  MdSettings as Settings,
  MdNumbers as Hash,
  MdTitle as Type,
  MdFormatAlignLeft as AlignLeft,
  MdArrowBack as ArrowLeft,
  MdLoop as Loader2,
  MdCalendarToday as Calendar,
  MdSave as Save,
  MdFace as Ghost,
  MdRocketLaunch as Rocket
} from 'react-icons/md';
import Floating from "@/shared/ui/Floatting";
import FadeInOnView from "@/shared/ui/FadeInOnView";

export default function EditSubjectPage() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();

  const [subject, setSubject] = useState<Subject | null>(null);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Form state
  const [subjectCode, setSubjectCode] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [subjectDescription, setSubjectDescription] = useState("");

  // Track dirty state
  const isDirty =
    subject !== null &&
    (subjectCode !== subject.code ||
      subjectName !== subject.name ||
      (subjectDescription || "") !== (subject.description || ""));

  /* ── Fetch subject data ── */
  useEffect(() => {
    if (!subjectId) return;
    const id = Number(subjectId);

    setFetchLoading(true);
    setFetchError(null);

    fetchAllSubjects()
      .then((all) => {
        const found = all.find((s) => s.subjectId === id);
        if (!found) throw new Error("Môn học không tồn tại");
        setSubject(found);
        setSubjectCode(found.code);
        setSubjectName(found.name);
        setSubjectDescription(found.description ?? "");
      })
      .catch((e) => {
        setFetchError(e?.message || "Không thể tải thông tin môn học.");
      })
      .finally(() => setFetchLoading(false));
  }, [subjectId]);

  /* ── Submit handler ── */
  const handleSave = async () => {
    if (!subjectCode.trim()) {
      toast.error("Vui lòng nhập mã môn học");
      return;
    }
    if (!subjectName.trim()) {
      toast.error("Vui lòng nhập tên môn học");
      return;
    }

    const toastId = toast.loading("Đang lưu thay đổi...");
    try {
      setSaving(true);
      const updated = await updateSubject(Number(subjectId), {
        code: subjectCode.trim(),
        name: subjectName.trim(),
        description: subjectDescription.trim(),
      });
      toast.success("Cập nhật môn học thành công!", { id: toastId });
      navigate(`/subjects/${updated.subjectId}`);
    } catch (error: any) {
      const msg =
        error?.response?.data?.message ||
        "Đã xảy ra lỗi khi cập nhật. Vui lòng thử lại!";
      toast.error(msg, { id: toastId });
    } finally {
      setSaving(false);
    }
  };

  /* ── Loading skeleton ── */
  if (fetchLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
            className="rounded-full bg-gradient-to-tr from-emerald-400 to-teal-500 p-4 shadow-lg"
          >
            <Loader2 className="h-8 w-8 text-white" />
          </motion.div>
          <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
            Đang tải thông tin môn học...
          </p>
        </div>
      </div>
    );
  }

  /* ── Error / not found state ── */
  if (fetchError || !subject) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-[#030712] transition-colors duration-500">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-rose-400/30 dark:bg-rose-500/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-70 dark:opacity-20 animate-blob" />
        <div className="absolute top-0 -right-4 w-96 h-96 bg-purple-400/30 dark:bg-purple-500/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-70 dark:opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-orange-400/30 dark:bg-orange-500/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-70 dark:opacity-20 animate-blob animation-delay-4000" />

        <div className="relative z-10 max-w-2xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative inline-block mb-10"
          >
            <div className="absolute inset-0 bg-rose-500 blur-3xl opacity-20 dark:opacity-30 animate-pulse" />
            <div className="relative bg-white/40 dark:bg-slate-900/50 backdrop-blur-2xl border border-slate-200/50 dark:border-white/10 p-8 rounded-[2.5rem] shadow-2xl">
              <Ghost className="w-16 h-16 text-rose-600 dark:text-rose-400 animate-bounce" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[80px] font-black leading-none tracking-tighter sm:text-[120px]"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-slate-900 via-slate-700 to-slate-400/50 dark:from-white dark:via-white dark:to-white/20 select-none">
              Lỗi
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6"
          >
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl tracking-tight">
              {fetchError || "Môn học không tồn tại"}
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-lg mx-auto leading-relaxed font-medium">
              Không thể tìm thấy thông tin môn học bạn yêu cầu. Vui lòng kiểm
              tra lại đường dẫn hoặc quay lại danh sách.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <button
              onClick={() => navigate("/subjects")}
              className="group flex items-center gap-3 px-7 py-3.5 rounded-2xl bg-slate-200/50 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-300/50 dark:border-white/10 text-slate-700 dark:text-slate-200 transition-all active:scale-95 font-semibold"
            >
              <ArrowLeft className="w-5 h-5 text-slate-500 dark:text-slate-400 group-hover:-translate-x-1 transition-transform" />
              Quay lại danh sách môn học
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  /* ── Main edit form ── */
  return (
    <div className="edit-subject-page bg-slate-50 dark:bg-slate-950 min-h-screen">
      {/* ====== HEADER ====== */}
      <section className="relative overflow-hidden pt-12 pb-20">
        <AnimatedGradientBackground />

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="text-white text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 160, damping: 18 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold ring-1 ring-white/20 backdrop-blur-md dark:bg-emerald-500/10 dark:ring-emerald-500/20"
              >
                <Sparkles className="h-4 w-4 text-yellow-300" />
                <span className="text-emerald-50 dark:text-emerald-100 uppercase tracking-wider">Chỉnh sửa môn học</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
              >
                <h1 className="text-4xl md:text-5xl font-black leading-tight">
                  <span className="block mb-2 text-white/90">Cập nhật:</span>
                  <GradientText className="text-4xl md:text-5xl font-black mx-auto lg:mx-0">
                    {subject.name}
                  </GradientText>
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-6 text-white/80 dark:text-emerald-50/70 max-w-2xl text-lg"
              >
                Thay đổi thông tin cơ bản của môn học. Các thay đổi sẽ được cập nhật ngay lập tức.
              </motion.p>

              {/* Meta info */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4"
              >
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium ring-1 ring-white/20 backdrop-blur-sm shadow-sm">
                  <Hash className="h-4 w-4 text-emerald-300" />
                  ID: <span className="font-mono text-emerald-200">{subject.subjectId}</span>
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium ring-1 ring-white/20 backdrop-blur-sm shadow-sm">
                  <Calendar className="h-4 w-4 text-emerald-300" />
                  Ngày tạo:{" "}
                  <span className="text-emerald-200">{new Date(subject.createdAt).toLocaleDateString("vi-VN")}</span>
                </span>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="hidden lg:block w-full max-w-sm"
            >
              <div className="relative group">
                <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-r from-emerald-400 to-teal-400 opacity-30 blur-2xl group-hover:opacity-50 transition-opacity duration-500" />
                <div className="relative rounded-[2rem] bg-white/10 p-10 backdrop-blur-2xl border border-white/20 shadow-2xl overflow-hidden">
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                  <div className="relative z-10 flex flex-col items-center text-center gap-6">
                    <div className="inline-flex p-5 rounded-2xl bg-emerald-500/20 ring-1 ring-emerald-500/40 shadow-inner">
                      <Edit3 className="h-12 w-12 text-emerald-300" />
                    </div>
                    <div className="text-white">
                      <div className="text-2xl font-black mb-1 tracking-tight">Cập nhật nhanh</div>
                      <div className="text-sm text-emerald-100/60 font-medium">
                        Giữ cho thông tin môn học luôn chính xác và đầy đủ.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Floating decorations */}
          <Floating distance={12} duration={6} className="pointer-events-none absolute bottom-12 right-12">
            <div className="rounded-full bg-gradient-to-br from-yellow-300 to-amber-400 p-4 shadow-2xl rotate-12 ring-4 ring-white/20 backdrop-blur-sm">
              <Sparkles className="h-6 w-6 text-amber-900" />
            </div>
          </Floating>
        </div>
      </section>

      {/* ====== MAIN CONTENT ====== */}
      <div className="mx-auto max-w-7xl px-6 -mt-10 relative z-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* ── Form ── */}
          <div className="lg:col-span-8">
            <FadeInOnView amount={0.1}>
              <div className="group relative rounded-3xl bg-white dark:bg-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-emerald-100/50 dark:border-emerald-900/30 overflow-hidden">
                {/* Accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400" />

                <div className="p-8 md:p-10">
                  <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                    <h3 className="text-2xl font-black text-slate-800 dark:text-emerald-50 flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400">
                        <PenTool className="h-6 w-6" />
                      </div>
                      Thông tin môn học
                    </h3>

                    {isDirty && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 dark:bg-amber-900/30 px-4 py-1.5 text-xs font-bold text-amber-700 dark:text-amber-400 ring-1 ring-amber-200 dark:ring-amber-800 shadow-sm"
                      >
                        <AlertCircle className="h-3.5 w-3.5" />
                        Có thay đổi chưa lưu
                      </motion.span>
                    )}
                  </div>

                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Mã môn học */}
                      <div className="space-y-3">
                        <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-emerald-100/80">
                          <Hash className="h-4 w-4 text-emerald-500" />
                          Mã môn học <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative group/input">
                          <input
                            id="subject-code"
                            type="text"
                            value={subjectCode}
                            onChange={(e) => setSubjectCode(e.target.value)}
                            placeholder="Ví dụ: CT101, MATH102..."
                            className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 px-5 py-4 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10 focus:outline-none transition-all duration-300 font-bold"
                          />
                        </div>
                        <p className="text-xs text-slate-500 dark:text-emerald-50/40 font-medium italic">
                          Nhập mã số chính thức của môn học.
                        </p>
                      </div>

                      {/* Tên môn học */}
                      <div className="space-y-3">
                        <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-emerald-100/80">
                          <Type className="h-4 w-4 text-emerald-500" />
                          Tên môn học <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative group/input">
                          <input
                            id="subject-name"
                            type="text"
                            value={subjectName}
                            onChange={(e) => setSubjectName(e.target.value)}
                            placeholder="Ví dụ: Giải thuật..."
                            className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 px-5 py-4 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10 focus:outline-none transition-all duration-300 font-bold"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Mô tả */}
                    <div className="space-y-3">
                      <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-emerald-100/80">
                        <AlignLeft className="h-4 w-4 text-emerald-500" />
                        Mô tả môn học
                      </label>
                      <textarea
                        id="subject-description"
                        value={subjectDescription}
                        onChange={(e) => setSubjectDescription(e.target.value)}
                        placeholder="Mô tả tóm tắt về nội dung môn học..."
                        rows={5}
                        className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 px-5 py-4 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10 focus:outline-none transition-all duration-300 resize-none leading-relaxed"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-5 pt-10 mt-10 border-t border-slate-100 dark:border-slate-800">
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSave}
                      disabled={saving || !isDirty}
                      className="flex-1 group relative overflow-hidden inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-4 font-black text-white shadow-xl hover:shadow-emerald-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {/* Shine effect */}
                      <div className=" absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                      {saving ? (
                        <>
                          <Loader2 className="h-6 w-6 animate-spin" />
                          Đang lưu...
                        </>
                      ) : (
                        <>
                          <Save className="h-6 w-6" />
                          Lưu thay đổi
                        </>
                      )}
                    </motion.button>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1 sm:flex-none">
                      <Link
                        to={`/subjects/${subject.subjectId}`}
                        className="block w-full rounded-2xl border-2 border-slate-200 dark:border-slate-800 px-8 py-4 font-bold text-slate-600 dark:text-emerald-100/60 text-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                      >
                        Hủy bỏ
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </FadeInOnView>
          </div>

          {/* ── Sidebar ── */}
          <div className="lg:col-span-4 space-y-8">
            <FadeInOnView amount={0.2} delay={0.1}>
              <div className="space-y-8 sticky top-8">
                {/* Stats / Info */}
                <div className="rounded-3xl bg-white dark:bg-slate-900 p-8 shadow-xl border border-emerald-100/50 dark:border-emerald-900/30">
                  <h3 className="mb-6 flex items-center gap-3 text-xl font-black text-slate-800 dark:text-emerald-50">
                    <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    Thông tin hiện tại
                  </h3>
                  <div className="space-y-6">
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-emerald-500/50 block mb-2">Mã môn</span>
                      <p className="font-mono text-lg font-black text-emerald-600 dark:text-emerald-400">
                        {subject.code}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-emerald-500/50 block mb-2">Tên môn</span>
                      <p className="font-bold text-slate-800 dark:text-emerald-100">
                        {subject.name}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Guidelines */}
                <div className="rounded-3xl bg-emerald-900 dark:bg-emerald-900/20 p-8 shadow-2xl text-white">
                  <h3 className="mb-6 flex items-center gap-3 text-xl font-black">
                    <Rocket className="h-6 w-6 text-yellow-400" />
                    Lưu ý về việc chỉnh sửa
                  </h3>
                  <div className="space-y-5">
                    {[
                      {
                        num: "01",
                        title: "Mã môn",
                        desc: "Mã môn học không được trùng.",
                        color: "bg-emerald-400/20"
                      },
                      {
                        num: "02",
                        title: "Tên môn",
                        desc: "Nhập tên đầy đủ của môn học.",
                        color: "bg-teal-400/20"
                      },
                      {
                        num: "03",
                        title: "Mô tả",
                        desc: "Tóm tắt nội dung môn học.",
                        color: "bg-cyan-400/20"
                      },
                    ].map((item) => (
                      <div key={item.num} className="flex items-start gap-4 group">
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.color} text-sm font-black ring-1 ring-white/10 group-hover:scale-110 transition-transform`}>
                          {item.num}
                        </div>
                        <div className="pt-1">
                          <div className="font-bold text-white mb-0.5 group-hover:text-emerald-300 transition-colors">
                            {item.title}
                          </div>
                          <div className="text-xs text-emerald-100/60 leading-relaxed font-medium">
                            {item.desc}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeInOnView>
          </div>
        </div>
      </div>
    </div>
  );
}
