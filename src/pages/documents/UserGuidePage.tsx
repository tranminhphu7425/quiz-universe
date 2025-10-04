import { motion } from "framer-motion";
import { UserPlus, LogIn, ClipboardList, FolderOpen, ArrowRightCircle } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * UserGuidePage – Trang Hướng dẫn sử dụng cho QuizUniverse
 * Gồm: Đăng ký, Đăng nhập, Làm bài trắc nghiệm, Quản lý bộ câu hỏi
 */

export default function UserGuidePage() {
  const steps = [
    {
      icon: <UserPlus className="h-6 w-6" />,
      title: "Đăng ký tài khoản",
      desc: "Chọn Đăng ký, nhập tên, email, mật khẩu. Xác nhận qua email để kích hoạt tài khoản.",
    },
    {
      icon: <LogIn className="h-6 w-6" />,
      title: "Đăng nhập",
      desc: "Sử dụng email & mật khẩu đã đăng ký để đăng nhập. Token sẽ được lưu để duy trì phiên.",
    },
    {
      icon: <ClipboardList className="h-6 w-6" />,
      title: "Làm bài trắc nghiệm",
      desc: "Chọn môn học, chọn bộ câu hỏi. Hệ thống hỗ trợ chế độ luyện tập và thi. Xem kết quả ngay sau khi nộp.",
    },
    {
      icon: <FolderOpen className="h-6 w-6" />,
      title: "Quản lý bộ câu hỏi",
      desc: "Giáo viên hoặc người được phân quyền có thể tạo, sửa, xoá bộ câu hỏi. Có thể phân loại theo môn học, chủ đề.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-500 py-16 text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 140, damping: 18 }}
          className="text-4xl font-black md:text-5xl"
        >
          📖 Hướng dẫn sử dụng
        </motion.h1>
        <p className="mt-4 max-w-2xl mx-auto text-white/90">
          Làm quen với QuizUniverse qua các bước cơ bản: Đăng ký, đăng nhập, làm bài và quản lý bộ câu hỏi.
        </p>
      </section>

      {/* Steps */}
      <main className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="mb-3 text-emerald-600 dark:text-emerald-300">{s.icon}</div>
              <h3 className="font-semibold text-slate-800 dark:text-slate-200">{s.title}</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{s.desc}</p>
            </motion.div>
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
        </motion.div>
      </main>

      <footer className="py-6 text-center text-xs text-slate-500 dark:text-slate-400">
        © {new Date().getFullYear()} QuizUniverse • User Guide v1.0
      </footer>
    </div>
  );
}
