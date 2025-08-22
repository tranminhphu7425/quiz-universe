import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import i18n from "i18next";
import { initReactI18next, I18nextProvider } from "react-i18next";
// ===== Ngôn ngữ mặc định (có thể tách ra folder locales) =====
const resources = {
    vi: {
        translation: {
            welcome: "Xin chào {{name}}",
            login: "Đăng nhập",
            logout: "Đăng xuất",
            dashboard: "Bảng điều khiển",
        },
    },
    en: {
        translation: {
            welcome: "Hello {{name}}",
            login: "Login",
            logout: "Logout",
            dashboard: "Dashboard",
        },
    },
};
// ===== Khởi tạo i18n =====
i18n
    .use(initReactI18next)
    .init({
    resources,
    lng: "vi", // ngôn ngữ mặc định
    fallbackLng: "en",
    interpolation: { escapeValue: false },
});
export function I18nProvider({ children }) {
    // Option: load lang từ localStorage
    useEffect(() => {
        const stored = localStorage.getItem("quiz-lang");
        if (stored)
            i18n.changeLanguage(stored);
    }, []);
    return _jsx(I18nextProvider, { i18n: i18n, children: children });
}
