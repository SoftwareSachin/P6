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

    {/* Central Glow Background */}
    <ellipse cx="200" cy="100" rx="180" ry="80" fill="url(#centralGlow)" opacity="0.6">
      {animated && <animate attributeName="opacity" values="0.4;0.8;0.4" dur="4s" repeatCount="indefinite" />}
    </ellipse>

    {/* Left Device (Store/Merchant) */}
    <g transform="translate(60, 70)">
      <rect x="-15" y="-20" width="30" height="40" rx="8" fill="url(#deviceGradient)" filter="url(#softShadow)">
        {animated && <animateTransform attributeName="transform" type="scale" values="1;1.05;1" dur="3s" repeatCount="indefinite" />}
      </rect>
      
      {/* Screen */}
      <rect x="-10" y="-15" width="20" height="25" rx="3" fill="rgba(255,255,255,0.9)" />
      <rect x="-8" y="-10" width="16" height="6" rx="1" fill="#3B82F6" />
      <text x="0" y="-6" textAnchor="middle" fontSize="4" fontWeight="bold" fill="white">STORE</text>
      
      {/* Store icon */}
      <circle cx="0" cy="5" r="3" fill="#10B981" />
      <path d="M-2 5 L0 7 L2 3" stroke="white" strokeWidth="0.8" fill="none" strokeLinecap="round" />
      
      <text x="0" y="35" textAnchor="middle" fontSize="10" fontWeight="600" fill="#6366F1">Merchant</text>
    </g>

    {/* Central Bluetooth Hub */}
    <g transform="translate(200, 100)">
      {/* Bluetooth Ring */}
      <circle cx="0" cy="0" r="25" fill="none" stroke="url(#bluetoothGlow)" strokeWidth="2" opacity="0.6">
        {animated && <animate attributeName="stroke-dasharray" values="0 157;78.5 78.5;157 0" dur="2.5s" repeatCount="indefinite" />}
      </circle>
      
      {/* Inner Bluetooth Icon */}
      <circle cx="0" cy="0" r="15" fill="url(#bluetoothGlow)" filter="url(#glow)">
        {animated && <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />}
      </circle>
      
      {/* Bluetooth Symbol */}
      <path d="M-5 -8 L5 0 L-5 8 M5 0 L5 -8 M5 0 L5 8" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      
      <text x="0" y="45" textAnchor="middle" fontSize="12" fontWeight="700" fill="#3B82F6">Bluetooth</text>
      <text x="0" y="56" textAnchor="middle" fontSize="8" fill="#6B7280">Offline Connection</text>
    </g>

    {/* Right Device (User Phone) */}
    <g transform="translate(340, 70)">
      <rect x="-12" y="-25" width="24" height="50" rx="8" fill="url(#deviceGradient)" filter="url(#softShadow)">
        {animated && <animateTransform attributeName="transform" type="scale" values="1;1.05;1" dur="3s" begin="1s" repeatCount="indefinite" />}
      </rect>
      
      {/* Screen */}
      <rect x="-8" y="-20" width="16" height="35" rx="3" fill="rgba(255,255,255,0.95)" />
      
      {/* OPPB App Icon */}
      <circle cx="0" cy="-12" r="4" fill="#8B5CF6" />
      <text x="0" y="-9" textAnchor="middle" fontSize="3" fontWeight="bold" fill="white">OPPB</text>
      
      {/* Payment Success */}
      <circle cx="0" cy="2" r="6" fill="url(#successGradient)" />
      <path d="M-3 2 L-1 4 L3 0" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      
      <text x="0" y="35" textAnchor="middle" fontSize="10" fontWeight="600" fill="#6366F1">Your Phone</text>
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

    {/* Bottom Labels */}
    <g transform="translate(200, 180)">
      <text x="0" y="0" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1F2937">Instant Offline Payments</text>
      <text x="0" y="12" textAnchor="middle" fontSize="10" fill="#6B7280">No internet required • Secure Bluetooth technology</text>
    </g>

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