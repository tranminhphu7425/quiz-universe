// src/components/ui/AnimatedGradientBackground.tsx
import React from "react";
import { motion } from "framer-motion";

export interface AnimatedGradientBackgroundProps {
  /** Màu gradient chính cho light mode */
  gradientLight?: string;
  /** Màu gradient chính cho dark mode */
  gradientDark?: string;
  /** Độ mờ của các orb (0-1), mặc định 0.2 */
  orbOpacity?: number;
  /** Hiển thị grid pattern, mặc định true */
  showGrid?: boolean;
  /** Hiển thị blur blobs, mặc định true */
  showBlobs?: boolean;
  /** Class name bổ sung */
  className?: string;
  /** Tốc độ animation (1-3), mặc định 1 */
  animationSpeed?: 1 | 2 | 3;
  /** Màu sắc tùy chỉnh cho các orbs */
  orbColors?: {
    primary?: string;
    secondary?: string;
    tertiary?: string;
  };
}

const AnimatedGradientBackground: React.FC<AnimatedGradientBackgroundProps> = () => {

  return (
   <>
   {/* Gradient nền lớn */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />

        {/* Họa tiết tile mờ bên trái */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          {/* Gradient orbs */}
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[120px] animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-[80px] animate-pulse delay-500" />

          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
              backgroundSize: "30px 30px",
            }}
          />
        </div>
        
        {/* Blur blobs */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl dark:bg-emerald-400/10" />
        <div className="pointer-events-none absolute -right-16 top-10 h-64 w-64 rounded-full bg-white/10 blur-2xl dark:bg-purple-400/10" /></>
  );
};

export default AnimatedGradientBackground;