import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MdArrowBack as ArrowLeft,
  MdPrint as PrintIcon,
  MdFileDownload as DownloadIcon,
  MdSearch as Search,
  MdCheckCircleOutline as CheckCircle,
  MdInfoOutline as Info,
  MdLightbulbOutline as Tip,
  MdAutoAwesome as Sparkles,
} from 'react-icons/md';
import { fetchQuestionsByBankId } from "@/shared/api/questionsApi";
import { QuestionBankApi } from "@/shared/api/questionBanksApi";
import { QuestionBank } from "@/shared/types/questionBank";
import { Question } from "@/shared/types/question";
import LoadingState from "@/widgets/LoadingState";
import { QuestionCard } from "./ui/QuestionCard";
import AnimatedGradientBackground from "@/shared/ui/AnimatedGradientBackground";

export default function QuestionDocumentPage() {
  const navigate = useNavigate();
  const { bankId } = useParams<{ bankId: string }>();
  const [data, setData] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [questionBankName, setQuestionBankName] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (bankId == null) return;
      setLoading(true);
      setErr(null);
      const id = Number(bankId);

      try {
        const [qRes, sRes] = await Promise.all([
          fetchQuestionsByBankId(id),
          QuestionBankApi.getById(id),
        ]);

        setData(qRes);
        setQuestionBankName(sRes.name);
      } catch (error: any) {
        console.error("Error fetching question document data:", error);
        setErr("Không thể tải dữ liệu câu hỏi. Đang thử tải dữ liệu dự phòng...");
        
        // Fallback logic
        try {
          const res = await fetch(`${import.meta.env.BASE_URL}data/questionBank${id}.json`);
          if (!res.ok) throw new Error("Local file not found");
          const json = await res.json();
          setData(Array.isArray(json) ? json : (json.content || []));
          setQuestionBankName(`[Dữ liệu cục bộ] Bộ #${id}`);
        } catch (e) {
          setErr("Lỗi: Không tìm thấy dữ liệu bộ câu hỏi này.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [bankId]);

  useEffect(() => {
    if (questionBankName) {
      document.title = `Tai_lieu_on_tap_${questionBankName.replace(/\s+/g, '_')}`;
    }
    return () => {
      document.title = "QuizUniverse";
    };
  }, [questionBankName]);

  const filteredQuestions = data.filter(q => 
    q.stem.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (q.explanation?.toLowerCase() || "").includes(searchQuery.toLowerCase())
  );

  const handlePrint = () => {
    window.print();
  };

  if (loading) return <div className="p-10"><LoadingState count={10} /></div>;

  if (err && data.length === 0) {
    return (
      <div className="flex h-[80vh] flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{err}</h2>
        <button
          onClick={() => navigate("/question-banks")}
          className="mt-6 flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-white shadow-lg"
        >
          <ArrowLeft /> Quay lại
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 dark:bg-slate-950 print:bg-white print:py-0">
      <div className="mx-auto max-w-4xl px-6">
        {/* Header - Hidden on Print */}
        <div className="mb-8 flex flex-col gap-6 print:hidden">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
            >
              <ArrowLeft /> Quay lại
            </button>
            <div className="flex gap-3">
              <button
                onClick={() => navigate(`/questions/question-bank/${bankId}`)}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-600 shadow-sm hover:bg-emerald-50 dark:border-slate-800 dark:bg-slate-900"
              >
                <Sparkles className="text-lg" /> Làm trắc nghiệm
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
              >
                <PrintIcon className="text-lg" /> In tài liệu
              </button>
            </div>

          </div>

          <div className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
            <AnimatedGradientBackground />
            <div className="relative z-10">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
                <CheckCircle className="h-3 w-3" /> CHẾ ĐỘ ÔN TẬP
              </div>
              <h1 className="text-3xl font-black text-white">
                {questionBankName}
              </h1>
              <p className="mt-2 text-white/80">
                Chế độ xem tài liệu: Hiển thị đầy đủ câu hỏi, đáp án đúng và lời giải chi tiết.
              </p>

              <div className="mt-6 flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm nội dung câu hỏi..."
                    className="w-full rounded-xl border border-white/20 bg-white/10 py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/30 backdrop-blur-md"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="text-sm font-medium text-white/70">
                  Tổng số: <span className="text-white font-bold">{filteredQuestions.length}</span> câu
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Document Header - Visible on Print */}
        <div className="mb-10 hidden border-b-2 border-slate-900 pb-6 print:block">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold uppercase tracking-tight text-slate-900">
                TÀI LIỆU ÔN TẬP TRẮC NGHIỆM
              </h1>
              <h2 className="mt-1 text-xl font-medium text-slate-800">
                Bộ đề: {questionBankName}
              </h2>
            </div>
            <div className="text-right text-sm">
              <p>QuizUniverse Platform</p>
              <p>{new Date().toLocaleDateString('vi-VN')}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8 print:space-y-6" ref={printRef}>
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((q, idx) => (
              <div key={q.questionId} className="group relative">
                <QuestionCard
                  index={idx + 1}
                  q={q}
                  questionType={q.questionType}
                  pickedOptionId={q.options?.find(o => o.isCorrect)?.optionId || null}
                  onPick={() => {}}
                  onClear={() => {}}
                  showResult={true} // Luôn hiện kết quả
                  flagged={false}
                  onToggleFlag={() => {}}
                />
                
                
              </div>
            ))
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-slate-200 py-20 text-center dark:border-slate-800">
              <p className="text-slate-500">Không tìm thấy câu hỏi nào phù hợp với từ khóa.</p>
            </div>
          )}
        </div>

        {/* Print Footer */}
        <div className="mt-12 hidden border-t border-slate-300 pt-6 text-center text-xs text-slate-500 print:block">
          <p>Tài liệu được trích xuất từ hệ thống QuizUniverse - www.quizuniverse.vn</p>
          <p>© {new Date().getFullYear()} QuizUniverse Platform</p>
        </div>
        
        {/* Page Footer */}
        <div className="mt-12 py-10 text-center text-sm text-slate-400 print:hidden">
          <div className="mb-4 flex justify-center gap-6">
            <div className="flex items-center gap-1.5">
              <CheckCircle className="text-emerald-500" /> <span>Đáp án chính xác</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Tip className="text-amber-500" /> <span>Có giải thích</span>
            </div>
          </div>
          <p>Hết danh sách câu hỏi</p>
        </div>
      </div>

      {/* Print-specific overrides and Word-style formatting */}
      <style>{`
        @media print {
          /* Force light mode and clean colors */
          @page { margin: 2cm; }
          body { 
            background: white !important; 
            color: #000 !important; 
            font-family: "Times New Roman", Times, serif !important;
            font-size: 12pt !important;
            padding: 2px;
          }

          /* Force black color on all text elements */
          p, span, h1, h2, h3, h4, h5, h6, li, div, code, pre {
            color: #000 !important;
          }

          /* Hide all UI elements */
          .print\\:hidden, 
          header, 
          footer, 
          nav, 
          button, 
          .search-bar, 
          .badge { 
            display: none !important; 
          }
          
          .print\\:block { display: block !important; }

          /* Reset containers */
          .mx-auto { max-width: 100% !important; margin: 0 !important; padding: 0 !important; }
          .min-h-screen { min-height: auto !important; background: white !important; }
          .shadow-sm, .shadow-md, .shadow-lg, .shadow-xl, .shadow-2xl { box-shadow: none !important; }
          .ring-1, .ring-2 { ring: 0 !important; border: none !important; }
          
          /* Document Header Styling */
          .border-b-2 { border-bottom: 1.5pt solid black !important; }
          h1 { font-size: 18pt !important; font-weight: bold !important; color: #000 !important; }
          h2 { font-size: 14pt !important; color: #000 !important; }

          /* Question Formatting (Word Style) */
          .relative.rounded-2xl { 
            border: none !important; 
            padding: 0 !important; 
            margin-bottom: 20pt !important; 
            page-break-inside: avoid;
            background: transparent !important;
            color: #000 !important;
          }
          
          /* Question Text */
          .text-base.font-semibold { 
            font-size: 12pt !important; 
            font-weight: bold !important; 
            margin-bottom: 5pt !important;
            color: #000 !important;
          }
          
          /* Question Number Badge */
          .rounded-md.bg-emerald-500\\/90 { 
            background: transparent !important; 
            color: #000 !important; 
            font-weight: bold !important;
            padding: 0 !important;
            margin-right: 5pt !important;
          }
          .rounded-md.bg-emerald-500\\/90::after {
            content: ".";
          }

          /* Options Formatting */
          .grid.gap-2 { 
            gap: 5pt !important; 
            margin-top: 5pt !important;
          }
          label.group { 
            border: none !important; 
            padding: 2pt 0 !important; 
            background: transparent !important;
            display: flex !important;
            align-items: flex-start !important;
            color: #000 !important;
            font-weight: 200 !important;
            page-break-inside: avoid;
          }

          /* Reset all children to normal display except specific flex containers */
          label.group * {
            display: inline-block !important;
            font-weight: inherit !important;
            color: inherit !important;
          }

          /* Specific fix for the option container in QuestionCard */
          label.group .flex-1,
          label.group .flex-1 > div {
            display: flex !important;
            align-items: center !important;
            gap: 5pt !important;
            width: 100% !important;
          }

          
          /* Hide Radio Buttons on print */
          input[type="radio"] { 
            display: none !important; 
          }

          /* Option Label (A, B, C, D) */
          .rounded-md.bg-slate-100 { 
            background: transparent !important; 
            color: #000 !important; 
            font-weight: 600 !important;
            padding: 0 !important;
            min-width: 20pt !important;
            margin-left: 5px !important;
          }
          .rounded-md.bg-slate-100::after {
            content: ")";
          }
          
          /* Highlight Correct Answer on print */
          .border-emerald-400.bg-emerald-50,
          .border-emerald-400.bg-emerald-50 * { 
            background: transparent !important;
            font-weight: 600 !important;
            text-decoration: underline !important;
            color: #000 !important;
          }


          /* Explanation Formatting */
          .rounded-xl.bg-amber-50 { 
            background: #fff !important; 
            border: 0.5pt solid #000 !important; 
            margin-top: 10pt !important;
            padding: 8pt !important;
            font-style: italic !important;
            font-size: 11pt !important;
            color: #000 !important;
          }
          
          /* Reset dark mode and slate colors for print */
          .dark\\:bg-slate-900, .dark\\:bg-slate-950, .dark\\:text-white,
          .text-slate-600, .text-slate-500, .text-slate-400, .text-slate-800,
          .dark\\:text-slate-200, .dark\\:text-slate-400 {
            background-color: white !important;
            color: #000 !important;
          }
        }
      `}</style>
    </div>
  );
}
