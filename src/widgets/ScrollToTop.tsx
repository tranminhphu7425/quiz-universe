import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Mỗi lần pathname thay đổi, cuộn lên đầu trang
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // Hoặc "auto" nếu không cần hiệu ứng mượt
    });
  }, [location.pathname]);

  return null;
};

export default ScrollToTop;
