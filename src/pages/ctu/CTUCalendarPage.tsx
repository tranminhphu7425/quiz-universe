// CourseRegistration.tsx
import React, { useEffect, useState } from 'react';
import {
  Sun,
  Moon,
  Trash2,
  CheckCircle,
  AlertCircle,
  Calendar,
  FileText,
  CreditCard,
  Mail,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Course, ClassSession, ClassGroupItem, ClassItem } from '@/shared/types/courses';




const CTUCalendarPage: React.FC = () => {


  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [addedCourses, setAddedCourses] = useState<Course[]>([]);
  const [selectedClasses, setSelectedClasses] = useState<ClassGroupItem[]>([]);

  const [courses, setCourses] = useState<Course[]>([]);


  useEffect(() => {

    const loadData = async () => {
      const local = await fetch("/quiz-universe/data/ket_qua_dkmh_full.json");
      const local1 = await fetch("/quiz-universe/data/ket_qua_dkmh_full1.json");
      const data = (await local.json()) as Course[];
      const data1 = (await local1.json()) as Course[];
      data.push(...data1);
      setCourses(data);
    }

    loadData();
  }, []);



  useEffect(() => {
    // nếu rỗng thì reset luôn
    if (search.trim() === "") {
      setSearchResults([]);
      return;
    }

    // ⏱️ debounce 1 giây
    const timeoutId = setTimeout(() => {
      const keyword = search.toLowerCase();

      const results = courses.filter((course) => {
        const info = course.data.data.hoc_phan_info;

        return (
          info.dkmh_tu_dien_hoc_phan_ma
            .toLowerCase()
            .includes(keyword) ||
          info.dkmh_tu_dien_hoc_phan_ten_vn
            .toLowerCase()
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


  // State quản lý tuần hiện tại (mặc định tuần 1)
  const [currentWeek, setCurrentWeek] = useState(1);
  const MAX_WEEKS = 20; // Giả sử học kỳ có tối đa 20 tuần

  // ... (previous logic)

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
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">

      {/* Header */}
      <div className="p-4 border-b bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold">Sắp xếp thời khóa biểu học</h1>

        </div>
      </div>

      <div className=" mx-auto p-4 lg:p-6">

        {/* Info Cards
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          { icon: FileText, color: "blue", title: "Thông tin đăng ký", desc: "Đăng ký học phần thạc sĩ" },
          { icon: Calendar, color: "green", title: "Thời khóa biểu", desc: "Xem lịch học các học phần" },
          { icon: CreditCard, color: "purple", title: "Thông tin học phí tạm", desc: "Xem thông tin học phí" },
        ].map(({ icon: Icon, color, title, desc }, i) => (
          <div
            key={i}
            className="p-4 rounded-lg border bg-white border-gray-200
                       dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="flex items-center space-x-3 mb-2">
              <Icon className={`w-5 h-5 text-${color}-600 dark:text-${color}-400`} />
              <h2 className="font-semibold">{title}</h2>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">{desc}</p>
          </div>
        ))}
      </div> */}

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">


            {/* Add New Course Section */}
            <div className="mb-6 p-4 rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700">
              <h2 className="text-lg font-semibold mb-4">Thêm học phần mới</h2>

              <div className="relative flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Tìm kiếm môn học"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setSelectedCourse(null);
                  }}
                  className="flex-1 p-2 border rounded dark:bg-gray-700 dark:text-white"
                />

                <button
                  onClick={addCourse}
                  disabled={!selectedCourse}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                >
                  Thêm
                </button>

                {/* Dropdown kết quả */}
                {searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-700 border rounded shadow z-10 max-h-64 overflow-y-auto">
                    {searchResults.map((course) => {
                      const info = course.data.data.hoc_phan_info;

                      return (
                        <div
                          key={course.ma_request}
                          onClick={() => {
                            setSelectedCourse(course);
                            setSearch(
                              `${info.dkmh_tu_dien_hoc_phan_ma} - ${info.dkmh_tu_dien_hoc_phan_ten_vn}`
                            );
                            setSearchResults([]);
                          }}
                          className="p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                          <div className="font-medium">
                            {info.dkmh_tu_dien_hoc_phan_ma} - {info.dkmh_tu_dien_hoc_phan_ten_vn} • {info.dkmh_tu_dien_hoc_phan_so_tin_chi} tín chỉ
                          </div>

                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            {/* Main Table */}
            <div className="rounded-lg border bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold">1. Danh sách học phần theo KHHT</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100 dark:bg-gray-700 text-left">
                    <tr>
                      {["STT", "Mã HP", "Tên học phần", "Nhóm", "TC", "Giảng viên", "Xóa"].map(h => (
                        <th key={h} className="p-3 font-medium">{h}</th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {addedCourses.map((course, index) => {
                      const info = course.data.data.hoc_phan_info;
                      const classes = course.data.data.data;

                      return (
                        <tr
                          key={course.ma_request}
                          className="border-t border-gray-200 hover:bg-gray-50
                   dark:border-gray-700 dark:hover:bg-gray-700/50"
                        >
                          {/* STT */}
                          <td className="p-3 text-center">{index + 1}</td>

                          {/* Mã học phần */}
                          <td className="p-3 font-medium text-blue-700 dark:text-blue-400">
                            {info.dkmh_tu_dien_hoc_phan_ma}
                          </td>

                          {/* Tên môn học */}
                          <td className="p-3">
                            {info.dkmh_tu_dien_hoc_phan_ten_vn}
                          </td>

                          {/* Nhóm học */}
                          <td className="p-3">
                            <select
                              className="w-full p-2 border rounded
               dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                              value={
                                selectedClasses?.find(
                                  (c) =>
                                    c.hoc_phan_ma ===
                                    info.dkmh_tu_dien_hoc_phan_ma
                                )?.nhom_hoc_phan_ma || ""
                              }
                              onChange={(e) => {
                                const value = e.target.value;

                                // 👉 Nếu chọn "-- Chọn nhóm --"
                                if (value === "") {
                                  handleRemoveClass(course);
                                  return;
                                }

                                const groups = groupClassItems(course.data.data.data);
                                const selected = groups.find(
                                  (g) => g.nhom_hoc_phan_ma === value
                                );

                                if (selected) {
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

                          {/* Số tín chỉ */}
                          <td className="p-3 text-center">
                            {info.dkmh_tu_dien_hoc_phan_so_tin_chi}
                          </td>

                          {/* Số lớp mở */}
                          <td className="p-3 text-center">
                            {classes.length}
                          </td>

                          {/* Hành động */}
                          <td className="p-3 text-center">
                            <button
                              onClick={() => deleteCourse(course.ma_request)}
                              className="p-2 rounded text-red-600 hover:bg-red-100
                       dark:text-red-400 dark:hover:bg-red-900/30"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>

                        </tr>
                      );
                    })}
                  </tbody>


                </table>
              </div>



            </div>
          </div>

          {/* Phần Thời khóa biểu bổ sung */}
          <div className="flex-1 mt-8 rounded-lg border bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold">2. Thời khóa biểu học phần</h2>
            </div>

            {/* Header của lịch */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <h3 className="text-lg font-semibold">Thời khóa biểu</h3>

                  {/* Điều khiển tuần */}
                  <div className="flex items-center gap-2 bg-white dark:bg-gray-700 px-3 py-1 rounded-full shadow-sm">
                    <button
                      onClick={() => setCurrentWeek(Math.max(1, currentWeek - 1))}
                      disabled={currentWeek === 1}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full disabled:opacity-30"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <span className="font-medium min-w-[80px] text-center">
                      Tuần {currentWeek}
                    </span>

                    <button
                      onClick={() => setCurrentWeek(Math.min(MAX_WEEKS, currentWeek + 1))}
                      disabled={currentWeek === MAX_WEEKS}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full disabled:opacity-30"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {/* <div className="text-sm text-gray-600 dark:text-gray-300">2025:</div> */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentWeek(1)}
                      className="px-3 py-1 text-sm text-blue-600 font-medium hover:underline"
                    >
                      Về tuần 1
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Lưới thời khóa biểu */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="p-3 font-medium text-center w-24">Thời gian</th>
                    {['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'].map((day, index) => (
                      <th key={index} className={`p-3 font-medium text-center ${index === 6 ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                        }`}>
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>

                  {/* Tiết tiếp theo */}
                  {[1, 2, 3, 4, 5].map((tiet) => (
                    <tr key={tiet}>
                      <td className="p-2 text-center text-sm font-medium border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
                        Tiết {tiet}
                      </td>
                      {Array(7).fill(null).map((_, colIndex) => (
                        <td
                          key={colIndex}
                          className="p-1 border border-gray-200 dark:border-gray-700 h-24"
                        >
                          {(() => {
                            const result = getClassAtCell(tiet, colIndex, selectedClasses);

                            if (!result) return null;
                            const { group, session } = result;

                            return (
                              <div className="p-2 rounded w-full bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700">
                                <div className="font-medium text-sm">
                                  {group.ten_hoc_phan}
                                </div>

                                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                  {group.lop_hoc_phan_lop_ma} ({group.nhom_hoc_phan_ma})
                                </div>

                                <div className="text-xs text-gray-600 dark:text-gray-400">
                                  {session.phong_hoc}
                                </div>
                              </div>
                            );
                          })()}
                        </td>

                      ))}
                    </tr>
                  ))}



                  {/* Tiết chiều tiếp theo */}
                  {[6, 7, 8, 9].map((tiet) => (
                    <tr key={tiet}>
                      <td className="p-2 text-center text-sm font-medium border-r border-gray-200 dark:border-gray-700 bg-yellow-50 dark:bg-yellow-900/10">
                        Tiết {tiet}
                      </td>
                      {Array(7).fill(null).map((_, colIndex) => (
                        <td
                          key={colIndex}
                          className="p-1 border border-gray-200 dark:border-gray-700 h-24"
                        >
                          {(() => {
                            const result = getClassAtCell(tiet, colIndex, selectedClasses);

                            if (!result) return null;
                            const { group, session } = result;

                            return (
                              <div className="p-2 rounded w-full bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700">
                                <div className="font-medium text-sm">
                                  {group.ten_hoc_phan}
                                </div>

                                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                  {group.lop_hoc_phan_lop_ma} ({group.nhom_hoc_phan_ma})
                                </div>

                                <div className="text-xs text-gray-600 dark:text-gray-400">
                                  {session.phong_hoc}
                                </div>
                              </div>
                            );
                          })()}
                        </td>

                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>


          </div>
        </div>

      </div>
    </div>
  );

};

export default CTUCalendarPage;