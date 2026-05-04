// src/pages/subjects/EditSubjectPage.tsx
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
import { toast } from "react-hot-toast";
import { fetchAllSubjects, updateSubject } from "@/shared/api/subjectApi";
import type { Subject } from "@/shared/types/subject";

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
    <div className="edit-subject-page bg-slate-50 dark:bg-slate-800 min-h-screen">
      {/* ====== HEADER ====== */}
      <section className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-white/10 blur-2xl dark:bg-indigo-400/10" />
        <div className="pointer-events-none absolute -right-16 top-10 h-64 w-64 rounded-full bg-white/10 blur-2xl dark:bg-purple-400/10" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-white">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 160, damping: 18 }}
                className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/20 backdrop-blur"
              >
                <Edit3 className="h-4 w-4" />
                <span>Chỉnh sửa môn học • Quiz Universe</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="text-3xl md:text-4xl font-black leading-tight"
              >
                Sửa môn học:{" "}
                <span className="text-indigo-200">{subject.name}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-4 text-white/80 max-w-2xl"
              >
                Cập nhật thông tin mã, tên và mô tả môn học. Thay đổi sẽ có
                hiệu lực ngay sau khi lưu.
              </motion.p>

              {/* Meta info */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mt-4 flex flex-wrap gap-3"
              >
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium ring-1 ring-white/20">
                  <Hash className="h-3.5 w-3.5" />
                  ID: {subject.subjectId}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium ring-1 ring-white/20">
                  <Calendar className="h-3.5 w-3.5" />
                  Tạo:{" "}
                  {new Date(subject.createdAt).toLocaleDateString("vi-VN")}
                </span>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-indigo-400/20 to-purple-400/20 blur-xl" />
                <div className="relative rounded-2xl bg-white/10 p-8 backdrop-blur-xl border border-white/20">
                  <div className="flex items-center gap-4">
                    <div className="inline-flex p-3 rounded-full bg-indigo-500/20">
                      <Edit3 className="h-10 w-10 text-indigo-200" />
                    </div>
                    <div className="text-white">
                      <div className="text-xl font-bold">Chỉnh sửa</div>
                      <div className="text-sm text-white/60">
                        Cập nhật thông tin
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Floating decorations */}
          <Floating
            distance={12}
            duration={7}
            className="pointer-events-none absolute top-6 left-8"
          >
            <div className="rounded-xl bg-gradient-to-br from-indigo-300 to-purple-300 p-2 shadow-lg -rotate-6">
              <span className="text-xs font-black text-indigo-700">EDIT</span>
            </div>
          </Floating>
          <Floating
            distance={10}
            duration={6}
            className="pointer-events-none absolute top-12 right-8"
          >
            <div className="rounded-full bg-gradient-to-br from-purple-400 to-pink-400 p-3 shadow-xl rotate-12">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
          </Floating>
        </div>
      </section>

      {/* ====== MAIN CONTENT ====== */}
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Form ── */}
          <div className="lg:col-span-2">
            <FadeInOnView amount={0.1}>
              <div className="rounded-2xl bg-white dark:bg-slate-900 shadow-xl border border-indigo-100 dark:border-slate-700 overflow-hidden">
                <div className="p-8">
                  <h3 className="mb-6 text-xl font-bold text-indigo-900 dark:text-indigo-300 flex items-center gap-2">
                    <PenTool className="h-6 w-6" />
                    Thông tin môn học
                    {isDirty && (
                      <span className="ml-auto text-xs font-normal text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-2 py-0.5 rounded-full ring-1 ring-amber-200 dark:ring-amber-700">
                        Có thay đổi chưa lưu
                      </span>
                    )}
                  </h3>

                  <div className="space-y-6">
                    {/* Mã môn học */}
                    <div>
                      <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                        <Hash className="h-4 w-4 text-indigo-500" />
                        Mã môn học <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="subject-code"
                        type="text"
                        value={subjectCode}
                        onChange={(e) => setSubjectCode(e.target.value)}
                        placeholder="Ví dụ: CT101, MATH102..."
                        className="w-full rounded-xl border border-indigo-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-slate-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 focus:outline-none transition-all"
                      />
                      <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400 italic">
                        Mã môn học thường là dãy ký tự viết hoa không dấu.
                      </p>
                    </div>

                    {/* Tên môn học */}
                    <div>
                      <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                        <Type className="h-4 w-4 text-indigo-500" />
                        Tên môn học <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="subject-name"
                        type="text"
                        value={subjectName}
                        onChange={(e) => setSubjectName(e.target.value)}
                        placeholder="Ví dụ: Cấu trúc dữ liệu và Giải thuật..."
                        className="w-full rounded-xl border border-indigo-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-slate-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 focus:outline-none transition-all"
                      />
                    </div>

                    {/* Mô tả */}
                    <div>
                      <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                        <AlignLeft className="h-4 w-4 text-indigo-500" />
                        Mô tả môn học
                      </label>
                      <textarea
                        id="subject-description"
                        value={subjectDescription}
                        onChange={(e) => setSubjectDescription(e.target.value)}
                        placeholder="Mô tả tóm tắt về nội dung môn học, đề cương..."
                        rows={4}
                        className="w-full rounded-xl border border-indigo-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-slate-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 focus:outline-none transition-all resize-none"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-8 mt-4 border-t border-indigo-100 dark:border-slate-700">
                    <button
                      onClick={handleSave}
                      disabled={saving || !isDirty}
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-4 font-bold text-white shadow-lg hover:from-indigo-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {saving ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Đang lưu...
                        </>
                      ) : (
                        <>
                          <Save className="h-5 w-5" />
                          Lưu thay đổi
                        </>
                      )}
                    </button>

                    <Link
                      to={`/subjects/${subject.subjectId}`}
                      className="rounded-xl border-2 border-indigo-200 dark:border-slate-600 px-6 py-4 font-medium text-indigo-700 dark:text-indigo-300 text-center hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all"
                    >
                      Hủy bỏ
                    </Link>
                  </div>

                  {/* Warning note */}
                  <div className="mt-6 rounded-xl bg-amber-50 dark:bg-amber-900/20 p-5 border border-amber-200 dark:border-amber-700/30">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-amber-700 dark:text-amber-300">
                        <p className="font-bold">Lưu ý:</p>
                        <p className="mt-1 leading-relaxed">
                          Thay đổi tên và mã môn học sẽ ảnh hưởng đến toàn bộ
                          ngân hàng câu hỏi liên kết. Hãy kiểm tra kỹ trước khi
                          lưu.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInOnView>
          </div>

          {/* ── Sidebar ── */}
          <div className="lg:col-span-1">
            <FadeInOnView amount={0.2}>
              <div className="sticky top-8 space-y-6">
                {/* Current values */}
                <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-lg border border-indigo-100 dark:border-slate-700">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-indigo-900 dark:text-indigo-300">
                    <BookOpen className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    Giá trị hiện tại
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Mã môn
                      </span>
                      <p className="mt-0.5 font-mono font-bold text-slate-800 dark:text-slate-200">
                        {subject.code}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Tên môn
                      </span>
                      <p className="mt-0.5 font-medium text-slate-800 dark:text-slate-200">
                        {subject.name}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Mô tả
                      </span>
                      <p className="mt-0.5 text-slate-600 dark:text-slate-400">
                        {subject.description || (
                          <em className="text-slate-400">Chưa có mô tả</em>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Guidelines */}
                <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-lg border border-indigo-100 dark:border-slate-700">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-indigo-900 dark:text-indigo-300">
                    <Rocket className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    Tiêu chuẩn môn học
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        num: 1,
                        title: "Mã môn học chuẩn",
                        desc: "Nên dùng mã viết hoa không dấu (Ví dụ: IT101)",
                      },
                      {
                        num: 2,
                        title: "Tên môn học đầy đủ",
                        desc: "Tránh viết tắt gây hiểu lầm",
                      },
                      {
                        num: 3,
                        title: "Mô tả rõ ràng",
                        desc: "Giúp người dùng biết môn học thuộc ngành nào",
                      },
                    ].map((item) => (
                      <div key={item.num} className="flex items-start gap-3">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-xs font-bold text-white">
                          {item.num}
                        </div>
                        <div>
                          <div className="font-medium text-gray-700 dark:text-gray-300">
                            {item.title}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {item.desc}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div className="rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-400/10 dark:from-indigo-900/30 dark:to-purple-900/30 p-6 border border-indigo-200/50 dark:border-indigo-700/30">
                  <h3 className="mb-4 text-lg font-bold text-indigo-900 dark:text-indigo-300">
                    Lợi ích
                  </h3>
                  <div className="space-y-3">
                    {[
                      { icon: Share2, label: "Hệ thống hóa ngân hàng câu hỏi" },
                      {
                        icon: CheckCircle2,
                        label: "Tăng khả năng được cộng đồng tìm thấy",
                      },
                      {
                        icon: Settings,
                        label: "Dễ dàng quản lý & cập nhật nội dung",
                      },
                    ].map(({ icon: Icon, label }) => (
                      <div key={label} className="flex items-center gap-3">
                        <div className="rounded-lg bg-white dark:bg-slate-800 p-2 shadow-sm">
                          <Icon className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {label}
                        </span>
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
