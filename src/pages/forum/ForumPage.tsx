// src/pages/forum/ForumPage.tsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    MessageSquare,
    Search,
    Filter,
    TrendingUp,
    Clock,
    Users,
    ThumbsUp,
    Eye,
    Plus,
    ArrowRight,
    Sparkles,
    Bookmark,
    Tag,
    ChevronRight
} from "lucide-react";
import { useAuth } from "@/app/providers/AuthProvider";
import GradientText from "@/shared/ui/GradientText";
import Floating from "@/shared/ui/Floatting";
import FadeInOnView from "@/shared/ui/FadeInOnView";
import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

interface ForumCategory {
    id: number;
    name: string;
    description: string;
    icon: React.ReactNode;
    threadCount: number;
    postCount: number;
    latestThread?: {
        title: string;
        author: string;
        time: Date;
    };
    color: string;
}

interface ForumThread {
    id: number;
    title: string;
    author: {
        name: string;
        avatar: string;
        role: string;
    };
    category: string;
    content?: string;
    replies: number;
    views: number;
    likes: number;
    isPinned: boolean;
    isHot: boolean;
    lastActivity: Date;
    tags: string[];
}

export default function ForumPage() {
    const { user } = useAuth();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [threads, setThreads] = useState<ForumThread[]>([]);
    const [categories, setCategories] = useState<ForumCategory[]>([]);

    function linkify(text: string) {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlRegex, url => {
            return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-emerald-600 underline hover:text-emerald-700">${url}</a>`;
        });
    }


    // Mock data
    useEffect(() => {
        const mockCategories: ForumCategory[] = [
            {
                id: 1,
                name: "Học thuật & Ôn tập",
                description: "Thảo luận về các môn học, phương pháp ôn tập",
                icon: <Bookmark className="h-5 w-5" />,
                threadCount: 245,
                postCount: 1245,
                latestThread: {
                    title: "Cách học hiệu quả môn Toán rời rạc",
                    author: "Nguyễn Văn A",
                    time: new Date(Date.now() - 1000 * 60 * 30)
                },
                color: "from-emerald-500 to-teal-400"
            },
            {
                id: 2,
                name: "Đề thi & Tài liệu",
                description: "Chia sẻ đề thi, tài liệu học tập",
                icon: <TrendingUp className="h-5 w-5" />,
                threadCount: 189,
                postCount: 892,
                latestThread: {
                    title: "[Share] Bộ đề thi cuối kỳ các năm",
                    author: "Trần Thị B",
                    time: new Date(Date.now() - 1000 * 60 * 60 * 2)
                },
                color: "from-amber-500 to-orange-400"
            },
            {
                id: 3,
                name: "Hỏi đáp",
                description: "Đặt câu hỏi và nhận giải đáp từ cộng đồng",
                icon: <MessageSquare className="h-5 w-5" />,
                threadCount: 342,
                postCount: 2045,
                latestThread: {
                    title: "Câu hỏi về thuật toán Dijkstra",
                    author: "Lê Văn C",
                    time: new Date(Date.now() - 1000 * 60 * 15)
                },
                color: "from-blue-500 to-cyan-400"
            },
            {
                id: 4,
                name: "Thông báo & Sự kiện",
                description: "Thông báo từ ban quản trị và các sự kiện sắp diễn ra",
                icon: <Sparkles className="h-5 w-5" />,
                threadCount: 56,
                postCount: 189,
                latestThread: {
                    title: "Cuộc thi lập trình sắp diễn ra",
                    author: "Admin",
                    time: new Date(Date.now() - 1000 * 60 * 60 * 24)
                },
                color: "from-purple-500 to-pink-400"
            },
            {
                id: 5,
                name: "Góc giải trí",
                description: "Thảo luận ngoài lề, chia sẻ cuộc sống sinh viên",
                icon: <Users className="h-5 w-5" />,
                threadCount: 178,
                postCount: 945,
                latestThread: {
                    title: "Địa điểm café học nhóm tốt nhất",
                    author: "Phạm Thị D",
                    time: new Date(Date.now() - 1000 * 60 * 45)
                },
                color: "from-rose-500 to-red-400"
            }
        ];

        const mockThreads: ForumThread[] = [
            {
                id: 1,
                title: "Giới thiệu trang web vẽ đồ thị hiệu quả",
                author: {
                    name: "Trần Minh Phú",
                    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=k%C3%A1dhqqwewqecbhduwkd1dsfhrtyjwehjrwer",
                    role: "Sinh viên"
                },
                category: "Học thuật & Ôn tập",
                content: "📊 Giới thiệu GraphBuilder – Công cụ vẽ đồ thị trực tuyến cực nhanh!\n\nBạn cần vẽ đồ thị đẹp – nhanh – miễn phí? 🚀 Hãy thử ngay GraphBuilder!\n\n👉 Truy cập: https://tranminhphu7425.github.io/graphbuilder/\n\nVẽ đồ thị chưa bao giờ dễ đến thế! 🤩",
                replies: 42,
                views: 1250,
                likes: 89,
                isPinned: true,
                isHot: true,
                lastActivity: new Date(Date.now() - 1000 * 60 * 30),
                tags: ["Lập trình", "Học tập", "Tips"]
            },
            {
                id: 2,
                title: "Nhóm học tập môn Kiến trúc máy tính! Tại sao lại không tham gia?",
                author: {
                    name: "Trần Minh Phú",
                    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=k%C3%A1dhqqwewqecbhduwkd1dsfhrtyjwehjrwer",
                    role: "Sinh viên"
                },
                category: "Hỏi đáp",
                content: "Bạn đang tìm kiếm những nguồn tài liệu nào để giúp cho công việc ôn thi môn Kiến trúc máy tính\nHãy tham gia nhóm Classroom này để học hiệu quả hơn?\nhttps://classroom.google.com/u/0/c/NjExNjQ5MzQzNTI2",
                replies: 18,
                views: 320,
                likes: 15,
                isPinned: false,
                isHot: true,
                lastActivity: new Date(Date.now() - 1000 * 60 * 15),
                tags: ["Lập trình", "Học tập", "Tips"]
            },
            {
                id: 3,
                title: "Tổng hợp đề thi môn Cấu trúc dữ liệu các năm",
                author: {
                    name: "Lê Văn C",
                    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=LeVanC",
                    role: "Cựu sinh viên"
                },
                category: "Đề thi & Tài liệu",
                replies: 56,
                views: 2100,
                likes: 142,
                isPinned: true,
                isHot: false,
                lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 5),
                tags: ["Tài liệu", "Đề thi", "Share"]
            },
            {
                id: 4,
                title: "Thảo luận về xu hướng AI trong giáo dục",
                author: {
                    name: "Phạm Thị D",
                    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PhamThiD",
                    role: "Nghiên cứu sinh"
                },
                category: "Học thuật & Ôn tập",
                replies: 31,
                views: 890,
                likes: 47,
                isPinned: false,
                isHot: true,
                lastActivity: new Date(Date.now() - 1000 * 60 * 20),
                tags: ["AI", "Giáo dục", "Thảo luận"]
            },
            {
                id: 5,
                title: "Buổi workshop: Kỹ năng phỏng vấn xin việc",
                author: {
                    name: "Admin",
                    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
                    role: "Quản trị viên"
                },
                category: "Thông báo & Sự kiện",
                replies: 12,
                views: 450,
                likes: 28,
                isPinned: true,
                isHot: false,
                lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 10),
                tags: ["Sự kiện", "Workshop", "Kỹ năng"]
            }
        ];

        setCategories(mockCategories);
        setThreads(mockThreads);
    }, []);

    const filteredThreads = threads.filter(thread => {
        const matchesSearch = thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            thread.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesCategory = selectedCategory === "all" || thread.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="forum-page bg-slate-50 dark:bg-slate-800 min-h-screen">
            {/* ====== HERO HEADER ====== */}
            <section className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                {/* Blur blobs */}
                <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-white/10 blur-2xl dark:bg-emerald-400/10" />
                <div className="pointer-events-none absolute -right-16 top-10 h-64 w-64 rounded-full bg-white/10 blur-2xl dark:bg-purple-400/10" />

                <div className="relative z-10 mx-auto max-w-7xl px-6 py-16">
                    <div className="text-center text-white">
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ type: "spring", stiffness: 160, damping: 18 }}
                            className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/20 backdrop-blur dark:bg-white/5 dark:ring-white/10"
                        >
                            <Sparkles className="h-4 w-4 text-white dark:text-emerald-300" />
                            <span className="text-white dark:text-gray-200">Diễn đàn QuizUniverse • Nơi kết nối cộng đồng</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 }}
                            className="text-4xl md:text-5xl font-black leading-tight text-white dark:text-gray-100"
                        >
                            Diễn đàn{" "}
                            <GradientText className="mx-auto text-4xl md:text-5xl font-[Poppins]">
                                QuizUniverse
                            </GradientText>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="mt-4 mx-auto max-w-2xl text-white/90 dark:text-gray-300"
                        >
                            Nơi trao đổi, chia sẻ kiến thức và kinh nghiệm học tập.
                            Thảo luận về các môn học, phương pháp ôn tập và nhận hỗ trợ từ cộng đồng.
                        </motion.p>

                        {/* Search Bar */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 }}
                            className="mt-8 mx-auto max-w-2xl"
                        >
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 dark:text-gray-300" />
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm chủ đề, thẻ tag hoặc nội dung..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full rounded-full bg-white/10 dark:bg-white/5 pl-12 pr-4 py-3 text-white dark:text-gray-100 placeholder-gray-300 dark:placeholder-gray-400 ring-1 ring-white/30 dark:ring-white/20 backdrop-blur transition-all focus:bg-white/15 dark:focus:bg-white/10 focus:ring-2 focus:ring-white/50 dark:focus:ring-white/40 focus:outline-none"
                                />
                                <button className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-emerald-500 dark:bg-emerald-600 p-2 hover:bg-emerald-400 dark:hover:bg-emerald-500 transition-colors">
                                    <Search className="h-4 w-4 text-white" />
                                </button>
                            </div>
                        </motion.div>

                        {/* Floating elements */}
                        <Floating distance={12} duration={7} className="pointer-events-none absolute top-6 left-8">
                            <div className="rounded-xl bg-gradient-to-br from-amber-300 to-rose-300 dark:from-amber-400 dark:to-rose-400 p-2 shadow-lg -rotate-6">
                                <span className="text-xs font-black text-rose-700 dark:text-rose-800">NEW!</span>
                            </div>
                        </Floating>

                        <Floating distance={10} duration={6} className="pointer-events-none absolute top-12 right-8">
                            <div className="rounded-full bg-gradient-to-br from-purple-400 to-indigo-400 dark:from-purple-500 dark:to-indigo-500 p-3 shadow-xl rotate-12">
                                <MessageSquare className="h-4 w-4 text-white" />
                            </div>
                        </Floating>
                    </div>
                </div>
            </section>

            {/* ====== MAIN CONTENT ====== */}
            <div className="mx-auto max-w-7xl px-6 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left sidebar - Categories */}
                    <div className="lg:w-1/4">
                        <FadeInOnView amount={0.2}>
                            <div className="sticky top-8 space-y-6">
                                {/* Create New Thread */}
                                {user && (
                                    <Link
                                        to="/forum/create"
                                        className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 dark:from-emerald-600 dark:to-green-600 px-4 py-3 font-semibold text-white shadow-lg hover:from-emerald-600 hover:to-green-600 dark:hover:from-emerald-700 dark:hover:to-green-700 transition-all"
                                    >
                                        <Plus className="h-5 w-5" />
                                        Tạo chủ đề mới
                                    </Link>
                                )}

                                {/* Category Filter */}
                                <div className="rounded-xl bg-white dark:bg-slate-900 p-6 shadow-lg border border-emerald-100 dark:border-slate-700">
                                    <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-emerald-900 dark:text-emerald-300">
                                        <Filter className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                        Danh mục
                                    </h3>
                                    <div className="space-y-2">
                                        <button
                                            onClick={() => setSelectedCategory("all")}
                                            className={`w-full rounded-lg px-4 py-2 text-left transition-colors ${selectedCategory === "all"
                                                ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300"
                                                : "hover:bg-slate-100 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300"
                                                }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span>Tất cả chủ đề</span>
                                                <span className="text-sm text-gray-500 dark:text-gray-400">{threads.length}</span>
                                            </div>
                                        </button>
                                        {categories.map(category => (
                                            <button
                                                key={category.id}
                                                onClick={() => setSelectedCategory(category.name)}
                                                className={`w-full rounded-lg px-4 py-2 text-left transition-colors ${selectedCategory === category.name
                                                    ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300"
                                                    : "hover:bg-slate-100 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300"
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`rounded-lg bg-gradient-to-br ${category.color} p-2`}>
                                                            <div className="text-white">
                                                                {category.icon}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="font-medium">{category.name}</div>
                                                            <div className="text-xs text-gray-500 dark:text-gray-400">{category.threadCount} chủ đề</div>
                                                        </div>
                                                    </div>
                                                    <ChevronRight className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Popular Tags */}
                                <div className="rounded-xl bg-white dark:bg-slate-900 p-6 shadow-lg border border-emerald-100 dark:border-slate-700">
                                    <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-emerald-900 dark:text-emerald-300">
                                        <Tag className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                        Thẻ phổ biến
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {["Học tập", "Lập trình", "Đề thi", "Thảo luận", "Hỏi đáp", "Tài liệu", "Tips", "Workshop"].map(tag => (
                                            <button
                                                key={tag}
                                                onClick={() => setSearchQuery(tag)}
                                                className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-sm text-gray-700 dark:text-gray-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                                            >
                                                #{tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </FadeInOnView>
                    </div>

                    {/* Right content - Threads */}
                    <div className="lg:w-3/4">
                        {/* Stats */}
                        <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 dark:from-emerald-600 dark:to-teal-500 p-6 text-white shadow-lg">
                                <div className="text-2xl font-bold">{threads.length}</div>
                                <div className="text-sm opacity-90">Chủ đề đang thảo luận</div>
                            </div>
                            <div className="rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 dark:from-blue-600 dark:to-cyan-500 p-6 text-white shadow-lg">
                                <div className="text-2xl font-bold">{categories.reduce((acc, cat) => acc + cat.postCount, 0)}</div>
                                <div className="text-sm opacity-90">Bài viết</div>
                            </div>
                            <div className="rounded-xl bg-gradient-to-br from-amber-500 to-orange-400 dark:from-amber-600 dark:to-orange-500 p-6 text-white shadow-lg">
                                <div className="text-2xl font-bold">1,245</div>
                                <div className="text-sm opacity-90">Thành viên tham gia</div>
                            </div>
                            <div className="rounded-xl bg-gradient-to-br from-purple-500 to-pink-400 dark:from-purple-600 dark:to-pink-500 p-6 text-white shadow-lg">
                                <div className="text-2xl font-bold">42</div>
                                <div className="text-sm opacity-90">Chủ đề hôm nay</div>
                            </div>
                        </div>

                        {/* Threads List */}
                        <FadeInOnView amount={0.1}>
                            <div className="space-y-4">
                                {filteredThreads.map(thread => (
                                    <motion.div
                                        key={thread.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className={`rounded-xl border border-emerald-100 dark:border-slate-700 bg-gradient-to-br from-white to-emerald-50 dark:from-slate-900 dark:to-slate-800 p-6 shadow-lg transition-all hover:shadow-xl ${thread.isPinned
                                            ? 'ring-2 ring-emerald-300 dark:ring-emerald-700'
                                            : ''
                                            }`}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    {thread.isPinned && (
                                                        <span className="rounded-full bg-amber-500 dark:bg-amber-600 px-2 py-1 text-xs font-semibold text-white">
                                                            Ghim
                                                        </span>
                                                    )}
                                                    {thread.isHot && (
                                                        <span className="rounded-full bg-rose-500 dark:bg-rose-600 px-2 py-1 text-xs font-semibold text-white">
                                                            HOT
                                                        </span>
                                                    )}
                                                    <span className="rounded-full bg-emerald-100 dark:bg-emerald-900/30 px-2 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                                                        {thread.category}
                                                    </span>
                                                </div>

                                                <Link
                                                    to={`/forum/thread/${thread.id}`}
                                                    className="group"
                                                >
                                                    <h3 className="mb-2 text-lg font-bold text-emerald-900 dark:text-emerald-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-200 transition-colors">
                                                        {thread.title}
                                                    </h3>
                                                </Link>

                                                {thread.content && (
                                                    <div
                                                        className="mb-3 text-gray-700 dark:text-gray-300 whitespace-pre-line"
                                                        dangerouslySetInnerHTML={{
                                                            __html: linkify(
                                                                thread.content.length > 250
                                                                    ? thread.content.substring(0, 250) + "..."
                                                                    : thread.content
                                                            )
                                                        }}
                                                    ></div>
                                                )}



                                                <div className="mb-4 flex flex-wrap gap-2">
                                                    {thread.tags.map(tag => (
                                                        <span
                                                            key={tag}
                                                            onClick={() => setSearchQuery(tag)}
                                                            className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs text-gray-700 dark:text-gray-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors cursor-pointer"
                                                        >
                                                            #{tag}
                                                        </span>
                                                    ))}
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <div className="flex items-center gap-2">
                                                            <img
                                                                src={thread.author.avatar}
                                                                alt={thread.author.name}
                                                                className="h-8 w-8 rounded-full ring-2 ring-emerald-100 dark:ring-emerald-900"
                                                            />
                                                            <div>
                                                                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                                    {thread.author.name}
                                                                </div>
                                                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                                                    {thread.author.role}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                                            <div className="flex items-center gap-1">
                                                                <MessageSquare className="h-4 w-4" />
                                                                {thread.replies} trả lời
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <Eye className="h-4 w-4" />
                                                                {thread.views} lượt xem
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <ThumbsUp className="h-4 w-4" />
                                                                {thread.likes} thích
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="text-right">
                                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                                            <Clock className="inline h-4 w-4 mr-1" />
                                                            {formatDistanceToNow(thread.lastActivity, {
                                                                addSuffix: true,
                                                                locale: vi
                                                            })}
                                                        </div>
                                                        <Link
                                                            to={`/forum/thread/${thread.id}`}
                                                            className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                                                        >
                                                            Xem chi tiết <ArrowRight className="h-4 w-4" />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Empty state */}
                            {filteredThreads.length === 0 && (
                                <div className="rounded-xl border border-dashed border-emerald-200 dark:border-slate-700 bg-gradient-to-br from-white to-emerald-50 dark:from-slate-900 dark:to-slate-800 p-12 text-center">
                                    <MessageSquare className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600 mb-4" />
                                    <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">
                                        Không tìm thấy chủ đề nào
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400 mb-6">
                                        Hãy thử tìm kiếm với từ khóa khác hoặc tạo chủ đề mới
                                    </p>
                                    {user && (
                                        <Link
                                            to="/forum/create"
                                            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 dark:from-emerald-600 dark:to-green-600 px-6 py-3 font-semibold text-white shadow-lg hover:from-emerald-600 hover:to-green-600 dark:hover:from-emerald-700 dark:hover:to-green-700 transition-all"
                                        >
                                            <Plus className="h-5 w-5" />
                                            Tạo chủ đề đầu tiên
                                        </Link>
                                    )}
                                </div>
                            )}
                        </FadeInOnView>
                    </div>
                </div>
            </div>
        </div>
    );
}