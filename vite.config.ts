// ❌ bỏ dòng này nếu muốn, không còn cần thiết khi đã cấu hình tsconfig.node.json
// /// <reference types="node" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Cách A (ổn với TS mới): 'node:url'
import { fileURLToPath, URL } from 'node:url'

// Nếu môi trường/TS cũ không hiểu 'node:url', đổi sang:
// import { fileURLToPath, URL } from 'url'



export default defineConfig(() => ({
  base: "/quiz-universe/", // đổi theo tên repo
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@app': fileURLToPath(new URL('./src/app', import.meta.url)),
      '@shared': fileURLToPath(new URL('./src/shared', import.meta.url)),
      '@features': fileURLToPath(new URL('./src/features', import.meta.url)),
      '@entities': fileURLToPath(new URL('./src/entities', import.meta.url)),
      '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@layouts': fileURLToPath(new URL('./src/layouts', import.meta.url)),
      '@widgets': fileURLToPath(new URL('./src/widgets', import.meta.url))
    }
  },

  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    // Nếu chạy WSL/Docker/LAN mà WS không nối được, mở comment dưới:
    // host: true,
    // hmr: { protocol: "ws", host: "localhost", clientPort: 5173 },
  },
  preview: { port: 5173, strictPort: true },
}))
