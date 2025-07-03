// Premium Apple Pay-inspired SVG components for offline payments

export const BluetoothDiscoverySVG = ({ className = "w-12 h-12", animated = true }: { className?: string, animated?: boolean }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bluetoothGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0066FF" />
        <stop offset="50%" stopColor="#0052CC" />
        <stop offset="100%" stopColor="#003D99" />
      </linearGradient>
      <filter id="bluetoothGlow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      {animated && (
        <>
          <animate id="pulseAnimation" attributeName="r" values="20;25;20" dur="2s" repeatCount="indefinite" />
          <animate id="waveAnimation" attributeName="opacity" values="0.3;0.7;0.3" dur="1.5s" repeatCount="indefinite" />
        </>
      )}
    </defs>
    
    {/* Bluetooth waves */}
    {animated && (
      <>
        <circle cx="50" cy="50" r="35" fill="none" stroke="url(#bluetoothGradient)" strokeWidth="1" opacity="0.3">
          <animate attributeName="r" values="35;45;35" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="50" cy="50" r="30" fill="none" stroke="url(#bluetoothGradient)" strokeWidth="1.5" opacity="0.5">
          <animate attributeName="r" values="30;40;30" dur="2s" begin="0.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" begin="0.5s" repeatCount="indefinite" />
        </circle>
      </>
    )}
    
    {/* Central Bluetooth icon */}
    <rect x="45" y="30" width="10" height="40" fill="url(#bluetoothGradient)" rx="2" filter="url(#bluetoothGlow)" />
    <polygon points="55,35 65,25 55,35 65,45 55,45" fill="url(#bluetoothGradient)" filter="url(#bluetoothGlow)" />
    <polygon points="55,55 65,65 55,65 65,55 55,55" fill="url(#bluetoothGradient)" filter="url(#bluetoothGlow)" />
    <polygon points="45,35 35,25 45,35 35,45 45,45" fill="url(#bluetoothGradient)" filter="url(#bluetoothGlow)" />
    <polygon points="45,55 35,65 45,65 35,55 45,55" fill="url(#bluetoothGradient)" filter="url(#bluetoothGlow)" />
    
    {/* Scanning indicator */}
    {animated && (
      <circle cx="50" cy="50" r="20" fill="none" stroke="url(#bluetoothGradient)" strokeWidth="2" opacity="0.8">
        <animate attributeName="r" values="20;25;20" dur="1s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0.3;0.8" dur="1s" repeatCount="indefinite" />
      </circle>
    )}
  </svg>
);

export const DeviceConnectionSVG = ({ className = "w-8 h-8", deviceType = "phone" }: { className?: string, deviceType?: "phone" | "pos" | "tablet" }) => (
  <svg viewBox="0 0 60 60" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="deviceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F8FAFC" />
        <stop offset="50%" stopColor="#E2E8F0" />
        <stop offset="100%" stopColor="#CBD5E1" />
      </linearGradient>
      <filter id="deviceShadow">
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3"/>
      </filter>
    </defs>
    
    {deviceType === "phone" && (
      <>
        <rect x="18" y="8" width="24" height="44" rx="6" fill="url(#deviceGradient)" filter="url(#deviceShadow)" stroke="#94A3B8" strokeWidth="1"/>
        <rect x="20" y="14" width="20" height="28" rx="2" fill="#1E293B"/>
        <circle cx="30" cy="47" r="2" fill="#64748B"/>
        <rect x="26" y="10" width="8" height="2" rx="1" fill="#64748B"/>
      </>
    )}
    
    {deviceType === "pos" && (
      <>
        <rect x="10" y="15" width="40" height="30" rx="4" fill="url(#deviceGradient)" filter="url(#deviceShadow)" stroke="#94A3B8" strokeWidth="1"/>
        <rect x="13" y="18" width="34" height="20" rx="2" fill="#1E293B"/>
        <circle cx="30" cy="42" r="1.5" fill="#10B981"/>
        <rect x="15" y="40" width="30" height="3" rx="1" fill="#64748B"/>
      </>
    )}
    
    {deviceType === "tablet" && (
      <>
        <rect x="8" y="12" width="44" height="36" rx="6" fill="url(#deviceGradient)" filter="url(#deviceShadow)" stroke="#94A3B8" strokeWidth="1"/>
        <rect x="11" y="16" width="38" height="26" rx="2" fill="#1E293B"/>
        <circle cx="30" cy="45" r="2" fill="#64748B"/>
      </>
    )}
  </svg>
);

export const PaymentFlowSVG = ({ className = "w-16 h-16", step = 1 }: { className?: string, step?: number }) => (
  <svg viewBox="0 0 120 120" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="50%" stopColor="#059669" />
        <stop offset="100%" stopColor="#047857" />
      </linearGradient>
      <filter id="flowGlow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Step indicators */}
    <circle cx="30" cy="30" r="8" fill={step >= 1 ? "url(#flowGradient)" : "#E5E7EB"} filter="url(#flowGlow)"/>
    <circle cx="90" cy="30" r="8" fill={step >= 2 ? "url(#flowGradient)" : "#E5E7EB"} filter="url(#flowGlow)"/>
    <circle cx="30" cy="90" r="8" fill={step >= 3 ? "url(#flowGradient)" : "#E5E7EB"} filter="url(#flowGlow)"/>
    <circle cx="90" cy="90" r="8" fill={step >= 4 ? "url(#flowGradient)" : "#E5E7EB"} filter="url(#flowGlow)"/>
    
    {/* Connection lines */}
    <line x1="38" y1="30" x2="82" y2="30" stroke={step >= 2 ? "url(#flowGradient)" : "#E5E7EB"} strokeWidth="2"/>
    <line x1="90" y1="38" x2="90" y2="82" stroke={step >= 3 ? "url(#flowGradient)" : "#E5E7EB"} strokeWidth="2"/>
    <line x1="82" y1="90" x2="38" y2="90" stroke={step >= 4 ? "url(#flowGradient)" : "#E5E7EB"} strokeWidth="2"/>
    
    {/* Step icons */}
    <text x="30" y="35" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">1</text>
    <text x="90" y="35" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">2</text>
    <text x="30" y="95" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">3</text>
    <text x="90" y="95" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">4</text>
    
    {/* Center connection hub */}
    <circle cx="60" cy="60" r="12" fill="url(#flowGradient)" filter="url(#flowGlow)"/>
    <circle cx="60" cy="60" r="6" fill="white"/>
    
    {step >= 1 && (
      <animateTransform
        attributeName="transform"
        type="rotate"
        values="0 60 60;360 60 60"
        dur="3s"
        repeatCount="indefinite"
      />
    )}
  </svg>
);

export const SecureConnectionSVG = ({ className = "w-12 h-12", connected = false }: { className?: string, connected?: boolean }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="secureGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="50%" stopColor="#D97706" />
        <stop offset="100%" stopColor="#B45309" />
      </linearGradient>
      <filter id="secureGlow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Shield background */}
    <path d="M50 10 L75 25 L75 55 Q75 70 50 85 Q25 70 25 55 L25 25 Z" 
          fill="url(#secureGradient)" 
          filter="url(#secureGlow)" 
          stroke="#92400E" 
          strokeWidth="1"/>
    
    {/* Lock icon */}
    <rect x="40" y="45" width="20" height="15" rx="2" fill="white"/>
    <rect x="45" y="35" width="10" height="15" fill="none" stroke="white" strokeWidth="2" rx="5"/>
    <circle cx="50" cy="52" r="2" fill="url(#secureGradient)"/>
    
    {/* Security indicators */}
    {connected && (
      <>
        <circle cx="30" cy="30" r="3" fill="#10B981">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite"/>
        </circle>
        <circle cx="70" cy="30" r="3" fill="#10B981">
          <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite"/>
        </circle>
        <circle cx="30" cy="70" r="3" fill="#10B981">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" begin="0.5s" repeatCount="indefinite"/>
        </circle>
        <circle cx="70" cy="70" r="3" fill="#10B981">
          <animate attributeName="opacity" values="1;0.3;1" dur="1s" begin="0.5s" repeatCount="indefinite"/>
        </circle>
      </>
    )}
  </svg>
);

export const PaymentSuccessSVG = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="successGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="50%" stopColor="#059669" />
        <stop offset="100%" stopColor="#047857" />
      </linearGradient>
      <filter id="successGlow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Success circle */}
    <circle cx="50" cy="50" r="40" fill="url(#successGradient)" filter="url(#successGlow)"/>
    <circle cx="50" cy="50" r="35" fill="none" stroke="white" strokeWidth="2" opacity="0.3"/>
    
    {/* Checkmark */}
    <path d="M35 50 L45 60 L65 40" 
          stroke="white" 
          strokeWidth="4" 
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round">
      <animate attributeName="stroke-dasharray" values="0 100;30 100" dur="0.5s" fill="freeze"/>
      <animate attributeName="stroke-dashoffset" values="100;70" dur="0.5s" fill="freeze"/>
    </path>
    
    {/* Success particles */}
    <circle cx="25" cy="25" r="2" fill="white" opacity="0.8">
      <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite"/>
    </circle>
    <circle cx="75" cy="75" r="2" fill="white" opacity="0.8">
      <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite"/>
    </circle>
    <circle cx="75" cy="25" r="2" fill="white" opacity="0.8">
      <animate attributeName="opacity" values="0;1;0" dur="2s" begin="1s" repeatCount="indefinite"/>
    </circle>
    <circle cx="25" cy="75" r="2" fill="white" opacity="0.8">
      <animate attributeName="opacity" values="1;0;1" dur="2s" begin="1s" repeatCount="indefinite"/>
    </circle>
  </svg>
);

export const NFCTapSVG = ({ className = "w-10 h-10", animated = true }: { className?: string, animated?: boolean }) => (
  <svg viewBox="0 0 80 80" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="nfcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="50%" stopColor="#2563EB" />
        <stop offset="100%" stopColor="#1D4ED8" />
      </linearGradient>
    </defs>
    
    {/* NFC waves */}
    <path d="M20 40 Q40 20 60 40" stroke="url(#nfcGradient)" strokeWidth="3" fill="none" strokeLinecap="round">
      {animated && <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite"/>}
    </path>
    <path d="M15 40 Q40 10 65 40" stroke="url(#nfcGradient)" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7">
      {animated && <animate attributeName="opacity" values="0.7;0.3;0.7" dur="1.5s" begin="0.3s" repeatCount="indefinite"/>}
    </path>
    <path d="M10 40 Q40 5 70 40" stroke="url(#nfcGradient)" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5">
      {animated && <animate attributeName="opacity" values="0.5;0.1;0.5" dur="1.5s" begin="0.6s" repeatCount="indefinite"/>}
    </path>
    
    {/* NFC symbol */}
    <circle cx="40" cy="50" r="8" fill="url(#nfcGradient)"/>
    <circle cx="40" cy="50" r="4" fill="white"/>
  </svg>
);