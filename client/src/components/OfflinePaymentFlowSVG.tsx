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

    {/* Left Device (Merchant Phone) - 3D Style */}
    <g transform="translate(60, 70)">
      {/* Phone Shadow/Depth */}
      <rect x="-13" y="-27" width="28" height="56" rx="9" fill="rgba(0,0,0,0.2)" transform="translate(2, 2)" />
      
      {/* Phone Body */}
      <rect x="-15" y="-30" width="30" height="60" rx="10" fill="url(#deviceGradient)" filter="url(#softShadow)">
        {animated && <animateTransform attributeName="transform" type="scale" values="1;1.03;1" dur="4s" repeatCount="indefinite" />}
      </rect>
      
      {/* Phone Side Edge (3D Effect) */}
      <path d="M15 -30 L17 -28 L17 28 L15 30" fill="rgba(0,0,0,0.15)" />
      
      {/* Screen Bezel */}
      <rect x="-12" y="-27" width="24" height="54" rx="8" fill="#1F2937" />
      
      {/* Screen */}
      <rect x="-10" y="-25" width="20" height="50" rx="6" fill="rgba(255,255,255,0.98)" />
      
      {/* Status Bar */}
      <rect x="-9" y="-24" width="18" height="3" rx="1" fill="#F3F4F6" />
      <circle cx="6" cy="-22.5" r="0.5" fill="#10B981" />
      
      {/* App Header */}
      <rect x="-9" y="-20" width="18" height="6" rx="1" fill="#6366F1" />
      <text x="0" y="-16" textAnchor="middle" fontSize="2.5" fontWeight="bold" fill="white">Payment Machine</text>
      
      {/* Payment Amount Display */}
      <rect x="-8" y="-12" width="16" height="8" rx="2" fill="#F9FAFB" stroke="#E5E7EB" strokeWidth="0.3" />
      <text x="0" y="-7" textAnchor="middle" fontSize="4" fontWeight="bold" fill="#059669">₹299.00</text>
      
      {/* Dynamic QR Code */}
      <rect x="-7" y="-2" width="14" height="14" rx="1" fill="#1F2937" />
      <rect x="-6" y="-1" width="12" height="12" rx="0.5" fill="white" />
      <g fill="#1F2937">
        {animated && (
          <animate attributeName="opacity" values="1;0.7;1" dur="2s" repeatCount="indefinite" />
        )}
        <rect x="-5" y="0" width="2" height="2" />
        <rect x="-2" y="0" width="2" height="2" />
        <rect x="1" y="0" width="2" height="2" />
        <rect x="4" y="0" width="1" height="2" />
        <rect x="-5" y="3" width="1" height="2" />
        <rect x="-3" y="3" width="2" height="2" />
        <rect x="1" y="3" width="1" height="2" />
        <rect x="3" y="3" width="2" height="2" />
        <rect x="-5" y="6" width="2" height="2" />
        <rect x="-2" y="6" width="1" height="2" />
        <rect x="1" y="6" width="2" height="2" />
        <rect x="4" y="6" width="1" height="2" />
      </g>
      
      {/* Bottom Buttons */}
      <rect x="-7" y="15" width="6" height="3" rx="1" fill="#EF4444" />
      <text x="-4" y="17" textAnchor="middle" fontSize="1.5" fontWeight="bold" fill="white">Cancel</text>
      
      <rect x="1" y="15" width="6" height="3" rx="1" fill="#10B981" />
      <text x="4" y="17" textAnchor="middle" fontSize="1.5" fontWeight="bold" fill="white">Accept</text>
      
      {/* Home Indicator */}
      <rect x="-3" y="22" width="6" height="1" rx="0.5" fill="#9CA3AF" />
      
      <text x="0" y="38" textAnchor="middle" fontSize="10" fontWeight="600" fill="#6366F1">Merchant</text>
    </g>

    {/* Central Bluetooth Hub */}
    <g transform="translate(200, 100)">
      {/* Bluetooth Ring */}
      <circle cx="0" cy="0" r="25" fill="none" stroke="url(#bluetoothGlow)" strokeWidth="2" opacity="0.6">
        {animated && <animate attributeName="stroke-dasharray" values="0 157;78.5 78.5;157 0" dur="2.5s" repeatCount="indefinite" />}
      </circle>
      
      {/* Animated Bluetooth GIF */}
      <foreignObject x="-15" y="-15" width="30" height="30">
        <img 
          src="/src/assets/bluetooth-animated.gif" 
          alt="Bluetooth"
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </foreignObject>
      
      <text x="0" y="45" textAnchor="middle" fontSize="12" fontWeight="700" fill="#3B82F6">Bluetooth</text>
      <text x="0" y="56" textAnchor="middle" fontSize="8" fill="#6B7280">Offline Connection</text>
    </g>

    {/* Right Device (User Phone) - 3D Style */}
    <g transform="translate(340, 70)">
      {/* Phone Shadow/Depth */}
      <rect x="-13" y="-27" width="28" height="56" rx="9" fill="rgba(0,0,0,0.2)" transform="translate(2, 2)" />
      
      {/* Phone Body */}
      <rect x="-15" y="-30" width="30" height="60" rx="10" fill="url(#deviceGradient)" filter="url(#softShadow)">
        {animated && <animateTransform attributeName="transform" type="scale" values="1;1.03;1" dur="4s" begin="1s" repeatCount="indefinite" />}
      </rect>
      
      {/* Phone Side Edge (3D Effect) */}
      <path d="M15 -30 L17 -28 L17 28 L15 30" fill="rgba(0,0,0,0.15)" />
      
      {/* Screen Bezel */}
      <rect x="-12" y="-27" width="24" height="54" rx="8" fill="#1F2937" />
      
      {/* Screen */}
      <rect x="-10" y="-25" width="20" height="50" rx="6" fill="rgba(255,255,255,0.98)" />
      
      {/* Status Bar */}
      <rect x="-9" y="-24" width="18" height="3" rx="1" fill="#F3F4F6" />
      <circle cx="6" cy="-22.5" r="0.5" fill="#10B981" />
      
      {/* OPPB App Header */}
      <rect x="-9" y="-20" width="18" height="6" rx="1" fill="#8B5CF6" />
      <text x="0" y="-16" textAnchor="middle" fontSize="2.5" fontWeight="bold" fill="white">OPPB Wallet</text>
      
      {/* Dynamic Payment Success Animation */}
      <g>
        {/* Success Background */}
        <rect x="-8" y="-12" width="16" height="20" rx="3" fill="#F0FDF4" stroke="#22C55E" strokeWidth="0.5">
          {animated && <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />}
        </rect>
        
        {/* Animated Success Circle */}
        <circle cx="0" cy="-2" r="6" fill="url(#successGradient)">
          {animated && (
            <>
              <animate attributeName="r" values="4;7;4" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
            </>
          )}
        </circle>
        
        {/* Animated Checkmark */}
        <path d="M-3 -2 L-1 0 L3 -4" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {animated && (
            <>
              <animate attributeName="stroke-dasharray" values="0 10;10 0" dur="1s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6;1;0.6" dur="1.5s" repeatCount="indefinite" />
            </>
          )}
        </path>
        
        {/* Payment Confirmation Text */}
        <text x="0" y="3" textAnchor="middle" fontSize="2" fontWeight="bold" fill="#059669">Payment</text>
        <text x="0" y="6" textAnchor="middle" fontSize="2" fontWeight="bold" fill="#059669">Successful!</text>
      </g>
      
      {/* Dynamic Amount Display */}
      <text x="0" y="12" textAnchor="middle" fontSize="3" fontWeight="bold" fill="#059669">
        ₹299.00
        {animated && <animate attributeName="opacity" values="0.7;1;0.7" dur="2.5s" repeatCount="indefinite" />}
      </text>
      
      {/* Success Particles */}
      {animated && (
        <g>
          {[...Array(6)].map((_, i) => (
            <circle
              key={i}
              cx={Math.cos(i * Math.PI / 3) * 12}
              cy={-2 + Math.sin(i * Math.PI / 3) * 8}
              r="1"
              fill="#22C55E"
              opacity="0.6"
            >
              <animate
                attributeName="opacity"
                values="0;1;0"
                dur="2s"
                begin={`${i * 0.3}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="r"
                values="0.5;1.5;0.5"
                dur="2s"
                begin={`${i * 0.3}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </g>
      )}
      
      {/* Bottom Action Button */}
      <rect x="-7" y="17" width="14" height="4" rx="2" fill="#22C55E">
        {animated && <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />}
      </rect>
      <text x="0" y="20" textAnchor="middle" fontSize="2" fontWeight="bold" fill="white">Done</text>
      
      {/* Home Indicator */}
      <rect x="-3" y="22" width="6" height="1" rx="0.5" fill="#9CA3AF" />
      
      <text x="0" y="38" textAnchor="middle" fontSize="10" fontWeight="600" fill="#6366F1">Your Phone</text>
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