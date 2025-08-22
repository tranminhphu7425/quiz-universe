"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.http = void 0;
// Auto-generated
var axios_1 = require("axios");
exports.http = axios_1.default.create({
    baseURL: import.meta.env.VITE_API_URL,
    // Nếu cần cookie/authorization tới backend:
    // withCredentials: true,
});
// (Tuỳ chọn) interceptor log lỗi
exports.http.interceptors.response.use(function (res) { return res; }, function (err) {
    console.error("API error:", (err === null || err === void 0 ? void 0 : err.response) || err);
    return Promise.reject(err);
});
