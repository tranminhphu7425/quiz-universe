// CTURoadmapPlannerPage.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import {
  MdAdd as Plus,
  MdDeleteOutline as Trash2,
  MdMenuBook as BookOpen,
  MdExpandMore as ChevronDown,
  MdExpandLess as ChevronUp,
  MdDragIndicator as GripVertical,
  MdSearch as Search,
  MdClose as X,
  MdCalendarToday as Calendar,
  MdInfoOutline as Info,
  MdOpenWith as Move,
  MdDownload as Download,
  MdUpload as Upload,
} from 'react-icons/md';
import toast from 'react-hot-toast';
import { fetchSubjects } from '@/shared/api/subjectApi';
import { Subject } from '@/shared/types/subject';
import { PaginatedResponse } from '@/shared/types/pagination';

// Định nghĩa kiểu dữ liệu
interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  prerequisite: string; // Mã học phần tiên quyết
  isRequired: boolean;
  color?: string;
}

interface Semester {
  id: string;
  name: string;
  yearRange: string; // Ví dụ: "2023-2024"
  term: 'summer' | 'fall' | 'spring'; // hè, kì 1, kì 2
  order: number;
  courses: Course[];
  totalCredits?: number;
}

interface AcademicYear {
  id: string;
  name: string;
  semesters: Semester[];
}

// Màu sắc cho các loại học phần
const courseColors = {
  required: 'from-blue-500 to-indigo-500',
  elective: 'from-purple-500 to-pink-500',
  physical: 'from-green-500 to-emerald-500',
  political: 'from-red-500 to-orange-500',
  thesis: 'from-amber-500 to-yellow-500',
  internship: 'from-cyan-500 to-teal-500',
};

const CTURoadmapPlannerPage: React.FC = () => {
  // State quản lý các năm học
  const [academicYears, setAcademicYears] = useState<AcademicYear[]>(() => {
    const saved = localStorage.getItem('ctu_roadmap_years');
    if (saved) return JSON.parse(saved);
    
    // Dữ liệu mẫu từ đề bài
    return [
      {
        id: 'year1',
        name: 'Năm 1',
        semesters: [
            {
                id: 'y1_fall',
                name: 'Học kì 1',
                yearRange: '2025-2026',
                term: 'fall',
                order: 0,
                courses: [
                 
                ]
              },
              {
                id: 'y1_spring',
                name: 'Học kì 2',
                yearRange: '2025-2026',
                term: 'spring',
                order: 1,
                courses: [
                 
                ]
              },
              {
                id: 'y1_summer',
                name: 'Học kì 3',
                yearRange: '2025-2026',
                term: 'summer',
                order: 2,
                courses: [
                 
                ]
              }
        ]
      },
      {
        id: 'year2',
        name: 'Năm 2',
        semesters: [
          {
            id: 'y2_fall',
            name: 'Học kì 1',
            yearRange: '2024-2025',
            term: 'fall',
            order: 0,
            courses: [
              
            ]
          },
          {
            id: 'y2_spring',
            name: 'Học kì 2',
            yearRange: '2024-2025',
            term: 'spring',
            order: 1,
            courses: [
              
            ]
          },
          {
            id: 'y2_summer',
            name: 'Học kì 3',
            yearRange: '2024-2025',
            term: 'summer',
            order: 2,
            courses: [
            
            ]
          }
        ]
      },
      {
        id: 'year3',
        name: 'Năm 3',
        semesters: [
          {
            id: 'y3_fall',
            name: 'Học kì 1',
            yearRange: '2025-2026',
            term: 'fall',
            order: 0,
            courses: [
              
            ]
          },
          {
            id: 'y3_spring',
            name: 'Học kì 2',
            yearRange: '2025-2026',
            term: 'spring',
            order: 1,
            courses: [
            
            ]
          },
          {
            id: 'y3_summer',
            name: 'Học kì 3',
            yearRange: '2025-2026',
            term: 'summer',
            order: 2,
            courses: [
            
            ]
          }
        ]
      },
      {
        id: 'year4',
        name: 'Năm 4',
        semesters: [
          {
            id: 'y4_fall',
            name: 'Học kì 1',
            yearRange: '2026-2027',
            term: 'fall',
            order: 0,
            courses: [
             
            ]
          },
          {
            id: 'y4_spring',
            name: 'Học kì 2',
            yearRange: '2026-2027',
            term: 'spring',
            order: 1,
            courses: [
              
            ]
          },
          {
            id: 'y4_summer',
            name: 'Học kì 3',
            yearRange: '2026-2027',
            term: 'summer',
            order: 2,
            courses: [
              
            ]
          }
        ]
      }
    ];
  });

  const [courseLibrary, setCourseLibrary] = useState<Course[]>([]);
  const [isLoadingLibrary, setIsLoadingLibrary] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showLibrary, setShowLibrary] = useState(window.innerWidth >= 1024);
  const [draggedOverSemester, setDraggedOverSemester] = useState<string | null>(null);

  const getSemesterTotalCredits = (semester: Semester) =>
    semester.courses.reduce((sum, c) => sum + c.credits, 0);

  // Lưu vào localStorage
  useEffect(() => {
    localStorage.setItem('ctu_roadmap_years', JSON.stringify(academicYears));
  }, [academicYears]);

  // Load thư viện môn học từ database với phân trang
  const loadSubjects = async (pageNum: number, isNewSearch = false, keyword = '') => {
    setIsLoadingLibrary(true);
    try {
      const response: PaginatedResponse<Subject> = await fetchSubjects({
        page: pageNum,
        size: 10,
        sort: 'name,asc',
        keyword: keyword
      });
      
      const mappedSubjects: Course[] = response.content.map((s: Subject) => ({
        id: `db_${s.subjectId}_${s.code}`,
        code: s.code,
        name: s.name,
        credits: 3,
        prerequisite: '',
        isRequired: true
      }));

      if (isNewSearch) {
        setCourseLibrary(mappedSubjects);
      } else {
        setCourseLibrary(prev => {
          // Tránh trùng lặp
          const existingCodes = new Set(prev.map(c => c.code));
          const newOnes = mappedSubjects.filter(c => !existingCodes.has(c.code));
          return [...prev, ...newOnes];
        });
      }
      
      setHasMore(!response.last);
    } catch (error) {
      console.error('Lỗi khi load môn học:', error);
      toast.error('Không thể tải danh sách môn học');
    } finally {
      setIsLoadingLibrary(false);
    }
  };

  // Effect cho debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(0);
      loadSubjects(0, true, searchTerm);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadSubjects(nextPage, false, searchTerm);
  };

  // Thêm năm học mới
  const addAcademicYear = () => {
    const newYearId = `year${academicYears.length + 1}`;
    const newYear: AcademicYear = {
      id: newYearId,
      name: `Năm ${academicYears.length + 1}`,
      semesters: [
        {
          id: `${newYearId}_fall`,
          name: 'Học kì 1',
          yearRange: `${new Date().getFullYear() + academicYears.length}-${new Date().getFullYear() + academicYears.length + 1}`,
          term: 'fall',
          order: 0,
          courses: []
        },
        {
          id: `${newYearId}_spring`,
          name: 'Học kì 2',
          yearRange: `${new Date().getFullYear() + academicYears.length}-${new Date().getFullYear() + academicYears.length + 1}`,
          term: 'spring',
          order: 1,
          courses: []
        },
        {
          id: `${newYearId}_summer`,
          name: 'Học kì 3',
          yearRange: `${new Date().getFullYear() + academicYears.length}-${new Date().getFullYear() + academicYears.length + 1}`,
          term: 'summer',
          order: 2,
          courses: []
        }
      ]
    };
    setAcademicYears([...academicYears, newYear]);
    toast.success('Đã thêm năm học mới');
  };

  // Xóa năm học
  const removeAcademicYear = (yearId: string) => {
    if (academicYears.length === 1) {
      toast.error('Không thể xóa năm học duy nhất');
      return;
    }
    
    // Ràng buộc: chỉ có thể xóa năm học cuối cùng
    const yearIndex = academicYears.findIndex(y => y.id === yearId);
    if (yearIndex < academicYears.length - 1) {
      toast.error('Vui lòng xóa các năm học cao hơn trước!');
      return;
    }

    if (window.confirm('Bạn có chắc muốn xóa năm học này? Toàn bộ môn học trong năm này sẽ bị xóa khỏi lộ trình.')) {
      setAcademicYears(academicYears.filter(y => y.id !== yearId));
      toast.success('Đã xóa năm học');
    }
  };

  // Xử lý khi thả môn học vào kỳ học (từ thư viện hoặc từ kỳ khác)
  const handleDropToSemester = (e: React.DragEvent, targetSemesterId: string) => {
    e.preventDefault();
    setDraggedOverSemester(null);
    
    const courseData = e.dataTransfer.getData('text/plain');
    const sourceSemesterId = e.dataTransfer.getData('sourceSemesterId');
    
    if (!courseData) return;

    try {
      const course = JSON.parse(courseData) as Course;
      
      // Nếu kéo từ kỳ này sang chính nó thì không làm gì (trừ khi sau này muốn reorder bằng drop)
      if (sourceSemesterId === targetSemesterId) return;

      setAcademicYears(prev => {
        let newYears = [...prev];
        
        // 1. Nếu kéo từ kỳ khác sang, xóa ở kỳ cũ trước
        if (sourceSemesterId) {
          newYears = newYears.map(year => ({
            ...year,
            semesters: year.semesters.map(sem => 
              sem.id === sourceSemesterId 
                ? { ...sem, courses: sem.courses.filter(c => c.id !== course.id) }
                : sem
            )
          }));
        }

        // 2. Thêm vào kỳ mới (tạo ID mới nếu từ thư viện, giữ ID nếu di chuyển)
        const newCourse = {
          ...course,
          id: sourceSemesterId ? course.id : `${course.code}_${Date.now()}_${Math.random()}`
        };
        
        return newYears.map(year => ({
          ...year,
          semesters: year.semesters.map(sem => {
            if (sem.id === targetSemesterId) {
              // Kiểm tra xem môn học đã tồn tại trong kỳ này chưa
              if (sem.courses.some(c => c.code === course.code)) {
                toast.error('Môn học này đã có trong kỳ này');
                return sem;
              }
              return { ...sem, courses: [...sem.courses, newCourse] };
            }
            return sem;
          })
        }));
      });

      if (sourceSemesterId) {
        toast.success(`Đã chuyển ${course.name}`);
      } else {
        toast.success(`Đã thêm ${course.name}`);
      }
    } catch (err) {
      console.error("Lỗi parse dữ liệu kéo thả", err);
    }
  };

  const onDragOver = (e: React.DragEvent, semesterId: string) => {
    e.preventDefault();
    if (draggedOverSemester !== semesterId) {
      setDraggedOverSemester(semesterId);
    }
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    // Chúng ta không set null ngay vì có thể đang drag qua các phần tử con
  };

  // Reorder thủ công (vì không dùng Reorder.Group nữa)
  const moveCourseUpDown = (semesterId: string, courseId: string, direction: 'up' | 'down') => {
    setAcademicYears(prev => prev.map(year => ({
      ...year,
      semesters: year.semesters.map(sem => {
        if (sem.id !== semesterId) return sem;
        const index = sem.courses.findIndex(c => c.id === courseId);
        if (index === -1) return sem;
        
        const newCourses = [...sem.courses];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        
        if (targetIndex >= 0 && targetIndex < newCourses.length) {
          [newCourses[index], newCourses[targetIndex]] = [newCourses[targetIndex], newCourses[index]];
        }
        
        return { ...sem, courses: newCourses };
      })
    })));
  };

  // Xóa môn học khỏi kỳ
  const removeSubjectFromSemester = (semesterId: string, courseId: string) => {
    setAcademicYears(prev => prev.map(year => ({
      ...year,
      semesters: year.semesters.map(sem => 
        sem.id === semesterId 
          ? { ...sem, courses: sem.courses.filter(c => c.id !== courseId) }
          : sem
      )
    })));
    toast.success('Đã xóa môn học');
  };

  // Di chuyển môn học sang kỳ khác
  const moveCourseToSemester = (sourceSemesterId: string, targetSemesterId: string, courseId: string) => {
    let movedCourse: Course | undefined;
    
    // Tìm và xóa môn học khỏi kỳ nguồn
    setAcademicYears(prev => {
      const newYears = [...prev];
      let sourceSem: Semester | null = null;
      let targetSem: Semester | null = null;
      
      // Tìm kỳ nguồn và kỳ đích
      for (const year of newYears) {
        for (const sem of year.semesters) {
          if (sem.id === sourceSemesterId) sourceSem = sem;
          if (sem.id === targetSemesterId) targetSem = sem;
        }
      }
      
      if (sourceSem && targetSem) {
        const courseIndex = sourceSem.courses.findIndex(c => c.id === courseId);
        if (courseIndex !== -1) {
          movedCourse = sourceSem.courses[courseIndex];
          sourceSem.courses.splice(courseIndex, 1);
          targetSem.courses.push(movedCourse);
        }
      }
      
      return newYears;
    });
    
    if (movedCourse) {
      toast.success(`Đã di chuyển ${movedCourse.name} sang kỳ mới`);
    }
  };



  // Lọc môn học từ thư viện (Đã chuyển sang search từ server)
  const filteredCourses = courseLibrary;

  // Tính tổng tín chỉ toàn khóa
  const totalCredits = useMemo(() => {
    let total = 0;
    academicYears.forEach(year => {
      year.semesters.forEach(sem => {
        total += sem.courses.reduce((sum, c) => sum + c.credits, 0);
      });
    });
    return total;
  }, [academicYears]);

  // Lấy màu cho môn học dựa trên mã hoặc tên
  const getCourseColor = (course: Course) => {
    if (course.code.startsWith('TC')) return courseColors.physical;
    if (course.code.startsWith('ML')) return courseColors.political;
    if (course.name.includes('Luận văn')) return courseColors.thesis;
    if (course.name.includes('Thực tập')) return courseColors.internship;
    if (!course.isRequired) return courseColors.elective;
    return courseColors.required;
  };

  // Xuất dữ liệu ra file JSON
  const exportData = () => {
    const dataStr = JSON.stringify(academicYears, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ctu_roadmap_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success('Đã xuất lộ trình học tập');
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-lg">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/20 rounded-full blur-3xl animate-blob" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
        </div>
        
        <div className="relative p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="p-2 bg-white/20 rounded-xl backdrop-blur-sm"
                >
                  <Calendar className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-2xl md:text-3xl font-bold text-white"
                  >
                    Lộ trình học tập 4 năm
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-white/80 text-sm mt-1"
                  >
                    Sắp xếp kế hoạch học tập toàn khóa | Tổng tín chỉ: {totalCredits}
                  </motion.p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={exportData}
                  className="px-3 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white text-sm font-medium flex items-center gap-2 hover:bg-white/30 transition-all"
                >
                  <Download className="w-4 h-4" />
                  Xuất
                </motion.button>
                
                
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={addAcademicYear}
                  className="px-3 py-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg text-white text-sm font-medium flex items-center gap-2 shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                  Thêm năm
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-[1600px]">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Cột trái: Thư viện & Tổng kết (Desktop) */}
          <div className="w-full lg:w-[350px] xl:w-[400px] shrink-0 lg:sticky lg:top-[5.5rem] z-20">
            {/* Thư viện môn học */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 lg:mb-0"
            >
              <button
                onClick={() => setShowLibrary(!showLibrary)}
                className="flex items-center justify-between w-full gap-2 px-4 py-2.5 bg-white dark:bg-slate-800/80 dark:backdrop-blur-md rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md hover:border-purple-300 dark:hover:border-purple-500/50 transition-all group"
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-slate-700 dark:text-slate-200">Thư viện môn học</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${showLibrary ? 'rotate-180' : ''}`} />
              </button>
          
          <AnimatePresence>
            {showLibrary && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-3 p-5 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 z-30 relative"
              >
                <div className="relative mb-5">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm mã hoặc tên học phần..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border rounded-xl bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3 max-h-72 lg:max-h-[calc(100vh-320px)] overflow-y-auto pr-2 custom-scrollbar">
                  {isLoadingLibrary ? (
                    <div className="col-span-full py-10 flex flex-col items-center justify-center gap-3">
                      <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                      <p className="text-sm text-slate-500">Đang tải môn học...</p>
                    </div>
                  ) : filteredCourses.length > 0 ? (
                    filteredCourses.map(course => (
                      <motion.div
                        key={course.id}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="p-3 rounded-xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 hover:border-purple-400 dark:hover:border-purple-500 shadow-sm cursor-grab active:cursor-grabbing group transition-all"
                        draggable
                        onDragStartCapture={(e: React.DragEvent<HTMLDivElement>) => {
                          e.dataTransfer.setData('text/plain', JSON.stringify(course));
                        }}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-bold text-xs px-2 py-0.5 bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 rounded-md">
                            {course.code}
                          </span>
                          <div className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-1.5 py-0.5 rounded">
                            {course.credits} TC
                          </div>
                        </div>
                        <div className="text-sm font-medium text-slate-700 dark:text-slate-200 line-clamp-2 leading-tight group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                          {course.name}
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-full py-10 text-center text-slate-400 dark:text-slate-500">
                      Không tìm thấy môn học nào phù hợp
                    </div>
                  )}
                </div>

                {hasMore && !isLoadingLibrary && (
                  <div className="mt-4 flex justify-center">
                    <button
                      onClick={handleLoadMore}
                      className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline"
                    >
                      Xem thêm môn học...
                    </button>
                  </div>
                )}
                <div className="flex items-center justify-center gap-2 mt-4 text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/50 py-2 rounded-lg border border-dashed border-slate-200 dark:border-slate-700">
                  <span className="animate-bounce">💡</span>
                  Kéo thả môn học vào các kỳ học bên dưới để lập kế hoạch
                </div>
              </motion.div>
            )}
            </AnimatePresence>
          </motion.div>

          {/* Tổng kết (Desktop) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 p-5 hidden lg:block bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-2xl border border-indigo-200 dark:border-indigo-800/50 shadow-sm"
          >
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2">
              <Info className="w-4 h-4 text-purple-500" />
              Tổng kết kế hoạch
            </h3>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-white/60 dark:bg-slate-800/60 p-3 rounded-xl border border-white/40 dark:border-slate-700/50">
                <p className="text-[10px] text-gray-500 mb-1">Tổng tín chỉ</p>
                <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{totalCredits}</p>
              </div>
              <div className="bg-white/60 dark:bg-slate-800/60 p-3 rounded-xl border border-white/40 dark:border-slate-700/50">
                <p className="text-[10px] text-gray-500 mb-1">Số học phần</p>
                <p className="text-xl font-bold text-purple-600 dark:text-purple-400">
                  {academicYears.reduce((sum, y) => sum + y.semesters.reduce((s, sem) => s + sem.courses.length, 0), 0)}
                </p>
              </div>
              <div className="bg-white/60 dark:bg-slate-800/60 p-3 rounded-xl border border-white/40 dark:border-slate-700/50">
                <p className="text-[10px] text-gray-500 mb-1">Số năm học</p>
                <p className="text-xl font-bold text-pink-600 dark:text-pink-400">{academicYears.length}</p>
              </div>
              <div className="bg-white/60 dark:bg-slate-800/60 p-3 rounded-xl border border-white/40 dark:border-slate-700/50">
                <p className="text-[10px] text-gray-500 mb-1">Số kỳ học</p>
                <p className="text-xl font-bold text-cyan-600 dark:text-cyan-400">
                  {academicYears.reduce((sum, y) => sum + y.semesters.length, 0)}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Cột phải: Lộ trình */}
        <div className="flex-1 w-full min-w-0">
          {/* Danh sách các năm học */}
          <div className="space-y-6">
          {academicYears.map((year, yearIndex) => (
            <motion.div
              key={year.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: yearIndex * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700"
            >
              {/* Year Header */}
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-3 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-bold text-white">{year.name}</h2>
                  <span className="text-xs px-2 py-1 bg-white/20 rounded-full text-white">
                    {year.semesters.reduce((sum, sem) => sum + getSemesterTotalCredits(sem), 0)} TC
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {yearIndex === academicYears.length - 1 && academicYears.length > 1 && (
                    <button
                      onClick={() => removeAcademicYear(year.id)}
                      className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                      title="Xóa năm học này"
                    >
                      <Trash2 className="w-4 h-4 text-white" />
                    </button>
                  )}
                </div>
              </div>
              
              {/* Semesters Grid */}
              <div className="p-4">
                <div className="grid grid-cols-1 gap-4">
                  {year.semesters.map((semester) => (
                    <div
                      key={semester.id}
                      className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                        draggedOverSemester === semester.id 
                          ? 'border-purple-500 bg-purple-50/50 dark:bg-purple-900/20 scale-[1.02] shadow-lg z-10' 
                          : 'border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/30'
                      }`}
                      onDragOver={(e) => onDragOver(e, semester.id)}
                      onDragLeave={() => setDraggedOverSemester(null)}
                      onDrop={(e) => handleDropToSemester(e, semester.id)}
                    >
                      {/* Semester Header */}
                      <div className="p-3 bg-gradient-to-r from-slate-100 to-white dark:from-slate-800 dark:to-slate-800 flex justify-between items-center border-b border-slate-200 dark:border-slate-700">
                        <div className='flex flex-row gap-3 items-center '>
                          <h3 className="font-semibold text-gray-800 dark:text-white">
                            {semester.name}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1">{semester.yearRange}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                            {getSemesterTotalCredits(semester)} TC
                          </span>
                        </div>
                      </div>
                      
                      {/* Semester Content */}
                      <div className="p-5">
                        {semester.courses.length === 0 && (
                          <div className="text-center py-4 text-gray-400 text-sm">
                            📚 Kéo thả môn học vào đây
                          </div>
                        )}

                            <div className="space-y-2">
                              {semester.courses.map((course, idx) => (
                                <motion.div
                                  key={course.id}
                                  layout
                                  draggable
                                  onDragStartCapture={(e: React.DragEvent) => {
                                    e.dataTransfer.setData('text/plain', JSON.stringify(course));
                                    e.dataTransfer.setData('sourceSemesterId', semester.id);
                                    const target = e.currentTarget as HTMLElement;
                                    setTimeout(() => target.style.opacity = '0.4', 0);
                                  }}
                                  onDragEndCapture={(e: React.DragEvent) => {
                                    const target = e.currentTarget as HTMLElement;
                                    target.style.opacity = '1';
                                    setDraggedOverSemester(null);
                                  }}
                                  className={`p-2 rounded-lg bg-gradient-to-r ${getCourseColor(course)} text-white shadow-sm group relative cursor-grab active:cursor-grabbing transition-all hover:shadow-md hover:scale-[1.01]`}
                                >
                                  <div className="flex items-center gap-3">
                                    <GripVertical className="w-4 h-4 opacity-40 shrink-0" />
                                    
                                    <div className="flex-1 flex items-center gap-4 min-w-0">
                                      <span className="font-mono font-bold text-xs bg-white/20 px-2 py-0.5 rounded shrink-0">
                                        {course.code}
                                      </span>
                                      
                                      <span className="text-sm font-medium truncate flex-1">
                                        {course.name}
                                      </span>
                                      
                                      <div className="flex items-center gap-3 shrink-0">
                                        <span className="text-[10px] font-bold bg-black/10 px-1.5 py-0.5 rounded-full">
                                          {course.credits} TC
                                        </span>
                                        
                                        {course.prerequisite && (
                                          <div className="group/info relative">
                                            <Info className="w-3.5 h-3.5 opacity-70" />
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-[10px] rounded shadow-xl opacity-0 group-hover/info:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20">
                                              Tiên quyết: {course.prerequisite}
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    <div className="flex items-center gap-1 shrink-0 ml-2 border-l border-white/20 pl-2">
                                      <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button 
                                          onClick={(e) => { e.stopPropagation(); moveCourseUpDown(semester.id, course.id, 'up'); }}
                                          className="p-1 hover:bg-white/20 rounded disabled:opacity-30"
                                          disabled={idx === 0}
                                        >
                                          <ChevronUp className="w-3.5 h-3.5" />
                                        </button>
                                        <button 
                                          onClick={(e) => { e.stopPropagation(); moveCourseUpDown(semester.id, course.id, 'down'); }}
                                          className="p-1 hover:bg-white/20 rounded disabled:opacity-30"
                                          disabled={idx === semester.courses.length - 1}
                                        >
                                          <ChevronDown className="w-3.5 h-3.5" />
                                        </button>
                                      </div>
                                      <button
                                        onClick={(e) => { e.stopPropagation(); removeSubjectFromSemester(semester.id, course.id); }}
                                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-500/50 rounded"
                                      >
                                        <X className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tổng kết (Mobile) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 p-4 lg:hidden bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-xl border border-indigo-200 dark:border-indigo-800"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-xs text-gray-500">Tổng tín chỉ</p>
              <p className="text-2xl font-bold text-indigo-600">{totalCredits}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Số học phần</p>
              <p className="text-2xl font-bold text-purple-600">
                {academicYears.reduce((sum, y) => sum + y.semesters.reduce((s, sem) => s + sem.courses.length, 0), 0)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Số năm học</p>
              <p className="text-2xl font-bold text-pink-600">{academicYears.length}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Số kỳ học</p>
              <p className="text-2xl font-bold text-cyan-600">
                {academicYears.reduce((sum, y) => sum + y.semesters.length, 0)}
              </p>
            </div>
          </div>
        </motion.div>
          </div>
        </div>
      </div>

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
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #334155;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #475569;
        }
      `}</style>
    </div>
  );
};

export default CTURoadmapPlannerPage;