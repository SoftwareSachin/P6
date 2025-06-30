import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Scan, 
  Send, 
  Users, 
  CreditCard, 
  Phone, 
  Zap, 
  Shield, 
  Globe, 
  Smartphone,
  Bell,
  Menu,
  Eye,
  EyeOff,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Star,
  Sparkles
} from "lucide-react";
import { Link } from "wouter";
import { BottomNavigation } from "@/components/BottomNavigation";
import { COLORS } from "@/lib/constants";
import { 
  PremiumQRScannerSVG, 
  PremiumSendMoneySVG, 
  PremiumSplitBillSVG, 
  PremiumRequestMoneySVG,
  PremiumRechargeSVG,
  PremiumOfflinePaySVG,
  PremiumInsuranceSVG,
  PremiumRewardsSVG,
  PremiumBellSVG,
  PremiumMenuSVG,
  PremiumShoppingCartSVG,
  PremiumUserSVG,
  PremiumPhoneSVG,
  PremiumDollarSVG,
  PremiumCreditCardSVG,
  PremiumSettingsSVG,
  PremiumHelpSVG,
  PremiumLogoutSVG,
  OPPBLogoSVG
} from "@/components/PremiumSVGs";
import {
  ApplePayFaceIDSVG,
  ApplePayCreditCardSVG,
  ApplePayNFCSVG,
  ApplePayTapSVG,
  ApplePayTransitSVG,
  ApplePayMerchantSVG,
  ApplePaySecuritySVG,
  ApplePayQRCodeSVG,
  ApplePayPhoneSVG,
  ApplePayWalletSVG,
  ApplePayLocationSVG,
  ApplePayTimeSVG,
  ApplePaySuccessSVG,
  ApplePaySendMoneySVG,
  ApplePayContactlessSVG,
  ApplePayCardStackSVG,
  ApplePayBiometricSVG
} from "@/components/ApplePaySVGs";

export default function Dashboard() {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [greeting, setGreeting] = useState("");

  const { data: balance, isLoading: balanceLoading } = useQuery({
    queryKey: ["/api/user/balance"],
  });

  const { data: transactions, isLoading: transactionsLoading } = useQuery({
    queryKey: ["/api/transactions"],
  });

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 17) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  const quickActions = [
    {
      icon: ApplePayQRCodeSVG,
      title: "QR Scanner",
      subtitle: "Scan & Pay instantly",
      href: "/qr-scanner",
      gradient: "apple-pay-gradient",
      glowColor: "from-blue-500/20 to-indigo-600/20"
    },
    {
      icon: ApplePaySendMoneySVG,
      title: "Send Money",
      subtitle: "To anyone, anywhere",
      href: "/send-money",
      gradient: "apple-pay-gradient",
      glowColor: "from-green-500/20 to-emerald-600/20"
    },
    {
      icon: ApplePayCardStackSVG,
      title: "Split Bill",
      subtitle: "Share with friends",
      href: "/split-bill",
      gradient: "apple-pay-gradient",
      glowColor: "from-purple-500/20 to-pink-600/20"
    },
    {
      icon: ApplePayContactlessSVG,
      title: "Request",
      subtitle: "Get paid fast",
      href: "/request-money",
      gradient: "apple-pay-gradient",
      glowColor: "from-orange-500/20 to-red-500/20"
    },
    {
      icon: ApplePayPhoneSVG,
      title: "Recharge",
      subtitle: "Mobile & DTH",
      href: "/recharge",
      gradient: "apple-pay-gradient",
      glowColor: "from-teal-500/20 to-cyan-600/20"
    },
    {
      icon: ApplePayNFCSVG,
      title: "Offline Pay",
      subtitle: "No internet needed",
      href: "/offline-payments",
      gradient: "apple-pay-gradient",
      glowColor: "from-indigo-500/20 to-purple-600/20"
    },
    {
      icon: ApplePaySecuritySVG,
      title: "Insurance",
      subtitle: "Protect & Save",
      href: "/insurance",
      gradient: "apple-pay-gradient",
      glowColor: "from-rose-500/20 to-pink-600/20"
    },
    {
      icon: ApplePayBiometricSVG,
      title: "Rewards",
      subtitle: "Earn cashback",
      href: "/rewards",
      gradient: "apple-pay-gradient",
      glowColor: "from-yellow-500/20 to-amber-600/20"
    }
  ];

  const recentTransactions = Array.isArray(transactions) ? transactions.slice(0, 3) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pb-20 relative overflow-hidden">
      {/* Premium Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-2xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-pink-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Ultra Premium Status Bar */}
      <div className="relative z-10 flex items-center justify-between p-6 backdrop-blur-2xl bg-black/20 border-b border-white/10">
        <div className="flex items-center space-x-4 animate-slide-up-premium">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl apple-pay-gradient flex items-center justify-center p-2 shadow-glow animate-pulse-glow">
              <OPPBLogoSVG className="w-8 h-8" animated={true} />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black animate-pulse"></div>
          </div>
          <div>
            <p className="text-lg font-bold text-white">{greeting}</p>
            <p className="text-sm text-white/70 flex items-center space-x-1">
              <ApplePayBiometricSVG className="w-4 h-4" />
              <span>Secured with Face ID</span>
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="sm" 
            className="relative w-12 h-12 rounded-2xl p-0 apple-pay-glass hover:bg-white/20 group"
          >
            <ApplePayBiometricSVG className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-12 h-12 rounded-2xl p-0 apple-pay-glass hover:bg-white/20 group"
          >
            <PremiumMenuSVG className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </Button>
        </div>
      </div>

      <div className="relative z-10 p-6 space-y-8">
        {/* Ultra Premium Apple Pay Balance Card */}
        <Card className="border-0 shadow-premium animate-scale-in-premium relative overflow-hidden">
          <div className="absolute inset-0 apple-pay-gradient"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20"></div>
          
          {/* Premium Animated Shimmer Effect */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute top-6 right-6 w-20 h-20 bg-white/5 rounded-full blur-xl animate-float"></div>
          <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/10 rounded-full blur-lg animate-float" style={{ animationDelay: '1s' }}></div>

          <CardContent className="p-8 text-white relative z-10">
            <div className="space-y-6">
              {/* Header Section */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center shadow-lg animate-pulse-glow">
                    <ApplePayWalletSVG className="w-8 h-8 text-white drop-shadow-sm" />
                  </div>
                  <div>
                    <p className="text-white/90 text-base font-semibold">OPPB Wallet</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge className="bg-white/20 text-white text-xs backdrop-blur-sm border-white/30">
                        <ApplePaySecuritySVG className="w-3 h-3 mr-1" />
                        Bank Protected
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-300 fill-current" />
                        <span className="text-xs text-white/80">Premium</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setBalanceVisible(!balanceVisible)}
                  className="text-white hover:bg-white/20 rounded-2xl w-12 h-12 p-0 backdrop-blur-sm group"
                >
                  {balanceVisible ? 
                    <EyeOff className="w-6 h-6 group-hover:scale-110 transition-transform" /> : 
                    <Eye className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  }
                </Button>
              </div>

              {/* Balance Display */}
              <div className="space-y-4">
                <div className="flex items-baseline space-x-3">
                  <span className="text-5xl font-black text-white drop-shadow-lg">
                    {balanceVisible 
                      ? balanceLoading 
                        ? "••••" 
                        : `₹${parseFloat((balance as any)?.balance || "0").toLocaleString('en-IN')}`
                      : "••••••••"
                    }
                  </span>
                  {!balanceLoading && (
                    <div className="flex items-center space-x-1 text-green-300 animate-pulse-glow">
                      <TrendingUp className="w-5 h-5" />
                      <span className="text-base font-bold">+2.5%</span>
                    </div>
                  )}
                </div>
                
                {/* Financial Insights */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-green-500/20 backdrop-blur-sm flex items-center justify-center">
                      <ArrowDownRight className="w-5 h-5 text-green-300" />
                    </div>
                    <div>
                      <p className="text-xs text-white/70 font-medium">Income</p>
                      <p className="text-base font-bold text-green-300">+₹12,450</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-red-500/20 backdrop-blur-sm flex items-center justify-center">
                      <ArrowUpRight className="w-5 h-5 text-red-300" />
                    </div>
                    <div>
                      <p className="text-xs text-white/70 font-medium">Spent</p>
                      <p className="text-base font-bold text-red-300">-₹8,230</p>
                    </div>
                  </div>
                </div>

                {/* Apple Pay Style Action Buttons */}
                <div className="flex space-x-4 pt-4">
                  <Button className="flex-1 bg-white/20 hover:bg-white/30 text-white border-0 rounded-2xl h-14 font-bold backdrop-blur-xl transition-all duration-300 hover:scale-105 shadow-lg">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Add Money
                  </Button>
                  <Button className="flex-1 bg-white/10 hover:bg-white/20 text-white border-0 rounded-2xl h-14 font-bold backdrop-blur-xl transition-all duration-300 hover:scale-105 shadow-lg">
                    <Zap className="w-5 h-5 mr-2" />
                    Pay Bills
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ultra Premium Quick Actions */}
        <div className="animate-slide-up-premium" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black text-white flex items-center space-x-3">
              <ApplePayCardStackSVG className="w-8 h-8" />
              <span>Quick Actions</span>
            </h2>
            <Button variant="ghost" className="text-purple-300 font-bold hover:text-white">
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href}>
                <Card className="border-0 overflow-hidden hover:scale-105 transition-all duration-700 cursor-pointer group card-3d-stack animate-scale-in-premium" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="absolute inset-0 apple-pay-glass"></div>
                  <div className={`absolute inset-0 bg-gradient-to-br ${action.glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  <CardContent className="p-6 relative z-10">
                    <div className="space-y-4">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-3xl apple-pay-gradient flex items-center justify-center shadow-premium group-hover:scale-110 transition-all duration-500 p-3">
                          <action.icon className="w-10 h-10 text-white drop-shadow-lg" animated={true} />
                        </div>
                        <div className="absolute inset-0 w-16 h-16 rounded-3xl apple-pay-gradient animate-pulse-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                      
                      <div>
                        <h3 className="font-black text-white text-xl mb-2 group-hover:text-purple-200 transition-colors drop-shadow-sm">{action.title}</h3>
                        <p className="text-white/80 text-sm font-medium">{action.subtitle}</p>
                      </div>
                    </div>
                    
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0">
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <ArrowUpRight className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Ultra Premium Recent Transactions */}
        <div className="animate-slide-up-premium" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black text-white flex items-center space-x-3">
              <ApplePayTimeSVG className="w-8 h-8" />
              <span>Recent Activity</span>
            </h2>
            <Link href="/transactions">
              <Button variant="ghost" className="text-purple-300 font-bold hover:text-white">
                View All
              </Button>
            </Link>
          </div>

          {transactionsLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="apple-pay-glass border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 bg-white/20 rounded-3xl animate-pulse"></div>
                      <div className="flex-1 space-y-3">
                        <div className="h-5 bg-white/20 rounded-xl animate-pulse"></div>
                        <div className="h-4 bg-white/10 rounded-lg w-3/4 animate-pulse"></div>
                      </div>
                      <div className="h-8 bg-white/20 rounded-xl w-20 animate-pulse"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : recentTransactions.length > 0 ? (
            <div className="space-y-4">
              {recentTransactions.map((transaction: any, index: number) => (
                <Card key={transaction.id} className="border-0 apple-pay-glass hover:shadow-premium transition-all duration-500 transaction-row-premium animate-slide-up-premium card-3d-stack" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-5">
                      <div className={`w-14 h-14 rounded-3xl flex items-center justify-center shadow-premium ${
                        transaction.type === 'credit' ? 'bg-green-500 shadow-green-500/30' : 'bg-red-500 shadow-red-500/30'
                      } animate-pulse-glow`}>
                        {transaction.type === 'credit' ? (
                          <ArrowDownRight className="w-7 h-7 text-white drop-shadow-sm" />
                        ) : (
                          <ArrowUpRight className="w-7 h-7 text-white drop-shadow-sm" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-bold text-white text-lg mb-1 drop-shadow-sm">{transaction.description}</h3>
                        <p className="text-white/70 text-sm flex items-center space-x-2">
                          <ApplePayTimeSVG className="w-4 h-4" />
                          <span>{new Date(transaction.createdAt).toLocaleDateString()}</span>
                        </p>
                      </div>
                      
                      <div className="text-right">
                        <p className={`font-black text-xl drop-shadow-sm ${
                          transaction.type === 'credit' ? 'text-green-300' : 'text-red-300'
                        }`}>
                          {transaction.type === 'credit' ? '+' : '-'}₹{parseFloat(transaction.amount).toLocaleString('en-IN')}
                        </p>
                        <Badge className={`text-xs mt-1 ${
                          transaction.status === 'completed' ? 'bg-green-500/20 text-green-300 border-green-500/30' : 
                          transaction.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' : 
                          'bg-red-500/20 text-red-300 border-red-500/30'
                        } backdrop-blur-sm`}>
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-0 apple-pay-glass">
              <CardContent className="p-12 text-center">
                <div className="w-24 h-24 mx-auto mb-8 rounded-3xl apple-pay-gradient flex items-center justify-center shadow-premium animate-pulse-glow">
                  <ApplePaySuccessSVG className="w-12 h-12 text-white drop-shadow-sm" />
                </div>
                <h3 className="text-2xl font-black text-white mb-4 drop-shadow-sm">No transactions yet</h3>
                <p className="text-white/70 mb-8 text-lg">Start your premium payment journey</p>
                <Link href="/qr-scanner">
                  <Button className="apple-pay-gradient px-8 py-4 rounded-2xl text-white font-bold text-lg hover:scale-105 transition-all duration-300 shadow-premium">
                    <ApplePayQRCodeSVG className="w-6 h-6 mr-3" />
                    Scan QR Code
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <BottomNavigation activeTab="home" />
    </div>
  );
}