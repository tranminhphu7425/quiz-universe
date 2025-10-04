
// 2) Thêm component này (cùng file hoặc import riêng)
import { motion } from "framer-motion";
import { Database, FileText, Shuffle, BookOpen, Upload, CheckCircle2 } from "lucide-react";
import { Printer } from 'lucide-react'; // or from your chosen icon library
import { Users } from 'lucide-react';
import { fetchTotalQuestionCount } from "@/shared/api/questionsApi";
import { useEffect, useState } from "react";
import React from "react";


const coderData = {
  name: "Zane Whitaker",
  role: "Frontend Developer",
  seniority: "Mid-Level",
  location: "Bangladesh",
  skills: [
    "React",
    "Next.js",
    "JavaScript",
    "TypeScript",
    "TailwindCSS",
    "CSS",
    "Figma",
    "GitHub",
    "HTML",
    "Astro",
    "Node.js",
    "Express",
    "MongoDB",
    "Firebase",
    "Git",
  ],
};

function Card({
  title,
  subtitle,
  icon,
  footer,
  delay = 0,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  footer?: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 130, damping: 16 }}
      whileHover={{ y: -2 }}
      className="rounded-xl border border-white/25 bg-white/10 p-4 text-gray-800 dark:text-gray-200 shadow-lg backdrop-blur-md
             dark:border-gray-700 dark:bg-gray-800/60"
    >
      <div className="mb-2 flex items-center gap-2">
        <span className="rounded-md bg-white/15 p-2 dark:bg-gray-700/50">
          {icon}
        </span>
        <div className="font-semibold text-gray-900 dark:text-gray-100">{title}</div>
      </div>
      <div className="text-sm text-gray-700 dark:text-gray-300">{subtitle}</div>
      {footer && (
        <div className="mt-3 text-xs text-gray-600 dark:text-gray-400">{footer}</div>
      )}
    </motion.div>

  );
}

export function HeroIllustration() {
  const [count, setCount] = useState<number | null>(null);
  useEffect(() => {
    fetchTotalQuestionCount().then(setCount).catch(console.error);
  }), [];
  return (
    <div className="relative select-none">
    
      {/* Glowing border top */}
      <div className="flex flex-row absolute -top-px left-0 right-0">
        <div className="h-[2px] w-1/2 bg-gradient-to-r 
                  from-transparent via-emerald-300 to-sky-300 
                  dark:via-red-400 dark:to-yellow-400" />
        <div className="h-[2px] w-1/2 bg-gradient-to-r 
                  from-sky-300 to-transparent 
                  dark:from-yellow-400 dark:to-transparent" />
      </div>

      {/* Glowing border bottom */}
      <div className="flex flex-row absolute -bottom-px left-0 right-0">
        <div className="h-[2px] w-1/2 bg-gradient-to-r 
                  from-transparent via-emerald-300 to-sky-300 
                  dark:via-yellow-300 dark:to-green-300" />
        <div className="h-[2px] w-1/2 bg-gradient-to-r 
                  from-sky-300 to-transparent 
                  dark:from-green-300 dark:to-transparent" />
      </div>


      {/* Main container */}
      <div className="relative rounded-2xl border border-white/30 bg-gradient-to-br from-blue-50 to-white/20 p-5 text-gray-800 shadow-xl backdrop-blur
                      dark:border-blue-900/50 dark:from-gray-900/80 dark:to-blue-900/20 dark:text-white">

        {/* Three-step pipeline */}
        <div className="grid gap-6 lg:grid-cols-3 ">
          {/* 1. Question Bank */}
          <div className="content-between grid grid-cols-1">
            <Card
              delay={0.02}
              title="Kho câu hỏi đa môn"
              subtitle="Phân loại theo môn học • Chương/bài • Đa dạng mẫu câu hỏi"
              icon={<Database className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
              footer={
                <div className="flex items-center justify-between">
                  <span>Lịch sử Đảng • 2,450 câu</span>
                  <span
                    className="inline-flex items-center gap-1 rounded-md  bg-emerald-400
             dark:bg-emerald-400/20  px-2 py-0.5 
             text-gray-100 dark:text-emerald-100"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" /> Đã kiểm duyệt
                  </span>

                </div>
              }

            />
            <div>
              <div className="my-4 hidden h-0.5 w-full rounded bg-green-400 dark:bg-blue-900/50 sm:block" />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="flex items-center gap-2 text-xs text-gray-600 dark:text-blue-200 h-10"
              >
                <Upload className="h-4 w-4" /> Nhập từ Excel/GIFT/Moodle XML
              </motion.div>
            </div>

          </div>

          {/* 2. Exam Creation */}
          <div className="content-between grid grid-cols-1">
            <Card
              delay={0.06}
              title="Tạo đề thi linh hoạt"
              subtitle="Kết hợp từ nhiều kho • Tự động cân đối độ khó • Tạo nhiều mã đề"
              icon={<Shuffle className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
              footer={
                <div className="flex items-center justify-between">
                  <span className="text-gray-800 dark:text-gray-200">
                    Giữa kỳ Toán • 40 câu
                  </span>
                  <span
                    className="inline-flex items-center gap-1 rounded-md px-2 py-0.5
               bg-blue-100 text-blue-800
               dark:bg-blue-400/20 dark:text-blue-100"
                  >
                    <FileText className="h-3.5 w-3.5" /> 5 mã đề
                  </span>
                </div>

              }
            />
            <div>
              <div className="my-4 hidden h-0.5 w-full rounded bg-green-400 dark:bg-blue-900/50 sm:block" />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.22 }}
                className="flex items-center gap-2 text-xs text-gray-600 dark:text-blue-200 h-10"
              >
                <Printer className="h-4 w-4" /> Xuất PDF, Word hoặc LMS
              </motion.div>
            </div>
          </div>

          {/* 3. Document Conversion */}
          <div className="content-between grid grid-cols-1">
            <Card
              delay={0.1}
              title="Chuyển tài liệu thành câu hỏi"
              subtitle="Tự động sinh câu hỏi từ tài liệu • Hỗ trợ nhiều định dạng"
              icon={<BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
              footer={<span>Giáo trình Vật lý 12 • 28 câu nháp</span>}
            />
            <div>
              <div className="my-4 hidden h-0.5 w-full rounded bg-green-400 dark:bg-blue-900/50 sm:block" />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.28 }}
                className="flex items-center gap-2 text-xs text-gray-600 dark:text-blue-200 h-10"
              >
                <Users className="h-4 w-4" /> Phê duyệt tập thể trước khi sử dụng
              </motion.div>
            </div>

          </div>
        </div>

        {/* Quick status panel */}
        <motion.ul
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="mt-6 space-y-2 text-sm"
        >
          <li className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-blue-200">Tổng số môn học</span>
            <span className="font-medium">12 môn</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-blue-200">Tổng số câu hỏi</span>
            <span className="font-medium">{count} câu</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-blue-200">Đề thi đã tạo</span>
            <span className="rounded-md bg-blue-100 px-2 py-0.5 font-medium text-blue-800 dark:bg-blue-900/50 dark:text-blue-200">127 đề</span>
          </li>
        </motion.ul>
      </div>

      {/* Glowing border bottom */}
      <div className="absolute -bottom-px right-11 left-20 h-px bg-gradient-to-r from-white/0 via-white/70 to-white/0 dark:via-blue-500" />
    </div>
  );
}

// Assuming Card is a separate component with these props:
interface CardProps {
  delay: number;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  footer: React.ReactNode;
}


export default HeroIllustration;