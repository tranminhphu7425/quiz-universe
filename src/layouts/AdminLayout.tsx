import { Outlet } from "react-router-dom";
import Header from "@/widgets/Header";
import Footer from "@/widgets/Footer";
import ScrollToTop from "@/widgets/ScrollToTop";
import DashboardAdminSidebar from "@/widgets/DashboardAdminSidebar";

export function AdminLayout() {
  return (
    <div className="flex min-h-screen">
     
        <DashboardAdminSidebar />
        <main className="flex-grow">
          <Outlet /> {/* Nội dung các route sẽ render ở đây */}
        </main>
    </div>
  ); 
}