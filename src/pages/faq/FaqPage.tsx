// src/pages/faq/FaqPage.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  HelpCircle,
  BookOpen,
  Lock,
  Shield,
  CreditCard,
  Users,
  Download,
  Smartphone,
  Bell,
  Settings,
  FileQuestion,
  Trophy,
  Clock,
  Eye,
  Share2,
  Star,
  Zap,
  Search
} from "lucide-react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  icon: React.ReactNode;
  category: string;
}

export default function FaqPage() {
  const [openId, setOpenId] = useState<number | null>(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const faqData: FAQItem[] = [
    // Cách làm bài
    {
      id: 1,
      question: "Làm thế nào để bắt đầu làm bài thi?",
      answer: "Để bắt đầu làm bài thi, bạn có thể: 1) Chọn môn học từ trang chủ 2) Chọn bộ đề thi phù hợp 3) Nhấn nút 'Bắt đầu làm bài'. Hệ thống sẽ hiển thị giao diện làm bài với đồng hồ đếm ngược và các câu hỏi.",
      icon: <BookOpen className="h-5 w-5" />,
      category: "làm bài"
    },
    {
      id: 2,
      question: "Có thể làm bài thi trên điện thoại không?",
      answer: "Có, QuizUniverse hoàn toàn tương thích với điện thoại di động. Bạn có thể truy cập qua trình duyệt web trên điện thoại và trải nghiệm đầy đủ các tính năng như trên máy tính.",
      icon: <Smartphone className="h-5 w-5" />,
      category: "làm bài"
    },
    {
      id: 3,
      question: "Làm sao để nộp bài trước thời gian?",
      answer: "Bạn có thể nộp bài bất kỳ lúc nào bằng cách nhấn nút 'Nộp bài' ở góc trên bên phải màn hình. Hệ thống sẽ xác nhận trước khi nộp.",
      icon: <Clock className="h-5 w-5" />,
      category: "làm bài"
    },
    {
      id: 4,
      question: "Có thể xem lại đáp án sau khi nộp bài không?",
      answer: "Có, sau khi nộp bài bạn sẽ được chuyển đến trang kết quả chi tiết. Tại đây bạn có thể xem từng câu hỏi, đáp án của bạn, đáp án đúng và lời giải thích chi tiết.",
      icon: <Eye className="h-5 w-5" />,
      category: "làm bài"
    },
    {
      id: 5,
      question: "Có giới hạn số lần làm bài không?",
      answer: "Không có giới hạn số lần làm bài. Bạn có thể làm đi làm lại các đề thi để nâng cao kỹ năng và kiến thức của mình.",
      icon: <Zap className="h-5 w-5" />,
      category: "làm bài"
    },

    // Quên mật khẩu
    {
      id: 6,
      question: "Tôi quên mật khẩu, phải làm sao?",
      answer: "Truy cập trang đăng nhập, nhấn vào 'Quên mật khẩu'. Nhập email đã đăng ký, hệ thống sẽ gửi link đặt lại mật khẩu. Link có hiệu lực trong 24 giờ.",
      icon: <Lock className="h-5 w-5" />,
      category: "tài khoản"
    },
    {
      id: 7,
      question: "Tôi không nhận được email đặt lại mật khẩu",
      answer: "Hãy kiểm tra thư mục Spam/Junk. Nếu vẫn không thấy, hãy đợi 5-10 phút. Vẫn không nhận được? Liên hệ support@quizuniverse.com với tên tài khoản và email đăng ký.",
      icon: <Bell className="h-5 w-5" />,
      category: "tài khoản"
    },
    {
      id: 8,
      question: "Có thể đổi mật khẩu trong tài khoản không?",
      answer: "Có, vào Cài đặt → Tài khoản → Đổi mật khẩu. Bạn cần nhập mật khẩu cũ và mật khẩu mới (tối thiểu 8 ký tự, bao gồm chữ hoa, chữ thường và số).",
      icon: <Settings className="h-5 w-5" />,
      category: "tài khoản"
    },
    {
      id: 9,
      question: "Tài khoản của tôi bị khóa do nhập sai mật khẩu nhiều lần",
      answer: "Tài khoản sẽ tự động mở khóa sau 30 phút. Nếu cần mở khóa ngay, hãy liên hệ bộ phận hỗ trợ với thông tin xác minh tài khoản.",
      icon: <Shield className="h-5 w-5" />,
      category: "tài khoản"
    },

    // Quy định thi
    {
      id: 10,
      question: "Quy định về thời gian làm bài?",
      answer: "Mỗi đề thi có thời gian quy định riêng. Khi hết giờ, hệ thống sẽ tự động nộp bài. Thời gian còn lại được hiển thị ở góc trên bên phải.",
      icon: <Clock className="h-5 w-5" />,
      category: "quy định"
    },
    {
      id: 11,
      question: "Có được phép trao đổi trong khi thi không?",
      answer: "Không. QuizUniverse khuyến khích tự lực làm bài. Mọi hành vi gian lận (trao đổi, sử dụng tài liệu trái phép) có thể dẫn đến khóa tài khoản.",
      icon: <Users className="h-5 w-5" />,
      category: "quy định"
    },
    {
      id: 12,
      question: "Điểm số được tính như thế nào?",
      answer: "Mỗi câu đúng được 1 điểm. Câu sai không bị trừ điểm. Tổng điểm = (Số câu đúng / Tổng số câu) × 10. Điểm sẽ được làm tròn đến 1 chữ số thập phân.",
      icon: <Trophy className="h-5 w-5" />,
      category: "quy định"
    },
    {
      id: 13,
      question: "Có thể tạm dừng bài thi không?",
      answer: "Không thể tạm dừng khi đã bắt đầu làm bài. Hãy đảm bảo bạn có đủ thời gian trước khi bắt đầu. Nếu thoát giữa chừng, bài làm sẽ được tính là đã nộp.",
      icon: <FileQuestion className="h-5 w-5" />,
      category: "quy định"
    },
    {
      id: 14,
      question: "Chính sách khiếu nại điểm thi?",
      answer: "Nếu có thắc mắc về đáp án, bạn có thể khiếu nại trong vòng 7 ngày kể từ khi làm bài. Gửi email đến support@quizuniverse.com với mã bài thi và câu hỏi cần xem xét.",
      icon: <Star className="h-5 w-5" />,
      category: "quy định"
    },

    // Thanh toán & Tài khoản
    {
      id: 15,
      question: "Có mất phí để sử dụng không?",
      answer: "QuizUniverse có cả phiên bản miễn phí và trả phí. Phiên bản miễn phí cung cấp đầy đủ các đề thi cơ bản. Phiên bản Premium mở khóa tính năng nâng cao.",
      icon: <CreditCard className="h-5 w-5" />,
      category: "thanh toán"
    },
    {
      id: 16,
      question: "Làm thế nào để nâng cấp tài khoản Premium?",
      answer: "Truy cập Cài đặt → Nâng cấp tài khoản. Chọn gói phù hợp (tháng/quý/năm) và thanh toán qua thẻ ngân hàng, ví điện tử hoặc chuyển khoản.",
      icon: <Zap className="h-5 w-5" />,
      category: "thanh toán"
    },
    {
      id: 17,
      question: "Có thể xuất kết quả ra file không?",
      answer: "Có, ở trang kết quả thi, nhấn nút 'Tải kết quả' để xuất ra PDF hoặc hình ảnh. Phiên bản Premium cho phép xuất nhiều định dạng hơn.",
      icon: <Download className="h-5 w-5" />,
      category: "tính năng"
    },
    {
      id: 18,
      question: "Có thể chia sẻ kết quả lên mạng xã hội không?",
      answer: "Có, tính năng chia sẻ kết quả có sẵn trên trang kết quả. Bạn có thể chia sẻ điểm số và thành tích lên Facebook, Twitter hoặc sao chép link.",
      icon: <Share2 className="h-5 w-5" />,
      category: "tính năng"
    }
  ];

  const categories = [
    { id: "all", name: "Tất cả", icon: <HelpCircle className="h-4 w-4" />, count: faqData.length },
    { id: "làm bài", name: "Cách làm bài", icon: <BookOpen className="h-4 w-4" />, count: faqData.filter(f => f.category === "làm bài").length },
    { id: "tài khoản", name: "Tài khoản", icon: <Lock className="h-4 w-4" />, count: faqData.filter(f => f.category === "tài khoản").length },
    { id: "quy định", name: "Quy định thi", icon: <Shield className="h-4 w-4" />, count: faqData.filter(f => f.category === "quy định").length },
    { id: "thanh toán", name: "Thanh toán", icon: <CreditCard className="h-4 w-4" />, count: faqData.filter(f => f.category === "thanh toán").length },
    { id: "tính năng", name: "Tính năng", icon: <Zap className="h-4 w-4" />, count: faqData.filter(f => f.category === "tính năng").length }
  ];

  const filteredFaqs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleAccordion = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-emerald-50 dark:from-slate-900 dark:to-slate-800">
  <div className="container mx-auto px-4 py-12 max-w-5xl">
    {/* Header */}
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-12"
    >
      <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 dark:bg-emerald-900/40 px-4 py-2 mb-4">
        <HelpCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
        <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
          Câu hỏi thường gặp
        </span>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
        Chúng tôi có thể giúp gì cho bạn?
      </h1>
      
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Tìm câu trả lời cho những câu hỏi phổ biến về QuizUniverse
      </p>
    </motion.div>

    {/* Search Bar */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="mb-8"
    >
      <div className="relative max-w-2xl mx-auto">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 dark:text-gray-400" />
        <input
          type="text"
          placeholder="Tìm kiếm câu hỏi..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-4 rounded-xl border border-emerald-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm dark:shadow-slate-900/50"
        />
      </div>
    </motion.div>

    {/* Categories */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-10"
    >
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
              selectedCategory === category.id
                ? "bg-emerald-600 dark:bg-emerald-700 text-white shadow-lg"
                : "bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-slate-700 border border-emerald-200 dark:border-slate-600"
            }`}
          >
            {category.icon}
            <span className="font-medium">{category.name}</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                selectedCategory === category.id
                  ? "bg-white/20"
                  : "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300"
              }`}
            >
              {category.count}
            </span>
          </button>
        ))}
      </div>
    </motion.div>

    {/* FAQ Accordion */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="space-y-4"
    >
      {filteredFaqs.length > 0 ? (
        filteredFaqs.map((faq) => (
          <motion.div
            key={faq.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg dark:shadow-slate-900/30 overflow-hidden border border-emerald-100 dark:border-slate-700"
          >
            <button
              onClick={() => toggleAccordion(faq.id)}
              className="w-full p-6 text-left flex items-center justify-between hover:bg-emerald-50 dark:hover:bg-slate-700 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-xl ${
                    openId === faq.id
                      ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400"
                      : "bg-slate-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {faq.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {faq.question}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300">
                      {faq.category}
                    </span>
                  </div>
                </div>
              </div>

              <motion.div
                animate={{ rotate: openId === faq.id ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className={`p-2 rounded-full ${
                  openId === faq.id
                    ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400"
                    : "bg-slate-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400"
                }`}
              >
                <ChevronDown className="h-5 w-5" />
              </motion.div>
            </button>

            <AnimatePresence>
              {openId === faq.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pt-2">
                    <div className="pl-16">
                      <div className="prose prose-emerald dark:prose-invert max-w-none">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>

                      {/* Related Actions */}
                      {faq.category === "tài khoản" && faq.id === 6 && (
                        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                          <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
                            <strong>Hướng dẫn nhanh:</strong>
                          </p>
                          <Link
                            to="/forgot-password"
                            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                          >
                            Nhấn vào đây để đặt lại mật khẩu ngay →
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <HelpCircle className="h-16 w-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Không tìm thấy câu hỏi phù hợp
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Hãy thử từ khóa tìm kiếm khác hoặc liên hệ với chúng tôi
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 dark:bg-emerald-700 text-white font-semibold hover:bg-emerald-700 dark:hover:bg-emerald-800 transition-colors"
          >
            Liên hệ hỗ trợ
          </Link>
        </motion.div>
      )}
    </motion.div>

    {/* Contact Section */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mt-16 bg-gradient-to-r from-emerald-500 to-teal-400 dark:from-emerald-600 dark:to-teal-500 rounded-3xl p-8 text-white shadow-2xl"
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Vẫn cần hỗ trợ?</h2>
        <p className="text-emerald-100 dark:text-emerald-200 mb-6">
          Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp đỡ bạn 24/7
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/contact"
            className="px-6 py-3 bg-white text-emerald-600 font-semibold rounded-full hover:bg-emerald-50 transition-colors"
          >
            Gửi yêu cầu hỗ trợ
          </Link>
          <a
            href="mailto:support@quizuniverse.com"
            className="px-6 py-3 bg-white/20 text-white font-semibold rounded-full hover:bg-white/30 transition-colors"
          >
            support@quizuniverse.com
          </a>
        </div>
        <p className="text-sm text-emerald-100 dark:text-emerald-200 mt-6">
          Thời gian phản hồi: Thông thường trong vòng 2 giờ làm việc
        </p>
      </div>
    </motion.div>

    {/* Quick Links */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-emerald-100 dark:border-slate-700 shadow-sm dark:shadow-slate-900/30">
        <div className="inline-flex p-3 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 mb-4">
          <BookOpen className="h-6 w-6" />
        </div>
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
          Hướng dẫn sử dụng
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Tìm hiểu cách sử dụng tất cả tính năng của QuizUniverse
        </p>
        <Link
          to="/quickguide"
          className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
        >
          Xem hướng dẫn →
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-emerald-100 dark:border-slate-700 shadow-sm dark:shadow-slate-900/30">
        <div className="inline-flex p-3 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 mb-4">
          <Shield className="h-6 w-6" />
        </div>
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
          Chính sách & Điều khoản
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Điều khoản sử dụng, chính sách bảo mật và quyền lợi người dùng
        </p>
        <Link
          to="/terms"
          className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
        >
          Xem chi tiết →
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-emerald-100 dark:border-slate-700 shadow-sm dark:shadow-slate-900/30">
        <div className="inline-flex p-3 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 mb-4">
          <Users className="h-6 w-6" />
        </div>
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
          Cộng đồng người dùng
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Tham gia cộng đồng để học hỏi và chia sẻ kinh nghiệm
        </p>
        <Link
          to="/forum"
          className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
        >
          Tham gia ngay →
        </Link>
      </div>
    </motion.div>
  </div>
</div>
  );
}