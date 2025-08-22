import { jsx as _jsx } from "react/jsx-runtime";
// src/shared/ui/FadeInOnView.tsx
import { useRef } from "react";
import { motion } from "framer-motion";
export default function FadeInOnView({ children, root, amount = 0.2, margin = "0px 0px -10% 0px", delay = 0, y = 16, once = true, className, }) {
    const ref = useRef(null);
    return (_jsx(motion.div, { ref: ref, initial: { opacity: 0, y }, whileInView: { opacity: 1, y: 0 }, transition: { delay, type: "spring", stiffness: 160, damping: 18 }, viewport: { root, margin, amount, once }, className: className, children: children }));
}
