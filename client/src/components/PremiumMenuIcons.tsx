export const PremiumProfileIconSVG = ({ className = "w-6 h-6", animated = true }: { className?: string, animated?: boolean }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="profileGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="50%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#1D4ED8" />
      </linearGradient>
      <filter id="profileGlow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    <circle cx="16" cy="12" r="5" fill="url(#profileGradient)" filter="url(#profileGlow)" className={animated ? "animate-pulse" : ""} />
    <path d="M8 26c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="url(#profileGradient)" strokeWidth="2" fill="none" strokeLinecap="round" className={animated ? "animate-pulse" : ""} />
  </svg>
);

export const PremiumCardsIconSVG = ({ className = "w-6 h-6", animated = true }: { className?: string, animated?: boolean }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="cardsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="50%" stopColor="#D97706" />
        <stop offset="100%" stopColor="#B45309" />
      </linearGradient>
      <filter id="cardsGlow">
        <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
        <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    <rect x="4" y="8" width="20" height="12" rx="3" fill="url(#cardsGradient)" filter="url(#cardsGlow)" className={animated ? "animate-pulse" : ""} />
    <rect x="6" y="6" width="20" height="12" rx="3" fill="none" stroke="url(#cardsGradient)" strokeWidth="1.5" opacity="0.6" />
    <rect x="8" y="4" width="20" height="12" rx="3" fill="none" stroke="url(#cardsGradient)" strokeWidth="1" opacity="0.3" />
    <rect x="8" y="12" width="4" height="2" rx="0.5" fill="#FFF" opacity="0.8" />
  </svg>
);

export const PremiumSecurityIconSVG = ({ className = "w-6 h-6", animated = true }: { className?: string, animated?: boolean }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="securityGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="50%" stopColor="#059669" />
        <stop offset="100%" stopColor="#047857" />
      </linearGradient>
      <filter id="securityGlow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    <path d="M16 4l6 3v6c0 6-6 10-6 10s-6-4-6-10V7l6-3z" fill="url(#securityGradient)" filter="url(#securityGlow)" className={animated ? "animate-pulse" : ""} />
    <path d="M12 15l2 2 4-4" stroke="#FFF" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const PremiumRewardsIconSVG = ({ className = "w-6 h-6", animated = true }: { className?: string, animated?: boolean }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="rewardsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="25%" stopColor="#FBBF24" />
        <stop offset="50%" stopColor="#FCD34D" />
        <stop offset="75%" stopColor="#FBBF24" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
      <filter id="rewardsGlow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    <polygon points="16,4 20,12 28,12 22,18 24,26 16,22 8,26 10,18 4,12 12,12" fill="url(#rewardsGradient)" filter="url(#rewardsGlow)" className={animated ? "animate-pulse" : ""} />
    <circle cx="16" cy="16" r="4" fill="#FFF" opacity="0.3" />
  </svg>
);

export const PremiumHelpIconSVG = ({ className = "w-6 h-6", animated = true }: { className?: string, animated?: boolean }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="helpGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="50%" stopColor="#7C3AED" />
        <stop offset="100%" stopColor="#6D28D9" />
      </linearGradient>
      <filter id="helpGlow">
        <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
        <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    <circle cx="16" cy="16" r="12" fill="url(#helpGradient)" filter="url(#helpGlow)" className={animated ? "animate-pulse" : ""} />
    <path d="M12 12c0-2.2 1.8-4 4-4s4 1.8 4 4c0 1.5-1 2.5-2 3l-1 1v2" stroke="#FFF" strokeWidth="2" fill="none" strokeLinecap="round" />
    <circle cx="16" cy="24" r="1" fill="#FFF" />
  </svg>
);

export const PremiumLogoutIconSVG = ({ className = "w-6 h-6", animated = true }: { className?: string, animated?: boolean }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logoutGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#EF4444" />
        <stop offset="50%" stopColor="#DC2626" />
        <stop offset="100%" stopColor="#B91C1C" />
      </linearGradient>
      <filter id="logoutGlow">
        <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
        <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    <path d="M14 8V6a2 2 0 012-2h8a2 2 0 012 2v20a2 2 0 01-2 2h-8a2 2 0 01-2-2v-2" stroke="url(#logoutGradient)" strokeWidth="2" fill="none" className={animated ? "animate-pulse" : ""} />
    <path d="M7 16h14m-7-4l4 4-4 4" stroke="url(#logoutGradient)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" filter="url(#logoutGlow)" />
  </svg>
);

export const PremiumSettingsIconSVG = ({ className = "w-6 h-6", animated = true }: { className?: string, animated?: boolean }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="settingsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6B7280" />
        <stop offset="50%" stopColor="#4B5563" />
        <stop offset="100%" stopColor="#374151" />
      </linearGradient>
      <filter id="settingsGlow">
        <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
        <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    <path d="M16 20a4 4 0 100-8 4 4 0 000 8z" fill="url(#settingsGradient)" filter="url(#settingsGlow)" className={animated ? "animate-spin" : ""} />
    <path d="M16 2v4m0 20v4m14-14h-4M6 16H2m11.3-9.3l2.8 2.8m5.6 5.6l2.8 2.8M9.3 22.7l2.8-2.8m5.6-5.6l2.8-2.8" stroke="url(#settingsGradient)" strokeWidth="2" strokeLinecap="round" className={animated ? "animate-pulse" : ""} />
  </svg>
);