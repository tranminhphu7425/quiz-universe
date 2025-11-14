import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  FolderOpen,
  Star,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

const menuItems = [
  { name: "Tổng quan", icon: LayoutDashboard, path: "/admin" },
  { name: "Người dùng", icon: Users, path: "/admin/users" },
  { name: "Môn học", icon: BookOpen, path: "/admin/subjects" },
  { name: "Tài nguyên", icon: FolderOpen, path: "/admin/resources" },
  { name: "Yêu thích", icon: Star, path: "/admin/favorites" },
  { name: "Thống kê", icon: BarChart3, path: "/admin/statistics" },
  { name: "Cài đặt", icon: Settings, path: "/admin/settings" },
];

export default function DashboardAdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div
      className={clsx(
        "flex flex-col h-screen border-r transition-all duration-300",
        "bg-white/90 dark:bg-slate-900/90 border-slate-200 dark:border-slate-700",
        collapsed ? "w-16" : "w-56"
      )}
    >
      {/* Header logo + toggle */}
      <div className="flex items-center justify-between px-4 py-3">
        <div
          className={clsx(
            "font-semibold text-emerald-600 dark:text-emerald-400 text-lg transition-opacity",
            collapsed && "opacity-0 pointer-events-none"
          )}
        >
          Trang quản trị
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={` p-1.5 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-800/40 text-slate-600 dark:text-slate-200  ${collapsed ? 'absolute left-2   ' : ''} `}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Menu items */}
      <nav className="flex-1 mt-2 space-y-1">
        {menuItems.map(({ name, icon: Icon, path }) => {
          const active = location.pathname === path;
          return (
            <Link
              key={name}
              to={path}
              className={clsx(
                "group flex items-center gap-3 px-3 py-2 rounded-xl transition-colors duration-200 mx-2",
                active
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-800/30 dark:text-emerald-300"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60"
              )}
            >
              <Icon size={18} className="shrink-0" />
              {!collapsed && (
                <span className="text-sm font-medium">{name}</span>
              )}

              {/* Tooltip khi thu gọn */}
              {collapsed && (
                <div className="absolute left-14 z-10 hidden group-hover:block">
                  <div className="rounded-lg bg-slate-800 text-white text-xs px-2 py-1 shadow-md whitespace-nowrap">
                    {name}
                  </div>
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-200 dark:border-slate-700 mt-auto p-2">
        <button
          className={clsx(
            "flex items-center w-full gap-3 px-3 py-2 rounded-xl text-sm transition-colors",
            "text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-800/30",
            collapsed && "justify-center"
          )}
        >
          <LogOut size={18} />
          {!collapsed && <span>Đăng xuất</span>}
        </button>
      </div>
    </div>
  );
}
