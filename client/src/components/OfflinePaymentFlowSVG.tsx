export const OfflinePaymentFlowSVG = ({ className = "w-full h-48", animated = true }: { className?: string, animated?: boolean }) => (
  <svg
    className={className}
    viewBox="0 0 400 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      {/* Premium Gradients */}
      <radialGradient id="centralGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
        <stop offset="70%" stopColor="rgba(99, 102, 241, 0.2)" />
        <stop offset="100%" stopColor="rgba(139, 92, 246, 0.1)" />
      </radialGradient>

      <linearGradient id="deviceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366F1" />
        <stop offset="50%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#A855F7" />
      </linearGradient>
      
      <linearGradient id="bluetoothGlow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="50%" stopColor="#2563EB" />
        <stop offset="100%" stopColor="#1D4ED8" />
      </linearGradient>

      <linearGradient id="connectionFlow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="rgba(59, 130, 246, 0)" />
        <stop offset="50%" stopColor="rgba(59, 130, 246, 1)" />
        <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
      </linearGradient>

      <linearGradient id="successGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>

      {/* Filters for premium effects */}
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>

      <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="rgba(0,0,0,0.1)"/>
      </filter>
    </defs>

    {/* Left Device (Merchant Phone) - Animated GIF */}
    <g transform="translate(60, 100)">
      {/* Animated Merchant Phone GIF */}
      <foreignObject x="-35" y="-50" width="70" height="100">
        <img 
          src="/src/assets/merchant-phone-animated.gif" 
          alt="Merchant Phone"
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </foreignObject>
      
      <text x="0" y="65" textAnchor="middle" fontSize="12" fontWeight="600" fill="#6366F1">Merchant</text>
    </g>

    {/* Central Bluetooth Hub */}
    <g transform="translate(200, 100)">
      {/* Bluetooth Ring */}
      <circle cx="0" cy="0" r="35" fill="none" stroke="url(#bluetoothGlow)" strokeWidth="3" opacity="0.6">
        {animated && <animate attributeName="stroke-dasharray" values="0 220;110 110;220 0" dur="2.5s" repeatCount="indefinite" />}
      </circle>
      
      {/* Animated Bluetooth GIF */}
      <foreignObject x="-25" y="-25" width="50" height="50">
        <img 
          src="/src/assets/bluetooth-animated.gif" 
          alt="Bluetooth"
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </foreignObject>
      
      <text x="0" y="55" textAnchor="middle" fontSize="12" fontWeight="700" fill="#3B82F6">Bluetooth</text>
      <text x="0" y="66" textAnchor="middle" fontSize="8" fill="#6B7280">Offline Connection</text>
    </g>

    {/* Right Device (User Phone) - Animated GIF */}
    <g transform="translate(340, 100)">
      {/* Animated Phone GIF */}
      <foreignObject x="-35" y="-50" width="70" height="100">
        <img 
          src="/src/assets/phone-animated.gif" 
          alt="Phone"
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </foreignObject>
      
      <text x="0" y="65" textAnchor="middle" fontSize="12" fontWeight="600" fill="#6366F1">Your Phone</text>
    </g>

    {/* Connection Flow Lines */}
    <g>
      {/* Left connection */}
      <path d="M90 100 Q120 95 175 100" stroke="url(#connectionFlow)" strokeWidth="3" fill="none" opacity="0.8">
        {animated && (
          <animate attributeName="stroke-dasharray" values="0 100;50 50;100 0" dur="2s" repeatCount="indefinite" />
        )}
      </path>
      
      {/* Right connection */}
      <path d="M225 100 Q255 95 315 100" stroke="url(#connectionFlow)" strokeWidth="3" fill="none" opacity="0.8">
        {animated && (
          <animate attributeName="stroke-dasharray" values="0 100;50 50;100 0" dur="2s" begin="0.5s" repeatCount="indefinite" />
        )}
      </path>
    </g>

    {/* Floating Connection Particles */}
    {animated && (
      <g>
        {[...Array(8)].map((_, i) => (
          <circle
            key={i}
            cx={100 + i * 25}
            cy={100 + Math.sin(i) * 10}
            r="2"
            fill="#3B82F6"
            opacity="0.6"
          >
            <animate
              attributeName="opacity"
              values="0;1;0"
              dur="2s"
              begin={`${i * 0.25}s`}
              repeatCount="indefinite"
            />
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0;5,0;0,0"
              dur="2s"
              begin={`${i * 0.25}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </g>
    )}



    {/* Success Checkmarks */}
    <g>
      <circle cx="130" cy="80" r="8" fill="url(#successGradient)" opacity="0.9">
        {animated && <animate attributeName="opacity" values="0;1;1" dur="1s" begin="1s" fill="freeze" />}
      </circle>
      <path d="M126 80 L129 83 L134 77" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {animated && <animate attributeName="opacity" values="0;1;1" dur="1s" begin="1.2s" fill="freeze" />}
      </path>
      
      <circle cx="270" cy="80" r="8" fill="url(#successGradient)" opacity="0.9">
        {animated && <animate attributeName="opacity" values="0;1;1" dur="1s" begin="1.5s" fill="freeze" />}
      </circle>
      <path d="M266 80 L269 83 L274 77" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {animated && <animate attributeName="opacity" values="0;1;1" dur="1s" begin="1.7s" fill="freeze" />}
      </path>
    </g>
  </svg>
);