// src/pages/subjects/CreateSubjectPage.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  MdBrush as PenTool,
  MdAutoAwesome as Sparkles,
  MdAutoStories as BookOpen,
  MdCheckCircleOutline as CheckCircle2,
  MdErrorOutline as AlertCircle,
  MdCreateNewFolder as FolderPlus,
  MdShare as Share2,
  MdSettings as Settings,
  MdNumbers as Hash,
  MdTitle as Type,
  MdFormatAlignLeft as AlignLeft
} from 'react-icons/md';
import Floating from "@/shared/ui/Floatting";
import FadeInOnView from "@/shared/ui/FadeInOnView";
import { useAuth } from "@/app/providers/AuthProvider";
import { toast } from "react-hot-toast";
import { createSubject } from "@/shared/api/subjectApi";

export default function CreateSubjectPage() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [subjectCode, setSubjectCode] = useState("");
    const [subjectName, setSubjectName] = useState("");
    const [subjectDescription, setSubjectDescription] = useState("");

    // Xử lý tạo môn học mới
    const handleCreateSubject = async () => {
        if (!subjectCode.trim()) {
            toast.error("Vui lòng nhập mã môn học");
            return;
        }
        if (!subjectName.trim()) {
            toast.error("Vui lòng nhập tên môn học");
            return;
        }

        const toastId = toast.loading("Đang tạo môn học mới...");
        try {
            setLoading(true);
            await createSubject({
                code: subjectCode.trim(),
                name: subjectName.trim(),
                description: subjectDescription.trim()
            });

            toast.success("Tạo môn học thành công!", { id: toastId });
            navigate("/subjects");
        } catch (error: any) {
            console.error(error);
            const errorMessage = error?.response?.data?.message || "Đã xảy ra lỗi khi tạo môn học. Vui lòng thử lại!";
            toast.error(errorMessage, { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-subject-page bg-slate-50 dark:bg-slate-800 min-h-screen">
            {/* ====== HEADER ====== */}
            <section className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                {/* Blur blobs */}
                <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-white/10 blur-2xl dark:bg-emerald-400/10" />
                <div className="pointer-events-none absolute -right-16 top-10 h-64 w-64 rounded-full bg-white/10 blur-2xl dark:bg-purple-400/10" />

                <div className="relative z-10 mx-auto max-w-7xl px-6 py-12">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="text-white">
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ type: "spring", stiffness: 160, damping: 18 }}
                                className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/20 backdrop-blur dark:bg-white/5 dark:ring-white/10"
                            >
                                <FolderPlus className="h-4 w-4 text-white dark:text-emerald-300" />
                                <span className="text-white dark:text-gray-200">Quản lý môn học • Hệ thống Quiz Universe</span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.05 }}
                                className="text-3xl md:text-4xl font-black leading-tight text-white dark:text-gray-100"
                            >
                                Thêm môn học mới
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="mt-4 text-white/90 dark:text-gray-300 max-w-2xl"
                            >
                                Tạo môn học mới để bắt đầu xây dựng ngân hàng câu hỏi. 
                                Môn học giúp phân loại và quản lý các bộ câu hỏi của bạn một cách khoa học hơn.
                            </motion.p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="hidden lg:block"
                        >
                            <div className="relative">
                                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-emerald-400/20 to-teal-400/20 blur-xl" />
                                <div className="relative rounded-2xl bg-white/10 dark:bg-white/5 p-8 backdrop-blur-xl border border-white/20">
                                    <div className="flex items-center gap-6">
                                        <div className="text-center">
                                            <div className="inline-flex p-3 rounded-full bg-emerald-500/20 dark:bg-emerald-400/20">
                                                <BookOpen className="h-10 w-10 text-emerald-300 dark:text-emerald-200" />
                                            </div>
                                            <div className="mt-3 text-xl font-bold text-white">Môn học</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Floating elements */}
                    <Floating distance={12} duration={7} className="pointer-events-none absolute top-6 left-8">
                        <div className="rounded-xl bg-gradient-to-br from-amber-300 to-rose-300 dark:from-amber-400 dark:to-rose-400 p-2 shadow-lg -rotate-6">
                            <span className="text-xs font-black text-rose-700 dark:text-rose-800">NEW!</span>
                        </div>
                    </Floating>

                    <Floating distance={10} duration={6} className="pointer-events-none absolute top-12 right-8">
                        <div className="rounded-full bg-gradient-to-br from-purple-400 to-indigo-400 dark:from-purple-500 dark:to-indigo-500 p-3 shadow-xl rotate-12">
                            <Sparkles className="h-4 w-4 text-white" />
                        </div>
                    </Floating>
                </div>
            </section>

            {/* ====== MAIN CONTENT ====== */}
            <div className="mx-auto max-w-6xl px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Right content - Creation Form */}
                    <div className="lg:col-span-2">
                        <FadeInOnView amount={0.1}>
                            <div className="rounded-2xl bg-white dark:bg-slate-900 shadow-xl border border-emerald-100 dark:border-slate-700 overflow-hidden">
                                <div className="p-8">
                                    <h3 className="mb-6 text-xl font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-2">
                                        <PenTool className="h-6 w-6" />
                                        Thông tin môn học
                                    </h3>
                                    
                                    <div className="space-y-6">
                                        {/* Mã môn học */}
                                        <div>
                                            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                <Hash className="h-4 w-4 text-emerald-500" />
                                                Mã môn học <span className="text-rose-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={subjectCode}
                                                onChange={(e) => setSubjectCode(e.target.value)}
                                                placeholder="Ví dụ: CT101, MATH102..."
                                                className="w-full rounded-xl border border-emerald-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-900 focus:outline-none transition-all"
                                            />
                                            <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400 italic">
                                                Mã môn học giúp sinh viên dễ dàng tìm kiếm chính xác môn học.
                                            </p>
                                        </div>

                                        {/* Tên môn học */}
                                        <div>
                                            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                <Type className="h-4 w-4 text-emerald-500" />
                                                Tên môn học <span className="text-rose-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={subjectName}
                                                onChange={(e) => setSubjectName(e.target.value)}
                                                placeholder="Ví dụ: Cấu trúc dữ liệu và Giải thuật..."
                                                className="w-full rounded-xl border border-emerald-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-900 focus:outline-none transition-all"
                                            />
                                        </div>

                                        {/* Mô tả */}
                                        <div>
                                            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                <AlignLeft className="h-4 w-4 text-emerald-500" />
                                                Mô tả môn học
                                            </label>
                                            <textarea
                                                value={subjectDescription}
                                                onChange={(e) => setSubjectDescription(e.target.value)}
                                                placeholder="Mô tả tóm tắt về nội dung môn học, đề cương..."
                                                rows={4}
                                                className="w-full rounded-xl border border-emerald-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-900 focus:outline-none transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-4 pt-8 mt-4 border-t border-emerald-100 dark:border-slate-700">
                                        <button
                                            onClick={handleCreateSubject}
                                            disabled={loading}
                                            className="flex-1 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 dark:from-emerald-600 dark:to-green-600 px-6 py-4 font-bold text-white shadow-lg hover:from-emerald-600 hover:to-green-600 dark:hover:from-emerald-700 dark:hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {loading ? "Đang xử lý..." : "Xác nhận tạo môn học"}
                                        </button>

                                        <Link
                                            to="/subjects"
                                            className="rounded-xl border-2 border-emerald-200 dark:border-slate-600 px-6 py-4 font-medium text-emerald-700 dark:text-emerald-300 text-center hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all"
                                        >
                                            Hủy bỏ
                                        </Link>
                                    </div>

                                    {/* Note */}
                                    <div className="mt-8 rounded-xl bg-amber-50 dark:bg-amber-900/20 p-5 border border-amber-200 dark:border-amber-700/30">
                                        <div className="flex items-start gap-3">
                                            <AlertCircle className="h-6 w-6 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                                            <div className="text-sm text-amber-700 dark:text-amber-300">
                                                <p className="font-bold">Lưu ý quan trọng:</p>
                                                <p className="mt-1 leading-relaxed">
                                                    Môn học mới sau khi tạo sẽ được hiển thị trên danh sách công khai. 
                                                    Hãy đảm bảo mã môn học và tên môn học chính xác để sinh viên khác có thể tìm thấy dữ liệu liên quan.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeInOnView>
                    </div>

                    {/* Left sidebar - Info */}
                    <div className="lg:col-span-1">
                        <FadeInOnView amount={0.2}>
                            <div className="sticky top-8 space-y-6">
                                {/* Subject Guidelines */}
                                <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-lg border border-emerald-100 dark:border-slate-700">
                                    <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-emerald-900 dark:text-emerald-300">
                                        <BookOpen className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                        Tiêu chuẩn môn học
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">
                                                1
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-700 dark:text-gray-300">Mã môn học chuẩn</div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">Nên dùng mã viết hoa không dấu (Ví dụ: IT101)</div>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">
                                                2
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-700 dark:text-gray-300">Tên môn học đầy đủ</div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">Tránh viết tắt gây hiểu lầm</div>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">
                                                3
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-700 dark:text-gray-300">Mô tả rõ ràng</div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">Giúp người dùng biết môn học thuộc ngành nào</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Why Create? */}
                                <div className="rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-400/10 dark:from-emerald-900/30 dark:to-teal-900/30 p-6 border border-emerald-200/50 dark:border-emerald-700/30">
                                    <h3 className="mb-4 text-lg font-bold text-emerald-900 dark:text-emerald-300">
                                        Lợi ích của môn học
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-lg bg-white dark:bg-slate-800 p-2 shadow-sm">
                                                <Share2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                            </div>
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Hệ thống hóa ngân hàng câu hỏi</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-lg bg-white dark:bg-slate-800 p-2 shadow-sm">
                                                <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                            </div>
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Tăng khả năng được cộng đồng tìm thấy</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-lg bg-white dark:bg-slate-800 p-2 shadow-sm">
                                                <Settings className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                            </div>
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Dễ dàng quản lý & cập nhật nội dung</span>
                                        </div>
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