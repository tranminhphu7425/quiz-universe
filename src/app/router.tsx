// src/app/router.tsx
import React, { Suspense } from "react";
import { createHashRouter, Navigate, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

// Layouts
import { Layout } from "@/layouts/Layout";
import { LayoutNoFooter } from "@/layouts/LayoutNoFooter";
import { AdminLayout } from "@/layouts/AdminLayout";
import { CTULayout } from "@/layouts/CTULayout";

// Components
import NotFoundPage from "@pages/not-found/NotFoundPage";
import { RequireAuth } from "@app/providers/RequireAuth";

// ============================================================================
// LAZY LOADING - PUBLIC PAGES
// ============================================================================
const HomePage = React.lazy(() => import("@pages/home/HomePage"));
const AboutPage = React.lazy(() => import("@pages/about/AboutPage"));
const ContactPage = React.lazy(() => import("@pages/contact/ContactPage"));
const ForumPage = React.lazy(() => import("@pages/forum/ForumPage"));
const FaqPage = React.lazy(() => import("@pages/faq/FaqPage"));
const FeedbackPage = React.lazy(() => import("@pages/feedback/FeedbackPage"));
const RecruitmentPage = React.lazy(() => import("@pages/recruit/RecruitmentPage"));
const ExplorePage = React.lazy(() => import("@pages/resources/ExplorePage"));

// Legal & Docs
const TermsPage = React.lazy(() => import("@pages/legal/TermsPage"));
const SecurityPage = React.lazy(() => import("@pages/security/SecurityPage"));
const CookiesPage = React.lazy(() => import("@pages/cookies/CookiesPage"));
const QuickGuidePage = React.lazy(() => import("@pages/documents/QuickGuidePage"));
const DocumentationPage = React.lazy(() => import("@pages/documents/DocumentationPage"));
const UserGuidePage = React.lazy(() => import("@pages/documents/UserGuidePage"));

// ============================================================================
// LAZY LOADING - AUTH PAGES
// ============================================================================
const LoginPage = React.lazy(() => import("@pages/auth/LoginPage"));
const RegisterPage = React.lazy(() => import("@pages/auth/RegisterPage"));
const ForgotPasswordPage = React.lazy(() => import("@pages/auth/ForgotPasswordPage"));
const SetupProfilePage = React.lazy(() => import("@pages/auth/SetupProfilePage"));
const DashboardPage = React.lazy(() => import("@pages/auth/DashboardPage"));
const ProfilePage = React.lazy(() => import("@pages/auth/ProfilePage"));
const SettingsPage = React.lazy(() => import("@pages/auth/SettingsPage"));

// ============================================================================
// LAZY LOADING - SUBJECTS & QUESTIONS
// ============================================================================
const SubjectsPage = React.lazy(() => import("@pages/subjects/SubjectsPage"));
const SubjectDetailPage = React.lazy(() => import("@pages/subjects/SubjectDetailPage"));
const CreateSubjectPage = React.lazy(() => import("@pages/subjects/CreateSubjectPage"));

const QuestionBanksPage = React.lazy(() => import("@pages/question-banks/QuestionBanksPage"));
const CreateQuestionBankPage = React.lazy(() => import("@pages/question-banks/CreateQuestionBankPage"));

const QuestionsPage = React.lazy(() => import("@pages/questions/QuestionsPage"));
const EditQuestionPage = React.lazy(() => import("@pages/questions/EditQuestionPage"));

// ============================================================================
// LAZY LOADING - EXAMS (TODO: Implement)
// ============================================================================
const CreateExamPage = React.lazy(() => import("@pages/exams/CreateExamPage"));
const TakeExamPage = React.lazy(() => import("@pages/exams/TakeExamPage"));
const ReviewExamPage = React.lazy(() => import("@pages/exams/ReviewExamPage"));

// ============================================================================
// LAZY LOADING - ADMIN PAGES
// ============================================================================
const AdminDashboardPage = React.lazy(() => import("@pages/admin/AdminDashboardPage"));
const AdminUsersPage = React.lazy(() => import("@pages/admin/AdminUsersPage"));

// ============================================================================
// LAZY LOADING - CTU PAGES
// ============================================================================
const CTUHomePage = React.lazy(() => import("@pages/ctu/CTUHomePage"));
const CTUCalendarPage = React.lazy(() => import("@pages/ctu/CTUCalendarPage"));
const CTUCalculatorPage = React.lazy(() => import("@pages/ctu/CTUCalculatorPage"));

// ============================================================================
// SUSPENSE WRAPPER
// ============================================================================
const LoadingFallback = () => (
  <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-4">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
      className="rounded-full bg-gradient-to-tr from-emerald-400 to-teal-500 p-4 shadow-lg"
    >
      <Loader2 className="h-8 w-8 text-white" />
    </motion.div>
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

const withSuspense = (element: React.ReactElement) => (
  <Suspense fallback={<LoadingFallback />}>{element}</Suspense>
);

// Helper để thêm errorElement mặc định
const withErrorBoundary = (element: React.ReactElement) => ({
  element: withSuspense(element),
  errorElement: <NotFoundPage />,
});

// ============================================================================
// ROUTE CONFIGURATION
// ============================================================================
export const router = createHashRouter([
  // ==========================================================================
  // MAIN LAYOUT (With Header & Footer)
  // ==========================================================================
  {
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      // Public Routes
      { index: true, ...withErrorBoundary(<HomePage />) },
      { path: "about", ...withErrorBoundary(<AboutPage />) },
      { path: "contact", ...withErrorBoundary(<ContactPage />) },
      { path: "forum", ...withErrorBoundary(<ForumPage />) },
      { path: "faq", ...withErrorBoundary(<FaqPage />) },
      { path: "feedback", ...withErrorBoundary(<FeedbackPage />) },
      { path: "recruits", ...withErrorBoundary(<RecruitmentPage />) },
      { path: "resources", ...withErrorBoundary(<ExplorePage />) },

      // Legal & Documentation
      { path: "terms", ...withErrorBoundary(<TermsPage />) },
      { path: "security", ...withErrorBoundary(<SecurityPage />) },
      { path: "cookies", ...withErrorBoundary(<CookiesPage />) },
      { path: "quickguide", ...withErrorBoundary(<QuickGuidePage />) },
      { path: "documents", ...withErrorBoundary(<DocumentationPage />) },
      { path: "userguide", ...withErrorBoundary(<UserGuidePage />) },

      // Auth Routes (Public)
      { path: "login", ...withErrorBoundary(<LoginPage />) },
      { path: "register", ...withErrorBoundary(<RegisterPage />) },
      { path: "forgot-password", ...withErrorBoundary(<ForgotPasswordPage />) },

      // Subjects Routes
      { path: "subjects", ...withErrorBoundary(<SubjectsPage />) },
      { path: "subject/:subjectId", ...withErrorBoundary(<SubjectDetailPage />) },
      { path: "subject/create", ...withErrorBoundary(<CreateSubjectPage />) },
      { path: "questions/subject/:subjectId", ...withErrorBoundary(<QuestionsPage />) },
      { path: "questions/subject/:subjectId/edit", ...withErrorBoundary(<EditQuestionPage />) },

      // Question Banks Routes
      { path: "question-banks", ...withErrorBoundary(<QuestionBanksPage />) },
      { path: "question-bank/create", ...withErrorBoundary(<CreateQuestionBankPage />) },

      // Protected Routes (Require Authentication)
      {
        element: <RequireAuth />,
        children: [
          { path: "dashboard", ...withErrorBoundary(<DashboardPage />) },
          { path: "profile", ...withErrorBoundary(<ProfilePage />) },
          { path: "settings", ...withErrorBoundary(<SettingsPage />) },
          { path: "setup", ...withErrorBoundary(<SetupProfilePage />) },
        ],
      },

      // 404 Fallback
      { path: "*", element: <NotFoundPage /> },
    ],
  },

  // ==========================================================================
  // NO FOOTER LAYOUT (For full-page content)
  // ==========================================================================
  {
    element: <LayoutNoFooter />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "questions/question-bank/:bankId", ...withErrorBoundary(<QuestionsPage />) },
      { path: "questions/question-bank/:bankId/edit", ...withErrorBoundary(<EditQuestionPage />) },
    ],
  },

  // ==========================================================================
  // ADMIN LAYOUT (Requires Admin Role)
  // ==========================================================================
  {
    path: "admin",
    element: <AdminLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, ...withErrorBoundary(<AdminDashboardPage />) },
      { path: "users", ...withErrorBoundary(<AdminUsersPage />) },
      { path: "settings", ...withErrorBoundary(<AdminDashboardPage />) },
    ],
  },

  // ==========================================================================
  // CTU LAYOUT (CTU Student Tools)
  // ==========================================================================
  {
    element: <CTULayout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "ctu", ...withErrorBoundary(<CTUHomePage />) },
      { path: "ctu/calendar", ...withErrorBoundary(<CTUCalendarPage />) },
      { path: "ctu/calculator", ...withErrorBoundary(<CTUCalculatorPage />) }, // Fixed typo
    ],
  },
]);