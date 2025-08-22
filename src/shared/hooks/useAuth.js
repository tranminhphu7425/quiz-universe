import { jsx as _jsx } from "react/jsx-runtime";
// src/shared/hooks/useAuth.tsx
import { createContext, useContext, useState, useEffect } from "react";
const QUIZ_AUTH_KEY = "quiz-auth";
// ===== Context =====
const AuthContext = createContext(undefined);
// ===== Provider =====
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    // Load từ localStorage (persist)
    useEffect(() => {
        const raw = localStorage.getItem(QUIZ_AUTH_KEY);
        if (raw) {
            try {
                setUser(JSON.parse(raw));
            }
            catch {
                // ignore lỗi parse
            }
        }
    }, []);
    const persist = (u, remember) => {
        if (!u) {
            localStorage.removeItem(QUIZ_AUTH_KEY);
            return;
        }
        if (remember) {
            localStorage.setItem(QUIZ_AUTH_KEY, JSON.stringify(u));
        }
        else {
            // không nhớ: chỉ set state, không lưu localStorage
            localStorage.removeItem(QUIZ_AUTH_KEY);
        }
    };
    const login = async (email, _password, opts) => {
        setLoading(true);
        try {
            // TODO: gọi API thật sự tại đây
            // Demo: mock user theo email
            const mockUser = {
                id: "u1",
                name: email.split("@")[0] || "User",
                role: "STUDENT",
                tenantId: "default",
            };
            setUser(mockUser);
            persist(mockUser, opts?.remember);
        }
        finally {
            setLoading(false);
        }
    };
    const loginWithUser = (u, opts) => {
        setUser(u);
        persist(u, opts?.remember);
    };
    const register = async ({ name, email, password }) => {
        setLoading(true);
        try {
            const mockUser = {
                id: "u2",
                name: name || email.split("@")[0] || "User",
                role: "STUDENT",
                tenantId: "default",
            };
            setUser(mockUser);
            persist(mockUser, false);
        }
        finally {
            setLoading(false);
        }
    };
    const logout = async () => {
        setLoading(true);
        try {
            // TODO: call API logout nếu cần
            setUser(null);
            persist(null);
        }
        finally {
            setLoading(false);
        }
    };
    const requestPasswordReset = async (_email) => {
        // TODO: gọi API gửi email reset
        // giữ nguyên loading=false để UI không bị khoá lâu
        return;
    };
    const resetPassword = async (_token, _newPassword) => {
        // TODO: gọi API đổi mật khẩu
        return;
    };
    const value = {
        user,
        loading,
        login,
        loginWithUser,
        register,
        logout,
        requestPasswordReset,
        resetPassword,
    };
    return _jsx(AuthContext.Provider, { value: value, children: children });
}
// ===== Hook =====
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used within <AuthProvider>");
    }
    return ctx;
}
