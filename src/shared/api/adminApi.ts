// src/shared/api/adminApi.ts
export async function getAdminStats() {
  const res = await fetch("/api/admin/stats");
  if (!res.ok) throw new Error("Không thể tải thống kê");
  return res.json();
}
