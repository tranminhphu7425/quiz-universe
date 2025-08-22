// src/pages/not-found/NotFoundPage.tsx
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-6xl font-bold text-brand mb-4">404</h1>
      <p className="text-muted-foreground mb-6">
        Xin lỗi, trang bạn tìm kiếm không tồn tại hoặc đã bị di chuyển.
      </p>
      <Link
        to="/"
        className="px-4 py-2 rounded-lg bg-brand text-brand-foreground font-medium"
      >
        Về trang chủ
      </Link>
    </div>
  );
}
