// src/app/providers/RequireAuth.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

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

  if (loading) return <div>Loading...</div>;

  if (!user || user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};