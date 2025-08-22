import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Sparkles, Heart, Send } from "lucide-react";
import Floating from "@/shared/ui/Floatting";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const tileUrl = useMemo(
    () =>
      encodeURIComponent(`
      <svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160' fill='none'>
        <g stroke='#10b981' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>
          <path d='M28 36h40a8 8 0 018 8v44H36a8 8 0 01-8-8V36z' opacity='0.7'/>
          <path d='M28 52h48' opacity='0.6'/>
          <rect x='96' y='28' width='36' height='28' rx='4' />
          <path d='M100 36h18M100 44h18' opacity='0.6'/>
        </g>
      </svg>
    `),
    []
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: gọi API gửi mail (EmailJS, backend,…)
    setSent(true);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Gradient nền */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />

      {/* Tile mờ */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-[120%] md:w-full opacity-10"
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

      {/* Floating decor */}
      <Floating distance={12} duration={7} className="pointer-events-none absolute top-16 left-8">
        <div className="rounded-xl bg-gradient-to-br from-amber-300 to-rose-300 px-3 py-1 shadow-lg -rotate-6">
          <span className="text-xs font-black text-rose-700">CONTACT</span>
        </div>
      </Floating>
      <Floating distance={10} duration={6} className="pointer-events-none absolute bottom-20 right-10">
        <div className="rounded-full bg-gradient-to-br from-purple-400 to-indigo-400 p-3 shadow-xl rotate-12">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
      </Floating>
      <Floating distance={9} duration={9} className="pointer-events-none absolute bottom-6 left-10">
        <div className="rounded-full bg-gradient-to-tr from-pink-300 to-yellow-300 p-2 shadow-lg -rotate-12">
          <Heart className="h-4 w-4 text-pink-700" />
        </div>
      </Floating>

      {/* Nội dung */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 160, damping: 18 }}
          className="grid gap-10 md:grid-cols-2"
        >
          {/* Form liên hệ */}
          <form
            onSubmit={onSubmit}
            className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-md
                       dark:border-gray-700 dark:bg-gray-800/50"
          >
            <h2 className="mb-4 text-xl font-semibold text-white dark:text-gray-200">
              Gửi tin nhắn cho chúng tôi
            </h2>

            <label className="mb-2 block text-sm font-medium text-white dark:text-gray-200">
              Họ tên
            </label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mb-3 w-full rounded-xl bg-white/80 p-2 text-sm text-gray-800 placeholder:text-gray-500 
                         focus:outline-none ring-1 ring-black/10 focus:ring-emerald-400
                         dark:bg-slate-900/70 dark:text-gray-100 dark:placeholder:text-gray-400 dark:ring-white/10"
              placeholder="Nguyễn Văn A"
            />

            <label className="mb-2 block text-sm font-medium text-white dark:text-gray-200">
              Email
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mb-3 w-full rounded-xl bg-white/80 p-2 text-sm text-gray-800 placeholder:text-gray-500 
                         focus:outline-none ring-1 ring-black/10 focus:ring-emerald-400
                         dark:bg-slate-900/70 dark:text-gray-100 dark:placeholder:text-gray-400 dark:ring-white/10"
              placeholder="you@example.com"
            />

            <label className="mb-2 block text-sm font-medium text-white dark:text-gray-200">
              Tin nhắn
            </label>
            <textarea
              rows={4}
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="mb-3 w-full rounded-xl bg-white/80 p-2 text-sm text-gray-800 placeholder:text-gray-500 
                         focus:outline-none ring-1 ring-black/10 focus:ring-emerald-400
                         dark:bg-slate-900/70 dark:text-gray-100 dark:placeholder:text-gray-400 dark:ring-white/10"
              placeholder="Nội dung liên hệ..."
            />

            {sent && (
              <div className="mb-3 rounded-lg bg-emerald-500/15 px-3 py-2 text-sm text-emerald-100 ring-1 ring-emerald-500/30">
                Tin nhắn đã được gửi! Chúng tôi sẽ phản hồi sớm nhất.
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={sent}
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full
                         bg-yellow-400 px-6 py-2.5 font-semibold text-emerald-950 shadow
                         hover:brightness-105 disabled:opacity-70"
            >
              Gửi liên hệ
              <Send className="h-4 w-4" />
            </motion.button>
          </form>

          {/* Thông tin liên hệ */}
          <div className="flex flex-col justify-center space-y-6 text-white dark:text-gray-200">
            <h2 className="text-xl font-semibold">Thông tin liên hệ</h2>
            <p className="text-white/90 dark:text-gray-300">
              Nếu bạn có câu hỏi, góp ý hoặc cần hỗ trợ, hãy liên hệ qua các kênh sau:
            </p>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-amber-300" />
              <span>support@quizuniverse.vn</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-amber-300" />
              <span>+84 123 456 789</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-amber-300" />
              <span>123 Đường ABC, Quận XYZ, TP. HCM</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
