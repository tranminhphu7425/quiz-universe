import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  MdPersonOutline as User,
  MdMailOutline as Mail,
  MdLockOutline as Lock,
  MdGppGood as ShieldCheck,
  MdPublic as Globe,
  MdAccessTime as Clock,
  MdDescription as FileText,
  MdVisibility as Eye,
  MdNotifications as Bell,
  MdFlashOn as Zap,
  MdCookie as Cookie,
  MdDeleteOutline as Trash2,
  MdSmartphone as Smartphone,
  MdSync as RefreshCw,
  MdPalette as Palette,
  MdVolumeUp as Volume2,
  MdCenterFocusStrong as Focus,
  MdVpnKey as KeyRound,
  MdLogout as LogOut,
  MdSave as Save,
  MdVisibilityOff as EyeOff
} from 'react-icons/md';
import React from "react";
import { useAuth } from "@/app/providers/AuthProvider";
import { EducationApi } from "@/shared/api/major-universityApi";
import { Major } from "@/shared/types/major";
import { University } from "@/shared/types/university";
import { Combobox } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { UserApi } from "@/shared/api/userApi";
import { toast } from "react-hot-toast";


/**
 * SettingsPage – Trang Cài đặt toàn diện cho QuizUniverse
 * Bao gồm: Account, Quiz Preferences, Notifications, Privacy & Data, System
 */

export default function SettingsPage() {
  // States (mock)
  const [twoFA, setTwoFA] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [countdown, setCountdown] = useState(true);
  const [perPage, setPerPage] = useState("5");
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifyApp, setNotifyApp] = useState(true);
  const [alertLogin, setAlertLogin] = useState(true);
  const [hideInfo, setHideInfo] = useState(false);
  const [allowCookies, setAllowCookies] = useState(true);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean | null>(null);
  const [focusMode, setFocusMode] = useState<boolean | null>(null);
  const { user, updateUser, logout, ...auth } = useAuth();
  const [fullName, setFullName] = useState(user?.name ?? "");
  const [username, setUsername] = useState(user?.username ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [universities, setUniversities] = useState<University[]>([]);
  const [university, setUniversity] = useState<University | null>(user?.university ?? null);
  const [majors, setMajors] = useState<Major[]>([]);
  const [major, setMajor] = useState<Major | null>(user?.major ?? null);
  const [, setLoading] = useState(true);
  const [majorQuery, setMajorQuery] = useState("");
  const [universityQuery, setUniversityQuery] = useState("");
  const navigate = useNavigate();
  const [isSavingProfile, setIsSavingProfile] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  });


  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);


  useEffect(() => {
    async function loadUniversitiesAndMajors() {
      try {
        const [unis, majors] = await Promise.all([
          EducationApi.getUniversities(),
          EducationApi.getMajors(),
        ]);
        setUniversities(unis);
        setMajors(majors);
        console.log(unis);
        console.log(majors);

      } finally {
        setLoading(false);
      }
    }
    loadUniversitiesAndMajors();
  }, []);

  function removeVietnameseTones(str: string) {
    return str
      .normalize("NFD")                // tách dấu khỏi ký tự
      .replace(/[\u0300-\u036f]/g, "") // xoá toàn bộ dấu
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  }

  async function handleSaveProfile() {
    try {
      setLoading(true);
      setIsSavingProfile(true);
      const payload = {

        name: fullName,
        username,
        email,
        phone,
        university: university,
        major: major



      };
      console.log(payload);
      const updatedUser = await UserApi.updateUserProfile(payload);

      toast.success("Thông tin đã được lưu thành công!", {
        duration: 4000,
        style: {
          background: '#10b981',
          color: '#fff',
        },
        icon: (
          <div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center">
            <svg className="h-3 w-3 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        ),
      });
      updateUser(updatedUser);

    } catch {
      toast.error("Không thể lưu thông tin", {
        duration: 4000,
      });
    }
    finally {
      setLoading(false);
      setIsSavingProfile(false);
    }
  }

  async function handleChangePassword() {

     if (formData.newPassword !== formData.confirmNewPassword){
      toast.error("Mật khẩu mới và xác nhận mật khẩu không khớp", {
        duration: 4000,
      });
      return;
    }

    try {
      await auth.changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      });
      toast.success("Mật khẩu đã được thay đổi thành công!", {
        duration: 4000,
        style: {
          background: '#10b981',
          color: '#fff',
        },
        icon: (
          <div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center">
            <svg className="h-3 w-3 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        ),
      });
    } catch {
      toast.error("Không thể thay đổi mật khẩu", {
        duration: 4000,
      });
    }



  }

  const universityFiltered =
    universityQuery === ""
      ? universities
      : universities.filter((u) =>
        removeVietnameseTones(
          (u.universityCode + " " + u.universityName).toLowerCase()
        ).includes(removeVietnameseTones(universityQuery.toLowerCase()))
      );
  const majorFiltered =
    majorQuery === ""
      ? majors
      : (Array.isArray(majors) ? majors : []).filter((u) =>
        removeVietnameseTones(u.majorName.toLowerCase()).includes(
          removeVietnameseTones(majorQuery.toLowerCase())
        )
      );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 px-6 py-10">
      <h1 className="max-w-7xl mx-auto mb-8 text-3xl font-black text-emerald-700 dark:text-emerald-300">
        ⚙️ Cài đặt
      </h1>



      <div
        className={`max-w-7xl mx-auto grid grid-cols-1 gap-8
    ${activeSection ? "lg:grid-cols-1 xl:grid-cols-1" : "lg:grid-cols-2 xl:grid-cols-3"}`}
      >

        {/* 1. Account */}
        {(!activeSection || activeSection === "account") && (
          <Section
            id="account" // 👈 thêm id cho Section
            title="Tài khoản (Account)"
            icon={<User className="h-5 w-5" />}
            setActiveSection={setActiveSection}
            activeSection={activeSection}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          >
            <Item id="profile" icon={<Mail />} title="Thông tin cá nhân">
              Tên, email, ảnh đại diện.


            </Item>

            <div className="ml-5">
              {/* Khi mở chi tiết */}
              {activeSection === "account" && activeItem === "profile" && (
                <div className="mt-4 rounded-xl border border-slate-200 bg-white p-6 shadow-md dark:border-slate-700 dark:bg-slate-900">
                  <h3 className="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-100">
                    Cập nhật thông tin cá nhân
                  </h3>

                  <div className="space-y-5">
                    {/* Avatar */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Ảnh đại diện
                      </label>
                      <div className="flex items-center gap-4">
                        <img
                          src="https://via.placeholder.com/64"
                          alt="Avatar"
                          className="h-16 w-16 rounded-full object-cover ring-2 ring-emerald-400"
                        />
                        <input
                          title="file"
                          type="file"
                          accept="image/*"
                          className="text-sm text-slate-600 file:mr-4 file:rounded-md file:border-0 file:bg-emerald-600 file:px-3 file:py-1 file:text-sm file:font-medium file:text-white hover:file:bg-emerald-700 dark:text-slate-400"
                        />
                      </div>
                    </div>

                    {/* Họ và tên */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Họ và tên
                      </label>
                      <input
                        title="text"
                        type="text"

                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                      />
                    </div>

                    {/* Username */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Username
                      </label>
                      <input
                        title="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Email
                      </label>
                      <input
                        title="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                      />
                    </div>

                    {/* Số điện thoại */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Số điện thoại
                      </label>
                      <input
                        title="tel"
                        type="tel"
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                        placeholder="0123 456 789"
                        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                      />
                    </div>

                    {/* Trường đang học */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Trường đang học
                      </label>
                      <Combobox value={university} onChange={setUniversity}>
                        <div className="relative">
                          <Combobox.Input
                            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 
                       text-sm text-slate-800 shadow-sm 
                       focus:border-emerald-500 focus:ring-2 focus:ring-emerald-400 
                       dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                            displayValue={(u: any) => (u?.universityCode + " - " + u?.universityName)}
                            onChange={(e) => setUniversityQuery(e.target.value)}
                            placeholder="Chọn hoặc nhập tên trường"
                          />
                          {universityFiltered.length > 0 && (
                            <Combobox.Options
                              className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border 
                         border-slate-200 bg-white py-1 shadow-lg 
                         dark:border-slate-700 dark:bg-slate-900"
                            >
                              {universityFiltered.map((u) => (
                                <Combobox.Option
                                  key={u.universityCode}
                                  value={u}
                                  className={({ active }) =>
                                    `cursor-pointer select-none px-3 py-2 text-sm ${active
                                      ? "bg-emerald-600 text-white"
                                      : "text-slate-800 dark:text-slate-100"
                                    }`
                                  }
                                >
                                  {u.universityName}
                                </Combobox.Option>
                              ))}
                            </Combobox.Options>
                          )}
                        </div>
                      </Combobox>
                    </div>
                    {/* Ngành đang học */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Ngành đang học
                      </label>
                      <Combobox value={major} onChange={setMajor}>
                        <div className="relative">
                          <Combobox.Input
                            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 
                       text-sm text-slate-800 shadow-sm 
                       focus:border-emerald-500 focus:ring-2 focus:ring-emerald-400 
                       dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                            displayValue={(u: any) => (u?.majorName)}
                            onChange={(e) => setMajorQuery(e.target.value)}
                            placeholder="Chọn hoặc nhập tên ngành"
                          />
                          {majorFiltered.length > 0 && (
                            <Combobox.Options
                              className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border 
                         border-slate-200 bg-white py-1 shadow-lg 
                         dark:border-slate-700 dark:bg-slate-900"
                            >
                              {majorFiltered.map((u) => (
                                <Combobox.Option
                                  key={u.majorId}
                                  value={u}
                                  className={({ active }) =>
                                    `cursor-pointer select-none px-3 py-2 text-sm ${active
                                      ? "bg-emerald-600 text-white"
                                      : "text-slate-800 dark:text-slate-100"
                                    }`
                                  }
                                >
                                  {u.majorName}
                                </Combobox.Option>
                              ))}
                            </Combobox.Options>
                          )}
                        </div>
                      </Combobox>
                    </div>
                    {/* Nút lưu thay đổi */}
                    <div className="flex justify-end pt-4">
                      <button
                        onClick={handleSaveProfile}
                        disabled={isSavingProfile} // Thêm state isSaving nếu cần
                        className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
                      >
                        {isSavingProfile ? (
                          <>
                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Đang lưu...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4" />
                            Lưu thay đổi
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Item id="password" icon={<Lock />} title="Đổi mật khẩu">
              <button className="text-sm">Thay đổi mật khẩu</button>
            </Item>

            <div className="ml-5">
              {/* Khi mở chi tiết */}
              {activeSection === "account" && activeItem === "password" && (
                <div className="mt-4 rounded-xl border border-slate-200 bg-white p-6 shadow-md dark:border-slate-700 dark:bg-slate-900">
                  <h3 className="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-100">
                    Thay đổi mật khẩu
                  </h3>

                  <div className="space-y-5">
                    {/* Mật khẩu hiện tại */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Mật khẩu hiện tại
                      </label>
                      <div className="mb-2 flex items-center gap-2 rounded-xl bg-white/80 px-3 py-2 
                      ring-1 ring-black/10 focus-within:ring-2 focus-within:ring-emerald-400 
                      dark:bg-slate-900/70 dark:ring-white/10">
                        <input
                          type = {showCurrentPassword ? "text" : "password"}
                          value={formData.currentPassword}
                          placeholder="••••••••"
                          onChange={(e) =>
                            setFormData({ ...formData, currentPassword: e.target.value })
                          }
                          className="w-full bg-transparent p-2 text-sm text-gray-800 placeholder:text-gray-500 
                     focus:outline-none dark:text-gray-100 dark:placeholder:text-gray-400"  />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="p-1 text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-300"
                        >
                          {showCurrentPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Mật khẩu mới */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Mật khẩu mới
                      </label>
                      <div className="mb-2 flex items-center gap-2 rounded-xl bg-white/80 px-3 py-2 
                      ring-1 ring-black/10 focus-within:ring-2 focus-within:ring-emerald-400 
                      dark:bg-slate-900/70 dark:ring-white/10">
                        <input
                          type={showNewPassword ? "text" : "password"}

                          placeholder="••••••••"
                          value={formData.newPassword}
                          onChange={(e) =>
                            setFormData({ ...formData, newPassword: e.target.value })
                          }
                          className="w-full bg-transparent p-2 text-sm text-gray-800 placeholder:text-gray-500 
                     focus:outline-none dark:text-gray-100 dark:placeholder:text-gray-400"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="p-1 text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-300"
                        >
                          {showNewPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Xác nhận mật khẩu mới */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Xác nhận mật khẩu mới
                      </label>
                      <div className="mb-2 flex items-center gap-2 rounded-xl bg-white/80 px-3 py-2 
                      ring-1 ring-black/10 focus-within:ring-2 focus-within:ring-emerald-400 
                      dark:bg-slate-900/70 dark:ring-white/10">
                        <input
                          type={showConfirmNewPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={formData.confirmNewPassword}
                          onChange={(e) =>
                            setFormData({ ...formData, confirmNewPassword: e.target.value })
                          }
                          className="w-full bg-transparent p-2 text-sm text-gray-800 placeholder:text-gray-500 
                     focus:outline-none dark:text-gray-100 dark:placeholder:text-gray-400"    />
                        <button
                          type="button"
                          onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                          className="p-1 text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-300"
                        >
                          {showConfirmNewPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Nút lưu */}
                    <div className="flex justify-end">
                      <button onClick={handleChangePassword}
                        className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400">
                        Cập nhật mật khẩu
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Item id="security" icon={<ShieldCheck />} title="Bảo mật">
              <span className="text-sm text-slate-600 dark:text-slate-400">
                Quản lý xác thực 2 lớp
              </span>
            </Item>

            <div className="ml-5">
              {activeSection === "account" && activeItem === "security" && (
                <div className="mt-4 rounded-xl border border-slate-200 bg-white p-6 shadow-md dark:border-slate-700 dark:bg-slate-900">
                  <h3 className="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-100">
                    Bảo mật tài khoản
                  </h3>

                  <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800/50">
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Xác thực hai lớp (2FA)
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Yêu cầu mã OTP khi đăng nhập để tăng cường bảo mật.
                      </p>
                    </div>

                    {/* Toggle switch */}
                    <button
                      onClick={() => setTwoFA(!twoFA)}
                      className={`${twoFA ? "bg-emerald-600" : "bg-slate-300 dark:bg-slate-600"
                        } relative inline-flex h-6 w-11 items-center rounded-full transition`}
                    >
                      <span
                        className={`${twoFA ? "translate-x-6" : "translate-x-1"
                          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                      />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <Item id="locale" icon={<Globe />} title="Ngôn ngữ & Múi giờ">
              <span className="text-sm text-slate-600 dark:text-slate-400">
                Tùy chỉnh ngôn ngữ và múi giờ
              </span>
            </Item>

            <div className="ml-5">
              {activeSection === "account" && activeItem === "locale" && (
                <div className="mt-4 rounded-xl border border-slate-200 bg-white p-6 shadow-md dark:border-slate-700 dark:bg-slate-900">
                  <h3 className="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-100">
                    Ngôn ngữ & Múi giờ
                  </h3>

                  <div className="space-y-5">
                    {/* Ngôn ngữ */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Ngôn ngữ hiển thị
                      </label>
                      <select
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                        defaultValue="vi"
                      >
                        <option value="vi">Tiếng Việt</option>
                        <option value="en">English</option>
                      </select>
                    </div>

                    {/* Múi giờ */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Múi giờ
                      </label>
                      <select
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                        defaultValue="GMT+7"
                      >
                        <option value="GMT+7">(GMT+7) Asia/Ho_Chi_Minh</option>
                        <option value="GMT+8">(GMT+8) Asia/Singapore</option>
                        <option value="GMT+9">(GMT+9) Asia/Tokyo</option>
                        <option value="GMT+0">(GMT+0) UTC</option>
                      </select>
                    </div>

                    {/* Nút lưu */}
                    <div className="flex justify-end">
                      <button className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400">
                        Lưu thay đổi
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Item id="logout" icon={<LogOut />} title="Đăng xuất">
              <span className="text-sm text-slate-600 dark:text-slate-400">
                Thoát khỏi tài khoản của bạn
              </span>
            </Item>

            <div className="ml-5">
              {activeSection === "account" && activeItem === "logout" && (
                <div className="mt-4 rounded-xl border border-slate-200 bg-white p-6 shadow-md dark:border-slate-700 dark:bg-slate-900">
                  <h3 className="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-100">
                    Đăng xuất
                  </h3>

                  <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
                    Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?
                  </p>

                  <div className="flex justify-end gap-3">
                    <button
                      className="rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium text-slate-800 shadow hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
                      onClick={() => setActiveItem(null)}
                    >
                      Hủy
                    </button>
                    <button
                      className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                      onClick={async () => {
                        await logout();
                        navigate("/login");
                      }} // 👈 gọi hàm logout từ AuthContext
                    >
                      Đăng xuất
                    </button>
                  </div>
                </div>
              )}
            </div>


          </Section>
        )}



        {/* 2. Quiz Preferences */}
        {(!activeSection || activeSection === "quiz") && (
          <Section
            id="quiz" // 👈 thêm id cho Section
            title="Làm bài & Hiển thị"
            icon={<Clock className="h-5 w-5" />}
            setActiveSection={setActiveSection}
            activeSection={activeSection}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          >
            <Item id="timer" icon={<Clock />} title="Thời gian">
              <span className="text-sm text-slate-600 dark:text-slate-400">
                Quản lý hiển thị đồng hồ
              </span>
            </Item>

            <div className="ml-5">
              {activeSection === "quiz" && activeItem === "timer" && (
                <div className="mt-4 rounded-xl border border-slate-200 bg-white p-6 shadow-md dark:border-slate-700 dark:bg-slate-900">
                  <h3 className="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-100">
                    Cài đặt thời gian
                  </h3>

                  <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800/50">
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Hiển thị đồng hồ đếm ngược
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Bật để xem bộ đếm ngược trong khi làm bài kiểm tra.
                      </p>
                    </div>

                    {/* Toggle switch */}
                    <button
                      onClick={() => setCountdown(!countdown)}
                      className={`${countdown ? "bg-emerald-600" : "bg-slate-300 dark:bg-slate-600"
                        } relative inline-flex h-6 w-11 items-center rounded-full transition`}
                    >
                      <span
                        className={`${countdown ? "translate-x-6" : "translate-x-1"
                          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                      />
                    </button>
                  </div>
                </div>
              )}
            </div>


            <Item id="perPage" icon={<FileText />} title="Số câu trên một trang">
              <span className="text-sm text-slate-600 dark:text-slate-400">
                Tùy chỉnh số câu hiển thị
              </span>
            </Item>

            <div className="ml-5">
              {activeSection === "quiz" && activeItem === "perPage" && (
                <div className="mt-4 rounded-xl border border-slate-200 bg-white p-6 shadow-md dark:border-slate-700 dark:bg-slate-900">
                  <h3 className="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-100">
                    Số câu hỏi trên mỗi trang
                  </h3>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Chọn số câu hiển thị
                      </label>
                      <select title="Chọn số câu hiển thị"
                        value={perPage}
                        onChange={(e) => setPerPage(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                      >
                        <option value="1">1 câu / trang</option>
                        <option value="5">5 câu / trang</option>
                        <option value="10">10 câu / trang</option>
                        <option value="all">Tất cả</option>
                      </select>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        Bạn có thể thay đổi số câu hiển thị khi làm bài kiểm tra.
                      </p>
                    </div>

                    {/* Nút lưu */}
                    <div className="flex justify-end">
                      <button className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400">
                        Lưu thay đổi
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Item id="theme" icon={<Palette />} title="Giao diện">
              <span className="text-sm text-slate-600 dark:text-slate-400">
                Tuỳ chỉnh chế độ hiển thị
              </span>
            </Item>

            <div className="ml-5">
              {activeSection === "quiz" && activeItem === "theme" && (
                <div className="mt-4 rounded-xl border border-slate-200 bg-white p-6 shadow-md dark:border-slate-700 dark:bg-slate-900">
                  <h3 className="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-100">
                    Cài đặt giao diện
                  </h3>

                  <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800/50">
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Chế độ tối (Dark mode)
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Giúp giảm mỏi mắt và tiết kiệm pin trên thiết bị OLED.
                      </p>
                    </div>

                    {/* Toggle switch */}
                    <button
                      onClick={() => setDarkMode(!darkMode)}
                      className={`${darkMode ? "bg-emerald-600" : "bg-slate-300 dark:bg-slate-600"
                        } relative inline-flex h-6 w-11 items-center rounded-full transition`}
                    >
                      <span
                        className={`${darkMode ? "translate-x-6" : "translate-x-1"
                          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                      />
                    </button>
                  </div>
                </div>
              )}
            </div>


            <Item id="sound" icon={<Volume2 />} title="Âm thanh thông báo">
              <span className="text-sm text-slate-600 dark:text-slate-400">
                Quản lý thông báo bằng âm thanh
              </span>
            </Item>

            <div className="ml-5">
              {activeSection === "quiz" && activeItem === "sound" && (
                <div className="mt-4 rounded-xl border border-slate-200 bg-white p-6 shadow-md dark:border-slate-700 dark:bg-slate-900">
                  <h3 className="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-100">
                    Âm thanh thông báo
                  </h3>

                  {/* Toggle bật/tắt âm thanh */}
                  <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800/50">
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Bật âm thanh khi hết giờ / nộp bài
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Cảnh báo bằng âm thanh để bạn không bỏ lỡ thời gian quan trọng.
                      </p>
                    </div>

                    {/* Toggle switch */}
                    <button
                      onClick={() => setSoundEnabled(!soundEnabled)}
                      className={`${soundEnabled ? "bg-emerald-600" : "bg-slate-300 dark:bg-slate-600"
                        } relative inline-flex h-6 w-11 items-center rounded-full transition`}
                    >
                      <span
                        className={`${soundEnabled ? "translate-x-6" : "translate-x-1"
                          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                      />
                    </button>
                  </div>

                  {/* Chọn loại âm thanh (tuỳ chọn) */}
                  {soundEnabled && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Loại âm thanh
                      </label>
                      <select
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                        defaultValue="ding"
                      >
                        <option value="ding">Ding (nhẹ nhàng)</option>
                        <option value="alert">Alert (cảnh báo)</option>
                        <option value="bell">Bell (chuông)</option>
                      </select>
                    </div>
                  )}
                </div>
              )}
            </div>


            <Item id="focusMode" icon={<Focus />} title="Chế độ tập trung">
              <span className="text-sm text-slate-600 dark:text-slate-400">
                Tùy chỉnh trải nghiệm khi làm bài
              </span>
            </Item>

            <div className="ml-5">
              {activeSection === "quiz" && activeItem === "focusMode" && (
                <div className="mt-4 rounded-xl border border-slate-200 bg-white p-6 shadow-md dark:border-slate-700 dark:bg-slate-900">
                  <h3 className="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-100">
                    Chế độ tập trung
                  </h3>

                  <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800/50">
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Ẩn thanh điều hướng khi làm bài
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Bật chế độ tập trung để loại bỏ xao nhãng và chỉ hiển thị nội dung bài kiểm tra.
                      </p>
                    </div>

                    {/* Toggle switch */}
                    <button
                      onClick={() => setFocusMode(!focusMode)}
                      className={`${focusMode ? "bg-emerald-600" : "bg-slate-300 dark:bg-slate-600"
                        } relative inline-flex h-6 w-11 items-center rounded-full transition`}
                    >
                      <span
                        className={`${focusMode ? "translate-x-6" : "translate-x-1"
                          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                      />
                    </button>
                  </div>
                </div>
              )}
            </div>

          </Section>
        )}


        {/* 3. Notifications */}
        {(!activeSection || activeSection === "notify") && (
          <Section
            id="notify" // 👈 id cho Section
            title="Thông báo"
            icon={<Bell className="h-5 w-5" />}
            setActiveSection={setActiveSection}
            activeSection={activeSection}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          >
            {/* Email/SMS Notify */}
            <Item id="emailNotify" icon={<Mail />} title="Email/SMS">
              <span className="text-sm text-slate-600 dark:text-slate-400">
                Nhận thông báo qua email hoặc SMS
              </span>
            </Item>
            <div className="ml-5">
              {activeSection === "notify" && activeItem === "emailNotify" && (
                <div className="mt-4 rounded-xl border border-slate-200 bg-white p-6 shadow-md dark:border-slate-700 dark:bg-slate-900">
                  <h3 className="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-100">
                    Thông báo qua Email / SMS
                  </h3>

                  <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800/50">
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Nhận kết quả, báo cáo điểm, lịch thi
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Bạn sẽ được gửi thông tin chi tiết qua email/SMS khi có cập nhật quan trọng.
                      </p>
                    </div>

                    {/* Toggle switch */}
                    <button
                      onClick={() => setNotifyEmail(!notifyEmail)}
                      className={`${notifyEmail ? "bg-emerald-600" : "bg-slate-300 dark:bg-slate-600"
                        } relative inline-flex h-6 w-11 items-center rounded-full transition`}
                    >
                      <span
                        className={`${notifyEmail ? "translate-x-6" : "translate-x-1"
                          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                      />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* App Notify */}
            <Item id="appNotify" icon={<Bell />} title="Thông báo trong ứng dụng">
              <span className="text-sm text-slate-600 dark:text-slate-400">
                Nhận thông báo ngay trong ứng dụng
              </span>
            </Item>
            <div className="ml-5">
              {activeSection === "notify" && activeItem === "appNotify" && (
                <div className="mt-4 rounded-xl border border-slate-200 bg-white p-6 shadow-md dark:border-slate-700 dark:bg-slate-900">
                  <h3 className="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-100">
                    Thông báo trong ứng dụng
                  </h3>

                  <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800/50">
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Khi có bài kiểm tra mới, giáo viên đăng câu hỏi
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Thông báo sẽ hiển thị ngay trên ứng dụng để bạn không bỏ lỡ thông tin.
                      </p>
                    </div>

                    {/* Toggle switch */}
                    <button
                      onClick={() => setNotifyApp(!notifyApp)}
                      className={`${notifyApp ? "bg-emerald-600" : "bg-slate-300 dark:bg-slate-600"
                        } relative inline-flex h-6 w-11 items-center rounded-full transition`}
                    >
                      <span
                        className={`${notifyApp ? "translate-x-6" : "translate-x-1"
                          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                      />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <Item id="loginAlert" icon={<Zap />} title="Cảnh báo đăng nhập bất thường">
              <span className="text-sm text-slate-600 dark:text-slate-400">
                Bảo vệ tài khoản khi có hoạt động lạ
              </span>
            </Item>

            <div className="ml-5">
              {activeSection === "notify" && activeItem === "loginAlert" && (
                <div className="mt-4 rounded-xl border border-slate-200 bg-white p-6 shadow-md dark:border-slate-700 dark:bg-slate-900">
                  <h3 className="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-100">
                    Cảnh báo đăng nhập bất thường
                  </h3>

                  <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800/50">
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Bật cảnh báo đăng nhập
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Gửi thông báo ngay khi phát hiện đăng nhập từ thiết bị hoặc vị trí lạ.
                      </p>
                    </div>

                    {/* Toggle switch */}
                    <button
                      onClick={() => setAlertLogin(!alertLogin)}
                      className={`${alertLogin ? "bg-emerald-600" : "bg-slate-300 dark:bg-slate-600"
                        } relative inline-flex h-6 w-11 items-center rounded-full transition`}
                    >
                      <span
                        className={`${alertLogin ? "translate-x-6" : "translate-x-1"
                          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                      />
                    </button>
                  </div>
                </div>
              )}
            </div>

          </Section>
        )}


        {/* 4. Privacy & Data */}
        {(!activeSection || activeSection === "privacy") && (
          <Section
            id="privacy" // 👈 id cho Section
            title="Quyền riêng tư & Dữ liệu"
            icon={<Eye className="h-5 w-5" />}
            setActiveSection={setActiveSection}
            activeSection={activeSection}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          >
            <Item id="hideInfo" icon={<Eye />} title="Ẩn thông tin cá nhân">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={hideInfo}
                  onChange={() => setHideInfo(!hideInfo)}
                />
                Hiển thị nickname thay vì tên thật
              </label>
            </Item>

            <Item id="exportData" icon={<FileText />} title="Xuất dữ liệu">
              <button className="rounded bg-emerald-600 px-3 py-1 text-sm text-white">
                Xuất lịch sử làm bài
              </button>
            </Item>

            <Item id="deleteAccount" icon={<Trash2 />} title="Xoá tài khoản/dữ liệu">
              <button className="text-sm text-red-600 underline">Xoá vĩnh viễn</button>
            </Item>

            <Item id="cookies" icon={<Cookie />} title="Cookie & Tracking">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={allowCookies}
                  onChange={() => setAllowCookies(!allowCookies)}
                />
                Cho phép cookie phân tích
              </label>
            </Item>
          </Section>
        )}


        {/* 5. System */}
        {(!activeSection || activeSection === "system") && (
          <Section
            id="system" // 👈 id cho Section
            title="Hệ thống & Kỹ thuật"
            icon={<KeyRound className="h-5 w-5" />}
            setActiveSection={setActiveSection}
            activeSection={activeSection}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          >
            <Item id="apiKey" icon={<KeyRound />} title="API Key / Access Token">
              <p className="text-xs text-slate-500">(Dành cho giáo viên / dev)</p>
              <button className="mt-1 rounded bg-slate-200 px-2 py-1 text-xs dark:bg-slate-700">
                Tạo mới
              </button>
            </Item>

            <Item id="devices" icon={<Smartphone />} title="Thiết bị đã đăng nhập">
              <ul className="list-disc pl-5 text-sm">
                <li>
                  Chrome - Windows 10{" "}
                  <button className="ml-2 text-xs text-red-600 underline">Đăng xuất</button>
                </li>
                <li>Safari - iPhone 14</li>
              </ul>
            </Item>

            <Item id="reset" icon={<RefreshCw />} title="Reset cài đặt mặc định">
              <button className="rounded bg-red-500 px-3 py-1 text-sm text-white">Reset</button>
            </Item>
          </Section>
        )}


      </div>

      <p className="mt-10 text-center text-xs text-slate-500 dark:text-slate-400">
        Cập nhật lần cuối: {new Date().toLocaleDateString()}
      </p>
    </div>
  );
}

function Section({
  id,
  title,
  icon,
  children,
  setActiveSection,
  activeSection,
  activeItem,
  setActiveItem
}: {
  id: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  setActiveSection: (id: string | null) => void;
  activeSection: string | null;
  activeItem: string | null;
  setActiveItem: (id: string | null) => void;
}) {
  return (
    <motion.div
      key={id}
      id={id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 scroll-mt-16"
    >
      <h2 className="mb-4 flex items-center gap-2 text-base font-bold text-emerald-700 dark:text-emerald-300">
        {icon} {title}
      </h2>
      <div className="space-y-4">
        {React.Children.map(children, (child: any) =>
          React.cloneElement(child, {
            sectionId: id,
            setActiveSection,
            activeSection,
            activeItem,
            setActiveItem,
          })
        )}
      </div>
    </motion.div>
  );
}

function Item({
  id,
  sectionId,
  icon,
  title,
  children,
  setActiveSection,
  activeSection,
  activeItem,
  setActiveItem
}: {
  id: string;
  sectionId?: string;
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  setActiveSection?: (id: string | null) => void;
  activeSection?: string | null;
  activeItem?: string | null;
  setActiveItem?: (id: string | null) => void;
}) {
  const isActive = activeItem === id && activeSection === sectionId;



  const handleClick = () => {
    if (isActive) {
      // Nếu đang mở → đóng lại
      setActiveSection?.(null);
      setActiveItem?.(null);
    } else {
      // Nếu chưa mở → mở item này
      setActiveSection?.(sectionId!);
      setActiveItem?.(id);
    }
  };

  return (
    <div
      id={id}
      onClick={handleClick}
      className={`cursor-pointer flex items-start gap-3 rounded-lg border p-3 transition scroll-mt-16
        ${isActive ? "border-emerald-500 bg-emerald-50 dark:bg-slate-800" : "border-slate-200 dark:border-slate-800"}`}
    >
      <div className="mt-1 text-emerald-600 dark:text-emerald-300">{icon}</div>
      <div className="flex-1">
        <div className="font-semibold text-slate-800 dark:text-slate-200">
          {title} {isActive && "✅"}
        </div>
        <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          {children}
        </div>
        {isActive && (
          <div className="mt-2 text-xs text-emerald-700 dark:text-emerald-300">
            {/* chỗ này bạn có thể render chi tiết hơn của tùy chọn */}
            Tuỳ chọn chi tiết cho {title}
          </div>
        )}
      </div>
    </div>
  );
}