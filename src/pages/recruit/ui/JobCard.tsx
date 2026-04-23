import { motion } from "framer-motion";
import { Briefcase, Clock, Globe, FileText, MapPin, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { JobPosition } from "../types";

export function JobCard({ job, onApply }: { job: JobPosition; onApply: (positionId: string) => void }) {
  const getTypeColor = (type: JobPosition["type"]) => {
    switch (type) {
      case "full-time":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300";
      case "part-time":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
      case "remote":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300";
      case "contract":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300";
    }
  };

  const getTypeIcon = (type: JobPosition["type"]) => {
    switch (type) {
      case "full-time":
        return <Briefcase className="h-4 w-4" />;
      case "part-time":
        return <Clock className="h-4 w-4" />;
      case "remote":
        return <Globe className="h-4 w-4" />;
      case "contract":
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl flex flex-col justify-between border border-emerald-100 bg-white dark:border-slate-700 dark:bg-slate-900 p-6 shadow-lg hover:shadow-xl transition-shadow"
    >
      <div >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-xl font-bold text-emerald-900 dark:text-emerald-300">
            {job.title}
          </h3>
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${getTypeColor(job.type)}`}>
              {getTypeIcon(job.type)}
              {job.type === "full-time" && "Full-time"}
              {job.type === "part-time" && "Part-time"}
              {job.type === "remote" && "Remote"}
              {job.type === "contract" && "Contract"}
            </span>
          </div>
        </div>

        <div className="mb-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <MapPin className="h-4 w-4" />
          <span>{job.location}</span>
        </div>

        <p className="mb-6 text-gray-700 dark:text-gray-300">
          {job.description}
        </p>

        <div className="mb-6">
          <h4 className="mb-2 font-medium text-gray-700 dark:text-gray-300">Yêu cầu chính:</h4>
          <ul className="space-y-1">
            {job.requirements.slice(0, 3).map((req, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500 flex-shrink-0" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-emerald-100 dark:border-slate-700">
        <button
          onClick={() => onApply(job.id)}
          className="flex-1 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 px-4 py-3 font-semibold text-white shadow-lg hover:from-emerald-600 hover:to-green-600 dark:hover:from-emerald-700 dark:hover:to-green-700 transition-all"
        >
          Ứng tuyển ngay
        </button>
        <button
          onClick={() => {
            // Mở modal chi tiết hoặc chuyển trang
            toast.info(`Đang tải chi tiết vị trí ${job.title}`);
          }}
          className="rounded-xl border border-emerald-200 px-4 py-3 font-medium text-emerald-700 hover:bg-emerald-50 dark:border-slate-600 dark:text-emerald-300 dark:hover:bg-emerald-900/20 transition-all"
        >
          Xem chi tiết
        </button>
      </div>
    </motion.div>
  );
}
