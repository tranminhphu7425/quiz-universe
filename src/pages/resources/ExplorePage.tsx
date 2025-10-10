import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Folder, FileText, ArrowRight } from "lucide-react";

type FileItem = {
    name: string;
    path: string;
    type: string; // pdf | docx
};

type Folder = {
    name: string;
    files: FileItem[];
};


export default function ExplorePage() {
    const [folders, setFolders] = useState<any[]>([]);

    useEffect(() => {
        fetch(`${import.meta.env.BASE_URL}/files.json`)
            .then((res) => res.json())
            .then((data) => {
                setFolders(data.folders);

            });
    }, []);

    useEffect(() => {
        console.log("Updated folders:", folders);
    }, [folders]);

    

    return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-14 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            className="text-4xl font-black text-white"
          >
            📂 Trình duyệt tài nguyên
          </motion.h1>
          <p className="mt-2 text-white/80">
            Khám phá và mở tài liệu từ các học phần
          </p>
        </div>
      </section>

      {/* ===== CONTENT ===== */}
      <main className="relative z-10 mx-auto max-w-7xl px-6 py-10">
        {folders.length > 0 ? (
          <div className="">
            {folders.map((folder, i) => (
              <FolderCard key={i} node={folder} />
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-500 dark:text-slate-400">
            Đang tải dữ liệu...
          </p>
        )}
      </main>
    </div>
  );
}




function FolderCard({ node }: any ) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      {/* Header */}
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <h2 className="flex items-center gap-2 text-lg font-semibold text-emerald-700 dark:text-emerald-300">
          <Folder className="h-5 w-5" />
          {node.name}
        </h2>
        <ArrowRight
          className={`h-5 w-5 text-slate-400 transition-transform ${
            open ? "rotate-90 text-emerald-500" : ""
          }`}
        />
      </div>

      {/* Files */}
      {open && (
        <ul className="mt-4 space-y-2">
          {node.children?.map((file : any, i : any) =>
            file.type === "folder" ? (
              <FolderCard key={i} node={file} />
            ) : (
              <li key={i}>
                <a
                  href={`${import.meta.env.BASE_URL}${file.path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-md px-2 py-1 text-sm text-slate-700 hover:bg-emerald-50 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <FileText className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  {file.name}
                </a>
              </li>
            )
          )}
        </ul>
      )}
    </motion.div>
  );
}