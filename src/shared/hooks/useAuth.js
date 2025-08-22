"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthProvider = AuthProvider;
exports.useAuth = useAuth;
var jsx_runtime_1 = require("react/jsx-runtime");
// Auto-generated
var react_1 = require("react");
// ===== Context =====
var AuthContext = (0, react_1.createContext)(undefined);
// ===== Provider =====
function AuthProvider(_a) {
    var children = _a.children;
    var _b = (0, react_1.useState)(null), user = _b[0], setUser = _b[1];
    // Load từ localStorage (persist)
    (0, react_1.useEffect)(function () {
        var raw = localStorage.getItem("quiz-auth");
        if (raw) {
            try {
                setUser(JSON.parse(raw));
            }
            catch (_a) {
                // ignore lỗi parse
            }
        }
    }, []);
    var login = function (u) {
        setUser(u);
        localStorage.setItem("quiz-auth", JSON.stringify(u));
    };
    var logout = function () {
        setUser(null);
        localStorage.removeItem("quiz-auth");
    };
    var value = { user: user, login: login, logout: logout };
    return (0, jsx_runtime_1.jsx)(AuthContext.Provider, { value: value, children: children });
}
// ===== Hook =====
function useAuth() {
    var ctx = (0, react_1.useContext)(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used within <AuthProvider>");
    }
    return ctx;
}
