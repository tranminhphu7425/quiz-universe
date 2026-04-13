import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Home, ArrowLeft, Search, Rocket, Ghost } from "lucide-react";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-[#030712] selection:bg-emerald-500/30 transition-colors duration-500">
      {/* Background Orbs - Adjusted for Light/Dark */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-emerald-400/30 dark:bg-emerald-500/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-70 dark:opacity-20 animate-blob" />
      <div className="absolute top-0 -right-4 w-96 h-96 bg-purple-400/30 dark:bg-purple-500/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-70 dark:opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-blue-400/30 dark:bg-blue-500/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-70 dark:opacity-20 animate-blob animation-delay-4000" />

      {/* Grid & Noise Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-slate-200/[0.5] dark:bg-grid-white/[0.02] bg-[bottom_1px_center] pointer-events-none" />

      <div className="relative z-10 mt-20 max-w-2xl px-6 text-center">
        {/* Animated Icon Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="relative inline-block mb-10"
        >
          <div className="absolute inset-0 bg-emerald-500 blur-3xl opacity-20 dark:opacity-30 animate-pulse" />
          <div className="relative bg-white/40 dark:bg-slate-900/50 backdrop-blur-2xl border border-slate-200/50 dark:border-white/10 p-8 rounded-[2.5rem] shadow-2xl dark:shadow-none">
            <Ghost className="w-16 h-16 text-emerald-600 dark:text-emerald-400 animate-bounce" />
          </div>
        </motion.div>

        {/* 404 Text - Adaptable Gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[100px] font-black leading-none tracking-tighter sm:text-[150px]"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-slate-900 via-slate-700 to-slate-400/50 dark:from-white dark:via-white dark:to-white/20 select-none">
            404
          </span>
        </motion.h1>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-6"
        >
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl tracking-tight">
            Không tìm thấy trang yêu cầu
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 text-md max-w-lg mx-auto leading-relaxed font-medium">
            Rất tiếc, đường dẫn này hiện không khả dụng hoặc đã bị thay đổi. Vui lòng kiểm tra lại địa chỉ URL hoặc quay lại trang chính.
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-3 px-7 py-3.5 rounded-2xl bg-slate-200/50 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-300/50 dark:border-white/10 text-slate-700 dark:text-slate-200 transition-all active:scale-95 font-semibold"
          >
            <ArrowLeft className="w-5 h-5 text-slate-500 dark:text-slate-400 group-hover:-translate-x-1 transition-transform" />
            Quay lại
          </button>

          <Link
            to="/"
            className="group relative flex items-center gap-3 px-10 py-3.5 rounded-2xl bg-emerald-600 dark:bg-emerald-500 hover:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-bold transition-all shadow-xl shadow-emerald-500/20 active:scale-95"
          >
            <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Trở về Trang chủ
            <Rocket className="absolute -top-8 -right-8 w-10 h-10 text-emerald-500/30 opacity-0 group-hover:opacity-100 group-hover:-translate-y-3 group-hover:translate-x-3 transition-all duration-700 pointer-events-none" />
          </Link>
        </motion.div>

        {/* Quick Links Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-10 pt-10 border-t border-slate-200 dark:border-white/5 mb-20"
        >
          <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-[0.2em] mb-6">
            Gợi ý điều hướng
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            <Link to="/subjects" className="text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-sm font-bold">
              Môn học
            </Link>
            <Link to="/question-banks" className="text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-sm font-bold">
              Ngân hàng câu hỏi
            </Link>
            <Link to="/about" className="text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-sm font-bold">
              Giới thiệu
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Parallax Background Elements */}
      <motion.div
        animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[15%] right-[10%] hidden xl:block opacity-[0.07] dark:opacity-20 pointer-events-none"
      >
        <Rocket className="w-16 h-16 text-blue-600 dark:text-blue-400" />
      </motion.div>

      <motion.div
        animate={{ y: [0, 30, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[20%] left-[10%] hidden xl:block opacity-[0.07] dark:opacity-20 pointer-events-none"
      >
        <Search className="w-14 h-14 text-purple-600 dark:text-purple-400" />
      </motion.div>
    </div>
  );
}

