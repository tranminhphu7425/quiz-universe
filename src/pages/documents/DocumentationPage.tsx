import { motion } from "framer-motion";
import {
  MdMenuBook as Book,
  MdDescription as FileText,
  MdCode as Code,
  MdGppGood as ShieldCheck,
  MdSettings as Settings,
  MdHelpOutline as HelpCircle
} from 'react-icons/md';
import { Link } from "react-router-dom";

/**
 * DocumentationPage – Trang Tài liệu cho QuizUniverse
 * Gồm: Giới thiệu, API docs, Hướng dẫn sử dụng, Bảo mật, Câu hỏi thường gặp
 */

export default function DocumentationPage() {
  const sections = [
    {
      icon: <Book className="h-6 w-6" />,
      title: "Giới thiệu",
      desc: "Tổng quan về QuizUniverse, mục tiêu và các thành phần chính.",
      to: "/about"
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Hướng dẫn sử dụng",
      desc: "Cách đăng ký, đăng nhập, làm bài trắc nghiệm, quản lý bộ câu hỏi.",
      to: "/userguide"
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "API Documentation",
      desc: "Chi tiết endpoint REST API: xác thực, subjects, questions, results.",
      to: "/userguide"
    },
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      title: "Bảo mật",
      desc: "Nguyên tắc bảo mật, quản lý token, phân quyền và quyền riêng tư.",
      to: "/userguide"
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Cấu hình hệ thống",
      desc: "Các tùy chọn cài đặt: ngôn ngữ, dark mode, thông báo, cookie.",
      to: "/userguide"
    },
    {
      icon: <HelpCircle className="h-6 w-6" />,
      title: "FAQ",
      desc: "Giải đáp nhanh các câu hỏi thường gặp của người dùng và dev.",
      to: "/userguide"
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-500 py-16 text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 140, damping: 18 }}
          className="text-4xl font-black md:text-5xl"
        >
          📚 Tài liệu QuizUniverse
        </motion.h1>
        <p className="mt-4 max-w-2xl mx-auto text-white/90">
          Hướng dẫn toàn diện dành cho người dùng và lập trình viên tích hợp hệ thống.
        </p>
      </section>

      {/* Content */}
      <main className="mx-auto max-w-6xl px-6 py-12 space-y-16">
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="mb-3 text-indigo-600 dark:text-indigo-300">{s.icon}</div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200">{s.title}</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{s.desc}</p>
                <div className="mt-3">
                  <Link to={s.to} className="text-sm text-indigo-600 underline dark:text-indigo-300">
                    Xem chi tiết →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="rounded-xl bg-slate-100 p-6 text-center dark:bg-slate-800">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">Bạn là lập trình viên?</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Xem <Link to="/api-docs" className="underline text-indigo-600 dark:text-indigo-300">API Reference</Link> để tích hợp QuizUniverse vào hệ thống của bạn.
          </p>
        </section>
      </main>

      <footer className="py-6 text-center text-xs text-slate-500 dark:text-slate-400">
        © {new Date().getFullYear()} QuizUniverse • Documentation v1.0
      </footer>
    </div>
  );
}
