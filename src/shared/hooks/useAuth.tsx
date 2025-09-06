// src/shared/hooks/useAuth.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Role = "SYSTEM_ADMIN" | "SCHOOL_ADMIN" | "TEACHER" | "STUDENT";

export interface User {
  id: string;
  name: string;
  role: Role;
  tenantId: string;
  // (tuỳ chọn) nếu sau này bạn cần
  // email?: string;
}

const QUIZ_AUTH_KEY = "quiz-auth";

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  /**
   * Đăng nhập bằng email/password (phù hợp LoginPage.tsx)
   * opts.remember: lưu vào localStorage để giữ session sau khi reload
   */
  login: (email: string, password: string, opts?: { remember?: boolean }) => Promise<void>;
  /**
   * Đăng nhập trực tiếp bằng User (nếu bạn đã có user object sẵn)
   */
  loginWithUser: (user: User, opts?: { remember?: boolean }) => void;
  /**
   * Đăng ký (phù hợp RegisterPage.tsx)
   */
  register: (payload: { name: string; email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  /**
   * Quên mật khẩu (phù hợp ForgotPasswordPage.tsx)
   */
  requestPasswordReset: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
}

// ===== Context =====
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ===== Provider =====
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  // Load từ localStorage (persist)
  useEffect(() => {
    const raw = localStorage.getItem(QUIZ_AUTH_KEY);
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        // ignore lỗi parse
      }
    }
  }, []);

  const persist = (u: User | null, remember?: boolean) => {
    if (!u) {
      localStorage.removeItem(QUIZ_AUTH_KEY);
      return;
    }
    if (remember) {
      localStorage.setItem(QUIZ_AUTH_KEY, JSON.stringify(u));
    } else {
      // không nhớ: chỉ set state, không lưu localStorage
      localStorage.removeItem(QUIZ_AUTH_KEY);
    }
  };

  const login: AuthContextType["login"] = async (email, _password, opts) => {
    setLoading(true);
    try {
      // TODO: gọi API thật sự tại đây
      // Demo: mock user theo email
      const mockUser: User = {
        id: "u1",
        name: email.split("@")[0] || "User",
        role: "STUDENT",
        tenantId: "default",
      };
      setUser(mockUser);
      persist(mockUser, opts?.remember);
    } finally {
      setLoading(false);
    }
  };

  const loginWithUser: AuthContextType["loginWithUser"] = (u, opts) => {
    setUser(u);
    persist(u, opts?.remember);
  };

  const register: AuthContextType["register"] = async ({ name, email, password }) => {
  setLoading(true);
  try {
    const mockUser: User = {
      id: "u2",
      name: name || email.split("@")[0] || "User",
      role: "STUDENT",
      tenantId: "default",
    };
    setUser(mockUser);
    persist(mockUser, false);
  } finally {
    setLoading(false);
  }
};


  const logout: AuthContextType["logout"] = async () => {
    setLoading(true);
    try {
      // TODO: call API logout nếu cần
      setUser(null);
      persist(null);
    } finally {
      setLoading(false);
    }
  };

  const requestPasswordReset: AuthContextType["requestPasswordReset"] = async (_email) => {
    // TODO: gọi API gửi email reset
    // giữ nguyên loading=false để UI không bị khoá lâu
    return;
  };

  const resetPassword: AuthContextType["resetPassword"] = async (_token, _newPassword) => {
    // TODO: gọi API đổi mật khẩu
    return;
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    loginWithUser,
    register,
    logout,
    requestPasswordReset,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ===== Hook =====
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within <AuthProvider>");
  }
  return ctx;
}
