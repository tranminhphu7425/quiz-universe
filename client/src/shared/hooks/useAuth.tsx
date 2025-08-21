// Auto-generated
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

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

// ===== Context =====
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ===== Provider =====
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Load từ localStorage (persist)
  useEffect(() => {
    const raw = localStorage.getItem("quiz-auth");
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        // ignore lỗi parse
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

// ===== Hook =====
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within <AuthProvider>");
  }
  return ctx;
}
