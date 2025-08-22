"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var react_2 = require("react");
var NotFoundPage_1 = require("@pages/not-found/NotFoundPage"); // bạn tạo sẵn file này
var Layout_1 = require("@/layouts/Layout"); // Tạo một layout component mới
// Lazy
var HomePage = react_1.default.lazy(function () { return Promise.resolve().then(function () { return require("@pages/home/HomePage"); }); });
var AboutPage = react_1.default.lazy(function () { return Promise.resolve().then(function () { return require("@pages/about/AboutPage"); }); });
var ContactPage = react_1.default.lazy(function () { return Promise.resolve().then(function () { return require("@pages/contact/ContactPage"); }); });
var LoginPage = react_1.default.lazy(function () { return Promise.resolve().then(function () { return require("@pages/auth/LoginPage"); }); });
var RegisterPage = react_1.default.lazy(function () { return Promise.resolve().then(function () { return require("@pages/auth/RegisterPage"); }); });
var ForgotPasswordPage = react_1.default.lazy(function () { return Promise.resolve().then(function () { return require("@pages/auth/ForgotPasswordPage"); }); });
var TermsPage = react_1.default.lazy(function () { return Promise.resolve().then(function () { return require("@pages/legal/TermsPage"); }); });
var DashboardPage = react_1.default.lazy(function () { return Promise.resolve().then(function () { return require("@pages/dashboard/DashboardPage"); }); });
var TenantsPage = react_1.default.lazy(function () { return Promise.resolve().then(function () { return require("@pages/universities/TenantsPage"); }); });
var QuestionsPage = react_1.default.lazy(function () { return Promise.resolve().then(function () { return require("@pages/questions/QuestionsPage"); }); });
var ListQuestionsPage = react_1.default.lazy(function () { return Promise.resolve().then(function () { return require("@pages/questions/ListQuestionsPage"); }); });
var EditQuestionPage = react_1.default.lazy(function () { return Promise.resolve().then(function () { return require("@pages/questions/EditQuestionPage"); }); });
var CreateExamPage = react_1.default.lazy(function () { return Promise.resolve().then(function () { return require("@pages/exams/CreateExamPage"); }); });
var TakeExamPage = react_1.default.lazy(function () { return Promise.resolve().then(function () { return require("@pages/exams/TakeExamPage"); }); });
var ReviewExamPage = react_1.default.lazy(function () { return Promise.resolve().then(function () { return require("@pages/exams/ReviewExamPage"); }); });
var AdminPage = react_1.default.lazy(function () { return Promise.resolve().then(function () { return require("@pages/admin/AdminPage"); }); });
// src/shared/lib/withSuspense.tsx
var framer_motion_1 = require("framer-motion");
var lucide_react_1 = require("lucide-react");
var FancyFallback = function () {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex min-h-[40vh] w-full flex-col items-center justify-center gap-4", children: [(0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { animate: { rotate: 360 }, transition: { repeat: Infinity, duration: 1.2, ease: "linear" }, className: "rounded-full bg-gradient-to-tr from-emerald-400 to-teal-500 p-4 shadow-lg", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "h-8 w-8 text-white" }) }), (0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { initial: { opacity: 0.6 }, animate: { opacity: [0.6, 1, 0.6] }, transition: { duration: 1.5, repeat: Infinity }, className: "text-sm font-medium text-emerald-700 dark:text-emerald-300", children: "\u0110ang t\u1EA3i n\u1ED9i dung..." })] }));
};
var withSuspense = function (element) { return ((0, jsx_runtime_1.jsx)(react_2.Suspense, { fallback: (0, jsx_runtime_1.jsx)(FancyFallback, {}), children: element })); };
// Guard login
function RequireAuth() {
    // TODO: lấy user từ useAuth
    return (0, jsx_runtime_1.jsx)(react_router_dom_1.Outlet, {});
}
exports.router = (0, react_router_dom_1.createBrowserRouter)([
    {
        element: (0, jsx_runtime_1.jsx)(Layout_1.Layout, {}),
        children: [
            {
                path: "/login",
                element: withSuspense((0, jsx_runtime_1.jsx)(LoginPage, {})),
            },
            {
                path: "/register",
                element: withSuspense((0, jsx_runtime_1.jsx)(RegisterPage, {})),
            },
            {
                path: "/forgot-password",
                element: withSuspense((0, jsx_runtime_1.jsx)(ForgotPasswordPage, {})),
            },
            {
                path: "/terms",
                element: withSuspense((0, jsx_runtime_1.jsx)(TermsPage, {})),
            },
            // Root → HomePage mặc định
            { path: "/", element: withSuspense((0, jsx_runtime_1.jsx)(HomePage, {})), errorElement: (0, jsx_runtime_1.jsx)(NotFoundPage_1.default, {}) },
            // About page
            {
                path: "/about",
                element: withSuspense((0, jsx_runtime_1.jsx)(AboutPage, {})),
                errorElement: (0, jsx_runtime_1.jsx)(NotFoundPage_1.default, {}),
            },
            // Contact page
            {
                path: "/contact",
                element: withSuspense((0, jsx_runtime_1.jsx)(ContactPage, {})),
                errorElement: (0, jsx_runtime_1.jsx)(NotFoundPage_1.default, {}),
            },
            // Trang chọn trường thủ công (nếu cần)
            {
                path: "/select-tenant",
                element: withSuspense((0, jsx_runtime_1.jsx)(TenantsPage, {})),
                errorElement: (0, jsx_runtime_1.jsx)(NotFoundPage_1.default, {}),
            },
            // Questions page
            {
                path: "/questions",
                element: withSuspense((0, jsx_runtime_1.jsx)(QuestionsPage, {})),
                errorElement: (0, jsx_runtime_1.jsx)(NotFoundPage_1.default, {}),
            },
            // 404
            { path: "*", element: (0, jsx_runtime_1.jsx)(NotFoundPage_1.default, {}) },
        ]
    }
]);
