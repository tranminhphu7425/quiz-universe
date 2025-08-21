// Auto-generated
// src/app/providers/AuthProvider.tsx
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Role = "SYSTEM_ADMIN" | "SCHOOL_ADMIN" | "TEACHER" | "STUDENT";

export interface User {
  id: string;
  name: string;
  role: Role;
  tenantId: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

// Tạo context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Load user từ localStorage khi app khởi động
  useEffect(() => {
    const raw = localStorage.getItem("quiz-auth");
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        // ignore
      }
    }
  }, []);

  const login = (u: User) => {
    setUser(u);
    localStorage.setItem("quiz-auth", JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("quiz-auth");
  };

  const value: AuthContextType = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook sử dụng context
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within <AuthProvider>");
  }
  return ctx;
}
