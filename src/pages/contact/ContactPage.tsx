import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  MdMailOutline as Mail,
  MdPhone as Phone,
  MdLocationOn as MapPin,
  MdAutoAwesome as Sparkles,
  MdFavoriteBorder as Heart,
  MdSend as Send,
  MdChatBubbleOutline as MessageCircle,
  MdAccessTime as Clock,
  MdShield as Shield,
  MdPublic as Globe,
  MdCheckCircleOutline as CheckCircle2
} from 'react-icons/md';
import Floating from "@/shared/ui/Floatting";
import AnimatedGradientBackground from "@/shared/ui/AnimatedGradientBackground";
import TypewriterText from "@/shared/ui/TypewriterText";
import GradientText from "@/shared/ui/GradientText";

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

  const contactMethods = [
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email",
      value: "support@quizuniverse.vn",
      gradient: "from-rose-500 to-pink-500",
      action: "mailto:support@quizuniverse.vn",
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Hotline",
      value: "+84 818 768 940",
      gradient: "from-emerald-500 to-teal-500",
      action: "tel:+84818768940",
    },
    {
      icon: <MessageCircle className="h-5 w-5" />,
      title: "Zalo",
      value: "0818.768.940",
      gradient: "from-blue-500 to-cyan-500",
      action: "https://zalo.me/0818768940",
    },
  ];
  const features = [
    {
      icon: <Clock className="h-4 w-4" />,
      text: "Phản hồi trong 24h",
    },
    {
      icon: <Shield className="h-4 w-4" />,
      text: "Bảo mật thông tin",
    },
    {
      icon: <Globe className="h-4 w-4" />,
      text: "Hỗ trợ toàn quốc",
    },
    {
      icon: <CheckCircle2 className="h-4 w-4" />,
      text: "Tư vấn miễn phí",
    },
  ];

  return (
    <div className="contact-page relative min-h-screen overflow-hidden bg-slate-50 dark:bg-slate-900">
      {/* Animated Gradient Background */}
      <AnimatedGradientBackground />

      {/* Floating decorative elements */}
      <Floating distance={12} duration={7} className="pointer-events-none absolute top-20 left-8 z-20">
        <div className="rounded-xl bg-gradient-to-br from-amber-300 to-rose-300 px-3 py-1 shadow-lg -rotate-6">
          <span className="text-xs font-black text-rose-700">CONTACT</span>
        </div>
      </Floating>

      <Floating distance={10} duration={6} className="pointer-events-none absolute top-1/3 -right-6 z-20">
        <div className="rounded-full bg-gradient-to-br from-purple-400 to-indigo-400 p-3 shadow-xl rotate-12">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
      </Floating>

      <Floating distance={14} duration={8} className="pointer-events-none absolute bottom-32 left-6 z-20">
        <div className="rounded-xl bg-gradient-to-br from-emerald-300 to-cyan-300 px-3 py-1 shadow-lg rotate-3">
          <span className="text-xs font-bold text-emerald-900">SUPPORT 24/7</span>
        </div>
      </Floating>

      <Floating distance={9} duration={9} className="pointer-events-none absolute bottom-20 right-10 z-20">
        <div className="rounded-full bg-gradient-to-tr from-pink-300 to-yellow-300 p-2 shadow-lg -rotate-12">
          <Heart className="h-4 w-4 text-pink-700" />
        </div>
      </Floating>

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:py-20">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 160, damping: 18 }}
          className="mb-12 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold ring-1 ring-white/20 backdrop-blur dark:bg-white/5 dark:text-gray-300"
          >
            <Sparkles className="h-4 w-4" />
            QuizUniverse • Hỗ trợ khách hàng
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-center text-[2rem] md:text-[2.5rem] font-black leading-tight"
          >
            <TypewriterText text="Liên hệ với" />
            <GradientText className="mx-auto block text-[2rem] md:text-[2.5rem] font-[Poppins]">
              QuizUniverse
            </GradientText>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl text-center text-white/90 dark:text-gray-300"
          >
            Chúng tôi luôn sẵn sàng lắng nghe ý kiến đóng góp và hỗ trợ bạn
            mọi lúc mọi nơi. Hãy để lại tin nhắn, đội ngũ hỗ trợ sẽ phản hồi
            trong thời gian sớm nhất.
          </motion.p>
        </motion.div>

        {/* Contact Methods Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-16 grid gap-4 sm:grid-cols-3"
        >
          {contactMethods.map((method, idx) => (
            <motion.a
              key={method.title}
              href={method.action}
              target={method.title !== "Hotline" ? "_blank" : undefined}
              rel={method.title !== "Hotline" ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative overflow-hidden rounded-2xl bg-white/10 p-5 backdrop-blur-md transition-all duration-300 hover:bg-white/20 ring-1 ring-white/20"
            >
              {/* Animated gradient overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${method.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-10`}
              />

              <div
                className={`inline-flex rounded-xl bg-gradient-to-br ${method.gradient} p-2.5 shadow-md`}
              >
                <div className="text-white">{method.icon}</div>
              </div>

              <h3 className="mt-3 text-lg font-semibold text-white">
                {method.title}
              </h3>
              <p className="mt-1 text-sm text-white/80">{method.value}</p>

              {/* Arrow indicator */}
              <div className="absolute bottom-4 right-4 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
                <svg
                  className="h-4 w-4 text-white/60"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Form and Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid gap-8 lg:grid-cols-2"
        >
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
            className="relative overflow-hidden rounded-2xl bg-white/10 p-6 backdrop-blur-md ring-1 ring-white/20 lg:p-8"
          >
            {/* Shimmer effect */}
            <div className="pointer-events-none absolute -inset-full opacity-0 transition-opacity duration-700 group-hover:opacity-100 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12" />

            <h2 className="mb-6 text-2xl font-bold text-white">
              Gửi tin nhắn
            </h2>

            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-white/90">
                  Họ tên
                </label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl bg-white/90 p-3 text-sm text-gray-800 placeholder:text-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:bg-slate-800/90 dark:text-gray-100 dark:placeholder:text-gray-400"
                  placeholder="Nguyễn Văn A"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white/90">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl bg-white/90 p-3 text-sm text-gray-800 placeholder:text-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:bg-slate-800/90 dark:text-gray-100 dark:placeholder:text-gray-400"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white/90">
                  Tin nhắn
                </label>
                <textarea
                  rows={5}
                  required
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className="w-full resize-none rounded-xl bg-white/90 p-3 text-sm text-gray-800 placeholder:text-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:bg-slate-800/90 dark:text-gray-100 dark:placeholder:text-gray-400"
                  placeholder="Nội dung liên hệ..."
                />
              </div>

              {sent && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl bg-emerald-500/20 px-4 py-3 text-sm text-emerald-100 ring-1 ring-emerald-500/30"
                >
                  Tin nhắn đã được gửi! Chúng tôi sẽ phản hồi sớm nhất.
                </motion.div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={sent}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 px-6 py-3 font-semibold text-emerald-950 shadow-lg transition-all duration-300 hover:shadow-xl disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
                Gửi liên hệ
              </motion.button>
            </form>
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col justify-between space-y-6"
          >
            {/* Address Card */}
            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-md ring-1 ring-white/20">
              <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 p-3 shadow-md">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">
                Địa chỉ
              </h3>
              <p className="text-white/80">
                123 Đường ABC, Quận XYZ
                <br />
                Thành phố Hồ Chí Minh
              </p>
            </div>

            {/* Working Hours */}
            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-md ring-1 ring-white/20">
              <h3 className="mb-4 text-xl font-semibold text-white">
                Giờ làm việc
              </h3>
              <div className="space-y-2 text-white/80">
                <div className="flex justify-between">
                  <span>Thứ 2 - Thứ 6:</span>
                  <span className="font-medium">8:00 - 17:30</span>
                </div>
                <div className="flex justify-between">
                  <span>Thứ 7:</span>
                  <span className="font-medium">8:00 - 12:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Chủ nhật:</span>
                  <span className="font-medium">Nghỉ</span>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-md ring-1 ring-white/20">
              <h3 className="mb-4 text-xl font-semibold text-white">
                Cam kết hỗ trợ
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {features.map((feature, idx) => (
                  <motion.div
                    key={feature.text}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + idx * 0.05 }}
                    className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2"
                  >
                    <div className="text-emerald-400">{feature.icon}</div>
                    <span className="text-sm text-white/80">{feature.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
