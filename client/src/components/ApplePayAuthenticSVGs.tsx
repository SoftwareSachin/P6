// Ultra-Premium OPPB Brand Logo - Strongest High-End Design
export const OPPBPremiumLogoSVG = ({ className = "w-11 h-11", animated = false }: { className?: string, animated?: boolean }) => (
  <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      {/* Ultra-Premium Crystal Clear Gradient System */}
      <radialGradient id="oppbCorePrimary" cx="50%" cy="25%" r="75%">
        <stop offset="0%" stopColor="#000000" />
        <stop offset="8%" stopColor="#0f0728" />
        <stop offset="18%" stopColor="#1e1b4b" />
        <stop offset="30%" stopColor="#312e81" />
        <stop offset="45%" stopColor="#3730a3" />
        <stop offset="60%" stopColor="#4338ca" />
        <stop offset="75%" stopColor="#6366f1" />
        <stop offset="88%" stopColor="#8b5cf6" />
        <stop offset="96%" stopColor="#a855f7" />
        <stop offset="100%" stopColor="#c084fc" />
      </radialGradient>
      
      <linearGradient id="oppbMetallic" x1="10%" y1="10%" x2="90%" y2="90%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="12%" stopColor="#f8fafc" />
        <stop offset="25%" stopColor="#f1f5f9" />
        <stop offset="40%" stopColor="#e2e8f0" />
        <stop offset="55%" stopColor="#cbd5e1" />
        <stop offset="70%" stopColor="#94a3b8" />
        <stop offset="85%" stopColor="#64748b" />
        <stop offset="100%" stopColor="#334155" />
      </linearGradient>

      <radialGradient id="oppbAccentGlow" cx="50%" cy="50%" r="85%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
        <stop offset="15%" stopColor="#e0f2fe" stopOpacity="0.95" />
        <stop offset="30%" stopColor="#06b6d4" stopOpacity="0.9" />
        <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.85" />
        <stop offset="70%" stopColor="#8b5cf6" stopOpacity="0.8" />
        <stop offset="90%" stopColor="#d946ef" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.6" />
      </radialGradient>

      <linearGradient id="oppbDiamondCore" x1="20%" y1="20%" x2="80%" y2="80%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
        <stop offset="15%" stopColor="#f0f9ff" stopOpacity="0.98" />
        <stop offset="30%" stopColor="#e0e7ff" stopOpacity="0.95" />
        <stop offset="50%" stopColor="#c7d2fe" stopOpacity="0.9" />
        <stop offset="70%" stopColor="#a5b4fc" stopOpacity="0.85" />
        <stop offset="85%" stopColor="#818cf8" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#6366f1" stopOpacity="0.75" />
      </linearGradient>

      <radialGradient id="oppbPureCrystal" cx="40%" cy="30%" r="60%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
        <stop offset="20%" stopColor="#fefefe" stopOpacity="0.9" />
        <stop offset="40%" stopColor="#f8fafc" stopOpacity="0.8" />
        <stop offset="60%" stopColor="#e2e8f0" stopOpacity="0.7" />
        <stop offset="80%" stopColor="#cbd5e1" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.5" />
      </radialGradient>

      {/* Crystal Clear Premium Filters */}
      <filter id="oppbUltraGlow" x="-150%" y="-150%" width="400%" height="400%">
        <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
        <feOffset in="coloredBlur" dx="0" dy="0" result="offsetBlur"/>
        <feFlood floodColor="#8b5cf6" floodOpacity="0.8"/>
        <feComposite in2="offsetBlur" operator="in" result="finalGlow"/>
        <feGaussianBlur in="finalGlow" stdDeviation="4" result="softGlow"/>
        <feMerge> 
          <feMergeNode in="softGlow"/>
          <feMergeNode in="finalGlow"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>

      <filter id="oppbDepthShadow" x="-100%" y="-100%" width="300%" height="300%">
        <feDropShadow dx="0" dy="12" stdDeviation="8" floodColor="#000000" floodOpacity="0.5"/>
        <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#1e1b4b" floodOpacity="0.7"/>
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.9"/>
        <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#000000" floodOpacity="1"/>
      </filter>

      <filter id="oppbMetallicShine" x="-100%" y="-100%" width="300%" height="300%">
        <feSpecularLighting result="specOut" in="SourceGraphic" specularConstant="4" specularExponent="30" lightingColor="#ffffff">
          <fePointLight x="25" y="15" z="200"/>
        </feSpecularLighting>
        <feSpecularLighting result="specOut2" in="SourceGraphic" specularConstant="2" specularExponent="15" lightingColor="#e0e7ff">
          <fePointLight x="75" y="35" z="100"/>
        </feSpecularLighting>
        <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specFinal"/>
        <feComposite in="specOut2" in2="SourceAlpha" operator="in" result="specFinal2"/>
        <feComposite in="SourceGraphic" in2="specFinal" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="shineLayer1"/>
        <feComposite in="shineLayer1" in2="specFinal2" operator="arithmetic" k1="0" k2="1" k3="0.8" k4="0"/>
      </filter>

      <filter id="oppbInnerGlow" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="4" result="innerGlow"/>
        <feOffset in="innerGlow" dx="0" dy="0"/>
        <feComposite in2="SourceGraphic" operator="in" result="innerGlowComposite"/>
        <feColorMatrix in="innerGlowComposite" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0"/>
        <feGaussianBlur in="innerGlowComposite" stdDeviation="2" result="softInnerGlow"/>
        <feMerge>
          <feMergeNode in="softInnerGlow"/>
          <feMergeNode in="innerGlowComposite"/>
        </feMerge>
      </filter>

      <filter id="oppbCrystalClear" x="-50%" y="-50%" width="200%" height="200%">
        <feColorMatrix type="saturate" values="1.4"/>
        <feComponentTransfer>
          <feFuncA type="discrete" tableValues="0.1 0.3 0.5 0.7 0.9 1"/>
        </feComponentTransfer>
        <feGaussianBlur stdDeviation="0.5" result="crisp"/>
        <feComposite in="SourceGraphic" in2="crisp" operator="over"/>
      </filter>

      <filter id="oppbPremiumEdge" x="-50%" y="-50%" width="200%" height="200%">
        <feMorphology operator="dilate" radius="0.5"/>
        <feGaussianBlur stdDeviation="0.5" result="outline"/>
        <feFlood floodColor="#ffffff" floodOpacity="0.3"/>
        <feComposite in2="outline" operator="in"/>
        <feComposite in2="SourceGraphic" operator="over"/>
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

    {/* Premium Base Foundation */}
    <circle 
      cx="60" 
      cy="60" 
      r="32" 
      fill="url(#oppbCorePrimary)" 
      filter="url(#oppbDepthShadow)"
      className={animated ? "animate-pulse-slow" : ""}
    />

    {/* Crystal Clear Diamond Structure */}
    <g transform="translate(60, 60)" filter="url(#oppbCrystalClear)">
      {/* Ultra-Premium Outer Diamond */}
      <path 
        d="M-22 0 L0 -22 L22 0 L0 22 Z" 
        fill="url(#oppbDiamondCore)"
        opacity="0.95"
        filter="url(#oppbMetallicShine)"
        className={animated ? "animate-spin-slow" : ""}
        stroke="url(#oppbPureCrystal)"
        strokeWidth="0.5"
      />
      
      {/* High-Definition Middle Layer */}
      <path 
        d="M-16 0 L0 -16 L16 0 L0 16 Z" 
        fill="url(#oppbMetallic)"
        opacity="0.9"
        filter="url(#oppbInnerGlow)"
        stroke="url(#oppbAccentGlow)"
        strokeWidth="0.3"
      />
      
      {/* Crystal Core Diamond */}
      <path 
        d="M-10 0 L0 -10 L10 0 L0 10 Z" 
        fill="url(#oppbPureCrystal)"
        opacity="0.95"
        filter="url(#oppbPremiumEdge)"
        className={animated ? "animate-pulse" : ""}
      />

      {/* Ultra-Clear Inner Core */}
      <path 
        d="M-6 0 L0 -6 L6 0 L0 6 Z" 
        fill="url(#oppbAccentGlow)"
        opacity="1"
        filter="url(#oppbMetallicShine)"
      />

      {/* High-Definition Orbital System */}
      <circle 
        cx="0" 
        cy="0" 
        r="20" 
        fill="none" 
        stroke="url(#oppbMetallic)" 
        strokeWidth="1.2" 
        opacity="0.6"
        className={animated ? "animate-spin-reverse" : ""}
        strokeDasharray="6 3 2 3"
        strokeLinecap="round"
        filter="url(#oppbPremiumEdge)"
      />
      
      <circle 
        cx="0" 
        cy="0" 
        r="14" 
        fill="none" 
        stroke="url(#oppbAccentGlow)" 
        strokeWidth="1.8" 
        opacity="0.8"
        strokeDasharray="5 2"
        strokeLinecap="round"
        className={animated ? "animate-spin-slow" : ""}
        filter="url(#oppbInnerGlow)"
      />

      <circle 
        cx="0" 
        cy="0" 
        r="8" 
        fill="none" 
        stroke="url(#oppbPureCrystal)" 
        strokeWidth="1" 
        opacity="0.7"
        strokeDasharray="2 1"
      />

      {/* Ultra-Premium Corner Accents */}
      <g opacity="1" filter="url(#oppbUltraGlow)">
        <circle cx="-17" cy="-17" r="3" fill="url(#oppbAccentGlow)" stroke="url(#oppbPureCrystal)" strokeWidth="0.5"/>
        <circle cx="17" cy="-17" r="3" fill="url(#oppbAccentGlow)" stroke="url(#oppbPureCrystal)" strokeWidth="0.5"/>
        <circle cx="17" cy="17" r="3" fill="url(#oppbAccentGlow)" stroke="url(#oppbPureCrystal)" strokeWidth="0.5"/>
        <circle cx="-17" cy="17" r="3" fill="url(#oppbAccentGlow)" stroke="url(#oppbPureCrystal)" strokeWidth="0.5"/>
      </g>

      {/* Ultra-Bright Central Focal Point */}
      <circle
        cx="0"
        cy="0"
        r="5"
        fill="url(#oppbPureCrystal)"
        opacity="1"
        filter="url(#oppbUltraGlow)"
        className={animated ? "animate-pulse" : ""}
        stroke="#ffffff"
        strokeWidth="0.5"
      />

      {/* Diamond Brilliance Core */}
      <circle
        cx="0"
        cy="0"
        r="2"
        fill="#ffffff"
        opacity="1"
        filter="url(#oppbMetallicShine)"
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