import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  FileText, Clock, Award, Shuffle, Plus, Trash2, GripVertical,
  ChevronDown, Search, BookOpen, Sparkles, AlertCircle,
  CheckCircle2, Settings2, ListChecks, ArrowLeft
} from "lucide-react";
import FadeInOnView from "@/shared/ui/FadeInOnView";
import Floating from "@/shared/ui/Floatting";
import { useAuth } from "@/app/providers/AuthProvider";
import { toast } from "react-hot-toast";
import { fetchAllSubjects } from "@/shared/api/subjectApi";
import type { Subject } from "@/shared/types/subject";

interface ExamQuestionItem {
  id: string;
  stem: string;
  questionType: string;
  difficulty: string;
  selected: boolean;
}

// Mock data for demo
const MOCK_QUESTIONS: ExamQuestionItem[] = [
  { id: "1", stem: "Thủ đô của Việt Nam là gì?", questionType: "mcq_single", difficulty: "Dễ", selected: false },
  { id: "2", stem: "Công thức tính diện tích hình tròn?", questionType: "mcq_single", difficulty: "Trung bình", selected: false },
  { id: "3", stem: "Nguyên lý OOP nào cho phép ẩn chi tiết triển khai?", questionType: "mcq_single", difficulty: "Khó", selected: false },
  { id: "4", stem: "HTML viết tắt của cụm từ nào?", questionType: "mcq_single", difficulty: "Dễ", selected: false },
  { id: "5", stem: "Thuật toán sắp xếp nào có độ phức tạp O(n log n)?", questionType: "mcq_single", difficulty: "Khó", selected: false },
];

const difficultyColor: Record<string, string> = {
  "Dễ": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  "Trung bình": "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  "Khó": "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
};

export default function CreateExamPage() {
  useAuth();
  const navigate = useNavigate();

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState<number | "">("");
  const [isLoadingSubjects, setIsLoadingSubjects] = useState(true);
  const [searchSubject, setSearchSubject] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState(45);
  const [totalMarks, setTotalMarks] = useState(10);
  const [shuffleQuestions, setShuffleQuestions] = useState(true);
  const [notes, setNotes] = useState("");

  const [questions, setQuestions] = useState<ExamQuestionItem[]>(MOCK_QUESTIONS);
  const [searchQuestion, setSearchQuestion] = useState("");

  const filteredSubjects = subjects.filter(sub =>
    sub.name.toLowerCase().includes(searchSubject.toLowerCase())
  );

  const selectedQuestions = questions.filter(q => q.selected);

  useEffect(() => {
    fetchAllSubjects()
      .then(data => { setSubjects(data); setIsLoadingSubjects(false); })
      .catch(() => setIsLoadingSubjects(false));
  }, []);

  const handleSelectSubject = (id: number, name: string) => {
    setSelectedSubjectId(id);
    setSearchSubject(name);
    setIsDropdownOpen(false);
  };

  const toggleQuestion = (id: string) => {
    setQuestions(prev => prev.map(q => q.id === id ? { ...q, selected: !q.selected } : q));
  };

  const removeSelected = (id: string) => {
    setQuestions(prev => prev.map(q => q.id === id ? { ...q, selected: false } : q));
  };

  const handleCreate = () => {
    if (!title.trim()) { toast.error("Vui lòng nhập tiêu đề đề thi"); return; }
    if (!selectedSubjectId) { toast.error("Vui lòng chọn môn học"); return; }
    if (selectedQuestions.length === 0) { toast.error("Vui lòng chọn ít nhất 1 câu hỏi"); return; }
    toast.success(`Tạo đề thi thành công với ${selectedQuestions.length} câu hỏi!`);
    navigate("/dashboard");
  };

  const filteredAvailable = questions.filter(q =>
    !q.selected && q.stem.toLowerCase().includes(searchQuestion.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-800">
      {/* HEADER */}
      <section className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-white/10 blur-2xl dark:bg-indigo-400/10" />
        <div className="pointer-events-none absolute -right-16 top-10 h-64 w-64 rounded-full bg-white/10 blur-2xl dark:bg-purple-400/10" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-white">
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/20 backdrop-blur dark:bg-white/5 dark:ring-white/10">
                <FileText className="h-4 w-4" />
                <span>Tạo đề thi • Kiểm tra kiến thức</span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
                className="text-3xl md:text-4xl font-black leading-tight">
                Tạo đề thi mới
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="mt-4 text-white/90 max-w-2xl">
                Chọn câu hỏi từ kho ngân hàng câu hỏi, thiết lập thời gian và cấu hình đề thi theo ý muốn.
              </motion.p>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
              className="hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-indigo-400/20 to-purple-400/20 blur-xl" />
                <div className="relative rounded-2xl bg-white/10 dark:bg-white/5 p-8 backdrop-blur-xl border border-white/20">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="inline-flex p-3 rounded-full bg-indigo-500/20"><Clock className="h-8 w-8 text-indigo-200" /></div>
                      <div className="mt-3 text-2xl font-bold text-white">{duration} phút</div>
                      <div className="text-sm text-white/80">Thời gian</div>
                    </div>
                    <div className="text-center">
                      <div className="inline-flex p-3 rounded-full bg-purple-500/20"><ListChecks className="h-8 w-8 text-purple-200" /></div>
                      <div className="mt-3 text-2xl font-bold text-white">{selectedQuestions.length}</div>
                      <div className="text-sm text-white/80">Câu hỏi đã chọn</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          <Floating distance={12} duration={7} className="pointer-events-none absolute top-6 left-8">
            <div className="rounded-xl bg-gradient-to-br from-amber-300 to-rose-300 p-2 shadow-lg -rotate-6">
              <span className="text-xs font-black text-rose-700">NEW</span>
            </div>
          </Floating>
          <Floating distance={10} duration={6} className="pointer-events-none absolute top-12 right-8">
            <div className="rounded-full bg-gradient-to-br from-purple-400 to-indigo-400 p-3 shadow-xl rotate-12">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
          </Floating>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-6">
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
            <ArrowLeft className="h-4 w-4" /> Quay lại Dashboard
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT: Form */}
          <div className="lg:col-span-2 space-y-6">
            <FadeInOnView amount={0.1}>
              <div className="rounded-2xl bg-white dark:bg-slate-900 shadow-xl border border-indigo-100 dark:border-slate-700 p-6">
                <h3 className="mb-4 text-lg font-bold text-indigo-900 dark:text-indigo-300 flex items-center gap-2">
                  <Settings2 className="h-5 w-5" /> Thông tin đề thi
                </h3>
                <div className="space-y-4">
                  {/* Title */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Tiêu đề đề thi *</label>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)}
                      placeholder="Ví dụ: Kiểm tra giữa kỳ Toán cao cấp..."
                      className="w-full rounded-xl border border-indigo-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-gray-700 dark:text-gray-300 placeholder-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 focus:outline-none" />
                  </div>
                  {/* Subject */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Môn học *</label>
                    <div className="relative z-20">
                      <div className={`flex items-center w-full rounded-xl border border-indigo-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-200 dark:focus-within:ring-indigo-900 ${isLoadingSubjects ? 'opacity-50 pointer-events-none' : ''}`}>
                        <Search className="h-5 w-5 text-gray-400 mr-2" />
                        <input type="text" value={searchSubject}
                          onChange={e => { setSearchSubject(e.target.value); setIsDropdownOpen(true); if (selectedSubjectId) setSelectedSubjectId(""); }}
                          onClick={() => setIsDropdownOpen(true)}
                          placeholder={isLoadingSubjects ? "Đang tải..." : "Tìm hoặc chọn môn học..."}
                          className="flex-1 bg-transparent text-gray-700 dark:text-gray-300 focus:outline-none placeholder-gray-400" />
                        <ChevronDown className="h-5 w-5 text-gray-400 cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)} />
                      </div>
                      {isDropdownOpen && (
                        <>
                          <div className="fixed inset-0 z-30" onClick={() => setIsDropdownOpen(false)} />
                          <div className="absolute z-40 top-[52px] left-0 mt-1 max-h-60 w-full overflow-y-auto rounded-xl border border-indigo-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-2 shadow-xl">
                            {filteredSubjects.length === 0 ? (
                              <div className="p-3 text-center text-sm text-gray-500">Không tìm thấy</div>
                            ) : filteredSubjects.map(sub => (
                              <div key={sub.subjectId} onClick={() => handleSelectSubject(sub.subjectId, sub.name)}
                                className={`cursor-pointer rounded-lg px-4 py-2 transition-colors hover:bg-indigo-50 dark:hover:bg-slate-700 ${selectedSubjectId === sub.subjectId ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400 font-semibold' : 'text-gray-700 dark:text-gray-300'}`}>
                                {sub.name}
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  {/* Duration & Marks */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Thời gian (phút)</label>
                      <input type="number" value={duration} onChange={e => setDuration(Number(e.target.value))} min={5} max={180}
                        className="w-full rounded-xl border border-indigo-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-gray-700 dark:text-gray-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 focus:outline-none" />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Tổng điểm</label>
                      <input type="number" value={totalMarks} onChange={e => setTotalMarks(Number(e.target.value))} min={1}
                        className="w-full rounded-xl border border-indigo-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-gray-700 dark:text-gray-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 focus:outline-none" />
                    </div>
                  </div>
                  {/* Options */}
                  <div className="flex items-center gap-3">
                    <button onClick={() => setShuffleQuestions(!shuffleQuestions)}
                      className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${shuffleQuestions ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300' : 'bg-gray-100 text-gray-500 dark:bg-slate-700 dark:text-gray-400'}`}>
                      <Shuffle className="h-4 w-4" /> Trộn câu hỏi
                      {shuffleQuestions && <CheckCircle2 className="h-4 w-4" />}
                    </button>
                  </div>
                  {/* Notes */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Ghi chú</label>
                    <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2}
                      placeholder="Ghi chú thêm cho đề thi..."
                      className="w-full rounded-xl border border-indigo-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-gray-700 dark:text-gray-300 placeholder-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 focus:outline-none" />
                  </div>
                </div>
              </div>
            </FadeInOnView>

            {/* Question Selection */}
            <FadeInOnView amount={0.1}>
              <div className="rounded-2xl bg-white dark:bg-slate-900 shadow-xl border border-indigo-100 dark:border-slate-700 p-6">
                <h3 className="mb-4 text-lg font-bold text-indigo-900 dark:text-indigo-300 flex items-center gap-2">
                  <ListChecks className="h-5 w-5" /> Chọn câu hỏi
                </h3>
                <div className="mb-4">
                  <div className="flex items-center rounded-xl border border-indigo-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2">
                    <Search className="h-5 w-5 text-gray-400 mr-2" />
                    <input type="text" value={searchQuestion} onChange={e => setSearchQuestion(e.target.value)}
                      placeholder="Tìm câu hỏi..." className="flex-1 bg-transparent text-gray-700 dark:text-gray-300 focus:outline-none placeholder-gray-400" />
                  </div>
                </div>
                <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                  {filteredAvailable.length === 0 ? (
                    <p className="text-center text-sm text-gray-500 py-8">Không có câu hỏi nào phù hợp</p>
                  ) : filteredAvailable.map(q => (
                    <motion.div key={q.id} layout
                      className="flex items-center gap-3 rounded-xl border border-gray-100 dark:border-slate-700 p-3 hover:bg-indigo-50/50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      onClick={() => toggleQuestion(q.id)}>
                      <div className="flex h-6 w-6 items-center justify-center rounded-md border-2 border-indigo-300 dark:border-indigo-600">
                        <Plus className="h-4 w-4 text-indigo-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">{q.stem}</p>
                      </div>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${difficultyColor[q.difficulty] || ''}`}>{q.difficulty}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeInOnView>
          </div>

          {/* RIGHT: Sidebar */}
          <div className="lg:col-span-1">
            <FadeInOnView amount={0.2}>
              <div className="sticky top-8 space-y-6">
                {/* Selected Questions */}
                <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-lg border border-indigo-100 dark:border-slate-700">
                  <h3 className="mb-4 text-lg font-bold text-indigo-900 dark:text-indigo-300 flex items-center gap-2">
                    <Award className="h-5 w-5" /> Đã chọn ({selectedQuestions.length})
                  </h3>
                  {selectedQuestions.length === 0 ? (
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-6">Chưa chọn câu hỏi nào</p>
                  ) : (
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      <AnimatePresence>
                        {selectedQuestions.map((q, idx) => (
                          <motion.div key={q.id} layout initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                            className="flex items-center gap-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 p-2.5">
                            <GripVertical className="h-4 w-4 text-gray-400 flex-shrink-0" />
                            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 w-5">{idx + 1}</span>
                            <p className="flex-1 text-xs text-gray-700 dark:text-gray-300 truncate">{q.stem}</p>
                            <button onClick={() => removeSelected(q.id)} className="text-rose-400 hover:text-rose-600"><Trash2 className="h-3.5 w-3.5" /></button>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  )}
                </div>

                {/* Summary */}
                <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-lg border border-indigo-100 dark:border-slate-700">
                  <h3 className="mb-4 text-lg font-bold text-indigo-900 dark:text-indigo-300 flex items-center gap-2">
                    <BookOpen className="h-5 w-5" /> Tổng quan
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Số câu hỏi</span><span className="font-bold text-gray-700 dark:text-gray-300">{selectedQuestions.length}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Thời gian</span><span className="font-bold text-gray-700 dark:text-gray-300">{duration} phút</span></div>
                    <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Tổng điểm</span><span className="font-bold text-gray-700 dark:text-gray-300">{totalMarks}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Điểm/câu</span><span className="font-bold text-gray-700 dark:text-gray-300">{selectedQuestions.length > 0 ? (totalMarks / selectedQuestions.length).toFixed(2) : "—"}</span></div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                  <button onClick={handleCreate}
                    className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-600 dark:to-purple-600 px-6 py-4 font-bold text-white shadow-lg hover:from-indigo-600 hover:to-purple-600 transition-all">
                    Tạo đề thi
                  </button>
                  <Link to="/dashboard"
                    className="rounded-xl border-2 border-indigo-200 dark:border-slate-600 px-6 py-4 font-medium text-indigo-700 dark:text-indigo-300 text-center hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all">
                    Hủy
                  </Link>
                </div>

                {/* Note */}
                <div className="rounded-lg bg-amber-50 dark:bg-amber-900/20 p-4 border border-amber-200 dark:border-amber-700/30">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                    <div className="text-sm text-amber-700 dark:text-amber-300">
                      <p className="font-medium">Lưu ý:</p>
                      <p className="mt-1">Bạn có thể chỉnh sửa đề thi sau khi tạo. Đề thi sẽ ở trạng thái nháp cho đến khi bạn xuất bản.</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInOnView>
          </div>
        </div>
      </div>
    </div>
  );
}
