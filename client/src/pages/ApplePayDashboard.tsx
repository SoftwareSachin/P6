import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Clock, Check, AlertCircle, ArrowRight, MapPin, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BottomNavigation } from "@/components/BottomNavigation";
import { Link } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { ApplePayFaceIDSVG, ApplePayCreditCardSVG, ApplePayNFCSVG, ApplePayTapSVG, ApplePayTransitSVG, ApplePayMerchantSVG, ApplePaySecuritySVG, ApplePayQRCodeSVG, ApplePayPhoneSVG, ApplePayWalletSVG, ApplePayLocationSVG, ApplePayTimeSVG, ApplePaySuccessSVG, ApplePaySendMoneySVG, ApplePayContactlessSVG, ApplePayCardStackSVG, ApplePayBiometricSVG } from "@/components/ApplePaySVGs";
import { ApplePayQuickActions, ApplePayCardCarousel, ApplePayTransactionRow } from "@/components/ApplePayInterface";
import { OPPBLogoSVG } from "@/components/PremiumSVGs";

export default function ApplePayDashboard() {
  const [showBalance, setShowBalance] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedCard, setSelectedCard] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { user } = useAuth();

  // Get user balance
  const { data: balanceData } = useQuery({
    queryKey: ['/api/user/balance'],
    enabled: !!user
  });

  // Get recent transactions
  const { data: transactions } = useQuery({
    queryKey: ['/api/transactions'],
    enabled: !!user
  });

  const balance = (balanceData as any)?.balance || 12547.50;
  const userName = (user as any)?.name || "Sachin";

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  // Premium Payment Cards - Apple Pay Style with Enhanced Bank Selection
  const paymentCards = [
    {
      id: 1,
      type: "OPPB Premium",
      cardNumber: "••• 2847",
      balance: 12547.50,
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      logo: "OPPB",
      isDefault: true,
      chipColor: "#FFD700",
      bankType: "digital"
    },
    {
      id: 2,
      type: "HDFC Regalia",
      cardNumber: "••• 8392",
      balance: 8920.30,
      gradient: "linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 50%, #FFA8A8 100%)",
      logo: "HDFC",
      isDefault: false,
      chipColor: "#C0392B",
      bankType: "private"
    },
    {
      id: 3,
      type: "SBI Platinum",
      cardNumber: "••• 1657",
      balance: 5634.75,
      gradient: "linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)",
      logo: "SBI",
      isDefault: false,
      chipColor: "#2ECC71",
      bankType: "government"
    },
    {
      id: 4,
      type: "Bank of Baroda",
      cardNumber: "••• 9124",
      balance: 3250.40,
      gradient: "linear-gradient(135deg, #F39C12 0%, #E67E22 50%, #D35400 100%)",
      logo: "BOB",
      isDefault: false,
      chipColor: "#F39C12",
      bankType: "government"
    }
  ];

  // Contextual Passes & Smart Suggestions
  const smartPasses = [
    {
      id: 1,
      title: "Metro Pass",
      subtitle: "Valid until Dec 31",
      icon: ApplePayTransitSVG,
      active: true,
      context: "Morning commute detected"
    },
    {
      id: 2,
      title: "Merchant Rewards",
      subtitle: "15 points available",
      icon: ApplePayMerchantSVG,
      active: false,
      context: "Near participating store"
    }
  ];

  // Premium Recent Transactions with Rich Details
  const recentTransactions = [
    {
      id: 1,
      merchant: "Zomato",
      icon: ApplePayMerchantSVG,
      amount: -285,
      status: "success",
      time: "Today, 2:30 PM",
      location: "Connaught Place, Delhi",
      category: "Food & Dining",
      receiptAvailable: true,
      image: "/api/placeholder/40/40"
    },
    {
      id: 2,
      merchant: "Rohit Kumar",
      icon: ApplePaySendMoneySVG,
      amount: 500,
      status: "success",
      time: "Yesterday, 6:15 PM",
      location: "UPI Transfer",
      category: "Transfer",
      receiptAvailable: false,
      image: "/api/placeholder/40/40"
    },
    {
      id: 3,
      merchant: "BSES Delhi",
      icon: ApplePayWalletSVG,
      amount: -1200,
      status: "pending",
      time: "Oct 28, 11:30 AM",
      location: "Online Payment",
      category: "Utilities",
      receiptAvailable: true,
      image: "/api/placeholder/40/40"
    },
    {
      id: 4,
      merchant: "Airtel Prepaid",
      icon: ApplePayPhoneSVG,
      amount: -199,
      status: "success",
      time: "Oct 27, 3:45 PM",
      location: "Mobile Recharge",
      category: "Telecom",
      receiptAvailable: true,
      image: "/api/placeholder/40/40"
    }
  ];

  // Biometric Authentication Simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAuthenticated(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Biometric Loading Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full border-4 border-white/20 flex items-center justify-center relative">
            <div className="w-16 h-16 rounded-full border-2 border-white/40 animate-pulse"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-white animate-spin"></div>
          </div>
          <h2 className="text-white text-xl font-semibold mb-2">Authenticating</h2>
          <p className="text-white/60 text-sm">Hold your device near your face</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Premium Header - Apple Pay Style */}
      <div className="px-6 pt-12 pb-6 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center shadow-2xl">
                <span className="text-2xl font-bold text-white">{userName.charAt(0).toUpperCase()}</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-black rounded-full"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{getGreeting()}</h1>
              <p className="text-gray-400 text-sm">Your digital wallet</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative h-12 w-12 rounded-full bg-gray-800/50 backdrop-blur-xl hover:bg-gray-700/50 transition-all duration-300"
            >
              <ApplePaySecuritySVG className="h-6 w-6 text-white" />
              <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-xs text-white p-0 flex items-center justify-center font-bold">
                2
              </Badge>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-12 w-12 rounded-full bg-gray-800/50 backdrop-blur-xl hover:bg-gray-700/50 transition-all duration-300"
              onClick={() => setShowMenu(!showMenu)}
            >
              <MoreHorizontal className="h-6 w-6 text-white" />
            </Button>
          </div>
        </div>

        {/* Ultra-Premium Payment Card - Apple Pay Inspired */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">Payment Methods</h2>
          <div className="flex space-x-4 overflow-x-auto hide-scrollbar pb-4">
            {paymentCards.map((card, index) => (
              <div
                key={card.id}
                className={`min-w-[340px] h-[220px] rounded-3xl relative overflow-hidden cursor-pointer premium-card-hover ${
                  selectedCard === index ? 'premium-card-selected' : 'premium-card-idle'
                }`}
                onClick={() => setSelectedCard(index)}
                style={{
                  background: `
                    linear-gradient(135deg, 
                      rgba(255,255,255,0.25) 0%, 
                      rgba(255,255,255,0.1) 25%, 
                      transparent 50%, 
                      rgba(0,0,0,0.1) 75%, 
                      rgba(0,0,0,0.2) 100%
                    ),
                    ${card.gradient}
                  `,
                  backdropFilter: 'blur(40px)',
                  WebkitBackdropFilter: 'blur(40px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  boxShadow: selectedCard === index 
                    ? '0 25px 50px -12px rgba(0,0,0,0.5), 0 0 40px rgba(102,126,234,0.3), inset 0 1px 0 rgba(255,255,255,0.4)'
                    : '0 15px 30px -8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
                  transform: selectedCard === index 
                    ? 'perspective(1000px) rotateY(0deg) translateZ(20px)' 
                    : 'perspective(1000px) rotateY(2deg) translateZ(0px)',
                  animation: selectedCard === index ? 'premium-pulse 3s infinite, card-glow 2s infinite' : 'none'
                }}
              >
                {/* Premium Shimmer Effect */}
                <div 
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)',
                    animation: selectedCard === index ? 'shimmer 3s infinite' : 'none'
                  }}
                />
                
                {/* Advanced Light Reflection */}
                <div 
                  className="absolute top-0 left-0 w-full h-[2px]"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
                    borderRadius: '1px'
                  }}
                />
                
                {/* Card Content with Enhanced Typography */}
                <div className="relative z-10 p-7 h-full flex flex-col justify-between">
                  {/* Header Section */}
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        {/* Premium EMV Chip */}
                        <div 
                          className="w-8 h-6 rounded-md flex items-center justify-center chip-shimmer"
                          style={{
                            background: `linear-gradient(135deg, ${card.chipColor} 0%, ${card.chipColor}CC 100%)`,
                            border: '1px solid rgba(255,255,255,0.3)',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.4)'
                          }}
                        >
                          <div className="w-4 h-3 bg-gradient-to-br from-white/30 to-transparent rounded-sm" />
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium text-white/80 ${
                          card.bankType === 'digital' ? 'bg-blue-500/30' :
                          card.bankType === 'private' ? 'bg-purple-500/30' : 'bg-green-500/30'
                        }`}>
                          {card.bankType === 'digital' ? '⚡ Digital' : 
                           card.bankType === 'private' ? '🏢 Private' : '🏛️ Govt'}
                        </div>
                      </div>
                      <p className="text-white/90 text-sm font-semibold tracking-wide">{card.type}</p>
                      <p className="text-white text-xl font-bold tracking-wider number-animate" style={{ fontFamily: 'SF Pro Display, system-ui' }}>
                        {card.cardNumber}
                      </p>
                    </div>
                    
                    {/* Premium Logo Badge with Enhanced Animation */}
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center logo-pulse"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1))',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255,255,255,0.3)',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.4)',
                        animation: selectedCard === index ? 'logo-bounce 2s infinite' : 'none'
                      }}
                    >
                      <span className="text-white font-bold text-sm" style={{ fontFamily: 'SF Pro Display, system-ui' }}>
                        {card.logo}
                      </span>
                    </div>
                  </div>
                  
                  {/* Balance Section with Premium Typography */}
                  <div className="space-y-2">
                    <p className="text-white/70 text-xs font-medium uppercase tracking-[0.1em]" style={{ fontFamily: 'SF Pro Display, system-ui' }}>
                      Available Balance
                    </p>
                    <p 
                      className="text-white text-3xl font-bold tracking-tight"
                      style={{ 
                        fontFamily: 'SF Pro Display, system-ui',
                        textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                      }}
                    >
                      ₹{card.balance.toLocaleString('en-IN')}
                    </p>
                    
                    {/* Premium Default Badge */}
                    {card.isDefault && (
                      <div 
                        className="inline-flex items-center mt-3 px-4 py-2 text-xs font-semibold text-white rounded-full"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.1))',
                          backdropFilter: 'blur(15px)',
                          border: '1px solid rgba(255,255,255,0.2)',
                          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                        }}
                      >
                        <div className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse" />
                        Primary Card
                      </div>
                    )}
                  </div>
                </div>

                {/* Premium Tap-to-Pay Indicator */}
                {selectedCard === index && (
                  <div className="absolute top-6 right-6">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.2))',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255,255,255,0.3)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                      }}
                    >
                      <div 
                        className="w-5 h-5 rounded-full bg-white"
                        style={{
                          boxShadow: '0 0 10px rgba(255,255,255,0.8)',
                          animation: 'pulse 2s infinite'
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Exclusive Edge Glow for Selected Card */}
                {selectedCard === index && (
                  <div 
                    className="absolute inset-0 rounded-3xl pointer-events-none"
                    style={{
                      background: 'linear-gradient(45deg, transparent, rgba(102,126,234,0.3), transparent)',
                      filter: 'blur(1px)',
                      opacity: 0.6
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Apple Pay Style Quick Actions Grid */}
        <div className="mb-8">
          <div className="px-6 mb-6">
            <h3 className="text-white text-xl font-bold">Quick Actions</h3>
            <p className="text-gray-400 text-sm mt-1">Tap to access your most-used features</p>
          </div>
          <ApplePayQuickActions />
        </div>
      </div>

      {/* Transaction History & Insights */}
      <div className="px-6 mb-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
          <Link href="/transactions">
            <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 transition-colors">
              View All
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
        
        <div className="space-y-3">
          {recentTransactions.map((transaction, index) => {
            const IconComponent = transaction.icon;
            return (
              <div 
                key={transaction.id} 
                className="p-4 rounded-2xl dark-mode-card hover:apple-pay-card transition-all duration-300 cursor-pointer group transaction-success"
              >
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center shadow-lg">
                      <IconComponent className="h-6 w-6 text-gray-300" />
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-black ${
                      transaction.status === 'success' ? 'bg-green-500' : 
                      transaction.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}>
                      {transaction.status === 'success' ? 
                        <Check className="h-3 w-3 text-white m-0.5" /> : 
                        transaction.status === 'pending' ? 
                        <Clock className="h-3 w-3 text-white m-0.5" /> : 
                        <AlertCircle className="h-3 w-3 text-white m-0.5" />
                      }
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-white">{transaction.merchant}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <p className="text-sm text-gray-400">{transaction.category}</p>
                          <MapPin className="h-3 w-3 text-gray-500" />
                          <p className="text-xs text-gray-500">{transaction.location}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold text-lg ${transaction.amount > 0 ? 'text-green-400' : 'text-white'}`}>
                          {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-400">{transaction.time}</p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Action Menu */}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 rounded-full bg-gray-700/50 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-gray-600/50"
                  >
                    <MoreHorizontal className="h-4 w-4 text-gray-400" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Elegant Onboarding Overlay */}
      {showMenu && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl">
          <div className="absolute right-0 top-0 h-full w-80 bg-gray-900/95 backdrop-blur-xl border-l border-gray-700/50">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <OPPBLogoSVG className="w-10 h-10" animated />
                  <div>
                    <h3 className="font-bold text-white">OPPB Wallet</h3>
                    <p className="text-sm text-gray-400">Premium Digital Experience</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setShowMenu(false)} className="text-gray-400 hover:text-white">
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-2">
                {[
                  { icon: ApplePayBiometricSVG, label: "Profile & Settings", href: "/profile" },
                  { icon: ApplePayCreditCardSVG, label: "Payment Methods", href: "/cards" },
                  { icon: ApplePaySecuritySVG, label: "Security & Privacy", href: "/security" },
                  { icon: ApplePayWalletSVG, label: "Rewards & Offers", href: "/rewards" },
                  { icon: ApplePayContactlessSVG, label: "Help & Support", href: "/help" },
                  { icon: ApplePayFaceIDSVG, label: "Sign Out", href: "/logout" }
                ].map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <Link key={item.label} href={item.href}>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start rounded-2xl h-12 text-white hover:bg-gray-800/50 transition-all duration-300"
                        onClick={() => setShowMenu(false)}
                      >
                        <IconComponent className="h-5 w-5 mr-3 text-gray-400" />
                        {item.label}
                      </Button>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      <BottomNavigation activeTab="home" />
    </div>
  );
}