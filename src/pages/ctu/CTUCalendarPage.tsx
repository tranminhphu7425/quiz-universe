// CourseRegistration.tsx
import React, { useEffect, useRef, useState } from 'react';
import {
  Trash2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  MapPin
} from 'lucide-react';
import { Course, ClassSession, ClassGroupItem, ClassItem } from '@/shared/types/courses';
import { motion } from 'framer-motion';
import { normalizeText } from '@/shared/utils/textUtils';
import toast from 'react-hot-toast';
import { fetchMyCtuSchedule, saveMyCtuSchedule } from '@/shared/api/ctuScheduleApi';
import { useAuth } from '@/app/providers/AuthProvider';




const CTUCalendarPage: React.FC = () => {

  const { user } = useAuth();

  // State quản lý tuần hiện tại (mặc định tuần 1)
  const [currentWeek, setCurrentWeek] = useState(1);
  const MAX_WEEKS = 20; // Giả sử học kỳ có tối đa 20 tuần

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [addedCourses, setAddedCourses] = useState<Course[]>([]);
  const [selectedClasses, setSelectedClasses] = useState<ClassGroupItem[]>([]);

  const [courses, setCourses] = useState<Course[]>([]);
  const didHydrateFromServerRef = useRef(false);
  const saveTimerRef = useRef<number | null>(null);


  useEffect(() => {

    const loadData = async () => {
      const local = await fetch(`${import.meta.env.BASE_URL}data/ket_qua_dkmh_full.json`);
      const data = (await local.json()) as Course[];
      setCourses(data);
    }

    loadData();
  }, []);

  // Load saved schedule from DB (per-user) once we have the course catalog loaded
  useEffect(() => {
    if (!user) return;
    if (courses.length === 0) return;
    if (didHydrateFromServerRef.current) return;

    const controller = new AbortController();
    (async () => {
      try {
        const saved = await fetchMyCtuSchedule(controller.signal);
        if (!saved) {
          didHydrateFromServerRef.current = true;
          return;
        }

        const nextAdded = Array.isArray(saved.addedCourses) ? (saved.addedCourses as Course[]) : [];
        const nextSelected = Array.isArray(saved.selectedClasses)
          ? (saved.selectedClasses as ClassGroupItem[])
          : [];

        setAddedCourses(nextAdded);
        setSelectedClasses(nextSelected);
        if (typeof saved.currentWeek === "number" && !Number.isNaN(saved.currentWeek)) {
          setCurrentWeek(Math.max(1, Math.min(MAX_WEEKS, saved.currentWeek)));
        }

        didHydrateFromServerRef.current = true;
        toast.success("Đã tải lại lịch CTU đã lưu");
      } catch {
        // im lặng: không làm crash UI nếu backend chưa chạy / chưa login
        didHydrateFromServerRef.current = true;
      }
    })();

    return () => controller.abort();
  }, [user, courses]);

  // Auto-save schedule to DB (debounce), after we've hydrated once
  useEffect(() => {
    if (!user) {
      // toast.error("Vui lòng đăng nhập để sử dụng tính năng này");
      return;
    }
    if (!didHydrateFromServerRef.current) {

      return;
    }

    if (saveTimerRef.current) {
      toast.loading("Đang lưu lịch CTU...", { id: "save-ctu-schedule" });
      window.clearTimeout(saveTimerRef.current);
    }

    saveTimerRef.current = window.setTimeout(() => {
      saveMyCtuSchedule({
        addedCourses,
        selectedClasses,
        currentWeek,
        savedAt: new Date().toISOString(),
      })
      .then(() => {
        toast.success("Lưu lịch CTU thành công", { id: "save-ctu-schedule" });
      })
      .catch((err) => {
        // Báo lỗi 1 lần khi không lưu được, để user biết (đỡ tưởng autosave ok)
        console.error("Autosave CTU schedule failed:", err);
        toast.error("Không thể tự lưu lịch CTU. Kiểm tra đăng nhập hoặc backend.", { id: "save-ctu-schedule" });
      });
  }, 800);

    return () => {
      if (saveTimerRef.current) {
        toast.dismiss("save-ctu-schedule");
        window.clearTimeout(saveTimerRef.current);
      }
    };
  }, [user, addedCourses, selectedClasses, currentWeek]);



  useEffect(() => {
    // nếu rỗng thì reset luôn
    if (search.trim() === "") {
      setSearchResults([]);
      return;
    }

    // ⏱️ debounce 1 giây
    const timeoutId = setTimeout(() => {
      const keyword = normalizeText(search);


      const results = courses.filter((course) => {
        const info = course.data.data.hoc_phan_info;

        return (

          normalizeText(info.dkmh_tu_dien_hoc_phan_ma)
            .includes(keyword) ||
          normalizeText(info.dkmh_tu_dien_hoc_phan_ten_vn)
            .includes(keyword)
        );
      });

      setSearchResults(results);
    }, 500); // 1s

    // cleanup: hủy lần filter trước nếu gõ tiếp
    return () => clearTimeout(timeoutId);

  }, [search, courses]);



  const addCourse = () => {
    if (!selectedCourse) return;

    // tránh thêm trùng
    const exists = addedCourses.some(
      (c) => c.ma_request === selectedCourse.ma_request
    );

    if (exists) return;

    setAddedCourses((prev) => [...prev, selectedCourse]);

    // reset
    setSearch("");
    setSelectedCourse(null);

  }


  const deleteCourse = (maRequest: string) => {
    setAddedCourses((prev) =>
      prev.filter((c) => c.ma_request !== maRequest)
    );
  };

  const handleSelectClass = (
    course: Course,
    classGroup: ClassGroupItem
  ) => {
    setSelectedClasses((prev) => {
      // mỗi môn chỉ được 1 nhóm
      const filtered = prev.filter(
        (c) =>
          c.hoc_phan_ma !==
          classGroup.hoc_phan_ma
      );

      return [...filtered, classGroup];
    });
  };

  const handleRemoveClass = (course: Course) => {
    setSelectedClasses((prev) =>
      prev.filter(
        (c) =>
          c.lop_hoc_phan_lop_ma !==
          course.data.data.hoc_phan_info.dkmh_tu_dien_hoc_phan_ma
      )
    );
  };


  function groupClassItems(items: ClassItem[]): ClassGroupItem[] {
    const map = new Map<string, ClassGroupItem>();

    items.forEach(item => {
      const key = item.dkmh_nhom_hoc_phan_ma;

      if (!map.has(key)) {
        map.set(key, {
          nhom_hoc_phan_ma: item.dkmh_nhom_hoc_phan_ma,
          lop_hoc_phan_lop_ma: item.dkmh_tu_dien_lop_hoc_phan_lop_ma,
          giang_vien_ten_vn: item.dkmh_tu_dien_giang_vien_ten_vn,
          giang_vien_email: item.dkmh_tu_dien_giang_vien_email,
          si_so: item.dkmh_tu_dien_lop_hoc_phan_si_so,
          si_so_con_lai: item.si_so_con_lai,
          sessions: [],
          ten_hoc_phan: item.dkmh_tu_dien_hoc_phan_ten_vn,
          hoc_phan_ma: item.dkmh_tu_dien_hoc_phan_ma,
          hoc_phan_so_tin_chi: item.dkmh_tu_dien_hoc_phan_so_tin_chi,
        });
      }

      map.get(key)!.sessions.push({
        key: item.key,
        thu_trong_tuan_ma: item.dkmh_thu_trong_tuan_ma,
        tiet_hoc: item.tiet_hoc,
        phong_hoc: item.dkmh_tu_dien_phong_hoc_ten,
        ...Object.fromEntries(
          Object.entries(item).filter(([k]) => k.startsWith("tuanhoc-"))
        )
      });
    });

    return Array.from(map.values());
  }


  useEffect(() => {
    console.log("Selected Classes:", selectedClasses);
  }, [selectedClasses]);


  // Hàm chuyển đổi chuỗi tiết học kiểu "123-----" hoặc "1-3" thành mảng số [1, 2, 3]
  const parseTietHoc = (tietHoc: string): number[] => {
    if (!tietHoc) return [];

    // Trường hợp 1: Dạng range "1-3" (ít gặp trong format này nhưng giữ để fallback)
    if (tietHoc.includes("-") && tietHoc.match(/\d+-\d+/)) {
      const [start, end] = tietHoc.split("-").map(Number);
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    }

    // Trường hợp 2: Dạng mask "123-------" hoặc "---45-----"
    // Lấy tất cả các ký tự số
    const digits = tietHoc.match(/\d/g);
    if (digits) {
      return digits.map(Number);
    }

    // Trường hợp 3: Chỉ có 1 số "1"
    const single = Number(tietHoc);
    return isNaN(single) ? [] : [single];
  };

  const getThuLabel = (thuTrongTuanMa: number) => {
    switch (thuTrongTuanMa) {
      case 2:
        return "Thứ 2";
      case 3:
        return "Thứ 3";
      case 4:
        return "Thứ 4";
      case 5:
        return "Thứ 5";
      case 6:
        return "Thứ 6";
      case 7:
        return "Thứ 7";
      case 8:
        return "CN";
      default:
        return `Thứ ${thuTrongTuanMa}`;
    }
  };

  const getSessionWeeks = (session: ClassSession): number[] => {
    const weeks: number[] = [];
    for (let w = 1; w <= MAX_WEEKS; w++) {
      const key = `tuanhoc-${w}` as keyof ClassSession;
      const has = session[key] && session[key] !== "";
      if (has) weeks.push(w);
    }
    return weeks;
  };

  const findScheduleConflict = (
    candidate: ClassGroupItem,
    existingGroups: ClassGroupItem[]
  ): {
    other: ClassGroupItem;
    candidateSession: ClassSession;
    otherSession: ClassSession;
    week: number;
    thuTrongTuanMa: number;
    tietTrung: number[];
  } | null => {
    const others = existingGroups.filter(
      (g) => g.hoc_phan_ma !== candidate.hoc_phan_ma
    );

    for (const other of others) {
      for (const candidateSession of candidate.sessions) {
        const candTiet = parseTietHoc(candidateSession.tiet_hoc);
        if (candTiet.length === 0) continue;

        const candWeeks = new Set(getSessionWeeks(candidateSession));
        if (candWeeks.size === 0) continue;

        for (const otherSession of other.sessions) {
          if (otherSession.thu_trong_tuan_ma !== candidateSession.thu_trong_tuan_ma) {
            continue;
          }

          const otherTiet = parseTietHoc(otherSession.tiet_hoc);
          if (otherTiet.length === 0) continue;

          const tietTrung = candTiet.filter((t) => otherTiet.includes(t));
          if (tietTrung.length === 0) continue;

          for (const w of getSessionWeeks(otherSession)) {
            if (candWeeks.has(w)) {
              return {
                other,
                candidateSession,
                otherSession,
                week: w,
                thuTrongTuanMa: candidateSession.thu_trong_tuan_ma,
                tietTrung: Array.from(new Set(tietTrung)).sort((a, b) => a - b),
              };
            }
          }
        }
      }
    }

    return null;
  };

  const getClassAtCell = (
    tiet: number,
    colIndex: number, // 0 = Thứ 2, 1 = Thứ 3...
    selectedClasses: ClassGroupItem[]
  ) => {
    for (const group of selectedClasses) {
      for (const session of group.sessions) {
        // 1. Check thứ
        const thuIndex = session.thu_trong_tuan_ma - 2;
        if (thuIndex !== colIndex) continue;

        // 2. Check tuần học (quan trọng!)
        // Key trong data là "tuanhoc-1", "tuanhoc-2"...
        // Giá trị khác rỗng (thường là "x" hoặc "1") nghĩa là có học
        const weekKey = `tuanhoc-${currentWeek}` as keyof ClassSession;
        const hasClassThisWeek = session[weekKey] && session[weekKey] !== "";

        if (!hasClassThisWeek) continue;

        // 3. Check tiết
        const tietList = parseTietHoc(session.tiet_hoc);
        if (tietList.includes(tiet)) {
          return { group, session };
        }
      }
    }
    return null;
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">

      {/* Header với hiệu ứng gradient */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-800 dark:from-blue-800 dark:via-blue-900 dark:to-cyan-950 shadow-lg">
        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-blob" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
        </div>

        <div className="relative p-4 md:p-6">
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="p-2 bg-white/10 rounded-xl backdrop-blur-sm"
              >
                <Calendar className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-2xl md:text-3xl font-bold text-white"
                >
                  Sắp xếp thời khóa biểu thông minh
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-white/80 text-sm mt-1"
                >
                  Tối ưu lịch học, tránh trùng giờ và cân bằng thời gian
                </motion.p>
              </div>
            </div>

            {/* Stats badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="hidden md:flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2"
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white/90 text-sm">
                {selectedClasses.length} học phần đã chọn
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 lg:py-8 max-w-7xl">
        <div className="flex flex-col  gap-6">
          {/* Left Column - Course List */}
          <div className="flex-1 min-w-0">
            {/* Add New Course Section - Cải thiện */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-5 rounded-2xl bg-white dark:bg-slate-800 shadow-lg border border-slate-100 dark:border-slate-700"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                  <Plus className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Thêm học phần mới
                </h2>
              </div>

              <div className="relative">
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Tìm kiếm môn học theo mã hoặc tên..."
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                        setSelectedCourse(null);
                      }}
                      className="w-full pl-9 pr-4 py-2.5 border rounded-xl bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>

                  <motion.button
                    onClick={addCourse}
                    disabled={!selectedCourse}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    <span className="flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Thêm học phần
                    </span>
                  </motion.button>
                </div>

                {/* Dropdown kết quả tìm kiếm */}
                {searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-xl z-20 max-h-80 overflow-y-auto"
                  >
                    {searchResults.map((course, idx) => {
                      const info = course.data.data.hoc_phan_info;
                      return (
                        <motion.div
                          key={course.ma_request}
                          initial={{ opacity: 0, x: 0 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          onClick={() => {
                            setSelectedCourse(course);
                            setSearch(
                              `${info.dkmh_tu_dien_hoc_phan_ma} - ${info.dkmh_tu_dien_hoc_phan_ten_vn}`
                            );
                            setSearchResults([]);
                          }}
                          className="p-3 cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 dark:hover:from-blue-950/50 dark:hover:to-cyan-950/50 transition-all duration-200 border-b border-gray-100 dark:border-slate-700 last:border-0"
                        >
                          <div className="font-medium text-gray-800 dark:text-white">
                            {info.dkmh_tu_dien_hoc_phan_ma} - {info.dkmh_tu_dien_hoc_phan_ten_vn}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {info.dkmh_tu_dien_hoc_phan_so_tin_chi} tín chỉ
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Main Table - Course List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl border bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-lg overflow-hidden"
            >
              <div className="p-5 border-b border-gray-200 dark:border-slate-700 bg-gradient-to-r from-gray-50 to-white dark:from-slate-800 dark:to-slate-800">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                      1. Danh sách học phần theo KHHT
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Đã chọn {addedCourses.length} học phần
                    </p>
                  </div>
                  {addedCourses.length > 0 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        if (window.confirm('Bạn có chắc muốn xóa tất cả?')) {
                          setAddedCourses([]);
                          setSelectedClasses([]);
                        }
                      }}
                      className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      Xóa tất cả
                    </motion.button>
                  )}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100 dark:bg-slate-700">
                    <tr>
                      {["STT", "Mã HP", "Tên học phần", "Nhóm", "TC", "Lớp", "Giảng viên", "Xóa"].map((h) => (
                        <th key={h} className="p-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {addedCourses.map((course, index) => {
                      const info = course.data.data.hoc_phan_info;
                      const classes = course.data.data.data;
                      const selectedGroup = selectedClasses.find(
                        (c) => c.hoc_phan_ma === info.dkmh_tu_dien_hoc_phan_ma
                      );

                      return (
                        <motion.tr
                          key={course.ma_request}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-t border-gray-200 dark:border-slate-700 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-transparent dark:hover:from-blue-950/20 transition-all duration-200"
                        >
                          <td className="p-3 text-center text-gray-600 dark:text-gray-400">{index + 1}</td>
                          <td className="p-3 font-medium text-blue-700 dark:text-blue-400">
                            {info.dkmh_tu_dien_hoc_phan_ma}
                          </td>
                          <td className="p-3 text-gray-800 dark:text-gray-200">
                            {info.dkmh_tu_dien_hoc_phan_ten_vn}
                          </td>
                          <td className="p-3">
                            <select
                              className="w-full p-2 border rounded-lg bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                              value={selectedGroup?.nhom_hoc_phan_ma || ""}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (value === "") {
                                  handleRemoveClass(course);
                                  return;
                                }
                                const groups = groupClassItems(course.data.data.data);
                                const selected = groups.find(
                                  (g) => g.nhom_hoc_phan_ma === value
                                );
                                if (selected) {
                                  const conflict = findScheduleConflict(
                                    selected,
                                    selectedClasses
                                  );
                                  if (conflict) {
                                    const candidateLabel = `${selected.hoc_phan_ma} - ${selected.ten_hoc_phan} (Nhóm ${selected.nhom_hoc_phan_ma})`;
                                    const otherLabel = `${conflict.other.hoc_phan_ma} - ${conflict.other.ten_hoc_phan} (Nhóm ${conflict.other.nhom_hoc_phan_ma})`;
                                    const thuLabel = getThuLabel(conflict.thuTrongTuanMa);
                                    const tietLabel = conflict.tietTrung.join(", ");

                                    toast.error(
                                      `Không thể chọn ${candidateLabel} vì đang bị xung đột lịch học với ${otherLabel} vào ${thuLabel} (tiết ${tietLabel}) ở tuần ${conflict.week}.`
                                    );
                                    return;
                                  }
                                  handleSelectClass(course, selected);
                                }
                              }}
                            >
                              <option value="">-- Chọn nhóm --</option>
                              {groupClassItems(classes).map((group) => (
                                <option key={group.nhom_hoc_phan_ma} value={group.nhom_hoc_phan_ma}>
                                  Nhóm {group.nhom_hoc_phan_ma}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="p-3 text-center text-gray-700 dark:text-gray-300">
                            {info.dkmh_tu_dien_hoc_phan_so_tin_chi}
                          </td>
                          <td className="p-3 text-center text-gray-700 dark:text-gray-300">
                            {classes.length}
                          </td>
                          <td className="p-3 text-gray-600 dark:text-gray-400">
                            {selectedGroup?.giang_vien_ten_vn || "Chưa chọn"}
                          </td>
                          <td className="p-3 text-center">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => deleteCourse(course.ma_request)}
                              className="p-2 rounded-lg text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/30 transition-all duration-200"
                            >
                              <Trash2 className="w-4 h-4" />
                            </motion.button>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>

                {addedCourses.length === 0 && (
                  <div className="text-center py-12">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500 dark:text-gray-400">Chưa có học phần nào được thêm</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Hãy tìm kiếm và thêm học phần từ bên trên</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Timetable */}
          <div className="flex-1 min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl border bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-lg overflow-hidden sticky top-4"
            >
              <div className="p-5 border-b border-gray-200 dark:border-slate-700 bg-gradient-to-r from-gray-50 to-white dark:from-slate-800 dark:to-slate-800">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                      2. Thời khóa biểu học phần
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Tuần {currentWeek} / {MAX_WEEKS}
                    </p>
                  </div>

                  {/* Week Controls */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-gray-100 dark:bg-slate-700 rounded-xl p-1">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCurrentWeek(Math.max(1, currentWeek - 1))}
                        disabled={currentWeek === 1}
                        className="p-2 hover:bg-white dark:hover:bg-slate-600 rounded-lg disabled:opacity-30 transition-all duration-200"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </motion.button>

                      <span className="font-semibold min-w-[70px] text-center text-gray-700 dark:text-gray-200">
                        Tuần {currentWeek}
                      </span>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCurrentWeek(Math.min(MAX_WEEKS, currentWeek + 1))}
                        disabled={currentWeek === MAX_WEEKS}
                        className="p-2 hover:bg-white dark:hover:bg-slate-600 rounded-lg disabled:opacity-30 transition-all duration-200"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </motion.button>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentWeek(1)}
                      className="px-3 py-2 text-sm text-blue-600 font-medium hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950/30 rounded-lg transition-all duration-200"
                    >
                      Về tuần 1
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Timetable Grid */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-slate-700">
                      <th className="p-3 font-semibold text-center w-24 text-gray-700 dark:text-gray-200">Tiết</th>
                      {['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'CN'].map((day, index) => (
                        <th
                          key={index}
                          className={`p-3 font-semibold text-center ${index === 6 ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400' : 'text-gray-700 dark:text-gray-200'
                            }`}
                        >
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {/* Morning sessions */}
                    {[
                      { tiets: [1, 2, 3, 4, 5], label: "Sáng", bgClass: "bg-gray-50 dark:bg-slate-700/30" },
                      { tiets: [6, 7, 8, 9], label: "Chiều", bgClass: "bg-yellow-50/50 dark:bg-yellow-900/10" }
                    ].map(({ tiets, bgClass }) => (
                      tiets.map((tiet) => (
                        <tr key={tiet}>
                          <td className={`p-2 text-center text-sm font-medium border-r border-gray-200 dark:border-slate-700 ${bgClass}`}>
                            <span className="text-gray-700 dark:text-gray-300">Tiết {tiet}</span>
                          </td>
                          {Array(7).fill(null).map((_, colIndex) => {
                            const result = getClassAtCell(tiet, colIndex, selectedClasses);
                            return (
                              <td
                                key={colIndex}
                                className="p-1 border border-gray-200 dark:border-slate-700 h-24 align-top"
                              >
                                {result && (
                                  <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="p-2 rounded-xl w-full bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-l-4 border-green-500 shadow-sm hover:shadow-md transition-all duration-200"
                                  >
                                    <div className="font-semibold text-sm text-gray-800 dark:text-white">
                                      {result.group.ten_hoc_phan}
                                    </div>
                                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                      {result.group.lop_hoc_phan_lop_ma} (Nhóm {result.group.nhom_hoc_phan_ma})
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                                      <MapPin className="w-3 h-3" />
                                      {result.session.phong_hoc}
                                    </div>
                                  </motion.div>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Legend */}
              <div className="p-4 border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-700/30">
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="text-xs text-gray-600 dark:text-gray-400">Chú thích:</span>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-green-500" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">Lý thuyết</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-blue-500" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">Thực hành</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-yellow-500" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">Đồ án</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style>{`
    @keyframes blob {
      0% { transform: translate(0px, 0px) scale(1); }
      33% { transform: translate(30px, -50px) scale(1.1); }
      66% { transform: translate(-20px, 20px) scale(0.9); }
      100% { transform: translate(0px, 0px) scale(1); }
    }
    .animate-blob {
      animation: blob 7s infinite;
    }
    .animation-delay-2000 {
      animation-delay: 2s;
    }
  `}</style>
    </div>
  );

};

export default CTUCalendarPage;