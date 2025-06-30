export const SecureConnectionSVG = ({ className = "w-full h-24", animated = true }: { className?: string, animated?: boolean }) => (
  <svg
    className={className}
    viewBox="0 0 300 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      {/* Premium Gradients */}
      <linearGradient id="bhimGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF6B35" />
        <stop offset="50%" stopColor="#F7931E" />
        <stop offset="100%" stopColor="#FFD23F" />
      </linearGradient>
      
      <linearGradient id="oppbGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="50%" stopColor="#A855F7" />
        <stop offset="100%" stopColor="#C084FC" />
      </linearGradient>

      <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>

      <linearGradient id="connectionGlow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="rgba(16, 185, 129, 0)" />
        <stop offset="30%" stopColor="rgba(16, 185, 129, 0.8)" />
        <stop offset="70%" stopColor="rgba(16, 185, 129, 0.8)" />
        <stop offset="100%" stopColor="rgba(16, 185, 129, 0)" />
      </linearGradient>

      {/* Premium Effects */}
      <filter id="premiumGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>

      <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="rgba(0,0,0,0.1)"/>
      </filter>

      <radialGradient id="securityRing" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(16, 185, 129, 0)" />
        <stop offset="80%" stopColor="rgba(16, 185, 129, 0.1)" />
        <stop offset="100%" stopColor="rgba(16, 185, 129, 0.3)" />
      </radialGradient>
    </defs>

    {/* Security Ring Background */}
    <ellipse cx="150" cy="40" rx="140" ry="35" fill="url(#securityRing)" opacity="0.6">
      {animated && <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" />}
    </ellipse>

    {/* BHIM UPI Icon - Left */}
    <g transform="translate(60, 40)">
      {/* App Icon Background */}
      <rect x="-18" y="-18" width="36" height="36" rx="8" fill="url(#bhimGradient)" filter="url(#softShadow)">
        {animated && <animateTransform attributeName="transform" type="scale" values="1;1.05;1" dur="2.5s" repeatCount="indefinite" />}
      </rect>
      
      {/* Simplified BHIM Logo */}
      <g>
        {/* White background for logo */}
        <rect x="-12" y="-8" width="24" height="16" rx="2" fill="white" opacity="0.95" />
        
        {/* BHIM text in bold */}
        <text x="0" y="-2" textAnchor="middle" fontSize="6" fontWeight="900" fill="#FF6B35" fontFamily="Arial, sans-serif">BHIM</text>
        
        {/* UPI text smaller below */}
        <text x="0" y="4" textAnchor="middle" fontSize="3" fontWeight="700" fill="#FF6B35" fontFamily="Arial, sans-serif">UPI</text>
      </g>
      
      {/* App Label */}
      <text x="0" y="32" textAnchor="middle" fontSize="9" fontWeight="600" fill="#FF6B35">BHIM UPI</text>
    </g>

    {/* Secure Connection Line */}
    <g>
      <path d="M85 40 Q115 35 135 40" stroke="url(#connectionGlow)" strokeWidth="3" fill="none" opacity="0.9">
        {animated && (
          <animate attributeName="stroke-dasharray" values="0 60;30 30;60 0" dur="2s" repeatCount="indefinite" />
        )}
      </path>
      
      <path d="M165 40 Q185 35 215 40" stroke="url(#connectionGlow)" strokeWidth="3" fill="none" opacity="0.9">
        {animated && (
          <animate attributeName="stroke-dasharray" values="0 60;30 30;60 0" dur="2s" begin="0.5s" repeatCount="indefinite" />
        )}
      </path>
    </g>

    {/* Central Security Shield */}
    <g transform="translate(150, 40)">
      <circle cx="0" cy="0" r="20" fill="url(#shieldGradient)" filter="url(#premiumGlow)" opacity="0.95">
        {animated && <animate attributeName="opacity" values="0.9;1;0.9" dur="2s" repeatCount="indefinite" />}
      </circle>
      
      {/* Shield Shape */}
      <path d="M0 -12 L-8 -6 L-8 4 Q-8 8 0 12 Q8 8 8 4 L8 -6 Z" fill="white" opacity="0.9" />
      
      {/* Lock Icon */}
      <rect x="-3" y="-2" width="6" height="6" rx="1" fill="#10B981" />
      <path d="M-2 -2 Q-2 -5 0 -5 Q2 -5 2 -2" stroke="#10B981" strokeWidth="1.5" fill="none" />
      
      {/* Security Particles */}
      {animated && (
        <g>
          {[...Array(6)].map((_, i) => (
            <circle
              key={i}
              cx={Math.cos(i * Math.PI / 3) * 15}
              cy={Math.sin(i * Math.PI / 3) * 15}
              r="1.5"
              fill="#10B981"
              opacity="0.7"
            >
              <animate
                attributeName="opacity"
                values="0;1;0"
                dur="2s"
                begin={`${i * 0.3}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </g>
      )}
      
      <text x="0" y="35" textAnchor="middle" fontSize="8" fontWeight="600" fill="#10B981">Secure Bridge</text>
    </g>

    {/* OPPB Icon - Right */}
    <g transform="translate(240, 40)">
      {/* App Icon Background */}
      <rect x="-18" y="-18" width="36" height="36" rx="8" fill="url(#oppbGradient)" filter="url(#softShadow)">
        {animated && <animateTransform attributeName="transform" type="scale" values="1;1.05;1" dur="2.5s" begin="1s" repeatCount="indefinite" />}
      </rect>
      
      {/* OPPB Logo - Premium Diamond */}
      <g>
        <path d="M0 -10 L8 0 L0 10 L-8 0 Z" fill="white" opacity="0.95" />
        <circle cx="0" cy="0" r="4" fill="url(#oppbGradient)" />
        <text x="0" y="2" textAnchor="middle" fontSize="3" fontWeight="bold" fill="white">O</text>
      </g>
      
      {/* App Name */}
      <rect x="-12" y="5" width="24" height="6" rx="1" fill="white" opacity="0.9" />
      <text x="0" y="9" textAnchor="middle" fontSize="3" fontWeight="bold" fill="#8B5CF6">OPPB</text>
      
      {/* App Label */}
      <text x="0" y="32" textAnchor="middle" fontSize="9" fontWeight="600" fill="#8B5CF6">OPPB</text>
    </g>

    {/* Connection Success Indicators */}
    <g>
      <circle cx="100" cy="25" r="6" fill="url(#shieldGradient)" opacity="0.9">
        {animated && <animate attributeName="opacity" values="0;1;1" dur="1s" begin="1s" fill="freeze" />}
      </circle>
      <path d="M97 25 L99 27 L103 22" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {animated && <animate attributeName="opacity" values="0;1;1" dur="1s" begin="1.2s" fill="freeze" />}
      </path>
      
      <circle cx="200" cy="25" r="6" fill="url(#shieldGradient)" opacity="0.9">
        {animated && <animate attributeName="opacity" values="0;1;1" dur="1s" begin="1.5s" fill="freeze" />}
      </circle>
      <path d="M197 25 L199 27 L203 22" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {animated && <animate attributeName="opacity" values="0;1;1" dur="1s" begin="1.7s" fill="freeze" />}
      </path>
    </g>

    {/* Floating Security Elements */}
    {animated && (
      <g opacity="0.6">
        <circle cx="120" cy="15" r="1" fill="#10B981">
          <animate attributeName="cy" values="15;10;15" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="180" cy="15" r="1" fill="#10B981">
          <animate attributeName="cy" values="15;10;15" dur="3s" begin="1s" repeatCount="indefinite" />
        </circle>
        <circle cx="130" cy="65" r="1" fill="#8B5CF6">
          <animate attributeName="cy" values="65;70;65" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="170" cy="65" r="1" fill="#8B5CF6">
          <animate attributeName="cy" values="65;70;65" dur="2.5s" begin="0.5s" repeatCount="indefinite" />
        </circle>
      </g>
    )}
  </svg>
);