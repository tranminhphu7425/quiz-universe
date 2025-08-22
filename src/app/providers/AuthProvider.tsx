import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

/** Vai trò & user */
export type Role = "SYSTEM_ADMIN" | "SCHOOL_ADMIN" | "TEACHER" | "STUDENT";

export interface User {
  id: string;
  name: string;
  role: Role;
  tenantId: string;
  email?: string;
}

/** Kiểu context mà các page sẽ dùng */
export interface AuthContextType {
  user: User | null;
  loading: boolean;

  login: (
    email: string,
    password: string,
    opts?: { remember?: boolean }
  ) => Promise<void>;

  logout: () => Promise<void>;

  register: (input: { name: string; email: string; password: string }) => Promise<void>;

  requestPasswordReset: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  // ví dụ: khôi phục phiên từ storage
  useEffect(() => {
    const token = localStorage.getItem("auth_token") ?? sessionStorage.getItem("auth_token");
    const cachedUser = localStorage.getItem("auth_user") ?? sessionStorage.getItem("auth_user");
    if (token && cachedUser) {
      try {
        setUser(JSON.parse(cachedUser));
      } catch {}
    }
  }, []);

  const login: AuthContextType["login"] = async (email, password, opts) => {
    setLoading(true);
    try {
      // TODO: đổi URL cho đúng backend của bạn (Spring Boot)
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error("Login failed");
      const data = await res.json(); // kỳ vọng { token: string, user: User }
      const storage = opts?.remember ? localStorage : sessionStorage;
      if (data.token) storage.setItem("auth_token", data.token);
      if (data.user) storage.setItem("auth_user", JSON.stringify(data.user));
      setUser(data.user ?? null);
    } finally {
      setLoading(false);
    }
  };

  const logout: AuthContextType["logout"] = async () => {
    // tuỳ backend: có thể gọi /logout, ở đây chỉ xoá storage
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    sessionStorage.removeItem("auth_token");
    sessionStorage.removeItem("auth_user");
    setUser(null);
  };

  const register: AuthContextType["register"] = async ({ name, email, password }) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      if (!res.ok) throw new Error("Register failed");
      // tuỳ ý: auto-login sau khi đăng kí
      // const data = await res.json();
      // setUser(data.user ?? null);
    } finally {
      setLoading(false);
    }
  };

  const requestPasswordReset: AuthContextType["requestPasswordReset"] = async (email) => {
    const res = await fetch("/api/auth/password/request-reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (!res.ok) throw new Error("Request password reset failed");
  };

  const resetPassword: AuthContextType["resetPassword"] = async (token, newPassword) => {
    const res = await fetch("/api/auth/password/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword }),
    });
    if (!res.ok) throw new Error("Reset password failed");
  };

  const value = useMemo<AuthContextType>(
    () => ({ user, loading, login, logout, register, requestPasswordReset, resetPassword }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/** Hook dùng trong các page */
export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
