import { useState } from "react";
import { motion } from "framer-motion";
import { Cookie, ShieldCheck, Info, FileText, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import Floating from "@/shared/ui/Floatting";

/**
 * CookiesPage – Trang Chính sách Cookie cho QuizUniverse
 * - Giải thích cookies là gì, mục đích sử dụng
 * - Các loại cookie: cần thiết, phân tích, chức năng
 * - Tùy chọn bật/tắt (FE mock)
 * - Link tới Privacy/Security
 */

export default function CookiesPage() {
  const [analytics, setAnalytics] = useState(true);
  const [functional, setFunctional] = useState(true);

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 dark:from-yellow-900 dark:via-amber-800 dark:to-orange-900" />

        <div className="relative z-10 mx-auto max-w-5xl px-6 py-16 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 160, damping: 20 }}
          >
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/20 backdrop-blur">
              <Cookie className="h-4 w-4" /> Chính sách Cookie
            </div>
            <h1 className="text-3xl font-black leading-tight md:text-4xl">
              Cách QuizUniverse sử dụng Cookies
            </h1>
            <p className="mt-2 max-w-2xl text-white/90">
              Cookie giúp chúng tôi vận hành website, phân tích mức độ sử dụng và
              cải thiện trải nghiệm người dùng. Bạn có thể tuỳ chỉnh tuỳ chọn của mình.
            </p>
          </motion.div>

          {/* Floating */}
          <Floating distance={10} duration={6} className="absolute top-6 right-10">
            <div className="rounded-full bg-gradient-to-br from-yellow-300 to-orange-300 p-3 shadow-xl rotate-12">
              <Cookie className="h-4 w-4 text-brown-800" />
            </div>
          </Floating>
        </div>
      </section>

      {/* Content */}
      <main className="mx-auto max-w-5xl px-6 py-10">
        {/* Intro */}
        <section className="mb-8 rounded-2xl border border-amber-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-3 inline-flex items-center gap-2 text-base font-bold text-amber-700 dark:text-amber-300">
            <Info className="h-4 w-4" /> Cookie là gì?
          </h2>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            Cookie là các tệp nhỏ được lưu trong trình duyệt của bạn khi truy cập
            QuizUniverse. Chúng giúp lưu phiên đăng nhập, nhớ tuỳ chọn, phân tích
            hoạt động để cải thiện dịch vụ.
          </p>
        </section>

        {/* Types */}
        <section className="mb-8 rounded-2xl border border-amber-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-4 text-base font-bold text-amber-700 dark:text-amber-300">Các loại Cookie</h2>
          <ul className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
            <li className="rounded-xl border border-slate-200 p-3 dark:border-slate-800">
              <div className="font-semibold">1. Cần thiết (Essential)</div>
              <p className="opacity-90">Bắt buộc để vận hành hệ thống: đăng nhập, bảo mật, lưu session. Không thể tắt.</p>
            </li>
            <li className="rounded-xl border border-slate-200 p-3 dark:border-slate-800">
              <div className="font-semibold">2. Phân tích (Analytics)</div>
              <p className="opacity-90">Giúp hiểu cách người dùng tương tác (Google Analytics, thống kê nội bộ).</p>
              <div className="mt-2 flex items-center gap-2 text-xs">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-amber-600"
                    checked={analytics}
                    onChange={() => setAnalytics(v => !v)}
                  />
                  Bật cookie phân tích
                </label>
              </div>
            </li>
            <li className="rounded-xl border border-slate-200 p-3 dark:border-slate-800">
              <div className="font-semibold">3. Chức năng (Functional)</div>
              <p className="opacity-90">Lưu ngôn ngữ, theme, tuỳ chọn giao diện để cá nhân hoá trải nghiệm.</p>
              <div className="mt-2 flex items-center gap-2 text-xs">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-amber-600"
                    checked={functional}
                    onChange={() => setFunctional(v => !v)}
                  />
                  Bật cookie chức năng
                </label>
              </div>
            </li>
          </ul>
        </section>

        {/* Manage */}
        <section className="mb-8 rounded-2xl border border-amber-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-3 inline-flex items-center gap-2 text-base font-bold text-amber-700 dark:text-amber-300">
            <ShieldCheck className="h-4 w-4" /> Quản lý cookie
          </h2>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            Bạn có thể xoá cookie bất kỳ lúc nào trong cài đặt trình duyệt (Chrome,
            Firefox, Edge...). Việc xoá có thể ảnh hưởng tới đăng nhập và trải nghiệm.
          </p>
          <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Trash2 className="h-3 w-3" /> Vào <em>Cài đặt trình duyệt → Quyền riêng tư → Cookie</em> để xoá.
          </div>
        </section>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
          Cập nhật lần cuối: {new Date().toLocaleDateString()} • Phiên bản: 1.0
        </p>
        <div className="mt-4 flex justify-center gap-4">
          <Link to="/security" className="text-sm text-amber-700 underline dark:text-amber-300">
            Trang Bảo mật
          </Link>
          <Link to="/" className="text-sm text-amber-700 underline dark:text-amber-300">
            Trang chủ
          </Link>
        </div>
      </main>
    </div>
  );
}
