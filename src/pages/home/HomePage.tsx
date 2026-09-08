// src/pages/home/HomePage.tsx
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  MdAutoAwesome as Sparkles,
  MdAutoStories as BookOpen,
  MdChecklist as ListChecks,
  MdArrowForward as ArrowRight,
  MdRocketLaunch as Rocket,
  MdFlashOn as Zap
} from 'react-icons/md';
import { useAuth } from "@/app/providers/AuthProvider";
import FeatureCard from "@/widgets/FeatureCard";
import StepCard from "@/widgets/StepCard";
import HeroIllustration from "@/widgets/HeroIllustration";
import TestimonialCard from "@/widgets/TestimonialCard";
import TestimonialsSection from "./ui/TestimonialsSection";
import CTASection from "./ui/CTASection";
import Floating from "@/shared/ui/Floatting";
import {
  MdFavoriteBorder as Heart
} from 'react-icons/md';
import {
  MdAssignment as ClipboardList,
  MdSend as Send,
  MdCheckCircleOutline as CheckCircle2
} from 'react-icons/md';
import FadeInOnView from "@/shared/ui/FadeInOnView";
import React from 'react';
import TypewriterText from "@/shared/ui/TypewriterText";
import OrbitingSkills from "@/shared/ui/OrbitingSkills";
import { IoLibrary } from "react-icons/io5";
import GradientText from "@/shared/ui/GradientText";
import AnimatedGradientBackground from "@/shared/ui/AnimatedGradientBackground";




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


      <TestimonialsSection testimonials={testimonials} />

      <CTASection />

    </div>
  );
}


