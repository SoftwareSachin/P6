// Apple Pay Premium Interface Components - Redesigned for Apple Pay Standards

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { ApplePayQRCodeSVG, ApplePaySendMoneySVG, ApplePayContactlessSVG, ApplePayWalletSVG, ApplePayTransitSVG, ApplePayMerchantSVG, ApplePaySecuritySVG, ApplePayBiometricSVG } from "@/components/ApplePaySVGs";

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
      title: "Merchants",
      subtitle: "Near You",
      icon: ApplePayMerchantSVG,
      href: "/merchants",
      gradient: "linear-gradient(135deg, #64D2FF 0%, #007AFF 100%)",
      glowColor: "rgba(100, 210, 255, 0.3)",
      description: "Find nearby stores"
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
            className="group relative overflow-hidden border-0 cursor-pointer ultra-premium-card"
            style={{
              background: action.id === 4 ? `
                linear-gradient(135deg, 
                  rgba(255,255,255,0.25) 0%, 
                  rgba(255,255,255,0.12) 25%, 
                  rgba(255,255,255,0.08) 50%, 
                  rgba(0,0,0,0.05) 75%, 
                  rgba(0,0,0,0.15) 100%
                ),
                ${action.gradient},
                radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 70%)
              ` : `
                linear-gradient(135deg, 
                  rgba(255,255,255,0.15) 0%, 
                  rgba(255,255,255,0.05) 25%, 
                  transparent 50%, 
                  rgba(0,0,0,0.05) 75%, 
                  rgba(0,0,0,0.1) 100%
                ),
                ${action.gradient}
              `,
              backdropFilter: action.id === 4 ? 'blur(30px) saturate(1.8)' : 'blur(20px)',
              WebkitBackdropFilter: action.id === 4 ? 'blur(30px) saturate(1.8)' : 'blur(20px)',
              border: action.id === 4 ? '1.5px solid rgba(255,255,255,0.35)' : '1px solid rgba(255,255,255,0.2)',
              boxShadow: action.id === 4 ? `
                0 16px 48px rgba(191, 90, 242, 0.25),
                0 8px 24px rgba(175, 82, 222, 0.15),
                0 4px 16px rgba(0,0,0,0.12),
                inset 0 2px 4px rgba(255,255,255,0.25),
                inset 0 -2px 4px rgba(0,0,0,0.15),
                0 0 0 1px rgba(191, 90, 242, 0.1)
              ` : `
                0 8px 32px rgba(0,0,0,0.12),
                0 4px 16px rgba(0,0,0,0.08),
                inset 0 1px 0 rgba(255,255,255,0.2),
                inset 0 -1px 0 rgba(0,0,0,0.1)
              `,
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: 'translateZ(0) scale(1)',
              willChange: 'transform, box-shadow, filter'
            }}
          >
            <CardContent className="p-5 relative z-10 h-[120px] flex flex-col justify-center">
              <div className="flex flex-col items-center text-center space-y-2">
                {/* Ultra-Premium Icon Container */}
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center icon-container group-hover:scale-110 transition-all duration-300"
                  style={{
                    background: action.id === 4 ? `
                      linear-gradient(135deg, 
                        rgba(255,255,255,0.35) 0%, 
                        rgba(255,255,255,0.25) 30%, 
                        rgba(255,255,255,0.15) 70%, 
                        rgba(255,255,255,0.1) 100%
                      ),
                      radial-gradient(circle at 25% 25%, rgba(255,255,255,0.4) 0%, transparent 60%)
                    ` : `
                      linear-gradient(135deg, 
                        rgba(255,255,255,0.25) 0%, 
                        rgba(255,255,255,0.15) 50%, 
                        rgba(255,255,255,0.1) 100%
                      )
                    `,
                    backdropFilter: action.id === 4 ? 'blur(20px) saturate(1.5)' : 'blur(15px)',
                    WebkitBackdropFilter: action.id === 4 ? 'blur(20px) saturate(1.5)' : 'blur(15px)',
                    border: action.id === 4 ? '1.5px solid rgba(255,255,255,0.4)' : '1px solid rgba(255,255,255,0.3)',
                    boxShadow: action.id === 4 ? `
                      0 8px 24px rgba(191, 90, 242, 0.2),
                      0 4px 16px rgba(0,0,0,0.15),
                      inset 0 2px 4px rgba(255,255,255,0.5),
                      inset 0 -2px 4px rgba(0,0,0,0.15),
                      0 0 20px rgba(191, 90, 242, 0.1)
                    ` : `
                      0 4px 16px rgba(0,0,0,0.15),
                      inset 0 1px 0 rgba(255,255,255,0.4),
                      inset 0 -1px 0 rgba(0,0,0,0.1)
                    `
                  }}
                >
                  <action.icon className={action.id === 4 ? "w-8 h-8 text-white drop-shadow-xl" : "w-7 h-7 text-white drop-shadow-lg"} />
                </div>
                
                {/* Premium Text with SF Pro Typography */}
                <div className="space-y-0.5">
                  <h3 
                    className={action.id === 4 ? "text-white font-bold text-base leading-tight tracking-tight" : "text-white font-semibold text-base leading-tight"}
                    style={{ 
                      fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                      textShadow: action.id === 4 ? '0 2px 4px rgba(0,0,0,0.4), 0 4px 8px rgba(191,90,242,0.2)' : '0 1px 2px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.15)',
                      letterSpacing: action.id === 4 ? '-0.02em' : 'normal'
                    }}
                  >
                    {action.title}
                  </h3>
                  <p 
                    className={action.id === 4 ? "text-white/85 text-sm font-semibold leading-tight" : "text-white/75 text-sm font-medium leading-tight"}
                    style={{ 
                      fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                      textShadow: action.id === 4 ? '0 1px 3px rgba(0,0,0,0.3), 0 2px 6px rgba(191,90,242,0.15)' : '0 1px 2px rgba(0,0,0,0.2)',
                      letterSpacing: action.id === 4 ? '-0.01em' : 'normal'
                    }}
                  >
                    {action.subtitle}
                  </p>
                </div>
              </div>
            </CardContent>
            
            {/* Advanced Shimmer Effect */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
              style={{
                background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.6) 50%, transparent 70%)',
                animation: 'shimmer 2s infinite'
              }}
            />
            
            {/* Premium Light Reflection */}
            <div 
              className="absolute top-0 left-0 w-full h-[2px] opacity-60"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
                borderRadius: '1px'
              }}
            />
            
            {/* Interactive Glow Effect */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-all duration-300"
              style={{
                background: `radial-gradient(circle at center, ${action.glowColor} 0%, transparent 70%)`,
                filter: 'blur(12px)'
              }}
            />
            
            {/* Depth Shadow Enhancement */}
            <div 
              className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                boxShadow: `
                  0 16px 48px rgba(0,0,0,0.2),
                  0 8px 24px ${action.glowColor},
                  0 4px 12px ${action.glowColor},
                  0 0 0 1px rgba(255,255,255,0.1)
                `
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