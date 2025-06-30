// Apple Pay Premium Interface Components - Redesigned for Apple Pay Standards

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      description: "Scan and pay instantly"
    },
    {
      id: 2,
      title: "Send Money",
      subtitle: "To Anyone",
      icon: ApplePaySendMoneySVG,
      href: "/send-money",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      description: "Transfer to contacts"
    },
    {
      id: 3,
      title: "Tap to Pay",
      subtitle: "Contactless",
      icon: ApplePayContactlessSVG,
      href: "/offline-payments",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      description: "Pay without internet"
    },
    {
      id: 4,
      title: "My Wallet",
      subtitle: "Cards & Passes",
      icon: ApplePayWalletSVG,
      href: "/wallet",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      description: "Manage payment methods"
    },
    {
      id: 5,
      title: "Transit",
      subtitle: "Metro & Bus",
      icon: ApplePayTransitSVG,
      href: "/transit",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      description: "Public transportation"
    },
    {
      id: 6,
      title: "Merchants",
      subtitle: "Near You",
      icon: ApplePayMerchantSVG,
      href: "/merchants",
      gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      description: "Find nearby stores"
    },
    {
      id: 7,
      title: "Security",
      subtitle: "Privacy",
      icon: ApplePaySecuritySVG,
      href: "/security",
      gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
      description: "Security settings"
    },
    {
      id: 8,
      title: "Profile",
      subtitle: "Account",
      icon: ApplePayBiometricSVG,
      href: "/profile",
      gradient: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
      description: "Manage your account"
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-4 px-6">
      {quickActions.map((action) => (
        <Card
          key={action.id}
          className="group relative overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 cursor-pointer"
          style={{ background: action.gradient }}
        >
          <CardContent className="p-6 relative z-10">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <action.icon className="w-6 h-6 text-white drop-shadow-sm" />
              </div>
              <div className="space-y-1">
                <h3 className="text-white font-semibold text-lg drop-shadow-sm">{action.title}</h3>
                <p className="text-white/80 text-sm font-medium">{action.subtitle}</p>
                <p className="text-white/60 text-xs">{action.description}</p>
              </div>
            </div>
          </CardContent>
          
          {/* Subtle gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Glass morphism effect */}
          <div className="absolute inset-0 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Card>
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