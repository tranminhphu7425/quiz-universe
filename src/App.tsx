// src/App.tsx
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";
import { QueryProvider } from "./app/providers/QueryProvider";
import { AuthProvider } from "./app/providers/AuthProvider";
import { ThemeProvider } from "./app/providers/ThemeProvider";
import { I18nProvider } from "./app/providers/I18nProvider";
import {Demo} from "./Demo";

import "@/App.css";

function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <AuthProvider>
          <QueryProvider>
            {/* Đặt ScrollToTop trong context Router */}
           
            <RouterProvider router={router} />
          </QueryProvider>
        </AuthProvider>
      </I18nProvider>
    </ThemeProvider>


  );
}

export default App;
