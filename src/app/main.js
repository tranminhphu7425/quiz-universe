"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
// src/app/main.tsx
var react_1 = require("react");
var client_1 = require("react-dom/client");
var App_1 = require("../App"); // App.tsx nằm ở src/App.tsx
require("../styles/index.css"); // Tailwind & biến theme
// Tạo root và render App
client_1.default.createRoot(document.getElementById("root")).render((0, jsx_runtime_1.jsx)(react_1.default.StrictMode, { children: (0, jsx_runtime_1.jsx)(App_1.default, {}) }));
