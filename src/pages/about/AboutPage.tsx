import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MdAutoAwesome as Sparkles,
  MdPeople as Users2,
  MdAutoStories as BookOpen,
  MdGppGood as ShieldCheck,
  MdRocketLaunch as Rocket,
  MdEmojiEvents as Trophy,
  MdAddCircleOutline as PlusCircle,
  MdChevronRight as ChevronRight,
  MdArrowForward as ArrowRight,
  MdEmojiEvents as Award,
  MdAdsClick as Target,
  MdStarOutline as Star,
  MdTrendingUp as TrendingUp,
  MdDashboard as Dashboard
} from 'react-icons/md';
import { useAuth } from "@/app/providers/AuthProvider";
import { HeroApi, HeroStats } from "@/shared/api/heroApi";
import Floating from "@/shared/ui/Floatting";
import AnimatedGradientBackground from "@/shared/ui/AnimatedGradientBackground";
import TypewriterText from "@/shared/ui/TypewriterText";
import GradientText from "@/shared/ui/GradientText";
import FadeInOnView from "@/shared/ui/FadeInOnView";

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
  { name: "Phú Trần Minh", role: "Founder / Full-stack", avatar: "src/assets/images/logo/Phu'sAvatar.jpg" },
];

export default function AboutPage() {
  const { user } = useAuth();
  const [dynamicStats, setDynamicStats] = useState<HeroStats | null>(null);

  useEffect(() => {
    HeroApi.getStatistics()
      .then(setDynamicStats)
      .catch(err => console.error("Failed to fetch about stats:", err));
  }, []);

  const stats = useMemo(() => [
    { label: "Ngân hàng câu hỏi", value: dynamicStats ? `${dynamicStats.totalQuestions.toLocaleString()}+` : "25,000+" },
    { label: "Môn học", value: dynamicStats ? `${dynamicStats.totalSubjects}+` : "40+" },
    { label: "Trường sử dụng", value: dynamicStats ? `${dynamicStats.totalUniversities}+` : "60+" },
    { label: "Bài thi đã tạo", value: dynamicStats ? `${dynamicStats.totalExams.toLocaleString()}+` : "120,000+" },
  ], [dynamicStats]);

  const achievements = useMemo(
    () => [
      { year: "2026", title: "Khởi tạo dự án", desc: "Thử nghiệm thành công tại 2 khoa", icon: <Rocket className="h-4 w-4" /> },
      { year: "2026", title: "Ra mắt QuizUniverse 1.0", desc: "Hỗ trợ tạo đề từ tài liệu", icon: <Star className="h-4 w-4" /> },
      { year: "2026", title: "Đạt 5,000+ người dùng", desc: "Mở rộng ra nhiều trường đại học", icon: <TrendingUp className="h-4 w-4" /> },
    ],
    []
  );

  return (
    <div className="about-page bg-slate-50 dark:bg-slate-900">
      {/* ====== HERO SECTION ====== */}
      <section className="relative overflow-hidden">
        <AnimatedGradientBackground />

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-10 px-6 py-16 lg:flex-row lg:items-center">
          {/* Left content */}
          <div className="w-full text-center text-white lg:w-[55%] lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/20 backdrop-blur"
            >
              <Sparkles className="h-4 w-4" />
              Về QuizUniverse
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="text-center lg:text-left text-[2.5rem] md:text-[3rem] font-black leading-tight"
            >
              <TypewriterText text="Câu chuyện về" />
              <GradientText className="flex mx-auto lg:mx-0 text-[2.5rem] md:text-[3rem]">
                QuizUniverse
              </GradientText>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-4 text-center lg:text-left text-white/90 dark:text-gray-300 text-lg"
            >
              Nền tảng ngân hàng câu hỏi & tạo đề thi thông minh,
              giúp giảng viên chuẩn hoá nội dung, sinh viên luyện tập hiệu quả.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start"
            >
              <Link
                to="/question-banks"
                className="group inline-flex items-center gap-2 rounded-full bg-yellow-400 px-6 py-2.5 font-semibold text-emerald-950 shadow hover:brightness-105 transition-all"
              >
                Khám phá ngay <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to={user ? "/dashboard" : "/register"}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-6 py-2.5 font-medium text-white ring-1 ring-white/30 hover:bg-white/20 transition-all"
              >
                {user ? "Vào bảng điều khiển" : "Đăng ký miễn phí"}
              </Link>
            </motion.div>
          </div>

          {/* Right illustration */}
          <div className="w-full lg:w-[45%]">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="relative"
            >
              <div className="rounded-3xl bg-gradient-to-br from-white/10 to-white/5 p-8 backdrop-blur-sm ring-1 ring-white/20">
                <div className="text-center">
                  <Award className="h-16 w-16 mx-auto text-yellow-400 mb-4" />
                  <p className="text-white/80 text-sm italic">
                    "Đơn giản hóa việc tạo đề thi, nâng cao chất lượng giáo dục"
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating decorations */}
        <Floating distance={12} duration={7} className="pointer-events-none absolute -top-6 -left-8">
          <div className="rounded-xl bg-gradient-to-br from-amber-300 to-rose-300 p-2 shadow-lg -rotate-6">
            <span className="text-xs font-black text-rose-700">MISSION</span>
          </div>
        </Floating>

        <Floating distance={10} duration={6} className="pointer-events-none absolute top-12 -right-6">
          <div className="rounded-full bg-gradient-to-br from-purple-400 to-indigo-400 p-3 shadow-xl rotate-12">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
        </Floating>
      </section>

      {/* ====== STATS SECTION ====== */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <FadeInOnView amount={0.2}>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
            {stats.map((s, idx) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="group rounded-2xl bg-gradient-to-br from-white to-emerald-50 p-6 text-center shadow-lg ring-1 ring-emerald-100 transition-all duration-300 hover:shadow-xl dark:from-slate-800 dark:to-slate-900 dark:ring-slate-700"
              >
                <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform">
                  {s.value}
                </div>
                <div className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </FadeInOnView>
      </section>

      {/* ====== VALUES SECTION ====== */}
      <section className="bg-emerald-50 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="mb-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300"
            >
              <Target className="h-3 w-3" />
              Giá trị cốt lõi
            </motion.div>
            <h2 className="mt-4 text-3xl font-bold text-emerald-900 dark:text-emerald-300">
              Định hướng phát triển
            </h2>
            <p className="mt-2 text-emerald-800/80 dark:text-slate-300/80">
              Những giá trị làm nên QuizUniverse
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {values.map((v, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="group rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-2xl dark:bg-slate-800"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-400 text-white shadow-lg group-hover:scale-110 transition-transform">
                  {v.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">{v.title}</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== TIMELINE SECTION ====== */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300"
          >
            <Trophy className="h-3 w-3" />
            Hành trình phát triển
          </motion.div>
          <h2 className="mt-4 text-3xl font-bold text-emerald-900 dark:text-emerald-300">
            Cột mốc nổi bật
          </h2>
          <p className="mt-2 text-emerald-800/80 dark:text-slate-300/80">
            Những thành tựu đã đạt được
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 h-full w-0.5 bg-gradient-to-b from-emerald-400 via-emerald-500 to-transparent md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-8">
            {achievements.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`relative flex flex-col md:flex-row ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-400 text-white shadow-lg md:left-1/2">
                  {item.icon}
                </div>

                {/* Content */}
                <div className={`ml-16 w-full md:w-1/2 ${idx % 2 === 0 ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"}`}>
                  <div className="rounded-2xl bg-white p-6 shadow-lg transition-all hover:shadow-xl dark:bg-slate-800">
                    <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
                      {item.year}
                    </span>
                    <h3 className="mt-3 text-lg font-bold text-gray-800 dark:text-white">{item.title}</h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== TEAM SECTION ====== */}
      <section className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-slate-900 dark:to-slate-800">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="mb-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300"
            >
              <Users2 className="h-3 w-3" />
              Đội ngũ phát triển
            </motion.div>
            <h2 className="mt-4 text-3xl font-bold text-emerald-900 dark:text-emerald-300">
              Những người đứng sau
            </h2>
            <p className="mt-2 text-emerald-800/80 dark:text-slate-300/80">
              Đam mê giáo dục số & trải nghiệm người dùng
            </p>
          </div>

          <div className="grid gap-6 grid-cols-1">
            {team.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="group rounded-2xl bg-white p-6 text-center shadow-lg transition-all duration-300 hover:shadow-2xl dark:bg-slate-800"
              >
                <div className="relative mx-auto mb-4 h-32 w-32">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400 to-teal-400 opacity-80 group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-1 flex items-center justify-center rounded-full bg-white dark:bg-slate-800">
                    <img src={member.avatar} alt={member.name} className="w-full h-full object-cover rounded-full" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">{member.name}</h3>
                <p className="text-sm text-emerald-600 dark:text-emerald-400">{member.role}</p>
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                  Đam mê giáo dục số & trải nghiệm học tập lấy người dùng làm trung tâm.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== CTA SECTION ====== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800" />
        <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-emerald-400/20 blur-3xl animate-blob" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-teal-400/20 blur-3xl animate-blob animation-delay-2000" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur"
          >
            <Sparkles className="h-3 w-3" />
            Tham gia cùng chúng tôi
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-3xl font-bold text-white md:text-4xl"
          >
            Sẵn sàng trải nghiệm?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-4 max-w-2xl text-white/90"
          >
            Đăng ký ngay để bắt đầu hành trình chinh phục tri thức cùng QuizUniverse
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            <Link
              to={user ? "/dashboard" : "/register"}
              className="group inline-flex items-center gap-2 rounded-full bg-yellow-400 px-8 py-3 font-bold text-emerald-950 shadow-lg transition-all hover:shadow-xl hover:brightness-105"
            >
              {user ? "Vào bảng điều khiển" : "Đăng ký miễn phí"}
              {user ? <Dashboard className="h-4 w-4" /> : <Rocket className="h-4 w-4 group-hover:translate-x-1 transition-transform" />}
            </Link>
            <Link
              to="/question-banks"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-8 py-3 font-semibold text-white backdrop-blur ring-1 ring-white/30 transition-all hover:bg-white/20"
            >
              Khám phá ngân hàng câu hỏi
            </Link>
          </motion.div>
        </div>

        <style>{`
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          .animate-blob { animation: blob 7s infinite; }
          .animation-delay-2000 { animation-delay: 2s; }
        `}</style>
      </section>
    </div>
  );
}
