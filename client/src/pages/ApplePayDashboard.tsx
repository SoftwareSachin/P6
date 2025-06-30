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
import { OPPBLogoSVG, PremiumQRScannerSVG, PremiumSendMoneySVG, PremiumSplitBillSVG, PremiumRequestMoneySVG, PremiumRechargeSVG, PremiumOfflinePaySVG, PremiumInsuranceSVG, PremiumRewardsSVG, PremiumBellSVG, PremiumMenuSVG, PremiumShoppingCartSVG, PremiumUserSVG, PremiumPhoneSVG, PremiumDollarSVG, PremiumCreditCardSVG, PremiumSettingsSVG, PremiumHelpSVG, PremiumLogoutSVG } from "@/components/PremiumSVGs";

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

  // Premium Payment Cards - Apple Pay Style
  const paymentCards = [
    {
      id: 1,
      type: "OPPB Premium",
      cardNumber: "••• 2847",
      balance: 12547.50,
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      logo: "OPPB",
      isDefault: true
    },
    {
      id: 2,
      type: "HDFC Platinum",
      cardNumber: "••• 8392",
      balance: 8920.30,
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      logo: "HDFC",
      isDefault: false
    },
    {
      id: 3,
      type: "SBI Gold",
      cardNumber: "••• 1657",
      balance: 5634.75,
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      logo: "SBI",
      isDefault: false
    }
  ];

  // Contextual Passes & Smart Suggestions
  const smartPasses = [
    {
      id: 1,
      title: "Metro Pass",
      subtitle: "Valid until Dec 31",
      icon: "🚇",
      active: true,
      context: "Morning commute detected"
    },
    {
      id: 2,
      title: "Starbucks Rewards",
      subtitle: "15 stars available",
      icon: "☕",
      active: false,
      context: "Near coffee shop"
    }
  ];

  // Premium Recent Transactions with Rich Details
  const recentTransactions = [
    {
      id: 1,
      merchant: "Zomato",
      icon: PremiumShoppingCartSVG,
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
      icon: PremiumUserSVG,
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
      icon: PremiumRechargeSVG,
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
      icon: PremiumPhoneSVG,
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
              <PremiumBellSVG className="h-6 w-6 text-white" />
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
              <PremiumMenuSVG className="h-6 w-6 text-white" />
            </Button>
          </div>
        </div>

        {/* Unified Wallet Interface - Horizontally Scrollable Card Carousel */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">Payment Methods</h2>
          <div className="flex space-x-4 overflow-x-auto hide-scrollbar pb-4">
            {paymentCards.map((card, index) => (
              <div
                key={card.id}
                className={`min-w-[320px] h-[200px] rounded-3xl relative overflow-hidden cursor-pointer apple-pay-card card-3d-stack ${
                  selectedCard === index ? 'scale-105 tap-to-pay-pulse' : 'scale-100'
                }`}
                style={{ background: card.gradient }}
                onClick={() => setSelectedCard(index)}
              >
                {/* Card Shadow Layer */}
                <div className="absolute inset-0 bg-black/10 rounded-3xl"></div>
                
                {/* Card Content */}
                <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/80 text-sm font-medium">{card.type}</p>
                      <p className="text-white text-lg font-bold">{card.cardNumber}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{card.logo}</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-white/60 text-xs font-medium">Balance</p>
                    <p className="text-white text-2xl font-bold">₹{card.balance.toLocaleString()}</p>
                    {card.isDefault && (
                      <Badge className="mt-2 bg-white/20 text-white border-0 text-xs">Default</Badge>
                    )}
                  </div>
                </div>

                {/* Tap-to-Pay Indicator */}
                {selectedCard === index && (
                  <div className="absolute top-4 right-4">
                    <div className="w-8 h-8 rounded-full bg-white/30 backdrop-blur-xl flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-white animate-pulse"></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contextual Passcards & Smart Suggestions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">Smart Suggestions</h2>
          <div className="space-y-3">
            {smartPasses.map((pass) => (
              <div key={pass.id} className={`p-4 rounded-2xl backdrop-blur-xl border border-gray-700/50 transition-all duration-300 ${
                pass.active ? 'bg-blue-500/20 border-blue-500/50' : 'bg-gray-800/50'
              }`}>
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{pass.icon}</div>
                  <div className="flex-1">
                    <p className="text-white font-semibold">{pass.title}</p>
                    <p className="text-gray-400 text-sm">{pass.subtitle}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">{pass.context}</p>
                    {pass.active && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-1 ml-auto animate-pulse"></div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
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
                  { icon: PremiumUserSVG, label: "Profile & Settings", href: "/profile" },
                  { icon: PremiumCreditCardSVG, label: "Payment Methods", href: "/cards" },
                  { icon: PremiumInsuranceSVG, label: "Security & Privacy", href: "/security" },
                  { icon: PremiumRewardsSVG, label: "Rewards & Offers", href: "/rewards" },
                  { icon: PremiumHelpSVG, label: "Help & Support", href: "/help" },
                  { icon: PremiumLogoutSVG, label: "Sign Out", href: "/logout" }
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