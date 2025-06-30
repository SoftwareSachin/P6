export const PremiumPaymentLogoSVG = ({ className = "w-16 h-16", animated = false }: { className?: string, animated?: boolean }) => (
  <svg viewBox="0 0 120 120" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      {/* Ultra-Premium Orange Gradient */}
      <linearGradient id="orangeBladeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF8C00" stopOpacity="1"/>
        <stop offset="15%" stopColor="#FF7F00" stopOpacity="0.98"/>
        <stop offset="35%" stopColor="#FF6B00" stopOpacity="0.95"/>
        <stop offset="55%" stopColor="#FF5722" stopOpacity="0.92"/>
        <stop offset="75%" stopColor="#E65100" stopOpacity="0.9"/>
        <stop offset="90%" stopColor="#D84315" stopOpacity="0.88"/>
        <stop offset="100%" stopColor="#BF360C" stopOpacity="0.85"/>
      </linearGradient>

      {/* Ultra-Premium Green Gradient */}
      <linearGradient id="greenBladeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4CAF50" stopOpacity="1"/>
        <stop offset="15%" stopColor="#43A047" stopOpacity="0.98"/>
        <stop offset="35%" stopColor="#388E3C" stopOpacity="0.95"/>
        <stop offset="55%" stopColor="#2E7D32" stopOpacity="0.92"/>
        <stop offset="75%" stopColor="#1B5E20" stopOpacity="0.9"/>
        <stop offset="90%" stopColor="#0D4F14" stopOpacity="0.88"/>
        <stop offset="100%" stopColor="#0A3F0A" stopOpacity="0.85"/>
      </linearGradient>

      {/* 3D Depth Shadows */}
      <linearGradient id="orangeShadowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(191, 54, 12, 0.4)" stopOpacity="1"/>
        <stop offset="50%" stopColor="rgba(191, 54, 12, 0.6)" stopOpacity="0.8"/>
        <stop offset="100%" stopColor="rgba(191, 54, 12, 0.8)" stopOpacity="0.6"/>
      </linearGradient>

      <linearGradient id="greenShadowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(10, 63, 10, 0.4)" stopOpacity="1"/>
        <stop offset="50%" stopColor="rgba(10, 63, 10, 0.6)" stopOpacity="0.8"/>
        <stop offset="100%" stopColor="rgba(10, 63, 10, 0.8)" stopOpacity="0.6"/>
      </linearGradient>

      {/* Premium Lighting Effects */}
      <radialGradient id="orangeHighlight" cx="25%" cy="25%" r="75%">
        <stop offset="0%" stopColor="rgba(255, 255, 255, 0.6)" stopOpacity="1"/>
        <stop offset="40%" stopColor="rgba(255, 255, 255, 0.3)" stopOpacity="0.7"/>
        <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" stopOpacity="0"/>
      </radialGradient>

      <radialGradient id="greenHighlight" cx="25%" cy="25%" r="75%">
        <stop offset="0%" stopColor="rgba(255, 255, 255, 0.5)" stopOpacity="1"/>
        <stop offset="40%" stopColor="rgba(255, 255, 255, 0.25)" stopOpacity="0.7"/>
        <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" stopOpacity="0"/>
      </radialGradient>

      {/* Premium Filters */}
      <filter id="premiumShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="8" stdDeviation="16" floodColor="rgba(191, 54, 12, 0.3)"/>
        <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="rgba(10, 63, 10, 0.2)"/>
      </filter>

      <filter id="innerGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>

      <filter id="edgeGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2" result="glow"/>
        <feColorMatrix in="glow" values="1 0.5 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    {/* Dynamic Payment Logo Structure */}
    <g transform="translate(10, 10)" filter="url(#premiumShadow)">
      {/* Background Glow Ring */}
      {animated && (
        <circle cx="50" cy="50" r="55" fill="none" stroke="url(#orangeBladeGradient)" strokeWidth="0.8" opacity="0.2">
          <animate attributeName="r" values="50;60;50" dur="5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.1;0.3;0.1" dur="5s" repeatCount="indefinite" />
        </circle>
      )}

      {/* Orange Blade (Left) - Enhanced 3D */}
      <g>
        {animated && (
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 50 50;5 50 50;0 50 50;-3 50 50;0 50 50"
            dur="8s"
            repeatCount="indefinite"
          />
        )}
        
        {/* Main Orange Blade */}
        <path
          d="M25 15 L65 15 L85 55 L45 95 L15 75 Z"
          fill="url(#orangeBladeGradient)"
          stroke="rgba(255, 255, 255, 0.4)"
          strokeWidth="1.2"
          filter="url(#innerGlow)"
        >
          {animated && (
            <>
              <animate attributeName="opacity" values="0.85;1;0.85" dur="4s" repeatCount="indefinite" />
              <animateTransform attributeName="transform" type="scale" values="1;1.02;1" dur="3s" repeatCount="indefinite" />
            </>
          )}
        </path>

        {/* Orange Blade Shadow (3D Depth) */}
        <path
          d="M25 18 L65 18 L85 58 L45 98 L15 78 Z"
          fill="url(#orangeShadowGradient)"
          opacity="0.6"
        />

        {/* Orange Blade Highlight */}
        <path
          d="M25 15 L65 15 L85 55 L45 95 L15 75 Z"
          fill="url(#orangeHighlight)"
          opacity="0.4"
        />

        {/* Orange Edge Definition */}
        <path
          d="M25 15 L65 15 L85 55"
          stroke="rgba(255, 255, 255, 0.6)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.8"
        />
      </g>

      {/* Green Blade (Right) - Enhanced 3D */}
      <g>
        {animated && (
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 50 50;-4 50 50;0 50 50;3 50 50;0 50 50"
            dur="7s"
            repeatCount="indefinite"
          />
        )}
        
        {/* Main Green Blade */}
        <path
          d="M75 5 L95 25 L85 65 L45 95 L65 55 Z"
          fill="url(#greenBladeGradient)"
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth="1.2"
          filter="url(#innerGlow)"
        >
          {animated && (
            <>
              <animate attributeName="opacity" values="0.9;1;0.9" dur="4.5s" repeatCount="indefinite" />
              <animateTransform attributeName="transform" type="scale" values="1;1.03;1" dur="3.5s" repeatCount="indefinite" />
            </>
          )}
        </path>

        {/* Green Blade Shadow (3D Depth) */}
        <path
          d="M75 8 L95 28 L85 68 L45 98 L65 58 Z"
          fill="url(#greenShadowGradient)"
          opacity="0.6"
        />

        {/* Green Blade Highlight */}
        <path
          d="M75 5 L95 25 L85 65 L45 95 L65 55 Z"
          fill="url(#greenHighlight)"
          opacity="0.4"
        />

        {/* Green Edge Definition */}
        <path
          d="M75 5 L95 25 L85 65"
          stroke="rgba(255, 255, 255, 0.5)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.7"
        />
      </g>

      {/* Central Intersection Glow */}
      <circle cx="65" cy="55" r="8" fill="rgba(255, 255, 255, 0.3)" opacity="0.8">
        {animated && (
          <>
            <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2s" repeatCount="indefinite" />
            <animate attributeName="r" values="6;10;6" dur="3s" repeatCount="indefinite" />
          </>
        )}
      </circle>

      {/* Dynamic Floating Particles */}
      {animated && (
        <g>
          {[...Array(12)].map((_, i) => (
            <g key={i}>
              <circle
                cx={20 + (i * 7)}
                cy={20 + (i % 4) * 15}
                r="1.5"
                fill={i % 2 === 0 ? "#FF6B00" : "#43A047"}
                opacity="0.6"
              >
                <animate
                  attributeName="opacity"
                  values="0;0.8;0"
                  dur={`${2.5 + i * 0.3}s`}
                  begin={`${i * 0.2}s`}
                  repeatCount="indefinite"
                />
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values={`0,0;${Math.cos(i) * 12},${Math.sin(i) * 8};0,0`}
                  dur={`${4 + i * 0.2}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="r"
                  values="1;3;1"
                  dur={`${3 + i * 0.15}s`}
                  repeatCount="indefinite"
                />
              </circle>

              {/* Particle Trails */}
              <path
                d={`M${20 + (i * 7)} ${20 + (i % 4) * 15} Q${20 + (i * 7) + 4} ${20 + (i % 4) * 15 - 3} ${20 + (i * 7)} ${20 + (i % 4) * 15 - 6}`}
                stroke={i % 2 === 0 ? "#FF8C00" : "#4CAF50"}
                strokeWidth="0.8"
                fill="none"
                opacity="0.4"
              >
                <animate
                  attributeName="opacity"
                  values="0;0.6;0"
                  dur={`${3.5 + i * 0.2}s`}
                  begin={`${i * 0.3}s`}
                  repeatCount="indefinite"
                />
              </path>
            </g>
          ))}
        </g>
      )}

      {/* Orbital Energy Rings */}
      {animated && (
        <g>
          <circle cx="50" cy="50" r="40" fill="none" stroke="url(#orangeBladeGradient)" strokeWidth="0.6" opacity="0.25" strokeDasharray="3 9">
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 50 50;360 50 50"
              dur="12s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="50" cy="50" r="32" fill="none" stroke="url(#greenBladeGradient)" strokeWidth="0.8" opacity="0.3" strokeDasharray="2 6">
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="360 50 50;0 50 50"
              dur="10s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      )}

      {/* Premium Edge Enhancements */}
      <g stroke="rgba(255, 255, 255, 0.6)" strokeWidth="1" fill="none" opacity="0.5">
        <path d="M25 15 L35 25">
          {animated && <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2.5s" repeatCount="indefinite" />}
        </path>
        <path d="M75 5 L85 15">
          {animated && <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite" />}
        </path>
        <path d="M65 55 L75 45">
          {animated && <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2.8s" repeatCount="indefinite" />}
        </path>
      </g>
    </g>

    {/* Premium Reflection Effect */}
    <g transform="translate(10, 10)" opacity="0.15">
      <path
        d="M25 95 L65 95 L85 75 L45 65 L15 85 Z"
        fill="url(#orangeBladeGradient)"
        transform="scaleY(-0.4)"
        style={{ transformOrigin: '50px 90px' }}
      />
      <path
        d="M75 95 L95 85 L85 75 L45 65 L65 75 Z"
        fill="url(#greenBladeGradient)"
        transform="scaleY(-0.4)"
        style={{ transformOrigin: '50px 90px' }}
      />
    </g>
  </svg>
);