// src/pages/terms/TermsPage.tsx (cải thiện)
import { motion } from "framer-motion";
import {
  MdAutoAwesome as Sparkles,
  MdFavoriteBorder as Heart,
  MdReceiptLong as ScrollText,
  MdShield as Shield,
  MdLockOutline as Lock,
  MdPeopleOutline as Users,
  MdDescription as FileText,
  MdErrorOutline as AlertCircle,
  MdCheckCircle as CheckCircle,
  MdAutoStories as BookOpen,
  MdPublic as Globe,
  MdStorage as Database,
  MdAttachMoney as DollarSign,
  MdBalance as Scale,
  MdMailOutline as Mail
} from 'react-icons/md';
import Floating from "@/shared/ui/Floatting";
import AnimatedGradientBackground from "@/shared/ui/AnimatedGradientBackground";
import GradientText from "@/shared/ui/GradientText";
import TypewriterText from "@/shared/ui/TypewriterText";
import { Link } from "react-router-dom";

export default function TermsPage() {
  const sections = [
    {
      id: "usage",
      title: "Sử dụng dịch vụ",
      icon: <Users className="h-5 w-5" />,
      content: [
        "QuizUniverse là nền tảng cung cấp giải pháp quản lý ngân hàng câu hỏi và tạo đề thi trực tuyến, chỉ được sử dụng cho mục đích giáo dục, học tập và giảng dạy.",
        "Nghiêm cấm mọi hành vi sử dụng dịch vụ để phát tán nội dung vi phạm pháp luật Việt Nam, xâm phạm bản quyền, gian lận trong thi cử, phát tán mã độc hoặc thu thập dữ liệu trái phép.",
        "Người dùng từ 13 tuổi trở xuống cần có sự giám sát của phụ huynh hoặc người giám hộ khi sử dụng dịch vụ."
      ]
    },
    {
      id: "account",
      title: "Tài khoản người dùng",
      icon: <Shield className="h-5 w-5" />,
      content: [
        "Bạn phải cung cấp thông tin chính xác khi đăng ký tài khoản và có trách nhiệm cập nhật thông tin mới nhất.",
        "Bạn hoàn toàn chịu trách nhiệm về bảo mật thông tin đăng nhập và mọi hoạt động diễn ra dưới tài khoản của bạn.",
        "Chúng tôi có quyền tạm khóa hoặc xóa tài khoản nếu phát hiện vi phạm điều khoản sử dụng mà không cần báo trước."
      ]
    },
    {
      id: "intellectual",
      title: "Quyền sở hữu trí tuệ",
      icon: <BookOpen className="h-5 w-5" />,
      content: [
        "Mọi nội dung, giao diện, mã nguồn, thuật toán, thiết kế và logo thuộc bản quyền của QuizUniverse, được bảo hộ bởi luật pháp Việt Nam và quốc tế.",
        "Người dùng giữ bản quyền nội dung tải lên nhưng cấp cho QuizUniverse giấy phép sử dụng để vận hành dịch vụ.",
        "Mọi hành vi sao chép, phân phối trái phép nội dung từ QuizUniverse sẽ bị xử lý theo pháp luật."
      ]
    },
    {
      id: "content",
      title: "Quy định về nội dung",
      icon: <FileText className="h-5 w-5" />,
      content: [
        "Nội dung cấm trên hệ thống bao gồm: nội dung khiêu dâm, bạo lực, thông tin giả mạo, lừa đảo, phân biệt chủng tộc, tôn giáo, và tài liệu có chứa đáp án các kỳ thi chính thức.",
        "QuizUniverse có quyền kiểm duyệt, chỉnh sửa hoặc xóa bỏ nội dung vi phạm mà không cần thông báo trước."
      ]
    },
    {
      id: "liability",
      title: "Giới hạn trách nhiệm",
      icon: <Scale className="h-5 w-5" />,
      content: [
        "QuizUniverse không đảm bảo dịch vụ hoạt động liên tục, không gián đoạn hoặc tính phù hợp cho mọi mục đích sử dụng.",
        "Trong mọi trường hợp, trách nhiệm pháp lý của QuizUniverse không vượt quá phí dịch vụ bạn đã thanh toán (nếu có).",
        "Bạn đồng ý bồi thường cho QuizUniverse về mọi khiếu nại, thiệt hại phát sinh từ vi phạm điều khoản sử dụng của bạn."
      ]
    },
    {
      id: "privacy",
      title: "Bảo mật và dữ liệu",
      icon: <Lock className="h-5 w-5" />,
      content: [
        "Chúng tôi cam kết bảo vệ thông tin cá nhân theo Chính sách Bảo mật riêng.",
        "Dữ liệu của bạn được mã hóa trong quá trình truyền tải và lưu trữ trên hệ thống bảo mật cấp cao.",
        "Trường hợp bắt buộc theo yêu cầu pháp lý, chúng tôi có thể cung cấp thông tin người dùng cho cơ quan chức năng."
      ]
    },
    {
      id: "payment",
      title: "Thanh toán và dịch vụ trả phí",
      icon: <DollarSign className="h-5 w-5" />,
      content: [
        "Một số tính năng cao cấp có thể yêu cầu thanh toán phí sử dụng.",
        "Chính sách hoàn tiền: Không hoàn tiền cho gói dịch vụ đã sử dụng. Có thể hoàn tiền theo tỷ lệ cho gói chưa sử dụng trong trường hợp hủy dịch vụ."
      ]
    },
    {
      id: "general",
      title: "Điều khoản chung",
      icon: <Globe className="h-5 w-5" />,
      content: [
        "Điều khoản này có thể được cập nhật định kỳ, phiên bản mới sẽ có hiệu lực ngay khi được đăng tải trên website.",
        "Mọi tranh chấp phát sinh sẽ được ưu tiên giải quyết thông qua thương lượng. Trường hợp không đạt được thỏa thuận, sẽ được giải quyết tại tòa án có thẩm quyền tại Việt Nam.",
        "Nếu có bất kỳ điều khoản nào bị vô hiệu, phần còn lại vẫn giữ nguyên hiệu lực."
      ]
    }
  ];

  return (
    <div className="terms-page min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* ====== HERO SECTION ====== */}
      <section className="relative overflow-hidden">
        <AnimatedGradientBackground />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/20 backdrop-blur"
          >
            <ScrollText className="h-4 w-4" />
            QuizUniverse • Pháp lý
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-center  text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] font-black leading-tight"
          >
            <TypewriterText text="Điều khoản" />
            <GradientText className="flex mx-auto justify-center text-[2.5rem] md:text-[3rem] lg:text-[3.5rem]">
              Sử dụng dịch vụ
            </GradientText>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl text-center text-white/90 dark:text-gray-300"
          >
            Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-6 flex justify-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
              <AlertCircle className="h-4 w-4 text-yellow-300" />
              <span className="text-sm text-white/80">
                Khi sử dụng QuizUniverse, bạn đồng ý tuân thủ đầy đủ các điều khoản
              </span>
            </div>
          </motion.div>
        </div>

        {/* Floating decorations */}
        <Floating distance={12} duration={7} className="pointer-events-none absolute -top-6 -left-8">
          <div className="rounded-xl bg-gradient-to-br from-amber-300 to-rose-300 p-2 shadow-lg -rotate-6">
            <span className="text-xs font-black text-rose-700">TERMS</span>
          </div>
        </Floating>

        <Floating distance={10} duration={6} className="pointer-events-none absolute top-12 -right-6">
          <div className="rounded-full bg-gradient-to-br from-purple-400 to-indigo-400 p-3 shadow-xl rotate-12">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
        </Floating>

        <Floating distance={14} duration={8} className="pointer-events-none absolute bottom-12 left-6">
          <div className="rounded-xl bg-gradient-to-br from-emerald-300 to-cyan-300 px-3 py-1 shadow-lg rotate-3">
            <span className="text-xs font-bold text-emerald-900">LEGAL</span>
          </div>
        </Floating>
      </section>

      {/* ====== CONTENT SECTION ====== */}
      <section className="mx-auto max-w-7xl px-6 py-12 pb-20">
        {/* Last updated banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 p-4 text-center backdrop-blur-sm ring-1 ring-emerald-500/20"
        >
          <p className="text-sm text-emerald-700 dark:text-emerald-300">
            📋 Phiên bản mới nhất | Có hiệu lực từ {new Date().toLocaleDateString('vi-VN')}
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Sidebar navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24 rounded-2xl bg-white p-4 shadow-lg ring-1 ring-emerald-100 dark:bg-slate-800 dark:ring-slate-700">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                <ScrollText className="h-4 w-4 text-emerald-500" />
                Mục lục
              </h3>
              <nav className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" })}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-gray-600 transition-all hover:bg-emerald-50 hover:text-emerald-600 dark:text-gray-400 dark:hover:bg-emerald-900/30 dark:hover:text-emerald-300"
                  >
                    {section.icon}
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Main content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-emerald-100 dark:bg-slate-800 dark:ring-slate-700 md:p-8">
              {/* Agreement notice */}
              <div className="mb-8 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 p-4 dark:from-emerald-950/30 dark:to-teal-950/30">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200">
                      Bằng việc sử dụng dịch vụ, bạn xác nhận đã đọc, hiểu và đồng ý với tất cả các điều khoản nêu trên.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sections */}
              <div className="space-y-8">
                {sections.map((section, idx) => (
                  <motion.div
                    key={section.id}
                    id={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 + idx * 0.05 }}
                    className="scroll-mt-24"
                  >
                    <div className="flex items-center gap-3 border-b border-emerald-200 pb-3 dark:border-emerald-800">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-teal-400 text-white shadow-md">
                        {section.icon}
                      </div>
                      <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                        {section.title}
                      </h2>
                    </div>
                    <div className="mt-4 space-y-3">
                      {section.content.map((paragraph, pIdx) => (
                        <p key={pIdx} className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {paragraph.startsWith("•") || paragraph.startsWith("-") ? (
                            <span className="flex items-start gap-2">
                              <span className="text-emerald-500 mt-1">•</span>
                              <span>{paragraph.substring(1)}</span>
                            </span>
                          ) : paragraph.match(/^\d+\.\d+\./) ? (
                            <span className="font-medium text-gray-700 dark:text-gray-300">
                              {paragraph}
                            </span>
                          ) : (
                            paragraph
                          )}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Contact section */}
              <div className="mt-10 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 p-6 text-center">
                <Mail className="mx-auto h-8 w-8 text-emerald-500 mb-3" />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  Mọi thắc mắc vui lòng liên hệ
                </h3>
                <a 
                  href="mailto:support@quizuniverse.edu.vn"
                  className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
                >
                  support@quizuniverse.edu.vn
                </a>
              </div>

              {/* Back to top */}
              <div className="mt-8 text-center">
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700 transition-all hover:bg-emerald-200 dark:bg-emerald-900/50 dark:text-emerald-300 dark:hover:bg-emerald-900"
                >
                  <ScrollText className="h-4 w-4" />
                  Lên đầu trang
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====== FOOTER NOTE ====== */}
      <section className="border-t border-emerald-200 bg-white/50 dark:border-slate-800 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-6 py-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} QuizUniverse. Bảo lưu mọi quyền lợi.
          </p>
          <div className="mt-2 flex justify-center gap-4 text-xs text-gray-400 dark:text-gray-500">
            <Link to="/security" className="hover:text-emerald-600 transition-colors">Chính sách bảo mật</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-emerald-600 transition-colors">Điều khoản sử dụng</Link>
          </div>
        </div>
      </section>
    </div>
  );
}