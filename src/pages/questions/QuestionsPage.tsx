import { useMemo, useState , useRef, useEffect } from "react";
import { useParams, Link} from "react-router-dom"; 

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



type QuestionOption = {
  id: number;
  label: string;        // "A" | "B" | ...
  content: string;
  isCorrect: boolean;
  sortOrder?: number;
};

type Question = {
  id: number;
  stem: string;
  explanation?: string | null;
  questionType: "mcq_single" | "mcq_multi" | string;
  status: "approved" | "draft" | "rejected" | string;
  createdAt: string;
  updatedAt?: string;
  options: QuestionOption[];
};


const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080/api";


// ====== Page ======
export default function QuestionsPage() {
  const [picked, setPicked] = useState<Record<number, number | null>>({}); // qId -> optionId
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState<{ [questionId: number]: number | null }>({});
  const { subjectId } = useParams<{ subjectId: string }>();
  const [data, setData] = useState<Question[]>([]);
  const [navOpen, setNavOpen] = useState(false); // ✅ trạng thái mở/đóng popup
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [showAns, setShowAns] = useState(false);
  useEffect(() => {
    console.log(subjectId);
  }, [subjectId]);
  const fetchData = () => {
  if (!subjectId) return;
  setLoading(true);
  setErr(null);

  const ac = new AbortController();

  (async () => {
    try {
      const res = await fetch(`${API_BASE}/questions/subject/${subjectId}`, { signal: ac.signal });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `HTTP ${res.status}`);
      }
      const json = (await res.json()) as Question[];
      setData(Array.isArray(json) ? json : []);
    } catch (e: any) {
      if (e?.name === "AbortError") return;

      // Báo lỗi & Fallback sang JSON cục bộ
      setErr(e?.message || "Không thể lấy dữ liệu từ API. Đang dùng dữ liệu cục bộ!");
      try {
        // VD: src/assets/data/questionssubject4.json, 5.json, ...
        const local = await import(`@/assets/data/questionssubject${subjectId}.json`);
        setData((local.default ?? []) as Question[]);
      } catch {
        // Nếu không có file tương ứng thì để rỗng
        setData([]);
      }
    } finally {
      setLoading(false);
    }
  })();

  return () => ac.abort();
};

useEffect(fetchData, [subjectId]);




  const PAGE_SIZE = 10;
  const pageSizeFAB = 50;
  const [page, setPage] = useState(1);
  const reopenTimerRef = useRef<number | null>(null);
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

  // ✅ chuyển tới câu bất kỳ: đổi trang + scroll mượt
  const goToQuestion = (qGlobalIndex: number, qId: number) => {
    const targetPage = Math.floor(qGlobalIndex / PAGE_SIZE) + 1;

    if (targetPage !== page) {
      setPage(targetPage);
      // chờ DOM render xong rồi scroll
      setTimeout(() => {
        document.getElementById(`q-${qId}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 0);

    } else {
      document.getElementById(`q-${qId}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }

  };

  const score = useMemo(() => {
    if (!submitted) return 0;
    let s = 0;
    for (const q of data) {
      const pickedOptionId = picked[q.id];
      const correct = q.options.find((o) => o.isCorrect);
      if (pickedOptionId && correct && pickedOptionId === correct.id) s += 1;
    }
    return s;
  }, [submitted, picked, data]);

  const reset = () => {
    setPicked({});
    setSubmitted(false);
  };

  // Hàm xử lý khi chọn đáp án
  const handleSelectOption = (questionId: number, optionId: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
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
              Bộ câu hỏi ôn tập <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 bg-clip-text text-transparent">ML021</span>
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

          <div className="space-y-6">
            {pageQuestions.map((q, idx) => (
              <QuestionCard

                key={q.id}
                index={start + idx + 1}
                q={q}
                pickedOptionId={picked[q.id] ?? null}
                onPick={(optionId) => {
                  setPicked((m) => ({ ...m, [q.id]: optionId }));
                  setAnswers((m) => ({ ...m, [q.id]: optionId })); // giữ đồng bộ với numAnswered
                }}
                onClear={() => {
                  setPicked((m) => ({ ...m, [q.id]: null }));
                  setAnswers((m) => ({ ...m, [q.id]: null }));     // cập nhật số câu đã làm
                }}
                showResult={submitted}
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
        </main>
        <div className="absolute right-5 top-10 w-fit h-full">
          <div className="sticky top-20 w-fit">
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
                          className={`h-8 rounded-md text-sm font-semibold  ${finalColor}  `}
                          title={`Tới câu ${qNumber}`}
                        >
                          {qNumber}
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
  pickedOptionId,
  onPick,
  onClear,
  showResult,
}: {
  index: number;
  q: Question;
  pickedOptionId: number | null;
  onPick: (optionId: number) => void;
  onClear: () => void;
  showResult: boolean;
}) {
  const correct = q.options.find((o) => o.isCorrect);
  const isCorrect = showResult && pickedOptionId && correct && pickedOptionId === correct.id;
  const isWrong = showResult && pickedOptionId && correct && pickedOptionId !== correct.id;


  return (
    <motion.div
      id={`q-${q.id}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: "spring", stiffness: 140, damping: 16 }}
      className=" rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
    >
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
          pickedOptionId !== null && (
            <button
              type="button"
              onClick={onClear}
              className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              title="Xóa lựa chọn của câu này"
            >
              Xóa lựa chọn
            </button>
          )
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

// ====== Gợi ý sử dụng ======
// 1) Lưu file này tại: src/pages/practice/PracticePage.tsx
// 2) Thêm route vào router của bạn, ví dụ:
//    <Route path="/practice" element={<PracticePage />} />
// 3) Nếu bạn muốn fetch từ API thay vì dùng demoQuestions,
//    - nhận props `questions` từ loader / từ parent
//    - hoặc dùng useEffect để gọi API rồi set state.
// 4) Có thể tái sử dụng gradient/hero từ trang HomePage để đồng bộ thẩm mỹ.
