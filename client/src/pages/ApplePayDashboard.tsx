import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Clock, Check, AlertCircle, ArrowRight, MapPin, MoreHorizontal, RefreshCw } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BottomNavigation } from "@/components/BottomNavigation";
import { Link } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { ErrorHandler, ErrorCode, useErrorHandler } from "@/lib/errorHandler";
import { LoadingWithError, InlineError } from "@/components/ErrorBoundary";
import { ApplePayFaceIDSVG, ApplePayCreditCardSVG, ApplePayNFCSVG, ApplePayTapSVG, ApplePayTransitSVG, ApplePayMerchantSVG, ApplePaySecuritySVG, ApplePayQRCodeSVG, ApplePayPhoneSVG, ApplePayWalletSVG, ApplePayLocationSVG, ApplePayTimeSVG, ApplePaySuccessSVG, ApplePaySendMoneySVG, ApplePayContactlessSVG, ApplePayCardStackSVG, ApplePayBiometricSVG } from "@/components/ApplePaySVGs";
import { ApplePayQuickActions, ApplePayCardCarousel, ApplePayTransactionRow } from "@/components/ApplePayInterface";
import { OPPBLogoSVG } from "@/components/PremiumSVGs";
import { IOSMemojiSVG } from "@/components/iOSMemojiSVG";
import { UltraPremiumChipSVG } from "@/components/UltraPremiumChipSVG";
import { PremiumProfileIconSVG, PremiumCardsIconSVG, PremiumSecurityIconSVG, PremiumRewardsIconSVG, PremiumHelpIconSVG, PremiumLogoutIconSVG, PremiumSettingsIconSVG } from "@/components/PremiumMenuIcons";
import { TransactionDetails } from "@/components/TransactionDetails";

export default function ApplePayDashboard() {
  const [showBalance, setShowBalance] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedCard, setSelectedCard] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [showTransactionDetails, setShowTransactionDetails] = useState(false);
  const { user, isAuthenticated: authStatus, error: authError } = useAuth();
  const { createError, getUserFriendlyMessage } = useErrorHandler();

  // Get user balance with comprehensive error handling
  const { 
    data: balanceData, 
    isLoading: balanceLoading, 
    error: balanceError,
    refetch: refetchBalance 
  } = useQuery({
    queryKey: ['/api/user/balance'],
    enabled: !!user && authStatus,
    retry: (failureCount, error: any) => {
      if (error?.code === ErrorCode.AUTH_ERROR) return false;
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),
    staleTime: 30000 // 30 seconds
  });

  // Get recent transactions with error handling
  const { 
    data: transactions, 
    isLoading: transactionsLoading, 
    error: transactionsError,
    refetch: refetchTransactions 
  } = useQuery({
    queryKey: ['/api/transactions'],
    enabled: !!user && authStatus,
    retry: (failureCount, error: any) => {
      if (error?.code === ErrorCode.AUTH_ERROR) return false;
      return failureCount < 2;
    },
    retryDelay: 2000,
    staleTime: 60000 // 1 minute
  });

  // Safe data extraction with fallbacks
  const balance = parseFloat((balanceData as any)?.balance) || 0;
  const userName = (user as any)?.name || (user as any)?.email?.split('@')[0] || "User";

  // Error recovery functions
  const handleRefreshData = useCallback(async () => {
    try {
      await Promise.all([
        refetchBalance(),
        refetchTransactions()
      ]);
    } catch (error) {
      createError(
        ErrorCode.UNKNOWN_ERROR,
        'Failed to refresh dashboard data',
        error,
        { context: 'dashboard_refresh' }
      );
    }
  }, [refetchBalance, refetchTransactions, createError]);

  // Check for critical errors that need user attention
  const hasCriticalError = authError || 
    (balanceError && (balanceError as any)?.code === ErrorCode.AUTH_ERROR) ||
    (transactionsError && (transactionsError as any)?.code === ErrorCode.AUTH_ERROR);

  // Handle errors with useEffect
  useEffect(() => {
    if (balanceError && !(balanceError as any)?.code) {
      createError(
        ErrorCode.SERVER_ERROR,
        'Failed to load account balance',
        balanceError,
        { context: 'dashboard_balance_fetch' }
      );
    }
  }, [balanceError, createError]);

  useEffect(() => {
    if (transactionsError && !(transactionsError as any)?.code) {
      createError(
        ErrorCode.SERVER_ERROR,
        'Failed to load recent transactions',
        transactionsError,
        { context: 'dashboard_transactions_fetch' }
      );
    }
  }, [transactionsError, createError]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const handleTransactionClick = (transaction: any) => {
    setSelectedTransaction(transaction);
    setShowTransactionDetails(true);
  };

  const handleCloseTransactionDetails = () => {
    setShowTransactionDetails(false);
    setSelectedTransaction(null);
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
      {/* Ultra-Premium Dynamic Header - Apple Pay Inspired */}
      <div className="px-6 pt-12 pb-6 relative z-10 overflow-hidden">
        {/* Floating background elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-8 left-1/4 w-2 h-2 bg-blue-400/20 rounded-full animate-pulse delay-1000" />
          <div className="absolute top-16 right-1/3 w-1 h-1 bg-purple-400/30 rounded-full animate-pulse delay-2000" />
          <div className="absolute top-20 left-1/2 w-1.5 h-1.5 bg-indigo-400/25 rounded-full animate-pulse delay-3000" />
        </div>

        <div className="flex items-center justify-between mb-8 relative">
          {/* Left Section - Avatar & Greeting */}
          <div className="flex items-center space-x-5">
            {/* Ultra-Premium Avatar with Dynamic Effects */}
            <div className="relative group">
              {/* Multi-layered glow rings */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-blue-500/30 rounded-full animate-spin-slow blur-md" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 rounded-full animate-pulse scale-110 blur-lg" />
              
              {/* Main avatar container */}
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-gray-800/90 via-gray-700/90 to-gray-900/90 backdrop-blur-xl border-2 border-white/15 shadow-2xl overflow-hidden group-hover:scale-105 transition-all duration-500">
                <img 
                  src="/avatar.gif" 
                  alt="Profile Avatar"
                  className="w-full h-full object-cover rounded-full"
                />
                
                {/* Subtle overlay with breathing effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 rounded-full animate-pulse" />
              </div>
              
              {/* Enhanced online indicator */}
              <div className="absolute -bottom-1 -right-1">
                <div className="absolute inset-0 bg-green-400 rounded-full scale-150" />
                <div className="relative w-7 h-7 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full border-3 border-black shadow-lg flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              </div>
            </div>
            
            {/* Ultra-Premium Greeting Text */}
            <div className="space-y-1">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-100 via-white to-blue-50 bg-clip-text text-transparent animate-in slide-in-from-left-4 duration-700" style={{ fontFamily: 'SF Pro Display, system-ui' }}>
                {getGreeting()}
              </h1>
              <p className="text-white/60 text-sm font-medium tracking-wide animate-in slide-in-from-left-4 duration-700 delay-200">
                Your digital wallet
              </p>
            </div>
          </div>
          
          {/* Right Section - Premium Action Buttons */}
          <div className="flex items-center space-x-4">
            {/* Security/Notifications Button */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-full blur-lg" />
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative h-14 w-14 rounded-full bg-white/8 backdrop-blur-2xl border border-white/15 hover:bg-white/15 transition-all duration-500 hover:scale-110 group"
              >
                <div className="relative">
                  <ApplePaySecuritySVG className="h-7 w-7 text-white group-hover:text-blue-200 transition-colors duration-300" />
                  
                  {/* Ultra-premium notification badge */}
                  <div className="absolute -top-3 -right-3">
                    <div className="relative w-7 h-7 bg-gradient-to-br from-red-500 to-red-600 rounded-full border-2 border-white/20 shadow-2xl flex items-center justify-center backdrop-blur-sm">
                      <span className="text-xs font-bold text-white">2</span>
                    </div>
                  </div>
                </div>
              </Button>
            </div>
            
            {/* Ultra-Premium Menu Button */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-500/15 to-gray-600/15 rounded-full blur-lg group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-300" />
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative h-14 w-14 rounded-full bg-white/8 backdrop-blur-2xl border border-white/15 hover:bg-white/15 transition-all duration-500 hover:scale-110 group"
                onClick={() => setShowMenu(!showMenu)}
              >
                <div className="relative">
                  <MoreHorizontal className="h-7 w-7 text-white group-hover:text-blue-200 transition-all duration-300 group-hover:rotate-90" />
                  
                  {/* Subtle pulsing dot indicators */}
                  <div className="absolute inset-0 flex items-center justify-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-1 h-1 bg-white/40 rounded-full animate-pulse delay-100" />
                    <div className="w-1 h-1 bg-white/40 rounded-full animate-pulse delay-200" />
                    <div className="w-1 h-1 bg-white/40 rounded-full animate-pulse delay-300" />
                  </div>
                </div>
              </Button>
            </div>
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
                        {/* Ultra-Premium EMV Chip */}
                        <UltraPremiumChipSVG 
                          className="w-8 h-6" 
                          chipColor={card.chipColor}
                          animated={true}
                        />
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
                onClick={() => handleTransactionClick(transaction)}
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

      {/* Ultra-Premium Dynamic Menu Overlay */}
      {showMenu && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl animate-in fade-in-0 duration-300">
          <div className="absolute right-0 top-0 h-full w-96 bg-gradient-to-br from-gray-900/98 via-gray-800/95 to-black/98 backdrop-blur-3xl border-l border-white/10 shadow-2xl animate-in slide-in-from-right-full duration-500 ease-out">
            
            {/* Floating light rays background */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/4 -right-10 w-32 h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent rotate-45 animate-pulse" />
              <div className="absolute top-1/2 -right-5 w-24 h-px bg-gradient-to-r from-transparent via-purple-500/15 to-transparent rotate-12 animate-pulse delay-1000" />
              <div className="absolute top-3/4 -right-8 w-28 h-px bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent -rotate-45 animate-pulse delay-2000" />
            </div>

            <div className="relative p-8 h-full flex flex-col">
              {/* Ultra-Premium Header */}
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-lg animate-pulse" />
                    <div className="relative p-3 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-xl border border-white/15">
                      <OPPBLogoSVG className="w-8 h-8" animated />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                      OPPB Wallet
                    </h3>
                    <p className="text-sm text-white/60 font-medium">Premium Digital Experience</p>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/15 to-pink-500/15 rounded-full blur-md animate-pulse" />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setShowMenu(false)} 
                    className="relative h-12 w-12 rounded-full bg-white/8 backdrop-blur-xl border border-white/15 text-white/80 hover:text-white hover:bg-white/15 transition-all duration-300 hover:scale-105"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Ultra-Dynamic Menu Items */}
              <div className="space-y-3 flex-1">
                {[
                  { icon: PremiumProfileIconSVG, label: "Profile & Settings", href: "/profile", delay: "delay-100" },
                  { icon: PremiumCardsIconSVG, label: "Payment Methods", href: "/wallet", delay: "delay-200" },
                  { icon: PremiumSecurityIconSVG, label: "Security & Privacy", href: "/settings", delay: "delay-300" },
                  { icon: PremiumRewardsIconSVG, label: "Rewards & Offers", href: "/rewards", delay: "delay-400" },
                  { icon: PremiumHelpIconSVG, label: "Help & Support", href: "/help", delay: "delay-500" },
                  { icon: PremiumLogoutIconSVG, label: "Sign Out", href: "/logout", delay: "delay-600" }
                ].map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={item.label} className={`animate-in slide-in-from-right-8 fade-in-0 duration-700 ${item.delay}`}>
                      <Link href={item.href}>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start rounded-2xl h-16 text-white hover:bg-white/10 transition-all duration-500 group relative overflow-hidden border border-transparent hover:border-white/20 hover:shadow-2xl hover:shadow-white/5"
                          onClick={() => setShowMenu(false)}
                        >
                          {/* Button glow effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          
                          <div className="relative flex items-center space-x-4">
                            <div className="relative">
                              <div className="absolute inset-0 bg-white/10 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              <div className="relative p-2 rounded-xl bg-white/5 group-hover:bg-white/15 transition-colors duration-300">
                                <IconComponent className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" animated />
                              </div>
                            </div>
                            <span className="text-base font-semibold group-hover:text-white/90 transition-colors duration-300">
                              {item.label}
                            </span>
                          </div>
                          
                          {/* Arrow indicator */}
                          <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                            <ArrowRight className="h-4 w-4 text-white/60" />
                          </div>
                        </Button>
                      </Link>
                    </div>
                  );
                })}
              </div>

              {/* Premium Footer */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="text-center">
                  <p className="text-xs text-white/40 font-medium">OPPB Premium v1.0.0</p>
                  <p className="text-xs text-white/30 mt-1">Ultra-Premium Digital Wallet</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Transaction Details Modal */}
      {showTransactionDetails && selectedTransaction && (
        <TransactionDetails 
          transaction={selectedTransaction} 
          onClose={handleCloseTransactionDetails} 
        />
      )}

      <BottomNavigation activeTab="home" />
    </div>
  );
}