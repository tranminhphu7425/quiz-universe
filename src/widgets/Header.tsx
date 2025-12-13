import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import Logo from "@/assets/images/logo/quizuniverselogo.png";
import type { Variants } from "framer-motion";
import { Settings } from "lucide-react";


import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Building2,
  BookOpen,
  Home,
  Info,
  Contact,
  User,
  LogIn,
  UserPlus,
  Power,
  UserCircle,
  Heart,
  History,
  Star,
  Wallet,
  Crown,
  XCircle,
  Headset,
  List,
  Plus,
  LogOut,
  ShieldCheck,
  Shield
} from "lucide-react";
import { useAuth } from "@/app/providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { FaCrown, FaPlus, FaStar } from "react-icons/fa";
import { fetchAllSubjects, Subject } from "@/shared/api/subjectApi";
import { normalizeText } from "@/shared/utils/textUtils";

export type Tenant = { id: string; name: string; logo?: string };

export interface HeaderProps {
  tenants?: Tenant[];
  currentTenant?: string | null;
  onChangeTenant?: (tenantId: string) => void;
  onGetStarted?: () => void;
  onLogin?: () => void;
  links?: { label: string; href: string }[];
}

const menuVariants = {
  open: {
    opacity: 1,
    height: "auto",
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
  closed: {
    opacity: 0,
    height: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1, when: "afterChildren" },
  },
};

const itemVariants = {
  open: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  closed: { opacity: 0, y: -20 },
} satisfies Variants;;

const bounceTransition = {
  y: {
    duration: 0.4,
    repeat: Infinity,
    repeatType: "reverse" as const, // giữ literal type
    ease: "easeOut" as const,       // giữ literal type
  },
} as const;

export default function Header({

  onGetStarted,
  onLogin,
  links,
}: HeaderProps) {
  const { user, logout } = useAuth();
  links = user ? [
    { label: "Câu hỏi", href: "/subjects" },
    // { label: "Đề thi", href: "/exams/create" },
    { label: "Diễn đàn", href: "/forum" },
    { label: "Thư viện", href: "/resources" }

  ] : [{ label: "Câu hỏi", href: "/subjects" },
  { label: "Thư viện", href: "/resources" },
  // { label: "Hướng dẫn nhanh", href: "/quickguide" },
  { label: "Diễn đàn", href: "/forum" }];
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [tenantOpen, setTenantOpen] = useState(false);
  const controls = useAnimation();
  const [tick, setTick] = useState(0);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [err, setErr] = useState<string | null>(null);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Xử lý tìm kiếm, ví dụ chuyển trang hoặc gọi API
    if (search.trim()) {
      window.location.href = `/questions?search=${encodeURIComponent(search)}`;
    }
  };

  useEffect(() => {
    const id = setInterval(() => setTick((t) => (t + 1) % 3), 2400);
    return () => clearInterval(id);
  }, []);





  useEffect(() => {
    const kw = normalizeText(search);
    if (!kw) {
      setResults([]);
      return;
    }
    setResults(
      subjects.filter((s) =>
        [s.code, s.name, s.description ?? ""].some((x) =>
          normalizeText(x).includes(kw)
        )
      )
    );
  }, [search, subjects]);
 
  async function fetchData() {


    const ac = new AbortController();
    setLoading(true);
    setErr(null);

    (async () => {
      try {
        // 1) Ưu tiên lấy từ API
        const list = await fetchAllSubjects(ac.signal);

        setSubjects(list);
      } catch (e: any) {
        // Nếu bị hủy thì thôi
        if (e?.name === "AbortError") return;

        // 2) API lỗi -> fallback sang JSON cục bộ (dynamic import)
        setErr("Không thể lấy dữ liệu từ API. Đang dùng dữ liệu cục bộ!");
        const local = await fetch("/quiz-universe/assets/data/subjects.json");
        setSubjects((await local.json()) as Subject[]);
      } finally {
        setLoading(false);
      }
    })();

    return () => ac.abort();
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log("Xin chao", user);

  }, [user])



  const navSubItems = [
    { to: "/about", icon: <Contact className="w-4 h-4" />, text: "Giới thiệu" },
  ];

  return (
    <header className="w-full bg-gradient-to-r from-green-600 to-emerald-600 dark:from-slate-900 dark:to-slate-800 shadow-lg sticky top-0 z-50">
      <div className="lg:container mx-auto px-2 lg:px-4 py-2">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            animate={controls}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center"
          >
            <Link to={user ? "/dashboard" : "/"}>
              <div className="flex space-x-2 items-center">
                <motion.img
                  src={Logo}
                  alt="Logo"
                  className="h-12 w-12"
                  transition={bounceTransition}
                />
                <motion.span
                  className="text-white dark:text-slate-100 font-bold text-3xl font-mono hidden xl:block"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  QuizUniverse
                </motion.span>
              </div>
            </Link>
          </motion.div>

          {/* Search Box (Desktop) */}
          <form
            onSubmit={handleSearch}
            className="hidden lg:flex flex-1 justify-center mx-8"
          >
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              placeholder="Tìm kiếm môn học, đề thi.."
              className="w-35 xl:w-70 2xl:w-[400px] px-4 py-2 text-black dark:text-white rounded-lg 
                     border border-emerald-200 dark:border-slate-600 
                     bg-white dark:bg-slate-800 
                     placeholder:text-gray-400 dark:placeholder:text-slate-400
                     focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            {isFocused && results.length > 0 && (
              <ul className="absolute w-35 xl:w-70 2xl:w-[400px] top-full mt-2 bg-white dark:bg-slate-800 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                {results.map((s) => (
                  <li key={s.id}>
                    <Link
                      to={`/questions/subject/${s.id}`}
                      className="block px-4 py-2 hover:bg-emerald-100 dark:hover:bg-slate-700 text-gray-400 dark:text-text-slate-400"
                      onClick={() => setSearch("")}
                    >
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </form>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4">

            {/* Main Nav Items */}
            {navSubItems.map((item) => {
              const active = location.pathname === item.to;
              return (
                <motion.div
                  key={item.to}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={item.to}
                    className={`flex items-center space-x-2 p-3 rounded-lg transition-all ${active
                      ? "bg-white text-emerald-600 dark:bg-slate-200 dark:text-emerald-700"
                      : "text-white dark:text-slate-200 hover:bg-green-700 dark:hover:bg-slate-700"
                      }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.text}</span>
                  </Link>
                </motion.div>
              );
            })}

            {/* Custom Links */}
            {links.map((link) => {
              const active = location.pathname.startsWith(link.href);
              return (
                <motion.div
                  key={link.href}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={link.href}
                    className={`flex items-center space-x-2 p-3 rounded-lg transition-all ${active
                      ? "bg-white text-emerald-600 dark:bg-slate-200 dark:text-emerald-700"
                      : "text-white dark:text-slate-200 hover:bg-green-700 dark:hover:bg-slate-700"
                      }`}
                  >
                    <span className="font-medium">{link.label}</span>
                  </Link>
                </motion.div>
              );
            })}

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3">
              {!user ? (
                <>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/login"
                      className="flex items-center space-x-2 bg-white text-emerald-600 dark:bg-slate-200 dark:text-emerald-700 px-4 py-2 rounded-lg font-medium"
                    >
                      <LogIn className="w-4 h-4" />
                      <span>Đăng nhập</span>
                    </Link>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/register"
                      className="hidden 2xl:flex items-center space-x-2 bg-yellow-400 text-white px-4 py-2 rounded-lg font-medium dark:bg-yellow-500 dark:hover:bg-yellow-400"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Bắt đầu</span>
                    </Link>
                  </motion.div>
                </>
              ) : (
                <motion.div className="relative" >
                  <motion.button
                    className="flex items-center space-x-1 text-white dark:text-slate-200 p-3 rounded-lg hover:bg-green-700 dark:hover:bg-slate-700 transition-all"
                    onClick={() => setMenuOpen(!menuOpen)}
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <User className="w-4 h-4" />
                    <span className="font-medium">{user.name}</span>
                    {user.role === "admin" && (
                      <ShieldCheck className="w-5 h-5 text-red-500" />
                    )}
                    <motion.span animate={{ rotate: menuOpen ? 180 : 0 }}>
                      <ChevronDown className="w-4 h-4" />
                    </motion.span>
                  </motion.button>

                  <AnimatePresence>
                    {menuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        className="absolute right-0 mt-2 w-60 bg-white dark:bg-slate-900 rounded-xl shadow-2xl overflow-hidden z-50 border border-emerald-100 dark:border-slate-700"
                      >
                        <motion.div
                          className="divide-y divide-emerald-50 dark:divide-slate-700"
                          initial="hidden"
                          animate="visible"
                          variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
                        >
                          <motion.div
                            className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-200 dark:from-slate-900 dark:to-slate-950 dark:border-slate-800"
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.1 }}
                          >
                            <div className="flex items-center">
                              <motion.div
                                className="relative"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-md 
    ${user.role === "admin" ? "bg-red-500" : "bg-emerald-500"}`}>
                                  {user.name.charAt(0)}
                                </div>
                                <motion.div
                                  className="absolute -bottom-1 -right-1 bg-emerald-600 rounded-full p-1 dark:bg-emerald-500"
                                  animate={{ rotate: 360 }}
                                  transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                                >
                                  <FaCrown className="text-yellow-300 text-xs dark:text-yellow-200" />
                                </motion.div>
                              </motion.div>

                              <div className="ml-3">
                                <motion.p
                                  className="text-lg font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-2"
                                  initial={{ x: -10 }}
                                  animate={{ x: 0 }}
                                >

                                  <Link to="/profile"> 
                                  {user.name}
                                  {user.role === "admin" && (
                                    <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-300">
                                      Admin
                                    </span>
                                  )}
                                  </Link>


                                </motion.p>

                                <motion.div
                                  className="flex items-center mt-1"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.2 }}
                                >
                                  <FaStar className="text-yellow-400 text-sm mr-1 dark:text-yellow-300" />
                                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
                                    {0} lượt đánh giá
                                  </span>
                                </motion.div>
                              </div>

                            </div>

                            {/* Balance with pulse animation */}
                            <motion.div
                              className="mt-3 rounded-lg p-3 shadow-inner border border-emerald-100 bg-white dark:bg-slate-800 dark:border-slate-700 dark:shadow-black/20"
                              initial={{ y: 10 }}
                              animate={{ y: 0 }}
                              whileHover={{ scale: 1.02 }}
                            >
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="text-xs text-gray-500 dark:text-slate-400">
                                    Số dư khả dụng
                                  </p>
                                  <motion.p
                                    className="text-xl font-bold text-emerald-600 dark:text-emerald-400"
                                    animate={{ scale: [1, 1.05, 1] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                  >
                                    {0}đ
                                  </motion.p>
                                </div>
                                <motion.button
                                  className="px-3 py-1 text-white text-xs font-semibold rounded-full shadow-md hover:shadow-lg bg-gradient-to-r from-emerald-500 to-teal-500 focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:from-emerald-600 dark:to-teal-600 dark:focus:ring-emerald-700"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <FaPlus className="inline mr-1" />
                                  Nạp tiền
                                </motion.button>
                              </div>
                            </motion.div>
                          </motion.div>



                          {/* Trang quản trị (chỉ admin) */}
                          {user?.role === "admin" && (
                            <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                              <Link
                                to="/admin"
                                onClick={() => setMenuOpen(false)}
                                className="flex items-center px-4 py-3 text-gray-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-800 transition-all group"
                              >
                                <Shield className="w-5 h-5 mr-2 text-purple-500 group-hover:scale-110 transition-transform" />
                                <span className="group-hover:font-medium group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-all">
                                  Trang quản trị
                                </span>
                                <motion.span
                                  className="ml-auto opacity-0 group-hover:opacity-100 text-purple-500"
                                  initial={{ x: -10 }}
                                  animate={{ x: 0 }}
                                  transition={{ delay: 0.1 }}
                                >
                                  <ChevronRight className="w-3 h-3" />
                                </motion.span>
                              </Link>
                            </motion.div>
                          )}



                          {/* Dashboard */}
                          <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                            <Link
                              to="/dashboard"
                              onClick={() => setMenuOpen(false)}
                              className="flex items-center px-4 py-3 text-gray-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-800 transition-all group"
                            >
                              <UserCircle className="w-5 h-5 mr-2 text-yellow-500 group-hover:scale-110 transition-transform" />
                              <span className="group-hover:font-medium group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-all">
                                Bảng điều khiển
                              </span>
                              <motion.span
                                className="ml-auto opacity-0 group-hover:opacity-100 text-emerald-500"
                                initial={{ x: -10 }}
                                animate={{ x: 0 }}
                                transition={{ delay: 0.1 }}
                              >
                                <ChevronRight className="w-3 h-3" />
                              </motion.span>
                            </Link>
                          </motion.div>

                          

                          {/* Cài đặt */}


                          <motion.div
                            variants={{
                              hidden: { opacity: 0, x: -20 },
                              visible: { opacity: 1, x: 0 },
                            }}
                          >
                            <Link
                              to="/settings"
                              onClick={() => setMenuOpen(false)}
                              className="flex items-center px-4 py-3 text-gray-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-800 transition-all group"
                            >
                              <Settings className="w-5 h-5 mr-2 text-blue-500 group-hover:scale-110 transition-transform" />
                              <span className="group-hover:font-medium group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-all">
                                Cài đặt
                              </span>
                              <motion.span
                                className="ml-auto opacity-0 group-hover:opacity-100 text-emerald-500"
                                initial={{ x: -10 }}
                                animate={{ x: 0 }}
                                transition={{ delay: 0.1 }}
                              >
                                <ChevronRight className="w-3 h-3" />
                              </motion.span>
                            </Link>
                          </motion.div>



                          {/* Đăng xuất */}
                          <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                            <button
                              onClick={async () => {
                                await logout();
                                navigate("/login");
                              }}
                              className="w-full flex items-center px-4 py-3 text-red-600 dark:text-red-400 hover:bg-emerald-50 dark:hover:bg-slate-800 transition-all group"
                            >
                              <LogOut className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                              <span className="group-hover:font-medium">Đăng xuất</span>
                              <motion.span
                                className="ml-auto opacity-0 group-hover:opacity-100 text-red-500"
                                initial={{ x: -10 }}
                                animate={{ x: 0 }}
                                transition={{ delay: 0.1 }}
                              >
                                <ChevronRight className="w-3 h-3" />
                              </motion.span>
                            </button>
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </div>
          </nav>
          {/* Search Box (Mobile) */}
          {/* <form onSubmit={handleSearch} className="flex m-2 lg:hidden w-4/5">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm..."
              className="flex-1 px-3 py-2 rounded-lg border border-emerald-200 dark:border-slate-600 
                           bg-white dark:bg-slate-800 
                           text-black dark:text-white 
                           placeholder:text-gray-400 dark:placeholder:text-slate-400
                           focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05, boxShadow: "0 0 12px rgba(16,185,129,0.6)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="ml-2 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Tìm
            </motion.button>
          </form> */}
          <div className="flex m-2 lg:hidden w-4/5 md:w-[450px]">
            <form onSubmit={handleSearch} className="w-full">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                placeholder="Tìm kiếm môn học..."
                className="w-full  md:m-auto px-4 py-2 rounded-lg border text-black dark:text-white rounded-lg 
                     border border-emerald-200 dark:border-slate-600 
                     bg-white dark:bg-slate-800 
                     placeholder:text-gray-400 dark:placeholder:text-slate-400
                     focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <div className="absolute flex w-4/5 md:w-[450px] ">
                {isFocused && results.length > 0 && (
                  <ul className=" w-full top-full mt-2 bg-white dark:bg-slate-800 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                    {results.map((s) => (
                      <li key={s.id}>
                        <Link
                          to={`/questions/subject/${s.id}`}
                          className="block px-4 py-2 hover:bg-emerald-100 dark:hover:bg-slate-700 text-gray-400 dark:text-text-slate-400"
                          onClick={() => setSearch("")}
                        >
                          {s.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

            </form>
          </div>








          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden text-white dark:text-slate-200 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="lg:hidden overflow-hidden bg-emerald-600 dark:bg-slate-900"
            >
              <motion.div className="px-2 pt-4 pb-2 space-y-2" variants={menuVariants}>


                {/* Tenant Dropdown (Mobile)
                <motion.div variants={itemVariants}>
                  <motion.button
                    className="w-full flex justify-between items-center rounded-lg text-white dark:text-slate-200 hover:bg-emerald-700 dark:hover:bg-slate-700 py-3 px-4 transition"
                    onClick={() => setTenantOpen(!tenantOpen)}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      <span>{currentTenant || "Chọn trường"}</span>
                    </span>
                    <motion.span animate={{ rotate: tenantOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown className="w-4 h-4" />
                    </motion.span>
                  </motion.button>

                  <AnimatePresence>
                    {tenantOpen && (
                      <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        className="mt-2 space-y-1 bg-emerald-100 dark:bg-slate-800 border border-emerald-200 dark:border-slate-700 rounded-xl shadow-lg px-2 py-2"
                      >
                        {tenants.map((tenant) => (
                          <motion.div key={tenant.id} variants={itemVariants}>
                            <button
                              onClick={() => {
                                onChangeTenant?.(tenant.id);
                                setTenantOpen(false);
                                setIsOpen(false);
                              }}
                              className="w-full flex items-center gap-3 py-2 px-3 text-emerald-700 dark:text-slate-200 hover:bg-emerald-200 dark:hover:bg-slate-700 rounded-lg transition text-left"
                            >
                              <span className="w-2 h-2 rounded-full bg-emerald-500" />
                              <span className="text-sm font-medium">{tenant.name}</span>
                            </button>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div> */}

                {/* Mobile Nav Items */}
                {navSubItems.map((item) => (
                  <motion.div key={item.to} variants={itemVariants}>
                    <Link
                      to={item.to}
                      className={`flex items-center py-3 px-4 rounded-lg ${location.pathname === item.to
                        ? "bg-white text-emerald-600 dark:bg-slate-200 dark:text-emerald-700"
                        : "text-white dark:text-slate-200 hover:bg-emerald-700 dark:hover:bg-slate-700"
                        }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="mr-3">{item.icon}</span>
                      <span className="font-medium">{item.text}</span>
                    </Link>
                  </motion.div>
                ))}

                {/* Custom Links Mobile */}
                {links.map((link) => (
                  <motion.div key={link.href} variants={itemVariants}>
                    <Link
                      to={link.href}
                      className={`flex items-center py-3 px-4 rounded-lg ${location.pathname.startsWith(link.href)
                        ? "bg-white text-emerald-600 dark:bg-slate-200 dark:text-emerald-700"
                        : "text-white dark:text-slate-200 hover:bg-emerald-700 dark:hover:bg-slate-700"
                        }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="font-medium">{link.label}</span>
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile Auth Buttons */}

                {user ? (
                  <motion.div
                    variants={menuVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="flex w-full items-center overflow-hidden rounded-lg border border-emerald-100 bg-white/95 shadow-md dark:border-slate-700 dark:bg-slate-800/95"
                  >



                    {/* Account button */}

                    <div className=" flex flex-1  h-full bg-gradient-to-r from-orange-500 to-amber-500">

                      <motion.button
                        variants={itemVariants}
                        className="flex items-center gap-2  px-3 py-2 text-white"
                        onClick={() => setMenuOpen(!menuOpen)}
                        whileTap={{ scale: 0.98 }}
                      >
                        <User className="h-4 w-4" />
                        <span className="text-sm font-semibold truncate">{user.name}</span>
                      </motion.button>
                    </div>

                    {/* admin */}

                    {user?.role === "admin"
                      &&
                      <motion.div variants={itemVariants} className="flex-1">
                        <Link
                          to="/admin"
                          onClick={() => {
                            setMenuOpen(false);
                            setIsOpen(false);
                          }}
                          className="flex w-full items-center justify-center gap-2 px-3 py-2 text-emerald-700 transition hover:bg-emerald-50 dark:text-slate-200 dark:hover:bg-slate-700/70"
                        >
                          <Shield className="h-4 w-4 text-purple-500" />
                          <span className="text-sm font-medium">Trang quản trị</span>
                        </Link>
                      </motion.div>
                    }

                    {/* Dashboard link */}
                    <motion.div variants={itemVariants} className="flex-1">
                      <Link
                        to="/dashboard"
                        onClick={() => {
                          setMenuOpen(false);
                          setIsOpen(false);
                        }}
                        className="flex w-full items-center justify-center gap-2 px-3 py-2 text-emerald-700 transition hover:bg-emerald-50 dark:text-slate-200 dark:hover:bg-slate-700/70"
                      >
                        <UserCircle className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium">Bảng điều khiển</span>
                      </Link>
                    </motion.div>

                    {/* Logout button */}
                    <motion.div variants={itemVariants} className="flex-1">
                      <button
                        onClick={async () => {
                          await logout();
                          setMenuOpen(false);
                          setIsOpen(false);
                          navigate("/login");
                        }}
                        className="flex w-full items-center justify-center gap-2 px-3 py-2 text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-slate-700/70"
                      >
                        <LogOut className="h-4 w-4" />
                        <span className="text-sm font-medium">Đăng xuất</span>
                      </button>
                    </motion.div>
                  </motion.div>

                ) :
                  <>
                    <motion.div className="flex flex-col space-y-2 mt-4" variants={itemVariants}>
                      <motion.button
                        onClick={() => {
                          onLogin?.();
                          setIsOpen(false);
                        }}

                        whileHover={{ x: [0, -3, 3, -2, 2, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <Link to="/login" className="flex justify-center items-center py-3 px-4 bg-white text-emerald-600 dark:bg-slate-200 dark:text-emerald-700 rounded-lg font-medium">
                          <LogIn className="mr-2 w-4 h-4" />
                          <span>Đăng nhập</span>
                        </Link>
                      </motion.button>
                      <motion.button
                        onClick={() => {
                          onGetStarted?.();
                          setIsOpen(false);
                        }}

                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link to="/register" className="flex justify-center items-center py-3 px-4 bg-yellow-400 text-white dark:bg-yellow-500 dark:hover:bg-yellow-400 rounded-lg font-medium">
                          <BookOpen className="mr-2 w-4 h-4" />
                          <span>Bắt đầu</span>
                        </Link>
                      </motion.button>
                    </motion.div>
                  </>

                }


              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>

  );
}