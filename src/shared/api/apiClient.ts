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
  options: {
    method?: HttpMethod;
    body?: any;
    headers?: Record<string, string>;
  } = {}
): Promise<T> {
  const url = path.startsWith("http") ? path : `${API_BASE}${path}`;

  const headers: Record<string, string> = {
    ...(options.headers || {}),
  };

  // 👉 Chỉ set Content-Type khi có body
  if (options.body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  // 👉 Gắn JWT token
  const authToken = localStorage.getItem("auth_token");
  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  console.log("➡️ Fetch:", options.method || "GET", url);
  console.log("➡️ Token:", authToken);

  const res = await fetch(url, {
    method: options.method || "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const contentType = res.headers.get("content-type");
  const isJson = contentType?.includes("application/json");

  // ❌ Lỗi HTTP
  if (!res.ok) {
    let errorMessage = `HTTP ${res.status}`;

    try {
      if (isJson) {
        const err = await res.json();
        errorMessage = err?.message || JSON.stringify(err);
      } else {
        errorMessage = await res.text();
      }
    } catch {
      // ignore parse error
    }

    throw new Error(errorMessage);
  }

  // ✅ Không có body (204 No Content)
  if (res.status === 204) {
    return undefined as T;
  }

  return (isJson ? await res.json() : undefined) as T;
}



