// Auto-generated
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, User2, Sparkles, ArrowRight, Heart, ShieldCheck, EyeOff, Eye } from "lucide-react";
import Floating from "@/shared/ui/Floatting"; // giữ nguyên import nếu bạn đã dùng tên này
import { useAuth } from "@/app/providers/AuthProvider";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register: signup, loading } = useAuth?.() ?? { register: async () => { }, loading: false };

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [agree, setAgree] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const tileUrl = useMemo(
    () =>
      encodeURIComponent(`
      <svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160' fill='none'>
        <g stroke='#10b981' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>
          <path d='M28 36h40a8 8 0 018 8v44H36a8 8 0 01-8-8V36z' opacity='0.7'/>
          <path d='M28 52h48' opacity='0.6'/>
          <rect x='96' y='28' width='36' height='28' rx='4' />
          <path d='M100 36h18M100 44h18' opacity='0.6'/>
          <path d='M120 36l6 6M126 36l-6 6' />
          <path d='M40 116l8 4l8-4l-2 9l6 6l-9 1l-3 8l-3-8l-9-1l6-6z' />
          <path d='M112 100c10 0 20-6 20-14v-6c-7 2-13 3-20 3s-13-1-20-3v6c0 8 10 14 20 14z' />
        </g>
      </svg>
    `),
    []
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!agree) return setError("Vui lòng đồng ý với Điều khoản sử dụng.");
    if (pwd.length < 6) return setError("Mật khẩu tối thiểu 6 ký tự.");
    if (pwd !== pwd2) return setError("Mật khẩu nhập lại không khớp.");

    try {
      // Tùy backend của bạn: signup({ name: fullName, email, password: pwd })
      await signup?.({ name: fullName, email, password: pwd });
      
      navigate("/setup", { state: { fromRegister: true } }); // hoặc chuyển đến /login nếu bạn muốn
    } catch (err: any) {
      setError(err?.message ?? "Đăng ký thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Gradient nền */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />

      {/* Tile pattern mờ (trái) */}
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
          <span className="text-xs font-black text-rose-700">WELCOME!</span>
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
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 160, damping: 18 }}
          className="w-full max-w-md"
        >
          {/* Badge/Title */}
          <div className="mb-6 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/20 backdrop-blur dark:bg-white/5 dark:ring-white/10">
              <ShieldCheck className="h-4 w-4" />
              QuizUniverse • Đăng ký
            </div>
            <h1 className="text-4xl font-black leading-tight text-white">
              <span
                className="
      bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 
      bg-clip-text text-transparent glow-text font-['Be Vietnam Pro']
      dark:drop-shadow-none
    "
                style={{
                  textShadow: "0px 2px 2px rgba(0,0,0,0.1)" // chỉ áp cho light
                }}
              >
                Tạo tài khoản mới
              </span>
            </h1>


            <p className="mt-2 text-white/90 dark:text-gray-300">
              Miễn phí — bắt đầu khám phá ngân hàng câu hỏi ngay!
            </p>
          </div>

          {/* Card form */}
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-md
                       dark:border-gray-700 dark:bg-gray-800/50"
          >
            {/* Họ tên */}
            <label className="mb-2 block text-sm font-medium text-white dark:text-gray-200">
              Họ và tên
            </label>
            <div className="mb-4 flex items-center gap-2 rounded-xl bg-white/80 px-3 py-2 ring-1 ring-black/10 focus-within:ring-2 focus-within:ring-emerald-400 dark:bg-slate-900/70 dark:ring-white/10">
              <User2 className="h-4 w-4 text-emerald-600 dark:text-emerald-300" />
              <input
                type="text"
                required
                placeholder="Nguyễn Văn A"
                className="w-full bg-transparent p-2 text-sm text-gray-800 placeholder:text-gray-500 focus:outline-none dark:text-gray-100 dark:placeholder:text-gray-400"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                autoComplete="name"
              />
            </div>

            {/* Email */}
            <label className="mb-2 block text-sm font-medium text-white dark:text-gray-200">
              Email
            </label>
            <div className="mb-4 flex items-center gap-2 rounded-xl bg-white/80 px-3 py-2 ring-1 ring-black/10 focus-within:ring-2 focus-within:ring-emerald-400 dark:bg-slate-900/70 dark:ring-white/10">
              <Mail className="h-4 w-4 text-emerald-600 dark:text-emerald-300" />
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                className="w-full bg-transparent p-2 text-sm text-gray-800 placeholder:text-gray-500 focus:outline-none dark:text-gray-100 dark:placeholder:text-gray-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            {/* Mật khẩu */}
            <label className="mb-2 block text-sm font-medium text-white dark:text-gray-200">
              Mật khẩu
            </label>
            <div className="mb-2 flex items-center gap-2 rounded-xl bg-white/80 px-3 py-2 ring-1 ring-black/10 focus-within:ring-2 focus-within:ring-emerald-400 dark:bg-slate-900/70 dark:ring-white/10">
              <Lock className="h-4 w-4 text-emerald-600 dark:text-emerald-300" />
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                className="w-full bg-transparent p-2 text-sm text-gray-800 placeholder:text-gray-500 focus:outline-none dark:text-gray-100 dark:placeholder:text-gray-400"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                autoComplete="new-password"
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-1 text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-300"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            {/* Nhập lại mật khẩu */}
            <label className="mb-2 mt-3 block text-sm font-medium text-white dark:text-gray-200">
              Nhập lại mật khẩu
            </label>
            <div className="mb-3 flex items-center gap-2 rounded-xl bg-white/80 px-3 py-2 ring-1 ring-black/10 focus-within:ring-2 focus-within:ring-emerald-400 dark:bg-slate-900/70 dark:ring-white/10">
              <Lock className="h-4 w-4 text-emerald-600 dark:text-emerald-300" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                className="w-full bg-transparent p-2 text-sm text-gray-800 placeholder:text-gray-500 focus:outline-none dark:text-gray-100 dark:placeholder:text-gray-400"
                value={pwd2}
                onChange={(e) => setPwd2(e.target.value)}
                autoComplete="new-password"
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="p-1 text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-300"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            {/* Agree */}
            <div className="mb-4 flex items-center justify-between">
              <label className="inline-flex cursor-pointer items-center gap-2 text-xs text-white/90 dark:text-gray-300">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="h-4 w-4 rounded border-white/20 bg-white/20 text-emerald-500 focus:ring-emerald-400 dark:border-gray-600"
                />
                Tôi đồng ý với{" "}
                <Link to="/terms" className="underline underline-offset-2">
                  Điều khoản sử dụng
                </Link>
              </label>
              <Link
                to="/login"
                className="text-xs font-medium text-emerald-100 underline-offset-2 hover:underline dark:text-emerald-300"
              >
                Đã có tài khoản?
              </Link>
            </div>

            {error && (
              <div className="mb-4 rounded-lg bg-rose-500/15 px-3 py-2 text-sm text-rose-100 ring-1 ring-rose-500/30">
                {error}
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full
                         bg-yellow-400 px-6 py-2.5 font-semibold text-emerald-950 shadow
                         hover:brightness-105 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Đang tạo tài khoản..." : "Đăng ký"}
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
}
