// src/pages/recruitment/RecruitmentPage.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  MdRocketLaunch as Rocket,
  MdSchool as GraduationCap,
  MdMemory as Cpu,
  MdPublic as Globe,
  MdPeopleOutline as Users,
  MdFlashOn as Zap,
  MdWork as Briefcase,
  MdLocationOn as MapPin,
  MdAccessTime as Clock,
  MdSend as Send,
  MdMailOutline as Mail,
  MdPersonOutline as User,
  MdDescription as FileText,
  MdChevronRight as ChevronRight,
  MdCheckCircleOutline as CheckCircle2,
  MdAutoAwesome as Sparkles,
  MdLightbulbOutline as Lightbulb,
  MdHandshake as HeartHandshake
} from 'react-icons/md';
import GradientText from "@/shared/ui/GradientText";
import FadeInOnView from "@/shared/ui/FadeInOnView";
import { toast } from "sonner";

import { ApplicationFormData } from "./types";
import { JobCard } from "./ui/JobCard";
import { BenefitCard } from "./ui/BenefitCard";
import { JOB_POSITIONS, BENEFITS } from "./constants";

// ====== MAIN PAGE ======
export default function RecruitmentPage() {
  const [selectedPosition, setSelectedPosition] = useState<string>(JOB_POSITIONS[0].id);
  const [formData, setFormData] = useState<ApplicationFormData>({
    fullName: "",
    email: "",
    position: JOB_POSITIONS[0].id,
    introduction: "",
    cvLink: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Scroll to positions
  const scrollToPositions = () => {
    document.getElementById("positions")?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to application form
  const scrollToApplication = () => {
    document.getElementById("application")?.scrollIntoView({ behavior: "smooth" });
  };

  // Handle form input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.fullName.trim()) {
      toast.error("Vui lòng nhập họ và tên");
      return;
    }
    
    if (!formData.email.trim()) {
      toast.error("Vui lòng nhập email");
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Email không hợp lệ");
      return;
    }
    
    if (!formData.position) {
      toast.error("Vui lòng chọn vị trí ứng tuyển");
      return;
    }
    
    if (!formData.introduction.trim()) {
      toast.error("Vui lòng giới thiệu về bản thân");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const jobTitle = JOB_POSITIONS.find(job => job.id === formData.position)?.title;
      toast.success(`Đã gửi hồ sơ ứng tuyển cho vị trí ${jobTitle}! Chúng tôi sẽ liên hệ sớm nhất.`);
      
      // Reset form
      setFormData({
        fullName: "",
        email: "",
        position: JOB_POSITIONS[0].id,
        introduction: "",
        cvLink: "",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  // Handle apply button click
  const handleApplyClick = (positionId: string) => {
    setSelectedPosition(positionId);
    setFormData(prev => ({ ...prev, position: positionId }));
    scrollToApplication();
  };

  return (
    <div className="recruitment-page bg-slate-50 dark:bg-slate-900">
      {/* ====== HERO SECTION ====== */}
      <section className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Background blobs */}
        <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-white/10 blur-2xl dark:bg-emerald-400/10" />
        <div className="pointer-events-none absolute -right-16 top-10 h-64 w-64 rounded-full bg-white/10 blur-2xl dark:bg-purple-400/10" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/20 backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Tuyển dụng • QuizUniverse
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-6 text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-white"
          >
            Tham gia xây dựng nền tảng giáo dục thông minh cùng QuizUniverse
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto mb-10 max-w-2xl text-lg text-white/90 dark:text-gray-300"
          >
            Chúng tôi tìm kiếm những người đam mê giáo dục, công nghệ và tri thức
            để cùng tạo ra sản phẩm học tập tốt nhất cho thế hệ tương lai.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={scrollToPositions}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-bold text-emerald-700 shadow-lg hover:bg-gray-100 transition-colors"
            >
              Xem vị trí tuyển dụng
              <ChevronRight className="h-5 w-5" />
            </button>
            
            <Link
              to="/about"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-transparent px-8 py-4 text-lg font-bold text-white hover:bg-white/10 transition-colors"
            >
              Về chúng tôi
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-16 flex justify-center"
          >
            <div className="animate-bounce cursor-pointer" onClick={scrollToPositions}>
              <div className="rounded-full bg-white/10 p-3 backdrop-blur">
                <ChevronRight className="h-6 w-6 rotate-90 text-white" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====== BENEFITS SECTION ====== */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <FadeInOnView amount={0.2}>
            <div className="text-center mb-12">
              <h2 className="mb-4 text-3xl md:text-4xl font-bold text-emerald-900 dark:text-emerald-300">
                Vì sao chọn <span className="text-emerald-600 dark:text-emerald-400">QuizUniverse</span>?
              </h2>
              <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
                Không chỉ là công việc, mà là cơ hội đóng góp vào sự phát triển của giáo dục
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {BENEFITS.map(benefit => (
                <BenefitCard key={benefit.id} benefit={benefit} />
              ))}
            </div>
          </FadeInOnView>
        </div>
      </section>

      {/* ====== POSITIONS SECTION ====== */}
      <section id="positions" className="py-16 bg-emerald-50/50 dark:bg-slate-800/30 scroll-mt-16">
        <div className="mx-auto max-w-7xl px-6">
          <FadeInOnView amount={0.2}>
            <div className="text-center mb-12">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                <Briefcase className="h-4 w-4" />
                Cơ hội nghề nghiệp
              </div>
              <h2 className="mb-4 text-3xl md:text-4xl font-bold text-emerald-900 dark:text-emerald-300">
                Vị trí đang tuyển dụng
              </h2>
              <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
                Tìm kiếm đồng đội cùng chung đam mê giáo dục và công nghệ
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {JOB_POSITIONS.map(job => (
                <JobCard key={job.id} job={job} onApply={handleApplyClick} />
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Không thấy vị trí phù hợp? Vẫn có thể gửi CV để chúng tôi lưu vào hồ sơ.
              </p>
              <button
                onClick={() => {
                  setSelectedPosition("general");
                  scrollToApplication();
                }}
                className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-6 py-3 font-medium text-emerald-700 hover:bg-emerald-50 dark:border-slate-600 dark:bg-slate-800 dark:text-emerald-300 dark:hover:bg-slate-700 transition-colors"
              >
                <Mail className="h-5 w-5" />
                Gửi CV tổng quát
              </button>
            </div>
          </FadeInOnView>
        </div>
      </section>

      {/* ====== APPLICATION FORM SECTION ====== */}
      <section id="application" className="py-16 scroll-mt-16">
        <div className="mx-auto max-w-3xl px-6">
          <FadeInOnView amount={0.2}>
            <div className="text-center mb-12">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                <Send className="h-4 w-4" />
                Ứng tuyển
              </div>
              <h2 className="mb-4 text-3xl md:text-4xl font-bold text-emerald-900 dark:text-emerald-300">
                Đơn ứng tuyển
              </h2>
              <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
                Điền thông tin để chúng tôi hiểu thêm về bạn và kỹ năng của bạn
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl bg-white dark:bg-slate-900 p-6 md:p-8 shadow-xl border border-emerald-100 dark:border-slate-700"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Nguyễn Văn A"
                      className="w-full rounded-xl border border-emerald-200 dark:border-slate-600 bg-white dark:bg-slate-800 pl-10 pr-4 py-3 text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-900 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-emerald-200 dark:border-slate-600 bg-white dark:bg-slate-800 pl-10 pr-4 py-3 text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-900 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                {/* Position */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Vị trí ứng tuyển <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-emerald-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-gray-700 dark:text-gray-300 focus:border-emerald-400 focus:outline-none"
                    required
                  >
                    <option value="">-- Chọn vị trí --</option>
                    {JOB_POSITIONS.map(job => (
                      <option key={job.id} value={job.id}>
                        {job.title}
                      </option>
                    ))}
                    <option value="general">Gửi CV tổng quát</option>
                  </select>
                </div>

                {/* CV Link */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Link CV/Portfolio (tuỳ chọn)
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                    <input
                      type="url"
                      name="cvLink"
                      value={formData.cvLink}
                      onChange={handleInputChange}
                      placeholder="https://drive.google.com/... hoặc https://linkedin.com/in/..."
                      className="w-full rounded-xl border border-emerald-200 dark:border-slate-600 bg-white dark:bg-slate-800 pl-10 pr-4 py-3 text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-900 focus:outline-none"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Có thể là Google Drive, LinkedIn, GitHub, hoặc portfolio cá nhân
                  </p>
                </div>

                {/* Introduction */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Giới thiệu bản thân <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="introduction"
                    value={formData.introduction}
                    onChange={handleInputChange}
                    placeholder="Hãy giới thiệu về bản thân, kinh nghiệm, kỹ năng và lý do bạn muốn tham gia QuizUniverse..."
                    rows={5}
                    className="w-full rounded-xl border border-emerald-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-900 focus:outline-none"
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 px-6 py-4 text-lg font-bold text-white shadow-lg hover:from-emerald-600 hover:to-green-600 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Đang gửi...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Gửi hồ sơ ứng tuyển
                      </>
                    )}
                  </button>
                  <p className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">
                    Chúng tôi sẽ liên hệ với bạn trong vòng 3-5 ngày làm việc
                  </p>
                </div>
              </form>
            </motion.div>
          </FadeInOnView>
        </div>
      </section>

      {/* ====== FINAL CTA SECTION ====== */}
      <section className="py-20 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-slate-800 dark:to-slate-900">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <FadeInOnView amount={0.2}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 dark:from-emerald-900/20 dark:to-teal-900/20 p-8 md:p-12 border border-emerald-200/50 dark:border-emerald-800/30"
            >
              <div className="mb-6 inline-flex rounded-full bg-white/10 p-3 backdrop-blur dark:bg-white/5">
                <HeartHandshake className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
              </div>
              
              <h2 className="mb-4 text-3xl md:text-4xl font-bold text-emerald-900 dark:text-emerald-300">
                QuizUniverse tin rằng{" "}
                <span className="text-emerald-600 dark:text-emerald-400">giáo dục tốt</span> sẽ thay đổi tương lai
              </h2>
              
              <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-700 dark:text-gray-300">
                Chúng tôi không chỉ xây dựng một sản phẩm công nghệ, mà đang tạo ra một hệ sinh thái
                học tập giúp hàng triệu người tiếp cận tri thức dễ dàng hơn.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={scrollToApplication}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-4 text-lg font-bold text-white shadow-xl hover:from-emerald-700 hover:to-teal-700 transition-all"
                >
                  <Rocket className="h-5 w-5" />
                  Gia nhập đội ngũ
                </button>
                
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-emerald-600 bg-transparent px-8 py-4 text-lg font-bold text-emerald-600 hover:bg-emerald-50 dark:border-emerald-500 dark:text-emerald-400 dark:hover:bg-emerald-900/20 transition-colors"
                >
                  <Lightbulb className="h-5 w-5" />
                  Liên hệ tư vấn
                </Link>
              </div>
              
              <p className="mt-8 text-sm text-gray-600 dark:text-gray-400">
                Có câu hỏi? Gửi email đến <span className="font-medium text-emerald-600 dark:text-emerald-400">careers@quizuniverse.com</span>
              </p>
            </motion.div>
          </FadeInOnView>
        </div>
      </section>
    </div>
  );
}