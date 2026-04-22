import React from 'react';
import { Course } from "@/shared/types/courses";
import { ClassTable } from "./ClassTable";

interface CourseCardProps {
    course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
    const info = course.data.data.hoc_phan_info;

    return (
        <div className="border rounded-lg shadow-sm overflow-hidden bg-white dark:bg-gray-800 dark:border-gray-700 transition-all duration-300 hover:shadow-md">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/30 border-b dark:border-gray-700">
                <h2 className="text-xl font-bold text-blue-700 dark:text-blue-400">
                    {info.dkmh_tu_dien_hoc_phan_ma} –{" "}
                    {info.dkmh_tu_dien_hoc_phan_ten_vn}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Số tín chỉ: <span className="font-semibold">{info.dkmh_tu_dien_hoc_phan_so_tin_chi}</span>
                </p>
            </div>

            <div className="p-4 overflow-x-auto">
                <ClassTable classes={course.data.data.data} />
            </div>
        </div>
    );
};
