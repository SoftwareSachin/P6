// Ultra-Premium Transit SVG Components - Apple Pay Inspired

export const MetroIconSVG = ({ className = "w-12 h-12", animated = false }: { className?: string, animated?: boolean }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="metroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#007AFF" />
        <stop offset="50%" stopColor="#5856D6" />
        <stop offset="100%" stopColor="#30D158" />
      </linearGradient>
      <filter id="metroGlow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Metro Car Body */}
    <rect x="6" y="14" width="36" height="20" rx="4" fill="url(#metroGradient)" filter="url(#metroGlow)" />
    <rect x="8" y="16" width="32" height="16" rx="2" fill="rgba(255,255,255,0.2)" />
    
    {/* Windows */}
    <rect x="10" y="18" width="6" height="6" rx="1" fill="rgba(255,255,255,0.9)" />
    <rect x="18" y="18" width="6" height="6" rx="1" fill="rgba(255,255,255,0.9)" />
    <rect x="26" y="18" width="6" height="6" rx="1" fill="rgba(255,255,255,0.9)" />
    <rect x="34" y="18" width="4" height="6" rx="1" fill="rgba(255,255,255,0.9)" />
    
    {/* Doors */}
    <line x1="17" y1="26" x2="17" y2="32" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round" />
    <line x1="31" y1="26" x2="31" y2="32" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round" />
    
    {/* Rails */}
    <rect x="4" y="36" width="40" height="2" rx="1" fill="#8E8E93" />
    <rect x="4" y="40" width="40" height="2" rx="1" fill="#8E8E93" />
    
    {/* Wheels */}
    <circle cx="12" cy="38" r="3" fill="#48484A" />
    <circle cx="24" cy="38" r="3" fill="#48484A" />
    <circle cx="36" cy="38" r="3" fill="#48484A" />
    
    {/* Motion Lines */}
    {animated && (
      <g className="animate-pulse">
        <line x1="2" y1="20" x2="8" y2="20" stroke="#007AFF" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        <line x1="2" y1="24" x2="6" y2="24" stroke="#007AFF" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        <line x1="2" y1="28" x2="8" y2="28" stroke="#007AFF" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      </g>
    )}
  </svg>
);

export const BusIconSVG = ({ className = "w-12 h-12", animated = false }: { className?: string, animated?: boolean }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="busGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#30D158" />
        <stop offset="50%" stopColor="#00C896" />
        <stop offset="100%" stopColor="#007AFF" />
      </linearGradient>
      <filter id="busGlow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Bus Body */}
    <rect x="8" y="12" width="32" height="24" rx="6" fill="url(#busGradient)" filter="url(#busGlow)" />
    <rect x="10" y="14" width="28" height="20" rx="4" fill="rgba(255,255,255,0.2)" />
    
    {/* Windshield */}
    <rect x="12" y="16" width="24" height="8" rx="2" fill="rgba(255,255,255,0.9)" />
    
    {/* Side Windows */}
    <rect x="12" y="26" width="5" height="6" rx="1" fill="rgba(255,255,255,0.9)" />
    <rect x="19" y="26" width="5" height="6" rx="1" fill="rgba(255,255,255,0.9)" />
    <rect x="26" y="26" width="5" height="6" rx="1" fill="rgba(255,255,255,0.9)" />
    <rect x="33" y="26" width="3" height="6" rx="1" fill="rgba(255,255,255,0.9)" />
    
    {/* Door */}
    <rect x="17.5" y="28" width="1" height="8" fill="rgba(255,255,255,0.8)" />
    <rect x="30.5" y="28" width="1" height="8" fill="rgba(255,255,255,0.8)" />
    
    {/* Wheels */}
    <circle cx="16" cy="38" r="4" fill="#48484A" />
    <circle cx="32" cy="38" r="4" fill="#48484A" />
    <circle cx="16" cy="38" r="2" fill="#8E8E93" />
    <circle cx="32" cy="38" r="2" fill="#8E8E93" />
    
    {/* Headlight */}
    <circle cx="6" cy="24" r="2" fill="#FFD60A" />
    
    {/* Exhaust */}
    {animated && (
      <g className="animate-pulse">
        <circle cx="42" cy="18" r="1" fill="#8E8E93" opacity="0.6">
          <animate attributeName="r" values="1;2;1" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite" />
        </circle>
      </g>
    )}
  </svg>
);

export const QRScanIconSVG = ({ className = "w-12 h-12", animated = false }: { className?: string, animated?: boolean }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="qrGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#007AFF" />
        <stop offset="100%" stopColor="#5856D6" />
      </linearGradient>
      <filter id="qrGlow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* QR Code Frame */}
    <rect x="12" y="12" width="24" height="24" rx="3" fill="white" stroke="url(#qrGradient)" strokeWidth="2" filter="url(#qrGlow)" />
    
    {/* QR Code Pattern */}
    <rect x="15" y="15" width="3" height="3" fill="url(#qrGradient)" />
    <rect x="20" y="15" width="2" height="3" fill="url(#qrGradient)" />
    <rect x="25" y="15" width="3" height="3" fill="url(#qrGradient)" />
    <rect x="30" y="15" width="3" height="3" fill="url(#qrGradient)" />
    
    <rect x="15" y="20" width="2" height="2" fill="url(#qrGradient)" />
    <rect x="20" y="20" width="3" height="2" fill="url(#qrGradient)" />
    <rect x="25" y="20" width="2" height="2" fill="url(#qrGradient)" />
    <rect x="30" y="20" width="3" height="2" fill="url(#qrGradient)" />
    
    <rect x="15" y="25" width="3" height="3" fill="url(#qrGradient)" />
    <rect x="20" y="25" width="2" height="3" fill="url(#qrGradient)" />
    <rect x="25" y="25" width="3" height="2" fill="url(#qrGradient)" />
    <rect x="30" y="25" width="3" height="3" fill="url(#qrGradient)" />
    
    <rect x="15" y="30" width="3" height="3" fill="url(#qrGradient)" />
    <rect x="20" y="30" width="3" height="3" fill="url(#qrGradient)" />
    <rect x="25" y="30" width="2" height="3" fill="url(#qrGradient)" />
    <rect x="30" y="30" width="3" height="3" fill="url(#qrGradient)" />
    
    {/* Scanning Corners */}
    <path d="M8 8 L8 12 L12 12" stroke="url(#qrGradient)" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M40 8 L40 12 L36 12" stroke="url(#qrGradient)" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M8 40 L8 36 L12 36" stroke="url(#qrGradient)" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M40 40 L40 36 L36 36" stroke="url(#qrGradient)" strokeWidth="3" strokeLinecap="round" fill="none" />
    
    {/* Scanning Line */}
    {animated && (
      <line x1="12" y1="24" x2="36" y2="24" stroke="#007AFF" strokeWidth="2" opacity="0.8">
        <animate attributeName="y1" values="12;36;12" dur="2s" repeatCount="indefinite" />
        <animate attributeName="y2" values="12;36;12" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite" />
      </line>
    )}
  </svg>
);

export const TopUpIconSVG = ({ className = "w-12 h-12", animated = false }: { className?: string, animated?: boolean }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="topupGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#30D158" />
        <stop offset="100%" stopColor="#00C896" />
      </linearGradient>
      <filter id="topupGlow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Credit Card */}
    <rect x="8" y="16" width="32" height="20" rx="4" fill="url(#topupGradient)" filter="url(#topupGlow)" />
    <rect x="10" y="18" width="28" height="16" rx="2" fill="rgba(255,255,255,0.2)" />
    
    {/* Card Chip */}
    <rect x="12" y="22" width="6" height="4" rx="1" fill="rgba(255,255,255,0.9)" />
    <rect x="13" y="23" width="4" height="2" rx="0.5" fill="rgba(48,209,88,0.3)" />
    
    {/* Card Number */}
    <rect x="12" y="28" width="4" height="2" rx="1" fill="rgba(255,255,255,0.8)" />
    <rect x="18" y="28" width="4" height="2" rx="1" fill="rgba(255,255,255,0.8)" />
    <rect x="24" y="28" width="4" height="2" rx="1" fill="rgba(255,255,255,0.8)" />
    <rect x="30" y="28" width="4" height="2" rx="1" fill="rgba(255,255,255,0.8)" />
    
    {/* Plus Icon */}
    <circle cx="32" cy="12" r="8" fill="#FFD60A" filter="url(#topupGlow)" />
    <rect x="28" y="11" width="8" height="2" rx="1" fill="white" />
    <rect x="31" y="8" width="2" height="8" rx="1" fill="white" />
    
    {/* Money Flow Animation */}
    {animated && (
      <g className="animate-pulse">
        <circle cx="24" cy="8" r="1" fill="#30D158" opacity="0.8">
          <animate attributeName="cy" values="8;16;8" dur="1.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0.3;0.8" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="20" cy="6" r="1" fill="#30D158" opacity="0.6">
          <animate attributeName="cy" values="6;14;6" dur="1.5s" begin="0.3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0.2;0.6" dur="1.5s" begin="0.3s" repeatCount="indefinite" />
        </circle>
        <circle cx="28" cy="6" r="1" fill="#30D158" opacity="0.6">
          <animate attributeName="cy" values="6;14;6" dur="1.5s" begin="0.6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0.2;0.6" dur="1.5s" begin="0.6s" repeatCount="indefinite" />
        </circle>
      </g>
    )}
  </svg>
);

export const RouteIconSVG = ({ className = "w-12 h-12", animated = false }: { className?: string, animated?: boolean }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#AF52DE" />
        <stop offset="100%" stopColor="#5856D6" />
      </linearGradient>
      <filter id="routeGlow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Route Path */}
    <path d="M12 12 Q24 20 36 12 Q30 28 18 36 Q24 32 36 36" 
          stroke="url(#routeGradient)" 
          strokeWidth="4" 
          fill="none" 
          strokeLinecap="round"
          filter="url(#routeGlow)" />
    
    {/* Start Point */}
    <circle cx="12" cy="12" r="4" fill="#30D158" filter="url(#routeGlow)" />
    <circle cx="12" cy="12" r="2" fill="white" />
    
    {/* End Point */}
    <circle cx="36" cy="36" r="4" fill="#FF3B30" filter="url(#routeGlow)" />
    <circle cx="36" cy="36" r="2" fill="white" />
    
    {/* Waypoints */}
    <circle cx="24" cy="16" r="2" fill="url(#routeGradient)" />
    <circle cx="20" cy="28" r="2" fill="url(#routeGradient)" />
    <circle cx="32" cy="24" r="2" fill="url(#routeGradient)" />
    
    {/* Navigation Arrow */}
    <path d="M24 24 L28 20 L26 22 L30 22 L26 26 L28 24 Z" fill="#FFD60A" filter="url(#routeGlow)" />
    
    {/* Moving Dot Animation */}
    {animated && (
      <circle r="2" fill="#007AFF" opacity="0.8">
        <animateMotion dur="3s" repeatCount="indefinite">
          <path d="M12 12 Q24 20 36 12 Q30 28 18 36 Q24 32 36 36" />
        </animateMotion>
        <animate attributeName="opacity" values="0.8;0.3;0.8" dur="1s" repeatCount="indefinite" />
      </circle>
    )}
  </svg>
);

export const HistoryIconSVG = ({ className = "w-12 h-12", animated = false }: { className?: string, animated?: boolean }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="historyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF9F0A" />
        <stop offset="100%" stopColor="#FF6B35" />
      </linearGradient>
      <filter id="historyGlow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Clock Face */}
    <circle cx="24" cy="24" r="16" fill="url(#historyGradient)" filter="url(#historyGlow)" />
    <circle cx="24" cy="24" r="14" fill="rgba(255,255,255,0.2)" />
    <circle cx="24" cy="24" r="12" fill="rgba(255,255,255,0.1)" />
    
    {/* Clock Numbers */}
    <circle cx="24" cy="12" r="1" fill="white" />
    <circle cx="36" cy="24" r="1" fill="white" />
    <circle cx="24" cy="36" r="1" fill="white" />
    <circle cx="12" cy="24" r="1" fill="white" />
    
    {/* Clock Hands */}
    <line x1="24" y1="24" x2="24" y2="16" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <line x1="24" y1="24" x2="30" y2="24" stroke="white" strokeWidth="2" strokeLinecap="round" />
    
    {/* Center Dot */}
    <circle cx="24" cy="24" r="2" fill="white" />
    
    {/* History Trail */}
    <path d="M8 8 L16 12 L12 20 L20 16 L16 24" 
          stroke="rgba(255,159,10,0.6)" 
          strokeWidth="2" 
          fill="none" 
          strokeLinecap="round"
          strokeDasharray="2,2" />
    
    {/* Recent Activity Dots */}
    <circle cx="8" cy="8" r="2" fill="#30D158" opacity="0.8" />
    <circle cx="16" cy="12" r="2" fill="#007AFF" opacity="0.6" />
    <circle cx="12" cy="20" r="2" fill="#AF52DE" opacity="0.4" />
    
    {/* Rotating Animation */}
    {animated && (
      <g style={{ transformOrigin: '24px 24px' }}>
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0;360"
          dur="4s"
          repeatCount="indefinite"
        />
        <line x1="24" y1="24" x2="24" y2="16" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="24" y1="24" x2="30" y2="24" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </g>
    )}
  </svg>
);

export const TrainIconSVG = ({ className = "w-12 h-12", animated = false }: { className?: string, animated?: boolean }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="trainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF9F0A" />
        <stop offset="50%" stopColor="#FF6B35" />
        <stop offset="100%" stopColor="#FF3B30" />
      </linearGradient>
      <filter id="trainGlow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Train Engine */}
    <rect x="4" y="16" width="20" height="16" rx="4" fill="url(#trainGradient)" filter="url(#trainGlow)" />
    <rect x="6" y="18" width="16" height="12" rx="2" fill="rgba(255,255,255,0.2)" />
    
    {/* Train Car */}
    <rect x="22" y="18" width="20" height="12" rx="3" fill="url(#trainGradient)" filter="url(#trainGlow)" />
    <rect x="24" y="20" width="16" height="8" rx="2" fill="rgba(255,255,255,0.2)" />
    
    {/* Engine Windows */}
    <rect x="8" y="20" width="4" height="4" rx="1" fill="rgba(255,255,255,0.9)" />
    <rect x="14" y="20" width="4" height="4" rx="1" fill="rgba(255,255,255,0.9)" />
    
    {/* Car Windows */}
    <rect x="26" y="22" width="3" height="3" rx="0.5" fill="rgba(255,255,255,0.9)" />
    <rect x="31" y="22" width="3" height="3" rx="0.5" fill="rgba(255,255,255,0.9)" />
    <rect x="36" y="22" width="3" height="3" rx="0.5" fill="rgba(255,255,255,0.9)" />
    
    {/* Front Light */}
    <circle cx="4" cy="24" r="2" fill="#FFD60A" filter="url(#trainGlow)" />
    
    {/* Wheels */}
    <circle cx="10" cy="34" r="3" fill="#48484A" />
    <circle cx="18" cy="34" r="3" fill="#48484A" />
    <circle cx="28" cy="34" r="3" fill="#48484A" />
    <circle cx="36" cy="34" r="3" fill="#48484A" />
    
    {/* Rails */}
    <rect x="0" y="38" width="48" height="2" rx="1" fill="#8E8E93" />
    <rect x="0" y="42" width="48" height="2" rx="1" fill="#8E8E93" />
    
    {/* Steam Animation */}
    {animated && (
      <g className="animate-pulse">
        <circle cx="12" cy="12" r="2" fill="rgba(255,255,255,0.6)">
          <animate attributeName="cy" values="12;4;12" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0.1;0.6" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="16" cy="10" r="1.5" fill="rgba(255,255,255,0.5)">
          <animate attributeName="cy" values="10;2;10" dur="2s" begin="0.3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2s" begin="0.3s" repeatCount="indefinite" />
        </circle>
        <circle cx="8" cy="10" r="1.5" fill="rgba(255,255,255,0.5)">
          <animate attributeName="cy" values="10;2;10" dur="2s" begin="0.6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2s" begin="0.6s" repeatCount="indefinite" />
        </circle>
      </g>
    )}
  </svg>
);