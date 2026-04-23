import { ClassItem } from "@/shared/types/courses";

export function ClassTable({ classes }: { classes: ClassItem[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="
        min-w-full 
        border 
        text-sm
        border-gray-300
        dark:border-gray-700
        text-gray-800
        dark:text-gray-200
      ">
        <thead className="
          bg-gray-100
          dark:bg-gray-800
        ">
          <tr>
            <th className="border px-2 py-1 dark:border-gray-700">Nhóm</th>
            <th className="border px-2 py-1 dark:border-gray-700">Thứ</th>
            <th className="border px-2 py-1 dark:border-gray-700">Tiết</th>
            <th className="border px-2 py-1 dark:border-gray-700">Phòng</th>
            <th className="border px-2 py-1 dark:border-gray-700">Giảng viên</th>
            <th className="border px-2 py-1 dark:border-gray-700">Còn chỗ</th>
          </tr>
        </thead>

        <tbody>
          {classes.map((c) => (
            <tr
              key={c.key}
              className="
                hover:bg-gray-50
                dark:hover:bg-gray-700
                transition
              "
            >
              <td className="border px-2 py-1 text-center dark:border-gray-700">
                {c.dkmh_nhom_hoc_phan_ma}
              </td>

              <td className="border px-2 py-1 text-center dark:border-gray-700">
                Thứ {c.dkmh_thu_trong_tuan_ma}
              </td>

              <td className="border px-2 py-1 text-center dark:border-gray-700">
                {c.tiet_hoc.replace(/-/g, "")}
              </td>

              <td className="border px-2 py-1 dark:border-gray-700">
                {c.dkmh_tu_dien_phong_hoc_ten}
              </td>

              <td className="border px-2 py-1 dark:border-gray-700">
                {c.dkmh_tu_dien_giang_vien_ten_vn}
              </td>

              <td
                className={`
                  border px-2 py-1 text-center font-semibold
                  dark:border-gray-700
                  ${c.si_so_con_lai === 0 
                    ? "text-red-600 dark:text-red-400" 
                    : "text-green-600 dark:text-green-400"}
                `}
              >
                {c.si_so_con_lai}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
