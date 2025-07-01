// Premium Merchant SVG Icons - Apple Pay Inspired

export const CoffeeSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="coffeeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B4513" />
        <stop offset="100%" stopColor="#D2691E" />
      </linearGradient>
    </defs>
    <path d="M7 14c-1.66 0-3-1.34-3-3V5c0-1.1.9-2 2-2h9c.55 0 1 .45 1 1v1h1c1.66 0 3 1.34 3 3s-1.34 3-3 3h-1v1c0 1.66-1.34 3-3 3H7z" fill="url(#coffeeGradient)" />
    <path d="M6 19h12v2H6z" fill="url(#coffeeGradient)" />
    <circle cx="9" cy="7" r="0.5" fill="rgba(255,255,255,0.8)" />
    <circle cx="11" cy="8" r="0.5" fill="rgba(255,255,255,0.8)" />
  </svg>
);

export const BurgerSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="burgerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#D2691E" />
        <stop offset="100%" stopColor="#A0522D" />
      </linearGradient>
    </defs>
    <ellipse cx="12" cy="6" rx="8" ry="2" fill="#F4A460" />
    <rect x="4" y="8" width="16" height="2" rx="1" fill="#228B22" />
    <rect x="4" y="11" width="16" height="3" rx="1.5" fill="url(#burgerGradient)" />
    <rect x="4" y="15" width="16" height="2" rx="1" fill="#FFD700" />
    <ellipse cx="12" cy="18" rx="8" ry="2" fill="#DEB887" />
  </svg>
);

export const SmartphoneSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="phoneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1e3a8a" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
    </defs>
    <rect x="6" y="2" width="12" height="20" rx="3" fill="url(#phoneGradient)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
    <rect x="7" y="4" width="10" height="14" rx="1" fill="#000" />
    <circle cx="12" cy="20" r="1" fill="rgba(255,255,255,0.8)" />
  </svg>
);

export const ShoppingCartSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="cartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#059669" />
        <stop offset="100%" stopColor="#10b981" />
      </linearGradient>
    </defs>
    <path d="M7 4V2C7 1.45 7.45 1 8 1h8c.55 0 1 .45 1 1v2h4c.55 0 1 .45 1 1s-.45 1-1 1h-1l-1 10c-.1 1-.9 2-2 2H7c-1.1 0-1.9-1-2-2L4 6H3c-.55 0-1-.45-1-1s.45-1 1-1h4z" fill="url(#cartGradient)" />
    <circle cx="9" cy="20" r="1" fill="url(#cartGradient)" />
    <circle cx="15" cy="20" r="1" fill="url(#cartGradient)" />
  </svg>
);

export const ClothingSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="clothingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7c3aed" />
        <stop offset="100%" stopColor="#a855f7" />
      </linearGradient>
    </defs>
    <path d="M16 4h3l3 6v10c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V10l3-6h3c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2z" fill="url(#clothingGradient)" />
    <path d="M8 6c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" />
  </svg>
);

export const CinemaSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="cinemaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#dc2626" />
        <stop offset="100%" stopColor="#ef4444" />
      </linearGradient>
    </defs>
    <rect x="2" y="6" width="20" height="12" rx="2" fill="url(#cinemaGradient)" />
    <rect x="4" y="8" width="16" height="8" rx="1" fill="#000" />
    <polygon points="10,10 10,16 16,13" fill="rgba(255,255,255,0.9)" />
    <circle cx="6" cy="4" r="1" fill="url(#cinemaGradient)" />
    <circle cx="12" cy="4" r="1" fill="url(#cinemaGradient)" />
    <circle cx="18" cy="4" r="1" fill="url(#cinemaGradient)" />
  </svg>
);

export const StoreSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="storeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1f2937" />
        <stop offset="100%" stopColor="#374151" />
      </linearGradient>
    </defs>
    <path d="M2 7l2-5h16l2 5v2c0 1.1-.9 2-2 2h-1v8c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2v-8H4c-1.1 0-2-.9-2-2V7z" fill="url(#storeGradient)" />
    <rect x="7" y="11" width="10" height="6" rx="1" fill="rgba(255,255,255,0.1)" />
    <rect x="9" y="13" width="2" height="4" fill="rgba(255,255,255,0.2)" />
    <rect x="13" y="13" width="2" height="4" fill="rgba(255,255,255,0.2)" />
  </svg>
);

export const CategoryAllSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="allGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>
    <rect x="3" y="3" width="7" height="7" rx="1.5" fill="url(#allGradient)" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" fill="url(#allGradient)" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" fill="url(#allGradient)" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" fill="url(#allGradient)" />
  </svg>
);

export const OpenStatusSVG = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#10b981" />
    <path d="M8 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ClosedStatusSVG = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#ef4444" />
    <path d="M15 9l-6 6M9 9l6 6" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const OfflinePaymentSVG = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="offlineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="10" fill="url(#offlineGradient)" />
    <path d="M8 12h8M12 8v8" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="1" fill="none" />
  </svg>
);

export const PremiumStarSVG = ({ className = "w-4 h-4", filled = true }: { className?: string, filled?: boolean }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#f59e0b" />
      </linearGradient>
    </defs>
    <path 
      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" 
      fill={filled ? "url(#starGradient)" : "none"}
      stroke="url(#starGradient)"
      strokeWidth={filled ? "0" : "1.5"}
    />
  </svg>
);