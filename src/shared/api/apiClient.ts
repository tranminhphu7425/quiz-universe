// Lightweight fetch wrapper dùng cho toàn app
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

const API_BASE =
  (import.meta as any)?.env?.VITE_API_URL?.replace(/\/+$/, "") ||
  "http://localhost:8080";

let authToken: string | null = null;

// Cho phép AuthProvider set/clear token cho apiClient
export function setAuthToken(token: string | null) {
  authToken = token;
}

export async function fetchJson<T>(
  path: string,
  options: { method?: HttpMethod; body?: any; headers?: Record<string, string> } = {}
): Promise<T> {
  const url = path.startsWith("http") ? path : `${API_BASE}${path}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  if (authToken) headers["Authorization"] = `Bearer ${authToken}`;
  console.log("Token: ", authToken);
  const res = await fetch(url, {
    method: options.method || "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  
  // console.log("Response data:", res.json());
  // cố gắng parse lỗi JSON nếu có
  const isJson = res.headers.get("content-type")?.includes("application/json");
  if (!res.ok) {
    const errBody = isJson ? await res.json().catch(() => ({})) : await res.text();
    const message =
      (typeof errBody === "object" && errBody?.message) ||
      (typeof errBody === "string" && errBody) ||
      `HTTP ${res.status}`;
    throw new Error(message);
  }

  return (isJson ? res.json() : (undefined as unknown)) as T;
}


// ====== (tuỳ chọn) Gọi API thật ======
export async function saveProfile(payload: { university: string; major: string; intakeYear?: number }) {
  // API gợi ý: POST /api/users/me/profile or /api/profile/setup
  console.log(payload);
  
  return await fetchJson<any>("/api/profile/setup", {
    method: "POST",
    body: payload,
  }); // tuỳ backend trả về
}



