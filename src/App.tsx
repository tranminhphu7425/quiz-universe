// src/App.tsx
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";
import { QueryProvider } from "./app/providers/QueryProvider";
import { AuthProvider } from "./app/providers/AuthProvider";
import { ThemeProvider } from "./app/providers/ThemeProvider";
import { I18nProvider } from "./app/providers/I18nProvider";
import { Toaster } from "react-hot-toast";


import "@/App.css";

function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <AuthProvider>
          <QueryProvider>
            {/* Đặt ScrollToTop trong context Router */}
           
            <RouterProvider router={router} />
            <Toaster
              position="bottom-right"
              reverseOrder={false}
              toastOptions={{
                duration: 3000, // 3s auto close
                style: {
                  background: "#1f2937", // slate-800
                  color: "#fff",
                  borderRadius: "0.75rem",
                  fontSize: "0.875rem",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                },
                success: {
                  iconTheme: {
                    primary: "#10b981", // emerald-500
                    secondary: "#fff",
                  },
                },
                error: {
                  iconTheme: {
                    primary: "#ef4444", // red-500
                    secondary: "#fff",
                  },
                },
              }}
            />
          </QueryProvider>
        </AuthProvider>
      </I18nProvider>
    </ThemeProvider>


  );
}

export default App;
