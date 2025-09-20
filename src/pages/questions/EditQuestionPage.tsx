import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Plus,
  RefreshCcw,
  Save,
  Trash2,
} from "lucide-react";

import {
  Question,
  QuestionOption,
  UpdateQuestionPayload,
  fetchQuestionsBySubjectId, updateQuestionApi
} from "@/shared/api/questionsApi";
import { fetchSubjectNameById } from "@/shared/api/subjectApi";

// If you already expose API_BASE from your shared api layer, you can import it.
// To make this page self-contained, keep a local fallback:
const API_BASE = (import.meta as any).env?.VITE_API_BASE || "/api";

// ===== Helpers reused from QuestionsPage =====
const BLANK_RE = /\.{5,}/g; // 6 dots or more represent blanks

type Segment = { type: "text"; text: string } | { type: "blank" };

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
  return segs.length ? segs : [{ type: "text", text: stem }];
}

function deepClone<T>(x: T): T {
  return structuredClone ? structuredClone(x) : JSON.parse(JSON.stringify(x));
}

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
function autoLabel(idx: number) {
  return LETTERS[idx] || `Opt${idx + 1}`;
}



// ===== Page =====
export default function EditQuestionsPage() {
  const { subjectId } = useParams<{ subjectId: string }>();

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [subjectName, setSubjectName] = useState<string>("");
  const [list, setList] = useState<Question[]>([]);

  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selected = useMemo(() => list.find((q) => q.id === selectedId) || null, [list, selectedId]);
  const [editing, setEditing] = useState<Question | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveOk, setSaveOk] = useState<string | null>(null);

  const editorTopRef = useRef<HTMLDivElement | null>(null);



  // load list
  useEffect(() => {
    if (!subjectId) return;
    let cancelled = false;
    setLoading(true);
    setErr(null);
    (async () => {
      try {
        const idNum = Number(subjectId);
        const [qs, sj] = await Promise.all([
          fetchQuestionsBySubjectId(idNum),
          fetchSubjectNameById(idNum).catch(() => ({ name: `Môn #${idNum}` })),
        ]);
        if (!cancelled) {
          setList(qs);
          setSubjectName(sj?.name || `Môn #${idNum}`);
          if (qs.length) {
            setSelectedId(qs[0].id);
            setEditing(deepClone(qs[0]));
          }
        }
      } catch (e: any) {
        if (!cancelled) setErr(e?.message || "Không tải được dữ liệu.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [subjectId]);



  const total = list.length;
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const end = Math.min(total, start + PAGE_SIZE);
  const pageItems = list.slice(start, end);


  // useEffect(() => {
  //   pickQuestion(pageItems[0]);
  // }, [page]);


  // switch question
  function pickQuestion(q: Question) {
    // console.log("pick", q.id);
    setSelectedId(q.id);
    setEditing(deepClone(q));
    setSaveOk(null);
    setTimeout(() => editorTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  }

  // mutations on editing state
  function setStem(v: string) {
    if (!editing) return;
    const next = { ...editing, stem: v } as Question;
    setEditing(next);
  }

  function setExplanation(v: string) {
    if (!editing) return;
    setEditing({ ...editing, explanation: v } as Question);
  }

  function setType(v: Question["questionType"]) {
    if (!editing) return;
    setEditing({ ...editing, questionType: v } as Question);
  }

  function addOption() {
    if (!editing) return;
    const opts = (editing.options || []).slice().sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
    const nextIdx = opts.length;
    const newOpt: QuestionOption = {
      id: Math.floor(Math.random() * 1e9) * -1, // temp negative id for UI
      questionId: editing.id,
      label: autoLabel(nextIdx),
      content: "",
      isCorrect: editing.questionType === "mcq_single" ? nextIdx === 0 : false,
      sortOrder: nextIdx + 1,
    } as any;
    setEditing({ ...editing, options: [...opts, newOpt] });
  }

  function removeOption(optId: number) {
    if (!editing) return;
    const rest = (editing.options || []).filter((o) => o.id !== optId);
    // re-label & re-order
    const fixed = rest
      .slice()
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
      .map((o, i) => ({ ...o, label: autoLabel(i), sortOrder: i + 1 }));
    setEditing({ ...editing, options: fixed });
  }

  function patchOption(optId: number, patch: Partial<QuestionOption>) {
    if (!editing) return;
    const next = (editing.options || []).map((o) => (o.id === optId ? { ...o, ...patch } : o));
    setEditing({ ...editing, options: next });
  }

  function setCorrect(optId: number) {
    if (!editing) return;
    if (editing.questionType !== "mcq_single") return;
    const next = (editing.options || []).map((o) => ({ ...o, isCorrect: o.id === optId }));
    setEditing({ ...editing, options: next });
  }

  // For FILL_IN: ensure number of options matches number of blanks in stem
  function syncFillInToStem() {
    if (!editing) return;
    const blanks = stemToSegments(editing.stem).filter((s) => s.type === "blank").length;
    let opts = (editing.options || [])
      .slice()
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

    // grow
    while (opts.length < blanks) {
      const idx = opts.length;
      opts.push({
        id: Math.floor(Math.random() * 1e9) * -1,
        questionId: editing.id,
        label: autoLabel(idx),
        content: "", // correct text for this blank (pipe `|` to allow multiple answers)
        isCorrect: false, // not used in fill_in; correctness = text match
        sortOrder: idx + 1,
      } as any);
    }
    // shrink
    if (opts.length > blanks) opts = opts.slice(0, blanks);

    // re-label
    opts = opts.map((o, i) => ({ ...o, label: autoLabel(i), sortOrder: i + 1 }));

    setEditing({ ...editing, options: opts });
  }

  // validation
  function validate(): string | null {
    if (!editing) return "Không có dữ liệu để lưu.";
    if (!editing.stem?.trim()) return "Vui lòng nhập nội dung câu hỏi (stem).";

    const opts = (editing.options || []).slice();
    if (editing.questionType === "mcq_single") {
      if (opts.length < 2) return "Cần ít nhất 2 lựa chọn cho câu trắc nghiệm.";
      const numCorrect = opts.filter((o) => o.isCorrect).length;
      if (numCorrect !== 1) return "Câu trắc nghiệm phải có đúng 1 đáp án đúng.";
    }
    if (editing.questionType === "fill_in") {
      const blanks = stemToSegments(editing.stem).filter((s) => s.type === "blank").length;
      if (blanks === 0) return "Câu điền khuyết cần có ít nhất 1 ô trống (gõ ≥ 6 dấu chấm).";
      if (opts.length !== blanks) return `Số đáp án (${opts.length}) chưa khớp số ô trống (${blanks}). Bấm \"Đồng bộ ô trống\".`;
      if (opts.some((o) => !String(o.content || "").trim())) return "Mỗi ô trống cần cung cấp đáp án đúng (có thể nhiều phương án, ngăn bởi dấu |).";
    }
    return null;
  }

  // save
  async function handleSave() {
    const v = validate();
    if (v) {
      setSaveOk(null);
      setErr(v);
      return;
    }
    if (!editing) return;

    setSaving(true);
    setErr(null);
    setSaveOk(null);
    try {
      const payload: UpdateQuestionPayload = {
        stem: editing.stem,
        explanation: editing.explanation ?? null,
        questionType: editing.questionType,
        // keep only serializable fields for options
        options: (editing.options || [])
          .slice()
          .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
          .map((o) => ({ id: o.id > 0 ? o.id : undefined, label: o.label, content: o.content, isCorrect: !!o.isCorrect, sortOrder: o.sortOrder })),
      };
      const saved = await updateQuestionApi(editing.id, payload);

      // reflect to list
      setList((cur) => cur.map((q) => (q.id === saved.id ? saved : q)));
      setEditing(deepClone(saved));
      setSaveOk("Đã lưu thay đổi.");
    } catch (e: any) {
      setErr(e?.message || "Lưu thất bại.");
    } finally {
      setSaving(false);
      setTimeout(() => setSaveOk(null), 2500);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 text-white md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/20 backdrop-blur">
              Trình chỉnh sửa câu hỏi
            </div>
            <h1 className="text-[1.9rem] md:text-[2.4rem] font-black leading-tight">
              Sửa câu hỏi môn <span className="bg-gradient-to-r from-purple-300 to-amber-200 bg-clip-text text-transparent">{subjectName}</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Link to={`/questions/subject/${subjectId}`} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm ring-1 ring-white/20 hover:bg-white/15">
              <ArrowLeft className="h-4 w-4" />
              Về trang làm bài
            </Link>
          </div>
        </div>
      </section>

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-8 md:grid-cols-[minmax(280px,360px)_1fr]">
        {/* Left: list */}
        <motion.aside initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ type: "spring", stiffness: 140, damping: 18 }} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-sm font-semibold text-slate-700 dark:text-slate-200">Danh sách câu hỏi</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">{total} câu</div>
          </div>

          {loading ? (
            <div className="flex items-center gap-2 text-slate-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              Đang tải…</div>
          ) : err ? (
            <div className="rounded-lg bg-rose-50 p-3 text-sm text-rose-700 ring-1 ring-rose-200 dark:bg-rose-900/20 dark:text-rose-300 dark:ring-rose-800">{err}</div>
          ) : (
            <>
              <div className="overflow-auto pr-1">
                <ol className="space-y-2">
                  {pageItems.map((q, i) => {
                    const n = start + i + 1;
                    const active = q.id === selectedId;
                    return (
                      <li key={q.id}>
                        <button type="button" onClick={() => pickQuestion(q)} className={`w-full rounded-xl border px-3 py-2 text-left text-sm transition ${active
                          ? "border-emerald-400 bg-emerald-50 ring-1 ring-emerald-300 dark:border-emerald-700 dark:bg-emerald-900/20 dark:ring-emerald-800"
                          : "border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                          }`} title={`Sửa câu ${n}`}
                        >
                          <div className="mb-1 flex items-center gap-2 text-[13px] font-semibold text-slate-700 dark:text-slate-200">
                            <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-slate-100 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                              {n}
                            </span>
                            <span className="truncate">{q.stem}</span>
                          </div>
                          <div className="text-[12px] text-slate-500 dark:text-slate-400">{q.questionType === "fill_in" ? "Điền khuyết" : "Trắc nghiệm"}</div>
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </div>

              {/* pager */}
              <div className="mt-3 flex items-center gap-2">
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">
                  ← Trước
                </button>
                <div className="text-xs text-slate-600 dark:text-slate-300">
                  Trang <b>{page}</b>/        <b>{pageCount}</b> • Câu <b>{start + 1}</b>–        <b>{end}</b>
                </div>
                <button onClick={() => setPage((p) => Math.min(pageCount, p + 1))} disabled={page === pageCount} className="ml-auto rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">
                  Sau →
                </button>
              </div>
            </>
          )}
        </motion.aside>

        {/* Right: editor */}
        <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 140, damping: 18 }} className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div ref={editorTopRef} />

          {!editing ? (
            <div className="text-slate-600 dark:text-slate-300">Chọn một câu ở danh sách bên trái để chỉnh sửa.</div>
          ) : (
            <form className="space-y-5" onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
            >
              <div className="flex flex-wrap items-center gap-2">
                <div className="text-sm font-semibold text-slate-700 dark:text-slate-200">Câu #{selectedId}</div>
                {saveOk && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-xs text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:ring-emerald-800">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {saveOk}
                  </span>
                )}
                {err && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2 py-1 text-xs text-rose-700 ring-1 ring-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:ring-rose-800">
                    {err}
                  </span>
                )}
              </div>

              {/* Type */}
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">Loại câu hỏi</label>
                <div className="flex gap-3">
                  <label className="inline-flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
                    <input type="radio" name="type" value="mcq_single" checked={editing.questionType === "mcq_single"} onChange={() => setType("mcq_single")} className="h-4 w-4 accent-emerald-700" />
                    Trắc nghiệm 1 đáp án đúng
                  </label>
                  <label className="inline-flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
                    <input type="radio" name="type" value="fill_in" checked={editing.questionType === "fill_in"} onChange={() => setType("fill_in")} className="h-4 w-4 accent-emerald-700" />
                    Điền khuyết (….. = ô trống)
                  </label>
                </div>
              </div>

              {/* Stem */}
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Nội dung câu hỏi (Stem)
                </label>
                <textarea value={editing.stem} onChange={(e) => setStem(e.target.value)} rows={3} className="w-full resize-y rounded-xl border border-slate-300 bg-white p-3 text-sm outline-none ring-emerald-300 focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" placeholder={editing.questionType === "fill_in" ? "Ví dụ: 1 + ….. = ….. (dùng ≥ 6 dấu chấm để tạo ô trống)" : "Nhập câu hỏi"}
                />
                {editing.questionType === "fill_in" && (
                  <div className="mt-2 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                    Có <b className="mx-1">{stemToSegments(editing.stem).filter((s) => s.type === "blank").length}</b> ô trống.
                    <button type="button" onClick={syncFillInToStem} className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[12px] hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
                      <RefreshCcw className="h-3.5 w-3.5" />
                      Đồng bộ ô trống
                    </button>
                  </div>
                )}
              </div>

              {/* Explanation */}
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">Giải thích (tuỳ chọn)</label>
                <textarea value={editing.explanation || ""} onChange={(e) => setExplanation(e.target.value)} rows={3} className="w-full resize-y rounded-xl border border-slate-300 bg-white p-3 text-sm outline-none ring-emerald-300 focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" placeholder="Nhập giải thích/ghi chú cho câu hỏi" />
              </div>

              {/* Options */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Phương án trả lời</label>
                  <button type="button" onClick={addOption} className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-sm hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
                    <Plus className="h-4 w-4" />
                    Thêm lựa chọn
                  </button>
                </div>

                <div className="space-y-2">
                  {(editing.options || [])
                    .slice()
                    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
                    .map((opt, idx) => (
                      <div key={opt.id} className="flex items-start gap-2 rounded-xl border border-slate-200 p-3 dark:border-slate-800">
                        <div className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-md bg-slate-100 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                          {opt.label || autoLabel(idx)}
                        </div>
                        <div className="grid flex-1 gap-2 md:grid-cols-[1fr_auto]">
                          <input type="text" value={opt.content || ""} onChange={(e) => patchOption(opt.id, { content: e.target.value })} placeholder={editing.questionType === "fill_in" ? "Đáp án đúng cho ô này (có thể \"a|b|c\")" : "Nội dung phương án"} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-emerald-300 focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" />

                          {editing.questionType === "mcq_single" ? (
                            <label className="inline-flex items-center justify-end gap-2 text-sm text-slate-700 dark:text-slate-200">
                              <input type="radio" name="correct" checked={!!opt.isCorrect} onChange={() => setCorrect(opt.id)} className="h-4 w-4 accent-emerald-700" />
                              Đúng
                            </label>
                          ) : (
                            <div className="text-right text-[12px] text-slate-500 dark:text-slate-400 self-center">(Tự động chấm theo văn bản)</div>
                          )}
                        </div>
                        <button type="button" onClick={() => removeOption(opt.id)} className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-rose-600 dark:hover:bg-slate-800" title="Xoá">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                </div>

                {editing.questionType === "fill_in" && (
                  <p className="mt-2 text-[12px] text-slate-600 dark:text-slate-400">
                    Mẹo: Cho phép nhiều đáp án cho một ô bằng dấu <code className="rounded bg-slate-100 px-1 dark:bg-slate-800">|</code>, ví dụ: <code className="rounded bg-slate-100 px-1 dark:bg-slate-800">"Hà Nội|Ha Noi"</code>.
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-white shadow hover:brightness-110 disabled:opacity-70">
                    {saving ? <Loader2 className="h-4 w-4 animate-spin" />
                      : <Save className="h-4 w-4" />
                    } Lưu thay đổi
                  </button>
                  <button type="button" onClick={() => (editing ? setEditing(deepClone(list.find((q) => q.id === editing.id)!)) : null)} className="inline-flex items-center gap-2 rounded-full bg-slate-800 px-5 py-2.5 text-white shadow hover:brightness-110 dark:bg-slate-700">
                    <RefreshCcw className="h-4 w-4" />
                    Hoàn tác
                  </button>
                </div>
                <button className="inline-flex items-center gap-2 rounded-full bg-yellow-500 px-5 py-2.5 text-white shadow hover:brightness-110 dark:bg-yellow-600" >
                  Tạo thêm câu hỏi
                </button>

              </div>


            </form>
          )}
        </motion.section>
      </main>
    </div>
  );
}
