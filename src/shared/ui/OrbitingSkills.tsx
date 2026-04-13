"use client"
import React, { memo } from 'react';

type GlowColor = 'cyan' | 'purple';

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
const SkillIcon = memo(({ type }: { type: IconType }) => {
  const IconComponent = iconComponents[type]?.component;
  return IconComponent ? <IconComponent /> : null;
});
SkillIcon.displayName = 'SkillIcon';

const skillsConfig: SkillConfig[] = [
  { id: 'browser', orbitRadius: 100, size: 40, speed: 1, iconType: 'browser', phaseShift: 0, glowColor: 'cyan', label: 'Trình duyệt' },
  { id: 'layout', orbitRadius: 100, size: 40, speed: 1, iconType: 'layout', phaseShift: (2*Math.PI)/3, glowColor: 'cyan', label: 'Bố cục web' },
  { id: 'seo', orbitRadius: 100, size: 40, speed: 1, iconType: 'seo', phaseShift: (4*Math.PI)/3, glowColor: 'cyan', label: 'SEO' },

  { id: 'analytics', orbitRadius: 180, size: 50, speed: -0.6, iconType: 'analytics', phaseShift: 0, glowColor: 'purple', label: 'Phân tích' },
  { id: 'server', orbitRadius: 180, size: 45, speed: -0.6, iconType: 'server', phaseShift: (2*Math.PI)/3, glowColor: 'purple', label: 'Máy chủ' },
  { id: 'security', orbitRadius: 180, size: 45, speed: -0.6, iconType: 'security', phaseShift: (4*Math.PI)/3, glowColor: 'purple', label: 'Bảo mật' },
];



const OrbitingSkillCSS = memo(({ config }: { config: SkillConfig }) => {
  const { orbitRadius, size, speed, iconType, label, phaseShift } = config;

  const duration = Math.abs(24 / speed); // Arbitrary scale for speed to duration
  const isReverse = speed < 0;
  const startAngle = (phaseShift * 180) / Math.PI;

  return (
    <div
      className="absolute top-1/2 left-1/2 group"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        marginLeft: `-${size/2}px`,
        marginTop: `-${size/2}px`,
        ['--orbit-radius' as any]: `${orbitRadius}px`,
        animation: `${isReverse ? 'orbit-ccw' : 'orbit-cw'} ${duration}s linear infinite`,
        // We use a container to apply phase shift via initial rotation, but since we are using transform-origin centers
        // a better way is negative animation-delay.
        animationDelay: `-${(phaseShift / (2 * Math.PI)) * duration}s`,
      }}
    >
      <div
        className={`
          relative w-full h-full p-2 
          rounded-full flex items-center justify-center
          transition-all duration-300 cursor-pointer
          backdrop-blur-sm
          bg-gray-100/90 dark:bg-gray-800/90
          group-hover:scale-125 shadow-lg group-hover:shadow-2xl
        `}
      >
        <SkillIcon type={iconType} />
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs rounded whitespace-nowrap 
                        pointer-events-none backdrop-blur-md bg-white/90 text-gray-800 shadow-sm
                        dark:bg-gray-900/95 dark:text-white border border-gray-200/40 dark:border-gray-700/60
                        opacity-0 group-hover:opacity-100 transition-opacity">
          {label}
        </div>
      </div>
    </div>
  );
});
OrbitingSkillCSS.displayName = 'OrbitingSkillCSS';

const GlowingOrbitPath = memo(({ radius, glowColor = 'cyan', animationDelay = 0 }: GlowingOrbitPathProps) => {
  const colors = glowColor === 'cyan' 
    ? { primary: 'rgba(6, 182, 212, 0.4)', secondary: 'rgba(6, 182, 212, 0.2)', border: 'rgba(6, 182, 212, 0.3)' }
    : { primary: 'rgba(147, 51, 234, 0.4)', secondary: 'rgba(147, 51, 234, 0.2)', border: 'rgba(147, 51, 234, 0.3)' };

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
      style={{ width: `${radius * 2}px`, height: `${radius * 2}px` }}
    >
      <div className="absolute inset-0 rounded-full animate-pulse"
           style={{
             background: `radial-gradient(circle, transparent 30%, ${colors.secondary} 70%, ${colors.primary} 100%)`,
             boxShadow: `0 0 60px ${colors.primary}, inset 0 0 60px ${colors.secondary}`,
             animationDelay: `${animationDelay}s`,
           }} />
      <div className="absolute inset-0 rounded-full"
           style={{ border: `1px solid ${colors.border}`, boxShadow: `inset 0 0 20px ${colors.secondary}` }} />
    </div>
  );
});
GlowingOrbitPath.displayName = 'GlowingOrbitPath';

export default function OrbitingSkills() {
  return (
    <main className="absolute z-10 right-5 md:right-10 lg:right-18 xl:right-48 top-8 flex items-center justify-center overflow-hidden">
        <div className="relative w-[calc(100vw-40px)] h-[calc(100vw-40px)] md:w-[450px] md:h-[450px] flex items-center justify-center">
          <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-900 rounded-full flex items-center justify-center z-10 relative shadow-2xl transition-all duration-700">
            <div className="absolute inset-0 rounded-full bg-cyan-400/30 dark:bg-cyan-500/30 blur-xl animate-pulse"></div>
            <div className="absolute inset-0 rounded-full bg-purple-400/20 dark:bg-purple-500/20 blur-2xl animate-pulse" style={{ animationDelay: "1s" }}></div>
            <div className="relative z-10">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--grad-start, #06B6D4)" />
                    <stop offset="100%" stopColor="var(--grad-end, #9333EA)" />
                  </linearGradient>
                </defs>
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
            </div>
          </div>

          <GlowingOrbitPath radius={100} glowColor="cyan"/>
          <GlowingOrbitPath radius={180} glowColor="purple" />

          {skillsConfig.map((config) => (
            <OrbitingSkillCSS key={config.id} config={config} />
          ))}
        </div>
    </main>
  );
}