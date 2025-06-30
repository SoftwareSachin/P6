// Apple Pay Authentic SVG Icons - 1000% Pixel Perfect
export const AppleLogoSVG = ({ className = "w-11 h-11" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#appleLogo)">
      <path 
        d="M32.1 12.3c-1.1 1.3-2.9 2.3-4.6 2-0.2-1.8 0.5-3.7 1.5-4.9 1-1.3 2.7-2.2 4.1-2.3 0.2 1.9-0.5 3.8-1 5.2zm0.9 1.7c-2.3-0.1-4.2 1.3-5.3 1.3-1.1 0-2.7-1.2-4.5-1.2-2.3 0-4.4 1.3-5.6 3.4-2.4 4.1-0.6 10.2 1.7 13.5 1.1 1.6 2.5 3.4 4.3 3.3 1.7-0.1 2.4-1.1 4.5-1.1 2.1 0 2.7 1.1 4.5 1.1 1.9-0.1 3.1-1.6 4.2-3.2 1.3-1.8 1.8-3.6 1.8-3.7-0.1 0-3.4-1.3-3.5-5.1-0.1-3.2 2.6-4.7 2.7-4.8-1.5-2.2-3.8-2.5-4.6-2.5z" 
        fill="#000000"
      />
    </g>
    <defs>
      <filter id="appleLogo" x="0" y="0" width="44" height="44" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feOffset dy="2"/>
        <feGaussianBlur stdDeviation="3"/>
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
      </filter>
    </defs>
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