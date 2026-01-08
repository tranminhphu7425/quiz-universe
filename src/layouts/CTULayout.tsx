// src/app/layout.tsx
import { Outlet } from "react-router-dom";
import HeaderCTU from "@/widgets/HeaderCTU";
import Footer from "@/widgets/Footer";
import ScrollToTop from "@/widgets/ScrollToTop";

export function CTULayout() {
  return (
    <div className="flex flex-col min-h-screen">
       <ScrollToTop />
      <HeaderCTU />
      <main className="flex-grow">
        <Outlet /> {/* Nội dung các route sẽ render ở đây */}
      </main>
      <Footer />
    </div>
  );
}