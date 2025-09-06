// src/app/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";          // App.tsx nằm ở src/App.tsx
import "@/styles/index.css";      // Tailwind & biến theme

// Tạo root và render App
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
