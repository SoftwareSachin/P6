export const PremiumCubeSVG = ({ className = "w-20 h-20", animated = false }: { className?: string, animated?: boolean }) => (
  <svg viewBox="0 0 120 120" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      {/* Premium Gradients */}
      <linearGradient id="cubeTopGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B7CF6" stopOpacity="1"/>
        <stop offset="30%" stopColor="#7C3AED" stopOpacity="0.95"/>
        <stop offset="70%" stopColor="#6366F1" stopOpacity="0.9"/>
        <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.85"/>
      </linearGradient>
      
      <linearGradient id="cubeLeftGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366F1" stopOpacity="0.9"/>
        <stop offset="50%" stopColor="#4F46E5" stopOpacity="0.8"/>
        <stop offset="100%" stopColor="#3730A3" stopOpacity="0.7"/>
      </linearGradient>
      
      <linearGradient id="cubeRightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.8"/>
        <stop offset="50%" stopColor="#3730A3" stopOpacity="0.7"/>
        <stop offset="100%" stopColor="#1E1B4B" stopOpacity="0.6"/>
      </linearGradient>

      {/* Inner Cube Gradients */}
      <linearGradient id="innerCubeTop" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.9"/>
        <stop offset="50%" stopColor="#2563EB" stopOpacity="0.8"/>
        <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.7"/>
      </linearGradient>
      
      <linearGradient id="innerCubeLeft" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2563EB" stopOpacity="0.8"/>
        <stop offset="50%" stopColor="#1D4ED8" stopOpacity="0.7"/>
        <stop offset="100%" stopColor="#1E40AF" stopOpacity="0.6"/>
      </linearGradient>
      
      <linearGradient id="innerCubeRight" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1D4ED8" stopOpacity="0.7"/>
        <stop offset="50%" stopColor="#1E40AF" stopOpacity="0.6"/>
        <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0.5"/>
      </linearGradient>

      {/* Premium Lighting Effects */}
      <radialGradient id="topHighlight" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.4)" stopOpacity="1"/>
        <stop offset="50%" stopColor="rgba(255,255,255,0.2)" stopOpacity="0.5"/>
        <stop offset="100%" stopColor="rgba(255,255,255,0)" stopOpacity="0"/>
      </radialGradient>

      {/* Premium Shadows and Filters */}
      <filter id="premiumShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#1E1B4B" floodOpacity="0.3"/>
        <feDropShadow dx="0" dy="12" stdDeviation="24" floodColor="#1E1B4B" floodOpacity="0.2"/>
      </filter>

      <filter id="innerGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>

      {/* Animation Effects */}
      {animated && (
        <>
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 60 60;360 60 60"
            dur="20s"
            repeatCount="indefinite"
          />
        </>
      )}
    </defs>

    {/* Main Outer Cube */}
    <g transform="translate(10, 15)" filter="url(#premiumShadow)">
      {/* Top Face */}
      <path
        d="M50 10 L85 25 L50 40 L15 25 Z"
        fill="url(#cubeTopGradient)"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="0.5"
      >
        {animated && (
          <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
        )}
      </path>
      
      {/* Top Face Highlight */}
      <path
        d="M50 10 L85 25 L50 40 L15 25 Z"
        fill="url(#topHighlight)"
        opacity="0.6"
      />

      {/* Left Face */}
      <path
        d="M15 25 L50 40 L50 75 L15 60 Z"
        fill="url(#cubeLeftGradient)"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="0.5"
      />

      {/* Right Face */}
      <path
        d="M50 40 L85 25 L85 60 L50 75 Z"
        fill="url(#cubeRightGradient)"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="0.5"
      />

      {/* Inner Cube - Smaller and Centered */}
      <g transform="translate(10, 5)">
        {/* Inner Top Face */}
        <path
          d="M40 20 L60 28 L40 36 L20 28 Z"
          fill="url(#innerCubeTop)"
          filter="url(#innerGlow)"
          opacity="0.9"
        >
          {animated && (
            <animate attributeName="opacity" values="0.7;0.9;0.7" dur="2s" repeatCount="indefinite" />
          )}
        </path>

        {/* Inner Left Face */}
        <path
          d="M20 28 L40 36 L40 56 L20 48 Z"
          fill="url(#innerCubeLeft)"
          opacity="0.8"
        />

        {/* Inner Right Face */}
        <path
          d="M40 36 L60 28 L60 48 L40 56 Z"
          fill="url(#innerCubeRight)"
          opacity="0.7"
        />

        {/* Inner Cube Highlight */}
        <path
          d="M40 20 L60 28 L40 36 L20 28 Z"
          fill="rgba(255,255,255,0.3)"
          opacity="0.4"
        />
      </g>

      {/* Premium Edge Lines */}
      <g stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" opacity="0.6">
        <path d="M50 10 L50 40" />
        <path d="M15 25 L50 40" />
        <path d="M85 25 L50 40" />
        <path d="M50 40 L50 75" />
      </g>

      {/* Floating Particles for Premium Effect */}
      {animated && (
        <g>
          {[...Array(6)].map((_, i) => (
            <circle
              key={i}
              cx={30 + (i * 8)}
              cy={20 + (i % 2) * 10}
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
                values={`0,0;0,-${5 + i};0,0`}
                dur={`${3 + i * 0.2}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </g>
      )}
    </g>

    {/* Premium Reflection Effect */}
    <g transform="translate(10, 15)" opacity="0.3">
      <path
        d="M50 75 L85 60 L50 90 L15 75 Z"
        fill="url(#cubeTopGradient)"
        transform="scaleY(-0.3)"
        style={{ transformOrigin: '50px 75px' }}
      />
    </g>
  </svg>
);