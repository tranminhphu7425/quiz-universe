// Auto-generated
import axios from "axios";

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // Nếu cần cookie/authorization tới backend:
  // withCredentials: true,
});

// (Tuỳ chọn) interceptor log lỗi
http.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("API error:", err?.response || err);
    return Promise.reject(err);
  }
);
