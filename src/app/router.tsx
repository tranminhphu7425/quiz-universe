// src/app/router.tsx
import React, { Suspense } from "react";
import { createHashRouter } from "react-router-dom";
import { LoadingFallback } from "@/shared/ui/LoadingFallback";

// Layouts
import { Layout } from "@/layouts/Layout";
import { LayoutNoFooter } from "@/layouts/LayoutNoFooter";
import { AdminLayout } from "@/layouts/AdminLayout";
import { CTULayout } from "@/layouts/CTULayout";

// Components
import NotFoundPage from "@pages/not-found/NotFoundPage";
import { RequireAuth, RequireAdmin, RequireGuest } from "@app/providers/RequireAuth";

// ============================================================================
// LAZY LOADING - PUBLIC PAGES
// ============================================================================
const HomePage = React.lazy(() => import("@pages/home/HomePage"));
const AboutPage = React.lazy(() => import("@pages/about/AboutPage"));
const ContactPage = React.lazy(() => import("@pages/contact/ContactPage"));
const ForumPage = React.lazy(() => import("@pages/forum/ForumPage"));
const CreateThreadPage = React.lazy(() => import("@pages/forum/CreateThreadPage"));
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
const ApiReferencePage = React.lazy(() => import("@pages/documents/ApiReferencePage"));

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
const EditSubjectPage = React.lazy(() => import("@pages/subjects/EditSubjectPage"));

const QuestionBanksPage = React.lazy(() => import("@pages/question-banks/QuestionBanksPage"));
const CreateQuestionBankPage = React.lazy(() => import("@pages/question-banks/CreateQuestionBankPage"));

const QuestionsPage = React.lazy(() => import("@pages/questions/QuestionsPage"));
const QuestionDocumentPage = React.lazy(() => import("@pages/questions/QuestionDocumentPage"));
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
const AdminSubjectsPage = React.lazy(() => import("@pages/admin/AdminSubjectsPage"));

// ============================================================================
// LAZY LOADING - CTU PAGES
// ============================================================================
const CTUHomePage = React.lazy(() => import("@pages/ctu/CTUHomePage"));
const CTUCalendarPage = React.lazy(() => import("@pages/ctu/CTUCalendarPage"));
const CTUCalculatorPage = React.lazy(() => import("@pages/ctu/CTUCalculatorPage"));
const CTURoadmapPlannerPage = React.lazy(() => import("@pages/ctu/CTURoadmapPlannerPage"));
// ============================================================================
// SUSPENSE WRAPPER
// ============================================================================

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

      // Auth Routes (Guest Only)
      {
        element: <RequireGuest />,
        children: [
          { path: "login", ...withErrorBoundary(<LoginPage />) },
          { path: "register", ...withErrorBoundary(<RegisterPage />) },
          { path: "forgot-password", ...withErrorBoundary(<ForgotPasswordPage />) },
        ],
      },

      // Subjects Routes (Public View)
      { path: "subjects", ...withErrorBoundary(<SubjectsPage />) },
      { path: "subjects/:subjectId", ...withErrorBoundary(<SubjectDetailPage />) },
      { path: "questions/subject/:subjectId", ...withErrorBoundary(<QuestionsPage />) },

      // Question Banks Routes (Public View)
      { path: "question-banks", ...withErrorBoundary(<QuestionBanksPage />) },

      // Protected Routes (Require Authentication)
      {
        element: <RequireAuth />,
        children: [
          // User Dashboard & Profile
          { path: "dashboard", ...withErrorBoundary(<DashboardPage />) },
          { path: "profile", ...withErrorBoundary(<ProfilePage />) },
          { path: "settings", ...withErrorBoundary(<SettingsPage />) },
          { path: "setup", ...withErrorBoundary(<SetupProfilePage />) },

          // Create & Edit Subjects/Questions
          { path: "subjects/create", ...withErrorBoundary(<CreateSubjectPage />) },
          { path: "subjects/:subjectId/edit", ...withErrorBoundary(<EditSubjectPage />) },
          { path: "questions/subject/:subjectId/edit", ...withErrorBoundary(<EditQuestionPage />) },
          
          // Create & Edit Question Banks
          { path: "question-bank/create", ...withErrorBoundary(<CreateQuestionBankPage />) },

          // Forum
          { path: "forum/create", ...withErrorBoundary(<CreateThreadPage />) },

          // Exams
          { path: "exams/create", ...withErrorBoundary(<CreateExamPage />) },
          { path: "exams/:examId/take", ...withErrorBoundary(<TakeExamPage />) },
          { path: "exams/:examId/review", ...withErrorBoundary(<ReviewExamPage />) },
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
      { path: "questions/question-bank/:bankId/review", ...withErrorBoundary(<QuestionDocumentPage />) },
      { path: "api-docs", ...withErrorBoundary(<ApiReferencePage />) },
      {
        element: <RequireAuth />,
        children: [
          { path: "questions/question-bank/:bankId/edit", ...withErrorBoundary(<EditQuestionPage />) },
        ],
      },
    ],
  },

  // ==========================================================================
  // ADMIN LAYOUT (Requires Admin Role)
  // ==========================================================================
  {
    path: "admin",
    element: <RequireAdmin />,
    errorElement: <NotFoundPage />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, ...withErrorBoundary(<AdminDashboardPage />) },
          { path: "users", ...withErrorBoundary(<AdminUsersPage />) },
          { path: "subjects", ...withErrorBoundary(<AdminSubjectsPage />) },
          { path: "settings", ...withErrorBoundary(<AdminDashboardPage />) },
        ],
      },
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
      { path: "ctu/roadmap-planner", ...withErrorBoundary(<CTURoadmapPlannerPage />) },
    ],
  },
]);