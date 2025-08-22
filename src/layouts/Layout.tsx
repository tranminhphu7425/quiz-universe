// src/app/layout.tsx
import { Outlet } from "react-router-dom";
import Header from "@/widgets/Header";
import Footer from "@/widgets/Footer";

export function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet /> {/* Nội dung các route sẽ render ở đây */}
      </main>
      <Footer />
    </div>
  );
}