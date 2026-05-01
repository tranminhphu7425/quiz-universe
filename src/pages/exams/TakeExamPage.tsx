import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import {
  Clock, ChevronLeft, ChevronRight, Flag, CheckCircle2,
  AlertTriangle, BookOpen, Eye, Send
} from "lucide-react";
import { FEATURE_FLAGS } from "@/shared/config/features";

interface ExamOption {
  label: string;
  content: string;
  imageUrl?: string;
}

interface ExamQuestion {
  id: number;
  stem: string;
  options: ExamOption[];
  imageUrl?: string;
}

// Mock exam data
const MOCK_EXAM = {
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
  ] as ExamQuestion[],
};

export default function TakeExamPage() {
  const { _examId } = useParams();
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const [timeLeft, setTimeLeft] = useState(MOCK_EXAM.duration * 60);
  const [showConfirm, setShowConfirm] = useState(false);

  const exam = MOCK_EXAM;
  const totalQuestions = exam.questions.length;
  const currentQuestion = exam.questions[currentIndex];
  const answeredCount = Object.keys(answers).length;

  // Timer
  useEffect(() => {
    if (timeLeft <= 0) { setShowConfirm(true); return; }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const selectAnswer = (label: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: label }));
  };

  const toggleFlag = () => {
    setFlagged(prev => {
      const next = new Set(prev);
      if (next.has(currentQuestion.id)) next.delete(currentQuestion.id);
      else next.add(currentQuestion.id);
      return next;
    });
  };

  const goTo = useCallback((idx: number) => {
    if (idx >= 0 && idx < totalQuestions) setCurrentIndex(idx);
  }, [totalQuestions]);

  const handleSubmit = () => {
    navigate(`/exams/1/review`, { state: { answers, examData: exam } });
  };

  const timerColor = timeLeft < 300 ? "text-rose-500" : timeLeft < 600 ? "text-amber-500" : "text-emerald-600 dark:text-emerald-400";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-800">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-slate-700 shadow-sm">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <div>
              <h1 className="text-sm font-bold text-gray-800 dark:text-gray-200">{exam.title}</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Câu {currentIndex + 1}/{totalQuestions} • Đã trả lời {answeredCount}/{totalQuestions}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 rounded-full px-4 py-2 font-mono text-lg font-bold ${timerColor} bg-gray-100 dark:bg-slate-800`}>
              <Clock className="h-5 w-5" />
              {formatTime(timeLeft)}
            </div>
            <button onClick={() => setShowConfirm(true)}
              className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-2 text-sm font-bold text-white hover:from-indigo-600 hover:to-purple-600 transition-all flex items-center gap-2">
              <Send className="h-4 w-4" /> Nộp bài
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div key={currentIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}
              className="rounded-2xl bg-white dark:bg-slate-900 shadow-xl border border-gray-100 dark:border-slate-700 p-8">
              {/* Question Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 font-bold">
                    {currentIndex + 1}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">/ {totalQuestions}</span>
                </div>
                <button onClick={toggleFlag}
                  className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${flagged.has(currentQuestion.id) ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300' : 'bg-gray-100 text-gray-500 dark:bg-slate-700 dark:text-gray-400 hover:bg-amber-50'}`}>
                  <Flag className="h-4 w-4" /> {flagged.has(currentQuestion.id) ? "Đã đánh dấu" : "Đánh dấu"}
                </button>
              </div>

              {/* Stem */}
              <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-8 leading-relaxed">{currentQuestion.stem}</h2>

              {FEATURE_FLAGS.ENABLE_QUESTION_IMAGES && currentQuestion.imageUrl && (
                <div className="mb-8 overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 dark:border-slate-700 dark:bg-slate-950/50">
                  <img 
                    src={currentQuestion.imageUrl} 
                    alt="Question illustration" 
                    className="max-h-96 w-auto object-contain mx-auto"
                  />
                </div>
              )}

              {/* Options */}
              <div className="space-y-3">
                {currentQuestion.options.map(opt => {
                  const isSelected = answers[currentQuestion.id] === opt.label;
                  return (
                    <motion.button key={opt.label} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                      onClick={() => selectAnswer(opt.label)}
                      className={`w-full flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all ${isSelected
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 shadow-md'
                        : 'border-gray-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-gray-50 dark:hover:bg-slate-800'}`}>
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full font-bold text-sm flex-shrink-0 ${isSelected
                        ? 'bg-indigo-500 text-white' : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300'}`}>
                        {opt.label}
                      </div>
                      <div className="flex-1">
                        <span className={`text-sm ${isSelected ? 'font-semibold text-indigo-900 dark:text-indigo-200' : 'text-gray-700 dark:text-gray-300'}`}>
                          {opt.content}
                        </span>
                        {FEATURE_FLAGS.ENABLE_QUESTION_IMAGES && opt.imageUrl && (
                          <div className="mt-2 overflow-hidden rounded-lg border border-gray-100 dark:border-slate-700">
                            <img 
                              src={opt.imageUrl} 
                              alt={`Option ${opt.label}`} 
                              className="max-h-32 w-auto object-contain"
                            />
                          </div>
                        )}
                      </div>
                      {isSelected && <CheckCircle2 className="h-5 w-5 text-indigo-500 ml-auto flex-shrink-0" />}
                    </motion.button>
                  );
                })}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100 dark:border-slate-700">
                <button onClick={() => goTo(currentIndex - 1)} disabled={currentIndex === 0}
                  className="flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
                  <ChevronLeft className="h-4 w-4" /> Câu trước
                </button>
                <button onClick={() => goTo(currentIndex + 1)} disabled={currentIndex === totalQuestions - 1}
                  className="flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
                  Câu sau <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Question Navigator */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl bg-white dark:bg-slate-900 shadow-lg border border-gray-100 dark:border-slate-700 p-6">
              <h3 className="mb-4 text-sm font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <Eye className="h-4 w-4" /> Tổng quan bài thi
              </h3>
              <div className="grid grid-cols-5 gap-2 mb-4">
                {exam.questions.map((q, idx) => {
                  const isAnswered = !!answers[q.id];
                  const isFlagged = flagged.has(q.id);
                  const isCurrent = idx === currentIndex;
                  return (
                    <button key={q.id} onClick={() => goTo(idx)}
                      className={`flex h-10 w-10 items-center justify-center rounded-lg text-xs font-bold transition-all ${
                        isCurrent ? 'ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-slate-900' : ''
                      } ${isAnswered ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                        : isFlagged ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
                        : 'bg-gray-100 text-gray-500 dark:bg-slate-700 dark:text-gray-400'}`}>
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
              {/* Legend */}
              <div className="space-y-2 text-xs pt-3 border-t border-gray-100 dark:border-slate-700">
                <div className="flex items-center gap-2"><div className="h-3 w-3 rounded bg-emerald-100 dark:bg-emerald-900/40" /><span className="text-gray-500 dark:text-gray-400">Đã trả lời</span></div>
                <div className="flex items-center gap-2"><div className="h-3 w-3 rounded bg-amber-100 dark:bg-amber-900/40" /><span className="text-gray-500 dark:text-gray-400">Đánh dấu xem lại</span></div>
                <div className="flex items-center gap-2"><div className="h-3 w-3 rounded bg-gray-100 dark:bg-slate-700" /><span className="text-gray-500 dark:text-gray-400">Chưa trả lời</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl bg-white dark:bg-slate-900 p-8 shadow-2xl border border-gray-200 dark:border-slate-700 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/40">
                <AlertTriangle className="h-8 w-8 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">Xác nhận nộp bài?</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Bạn đã trả lời {answeredCount}/{totalQuestions} câu hỏi.</p>
              {answeredCount < totalQuestions && (
                <p className="text-sm text-amber-600 dark:text-amber-400 font-medium">Còn {totalQuestions - answeredCount} câu chưa trả lời!</p>
              )}
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={() => setShowConfirm(false)}
                className="flex-1 rounded-xl border-2 border-gray-200 dark:border-slate-600 px-4 py-3 font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all">
                Tiếp tục làm
              </button>
              <button onClick={handleSubmit}
                className="flex-1 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-3 font-bold text-white hover:from-indigo-600 hover:to-purple-600 transition-all">
                Nộp bài
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
