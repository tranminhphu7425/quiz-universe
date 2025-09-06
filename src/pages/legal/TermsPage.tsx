import { useMemo } from "react";
import { motion } from "framer-motion";
import { ScrollText, Sparkles, Heart } from "lucide-react";
import Floating from "@/shared/ui/Floatting";

export default function TermsPage() {
  const tileUrl = useMemo(
    () =>
      encodeURIComponent(`
      <svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160' fill='none'>
        <g stroke='#10b981' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>
          <path d='M28 36h40a8 8 0 018 8v44H36a8 8 0 01-8-8V36z' opacity='0.7'/>
          <path d='M28 52h48' opacity='0.6'/>
          <rect x='96' y='28' width='36' height='28' rx='4' />
          <path d='M100 36h18M100 44h18' opacity='0.6'/>
          <path d='M120 36l6 6M126 36l-6 6' />
        </g>
      </svg>
    `),
    []
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Gradient nền */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />

      {/* Tile mờ */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-[120%] md:w-full opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,${tileUrl}")`,
          backgroundRepeat: "repeat",
          backgroundSize: "160px 160px",
          maskImage:
            "radial-gradient(1200px 1400px at left center, #000 70%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(1200px 400px at left center, #000 70%, transparent 100%)",
        }}
      />
      

      {/* Blur blobs */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl dark:bg-emerald-400/10" />
      <div className="pointer-events-none absolute -right-16 top-10 h-64 w-64 rounded-full bg-white/10 blur-2xl dark:bg-purple-400/10" />

      {/* Floating */}
      <Floating distance={12} duration={7} className="pointer-events-none absolute top-16 left-8">
        <div className="rounded-xl bg-gradient-to-br from-amber-300 to-rose-300 px-3 py-1 shadow-lg -rotate-6">
          <span className="text-xs font-black text-rose-700">TERMS</span>
        </div>
      </Floating>
      <Floating distance={10} duration={6} className="pointer-events-none absolute bottom-20 right-10">
        <div className="rounded-full bg-gradient-to-br from-purple-400 to-indigo-400 p-3 shadow-xl rotate-12">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
      </Floating>
      <Floating distance={9} duration={9} className="pointer-events-none absolute bottom-6 left-10">
        <div className="rounded-full bg-gradient-to-tr from-pink-300 to-yellow-300 p-2 shadow-lg -rotate-12">
          <Heart className="h-4 w-4 text-pink-700" />
        </div>
      </Floating>

      {/* Nội dung */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 160, damping: 18 }}
          className="rounded-2xl border border-white/20 bg-white/10 p-8 shadow-xl backdrop-blur-md
                     dark:border-gray-700 dark:bg-gray-800/50"
        >
          <div className="mb-6 flex items-center gap-2 text-white dark:text-gray-200">
            <ScrollText className="h-5 w-5 text-amber-300" />
            <h1 className="text-2xl font-bold">Điều khoản sử dụng</h1>
          </div>

          <div className="prose prose-sm max-w-none text-white/90 dark:prose-invert dark:text-gray-300">
  <h1 className="text-2xl font-bold border-b pb-2 mb-6">ĐIỀU KHOẢN SỬ DỤNG DỊCH VỤ QUIZUNIVERSE</h1>
  
  <p className="italic mb-8">
    Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}. Khi sử dụng QuizUniverse, bạn đồng ý tuân thủ đầy đủ các điều khoản sau đây. 
    Vui lòng đọc kỹ để hiểu rõ quyền lợi và nghĩa vụ của mình.
  </p>

  <h2 className="text-xl font-semibold mt-6 mb-3">1. Sử dụng dịch vụ</h2>
  <div className="space-y-3">
    <p>
      1.1. QuizUniverse là nền tảng cung cấp giải pháp quản lý ngân hàng câu hỏi và tạo đề thi trực tuyến, chỉ được sử dụng cho mục đích giáo dục, học tập và giảng dạy.
    </p>
    <p>
      1.2. Nghiêm cấm mọi hành vi sử dụng dịch vụ để:
      <ul className="list-disc pl-6 mt-2 space-y-1">
        <li>Phát tán nội dung vi phạm pháp luật Việt Nam</li>
        <li>Xâm phạm bản quyền, sở hữu trí tuệ</li>
        <li>Gian lận trong thi cử, kiểm tra</li>
        <li>Phát tán mã độc hoặc tấn công hệ thống</li>
        <li>Thu thập dữ liệu trái phép</li>
      </ul>
    </p>
    <p>
      1.3. Người dùng từ 13 tuổi trở xuống cần có sự giám sát của phụ huynh hoặc người giám hộ khi sử dụng dịch vụ.
    </p>
  </div>

  <h2 className="text-xl font-semibold mt-8 mb-3">2. Tài khoản người dùng</h2>
  <div className="space-y-3">
    <p>
      2.1. Bạn phải cung cấp thông tin chính xác khi đăng ký tài khoản và có trách nhiệm cập nhật thông tin mới nhất.
    </p>
    <p>
      2.2. Bạn hoàn toàn chịu trách nhiệm về:
      <ul className="list-disc pl-6 mt-2 space-y-1">
        <li>Bảo mật thông tin đăng nhập</li>
        <li>Mọi hoạt động diễn ra dưới tài khoản của bạn</li>
        <li>Các thiệt hại do để lộ thông tin đăng nhập</li>
      </ul>
    </p>
    <p>
      2.3. Chúng tôi có quyền tạm khóa hoặc xóa tài khoản nếu phát hiện vi phạm điều khoản sử dụng mà không cần báo trước.
    </p>
  </div>

  <h2 className="text-xl font-semibold mt-8 mb-3">3. Quyền sở hữu trí tuệ</h2>
  <div className="space-y-3">
    <p>
      3.1. Mọi nội dung, giao diện, mã nguồn, thuật toán, thiết kế và logo thuộc bản quyền của QuizUniverse, được bảo hộ bởi luật pháp Việt Nam và quốc tế.
    </p>
    <p>
      3.2. Đối với nội dung do người dùng tải lên:
      <ul className="list-disc pl-6 mt-2 space-y-1">
        <li>Người dùng giữ bản quyền nhưng cấp cho QuizUniverse giấy phép sử dụng để vận hành dịch vụ</li>
        <li>Chịu trách nhiệm về tính hợp pháp của nội dung đã đăng tải</li>
        <li>Không được tải lên tài liệu có bản quyền mà không được phép</li>
      </ul>
    </p>
    <p>
      3.3. Mọi hành vi sao chép, phân phối trái phép nội dung từ QuizUniverse sẽ bị xử lý theo pháp luật.
    </p>
  </div>

  <h2 className="text-xl font-semibold mt-8 mb-3">4. Quy định về nội dung</h2>
  <div className="space-y-3">
    <p>
      4.1. Nội dung cấm trên hệ thống bao gồm nhưng không giới hạn:
      <ul className="list-disc pl-6 mt-2 space-y-1">
        <li>Nội dung khiêu dâm, bạo lực</li>
        <li>Thông tin giả mạo, lừa đảo</li>
        <li>Nội dung phân biệt chủng tộc, tôn giáo</li>
        <li>Tài liệu có chứa đáp án các kỳ thi chính thức</li>
      </ul>
    </p>
    <p>
      4.2. QuizUniverse có quyền kiểm duyệt, chỉnh sửa hoặc xóa bỏ nội dung vi phạm mà không cần thông báo trước.
    </p>
  </div>

  <h2 className="text-xl font-semibold mt-8 mb-3">5. Giới hạn trách nhiệm</h2>
  <div className="space-y-3">
    <p>
      5.1. QuizUniverse không đảm bảo:
      <ul className="list-disc pl-6 mt-2 space-y-1">
        <li>Dịch vụ hoạt động liên tục, không gián đoạn</li>
        <li>Nội dung do người dùng tải lên luôn chính xác</li>
        <li>Tính phù hợp của dịch vụ cho mọi mục đích sử dụng</li>
      </ul>
    </p>
    <p>
      5.2. Trong mọi trường hợp, trách nhiệm pháp lý của QuizUniverse không vượt quá phí dịch vụ bạn đã thanh toán (nếu có).
    </p>
    <p>
      5.3. Bạn đồng ý bồi thường cho QuizUniverse về mọi khiếu nại, thiệt hại phát sinh từ vi phạm điều khoản sử dụng của bạn.
    </p>
  </div>

  <h2 className="text-xl font-semibold mt-8 mb-3">6. Bảo mật và dữ liệu</h2>
  <div className="space-y-3">
    <p>
      6.1. Chúng tôi cam kết bảo vệ thông tin cá nhân theo Chính sách Bảo mật riêng.
    </p>
    <p>
      6.2. Dữ liệu của bạn sẽ được:
      <ul className="list-disc pl-6 mt-2 space-y-1">
        <li>Mã hóa trong quá trình truyền tải</li>
        <li>Lưu trữ trên hệ thống bảo mật cấp cao</li>
        <li>Chỉ sử dụng cho mục đích vận hành dịch vụ</li>
      </ul>
    </p>
    <p>
      6.3. Trường hợp bắt buộc theo yêu cầu pháp lý, chúng tôi có thể cung cấp thông tin người dùng cho cơ quan chức năng.
    </p>
  </div>

  <h2 className="text-xl font-semibold mt-8 mb-3">7. Thanh toán và dịch vụ trả phí</h2>
  <div className="space-y-3">
    <p>
      7.1. Một số tính năng cao cấp có thể yêu cầu thanh toán phí sử dụng.
    </p>
    <p>
      7.2. Chính sách hoàn tiền:
      <ul className="list-disc pl-6 mt-2 space-y-1">
        <li>Không hoàn tiền cho gói dịch vụ đã sử dụng</li>
        <li>Có thể hoàn tiền theo tỷ lệ cho gói chưa sử dụng trong trường hợp hủy dịch vụ</li>
      </ul>
    </p>
  </div>

  <h2 className="text-xl font-semibold mt-8 mb-3">8. Điều khoản chung</h2>
  <div className="space-y-3">
    <p>
      8.1. Điều khoản này có thể được cập nhật định kỳ, phiên bản mới sẽ có hiệu lực ngay khi được đăng tải trên website.
    </p>
    <p>
      8.2. Mọi tranh chấp phát sinh sẽ được ưu tiên giải quyết thông qua thương lượng. Trường hợp không đạt được thỏa thuận, sẽ được giải quyết tại tòa án có thẩm quyền tại Việt Nam.
    </p>
    <p>
      8.3. Nếu có bất kỳ điều khoản nào bị vô hiệu, phần còn lại vẫn giữ nguyên hiệu lực.
    </p>
  </div>

  <div className="mt-8 p-4 bg-white/10 rounded-lg">
    <p className="font-medium">Bằng việc sử dụng dịch vụ, bạn xác nhận đã đọc, hiểu và đồng ý với tất cả các điều khoản nêu trên.</p>
    <p className="text-sm mt-2">Mọi thắc mắc vui lòng liên hệ: support@quizuniverse.edu.vn</p>
  </div>
</div>
        </motion.div>
      </div>
    </div>
  );
}
