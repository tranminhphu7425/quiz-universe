// src/pages/feedback/FeedbackPage.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, 
  Bug, 
  Lightbulb, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  Star,
  ThumbsUp,
  Sparkles,
  HelpCircle,
  FileText,
  Shield,
  Bell,
  Zap
} from "lucide-react";
import FadeInOnView from "@/shared/ui/FadeInOnView";
import { toast } from "sonner";

type FeedbackType = 'bug' | 'suggestion' | 'question' | 'other';
type PriorityLevel = 'low' | 'medium' | 'high' | 'critical';

interface FeedbackForm {
  title: string;
  content: string;
  type: FeedbackType;
  priority: PriorityLevel;
  contactEmail?: string;
  allowFollowUp: boolean;
  attachments?: File[];
}

interface FeedbackCategory {
  id: FeedbackType;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  examples: string[];
}

export default function FeedbackPage() {
  const [form, setForm] = useState<FeedbackForm>({
    title: '',
    content: '',
    type: 'suggestion',
    priority: 'medium',
    contactEmail: '',
    allowFollowUp: true,
    attachments: []
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FeedbackForm, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories: FeedbackCategory[] = [
    {
      id: 'bug',
      title: 'Báo lỗi',
      description: 'Phát hiện lỗi hệ thống, lỗi hiển thị hoặc vấn đề kỹ thuật',
      icon: <Bug className="h-5 w-5" />,
      color: 'from-rose-500 to-red-400',
      examples: [
        'Không thể đăng nhập vào tài khoản',
        'Giao diện bị lỗi trên điện thoại',
        'Câu hỏi hiển thị sai đáp án',
        'Tính năng X không hoạt động'
      ]
    },
    {
      id: 'suggestion',
      title: 'Góp ý cải tiến',
      description: 'Ý tưởng mới để cải thiện trải nghiệm người dùng',
      icon: <Lightbulb className="h-5 w-5" />,
      color: 'from-amber-500 to-orange-400',
      examples: [
        'Thêm tính năng học theo lộ trình',
        'Cải thiện giao diện trang chủ',
        'Bổ sung thêm môn học mới',
        'Tối ưu hóa trải nghiệm mobile'
      ]
    },
    {
      id: 'question',
      title: 'Câu hỏi',
      description: 'Cần hỗ trợ hoặc giải đáp thắc mắc về sản phẩm',
      icon: <HelpCircle className="h-5 w-5" />,
      color: 'from-blue-500 to-cyan-400',
      examples: [
        'Cách sử dụng tính năng Y',
        'Hướng dẫn tạo bộ câu hỏi',
        'Chính sách bảo mật dữ liệu',
        'Làm sao để nâng cấp tài khoản'
      ]
    },
    {
      id: 'other',
      title: 'Khác',
      description: 'Các phản hồi không thuộc các loại trên',
      icon: <FileText className="h-5 w-5" />,
      color: 'from-purple-500 to-pink-400',
      examples: [
        'Đánh giá trải nghiệm tổng thể',
        'Góp ý về nội dung học tập',
        'Phản hồi về đội ngũ hỗ trợ',
        'Ý kiến khác'
      ]
    }
  ];

  const priorities = [
    { id: 'low' as PriorityLevel, label: 'Thấp', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' },
    { id: 'medium' as PriorityLevel, label: 'Trung bình', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' },
    { id: 'high' as PriorityLevel, label: 'Cao', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' },
    { id: 'critical' as PriorityLevel, label: 'Khẩn cấp', color: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300' }
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FeedbackForm, string>> = {};

    if (!form.title.trim()) {
      newErrors.title = 'Vui lòng nhập tiêu đề';
    } else if (form.title.length < 5) {
      newErrors.title = 'Tiêu đề quá ngắn (tối thiểu 5 ký tự)';
    } else if (form.title.length > 100) {
      newErrors.title = 'Tiêu đề quá dài (tối đa 100 ký tự)';
    }

    if (!form.content.trim()) {
      newErrors.content = 'Vui lòng nhập nội dung phản hồi';
    } else if (form.content.length < 10) {
      newErrors.content = 'Nội dung quá ngắn (tối thiểu 10 ký tự)';
    } else if (form.content.length > 2000) {
      newErrors.content = 'Nội dung quá dài (tối đa 2000 ký tự)';
    }

    if (form.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contactEmail)) {
      newErrors.contactEmail = 'Email không hợp lệ';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FeedbackForm, value: any) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Validate file size (max 5MB each)
    const validFiles = files.filter(file => {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`File "${file.name}" quá lớn. Kích thước tối đa là 5MB`);
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      setForm(prev => ({
        ...prev,
        attachments: [...(prev.attachments || []), ...validFiles].slice(0, 3) // Limit to 3 files
      }));
    }
  };

  const removeAttachment = (index: number) => {
    setForm(prev => ({
      ...prev,
      attachments: prev.attachments?.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Vui lòng kiểm tra lại thông tin');
      return;
    }

    setIsSubmitting(true);
    
    // Mock API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Feedback submitted:', form);
      
      toast.success('Gửi phản hồi thành công! Cảm ơn bạn đã đóng góp.');
      setIsSubmitted(true);
      
      // Reset form
      setForm({
        title: '',
        content: '',
        type: 'suggestion',
        priority: 'medium',
        contactEmail: '',
        allowFollowUp: true,
        attachments: []
      });
      setErrors({});
      
    } catch (error) {
      toast.error('Có lỗi xảy ra. Vui lòng thử lại!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setForm({
      title: '',
      content: '',
      type: 'suggestion',
      priority: 'medium',
      contactEmail: '',
      allowFollowUp: true,
      attachments: []
    });
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <div className="feedback-page bg-slate-50 dark:bg-slate-800 min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="text-white text-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 160, damping: 18 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/20 backdrop-blur dark:bg-white/5 dark:ring-white/10"
            >
              <MessageSquare className="h-4 w-4 text-white dark:text-emerald-300" />
              <span className="text-white dark:text-gray-200">Phản hồi & Góp ý • Giúp chúng tôi cải thiện</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="text-3xl md:text-4xl font-black leading-tight text-white dark:text-gray-100"
            >
              Gửi phản hồi
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-2 text-white/90 dark:text-gray-300 max-w-2xl mx-auto"
            >
              Ý kiến của bạn rất quan trọng để chúng tôi ngày càng hoàn thiện
            </motion.p>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-xl bg-white/10 dark:bg-white/5 p-4 backdrop-blur border border-white/20"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-emerald-500/20 p-2">
                  <Lightbulb className="h-5 w-5 text-emerald-300" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">248+</div>
                  <div className="text-sm text-white/80">Góp ý đã tiếp nhận</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="rounded-xl bg-white/10 dark:bg-white/5 p-4 backdrop-blur border border-white/20"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-blue-500/20 p-2">
                  <ThumbsUp className="h-5 w-5 text-blue-300" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">186</div>
                  <div className="text-sm text-white/80">Được triển khai</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-xl bg-white/10 dark:bg-white/5 p-4 backdrop-blur border border-white/20"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-amber-500/20 p-2">
                  <Zap className="h-5 w-5 text-amber-300" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">24h</div>
                  <div className="text-sm text-white/80">Phản hồi trung bình</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="rounded-xl bg-white/10 dark:bg-white/5 p-4 backdrop-blur border border-white/20"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-purple-500/20 p-2">
                  <Star className="h-5 w-5 text-purple-300" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">4.8</div>
                  <div className="text-sm text-white/80">Đánh giá hỗ trợ</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-6 py-8">
        <FadeInOnView amount={0.1}>
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center"
              >
                <div className="rounded-2xl bg-white dark:bg-slate-900 p-8 shadow-lg border border-emerald-100 dark:border-slate-700">
                  <div className="mx-auto w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-6">
                    <CheckCircle2 className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  
                  <h2 className="text-2xl font-bold text-emerald-900 dark:text-emerald-300 mb-3">
                    Cảm ơn phản hồi của bạn!
                  </h2>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                    Chúng tôi đã nhận được phản hồi và sẽ xem xét cẩn thận. 
                    Bạn sẽ nhận được cập nhật qua email nếu cung cấp thông tin liên hệ.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={resetForm}
                      className="rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 dark:from-emerald-600 dark:to-green-600 px-6 py-3 font-semibold text-white shadow-lg hover:from-emerald-600 hover:to-green-600 dark:hover:from-emerald-700 dark:hover:to-green-700 transition-all"
                    >
                      Gửi phản hồi khác
                    </button>
                    
                    <button
                      onClick={() => window.location.href = '/'}
                      className="rounded-xl border-2 border-emerald-200 dark:border-slate-600 px-6 py-3 font-medium text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all"
                    >
                      Quay về trang chủ
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                {/* Left Side - Guide */}
                <div className="lg:col-span-1">
                  <div className="sticky top-8 space-y-6">
                    <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-lg border border-emerald-100 dark:border-slate-700">
                      <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-emerald-900 dark:text-emerald-300">
                        <Sparkles className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                        Hướng dẫn gửi phản hồi hiệu quả
                      </h3>
                      
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <div className="mt-1 h-2 w-2 rounded-full bg-emerald-500"></div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">Mô tả rõ vấn đề bạn gặp phải</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 h-2 w-2 rounded-full bg-emerald-500"></div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">Nêu chi tiết các bước để tái hiện lỗi</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 h-2 w-2 rounded-full bg-emerald-500"></div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">Đính kèm ảnh chụp màn hình nếu có</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 h-2 w-2 rounded-full bg-emerald-500"></div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">Cung cấp thông tin liên hệ để nhận phản hồi</span>
                        </li>
                      </ul>
                    </div>

                    <div className="rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-400/10 dark:from-emerald-900/30 dark:to-teal-900/30 p-6 border border-emerald-200/50 dark:border-emerald-700/30">
                      <h3 className="mb-4 text-lg font-bold text-emerald-900 dark:text-emerald-300">
                        <Shield className="inline h-5 w-5 mr-2" />
                        Cam kết của chúng tôi
                      </h3>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Bell className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Phản hồi trong 24-48 giờ</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Cập nhật tiến độ thường xuyên</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ThumbsUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Đánh giá và triển khai các ý tưởng hay</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Form */}
                <div className="lg:col-span-2">
                  <div className="rounded-2xl bg-white dark:bg-slate-900 shadow-xl border border-emerald-100 dark:border-slate-700 overflow-hidden">
                    <div className="p-6">
                      <h2 className="mb-6 text-xl font-bold text-emerald-900 dark:text-emerald-300">
                        Mẫu phản hồi
                      </h2>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Feedback Type */}
                        <div>
                          <label className="mb-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Loại phản hồi
                          </label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {categories.map(category => (
                              <button
                                type="button"
                                key={category.id}
                                onClick={() => handleInputChange('type', category.id)}
                                className={`rounded-xl border-2 p-4 text-left transition-all ${form.type === category.id
                                  ? `border-emerald-500 bg-gradient-to-br ${category.color}/20`
                                  : 'border-gray-200 dark:border-slate-700 hover:border-emerald-300'
                                  }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className={`rounded-lg bg-gradient-to-br ${category.color} p-2`}>
                                    <div className="text-white">
                                      {category.icon}
                                    </div>
                                  </div>
                                  <div>
                                    <div className="font-medium text-gray-700 dark:text-gray-300">
                                      {category.title}
                                    </div>
                                    <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                      {category.description}
                                    </div>
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Title */}
                        <div>
                          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Tiêu đề <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={form.title}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            placeholder="Ví dụ: Lỗi không thể tải đề thi khi sử dụng Chrome"
                            className={`w-full rounded-xl border ${errors.title ? 'border-rose-300' : 'border-emerald-200 dark:border-slate-600'} bg-white dark:bg-slate-800 px-4 py-3 text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-900 focus:outline-none`}
                          />
                          {errors.title && (
                            <p className="mt-1 text-sm text-rose-600 dark:text-rose-400 flex items-center gap-1">
                              <AlertCircle className="h-4 w-4" /> {errors.title}
                            </p>
                          )}
                        </div>

                        {/* Content */}
                        <div>
                          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Nội dung chi tiết <span className="text-rose-500">*</span>
                          </label>
                          <textarea
                            value={form.content}
                            onChange={(e) => handleInputChange('content', e.target.value)}
                            placeholder="Mô tả chi tiết vấn đề, gợi ý hoặc câu hỏi của bạn..."
                            rows={6}
                            className={`w-full rounded-xl border ${errors.content ? 'border-rose-300' : 'border-emerald-200 dark:border-slate-600'} bg-white dark:bg-slate-800 px-4 py-3 text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-900 focus:outline-none resize-none`}
                          />
                          {errors.content && (
                            <p className="mt-1 text-sm text-rose-600 dark:text-rose-400 flex items-center gap-1">
                              <AlertCircle className="h-4 w-4" /> {errors.content}
                            </p>
                          )}
                          <div className="mt-1 flex justify-between text-xs text-gray-500 dark:text-gray-400">
                            <span>Mô tả càng chi tiết càng tốt</span>
                            <span>{form.content.length}/2000</span>
                          </div>
                        </div>

                        {/* Priority */}
                        <div>
                          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Mức độ ưu tiên
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {priorities.map(priority => (
                              <button
                                type="button"
                                key={priority.id}
                                onClick={() => handleInputChange('priority', priority.id)}
                                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${form.priority === priority.id
                                  ? `${priority.color} ring-2 ring-offset-1 ring-current/30`
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-slate-800 dark:text-gray-300 dark:hover:bg-slate-700'
                                  }`}
                              >
                                {priority.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Contact Email */}
                        <div>
                          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email liên hệ (tuỳ chọn)
                          </label>
                          <input
                            type="email"
                            value={form.contactEmail}
                            onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                            placeholder="email@example.com"
                            className={`w-full rounded-xl border ${errors.contactEmail ? 'border-rose-300' : 'border-emerald-200 dark:border-slate-600'} bg-white dark:bg-slate-800 px-4 py-3 text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-900 focus:outline-none`}
                          />
                          {errors.contactEmail && (
                            <p className="mt-1 text-sm text-rose-600 dark:text-rose-400 flex items-center gap-1">
                              <AlertCircle className="h-4 w-4" /> {errors.contactEmail}
                            </p>
                          )}
                        </div>

                        {/* Attachments */}
                        <div>
                          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Đính kèm tệp (tuỳ chọn)
                          </label>
                          <div className="space-y-3">
                            <div className={`rounded-xl border-2 border-dashed ${form.attachments && form.attachments.length > 0
                              ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/20'
                              : 'border-emerald-300 dark:border-slate-600 hover:border-emerald-400 dark:hover:border-slate-500'
                              } p-4 text-center transition-all`}
                            >
                              <label className="cursor-pointer">
                                <div className="space-y-2">
                                  <div className="inline-flex rounded-full bg-emerald-100 dark:bg-emerald-900/40 p-3">
                                    <FileText className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                                  </div>
                                  <p className="text-sm text-gray-700 dark:text-gray-300">
                                    Kéo thả file hoặc click để chọn
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Hỗ trợ ảnh, PDF, Word (tối đa 3 file, mỗi file 5MB)
                                  </p>
                                </div>
                                <input
                                  type="file"
                                  multiple
                                  accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                                  onChange={handleFileUpload}
                                  className="hidden"
                                />
                              </label>
                            </div>

                            {/* File list */}
                            {form.attachments && form.attachments.length > 0 && (
                              <div className="space-y-2">
                                {form.attachments.map((file, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center justify-between rounded-lg bg-gray-50 dark:bg-slate-800 px-3 py-2"
                                  >
                                    <div className="flex items-center gap-3">
                                      <FileText className="h-4 w-4 text-gray-400" />
                                      <div>
                                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                          {file.name}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                          {(file.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                      </div>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => removeAttachment(index)}
                                      className="rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-600 dark:hover:bg-slate-700"
                                    >
                                      ×
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Follow Up */}
                        <div className="flex items-center justify-between rounded-lg border border-emerald-200 dark:border-slate-600 bg-emerald-50/50 dark:bg-emerald-900/20 px-4 py-3">
                          <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Cho phép liên hệ lại
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Chúng tôi có thể liên hệ lại để làm rõ thông tin
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleInputChange('allowFollowUp', !form.allowFollowUp)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${form.allowFollowUp ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-slate-600'
                              }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${form.allowFollowUp ? 'translate-x-6' : 'translate-x-1'
                                }`}
                            />
                          </button>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4 border-t border-emerald-100 dark:border-slate-700">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`flex items-center justify-center gap-2 w-full rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 dark:from-emerald-600 dark:to-green-600 px-6 py-4 font-bold text-white shadow-lg transition-all ${isSubmitting
                              ? 'opacity-70 cursor-not-allowed'
                              : 'hover:from-emerald-600 hover:to-green-600 dark:hover:from-emerald-700 dark:hover:to-green-700'
                              }`}
                          >
                            {isSubmitting ? (
                              <>
                                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                Đang gửi...
                              </>
                            ) : (
                              <>
                                <Send className="h-5 w-5" />
                                Gửi phản hồi
                              </>
                            )}
                          </button>
                          
                          <p className="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">
                            Bằng cách gửi phản hồi, bạn đồng ý với{' '}
                            <a href="/privacy" className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 underline">
                              Chính sách bảo mật
                            </a>{' '}
                            của chúng tôi
                          </p>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </FadeInOnView>
      </div>
    </div>
  );
}