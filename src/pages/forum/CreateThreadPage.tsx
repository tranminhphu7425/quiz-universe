// src/pages/forum/CreateThreadPage.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  MdArrowBack as ArrowLeft,
  MdSend as Send,
  MdFormatListBulleted as List,
  MdTitle as Type,
  MdCategory as CategoryIcon,
  MdDescription as AlignLeft,
  MdLocalOffer as Hash,
  MdInfoOutline as AlertCircle,
  MdAutoAwesome as Sparkles,
  MdChat as MessageSquare,
  MdPeople as Users,
  MdTrendingUp as TrendingUp,
  MdGppGood as ShieldCheck
} from "react-icons/md";
import { useAuth } from "@/app/providers/AuthProvider";
import FadeInOnView from "@/shared/ui/FadeInOnView";
import Floating from "@/shared/ui/Floatting";
import AnimatedGradientBackground from "@/shared/ui/AnimatedGradientBackground";
import { toast } from "react-hot-toast";

const categories = [
  "Học thuật & Ôn tập",
  "Đề thi & Tài liệu",
  "Hỏi đáp",
  "Thông báo & Sự kiện",
  "Góc giải trí"
];

export default function CreateThreadPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Hỏi đáp");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const handleCreateThread = async () => {
    if (!title.trim()) {
      toast.error("Vui lòng nhập tiêu đề bài đăng");
      return;
    }
    if (!content.trim()) {
      toast.error("Nội dung bài đăng không được để trống");
      return;
    }

    const toastId = toast.loading("Đang đăng bài...");
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Creating thread:", { title, category, content, tags });
      toast.success("Đăng bài thành công!", { id: toastId });
      navigate("/forum");
    } catch (error) {
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại!", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-thread-page bg-slate-50 dark:bg-slate-800 min-h-screen">
      {/* ====== HEADER ====== */}
      <section className="relative overflow-hidden bg-gradient-to-r from-teal-600 via-emerald-600 to-green-500 dark:from-slate-900 dark:via-emerald-950 dark:to-slate-900">
        <AnimatedGradientBackground />
        
        {/* Blur blobs - Different colors than CreateSubject */}
        <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-white/5 blur-2xl dark:bg-teal-400/10" />
        <div className="pointer-events-none absolute -right-16 top-10 h-64 w-64 rounded-full bg-white/5 blur-2xl dark:bg-emerald-400/10" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-white">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 160, damping: 18 }}
                className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/20 backdrop-blur dark:bg-white/5 dark:ring-white/10"
              >
                <MessageSquare className="h-4 w-4 text-white dark:text-teal-300" />
                <span className="text-white dark:text-gray-200">Diễn đàn cộng đồng • Chia sẻ & Kết nối</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="text-3xl md:text-4xl font-black leading-tight text-white dark:text-gray-100"
              >
                Tạo bài đăng mới
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-4 text-white/90 dark:text-gray-300 max-w-2xl"
              >
                Lan tỏa tri thức và nhận được sự giúp đỡ từ hàng nghìn thành viên khác.
                Một bài đăng chất lượng sẽ giúp cộng đồng phát triển mạnh mẽ hơn.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-teal-400/20 to-emerald-400/20 blur-xl" />
                <div className="relative rounded-2xl bg-white/10 dark:bg-white/5 p-8 backdrop-blur-xl border border-white/20">
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="inline-flex p-3 rounded-full bg-teal-500/20 dark:bg-teal-400/20">
                        <Users className="h-10 w-10 text-teal-300 dark:text-teal-200" />
                      </div>
                      <div className="mt-3 text-xl font-bold text-white">Thảo luận</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Floating elements */}
          <Floating distance={12} duration={7} className="pointer-events-none absolute top-6 left-8">
            <div className="rounded-xl bg-gradient-to-br from-teal-300 to-emerald-300 p-2 shadow-lg -rotate-6">
              <span className="text-xs font-black text-teal-700">WRITE</span>
            </div>
          </Floating>

          <Floating distance={10} duration={6} className="pointer-events-none absolute top-12 right-8">
            <div className="rounded-full bg-gradient-to-br from-amber-400 to-orange-400 p-3 shadow-xl rotate-12">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
          </Floating>
        </div>
      </section>

      {/* ====== MAIN CONTENT ====== */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form Area */}
          <div className="lg:col-span-2">
            <FadeInOnView amount={0.1}>
              <div className="rounded-2xl bg-white dark:bg-slate-900 shadow-xl border border-emerald-100 dark:border-slate-700 overflow-hidden">
                <div className="p-8">
                  <h3 className="mb-6 text-xl font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-2">
                    <List className="h-6 w-6 text-emerald-500" />
                    Nội dung thảo luận
                  </h3>
                  
                  <div className="space-y-6">
                    {/* Tiêu đề */}
                    <div>
                      <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                        <Type className="h-4 w-4 text-emerald-500" />
                        Tiêu đề thảo luận <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Ví dụ: Cần xin tài liệu ôn tập môn Giải tích 1..."
                        className="w-full rounded-xl border border-emerald-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-gray-700 dark:text-gray-300 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-900 focus:outline-none transition-all"
                      />
                    </div>

                    {/* Danh mục & Tags */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                          <CategoryIcon className="h-4 w-4 text-emerald-500" />
                          Danh mục bài đăng
                        </label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full rounded-xl border border-emerald-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-gray-700 dark:text-gray-300 focus:border-emerald-400 focus:outline-none transition-all"
                        >
                          {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                          <Hash className="h-4 w-4 text-emerald-500" />
                          Thẻ gắn (Tags)
                        </label>
                        <input
                          type="text"
                          value={tags}
                          onChange={(e) => setTags(e.target.value)}
                          placeholder="Toán, Lập trình, Help..."
                          className="w-full rounded-xl border border-emerald-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-gray-700 dark:text-gray-300 focus:border-emerald-400 focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Nội dung */}
                    <div>
                      <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                        <AlignLeft className="h-4 w-4 text-emerald-500" />
                        Nội dung chi tiết <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Chia sẻ suy nghĩ, câu hỏi hoặc kiến thức của bạn tại đây..."
                        rows={10}
                        className="w-full rounded-xl border border-emerald-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-gray-700 dark:text-gray-300 focus:border-emerald-400 focus:outline-none transition-all resize-none"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-8 mt-4 border-t border-emerald-100 dark:border-slate-700">
                    <button
                      onClick={handleCreateThread}
                      disabled={loading}
                      className="flex-1 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 dark:from-teal-600 dark:to-emerald-600 px-6 py-4 font-bold text-white shadow-lg hover:brightness-105 transition-all disabled:opacity-50"
                    >
                      {loading ? "Đang xử lý..." : "Đăng bài ngay"}
                    </button>

                    <Link
                      to="/forum"
                      className="rounded-xl border-2 border-emerald-200 dark:border-slate-600 px-6 py-4 font-medium text-emerald-700 dark:text-emerald-300 text-center hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all"
                    >
                      Hủy bỏ
                    </Link>
                  </div>
                </div>
              </div>
            </FadeInOnView>
          </div>

          {/* Sidebar - Guidelines */}
          <div className="lg:col-span-1">
            <FadeInOnView amount={0.2}>
              <div className="sticky top-8 space-y-6">
                <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-lg border border-emerald-100 dark:border-slate-700">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-emerald-900 dark:text-emerald-300">
                    <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    Hướng dẫn đăng bài
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-500 text-xs font-bold text-white">1</div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        Đặt tiêu đề rõ ràng, mô tả đúng vấn đề cần thảo luận.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-500 text-xs font-bold text-white">2</div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        Chọn đúng danh mục giúp bài viết của bạn không bị trôi.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-500 text-xs font-bold text-white">3</div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        Sử dụng ngôn từ văn minh, tôn trọng các thành viên khác.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Benefits */}
                <div className="rounded-2xl bg-gradient-to-br from-teal-500/10 to-emerald-400/10 dark:from-teal-900/30 dark:to-emerald-900/30 p-6 border border-teal-200/50 dark:border-teal-700/30">
                  <h3 className="mb-4 text-lg font-bold text-teal-900 dark:text-teal-300 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Tại sao nên chia sẻ?
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                    <li className="flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-teal-500" />
                      Góp phần xây dựng thư viện tri thức
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-teal-500" />
                      Nhận được hỗ trợ nhanh nhất từ cộng đồng
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-teal-500" />
                      Tăng điểm uy tín cá nhân trên hệ thống
                    </li>
                  </ul>
                </div>

                {/* Warning */}
                <div className="rounded-2xl bg-rose-50 dark:bg-rose-900/20 p-5 border border-rose-200 dark:border-rose-700/30">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-6 w-6 text-rose-600 dark:text-rose-400 flex-shrink-0" />
                    <div className="text-sm text-rose-700 dark:text-rose-300">
                      <p className="font-bold">Lưu ý:</p>
                      <p className="mt-1 leading-relaxed">
                        Nội dung spam hoặc vi phạm quy tắc cộng đồng sẽ bị xóa mà không cần báo trước.
                      </p>
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
