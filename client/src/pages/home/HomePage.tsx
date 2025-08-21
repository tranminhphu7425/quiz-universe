// src/pages/home/HomePage.tsx
import { Link, useParams } from "react-router-dom";
import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  BookOpen,
  ListChecks,
  ShieldCheck,
  ArrowRight,
  Clock,
  Star,
} from "lucide-react";
import { useAuth } from "@/app/providers/AuthProvider";
import FeatureCard from "@/widgets/FeatureCard";
import StepCard from "@/widgets/StepCard";
import HeroIllustration from "@/widgets/HeroIllustration";
import Floating from "@/shared/ui/Floatting";
import { Heart } from "lucide-react";
import { ClipboardList, Send, CheckCircle2 } from "lucide-react";
import FadeInOnView from "@/shared/ui/FadeInOnView";



/**
 * HomePage (inspired by Home.jsx layout)
 * - Hero gradient + blur blobs
 * - CTA buttons, badges
 * - Feature grid (Question bank / Exam builder / Admin)
 * - How-it-works steps (3 bước)
 * - Testimonials
 * - Final CTA
 */

export default function HomePage() {

  const { user } = useAuth();

  const testimonials = useMemo(
    () => [
      {
        id: 1,
        name: "Nguyễn Văn A",
        comment:
          "Ngân hàng câu hỏi phong phú, tạo đề nhanh. Lần đầu dùng đã thấy mượt.",
        rating: 5,
        role: "Giảng viên",
      },
      {
        id: 2,
        name: "Trần Thị B",
        comment:
          "Làm bài ổn định, chấm theo điểm từng câu rõ ràng. Dễ xem lại kết quả.",
        rating: 4,
        role: "Sinh viên",
      },
      {
        id: 3,
        name: "Lê Văn C",
        comment:
          "Quy trình tạo đề/đăng bài hợp lý, hỗ trợ danh mục theo môn học.",
        rating: 5,
        role: "Quản trị",
      },
    ],
    []
  );

  // SVG tile (data URL) dùng làm họa tiết nền mờ như Home.jsx
  const tileUrl = encodeURIComponent(`
    <svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160' fill='none'>
      <g stroke='#10b981' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>
        <!-- Book -->
        <path d='M28 36h40a8 8 0 018 8v44H36a8 8 0 01-8-8V36z' opacity='0.7'/>
        <path d='M28 52h48' opacity='0.6'/>
        <!-- Checklist -->
        <rect x='96' y='28' width='36' height='28' rx='4' />
        <path d='M100 36h18M100 44h18' opacity='0.6'/>
        <path d='M120 36l6 6M126 36l-6 6' />
        <!-- Star badge -->
        <path d='M40 116l8 4l8-4l-2 9l6 6l-9 1l-3 8l-3-8l-9-1l6-6z' />
        <!-- Shield -->
        <path d='M112 100c10 0 20-6 20-14v-6c-7 2-13 3-20 3s-13-1-20-3v6c0 8 10 14 20 14z' />
      </g>
    </svg>
  `);
  const steps = [
    {
      step: 1,
      title: "Chuẩn bị",
      desc: "Chọn môn học, cấu trúc đề, danh sách câu hỏi.",
      icon: <ClipboardList className="h-5 w-5" />,
      accent: "from-emerald-500 to-teal-400",
    },
    {
      step: 2,
      title: "Tạo & phát đề",
      desc: "Thiết lập thời lượng, điểm từng câu, phát đề cho lớp.",
      icon: <Send className="h-5 w-5" />,
      accent: "from-amber-500 to-pink-500",
    },
    {
      step: 3,
      title: "Làm & chấm",
      desc: "Sinh viên làm bài; hệ thống chấm theo cấu hình điểm.",
      icon: <CheckCircle2 className="h-5 w-5" />,
      accent: "from-indigo-500 to-purple-500",
    },
  ];
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    }
  };


  return (
    <div className="home-page bg-slate-50 dark:bg-slate-800">
      {/* ====== HERO ====== */}

      <section className="relative overflow-hidden">




        {/* Gradient nền lớn */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />

        {/* Họa tiết tile mờ bên trái */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-[120%] md:w-full opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml;utf8,${tileUrl}")`,
            backgroundRepeat: "repeat",
            backgroundSize: "160px 160px",
            maskImage:
              "radial-gradient(1200px 400px at left center, #000 70%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(1200px 400px at left center, #000 70%, transparent 100%)",
          }}
        />

        {/* Blur blobs */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl dark:bg-emerald-400/10" />
        <div className="pointer-events-none absolute -right-16 top-10 h-64 w-64 rounded-full bg-white/10 blur-2xl dark:bg-purple-400/10" />

        {/* Nội dung hero */}
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-10 px-6 py-16 lg:flex-row md:items-center md:justify-between">
          <div className="max-w-xl text-center text-white md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 160, damping: 18 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/20 backdrop-blur dark:bg-white/5 dark:ring-white/10"
            >
              <Sparkles className="h-4 w-4" />
              QuizUniverse • Ngân hàng trắc nghiệm
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="text-[2.5rem] md:text-[3rem] font-black leading-tight"
            >
              {`Chào mừng đến với `}
              <span
                className="
            bg-gradient-to-r 
            from-purple-500 via-pink-500 to-amber-500 
            bg-clip-text 
            text-transparent
            animate-gradient
            glow-text font-[Poppins]
          "
              >
                QuizUniverse
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-4 w-full text-center lg:text-left text-white/90 dark:text-gray-300"
            >
              Kho lưu trữ ngân hàng câu hỏi theo từng môn. Tạo đề từ
              nhiều ngân hàng hoặc tài liệu có sẵn. Chuyển tài liệu giáo trình sang câu hỏi trắc nghiệm.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-6 flex flex-wrap justify-center gap-4 md:justify-start"
            >
              {user ? (
                <Link
                  to={`/app`}
                  className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-6 py-2.5 font-semibold text-emerald-950 shadow hover:brightness-105"
                >
                  Vào bảng điều khiển <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <>
                  <Link
                    to={`/login`}
                    className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-2.5 font-medium text-white ring-1 ring-white/30 hover:bg-white/15 dark:bg-white/5 dark:ring-white/10"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    to={`/register`}
                    className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-6 py-2.5 font-semibold text-emerald-950 shadow hover:brightness-105"
                  >
                    Đăng ký
                  </Link>
                </>
              )}

            </motion.div>



          </div>

          {/* Hình minh họa hero */}
          <HeroIllustration />
          {/* Floating elements */}
          <Floating distance={12} duration={7} className="pointer-events-none absolute -top-6 -left-8">
            <div className="rounded-xl bg-gradient-to-br from-amber-300 to-rose-300 p-2 shadow-lg -rotate-6">
              <span className="text-xs font-black text-rose-700">FUN!</span>
            </div>
          </Floating>

          <Floating distance={10} duration={6} className="pointer-events-none absolute top-12 -right-6">
            <div className="rounded-full bg-gradient-to-br from-purple-400 to-indigo-400 p-3 shadow-xl rotate-12">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
          </Floating>

          <Floating distance={14} duration={8} className="pointer-events-none absolute bottom-12 left-6">
            <div className="rounded-xl bg-gradient-to-br from-emerald-300 to-cyan-300 px-3 py-1 shadow-lg rotate-3">
              <span className="text-xs font-bold text-emerald-900">NEW!</span>
            </div>
          </Floating>

          <Floating distance={9} duration={9} className="pointer-events-none absolute bottom-4 right-10">
            <div className="rounded-full bg-gradient-to-tr from-pink-300 to-yellow-300 p-2 shadow-lg -rotate-12">
              <Heart className="h-4 w-4 text-pink-700" />
            </div>
          </Floating>
        </div>
      </section>


      {/* ====== FEATURE CARDS ====== */}
      <section className="
  mx-auto max-w-7xl px-6 py-20
  bg-white/0
  
">
        {/* Tiêu đề */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-emerald-900 dark:text-emerald-300">
            Các tính năng chính
          </h2>
          <p className="mt-2 text-emerald-800/80 dark:text-slate-300/80">
            Các công cụ sinh viên trong việc tạo và làm bài ôn tập
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            title="Ngân hàng câu hỏi"
            description="Chứa các câu hỏi ôn tập theo từng môn, được thu thập từ nhiều nguồn tài liệu và giảng viên khác nhau."
            to={`/app/questions`}
            cta="Xem danh sách"
            icon={<BookOpen className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />}
          />
          <FeatureCard
            title="Tạo đề thi"
            description="Cho phép tạo đề thi từ ngân hàng câu hỏi hoặc upload tài liệu cá nhân và tạo trắc nghiệm từ tài liệu đó."
            to={`/app/exams/create`}
            cta="Tạo đề"
            icon={<ListChecks className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />}
          />
          <FeatureCard
            title="Quản trị"
            description="Quản lý người dùng & vai trò (Admin hệ thống / Admin trường)."
            to={`/app/admin`}
            cta="Vào trang quản trị"
            icon={<ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />}
          />
        </div>
      </section>




      {/* ====== HOW IT WORKS ====== */}
      <section className="bg-emerald-50 dark:bg-slate-900">
        <div className="container mx-auto max-w-7xl px-6 py-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-emerald-900 dark:text-emerald-300">
              Cách hoạt động
            </h2>
            <p className="mt-2 text-emerald-800/80 dark:text-slate-300/80">
              Chỉ với 3 bước đơn giản để tổ chức hoặc làm bài thi
            </p>
          </div>



          <FadeInOnView amount={0.2} margin="0px 0px -10% 0px">
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              {steps.map((s, i) => (
                <StepCard
                  key={s.step}
                  step={s.step}
                  title={s.title}
                  desc={s.desc}
                  icon={s.icon}
                  accent={s.accent}
                  isLast={i === steps.length - 1}
                />
              ))}
            </div>
          </FadeInOnView>
        </div>
      </section>


      {/* ====== TESTIMONIALS ====== */}

      <section
        className="
    py-20 mx-auto max-w-7xl px-6
    transition-colors duration-300
  "
      >
        {/* Tiêu đề */}
        <div className="mb-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-emerald-900 dark:text-emerald-300"
          >
            Nhận xét từ người dùng
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-2 text-emerald-800/80 dark:text-slate-300/80"
          >
            Đánh giá của giảng viên và sinh viên về QuizUniverse
          </motion.p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 40, rotate: -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: idx * 0.15, type: "spring", stiffness: 140, damping: 15 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotate: 1 }}
              className="rounded-xl border border-emerald-100 dark:border-slate-800 
                   bg-gradient-to-br from-white to-emerald-50 dark:from-slate-900 dark:to-slate-800
                   p-6 shadow-lg hover:shadow-xl transition-transform duration-300"
            >
              {/* Info người đánh giá */}
              <div className="mb-3">
                <div className="font-semibold text-emerald-700 dark:text-emerald-300">
                  {t.name}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {t.role}
                </div>
              </div>

              {/* Rating sao */}
              <div className="mb-3 flex items-center gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 + i * 0.05, type: "spring" }}
                    className="text-amber-400"
                  >
                    ★
                  </motion.span>
                ))}
                {Array.from({ length: 5 - t.rating }).map((_, i) => (
                  <span
                    key={i}
                    className="text-gray-300 dark:text-gray-600"
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Comment */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed italic"
              >
                “{t.comment}”
              </motion.p>
            </motion.div>
          ))}
        </div>
      </section>


      {/* ====== FINAL CTA ====== */}
      <section className="bg-emerald-600 dark:bg-emerald-900">
        <div className="container mx-auto max-w-7xl px-6 py-12 text-center text-white">
          <h2 className="text-3xl font-bold">Sẵn sàng tổ chức bài thi?</h2>
          <p className="mx-auto mt-2 max-w-2xl text-white/90 dark:text-gray-300">
            Đăng ký ngay để bắt đầu tạo ngân hàng câu hỏi & đề thi của bạn.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link
              to={`/app/exams/create`}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 font-semibold text-emerald-700 hover:brightness-95 dark:bg-emerald-400 dark:text-emerald-900 dark:hover:brightness-110"
            >
              Tạo đề ngay <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to={`/app`}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-2.5 font-medium text-white ring-1 ring-white/30 hover:bg-white/15 dark:bg-emerald-800 dark:text-gray-100 dark:ring-emerald-700 dark:hover:bg-emerald-700/60"
            >
              Xem bảng điều khiển
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

