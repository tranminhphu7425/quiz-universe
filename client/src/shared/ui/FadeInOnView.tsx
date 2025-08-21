// src/shared/ui/FadeInOnView.tsx
import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

type FadeInOnViewProps = {
  children: React.ReactNode;
  /** Div cuộn (nếu có). Nếu không truyền -> theo window */
  root?: Element | null;
  /** Phần trăm phần tử phải vào khung mới bắn (0..1), hoặc "some"/"all" */
  amount?: number | "some" | "all";
  /** Tương đương rootMargin */
  margin?: string;
  /** Độ trễ (giúp “stagger” danh sách) */
  delay?: number;
  /** Độ dịch trục Y ban đầu */
  y?: number;
  /** Chạy 1 lần rồi giữ trạng thái (mặc định true) */
  once?: boolean;
};

export default function FadeInOnView({
  children,
  root,
  amount = 0.2,
  margin = "0px 0px -10% 0px",
  delay = 0,
  y = 16,
  once = true,
}: FadeInOnViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { root, margin, amount, once: false });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start({ opacity: 1, y: 0 });
    // Không reset khi ra khỏi khung nếu once=true
    else if (!once) controls.start({ opacity: 0, y });
  }, [inView, controls, once, y]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={controls}
      transition={{ type: "spring", stiffness: 140, damping: 16, delay }}
    >
      {children}
    </motion.div>
  );
}
