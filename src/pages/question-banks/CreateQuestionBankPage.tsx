import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
    Upload,
    PenTool,
    Sparkles,
    Zap,
    Users,
    ShieldCheck,
    BookOpen,
    Wand2,
    X,
    CheckCircle2,
    AlertCircle,
    FolderPlus,
    Eye,
    Share2,
    Download,
    Settings,
    Search,
    ChevronDown,
    FileJson,
    CheckCircle,
    Calendar,
    SortAsc,
    SortDesc,
    Filter
} from "lucide-react";

import { useQuery } from "@tanstack/react-query";

import Floating from "@/shared/ui/Floatting";
import FadeInOnView from "@/shared/ui/FadeInOnView";
import { useAuth } from "@/app/providers/AuthProvider";
import { toast } from "react-hot-toast";
import { fetchAllSubjects } from "@/shared/api/subjectApi";
import { Subject } from "@/shared/types/subject";
import { QuestionBankApi } from "@/shared/api/questionBanksApi";
import { QuestionBankVisibility } from "@/shared/types/questionBank";
import { fetchSubjects } from "@/shared/api/subjectApi";
import type { UpdateQuestionPayload } from "@/shared/types/question";
import { createQuestionInBankApi } from "@/shared/api/questionsApi";
import { apiService } from "@/shared/api/api";
import { UserStats } from "@/shared/types/user";

// Sort options for subjects
type SortOption = 'name-asc' | 'name-desc' | 'date-asc' | 'date-desc' | 'popularity-desc';

/** Map UI sort option → Spring sort param (field,direction) */
function toSortParam(opt: SortOption): string {
    switch (opt) {
        case 'name-asc': return 'name,asc';
        case 'name-desc': return 'name,desc';
        case 'date-asc': return 'createdAt,asc';
        case 'date-desc': return 'createdAt,desc';
        case 'popularity-desc': return 'bankCount,desc';
        default: return 'createdAt,desc';
    }
}

export default function CreateQuestionBankPage() {
    useAuth();
    const navigate = useNavigate();

    const [selectedSubjectId, setSelectedSubjectId] = useState<number | "">("");
    const [searchSubject, setSearchSubject] = useState("");
    const [keyword, setKeyword] = useState(""); // Debounced keyword
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [checkOnline, setCheckOnline] = useState(true);
    const [page] = useState(1);
    const pageSize = 10;
    const sortOption: SortOption = 'popularity-desc';

    const handleSelectSubject = (id: number, code: string, name: string) => {
        setSelectedSubjectId(id);
        setSearchSubject(code + " - " + name);
        setIsDropdownOpen(false);
    };

    // Debounce search input
    useEffect(() => {
        const timer = setTimeout(() => {
            setKeyword(searchSubject);
        }, 400);
        return () => clearTimeout(timer);
    }, [searchSubject]);

    // Fetch subjects using React Query with pagination & search
    const {
        data: pageResult,
        isLoading: isLoadingSubjects,
    } = useQuery({
        queryKey: ["subjects", { page, pageSize, keyword, sort: sortOption, checkOnline }],
        queryFn: async () => {
            const getLocalData = async () => {
                try {
                    const res = await fetch(`${import.meta.env.BASE_URL}data/subjects.json`);
                    const allSubjects: Subject[] = await res.json();

                    // 1. Client-side filtering
                    let filtered = allSubjects;
                    if (keyword) {
                        const lowerKw = keyword.toLowerCase();
                        filtered = allSubjects.filter(s =>
                            s.name.toLowerCase().includes(lowerKw) ||
                            (s.description && s.description.toLowerCase().includes(lowerKw)) ||
                            (s.code && s.code.toLowerCase().includes(lowerKw))
                        );
                    }

                    // 2. Client-side sorting
                    const [field, dir] = toSortParam(sortOption).split(',');
                    filtered.sort((a, b) => {
                        const valA = a[field as keyof Subject] ?? (field === 'bankCount' ? 0 : "");
                        const valB = b[field as keyof Subject] ?? (field === 'bankCount' ? 0 : "");

                        if (typeof valA === 'string' && typeof valB === 'string') {
                            const cmp = valA.localeCompare(valB, 'vi', { sensitivity: 'base' });
                            return dir === 'asc' ? cmp : -cmp;
                        }

                        if (typeof valA === 'number' && typeof valB === 'number') {
                            return dir === 'asc' ? valA - valB : valB - valA;
                        }

                        return 0;
                    });

                    // 3. Client-side pagination (chỉ lấy 10 kết quả đầu tiên)
                    const totalElements = filtered.length;
                    const totalPages = Math.ceil(totalElements / pageSize);
                    const start = (page - 1) * pageSize;
                    const pagedContent = filtered.slice(start, start + pageSize);

                    return {
                        content: pagedContent,
                        totalPages,
                        totalElements,
                    };
                } catch (e) {
                    console.error(e);
                    return { content: [], totalPages: 1, totalElements: 0 };
                }
            };

            if (!checkOnline) return getLocalData();

            try {
                return await fetchSubjects({
                    page: page - 1,
                    size: pageSize,
                    keyword: keyword || undefined,
                    sort: toSortParam(sortOption),
                });
            } catch (error) {
                setCheckOnline(false);
                console.error("Backend fetch failed, falling back to local data:", error);
                toast.error("Kết nối đến API thất bại, đang sử dụng dữ liệu nội bộ");
                return getLocalData();
            }
        },
    });

    const subjectsList = pageResult?.content || [];

    const [activeTab, setActiveTab] = useState<"ai" | "manual">("manual");
    const [subjectName, setSubjectName] = useState("");
    const [subjectDescription, setSubjectDescription] = useState("");
    const [visibility, setVisibility] = useState<QuestionBankVisibility>(QuestionBankVisibility.PUBLIC);
    const [tags, setTags] = useState<string[]>([]);
    const [newTag, setNewTag] = useState("");

    // Add these to your component's state
    const [jsonInput, setJsonInput] = useState("");
    const [jsonMessage, setJsonMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const [importedQuestions, setImportedQuestions] = useState<UpdateQuestionPayload[] | null>(null);
    const [importMode, setImportMode] = useState<"manual" | "file">("manual");

    // Fetch thực tế dữ liệu thống kê người dùng từ Backend
    const { data: userStats } = useQuery({
        queryKey: ["user-stats"],
        queryFn: () => apiService.get<UserStats>("/users/stats"),
    });

    // Helper function to validate and normalize JSON questions
    const validateJSON = (input: string) => {
        try {
            const parsedData = JSON.parse(input);
            if (!Array.isArray(parsedData)) {
                throw new Error("Dữ liệu JSON phải là một danh sách các câu hỏi (Array)");
            }

            const normalized: UpdateQuestionPayload[] = parsedData.map((q: unknown, idx: number) => {
                const obj = (typeof q === "object" && q !== null) ? (q as Record<string, unknown>) : null;
                const stemRaw = obj?.stem;
                const stem = typeof stemRaw === "string" ? stemRaw.trim() : "";
                if (!stem) {
                    throw new Error(`Câu hỏi #${idx + 1} thiếu "stem"`);
                }

                const imageUrl = typeof obj?.imageUrl === "string" ? obj.imageUrl.trim() : undefined;

                const rawOptionsUnknown = obj?.options;
                const rawOptions = Array.isArray(rawOptionsUnknown) ? rawOptionsUnknown : [];
                const options = rawOptions
                    .map((o: unknown) => (typeof o === "object" && o !== null) ? (o as Record<string, unknown>) : null)
                    .filter((o): o is Record<string, unknown> => Boolean(o))
                    .filter((o) => typeof o.label === "string" && typeof o.content === "string")
                    .map((o) => ({
                        label: (o.label as string).trim(),
                        content: (o.content as string).trim(),
                        isCorrect: Boolean(o.isCorrect),
                        imageUrl: typeof o.imageUrl === "string" ? o.imageUrl.trim() : undefined,
                    }));

                return {
                    stem,
                    imageUrl,
                    questionType: "mcq_single",
                    options,
                };
            });

            if (normalized.length === 0) {
                throw new Error("JSON không có câu hỏi nào để import");
            }

            return normalized;
        } catch (error) {
            throw error;
        }
    };

    // Handlers
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target?.result as string;
            setJsonInput(content);
            
            try {
                const normalized = validateJSON(content);
                setImportedQuestions(normalized);
                setJsonMessage({ 
                    type: "success", 
                    text: `Tải file thành công! Đã nhận diện ${normalized.length} câu hỏi.` 
                });
            } catch (error: unknown) {
                setImportedQuestions(null);
                const message = error instanceof Error ? error.message : "Định dạng file không hợp lệ";
                setJsonMessage({ type: "error", text: message });
            }
            setTimeout(() => setJsonMessage(null), 4000);
        };
        reader.onerror = () => {
            setJsonMessage({ type: "error", text: "Lỗi khi đọc file. Vui lòng thử lại!" });
            setTimeout(() => setJsonMessage(null), 3000);
        };
        reader.readAsText(file);
    };

    const handleImportJSON = () => {
        if (!jsonInput.trim()) {
            setJsonMessage({ type: "error", text: "Vui lòng nhập nội dung JSON!" });
            setTimeout(() => setJsonMessage(null), 3000);
            return;
        }

        try {
            const normalized = validateJSON(jsonInput);
            setImportedQuestions(normalized);
            setJsonMessage({ type: "success", text: `Import JSON thành công! (${normalized.length} câu hỏi)` });
            setTimeout(() => setJsonMessage(null), 3000);
        } catch (error: unknown) {
            setImportedQuestions(null);
            const message = error instanceof Error ? error.message : "JSON không hợp lệ. Vui lòng kiểm tra lại định dạng!";
            setJsonMessage({ type: "error", text: message });
            setTimeout(() => setJsonMessage(null), 3000);
        }
    };

    const handleClearJSON = () => {
        setJsonInput("");
        setImportedQuestions(null);
        setJsonMessage({ type: "success", text: "Đã xóa nội dung JSON!" });
        setTimeout(() => setJsonMessage(null), 3000);
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
    const handleCreateQuestionBank = async () => {
        if (!subjectName.trim()) {
            toast.error("Vui lòng nhập tên bộ câu hỏi");
            return;
        }

        if (!selectedSubjectId) {
            toast.error("Vui lòng chọn môn học");
            return;
        }

        if (activeTab === "ai" && !jsonInput.trim()) {
            toast.error("Vui lòng nhập nội dung JSON");
            return;
        }

        if (activeTab === "ai" && (!importedQuestions || importedQuestions.length === 0)) {
            toast.error("Vui lòng bấm Import JSON để kiểm tra dữ liệu trước khi lưu");
            return;
        }

        try {
            const toastId = toast.loading(activeTab === "ai" ? "Đang xử lý JSON và tạo bộ câu hỏi..." : "Đang tạo bộ câu hỏi...");

            // 1. Tạo bộ câu hỏi trước
            const response = await QuestionBankApi.create({
                name: subjectName.trim(),
                subjectId: selectedSubjectId as number,
                description: subjectDescription.trim() || undefined,
                visibility: visibility,
            });

            if (activeTab === "manual") {
                toast.success("Tạo bộ câu hỏi thành công!", { id: toastId });
                navigate(`/questions/question-bank/${response.bankId}/edit`);
            } else {
                // 2. Tạo câu hỏi từ JSON đã import
                try {
                    const questionsData = importedQuestions ?? [];
                    const total = questionsData.length;
                    let completed = 0;
                    
                    toast.loading(`Đang tạo ${total} câu hỏi...`, { id: toastId });

                    // Tạo câu hỏi tuần tự để đảm bảo đúng thứ tự như trong JSON
                    for (const q of questionsData) {
                        try {
                            await createQuestionInBankApi(response.bankId, q);
                            completed++;
                            // Cập nhật progress toast mỗi khi hoàn thành 1 câu
                            toast.loading(`Đang tạo câu hỏi: ${completed}/${total}...`, { id: toastId });
                        } catch (err) {
                            console.error("Lỗi tạo câu hỏi:", err);
                            // Vẫn tiếp tục tạo các câu tiếp theo nếu một câu bị lỗi
                        }
                    }

                    toast.success(`Tạo thành công bộ câu hỏi với ${completed}/${total} câu hỏi!`, { id: toastId });
                    navigate(`/questions/question-bank/${response.bankId}/edit`);
                } catch (parseError: unknown) {
                    console.error("JSON Parse/Save Error:", parseError);
                    const msg = parseError instanceof Error ? parseError.message : "Không xác định";
                    toast.error(`Lỗi xử lý JSON: ${msg}. Bộ câu hỏi đã được tạo nhưng chưa có câu hỏi.`, { id: toastId, duration: 5000 });
                    navigate(`/questions/question-bank/${response.bankId}/edit`);
                }
            }
        } catch (error: unknown) {
            const maybeAxiosErr = error as { response?: { data?: { message?: string } } };
            const message = maybeAxiosErr?.response?.data?.message || (error instanceof Error ? error.message : "Đã xảy ra lỗi. Vui lòng thử lại!");
            toast.error(message);
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
                                                Nhanh
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
                                                    Môn học *
                                                </label>
                                                <div className="flex flex-col gap-2 relative z-20">
                                                    {/* Custom Searchable Dropdown */}
                                                    <div
                                                        className={`flex items-center w-full rounded-xl border border-emerald-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-200 dark:focus-within:ring-emerald-900 ${isLoadingSubjects ? 'opacity-50 pointer-events-none' : ''}`}
                                                    >
                                                        <Search className="h-5 w-5 text-gray-400 mr-2" />
                                                        <input
                                                            type="text"
                                                            value={searchSubject}
                                                            onChange={(e) => {
                                                                setSearchSubject(e.target.value);
                                                                setIsDropdownOpen(true);
                                                                if (selectedSubjectId) setSelectedSubjectId(""); // Reset id if they type new text
                                                            }}
                                                            onClick={() => setIsDropdownOpen(true)}
                                                            onFocus={() => setIsDropdownOpen(true)}
                                                            placeholder={isLoadingSubjects ? "Đang tải..." : "Tìm hoặc chọn môn học..."}
                                                            className="flex-1 bg-transparent text-gray-700 dark:text-gray-300 focus:outline-none placeholder-gray-400 dark:placeholder-slate-400"
                                                        />
                                                        <ChevronDown className="h-5 w-5 text-gray-400 cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)} />
                                                    </div>

                                                    {/* Dropdown Menu */}
                                                    {isDropdownOpen && (
                                                        <>
                                                            <div className="fixed inset-0 z-30" onClick={() => {
                                                                setIsDropdownOpen(false);
                                                                const s = subjectsList.find(sub => sub.subjectId === selectedSubjectId);
                                                                if (s) setSearchSubject(s.code + " - " + s.name);
                                                                else setSearchSubject("");
                                                            }} />
                                                            <div className="absolute z-40 top-[52px] left-0 mt-1 max-h-60 w-full overflow-y-auto rounded-xl border border-emerald-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-2 shadow-xl">
                                                                {subjectsList.length === 0 ? (
                                                                    <div className="p-3 text-center text-sm text-gray-500">
                                                                        Không tìm thấy môn học nào
                                                                    </div>
                                                                ) : (
                                                                    subjectsList.map(sub => (
                                                                        <div
                                                                            key={sub.subjectId}
                                                                            onClick={() => handleSelectSubject(sub.subjectId, sub.code, sub.name)}
                                                                            className={`cursor-pointer rounded-lg px-4 py-2 transition-colors hover:bg-emerald-50 dark:hover:bg-slate-700 ${selectedSubjectId === sub.subjectId ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 font-semibold' : 'text-gray-700 dark:text-gray-300'}`}
                                                                        >
                                                                            {sub.code} - {sub.name}
                                                                        </div>
                                                                    ))
                                                                )}
                                                            </div>
                                                        </>
                                                    )}

                                                    <div className="text-right mt-1">
                                                        <Link to="/subjects/create" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300">
                                                            + Chưa có môn học? Thêm mới
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
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
                                                className="mb-4 overflow-hidden"
                                            >
                                                <div className="flex items-center justify-between mb-4">
                                                    <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-300">
                                                        Nhập câu hỏi từ JSON
                                                    </h3>

                                                    {/* Toggle Switch giữa 2 chế độ */}
                                                    <div className="flex p-1 bg-emerald-100/50 dark:bg-gray-800 rounded-lg">
                                                        <button
                                                            onClick={() => setImportMode('manual')}
                                                            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${importMode === 'manual'
                                                                    ? 'bg-white dark:bg-emerald-600 text-emerald-700 dark:text-white shadow-sm'
                                                                    : 'text-emerald-600 dark:text-emerald-400 hover:bg-white/50'
                                                                }`}
                                                        >
                                                            Nhập thủ công
                                                        </button>
                                                        <button
                                                            onClick={() => setImportMode('file')}
                                                            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${importMode === 'file'
                                                                    ? 'bg-white dark:bg-emerald-600 text-emerald-700 dark:text-white shadow-sm'
                                                                    : 'text-emerald-600 dark:text-emerald-400 hover:bg-white/50'
                                                                }`}
                                                        >
                                                            Tải file .json
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="space-y-4">
                                                    <AnimatePresence mode="wait">
                                                        {importMode === 'manual' ? (
                                                            /* --- CHẾ ĐỘ NHẬP THỦ CÔNG --- */
                                                            <motion.div
                                                                key="manual"
                                                                initial={{ opacity: 0, x: -20 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                exit={{ opacity: 0, x: 20 }}
                                                                className="space-y-3"
                                                            >
                                                                <textarea
                                                                    value={jsonInput}
                                                                    onChange={(e) => setJsonInput(e.target.value)}
                                                                    placeholder='[
  {
    "stem": "Thủ đô của Việt Nam là gì?",
    "options": [
      { "label": "A", "content": "Hà Nội", "isCorrect": true },
      { "label": "B", "content": "Hồ Chí Minh", "isCorrect": false },
      { "label": "C", "content": "Đà Nẵng", "isCorrect": false },
      { "label": "D", "content": "Cần Thơ", "isCorrect": false }
    ]
  },
  {
    "stem": "2 + 2 bằng bao nhiêu?",
    "options": [
      { "label": "A", "content": "3", "isCorrect": false },
      { "label": "B", "content": "4", "isCorrect": true },
      { "label": "C", "content": "5", "isCorrect": false },
      { "label": "D", "content": "6", "isCorrect": false }
    ]
  },
  ...
]'
                                                                    className="h-60 w-full rounded-xl border border-emerald-200 bg-white/50 p-4 font-mono text-sm text-emerald-900 placeholder:text-emerald-300 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/30 dark:border-emerald-800 dark:bg-gray-900/50 dark:text-emerald-100 dark:placeholder:text-emerald-700"
                                                                />

                                                                

                                                                {/* Action Buttons */}
                                                                <div className="flex gap-3">
                                                                    <button
                                                                        onClick={handleImportJSON}
                                                                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:from-emerald-500 hover:to-teal-500 hover:shadow-lg hover:shadow-emerald-500/25"
                                                                    >
                                                                        <FileJson className="h-4 w-4" />
                                                                        Import JSON
                                                                    </button>
                                                                    <button
                                                                        onClick={handleClearJSON}
                                                                        className="flex items-center justify-center gap-2 rounded-xl border border-emerald-300 px-4 py-2.5 text-sm font-medium text-emerald-700 transition-all duration-300 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-300 dark:hover:bg-emerald-950/50"
                                                                    >
                                                                        <X className="h-4 w-4" />
                                                                        Xóa
                                                                    </button>
                                                                </div>
                                                            </motion.div>
                                                        ) : (
                                                            /* --- CHẾ ĐỘ TẢI FILE --- */
                                                            <motion.div
                                                                key="file"
                                                                initial={{ opacity: 0, x: 20 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                exit={{ opacity: 0, x: -20 }}
                                                                className="rounded-2xl border-2 border-dashed border-emerald-200 bg-emerald-50/30 p-10 text-center transition-all hover:border-emerald-400 hover:bg-emerald-50/50 dark:border-emerald-800 dark:bg-emerald-950/20"
                                                            >
                                                                <input
                                                                    type="file"
                                                                    accept=".json,application/json"
                                                                    onChange={handleFileUpload}
                                                                    className="hidden"
                                                                    id="json-upload"
                                                                />
                                                                <label htmlFor="json-upload" className="cursor-pointer block">
                                                                    <div className="mb-4 flex justify-center">
                                                                        <div className="rounded-full bg-emerald-100 p-4 dark:bg-emerald-900/50">
                                                                            <Upload className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                                                                        </div>
                                                                    </div>
                                                                    <p className="mb-2 text-lg font-medium text-emerald-900 dark:text-emerald-300">
                                                                        Tải file JSON lên
                                                                    </p>
                                                                    <p className="text-sm text-emerald-600 dark:text-emerald-500">
                                                                        Hệ thống sẽ tự động nhập dữ liệu sau khi bạn chọn file
                                                                    </p>
                                                                </label>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>

                                                {/* Success/Error Message */}
                                                <AnimatePresence>
                                                    {jsonMessage && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: -10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, y: -10 }}
                                                            className={`mt-4 rounded-xl p-3 text-sm ${jsonMessage.type === "success"
                                                                    ? "border border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300"
                                                                    : "border border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950/50 dark:text-red-300"
                                                                }`}
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                {jsonMessage.type === "success" ? (
                                                                    <CheckCircle className="h-4 w-4" />
                                                                ) : (
                                                                    <AlertCircle className="h-4 w-4" />
                                                                )}
                                                                <span>{jsonMessage.text}</span>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

{/* Format Example */}
                                                                <details className="mb-8 group rounded-xl border border-emerald-200 bg-emerald-50/30 p-4 transition-all duration-300 hover:shadow-md dark:border-emerald-800 dark:bg-emerald-950/20">
                                                                    <summary className="flex cursor-pointer items-center justify-between text-xs font-medium text-gray-700 dark:text-gray-300">
                                                                        <span className="flex items-center gap-2">
                                                                            <span className="text-base">📋</span>
                                                                            Lấy prompt để tạo JSON
                                                                        </span>
                                                                        <svg
                                                                            className="h-4 w-4 transition-transform duration-300 group-open:rotate-180"
                                                                            fill="none"
                                                                            stroke="currentColor"
                                                                            viewBox="0 0 24 24"
                                                                        >
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                                        </svg>
                                                                    </summary>

                                                                    <div className="mt-4 space-y-3">
                                                                        <div className="relative">
                                                                            <button
                                                                                onClick={() => {
                                                                                    const promptText = `Bạn là một hệ thống trích xuất dữ liệu chính xác.

Nhiệm vụ:
- Đọc file PDF trắc nghiệm được cung cấp
- Trích xuất toàn bộ câu hỏi và các đáp án
- Chuyển đổi sang định dạng JSON theo mẫu bên dưới

Yêu cầu bắt buộc:
1. Giữ nguyên nội dung câu hỏi (stem)
2. Mỗi câu có danh sách options gồm:
   - label: "A", "B", "C", "D"
   - content: nội dung đáp án
   - isCorrect: true/false (dựa vào đáp án đúng trong tài liệu, những đáp án được highlight hoặc được tô đậm hay text có màu khác so với những đáp án khác là những đáp án đúng)
3. Không thêm bất kỳ text nào ngoài JSON
4. Output phải là JSON hợp lệ (valid JSON)
5. Loại bỏ các ký tự xuống dòng dư thừa, format lại cho gọn
6. Nếu câu hỏi thiếu đáp án, vẫn giữ lại nhưng chỉ include những đáp án có thể đọc được
7. Nếu PDF có ký hiệu đáp án đúng (ví dụ: *, ✓, đáp án in đậm...), hãy suy luận để xác định isCorrect

Format JSON mẫu:
[
  {
    "stem": "Nội dung câu hỏi (Không có ghi ra số câu)",
    "options": [
      { "label": "A", "content": "Đáp án A", "isCorrect": false },
      { "label": "B", "content": "Đáp án B", "isCorrect": true },
      { "label": "C", "content": "Đáp án C", "isCorrect": false },
      { "label": "D", "content": "Đáp án D", "isCorrect": false }
    ]
  }
]

Lưu ý:
- Không giải thích
- Không markdown
- Không thêm \`\`\`json
- Chỉ trả về JSON thuần`;

                                                                                    navigator.clipboard.writeText(promptText);
                                                                                    toast.success("Đã sao chép prompt vào clipboard!");
                                                                                }}
                                                                                className="w-full rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:from-emerald-500 hover:to-teal-500 hover:shadow-lg hover:shadow-emerald-500/25 flex items-center justify-center gap-2"
                                                                            >
                                                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                                                                </svg>
                                                                                Sao chép prompt
                                                                            </button>
                                                                        </div>

                                                                        <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-4 dark:border-emerald-800 dark:bg-gray-900/50">
                                                                            <div className="flex items-start gap-3">
                                                                                <span className="text-xl">💡</span>
                                                                                <div className="flex-1 space-y-3 text-sm text-gray-700 dark:text-gray-300">
                                                                                    <p className="font-bold underline">Hướng dẫn quan trọng:</p>
                                                                                    <p className="text-xs leading-relaxed">
                                                                                        Hãy <strong>tải file PDF hoặc DOCS</strong> có chứa tài liệu trắc nghiệm của bạn lên Gemini và gửi kèm câu lệnh (prompt) bên dưới.
                                                                                        <span className="block mt-1 text-amber-600 dark:text-amber-400 font-semibold italic">
                                                                                            * Lưu ý: Sử dụng chế độ <span className="underline">GEMINI PRO</span> để cho ra kết quả chính xác nhất!
                                                                                        </span>
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="flex items-center justify-between rounded-lg border border-emerald-200 bg-white/50 p-3 dark:border-emerald-800 dark:bg-gray-900/50">
                                                                            <div className="flex items-center gap-2">
                                                                                <span className="text-sm">🚀</span>
                                                                                <span className="text-xs text-gray-700 dark:text-gray-400">
                                                                                    Hoặc truy cập Gem có sẵn để tạo JSON ngay
                                                                                </span>
                                                                            </div>
                                                                            <a
                                                                                href="https://gemini.google.com/gem/1ehk6yCYXTnllw6t7SDg2mwCHzeeEl3P5?usp=sharing"
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                                className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-100 px-3 py-1.5 text-xs font-medium text-gray-700 transition-all duration-200 hover:bg-emerald-200 dark:bg-emerald-900/50 dark:text-gray-300 dark:hover:bg-emerald-900"
                                                                            >
                                                                                Mở Gemini
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </details>
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
                                                onClick={() => setVisibility(QuestionBankVisibility.PUBLIC)}
                                                className={`rounded-xl border-2 p-4 text-left transition-all ${visibility === QuestionBankVisibility.PUBLIC
                                                    ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30"
                                                    : "border-gray-200 dark:border-slate-700 hover:border-emerald-300"
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`rounded-full p-2 ${visibility === QuestionBankVisibility.PUBLIC
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
                                                    {visibility === QuestionBankVisibility.PUBLIC && (
                                                        <CheckCircle2 className="ml-auto h-5 w-5 text-emerald-500" />
                                                    )}
                                                </div>
                                            </button>
                                            <button
                                                onClick={() => setVisibility(QuestionBankVisibility.PRIVATE)}
                                                className={`rounded-xl border-2 p-4 text-left transition-all ${visibility === QuestionBankVisibility.PRIVATE
                                                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                                                    : "border-gray-200 dark:border-slate-700 hover:border-blue-300"
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`rounded-full p-2 ${visibility === QuestionBankVisibility.PRIVATE
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
                                                    {visibility === QuestionBankVisibility.PRIVATE && (
                                                        <CheckCircle2 className="ml-auto h-5 w-5 text-blue-500" />
                                                    )}
                                                </div>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-emerald-100 dark:border-slate-700">
                                        <button
                                            onClick={handleCreateQuestionBank}
                                            disabled={activeTab === "ai" ? !importedQuestions?.length : false}
                                            title={activeTab === "ai" && !importedQuestions?.length ? "Hãy bấm Import JSON trước khi lưu" : undefined}
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

                    {/* Left sidebar - Steps & Info */}
                    <div className="lg:col-span-1">
                        <FadeInOnView amount={0.2}>
                            <div className="sticky top-8 space-y-6">
                                 {/* Hướng 2: Real-time Feedback (Chỉ hiện khi có câu hỏi) */}
                                {importedQuestions && importedQuestions.length > 0 && (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 p-6 shadow-xl text-white border border-emerald-500/30"
                                    >
                                        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider opacity-80">
                                            Bộ câu hỏi đang soạn
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-end">
                                                <div>
                                                    <div className="text-3xl font-black">{importedQuestions.length}</div>
                                                    <div className="text-[10px] opacity-70 uppercase">Câu hỏi đã nhận</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-lg font-bold">
                                                        {importedQuestions.every(q => q.options?.some(o => o.isCorrect)) ? "Sẵn sàng ✅" : "Cần rà soát ⚠️"}
                                                    </div>
                                                    <div className="text-[10px] opacity-70 uppercase">Độ hoàn thiện</div>
                                                </div>
                                            </div>

                                            <div className="pt-3 border-t border-white/10">
                                                <div className="flex items-center gap-2 text-xs">
                                                    <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                                                    <span>Thời gian học ước tính: <strong>{~((importedQuestions.length * 45) / 60)} phút</strong></span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Hướng 1: Personal Brand Stats */}
                                <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-lg border border-emerald-100 dark:border-slate-700">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-300">
                                            Uy tín cá nhân
                                        </h3>
                                        <ShieldCheck className="h-5 w-5 text-emerald-500" />
                                    </div>
                                    
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="rounded-xl bg-emerald-50 dark:bg-emerald-900/20 p-3">
                                                <div className="text-xl font-black text-emerald-700 dark:text-emerald-300">{userStats?.totalBanks || 0}</div>
                                                <div className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-tight">Bộ câu hỏi</div>
                                            </div>
                                            <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 p-3">
                                                <div className="text-xl font-black text-amber-700 dark:text-amber-300">{userStats?.reputation || 0}</div>
                                                <div className="text-[10px] font-medium text-amber-600 dark:text-amber-400 uppercase tracking-tight">Điểm uy tín</div>
                                            </div>
                                            <div className="rounded-xl bg-blue-50 dark:bg-blue-900/20 p-3">
                                                <div className="text-xl font-black text-blue-700 dark:text-blue-300">{userStats?.totalLikes || 0}</div>
                                                <div className="text-[10px] font-medium text-blue-600 dark:text-blue-400 uppercase tracking-tight">Lượt thích</div>
                                            </div>
                                            <div className="rounded-xl bg-purple-50 dark:bg-purple-900/20 p-3">
                                                <div className="text-xl font-black text-purple-700 dark:text-purple-300">{userStats?.approvalRate || 0}%</div>
                                                <div className="text-[10px] font-medium text-purple-600 dark:text-purple-400 uppercase tracking-tight">Tỉ lệ duyệt</div>
                                            </div>
                                        </div>
                                </div>
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


                            </div>
                        </FadeInOnView>
                    </div>
                </div>
            </div>
        </div>
    );
}