export const UltraPremiumChipSVG = ({ 
  className = "w-8 h-6", 
  chipColor = "#FFD700",
  animated = true 
}: { 
  className?: string; 
  chipColor?: string;
  animated?: boolean;
}) => (
  <svg className={className} viewBox="0 0 48 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      {/* Ultra-premium gradients */}
      <linearGradient id={`chipBase-${chipColor}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={chipColor} stopOpacity="1" />
        <stop offset="25%" stopColor="#FFFFFF" stopOpacity="0.3" />
        <stop offset="50%" stopColor={chipColor} stopOpacity="0.9" />
        <stop offset="75%" stopColor="#000000" stopOpacity="0.1" />
        <stop offset="100%" stopColor={chipColor} stopOpacity="0.8" />
      </linearGradient>

      <radialGradient id={`chipHighlight-${chipColor}`} cx="30%" cy="20%" r="60%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
        <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.4" />
        <stop offset="80%" stopColor={chipColor} stopOpacity="0.2" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0.1" />
      </radialGradient>

      <linearGradient id={`chipBevel-${chipColor}`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
        <stop offset="50%" stopColor={chipColor} stopOpacity="0.3" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
      </linearGradient>

      {/* Advanced filters for realism */}
      <filter id={`chipShadow-${chipColor}`} x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="1" dy="2" stdDeviation="1" floodColor="#000000" floodOpacity="0.4"/>
        <feDropShadow dx="0" dy="1" stdDeviation="0.5" floodColor="#000000" floodOpacity="0.2"/>
      </filter>

      <filter id={`innerGlow-${chipColor}`} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>

      <filter id={`metallic-${chipColor}`} x="-50%" y="-50%" width="200%" height="200%">
        <feSpecularLighting result="specOut" in="SourceAlpha" specularExponent="20" lightingColor="white">
          <fePointLight x="15" y="8" z="20"/>
        </feSpecularLighting>
        <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut"/>
        <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0"/>
      </filter>
    </defs>

    {/* Main chip body with ultra-realistic appearance */}
    <rect 
      x="2" 
      y="2" 
      width="44" 
      height="26" 
      rx="3" 
      ry="3"
      fill={`url(#chipBase-${chipColor})`}
      stroke="#000000"
      strokeWidth="0.5"
      strokeOpacity="0.3"
      filter={`url(#chipShadow-${chipColor})`}
    />

    {/* Beveled edge effect */}
    <rect 
      x="2.5" 
      y="2.5" 
      width="43" 
      height="25" 
      rx="2.5" 
      ry="2.5"
      fill={`url(#chipBevel-${chipColor})`}
      opacity="0.6"
    />

    {/* Metallic highlight overlay */}
    <rect 
      x="3" 
      y="3" 
      width="42" 
      height="24" 
      rx="2" 
      ry="2"
      fill={`url(#chipHighlight-${chipColor})`}
      filter={`url(#metallic-${chipColor})`}
    />

    {/* Contact grid pattern - realistic EMV layout */}
    <g opacity="0.8">
      {/* Top row contacts */}
      <rect x="8" y="7" width="3" height="2" rx="0.3" fill="#B8860B" opacity="0.9" />
      <rect x="13" y="7" width="3" height="2" rx="0.3" fill="#B8860B" opacity="0.9" />
      <rect x="18" y="7" width="3" height="2" rx="0.3" fill="#B8860B" opacity="0.9" />
      <rect x="23" y="7" width="3" height="2" rx="0.3" fill="#B8860B" opacity="0.9" />
      <rect x="28" y="7" width="3" height="2" rx="0.3" fill="#B8860B" opacity="0.9" />
      <rect x="33" y="7" width="3" height="2" rx="0.3" fill="#B8860B" opacity="0.9" />
      <rect x="38" y="7" width="3" height="2" rx="0.3" fill="#B8860B" opacity="0.9" />

      {/* Middle row contacts */}
      <rect x="8" y="11" width="3" height="2" rx="0.3" fill="#B8860B" opacity="0.9" />
      <rect x="13" y="11" width="3" height="2" rx="0.3" fill="#B8860B" opacity="0.9" />
      <rect x="18" y="11" width="3" height="2" rx="0.3" fill="#B8860B" opacity="0.9" />
      <rect x="23" y="11" width="3" height="2" rx="0.3" fill="#B8860B" opacity="0.9" />
      <rect x="28" y="11" width="3" height="2" rx="0.3" fill="#B8860B" opacity="0.9" />
      <rect x="33" y="11" width="3" height="2" rx="0.3" fill="#B8860B" opacity="0.9" />
      <rect x="38" y="11" width="3" height="2" rx="0.3" fill="#B8860B" opacity="0.9" />

      {/* Bottom row contacts */}
      <rect x="8" y="15" width="3" height="2" rx="0.3" fill="#B8860B" opacity="0.9" />
      <rect x="13" y="15" width="3" height="2" rx="0.3" fill="#B8860B" opacity="0.9" />
      <rect x="18" y="15" width="3" height="2" rx="0.3" fill="#B8860B" opacity="0.9" />
      <rect x="23" y="15" width="3" height="2" rx="0.3" fill="#B8860B" opacity="0.9" />
      <rect x="28" y="15" width="3" height="2" rx="0.3" fill="#B8860B" opacity="0.9" />
      <rect x="33" y="15" width="3" height="2" rx="0.3" fill="#B8860B" opacity="0.9" />
      <rect x="38" y="15" width="3" height="2" rx="0.3" fill="#B8860B" opacity="0.9" />

      {/* Lower row contacts */}
      <rect x="8" y="19" width="3" height="2" rx="0.3" fill="#B8860B" opacity="0.9" />
      <rect x="13" y="19" width="3" height="2" rx="0.3" fill="#B8860B" opacity="0.9" />
      <rect x="18" y="19" width="3" height="2" rx="0.3" fill="#B8860B" opacity="0.9" />
      <rect x="23" y="19" width="3" height="2" rx="0.3" fill="#B8860B" opacity="0.9" />
      <rect x="28" y="19" width="3" height="2" rx="0.3" fill="#B8860B" opacity="0.9" />
      <rect x="33" y="19" width="3" height="2" rx="0.3" fill="#B8860B" opacity="0.9" />
      <rect x="38" y="19" width="3" height="2" rx="0.3" fill="#B8860B" opacity="0.9" />
    </g>

    {/* Ultra-premium light reflection */}
    <rect 
      x="4" 
      y="4" 
      width="18" 
      height="10" 
      rx="1" 
      ry="1"
      fill="url(#chipHighlight-${chipColor})"
      opacity="0.4"
      filter={`url(#innerGlow-${chipColor})`}
      className={animated ? "animate-pulse" : ""}
    />

    {/* Subtle border highlight */}
    <rect 
      x="2" 
      y="2" 
      width="44" 
      height="26" 
      rx="3" 
      ry="3"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="0.5"
      strokeOpacity="0.3"
    />
  </svg>
);