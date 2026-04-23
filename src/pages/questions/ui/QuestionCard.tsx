import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Flag } from "lucide-react";
import { Question, QuestionOption } from "@/shared/types/question";
import { stemToSegments, normalize } from "../utils";

export function QuestionCard({
  index,
  q,
  questionType = "mcq_single",
  pickedOptionId,
  onPick,
  onClear,
  showResult,
  answers,
  onFill,
  flagged,
  onToggleFlag,
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
              <div className="flex items-center gap-2">
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
                  groupName={`q-${q.id}`}
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
      ) : questionType === "fill_in" ? (
        <>
          {(() => {
            const opts = q.options
              .slice()
              .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

            const segs = stemToSegments(q.stem);
            let blankIdx = 0;

            return (
              <>
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
                      blankIdx++;
                      return (
                        <InlineBlank
                          key={`b-${i}`}
                          opt={opt}
                          value={val}
                          reveal={showResult}
                          onChange={(v) => {
                            if (!opt) return;
                            onFill?.(opt.id, v);
                          }}
                        />
                      );
                    }
                  })}
                </p>

                {showResult && segs.filter(s => s.type === "blank").length > opts.length && (
                  <div className="mt-3 text-xs text-amber-600 dark:text-amber-300">
                    Lưu ý: Số ô trống trong câu nhiều hơn số đáp án cung cấp.
                  </div>
                )}

                {showResult && (
                  <div className="mt-4 space-y-3">
                    <div className="rounded-xl bg-slate-50 p-3 text-sm ring-1 ring-slate-200 dark:bg-slate-800/40 dark:ring-slate-700">
                      <div className="mb-1 font-semibold text-slate-800 dark:text-slate-200">Đáp án</div>
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

function InlineBlank({
  opt,
  value,
  onChange,
  reveal,
}: {
  opt: QuestionOption | null;
  value: string;
  onChange?: (v: string) => void;
  reveal: boolean;
}) {
  const isOk = reveal && opt && normalize(value) === normalize(opt.content);

  return (
    <span
      className={[
        "mx-1 my-1 inline-flex items-center rounded-lg px-2 py-1 align-baseline",
        "min-w-[8ch] max-w-[50ch]",
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
        className="bg-transparent outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 font-semibold"
        style={{
          width: `${Math.min(50, Math.max(8, (value?.length ?? 0) + 1))}ch`,
        }}
      />
    </span>
  );
}
