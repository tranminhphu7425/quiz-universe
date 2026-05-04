
// 2) Thêm component này (cùng file hoặc import riêng)
import { motion } from "framer-motion";
import {
  MdStorage as Database,
  MdDescription as FileText,
  MdShuffle as Shuffle,
  MdAutoStories as BookOpen,
  MdUpload as Upload,
  MdCheckCircleOutline as CheckCircle2,
  MdAutoAwesome as Sparkles
} from 'react-icons/md';
import {
  MdPrint as Printer
} from 'react-icons/md'; // or from your chosen icon library
import {
  MdPeopleOutline as Users
} from 'react-icons/md';
import { fetchAllSubjects } from "@/shared/api/subjectApi";
import { QuestionBankApi } from "@/shared/api/questionBanksApi";
import { useEffect, useState } from "react";
import React from "react";




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
             dark:border-gray-700 dark:bg-gray-800/60 h-full flex flex-col content-between"
    >
      <div className="mb-auto flex items-center gap-2">
        <span className="rounded-md bg-white/15 p-2 dark:bg-gray-700/50">
          {icon}
        </span>
        <div className="font-semibold text-gray-900 dark:text-gray-100">{title}</div>
      </div>
      <div className = "flex flex-col mt-2">
      <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line flex-1">{subtitle.trim()}</div>
      {footer && (
        <div className="mt-auto pt-3 text-xs text-gray-600 dark:text-gray-400">{footer}</div>
      )}
      </div>
    </motion.div>

  );
}

export function HeroIllustration() {
  const [stats, setStats] = useState<{
    totalBanks: number;
    totalQuestions: number;
    totalSubjects: number;
  } | null>(null);

  useEffect(() => {
    async function loadStats() {
      try {
        const [statData, subjects] = await Promise.all([
          QuestionBankApi.statistics(),
          fetchAllSubjects()
        ]);
        setStats({
          totalBanks: statData.totalBanks,
          totalQuestions: statData.totalQuestions,
          totalSubjects: subjects.length
        });
      } catch (err) {
        console.error("Failed to fetch stats for Hero:", err);
      }
    }
    loadStats();
  }, []);

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
        <div className="grid gap-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          {/* 1. Question Bank */}
          <div className="flex flex-col h-full">
            <Card
              delay={0.02}
              title="Ngân hàng Câu hỏi"
              subtitle={`• Tổ chức theo thư mục
• Phân loại độ khó
• Gắn thẻ nhãn`}
              icon={<Database className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />}
              footer={
                <div className="flex items-center justify-between">
                  <span
                    className="inline-flex items-center gap-1 rounded-md  bg-emerald-500
             dark:bg-emerald-500/20  px-2 py-0.5 
             text-white dark:text-emerald-100"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" /> Đã xác thực
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
          <div className="flex flex-col h-full">
            <Card
              delay={0.06}
              title="Tạo đề thi thông minh"
              subtitle={`• Trộn mã đề tự động
• Cân đối kiến thức
• Tùy chỉnh thang điểm`}
              icon={<Shuffle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />}
              footer={
                <div className="flex items-center justify-between">
                  <span
                    className="inline-flex items-center gap-1 rounded-md px-2 py-0.5
               bg-emerald-50 text-emerald-700
               dark:bg-emerald-400/20 dark:text-emerald-100"
                  >
                    <FileText className="h-3.5 w-3.5" /> Hỗ trợ nhiều mã đề
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
          <div className="flex flex-col h-full">
            <Card
              delay={0.1}
              title="Công cụ AI Quiz"
              subtitle={`• Sinh câu hỏi từ PDF/Docx
• Lấy nội dung từ giáo trình
• Gợi ý đáp án thông minh`}
              icon={<BookOpen className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />}
              footer={
                <div className="flex items-center justify-between">
                  <span
                    className="inline-flex items-center gap-1 rounded-md px-2 py-0.5
               bg-emerald-50 text-emerald-700
               dark:bg-emerald-400/20 dark:text-emerald-100"
                  >
                    <Sparkles className="h-3.5 w-3.5" /> AI xử lý tự động
                  </span>
                </div>
              }
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
            <span className="text-gray-600 dark:text-emerald-200">Học phần khả dụng</span>
            <span className="font-medium">{stats?.totalSubjects ?? "2"} học phần</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-emerald-200">Tổng số câu hỏi</span>
            <span className="font-medium">{stats?.totalQuestions ?? "600+"} câu</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-emerald-200">Bộ đề thi hiện có</span>
            <span className="rounded-md bg-emerald-100 px-2 py-0.5 font-medium text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200">
              {stats?.totalBanks ?? "6"} bộ đề
            </span>
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