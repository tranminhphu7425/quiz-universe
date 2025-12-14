import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  KeyRound,
  Fingerprint,
  Database,
  Bell,
  Bug,
  FileText,
  ClipboardCheck,
  Eye,
  ShieldAlert,
} from "lucide-react";
import Floating from "@/shared/ui/Floatting";
import { Link } from "react-router-dom";

/**
 * SecurityPage – Trang Bảo mật & Quyền riêng tư cho QuizUniverse
 *
 * Phong cách thống nhất với các trang hiện có: hero gradient, tile mờ, blur blobs, thẻ (card) mềm, motion.
 * Nội dung:
 * - Tuyên bố bảo mật ngắn gọn
 * - Các nhóm chính: Bảo mật tài khoản, Dữ liệu & Quyền riêng tư, Chính sách/tuân thủ
 * - FAQ ngắn, thông tin liên hệ báo cáo lỗ hổng
 * - Cài đặt đề xuất (mang tính mô phỏng ở FE)
 */

export default function SecurityPage() {
  const [twoFA, setTwoFA] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [maskEmail, setMaskEmail] = useState(true);

  const tileUrl = useMemo(
    () =>
      encodeURIComponent(`
      <svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160' fill='none'>
        <g stroke='#10b981' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>
          <path d='M28 36h40a8 8 0 018 8v44H36a8 8 0 01-8-8V36z' opacity='0.7'/>
          <path d='M28 52h48' opacity='0.6'/>
          <rect x='96' y='28' width='36' height='28' rx='4' />
          <path d='M100 36h18M100 44h18' opacity='0.6'/>
          <path d='M112 100c10 0 20-6 20-14v-6c-7 2-13 3-20 3s-13-1-20-3v6c0 8 10 14 20 14z' />
        </g>
      </svg>
    `),
    []
  );

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-[120%] md:w-full opacity-10 dark:opacity-[0.15]"
          style={{
            backgroundImage: `url("data:image/svg+xml;utf8,${tileUrl}")`,
            backgroundRepeat: "repeat",
            backgroundSize: "160px 160px",
            maskImage:
              "radial-gradient(1200px 400px at left center, #000 70%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(1200px 400px at left center, #000 70%, transparent 100%)",
          }}
        />

        {/* Blur blobs */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl dark:bg-emerald-400/10" />
        <div className="pointer-events-none absolute -right-16 top-10 h-64 w-64 rounded-full bg-white/10 blur-2xl dark:bg-purple-400/10" />

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-6 px-6 py-14 text-white md:flex-row md:items-center md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 160, damping: 18 }}
          >
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/20 backdrop-blur">
              <ShieldCheck className="h-4 w-4" /> Bảo mật & Quyền riêng tư
            </div>
            <h1 className="text-[2rem] md:text-[2.4rem] font-black leading-tight">
              Giữ an toàn cho tài khoản & dữ liệu của bạn
            </h1>
            <p className="mt-2 max-w-2xl text-white/90">
              QuizUniverse áp dụng xác thực dựa trên token (JWT), phân quyền theo
              vai trò và mã hóa ở tầng truyền tải. Dưới đây là các nguyên tắc, thực
              hành và tùy chọn giúp bạn kiểm soát bảo mật tốt hơn.
            </p>
          </motion.div>

          {/* Floating decor */}
          <Floating distance={12} duration={7} className="pointer-events-none absolute top-6 left-6">
            <div className="rounded-xl bg-gradient-to-br from-amber-300 to-rose-300 px-3 py-1 shadow-lg -rotate-6">
              <span className="text-xs font-black text-rose-700">SECURE</span>
            </div>
          </Floating>
          <Floating distance={10} duration={6} className="pointer-events-none absolute top-6 right-8">
            <div className="rounded-full bg-gradient-to-br from-purple-400 to-indigo-400 p-3 shadow-xl rotate-12">
              <Lock className="h-4 w-4 text-white" />
            </div>
          </Floating>
        </div>
      </section>

      {/* ===== CONTENT ===== */}
      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Column 1: Account security */}
          <section className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="mb-3 inline-flex items-center gap-2 text-base font-bold text-emerald-900 dark:text-emerald-200">
              <KeyRound className="h-4 w-4" /> Bảo mật tài khoản
            </h2>

            <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
              <li className="rounded-xl border border-slate-200 p-3 dark:border-slate-800">
                <div className="flex items-start gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200">
                    <Fingerprint className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold">Xác thực & Phiên đăng nhập</div>
                    <p className="mt-1 text-sm opacity-90">Hệ thống sử dụng JWT ở phần header <code>Authorization: Bearer &lt;token&gt;</code>. Token nên được lưu an toàn (ví dụ: HTTP-only cookie hoặc Storage có kiểm soát) và tự động làm mới theo chính sách hệ thống.</p>
                  </div>
                </div>
              </li>

              <li className="rounded-xl border border-slate-200 p-3 dark:border-slate-800">
                <div className="flex items-start gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200">
                    <Lock className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold">Chính sách mật khẩu</div>
                    <p className="mt-1 text-sm opacity-90">Mật khẩu nên ≥ 8 ký tự, có chữ hoa/thường, số và ký tự đặc biệt. Không tái sử dụng giữa các dịch vụ.
                    </p>
                  </div>
                </div>
              </li>

              <li className="rounded-xl border border-slate-200 p-3 dark:border-slate-800">
                <div className="flex items-start gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200">
                    <Bell className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold">Cảnh báo đăng nhập</div>
                    <div className="mt-2 flex items-center gap-2 text-xs">
                      <label className="inline-flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="h-4 w-4 accent-emerald-700"
                          checked={loginAlerts}
                          onChange={() => setLoginAlerts(v => !v)}
                        />
                        Gửi thông báo khi phát hiện đăng nhập lạ
                      </label>
                    </div>
                  </div>
                </div>
              </li>

              <li className="rounded-xl border border-slate-200 p-3 dark:border-slate-800">
                <div className="flex items-start gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200">
                    <Eye className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold">Bảo vệ thông tin hiển thị</div>
                    <div className="mt-2 flex items-center gap-2 text-xs">
                      <label className="inline-flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="h-4 w-4 accent-emerald-700"
                          checked={maskEmail}
                          onChange={() => setMaskEmail(v => !v)}
                        />
                        Ẩn bớt email/số điện thoại trong giao diện
                      </label>
                    </div>
                  </div>
                </div>
              </li>

              <li className="rounded-xl border border-slate-200 p-3 dark:border-slate-800">
                <div className="flex items-start gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200">
                    <ClipboardCheck className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold">Xác thực 2 lớp (2FA)</div>
                    <p className="mt-1 text-sm opacity-90">(Đang chuẩn bị) Hỗ trợ app OTP/Authenticator hoặc email OTP.</p>
                    <div className="mt-2 flex items-center gap-2 text-xs">
                      <label className="inline-flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="h-4 w-4 accent-emerald-700"
                          checked={twoFA}
                          onChange={() => setTwoFA(v => !v)}
                          disabled
                        />
                        Bật 2FA (sắp ra mắt)
                      </label>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </section>

          {/* Column 2: Data & privacy */}
          <section className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="mb-3 inline-flex items-center gap-2 text-base font-bold text-emerald-900 dark:text-emerald-200">
              <Database className="h-4 w-4" /> Dữ liệu & Quyền riêng tư
            </h2>

            <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
              <PolicyItem
                icon={<ShieldAlert className="h-4 w-4" />}
                title="Thu thập & mục đích sử dụng"
                desc="Chúng tôi lưu trữ thông tin tài khoản, hoạt động thao tác trong ứng dụng (audit logs) để phục vụ tính năng, bảo mật và cải thiện chất lượng. Không bán dữ liệu người dùng."
              />
              <PolicyItem
                icon={<ShieldCheck className="h-4 w-4" />}
                title="Bảo vệ khi truyền tải"
                desc="Khuyến nghị triển khai HTTPS ở môi trường production; mọi dữ liệu trao đổi nên đi qua TLS."
              />
              <PolicyItem
                icon={<FileText className="h-4 w-4" />}
                title="Lưu trữ & Xóa dữ liệu"
                desc="Bạn có thể yêu cầu xuất hoặc xoá dữ liệu cá nhân tùy theo chính sách lớp học/đơn vị. Một số bản ghi cần giữ vì lý do pháp lý/kiểm toán."
              />
              <PolicyItem
                icon={<Lock className="h-4 w-4" />}
                title="Quyền truy cập"
                desc="Hệ thống phân quyền theo vai trò (User/Teacher/Tenant Admin/System Admin). API chỉ trả dữ liệu phù hợp quyền hiện tại."
              />
              <PolicyItem
                icon={<ClipboardCheck className="h-4 w-4" />}
                title="Nhật ký hoạt động (Audit)"
                desc="Ghi lại các hành động quan trọng: đăng nhập, tạo/sửa/xóa câu hỏi, cấu hình đề… phục vụ điều tra sự cố."
              />
            </div>

            <div className="mt-4 text-xs text-slate-500 dark:text-slate-400">
              <p>
                *Lưu ý: Đây là trang mô tả chính sách ở tầng giao diện. Việc bật/tắt một số tuỳ chọn yêu cầu hỗ trợ từ backend
                (ví dụ: 2FA, cảnh báo đăng nhập, xuất/xóa dữ liệu cá nhân).
              </p>
            </div>
          </section>

          {/* Column 3: Compliance & reports */}
          <section className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="mb-3 inline-flex items-center gap-2 text-base font-bold text-emerald-900 dark:text-emerald-200">
              <FileText className="h-4 w-4" /> Chính sách & Tuân thủ
            </h2>

            <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
              <PolicyItem
                icon={<FileText className="h-4 w-4" />}
                title="Điều khoản sử dụng"
                desc="Sử dụng QuizUniverse đồng nghĩa bạn đồng ý với quy tắc sử dụng công bằng, không lạm dụng hệ thống, không vi phạm bản quyền."
              />
              <PolicyItem
                icon={<ShieldCheck className="h-4 w-4" />}
                title="Quyền riêng tư"
                desc="Tôn trọng quyền riêng tư của người dùng; chỉ thu thập dữ liệu cần thiết cho vận hành và cải tiến tính năng."
              />
              <PolicyItem
                icon={<Bug className="h-4 w-4" />}
                title="Báo cáo lỗ hổng (Responsible Disclosure)"
                desc="Nếu phát hiện vấn đề bảo mật, vui lòng gửi email tới security@quizuniverse.vn kèm mô tả, bước tái hiện. Chúng tôi sẽ phản hồi sớm nhất."
              />
              <PolicyItem
                icon={<ClipboardCheck className="h-4 w-4" />}
                title="Sao lưu & Phục hồi"
                desc="Cơ sở dữ liệu nên có lịch sao lưu định kỳ. Khi có sự cố, áp dụng quy trình khôi phục được kiểm thử."
              />
            </div>

          
          </section>
        </div>

        {/* FAQ */}
        <section className="mt-10 rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-4 text-base font-bold text-emerald-900 dark:text-emerald-200">Câu hỏi thường gặp (FAQ)</h2>
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            <FaqItem q="QuizUniverse dùng loại xác thực nào?" a="Sử dụng JWT gửi qua header Authorization. Backend xác minh chữ ký và trích xuất userId/role để cấp quyền." />
            <FaqItem q="Tôi có thể xuất/xóa dữ liệu cá nhân không?" a="Bạn có thể gửi yêu cầu tới quản trị viên/đơn vị. Một số dữ liệu có thể cần lưu theo quy định pháp lý." />
            <FaqItem q="2FA có sẵn chưa?" a="Tuỳ chọn 2FA đang triển khai; khi sẵn sàng, bạn có thể bật trong phần Bảo mật tài khoản." />
          </div>
        </section>

        {/* Footer info */}
        <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
          Cập nhật lần cuối: {new Date().toLocaleDateString()} • Phiên bản trang: 1.0
        </p>

        <div className="mt-4 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm text-white hover:brightness-110"
          >
            Quay về trang chủ
          </Link>
        </div>
      </main>
    </div>
  );
}

function PolicyItem({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-xl border border-slate-200 p-3 dark:border-slate-800">
      <div className="flex items-start gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200">
          {icon}
        </div>
        <div className="min-w-0">
          <div className="font-semibold">{title}</div>
          <p className="mt-1 text-sm opacity-90">{desc}</p>
        </div>
      </div>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="py-3">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{q}</span>
        <span className="ml-4 text-xs text-slate-500 dark:text-slate-400">{open ? "Ẩn" : "Xem"}</span>
      </button>
      {open && (
        <div className="mt-2 text-sm text-slate-700 opacity-90 dark:text-slate-300">{a}</div>
      )}
    </div>
  );
}
