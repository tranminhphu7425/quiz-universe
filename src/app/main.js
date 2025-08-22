import { jsx as _jsx } from "react/jsx-runtime";
// src/app/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "../App"; // App.tsx nằm ở src/App.tsx
import "../styles/index.css"; // Tailwind & biến theme
// Tạo root và render App
ReactDOM.createRoot(document.getElementById("root")).render(_jsx(React.StrictMode, { children: _jsx(App, {}) }));
