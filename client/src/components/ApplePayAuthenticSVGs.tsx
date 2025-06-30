// Ultra-Premium OPPB Brand Logo - Strongest High-End Design
export const OPPBPremiumLogoSVG = ({ className = "w-11 h-11", animated = false }: { className?: string, animated?: boolean }) => (
  <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      {/* Ultra-Premium Gradient System */}
      <radialGradient id="oppbCorePrimary" cx="50%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#1e1b4b" />
        <stop offset="15%" stopColor="#312e81" />
        <stop offset="35%" stopColor="#3730a3" />
        <stop offset="55%" stopColor="#4338ca" />
        <stop offset="75%" stopColor="#6366f1" />
        <stop offset="90%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#a855f7" />
      </radialGradient>
      
      <linearGradient id="oppbMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="20%" stopColor="#f8fafc" />
        <stop offset="40%" stopColor="#e2e8f0" />
        <stop offset="60%" stopColor="#cbd5e1" />
        <stop offset="80%" stopColor="#94a3b8" />
        <stop offset="100%" stopColor="#64748b" />
      </linearGradient>

      <radialGradient id="oppbAccentGlow" cx="50%" cy="50%" r="80%">
        <stop offset="0%" stopColor="#06b6d4" stopOpacity="1" />
        <stop offset="30%" stopColor="#3b82f6" stopOpacity="0.9" />
        <stop offset="60%" stopColor="#8b5cf6" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#d946ef" stopOpacity="0.5" />
      </radialGradient>

      <linearGradient id="oppbDiamondCore" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
        <stop offset="25%" stopColor="#e0e7ff" stopOpacity="0.9" />
        <stop offset="50%" stopColor="#c7d2fe" stopOpacity="0.8" />
        <stop offset="75%" stopColor="#a5b4fc" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#818cf8" stopOpacity="0.6" />
      </linearGradient>

      {/* Advanced Premium Filters */}
      <filter id="oppbUltraGlow" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
        <feOffset in="coloredBlur" dx="0" dy="0" result="offsetBlur"/>
        <feFlood floodColor="#8b5cf6" floodOpacity="0.6"/>
        <feComposite in2="offsetBlur" operator="in" result="finalGlow"/>
        <feMerge> 
          <feMergeNode in="finalGlow"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>

      <filter id="oppbDepthShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000000" floodOpacity="0.4"/>
        <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#1e1b4b" floodOpacity="0.6"/>
        <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#000000" floodOpacity="0.8"/>
      </filter>

      <filter id="oppbMetallicShine" x="-50%" y="-50%" width="200%" height="200%">
        <feSpecularLighting result="specOut" in="SourceGraphic" specularConstant="3" specularExponent="25" lightingColor="#ffffff">
          <fePointLight x="30" y="20" z="150"/>
        </feSpecularLighting>
        <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut2"/>
        <feComposite in="SourceGraphic" in2="specOut2" operator="arithmetic" k1="0" k2="1" k3="1" k4="0"/>
      </filter>

      <filter id="oppbInnerGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="innerGlow"/>
        <feOffset in="innerGlow" dx="0" dy="0"/>
        <feComposite in2="SourceGraphic" operator="in" result="innerGlowComposite"/>
        <feColorMatrix in="innerGlowComposite" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"/>
      </filter>
    </defs>

    {/* Outer Halo Effect */}
    <circle
      cx="60"
      cy="60"
      r="55"
      fill="none"
      stroke="url(#oppbAccentGlow)"
      strokeWidth="2"
      opacity="0.4"
      className={animated ? "animate-pulse-slow" : ""}
      filter="url(#oppbUltraGlow)"
    />

    {/* Premium Orbital Ring System */}
    <circle
      cx="60"
      cy="60"
      r="50"
      fill="none"
      stroke="url(#oppbCorePrimary)"
      strokeWidth="3"
      opacity="0.8"
      className={animated ? "animate-spin-slow" : ""}
      strokeDasharray="15 8 5 8"
      strokeLinecap="round"
    />

    <circle
      cx="60"
      cy="60"
      r="42"
      fill="none"
      stroke="url(#oppbAccentGlow)"
      strokeWidth="2"
      opacity="0.7"
      className={animated ? "animate-spin-reverse" : ""}
      strokeDasharray="10 5 3 5"
      strokeLinecap="round"
    />

    <circle
      cx="60"
      cy="60"
      r="34"
      fill="none"
      stroke="url(#oppbMetallic)"
      strokeWidth="1.5"
      opacity="0.5"
      strokeDasharray="6 3"
    />

    {/* Main Logo Core */}
    <circle 
      cx="60" 
      cy="60" 
      r="28" 
      fill="url(#oppbCorePrimary)" 
      filter="url(#oppbDepthShadow)"
      className={animated ? "animate-pulse-slow" : ""}
    />

    {/* Primary Diamond Structure */}
    <g transform="translate(60, 60)">
      {/* Outer Diamond Layer */}
      <path 
        d="M-20 0 L0 -20 L20 0 L0 20 Z" 
        fill="url(#oppbDiamondCore)"
        opacity="0.9"
        filter="url(#oppbMetallicShine)"
        className={animated ? "animate-spin-slow" : ""}
      />
      
      {/* Middle Diamond Layer */}
      <path 
        d="M-14 0 L0 -14 L14 0 L0 14 Z" 
        fill="url(#oppbMetallic)"
        opacity="0.8"
        filter="url(#oppbInnerGlow)"
      />
      
      {/* Inner Diamond Core */}
      <path 
        d="M-8 0 L0 -8 L8 0 L0 8 Z" 
        fill="url(#oppbAccentGlow)"
        opacity="0.9"
        className={animated ? "animate-pulse" : ""}
      />

      {/* Precision Orbital Elements */}
      <circle 
        cx="0" 
        cy="0" 
        r="18" 
        fill="none" 
        stroke="url(#oppbMetallic)" 
        strokeWidth="1" 
        opacity="0.4"
        className={animated ? "animate-spin-reverse" : ""}
        strokeDasharray="4 4"
      />
      
      <circle 
        cx="0" 
        cy="0" 
        r="12" 
        fill="none" 
        stroke="url(#oppbAccentGlow)" 
        strokeWidth="1.5" 
        opacity="0.6"
        strokeDasharray="3 3"
        className={animated ? "animate-spin-slow" : ""}
      />

      {/* Premium Corner Accents */}
      <g opacity="0.9">
        <circle cx="-15" cy="-15" r="2.5" fill="url(#oppbAccentGlow)" filter="url(#oppbInnerGlow)"/>
        <circle cx="15" cy="-15" r="2.5" fill="url(#oppbAccentGlow)" filter="url(#oppbInnerGlow)"/>
        <circle cx="15" cy="15" r="2.5" fill="url(#oppbAccentGlow)" filter="url(#oppbInnerGlow)"/>
        <circle cx="-15" cy="15" r="2.5" fill="url(#oppbAccentGlow)" filter="url(#oppbInnerGlow)"/>
      </g>

      {/* Central Focal Point */}
      <circle
        cx="0"
        cy="0"
        r="4"
        fill="#ffffff"
        opacity="0.95"
        filter="url(#oppbUltraGlow)"
        className={animated ? "animate-pulse" : ""}
      />
    </g>

    {/* Ultimate Outer Ring */}
    <circle 
      cx="60" 
      cy="60" 
      r="28" 
      fill="none" 
      stroke="url(#oppbAccentGlow)" 
      strokeWidth="1" 
      opacity="0.5"
      filter="url(#oppbUltraGlow)"
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