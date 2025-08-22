import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import Logo from "@/assets/images/logo/quizuniverselogo.png";
import { Menu, X, ChevronDown, ChevronRight, Building2, BookOpen, Contact, LogIn } from "lucide-react";
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
};
;
const bounceTransition = {
    y: {
        duration: 0.4,
        repeat: Infinity,
        repeatType: "reverse", // giữ literal type
        ease: "easeOut", // giữ literal type
    },
};
export default function Header({ tenants = [
    { id: "hcmus", name: "ĐH KHTN" },
    { id: "hust", name: "ĐH BKHN" },
    { id: "vnu", name: "ĐHQG" },
], currentTenant = null, onChangeTenant, onGetStarted, onLogin, links = [
    { label: "Câu hỏi", href: "/questions" },
    { label: "Đề thi", href: "/exams/create" },
], }) {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [tenantOpen, setTenantOpen] = useState(false);
    const controls = useAnimation();
    const [tick, setTick] = useState(0);
    const [search, setSearch] = useState("");
    const handleSearch = (e) => {
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
    const navSubItems = [
        { to: "/about", icon: _jsx(Contact, { className: "w-4 h-4" }), text: "Giới thiệu" },
    ];
    return (_jsx("header", { className: "w-full bg-gradient-to-r from-green-600 to-emerald-600 dark:from-slate-900 dark:to-slate-800 shadow-lg sticky top-0 z-50", children: _jsxs("div", { className: "lg:container mx-auto px-4 py-2", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx(motion.div, { animate: controls, whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, className: "flex items-center", children: _jsx(Link, { to: "/", children: _jsxs("div", { className: "flex space-x-2 items-center", children: [_jsx(motion.img, { src: Logo, alt: "Logo", className: "h-12 w-12", transition: bounceTransition }), _jsx(motion.span, { className: "text-white dark:text-slate-100 font-bold text-3xl font-mono hidden xl:block", initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.2 }, children: "QuizUniverse" })] }) }) }), _jsx("form", { onSubmit: handleSearch, className: "hidden lg:flex flex-1 justify-center mx-8", children: _jsx("input", { type: "text", value: search, onChange: (e) => setSearch(e.target.value), placeholder: "T\u00ECm ki\u1EBFm m\u00F4n h\u1ECDc, \u0111\u1EC1 thi..", className: "w-35 xl:w-70 2xl:w-[400px] px-4 py-2 text-black dark:text-white rounded-lg \r\n                     border border-emerald-200 dark:border-slate-600 \r\n                     bg-white dark:bg-slate-800 \r\n                     placeholder:text-gray-400 dark:placeholder:text-slate-400\r\n                     focus:outline-none focus:ring-2 focus:ring-emerald-400" }) }), _jsxs("nav", { className: "hidden lg:flex items-center space-x-4", children: [_jsxs(motion.div, { className: "relative", whileHover: { scale: 1.05 }, children: [_jsxs(motion.button, { className: "flex items-center space-x-1 text-white dark:text-slate-200 p-3 rounded-lg hover:bg-green-700 dark:hover:bg-slate-700 transition-all", onClick: () => setTenantOpen(!tenantOpen), whileTap: { scale: 0.95 }, children: [_jsx(Building2, { className: "w-4 h-4" }), _jsx("span", { className: "font-medium", children: currentTenant || "Chọn trường" }), _jsx(motion.span, { animate: { rotate: tenantOpen ? 180 : 0 }, children: _jsx(ChevronDown, { className: "w-4 h-4" }) })] }), _jsx(AnimatePresence, { children: tenantOpen && (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 20 }, transition: { type: "spring", damping: 20, stiffness: 300 }, className: "absolute left-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-xl shadow-2xl overflow-hidden z-50 border border-emerald-100 dark:border-slate-700", children: _jsx(motion.div, { className: "divide-y divide-emerald-50 dark:divide-slate-700", initial: "hidden", animate: "visible", variants: {
                                                        visible: { transition: { staggerChildren: 0.05 } },
                                                    }, children: tenants.map((tenant) => (_jsx(motion.div, { variants: {
                                                            hidden: { opacity: 0, x: -20 },
                                                            visible: { opacity: 1, x: 0 },
                                                        }, children: _jsxs(Link, { to: "#", onClick: (e) => {
                                                                e.preventDefault();
                                                                onChangeTenant?.(tenant.id);
                                                                setTenantOpen(false);
                                                            }, className: "flex items-center px-4 py-3 text-gray-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-800 transition-all group", children: [_jsx(motion.span, { className: "mr-3 text-lg group-hover:scale-110 transition-transform", whileHover: { scale: 1.2 }, children: _jsx(Building2, { className: "text-emerald-500" }) }), _jsx("span", { className: "group-hover:font-medium group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-all", children: tenant.name }), _jsx(motion.span, { className: "ml-auto opacity-0 group-hover:opacity-100 text-emerald-500", initial: { x: -10 }, animate: { x: 0 }, transition: { delay: 0.1 }, children: _jsx(ChevronRight, { className: "w-3 h-3" }) })] }) }, tenant.id))) }) })) })] }), navSubItems.map((item) => {
                                    const active = location.pathname === item.to;
                                    return (_jsx(motion.div, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: _jsxs(Link, { to: item.to, className: `flex items-center space-x-2 p-3 rounded-lg transition-all ${active
                                                ? "bg-white text-emerald-600 dark:bg-slate-200 dark:text-emerald-700"
                                                : "text-white dark:text-slate-200 hover:bg-green-700 dark:hover:bg-slate-700"}`, children: [_jsx("span", { className: "text-lg", children: item.icon }), _jsx("span", { className: "font-medium", children: item.text })] }) }, item.to));
                                }), links.map((link) => {
                                    const active = location.pathname.startsWith(link.href);
                                    return (_jsx(motion.div, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: _jsx(Link, { to: link.href, className: `flex items-center space-x-2 p-3 rounded-lg transition-all ${active
                                                ? "bg-white text-emerald-600 dark:bg-slate-200 dark:text-emerald-700"
                                                : "text-white dark:text-slate-200 hover:bg-green-700 dark:hover:bg-slate-700"}`, children: _jsx("span", { className: "font-medium", children: link.label }) }) }, link.href));
                                }), _jsxs("div", { className: "flex space-x-3", children: [_jsx(motion.div, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: _jsxs(Link, { to: "/login", onClick: onLogin, className: "flex items-center space-x-2 bg-white text-emerald-600 dark:bg-slate-200 dark:text-emerald-700 px-4 py-2 rounded-lg font-medium", children: [_jsx(LogIn, { className: "w-4 h-4" }), _jsx("span", { children: "\u0110\u0103ng nh\u1EADp" })] }) }), _jsx(motion.div, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: _jsxs(Link, { to: "/register", className: "hidden 2xl:flex items-center space-x-2 bg-yellow-400 text-white px-4 py-2 rounded-lg font-medium dark:bg-yellow-500 dark:hover:bg-yellow-400", children: [_jsx(BookOpen, { className: "w-4 h-4" }), _jsx("span", { children: "B\u1EAFt \u0111\u1EA7u" })] }) })] })] }), _jsxs("form", { onSubmit: handleSearch, className: "flex m-2 lg:hidden w-4/5", children: [_jsx("input", { type: "text", value: search, onChange: (e) => setSearch(e.target.value), placeholder: "T\u00ECm ki\u1EBFm...", className: "flex-1 px-3 py-2 rounded-lg border border-emerald-200 dark:border-slate-600 \r\n                           bg-white dark:bg-slate-800 \r\n                           text-black dark:text-white \r\n                           placeholder:text-gray-400 dark:placeholder:text-slate-400\r\n                           focus:outline-none focus:ring-2 focus:ring-emerald-400" }), _jsxs(motion.button, { type: "submit", whileHover: { scale: 1.05, boxShadow: "0 0 12px rgba(16,185,129,0.6)" }, whileTap: { scale: 0.95 }, transition: { type: "spring", stiffness: 300, damping: 20 }, className: "ml-2 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold shadow-md", children: [_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" }) }), "T\u00ECm"] })] }), _jsx(motion.button, { className: "lg:hidden text-white dark:text-slate-200 focus:outline-none", onClick: () => setIsOpen(!isOpen), whileTap: { scale: 0.9 }, "aria-label": "Toggle menu", children: isOpen ? _jsx(X, { className: "w-6 h-6" }) : _jsx(Menu, { className: "w-6 h-6" }) })] }), _jsx(AnimatePresence, { children: isOpen && (_jsx(motion.div, { initial: "closed", animate: "open", exit: "closed", variants: menuVariants, className: "lg:hidden overflow-hidden bg-emerald-600 dark:bg-slate-900", children: _jsxs(motion.div, { className: "pt-4 pb-2 space-y-2", variants: menuVariants, children: [_jsxs(motion.div, { variants: itemVariants, children: [_jsxs(motion.button, { className: "w-full flex justify-between items-center rounded-lg text-white dark:text-slate-200 hover:bg-emerald-700 dark:hover:bg-slate-700 py-3 px-4 transition", onClick: () => setTenantOpen(!tenantOpen), whileTap: { scale: 0.97 }, children: [_jsxs("span", { className: "flex items-center gap-2", children: [_jsx(Building2, { className: "w-4 h-4" }), _jsx("span", { children: currentTenant || "Chọn trường" })] }), _jsx(motion.span, { animate: { rotate: tenantOpen ? 180 : 0 }, transition: { duration: 0.2 }, children: _jsx(ChevronDown, { className: "w-4 h-4" }) })] }), _jsx(AnimatePresence, { children: tenantOpen && (_jsx(motion.div, { initial: "closed", animate: "open", exit: "closed", variants: menuVariants, className: "mt-2 space-y-1 bg-emerald-100 dark:bg-slate-800 border border-emerald-200 dark:border-slate-700 rounded-xl shadow-lg px-2 py-2", children: tenants.map((tenant) => (_jsx(motion.div, { variants: itemVariants, children: _jsxs("button", { onClick: () => {
                                                            onChangeTenant?.(tenant.id);
                                                            setTenantOpen(false);
                                                            setIsOpen(false);
                                                        }, className: "w-full flex items-center gap-3 py-2 px-3 text-emerald-700 dark:text-slate-200 hover:bg-emerald-200 dark:hover:bg-slate-700 rounded-lg transition text-left", children: [_jsx("span", { className: "w-2 h-2 rounded-full bg-emerald-500" }), _jsx("span", { className: "text-sm font-medium", children: tenant.name })] }) }, tenant.id))) })) })] }), navSubItems.map((item) => (_jsx(motion.div, { variants: itemVariants, children: _jsxs(Link, { to: item.to, className: `flex items-center py-3 px-4 rounded-lg ${location.pathname === item.to
                                            ? "bg-white text-emerald-600 dark:bg-slate-200 dark:text-emerald-700"
                                            : "text-white dark:text-slate-200 hover:bg-emerald-700 dark:hover:bg-slate-700"}`, onClick: () => setIsOpen(false), children: [_jsx("span", { className: "mr-3", children: item.icon }), _jsx("span", { className: "font-medium", children: item.text })] }) }, item.to))), links.map((link) => (_jsx(motion.div, { variants: itemVariants, children: _jsx(Link, { to: link.href, className: `flex items-center py-3 px-4 rounded-lg ${location.pathname.startsWith(link.href)
                                            ? "bg-white text-emerald-600 dark:bg-slate-200 dark:text-emerald-700"
                                            : "text-white dark:text-slate-200 hover:bg-emerald-700 dark:hover:bg-slate-700"}`, onClick: () => setIsOpen(false), children: _jsx("span", { className: "font-medium", children: link.label }) }) }, link.href))), _jsxs(motion.div, { className: "flex flex-col space-y-2 mt-4", variants: itemVariants, children: [_jsxs(motion.button, { onClick: () => {
                                                onLogin?.();
                                                setIsOpen(false);
                                            }, className: "flex justify-center items-center py-3 px-4 bg-white text-emerald-600 dark:bg-slate-200 dark:text-emerald-700 rounded-lg font-medium", whileHover: { x: [0, -3, 3, -2, 2, 0] }, transition: { duration: 0.5 }, children: [_jsx(LogIn, { className: "mr-2 w-4 h-4" }), _jsx("span", { children: "\u0110\u0103ng nh\u1EADp" })] }), _jsxs(motion.button, { onClick: () => {
                                                onGetStarted?.();
                                                setIsOpen(false);
                                            }, className: "flex justify-center items-center py-3 px-4 bg-yellow-400 text-white dark:bg-yellow-500 dark:hover:bg-yellow-400 rounded-lg font-medium", whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: [_jsx(BookOpen, { className: "mr-2 w-4 h-4" }), _jsx("span", { children: "B\u1EAFt \u0111\u1EA7u" })] })] })] }) })) })] }) }));
}
