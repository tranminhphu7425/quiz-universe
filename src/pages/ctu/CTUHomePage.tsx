// CTUHomePage.tsx
import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import {
  Calendar,
  Calculator,
  TrendingUp,
  Clock,
  Award,
  BookOpen,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Users,
  GraduationCap,
  Target,
  BarChart3,
  CalendarDays,
  ChevronRight,
  Zap
} from "lucide-react";
import Floating from "@/shared/ui/Floatting";
import FadeInOnView from "@/shared/ui/FadeInOnView";
import GradientText from "@/shared/ui/GradientText";
import TypewriterText from "@/shared/ui/TypewriterText";
import AnimatedGradientBackground from "@/components/ui/AnimatedGradientBackground";

const CTUHomePage: React.FC = () => {
  const features = [
    {
      id: 1,
      title: "Sắp xếp lịch học thông minh",
      description: "Công cụ giúp sinh viên sắp xếp thời khóa biểu tối ưu dựa trên môn học đã đăng ký, tránh trùng lịch và cân bằng thời gian học tập.",
      icon: Calendar,
      benefits: [
        "Tự động xếp lịch không trùng giờ",
        "Gợi ý phân bổ thời gian hợp lý",
        "Xuất lịch sang Google Calendar"
      ],
      link: "/ctu/calendar",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30",
      iconBg: "bg-blue-100 dark:bg-blue-900",
      buttonBg: "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
    },
    {
      id: 2,
      title: "Tính điểm trung bình tích lũy",
      description: "Tính toán điểm trung bình học kỳ và tích lũy theo hệ thống tín chỉ của Đại học Cần Thơ, hỗ trợ dự đoán điểm cuối kỳ.",
      icon: Calculator,
      benefits: [
        "Tính GPA theo chuẩn CTU",
        "Dự đoán điểm cần đạt để đạt mục tiêu",
        "Lưu lịch sử tính toán"
      ],
      link: "/ctu/calculator",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30",
      iconBg: "bg-green-100 dark:bg-green-900",
      buttonBg: "bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
    },
    {
      id: 3,
      title: "Lộ trình học tập 4 năm",
      description: "Lập kế hoạch lộ trình học tập toàn khóa, quản lý các môn học theo từng học kỳ và theo dõi tổng số tín chỉ tích lũy.",
      icon: TrendingUp,
      benefits: [
        "Thiết lập lộ trình học tập dài hạn",
        "Quản lý môn học theo từng năm",
        "Tự động tính tổng tín chỉ toàn khóa"
      ],
      link: "/ctu/roadmap-planner",
      gradient: "from-purple-500 to-indigo-500",
      bgGradient: "from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30",
      iconBg: "bg-purple-100 dark:bg-purple-900",
      buttonBg: "bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800"
    }
  ];

  const stats = [
    { value: "10,000+", label: "Sinh viên sử dụng", icon: Users },
    { value: "50,000+", label: "Lịch đã tạo", icon: CalendarDays },
    { value: "4.9/5", label: "Đánh giá từ người dùng", icon: Award },
    { value: "98%", label: "Hài lòng", icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 font-K2D transition-colors duration-300">

      {/* ====== HERO SECTION ====== */}
      <section className="relative overflow-hidden">
        <AnimatedGradientBackground />

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-10 px-6 py-16 lg:flex-row lg:items-center">
          <div className="w-full lg:w-[50%] text-center text-white lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 160, damping: 18 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/20 backdrop-blur"
            >
              <Sparkles className="h-4 w-4" />
              Đại học Cần Thơ • Công cụ sinh viên
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="text-center lg:text-left text-[2.5rem] md:text-[3rem] font-black leading-tight"
            >
              <TypewriterText
                text="Chào mừng đến với"
                className="text-3xl md:text-4xl font-bold"
              />
              <GradientText className="flex mx-auto lg:mx-0 text-[2.5rem] md:text-[3rem] font-[Poppins]">
                CTU Smart Tools
              </GradientText>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-4 w-full text-center lg:text-left text-white/90 dark:text-gray-200 text-lg"
            >
              Ứng dụng quản lý học tập thông minh dành riêng cho sinh viên
              <span className="font-semibold text-yellow-300"> Đại học Cần Thơ</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-6 flex flex-wrap justify-center gap-4 lg:justify-start"
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <button
                  onClick={() => {
                    const toolsSection = document.getElementById('tools');
                    if (toolsSection) {
                      toolsSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-6 py-2.5 font-semibold text-blue-950 shadow-lg hover:shadow-xl hover:brightness-105 transition-all duration-300"
                >
                  Khám phá công cụ <ArrowRight className="h-4 w-4" />
                </button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <a
                  href="#about"
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-6 py-2.5 font-medium text-white ring-1 ring-white/30 hover:bg-white/20 transition-all duration-300"
                >
                  Tìm hiểu thêm
                </a>
              </motion.div>
            </motion.div>
          </div>

          <div className="w-full lg:w-[50%]">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
              className="relative"
            >
              <div className="relative rounded-3xl bg-gradient-to-br from-white/10 to-white/5 p-1 backdrop-blur-sm">
                <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 p-8 text-white">
                  <GraduationCap className="h-16 w-16 mx-auto mb-4 opacity-80" />
                  <h3 className="text-2xl font-bold text-center mb-2">Đại học Cần Thơ</h3>
                  <p className="text-center text-white/80">Cộng đồng - Toàn diện - Ưu việt</p>
                  <div className="mt-6 flex justify-center gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">55+</div>
                      <div className="text-xs text-white/70">Ngành đào tạo</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">30,000+</div>
                      <div className="text-xs text-white/70">Sinh viên</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">1,500+</div>
                      <div className="text-xs text-white/70">Giảng viên</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating elements */}
        <Floating distance={12} duration={7} className="pointer-events-none absolute -top-6 left-8">
          <div className="rounded-xl bg-gradient-to-br from-yellow-300 to-amber-300 p-2 shadow-lg -rotate-6">
            <span className="text-xs font-black text-amber-800">HOT!</span>
          </div>
        </Floating>

        <Floating distance={10} duration={6} className="pointer-events-none absolute top-20 right-8">
          <div className="rounded-full bg-gradient-to-br from-purple-400 to-pink-400 p-3 shadow-xl rotate-12">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
        </Floating>

        <Floating distance={14} duration={8} className="pointer-events-none absolute bottom-12 left-6">
          <div className="rounded-xl bg-gradient-to-br from-emerald-300 to-teal-300 px-3 py-1 shadow-lg rotate-3">
            <span className="text-xs font-bold text-emerald-900">NEW!</span>
          </div>
        </Floating>
      </section>

      {/* ====== STATS SECTION ====== */}
      <section className="relative -mt-10 z-20">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-xl text-center"
              >
                <stat.icon className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== TOOLS SECTION ====== */}
      <section id="tools" className="py-20">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full bg-blue-100 dark:bg-blue-900/30 px-3 py-1 mb-4"
            >
              <Zap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Công cụ thông minh</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white"
            >
              Dành riêng cho sinh viên <span className="text-blue-600 dark:text-blue-400">CTU</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              viewport={{ once: true }}
              className="mt-2 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              Các công cụ hỗ trợ sinh viên trong việc lập kế hoạch học tập,
              theo dõi tiến độ và đạt kết quả tốt nhất
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const isFullWidth = index === features.length - 1 && features.length % 2 !== 0;
              
              return (
                <FadeInOnView 
                  key={feature.id} 
                  amount={0.2} 
                  className={isFullWidth ? "md:col-span-2" : ""}
                >
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="group relative bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 h-full"
                  >
                  {/* Gradient border effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} style={{ padding: '2px', mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor' }} />

                  <div className="relative p-8 h-full flex flex-col justify-between">
                    <div>
                      {/* Icon */}
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`w-16 h-16 ${feature.iconBg} rounded-2xl flex items-center justify-center mb-6`}
                      >
                        <feature.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                      </motion.div>

                      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
                        {feature.title}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                        {feature.description}
                      </p>

                      {/* Benefits list */}
                      <div className="space-y-3 mb-8">
                        {feature.benefits.map((benefit, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-3"
                          >
                            <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>


                    {/* CTA Button */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        to={feature.link}
                        className={`inline-flex items-center justify-between w-full px-6 py-3 ${feature.buttonBg} text-white font-semibold rounded-xl transition-all duration-300 group/btn`}
                      >
                        <span>Truy cập công cụ</span>
                        <ChevronRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </FadeInOnView>
            );
          })}
        </div>
        </div>
      </section>

      {/* ====== ABOUT SECTION ====== */}
      <section id="about" className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-800 dark:to-slate-900">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 dark:bg-blue-900/30 px-3 py-1 mb-4">
                <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Về chúng tôi</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                Hỗ trợ sinh viên CTU
                <span className="text-blue-600 dark:text-blue-400"> học tập hiệu quả</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Chúng tôi hiểu rằng việc quản lý thời gian và theo dõi kết quả học tập là
                những thách thức lớn đối với sinh viên đại học. Vì vậy, chúng tôi đã xây dựng
                các công cụ thông minh để giúp sinh viên CTU:
              </p>
              <div className="space-y-3">
                {[
                  "Tối ưu hóa thời khóa biểu, tránh lịch học chồng chéo",
                  "Tính toán chính xác điểm trung bình tích lũy (GPA)",
                  "Dự đoán điểm số cần đạt để đạt mục tiêu học tập",
                  "Xuất lịch học sang Google Calendar để dễ dàng theo dõi"
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 z-10" />
                <div className="bg-gradient-to-br from-blue-600 to-cyan-600 p-8 text-white relative z-20">
                  <GraduationCap className="h-20 w-20 mx-auto mb-4 opacity-50" />
                  <h3 className="text-2xl font-bold text-center mb-4">CTU Smart Tools</h3>
                  <p className="text-center text-white/90 mb-6">
                    "Công cụ thông minh cho sinh viên hiện đại"
                  </p>
                  <div className="flex justify-center">
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-yellow-300">
                        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                      </div>
                      <div className="text-sm mt-2 text-white/80">Được yêu thích bởi 10,000+ sinh viên</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <Floating distance={10} duration={6} className="absolute -top-4 -right-4 pointer-events-none">
                <div className="rounded-full bg-yellow-400 p-2 shadow-lg">
                  <Target className="h-5 w-5 text-blue-900" />
                </div>
              </Floating>
              <Floating distance={8} duration={5} className="absolute -bottom-4 -left-4 pointer-events-none">
                <div className="rounded-full bg-green-400 p-2 shadow-lg">
                  <BarChart3 className="h-5 w-5 text-blue-900" />
                </div>
              </Floating>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ====== CTA SECTION ====== */}
      <section className="py-20">
        <div className="container mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-800 p-8 md:p-12 text-center text-white shadow-2xl"
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-grid-white/5 bg-[length:20px_20px]" />
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl animate-blob" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl animate-blob animation-delay-2000" />

            <div className="relative z-10">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-1.5 mb-6"
              >
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-medium">Bắt đầu ngay hôm nay</span>
              </motion.div>

              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Sẵn sàng tối ưu việc học?
              </h2>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                Sử dụng các công cụ thông minh của chúng tôi để quản lý thời gian
                và theo dõi kết quả học tập một cách hiệu quả nhất.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/ctu/calendar"
                    className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-8 py-3 font-bold text-blue-900 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Calendar className="h-5 w-5" />
                    Sắp xếp lịch ngay
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/ctu/calculator"
                    className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-8 py-3 font-semibold text-white ring-1 ring-white/30 hover:bg-white/30 transition-all duration-300"
                  >
                    <Calculator className="h-5 w-5" />
                    Tính điểm GPA
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


    </div>
  );
};

export default CTUHomePage;