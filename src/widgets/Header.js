"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Header;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var framer_motion_1 = require("framer-motion");
var quizuniverselogo_png_1 = require("@/assets/images/logo/quizuniverselogo.png");
var lucide_react_1 = require("lucide-react");
var menuVariants = {
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
var itemVariants = {
    open: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
    closed: { opacity: 0, y: -20 },
};
var bounceTransition = {
    y: {
        duration: 0.4,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeOut",
    },
};
function Header(_a) {
    var _b = _a.tenants, tenants = _b === void 0 ? [
        { id: "hcmus", name: "ĐH KHTN" },
        { id: "hust", name: "ĐH BKHN" },
        { id: "vnu", name: "ĐHQG" },
    ] : _b, _c = _a.currentTenant, currentTenant = _c === void 0 ? null : _c, onChangeTenant = _a.onChangeTenant, onGetStarted = _a.onGetStarted, onLogin = _a.onLogin, _d = _a.links, links = _d === void 0 ? [
        { label: "Câu hỏi", href: "/questions" },
        { label: "Đề thi", href: "/exams/create" },
    ] : _d;
    var location = (0, react_router_dom_1.useLocation)();
    var _e = (0, react_1.useState)(false), isOpen = _e[0], setIsOpen = _e[1];
    var _f = (0, react_1.useState)(false), tenantOpen = _f[0], setTenantOpen = _f[1];
    var controls = (0, framer_motion_1.useAnimation)();
    var _g = (0, react_1.useState)(0), tick = _g[0], setTick = _g[1];
    var _h = (0, react_1.useState)(""), search = _h[0], setSearch = _h[1];
    var handleSearch = function (e) {
        e.preventDefault();
        // TODO: Xử lý tìm kiếm, ví dụ chuyển trang hoặc gọi API
        if (search.trim()) {
            window.location.href = "/questions?search=".concat(encodeURIComponent(search));
        }
    };
    (0, react_1.useEffect)(function () {
        var id = setInterval(function () { return setTick(function (t) { return (t + 1) % 3; }); }, 2400);
        return function () { return clearInterval(id); };
    }, []);
    var navSubItems = [
        { to: "/about", icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Contact, { className: "w-4 h-4" }), text: "Giới thiệu" },
    ];
    return ((0, jsx_runtime_1.jsx)("header", { className: "w-full bg-gradient-to-r from-green-600 to-emerald-600 dark:from-slate-900 dark:to-slate-800 shadow-lg sticky top-0 z-50", children: (0, jsx_runtime_1.jsxs)("div", { className: "lg:container mx-auto px-4 py-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center", children: [(0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { animate: controls, whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, className: "flex items-center", children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-2 items-center", children: [(0, jsx_runtime_1.jsx)(framer_motion_1.motion.img, { src: quizuniverselogo_png_1.default, alt: "Logo", className: "h-12 w-12", transition: bounceTransition }), (0, jsx_runtime_1.jsx)(framer_motion_1.motion.span, { className: "text-white dark:text-slate-100 font-bold text-3xl font-mono hidden xl:block", initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.2 }, children: "QuizUniverse" })] }) }) }), (0, jsx_runtime_1.jsx)("form", { onSubmit: handleSearch, className: "hidden lg:flex flex-1 justify-center mx-8", children: (0, jsx_runtime_1.jsx)("input", { type: "text", value: search, onChange: function (e) { return setSearch(e.target.value); }, placeholder: "T\u00ECm ki\u1EBFm m\u00F4n h\u1ECDc, \u0111\u1EC1 thi..", className: "w-35 xl:w-70 2xl:w-[400px] px-4 py-2 text-black dark:text-white rounded-lg \r\n                     border border-emerald-200 dark:border-slate-600 \r\n                     bg-white dark:bg-slate-800 \r\n                     placeholder:text-gray-400 dark:placeholder:text-slate-400\r\n                     focus:outline-none focus:ring-2 focus:ring-emerald-400" }) }), (0, jsx_runtime_1.jsxs)("nav", { className: "hidden lg:flex items-center space-x-4", children: [(0, jsx_runtime_1.jsxs)(framer_motion_1.motion.div, { className: "relative", whileHover: { scale: 1.05 }, children: [(0, jsx_runtime_1.jsxs)(framer_motion_1.motion.button, { className: "flex items-center space-x-1 text-white dark:text-slate-200 p-3 rounded-lg hover:bg-green-700 dark:hover:bg-slate-700 transition-all", onClick: function () { return setTenantOpen(!tenantOpen); }, whileTap: { scale: 0.95 }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Building2, { className: "w-4 h-4" }), (0, jsx_runtime_1.jsx)("span", { className: "font-medium", children: currentTenant || "Chọn trường" }), (0, jsx_runtime_1.jsx)(framer_motion_1.motion.span, { animate: { rotate: tenantOpen ? 180 : 0 }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronDown, { className: "w-4 h-4" }) })] }), (0, jsx_runtime_1.jsx)(framer_motion_1.AnimatePresence, { children: tenantOpen && ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 20 }, transition: { type: "spring", damping: 20, stiffness: 300 }, className: "absolute left-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-xl shadow-2xl overflow-hidden z-50 border border-emerald-100 dark:border-slate-700", children: (0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { className: "divide-y divide-emerald-50 dark:divide-slate-700", initial: "hidden", animate: "visible", variants: {
                                                        visible: { transition: { staggerChildren: 0.05 } },
                                                    }, children: tenants.map(function (tenant) { return ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { variants: {
                                                            hidden: { opacity: 0, x: -20 },
                                                            visible: { opacity: 1, x: 0 },
                                                        }, children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { to: "#", onClick: function (e) {
                                                                e.preventDefault();
                                                                onChangeTenant === null || onChangeTenant === void 0 ? void 0 : onChangeTenant(tenant.id);
                                                                setTenantOpen(false);
                                                            }, className: "flex items-center px-4 py-3 text-gray-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-800 transition-all group", children: [(0, jsx_runtime_1.jsx)(framer_motion_1.motion.span, { className: "mr-3 text-lg group-hover:scale-110 transition-transform", whileHover: { scale: 1.2 }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.Building2, { className: "text-emerald-500" }) }), (0, jsx_runtime_1.jsx)("span", { className: "group-hover:font-medium group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-all", children: tenant.name }), (0, jsx_runtime_1.jsx)(framer_motion_1.motion.span, { className: "ml-auto opacity-0 group-hover:opacity-100 text-emerald-500", initial: { x: -10 }, animate: { x: 0 }, transition: { delay: 0.1 }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronRight, { className: "w-3 h-3" }) })] }) }, tenant.id)); }) }) })) })] }), navSubItems.map(function (item) {
                                    var active = location.pathname === item.to;
                                    return ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { to: item.to, className: "flex items-center space-x-2 p-3 rounded-lg transition-all ".concat(active
                                                ? "bg-white text-emerald-600 dark:bg-slate-200 dark:text-emerald-700"
                                                : "text-white dark:text-slate-200 hover:bg-green-700 dark:hover:bg-slate-700"), children: [(0, jsx_runtime_1.jsx)("span", { className: "text-lg", children: item.icon }), (0, jsx_runtime_1.jsx)("span", { className: "font-medium", children: item.text })] }) }, item.to));
                                }), links.map(function (link) {
                                    var active = location.pathname.startsWith(link.href);
                                    return ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: link.href, className: "flex items-center space-x-2 p-3 rounded-lg transition-all ".concat(active
                                                ? "bg-white text-emerald-600 dark:bg-slate-200 dark:text-emerald-700"
                                                : "text-white dark:text-slate-200 hover:bg-green-700 dark:hover:bg-slate-700"), children: (0, jsx_runtime_1.jsx)("span", { className: "font-medium", children: link.label }) }) }, link.href));
                                }), (0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-3", children: [(0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { to: "/login", onClick: onLogin, className: "flex items-center space-x-2 bg-white text-emerald-600 dark:bg-slate-200 dark:text-emerald-700 px-4 py-2 rounded-lg font-medium", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.LogIn, { className: "w-4 h-4" }), (0, jsx_runtime_1.jsx)("span", { children: "\u0110\u0103ng nh\u1EADp" })] }) }), (0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { to: "/register", className: "hidden 2xl:flex items-center space-x-2 bg-yellow-400 text-white px-4 py-2 rounded-lg font-medium dark:bg-yellow-500 dark:hover:bg-yellow-400", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.BookOpen, { className: "w-4 h-4" }), (0, jsx_runtime_1.jsx)("span", { children: "B\u1EAFt \u0111\u1EA7u" })] }) })] })] }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSearch, className: "flex m-2 lg:hidden w-4/5", children: [(0, jsx_runtime_1.jsx)("input", { type: "text", value: search, onChange: function (e) { return setSearch(e.target.value); }, placeholder: "T\u00ECm ki\u1EBFm...", className: "flex-1 px-3 py-2 rounded-lg border border-emerald-200 dark:border-slate-600 \r\n                           bg-white dark:bg-slate-800 \r\n                           text-black dark:text-white \r\n                           placeholder:text-gray-400 dark:placeholder:text-slate-400\r\n                           focus:outline-none focus:ring-2 focus:ring-emerald-400" }), (0, jsx_runtime_1.jsxs)(framer_motion_1.motion.button, { type: "submit", whileHover: { scale: 1.05, boxShadow: "0 0 12px rgba(16,185,129,0.6)" }, whileTap: { scale: 0.95 }, transition: { type: "spring", stiffness: 300, damping: 20 }, className: "ml-2 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold shadow-md", children: [(0, jsx_runtime_1.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" }) }), "T\u00ECm"] })] }), (0, jsx_runtime_1.jsx)(framer_motion_1.motion.button, { className: "lg:hidden text-white dark:text-slate-200 focus:outline-none", onClick: function () { return setIsOpen(!isOpen); }, whileTap: { scale: 0.9 }, "aria-label": "Toggle menu", children: isOpen ? (0, jsx_runtime_1.jsx)(lucide_react_1.X, { className: "w-6 h-6" }) : (0, jsx_runtime_1.jsx)(lucide_react_1.Menu, { className: "w-6 h-6" }) })] }), (0, jsx_runtime_1.jsx)(framer_motion_1.AnimatePresence, { children: isOpen && ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { initial: "closed", animate: "open", exit: "closed", variants: menuVariants, className: "lg:hidden overflow-hidden bg-emerald-600 dark:bg-slate-900", children: (0, jsx_runtime_1.jsxs)(framer_motion_1.motion.div, { className: "pt-4 pb-2 space-y-2", variants: menuVariants, children: [(0, jsx_runtime_1.jsxs)(framer_motion_1.motion.div, { variants: itemVariants, children: [(0, jsx_runtime_1.jsxs)(framer_motion_1.motion.button, { className: "w-full flex justify-between items-center rounded-lg text-white dark:text-slate-200 hover:bg-emerald-700 dark:hover:bg-slate-700 py-3 px-4 transition", onClick: function () { return setTenantOpen(!tenantOpen); }, whileTap: { scale: 0.97 }, children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Building2, { className: "w-4 h-4" }), (0, jsx_runtime_1.jsx)("span", { children: currentTenant || "Chọn trường" })] }), (0, jsx_runtime_1.jsx)(framer_motion_1.motion.span, { animate: { rotate: tenantOpen ? 180 : 0 }, transition: { duration: 0.2 }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronDown, { className: "w-4 h-4" }) })] }), (0, jsx_runtime_1.jsx)(framer_motion_1.AnimatePresence, { children: tenantOpen && ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { initial: "closed", animate: "open", exit: "closed", variants: menuVariants, className: "mt-2 space-y-1 bg-emerald-100 dark:bg-slate-800 border border-emerald-200 dark:border-slate-700 rounded-xl shadow-lg px-2 py-2", children: tenants.map(function (tenant) { return ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { variants: itemVariants, children: (0, jsx_runtime_1.jsxs)("button", { onClick: function () {
                                                            onChangeTenant === null || onChangeTenant === void 0 ? void 0 : onChangeTenant(tenant.id);
                                                            setTenantOpen(false);
                                                            setIsOpen(false);
                                                        }, className: "w-full flex items-center gap-3 py-2 px-3 text-emerald-700 dark:text-slate-200 hover:bg-emerald-200 dark:hover:bg-slate-700 rounded-lg transition text-left", children: [(0, jsx_runtime_1.jsx)("span", { className: "w-2 h-2 rounded-full bg-emerald-500" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-medium", children: tenant.name })] }) }, tenant.id)); }) })) })] }), navSubItems.map(function (item) { return ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { variants: itemVariants, children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { to: item.to, className: "flex items-center py-3 px-4 rounded-lg ".concat(location.pathname === item.to
                                            ? "bg-white text-emerald-600 dark:bg-slate-200 dark:text-emerald-700"
                                            : "text-white dark:text-slate-200 hover:bg-emerald-700 dark:hover:bg-slate-700"), onClick: function () { return setIsOpen(false); }, children: [(0, jsx_runtime_1.jsx)("span", { className: "mr-3", children: item.icon }), (0, jsx_runtime_1.jsx)("span", { className: "font-medium", children: item.text })] }) }, item.to)); }), links.map(function (link) { return ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { variants: itemVariants, children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: link.href, className: "flex items-center py-3 px-4 rounded-lg ".concat(location.pathname.startsWith(link.href)
                                            ? "bg-white text-emerald-600 dark:bg-slate-200 dark:text-emerald-700"
                                            : "text-white dark:text-slate-200 hover:bg-emerald-700 dark:hover:bg-slate-700"), onClick: function () { return setIsOpen(false); }, children: (0, jsx_runtime_1.jsx)("span", { className: "font-medium", children: link.label }) }) }, link.href)); }), (0, jsx_runtime_1.jsxs)(framer_motion_1.motion.div, { className: "flex flex-col space-y-2 mt-4", variants: itemVariants, children: [(0, jsx_runtime_1.jsxs)(framer_motion_1.motion.button, { onClick: function () {
                                                onLogin === null || onLogin === void 0 ? void 0 : onLogin();
                                                setIsOpen(false);
                                            }, className: "flex justify-center items-center py-3 px-4 bg-white text-emerald-600 dark:bg-slate-200 dark:text-emerald-700 rounded-lg font-medium", whileHover: { x: [0, -3, 3, -2, 2, 0] }, transition: { duration: 0.5 }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.LogIn, { className: "mr-2 w-4 h-4" }), (0, jsx_runtime_1.jsx)("span", { children: "\u0110\u0103ng nh\u1EADp" })] }), (0, jsx_runtime_1.jsxs)(framer_motion_1.motion.button, { onClick: function () {
                                                onGetStarted === null || onGetStarted === void 0 ? void 0 : onGetStarted();
                                                setIsOpen(false);
                                            }, className: "flex justify-center items-center py-3 px-4 bg-yellow-400 text-white dark:bg-yellow-500 dark:hover:bg-yellow-400 rounded-lg font-medium", whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.BookOpen, { className: "mr-2 w-4 h-4" }), (0, jsx_runtime_1.jsx)("span", { children: "B\u1EAFt \u0111\u1EA7u" })] })] })] }) })) })] }) }));
}
