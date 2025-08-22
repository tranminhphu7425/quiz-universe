"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vite_1 = require("vite");
var plugin_react_1 = require("@vitejs/plugin-react");
var path_1 = require("path");
exports.default = (0, vite_1.defineConfig)({
    plugins: [(0, plugin_react_1.default)()],
    base: "/quiz-universe",
    server: {
        port: 5173,
        proxy: {
            '/api': {
                target: 'http://localhost:3001', // trỏ tới server Express
                changeOrigin: true,
            },
        },
    },
    resolve: {
        alias: {
            "@": path_1.default.resolve(__dirname, "src"), // alias @ → src
            "@app": path_1.default.resolve(__dirname, "src/app"),
            "@shared": path_1.default.resolve(__dirname, "src/shared"),
            "@features": path_1.default.resolve(__dirname, "src/features"),
            "@entities": path_1.default.resolve(__dirname, "src/entities"),
            "@pages": path_1.default.resolve(__dirname, "src/pages"),
            "@layouts": path_1.default.resolve(__dirname, "src/layouts"),
            "@widgets": path_1.default.resolve(__dirname, "src/widgets"),
        },
    },
});
