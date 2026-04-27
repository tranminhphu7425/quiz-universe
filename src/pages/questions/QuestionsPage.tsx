import { useMemo, useState, useRef, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
  Eye,
  EyeOff,
  Loader2,
  ListChecks,
  Search,
  Tag,
  TimerReset,
  ArrowLeft,
  BookOpen,
} from "lucide-react";
import { ArrowRight, LayoutGrid, RefreshCcw, Sparkles, XCircle } from "lucide-react";
import LoadingState from "@/widgets/LoadingState";

import { } from "@/shared/api/questionBanksApi";
import { fetchQuestionsByBankId } from "@/shared/api/questionsApi";
import { QuestionBankApi } from "@/shared/api/questionBanksApi";
import { QuestionBank } from "@/shared/types/questionBank";
import { Question, QuestionOption } from "@/shared/types/question";
import { Flag } from "lucide-react";




import { stemToSegments, normalize } from "./utils";


// ====== Page ======
export default function QuestionsPage() {
  const navigate = useNavigate();
  const [picked, setPicked] = useState<Record<number, number | null>>({}); // qId -> optionId
  const [fillAnswers, setFillAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { bankId } = useParams<{ bankId: string }>();
  const [data, setData] = useState<Question[]>([]);
  const [navOpen, setNavOpen] = useState(false); // ✅ trạng thái mở/đóng popup
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const pageTopRef = useRef<HTMLDivElement | null>(null);
  const suppressTopScrollRef = useRef(false);
  const [page, setPage] = useState(1);
  const [questionBankName, setQuestionBankName] = useState<string>("");
  var localSubjects: QuestionBank[] = [];
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>({});

  const toggleFlag = (qId: number) => {
    setFlaggedQuestions(prev => ({
      ...prev,
      [qId]: !prev[qId],
    }));
  };

  const fetchData = async () => {
    if (bankId == null) return;
    const ac = new AbortController();
    setLoading(true);
    setErr(null);
    const id = Number(bankId);


    (async () => {
      const [qRes, sRes] = await Promise.allSettled([
        fetchQuestionsByBankId(id),
        QuestionBankApi.getById(id),
        // nhớ nhận signal
      ]);

      // 1. Xử lý fallback cho Question Bank Name (sRes)
      if (sRes.status === "fulfilled") {
        setQuestionBankName(sRes.value.name);
      } else if (sRes.reason?.name !== "AbortError") {
        try {
          // Luôn đảm bảo có dữ liệu local nếu API lỗi
          const res = await fetch(`${import.meta.env.BASE_URL}data/questionBanks.json`);
          const json = await res.json();
          // Trích xuất mảng content từ JSON (vì file có cấu trúc { content: [...] })
          const subjects = Array.isArray(json) ? json : (json.content || []);
          
          const idNum = Number(bankId);
          const sj = subjects.find((s: any) => s.bankId === idNum);
          
          console.log("Tìm thấy môn học local:", sj);
          setQuestionBankName(sj?.name ?? `[Môn #${idNum}]`);
          setErr((prev) => prev ?? "Không thể lấy thông tin môn học từ API.");
        } catch (e) {
          console.error("Failed to load local subjects:", e);
          setQuestionBankName(`[Môn #${bankId}]`);
        }
      }

      // 2. Xử lý fallback cho Questions (qRes)
      if (qRes.status === "fulfilled") {
        setData(qRes.value);
      } else if (qRes.reason?.name !== "AbortError") {
        setErr("Đang dùng dữ liệu câu hỏi cục bộ!");
        const url = `${import.meta.env.BASE_URL}data/questionBank${id}.json`;
        try {
          const res = await fetch(url);
          if (!res.ok) throw new Error("Local file not found");
          const json = await res.json();
          setData(Array.isArray(json) ? json : (json.content || []));
        } catch (e) {
          console.error("Failed to load local questions:", e);
          setData([]);
        }
      }
    })()
      .catch((e) => {
        if (e?.name !== "AbortError") setErr("Có lỗi không xác định!");
      })
      .finally(() => setLoading(false));

    return () => ac.abort();
  };

  useEffect(() => {
    fetchData();
  }, []);


  useEffect(() => {
    // chỉ scroll-top khi đổi trang bằng nút phân trang
    if (suppressTopScrollRef.current) return;
    pageTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    // hoặc: document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);


  const PAGE_SIZE = 10;
  const pageSizeFAB = 50;


  const total = data.length;
  const pageCount = Math.ceil(total / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const isZone = (index: number): boolean => index >= start && index < end;

  const pageQuestions = data.slice(start, end);
  // {FAB}
  const startIndexFAB = Math.floor(start / pageSizeFAB) * pageSizeFAB;
  const endIndexFAB = startIndexFAB + pageSizeFAB;
  const currentQuestions = data.slice(startIndexFAB, endIndexFAB);


  const answeredSet = new Set(Object.entries(picked)
    .filter(([, optId]) => optId != null)
    .map(([qId]) => Number(qId))
  );

  const matchAnswer = (user: string, correctSpec: string) =>
    correctSpec.split("|").some(ans => normalize(user) === normalize(ans));


  // ✅ chuyển tới câu bất kỳ: đổi trang + scroll mượt
  const goToQuestion = (qGlobalIndex: number, qId: number) => {
    const targetPage = Math.floor(qGlobalIndex / PAGE_SIZE) + 1;

    if (targetPage !== page) {
      suppressTopScrollRef.current = true;   // ⬅️ chặn scroll-top của useEffect
      setPage(targetPage);

      // chờ render xong rồi scroll tới đúng câu
      setTimeout(() => {
        document.getElementById(`q-${qId}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
        // nhả cờ sau một nhịp để lần đổi trang kế tiếp lại scroll-top bình thường
        setTimeout(() => { suppressTopScrollRef.current = false; }, 300);
      }, 0);
    } else {
      document.getElementById(`q-${qId}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };



  const score = useMemo(() => {
    if (!submitted) return 0;

    let s = 0;
    for (const q of data) {
      if (q.questionType === "fill_in") {
        // Đúng khi TẤT CẢ ô (options) đều khớp nội dung
        const allCorrect =
          (q.options ?? []).length > 0 &&
          (q.options ?? []).every(opt => {
            const user = fillAnswers?.[opt.optionId] ?? "";        // <-- state nhập liệu: { optionId: text }
            return matchAnswer(user, opt.content ?? "");           // hoặc: normalize(user) === normalize(opt.content)
          });

        if (allCorrect) s += 1;
      } else {
        // mcq_single (giữ nguyên)
        const pickedOptionId = picked[q.questionId];
        const correct = q.options?.find(o => o.isCorrect);
        if (pickedOptionId && correct && pickedOptionId === correct.optionId) s += 1;
      }
    }
    return s;
  }, [submitted, data, picked, fillAnswers]);   // <-- nhớ thêm fillAnswers
  const reset = () => {
    setPicked({});

    setFillAnswers({});

    setSubmitted(false);
  };



  // Tính số câu đã làm (có đáp án được chọn)
  const numAnswered = useMemo(
    () => Object.values(picked).filter((v) => v !== null && v !== undefined).length,
    [picked]
  );

  if (!questionBankName && !loading) {
    return (
      <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-[#030712] selection:bg-rose-500/30 transition-colors duration-500">
        {/* Background Orbs */}
        <div className="absolute top-0 -left-4 w-96 h-96 bg-rose-400/30 dark:bg-rose-500/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-70 dark:opacity-20 animate-blob" />
        <div className="absolute top-0 -right-4 w-96 h-96 bg-purple-400/30 dark:bg-purple-500/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-70 dark:opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-orange-400/30 dark:bg-orange-500/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-70 dark:opacity-20 animate-blob animation-delay-4000" />

        {/* Grid & Noise Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-20 pointer-events-none" />
        <div className="absolute inset-0 bg-grid-slate-200/[0.5] dark:bg-grid-white/[0.02] bg-[bottom_1px_center] pointer-events-none" />

        <div className="relative z-10 max-w-2xl px-6 text-center">
          {/* Animated Icon Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative inline-block mb-10"
          >
            <div className="absolute inset-0 bg-rose-500 blur-3xl opacity-20 dark:opacity-30 animate-pulse" />
            <div className="relative bg-white/40 dark:bg-slate-900/50 backdrop-blur-2xl border border-slate-200/50 dark:border-white/10 p-8 rounded-[2.5rem] shadow-2xl dark:shadow-none">
              <BookOpen className="w-16 h-16 text-rose-600 dark:text-rose-400 animate-bounce" />
            </div>
          </motion.div>

          {/* Error Text - Adaptable Gradient */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[80px] font-black leading-none tracking-tighter sm:text-[120px]"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-slate-900 via-slate-700 to-slate-400/50 dark:from-white dark:via-white dark:to-white/20 select-none">
              Lỗi
            </span>
          </motion.h1>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6"
          >
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl tracking-tight">
              {err || "Ngân hàng câu hỏi không tồn tại"}
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 text-md max-w-lg mx-auto leading-relaxed font-medium">
              Không thể tìm thấy thông tin ngân hàng câu hỏi bạn yêu cầu. Vui lòng kiểm tra lại đường dẫn hoặc quay lại trang danh sách.
            </p>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <button
              onClick={() => navigate("/question-banks")}
              className="group flex items-center gap-3 px-7 py-3.5 rounded-2xl bg-slate-200/50 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-300/50 dark:border-white/10 text-slate-700 dark:text-slate-200 transition-all active:scale-95 font-semibold"
            >
              <ArrowLeft className="w-5 h-5 text-slate-500 dark:text-slate-400 group-hover:-translate-x-1 transition-transform" />
              Quay lại danh sách ngân hàng
            </button>
          </motion.div>
        </div>
      </div>
    );
  }


  return (

    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">


      {/* nền mờ */}
      {/* {navOpen && (<div
        className="fixed z-49 inset-0 h-full bg-black/30 backdrop-blur-[1px]"
        onClick={() => setNavOpen(false)}
      />)
      } */}



      {/* ====== HERO (phong cách giống trang chủ) ====== */}
      <section className="relative  overflow-hidden">
        <div className="absolute  inset-0 bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-14 text-white md:flex-row md:justify-between">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 160, damping: 18 }}>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/20 backdrop-blur">
              <Sparkles className="h-4 w-4" /> QuizUniverse • Làm trắc nghiệm
            </div>
            <h1 className="text-[2rem] md:text-[2.6rem] font-black leading-tight">
              Bộ câu hỏi ôn tập <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 bg-clip-text text-transparent">{questionBankName}</span>
              {err && ` (Lấy dữ liệu cục bộ)`}
            </h1>
            <p className="mt-2 text-white/90">Chọn đáp án cho từng câu. Nộp bài để xem điểm và lời giải.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05 }}
            className="flex items-center gap-3 flex-wrap"
          >
            <div className="rounded-xl bg-white/10 px-4 py-2 text-sm ring-1 ring-white/20">
              Tổng câu: <b>{total}</b>
            </div>

            <div className="rounded-xl bg-white/10 px-4 py-2 text-sm ring-1 ring-white/20">
              Trạng thái: <b>{submitted ? "Đã nộp" : "Chưa nộp"}</b>
            </div>

            {/* ✅ Bổ sung số câu đã làm */}
            <div className="rounded-xl bg-white/10 px-4 py-2 text-sm ring-1 ring-white/20">
              Đã làm: <b>{numAnswered}</b>/{total}
            </div>
          </motion.div>

        </div>
      </section>

      {/* ====== BODY ====== */}
      <div className="relative">

        <main className=" mx-auto max-w-5xl px-6 py-10">
          <div ref={pageTopRef} />

          <div className="mb-6 flex flex-wrap items-center gap-3">
            {!submitted ? (
              <button
                onClick={() => setShowConfirmModal(true)}
                className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-white shadow hover:brightness-110"
              >
                Nộp bài <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <>
                <div className="mr-2 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:ring-emerald-800">
                  Điểm: <b>{score}</b>/<b>{total}</b>
                </div>
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-2 rounded-full bg-slate-800 px-5 py-2.5 text-white shadow hover:brightness-110 dark:bg-slate-700"
                >
                  Làm lại <RefreshCcw className="h-4 w-4" />
                </button>
              </>
            )}
          </div>
          {loading ? (
            <LoadingState count={PAGE_SIZE} />
          )
            // : err ? (<></>)
            : (
              <>
                <div className="space-y-6">
                  {pageQuestions.map((q, idx) => (
                    <QuestionCard

                      key={q.questionId}
                      index={start + idx + 1}
                      q={q}
                      questionType={q.questionType}
                      pickedOptionId={picked[q.questionId] ?? null}
                      onPick={(optionId) => {
                        setPicked((m) => ({ ...m, [q.questionId]: optionId }));

                      }}
                      onClear={() => {
                        setPicked((m) => ({ ...m, [q.questionId]: null }));

                      }}
                      showResult={submitted}
                      answers={fillAnswers}
                      onFill={(optionId, value) => { setFillAnswers((m) => ({ ...m, [optionId]: value })); }}
                      flagged={flaggedQuestions[q.questionId]}
                      onToggleFlag={() => toggleFlag(q.questionId)}
                    />
                  ))}
                </div>
                {/* Điều hướng phân trang */}
                <div className="my-5 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                    title="Trang trước"
                  >
                    ← Trước
                  </button>

                  {/* Nút số trang (tối ưu: chỉ hiển thị một cụm nhỏ quanh trang hiện tại) */}
                  {Array.from({ length: pageCount }, (_, i) => i + 1)
                    .filter(p => Math.abs(p - page) <= 2 || p === 1 || p === pageCount) // hiển thị trang đầu/cuối và lân cận
                    .reduce<(number | string)[]>((acc, p, idx, arr) => {
                      if (idx > 0) {
                        const prev = arr[idx - 1] as number;
                        if (typeof prev === "number" && typeof p === "number" && p - prev > 1) acc.push("…");
                      }
                      acc.push(p as number);
                      return acc;
                    }, [])
                    .map((p, i) =>
                      typeof p === "string" ? (
                        <span key={`ellipsis-${i}`} className="px-2 text-slate-400">…</span>
                      ) : (
                        <button
                          key={p}
                          onClick={() => setPage(p)}
                          className={`rounded-lg px-3 py-1.5 text-sm font-medium border
              ${p === page
                              ? "bg-emerald-600 text-white border-emerald-600"
                              : "border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"}`}
                          title={`Trang ${p}`}
                        >
                          {p}
                        </button>
                      )
                    )
                  }

                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                    disabled={page === pageCount}
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                    title="Trang sau"
                  >
                    Sau →
                  </button>

                  {/* Hiển thị phạm vi câu trên trang */}
                  <div className="flex items-center gap-5 ml-auto text-sm text-slate-600 dark:text-slate-300">
                    <div>
                      Trang <b>{page}</b>/<b>{pageCount}</b> • Câu <b>{start + 1}</b>–<b>{Math.min(end, total)}</b> / {total}
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      {!submitted ? (
                        <button
                          onClick={() => setShowConfirmModal(true)}
                          className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-white shadow hover:brightness-110"
                        >
                          Nộp bài <ArrowRight className="h-4 w-4" />
                        </button>
                      ) : (
                        <>
                          <div className="mr-2 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:ring-emerald-800">
                            Điểm: <b>{score}</b>/<b>{total}</b>
                          </div>
                          <button
                            onClick={reset}
                            className="inline-flex items-center gap-2 rounded-full bg-slate-800 px-5 py-2.5 text-white shadow hover:brightness-110 dark:bg-slate-700"
                          >
                            Làm lại <RefreshCcw className="h-4 w-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>


              </>
            )
          }


        </main>
        <div className="absolute right-5 top-10 w-fit h-full">
          <div className="sticky z-30 top-20 w-fit">
            {/* FAB mở popup ở góc phải - icon only */}
            {!navOpen && (<button
              type="button"
              onClick={() => setNavOpen(true)}
              className=" z-40 grid h-12 w-12 place-items-center rounded-full bg-emerald-600 text-white shadow-lg hover:brightness-110"
              aria-label="Mở danh sách câu hỏi"
              title="Danh sách câu hỏi"
            >
              <LayoutGrid className="h-5 w-5" />
            </button>)}
            {/* Drawer phải */}
            {navOpen && (
              <div className="relative inset-0 z-50 h-3/4 my-auto bg-slate-50 dark:bg-slate-900">


                {/* thân drawer */}
                <motion.div
                  initial={{ x: 360 }}
                  animate={{ x: 0 }}
                  exit={{ x: 360 }}
                  transition={{ type: "tween", duration: 0.2 }}
                  className="right-0 top-0 h-full w-[320px] bg-white shadow-xl dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 p-4 flex flex-col"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      Danh sách câu hỏi
                    </h4>
                    <button
                      className="rounded-lg border border-slate-200 px-3 py-1 text-xs text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                      onClick={() => setNavOpen(false)}
                    >
                      Đóng
                    </button>
                  </div>

                  {/* legend */}
                  <div className="mb-3 flex flex-wrap gap-2 text-xs">
                    <span className="inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-700">Chưa làm</span>
                    <span className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-white bg-emerald-600">Đã chọn</span>
                    {submitted && (
                      <>
                        <span className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-white bg-emerald-500">Đúng</span>
                        <span className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-white bg-rose-500">Sai</span>
                      </>
                    )}
                  </div>

                  {/* grid câu hỏi */}
                  <div className="grid grid-cols-5 gap-2 overflow-auto">
                    {currentQuestions.map((q, idx) => {
                      const globalIndex = startIndexFAB + idx;   // tính index toàn cục
                      const qNumber = globalIndex + 1;        // số thứ tự câu
                      const pickedId = picked[q.questionId];
                      const hasPicked = pickedId != null;
                      const flagged = flaggedQuestions[q.questionId];
                      let color = "";
                      if (submitted && hasPicked) {
                        const isCorrect = (q.options ?? []).find(o => o.isCorrect)?.optionId === pickedId;
                        color = isCorrect ? "bg-emerald-500 text-white" : "bg-rose-500 text-white";
                      } else if (hasPicked) {
                        color = "bg-emerald-700 text-white ";

                      } else {
                        color = "border border-slate-300 text-slate-700 dark:text-slate-300 dark:border-slate-700";
                      }


                      let finalColor = color;
                      if (finalColor === "border border-slate-300 text-slate-700 dark:text-slate-300 dark:border-slate-700" && isZone(globalIndex)) {
                        finalColor = "bg-neutral-200 dark:bg-neutral-500";
                      }


                      return (
                        <button
                          key={q.questionId}
                          onClick={() => goToQuestion(globalIndex, q.questionId)}
                          className={`relative h-8 rounded-md text-sm font-semibold ${finalColor}`}
                          title={`Tới câu ${qNumber}`}
                        >
                          {qNumber}

                          {/* Cờ vàng nếu flagged */}
                          {flagged && (
                            <span className="absolute top-0 left-0 w-0 h-0 border-t-[10px] border-r-transparent border-r-[10px] border-t-amber-400 border-l-0 border-b-0"></span>

                          )}
                        </button>
                      );
                    })}

                  </div>

                  {/* phân trang nhanh trong drawer */}
                  <div className="mt-auto pt-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        ← Trước
                      </button>

                      <div className="text-sm text-slate-600 dark:text-slate-300">
                        Trang <b>{page}</b>/<b>{pageCount}</b>
                      </div>

                      <button
                        onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                        disabled={page === pageCount}
                        className="ml-auto rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        Sau →
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Xác nhận nộp bài Modal */}
      <AnimatePresence>
        {showConfirmModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setShowConfirmModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white p-8 shadow-2xl dark:bg-slate-900"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                  <AlertTriangle className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
                  Xác nhận nộp bài?
                </h3>
                <p className="mb-8 text-slate-600 dark:text-slate-400">
                  Bạn có chắc chắn muốn nộp bài không? Bạn sẽ không thể thay đổi đáp án sau khi đã nộp.
                </p>
                <div className="flex w-full gap-3">
                  <button
                    onClick={() => setShowConfirmModal(false)}
                    className="flex-1 rounded-2xl border border-slate-200 py-3 font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800/50"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    onClick={() => {
                      setSubmitted(true);
                      setShowConfirmModal(false);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="flex-1 rounded-2xl bg-emerald-600 py-3 font-semibold text-white shadow-lg shadow-emerald-500/20 hover:brightness-110"
                  >
                    Xác nhận nộp
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { QuestionCard } from "./ui/QuestionCard";