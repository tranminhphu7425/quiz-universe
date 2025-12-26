import React, { useState } from "react";
import { createBrowserRouter, createHashRouter, Outlet, Navigate } from "react-router-dom";
import { Suspense } from "react";




import NotFoundPage from "@pages/not-found/NotFoundPage"; // bạn tạo sẵn file này
import { Layout } from "@/layouts/Layout"; // Tạo một layout component mới
import { LayoutNoFooter } from "@/layouts/LayoutNoFooter";
import { useAuth } from "@/app/providers/AuthProvider";
import { AdminLayout } from "@/layouts/AdminLayout";




// Lazy
const HomePage = React.lazy(() => import("@pages/home/HomePage"));
const AboutPage = React.lazy(() => import("@pages/about/AboutPage"));
const ContactPage = React.lazy(() => import("@pages/contact/ContactPage"));
const LoginPage = React.lazy(() => import("@pages/auth/LoginPage"));
const RegisterPage = React.lazy(() => import("@pages/auth/RegisterPage"));
const SetupProfilePage = React.lazy(() => import("@pages/auth/SetupProfilePage"));
const ForgotPasswordPage = React.lazy(() => import("@pages/auth/ForgotPasswordPage"));
const TermsPage = React.lazy(() => import("@pages/legal/TermsPage"));
const SecurityPage = React.lazy(() => import("@pages/security/SecurityPage"));
const CookiesPage = React.lazy(() => import("@pages/cookies/CookiesPage"));
const QuickGuidePage = React.lazy(() => import("@pages/documents/QuickGuidePage"));
const DashboardPage = React.lazy(() => import("@/pages/auth/DashboardPage"));
const ProfilePage = React.lazy(() => import("@/pages/auth/ProfilePage"));
const SubjectsPage = React.lazy(() => import("@pages/subjects/SubjectsPage"));
const SubjectDetailPage = React.lazy(() => import("@pages/subjects/SubjectDetailPage"));
const CreateSubject = React.lazy(() => import("@/pages/subjects/CreateSubjectPage"));
const QuestionBanksPage = React.lazy(() => import("@pages/question-banks/QuestionBanksPage"));
const CreateQuestionBankPage = React.lazy(() => import("@pages/question-banks/CreateQuestionBankPage"));
const QuestionsPage = React.lazy(() => import("@pages/questions/QuestionsPage"));
const EditQuestionPage = React.lazy(() => import("@pages/questions/EditQuestionPage"));
const CreateExamPage = React.lazy(() => import("@pages/exams/CreateExamPage"));
const TakeExamPage = React.lazy(() => import("@pages/exams/TakeExamPage"));
const ReviewExamPage = React.lazy(() => import("@pages/exams/ReviewExamPage"));
const AdminDashboardPage = React.lazy(() => import("@/pages/admin/AdminDashboardPage"));
const SettingsPage = React.lazy(() => import("@/pages/auth/SettingsPage"));
const RecruitmentPage = React.lazy(() => import("@/pages/recruit/RecruitmentPage"));
const DocumentationPage = React.lazy(() => import("@/pages/documents/DocumentationPage"));
const UserGuidePage = React.lazy(() => import("@/pages/documents/UserGuidePage"));
const ExplorePage = React.lazy(() => import("@/pages/resources/ExplorePage"));
const ForumPage = React.lazy(() => import("@/pages/forum/ForumPage"));
const FaqPage = React.lazy(() => import("@/pages/faq/FaqPage"));
const FeedbackPage = React.lazy(() => import("@/pages/feedback/FeedbackPage"));
const AdminUsersPage = React.lazy(() => import("@/pages/admin/AdminUsersPage"));





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

export function RequireAuth() {
  const { user, loading } = useAuth(); // lấy user từ AuthContext

  if (!user && !loading) {
    // Nếu chưa login thì redirect về trang 404
    sessionStorage.setItem("auth_redirect", "true");
    return (
      <>

        <Navigate to="/login" replace />
      </>
    );
    // hoặc: return <Navigate to="/login" replace />; nếu muốn đưa về login
  }

  return <Outlet />;
}

export const router = createHashRouter(
  [
    {

      element: <Layout />,
      children: [
        // Public
        { path: "/login", element: withSuspense(<LoginPage />) },
        { path: "/register", element: withSuspense(<RegisterPage />) },
        { path: "/forgot-password", element: withSuspense(<ForgotPasswordPage />) },
        { path: "/terms", element: withSuspense(<TermsPage />) },
        { path: "/security", element: withSuspense(<SecurityPage />) },
        { path: "/cookies", element: withSuspense(<CookiesPage />) },
        { path: "/quickguide", element: withSuspense(<QuickGuidePage />) },
        { path: "/documents", element: withSuspense(<DocumentationPage />) },
        { path: "/userguide", element: withSuspense(<UserGuidePage />) },
        { path: "/", element: withSuspense(<HomePage />), errorElement: <NotFoundPage /> },
        { path: "/about", element: withSuspense(<AboutPage />), errorElement: <NotFoundPage /> },
        { path: "/contact", element: withSuspense(<ContactPage />), errorElement: <NotFoundPage /> },
        { path: "/forum", element: withSuspense(<ForumPage />), errorElement: <NotFoundPage /> },
        { path: "/faq", element: withSuspense(<FaqPage />), errorElement: <NotFoundPage /> },
        { path: "/recruits", element: withSuspense(<RecruitmentPage />), errorElement: <NotFoundPage /> },
        { path: "/feedback", element: withSuspense(<FeedbackPage />), errorElement: <NotFoundPage /> },



        //auth

        { path: "/question-banks", element: withSuspense(<QuestionBanksPage />), errorElement: <NotFoundPage /> },
        { path: "/question-bank/create", element: withSuspense(<CreateQuestionBankPage />), errorElement: <NotFoundPage /> },
        // { path: "/questions/question-bank/:bankId", element: withSuspense(<QuestionsPage />), errorElement: <NotFoundPage /> },
        // { path: "/questions/question-bank/:bankId/edit", element: withSuspense(<EditQuestionPage />), errorElement: <NotFoundPage /> },




        { path: "/subjects", element: withSuspense(<SubjectsPage />), errorElement: <NotFoundPage /> },
        { path: "/subject/:subjectId", element: withSuspense(<SubjectDetailPage />), errorElement: <NotFoundPage /> },
        { path: "/subject/create", element: withSuspense(<CreateSubject />), errorElement: <NotFoundPage /> },
        { path: "/questions/subject/:subjectId", element: withSuspense(<QuestionsPage />), errorElement: <NotFoundPage /> },
        { path: "/questions/subject/:subjectId/edit", element: withSuspense(<EditQuestionPage />), errorElement: <NotFoundPage /> },
        
        // { path: "/admin", element: withSuspense(<AdminDashboardPage />), errorElement: <NotFoundPage /> },
        
        { path: "/resources", element: withSuspense(<ExplorePage />), errorElement: <NotFoundPage /> },

        // Protected routes
        {
          element: <RequireAuth />,
          children: [
            {
              path: "/admin",
              element: <AdminLayout />,
              children: [
                { index: true, element: withSuspense(<AdminDashboardPage />) },
                { path: "users", element: withSuspense(<AdminUsersPage />) }, // sau này bạn có thể thay = UserManagementPage
                { path: "settings", element: withSuspense(<AdminDashboardPage />) },
              ],
            },

            { path: "/dashboard", element: withSuspense(<DashboardPage />), errorElement: <NotFoundPage /> },
            { path: "/settings", element: withSuspense(<SettingsPage />), errorElement: <NotFoundPage /> },
            { path: "/setup", element: withSuspense(<SetupProfilePage />), errorElement: <NotFoundPage /> },
            { path: "/profile", element: withSuspense(<ProfilePage />), errorElement: <NotFoundPage /> },


          ],
        },


        // Fallback
        { path: "*", element: <NotFoundPage /> },
      ],
    },
    {
      element: <LayoutNoFooter />,
      children: [ 
      {
        path: "/questions/question-bank/:bankId",
        element: withSuspense(<QuestionsPage />),
      },
      {
        path: "/questions/question-bank/:bankId/edit",
        element: withSuspense(<EditQuestionPage />),
      },  
      
    ],
    },
  ],
  {
    // basename: "/quiz-universe/",
  }
);
