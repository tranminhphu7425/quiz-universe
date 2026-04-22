// CTURoadmapPlannerPage.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import {
  Plus,
  Trash2,
  BookOpen,
  ChevronDown,
  ChevronUp,
  GripVertical,
  Search,
  X,
  Calendar,
  Info,
  Move,
  Download,
  Upload,
} from 'lucide-react';
import toast from 'react-hot-toast';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [showLibrary, setShowLibrary] = useState(false);
  const [expandedSemesters, setExpandedSemesters] = useState<Set<string>>(new Set());

  const getSemesterTotalCredits = (semester: Semester) =>
    semester.courses.reduce((sum, c) => sum + c.credits, 0);

  // Lưu vào localStorage
  useEffect(() => {
    localStorage.setItem('ctu_roadmap_years', JSON.stringify(academicYears));
  }, [academicYears]);

  // Tạo thư viện môn học từ dữ liệu hiện có
  useEffect(() => {
    const allCourses: Course[] = [];
    academicYears.forEach(year => {
      year.semesters.forEach(sem => {
        sem.courses.forEach(course => {
          if (!allCourses.some(c => c.code === course.code)) {
            allCourses.push(course);
          }
        });
      });
    });
    setCourseLibrary(allCourses);
  }, [academicYears]);

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
    if (window.confirm('Bạn có chắc muốn xóa năm học này?')) {
      setAcademicYears(academicYears.filter(y => y.id !== yearId));
      toast.success('Đã xóa năm học');
    }
  };

  // Thêm môn học vào kỳ
  const addCourseToSemester = (semesterId: string, course: Course) => {
    const newCourse = {
      ...course,
      id: `${course.code}_${Date.now()}_${Math.random()}`
    };
    
    setAcademicYears(prev => prev.map(year => ({
      ...year,
      semesters: year.semesters.map(sem => 
        sem.id === semesterId 
          ? { ...sem, courses: [...sem.courses, newCourse] }
          : sem
      )
    })));
    toast.success(`Đã thêm ${course.name} vào kỳ học`);
  };

  // Xóa môn học khỏi kỳ
  const removeCourseFromSemester = (semesterId: string, courseId: string) => {
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

  const reorderCoursesInSemester = (semesterId: string, nextCourses: Course[]) => {
    setAcademicYears(prev =>
      prev.map(year => ({
        ...year,
        semesters: year.semesters.map(sem =>
          sem.id === semesterId ? { ...sem, courses: nextCourses } : sem
        ),
      }))
    );
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

  // Toggle expand semester
  const toggleSemester = (semesterId: string) => {
    setExpandedSemesters(prev => {
      const newSet = new Set(prev);
      if (newSet.has(semesterId)) {
        newSet.delete(semesterId);
      } else {
        newSet.add(semesterId);
      }
      return newSet;
    });
  };

  // Lọc môn học từ thư viện
  const filteredCourses = courseLibrary.filter(course => 
    searchTerm === '' || 
    course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  // Import dữ liệu từ file JSON
  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (data && Array.isArray(data)) {
          setAcademicYears(data);
          toast.success('Đã nhập lộ trình học tập');
        } else {
          toast.error('File không đúng định dạng');
        }
      } catch {
        toast.error('Lỗi đọc file');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
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
                
                <label className="px-3 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white text-sm font-medium flex items-center gap-2 hover:bg-white/30 transition-all cursor-pointer">
                  <Upload className="w-4 h-4" />
                  Nhập
                  <input type="file" accept=".json" onChange={importData} className="hidden" />
                </label>
                
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

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Thư viện môn học */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <button
            onClick={() => setShowLibrary(!showLibrary)}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <BookOpen className="w-5 h-5 text-purple-600" />
            <span className="font-medium">Thư viện môn học</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showLibrary ? 'rotate-180' : ''}`} />
          </button>
          
          <AnimatePresence>
            {showLibrary && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700"
              >
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm môn học theo mã hoặc tên..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border rounded-lg bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                  />
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-64 overflow-y-auto">
                  {filteredCourses.map(course => (
                    <motion.div
                      key={course.id}
                      whileHover={{ scale: 1.02 }}
                      className="p-2 rounded-lg bg-gradient-to-r from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-700 cursor-grab"
                      draggable
                      onDragStartCapture={(e: React.DragEvent<HTMLDivElement>) => {
                        e.dataTransfer.setData('text/plain', JSON.stringify(course));
                      }}
                    >
                      <div className="font-medium text-sm text-gray-800 dark:text-white">{course.code}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{course.name}</div>
                      <div className="text-xs text-blue-600">{course.credits} TC</div>
                    </motion.div>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-3 text-center">💡 Kéo thả môn học từ đây vào các kỳ học bên dưới</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

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
                  <button
                    onClick={() => removeAcademicYear(year.id)}
                    className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
              
              {/* Semesters Grid */}
              <div className="p-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {year.semesters.map((semester) => (
                    <div
                      key={semester.id}
                      className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-slate-50/50 dark:bg-slate-900/30"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        const courseData = e.dataTransfer.getData('text/plain');
                        if (courseData) {
                          const course = JSON.parse(courseData);
                          addCourseToSemester(semester.id, course);
                        }
                      }}
                    >
                      {/* Semester Header */}
                      <div
                        className="p-3 bg-gradient-to-r from-slate-100 to-white dark:from-slate-800 dark:to-slate-800 cursor-pointer flex justify-between items-center"
                        onClick={() => toggleSemester(semester.id)}
                      >
                        <div>
                          <h3 className="font-semibold text-gray-800 dark:text-white">
                            {semester.name}
                          </h3>
                          <p className="text-xs text-gray-500">{semester.yearRange}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                            {getSemesterTotalCredits(semester)} TC
                          </span>
                          {expandedSemesters.has(semester.id) ? (
                            <ChevronUp className="w-4 h-4 text-gray-500" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-gray-500" />
                          )}
                        </div>
                      </div>
                      
                      {/* Semester Content */}
                      <AnimatePresence>
                        {expandedSemesters.has(semester.id) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="p-3"
                          >
                            {semester.courses.length === 0 && (
                              <div className="text-center py-8 text-gray-400 text-sm">
                                📚 Kéo thả môn học vào đây
                              </div>
                            )}

                            <Reorder.Group
                              axis="y"
                              values={semester.courses}
                              onReorder={(next) => reorderCoursesInSemester(semester.id, next)}
                              className="space-y-2 min-h-[200px]"
                            >
                              {semester.courses.map((course) => (
                                <Reorder.Item
                                  key={course.id}
                                  value={course}
                                  className={`p-3 rounded-xl bg-gradient-to-r ${getCourseColor(course)} text-white shadow-md group relative`}
                                >
                                  <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2">
                                        <div className="cursor-grab active:cursor-grabbing">
                                          <GripVertical className="w-4 h-4 opacity-70" />
                                        </div>
                                        <div>
                                          <div className="font-bold text-sm">{course.code}</div>
                                          <div className="text-xs opacity-90">{course.name}</div>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-2 mt-1 text-xs opacity-80">
                                        <span>{course.credits} TC</span>
                                        {course.prerequisite && (
                                          <span className="flex items-center gap-1">
                                            <Info className="w-3 h-3" />
                                            {course.prerequisite}
                                          </span>
                                        )}
                                      </div>
                                    </div>

                                    <div className="flex items-center gap-1">
                                      <button
                                        onClick={() => {
                                          const targetSemester = prompt('Nhập ID kỳ học đích (ví dụ: y2_fall):');
                                          if (targetSemester) {
                                            moveCourseToSemester(semester.id, targetSemester, course.id);
                                          }
                                        }}
                                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/20 rounded"
                                      >
                                        <Move className="w-3 h-3" />
                                      </button>
                                      <button
                                        onClick={() => removeCourseFromSemester(semester.id, course.id)}
                                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/20 rounded"
                                      >
                                        <X className="w-3 h-3" />
                                      </button>
                                    </div>
                                  </div>
                                </Reorder.Item>
                              ))}
                            </Reorder.Group>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tổng kết */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-xl border border-indigo-200 dark:border-indigo-800"
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

export default CTURoadmapPlannerPage;