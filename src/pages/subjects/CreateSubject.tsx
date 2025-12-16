// src/pages/subjects/CreateSubject.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
    Upload,
    FileText,
    PenTool,
    Sparkles,
    Zap,
    Clock,
    Users,
    ShieldCheck,
    ArrowRight,
    BookOpen,
    FileUp,
    Wand2,
    X,
    CheckCircle2,
    AlertCircle,
    FolderPlus,
    Eye,
    Share2,
    Download,
    Settings
} from "lucide-react";
import GradientText from "@/shared/ui/GradientText";
import Floating from "@/shared/ui/Floatting";
import FadeInOnView from "@/shared/ui/FadeInOnView";
import { useAuth } from "@/app/providers/AuthProvider";
import { toast } from "sonner";

export default function CreateSubjectPage() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState<"ai" | "manual">("ai");
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [subjectName, setSubjectName] = useState("");
    const [subjectDescription, setSubjectDescription] = useState("");
    const [visibility, setVisibility] = useState<"public" | "private">("public");
    const [tags, setTags] = useState<string[]>([]);
    const [newTag, setNewTag] = useState("");
    const [aiConfig, setAiConfig] = useState({
        documentType: "textbook",
        difficulty: "medium",
        questionCount: 20,
        questionTypes: ["multiple-choice", "true-false"],
        includeAnswers: true
    });




    // Xử lý upload file
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Kiểm tra định dạng
        const allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "text/plain",
            "application/vnd.ms-powerpoint",
            "application/vnd.openxmlformats-officedocument.presentationml.presentation"
        ];

        if (!allowedTypes.includes(file.type)) {
            toast.error("Chỉ chấp nhận file PDF, Word, PowerPoint hoặc text");
            return;
        }

        // Giới hạn kích thước 50MB
        if (file.size > 50 * 1024 * 1024) {
            toast.error("File quá lớn. Kích thước tối đa là 50MB");
            return;
        }

        setUploadedFile(file);

        // Mô phỏng upload progress
        setIsUploading(true);
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            setUploadProgress(progress);
            if (progress >= 100) {
                clearInterval(interval);
                setIsUploading(false);
                toast.success("Tải lên thành công! Đang phân tích tài liệu...");
            }
        }, 100);
    };

    // Xử lý thêm tag
    const handleAddTag = () => {
        if (newTag.trim() && tags.length < 10) {
            setTags([...tags, newTag.trim()]);
            setNewTag("");
        }
    };

    // Xử lý xóa tag
    const handleRemoveTag = (index: number) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    // Xử lý tạo bộ câu hỏi
    const handleCreateSubject = async () => {
        if (!subjectName.trim()) {
            toast.error("Vui lòng nhập tên bộ câu hỏi");
            return;
        }

        if (activeTab === "ai" && !uploadedFile) {
            toast.error("Vui lòng tải lên tài liệu để AI phân tích");
            return;
        }

        try {
            // Giả lập tạo bộ câu hỏi
            toast.loading("Đang tạo bộ câu hỏi...");

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            toast.success("Tạo bộ câu hỏi thành công!");
            navigate("/subjects");
        } catch (error) {
            toast.error("Đã xảy ra lỗi. Vui lòng thử lại!");
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
                                <span className="text-white dark:text-gray-200">Tạo bộ câu hỏi mới • Chia sẻ với cộng đồng</span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.05 }}
                                className="text-3xl md:text-4xl font-black leading-tight text-white dark:text-gray-100"
                            >
                                Tạo bộ câu hỏi của riêng bạn

                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="mt-4 text-white/90 dark:text-gray-300 max-w-2xl"
                            >
                                Tạo bộ câu hỏi từ tài liệu của bạn với AI hoặc thiết kế thủ công.
                                Chia sẻ với cộng đồng hoặc giữ riêng tư cho nhóm của bạn.
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
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="text-center">
                                            <div className="inline-flex p-3 rounded-full bg-emerald-500/20 dark:bg-emerald-400/20">
                                                <Zap className="h-8 w-8 text-emerald-300 dark:text-emerald-200" />
                                            </div>
                                            <div className="mt-3 text-2xl font-bold text-white">AI xử lý</div>
                                            <div className="text-sm text-white/80">Tự động từ tài liệu</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="inline-flex p-3 rounded-full bg-blue-500/20 dark:bg-blue-400/20">
                                                <PenTool className="h-8 w-8 text-blue-300 dark:text-blue-200" />
                                            </div>
                                            <div className="mt-3 text-2xl font-bold text-white">Thủ công</div>
                                            <div className="text-sm text-white/80">Tùy chỉnh chi tiết</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Floating elements */}
                    <Floating distance={12} duration={7} className="pointer-events-none absolute top-6 left-8">
                        <div className="rounded-xl bg-gradient-to-br from-amber-300 to-rose-300 dark:from-amber-400 dark:to-rose-400 p-2 shadow-lg -rotate-6">
                            <span className="text-xs font-black text-rose-700 dark:text-rose-800">AI!</span>
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
                    {/* Left sidebar - Steps & Info */}
                    <div className="lg:col-span-1">
                        <FadeInOnView amount={0.2}>
                            <div className="sticky top-8 space-y-6">
                                {/* Creation Steps */}
                                <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-lg border border-emerald-100 dark:border-slate-700">
                                    <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-emerald-900 dark:text-emerald-300">
                                        <BookOpen className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                        Các bước tạo bộ câu hỏi
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">
                                                1
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-700 dark:text-gray-300">Chọn phương thức</div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">AI tự động hoặc thủ công</div>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">
                                                2
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-700 dark:text-gray-300">Nhập thông tin</div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">Tên, mô tả, cấu hình</div>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">
                                                3
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-700 dark:text-gray-300">Xem trước & Xuất bản</div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">Kiểm tra và chia sẻ</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-400/10 dark:from-emerald-900/30 dark:to-teal-900/30 p-6 border border-emerald-200/50 dark:border-emerald-700/30">
                                    <h3 className="mb-4 text-lg font-bold text-emerald-900 dark:text-emerald-300">
                                        Tại sao tạo bộ câu hỏi?
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <Share2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                            <span className="text-sm text-gray-700 dark:text-gray-300">Chia sẻ với cộng đồng</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Eye className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                            <span className="text-sm text-gray-700 dark:text-gray-300">Được mọi người đánh giá</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Download className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                            <span className="text-sm text-gray-700 dark:text-gray-300">Xuất ra nhiều định dạng</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Settings className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                            <span className="text-sm text-gray-700 dark:text-gray-300">Tùy chỉnh linh hoạt</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Stats */}
                                <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-lg border border-emerald-100 dark:border-slate-700">
                                    <h3 className="mb-4 text-lg font-bold text-emerald-900 dark:text-emerald-300">
                                        Thống kê của bạn
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="rounded-lg bg-emerald-50 dark:bg-emerald-900/20 p-3 text-center">
                                            <div className="text-xl font-bold text-emerald-700 dark:text-emerald-300">0</div>
                                            <div className="text-xs text-emerald-600 dark:text-emerald-400">Bộ câu hỏi</div>
                                        </div>
                                        <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-3 text-center">
                                            <div className="text-xl font-bold text-blue-700 dark:text-blue-300">0</div>
                                            <div className="text-xs text-blue-600 dark:text-blue-400">Lượt tải</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeInOnView>
                    </div>

                    {/* Right content - Creation Form */}
                    <div className="lg:col-span-2">
                        <FadeInOnView amount={0.1}>
                            <div className="rounded-2xl bg-white dark:bg-slate-900 shadow-xl border border-emerald-100 dark:border-slate-700 overflow-hidden">
                                {/* Tab Selection */}
                                <div className="border-b border-emerald-100 dark:border-slate-700">
                                    <div className="grid grid-cols-2">
                                        
                                        <button
                                            onClick={() => setActiveTab("manual")}
                                            className={`flex items-center justify-center gap-2 px-6 py-4 font-semibold transition-all ${activeTab === "manual"
                                                ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-b-2 border-blue-500"
                                                : "text-gray-600 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                                                }`}
                                        >
                                            <PenTool className="h-5 w-5" />
                                            Thủ công
                                            <span className="ml-2 rounded-full bg-blue-100 dark:bg-blue-900 px-2 py-0.5 text-xs font-medium">
                                                Chi tiết
                                            </span>
                                        </button>

                                        <button
                                            onClick={() => setActiveTab("ai")}
                                            className={`flex items-center justify-center gap-2 px-6 py-4 font-semibold transition-all ${activeTab === "ai"
                                                ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-b-2 border-emerald-500"
                                                : "text-gray-600 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                                                }`}
                                        >
                                            <Wand2 className="h-5 w-5" />
                                            AI Tự động
                                            <span className="ml-2 rounded-full bg-emerald-100 dark:bg-emerald-900 px-2 py-0.5 text-xs font-medium">
                                                Nhanh (Sắp ra mắt)
                                            </span>
                                        </button>

                                    </div>
                                </div>

                                {/* Form Content */}
                                <div className="p-6">
                                    {/* Basic Information */}
                                    <div className="mb-8">
                                        <h3 className="mb-4 text-lg font-bold text-emerald-900 dark:text-emerald-300">
                                            Thông tin cơ bản
                                        </h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Tên bộ câu hỏi *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={subjectName}
                                                    onChange={(e) => setSubjectName(e.target.value)}
                                                    placeholder="Ví dụ: Toán cao cấp, Lập trình Python cơ bản..."
                                                    className="w-full rounded-xl border border-emerald-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-900 focus:outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Mô tả
                                                </label>
                                                <textarea
                                                    value={subjectDescription}
                                                    onChange={(e) => setSubjectDescription(e.target.value)}
                                                    placeholder="Mô tả chi tiết về bộ câu hỏi, mục đích sử dụng, đối tượng phù hợp..."
                                                    rows={3}
                                                    className="w-full rounded-xl border border-emerald-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-900 focus:outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Upload Section for AI Tab */}
                                    <AnimatePresence mode="wait">
                                        {activeTab === "ai" && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="mb-8"
                                            >
                                                <h3 className="mb-4 text-lg font-bold text-emerald-900 dark:text-emerald-300">
                                                    Tải lên tài liệu
                                                </h3>

                                                {/* Upload Area */}
                                                <div className={`rounded-2xl border-2 border-dashed ${uploadedFile
                                                    ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/20"
                                                    : "border-emerald-300 dark:border-slate-600 hover:border-emerald-400 dark:hover:border-slate-500"
                                                    } p-8 text-center transition-all`}>
                                                    {!uploadedFile ? (
                                                        <div className="space-y-4">
                                                            <div className="inline-flex rounded-full bg-emerald-100 dark:bg-emerald-900/40 p-4">
                                                                <FileUp className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                                                            </div>
                                                            <div>
                                                                <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                                                                    Kéo thả file hoặc click để chọn
                                                                </p>
                                                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                                    Hỗ trợ PDF, Word, PowerPoint, Text (tối đa 50MB)
                                                                </p>
                                                            </div>
                                                            <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 dark:from-emerald-600 dark:to-green-600 px-6 py-3 font-semibold text-white shadow-lg hover:from-emerald-600 hover:to-green-600 dark:hover:from-emerald-700 dark:hover:to-green-700 transition-all">
                                                                <Upload className="h-5 w-5" />
                                                                Chọn tài liệu
                                                                <input
                                                                    type="file"
                                                                    className="hidden"
                                                                    onChange={handleFileUpload}
                                                                    accept=".pdf,.doc,.docx,.txt,.ppt,.pptx"
                                                                />
                                                            </label>
                                                        </div>
                                                    ) : (
                                                        <div className="space-y-4">
                                                            <div className="flex items-center justify-center gap-3">
                                                                <div className="rounded-full bg-emerald-100 dark:bg-emerald-900/40 p-3">
                                                                    <FileText className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                                                                </div>
                                                                <div className="text-left">
                                                                    <p className="font-medium text-gray-700 dark:text-gray-300">
                                                                        {uploadedFile.name}
                                                                    </p>
                                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                                                                    </p>
                                                                </div>
                                                                <button
                                                                    onClick={() => {
                                                                        setUploadedFile(null);
                                                                        setUploadProgress(0);
                                                                    }}
                                                                    className="ml-auto rounded-full p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700"
                                                                >
                                                                    <X className="h-5 w-5" />
                                                                </button>
                                                            </div>

                                                            {/* Progress Bar */}
                                                            {isUploading && (
                                                                <div className="space-y-2">
                                                                    <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-slate-700">
                                                                        <motion.div
                                                                            className="h-full bg-gradient-to-r from-emerald-500 to-green-500"
                                                                            initial={{ width: "0%" }}
                                                                            animate={{ width: `${uploadProgress}%` }}
                                                                            transition={{ duration: 0.5 }}
                                                                        />
                                                                    </div>
                                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                                        Đang tải lên... {uploadProgress}%
                                                                    </p>
                                                                </div>
                                                            )}

                                                            {!isUploading && (
                                                                <div className="flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400">
                                                                    <CheckCircle2 className="h-5 w-5" />
                                                                    <span>Tải lên thành công! AI đang phân tích...</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* AI Configuration */}
                                                <div className="mt-6 space-y-4 mb-2">
                                                    <h4 className="font-medium text-gray-700 dark:text-gray-300"> Cấu hình AI </h4>
                                                    <label className="mb-2 block text-sm text-gray-600 dark:text-gray-400">
                                                        Loại tài liệu
                                                    </label>

                                                    <select
                                                        value={aiConfig.documentType}
                                                        onChange={(e) =>
                                                            setAiConfig({
                                                                ...aiConfig,
                                                                documentType: e.target.value,
                                                            })
                                                        }
                                                        className="mb-2 w-full rounded-xl border border-emerald-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2 text-gray-700 dark:text-gray-300 focus:border-emerald-400 focus:outline-none"
                                                    >
                                                        <option value="textbook">📘 Tài liệu giáo trình</option>
                                                        <option value="exam_scan">📝 Scan tài liệu trắc nghiệm</option>
                                                    </select>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    {/* Độ khó */}
                                                    <div>
                                                        <label className="mb-2 block text-sm text-gray-600 dark:text-gray-400">
                                                            Độ khó
                                                        </label>
                                                        <select
                                                            value={aiConfig.difficulty}
                                                            onChange={(e) =>
                                                                setAiConfig({ ...aiConfig, difficulty: e.target.value })
                                                            }
                                                            className="w-full rounded-xl border border-emerald-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2 text-gray-700 dark:text-gray-300 focus:border-emerald-400 focus:outline-none"
                                                        >
                                                            <option value="easy">Dễ</option>
                                                            <option value="medium">Trung bình</option>
                                                            <option value="hard">Khó</option>
                                                            <option value="mixed">Hỗn hợp</option>
                                                        </select>
                                                    </div>

                                                    {/* Số câu hỏi – chỉ hiện nếu là giáo trình */}
                                                    {aiConfig.documentType === "textbook" && (
                                                        <div>
                                                            <label className="mb-2 block text-sm text-gray-600 dark:text-gray-400">
                                                                Số câu hỏi
                                                            </label>
                                                            <input
                                                                type="range"
                                                                min="5"
                                                                max="100"
                                                                value={aiConfig.questionCount}
                                                                onChange={(e) =>
                                                                    setAiConfig({
                                                                        ...aiConfig,
                                                                        questionCount: parseInt(e.target.value),
                                                                    })
                                                                }
                                                                className="w-full"
                                                            />
                                                            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                                                                {aiConfig.questionCount} câu
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>


                                            </motion.div>
                                        )}

                                        {/* Manual Creation Section */}
                                        {activeTab === "manual" && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="mb-8"
                                            >
                                                <h3 className="mb-4 text-lg font-bold text-blue-900 dark:text-blue-300">
                                                    Tạo câu hỏi thủ công
                                                </h3>

                                                <div className="rounded-2xl bg-blue-50 dark:bg-blue-900/20 p-6 border border-blue-200 dark:border-blue-700/30">
                                                    <div className="text-center space-y-3">
                                                        <div className="inline-flex rounded-full bg-blue-100 dark:bg-blue-900/40 p-4">
                                                            <PenTool className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                                                        </div>
                                                        <div>
                                                            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                                                                Bạn sẽ tạo câu hỏi trực tiếp trên giao diện soạn thảo
                                                            </p>
                                                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                                Chúng tôi sẽ cung cấp công cụ soạn thảo chuyên dụng sau khi bạn tạo bộ câu hỏi
                                                            </p>
                                                        </div>
                                                        <Link
                                                            to="/questions/editor"
                                                            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-600 dark:to-cyan-600 px-6 py-3 font-semibold text-white shadow-lg hover:from-blue-600 hover:to-cyan-600 dark:hover:from-blue-700 dark:hover:to-cyan-700 transition-all"
                                                        >
                                                            Mở trình soạn thảo
                                                            <ArrowRight className="h-5 w-5" />
                                                        </Link>
                                                    </div>

                                                    <div className="mt-6 grid grid-cols-2 gap-4">
                                                        <div className="rounded-lg bg-white dark:bg-slate-800 p-4 text-center">
                                                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">0</div>
                                                            <div className="text-sm text-gray-600 dark:text-gray-400">Câu hỏi đã tạo</div>
                                                        </div>
                                                        <div className="rounded-lg bg-white dark:bg-slate-800 p-4 text-center">
                                                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">4</div>
                                                            <div className="text-sm text-gray-600 dark:text-gray-400">Loại câu hỏi</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Tags */}
                                    <div className="mb-8">
                                        <h3 className="mb-4 text-lg font-bold text-emerald-900 dark:text-emerald-300">
                                            Thẻ (Tags)
                                        </h3>
                                        <div className="space-y-3">
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={newTag}
                                                    onChange={(e) => setNewTag(e.target.value)}
                                                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                                                    placeholder="Thêm thẻ (Enter để thêm)"
                                                    className="flex-1 rounded-xl border border-emerald-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2 text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-slate-400 focus:border-emerald-400 focus:outline-none"
                                                />
                                                <button
                                                    onClick={handleAddTag}
                                                    className="rounded-xl bg-emerald-100 dark:bg-emerald-900/40 px-4 py-2 text-emerald-700 dark:text-emerald-300 font-medium hover:bg-emerald-200 dark:hover:bg-emerald-800/60"
                                                >
                                                    Thêm
                                                </button>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {tags.map((tag, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center gap-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40 px-3 py-1 text-sm text-emerald-700 dark:text-emerald-300"
                                                    >
                                                        #{tag}
                                                        <button
                                                            onClick={() => handleRemoveTag(index)}
                                                            className="ml-1 text-emerald-500 hover:text-emerald-700"
                                                        >
                                                            <X className="h-3 w-3" />
                                                        </button>
                                                    </div>
                                                ))}
                                                {tags.length === 0 && (
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        Chưa có thẻ nào. Thêm thẻ để người khác dễ tìm thấy bộ câu hỏi của bạn.
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Visibility Settings */}
                                    <div className="mb-8">
                                        <h3 className="mb-4 text-lg font-bold text-emerald-900 dark:text-emerald-300">
                                            Cài đặt hiển thị
                                        </h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <button
                                                onClick={() => setVisibility("public")}
                                                className={`rounded-xl border-2 p-4 text-left transition-all ${visibility === "public"
                                                    ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30"
                                                    : "border-gray-200 dark:border-slate-700 hover:border-emerald-300"
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`rounded-full p-2 ${visibility === "public"
                                                        ? "bg-emerald-500 text-white"
                                                        : "bg-gray-100 dark:bg-slate-700 text-gray-500"
                                                        }`}>
                                                        <Users className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-700 dark:text-gray-300">Công khai</div>
                                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                                            Mọi người đều có thể xem và sử dụng
                                                        </div>
                                                    </div>
                                                    {visibility === "public" && (
                                                        <CheckCircle2 className="ml-auto h-5 w-5 text-emerald-500" />
                                                    )}
                                                </div>
                                            </button>
                                            <button
                                                onClick={() => setVisibility("private")}
                                                className={`rounded-xl border-2 p-4 text-left transition-all ${visibility === "private"
                                                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                                                    : "border-gray-200 dark:border-slate-700 hover:border-blue-300"
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`rounded-full p-2 ${visibility === "private"
                                                        ? "bg-blue-500 text-white"
                                                        : "bg-gray-100 dark:bg-slate-700 text-gray-500"
                                                        }`}>
                                                        <ShieldCheck className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-700 dark:text-gray-300">Riêng tư</div>
                                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                                            Chỉ bạn và người được chia sẻ có thể xem
                                                        </div>
                                                    </div>
                                                    {visibility === "private" && (
                                                        <CheckCircle2 className="ml-auto h-5 w-5 text-blue-500" />
                                                    )}
                                                </div>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-emerald-100 dark:border-slate-700">
                                        <button
                                            onClick={handleCreateSubject}
                                            disabled={activeTab === "ai"}
                                            title={
                                                activeTab === "ai"
                                                    ? "Tính năng tạo bộ câu hỏi với AI đang được phát triển. Vui lòng sử dụng phương thức tạo thủ công."
                                                    : undefined
                                            } 
                                            className="
    flex-1 rounded-xl
    bg-gradient-to-r from-emerald-500 to-green-500
    dark:from-emerald-600 dark:to-green-600
    px-6 py-4 font-bold text-white shadow-lg
    hover:from-emerald-600 hover:to-green-600
    dark:hover:from-emerald-700 dark:hover:to-green-700
    transition-all

    disabled:opacity-50
    disabled:cursor-not-allowed
    disabled:hover:from-emerald-500
    disabled:hover:to-green-500
    dark:disabled:hover:from-emerald-600
    dark:disabled:hover:to-green-600
  "
                                        >
                                            {activeTab === "ai" ? "Tạo với AI" : "Tạo thủ công"}


                                        </button>

                                        <Link
                                            to="/subjects"
                                            className="rounded-xl border-2 border-emerald-200 dark:border-slate-600 px-6 py-4 font-medium text-emerald-700 dark:text-emerald-300 text-center hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all"
                                        >
                                            Hủy
                                        </Link>
                                    </div>

                                    {/* Note */}
                                    <div className="mt-6 rounded-lg bg-amber-50 dark:bg-amber-900/20 p-4 border border-amber-200 dark:border-amber-700/30">
                                        <div className="flex items-start gap-3">
                                            <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                                            <div className="text-sm text-amber-700 dark:text-amber-300">
                                                <p className="font-medium">Lưu ý:</p>
                                                <p className="mt-1">
                                                    Bộ câu hỏi công khai sẽ được kiểm duyệt trước khi hiển thị.
                                                    Vui lòng đảm bảo nội dung phù hợp với tiêu chuẩn cộng đồng.
                                                </p>
                                            </div>
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