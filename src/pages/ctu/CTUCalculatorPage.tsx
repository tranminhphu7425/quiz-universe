import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Trash2,
  Calculator,
  Target,
  Info,
  RotateCcw,
  CheckCircle2,
  BookOpen,
  Award,
  Star,
  AlertCircle,
  TrendingUp
} from 'lucide-react';
import { toast } from 'react-hot-toast';

interface CourseEntry {
  id: string;
  name: string;
  credits: number;
  score10: number;
  isConditional: boolean;
}

const gradingScale = [
  { min: 9.0, max: 10.0, letter: 'A', point4: 4.0, color: 'from-emerald-400 to-green-500', bgColor: 'bg-emerald-100 dark:bg-emerald-900/30' },
  { min: 8.0, max: 8.99, letter: 'B+', point4: 3.5, color: 'from-green-400 to-emerald-500', bgColor: 'bg-green-100 dark:bg-green-900/30' },
  { min: 7.0, max: 7.99, letter: 'B', point4: 3.0, color: 'from-lime-400 to-green-500', bgColor: 'bg-lime-100 dark:bg-lime-900/30' },
  { min: 6.5, max: 6.99, letter: 'C+', point4: 2.5, color: 'from-yellow-400 to-amber-500', bgColor: 'bg-yellow-100 dark:bg-yellow-900/30' },
  { min: 5.5, max: 6.49, letter: 'C', point4: 2.0, color: 'from-orange-400 to-amber-500', bgColor: 'bg-orange-100 dark:bg-orange-900/30' },
  { min: 5.0, max: 5.49, letter: 'D+', point4: 1.5, color: 'from-orange-500 to-red-500', bgColor: 'bg-orange-100 dark:bg-orange-900/30' },
  { min: 4.0, max: 4.99, letter: 'D', point4: 1.0, color: 'from-red-400 to-red-500', bgColor: 'bg-red-100 dark:bg-red-900/30' },
  { min: 0.0, max: 3.99, letter: 'F', point4: 0.0, color: 'from-red-600 to-red-700', bgColor: 'bg-red-100 dark:bg-red-900/30' },
];




const getGradeDetails = (score10: number) => {
  const grade = gradingScale.find(g => score10 >= g.min && score10 <= g.max);
  return grade || gradingScale[gradingScale.length - 1];
};

const CTUCalculatorPage: React.FC = () => {
  const [courses, setCourses] = useState<CourseEntry[]>(() => {
    const saved = localStorage.getItem('ctu_calculator_courses');
    return saved ? JSON.parse(saved) : [
      { id: '1', name: '', credits: 3, score10: 0, isConditional: false }
    ];
  });

  // Component Tab Header
  // Thêm state quản lý tab active
  const [activeTab, setActiveTab] = useState<'calculator' | 'roadmap'>('calculator');

  const TabHeader = () => (
    <div className="flex gap-2 mb-6 border-b border-slate-200 dark:border-slate-700">
      <button
        onClick={() => setActiveTab('calculator')}
        className={`px-6 py-3 font-medium transition-all rounded-t-lg ${activeTab === 'calculator'
            ? 'bg-blue-600 text-white shadow-lg'
            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
      >
        📊 Máy tính GPA
      </button>
      <button
        onClick={() => setActiveTab('roadmap')}
        className={`px-6 py-3 font-medium transition-all rounded-t-lg ${activeTab === 'roadmap'
            ? 'bg-purple-600 text-white shadow-lg'
            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
      >
        🎯 Lộ trình ra trường
      </button>
    </div>
  );


  const [prevCredits, setPrevCredits] = useState<number>(() => {
    return Number(localStorage.getItem('ctu_prev_credits')) || 0;
  });
  const [currentGPA, setCurrentGPA] = useState<number>(() => {
    return Number(localStorage.getItem('ctu_current_gpa')) || 0;
  });
  const [targetGPA, setTargetGPA] = useState<number>(3.0);
  const [semesterCreditsTarget, setSemesterCreditsTarget] = useState<number>(15);

  // Graduation Goal States
  const [totalProgramCredits, setTotalProgramCredits] = useState<number>(() => {
    return Number(localStorage.getItem('ctu_total_program_credits')) || 140;
  });
  const [gradTargetGPA, setGradTargetGPA] = useState<number>(3.2);

  useEffect(() => {
    localStorage.setItem('ctu_calculator_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('ctu_prev_credits', prevCredits.toString());
    localStorage.setItem('ctu_current_gpa', currentGPA.toString());
    localStorage.setItem('ctu_total_program_credits', totalProgramCredits.toString());
  }, [prevCredits, currentGPA, totalProgramCredits]);

  const results = useMemo(() => {
    let totalCreditsHK = 0;
    let totalCreditsTL = 0;
    let totalPointsTL = 0;

    courses.forEach(c => {
      if (c.isConditional) return;

      const { point4 } = getGradeDetails(c.score10);

      totalCreditsHK += c.credits;

      if (point4 >= 1.0) {
        totalCreditsTL += c.credits;
        totalPointsTL += point4 * c.credits;
      }
    });

    const gpaTL = totalCreditsTL > 0 ? totalPointsTL / totalCreditsTL : 0;

    return {
      gpaTL: gpaTL.toFixed(2),
      totalCredits: totalCreditsHK,
      passedCredits: totalCreditsTL
    };
  }, [courses]);

  const requiredGPA = useMemo(() => {
    if (semesterCreditsTarget <= 0) return 0;
    const X = (targetGPA * (prevCredits + semesterCreditsTarget) - (currentGPA * prevCredits)) / semesterCreditsTarget;
    return Math.max(0, X).toFixed(2);
  }, [prevCredits, currentGPA, targetGPA, semesterCreditsTarget]);

  // Graduation Path Calculations
  const gradPath = useMemo(() => {
    const remainingCreditsTotal = Math.max(0, totalProgramCredits - prevCredits);
    if (remainingCreditsTotal <= 0) return null;

    const requiredRemainingAvg = (gradTargetGPA * totalProgramCredits - currentGPA * prevCredits) / remainingCreditsTotal;

    // Estimation of A grades (4.0) vs B grades (3.0)
    // If all remaining are either A or B: 4.0 * x + 3.0 * (R - x) = Avg * R => x = (Avg - 3) * R
    let estimatedACredits = (requiredRemainingAvg - 3.0) * remainingCreditsTotal;
    estimatedACredits = Math.max(0, Math.min(remainingCreditsTotal, estimatedACredits));

    return {
      remainingCredits: remainingCreditsTotal,
      requiredAvg: Math.max(0, requiredRemainingAvg).toFixed(2),
      estimatedACredits: Math.round(estimatedACredits),
      percentA: ((estimatedACredits / remainingCreditsTotal) * 100).toFixed(0)
    };
  }, [totalProgramCredits, prevCredits, currentGPA, gradTargetGPA]);

  const addCourse = () => {
    setCourses([...courses, {
      id: Date.now().toString(),
      name: '',
      credits: 3,
      score10: 0,
      isConditional: false
    }]);
    toast.success('Đã thêm môn học mới');
  };

  const removeCourse = (id: string) => {
    if (courses.length === 1) {
      setCourses([{ id: '1', name: '', credits: 3, score10: 0, isConditional: false }]);
      toast.success('Đã làm mới danh sách');
      return;
    }
    setCourses(courses.filter(c => c.id !== id));
    toast.success('Đã xóa môn học');
  };

  const resetCalculator = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tất cả dữ liệu?')) {
      setCourses([{ id: '1', name: '', credits: 3, score10: 0, isConditional: false }]);
      toast.success('Đã làm mới dữ liệu');
    }
  };

  const honorStyles : Record<string, { active: string; hover: string }> = {
  yellow: {
    active: "bg-yellow-500 border-yellow-500 text-white",
    hover: "hover:border-yellow-400",
  },
  blue: {
    active: "bg-blue-600 border-blue-600 text-white",
    hover: "hover:border-blue-400",
  },
  green: {
    active: "bg-green-600 border-green-600 text-white",
    hover: "hover:border-green-400",
  },
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 font-sans transition-colors duration-300 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header phiên bản đẹp nhưng tối giản */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          {/* Logo với shadow glow */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="relative inline-block mb-5"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full blur-xl opacity-60" />
            <div className="relative bg-gradient-to-br from-blue-500 to-indigo-600 p-4 rounded-full shadow-xl">
              <Calculator className="w-10 h-10 text-white" />
            </div>

            {/* Decorative rings */}
            <div className="absolute inset-0 rounded-full border-2 border-blue-300/50 dark:border-blue-400/30 animate-ping" style={{ animationDuration: '2s' }} />
          </motion.div>

          {/* Title với gradient đẹp */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                Công Cụ Tính Điểm CTU
              </span>
            </h1>

            {/* Animated underline */}
            <div className="flex justify-center">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 80 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
              />
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg mt-4"
          >
            Tính toán GPA, theo dõi tiến độ học tập và dự đoán mục tiêu điểm số
          </motion.p>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center gap-6 mt-6"
          >
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
              <span>Hệ tín chỉ</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
              <span>Thang điểm 4</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
              <span>Auto-save</span>
            </div>
          </motion.div>
        </motion.div>

        <TabHeader />

        {activeTab === 'calculator' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Main Calculator Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Course List Card */}
              <motion.div
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-slate-200/50 dark:border-slate-700/50"
              >
                <div className="p-5 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-gradient-to-r from-white to-slate-50 dark:from-slate-800 dark:to-slate-800/50">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg">
                      <BookOpen className="w-4 h-4 text-white" />
                    </div>
                    <h2 className="text-lg font-bold text-slate-800 dark:text-white">
                      Danh sách môn học
                    </h2>
                    <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-slate-600 dark:text-slate-300">
                      {courses.length} môn
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={resetCalculator}
                      className="p-2 text-slate-500 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                      title="Làm mới"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={addCourse}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl transition-all shadow-md active:scale-95 font-medium text-sm"
                    >
                      <Plus className="w-4 h-4" />
                      Thêm môn
                    </motion.button>
                  </div>
                </div>

                <div className="p-5 overflow-x-auto">
                  <table className="w-full min-w-[700px]">
                    <thead>
                      <tr className="text-left text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
                        <th className="pb-3 pl-2">Tên môn học</th>
                        <th className="pb-3 text-center w-24">Tín chỉ</th>
                        <th className="pb-3 text-center w-28">Điểm hệ 10</th>
                        <th className="pb-3 text-center w-20">Hệ chữ</th>
                        <th className="pb-3 text-center w-28">Môn điều kiện</th>
                        <th className="pb-3 w-10"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                      <AnimatePresence initial={false}>
                        {courses.map((course, idx) => {
                          const grade = getGradeDetails(course.score10);
                          return (
                            <motion.tr
                              key={course.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 20 }}
                              transition={{ delay: idx * 0.05 }}
                              className="group hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                            >
                              <td className="py-3 pl-2">
                                <input
                                  type="text"
                                  placeholder="Nhập tên môn học..."
                                  value={course.name}
                                  onChange={(e) => setCourses(courses.map(c => c.id === course.id ? { ...c, name: e.target.value } : c))}
                                  className="w-full bg-transparent border-b border-transparent focus:border-blue-500 dark:text-white outline-none py-1.5 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
                                />
                              </td>
                              <td className="py-3 text-center">
                                <input
                                  type="number"
                                  min="1"
                                  max="10"
                                  value={course.credits}
                                  onChange={(e) => setCourses(courses.map(c => c.id === course.id ? { ...c, credits: Number(e.target.value) } : c))}
                                  className="w-20 bg-slate-100 dark:bg-slate-700 rounded-lg px-2 py-1.5 text-center dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                              </td>
                              <td className="py-3 text-center">
                                <input
                                  type="number"
                                  step="0.1"
                                  min="0"
                                  max="10"
                                  value={course.score10 || ''}
                                  onChange={(e) => setCourses(courses.map(c => c.id === course.id ? { ...c, score10: Number(e.target.value) } : c))}
                                  placeholder="0.0"
                                  className="w-20 bg-slate-100 dark:bg-slate-700 rounded-lg px-2 py-1.5 text-center dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                              </td>
                              <td className="py-3 text-center">
                                {course.score10 > 0 && (
                                  <span className={`inline-flex items-center justify-center px-2 py-1 rounded-lg text-sm font-bold bg-gradient-to-r ${grade.color} text-white min-w-[50px]`}>
                                    {grade.letter}
                                  </span>
                                )}
                              </td>
                              <td className="py-3 text-center">
                                <input
                                  type="checkbox"
                                  checked={course.isConditional}
                                  onChange={(e) => setCourses(courses.map(c => c.id === course.id ? { ...c, isConditional: e.target.checked } : c))}
                                  className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                                />
                              </td>
                              <td className="py-3 pr-2 text-right">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => removeCourse(course.id)}
                                  className="text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </motion.button>
                              </td>
                            </motion.tr>
                          );
                        })}
                      </AnimatePresence>
                    </tbody>
                  </table>
                </div>
              </motion.div>

              {/* Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 backdrop-blur-sm p-5 rounded-xl border border-amber-200/50 dark:border-amber-700/30"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-amber-500 rounded-lg">
                      <Info className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-amber-800 dark:text-amber-300 mb-2">Ghi chú quan trọng</h4>
                      <ul className="text-xs text-amber-700 dark:text-amber-400 space-y-1.5">
                        <li className="flex items-start gap-2">• Điểm TB học kỳ tính trên tất cả các môn (kể cả F)</li>
                        <li className="flex items-start gap-2">• Điểm TB tích lũy chỉ tính các môn đạt (D trở lên)</li>
                        <li className="flex items-start gap-2">• Môn điều kiện (GDTC, GDQP) không tính vào GPA</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 backdrop-blur-sm p-5 rounded-xl border border-blue-200/50 dark:border-blue-700/30"
                >
                  <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Thang điểm quy đổi
                  </h4>
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    {gradingScale.map(g => (
                      <div key={g.letter} className="text-center">
                        <div className={`font-bold bg-gradient-to-r ${g.color} bg-clip-text text-transparent`}>
                          {g.letter}
                        </div>
                        <div className="text-slate-500 dark:text-slate-400">{g.min}+</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Sidebar / Results */}
            <div className="space-y-5">
              {/* GPA Results Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl shadow-2xl p-6 text-white"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl -ml-12 -mb-12" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      Kết quả tính toán
                    </h3>
                    <TrendingUp className="w-8 h-8 opacity-50" />
                  </div>

                  <div className="text-center mb-6">
                    <p className="text-blue-100 text-sm mb-2">Điểm trung bình tích lũy (Hệ 4)</p>
                    <motion.p
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      className="text-5xl font-extrabold"
                    >
                      {results.gpaTL}
                    </motion.p>
                    <p className="text-xs text-blue-200 mt-2">Dựa trên các môn đã đạt (D trở lên)</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                      <p className="text-[11px] text-blue-200 uppercase tracking-wide">Tổng tín chỉ</p>
                      <p className="font-bold text-2xl">{results.totalCredits}</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                      <p className="text-[11px] text-blue-200 uppercase tracking-wide">Tín chỉ đạt</p>
                      <p className="font-bold text-2xl">{results.passedCredits}</p>
                    </div>
                  </div>
                </div>
              </motion.div>


            </div>
          </div>
        ) : (
          <div className="space-y-6">


            {/* Main Content - 2 columns layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Thông tin hiện tại - Compact Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700"
                >
                  <div className="bg-gradient-to-r from-indigo-500 to-blue-500 px-5 py-3">
                    <div className="flex items-center gap-2">
                      <Info className="w-4 h-4 text-white" />
                      <h3 className="font-bold text-white">Thông tin hiện tại</h3>
                    </div>
                  </div>
                  <div className="p-5 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5 block">
                          Tín chỉ đã tích lũy
                        </label>
                        <input
                          type="number"
                          value={prevCredits}
                          onChange={(e) => setPrevCredits(Number(e.target.value))}
                          className="w-full bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl px-3 py-2.5 text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5 block">
                          GPA tích lũy hiện tại
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={currentGPA}
                          onChange={(e) => setCurrentGPA(Number(e.target.value))}
                          className="w-full bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl px-3 py-2.5 text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-slate-500 mb-1">
                        <span>Tiến độ tích lũy</span>
                        <span>{Math.round((prevCredits / totalProgramCredits) * 100)}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(100, (prevCredits / totalProgramCredits) * 100)}%` }}
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Dự đoán mục tiêu - Enhanced Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700"
                >
                  <div className="bg-gradient-to-r from-red-500 to-orange-500 px-5 py-3">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-white" />
                      <h3 className="font-bold text-white">Dự đoán mục tiêu học kỳ</h3>
                    </div>
                  </div>
                  <div className="p-5 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5 block">
                          Tín chỉ học kỳ này
                        </label>
                        <input
                          type="number"
                          value={semesterCreditsTarget}
                          onChange={(e) => setSemesterCreditsTarget(Number(e.target.value))}
                          className="w-full bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl px-3 py-2.5 text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5 block">
                          Mục tiêu GPA
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={targetGPA}
                          onChange={(e) => setTargetGPA(Number(e.target.value))}
                          className="w-full bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl px-3 py-2.5 text-slate-800 dark:text-white focus:ring-2 focus:ring-red-500 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2 text-center font-medium">
                        🎯 GPA học kỳ này cần đạt
                      </p>
                      <div className="text-center">
                        <p className={`text-6xl font-black ${Number(requiredGPA) > 4 ? 'text-red-600 dark:text-red-400' : 'text-blue-600 dark:text-blue-400'}`}>
                          {requiredGPA}
                        </p>
                        
                      </div>
                      {Number(requiredGPA) > 4 && (
                        <div className="mt-3 flex items-center gap-2 p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                          <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                          <p className="text-xs text-red-600 dark:text-red-400">
                            Mục tiêu vượt quá thang điểm 4.0
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Lộ trình ra trường - Comprehensive Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                  className="h-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700 relative"
                >
                  <div className="bg-gradient-to-r from-purple-500 to-indigo-500 px-5 py-3">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-white" />
                      <h3 className="font-bold text-white">Lộ trình ra trường</h3>
                    </div>
                  </div>

                  <div className="p-5 space-y-4">
                    <div>
                      <label className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5 block">
                        Tổng tín chỉ toàn khóa
                      </label>
                      <input
                        type="number"
                        value={totalProgramCredits}
                        onChange={(e) => setTotalProgramCredits(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl px-3 py-2.5 text-slate-800 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-2 block">
                        Mục tiêu xếp loại
                      </label>
                      

<div className="grid grid-cols-3 gap-2">
  {[
    { label: 'Khá', val: 2.5, color: 'yellow', icon: '👍' },
    { label: 'Giỏi', val: 3.2, color: 'blue', icon: '⭐' },
    { label: 'Xuất sắc', val: 3.6, color: 'green', icon: '🏆' }
  ].map(honor => {
    const style = honorStyles[honor.color];

    return (
      <button
        key={honor.label}
        onClick={() => setGradTargetGPA(honor.val)}
        className={`py-2.5 px-2 rounded-xl text-sm font-bold transition-all border-2 ${
          gradTargetGPA === honor.val
            ? `${style.active} shadow-lg scale-105`
            : `bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 ${style.hover}`
        }`}
      >
        <span className="mr-1">{honor.icon}</span>
        {honor.label}
      </button>
    );
  })}
</div>
                    </div>

                    {gradPath && (
                      <div className="mt-4 space-y-4">
                        {/* Remaining credits info */}
                        <div className="bg-slate-50 dark:bg-slate-900/40 rounded-xl p-3">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs text-slate-500">Tín chỉ còn lại</span>
                            <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                              {gradPath.remainingCredits} TC
                            </span>
                          </div>
                          <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                              style={{ width: `${(prevCredits / totalProgramCredits) * 100}%` }}
                            />
                          </div>
                        </div>

                        {/* Required GPA */}
                        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-4">
                          <p className="text-[11px] text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-1 font-semibold">
                            GPA trung bình cần đạt cho các môn còn lại
                          </p>
                          <div className="flex items-baseline gap-2">
                            <span className={`text-4xl font-black ${Number(gradPath.requiredAvg) > 4 ? 'text-red-500' : 'text-purple-600 dark:text-purple-400'}`}>
                              {gradPath.requiredAvg}
                            </span>
                            <span className="text-sm text-slate-400">/ 4.0</span>
                          </div>
                        </div>

                        {/* Stats grid */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-3 border border-emerald-100 dark:border-emerald-800/30">
                            <p className="text-[10px] text-emerald-600 dark:text-emerald-400 uppercase font-bold mb-1">
                              📚 Số "Con A" cần
                            </p>
                            <p className="text-2xl font-black text-emerald-700 dark:text-emerald-300">
                              ~{gradPath.estimatedACredits}
                            </p>
                            <p className="text-[9px] text-emerald-500 mt-1">
                              ≈ {Math.round(gradPath.estimatedACredits / 3)} môn (3TC)
                            </p>
                          </div>
                          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 border border-blue-100 dark:border-blue-800/30">
                            <p className="text-[10px] text-blue-600 dark:text-blue-400 uppercase font-bold mb-1">
                              📊 Tỷ lệ điểm A
                            </p>
                            <p className="text-2xl font-black text-blue-700 dark:text-blue-300">
                              {gradPath.percentA}%
                            </p>
                            <p className="text-[9px] text-blue-500 mt-1">
                              Trên số TC còn lại
                            </p>
                          </div>
                        </div>

                        {/* Warning message */}
                        {Number(gradPath.requiredAvg) > 4 && (
                          <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800/30">
                            <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                            <div className="text-[11px] text-red-700 dark:text-red-300">
                              <p className="font-semibold mb-1">⚠️ Mục tiêu không khả thi!</p>
                              <p>Yêu cầu GPA &gt; 4.0. Hãy xem xét cải thiện điểm các môn đã học hoặc điều chỉnh mục tiêu.</p>
                            </div>
                          </div>
                        )}

                        {/* Success message */}
                        {Number(gradPath.requiredAvg) <= 3.5 && Number(gradPath.requiredAvg) > 0 && (
                          <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800/30">
                            <div className="text-lg">🎉</div>
                            <p className="text-xs text-green-700 dark:text-green-300 font-medium">
                              Mục tiêu khả thi! Hãy cố gắng duy trì phong độ học tập tốt.
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CTUCalculatorPage;