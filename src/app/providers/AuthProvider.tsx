// src/app/providers/AuthProvider.tsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { apiService, publicApiService } from "@/shared/api/api";
import { User } from "@/shared/types/user";
import { ChangePasswordRequest } from "@/shared/types/authUser";

/** Keys for persistence in storage */
const STORAGE_KEYS = {
  TOKEN: "auth_token",
  USER: "auth_user",
};

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, opts?: { remember?: boolean }) => Promise<void>;
  logout: () => Promise<void>;
  register: (input: { name: string; email: string; password: string }) => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  updateUser: (user: User) => void;
  changePassword: (request: ChangePasswordRequest) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/** API response types */
type LoginResponse = { token: string; user: User };
type RegisterResponse = { token: string; id: string; name: string; email: string };

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  /** Helper to get current active storage based on where the token is stored */
  const getActiveStorage = () => {
    return localStorage.getItem(STORAGE_KEYS.TOKEN) ? localStorage : sessionStorage;
  };

  /** Initialization: Check storage for existing session */
  useEffect(() => {
    const initAuth = () => {
      try {
        const token = localStorage.getItem(STORAGE_KEYS.TOKEN) || sessionStorage.getItem(STORAGE_KEYS.TOKEN);
        const cachedUser = localStorage.getItem(STORAGE_KEYS.USER) || sessionStorage.getItem(STORAGE_KEYS.USER);

        if (token && cachedUser) {
          setUser(JSON.parse(cachedUser));
        }
      } catch (error) {
        console.error("Auth initialization failed:", error);
        clearAuthData();
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };

    initAuth();
  }, []);

  /** Clear all auth data from storage and state */
  const clearAuthData = () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    sessionStorage.removeItem(STORAGE_KEYS.TOKEN);
    sessionStorage.removeItem(STORAGE_KEYS.USER);
    setUser(null);
  };

  const login: AuthContextType["login"] = async (email, password, opts) => {
    setLoading(true);
    try {
      const data = await publicApiService.post<LoginResponse>("/auth/login", { email, password });
      const storage = opts?.remember ? localStorage : sessionStorage;

      if (data.token && data.user) {
        storage.setItem(STORAGE_KEYS.TOKEN, data.token);
        storage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user));
        setUser(data.user);
      }
    } finally {
      setLoading(false);
    }
  };

  const logout: AuthContextType["logout"] = async () => {
    try {
      // Optional: notify backend about logout
      await apiService.post("/auth/logout").catch(() => {});
    } finally {
      clearAuthData();
    }
  };

  const register: AuthContextType["register"] = async ({ name, email, password }) => {
    setLoading(true);
    try {
      const data = await publicApiService.post<RegisterResponse>("/auth/register", { name, email, password });

      if (data.token) {
        const newUser: User = {
          userId: data.id,
          id: data.id,
          fullName: data.name,
          name: data.name,
          username: "",
          role: "user",
          phone: "",
          email: data.email,
          isActive: true,
          lastLogin: new Date().toISOString(),
          university: null,
          major: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          universityCode: null,
          majorId: null,
          intakeYear: null,
        };
        // Default persistence for new registration
        localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
        setUser(newUser);
      }
    } finally {
      setLoading(false);
    }
  };

  const changePassword: AuthContextType["changePassword"] = async (request) => {
    if (!user) throw new Error("Authentication required");
    await apiService.post("/auth/change-password", request);
  };

  const requestPasswordReset: AuthContextType["requestPasswordReset"] = async (email) => {
    await publicApiService.post("/auth/password/request-reset", { email });
  };

  const resetPassword: AuthContextType["resetPassword"] = async (token, newPassword) => {
    await publicApiService.post("/auth/password/reset", { token, newPassword });
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    getActiveStorage().setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
  };

  const contextValue = useMemo(() => ({
    user,
    loading,
    login,
    logout,
    register,
    requestPasswordReset,
    resetPassword,
    updateUser,
    changePassword,
  }), [user, loading]);

  // Show nothing while initializing session
  if (!initialized) return null;

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

/** Hook to access auth context */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
