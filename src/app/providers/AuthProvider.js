import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    // ví dụ: khôi phục phiên từ storage
    useEffect(() => {
        const token = localStorage.getItem("auth_token") ?? sessionStorage.getItem("auth_token");
        const cachedUser = localStorage.getItem("auth_user") ?? sessionStorage.getItem("auth_user");
        if (token && cachedUser) {
            try {
                setUser(JSON.parse(cachedUser));
            }
            catch { }
        }
    }, []);
    const login = async (email, password, opts) => {
        setLoading(true);
        try {
            // TODO: đổi URL cho đúng backend của bạn (Spring Boot)
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            if (!res.ok)
                throw new Error("Login failed");
            const data = await res.json(); // kỳ vọng { token: string, user: User }
            const storage = opts?.remember ? localStorage : sessionStorage;
            if (data.token)
                storage.setItem("auth_token", data.token);
            if (data.user)
                storage.setItem("auth_user", JSON.stringify(data.user));
            setUser(data.user ?? null);
        }
        finally {
            setLoading(false);
        }
    };
    const logout = async () => {
        // tuỳ backend: có thể gọi /logout, ở đây chỉ xoá storage
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
        sessionStorage.removeItem("auth_token");
        sessionStorage.removeItem("auth_user");
        setUser(null);
    };
    const register = async ({ name, email, password }) => {
        setLoading(true);
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });
            if (!res.ok)
                throw new Error("Register failed");
            // tuỳ ý: auto-login sau khi đăng kí
            // const data = await res.json();
            // setUser(data.user ?? null);
        }
        finally {
            setLoading(false);
        }
    };
    const requestPasswordReset = async (email) => {
        const res = await fetch("/api/auth/password/request-reset", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });
        if (!res.ok)
            throw new Error("Request password reset failed");
    };
    const resetPassword = async (token, newPassword) => {
        const res = await fetch("/api/auth/password/reset", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, newPassword }),
        });
        if (!res.ok)
            throw new Error("Reset password failed");
    };
    const value = useMemo(() => ({ user, loading, login, logout, register, requestPasswordReset, resetPassword }), [user, loading]);
    return _jsx(AuthContext.Provider, { value: value, children: children });
};
/** Hook dùng trong các page */
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx)
        throw new Error("useAuth must be used within <AuthProvider>");
    return ctx;
}
