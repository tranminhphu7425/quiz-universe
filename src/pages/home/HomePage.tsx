// src/pages/home/HomePage.tsx
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  BookOpen,
  ListChecks,
  ArrowRight,
  Rocket,
  Zap,
} from "lucide-react";
import { useAuth } from "@/app/providers/AuthProvider";
import FeatureCard from "@/widgets/FeatureCard";
import StepCard from "@/widgets/StepCard";
import HeroIllustration from "@/widgets/HeroIllustration";
import Floating from "@/shared/ui/Floatting";
import { Heart } from "lucide-react";
import { ClipboardList, Send, CheckCircle2 } from "lucide-react";
import FadeInOnView from "@/shared/ui/FadeInOnView";
import React from 'react';
import TypewriterText from "@/shared/ui/TypewriterText";
import OrbitingSkills from "@/shared/ui/OrbitingSkills";
import { IoLibrary } from "react-icons/io5";
import GradientText from "@/shared/ui/GradientText";
import AnimatedGradientBackground from "@/components/ui/AnimatedGradientBackground";




export default function HomePage() {

  const { user } = useAuth();

  const testimonials = useMemo(
    () => [
      {
        id: 1,
        name: "Minh Tuấn",
        comment:
          "Mình khá bất ngờ vì ngân hàng câu hỏi nhiều thật. Tạo đề chỉ mất vài phút là xong, dùng lần đầu mà thấy rất mượt.",
        rating: 5,
        role: "Giảng viên",
      },
      {
        id: 2,
        name: "Thuỳ Linh",
        comment:
          "Làm bài ổn định, chấm điểm rõ từng câu nên mình dễ biết sai ở đâu để sửa. Rất tiện cho việc ôn tập.",
        rating: 4,
        role: "Sinh viên",
      },
      {
        id: 3,
        name: "Anh Khôi",
        comment:
          "Quy trình tạo đề và đăng bài khá logic, quản lý theo môn học cũng dễ nhìn, không bị rối.",
        rating: 5,
        role: "Quản trị",
      },
      {
        id: 4,
        name: "Ngọc Trâm",
        comment:
          "Mình thích nhất là có thể luyện đi luyện lại nhiều lần. Nhờ vậy mà nhớ bài lâu hơn hẳn.",
        rating: 5,
        role: "Sinh viên",
      },
      {
        id: 5,
        name: "Hoàng Nam",
        comment:
          "Hệ thống phản hồi nhanh, mình test lúc nhiều người thi cùng lúc mà vẫn không bị lag.",
        rating: 4,
        role: "Giảng viên",
      },
      {
        id: 6,
        name: "Bảo Vy",
        comment:
          "Giao diện thân thiện, nhìn là biết dùng ngay. Người mới như mình cũng không bị bỡ ngỡ.",
        rating: 5,
        role: "Sinh viên",
      },
      {
        id: 7,
        name: "Quốc Huy",
        comment:
          "Phần thống kê chi tiết khá hữu ích, giúp mình theo dõi kết quả học tập của sinh viên dễ hơn.",
        rating: 5,
        role: "Quản trị",
      },
      {
        id: 8,
        name: "Thanh Hằng",
        comment:
          "Có thi thử trước nên vào thi thật đỡ run hẳn. Cảm giác chuẩn bị tốt hơn rất nhiều.",
        rating: 4,
        role: "Sinh viên",
      },
      {
        id: 9,
        name: "Đức Anh",
        comment:
          "Phân loại câu hỏi theo độ khó rất hợp lý, dễ dùng để luyện từ cơ bản đến nâng cao.",
        rating: 5,
        role: "Giảng viên",
      },
      {
        id: 10,
        name: "Hồng Nhung",
        comment:
          "Mình hay làm bài trên điện thoại lúc rảnh, truy cập rất tiện mà không bị lỗi gì.",
        rating: 4,
        role: "Sinh viên",
      },
      {
        id: 11,
        name: "Văn Bình",
        comment:
          "Xuất báo cáo khá chi tiết, mình dùng khi họp phụ huynh thấy rất tiện và chuyên nghiệp.",
        rating: 5,
        role: "Quản trị",
      },
      {
        id: 12,
        name: "Kim Chi",
        comment:
          "Tìm kiếm câu hỏi nhanh, không phải mất thời gian lục lại như trước nữa.",
        rating: 5,
        role: "Sinh viên",
      },
      {
        id: 13,
        name: "Gia Huy",
        comment:
          "Có lần mạng bị chập chờn nhưng hệ thống vẫn tự lưu bài, không bị mất dữ liệu. Rất yên tâm.",
        rating: 5,
        role: "Sinh viên",
      },
      {
        id: 14,
        name: "Phương Thảo",
        comment:
          "Đề thi tùy chỉnh được nhiều dạng câu hỏi nên không bị nhàm chán, sinh viên cũng thích hơn.",
        rating: 4,
        role: "Giảng viên",
      },
      {
        id: 15,
        name: "Anh Dũng",
        comment:
          "Mình là phụ huynh, theo dõi kết quả học của con dễ dàng hơn trước rất nhiều. Cảm thấy yên tâm hơn.",
        rating: 5,
        role: "Phụ huynh",
      },
    ],
    []
  );

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

  const looped = [...testimonials, ...testimonials];


  return (
    <div className="home-page bg-slate-50 dark:bg-slate-900">
      {/* ====== HERO ====== */}

      <section className="relative overflow-hidden">

        <AnimatedGradientBackground/> 

        <OrbitingSkills />

        {/* Nội dung hero */}
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-10 px-6 py-16 lg:flex-row lg:items-center">
          <div className="w-full lg:w-[40%] text-center text-white lg:text-left">
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
              className="text-center lg:text-left text-[2.5rem] md:text-[3rem] font-black leading-tight"
            >
              <TypewriterText text="Chào mừng đến với" />
              {/* {`Chào mừng đến với `} */}
              <GradientText className="flex mx-auto lg:mx-0 text-[2.5rem] md:text-[3rem] font-[Poppins]">
                QuizUniverse
              </GradientText>
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
              className="mt-6 flex flex-wrap justify-center gap-4 lg:justify-start"
            >
              {user ? (
                <Link
                  to={`/dashboard`}
                  className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-6 py-2.5 font-semibold text-emerald-950 shadow hover:brightness-105"
                >
                  Vào bảng điều khiển <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {/* Nút Đăng nhập */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to="/login"
                      className="
        group relative overflow-hidden
        col-span-1 inline-flex w-full items-center justify-center gap-2 
        rounded-full px-6 py-2.5 font-medium 
        bg-white/10 backdrop-blur-sm
        text-white 
        ring-1 ring-white/30 
        hover:bg-white/20 hover:ring-white/50
        dark:bg-white/5 dark:ring-white/10
        dark:hover:bg-white/15 dark:hover:ring-white/30
        transition-all duration-300
      "
                    >
                      {/* Shine effect */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                      <span className="relative z-10">Đăng nhập</span>
                      <svg className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                    </Link>
                  </motion.div>

                  {/* Nút Đăng ký */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to="/register"
                      className="
        group relative overflow-hidden
        col-span-1 inline-flex w-full items-center justify-center gap-2 
        rounded-full px-6 py-2.5 font-semibold 
        bg-gradient-to-r from-amber-400 to-yellow-500
        text-emerald-950 shadow-lg
        hover:shadow-xl hover:from-amber-500 hover:to-yellow-600
        transition-all duration-300
      "
                    >
                      {/* Ripple effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />

                      <span className="relative z-10">Đăng ký</span>
                      <svg className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                    </Link>
                  </motion.div>

                  {/* Nút CTU Tools - Full width */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="col-span-2"
                  >
                    <Link
                      to="/ctu"
                      className="
        group relative overflow-hidden
        inline-flex w-full items-center justify-center gap-3 
        rounded-full px-6 py-3 font-semibold 
        bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-500
        text-white shadow-lg
        hover:shadow-xl hover:from-blue-600 hover:via-blue-700 hover:to-cyan-600
        transition-all duration-300
      "
                    >
                      {/* Animated gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

                      {/* Icon pulsing */}
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "loop"
                        }}
                        className="relative z-10"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </motion.div>

                      <span className="relative z-10">Các công cụ dành cho sinh viên CTU</span>

                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          repeatType: "loop"
                        }}
                        className="relative z-10"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </motion.div>

                      {/* Decorative dots */}
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-white/30 rounded-full" />
                      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white/30 rounded-full" />
                    </Link>
                  </motion.div>
                </div>

              )}

            </motion.div>



          </div>

          {/* Hình minh họa hero */}
          <div className="w-full lg:w-[60%]">
            <HeroIllustration />
          </div>
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
            to={`/question-banks`}
            cta="Xem danh sách"
            icon={<BookOpen className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />}
          />
          <FeatureCard
            title="Tạo bộ câu hỏi"
            description="Cho phép tạo bộ câu hỏi mới qua upload tài liệu trắc nghiệm cá nhân hoặc tạo thủ công và tạo trắc nghiệm từ tài liệu đó."
            to={`/question-bank/create`}
            cta="Tạo bộ câu hỏi"
            icon={<ListChecks className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />}
          />
          <FeatureCard
            title="Kho tài nguyên học tập"
            description="Một thư viện tài liệu, giáo trình của các tình nguyện viên đóng góp."
            to={`/resources`}
            cta="Vào trang tài nguyên"
            icon={<IoLibrary className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />}
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

        <div className="overflow-hidden relative w-full">
          <motion.div
            className="flex gap-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 30, // tốc độ (có thể chỉnh nhanh/chậm)
              repeat: Infinity,
            }}
          >
            {looped.map((t, idx) => (
              <TestimonialCard
                key={idx}
                index={idx}
                name={t.name}
                role={t.role}
                rating={t.rating}
                comment={t.comment}
              />
            ))}
          </motion.div>
        </div>
      </section>


      {/* ====== FINAL CTA ====== */}

      <section className="relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 dark:from-emerald-800 dark:via-emerald-900 dark:to-teal-950" />

        {/* Animated blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-300/10 rounded-full blur-3xl animate-blob animation-delay-4000" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "30px 30px",
          }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                y: [null, -100, -200],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 5 + 3,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
              style={{
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="relative container mx-auto max-w-7xl px-6 py-6 md:py-12 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span className="text-xs font-medium text-white/90">Ưu đãi đặc biệt</span>
          </motion.div>

          {/* Title với hiệu ứng chữ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4">
              Sẵn sàng tổ chức
              <span className="relative inline-block mx-3">
                <span className="relative z-10 bg-gradient-to-r from-yellow-300 to-amber-400 bg-clip-text text-transparent">
                  bài thi?
                </span>
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-3 bg-yellow-400/30 rounded-full blur-sm"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                />
              </span>
            </h2>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mx-auto mt-4 max-w-2xl text-white/90 dark:text-gray-200 text-lg md:text-xl"
          >
            Đăng ký ngay để bắt đầu tạo ngân hàng câu hỏi & đề thi của bạn.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {/* Primary CTA */}
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/question-bank/create"
                className="group relative overflow-hidden inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 bg-white text-emerald-700 dark:bg-emerald-400 dark:text-emerald-900"
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

                <Rocket className="w-5 h-5 group-hover:translate-x-[-2px] transition-transform duration-300" />
                <span className="relative z-10">Tạo bộ câu hỏi ngay</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
                  className="relative z-10"
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.div>
              </Link>
            </motion.div>

            {/* Secondary CTA */}
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/dashboard"
                className="group relative overflow-hidden inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-white backdrop-blur-sm bg-white/10 ring-1 ring-white/30 hover:bg-white/20 transition-all duration-300"
              >
                <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                <span>Truy cập bảng điều khiển</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12 text-white dark:text-slate-900" preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
            <path d="M321.39 56.44c58-10.79 114.16-30.13 172-41.86 82.39-16.72 168.19-17.73 250.45-.39C823.78 31 906.67 72 985.66 92.83c70.05 18.48 146.53 26.09 214.34 3V0H0V27.35A600.21 600.21 0 00321.39 56.44z" fill="currentColor" opacity="0.1" />
          </svg>
        </div>

        <style>{`
    @keyframes blob {
      0% { transform: translate(0px, 0px) scale(1); }
      33% { transform: translate(30px, -50px) scale(1.1); }
      66% { transform: translate(-20px, 20px) scale(0.9); }
      100% { transform: translate(0px, 0px) scale(1); }
    }
    .animate-blob {
      animation: blob 7s infinite;
    }
    .animation-delay-2000 {
      animation-delay: 2s;
    }
    .animation-delay-4000 {
      animation-delay: 4s;
    }
  `}</style>
      </section>

    </div>
  );
}


// src/widgets/TestimonialCard.tsx

import { Quote, User } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  role: string;
  rating: number;
  comment: string;
  avatar?: string;
  index?: number;
}

export function TestimonialCard({
  name,
  role,
  rating,
  comment,
  avatar,
  index = 0
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 160,
        damping: 18,
        delay: index * 0.1
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="
        relative group min-w-[320px] max-w-sm rounded-xl
        bg-gradient-to-br from-white to-emerald-50 
        dark:from-slate-900 dark:to-slate-800
        p-6 shadow-lg hover:shadow-2xl
        border border-emerald-100 dark:border-slate-700
        transition-all duration-300
        overflow-hidden
      "
    >
      {/* Gradient border effect on hover */}
      <div
        aria-hidden
        className="
          pointer-events-none absolute inset-0 rounded-xl opacity-0
          group-hover:opacity-100 transition-opacity duration-500
          bg-gradient-to-r from-emerald-400/20 via-emerald-500/20 to-teal-400/20
          dark:from-emerald-500/20 dark:via-emerald-400/20 dark:to-teal-400/20
        "
      />

      {/* Shimmer effect */}
      <div
        aria-hidden
        className="
          pointer-events-none absolute -inset-full rounded-xl opacity-0
          group-hover:opacity-100 transition-opacity duration-700
          bg-gradient-to-r from-transparent via-white/30 to-transparent
          -skew-x-12
        "
        style={{
          animation: "shimmer 2s ease-in-out infinite",
        }}
      />

      {/* Corner decorations */}
      <div className="pointer-events-none absolute top-0 right-0 w-20 h-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-10 h-10 bg-emerald-500/5 dark:bg-emerald-400/5 rounded-bl-2xl" />
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 w-20 h-20 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-10 h-10 bg-emerald-500/5 dark:bg-emerald-400/5 rounded-tr-2xl" />
      </div>

      {/* Quote icon */}
      <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
        <Quote className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
      </div>

      {/* Avatar and info section */}
      <div className="relative flex items-center gap-3 mb-4">
        {/* Avatar */}
        <motion.div
          whileHover={{ scale: 1.05, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="
            relative flex-shrink-0 w-12 h-12 rounded-full 
            bg-gradient-to-br from-emerald-400 to-teal-500
            flex items-center justify-center shadow-md
            group-hover:shadow-lg transition-all duration-300
          "
        >
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <User className="w-6 h-6 text-white" />
          )}
          {/* Online indicator */}
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white dark:border-slate-800" />
        </motion.div>

        {/* Name and role */}
        <div className="flex-1">
          <motion.div
            className="font-semibold text-emerald-700 dark:text-emerald-300 text-lg"
            whileHover={{ x: 4 }}
          >
            {name}
          </motion.div>
          <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
            {role}
          </div>
        </div>
      </div>

      {/* Decorative line */}
      <div className="w-12 h-0.5 bg-gradient-to-r from-emerald-300 to-teal-300 dark:from-emerald-600 dark:to-teal-600 rounded-full mb-3 group-hover:w-20 transition-all duration-300" />

      {/* Stars rating with animation */}
      <motion.div
        className="mb-3 flex items-center gap-1"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        {Array.from({ length: rating }).map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="text-amber-400 text-lg"
          >
            ★
          </motion.span>
        ))}
        {Array.from({ length: 5 - rating }).map((_, i) => (
          <span key={i} className="text-gray-300 dark:text-gray-600 text-lg">
            ★
          </span>
        ))}

        {/* Rating number */}
        <span className="ml-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
          {rating}.0
        </span>
      </motion.div>

      {/* Comment with quote marks */}
      <div className="relative">
        {/* Opening quote */}
        <Quote className="absolute -top-1 -left-1 w-4 h-4 text-emerald-300 dark:text-emerald-600 opacity-50" />

        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed italic pl-4">
          {comment}
        </p>

        {/* Closing quote */}
        <Quote className="absolute -bottom-1 -right-1 w-4 h-4 text-emerald-300 dark:text-emerald-600 opacity-50 rotate-180" />
      </div>

      {/* Read more indicator on hover */}
      <motion.div
        className="absolute bottom-3 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ x: -10 }}
        whileHover={{ x: 0 }}
      >
        <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
          Đọc thêm
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </motion.div>

      {/* Progress bar at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-100 via-emerald-200 to-teal-100 dark:from-emerald-900 dark:via-emerald-800 dark:to-teal-900 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 dark:from-emerald-400 dark:to-teal-400"
          initial={{ width: "0%" }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
      `}</style>
    </motion.div>
  );
}
