// src/shared/ui/FadeInOnView.tsx
import { useRef } from "react";
import { motion } from "framer-motion";

type FadeInOnViewProps = {
  children: React.ReactNode;
  /** Container cuộn dưới dạng ref (nếu có). Nếu không truyền -> window */
  root?: React.RefObject<Element | null>;
  /** Phần trăm phần tử phải vào khung mới bắn (0..1), hoặc "some"/"all" */
  amount?: number | "some" | "all";
  /** rootMargin theo IntersectionObserver (vd: "0px 0px -10% 0px") */
  margin?: string;
  /** Độ trễ (stagger) */
  delay?: number;
  /** Độ dịch trục Y ban đầu */
  y?: number;
  /** Chạy 1 lần rồi giữ trạng thái */
  once?: boolean;
  /** Tuỳ chọn: className bọc ngoài */
  className?: string;
};

export default function FadeInOnView({
  children,
  root,
  amount = 0.2,
  margin = "0px 0px -10% 0px",
  delay = 0,
  y = 16,
  once = true,
  className,
}: FadeInOnViewProps) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 160, damping: 18 }}
      viewport={{ root, margin, amount, once }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
