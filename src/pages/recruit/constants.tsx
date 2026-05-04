import {
  MdRocketLaunch as Rocket,
  MdMemory as Cpu,
  MdPublic as Globe,
  MdPeopleOutline as Users
} from 'react-icons/md';
import { BenefitItem, JobPosition } from "./types";

export const BENEFITS: BenefitItem[] = [
  {
    id: "1",
    icon: <Rocket className="h-8 w-8" />,
    title: "Phát triển thần tốc",
    description: "Cơ hội thăng tiến nhanh chóng trong môi trường startup năng động",
    color: "from-emerald-500 to-green-400",
  },
  {
    id: "2",
    icon: <Cpu className="h-8 w-8" />,
    title: "Công nghệ tiên tiến",
    description: "Làm việc với các công nghệ mới nhất: React, Node.js, AI, Cloud",
    color: "from-blue-500 to-cyan-400",
  },
  {
    id: "3",
    icon: <Globe className="h-8 w-8" />,
    title: "Làm việc từ xa",
    description: "Không gian làm việc linh hoạt, khuyến khích đổi mới và học hỏi",
    color: "from-purple-500 to-pink-400",
  },
  {
    id: "4",
    icon: <Users className="h-8 w-8" />,
    title: "Phát triển bản thân",
    description: "Cơ hội học hỏi từ chuyên gia và phát triển sự nghiệp",
    color: "from-amber-500 to-orange-400",
  },
];

export const JOB_POSITIONS: JobPosition[] = [
  {
    id: "frontend",
    title: "Frontend Developer (React)",
    type: "full-time",
    location: "Cần Thơ / Remote",
    description: "Phát triển giao diện người dùng cho nền tảng QuizUniverse với React và TypeScript",
    requirements: [
      "2+ năm kinh nghiệm với React/TypeScript",
      "Thành thạo TailwindCSS, Framer Motion",
      "Hiểu biết về state management (Redux, Zustand)",
      "Có portfolio hoặc dự án thực tế",
    ],
    benefits: [
      "Lương cạnh tranh + thưởng hiệu suất",
      "MacBook Pro M2/M3",
      "Đào tạo và hội thảo miễn phí",
      "Bảo hiểm sức khỏe cao cấp",
    ],
  },
  {
    id: "backend",
    title: "Backend Developer (Java/Spring Boot)",
    type: "full-time",
    location: "Cần Thơ",
    description: "Xây dựng hệ thống backend, API và xử lý dữ liệu cho QuizUniverse",
    requirements: [
      "3+ năm kinh nghiệm Java/Spring Boot",
      "Kinh nghiệm với PostgreSQL, Redis",
      "Hiểu biết về microservices, Docker",
      "Kiến thức về hệ thống phân tán",
    ],
    benefits: [
      "Lương từ 1500$ - 2500$",
      "Tham gia xây dựng sản phẩm từ đầu",
      "Stock options cho thành viên chủ chốt",
      "Du lịch team building hàng năm",
    ],
  },
  {
    id: "teacher",
    title: "Giáo viên / Cộng tác viên ra đề",
    type: "part-time",
    location: "Remote",
    description: "Tham gia xây dựng ngân hàng câu hỏi, đề thi cho các môn học",
    requirements: [
      "Kiến thức chuyên môn vững (Toán, Lý, Hóa, CNTT, ...)",
      "Kinh nghiệm giảng dạy hoặc ra đề",
      "Kỹ năng viết lách và biên tập tốt",
      "Có thể làm việc online linh hoạt",
    ],
    benefits: [
      "Thu nhập theo số lượng câu hỏi",
      "Làm việc từ xa linh hoạt",
      "Ghi nhận tác giả trên nền tảng",
      "Tham gia cộng đồng giáo dục",
    ],
  },
  {
    id: "content",
    title: "Content & Documentation Writer",
    type: "contract",
    location: "Remote",
    description: "Viết nội dung hướng dẫn, bài viết học thuật và tài liệu sản phẩm",
    requirements: [
      "Kỹ năng viết tiếng Việt xuất sắc",
      "Hiểu biết về lĩnh vực giáo dục",
      "Kinh nghiệm viết technical content",
      "Có portfolio các bài viết đã xuất bản",
    ],
    benefits: [
      "Lương theo dự án hoặc theo giờ",
      "Làm việc hoàn toàn từ xa",
      "Được ghi nhận tác giả",
      "Cơ hội trở thành thành viên chính thức",
    ],
  },
];
