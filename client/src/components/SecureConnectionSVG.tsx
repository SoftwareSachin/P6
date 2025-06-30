export const SecureConnectionSVG = ({ className = "w-full h-32", animated = true }: { className?: string, animated?: boolean }) => (
  <svg
    className={className}
    viewBox="0 0 320 100"
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

      {/* Cube Gradients */}
      <linearGradient id="cubeTopGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B7CF6" stopOpacity="1"/>
        <stop offset="50%" stopColor="#7C3AED" stopOpacity="0.9"/>
        <stop offset="100%" stopColor="#6366F1" stopOpacity="0.8"/>
      </linearGradient>
      
      <linearGradient id="cubeLeftGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366F1" stopOpacity="0.8"/>
        <stop offset="50%" stopColor="#4F46E5" stopOpacity="0.7"/>
        <stop offset="100%" stopColor="#3730A3" stopOpacity="0.6"/>
      </linearGradient>
      
      <linearGradient id="cubeRightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.7"/>
        <stop offset="50%" stopColor="#3730A3" stopOpacity="0.6"/>
        <stop offset="100%" stopColor="#1E1B4B" stopOpacity="0.5"/>
      </linearGradient>

      {/* Bank Building Gradients */}
      <linearGradient id="bankBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F8FAFC" stopOpacity="1"/>
        <stop offset="50%" stopColor="#E2E8F0" stopOpacity="0.95"/>
        <stop offset="100%" stopColor="#CBD5E1" stopOpacity="0.9"/>
      </linearGradient>
      
      <linearGradient id="bankRoofGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E2E8F0" stopOpacity="1"/>
        <stop offset="50%" stopColor="#CBD5E1" stopOpacity="0.95"/>
        <stop offset="100%" stopColor="#94A3B8" stopOpacity="0.9"/>
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
    </defs>



    {/* BHIM UPI Icon - Left */}
    <g transform="translate(70, 50)">
      {/* App Icon Background */}
      <rect x="-22" y="-22" width="44" height="44" rx="10" fill="url(#bhimGradient)" filter="url(#softShadow)">
        {animated && <animateTransform attributeName="transform" type="scale" values="1;1.05;1" dur="2.5s" repeatCount="indefinite" />}
      </rect>
      
      {/* Simplified BHIM Logo */}
      <g>
        {/* White background for logo */}
        <rect x="-15" y="-10" width="30" height="20" rx="3" fill="white" opacity="0.95" />
        
        {/* BHIM text in bold */}
        <text x="0" y="-2" textAnchor="middle" fontSize="8" fontWeight="900" fill="#FF6B35" fontFamily="Arial, sans-serif">BHIM</text>
        
        {/* UPI text smaller below */}
        <text x="0" y="5" textAnchor="middle" fontSize="4" fontWeight="700" fill="#FF6B35" fontFamily="Arial, sans-serif">UPI</text>
      </g>
      
      {/* App Label */}
      <text x="0" y="38" textAnchor="middle" fontSize="11" fontWeight="600" fill="#FF6B35">BHIM UPI</text>
    </g>

    {/* Secure Connection Line */}
    <g>
      <path d="M100 50 Q125 45 140 50" stroke="url(#connectionGlow)" strokeWidth="4" fill="none" opacity="0.9">
        {animated && (
          <animate attributeName="stroke-dasharray" values="0 60;30 30;60 0" dur="2s" repeatCount="indefinite" />
        )}
      </path>
      
      <path d="M180 50 Q205 45 225 50" stroke="url(#connectionGlow)" strokeWidth="4" fill="none" opacity="0.9">
        {animated && (
          <animate attributeName="stroke-dasharray" values="0 60;30 30;60 0" dur="2s" begin="0.5s" repeatCount="indefinite" />
        )}
      </path>
    </g>

    {/* Premium Bank Icon - Top Center */}
    <g transform="translate(160, 15)">
      {/* Premium 3D Bank */}
      <g transform="scale(0.4) translate(-50, -60)">
        {/* Main Building Foundation */}
        <rect x="5" y="55" width="90" height="35" rx="2" fill="url(#bankBodyGradient)" stroke="rgba(148, 163, 184, 0.4)" strokeWidth="0.5"/>
        
        {/* Building Steps */}
        <rect x="0" y="75" width="100" height="8" rx="1" fill="url(#bankShadowGradient)"/>

        {/* Triangular Roof */}
        <path
          d="M50 15 L85 40 L15 40 Z"
          fill="url(#bankRoofGradient)"
          stroke="rgba(148, 163, 184, 0.5)"
          strokeWidth="0.8"
        >
          {animated && <animate attributeName="opacity" values="0.85;1;0.85" dur="4s" repeatCount="indefinite" />}
        </path>

        {/* Classical Columns */}
        {[...Array(6)].map((_, i) => (
          <g key={i}>
            <rect
              x={18 + i * 11}
              y="40"
              width="6"
              height="35"
              fill="url(#bankColumnsGradient)"
              stroke="rgba(29, 78, 216, 0.3)"
              strokeWidth="0.3"
            />
            <rect
              x={17 + i * 11}
              y="38"
              width="8"
              height="3"
              rx="1"
              fill="#F1F5F9"
            />
          </g>
        ))}

        {/* Main Entrance */}
        <rect x="45" y="58" width="10" height="17" rx="1" fill="#1E40AF" opacity="0.8"/>
        <circle cx="52" cy="66" r="0.8" fill="#F8FAFC" opacity="0.9"/>
      </g>
      
      <text x="0" y="25" textAnchor="middle" fontSize="6" fontWeight="600" fill="#1F2937">Bank</text>
    </g>

    {/* Vertical Connection from Bank to Shield */}
    <g>
      <path d="M160 20 L160 28" stroke="url(#connectionGlow)" strokeWidth="2" fill="none" opacity="0.8">
        {animated && (
          <animate attributeName="stroke-dasharray" values="0 12;6 6;12 0" dur="1.5s" repeatCount="indefinite" />
        )}
      </path>
    </g>

    {/* Central Security Shield */}
    <g transform="translate(160, 50)">
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
    <g transform="translate(250, 50)">
      {/* Premium 3D Cube Logo */}
      <g transform="scale(0.5) translate(-50, -50)">
        {/* Top Face */}
        <path
          d="M50 10 L85 25 L50 40 L15 25 Z"
          fill="url(#cubeTopGradient)"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="1"
        >
          {animated && <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />}
        </path>
        
        {/* Left Face */}
        <path
          d="M15 25 L50 40 L50 75 L15 60 Z"
          fill="url(#cubeLeftGradient)"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
        />

        {/* Right Face */}
        <path
          d="M50 40 L85 25 L85 60 L50 75 Z"
          fill="url(#cubeRightGradient)"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
        />

        {/* Inner Cube */}
        <g transform="translate(10, 5)">
          <path
            d="M40 20 L60 28 L40 36 L20 28 Z"
            fill="#3B82F6"
            opacity="0.9"
          >
            {animated && <animate attributeName="opacity" values="0.7;0.9;0.7" dur="2s" repeatCount="indefinite" />}
          </path>
          <path
            d="M20 28 L40 36 L40 56 L20 48 Z"
            fill="#2563EB"
            opacity="0.8"
          />
          <path
            d="M40 36 L60 28 L60 48 L40 56 Z"
            fill="#1D4ED8"
            opacity="0.7"
          />
        </g>

        {/* Floating Animation Particles */}
        {animated && (
          <g>
            {[...Array(4)].map((_, i) => (
              <circle
                key={i}
                cx={30 + (i * 15)}
                cy={20 + (i % 2) * 8}
                r="1"
                fill="#8B7CF6"
                opacity="0.6"
              >
                <animate
                  attributeName="opacity"
                  values="0;0.8;0"
                  dur={`${2 + i * 0.3}s`}
                  repeatCount="indefinite"
                />
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values={`0,0;0,-${3 + i};0,0`}
                  dur={`${3 + i * 0.2}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}
          </g>
        )}
      </g>
      
      {/* App Label */}
      <text x="0" y="38" textAnchor="middle" fontSize="11" fontWeight="600" fill="#8B5CF6">OPPB</text>
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