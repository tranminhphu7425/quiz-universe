import { motion } from "framer-motion";
import { Users, Briefcase, HeartHandshake, Building2, CheckCircle, Mail, ArrowRightCircle, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function RecruitmentPage() {
  const jobs = [
    {
      title: "Frontend Developer",
      type: "Full-time",
      location: "Remote / HCM",
      desc: "Phát triển giao diện React + Tailwind, tối ưu trải nghiệm người dùng.",
    },
    {
      title: "Backend Engineer",
      type: "Full-time",
      location: "Hà Nội",
      desc: "Xây dựng API Spring Boot, bảo mật JWT, tích hợp MySQL.",
    },
    {
      title: "Content Creator (Giáo dục)",
      type: "Internship",
      location: "Remote",
      desc: "Tạo nội dung câu hỏi, trắc nghiệm và hướng dẫn học tập.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-emerald-400 dark:from-slate-800 dark:to-slate-700 py-16 text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 140, damping: 18 }}
          className="text-4xl font-black md:text-5xl"
        >
          🚀 Tuyển dụng tại QuizUniverse
        </motion.h1>
        <p className="mt-4 max-w-2xl mx-auto text-white/90">
          Cùng chúng tôi xây dựng nền tảng học tập trực tuyến, giúp hàng ngàn học viên đạt mục tiêu.
        </p>
        <div className="mt-6">
          <a href="#jobs" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-emerald-700 font-semibold shadow hover:brightness-95">
            Xem vị trí tuyển dụng <ArrowRightCircle className="h-4 w-4" />
          </a>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-6 py-12 space-y-16">
        {/* Why Join Us */}
        <section>
          <h2 className="text-2xl font-bold text-emerald-700 dark:text-emerald-300 mb-6 flex items-center gap-2">
            <HeartHandshake className="h-6 w-6" /> Vì sao chọn chúng tôi?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card icon={<Users className="h-6 w-6" />} title="Đội ngũ trẻ trung" desc="Làm việc với những con người năng động, sáng tạo và đầy nhiệt huyết." />
            <Card icon={<Building2 className="h-6 w-6" />} title="Môi trường linh hoạt" desc="Remote, hybrid, giờ làm linh hoạt, khuyến khích cân bằng công việc & cuộc sống." />
            <Card icon={<CheckCircle className="h-6 w-6" />} title="Cơ hội phát triển" desc="Tham gia các dự án thực tế, tiếp cận công nghệ mới, thăng tiến nhanh chóng." />
          </div>
        </section>

        {/* Job List */}
        <section id="jobs">
          <h2 className="text-2xl font-bold text-emerald-700 dark:text-emerald-300 mb-6 flex items-center gap-2">
            <Briefcase className="h-6 w-6" /> Vị trí tuyển dụng
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">{job.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{job.type} • {job.location}</p>
                <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{job.desc}</p>
                <div className="mt-3">
                  <button className="rounded bg-emerald-600 px-4 py-2 text-sm text-white hover:brightness-110">Ứng tuyển</button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Hiring Process */}
        <section>
          <h2 className="text-2xl font-bold text-emerald-700 dark:text-emerald-300 mb-6">Quy trình tuyển dụng</h2>
          <ol className="space-y-3 text-sm text-slate-700 dark:text-slate-300 list-decimal pl-5">
            <li>Nộp CV qua email hoặc form ứng tuyển.</li>
            <li>Phỏng vấn online cùng HR.</li>
            <li>Bài test kỹ năng hoặc phỏng vấn kỹ thuật.</li>
            <li>Phỏng vấn cuối với Team Lead.</li>
            <li>Nhận offer và bắt đầu hành trình cùng chúng tôi!</li>
          </ol>
        </section>

        {/* Culture & Team */}
        <section>
          <h2 className="text-2xl font-bold text-emerald-700 dark:text-emerald-300 mb-6">Văn hoá & Đội ngũ</h2>
          <div className="rounded-xl bg-gradient-to-r from-emerald-100 to-emerald-50 p-6 dark:from-slate-800 dark:to-slate-700">
            <p className="text-slate-700 dark:text-slate-300 text-sm">
              Chúng tôi tin vào tinh thần học hỏi không ngừng, hợp tác, và sự sáng tạo. QuizUniverse khuyến khích nhân viên chia sẻ ý tưởng, cùng nhau xây dựng sản phẩm có giá trị cho cộng đồng.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-emerald-700 dark:text-emerald-300 mb-6">Câu hỏi thường gặp (FAQ)</h2>
          <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
            <Faq q="Tôi có thể ứng tuyển nhiều vị trí không?" a="Có, bạn có thể ứng tuyển nhiều vị trí phù hợp. HR sẽ xem xét dựa trên hồ sơ và nguyện vọng." />
            <Faq q="QuizUniverse có hỗ trợ làm việc remote không?" a="Có, nhiều vị trí hỗ trợ remote hoặc hybrid." />
            <Faq q="Quy trình tuyển dụng kéo dài bao lâu?" a="Trung bình 1-2 tuần tuỳ vị trí và lịch phỏng vấn." />
            <Faq q="Công ty có nhận sinh viên mới ra trường không?" a="Có, chúng tôi luôn chào đón các bạn trẻ tài năng và nhiệt huyết." />
          </div>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-bold text-emerald-700 dark:text-emerald-300 mb-4 flex items-center gap-2">
            <MessageCircle className="h-6 w-6" /> Liên hệ
          </h2>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            Email: <a href="mailto:hr@quizuniverse.vn" className="underline">hr@quizuniverse.vn</a><br/>
            Văn phòng: Tầng 5, Toà nhà ABC, TP.HCM
          </p>
        </section>
      </main>

      <footer className="py-6 text-center text-xs text-slate-500 dark:text-slate-400">
        © {new Date().getFullYear()} QuizUniverse • Recruitment Page v1.0
      </footer>
    </div>
  );
}

function Card({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-3 text-emerald-600 dark:text-emerald-300">{icon}</div>
      <h3 className="font-semibold text-slate-800 dark:text-slate-200">{title}</h3>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{desc}</p>
    </div>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
      <p className="font-semibold text-slate-800 dark:text-slate-200">{q}</p>
      <p className="mt-1 text-slate-600 dark:text-slate-400 text-sm">{a}</p>
    </div>
  );
}
