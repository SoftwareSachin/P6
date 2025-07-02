export const IOSMemojiSVG = ({ className = "w-24 h-24" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Face base with gradient */}
    <defs>
      <radialGradient id="faceGradient" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#FFDBAC" />
        <stop offset="100%" stopColor="#F4C2A1" />
      </radialGradient>
      <linearGradient id="hairGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B4513" />
        <stop offset="100%" stopColor="#654321" />
      </linearGradient>
      <radialGradient id="eyeGradient" cx="50%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#4A90E2" />
        <stop offset="100%" stopColor="#2E5BBA" />
      </radialGradient>
    </defs>

    {/* Hair */}
    <path
      d="M25 20 C30 10, 70 10, 75 20 C80 15, 85 25, 80 35 C75 30, 25 30, 20 35 C15 25, 20 15, 25 20 Z"
      fill="url(#hairGradient)"
    />

    {/* Face */}
    <circle cx="50" cy="50" r="25" fill="url(#faceGradient)" />

    {/* Eyes */}
    <ellipse cx="42" cy="45" rx="4" ry="5" fill="white" />
    <ellipse cx="58" cy="45" rx="4" ry="5" fill="white" />
    <circle cx="42" cy="45" r="2.5" fill="url(#eyeGradient)" />
    <circle cx="58" cy="45" r="2.5" fill="url(#eyeGradient)" />
    <circle cx="43" cy="44" r="1" fill="white" opacity="0.8" />
    <circle cx="59" cy="44" r="1" fill="white" opacity="0.8" />

    {/* Eyebrows */}
    <path d="M38 40 Q42 38, 46 40" stroke="#8B4513" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M54 40 Q58 38, 62 40" stroke="#8B4513" strokeWidth="1.5" fill="none" strokeLinecap="round" />

    {/* Nose */}
    <ellipse cx="50" cy="52" rx="1.5" ry="2" fill="#E6B88A" opacity="0.7" />

    {/* Mouth - friendly smile */}
    <path d="M45 58 Q50 62, 55 58" stroke="#C4777D" strokeWidth="2" fill="none" strokeLinecap="round" />

    {/* Cheeks - subtle blush */}
    <circle cx="36" cy="52" r="3" fill="#FFB6C1" opacity="0.4" />
    <circle cx="64" cy="52" r="3" fill="#FFB6C1" opacity="0.4" />

    {/* Modern glasses (optional premium look) */}
    <rect x="38" y="42" width="10" height="8" rx="2" fill="none" stroke="#333" strokeWidth="1.5" opacity="0.8" />
    <rect x="52" y="42" width="10" height="8" rx="2" fill="none" stroke="#333" strokeWidth="1.5" opacity="0.8" />
    <line x1="48" y1="45" x2="52" y2="45" stroke="#333" strokeWidth="1.5" opacity="0.8" />

    {/* Subtle shadow for depth */}
    <ellipse cx="50" cy="70" rx="20" ry="3" fill="#000" opacity="0.1" />
  </svg>
);