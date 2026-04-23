// src/app/providers/RequireAuth.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import NotFoundPage from "@pages/not-found/NotFoundPage";
import Header from "@/widgets/Header";
import Footer from "@/widgets/Footer";
import ScrollToTop from "@/widgets/ScrollToTop";

export const RequireAuth = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    sessionStorage.setItem("auth_redirect", "true");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export const RequireAdmin = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="flex flex-col min-h-screen">
        <ScrollToTop />
        <Header />
        <main className="flex-grow">
          <NotFoundPage />
        </main>
        <Footer />
      </div>
    );
  }

  return <Outlet />;
};

export const RequireGuest = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};