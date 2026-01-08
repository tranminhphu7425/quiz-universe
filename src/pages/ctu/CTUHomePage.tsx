// CTUHomePage.tsx
import React, { useState, useEffect } from 'react';

import { ClassTable } from "@/components/ui/ClassTable";

import { Course } from "@/shared/types/courses";
import { Link } from 'react-router-dom';




const CTUHomePage: React.FC = () => {

    const [courses, setCourses] = useState<Course[]>();

    useEffect(() => {
        const loadData = async () => {
            const local = await fetch("/quiz-universe/data/courses.json");
            const data = (await local.json()) as Course[];
            setCourses(data);
        };

        loadData();



    }, []);


    console.log(courses);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-gray-900 dark:to-gray-800 font-K2D transition-colors duration-300">


            <div className="container mx-auto px-4 py-12">
                {/* Logo và Tiêu đề */}
                <header className="text-center mb-12">
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="text-5xl font-bold text-blue-800 dark:text-blue-300 mb-2">
                            CTU
                        </h1>
                        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
                            ĐẠI HỌC CẦN THƠ
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
                            Cộng đồng - Toàn diện - Ưu việt
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            www.ctu.edu.vn
                        </p>
                    </div>
                </header>

                <main className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {/* Công cụ Sắp xếp lịch học thông minh */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 hover:shadow-3xl transition-shadow duration-300">
                        <div className="flex items-center mb-6">
                            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg mr-4">
                                📅
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                                Sắp xếp lịch học thông minh
                            </h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Công cụ giúp sinh viên sắp xếp thời khóa biểu tối ưu dựa trên môn học đã đăng ký, tránh trùng lịch và cân bằng thời gian học tập.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                <span className="text-gray-700 dark:text-gray-300">Tự động xếp lịch không trùng giờ</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                <span className="text-gray-700 dark:text-gray-300">Gợi ý phân bổ thời gian hợp lý</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                <span className="text-gray-700 dark:text-gray-300">Xuất lịch sang Google Calendar</span>
                            </div>
                        </div>
                        <div className="text-center mt-8 w-full py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-semibold rounded-lg transition-colors duration-300">
                            <Link to="/ctu/calendar" >
                                Truy cập công cụ
                            </Link>
                        </div>
                    </div>

                    {/* Công cụ Tính điểm trung bình tích lũy */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 hover:shadow-3xl transition-shadow duration-300">
                        <div className="flex items-center mb-6">
                            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg mr-4">
                                📊
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                                Tính điểm trung bình tích lũy
                            </h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Tính toán điểm trung bình học kỳ và tích lũy theo hệ thống tín chỉ của Đại học Cần Thơ, hỗ trợ dự đoán điểm cuối kỳ.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                <span className="text-gray-700 dark:text-gray-300">Tính GPA theo chuẩn CTU</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                <span className="text-gray-700 dark:text-gray-300">Dự đoán điểm cần đạt để đạt mục tiêu</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                <span className="text-gray-700 dark:text-gray-300">Lưu lịch sử tính toán</span>
                            </div>
                        </div>
                        <div className="text-center mt-8 w-full py-3 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white font-semibold rounded-lg transition-colors duration-300">
                            <Link to="/ctu/calulator" >
                                Truy cập công cụ
                            </Link>
                        </div>
                    </div>
                </main>

                {/* Thông tin thêm */}
                <div className="mt-16 text-center">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                        Ứng dụng dành riêng cho sinh viên CTU
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Chào mừng bạn đến với trang quản lý học tập thông minh của Đại học Cần Thơ. Chúng tôi cung cấp các công cụ hỗ trợ sinh viên trong việc lập kế hoạch học tập, theo dõi tiến độ và đạt kết quả tốt nhất.
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto p-6 space-y-8">
                {courses
                    ?.filter(
                        (course) => course.data.data.data.length > 0
                    )
                    .map((course) => {
                        const info = course.data.data.hoc_phan_info;

                        return (
                            <div
                                key={course.ma_request}
                                className="border rounded-lg shadow-sm"
                            >
                                <div className="p-4 bg-blue-50 border-b">
                                    <h2 className="text-xl font-bold text-blue-700">
                                        {info.dkmh_tu_dien_hoc_phan_ma} –{" "}
                                        {info.dkmh_tu_dien_hoc_phan_ten_vn}
                                    </h2>
                                    <p className="text-sm text-gray-600">
                                        Số tín chỉ: {info.dkmh_tu_dien_hoc_phan_so_tin_chi}
                                    </p>
                                </div>

                                <div className="p-4">
                                    <ClassTable classes={course.data.data.data} />
                                </div>
                            </div>
                        );
                    })}
            </div>

        </div>
    );
};

export default CTUHomePage;