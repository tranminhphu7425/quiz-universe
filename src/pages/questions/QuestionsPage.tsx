import { useMemo, useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { motion } from "framer-motion";
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
} from "lucide-react";
import { ArrowRight, LayoutGrid, RefreshCcw, Sparkles, XCircle } from "lucide-react";
import LoadingState from "@/widgets/LoadingState";
import { Question, QuestionOption, fetchQuestionsByBankId } from "@/shared/api/questionsApi";
import { fetchSubjectNameById, Subject } from "@/shared/api/subjectApi";

import { fetchQuestionBankNameById, QuestionBank } from "@/shared/api/questionBanksApi";

import { Flag } from "lucide-react";




const BLANK_RE = /\.{5,}/g; // 6 dấu chấm trở lên

type Segment =
  | { type: "text"; text: string }
  | { type: "blank" };

function stemToSegments(stem: string): Segment[] {
  const segs: Segment[] = [];
  let lastIdx = 0;
  let m: RegExpExecArray | null;
  while ((m = BLANK_RE.exec(stem)) !== null) {
    const start = m.index;
    if (start > lastIdx) segs.push({ type: "text", text: stem.slice(lastIdx, start) });
    segs.push({ type: "blank" });
    lastIdx = start + m[0].length;
  }
  if (lastIdx < stem.length) segs.push({ type: "text", text: stem.slice(lastIdx) });
  // Nếu không có blank nào, trả về 1 text segment duy nhất
  return segs.length ? segs : [{ type: "text", text: stem }];
}


function normalize(s: string) {
  return (s ?? "").trim().replace(/\s+/g, " ").toLowerCase();
}


// ====== Page ======
export default function QuestionsPage() {
  const [picked, setPicked] = useState<Record<number, number | null>>({}); // qId -> optionId
  const [fillAnswers, setFillAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
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
        fetchQuestionsByBankId(id, ac.signal),
        fetchQuestionBankNameById(id), // nhớ nhận signal
      ]);

      // Questions
      if (qRes.status === "fulfilled") {
        setData(qRes.value);
      } else if (qRes.reason?.name !== "AbortError") {
        setErr("Không thể lấy câu hỏi từ API. Đang dùng dữ liệu cục bộ!");
        console.log("Không thể lấy câu hỏi từ API. Đang dùng dữ liệu cục bộ!");
        // try {
        //   const local = await import(`@/assets/data/questionssubject${id}.json`);
        //   setData((local.default ?? []) as Question[]);
        // } catch {
        //   setData([]);
        // }



        const url = `/quiz-universe/data/questionBank${id}.json`;

        try {
          const res = await fetch(url);
          const local = await fetch("/quiz-universe/data/questionBanks.json");
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          const json: Question[] = await res.json();
          setData(json);
          localSubjects = await local.json();
        } catch (err) {
          console.error("Failed to load questions:", err);
          setData([]);
        }
      }

      // Subject name
      if (sRes.status === "fulfilled") {
        setQuestionBankName(sRes.value.name);
      } else if (sRes.reason?.name !== "AbortError") {
        const idNum = Number(bankId);
        const sj = (localSubjects as QuestionBank[]).find(s => s.bankId === idNum);

        setQuestionBankName(sj?.name ?? `[Môn #${idNum}]`); // placeholder khi API tên môn lỗi
        setErr((prev) => prev ?? "Một số dữ liệu không tải được từ API.");
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
          q.options.length > 0 &&
          q.options.every(opt => {
            const user = fillAnswers?.[opt.id] ?? "";        // <-- state nhập liệu: { optionId: text }
            return matchAnswer(user, opt.content);           // hoặc: normalize(user) === normalize(opt.content)
          });

        if (allCorrect) s += 1;
      } else {
        // mcq_single (giữ nguyên)
        const pickedOptionId = picked[q.id];
        const correct = q.options.find(o => o.isCorrect);
        if (pickedOptionId && correct && pickedOptionId === correct.id) s += 1;
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
                onClick={() => setSubmitted(true)}
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

                      key={q.id}
                      index={start + idx + 1}
                      q={q}
                      questionType={q.questionType}
                      pickedOptionId={picked[q.id] ?? null}
                      onPick={(optionId) => {
                        setPicked((m) => ({ ...m, [q.id]: optionId }));

                      }}
                      onClear={() => {
                        setPicked((m) => ({ ...m, [q.id]: null }));

                      }}
                      showResult={submitted}
                      answers={fillAnswers}
                      onFill={(optionId, value) => { setFillAnswers((m) => ({ ...m, [optionId]: value })); }}
                      flagged={flaggedQuestions[q.id]}
                      onToggleFlag={() => toggleFlag(q.id)}
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
                  <div className="ml-auto text-sm text-slate-600 dark:text-slate-300">
                    Trang <b>{page}</b>/<b>{pageCount}</b> • Câu <b>{start + 1}</b>–<b>{Math.min(end, total)}</b> / {total}
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
                      const pickedId = picked[q.id];
                      const hasPicked = pickedId != null;
                      const flagged = flaggedQuestions[q.id];
                      let color = "";
                      if (submitted && hasPicked) {
                        const isCorrect = q.options.find(o => o.isCorrect)?.id === pickedId;
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
                          key={q.id}
                          onClick={() => goToQuestion(globalIndex, q.id)}
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

    </div>
  );
}

// ====== Components ======
function QuestionCard({
  index,
  q,
  questionType = "mcq_single",
  pickedOptionId,
  onPick,
  onClear,
  showResult,
  answers,                    // { [optionId]: "user text" }
  onFill,
  flagged,
  onToggleFlag,                  // (optionId, value) => void
}: {
  index: number;
  q: Question;
  questionType: string;
  pickedOptionId: number | null;
  onPick: (optionId: number) => void;
  onClear: () => void;
  showResult: boolean;
  answers?: Record<number, string>;
  onFill?: (optionId: number, value: string) => void;
  flagged: boolean;
  onToggleFlag: (optionId: number, value: boolean) => void;
}) {
  const correct = q.options.find((o) => o.isCorrect);
  const isCorrect = showResult && pickedOptionId && correct && pickedOptionId === correct.id;
  const isWrong = showResult && pickedOptionId && correct && pickedOptionId !== correct.id;

  // === TÍNH ĐÚNG/SAI CHO FILL_IN (tất cả ô đúng mới coi là đúng toàn câu):
  const allFillCorrect =
    questionType === "fill_in" &&
    showResult &&
    q.options.length > 0 &&
    q.options.every((opt) => normalize(answers?.[opt.id] ?? "") === normalize(opt.content));




  return (

    <motion.div

      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: "spring", stiffness: 140, damping: 16 }}
      className="relative rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
    >
      <div id={`q-${q.id}`} className="absolute -top-24"></div>
      {questionType === "mcq_single" ? (
        <>
          <div className="mb-3 flex items-start justify-between gap-3">
            <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
              <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/90 text-xs font-bold text-white">
                {index}
              </span>
              <span className="whitespace-pre-line">{q.stem}</span>
            </h3>

            {/* Badge kết quả hoặc nút Xóa */}
            {showResult ? (
              isCorrect ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-emerald-700 ring-1 ring-emerald-300 dark:bg-emerald-900/30 dark:text-emerald-300 dark:ring-emerald-800">
                  <CheckCircle2 className="h-4 w-4" /> Đúng
                </span>
              ) : isWrong ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2 py-1 text-rose-700 ring-1 ring-rose-300 dark:bg-rose-900/30 dark:text-rose-300 dark:ring-rose-800">
                  <XCircle className="h-4 w-4" /> Sai
                </span>
              ) : null
            ) : (
              // pickedOptionId !== null && (
              //   <button
              //     type="button"
              //     onClick={onClear}
              //     className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              //     title="Xóa lựa chọn của câu này"
              //   >
              //     Xóa lựa chọn
              //   </button>
              // )

              <div className="flex items-center gap-2">
                {/* Nút Xóa lựa chọn */}
                {pickedOptionId !== null && (
                  <button
                    type="button"
                    onClick={onClear}
                    className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                    title="Xóa lựa chọn của câu này"
                  >
                    Xóa lựa chọn
                  </button>
                )}

                {/* Nút cờ */}
                {onToggleFlag && (
                  <button
                    type="button"
                    onClick={() => onToggleFlag?.(q.id, !flagged)}
                    className={`p-1 rounded-full ${flagged ? "bg-amber-400 text-white" : "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300"}`}
                    title={flagged ? "Bỏ cờ" : "Đánh dấu cờ"}
                  >
                    <Flag className="h-4 w-4" />
                  </button>
                )}
              </div>

            )}
          </div>

          <div className="mt-3 grid gap-2">
            {q.options
              .slice()
              .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
              .map((opt) => (
                <OptionItem
                  key={opt.id}
                  groupName={`q-${q.id}`}   // 👈 đổi từ name → groupName
                  opt={opt}
                  checked={pickedOptionId === opt.id}
                  disabled={showResult}
                  onChange={() => onPick(opt.id)}
                  reveal={showResult}
                  isCorrect={opt.isCorrect}
                  isPicked={pickedOptionId === opt.id}
                />

              ))}
          </div>

          {showResult && q.explanation && (
            <div className="mt-4 rounded-xl bg-amber-50 p-3 text-amber-900 ring-1 ring-amber-200 dark:bg-amber-900/20 dark:text-amber-200 dark:ring-amber-800">
              <div className="text-sm font-semibold">Giải thích</div>
              <p className="mt-1 text-sm leading-relaxed">{q.explanation}</p>
            </div>
          )}
        </>
      )
        : questionType === "fill_in" ? (
          <>
            {(() => {
              // sort options theo sortOrder trước
              const opts = q.options
                .slice()
                .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

              const segs = stemToSegments(q.stem);
              let blankIdx = 0;

              // tính tổng đúng để gắn badge tổng quát (nếu bạn muốn)
              const allFillCorrect =
                showResult &&
                segs.some(s => s.type === "blank") &&
                opts.length > 0 &&
                // chỉ tính trên số blank thực có
                segs.filter(s => s.type === "blank").every((_, i) => {
                  const opt = opts[i];
                  const user = answers?.[opt?.id ?? -1] ?? "";
                  return opt ? normalize(user) === normalize(opt.content) : false;
                });

              return (
                <>
                  {/* Bạn có thể hiển thị badge tổng quát ở header (đã code ở phiên bản trước) */}
                  <p className="whitespace-pre-wrap leading-relaxed text-slate-800 dark:text-slate-200">
                    <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/90 text-xs font-bold text-white">
                      {index}
                    </span>
                    {segs.map((seg, i) => {
                      if (seg.type === "text") {
                        return <span key={`t-${i}`}>{seg.text}</span>;
                      } else {
                        const opt = opts[blankIdx] ?? null;
                        const val = opt ? (answers?.[opt.id] ?? "") : (answers?.[-1] ?? "");
                        const idxNow = blankIdx; // chốt index cho closure
                        blankIdx++;
                        return (
                          <InlineBlank
                            key={`b-${i}`}
                            opt={opt}
                            value={val}
                            reveal={showResult}
                            onChange={(v) => {
                              if (!opt) return; // không có option thì bỏ qua
                              onFill?.(opt.id, v);
                            }}
                          />
                        );
                      }
                    })}
                  </p>

                  {/* Nếu số blank > số option: cảnh báo nhẹ khi chấm (không bắt buộc) */}
                  {showResult && segs.filter(s => s.type === "blank").length > opts.length && (
                    <div className="mt-3 text-xs text-amber-600 dark:text-amber-300">
                      Lưu ý: Số ô trống trong câu nhiều hơn số đáp án cung cấp.
                    </div>
                  )}

                  {/* Gợi ý đáp án & giải thích khi chấm */}
                  {showResult && (
                    <div className="mt-4 space-y-3">
                      {/* Hiển thị đáp án đúng cho từng ô dưới dạng danh sách nhỏ */}
                      <div className="rounded-xl bg-slate-50 p-3 text-sm ring-1 ring-slate-200 dark:bg-slate-800/40 dark:ring-slate-700">
                        <div className="mb-1 font-semibold">Đáp án</div>
                        <ul className="list-disc space-y-0.5 pl-5">
                          {opts.map((opt) => {
                            const user = answers?.[opt.id] ?? "";
                            const ok = normalize(user) === normalize(opt.content);
                            return (
                              <li key={opt.id} className="flex items-baseline gap-2">
                                <span className="text-slate-500 dark:text-slate-400 w-10 shrink-0">
                                  Ô {opt.label}:
                                </span>
                                <span className={ok ? "text-emerald-700 dark:text-emerald-300" : "text-rose-700 dark:text-rose-300"}>
                                  {ok ? "Đúng" : "Sai"}
                                </span>
                                {!ok && (
                                  <span className="text-slate-700 dark:text-slate-200">
                                    &nbsp;→&nbsp;
                                    <span className="font-medium">{opt.content}</span>
                                  </span>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      </div>

                      {q.explanation && (
                        <div className="rounded-xl bg-amber-50 p-3 text-amber-900 ring-1 ring-amber-200 dark:bg-amber-900/20 dark:text-amber-200 dark:ring-amber-800">
                          <div className="text-sm font-semibold">Giải thích</div>
                          <p className="mt-1 text-sm leading-relaxed">{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  )}
                </>
              );
            })()}
          </>
        ) : (
          <></>
        )

      }

    </motion.div>
  );
}

function OptionItem({
  opt,
  checked,
  disabled,
  onChange,
  reveal,
  isCorrect,
  isPicked,
  groupName,
}: {
  opt: QuestionOption;
  checked: boolean;
  disabled: boolean;
  onChange: () => void;
  reveal: boolean;
  isCorrect: boolean;
  isPicked: boolean;
  groupName: string;
}) {
  const state = reveal
    ? isCorrect
      ? "correct"
      : isPicked
        ? "wrong"
        : "neutral"
    : checked
      ? "active"
      : "idle";

  const classByState: Record<string, string> = {
    idle: "border-slate-200 hover:border-emerald-300 dark:border-slate-700 dark:hover:border-emerald-700",
    active:
      "border-emerald-400 bg-emerald-50 ring-1 ring-emerald-300 dark:bg-emerald-900/20 dark:border-emerald-700 dark:ring-emerald-800",
    correct:
      "border-emerald-400 bg-emerald-50 ring-1 ring-emerald-300 dark:bg-emerald-900/20 dark:border-emerald-700 dark:ring-emerald-800",
    wrong:
      "border-rose-300 bg-rose-50 ring-1 ring-rose-300 dark:bg-rose-900/20 dark:border-rose-700 dark:ring-rose-800",
    neutral: "border-slate-200 dark:border-slate-700",
  };

  return (
    <label
      className={`group flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition ${classByState[state]}`}
    >
      <input
        type="radio"
        name={groupName}
        className="mt-1 h-4 w-4 accent-emerald-800"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <div className="flex-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-slate-100 text-slate-700 group-hover:bg-emerald-100 group-hover:text-emerald-800 dark:bg-slate-800 dark:text-slate-300 dark:group-hover:bg-emerald-900/30 dark:group-hover:text-emerald-300">
            {opt.label}
          </span>
          <span>{opt.content}</span>
        </div>
      </div>
    </label>
  );
}





// --- input inline cho từng blank ---
function InlineBlank({
  opt,
  value,
  onChange,
  reveal,
}: {
  opt: QuestionOption | null;              // có thể null nếu thiếu option
  value: string;
  onChange?: (v: string) => void;
  reveal: boolean;
}) {
  const isOk = reveal && opt && normalize(value) === normalize(opt.content);
  const isErr = reveal && opt && !isOk;

  return (

    <span
      className={[
        "mx-1 my-1 inline-flex items-center rounded-lg px-2 py-1 align-baseline",
        "min-w-[8ch] max-w-[50ch]",                 // khung co giãn 8→50ch
        "border transition",
        reveal
          ? isOk
            ? "border-emerald-300 bg-emerald-50 dark:border-emerald-800/60 dark:bg-emerald-900/10"
            : "border-rose-300 bg-rose-50 dark:border-rose-800/60 dark:bg-rose-900/10"
          : "border-slate-300 dark:border-slate-600",
      ].join(" ")}
    >
      <input
        type="text"
        aria-label={opt ? `Điền ô ${opt.label}` : "Ô trống"}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={reveal}
        placeholder={opt ? `Ô ${opt.label}` : "Ô trống"}
        // 🔑 bỏ w-full để không chiếm hết khung
        className="bg-transparent outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 font-semibold"
        // 🔑 auto-giãn theo độ dài hiện tại (8→50 ký tự)
        style={{
          width: `${Math.min(50, Math.max(8, (value?.length ?? 0) + 1))}ch`,
        }}
      />
    </span>


  );
}