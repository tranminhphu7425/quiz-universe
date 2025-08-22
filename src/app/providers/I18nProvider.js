"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.I18nProvider = I18nProvider;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var i18next_1 = require("i18next");
var react_i18next_1 = require("react-i18next");
// ===== Ngôn ngữ mặc định (có thể tách ra folder locales) =====
var resources = {
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
i18next_1.default
    .use(react_i18next_1.initReactI18next)
    .init({
    resources: resources,
    lng: "vi", // ngôn ngữ mặc định
    fallbackLng: "en",
    interpolation: { escapeValue: false },
});
function I18nProvider(_a) {
    var children = _a.children;
    // Option: load lang từ localStorage
    (0, react_1.useEffect)(function () {
        var stored = localStorage.getItem("quiz-lang");
        if (stored)
            i18next_1.default.changeLanguage(stored);
    }, []);
    return (0, jsx_runtime_1.jsx)(react_i18next_1.I18nextProvider, { i18n: i18next_1.default, children: children });
}
