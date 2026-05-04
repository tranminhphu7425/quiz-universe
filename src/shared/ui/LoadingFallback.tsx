import { motion } from "framer-motion";
import {
  MdLoop as Loader2
} from 'react-icons/md';

export const LoadingFallback = () => (
  <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-4">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
      className="rounded-full bg-gradient-to-tr from-emerald-400 to-teal-500 p-4 shadow-lg"
    >
      <Loader2 className="h-8 w-8 text-white" />
    </motion.div>
    <motion.div
      initial={{ opacity: 0.6 }}
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className="text-sm font-medium text-emerald-700 dark:text-emerald-300"
    >
      Đang tải nội dung...
    </motion.div>
  </div>
);
