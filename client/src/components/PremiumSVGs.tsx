// Premium SVG Components for OPPB - Material Design 3.0 Expressive
export const OPPBLogoSVG = ({ className = "w-20 h-20", animated = false }: { className?: string, animated?: boolean }) => (
  <svg className={className} viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="premiumLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#A855F7" />
        <stop offset="25%" stopColor="#8B5CF6" />
        <stop offset="50%" stopColor="#7C3AED" />
        <stop offset="75%" stopColor="#6366F1" />
        <stop offset="100%" stopColor="#4F46E5" />
      </linearGradient>
      <linearGradient id="metallicGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F8FAFC" />
        <stop offset="25%" stopColor="#E2E8F0" />
        <stop offset="50%" stopColor="#CBD5E1" />
        <stop offset="75%" stopColor="#94A3B8" />
        <stop offset="100%" stopColor="#64748B" />
      </linearGradient>
      <filter id="premiumGlow">
        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <filter id="glassEffect">
        <feGaussianBlur in="SourceGraphic" stdDeviation="1"/>
        <feOffset dx="0" dy="2" result="offset"/>
        <feFlood floodColor="#ffffff" floodOpacity="0.3"/>
        <feComposite in2="offset" operator="in"/>
      </filter>
    </defs>
    
    {/* Premium Background with Glassmorphism */}
    <circle cx="60" cy="60" r="52" fill="url(#premiumLogoGradient)" filter="url(#premiumGlow)" 
            className={animated ? "animate-pulse-premium" : ""} />
    <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
    <circle cx="60" cy="60" r="48" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
    
    {/* Premium OPPB Typography */}
    <g transform="translate(15, 35)" filter="url(#glassEffect)">
      {/* O - Refined Circle */}
      <circle cx="15" cy="15" r="12" fill="none" stroke="url(#metallicGradient)" strokeWidth="3" />
      <circle cx="15" cy="15" r="7" fill="rgba(255,255,255,0.95)" />
      <circle cx="15" cy="15" r="3" fill="url(#premiumLogoGradient)" />
      
      {/* P - Modern Geometric */}
      <rect x="35" y="5" width="3" height="20" fill="url(#metallicGradient)" rx="1.5" />
      <rect x="35" y="5" width="12" height="3" fill="url(#metallicGradient)" rx="1.5" />
      <rect x="35" y="13" width="10" height="3" fill="url(#metallicGradient)" rx="1.5" />
      <rect x="44" y="5" width="3" height="8" fill="url(#metallicGradient)" rx="1.5" />
      
      {/* P - Second P */}
      <rect x="55" y="5" width="3" height="20" fill="url(#metallicGradient)" rx="1.5" />
      <rect x="55" y="5" width="12" height="3" fill="url(#metallicGradient)" rx="1.5" />
      <rect x="55" y="13" width="10" height="3" fill="url(#metallicGradient)" rx="1.5" />
      <rect x="64" y="5" width="3" height="8" fill="url(#metallicGradient)" rx="1.5" />
      
      {/* B - Premium Curves */}
      <rect x="75" y="5" width="3" height="20" fill="url(#metallicGradient)" rx="1.5" />
      <path d="M78 5 Q88 5 88 10 Q88 15 83 15 Q88 15 88 20 Q88 25 78 25" 
            fill="none" stroke="url(#metallicGradient)" strokeWidth="3" strokeLinecap="round" />
    </g>
    
    {/* Premium Connection Elements */}
    <g opacity="0.8" transform="translate(60, 60)">
      <path d="M-15 -15 L15 15" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round" />
      <path d="M15 -15 L-15 15" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="0" cy="0" r="4" fill="rgba(255,255,255,0.95)" />
      <circle cx="0" cy="0" r="2" fill="url(#premiumLogoGradient)" />
    </g>
    
    {/* Animated Shine Effect */}
    {animated && (
      <g>
        <rect x="0" y="0" width="120" height="120" fill="url(#shineGradient)" opacity="0.3">
          <animateTransform attributeName="transform" type="translate" 
            values="-120 0;120 0;-120 0" dur="3s" repeatCount="indefinite" />
        </rect>
        <defs>
          <linearGradient id="shineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.3)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </g>
    )}
  </svg>
);

// Premium QR Scanner Icon
export const PremiumQRScannerSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="qrGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#A855F7" />
        <stop offset="100%" stopColor="#6366F1" />
      </linearGradient>
    </defs>
    <rect x="3" y="3" width="8" height="8" rx="1" fill="url(#qrGradient)" />
    <rect x="13" y="3" width="8" height="8" rx="1" fill="url(#qrGradient)" />
    <rect x="3" y="13" width="8" height="8" rx="1" fill="url(#qrGradient)" />
    <rect x="5" y="5" width="4" height="4" fill="white" />
    <rect x="15" y="5" width="4" height="4" fill="white" />
    <rect x="5" y="15" width="4" height="4" fill="white" />
    <rect x="13" y="13" width="2" height="2" fill="url(#qrGradient)" />
    <rect x="16" y="13" width="2" height="2" fill="url(#qrGradient)" />
    <rect x="19" y="13" width="2" height="2" fill="url(#qrGradient)" />
    <rect x="13" y="16" width="5" height="2" fill="url(#qrGradient)" />
    <rect x="19" y="16" width="2" height="5" fill="url(#qrGradient)" />
  </svg>
);

// Premium Send Money Icon
export const PremiumSendMoneySVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sendGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#06B6D4" />
      </linearGradient>
    </defs>
    <path d="M2 12L22 2L20 22L13 15L8 20L2 12Z" fill="url(#sendGradient)" />
    <path d="M22 2L13 15" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="12" r="2" fill="white" />
  </svg>
);

// Premium Split Bill Icon
export const PremiumSplitBillSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="splitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
    </defs>
    <circle cx="8" cy="8" r="4" fill="url(#splitGradient)" />
    <circle cx="16" cy="8" r="4" fill="url(#splitGradient)" />
    <circle cx="12" cy="16" r="4" fill="url(#splitGradient)" />
    <circle cx="8" cy="8" r="2" fill="white" />
    <circle cx="16" cy="8" r="2" fill="white" />
    <circle cx="12" cy="16" r="2" fill="white" />
    <path d="M10 10L14 14" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <path d="M14 10L10 14" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Premium Request Money Icon
export const PremiumRequestMoneySVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="requestGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#EF4444" />
      </linearGradient>
    </defs>
    <rect x="4" y="8" width="16" height="10" rx="2" fill="url(#requestGradient)" />
    <circle cx="12" cy="6" r="4" fill="url(#requestGradient)" />
    <circle cx="12" cy="6" r="2" fill="white" />
    <path d="M12 10V14" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <path d="M10 12L12 14L14 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Premium Recharge Icon
export const PremiumRechargeSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="rechargeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FBBF24" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
    </defs>
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="url(#rechargeGradient)" />
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="white" strokeWidth="1" strokeLinejoin="round" />
  </svg>
);

// Premium Offline Pay Icon
export const PremiumOfflinePaySVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="offlineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366F1" />
        <stop offset="100%" stopColor="#8B5CF6" />
      </linearGradient>
    </defs>
    <rect x="4" y="7" width="16" height="10" rx="2" fill="url(#offlineGradient)" />
    <rect x="6" y="9" width="12" height="2" fill="white" opacity="0.3" />
    <rect x="6" y="13" width="4" height="2" fill="white" />
    <circle cx="18" cy="6" r="4" fill="#FF6B6B" />
    <path d="M16 6L20 6" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="12" r="6" fill="none" stroke="white" strokeWidth="1" opacity="0.5" strokeDasharray="2 2">
      <animateTransform attributeName="transform" type="rotate" values="0 12 12;360 12 12" dur="3s" repeatCount="indefinite" />
    </circle>
  </svg>
);

// Premium Insurance Icon
export const PremiumInsuranceSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="insuranceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#14B8A6" />
        <stop offset="100%" stopColor="#10B981" />
      </linearGradient>
    </defs>
    <path d="M12 2L4 6V12C4 16.5 7 20.26 12 21C17 20.26 20 16.5 20 12V6L12 2Z" fill="url(#insuranceGradient)" />
    <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Premium Rewards Icon
export const PremiumRewardsSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="rewardsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#EC4899" />
        <stop offset="100%" stopColor="#F43F5E" />
      </linearGradient>
    </defs>
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="url(#rewardsGradient)" />
    <circle cx="12" cy="12" r="3" fill="white" />
    <circle cx="12" cy="12" r="1" fill="url(#rewardsGradient)" />
  </svg>
);

// Premium Bell Notification Icon
export const PremiumBellSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bellGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6B7280" />
        <stop offset="100%" stopColor="#4B5563" />
      </linearGradient>
    </defs>
    <path d="M18 8A6 6 0 0 0 6 8C6 15 3 17 3 17H21S18 15 18 8Z" fill="url(#bellGradient)" />
    <path d="M13.73 21A2 2 0 0 1 10.27 21" stroke="url(#bellGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Premium Menu Icon
export const PremiumMenuSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="menuGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6B7280" />
        <stop offset="100%" stopColor="#4B5563" />
      </linearGradient>
    </defs>
    <rect x="4" y="6" width="16" height="2" rx="1" fill="url(#menuGradient)" />
    <rect x="4" y="11" width="16" height="2" rx="1" fill="url(#menuGradient)" />
    <rect x="4" y="16" width="16" height="2" rx="1" fill="url(#menuGradient)" />
  </svg>
);

// Premium Transaction Icons
export const PremiumShoppingCartSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="shoppingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
    </defs>
    <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V16.5M9 19.5C9.8 19.5 10.5 20.2 10.5 21S9.8 22.5 9 22.5 7.5 21.8 7.5 21 8.2 19.5 9 19.5ZM20 19.5C20.8 19.5 21.5 20.2 21.5 21S20.8 22.5 20 22.5 18.5 21.8 18.5 21 19.2 19.5 20 19.5Z" fill="url(#shoppingGradient)" />
  </svg>
);

export const PremiumUserSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="userGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366F1" />
        <stop offset="100%" stopColor="#8B5CF6" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="8" r="5" fill="url(#userGradient)" />
    <path d="M20 21C20 16.03 16.42 12 12 12S4 16.03 4 21" stroke="url(#userGradient)" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const PremiumPhoneSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <img 
    src="/src/assets/phone-animated.gif" 
    alt="Phone"
    className={className}
    style={{ objectFit: 'contain' }}
  />
);

export const PremiumRupeeSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="rupeeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FBBF24" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="10" fill="url(#rupeeGradient)" />
    <path d="M8 8h6M8 10h4c1.1 0 2 .9 2 2s-.9 2-2 2h-2l4 4M8 6h8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const PremiumCreditCardSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366F1" />
        <stop offset="100%" stopColor="#8B5CF6" />
      </linearGradient>
    </defs>
    <rect x="2" y="6" width="20" height="12" rx="3" fill="url(#cardGradient)" />
    <rect x="2" y="10" width="20" height="2" fill="white" opacity="0.3" />
    <rect x="4" y="14" width="6" height="2" fill="white" />
    <rect x="16" y="14" width="4" height="2" fill="white" />
  </svg>
);

export const PremiumSettingsSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="settingsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6B7280" />
        <stop offset="100%" stopColor="#4B5563" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="3" fill="url(#settingsGradient)" />
    <path d="M19.4 15C19.2 15.3 19.1 15.7 19.1 16.1L21.5 18L19.5 21L16.7 19.9C16.3 20.2 15.9 20.4 15.5 20.6L15 23H11L10.5 20.6C10.1 20.4 9.7 20.2 9.3 19.9L6.5 21L4.5 18L6.9 16.1C6.9 15.7 6.8 15.3 6.6 15L4 12L6.6 9C6.8 8.7 6.9 8.3 6.9 7.9L4.5 6L6.5 3L9.3 4.1C9.7 3.8 10.1 3.6 10.5 3.4L11 1H15L15.5 3.4C15.9 3.6 16.3 3.8 16.7 4.1L19.5 3L21.5 6L19.1 7.9C19.1 8.3 19.2 8.7 19.4 9L22 12L19.4 15Z" fill="url(#settingsGradient)" />
  </svg>
);

export const PremiumHelpSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="helpGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6B7280" />
        <stop offset="100%" stopColor="#4B5563" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="10" fill="url(#helpGradient)" />
    <path d="M9.09 9C9.33 8.47 9.77 8.05 10.31 7.79C10.85 7.53 11.46 7.45 12.05 7.57C12.64 7.69 13.17 8 13.56 8.44C13.95 8.88 14.17 9.42 14.19 10C14.19 12 11.99 13 11.99 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="17" r="1" fill="white" />
  </svg>
);

export const PremiumLogoutSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logoutGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#EF4444" />
        <stop offset="100%" stopColor="#DC2626" />
      </linearGradient>
    </defs>
    <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="url(#logoutGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 17L21 12L16 7" stroke="url(#logoutGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 12H9" stroke="url(#logoutGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const SecureShieldSVG = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
    </defs>
    
    <path d="M40 10 L60 20 L60 45 Q60 60 40 70 Q20 60 20 45 L20 20 Z" 
          fill="url(#shieldGradient)" className="animate-pulse-glow" />
    
    <path d="M30 38 L36 44 L52 28" stroke="white" strokeWidth="3" fill="none" 
          strokeLinecap="round" strokeLinejoin="round" className="animate-scale-in" />
  </svg>
);

export const OfflineNetworkSVG = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    {/* Phone Devices as GIFs */}
    <foreignObject x="15" y="25" width="18" height="30">
      <img 
        src="/src/assets/phone-animated.gif" 
        alt="Phone 1"
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    </foreignObject>
    <foreignObject x="47" y="25" width="18" height="30">
      <img 
        src="/src/assets/phone-animated.gif" 
        alt="Phone 2"
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    </foreignObject>
    
    {/* Bluetooth Connection Lines */}
    <g className="animate-pulse">
      <path d="M33 35 Q40 30 47 35" stroke="#3B82F6" strokeWidth="2" fill="none" opacity="0.8" />
      <path d="M33 40 Q40 35 47 40" stroke="#3B82F6" strokeWidth="2" fill="none" opacity="0.6" />
      <path d="M33 45 Q40 40 47 45" stroke="#3B82F6" strokeWidth="2" fill="none" opacity="0.8" />
    </g>
    
    {/* Signal Dots */}
    <circle cx="24" cy="30" r="2" fill="#3B82F6" className="animate-ping" />
    <circle cx="56" cy="30" r="2" fill="#3B82F6" className="animate-ping" style={{ animationDelay: '0.5s' }} />
  </svg>
);

export const InstantPaymentSVG = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="speedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#6366F1" />
      </linearGradient>
    </defs>
    
    {/* Lightning Bolt */}
    <path d="M35 15 L25 35 L35 35 L30 55 L50 30 L40 30 L45 15 Z" 
          fill="url(#speedGradient)" className="animate-pulse-glow" />
    
    {/* Speed Lines */}
    <g className="animate-shimmer">
      <line x1="55" y1="25" x2="65" y2="25" stroke="url(#speedGradient)" strokeWidth="2" opacity="0.6" />
      <line x1="55" y1="35" x2="70" y2="35" stroke="url(#speedGradient)" strokeWidth="2" opacity="0.8" />
      <line x1="55" y1="45" x2="65" y2="45" stroke="url(#speedGradient)" strokeWidth="2" opacity="0.6" />
    </g>
  </svg>
);

export const GlobalNetworkSVG = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="globalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#EC4899" />
      </linearGradient>
    </defs>
    
    {/* Globe */}
    <circle cx="40" cy="40" r="25" fill="none" stroke="url(#globalGradient)" strokeWidth="3" />
    
    {/* Longitude Lines */}
    <ellipse cx="40" cy="40" rx="25" ry="15" fill="none" stroke="url(#globalGradient)" strokeWidth="2" opacity="0.6" />
    <ellipse cx="40" cy="40" rx="15" ry="25" fill="none" stroke="url(#globalGradient)" strokeWidth="2" opacity="0.6" />
    
    {/* Network Nodes */}
    <circle cx="25" cy="30" r="3" fill="url(#globalGradient)" className="animate-pulse" />
    <circle cx="55" cy="35" r="3" fill="url(#globalGradient)" className="animate-pulse" style={{ animationDelay: '0.3s' }} />
    <circle cx="30" cy="55" r="3" fill="url(#globalGradient)" className="animate-pulse" style={{ animationDelay: '0.6s' }} />
    <circle cx="50" cy="50" r="3" fill="url(#globalGradient)" className="animate-pulse" style={{ animationDelay: '0.9s' }} />
    
    {/* Connection Lines */}
    <g className="animate-pulse" style={{ animationDelay: '1s' }}>
      <line x1="25" y1="30" x2="55" y2="35" stroke="url(#globalGradient)" strokeWidth="1" opacity="0.5" />
      <line x1="55" y1="35" x2="50" y2="50" stroke="url(#globalGradient)" strokeWidth="1" opacity="0.5" />
      <line x1="30" y1="55" x2="50" y2="50" stroke="url(#globalGradient)" strokeWidth="1" opacity="0.5" />
    </g>
  </svg>
);

export const BiometricSecuritySVG = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="biometricGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366F1" />
        <stop offset="100%" stopColor="#8B5CF6" />
      </linearGradient>
    </defs>
    
    {/* Fingerprint Pattern */}
    <g fill="none" stroke="url(#biometricGradient)" strokeWidth="2" className="animate-pulse-glow">
      <ellipse cx="40" cy="40" rx="8" ry="12" />
      <ellipse cx="40" cy="40" rx="13" ry="18" />
      <ellipse cx="40" cy="40" rx="18" ry="24" />
      <ellipse cx="40" cy="40" rx="23" ry="30" />
    </g>
    
    {/* Scan Line */}
    <line x1="15" y1="40" x2="65" y2="40" stroke="white" strokeWidth="2" opacity="0.8" 
          className="animate-scan-premium" />
  </svg>
);

export const MoneyTransferSVG = ({ className = "w-20 h-20" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="transferGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
    </defs>
    
    {/* Money Symbol */}
    <circle cx="50" cy="50" r="20" fill="url(#transferGradient)" className="animate-pulse-glow" />
    <text x="50" y="58" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">₹</text>
    
    {/* Transfer Arrows */}
    <g className="animate-float">
      <path d="M20 30 L35 30 L30 25 M35 30 L30 35" stroke="url(#transferGradient)" 
            strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M80 70 L65 70 L70 75 M65 70 L70 65" stroke="url(#transferGradient)" 
            strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
    
    {/* Dots indicating movement */}
    <circle cx="25" cy="35" r="2" fill="url(#transferGradient)" className="animate-ping" />
    <circle cx="75" cy="65" r="2" fill="url(#transferGradient)" className="animate-ping" style={{ animationDelay: '0.5s' }} />
  </svg>
);

export const PremiumCardSVG = ({ className = "w-24 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366F1" />
        <stop offset="50%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
      <filter id="cardShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="rgba(99, 102, 241, 0.3)"/>
      </filter>
    </defs>
    
    {/* Card Body */}
    <rect x="10" y="10" width="100" height="60" rx="8" fill="url(#cardGradient)" 
          filter="url(#cardShadow)" className="animate-float" />
    
    {/* Chip */}
    <rect x="20" y="25" width="12" height="10" rx="2" fill="rgba(255, 255, 255, 0.9)" />
    <rect x="22" y="27" width="8" height="6" rx="1" fill="rgba(99, 102, 241, 0.3)" />
    
    {/* Card Number */}
    <g fill="rgba(255, 255, 255, 0.8)">
      <rect x="20" y="45" width="8" height="3" rx="1" />
      <rect x="30" y="45" width="8" height="3" rx="1" />
      <rect x="40" y="45" width="8" height="3" rx="1" />
      <rect x="50" y="45" width="8" height="3" rx="1" />
    </g>
    
    {/* OPPB Logo */}
    <text x="85" y="30" fill="white" fontSize="8" fontWeight="bold">OPPB</text>
    
    {/* Wireless Symbol */}
    <g transform="translate(85, 40)" className="animate-pulse">
      <path d="M0 8 Q4 0 8 8" stroke="white" strokeWidth="1" fill="none" opacity="0.7" />
      <path d="M2 8 Q4 4 6 8" stroke="white" strokeWidth="1" fill="none" opacity="0.9" />
      <circle cx="4" cy="8" r="0.8" fill="white" />
    </g>
  </svg>
);

// Material Design 3 Permission SVGs with Premium Animations
export const CameraPermissionSVG = ({ className = "w-16 h-16", animated = true }: { className?: string, animated?: boolean }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="cameraGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#1e40af" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <rect x="8" y="20" width="48" height="32" rx="6" fill="url(#cameraGradient)" filter="url(#glow)"/>
    <rect x="12" y="16" width="12" height="8" rx="4" fill="url(#cameraGradient)" opacity="0.8"/>
    <circle cx="32" cy="36" r="8" fill="white" opacity="0.9">
      {animated && <animate attributeName="r" values="8;10;8" dur="2s" repeatCount="indefinite"/>}
    </circle>
    <circle cx="32" cy="36" r="5" fill="url(#cameraGradient)">
      {animated && <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite"/>}
    </circle>
    <rect x="44" y="24" width="4" height="4" rx="2" fill="white" opacity="0.8">
      {animated && <animate attributeName="opacity" values="0.8;0.4;0.8" dur="1.5s" repeatCount="indefinite"/>}
    </rect>
  </svg>
);

export const LocationPermissionSVG = ({ className = "w-16 h-16", animated = true }: { className?: string, animated?: boolean }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="locationGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#047857" />
      </linearGradient>
      <filter id="glow2">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <path d="M32 8C24 8 18 14 18 22C18 34 32 52 32 52S46 34 46 22C46 14 40 8 32 8Z" fill="url(#locationGradient)" filter="url(#glow2)">
      {animated && <animateTransform attributeName="transform" type="scale" values="1;1.1;1" dur="2s" repeatCount="indefinite"/>}
    </path>
    <circle cx="32" cy="22" r="6" fill="white" opacity="0.9">
      {animated && <animate attributeName="r" values="6;8;6" dur="1.5s" repeatCount="indefinite"/>}
    </circle>
    <circle cx="32" cy="22" r="3" fill="url(#locationGradient)"/>
    {animated && (
      <>
        <circle cx="32" cy="22" r="12" fill="none" stroke="url(#locationGradient)" strokeWidth="1" opacity="0.3">
          <animate attributeName="r" values="12;20;12" dur="3s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite"/>
        </circle>
        <circle cx="32" cy="22" r="16" fill="none" stroke="url(#locationGradient)" strokeWidth="1" opacity="0.2">
          <animate attributeName="r" values="16;24;16" dur="3s" repeatCount="indefinite" begin="0.5s"/>
          <animate attributeName="opacity" values="0.2;0;0.2" dur="3s" repeatCount="indefinite" begin="0.5s"/>
        </circle>
      </>
    )}
  </svg>
);

export const SMSPermissionSVG = ({ className = "w-16 h-16", animated = true }: { className?: string, animated?: boolean }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="smsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#dc2626" />
      </linearGradient>
      <filter id="glow3">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <rect x="8" y="16" width="48" height="32" rx="6" fill="url(#smsGradient)" filter="url(#glow3)">
      {animated && <animate attributeName="opacity" values="0.9;1;0.9" dur="2s" repeatCount="indefinite"/>}
    </rect>
    <rect x="14" y="22" width="20" height="2" rx="1" fill="white" opacity="0.8">
      {animated && <animate attributeName="width" values="20;36;20" dur="2.5s" repeatCount="indefinite"/>}
    </rect>
    <rect x="14" y="28" width="28" height="2" rx="1" fill="white" opacity="0.6">
      {animated && <animate attributeName="width" values="28;16;28" dur="2.5s" repeatCount="indefinite" begin="0.5s"/>}
    </rect>
    <rect x="14" y="34" width="16" height="2" rx="1" fill="white" opacity="0.4">
      {animated && <animate attributeName="width" values="16;24;16" dur="2.5s" repeatCount="indefinite" begin="1s"/>}
    </rect>
    <circle cx="48" cy="40" r="4" fill="#ef4444">
      {animated && <animate attributeName="r" values="4;6;4" dur="1s" repeatCount="indefinite"/>}
    </circle>
    <text x="48" y="43" textAnchor="middle" className="text-xs font-bold fill-white">3</text>
  </svg>
);

export const PremiumStarSVG = ({ className = "w-5 h-5", filled = false }: { className?: string, filled?: boolean }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="50%" stopColor="#FFA500" />
        <stop offset="100%" stopColor="#FF8C00" />
      </linearGradient>
      <filter id="starShadow">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#FFD700" floodOpacity="0.3"/>
      </filter>
    </defs>
    <path
      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
      fill={filled ? "url(#starGradient)" : "none"}
      stroke="url(#starGradient)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      filter="url(#starShadow)"
    />
  </svg>
);

export const PremiumFavoritesSVG = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="favoritesGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="50%" stopColor="#FFA500" />
        <stop offset="100%" stopColor="#FF8C00" />
      </linearGradient>
      <filter id="favoritesShadow">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#FFD700" floodOpacity="0.4"/>
      </filter>
    </defs>
    <path
      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
      fill="url(#favoritesGradient)"
      filter="url(#favoritesShadow)"
    />
    <circle cx="12" cy="12" r="9" fill="none" stroke="url(#favoritesGradient)" strokeWidth="0.5" opacity="0.3"/>
  </svg>
);

export const ContactsPermissionSVG = ({ className = "w-16 h-16", animated = true }: { className?: string, animated?: boolean }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="contactsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#ec4899" />
      </linearGradient>
      <filter id="glow4">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <circle cx="24" cy="20" r="8" fill="url(#contactsGradient)" filter="url(#glow4)">
      {animated && <animateTransform attributeName="transform" type="scale" values="1;1.1;1" dur="2s" repeatCount="indefinite"/>}
    </circle>
    <circle cx="40" cy="20" r="6" fill="url(#contactsGradient)" opacity="0.8" filter="url(#glow4)">
      {animated && <animateTransform attributeName="transform" type="scale" values="1;1.1;1" dur="2s" repeatCount="indefinite" begin="0.5s"/>}
    </circle>
    <circle cx="32" cy="32" r="4" fill="url(#contactsGradient)" opacity="0.6" filter="url(#glow4)">
      {animated && <animateTransform attributeName="transform" type="scale" values="1;1.1;1" dur="2s" repeatCount="indefinite" begin="1s"/>}
    </circle>
    <path d="M16 40C16 36 20 32 24 32C28 32 32 36 32 40V48H16V40Z" fill="url(#contactsGradient)" opacity="0.7">
      {animated && <animate attributeName="opacity" values="0.7;0.9;0.7" dur="2s" repeatCount="indefinite"/>}
    </path>
    <path d="M32 44C32 40 36 36 40 36C44 36 48 40 48 44V52H32V44Z" fill="url(#contactsGradient)" opacity="0.5">
      {animated && <animate attributeName="opacity" values="0.5;0.7;0.5" dur="2s" repeatCount="indefinite" begin="0.7s"/>}
    </path>
    {animated && (
      <>
        <circle cx="24" cy="20" r="12" fill="none" stroke="url(#contactsGradient)" strokeWidth="1" opacity="0.3">
          <animate attributeName="r" values="12;16;12" dur="3s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite"/>
        </circle>
      </>
    )}
  </svg>
);