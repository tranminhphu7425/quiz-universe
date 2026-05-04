import { motion } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import {
  MdEmojiEvents as Trophy,
  MdCheckCircleOutline as CheckCircle2,
  MdHighlightOff as XCircle,
  MdAccessTime as Clock,
  MdInsertChartOutlined as BarChart3,
  MdAdsClick as Target,
  MdArrowBack as ArrowLeft,
  MdReplay as RotateCcw,
  MdExpandMore as ChevronDown,
  MdAutoStories as BookOpen
} from 'react-icons/md';
import { useState } from "react";
import FadeInOnView from "@/shared/ui/FadeInOnView";

interface ReviewOption { label: string; content: string; }
interface ReviewQuestion { id: number; stem: string; options: ReviewOption[]; }

// Mock correct answers & data
const CORRECT_ANSWERS: Record<number, string> = { 1: "B", 2: "B", 3: "C", 4: "B", 5: "B" };

const MOCK_EXAM_DATA = {
  title: "Kiểm tra giữa kỳ - Lập trình Python",
  duration: 30,
  questions: [
    { id: 1, stem: "Python là ngôn ngữ lập trình thuộc loại nào?", options: [
      { label: "A", content: "Compiled language" }, { label: "B", content: "Interpreted language" },
      { label: "C", content: "Assembly language" }, { label: "D", content: "Machine language" }
    ]},
    { id: 2, stem: "Cú pháp nào dùng để khai báo hàm trong Python?", options: [
      { label: "A", content: "function myFunc():" }, { label: "B", content: "def myFunc():" },
      { label: "C", content: "func myFunc():" }, { label: "D", content: "void myFunc():" }
    ]},
    { id: 3, stem: "Kiểu dữ liệu nào KHÔNG có trong Python?", options: [
      { label: "A", content: "list" }, { label: "B", content: "tuple" },
      { label: "C", content: "array" }, { label: "D", content: "dictionary" }
    ]},
    { id: 4, stem: "Output của print(type(5.0)) là gì?", options: [
      { label: "A", content: "<class 'int'>" }, { label: "B", content: "<class 'float'>" },
      { label: "C", content: "<class 'double'>" }, { label: "D", content: "<class 'number'>" }
    ]},
    { id: 5, stem: "Toán tử // trong Python dùng để làm gì?", options: [
      { label: "A", content: "Chia lấy dư" }, { label: "B", content: "Chia lấy phần nguyên" },
      { label: "C", content: "Lũy thừa" }, { label: "D", content: "Comment" }
    ]},
  ] as ReviewQuestion[],
};

export default function ReviewExamPage() {
  const location = useLocation();
  const userAnswers: Record<number, string> = location.state?.answers || { 1: "B", 2: "B", 3: "A", 4: "B", 5: "D" };
  const exam = location.state?.examData || MOCK_EXAM_DATA;

  const [expandedQ, setExpandedQ] = useState<number | null>(null);

  const totalQuestions = exam.questions.length;
  const correctCount = exam.questions.filter((q: ReviewQuestion) => userAnswers[q.id] === CORRECT_ANSWERS[q.id]).length;
  const wrongCount = Object.keys(userAnswers).length - correctCount;
  const unanswered = totalQuestions - Object.keys(userAnswers).length;
  const score = ((correctCount / totalQuestions) * 10).toFixed(1);
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  const getGrade = () => {
    if (percentage >= 90) return { text: "Xuất sắc!", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-100 dark:bg-emerald-900/40" };
    if (percentage >= 70) return { text: "Tốt!", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-900/40" };
    if (percentage >= 50) return { text: "Trung bình", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-100 dark:bg-amber-900/40" };
    return { text: "Cần cố gắng!", color: "text-rose-600 dark:text-rose-400", bg: "bg-rose-100 dark:bg-rose-900/40" };
  };
  const grade = getGrade();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-800">
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -right-16 top-10 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-white">
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/20 backdrop-blur">
                <BarChart3 className="h-4 w-4" />
                <span>Kết quả bài thi • Phân tích chi tiết</span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
                className="text-3xl md:text-4xl font-black leading-tight">
                {exam.title}
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="mt-4 text-white/90 max-w-2xl">
                Xem lại kết quả và phân tích chi tiết từng câu hỏi để cải thiện kiến thức.
              </motion.p>
            </div>
            {/* Score Card */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
              className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-emerald-400/20 to-teal-400/20 blur-xl" />
              <div className="relative rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-8 text-center min-w-[200px]">
                <Trophy className="h-10 w-10 text-yellow-300 mx-auto mb-3" />
                <div className="text-5xl font-black text-white">{score}</div>
                <div className="text-sm text-white/80 mt-1">/ 10 điểm</div>
                <div className={`mt-3 inline-block rounded-full px-4 py-1 text-sm font-bold ${grade.bg} ${grade.color}`}>
                  {grade.text}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-6">
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 hover:underline">
            <ArrowLeft className="h-4 w-4" /> Quay lại Dashboard
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main - Question Review */}
          <div className="lg:col-span-2 space-y-4">
            <FadeInOnView amount={0.1}>
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-emerald-600 dark:text-emerald-400" /> Chi tiết từng câu hỏi
              </h2>
            </FadeInOnView>

            {exam.questions.map((q: ReviewQuestion, idx: number) => {
              const userAns = userAnswers[q.id];
              const correctAns = CORRECT_ANSWERS[q.id];
              const isCorrect = userAns === correctAns;
              const isExpanded = expandedQ === q.id;

              return (
                <FadeInOnView key={q.id} amount={0.1} delay={idx * 0.05}>
                  <div className={`rounded-2xl border-2 bg-white dark:bg-slate-900 shadow-sm overflow-hidden transition-all ${
                    isCorrect ? 'border-emerald-200 dark:border-emerald-800' : 'border-rose-200 dark:border-rose-800'}`}>
                    {/* Question Header */}
                    <button onClick={() => setExpandedQ(isExpanded ? null : q.id)}
                      className="w-full flex items-center gap-4 p-5 text-left hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full flex-shrink-0 ${
                        isCorrect ? 'bg-emerald-100 dark:bg-emerald-900/40' : 'bg-rose-100 dark:bg-rose-900/40'}`}>
                        {isCorrect
                          ? <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                          : <XCircle className="h-5 w-5 text-rose-600 dark:text-rose-400" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Câu {idx + 1}</span>
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{q.stem}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                          isCorrect ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                          : 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300'}`}>
                          {isCorrect ? "Đúng" : "Sai"}
                        </span>
                        <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </div>
                    </button>

                    {/* Expanded Options */}
                    {isExpanded && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                        className="border-t border-gray-100 dark:border-slate-700 p-5 space-y-2">
                        {q.options.map((opt: ReviewOption) => {
                          const isUserChoice = userAns === opt.label;
                          const isCorrectOption = correctAns === opt.label;
                          let cls = "border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900";
                          if (isCorrectOption) cls = "border-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 dark:border-emerald-600";
                          else if (isUserChoice && !isCorrectOption) cls = "border-rose-400 bg-rose-50 dark:bg-rose-900/30 dark:border-rose-600";

                          return (
                            <div key={opt.label} className={`flex items-center gap-3 rounded-xl border-2 p-3 ${cls}`}>
                              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold flex-shrink-0 ${
                                isCorrectOption ? 'bg-emerald-500 text-white'
                                : isUserChoice ? 'bg-rose-500 text-white'
                                : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300'}`}>
                                {opt.label}
                              </div>
                              <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">{opt.content}</span>
                              {isCorrectOption && <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />}
                              {isUserChoice && !isCorrectOption && <XCircle className="h-4 w-4 text-rose-500 flex-shrink-0" />}
                            </div>
                          );
                        })}
                        {!isCorrect && (
                          <div className="mt-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 p-3 border border-blue-200 dark:border-blue-700/30">
                            <p className="text-sm text-blue-700 dark:text-blue-300">
                              <span className="font-bold">Đáp án đúng: </span>{correctAns}
                            </p>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>
                </FadeInOnView>
              );
            })}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <FadeInOnView amount={0.2}>
              <div className="sticky top-8 space-y-6">
                {/* Stats */}
                <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-lg border border-emerald-100 dark:border-slate-700">
                  <h3 className="mb-4 text-lg font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-2">
                    <Target className="h-5 w-5" /> Thống kê
                  </h3>
                  <div className="space-y-4">
                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-500 dark:text-gray-400">Tỉ lệ đúng</span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">{percentage}%</span>
                      </div>
                      <div className="h-3 rounded-full bg-gray-100 dark:bg-slate-700 overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${percentage}%` }} transition={{ duration: 1, delay: 0.5 }}
                          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-500" />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="rounded-lg bg-emerald-50 dark:bg-emerald-900/20 p-3 text-center">
                        <div className="text-xl font-bold text-emerald-700 dark:text-emerald-300">{correctCount}</div>
                        <div className="text-xs text-emerald-600 dark:text-emerald-400">Đúng</div>
                      </div>
                      <div className="rounded-lg bg-rose-50 dark:bg-rose-900/20 p-3 text-center">
                        <div className="text-xl font-bold text-rose-700 dark:text-rose-300">{wrongCount}</div>
                        <div className="text-xs text-rose-600 dark:text-rose-400">Sai</div>
                      </div>
                      <div className="rounded-lg bg-gray-50 dark:bg-slate-700 p-3 text-center">
                        <div className="text-xl font-bold text-gray-700 dark:text-gray-300">{unanswered}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Bỏ qua</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-slate-700">
                      <Clock className="h-4 w-4" /> Thời gian làm bài: {exam.duration} phút
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                  <Link to="/dashboard"
                    className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4 font-bold text-white text-center shadow-lg hover:from-emerald-600 hover:to-teal-600 transition-all">
                    Về Dashboard
                  </Link>
                  <button className="rounded-xl border-2 border-emerald-200 dark:border-slate-600 px-6 py-4 font-medium text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all flex items-center justify-center gap-2">
                    <RotateCcw className="h-4 w-4" /> Làm lại
                  </button>
                </div>
              </div>
            </FadeInOnView>
          </div>
        </div>
      </div>
    </div>
  );
}
