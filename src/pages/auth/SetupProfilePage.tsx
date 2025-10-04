import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Building2, GraduationCap, CheckCircle2, Loader2, Sparkles, ArrowRight } from "lucide-react";
import Floating from "@/shared/ui/Floatting";
import { useAuth } from "@/app/providers/AuthProvider";
import {saveProfile} from "@/shared/api/apiClient"

import { fetchUniversities, fetchMajors, University, Major } from "@/shared/api/major-universityApi";




export default function SetupProfilePage() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const location = useLocation();
    const [universities, setUniversities] = useState<University[]>([]);
    const [university, setUniversity] = useState<string>();



    const [majors, setMajors] = useState<Major[]>([]);
    // nếu không phải từ đăng ký -> 404
    if (!(location.state as any)?.fromRegister) {
        return <Navigate to="/404" replace />;
    }
    useEffect(() => {
    console.log("Xin chao", user);

  }, [user])


    const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
    
    // const storedUserRaw = typeof window !== "undefined" ? localStorage.getItem("auth_user") : null;
    // const storedUser = storedUserRaw ? JSON.parse(storedUserRaw) : null;


    const [major, setMajor] = useState<string>(user?.major?.majorId ?? "");
    const [intakeYear, setIntakeYear] = useState<number | undefined>(user?.intakeYear ?? undefined);
    const [saving, setSaving] = useState(false);
    const [okMsg, setOkMsg] = useState<string | null>(null);
    const [err, setErr] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // const selectedUni = useMemo(() => universities.find(u => u.id === tenantId) || null, [tenantId]);
    // const majorOptions = useMemo(() => selectedUni?.majors ?? [], [selectedUni]);

    // Prefill năm vào học (nếu rỗng)
    useEffect(() => {
        if (!intakeYear) setIntakeYear(new Date().getFullYear());
    }, []);

    const canSubmit = !!university && !!major.trim();

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!canSubmit) return setErr("Vui lòng chọn trường và chuyên ngành.");
        setSaving(true);
        setErr(null);
        setOkMsg(null);
        try {
            const payload = { university: university!, major: major.trim(), intakeYear };
            console.log(payload);
            
            // Gọi API thật (nếu có). Nếu bạn chưa có endpoint, có thể comment dòng dưới để chỉ cập nhật localStorage.
            await saveProfile(payload).catch(() => undefined);

            // ====== Cập nhật localStorage auth_user (đồng bộ với AuthProvider của bạn) ======
            const nextUser = { ...( user || {}), university: university!, major: major.trim(), intakeYear };
            localStorage.setItem("auth_user", JSON.stringify(nextUser));

            setOkMsg("Đã lưu thiết lập.");
            // Điều hướng về dashboard
            setTimeout(() => navigate("/dashboard"), 300);
        } catch (e: any) {
            setErr(e?.message || "Lưu thất bại, thử lại sau.");
        } finally {
            setSaving(false);
        }
    }


    useEffect(() => {
        async function load() {
            try {
                const [unis, majors] = await Promise.all([
                    fetchUniversities(),
                    fetchMajors(),
                ]);
                setUniversities(unis);
                setMajors(majors);
                console.log(majors);

            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    return (
        <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* Gradient nền */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />

            {/* Tile/Decor */}
            <Floating distance={12} duration={7} className="pointer-events-none absolute top-14 left-6">
                <div className="rounded-xl bg-gradient-to-br from-amber-300 to-rose-300 px-3 py-1 shadow-lg -rotate-6">
                    <span className="text-xs font-black text-rose-700">SETUP</span>
                </div>
            </Floating>
            <Floating distance={10} duration={6} className="pointer-events-none absolute top-10 right-8">
                <div className="rounded-full bg-gradient-to-br from-purple-400 to-indigo-400 p-3 shadow-xl rotate-12">
                    <Sparkles className="h-4 w-4 text-white" />
                </div>
            </Floating>

            {/* Nội dung */}
            <div className="relative z-10 mx-auto max-w-3xl px-6 py-16">
                {/* Header */}
                <div className="mb-6 text-center text-white">
                    <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/20 backdrop-blur">
                        <GraduationCap className="h-4 w-4" /> Thiết lập ban đầu
                    </div>
                    <h1 className="mt-3 text-3xl font-black leading-tight">Chọn trường đại học & chuyên ngành</h1>
                    <p className="mt-1 text-white/85">Chúng mình sẽ cá nhân hoá nội dung, bộ môn và đề thi phù hợp với bạn.</p>
                </div>

                {/* Card */}
                <motion.form
                    onSubmit={onSubmit}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 160, damping: 18 }}
                    className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md shadow-xl dark:border-slate-700 dark:bg-slate-800/60"
                >
                    {/* UNIVERSITY */}
                    <label className="mb-2 block text-sm font-medium text-white dark:text-slate-100">Trường của bạn</label>
                    <div className="mb-4 grid gap-2 sm:grid-cols-[1fr_auto]">
                        <select title="university"
                            value={university ?? ""}
                            onChange={(e) => setUniversity(e.target.value)}
                            className="w-full rounded-xl bg-white/85 px-3 py-2 text-sm text-slate-800 ring-1 ring-black/10 focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:bg-slate-900/70 dark:text-slate-100 dark:ring-white/10"
                        >
                            <option value="" disabled>— Chọn trường —</option>
                            {universities.map(u => (
                                <option key={u.universityCode} value={u.universityCode}>{u.universityName}</option>
                            ))}
                        </select>

                        {/* (tuỳ chọn) Nút quản lý tenant */}
                        <button
                            type="button"
                            onClick={() => window.open("/app/admin/tenants", "_self")}
                            className="rounded-xl border border-white/30 bg-white/10 px-3 py-2 text-xs font-medium text-white hover:bg-white/15 dark:bg-white/5 dark:text-slate-200 dark:border-slate-600"
                            title="Quản trị trường (Admin)"
                        >
                            <Building2 className="mr-1 inline h-4 w-4" /> Danh sách trường
                        </button>
                    </div>

                    {/* MAJOR */}
                    <label className="mb-2 block text-sm font-medium text-white dark:text-slate-100">Chuyên ngành</label>
                    {/* Nếu có gợi ý chuyên ngành từ trường đã chọn thì dùng select; nếu không, dùng input */}
                    {majors.length > 0 ? (
                        <div className="mb-4 grid gap-2 sm:grid-cols-[1fr_auto]">
                            <select
                                title="major"
                                value={major}
                                onChange={(e) => setMajor(e.target.value)}
                                className="w-full rounded-xl bg-white/85 px-3 py-2 text-sm text-slate-800 ring-1 ring-black/10 focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:bg-slate-900/70 dark:text-slate-100 dark:ring-white/10"
                            >
                                <option value="">— Chọn chuyên ngành —</option>
                                {majors.map(m => (
                                    <option key={m.majorId} value={m.majorId}>{m.majorName}</option>
                                ))}
                                <option value="__other__">Khác (tự nhập)…</option>
                            </select>
                            {major === "__other__" && (
                                <input
                                    autoFocus
                                    placeholder="Nhập chuyên ngành của bạn"
                                    className="w-full rounded-xl bg-white/85 px-3 py-2 text-sm text-slate-800 ring-1 ring-black/10 focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:bg-slate-900/70 dark:text-slate-100 dark:ring-white/10 sm:col-start-1"
                                    onChange={(e) => setMajor(e.target.value)}
                                />
                            )}
                        </div>
                    ) : (
                        <input
                            value={major}
                            onChange={(e) => setMajor(e.target.value)}
                            placeholder="VD: Kỹ thuật phần mềm"
                            className="mb-4 w-full rounded-xl bg-white/85 px-3 py-2 text-sm text-slate-800 ring-1 ring-black/10 focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:bg-slate-900/70 dark:text-slate-100 dark:ring-white/10"
                        />
                    )}

                    {/* (optional) Intake year */}
                    <label className="mb-2 block text-sm font-medium text-white dark:text-slate-100">Khoá/năm vào học (không bắt buộc)</label>
                    <input
                        title="intakeYear"
                        type="number"
                        value={intakeYear ?? ""}
                        onChange={(e) => setIntakeYear(e.target.value ? Number(e.target.value) : undefined)}
                        min={2000}
                        max={new Date().getFullYear() + 1}
                        className="mb-2 w-full rounded-xl bg-white/85 px-3 py-2 text-sm text-slate-800 ring-1 ring-black/10 focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:bg-slate-900/70 dark:text-slate-100 dark:ring-white/10"
                    />

                    {/* Alerts */}
                    {err && (
                        <div className="mb-3 rounded-lg bg-rose-500/15 px-3 py-2 text-sm text-rose-50 ring-1 ring-rose-500/30 dark:bg-rose-900/20 dark:text-rose-200 dark:ring-rose-800">
                            {err}
                        </div>
                    )}
                    {okMsg && (
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-300 dark:bg-emerald-900/30 dark:text-emerald-300 dark:ring-emerald-800">
                            <CheckCircle2 className="h-4 w-4" /> {okMsg}
                        </div>
                    )}

                    {/* Actions */}
                    <div className="mt-2 flex flex-wrap items-center gap-3">
                        <motion.button
                            whileHover={{ scale: canSubmit ? 1.02 : 1 }}
                            whileTap={{ scale: canSubmit ? 0.98 : 1 }}
                            type="submit"
                            disabled={!canSubmit || saving}
                            className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-6 py-2.5 font-semibold text-emerald-950 shadow hover:brightness-105 disabled:opacity-60"
                        >
                            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />} Lưu & tiếp tục
                        </motion.button>

                        <button
                            type="button"
                            onClick={() => navigate("/dashboard")}
                            className="rounded-full bg-white/10 px-5 py-2.5 text-sm font-medium text-white ring-1 ring-white/25 hover:bg-white/15 dark:bg-white/5 dark:ring-white/10"
                        >
                            Bỏ qua bây giờ
                        </button>
                    </div>
                </motion.form>

                {/* Footnote */}
                <p className="mt-4 text-center text-xs text-white/80">
                    Bạn có thể thay đổi lại ở <b>Cài đặt tài khoản → Hồ sơ</b> sau này.
                </p>
            </div>
        </div>
    );
}
