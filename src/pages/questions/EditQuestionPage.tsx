import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Plus,
  Save,
  Trash2,
  Wand2,
} from "lucide-react";
import { QuestionOption, Question } from "@/shared/api/questionsApi";



const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:8080/api";
const BLANK_RE = /\.{5,}/g; // khớp với chuỗi gồm >= 5 dấu chấm

function nextLabel(n: number) {
  // A, B, C, ...
  return String.fromCharCode("A".charCodeAt(0) + n);
}

function countBlanks(stem: string): number {
  let c = 0;
  let m: RegExpExecArray | null;
  while ((m = BLANK_RE.exec(stem)) !== null) c++;
  return c;
}

function sortOptions<T extends QuestionOption>(opts: T[]): T[] {
  return opts
    .slice()
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    .map((o, i) => ({ ...o, sortOrder: i } as T));
}

export default function EditQuestionPage() {
  const { subjectId, questionId } = useParams<{ subjectId: string; questionId: string }>();
  const navigate = useNavigate();

  const creating = !questionId || questionId === "new";
  const sid = Number(subjectId);
  const qid = creating ? null : Number(questionId);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [model, setModel] = useState<Question>(() => ({
    id: 0,
    stem: "",
    explanation: "",
    questionType: "mcq_single",
    status: "approved",
    createdAt: "",
    options: [0, 1, 2, 3].map((i) => ({
      id: -1 - i, // temp negative id for new options
      label: nextLabel(i),
      content: "",
      isCorrect: i === 0, // default A đúng
      sortOrder: i,
    })),
  }));

  // ===== Fetch question when editing =====
  useEffect(() => {
    let ac = new AbortController();
    if (creating) {
      setLoading(false);
      return () => ac.abort();
    }

    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const res = await fetch(`${API_BASE}/questions/${qid}`, { signal: ac.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as Question;
        setModel((prev) => ({
          ...json,
          options: sortOptions(json.options ?? []),
        }));
      } catch (e: any) {
        if (e?.name === "AbortError") return;
        setErr(e?.message || "Không thể tải dữ liệu câu hỏi.");
      } finally {
        setLoading(false);
      }
    })();

    return () => ac.abort();
  }, [creating, qid]);

  // ===== Derived =====
  const blanks = useMemo(() => countBlanks(model.stem ?? ""), [model.stem]);
  const hasCorrect = useMemo(
    () => model.questionType === "mcq_single" ? model.options.some((o) => o.isCorrect) : true,
    [model.questionType, model.options]
  );

  // ===== Handlers =====
  const setStem = (v: string) => setModel((m) => ({ ...m, stem: v }));
  const setExplanation = (v: string) => setModel((m) => ({ ...m, explanation: v }));
  const setType = (tp: "mcq_single" | "fill_in") =>
    setModel((m) => ({
      ...m,
      questionType: tp,
      // reset flags phù hợp kiểu
      options: sortOptions(
        (m.options ?? []).map((o, i) => ({
          ...o,
          isCorrect: tp === "mcq_single" ? i === 0 : false,
        }))
      ),
    }));

  const addOption = () =>
    setModel((m) => {
      const n = (m.options?.length ?? 0);
      const opt: QuestionOption = {
        id: -1 - n,
        label: nextLabel(n),
        content: "",
        isCorrect: m.questionType === "mcq_single" ? n === 0 : false,
        sortOrder: n,
      };
      return { ...m, options: sortOptions([...(m.options ?? []), opt]) };
    });

  const removeOption = (idx: number) =>
    setModel((m) => {
      const arr = (m.options ?? []).slice();
      arr.splice(idx, 1);
      return {
        ...m,
        options: sortOptions(
          arr.map((o, i) => ({ ...o, label: nextLabel(i) }))
        ),
      };
    });

  const updateOption = (idx: number, patch: Partial<QuestionOption>) =>
    setModel((m) => {
      const arr = (m.options ?? []).slice();
      arr[idx] = { ...arr[idx], ...patch } as QuestionOption;
      return { ...m, options: arr };
    });

  const markCorrect = (idx: number) =>
    setModel((m) => ({
      ...m,
      options: (m.options ?? []).map((o, i) => ({ ...o, isCorrect: i === idx })),
    }));

  const validate = (): string | null => {
    if (!model.stem.trim()) return "Vui lòng nhập đề bài (stem).";
    if (model.questionType === "mcq_single") {
      if ((model.options?.length ?? 0) < 2) return "Cần ít nhất 2 phương án trả lời.";
      if (!hasCorrect) return "Hãy chọn một đáp án đúng.";
      const anyEmpty = model.options.some((o) => !o.content.trim());
      if (anyEmpty) return "Nội dung phương án không được để trống.";
    }
    if (model.questionType === "fill_in") {
      if (blanks === 0) return "Không phát hiện ô trống trong đề bài. Hãy dùng '.....' để tạo ô trống.";
      if ((model.options?.length ?? 0) < blanks) return `Số đáp án hiện có (${model.options.length}) ít hơn số ô trống (${blanks}).`;
      const anyEmpty = model.options.slice(0, blanks).some((o) => !o.content.trim());
      if (anyEmpty) return "Vui lòng điền đáp án đúng cho tất cả ô trống.";
    }
    return null;
  };

  const onSave = async () => {
    const v = validate();
    if (v) {
      setErr(v);
      return;
    }
    try {
      setSaving(true);
      setErr(null);

      // chuẩn hóa payload
      const payload: Question = {
        ...model,
        
        options: sortOptions(model.options ?? []).map((o, i) => ({
          ...o,
          sortOrder: i,
        })),
      };

      const url = creating ? `${API_BASE}/questions` : `${API_BASE}/questions/${qid}`;
      const method = creating ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      // điều hướng về danh sách câu hỏi của môn học
      navigate(`/questions/${sid}`);
    } catch (e: any) {
      setErr(e?.message || "Lưu thất bại");
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async () => {
    if (creating || !qid) return;
    if (!confirm("Bạn có chắc muốn xóa câu hỏi này?")) return;
    try {
      setSaving(true);
      const res = await fetch(`${API_BASE}/questions/${qid}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      navigate(`/questions/${sid}`);
    } catch (e: any) {
      setErr(e?.message || "Không thể xóa");
    } finally {
      setSaving(false);
    }
  };

  // ===== UI =====
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
        <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-10 text-white">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/20 backdrop-blur">
              <Wand2 className="h-4 w-4" /> QuizUniverse • Chỉnh sửa câu hỏi
            </div>
            <h1 className="text-[1.75rem] md:text-[2.2rem] font-black leading-tight">
              {creating ? "Tạo câu hỏi mới" : `Sửa câu hỏi #${qid}`}
            </h1>
            <p className="mt-1 text-white/90">Môn học: <b>{sid}</b></p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to={`/questions/${sid}`}
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm ring-1 ring-white/20 hover:brightness-110"
            >
              <ArrowLeft className="h-4 w-4" /> Quay lại danh sách
            </Link>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-6 py-8">
        {err && (
          <div className="mb-4 rounded-xl bg-rose-50 p-3 text-rose-700 ring-1 ring-rose-200 dark:bg-rose-900/20 dark:text-rose-300 dark:ring-rose-800">
            {err}
          </div>
        )}

        {loading ? (
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <Loader2 className="h-4 w-4 animate-spin" /> Đang tải...
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 160, damping: 18 }}
            className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            {/* Basic fields */}
            <div className="grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Đề bài (stem)
                </label>
                <textarea
                  value={model.stem}
                  onChange={(e) => setStem(e.target.value)}
                  className="h-28 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-800 shadow-sm outline-none ring-emerald-200 focus:border-emerald-400 focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  placeholder={model.questionType === "fill_in" ? "Nhập đề và dùng '.....' để tạo ô trống" : "Nhập đề bài"}
                />
                {model.questionType === "fill_in" && (
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Phát hiện <b>{blanks}</b> ô trống trong đề bài (dựa vào dãy dấu chấm).
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Loại câu hỏi
                </label>
                <select
                  value={model.questionType}
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-800 shadow-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                >
                  <option value="mcq_single">Trắc nghiệm 1 đáp án</option>
                  <option value="fill_in">Điền vào chỗ trống</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Trạng thái
                </label>
                <select
                  value={model.status ?? "draft"}
                  onChange={(e) => setModel((m) => ({ ...m, status: e.target.value }))}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-800 shadow-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                >
                  <option value="draft">Bản nháp</option>
                  <option value="approved">Duyệt</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Giải thích (tuỳ chọn)
                </label>
                <textarea
                  value={model.explanation ?? ""}
                  onChange={(e) => setExplanation(e.target.value)}
                  className="h-24 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-800 shadow-sm outline-none ring-emerald-200 focus:border-emerald-400 focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  placeholder="Giải thích hoặc ghi chú..."
                />
              </div>
            </div>

            {/* Options editor */}
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                  {model.questionType === "mcq_single" ? "Phương án trả lời" : "Đáp án cho các ô trống"}
                </h3>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {model.questionType === "mcq_single" ? (
                    hasCorrect ? (
                      <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="h-4 w-4" /> Đã chọn đáp án đúng
                      </span>
                    ) : (
                      <span className="text-rose-600 dark:text-rose-400">Chưa chọn đáp án đúng</span>
                    )
                  ) : (
                    <span>Hãy điền đúng {blanks} đáp án (theo thứ tự ô trống).</span>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                {sortOptions(model.options).map((opt, idx) => (
                  <div
                    key={`${opt.id}-${idx}`}
                    className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800"
                  >
                    {model.questionType === "mcq_single" ? (
                      <input
                        type="radio"
                        name="correct"
                        className="mt-2 h-4 w-4 accent-emerald-700"
                        checked={!!opt.isCorrect}
                        onChange={() => markCorrect(idx)}
                        title="Đánh dấu là đáp án đúng"
                      />
                    ) : (
                      <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-md bg-slate-100 text-xs font-bold text-slate-700 dark:bg-slate-700 dark:text-slate-200">
                        {nextLabel(idx)}
                      </span>
                    )}

                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-sm">
                        {model.questionType === "mcq_single" && (
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200">
                            {nextLabel(idx)}
                          </span>
                        )}
                        <input
                          value={opt.content}
                          onChange={(e) => updateOption(idx, { content: e.target.value })}
                          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                          placeholder={model.questionType === "mcq_single" ? `Nội dung phương án ${nextLabel(idx)}` : `Đáp án cho ô trống ${nextLabel(idx)}`}
                        />
                      </div>
                      <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
                        <label className="inline-flex items-center gap-1">
                          Thứ tự:
                          <input
                            type="number"
                            value={opt.sortOrder ?? idx}
                            onChange={(e) => updateOption(idx, { sortOrder: Number(e.target.value) })}
                            className="w-16 rounded-md border border-slate-300 bg-white px-2 py-1 text-slate-700 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-200 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200"
                          />
                        </label>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      <button
                        type="button"
                        onClick={() => removeOption(idx)}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700"
                        title="Xóa phương án"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3">
                <button
                  type="button"
                  onClick={addOption}
                  className="inline-flex items-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-100 dark:border-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300"
                >
                  <Plus className="h-4 w-4" /> Thêm phương án
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onSave}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-white shadow hover:brightness-110 disabled:opacity-60"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Lưu
              </button>

              {!creating && (
                <button
                  type="button"
                  onClick={onDelete}
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-2.5 text-white shadow hover:brightness-110 disabled:opacity-60"
                >
                  <Trash2 className="h-4 w-4" /> Xóa
                </button>
              )}

              <Link
                to={`/questions/${sid}`}
                className="ml-auto inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <ArrowLeft className="h-4 w-4" /> Hủy
              </Link>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
