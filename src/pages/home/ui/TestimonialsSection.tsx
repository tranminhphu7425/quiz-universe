import { motion } from "framer-motion";
import TestimonialCard from "@/widgets/TestimonialCard";

interface Testimonial {
  id: number;
  name: string;
  comment: string;
  rating: number;
  role: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection = ({ testimonials }: TestimonialsSectionProps) => {
  const looped = [...testimonials, ...testimonials];

  return (
    <section className="py-20 mx-auto max-w-7xl px-6 transition-colors duration-300">
      {/* Tiêu đề */}
      <div className="mb-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-emerald-900 dark:text-emerald-300"
        >
          Nhận xét từ người dùng
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
          className="mt-2 text-emerald-800/80 dark:text-slate-300/80"
        >
          Đánh giá của giảng viên và sinh viên về QuizUniverse
        </motion.p>
      </div>

      <div className="overflow-hidden relative w-full">
        <motion.div
          className="flex gap-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 30,
            repeat: Infinity,
          }}
        >
          {looped.map((t, idx) => (
            <TestimonialCard
              key={idx}
              index={idx}
              name={t.name}
              role={t.role}
              rating={t.rating}
              comment={t.comment}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
