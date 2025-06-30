import React from 'react';

// Premium SVG Components for OPPB - Material Design 3.0 Expressive
export const OPPBLogoSVG = ({ className = "w-20 h-20", animated = false }: { className?: string, animated?: boolean }) => (
  <svg className={className} viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="premiumLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#A855F7" />
        <stop offset="25%" stopColor="#8B5CF6" />
        <stop offset="50%" stopColor="#7C3AED" />
        <stop offset="75%" stopColor="#6366F1" />
        <stop offset="100%" stopColor="#4F46E5" />
      </linearGradient>
      <linearGradient id="metallicGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F8FAFC" />
        <stop offset="25%" stopColor="#E2E8F0" />
        <stop offset="50%" stopColor="#CBD5E1" />
        <stop offset="75%" stopColor="#94A3B8" />
        <stop offset="100%" stopColor="#64748B" />
      </linearGradient>
      <filter id="premiumGlow">
        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <filter id="glassEffect">
        <feGaussianBlur in="SourceGraphic" stdDeviation="1"/>
        <feOffset dx="0" dy="2" result="offset"/>
        <feFlood floodColor="#ffffff" floodOpacity="0.3"/>
        <feComposite in2="offset" operator="in"/>
      </filter>
    </defs>
    
    {/* Premium Background with Glassmorphism */}
    <circle cx="60" cy="60" r="52" fill="url(#premiumLogoGradient)" filter="url(#premiumGlow)" 
            className={animated ? "animate-pulse-premium" : ""} />
    <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
    <circle cx="60" cy="60" r="48" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
    
    {/* Premium OPPB Typography */}
    <g transform="translate(15, 35)" filter="url(#glassEffect)">
      {/* O - Refined Circle */}
      <circle cx="15" cy="15" r="12" fill="none" stroke="url(#metallicGradient)" strokeWidth="3" />
      <circle cx="15" cy="15" r="7" fill="rgba(255,255,255,0.95)" />
      <circle cx="15" cy="15" r="3" fill="url(#premiumLogoGradient)" />
      
      {/* P - Modern Geometric */}
      <rect x="35" y="5" width="3" height="20" fill="url(#metallicGradient)" rx="1.5" />
      <rect x="35" y="5" width="12" height="3" fill="url(#metallicGradient)" rx="1.5" />
      <rect x="35" y="13" width="10" height="3" fill="url(#metallicGradient)" rx="1.5" />
      <rect x="44" y="5" width="3" height="8" fill="url(#metallicGradient)" rx="1.5" />
      
      {/* P - Second P */}
      <rect x="55" y="5" width="3" height="20" fill="url(#metallicGradient)" rx="1.5" />
      <rect x="55" y="5" width="12" height="3" fill="url(#metallicGradient)" rx="1.5" />
      <rect x="55" y="13" width="10" height="3" fill="url(#metallicGradient)" rx="1.5" />
      <rect x="64" y="5" width="3" height="8" fill="url(#metallicGradient)" rx="1.5" />
      
      {/* B - Premium Curves */}
      <rect x="75" y="5" width="3" height="20" fill="url(#metallicGradient)" rx="1.5" />
      <path d="M78 5 Q88 5 88 10 Q88 15 83 15 Q88 15 88 20 Q88 25 78 25" 
            fill="none" stroke="url(#metallicGradient)" strokeWidth="3" strokeLinecap="round" />
    </g>
    
    {/* Premium Connection Elements */}
    <g opacity="0.8" transform="translate(60, 60)">
      <path d="M-15 -15 L15 15" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round" />
      <path d="M15 -15 L-15 15" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="0" cy="0" r="4" fill="rgba(255,255,255,0.95)" />
      <circle cx="0" cy="0" r="2" fill="url(#premiumLogoGradient)" />
    </g>
    
    {/* Animated Shine Effect */}
    {animated && (
      <g>
        <rect x="0" y="0" width="120" height="120" fill="url(#shineGradient)" opacity="0.3">
          <animateTransform attributeName="transform" type="translate" 
            values="-120 0;120 0;-120 0" dur="3s" repeatCount="indefinite" />
        </rect>
        <defs>
          <linearGradient id="shineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.3)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </g>
    )}
  </svg>
);

export const SecureShieldSVG = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
    </defs>
    
    <path d="M40 10 L60 20 L60 45 Q60 60 40 70 Q20 60 20 45 L20 20 Z" 
          fill="url(#shieldGradient)" className="animate-pulse-glow" />
    
    <path d="M30 38 L36 44 L52 28" stroke="white" strokeWidth="3" fill="none" 
          strokeLinecap="round" strokeLinejoin="round" className="animate-scale-in" />
  </svg>
);

export const OfflineNetworkSVG = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="offlineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#EF4444" />
      </linearGradient>
    </defs>
    
    {/* Phone Devices */}
    <rect x="15" y="25" width="18" height="30" rx="4" fill="url(#offlineGradient)" />
    <rect x="47" y="25" width="18" height="30" rx="4" fill="url(#offlineGradient)" />
    
    {/* Bluetooth Connection Lines */}
    <g className="animate-pulse">
      <path d="M33 35 Q40 30 47 35" stroke="white" strokeWidth="2" fill="none" opacity="0.8" />
      <path d="M33 40 Q40 35 47 40" stroke="white" strokeWidth="2" fill="none" opacity="0.6" />
      <path d="M33 45 Q40 40 47 45" stroke="white" strokeWidth="2" fill="none" opacity="0.8" />
    </g>
    
    {/* Signal Dots */}
    <circle cx="24" cy="30" r="2" fill="white" className="animate-ping" />
    <circle cx="56" cy="30" r="2" fill="white" className="animate-ping" style={{ animationDelay: '0.5s' }} />
  </svg>
);

export const InstantPaymentSVG = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="speedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#6366F1" />
      </linearGradient>
    </defs>
    
    {/* Lightning Bolt */}
    <path d="M35 15 L25 35 L35 35 L30 55 L50 30 L40 30 L45 15 Z" 
          fill="url(#speedGradient)" className="animate-pulse-glow" />
    
    {/* Speed Lines */}
    <g className="animate-shimmer">
      <line x1="55" y1="25" x2="65" y2="25" stroke="url(#speedGradient)" strokeWidth="2" opacity="0.6" />
      <line x1="55" y1="35" x2="70" y2="35" stroke="url(#speedGradient)" strokeWidth="2" opacity="0.8" />
      <line x1="55" y1="45" x2="65" y2="45" stroke="url(#speedGradient)" strokeWidth="2" opacity="0.6" />
    </g>
  </svg>
);

export const GlobalNetworkSVG = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="globalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#EC4899" />
      </linearGradient>
    </defs>
    
    {/* Globe */}
    <circle cx="40" cy="40" r="25" fill="none" stroke="url(#globalGradient)" strokeWidth="3" />
    
    {/* Longitude Lines */}
    <ellipse cx="40" cy="40" rx="25" ry="15" fill="none" stroke="url(#globalGradient)" strokeWidth="2" opacity="0.6" />
    <ellipse cx="40" cy="40" rx="15" ry="25" fill="none" stroke="url(#globalGradient)" strokeWidth="2" opacity="0.6" />
    
    {/* Network Nodes */}
    <circle cx="25" cy="30" r="3" fill="url(#globalGradient)" className="animate-pulse" />
    <circle cx="55" cy="35" r="3" fill="url(#globalGradient)" className="animate-pulse" style={{ animationDelay: '0.3s' }} />
    <circle cx="30" cy="55" r="3" fill="url(#globalGradient)" className="animate-pulse" style={{ animationDelay: '0.6s' }} />
    <circle cx="50" cy="50" r="3" fill="url(#globalGradient)" className="animate-pulse" style={{ animationDelay: '0.9s' }} />
    
    {/* Connection Lines */}
    <g className="animate-pulse" style={{ animationDelay: '1s' }}>
      <line x1="25" y1="30" x2="55" y2="35" stroke="url(#globalGradient)" strokeWidth="1" opacity="0.5" />
      <line x1="55" y1="35" x2="50" y2="50" stroke="url(#globalGradient)" strokeWidth="1" opacity="0.5" />
      <line x1="30" y1="55" x2="50" y2="50" stroke="url(#globalGradient)" strokeWidth="1" opacity="0.5" />
    </g>
  </svg>
);

export const BiometricSecuritySVG = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="biometricGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366F1" />
        <stop offset="100%" stopColor="#8B5CF6" />
      </linearGradient>
    </defs>
    
    {/* Fingerprint Pattern */}
    <g fill="none" stroke="url(#biometricGradient)" strokeWidth="2" className="animate-pulse-glow">
      <ellipse cx="40" cy="40" rx="8" ry="12" />
      <ellipse cx="40" cy="40" rx="13" ry="18" />
      <ellipse cx="40" cy="40" rx="18" ry="24" />
      <ellipse cx="40" cy="40" rx="23" ry="30" />
    </g>
    
    {/* Scan Line */}
    <line x1="15" y1="40" x2="65" y2="40" stroke="white" strokeWidth="2" opacity="0.8" 
          className="animate-scan-premium" />
  </svg>
);

export const MoneyTransferSVG = ({ className = "w-20 h-20" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="transferGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
    </defs>
    
    {/* Money Symbol */}
    <circle cx="50" cy="50" r="20" fill="url(#transferGradient)" className="animate-pulse-glow" />
    <text x="50" y="58" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">₹</text>
    
    {/* Transfer Arrows */}
    <g className="animate-float">
      <path d="M20 30 L35 30 L30 25 M35 30 L30 35" stroke="url(#transferGradient)" 
            strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M80 70 L65 70 L70 75 M65 70 L70 65" stroke="url(#transferGradient)" 
            strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
    
    {/* Dots indicating movement */}
    <circle cx="25" cy="35" r="2" fill="url(#transferGradient)" className="animate-ping" />
    <circle cx="75" cy="65" r="2" fill="url(#transferGradient)" className="animate-ping" style={{ animationDelay: '0.5s' }} />
  </svg>
);

export const PremiumCardSVG = ({ className = "w-24 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366F1" />
        <stop offset="50%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
      <filter id="cardShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="rgba(99, 102, 241, 0.3)"/>
      </filter>
    </defs>
    
    {/* Card Body */}
    <rect x="10" y="10" width="100" height="60" rx="8" fill="url(#cardGradient)" 
          filter="url(#cardShadow)" className="animate-float" />
    
    {/* Chip */}
    <rect x="20" y="25" width="12" height="10" rx="2" fill="rgba(255, 255, 255, 0.9)" />
    <rect x="22" y="27" width="8" height="6" rx="1" fill="rgba(99, 102, 241, 0.3)" />
    
    {/* Card Number */}
    <g fill="rgba(255, 255, 255, 0.8)">
      <rect x="20" y="45" width="8" height="3" rx="1" />
      <rect x="30" y="45" width="8" height="3" rx="1" />
      <rect x="40" y="45" width="8" height="3" rx="1" />
      <rect x="50" y="45" width="8" height="3" rx="1" />
    </g>
    
    {/* OPPB Logo */}
    <text x="85" y="30" fill="white" fontSize="8" fontWeight="bold">OPPB</text>
    
    {/* Wireless Symbol */}
    <g transform="translate(85, 40)" className="animate-pulse">
      <path d="M0 8 Q4 0 8 8" stroke="white" strokeWidth="1" fill="none" opacity="0.7" />
      <path d="M2 8 Q4 4 6 8" stroke="white" strokeWidth="1" fill="none" opacity="0.9" />
      <circle cx="4" cy="8" r="0.8" fill="white" />
    </g>
  </svg>
);