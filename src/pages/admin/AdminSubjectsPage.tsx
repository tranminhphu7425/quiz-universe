import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { usePagination } from "@/shared/hooks/usePagination";
import { normalizeText } from "@/shared/utils/textUtils";
import {
  MdSearch as Search,
  MdLoop as Loader2,
  MdAutoStories as BookOpen,
  MdNumbers as Hash,
  MdAccessTime as Clock,
  MdDeleteOutline as Trash2,
  MdEditNote as Edit3,
  MdAdd as Plus,
  MdFilterList as Filter,
  MdSync as RefreshCw,
  MdWarning as AlertTriangle,
  MdClose as X,
  MdCheckCircle as CheckCircle,
  MdFormatAlignLeft as AlignLeft,
  MdTitle as Type,
  MdChevronLeft as ChevronLeft,
  MdChevronRight as ChevronRight
} from 'react-icons/md';
import toast from "react-hot-toast";
import { fetchSubjects, createSubject, updateSubject, deleteSubject } from "@/shared/api/subjectApi";
import type { Subject } from "@/shared/types/subject";

/* ===================== MAIN PAGE ===================== */

export default function AdminSubjectsPage() {
  const {
    page,
    size: pageSize,
    keyword: q,
    sort,
    setPage,
    handleSearch,
  } = usePagination({
    initialPage: 1,
    initialSize: 10,
    initialSort: 'name,asc'
  });

  const queryClient = useQueryClient();
  const [searchInput, setSearchInput] = useState(q || "");
  const [err, setErr] = useState<string | null>(null);

  // Modal states
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<Subject | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Form state
  const [formCode, setFormCode] = useState("");
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(searchInput);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput, handleSearch]);

  const {
    data: pageResult,
    isLoading: loading,
    isPlaceholderData,
    refetch,
  } = useQuery({
    queryKey: ['adminSubjects', page, pageSize, q, sort],
    queryFn: () => {
      const normalizedQuery = normalizeText(q);
      return fetchSubjects({
        page: page - 1,
        size: pageSize,
        keyword: normalizedQuery,
        sort: sort
      });
    },
    placeholderData: (prev) => prev,
  });

  const subjects = pageResult?.content || [];
  const totalElements = pageResult?.totalElements || 0;
  const totalPages = pageResult?.totalPages || 1;

  /* ---- Open create modal ---- */
  const openCreateModal = () => {
    setFormCode("");
    setFormName("");
    setFormDescription("");
    setEditingSubject(null);
    setIsCreating(true);
  };

  /* ---- Open edit modal ---- */
  const openEditModal = (subject: Subject) => {
    setFormCode(subject.code);
    setFormName(subject.name);
    setFormDescription(subject.description ?? "");
    setIsCreating(false);
    setEditingSubject(subject);
  };

  /* ---- Close modal ---- */
  const closeModal = () => {
    setEditingSubject(null);
    setIsCreating(false);
  };

  /* ---- Handle save (create or update) ---- */
  const handleSave = async () => {
    if (!formCode.trim()) {
      toast.error("Vui lòng nhập mã môn học");
      return;
    }
    if (!formName.trim()) {
      toast.error("Vui lòng nhập tên môn học");
      return;
    }

    setActionLoading(true);
    const toastId = toast.loading(
      editingSubject ? "Đang cập nhật..." : "Đang tạo môn học..."
    );

    try {
      if (editingSubject) {
        await updateSubject(editingSubject.subjectId, {
          code: formCode.trim(),
          name: formName.trim(),
          description: formDescription.trim(),
        });
        toast.success("Cập nhật môn học thành công!", { id: toastId });
      } else {
        await createSubject({
          code: formCode.trim(),
          name: formName.trim(),
          description: formDescription.trim(),
        });
        toast.success("Tạo môn học thành công!", { id: toastId });
      }
      queryClient.invalidateQueries({ queryKey: ["adminSubjects"] });
      closeModal();
    } catch (error: any) {
      const msg =
        error?.response?.data?.message || "Đã xảy ra lỗi. Vui lòng thử lại!";
      toast.error(msg, { id: toastId });
    } finally {
      setActionLoading(false);
    }
  };

  /* ---- Handle delete ---- */
  const handleDelete = async (id: number) => {
    setActionLoading(true);
    const toastId = toast.loading("Đang xóa môn học...");
    try {
      await deleteSubject(id);
      queryClient.invalidateQueries({ queryKey: ["adminSubjects"] });
      toast.success("Đã xóa môn học thành công!", { id: toastId });
      setConfirmDelete(null);
    } catch (error: any) {
      const msg =
        error?.response?.data?.message || "Không thể xóa môn học.";
      toast.error(msg, { id: toastId });
    } finally {
      setActionLoading(false);
    }
  };

  const isModalOpen = isCreating || editingSubject !== null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* ===== HEADER ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 text-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-black leading-tight text-white">
              📚 Quản lý môn học
            </h1>
            <p className="mt-2 max-w-xl mx-auto text-white/80">
              Thêm, chỉnh sửa và xóa môn học trong hệ thống Quiz Universe.
            </p>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="mx-auto max-w-7xl px-6 -mt-6">
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
          <StatCard
            icon={<BookOpen className="h-4 w-4" />}
            label="Tổng môn học"
            value={totalElements}
            color="indigo"
          />
          <StatCard
            icon={<Hash className="h-4 w-4" />}
            label="Số trang"
            value={totalPages}
            color="amber"
          />
          <StatCard
            icon={<CheckCircle className="h-4 w-4" />}
            label="Trang hiện tại"
            value={page}
            color="emerald"
          />
          <StatCard
            icon={<Clock className="h-4 w-4" />}
            label="Hiển thị"
            value={`${subjects.length} / ${pageSize}`}
            color="slate"
          />
        </div>
      </section>

      {/* ===== TOOLBAR ===== */}
      <section className="mx-auto max-w-7xl px-6 py-6">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm theo tên, mã hoặc mô tả..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-9 py-2 text-sm text-slate-800 shadow-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>

          {/* Add new */}
          <button
            onClick={openCreateModal}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <Plus className="h-4 w-4" />
            Thêm môn học
          </button>

          {/* Refresh */}
          <button
            onClick={() => refetch()}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            <RefreshCw
              className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
            />
            Làm mới
          </button>

          <span className="text-sm text-slate-500 dark:text-slate-400 ml-auto">
            {totalElements} môn học
          </span>
        </div>

        {err && (
          <div className="mt-3 flex items-center gap-2 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg px-4 py-2">
            <AlertTriangle className="h-4 w-4" />
            {err}
            <button
              onClick={() => refetch()}
              className="ml-auto underline hover:no-underline"
            >
              Thử lại
            </button>
          </div>
        )}
      </section>

      {/* ===== TABLE ===== */}
      <main className="mx-auto max-w-7xl px-6 pb-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-3 py-20">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
            <p className="text-slate-500">Đang tải danh sách môn học...</p>
          </div>
        ) : subjects.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <p className="text-slate-500 dark:text-slate-400">
              {q
                ? "Không tìm thấy môn học phù hợp."
                : "Chưa có môn học nào trong hệ thống."}
            </p>
            {q && (
              <button
                onClick={() => setSearchInput("")}
                className="mt-3 text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
              >
                Xóa bộ lọc
              </button>
            )}
            {!q && (
              <button
                onClick={openCreateModal}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Tạo môn học đầu tiên
              </button>
            )}
          </div>
        ) : (
          <div
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50/80 text-slate-600 dark:bg-slate-800/50 dark:text-slate-300">
                  <tr>
                    <th className="px-4 py-3.5 text-left font-semibold w-12">
                      #
                    </th>
                    <th className="px-4 py-3.5 text-left font-semibold">
                      Mã môn
                    </th>
                    <th className="px-4 py-3.5 text-left font-semibold">
                      Tên môn học
                    </th>
                    <th className="px-4 py-3.5 text-left font-semibold">
                      Mô tả
                    </th>
                    <th className="px-4 py-3.5 text-left font-semibold">
                      Ngày tạo
                    </th>
                    <th className="px-4 py-3.5 text-center font-semibold">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {subjects.map((s, i) => (
                      <tr
                        key={s.subjectId}
                        className="hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors"
                      >
                        <td className="px-4 py-3 text-slate-400 font-mono text-xs">
                          {i + 1}
                        </td>

                        {/* Code */}
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center gap-1 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 px-2.5 py-1 text-xs font-bold text-indigo-700 dark:text-indigo-300 font-mono">
                            <Hash className="h-3 w-3" />
                            {s.code}
                          </span>
                        </td>

                        {/* Name */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-emerald-100 to-teal-100 text-emerald-700 dark:from-emerald-500/20 dark:to-teal-500/20 dark:text-emerald-200 font-bold text-sm">
                              {s.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-medium text-slate-900 dark:text-slate-100 truncate max-w-[200px]">
                              {s.name}
                            </span>
                          </div>
                        </td>

                        {/* Description */}
                        <td className="px-4 py-3">
                          <span className="text-slate-500 dark:text-slate-400 text-xs truncate block max-w-[250px]">
                            {s.description || "—"}
                          </span>
                        </td>

                        {/* Created At */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                            <Clock className="h-3 w-3" />
                            {s.createdAt
                              ? new Date(s.createdAt).toLocaleDateString(
                                  "vi-VN"
                                )
                              : "—"}
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => openEditModal(s)}
                              className="p-1.5 rounded-lg text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-900/30 transition-colors"
                              title="Chỉnh sửa"
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>

                            <button
                              onClick={() => setConfirmDelete(s)}
                              className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                              title="Xóa môn học"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 px-4 py-3">
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  Hiển thị trang {page} trên tổng số {totalPages}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="inline-flex items-center gap-1 rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 disabled:opacity-50 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700 dark:hover:bg-slate-700"
                  >
                    <ChevronLeft className="h-4 w-4" /> Trước
                  </button>
                  <button
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages || isPlaceholderData}
                    className="inline-flex items-center gap-1 rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 disabled:opacity-50 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700 dark:hover:bg-slate-700"
                  >
                    Sau <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* ===== CREATE / EDIT MODAL ===== */}
      <AnimatePresence>
        {isModalOpen && (
          <ModalOverlay onClose={closeModal}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-indigo-500" />
                  {editingSubject ? "Chỉnh sửa môn học" : "Thêm môn học mới"}
                </h3>
                <button
                  onClick={closeModal}
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  <X className="h-4 w-4 text-slate-400" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Code */}
                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <Hash className="h-3.5 w-3.5 text-indigo-500" />
                    Mã môn học <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formCode}
                    onChange={(e) => setFormCode(e.target.value)}
                    placeholder="VD: CT101, MATH201..."
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 focus:outline-none transition-all"
                  />
                </div>

                {/* Name */}
                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <Type className="h-3.5 w-3.5 text-indigo-500" />
                    Tên môn học <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="VD: Cấu trúc dữ liệu..."
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 focus:outline-none transition-all"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <AlignLeft className="h-3.5 w-3.5 text-indigo-500" />
                    Mô tả
                  </label>
                  <textarea
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Mô tả ngắn gọn về môn học..."
                    rows={3}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 focus:outline-none transition-all resize-none"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={closeModal}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleSave}
                  disabled={actionLoading}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {actionLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <CheckCircle className="h-4 w-4" />
                  )}
                  {editingSubject ? "Lưu thay đổi" : "Tạo mới"}
                </button>
              </div>
            </motion.div>
          </ModalOverlay>
        )}
      </AnimatePresence>

      {/* ===== DELETE CONFIRM MODAL ===== */}
      <AnimatePresence>
        {confirmDelete && (
          <ModalOverlay onClose={() => setConfirmDelete(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 w-full max-w-sm mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-4">
                <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-red-100 dark:bg-red-900/30">
                  <AlertTriangle className="h-6 w-6 text-red-500" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Xác nhận xóa
                </h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Bạn có chắc muốn xóa môn học{" "}
                  <span className="font-semibold text-slate-700 dark:text-slate-200">
                    {confirmDelete.name}
                  </span>{" "}
                  ({confirmDelete.code})? Hành động này không thể hoàn tác.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="flex-1 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={() => handleDelete(confirmDelete.subjectId)}
                  disabled={actionLoading}
                  className="flex-1 px-4 py-2 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors flex items-center justify-center gap-1.5"
                >
                  {actionLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                  Xóa
                </button>
              </div>
            </motion.div>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </div>
  );
}

import { ModalOverlay } from "./ui/ModalOverlay";
import { StatCard } from "./ui/StatCard";
