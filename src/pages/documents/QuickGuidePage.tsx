import { motion } from "framer-motion";
import { BookOpen, CheckCircle, PlayCircle, ArrowRightCircle, Rocket, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

/**
 * QuickGuidePage – Trang Hướng dẫn nhanh cho QuizUniverse
 * - Giới thiệu các bước cơ bản
 * - Sử dụng animation từ AOS (Animate On Scroll) + Framer Motion
 * - Icon sinh động, màu sắc bắt mắt
 */

export default function QuickGuidePage() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const studentSteps = [
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "1. Đăng ký / Đăng nhập",
      desc: "Tạo tài khoản miễn phí để bắt đầu hành trình học tập của bạn.",
      color: "from-emerald-400 to-green-500",
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "2. Chọn môn học",
      desc: "Khám phá các môn học và chủ đề đa dạng theo chương trình.",
      color: "from-purple-400 to-violet-500",
    },
    {
      icon: <PlayCircle className="h-6 w-6" />,
      title: "3. Làm bài trắc nghiệm",
      desc: "Luyện tập theo bộ câu hỏi hoặc đề thi mẫu với chế độ kiểm tra thông minh.",
      color: "from-blue-400 to-indigo-500",
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "4. Nộp bài & xem kết quả",
      desc: "Xem điểm số ngay lập tức, cùng phân tích chi tiết từng câu hỏi.",
      color: "from-amber-400 to-orange-500",
    },
    {
      icon: <Rocket className="h-6 w-6" />,
      title: "5. Theo dõi tiến độ",
      desc: "Xem lịch sử làm bài, tiến độ cải thiện và mục tiêu học tập.",
      color: "from-rose-400 to-pink-500",
    },
  ];

  const teacherSteps = [
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "1. Đăng nhập với quyền giáo viên",
      desc: "Truy cập bằng tài khoản có quyền giáo viên hoặc quản trị.",
      color: "from-fuchsia-400 to-purple-500",
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "2. Tạo hoặc nhập kho câu hỏi",
      desc: "Tạo mới thủ công hoặc nhập hàng loạt từ Excel, GIFT, Moodle XML.",
      color: "from-yellow-400 to-yellow-500",
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "3. Quản lý bộ câu hỏi",
      desc: "Phân loại câu hỏi theo môn học, chương bài, mức độ Bloom.",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: <PlayCircle className="h-6 w-6" />,
      title: "4. Tạo đề thi",
      desc: "Kết hợp nhiều nguồn, thiết lập số câu, độ khó, trộn đề.",
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: <Rocket className="h-6 w-6" />,
      title: "5. Xuất đề thi",
      desc: "Xuất ra PDF, Word hoặc tích hợp với LMS như Moodle.",
      color: "from-teal-400 to-cyan-500",
    },
  ];



  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
      {/* Hero */}
      <section className="relative py-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          className="text-3xl font-black text-emerald-700 dark:text-emerald-300 md:text-4xl"
        >
          🚀 Hướng dẫn nhanh QuizUniverse
        </motion.h1>
        <p className="mt-3 text-slate-600 dark:text-slate-400">
          Bắt đầu hành trình học tập của bạn chỉ với vài bước đơn giản.
        </p>
      </section>

      {/* Steps */}
      <main className="mx-auto max-w-6xl px-6 pb-16">
        <h2 className="mb-4 text-lg font-bold text-slate-700 dark:text-slate-200">👨‍🎓 Dành cho Học viên</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {studentSteps.map((s, i) => (
            <div
              key={i}
              data-aos="zoom-in"
              data-aos-delay={i * 150}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg transition hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900"
            >
              <div
                className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${s.color} text-white shadow-lg`}
              >
                {s.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{s.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="mb-4 text-lg font-bold text-slate-700 dark:text-slate-200">👨‍🏫 Dành cho Giáo viên</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {teacherSteps.map((s, i) => (
            <div
              key={i}
              data-aos="zoom-in"
              data-aos-delay={i * 150}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg transition hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900"
            >
              <div
                className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${s.color} text-white shadow-lg`}
              >
                {s.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{s.desc}</p>
            </div>
          ))}
        </div>


        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 150, damping: 20 }}
          className="mt-12 text-center"
        >
          <Link
            to="/subjects"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:brightness-110"
          >
            Bắt đầu ngay <ArrowRightCircle className="h-4 w-4" />
          </Link>
          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
            Bạn có thể xem thêm tại <Link to="/security" className="underline">Bảo mật</Link> hoặc <Link to="/cookies" className="underline">Cookies</Link>.
          </p>
        </motion.div>
      </main>


    </div>
  );
}
