import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { createBrowserRouter, createHashRouter, Outlet } from "react-router-dom";
import { Suspense } from "react";
import NotFoundPage from "@pages/not-found/NotFoundPage"; // bạn tạo sẵn file này
import { Layout } from "@/layouts/Layout"; // Tạo một layout component mới
// Lazy
const HomePage = React.lazy(() => import("@pages/home/HomePage"));
const AboutPage = React.lazy(() => import("@pages/about/AboutPage"));
const ContactPage = React.lazy(() => import("@pages/contact/ContactPage"));
const LoginPage = React.lazy(() => import("@pages/auth/LoginPage"));
const RegisterPage = React.lazy(() => import("@pages/auth/RegisterPage"));
const ForgotPasswordPage = React.lazy(() => import("@pages/auth/ForgotPasswordPage"));
const TermsPage = React.lazy(() => import("@pages/legal/TermsPage"));
const DashboardPage = React.lazy(() => import("@pages/dashboard/DashboardPage"));
const TenantsPage = React.lazy(() => import("@pages/universities/TenantsPage"));
const QuestionsPage = React.lazy(() => import("@pages/questions/QuestionsPage"));
const ListQuestionsPage = React.lazy(() => import("@pages/questions/ListQuestionsPage"));
const EditQuestionPage = React.lazy(() => import("@pages/questions/EditQuestionPage"));
const CreateExamPage = React.lazy(() => import("@pages/exams/CreateExamPage"));
const TakeExamPage = React.lazy(() => import("@pages/exams/TakeExamPage"));
const ReviewExamPage = React.lazy(() => import("@pages/exams/ReviewExamPage"));
const AdminPage = React.lazy(() => import("@pages/admin/AdminPage"));
// src/shared/lib/withSuspense.tsx
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
const FancyFallback = () => {
    return (_jsxs("div", { className: "flex min-h-[40vh] w-full flex-col items-center justify-center gap-4", children: [_jsx(motion.div, { animate: { rotate: 360 }, transition: { repeat: Infinity, duration: 1.2, ease: "linear" }, className: "rounded-full bg-gradient-to-tr from-emerald-400 to-teal-500 p-4 shadow-lg", children: _jsx(Loader2, { className: "h-8 w-8 text-white" }) }), _jsx(motion.div, { initial: { opacity: 0.6 }, animate: { opacity: [0.6, 1, 0.6] }, transition: { duration: 1.5, repeat: Infinity }, className: "text-sm font-medium text-emerald-700 dark:text-emerald-300", children: "\u0110ang t\u1EA3i n\u1ED9i dung..." })] }));
};
const withSuspense = (element) => (_jsx(Suspense, { fallback: _jsx(FancyFallback, {}), children: element }));
// Guard login
function RequireAuth() {
    // TODO: lấy user từ useAuth
    return _jsx(Outlet, {});
}
const isGitHubPages = import.meta.env.PROD;
export const router = isGitHubPages
    ?
        createHashRouter([
            {
                element: _jsx(Layout, {}),
                children: [
                    { path: "/login", element: withSuspense(_jsx(LoginPage, {})) },
                    { path: "/register", element: withSuspense(_jsx(RegisterPage, {})) },
                    { path: "/forgot-password", element: withSuspense(_jsx(ForgotPasswordPage, {})) },
                    { path: "/terms", element: withSuspense(_jsx(TermsPage, {})) },
                    { path: "/", element: withSuspense(_jsx(HomePage, {})), errorElement: _jsx(NotFoundPage, {}) },
                    { path: "/about", element: withSuspense(_jsx(AboutPage, {})), errorElement: _jsx(NotFoundPage, {}) },
                    { path: "/contact", element: withSuspense(_jsx(ContactPage, {})), errorElement: _jsx(NotFoundPage, {}) },
                    { path: "/select-tenant", element: withSuspense(_jsx(TenantsPage, {})), errorElement: _jsx(NotFoundPage, {}) },
                    { path: "/questions", element: withSuspense(_jsx(QuestionsPage, {})), errorElement: _jsx(NotFoundPage, {}) },
                    { path: "*", element: _jsx(NotFoundPage, {}) },
                ],
            },
        ], {
            basename: import.meta.env.BASE_URL,
        })
    : createBrowserRouter([
        {
            element: _jsx(Layout, {}),
            children: [
                { path: "/login", element: withSuspense(_jsx(LoginPage, {})) },
                { path: "/register", element: withSuspense(_jsx(RegisterPage, {})) },
                { path: "/forgot-password", element: withSuspense(_jsx(ForgotPasswordPage, {})) },
                { path: "/terms", element: withSuspense(_jsx(TermsPage, {})) },
                { path: "/", element: withSuspense(_jsx(HomePage, {})), errorElement: _jsx(NotFoundPage, {}) },
                { path: "/about", element: withSuspense(_jsx(AboutPage, {})), errorElement: _jsx(NotFoundPage, {}) },
                { path: "/contact", element: withSuspense(_jsx(ContactPage, {})), errorElement: _jsx(NotFoundPage, {}) },
                { path: "/select-tenant", element: withSuspense(_jsx(TenantsPage, {})), errorElement: _jsx(NotFoundPage, {}) },
                { path: "/questions", element: withSuspense(_jsx(QuestionsPage, {})), errorElement: _jsx(NotFoundPage, {}) },
                { path: "*", element: _jsx(NotFoundPage, {}) },
            ],
        },
    ], {
        basename: import.meta.env.BASE_URL,
    });
