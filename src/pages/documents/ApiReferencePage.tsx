import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MdApi as ApiIcon,
  MdLock as Lock,
  MdPublic as Public,
  MdCode as Code,
  MdContentCopy as Copy,
  MdCheck as Check,
  MdSearch as Search,
  MdKeyboardArrowRight as ArrowRight,
  MdMenu as Menu,
  MdClose as Close,
  MdAdminPanelSettings as AdminIcon,
  MdPerson as PersonIcon,
  MdBookmark as BookmarkIcon,
  MdQuiz as QuizIcon,
  MdLibraryBooks as LibraryIcon,
} from "react-icons/md";
import { toast } from "react-hot-toast";

/* -------------------------------- Types -------------------------------- */

type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface Parameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

interface Endpoint {
  id: string;
  method: Method;
  path: string;
  summary: string;
  description: string;
  params?: Parameter[];
  body?: string;
  response?: string;
  isAuthRequired: boolean;
}

interface Category {
  id: string;
  title: string;
  icon: React.ReactNode;
  endpoints: Endpoint[];
}

/* -------------------------------- Data -------------------------------- */

const CATEGORIES: Category[] = [
  {
    id: "overview",
    title: "Tổng quan",
    icon: <ApiIcon />,
    endpoints: [
      {
        id: "intro",
        method: "GET",
        path: "/",
        summary: "Giới thiệu API",
        description:
          "Hệ thống QuizUniverse cung cấp REST API cho phép truy cập dữ liệu về môn học, bộ câu hỏi, diễn đàn và quản lý người dùng. API sử dụng chuẩn JSON và xác thực qua JWT Token.",
        isAuthRequired: false,
      },
      {
        id: "base-url",
        method: "GET",
        path: "https://api.quizuniverse.vn/api/v1",
        summary: "Base URL",
        description: "Tất cả các yêu cầu API phải được gửi đến địa chỉ này.",
        isAuthRequired: false,
      },
    ],
  },
  {
    id: "auth",
    title: "Xác thực (Auth)",
    icon: <Lock />,
    endpoints: [
      {
        id: "login",
        method: "POST",
        path: "/auth/login",
        summary: "Đăng nhập",
        description: "Xác thực người dùng bằng email và mật khẩu. Trả về JWT Token.",
        body: `{
  "email": "user@example.com",
  "password": "yourpassword"
}`,
        response: `{
  "token": "eyJhbGciOiJIUzI1...",
  "user": {
    "userId": "uuid",
    "name": "User Name",
    "email": "user@example.com",
    "role": "user"
  }
}`,
        isAuthRequired: false,
      },
      {
        id: "register",
        method: "POST",
        path: "/auth/register",
        summary: "Đăng ký",
        description: "Tạo tài khoản người dùng mới.",
        body: `{
  "name": "User Name",
  "email": "user@example.com",
  "password": "yourpassword"
}`,
        isAuthRequired: false,
      },
      {
        id: "change-password",
        method: "POST",
        path: "/auth/change-password",
        summary: "Đổi mật khẩu",
        description: "Yêu cầu đổi mật khẩu cho người dùng hiện tại.",
        isAuthRequired: true,
      },
    ],
  },
  {
    id: "subjects",
    title: "Môn học (Subjects)",
    icon: <LibraryIcon />,
    endpoints: [
      {
        id: "get-subjects",
        method: "GET",
        path: "/subjects",
        summary: "Danh sách môn học",
        description: "Lấy danh sách môn học có phân trang.",
        params: [
          { name: "page", type: "number", required: false, description: "Trang hiện tại (bắt đầu từ 0)" },
          { name: "size", type: "number", required: false, description: "Số lượng mục trên mỗi trang" },
          { name: "sort", type: "string", required: false, description: "Sắp xếp (ví dụ: name,asc)" },
        ],
        isAuthRequired: false,
      },
      {
        id: "get-subject-by-id",
        method: "GET",
        path: "/subjects/{id}",
        summary: "Chi tiết môn học",
        description: "Lấy thông tin chi tiết của một môn học theo ID.",
        isAuthRequired: false,
      },
      {
        id: "create-subject",
        method: "POST",
        path: "/subjects/create",
        summary: "Tạo môn học",
        description: "Tạo môn học mới (Chỉ dành cho Admin).",
        isAuthRequired: true,
      },
    ],
  },
  {
    id: "question-banks",
    title: "Ngân hàng câu hỏi",
    icon: <QuizIcon />,
    endpoints: [
      {
        id: "get-banks",
        method: "GET",
        path: "/question-banks",
        summary: "Danh sách ngân hàng",
        description: "Lấy danh sách ngân hàng câu hỏi công khai.",
        isAuthRequired: false,
      },
      {
        id: "search-banks",
        method: "GET",
        path: "/question-banks/search",
        summary: "Tìm kiếm ngân hàng",
        description: "Tìm kiếm ngân hàng câu hỏi theo từ khóa.",
        params: [
          { name: "keyword", type: "string", required: true, description: "Từ khóa tìm kiếm" },
        ],
        isAuthRequired: false,
      },
      {
        id: "get-my-banks",
        method: "GET",
        path: "/question-banks/me",
        summary: "Ngân hàng của tôi",
        description: "Lấy danh sách các bộ câu hỏi do người dùng hiện tại sở hữu.",
        isAuthRequired: true,
      },
      {
        id: "create-bank",
        method: "POST",
        path: "/question-banks",
        summary: "Tạo ngân hàng câu hỏi",
        description: "Tạo một bộ câu hỏi mới.",
        body: `{
  "name": "Tên bộ câu hỏi",
  "description": "Mô tả bộ câu hỏi",
  "subjectId": 123,
  "visibility": "PUBLIC"
}`,
        isAuthRequired: true,
      },
      {
        id: "patch-visibility",
        method: "PATCH",
        path: "/question-banks/{id}/visibility",
        summary: "Đổi quyền xem",
        description: "Cập nhật trạng thái hiển thị (PUBLIC, PRIVATE, ORG).",
        params: [
          { name: "visibility", type: "string", required: true, description: "Trạng thái mới" },
        ],
        isAuthRequired: true,
      },
    ],
  },
  {
    id: "questions",
    title: "Câu hỏi (Questions)",
    icon: <Code />,
    endpoints: [
      {
        id: "get-questions-bank",
        method: "GET",
        path: "/questions/question-bank/{bankId}",
        summary: "Câu hỏi theo bộ",
        description: "Lấy danh sách câu hỏi trong một bộ câu hỏi nhất định.",
        isAuthRequired: true,
      },
      {
        id: "create-question",
        method: "POST",
        path: "/questions/question-bank/{bankId}",
        summary: "Thêm câu hỏi",
        description: "Tạo câu hỏi mới trong một bộ câu hỏi.",
        body: `{
  "content": "Câu hỏi là gì?",
  "type": "MCQ",
  "answers": [
    { "content": "Đáp án A", "isCorrect": true },
    { "content": "Đáp án B", "isCorrect": false }
  ],
  "difficulty": "MEDIUM"
}`,
        isAuthRequired: true,
      },
    ],
  },
  {
    id: "favorites",
    title: "Yêu thích (Favorites)",
    icon: <BookmarkIcon />,
    endpoints: [
      {
        id: "add-fav-bank",
        method: "POST",
        path: "/favorites/question-banks/{bankId}",
        summary: "Thêm vào yêu thích",
        description: "Lưu bộ câu hỏi vào danh sách yêu thích.",
        isAuthRequired: true,
      },
      {
        id: "get-fav-banks",
        method: "GET",
        path: "/favorites/question-banks",
        summary: "Danh sách yêu thích",
        description: "Lấy danh sách các bộ câu hỏi đã lưu.",
        isAuthRequired: true,
      },
    ],
  },
  {
    id: "profile",
    title: "Người dùng (Profile)",
    icon: <PersonIcon />,
    endpoints: [
      {
        id: "get-profile",
        method: "GET",
        path: "/users",
        summary: "Thông tin cá nhân",
        description: "Lấy thông tin chi tiết của người dùng đang đăng nhập.",
        isAuthRequired: true,
      },
      {
        id: "update-profile",
        method: "PUT",
        path: "/users",
        summary: "Cập nhật thông tin",
        description: "Cập nhật các thông tin cơ bản của người dùng.",
        isAuthRequired: true,
      },
    ],
  },
  {
    id: "admin",
    title: "Quản trị (Admin)",
    icon: <AdminIcon />,
    endpoints: [
      {
        id: "get-stats",
        method: "GET",
        path: "/admin/stats",
        summary: "Thống kê hệ thống",
        description: "Lấy các số liệu thống kê tổng quan (Chỉ dành cho Admin).",
        isAuthRequired: true,
      },
      {
        id: "get-users",
        method: "GET",
        path: "/admin/users",
        summary: "Danh sách người dùng",
        description: "Lấy danh sách tất cả người dùng trong hệ thống (Chỉ dành cho Admin).",
        isAuthRequired: true,
      },
    ],
  },
];

/* -------------------------------- Components -------------------------------- */

const MethodBadge: React.FC<{ method: Method }> = ({ method }) => {
  const colors: Record<Method, string> = {
    GET: "bg-blue-500/20 text-blue-500 border-blue-500/30",
    POST: "bg-emerald-500/20 text-emerald-500 border-emerald-500/30",
    PUT: "bg-amber-500/20 text-amber-500 border-amber-500/30",
    DELETE: "bg-rose-500/20 text-rose-500 border-rose-500/30",
    PATCH: "bg-purple-500/20 text-purple-500 border-purple-500/30",
  };

  return (
    <span
      className={`rounded-md border px-2 py-0.5 text-[10px] font-black tracking-wider ${colors[method]}`}
    >
      {method}
    </span>
  );
};

const CodeBlock: React.FC<{ code: string }> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Đã sao chép vào bộ nhớ tạm");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-900 p-4 text-[13px] text-emerald-400 font-mono ring-1 ring-white/10 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {code}
      </pre>
      <button
        onClick={copyToClipboard}
        className="absolute right-3 top-3 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100"
        title="Sao chép"
      >
        {copied ? (
          <Check className="h-4 w-4 text-emerald-400" />
        ) : (
          <Copy className="h-4 w-4 text-white/70" />
        )}
      </button>
    </div>
  );
};

const EndpointCard: React.FC<{ endpoint: Endpoint }> = ({ endpoint }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-5 py-4 dark:border-slate-800 dark:bg-slate-950/50">
        <div className="flex items-center gap-3">
          <MethodBadge method={endpoint.method} />
          <code className="text-sm font-bold text-slate-800 dark:text-slate-200">
            {endpoint.path}
          </code>
        </div>
        {endpoint.isAuthRequired ? (
          <div className="flex items-center gap-1 text-[11px] font-medium text-amber-500" title="Yêu cầu đăng nhập">
            <Lock className="h-3.5 w-3.5" />
            <span>Auth</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-500" title="Công khai">
            <Public className="h-3.5 w-3.5" />
            <span>Public</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-5">
        <h4 className="text-lg font-bold text-slate-900 dark:text-white">
          {endpoint.summary}
        </h4>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          {endpoint.description}
        </p>

        {/* Parameters */}
        {endpoint.params && endpoint.params.length > 0 && (
          <div className="mt-6">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Parameters
            </h5>
            <div className="mt-2 space-y-2">
              {endpoint.params.map((p) => (
                <div key={p.name} className="flex items-start gap-3 rounded-lg border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/30">
                  <div className="min-w-[80px]">
                    <code className="text-xs font-black text-indigo-600 dark:text-indigo-400">{p.name}</code>
                    <div className="mt-0.5 text-[10px] text-slate-400 uppercase">{p.type}</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-[13px] text-slate-700 dark:text-slate-300">{p.description}</div>
                    {p.required && (
                      <span className="mt-1 inline-block text-[9px] font-black text-rose-500 uppercase">Required</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Body Example */}
        {endpoint.body && (
          <div className="mt-6">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Request Body
            </h5>
            <CodeBlock code={endpoint.body} />
          </div>
        )}

        {/* Response Example */}
        {endpoint.response && (
          <div className="mt-6">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Response Body
            </h5>
            <CodeBlock code={endpoint.response} />
          </div>
        )}
      </div>
    </motion.div>
  );
};

/* -------------------------------- Main Page -------------------------------- */

export default function ApiReferencePage() {
  const [activeCategory, setActiveCategory] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = CATEGORIES.map(cat => ({
    ...cat,
    endpoints: cat.endpoints.filter(e => 
      e.summary.toLowerCase().includes(searchQuery.toLowerCase()) || 
      e.path.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.endpoints.length > 0);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <div className="flex flex-1 pt-12 md:pt-14">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-slate-200 bg-white transition-transform duration-300 ease-in-out dark:border-slate-800 dark:bg-slate-950 lg:sticky lg:top-14 lg:h-[calc(100vh-3.5rem)] lg:translate-x-0 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col p-4">
            <div className="flex-1 space-y-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setIsSidebarOpen(false);
                    document.getElementById(cat.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                    activeCategory === cat.id
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900"
                  }`}
                >
                  <span className="text-xl">{cat.icon}</span>
                  <span>{cat.title}</span>
                  <ArrowRight className={`ml-auto transition-transform ${activeCategory === cat.id ? "rotate-90" : ""}`} />
                </button>
              ))}
            </div>

            <div className="mt-4 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 p-4 text-white">
              <h5 className="text-xs font-bold uppercase tracking-widest opacity-70">Trợ giúp?</h5>
              <p className="mt-2 text-[13px] leading-relaxed">
                Bạn cần hỗ trợ tích hợp? Liên hệ đội ngũ kỹ thuật qua diễn đàn.
              </p>
              <button className="mt-3 rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-indigo-600 hover:bg-opacity-90">
                Gửi yêu cầu
              </button>
            </div>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-12 scroll-smooth">
          <div className="mx-auto max-w-4xl">
            <AnimatePresence mode="wait">
              <div className="space-y-16">
                {filteredCategories.map((cat) => (
                  <section key={cat.id} id={cat.id} className="scroll-mt-24">
                    <div className="mb-8 flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                        <span className="text-2xl text-emerald-500">{cat.icon}</span>
                      </div>
                      <div>
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                          {cat.title}
                        </h2>
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          {cat.endpoints.length} endpoints
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {cat.endpoints.map((endpoint) => (
                        <EndpointCard key={endpoint.id} endpoint={endpoint} />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </AnimatePresence>

            {/* Footer Placeholder */}
            <div className="mt-20 border-t border-slate-200 pt-8 dark:border-slate-800">
              <div className="flex items-center justify-between text-sm text-slate-500">
                <span>© {new Date().getFullYear()} QuizUniverse Platform</span>
                <div className="flex gap-4">
                  <a href="#" className="hover:text-emerald-500">Điều khoản</a>
                  <a href="#" className="hover:text-emerald-500">Bảo mật</a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
