"use client"
import React, { useEffect, useState, memo } from 'react';



type GlowColor = 'cyan' | 'purple';

interface SkillIconProps {
  type: IconType;
}

interface SkillConfig {
  id: string;
  orbitRadius: number;
  size: number;
  speed: number;
  iconType: IconType;
  phaseShift: number;
  glowColor: GlowColor;
  label: string;
}

interface OrbitingSkillProps {
  config: SkillConfig;
  angle: number;
}

interface GlowingOrbitPathProps {
  radius: number;
  glowColor?: GlowColor;
  animationDelay?: number;
}

type IconType = 'browser' | 'layout' | 'seo' | 'analytics' | 'server' | 'security';




// --- Improved SVG Icon Components ---
const iconComponents: Record<IconType, { component: () => React.JSX.Element; color: string }> = {
  browser: {
    component: () => (
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <circle cx="12" cy="12" r="10" stroke="#2563EB" strokeWidth="2" fill="none"/>
        <path d="M2 12h20M12 2a15 15 0 010 20" stroke="#2563EB" strokeWidth="2"/>
      </svg>
    ),
    color: '#2563EB'
  },
  layout: {
    component: () => (
      <svg viewBox="0 0 24 24" className="w-full h-full" stroke="#9333EA" fill="none" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <line x1="3" y1="9" x2="21" y2="9"/>
        <line x1="9" y1="21" x2="9" y2="9"/>
      </svg>
    ),
    color: '#9333EA'
  },
  seo: {
    component: () => (
      <svg viewBox="0 0 24 24" className="w-full h-full" stroke="#10B981" fill="none" strokeWidth="2">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
    color: '#10B981'
  },
  analytics: {
    component: () => (
      <svg viewBox="0 0 24 24" className="w-full h-full" stroke="#F59E0B" fill="none" strokeWidth="2">
        <line x1="4" y1="20" x2="4" y2="10"/>
        <line x1="10" y1="20" x2="10" y2="4"/>
        <line x1="16" y1="20" x2="16" y2="14"/>
        <line x1="22" y1="20" x2="22" y2="8"/>
      </svg>
    ),
    color: '#F59E0B'
  },
  server: {
    component: () => (
      <svg viewBox="0 0 24 24" className="w-full h-full" stroke="#06B6D4" fill="none" strokeWidth="2">
        <rect x="3" y="4" width="18" height="6" rx="2"/>
        <rect x="3" y="14" width="18" height="6" rx="2"/>
        <circle cx="8" cy="7" r="1"/>
        <circle cx="8" cy="17" r="1"/>
      </svg>
    ),
    color: '#06B6D4'
  },
  security: {
    component: () => (
      <svg viewBox="0 0 24 24" className="w-full h-full" stroke="#EF4444" fill="none" strokeWidth="2">
        <path d="M12 22c4-2 8-4 8-10V5l-8-3-8 3v7c0 6 4 8 8 10z"/>
      </svg>
    ),
    color: '#EF4444'
  }
};


// --- Memoized Icon Component ---
const SkillIcon = memo(({ type }: SkillIconProps) => {
  const IconComponent = iconComponents[type]?.component;
  return IconComponent ? <IconComponent /> : null;
});
SkillIcon.displayName = 'SkillIcon';

// --- Configuration for the Orbiting Skills ---
const skillsConfig: SkillConfig[] = [
  { id: 'browser', orbitRadius: 100, size: 40, speed: 1, iconType: 'browser', phaseShift: 0, glowColor: 'cyan', label: 'Trình duyệt' },
  { id: 'layout', orbitRadius: 100, size: 40, speed: 1, iconType: 'layout', phaseShift: (2*Math.PI)/3, glowColor: 'cyan', label: 'Bố cục web' },
  { id: 'seo', orbitRadius: 100, size: 40, speed: 1, iconType: 'seo', phaseShift: (4*Math.PI)/3, glowColor: 'cyan', label: 'SEO' },

  { id: 'analytics', orbitRadius: 180, size: 50, speed: -0.6, iconType: 'analytics', phaseShift: 0, glowColor: 'purple', label: 'Phân tích' },
  { id: 'server', orbitRadius: 180, size: 45, speed: -0.6, iconType: 'server', phaseShift: (2*Math.PI)/3, glowColor: 'purple', label: 'Máy chủ' },
  { id: 'security', orbitRadius: 180, size: 45, speed: -0.6, iconType: 'security', phaseShift: (4*Math.PI)/3, glowColor: 'purple', label: 'Bảo mật' },
];


// --- Memoized Orbiting Skill Component ---
const OrbitingSkill = memo(({ config, angle }: OrbitingSkillProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { orbitRadius, size, iconType, label } = config;

  const x = Math.cos(angle) * orbitRadius;
  const y = Math.sin(angle) * orbitRadius;

  return (
    <div
      className="absolute top-1/2 left-1/2 transition-all duration-300 ease-out"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
        zIndex: isHovered ? 20 : 10,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
  className={`
    relative w-full h-full p-2 
    rounded-full flex items-center justify-center
    transition-all duration-300 cursor-pointer
    backdrop-blur-sm
    bg-gray-100/90 dark:bg-gray-800/90
    ${isHovered ? 'scale-125 shadow-2xl' : 'shadow-lg hover:shadow-xl'}
  `}
  style={{
    boxShadow: isHovered
      ? `0 0 30px ${iconComponents[iconType]?.color}40, 
         0 0 60px ${iconComponents[iconType]?.color}20`
      : undefined,
  }}
>
  {/* Icon */}
  <SkillIcon type={iconType} />

  {/* Tooltip hiển thị tên kỹ năng */}
  {isHovered && (
    <div
      className="
        absolute -bottom-8 left-1/2 -translate-x-1/2 
        px-2 py-1 text-xs rounded whitespace-nowrap pointer-events-none 
        backdrop-blur-md
        bg-white/90 text-gray-800 shadow-sm
        dark:bg-gray-900/95 dark:text-white
        border border-gray-200/40 dark:border-gray-700/60
      "
    >
      {label}
    </div>
  )}
</div>

    </div>
  );
});
OrbitingSkill.displayName = 'OrbitingSkill';

// --- Optimized Orbit Path Component ---
const GlowingOrbitPath = memo(({ radius, glowColor = 'cyan', animationDelay = 0 }: GlowingOrbitPathProps) => {
  const glowColors = {
    cyan: {
      primary: 'rgba(6, 182, 212, 0.4)',
      secondary: 'rgba(6, 182, 212, 0.2)',
      border: 'rgba(6, 182, 212, 0.3)'
    },
    purple: {
      primary: 'rgba(147, 51, 234, 0.4)',
      secondary: 'rgba(147, 51, 234, 0.2)',
      border: 'rgba(147, 51, 234, 0.3)'
    }
  };

  const colors = glowColors[glowColor] || glowColors.cyan;

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
      style={{
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        animationDelay: `${animationDelay}s`,
      }}
    >
      {/* Glowing background */}
      <div
        className="absolute inset-0 rounded-full animate-pulse"
        style={{
          background: `radial-gradient(circle, transparent 30%, ${colors.secondary} 70%, ${colors.primary} 100%)`,
          boxShadow: `0 0 60px ${colors.primary}, inset 0 0 60px ${colors.secondary}`,
          animation: 'pulse 4s ease-in-out infinite',
          animationDelay: `${animationDelay}s`,
        }}
      />

      {/* Static ring for depth */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: `1px solid ${colors.border}`,
          boxShadow: `inset 0 0 20px ${colors.secondary}`,
        }}
      />
    </div>
  );
});
GlowingOrbitPath.displayName = 'GlowingOrbitPath';

// --- Main App Component ---
export default function OrbitingSkills() {
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      setTime(prevTime => prevTime + deltaTime);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  const orbitConfigs: Array<{ radius: number; glowColor: GlowColor; delay: number }> = [
    { radius: 100, glowColor: 'cyan', delay: 0 },
    { radius: 180, glowColor: 'purple', delay: 1.5 }
  ];

  return (
    <main className="absolute z-10 right-5 md:right-10 lg:right-18 xl:right-48 top-8 flex items-center justify-center overflow-hidden">
  {/* Background pattern */}
  <div className="absolute inset-0 opacity-0 transition-all duration-700">
    <div
      className="absolute inset-0 dark:opacity-40 opacity-80"
      style={{
        backgroundImage: `
          radial-gradient(circle at 25% 25%, var(--pattern-color-1, #e5e7eb) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, var(--pattern-color-2, #d1d5db) 0%, transparent 50%)
        `,
      }}
    />
  </div>

  <div
    className="relative w-[calc(100vw-40px)] h-[calc(100vw-40px)] md:w-[450px] md:h-[450px] flex items-center justify-center"
    onMouseEnter={() => setIsPaused(true)}
    onMouseLeave={() => setIsPaused(false)}
  >
    {/* 🌙☀️ Central "Code" Icon with glow adaptable to theme */}
    <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-900 rounded-full flex items-center justify-center z-10 relative shadow-2xl transition-all duration-700">
      <div className="absolute inset-0 rounded-full bg-cyan-400/30 dark:bg-cyan-500/30 blur-xl animate-pulse"></div>
      <div
        className="absolute inset-0 rounded-full bg-purple-400/20 dark:bg-purple-500/20 blur-2xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div className="relative z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              {/* Màu gradient thay đổi theo theme */}
              <stop
                offset="0%"
                stopColor="var(--grad-start, #06B6D4)"
              />
              <stop
                offset="100%"
                stopColor="var(--grad-end, #9333EA)"
              />
            </linearGradient>
          </defs>
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      </div>
    </div>

    {/* Orbit paths */}
    {orbitConfigs.map((config) => (
      <GlowingOrbitPath
        key={`path-${config.radius}`}
        radius={config.radius}
        glowColor={config.glowColor}
        animationDelay={config.delay}
      />
    ))}

    {/* Orbiting skills */}
    {skillsConfig.map((config) => {
      const angle = time * config.speed + (config.phaseShift || 0);
      return (
        <OrbitingSkill
          key={config.id}
          config={config}
          angle={angle}
        />
      );
    })}
  </div>
</main>

  );
}