// Apple Pay Premium Interface Components - Redesigned for Apple Pay Standards

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { ApplePayQRCodeSVG, ApplePaySendMoneySVG, ApplePayContactlessSVG, ApplePayWalletSVG, ApplePayTransitSVG, ApplePayMerchantSVG, ApplePaySecuritySVG, ApplePayBiometricSVG } from "@/components/ApplePaySVGs";
import { ApplePayDTHSVG, ApplePayBillsSVG } from "@/components/DTHBillsSVGs";

// Premium RWA Tokenization SVG
const ApplePayRWASVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="rwaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="50%" stopColor="#FFA500" />
        <stop offset="100%" stopColor="#FF8C00" />
      </linearGradient>
      <filter id="rwaGlow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <rect x="4" y="6" width="16" height="12" rx="3" fill="url(#rwaGradient)" filter="url(#rwaGlow)"/>
    <rect x="6" y="8" width="12" height="8" rx="2" fill="rgba(255,255,255,0.2)"/>
    <circle cx="8" cy="10" r="1" fill="currentColor"/>
    <circle cx="12" cy="10" r="1" fill="currentColor"/>
    <circle cx="16" cy="10" r="1" fill="currentColor"/>
    <rect x="7" y="13" width="10" height="1" rx="0.5" fill="rgba(255,255,255,0.5)"/>
    <rect x="9" y="15" width="6" height="1" rx="0.5" fill="rgba(255,255,255,0.3)"/>
    <circle cx="20" cy="4" r="3" fill="#10B981" opacity="0.9"/>
    <path d="M19 3 L20.5 4.5 L22 3" stroke="white" strokeWidth="1" fill="none"/>
  </svg>
);

// Premium Trading/Stocks SVG
const ApplePayTradingSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="tradingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00C851" />
        <stop offset="50%" stopColor="#007E33" />
        <stop offset="100%" stopColor="#004D20" />
      </linearGradient>
      <filter id="tradingGlow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <rect x="2" y="8" width="20" height="12" rx="3" fill="url(#tradingGradient)" filter="url(#tradingGlow)" opacity="0.9"/>
    <rect x="4" y="10" width="16" height="8" rx="2" fill="rgba(255,255,255,0.15)"/>
    
    {/* Chart lines */}
    <path d="M6 16 L8 14 L10 15 L12 12 L14 13 L16 10 L18 11" stroke="#FFFFFF" strokeWidth="1.5" fill="none" opacity="0.9"/>
    <circle cx="6" cy="16" r="1" fill="#FFFFFF"/>
    <circle cx="8" cy="14" r="1" fill="#FFFFFF"/>
    <circle cx="10" cy="15" r="1" fill="#FFFFFF"/>
    <circle cx="12" cy="12" r="1" fill="#FFFFFF"/>
    <circle cx="14" cy="13" r="1" fill="#FFFFFF"/>
    <circle cx="16" cy="10" r="1" fill="#FFFFFF"/>
    <circle cx="18" cy="11" r="1" fill="#FFFFFF"/>
    
    {/* Arrow indicator */}
    <polygon points="19,4 21,6 19,8" fill="#00C851" opacity="0.8"/>
    <rect x="17" y="5" width="2" height="2" fill="#00C851" opacity="0.6"/>
  </svg>
);

// Apple Pay Style Quick Actions Grid
export const ApplePayQuickActions = () => {
  const quickActions = [
    {
      id: 1,
      title: "Scan QR",
      subtitle: "Instant Pay",
      icon: ApplePayQRCodeSVG,
      href: "/qr-scanner",
      gradient: "linear-gradient(135deg, #007AFF 0%, #5856D6 100%)",
      glowColor: "rgba(0, 122, 255, 0.3)",
      description: "Scan and pay instantly"
    },
    {
      id: 2,
      title: "Send Money",
      subtitle: "To Anyone",
      icon: ApplePaySendMoneySVG,
      href: "/send-money",
      gradient: "linear-gradient(135deg, #30D158 0%, #00C896 100%)",
      glowColor: "rgba(48, 209, 88, 0.3)",
      description: "Transfer to contacts"
    },
    {
      id: 3,
      title: "Tap to Pay",
      subtitle: "Contactless",
      icon: ApplePayContactlessSVG,
      href: "/offline-payments",
      gradient: "linear-gradient(135deg, #FF9F0A 0%, #FF6B35 100%)",
      glowColor: "rgba(255, 159, 10, 0.3)",
      description: "Pay without internet"
    },
    {
      id: 4,
      title: "My Wallet",
      subtitle: "Cards & Passes",
      icon: ApplePayWalletSVG,
      href: "/wallet",
      gradient: "linear-gradient(135deg, #BF5AF2 0%, #AF52DE 50%, #8E44AD 80%, #7D3C98 100%)",
      glowColor: "rgba(191, 90, 242, 0.4)",
      description: "Manage payment methods"
    },
    {
      id: 5,
      title: "Transit",
      subtitle: "Metro & Bus",
      icon: ApplePayTransitSVG,
      href: "/transit",
      gradient: "linear-gradient(135deg, #FF375F 0%, #FF3B30 100%)",
      glowColor: "rgba(255, 55, 95, 0.3)",
      description: "Public transportation"
    },
    {
      id: 6,
      title: "DTH Recharge",
      subtitle: "TV & Satellite",
      icon: ApplePayDTHSVG,
      href: "/dth",
      gradient: "linear-gradient(135deg, #007AFF 0%, #5856D6 50%, #AF52DE 100%)",
      glowColor: "rgba(0, 122, 255, 0.4)",
      description: "Recharge your DTH"
    },
    {
      id: 7,
      title: "Pay Bills",
      subtitle: "Utilities & More",
      icon: ApplePayBillsSVG,
      href: "/bills",
      gradient: "linear-gradient(135deg, #30D158 0%, #00C896 50%, #007AFF 100%)",
      glowColor: "rgba(48, 209, 88, 0.4)",
      description: "Pay all your bills"
    },
    {
      id: 8,
      title: "Stock Trading",
      subtitle: "Buy & Sell Stocks",
      icon: ApplePayTradingSVG,
      href: "/trading",
      gradient: "linear-gradient(135deg, #00C851 0%, #007E33 50%, #004D20 100%)",
      glowColor: "rgba(0, 200, 81, 0.4)",
      description: "Trade stocks and investments"
    },
    {
      id: 9,
      title: "RWA Tokens",
      subtitle: "Asset Investment",
      icon: ApplePayRWASVG,
      href: "/rwa",
      gradient: "linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%)",
      glowColor: "rgba(255, 215, 0, 0.4)",
      description: "Tokenized real assets"
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-4 px-6">
      {quickActions.map((action, index) => (
        <Link 
          key={action.id} 
          href={action.href}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <Card
            className="group relative overflow-hidden border-0 cursor-pointer apple-pay-button ultra-premium-card hover:scale-105 active:scale-95 transition-all duration-300"
            style={{
              background: `
                linear-gradient(135deg, 
                  rgba(255,255,255,0.2) 0%, 
                  rgba(255,255,255,0.1) 100%
                ),
                ${action.gradient}
              `,
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '24px',
              boxShadow: `
                0 12px 24px rgba(0, 0, 0, 0.3),
                0 8px 16px ${action.glowColor},
                0 4px 8px rgba(0,0,0,0.2),
                inset 0 1px 0 rgba(255,255,255,0.2)
              `,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: 'translateZ(0)',
              willChange: 'transform, box-shadow'
            }}
          >
            <CardContent className="p-5 relative z-10 h-[120px] flex flex-col justify-center">
              <div className="flex flex-col items-center text-center space-y-2">
                {/* Apple Pay Icon Container */}
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center icon-container group-hover:scale-110 transition-all duration-300"
                  style={{
                    background: `
                      linear-gradient(135deg, 
                        rgba(255,255,255,0.3) 0%, 
                        rgba(255,255,255,0.2) 50%, 
                        rgba(255,255,255,0.1) 100%
                      )
                    `,
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.4)',
                    boxShadow: `
                      0 4px 12px rgba(0,0,0,0.15),
                      inset 0 1px 0 rgba(255,255,255,0.5),
                      inset 0 -1px 0 rgba(0,0,0,0.1)
                    `
                  }}
                >
                  <action.icon className="w-6 h-6 text-white drop-shadow-lg" />
                </div>
                
                {/* Apple Pay Typography */}
                <div className="space-y-0.5">
                  <h3 
                    className="text-white font-semibold text-base leading-tight"
                    style={{ 
                      fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                      textShadow: '0 1px 3px rgba(0,0,0,0.4)',
                      letterSpacing: '-0.01em'
                    }}
                  >
                    {action.title}
                  </h3>
                  <p 
                    className="text-white/80 text-sm font-medium leading-tight"
                    style={{ 
                      fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                      textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                    }}
                  >
                    {action.subtitle}
                  </p>
                </div>
              </div>
            </CardContent>
            
            {/* Apple Pay Hover Effect */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-3xl"
              style={{
                background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)'
              }}
            />
          </Card>
        </Link>
      ))}
    </div>
  );
};

// Apple Pay Style Card Carousel
export const ApplePayCardCarousel = ({ cards, selectedCard, onCardSelect }: any) => {
  return (
    <div className="px-6">
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
        {cards.map((card: any, index: number) => (
          <div
            key={card.id}
            className={`min-w-[280px] snap-center transition-all duration-500 ${
              selectedCard === index ? 'scale-105 z-10' : 'scale-95 opacity-80'
            }`}
            onClick={() => onCardSelect(index)}
          >
            <Card 
              className="relative overflow-hidden border-0 shadow-2xl cursor-pointer"
              style={{ 
                background: card.gradient,
                transform: `perspective(1000px) rotateY(${selectedCard === index ? '0deg' : '5deg'})`,
                transformStyle: 'preserve-3d'
              }}
            >
              <CardContent className="p-6 h-44 relative">
                {/* Card Type & Logo */}
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <p className="text-white/90 text-sm font-medium">{card.type}</p>
                    <p className="text-white/70 text-xs">{card.cardNumber}</p>
                  </div>
                  <div className="text-white font-bold text-lg bg-white/20 px-3 py-1 rounded-lg backdrop-blur-sm">
                    {card.logo}
                  </div>
                </div>

                {/* Balance */}
                <div className="absolute bottom-6 left-6">
                  <p className="text-white/80 text-sm font-medium">Balance</p>
                  <p className="text-white text-2xl font-bold">₹{card.balance.toLocaleString()}</p>
                </div>

                {/* Default Card Indicator */}
                {card.isDefault && (
                  <Badge className="absolute top-4 right-4 bg-white/20 text-white border-white/30 backdrop-blur-sm">
                    Default
                  </Badge>
                )}

                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 opacity-10">
                  <div className="w-full h-full bg-gradient-to-br from-white/20 via-transparent to-black/20" />
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

// Apple Pay Style Transaction Row
export const ApplePayTransactionRow = ({ transaction }: any) => {
  const IconComponent = transaction.icon;
  
  return (
    <div className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/20 flex items-center justify-center backdrop-blur-sm">
          <IconComponent className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-white font-semibold text-base">{transaction.merchant}</p>
          <div className="flex items-center space-x-2">
            <p className="text-gray-400 text-sm">{transaction.time}</p>
            <div className="w-1 h-1 bg-gray-500 rounded-full" />
            <p className="text-gray-400 text-sm">{transaction.category}</p>
          </div>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-bold text-lg ${
          transaction.amount > 0 ? 'text-green-400' : 'text-white'
        }`}>
          {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
        </p>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${
            transaction.status === 'success' ? 'bg-green-500' : 
            transaction.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
          }`} />
          <p className="text-gray-400 text-xs capitalize">{transaction.status}</p>
        </div>
      </div>
    </div>
  );
};