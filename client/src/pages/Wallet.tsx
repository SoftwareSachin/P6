import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BottomNavigation } from "@/components/BottomNavigation";
import { ArrowLeft, Plus, MoreHorizontal, CreditCard, Smartphone, Shield, Eye, EyeOff, Zap } from "lucide-react";
import { Link } from "wouter";
import { ApplePayWalletSVG, ApplePayCreditCardSVG, ApplePayCardStackSVG, ApplePaySecuritySVG, ApplePayNFCSVG, ApplePayBiometricSVG } from "@/components/ApplePaySVGs";

interface WalletCard {
  id: number;
  type: "credit" | "debit" | "prepaid" | "digital";
  bank: string;
  last4: string;
  expiryMonth: string;
  expiryYear: string;
  balance?: number;
  isDefault: boolean;
  status: "active" | "blocked" | "expired";
  color: string;
  logo: string;
  network: "visa" | "mastercard" | "rupay" | "oppb";
}

export default function Wallet() {
  const [showCardNumbers, setShowCardNumbers] = useState(false);
  const [selectedCard, setSelectedCard] = useState(0);
  const [cards, setCards] = useState<WalletCard[]>([]);
  const [activeTab, setActiveTab] = useState<"cards" | "passes">("cards");

  useEffect(() => {
    setCards([
      {
        id: 1,
        type: "digital",
        bank: "OPPB Premium",
        last4: "2847",
        expiryMonth: "12",
        expiryYear: "28",
        balance: 15420.50,
        isDefault: true,
        status: "active",
        color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        logo: "OPPB",
        network: "oppb"
      },
      {
        id: 2,
        type: "credit",
        bank: "HDFC Bank",
        last4: "9158",
        expiryMonth: "03",
        expiryYear: "27",
        isDefault: false,
        status: "active",
        color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        logo: "HDFC",
        network: "visa"
      },
      {
        id: 3,
        type: "debit",
        bank: "SBI",
        last4: "3421",
        expiryMonth: "09",
        expiryYear: "26",
        isDefault: false,
        status: "active",
        color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        logo: "SBI",
        network: "mastercard"
      }
    ]);
  }, []);

  const quickActions = [
    {
      id: 1,
      title: "Add Card",
      subtitle: "Link new card",
      icon: Plus,
      action: () => {},
      gradient: "linear-gradient(135deg, #007AFF 0%, #5856D6 100%)"
    },
    {
      id: 2,
      title: "Scan Card",
      subtitle: "Quick add",
      icon: CreditCard,
      action: () => {},
      gradient: "linear-gradient(135deg, #30D158 0%, #00C896 100%)"
    },
    {
      id: 3,
      title: "OPPB Pay",
      subtitle: "Set up",
      icon: Smartphone,
      action: () => {},
      gradient: "linear-gradient(135deg, #BF5AF2 0%, #AF52DE 100%)"
    },
    {
      id: 4,
      title: "Security",
      subtitle: "Card locks",
      icon: Shield,
      action: () => {},
      gradient: "linear-gradient(135deg, #FF9F0A 0%, #FF6B35 100%)"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Ultra-Premium Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/8 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-40 right-10 w-96 h-96 bg-blue-500/6 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl animate-pulse delay-2000" />
      
      {/* Ultra-Premium Header */}
      <div className="sticky top-0 z-50 backdrop-blur-3xl bg-black/40 border-b border-white/15">
        <div className="flex items-center justify-between p-6 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-purple-500/5 blur-xl" />
          
          <div className="flex items-center space-x-5 relative z-10">
            <Link href="/">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300" />
                <Button variant="ghost" size="icon" className="relative h-12 w-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 hover:scale-110 transition-all duration-300">
                  <ArrowLeft className="h-5 w-5 text-white" />
                </Button>
              </div>
            </Link>
            <div>
              <h1 
                className="text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent"
                style={{ 
                  fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                  letterSpacing: '-0.02em',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}
              >
                My Wallet
              </h1>
              <p 
                className="text-sm text-white/70 font-medium"
                style={{ 
                  fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                  letterSpacing: '-0.01em'
                }}
              >
                Cards & Digital Passes
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 relative z-10">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300" />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowCardNumbers(!showCardNumbers)}
                className="relative h-12 w-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 hover:scale-110 transition-all duration-300"
              >
                {showCardNumbers ? <EyeOff className="h-5 w-5 text-white" /> : <Eye className="h-5 w-5 text-white" />}
              </Button>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full blur-md animate-pulse" />
              <ApplePayWalletSVG className="relative w-10 h-10 text-white drop-shadow-xl" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8 relative z-10">
        {/* Ultra-Premium Payment Cards */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 
              className="text-xl font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent"
              style={{ fontFamily: 'SF Pro Display, system-ui' }}
            >
              Payment Cards
            </h2>
            <Button
              variant="outline"
              size="sm"
              className="border-blue-400/40 text-blue-400 hover:bg-blue-400/20 hover:border-blue-400/60 rounded-2xl transition-all duration-300 backdrop-blur-sm bg-blue-400/5"
              style={{
                background: 'linear-gradient(135deg, rgba(0,122,255,0.08) 0%, rgba(88,86,214,0.08) 100%)',
                boxShadow: '0 8px 16px -4px rgba(0,122,255,0.2)',
                fontFamily: 'SF Pro Display, system-ui'
              }}
            >
              + Add Card
            </Button>
          </div>
          
          <div className="flex space-x-6 overflow-x-auto hide-scrollbar pb-6">
            {cards.map((card, index) => {
              const isSelected = selectedCard === index;
              return (
                <Card
                  key={card.id}
                  className={`min-w-[340px] cursor-pointer transition-all duration-700 transform-gpu hover:cursor-pointer ${
                    isSelected ? 'scale-105 z-30 rotate-1' : 'scale-95 opacity-75 hover:scale-100 hover:opacity-90'
                  }`}
                  onClick={() => setSelectedCard(index)}
                  style={{
                    background: `
                      linear-gradient(145deg, 
                        rgba(255,255,255,0.4) 0%, 
                        rgba(255,255,255,0.25) 15%, 
                        rgba(255,255,255,0.15) 30%, 
                        rgba(255,255,255,0.08) 45%, 
                        rgba(255,255,255,0.05) 60%, 
                        rgba(0,0,0,0.08) 75%, 
                        rgba(0,0,0,0.15) 90%, 
                        rgba(0,0,0,0.25) 100%
                      ),
                      ${card.color}
                    `,
                    backdropFilter: 'blur(40px) saturate(2.0) contrast(1.3) brightness(1.1)',
                    WebkitBackdropFilter: 'blur(40px) saturate(2.0) contrast(1.3) brightness(1.1)',
                    border: isSelected 
                      ? '2px solid rgba(255,255,255,0.6)' 
                      : '1px solid rgba(255,255,255,0.3)',
                    boxShadow: isSelected 
                      ? `0 25px 50px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.2), inset 0 2px 4px rgba(255,255,255,0.2)` 
                      : `0 8px 25px -5px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)`,
                    borderRadius: '24px',
                    height: '220px'
                  }}
                >
                  <CardContent className="p-6 h-full flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white/90 text-sm font-medium mb-1" style={{ fontFamily: 'SF Pro Text, system-ui' }}>
                          {card.bank}
                        </p>
                        {card.isDefault && (
                          <Badge 
                            className="bg-white/20 text-white border-white/30 text-xs"
                            style={{ 
                              backdropFilter: 'blur(10px)',
                              fontFamily: 'SF Pro Text, system-ui'
                            }}
                          >
                            Default
                          </Badge>
                        )}
                      </div>
                      <div className="text-white/90 font-bold text-lg" style={{ fontFamily: 'SF Pro Display, system-ui' }}>
                        {card.logo}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {card.balance && (
                        <div>
                          <p className="text-white/60 text-xs font-medium" style={{ fontFamily: 'SF Pro Text, system-ui' }}>
                            Available Balance
                          </p>
                          <p className="text-white text-2xl font-bold" style={{ fontFamily: 'SF Pro Display, system-ui' }}>
                            ₹{card.balance.toLocaleString()}
                          </p>
                        </div>
                      )}
                      
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-white/60 text-xs font-medium mb-1" style={{ fontFamily: 'SF Pro Text, system-ui' }}>
                            Card Number
                          </p>
                          <p className="text-white text-lg font-mono tracking-wider">
                            •••• •••• •••• {card.last4}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-white/60 text-xs font-medium" style={{ fontFamily: 'SF Pro Text, system-ui' }}>
                            Exp
                          </p>
                          <p className="text-white text-sm font-medium" style={{ fontFamily: 'SF Pro Text, system-ui' }}>
                            {card.expiryMonth}/{card.expiryYear}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Ultra-Premium Quick Actions */}
        <div>
          <h2 
            className="text-xl font-bold text-white mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent" 
            style={{ fontFamily: 'SF Pro Display, system-ui' }}
          >
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-5">
            {quickActions.map((action, index) => (
              <div key={action.id} className="relative group">
                <div 
                  className="absolute inset-0 rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" 
                  style={{
                    background: action.gradient,
                    filter: 'blur(20px)'
                  }}
                />
                
                <Card
                  className="relative border-0 cursor-pointer transition-all duration-500 transform-gpu group-hover:scale-105 group-hover:-translate-y-1"
                  style={{
                    background: `
                      linear-gradient(145deg, 
                        rgba(255,255,255,0.25) 0%, 
                        rgba(255,255,255,0.15) 25%, 
                        rgba(255,255,255,0.08) 50%, 
                        rgba(255,255,255,0.05) 75%, 
                        rgba(0,0,0,0.05) 100%
                      ),
                      ${action.gradient}
                    `,
                    backdropFilter: 'blur(30px) saturate(1.8)',
                    WebkitBackdropFilter: 'blur(30px) saturate(1.8)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    boxShadow: `
                      0 20px 40px rgba(0,0,0,0.15),
                      0 8px 16px rgba(0,0,0,0.1),
                      inset 0 2px 4px rgba(255,255,255,0.2),
                      inset 0 -2px 4px rgba(0,0,0,0.1)
                    `,
                    borderRadius: '24px'
                  }}
                  onClick={action.action}
                >
                  <CardContent className="p-6 h-[120px] flex flex-col justify-center">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div 
                        className="w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300"
                        style={{
                          background: `
                            linear-gradient(135deg, 
                              rgba(255,255,255,0.35) 0%, 
                              rgba(255,255,255,0.25) 30%, 
                              rgba(255,255,255,0.15) 70%, 
                              rgba(255,255,255,0.1) 100%
                            ),
                            radial-gradient(circle at 25% 25%, rgba(255,255,255,0.4) 0%, transparent 60%)
                          `,
                          backdropFilter: 'blur(20px) saturate(1.5)',
                          WebkitBackdropFilter: 'blur(20px) saturate(1.5)',
                          border: '1.5px solid rgba(255,255,255,0.4)',
                          boxShadow: `
                            0 8px 24px rgba(0,0,0,0.15),
                            inset 0 2px 4px rgba(255,255,255,0.5),
                            inset 0 -2px 4px rgba(0,0,0,0.15)
                          `
                        }}
                      >
                        <action.icon className="w-7 h-7 text-white drop-shadow-xl" />
                      </div>
                      
                      <div className="space-y-0.5">
                        <h3 
                          className="text-white font-bold text-base leading-tight tracking-tight"
                          style={{ 
                            fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                            textShadow: '0 2px 4px rgba(0,0,0,0.4)',
                            letterSpacing: '-0.02em'
                          }}
                        >
                          {action.title}
                        </h3>
                        <p 
                          className="text-white/85 text-sm font-semibold leading-tight"
                          style={{ 
                            fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                            textShadow: '0 1px 3px rgba(0,0,0,0.3)',
                            letterSpacing: '-0.01em'
                          }}
                        >
                          {action.subtitle}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
        
        <div className="pb-24" />
      </div>
      <BottomNavigation activeTab="wallet" />
    </div>
  );
}