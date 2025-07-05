// Premium Apple Pay-inspired DTH and Bills SVG Components

export const ApplePayDTHSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="dthGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#007AFF" />
        <stop offset="50%" stopColor="#5856D6" />
        <stop offset="100%" stopColor="#AF52DE" />
      </linearGradient>
      <filter id="dthGlow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Satellite Dish */}
    <circle cx="32" cy="32" r="28" fill="url(#dthGradient)" opacity="0.1" />
    <circle cx="32" cy="32" r="24" stroke="url(#dthGradient)" strokeWidth="2" fill="none" />
    
    {/* Main Dish */}
    <ellipse cx="32" cy="30" rx="18" ry="12" fill="url(#dthGradient)" opacity="0.8" />
    <ellipse cx="32" cy="30" rx="14" ry="9" fill="white" opacity="0.9" />
    <ellipse cx="32" cy="30" rx="10" ry="6" fill="url(#dthGradient)" opacity="0.6" />
    
    {/* Signal Waves */}
    <path d="M20 18 Q32 8 44 18" stroke="url(#dthGradient)" strokeWidth="2" fill="none" opacity="0.7" />
    <path d="M22 22 Q32 14 42 22" stroke="url(#dthGradient)" strokeWidth="2" fill="none" opacity="0.5" />
    <path d="M24 26 Q32 20 40 26" stroke="url(#dthGradient)" strokeWidth="2" fill="none" opacity="0.3" />
    
    {/* Support Stand */}
    <rect x="30" y="42" width="4" height="12" fill="url(#dthGradient)" opacity="0.8" />
    <rect x="26" y="52" width="12" height="4" fill="url(#dthGradient)" opacity="0.6" />
    
    {/* Center Focus Point */}
    <circle cx="32" cy="30" r="3" fill="white" filter="url(#dthGlow)" />
  </svg>
);

export const ApplePayBillsSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="billsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#30D158" />
        <stop offset="50%" stopColor="#00C896" />
        <stop offset="100%" stopColor="#007AFF" />
      </linearGradient>
      <filter id="billsGlow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Background Circle */}
    <circle cx="32" cy="32" r="28" fill="url(#billsGradient)" opacity="0.1" />
    
    {/* Main Bill Document */}
    <rect x="16" y="12" width="32" height="40" rx="4" fill="white" opacity="0.95" />
    <rect x="16" y="12" width="32" height="40" rx="4" stroke="url(#billsGradient)" strokeWidth="2" fill="none" />
    
    {/* Header Section */}
    <rect x="16" y="12" width="32" height="8" rx="4" fill="url(#billsGradient)" opacity="0.8" />
    
    {/* Bill Lines */}
    <rect x="20" y="24" width="20" height="2" fill="url(#billsGradient)" opacity="0.4" />
    <rect x="20" y="28" width="16" height="2" fill="url(#billsGradient)" opacity="0.3" />
    <rect x="20" y="32" width="18" height="2" fill="url(#billsGradient)" opacity="0.3" />
    <rect x="20" y="36" width="14" height="2" fill="url(#billsGradient)" opacity="0.3" />
    
    {/* Amount Section */}
    <rect x="18" y="42" width="28" height="6" rx="2" fill="url(#billsGradient)" opacity="0.2" />
    <rect x="20" y="44" width="12" height="2" fill="url(#billsGradient)" opacity="0.6" />
    
    {/* Lightning Bolt (Quick Payment) */}
    <path d="M38 24 L34 32 L36 32 L34 40 L38 32 L36 32 L38 24" fill="url(#billsGradient)" filter="url(#billsGlow)" />
    
    {/* Checkmark (Paid Status) */}
    <circle cx="52" cy="20" r="6" fill="url(#billsGradient)" opacity="0.9" />
    <path d="M49 20 L51 22 L55 18" stroke="white" strokeWidth="2" fill="none" />
  </svg>
);

export const ApplePayRechargesSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="rechargeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF9F0A" />
        <stop offset="50%" stopColor="#FF6B35" />
        <stop offset="100%" stopColor="#FF3B30" />
      </linearGradient>
      <filter id="rechargeGlow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Background Circle */}
    <circle cx="32" cy="32" r="28" fill="url(#rechargeGradient)" opacity="0.1" />
    
    {/* Phone */}
    <rect x="22" y="14" width="20" height="36" rx="6" fill="white" opacity="0.95" />
    <rect x="22" y="14" width="20" height="36" rx="6" stroke="url(#rechargeGradient)" strokeWidth="2" fill="none" />
    
    {/* Screen */}
    <rect x="24" y="18" width="16" height="24" rx="2" fill="url(#rechargeGradient)" opacity="0.8" />
    
    {/* Home Button */}
    <circle cx="32" cy="46" r="2" fill="url(#rechargeGradient)" opacity="0.6" />
    
    {/* Battery Icon on Screen */}
    <rect x="28" y="26" width="8" height="4" rx="1" fill="white" opacity="0.9" />
    <rect x="36" y="27" width="1" height="2" fill="white" opacity="0.9" />
    
    {/* Signal Bars */}
    <rect x="28" y="32" width="2" height="4" fill="white" opacity="0.5" />
    <rect x="31" y="30" width="2" height="6" fill="white" opacity="0.7" />
    <rect x="34" y="28" width="2" height="8" fill="white" opacity="0.9" />
    
    {/* Recharge Symbol (Circular Arrow) */}
    <path d="M44 20 Q50 14 56 20 Q56 26 50 32 Q44 26 44 20" stroke="url(#rechargeGradient)" strokeWidth="3" fill="none" filter="url(#rechargeGlow)" />
    <path d="M48 16 L44 20 L48 24" stroke="url(#rechargeGradient)" strokeWidth="2" fill="none" />
    
    {/* Money Symbol */}
    <circle cx="12" cy="44" r="8" fill="url(#rechargeGradient)" opacity="0.9" />
    <text x="12" y="48" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">₹</text>
  </svg>
);

export const ApplePayUtilitiesSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="utilitiesGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#34C759" />
        <stop offset="33%" stopColor="#007AFF" />
        <stop offset="66%" stopColor="#FF9F0A" />
        <stop offset="100%" stopColor="#FF3B30" />
      </linearGradient>
      <filter id="utilitiesGlow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Background Circle */}
    <circle cx="32" cy="32" r="28" fill="url(#utilitiesGradient)" opacity="0.1" />
    
    {/* Electricity Symbol */}
    <path d="M20 16 L12 28 L16 28 L14 40 L22 28 L18 28 L20 16" fill="url(#utilitiesGradient)" opacity="0.8" filter="url(#utilitiesGlow)" />
    
    {/* Water Drop */}
    <path d="M32 12 Q38 18 38 26 Q38 34 32 40 Q26 34 26 26 Q26 18 32 12" fill="url(#utilitiesGradient)" opacity="0.8" />
    <circle cx="32" cy="24" r="2" fill="white" opacity="0.7" />
    
    {/* Gas Flame */}
    <path d="M44 40 Q48 32 52 40 Q50 44 48 44 Q46 44 44 40" fill="url(#utilitiesGradient)" opacity="0.8" />
    <path d="M46 38 Q48 34 50 38 Q49 40 48 40 Q47 40 46 38" fill="white" opacity="0.6" />
    
    {/* WiFi Symbol */}
    <path d="M8 52 Q16 44 24 52" stroke="url(#utilitiesGradient)" strokeWidth="2" fill="none" opacity="0.6" />
    <path d="M10 50 Q16 46 22 50" stroke="url(#utilitiesGradient)" strokeWidth="2" fill="none" opacity="0.8" />
    <circle cx="16" cy="52" r="2" fill="url(#utilitiesGradient)" />
    
    {/* House Outline */}
    <path d="M32 48 L40 56 L56 56 L56 40 L48 32 L32 48 L16 32 L8 40 L8 56 L24 56 Z" stroke="url(#utilitiesGradient)" strokeWidth="2" fill="none" opacity="0.3" />
  </svg>
);