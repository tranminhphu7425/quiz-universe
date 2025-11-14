import { useMemo } from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart, Users2, BookOpen, ShieldCheck, Rocket, Trophy } from "lucide-react";
import Floating from "@/shared/ui/Floatting";

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





  const tileUrl = useMemo(
    () =>
      encodeURIComponent(`
      <svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160' fill='none'>
        <g stroke='#10b981' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>
          <path d='M28 36h40a8 8 0 018 8v44H36a8 8 0 01-8-8V36z' opacity='0.7'/>
          <path d='M28 52h48' opacity='0.6'/>
          <rect x='96' y='28' width='36' height='28' rx='4' />
          <path d='M100 36h18M100 44h18' opacity='0.6'/>
        </g>
      </svg>
    `),
    []
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-800">


      <section className="relative overflow-hidden">
        {/* Gradient nền — đẩy xuống dưới cùng */}
        <div className="absolute inset-0  bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-400
                  dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />

        {/* Tile mờ — dưới nội dung nhưng trên gradient */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-[120%] md:w-full opacity-10 dark:opacity-[0.15]"
          style={{
            backgroundImage: `url("data:image/svg+xml;utf8,${tileUrl}")`,
            backgroundRepeat: "repeat",
            backgroundSize: "160px 160px",
            maskImage: "radial-gradient(1200px 400px at left center, #000 70%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(1200px 400px at left center, #000 70%, transparent 100%)",
          }}
        />

        {/* Blur blobs — nằm giữa (dưới text) */}
        <div className="pointer-events-none absolute z-0 -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl dark:bg-emerald-400/20" />
        <div className="pointer-events-none absolute z-0 -right-16 top-10 h-64 w-64 rounded-full bg-white/10 blur-2xl dark:bg-purple-400/20" />

        {/* Hero section — kéo lên trên cùng */}
        <motion.div className="relative z-10 text-center mx-auto max-w-6xl px-6 py-20">
          {/* Badge */}
          <div className="mb-3 inline-flex items-center gap-2 rounded-full
                    bg-white/60 px-3 py-1 text-xs font-semibold
                    text-emerald-900 ring-1 ring-emerald-300/50 backdrop-blur
                    dark:bg-white/5 dark:text-white dark:ring-white/10">
            <Users2 className="h-4 w-4" />
            Về QuizUniverse
          </div>

          {/* Tiêu đề */}
          <h1 className="text-4xl font-black leading-tight text-white">
            
              Nền tảng ngân hàng & tạo đề thi hiện đại
           
          </h1>

          {/* Mô tả — đổi màu để nổi bật trên nền xanh */}
          <p className="mt-3 text-white/90 dark:text-gray-300">
            Giúp giảng viên chuẩn hoá nội dung, sinh viên luyện tập hiệu quả và nhà trường quản trị dễ dàng.
          </p>
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
