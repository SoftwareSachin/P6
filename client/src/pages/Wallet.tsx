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

interface DigitalPass {
  id: number;
  name: string;
  type: string;
  status: "active" | "expired";
  validUntil: string;
  icon: string;
  barcode: string;
}

export default function Wallet() {
  const [showCardNumbers, setShowCardNumbers] = useState(false);
  const [selectedCard, setSelectedCard] = useState(0);
  const [cards, setCards] = useState<WalletCard[]>([]);
  const [passes, setPasses] = useState<DigitalPass[]>([]);
  const [activeTab, setActiveTab] = useState<"cards" | "passes">("cards");

  useEffect(() => {
    // Mock wallet cards data
    setCards([
      {
        id: 1,
        type: "digital",
        bank: "OPPB Premium",
        last4: "2847",
        expiryMonth: "12",
        expiryYear: "28",
        balance: 12547.50,
        isDefault: true,
        status: "active",
        color: "linear-gradient(135deg, #007AFF 0%, #5856D6 100%)",
        logo: "OPPB",
        network: "oppb"
      },
      {
        id: 2,
        type: "credit",
        bank: "HDFC Bank",
        last4: "8392",
        expiryMonth: "08",
        expiryYear: "27",
        isDefault: false,
        status: "active",
        color: "linear-gradient(135deg, #FF375F 0%, #FF3B30 100%)",
        logo: "HDFC",
        network: "visa"
      },
      {
        id: 3,
        type: "debit",
        bank: "SBI",
        last4: "1657",
        expiryMonth: "03",
        expiryYear: "26",
        isDefault: false,
        status: "active",
        color: "linear-gradient(135deg, #30D158 0%, #00C896 100%)",
        logo: "SBI",
        network: "rupay"
      },
      {
        id: 4,
        type: "credit",
        bank: "ICICI Bank",
        last4: "9124",
        expiryMonth: "11",
        expiryYear: "25",
        isDefault: false,
        status: "blocked",
        color: "linear-gradient(135deg, #8E8E93 0%, #636366 100%)",
        logo: "ICICI",
        network: "mastercard"
      }
    ]);

    // Mock digital passes
    setPasses([
      {
        id: 1,
        name: "Starbucks Rewards",
        type: "Loyalty Card",
        status: "active",
        validUntil: "No Expiry",
        icon: "☕",
        barcode: "123456789012"
      },
      {
        id: 2,
        name: "Mumbai Metro Pass",
        type: "Transit Pass",
        status: "active",
        validUntil: "Dec 31, 2025",
        icon: "🚇",
        barcode: "987654321098"
      },
      {
        id: 3,
        name: "PVR Cinemas",
        type: "Movie Pass",
        status: "active",
        validUntil: "Jun 15, 2025",
        icon: "🎬",
        barcode: "456789123456"
      },
      {
        id: 4,
        name: "Gym Membership",
        type: "Fitness Pass",
        status: "expired",
        validUntil: "Jan 31, 2025",
        icon: "💪",
        barcode: "789123456789"
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
      color: "bg-blue-500"
    },
    {
      id: 2,
      title: "Scan Card",
      subtitle: "Quick add",
      icon: CreditCard,
      action: () => {},
      color: "bg-green-500"
    },
    {
      id: 3,
      title: "Apple Pay",
      subtitle: "Set up",
      icon: Smartphone,
      action: () => {},
      color: "bg-purple-500"
    },
    {
      id: 4,
      title: "Security",
      subtitle: "Card locks",
      icon: Shield,
      action: () => {},
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-black/30 border-b border-white/10">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20">
                <ArrowLeft className="h-5 w-5 text-white" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-white" style={{ fontFamily: 'SF Pro Display, system-ui' }}>
                My Wallet
              </h1>
              <p className="text-sm text-gray-400">Cards & digital passes</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowCardNumbers(!showCardNumbers)}
              className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20"
            >
              {showCardNumbers ? <EyeOff className="h-5 w-5 text-white" /> : <Eye className="h-5 w-5 text-white" />}
            </Button>
            <ApplePayWalletSVG className="w-8 h-8 text-blue-400" />
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Tab Selector */}
        <div className="flex space-x-2 p-1 bg-white/10 rounded-2xl backdrop-blur-xl">
          <Button
            variant={activeTab === "cards" ? "default" : "ghost"}
            onClick={() => setActiveTab("cards")}
            className={`flex-1 rounded-xl transition-all duration-300 ${
              activeTab === "cards"
                ? 'bg-white text-black shadow-lg'
                : 'text-white hover:bg-white/10'
            }`}
            style={{ fontFamily: 'SF Pro Text, system-ui' }}
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Payment Cards
          </Button>
          <Button
            variant={activeTab === "passes" ? "default" : "ghost"}
            onClick={() => setActiveTab("passes")}
            className={`flex-1 rounded-xl transition-all duration-300 ${
              activeTab === "passes"
                ? 'bg-white text-black shadow-lg'
                : 'text-white hover:bg-white/10'
            }`}
            style={{ fontFamily: 'SF Pro Text, system-ui' }}
          >
            <Smartphone className="w-4 h-4 mr-2" />
            Digital Passes
          </Button>
        </div>

        {activeTab === "cards" && (
          <>
            {/* Payment Cards */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">Payment Cards</h2>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-400/30 text-blue-400 hover:bg-blue-400/10 rounded-xl"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Card
                </Button>
              </div>

              <div className="flex space-x-4 overflow-x-auto hide-scrollbar pb-4">
                {cards.map((card, index) => (
                  <Card
                    key={card.id}
                    className={`min-w-[320px] cursor-pointer transition-all duration-500 ${
                      selectedCard === index ? 'scale-105 z-10' : 'scale-95 opacity-80'
                    }`}
                    onClick={() => setSelectedCard(index)}
                    style={{
                      background: `
                        linear-gradient(135deg, 
                          rgba(255,255,255,0.15) 0%, 
                          rgba(255,255,255,0.05) 25%, 
                          transparent 50%, 
                          rgba(0,0,0,0.05) 75%, 
                          rgba(0,0,0,0.1) 100%
                        ),
                        ${card.color}
                      `,
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      boxShadow: selectedCard === index 
                        ? '0 25px 50px -12px rgba(0,0,0,0.5), 0 0 40px rgba(0,122,255,0.3)'
                        : '0 15px 30px -8px rgba(0,0,0,0.3)'
                    }}
                  >
                    <CardContent className="p-6 h-52 relative">
                      {/* Card Header */}
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <p className="text-white font-semibold text-lg">{card.bank}</p>
                            {card.isDefault && (
                              <Badge className="bg-green-500/20 text-green-400 text-xs">
                                Default
                              </Badge>
                            )}
                          </div>
                          <p className="text-white/70 text-sm capitalize">{card.type} Card</p>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <div className="w-12 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                            <span className="text-white font-bold text-sm">{card.logo}</span>
                          </div>
                          <Badge
                            className={`${
                              card.status === 'active' ? 'bg-green-500/20 text-green-400' :
                              card.status === 'blocked' ? 'bg-red-500/20 text-red-400' :
                              'bg-gray-500/20 text-gray-400'
                            }`}
                          >
                            {card.status}
                          </Badge>
                        </div>
                      </div>

                      {/* Card Number */}
                      <div className="mb-6">
                        <p className="text-white text-2xl font-mono tracking-wider">
                          {showCardNumbers ? `**** **** **** ${card.last4}` : `•••• •••• •••• ${card.last4}`}
                        </p>
                      </div>

                      {/* Card Details */}
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-white/70 text-xs mb-1">Expires</p>
                          <p className="text-white font-mono">{card.expiryMonth}/{card.expiryYear}</p>
                        </div>
                        
                        {card.balance && (
                          <div className="text-right">
                            <p className="text-white/70 text-xs mb-1">Balance</p>
                            <p className="text-white font-bold text-lg">₹{card.balance.toLocaleString()}</p>
                          </div>
                        )}
                        
                        <div className="w-12 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                          <span className="text-white text-xs font-bold uppercase">{card.network}</span>
                        </div>
                      </div>

                      {/* Contactless Indicator */}
                      {card.status === 'active' && (
                        <div className="absolute top-6 right-6">
                          <ApplePayNFCSVG className="w-6 h-6 text-white/60" />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                {quickActions.map((action) => (
                  <Card
                    key={action.id}
                    className="ultra-premium-card border-0 cursor-pointer"
                    style={{
                      background: `
                        linear-gradient(135deg, 
                          rgba(255,255,255,0.12) 0%, 
                          rgba(255,255,255,0.06) 50%, 
                          rgba(255,255,255,0.04) 100%
                        )
                      `,
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255,255,255,0.15)'
                    }}
                    onClick={action.action}
                  >
                    <CardContent className="p-5 h-[100px] flex flex-col justify-center">
                      <div className="flex flex-col items-center text-center space-y-2">
                        <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center`}>
                          <action.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold text-sm">{action.title}</h3>
                          <p className="text-white/70 text-xs">{action.subtitle}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === "passes" && (
          <>
            {/* Digital Passes */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">Digital Passes</h2>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-400/30 text-blue-400 hover:bg-blue-400/10 rounded-xl"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Pass
                </Button>
              </div>

              <div className="space-y-4">
                {passes.map((pass, index) => (
                  <Card
                    key={pass.id}
                    className="border-0 cursor-pointer hover:scale-[1.02] transition-all duration-300"
                    style={{
                      background: `
                        linear-gradient(135deg, 
                          rgba(255,255,255,0.10) 0%, 
                          rgba(255,255,255,0.05) 100%
                        )
                      `,
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      animationDelay: `${index * 0.1}s`
                    }}
                  >
                    <CardContent className="p-5">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-2xl">
                          {pass.icon}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-white font-semibold text-lg">{pass.name}</h3>
                              <p className="text-gray-400 text-sm">{pass.type}</p>
                            </div>
                            <Badge
                              className={`${
                                pass.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                              }`}
                            >
                              {pass.status}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-gray-400 text-xs">Valid until</p>
                              <p className="text-white text-sm font-medium">{pass.validUntil}</p>
                            </div>
                            
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-gray-600 text-gray-400 hover:bg-gray-700/50"
                              >
                                Show Barcode
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-gray-400 hover:text-white"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Security Info */}
        <Card
          className="border-0"
          style={{
            background: `
              linear-gradient(135deg, 
                rgba(0,122,255,0.1) 0%, 
                rgba(88,86,214,0.05) 100%
              )
            `,
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(0,122,255,0.2)'
          }}
        >
          <CardContent className="p-5">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <ApplePaySecuritySVG className="w-6 h-6 text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-1">Secure & Private</h3>
                <p className="text-gray-400 text-sm">
                  Your payment information is encrypted and protected with biometric authentication.
                </p>
              </div>
              <Zap className="w-6 h-6 text-blue-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="pb-24" />
      <BottomNavigation activeTab="wallet" />
    </div>
  );
}