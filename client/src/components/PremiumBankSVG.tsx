export const PremiumBankSVG = ({ className = "w-16 h-16", animated = false }: { className?: string, animated?: boolean }) => (
  <svg viewBox="0 0 120 120" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      {/* Premium Bank Gradients */}
      <linearGradient id="bankBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F8FAFC" stopOpacity="1"/>
        <stop offset="20%" stopColor="#F1F5F9" stopOpacity="0.98"/>
        <stop offset="50%" stopColor="#E2E8F0" stopOpacity="0.95"/>
        <stop offset="80%" stopColor="#CBD5E1" stopOpacity="0.9"/>
        <stop offset="100%" stopColor="#94A3B8" stopOpacity="0.85"/>
      </linearGradient>
      
      <linearGradient id="bankRoofGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E2E8F0" stopOpacity="1"/>
        <stop offset="30%" stopColor="#CBD5E1" stopOpacity="0.95"/>
        <stop offset="70%" stopColor="#94A3B8" stopOpacity="0.9"/>
        <stop offset="100%" stopColor="#64748B" stopOpacity="0.85"/>
      </linearGradient>

      <linearGradient id="bankColumnsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.9"/>
        <stop offset="50%" stopColor="#2563EB" stopOpacity="0.8"/>
        <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.7"/>
      </linearGradient>

      <linearGradient id="bankShadowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(71, 85, 105, 0.3)" stopOpacity="1"/>
        <stop offset="50%" stopColor="rgba(71, 85, 105, 0.2)" stopOpacity="0.8"/>
        <stop offset="100%" stopColor="rgba(71, 85, 105, 0.1)" stopOpacity="0.5"/>
      </linearGradient>

      {/* Premium Lighting Effects */}
      <radialGradient id="bankHighlight" cx="30%" cy="20%" r="80%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.6)" stopOpacity="1"/>
        <stop offset="40%" stopColor="rgba(255,255,255,0.3)" stopOpacity="0.7"/>
        <stop offset="100%" stopColor="rgba(255,255,255,0)" stopOpacity="0"/>
      </radialGradient>

      {/* Premium Shadows and Filters */}
      <filter id="bankShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="6" stdDeviation="12" floodColor="#475569" floodOpacity="0.25"/>
        <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#475569" floodOpacity="0.15"/>
      </filter>

      <filter id="columnDepth" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#1E40AF" floodOpacity="0.3"/>
      </filter>
    </defs>

    {/* Bank Building Structure */}
    <g transform="translate(10, 20)" filter="url(#bankShadow)">
      {/* Main Building Foundation */}
      <rect x="5" y="55" width="90" height="35" rx="2" fill="url(#bankBodyGradient)" stroke="rgba(148, 163, 184, 0.4)" strokeWidth="0.5"/>
      
      {/* Building Steps/Platform */}
      <rect x="0" y="75" width="100" height="8" rx="1" fill="url(#bankShadowGradient)"/>
      <rect x="3" y="78" width="94" height="5" rx="1" fill="rgba(203, 213, 225, 0.8)"/>

      {/* Triangular Roof/Pediment */}
      <path
        d="M50 15 L85 40 L15 40 Z"
        fill="url(#bankRoofGradient)"
        stroke="rgba(148, 163, 184, 0.5)"
        strokeWidth="0.8"
      >
        {animated && <animate attributeName="opacity" values="0.85;1;0.85" dur="4s" repeatCount="indefinite" />}
      </path>

      {/* Roof Highlight */}
      <path
        d="M50 15 L85 40 L15 40 Z"
        fill="url(#bankHighlight)"
        opacity="0.4"
      />

      {/* Classical Columns - Front Face */}
      <g filter="url(#columnDepth)">
        {[...Array(6)].map((_, i) => (
          <g key={i}>
            {/* Column Body */}
            <rect
              x={18 + i * 11}
              y="40"
              width="6"
              height="35"
              fill="url(#bankColumnsGradient)"
              stroke="rgba(29, 78, 216, 0.3)"
              strokeWidth="0.3"
            >
              {animated && (
                <animate
                  attributeName="opacity"
                  values="0.7;0.9;0.7"
                  dur={`${3 + i * 0.2}s`}
                  repeatCount="indefinite"
                />
              )}
            </rect>
            
            {/* Column Capital (Top) */}
            <rect
              x={17 + i * 11}
              y="38"
              width="8"
              height="3"
              rx="1"
              fill="#F1F5F9"
              stroke="rgba(148, 163, 184, 0.4)"
              strokeWidth="0.3"
            />
            
            {/* Column Base */}
            <rect
              x={17 + i * 11}
              y="74"
              width="8"
              height="2"
              rx="0.5"
              fill="#E2E8F0"
              stroke="rgba(148, 163, 184, 0.3)"
              strokeWidth="0.3"
            />
          </g>
        ))}
      </g>

      {/* Main Entrance Door */}
      <rect x="45" y="58" width="10" height="17" rx="1" fill="#1E40AF" opacity="0.8"/>
      <rect x="46" y="59" width="8" height="15" rx="0.5" fill="#3B82F6" opacity="0.6"/>
      
      {/* Door Handle */}
      <circle cx="52" cy="66" r="0.8" fill="#F8FAFC" opacity="0.9"/>

      {/* Side Windows */}
      <rect x="25" y="62" width="6" height="8" rx="0.5" fill="#3B82F6" opacity="0.4"/>
      <rect x="69" y="62" width="6" height="8" rx="0.5" fill="#3B82F6" opacity="0.4"/>

      {/* Building Name Plaque */}
      <rect x="30" y="48" width="40" height="6" rx="1" fill="rgba(248, 250, 252, 0.9)" stroke="rgba(148, 163, 184, 0.3)" strokeWidth="0.5"/>
      
      {/* Decorative Elements */}
      <g opacity="0.6">
        {/* Side Pilasters */}
        <rect x="12" y="40" width="4" height="35" fill="url(#bankColumnsGradient)" opacity="0.7"/>
        <rect x="84" y="40" width="4" height="35" fill="url(#bankColumnsGradient)" opacity="0.7"/>
        
        {/* Architectural Details */}
        <line x1="15" y1="42" x2="85" y2="42" stroke="rgba(148, 163, 184, 0.5)" strokeWidth="0.8"/>
        <line x1="15" y1="73" x2="85" y2="73" stroke="rgba(148, 163, 184, 0.5)" strokeWidth="0.8"/>
      </g>

      {/* Premium Lighting Accents */}
      <g opacity="0.3">
        <path d="M50 15 L75 35" stroke="rgba(255, 255, 255, 0.8)" strokeWidth="1" fill="none"/>
        <path d="M25 35 L50 15" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="0.8" fill="none"/>
      </g>

      {/* Floating Animation Elements */}
      {animated && (
        <g>
          {[...Array(3)].map((_, i) => (
            <circle
              key={i}
              cx={30 + i * 20}
              cy={25 + i * 3}
              r="1"
              fill="#3B82F6"
              opacity="0.4"
            >
              <animate
                attributeName="opacity"
                values="0;0.6;0"
                dur={`${3 + i * 0.5}s`}
                repeatCount="indefinite"
              />
              <animateTransform
                attributeName="transform"
                type="translate"
                values={`0,0;0,-${4 + i * 2};0,0`}
                dur={`${4 + i * 0.3}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </g>
      )}
    </g>

    {/* Reflection Effect */}
    <g transform="translate(10, 20)" opacity="0.15">
      <path
        d="M5 90 L95 90 L50 105 Z"
        fill="url(#bankShadowGradient)"
        transform="scaleY(-0.3)"
        style={{ transformOrigin: '50px 90px' }}
      />
    </g>
  </svg>
);