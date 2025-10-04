// Auto-generated
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Twitter, MessageCircle, Mail, Heart, Sparkles, Send, ShieldCheck, BookOpen } from "lucide-react";
import Logo from "@/assets/images/logo/quizuniverselogo.png";
import ThemeToggle from "@/shared/ui/ThemeToggle";
import Floating from "@/shared/ui/Floatting";
import { Link } from "react-router-dom";
import {
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";
import React from "react";



interface DockIconProps {
  mouseX?: MotionValue<number>;
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const DockIcon: React.FC<DockIconProps> = ({
  mouseX,
  href,
  children,
  onClick,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const defaultMouseX = useMotionValue(Infinity);

  const iconSize = 36;
  const iconMagnification = 45;
  const iconDistance = 140;

  const distance = useTransform(mouseX ?? defaultMouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(
    distance,
    [-iconDistance, 0, iconDistance],
    [iconSize, iconMagnification, iconSize]
  );

  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className="flex aspect-square items-center justify-center rounded-full"
    >
      <a
        href={href}
        className="flex h-full w-full items-center justify-center"
        onClick={handleClick}
      >
        {children}
      </a>
    </motion.div>
  );
};

interface DockProps {
  children: React.ReactNode;
}

const SimpleDock: React.FC<DockProps> = ({ children }) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="flex h-[58px] items-center gap-2 rounded-lg "
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === DockIcon) {
          return React.cloneElement(
            child as React.ReactElement<DockIconProps>,
            {
              ...(child.props as DockIconProps),
              mouseX: mouseX,
            }
          );
        }
        return child;
      })}
    </motion.div>
  );
};

const SimpleDockApp: React.FC = () => {
  const icons = [
   
    { name: "GitHub", component: Github, href: "" },
    { name: "Twitter", component: Twitter, href: "#" },
    { name: "MessageCircle", component: MessageCircle, href: "#" },
    { name: "Mail", component: Mail, href: "#" },
  ];

  return (
    <div className="flex flex-col items-center justify-end font-sans">
      <SimpleDock>
        {icons.map((icon) => (
          <DockIcon key={icon.name} href={icon.href}>
            <icon.component className="h-full w-full p-2 bg-sky-100 rounded-full text-sky-700 hover:bg-sky-200
                             dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700" />
          </DockIcon>
        ))}
      </SimpleDock>
    </div>
  );
};
export interface FooterLinkGroup {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}

export interface FooterProps {
  groups?: FooterLinkGroup[];
  onSubscribe?: (email: string) => Promise<void> | void;
}

/* -------------------------------- helpers -------------------------------- */
const cn = (...a: (string | false | undefined)[]) => a.filter(Boolean).join(" ");





function Wobble({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={className} whileHover={{ rotate: [0, -3, 3, -2, 2, 0], transition: { duration: 0.6 } }} whileTap={{ scale: 0.96 }}>
      {children}
    </motion.div>
  );
}

/* ------------------------------- component ------------------------------- */
export default function Footer({
  groups = [
    {
      title: "Sản phẩm",
      links: [
        { label: "Ngân hàng câu hỏi", href: "/subjects" },
        { label: "Tạo đề", href: "#" },
        { label: "Chấm & Báo cáo", href: "#" },
      ],
    },
    {
      title: "Tài nguyên",
      links: [
        { label: "Tài liệu", href: "/documents" },
        { label: "Hướng dẫn nhanh", href: "/quickguide" },
        { label: "Cộng đồng", href: "#" },
      ],
    },
    {
      title: "Công ty",
      links: [
        { label: "Giới thiệu", href: "/about" },
        { label: "Liên hệ", href: "/contact" },
        { label: "Tuyển dụng", href: "/recruits" },
      ],
    },
    {
      title: "Pháp lý",
      links: [
        { label: "Điều khoản", href: "/terms" },
        { label: "Bảo mật", href: "/security" },
        { label: "Cookies", href: "/cookies" },
      ],
    },
  ],
  onSubscribe,
}: FooterProps) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await onSubscribe?.(email);
      setSent(true);
      setEmail("");
    } finally {
      setLoading(false);
      setTimeout(() => setSent(false), 2000);
    }
  }

  return (
    <footer className="relative overflow-hidden">
      

      {/* Nền có dark mode */}
      <div className="relative bg-gradient-to-b from-sky-50 to-white dark:from-slate-900 dark:to-slate-950">
        {/* Icon nổi đổi màu trong dark */}
        <div className="absolute inset-0 pointer-events-none">
          <Floating delay={0.4} duration={10} className="absolute left-8 top-6">
            <Sparkles className="h-5 w-5 text-sky-400 dark:text-sky-300" />
          </Floating>
          <Floating delay={1} duration={9} distance={18} className="absolute right-10 top-10">
            <Heart className="h-5 w-5 text-rose-400 dark:text-rose-300" />
          </Floating>
          <Floating delay={1.6} duration={8} distance={16} className="absolute right-1/3 bottom-6">
            <ShieldCheck className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
          </Floating>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-12">
          {/* Brand row */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <img src={Logo} className="h-8 w-8" alt="logo" />
              <div>
                <div className="text-lg font-extrabold text-sky-900 dark:text-sky-100">QuizUniverse</div>
                <div className="-mt-0.5 text-[10px] uppercase tracking-wider text-sky-600 dark:text-slate-400">
                  Cartoon Footer
                </div>
              </div>
            </div>

            {/* Nút mạng XH có dark */}
            <div className="flex items-center gap-2">
              <SimpleDockApp/>
            </div>
          </div>

          {/* Link groups */}
          <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {groups.map((g) => (
              <div key={g.title}>
                <div className="text-sm font-bold text-sky-900 dark:text-sky-100">{g.title}</div>
                <ul className="mt-3 space-y-2 text-sm text-sky-800/80 dark:text-slate-300">
                  {g.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        className="hover:text-sky-900 dark:hover:text-sky-200"
                        to={l.href}
                        {...(l.external ? { target: "_blank", rel: "noreferrer" } : {})}
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter card */}
          <div className="relative mt-10">
            <motion.div
              initial={{ y: 16, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ type: "spring", stiffness: 140, damping: 16 }}
              className="rounded-3xl border border-sky-200 bg-white p-4 shadow-sm
                         dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 text-sky-900 dark:text-slate-100">
                  <Sparkles className="h-5 w-5 text-sky-500 dark:text-sky-300" />
                  <div className="text-sm font-medium">Theo dõi bản tin cập nhật</div>
                </div>

                <form onSubmit={handleSubmit} className="flex w-full max-w-md items-center gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="flex-1 rounded-xl border border-sky-200 bg-sky-50/60 px-3 py-2 text-sm outline-none
                               placeholder:text-sky-400 focus:border-sky-300 focus:bg-white
                               dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100
                               dark:placeholder:text-slate-400 dark:focus:bg-slate-900"
                    required
                  />
                  <Wobble>
                    <button
                      type="submit"
                      disabled={loading}
                      className="rounded-xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white shadow
                                 hover:bg-sky-600 disabled:opacity-60"
                    >
                      {loading ? "Đang gửi…" : "Đăng ký"}
                    </button>
                  </Wobble>
                </form>
              </div>

              <AnimatePresence>
                {sent && (
                  <motion.div
                    className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700
                               dark:bg-emerald-900/30 dark:text-emerald-300"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                  >
                    <Send className="h-3.5 w-3.5" /> Đã gửi! Hãy kiểm tra email của bạn.
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Stickers giữ nguyên */}
            <Floating distance={12} duration={7} className="pointer-events-none absolute -top-4 -left-4">
              <div className="rounded-xl bg-gradient-to-br from-amber-300 to-rose-300 p-2 shadow-lg -rotate-6">
                <span className="text-xs font-black text-rose-700">FUN!</span>
              </div>
            </Floating>
            <Floating distance={10} duration={8} className="pointer-events-none absolute -bottom-4 -right-4">
              <div className="rounded-2xl bg-gradient-to-br from-emerald-300 to-sky-300 p-2 shadow-lg rotate-6">
                <span className="text-xs font-black text-emerald-800">WOW!</span>
              </div>
            </Floating>
          </div>

          {/* Badges row */}
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { icon: <BookOpen className="h-4 w-4" />, label: "Tài liệu đầy đủ" },
              { icon: <ShieldCheck className="h-4 w-4" />, label: "Bảo mật ưu tiên" },
              { icon: <Sparkles className="h-4 w-4" />, label: "Giao diện sinh động" },
            ].map((b, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -2 }}
                className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1.5 text-[11px] font-semibold text-sky-700 ring-1 ring-sky-100
                           dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700"
              >
                {b.icon}
                {b.label}
              </motion.div>
            ))}
          </div>

          {/* Bottom legal */}
          <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-sky-100 pt-4 text-xs text-sky-700/80 sm:flex-row
                          dark:border-slate-800 dark:text-slate-400">
            <ThemeToggle />
            <div>© {new Date().getFullYear()} QuizUniverse. All rights reserved.</div>
            <div className="flex items-center gap-3">
              <Link to="/terms" className="hover:text-sky-900 dark:hover:text-sky-200">Điều khoản</Link>
              <Link to="/security" className="hover:text-sky-900 dark:hover:text-sky-200">Bảo mật</Link>
              <Link to="/cookies" className="hover:text-sky-900 dark:hover:text-sky-200">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
