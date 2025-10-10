import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { fetchJson, setAuthToken } from "@/shared/api/apiClient";

import { Major, University } from "@/shared/api/major-universityApi";


/** Vai trò & user */
export type Role = "admin" | "user" | "teacher";

export interface User {
  id: string;
  name: string;
  username: string;
  role: Role;
  phone: string;
  email?: string;
  university?: University;
  major?: Major;
  intakeYear?: number;
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

/** Kiểu response backend kỳ vọng */
type LoginResponse = { token: string; user: User };
type RegisterResponse = { token: string; id: string; name: string; email: string };
type VoidResponse = { success: true } | undefined;

function pickStorage(remember?: boolean) {
  return remember ? localStorage : sessionStorage;
}

function readFromStorage() {
  const token = localStorage.getItem("auth_token") ?? sessionStorage.getItem("auth_token");
  const cachedUser =
    localStorage.getItem("auth_user") ?? sessionStorage.getItem("auth_user");
  return { token, cachedUser };
}

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  // Khôi phục phiên từ storage khi load lần đầu
  useEffect(() => {
    setLoading(true);
    const { token, cachedUser } = readFromStorage();
    if (token) setAuthToken(token);
    if (cachedUser) {
      try {
        setUser(JSON.parse(cachedUser));
      } catch {
        // nếu parse lỗi thì clear
        localStorage.removeItem("auth_user");
        sessionStorage.removeItem("auth_user");
      }
    }
      setLoading(false);
      setInitialized(true);
  }, []);

  const login: AuthContextType["login"] = async (email, password, opts) => {
    setLoading(true);
    try {
      // Mặc định API_BASE lấy từ VITE_API_URL, endpoint Spring Boot:
      // POST /api/auth/login -> { token, user }
      const data = await fetchJson<LoginResponse>("/api/auth/login", {
        method: "POST",
        body: { email, password },
      });

      const storage = pickStorage(opts?.remember);
      if (data.token) {
        storage.setItem("auth_token", data.token);
        console.log("data.token", data.token);
        setAuthToken(data.token);
      }
      if (data.user) storage.setItem("auth_user", JSON.stringify(data.user));
      console.log("Cap nhat tu back: ", data.user);
      
      setUser(data.user ?? null);
    } finally {
      setLoading(false);
    }
  };

  const logout: AuthContextType["logout"] = async () => {
    // Optional: gọi /api/auth/logout nếu backend có
    try {
      await fetchJson<VoidResponse>("/api/auth/logout", { method: "POST" }).catch(() => { });
    } catch { }
    // Xoá storage cả 2 nơi để chắc chắn
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    sessionStorage.removeItem("auth_token");
    sessionStorage.removeItem("auth_user");
    setAuthToken(null);
    setUser(null);
  };

  const register: AuthContextType["register"] = async ({ name, email, password }) => {
    setLoading(true);
    try {
      // POST /api/auth/register

      const data = await fetchJson<RegisterResponse>("/api/auth/register", {
        method: "POST",
        body: { name, email, password },
      });
      // Tuỳ ý: không auto-login để phù hợp nhiều flow (email verify, v.v.)

      if (data.token) {
        localStorage.setItem("auth_token", data.token);
        console.log("data.token", data.token);
        setAuthToken(data.token);
        setUser({
          id: data.id,
          name: data.name,
          username: "",
          role:  "user",   // mặc định user
          phone: "",
          email: data.email
        });

      }

    } finally {
      setLoading(false);
    }
  };

  const requestPasswordReset: AuthContextType["requestPasswordReset"] = async (email) => {
    // POST /api/auth/password/request-reset
    await fetchJson<VoidResponse>("/api/auth/password/request-reset", {
      method: "POST",
      body: { email },
    });
  };

  const resetPassword: AuthContextType["resetPassword"] = async (token, newPassword) => {
    // POST /api/auth/password/reset
    await fetchJson<VoidResponse>("/api/auth/password/reset", {
      method: "POST",
      body: { token, newPassword },
    });
  };

  const value =  useMemo<AuthContextType>(
    () => ({ user, loading, login, logout, register, requestPasswordReset, resetPassword }),
    [user, loading] 
  );
  if (!initialized) {
    return <div></div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/** Hook dùng trong các page */
export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}


