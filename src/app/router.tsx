import React from "react";
import { createBrowserRouter,createHashRouter , Outlet } from "react-router-dom";
import { Suspense } from "react";

import PublicLayout from "@layouts/PublicLayout";
import DashboardLayout from "@layouts/DashboardLayout";


import NotFoundPage from "@pages/not-found/NotFoundPage"; // bạn tạo sẵn file này
import { Layout } from "@/layouts/Layout"; // Tạo một layout component mới



// Lazy
const HomePage = React.lazy(() => import("@pages/home/HomePage"));
const AboutPage = React.lazy(() => import("@pages/about/AboutPage"));
const ContactPage = React.lazy(() => import("@pages/contact/ContactPage"));
const LoginPage = React.lazy(() => import("@pages/auth/LoginPage"));
const RegisterPage = React.lazy(() => import("@pages/auth/RegisterPage"));
const ForgotPasswordPage  = React.lazy(() => import("@pages/auth/ForgotPasswordPage"));
const TermsPage = React.lazy(() => import("@pages/legal/TermsPage"));
const DashboardPage = React.lazy(() => import("@pages/dashboard/DashboardPage"));
const TenantsPage = React.lazy(() => import("@pages/universities/TenantsPage"));
const SubjectsPage = React.lazy(() => import("@pages/subjects/SubjectsPage"));
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
  return (
    <div className="flex min-h-[40vh] w-full flex-col items-center justify-center gap-4">
      {/* Vòng loading xoay */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
        className="rounded-full bg-gradient-to-tr from-emerald-400 to-teal-500 p-4 shadow-lg"
      >
        <Loader2 className="h-8 w-8 text-white" />
      </motion.div>

      {/* Text shimmer */}
      <motion.div
        initial={{ opacity: 0.6 }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-sm font-medium text-emerald-700 dark:text-emerald-300"
      >
        Đang tải nội dung...
      </motion.div>
    </div>
  );
};

 const withSuspense = (element: React.ReactElement) => (
  <Suspense fallback={<FancyFallback />}>{element}</Suspense>
);

// Guard login
function RequireAuth() {
  // TODO: lấy user từ useAuth
  return <Outlet />;
}


export const router =  
  createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        { path: "/login", element: withSuspense(<LoginPage />) },
        { path: "/register", element: withSuspense(<RegisterPage />) },
        { path: "/forgot-password", element: withSuspense(<ForgotPasswordPage />) },
        { path: "/terms", element: withSuspense(<TermsPage />) },

        { path: "/", element: withSuspense(<HomePage />), errorElement: <NotFoundPage /> },
        { path: "/about", element: withSuspense(<AboutPage />), errorElement: <NotFoundPage /> },
        { path: "/contact", element: withSuspense(<ContactPage />), errorElement: <NotFoundPage /> },
        { path: "/select-tenant", element: withSuspense(<TenantsPage />), errorElement: <NotFoundPage /> },
        { path: "/subjects", element: withSuspense(<SubjectsPage />), errorElement: <NotFoundPage /> },
        { path: "/questions/subject/:subjectId", element: withSuspense(<QuestionsPage />), errorElement: <NotFoundPage /> },

        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ],
  {
    basename: "/quiz-universe" , 
  }
);
