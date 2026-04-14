import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Users2, BookOpen, ShieldCheck, Rocket, Trophy, PlusCircle, ChevronRight } from "lucide-react";
import Floating from "@/shared/ui/Floatting";
import AnimatedGradientBackgroundProps from "@/components/ui/AnimatedGradientBackground";

const stats = [
  { label: "Ngân hàng câu hỏi", value: "25,000+" },
  { label: "Môn học", value: "40+" },
  { label: "Trường sử dụng", value: "60+" },
  { label: "Bài thi đã tạo", value: "120,000+" },
];

const values = [
  {
    icon: <BookOpen className="h-5 w-5" />,
    title: "Mở & Chuẩn hoá",
    desc: "Chuẩn dữ liệu câu hỏi thống nhất, dễ tái sử dụng giữa các lớp và khoa.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Tin cậy",
    desc: "Bảo mật người dùng, phân quyền vai trò rõ ràng (GV/SV/Quản trị).",
  },
  {
    icon: <Rocket className="h-5 w-5" />,
    title: "Nhanh & Vui",
    desc: "Tạo đề trong vài phút, giao diện thân thiện, trải nghiệm mượt mà.",
  },
];

const team = [
  { name: "Phú Trần Minh", role: "Founder / Full-stack", avatar: "" },
  { name: "Nguyễn Văn A", role: "Backend Engineer", avatar: "" },
  { name: "Trần Thị B", role: "UI/UX Designer", avatar: "" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-800">


      <section className="relative overflow-hidden">
  <AnimatedGradientBackgroundProps />

  {/* Hero section */}
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 py-8 md:py-12 lg:py-16"
  >
    <div className="flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-12">
      {/* Left Section - Title & Description */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
        className="w-full lg:w-auto lg:flex-1"
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4 md:mb-6">
          <Users2 className="w-3.5 h-3.5 text-emerald-300" />
          <span className="text-xs font-medium text-white/90">Về QuizUniverse</span>
        </div>

        {/* Title with gradient */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight">
          <span className="bg-gradient-to-r from-white via-emerald-100 to-green-200 bg-clip-text text-transparent">
            Nền tảng ngân hàng & tạo đề thi hiện đại
          </span>
        </h1>

        {/* Decorative underline */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100px" }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="h-1 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full mt-4 mb-5"
        />

        {/* Description */}
        <p className="text-white/90 dark:text-gray-200 text-base md:text-lg max-w-2xl leading-relaxed">
          Giúp giảng viên chuẩn hoá nội dung, sinh viên luyện tập hiệu quả và nhà trường quản trị dễ dàng.
        </p>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-4 md:gap-6 mt-6"
        >
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
            <span className="text-xs text-white/70">Giảng viên & sinh viên</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
            <span className="text-xs text-white/70">Ngân hàng câu hỏi</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-teal-400 rounded-full" />
            <span className="text-xs text-white/70">Tạo đề thông minh</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Right Section - Action Buttons */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto"
      >
        {/* Primary Button - Explore Question Bank */}
        <motion.div
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            to="/question-banks"
            className="group relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold shadow-lg transition-all duration-300 bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 text-white hover:shadow-xl"
          >
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

            <span className="relative z-10">Khám phá ngay</span>
            <ChevronRight className="h-4 w-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>

        {/* Secondary Button - Learn More */}
        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            to="/register"
            className="group relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold shadow-lg transition-all duration-300 bg-white/10 backdrop-blur-sm text-white border border-white/30 hover:bg-white/20"
          >
            <BookOpen className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
            <span>Tìm hiểu thêm</span>
          </Link>
        </motion.div>
      </motion.div>
    </div>

    {/* Floating Decorations */}
    {/* Decoration 1 - Quiz Badge */}
    <Floating distance={15} duration={7} className="pointer-events-none absolute top-20 left-5 z-0 hidden lg:block">
      <motion.div
        animate={{ rotate: [-6, 0, -6] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="rounded-xl bg-gradient-to-br from-emerald-400 to-green-500 px-4 py-2 shadow-xl"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="h-3 w-3 text-white" />
          <span className="text-xs font-black text-white tracking-wider">QUIZ</span>
          <Sparkles className="h-3 w-3 text-white" />
        </div>
      </motion.div>
    </Floating>

    {/* Decoration 2 - Book Icon */}
    <Floating distance={12} duration={6} className="pointer-events-none absolute top-24 right-8 z-0 hidden lg:block">
      <motion.div
        animate={{ rotate: [12, 0, 12] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 p-3 shadow-xl"
      >
        <BookOpen className="h-5 w-5 text-white" />
      </motion.div>
    </Floating>

    {/* Decoration 3 - Plus Icon */}
    <Floating distance={10} duration={8} className="pointer-events-none absolute bottom-0 right-1/4 z-0 hidden lg:block">
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 p-2 shadow-lg"
      >
        <PlusCircle className="h-4 w-4 text-white" />
      </motion.div>
    </Floating>

    {/* Decoration 4 - Small dots */}
    <div className="pointer-events-none absolute top-1/2 left-10 -z-0 hidden xl:block">
      <div className="flex gap-1">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
            className="w-1 h-1 rounded-full bg-white/40"
          />
        ))}
      </div>
    </div>

    <div className="pointer-events-none absolute bottom-10 right-20 -z-0 hidden xl:block">
      <div className="flex gap-1">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 4, delay: i * 0.3, repeat: Infinity }}
            className="w-1 h-1 rounded-full bg-white/30"
          />
        ))}
      </div>
    </div>
  </motion.div>
</section>

      {/* Nội dung chính */}
      <div className="relative z-0">


        {/* Stats - Điều chỉnh cho dark mode */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4  mx-auto max-w-6xl px-6 pt-20">
          {stats.map((s) => (
            <motion.div
              key={s.label}
              className="rounded-2xl border border-white/20 bg-white/10 p-4 text-center shadow backdrop-blur-md 
                    dark:border-gray-700 dark:bg-gray-800/70 dark:text-gray-100"
            >
              <div className="text-xl font-bold text-gray-800 dark:text-white">{s.value}</div>
              <div className="mt-1 text-xs text-gray-600 dark:text-gray-300">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Giá trị cốt lõi */}
        <div className="mt-14 grid gap-6 md:grid-cols-3  mx-auto max-w-6xl px-6">
          {values.map((v, i) => (
            <motion.div
              key={i}
              className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-lg backdrop-blur-md
                    dark:border-gray-700 dark:bg-gray-800/70 dark:text-gray-100"
            >
              {/* Icon + Title */}
              <div className="mb-3 inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-gray-800 ring-1 ring-white/20 
                         dark:bg-white/10 dark:text-gray-200 dark:ring-white/15">
                {v.icon}
                <span className="text-sm font-semibold">{v.title}</span>
              </div>

              {/* Mô tả */}
              <p className="text-sm text-gray-700 dark:text-gray-300">{v.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Dòng thời gian */}
        <div className="mt-14  mx-auto max-w-6xl px-6">
          <div className="mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-200">
            <Trophy className="h-5 w-5 text-amber-300" />
            <h2 className="text-xl font-semibold">Cột mốc nổi bật</h2>
          </div>

          <div className="relative pl-6">
            <span className="absolute left-2 top-0 h-full w-px bg-gray-300 dark:bg-gray-600" />
            <ul className="space-y-6 text-gray-700 dark:text-gray-300">
              <li className="relative">
                <span className="absolute -left-[7px] top-1 grid h-3 w-3 place-items-center rounded-full bg-emerald-400 ring-4 ring-emerald-400/30" />
                2024 — Khởi tạo dự án, thử nghiệm tại 2 khoa.
              </li>
              <li className="relative">
                <span className="absolute -left-[7px] top-1 grid h-3 w-3 place-items-center rounded-full bg-emerald-400 ring-4 ring-emerald-400/30" />
                2025 — Ra mắt QuizUniverse 1.0, hỗ trợ tạo đề từ tài liệu.
              </li>
            </ul>
          </div>
        </div>

        {/* Nhóm phát triển */}
        <div className="mt-16  mx-auto max-w-6xl px-6 pb-10">
          <div className="mb-6 flex items-center gap-2 text-gray-800 dark:text-gray-200">
            <Users2 className="h-5 w-5 text-amber-300" />
            <h2 className="text-xl font-semibold">Nhóm phát triển</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {team.map((m) => (
              <motion.div
                key={m.name}
                className="rounded-2xl border border-white/20 bg-white/10 p-5 shadow-lg backdrop-blur-md
                      dark:border-gray-700 dark:bg-gray-800/70 dark:text-gray-100"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-400 text-white">
                    {m.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 dark:text-white">{m.name}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{m.role}</div>
                  </div>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Đam mê giáo dục số & trải nghiệm học tập lấy người dùng làm trung tâm.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
