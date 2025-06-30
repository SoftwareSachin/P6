// Premium OPPB Brand Logo - Ultra High-End Design
export const OPPBPremiumLogoSVG = ({ className = "w-11 h-11", animated = false }: { className?: string, animated?: boolean }) => (
  <svg className={className} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      {/* Premium Gradients */}
      <linearGradient id="oppbGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#667eea" />
        <stop offset="50%" stopColor="#764ba2" />
        <stop offset="100%" stopColor="#5b73e8" />
      </linearGradient>
      
      <linearGradient id="oppbAccent" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00d4ff" />
        <stop offset="100%" stopColor="#007aff" />
      </linearGradient>
      
      {/* Premium Filters */}
      <filter id="oppbShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.1)"/>
      </filter>
      
      <filter id="oppbGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="2"/>
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0.48 0 0 0 0 0.91 0 0 0 0.3 0"/>
        <feBlend mode="screen"/>
      </filter>
      
      {animated && (
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          from="0 22 22"
          to="360 22 22"
          dur="20s"
          repeatCount="indefinite"
        />
      )}
    </defs>
    
    {/* Main Logo Circle */}
    <circle 
      cx="22" 
      cy="22" 
      r="20" 
      fill="url(#oppbGradient)" 
      filter="url(#oppbShadow)"
      className={animated ? "animate-pulse-subtle" : ""}
    />
    
    {/* Inner Geometric Pattern */}
    <g transform="translate(22, 22)">
      {/* Center Diamond */}
      <path 
        d="M-6 0 L0 -6 L6 0 L0 6 Z" 
        fill="white" 
        opacity="0.9"
        className={animated ? "animate-spin-slow" : ""}
      />
      
      {/* Orbital Rings */}
      <circle 
        cx="0" 
        cy="0" 
        r="12" 
        fill="none" 
        stroke="white" 
        strokeWidth="1" 
        opacity="0.3"
        className={animated ? "animate-spin-reverse" : ""}
      />
      
      <circle 
        cx="0" 
        cy="0" 
        r="8" 
        fill="none" 
        stroke="url(#oppbAccent)" 
        strokeWidth="1.5" 
        opacity="0.6"
        strokeDasharray="2 2"
        className={animated ? "animate-spin-slow" : ""}
      />
      
      {/* Corner Dots */}
      <circle cx="-10" cy="-10" r="2" fill="white" opacity="0.8"/>
      <circle cx="10" cy="-10" r="2" fill="white" opacity="0.8"/>
      <circle cx="10" cy="10" r="2" fill="white" opacity="0.8"/>
      <circle cx="-10" cy="10" r="2" fill="white" opacity="0.8"/>
    </g>
    
    {/* Premium Outer Ring */}
    <circle 
      cx="22" 
      cy="22" 
      r="20" 
      fill="none" 
      stroke="url(#oppbAccent)" 
      strokeWidth="0.5" 
      opacity="0.4"
      filter="url(#oppbGlow)"
    />
  </svg>
);

export const FaceIDIconSVG = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="48" height="48" rx="8" stroke="#007AFF" strokeWidth="2" fill="none"/>
    <circle cx="20" cy="24" r="2" fill="#007AFF"/>
    <circle cx="44" cy="24" r="2" fill="#007AFF"/>
    <path d="M24 36c0 4.4 3.6 8 8 8s8-3.6 8-8" stroke="#007AFF" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <path d="M16 16h-4m4 32h-4M48 16h4m-4 32h4M16 52v4m32-4v4M16 8v4m32-4v4" stroke="#007AFF" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const ShieldSecuritySVG = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M32 8L16 16v16c0 10 6.3 19.4 16 22 9.7-2.6 16-12 16-22V16L32 8z" 
      fill="#007AFF" 
      fillOpacity="0.1"
      stroke="#007AFF" 
      strokeWidth="2"
    />
    <path d="M24 30l6 6 12-12" stroke="#007AFF" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const CheckmarkSuccessSVG = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="28" fill="#34C759" fillOpacity="0.1" stroke="#34C759" strokeWidth="2"/>
    <path d="M20 32l8 8 16-16" stroke="#34C759" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const PrivacyLockSVG = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="16" y="28" width="32" height="24" rx="4" fill="#007AFF" fillOpacity="0.1" stroke="#007AFF" strokeWidth="2"/>
    <path d="M24 28v-8c0-4.4 3.6-8 8-8s8 3.6 8 8v8" stroke="#007AFF" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <circle cx="32" cy="40" r="3" fill="#007AFF"/>
  </svg>
);