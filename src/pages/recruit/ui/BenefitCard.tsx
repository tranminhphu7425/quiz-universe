import { motion } from "framer-motion";
import { BenefitItem } from "../types";

export function BenefitCard({ benefit }: { benefit: BenefitItem }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl bg-white dark:bg-slate-900 p-6 border border-emerald-100 dark:border-slate-700 shadow-lg"
    >
      <div className={`mb-4 inline-flex rounded-xl bg-gradient-to-br ${benefit.color} p-3`}>
        <div className="text-white">{benefit.icon}</div>
      </div>
      <h3 className="mb-2 text-lg font-bold text-emerald-900 dark:text-emerald-300">
        {benefit.title}
      </h3>
      <p className="text-gray-700 dark:text-gray-300">
        {benefit.description}
      </p>
    </motion.div>
  );
}
