import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, QrCode, Send, Users, RotateCcw, Zap, Bell, Menu, Smartphone, WifiOff, User, Star, Clock, Check, AlertCircle, DollarSign, ShoppingCart, Receipt, Phone, Gift, Trophy, Shield, Settings, CreditCard, FileText, AtSign, BarChart3, Plus, ArrowRight, Globe, Palette, HelpCircle, BookOpen, Building, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BottomNavigation } from "@/components/BottomNavigation";
import { Link } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { OPPBLogoSVG, SecureShieldSVG, OfflineNetworkSVG, InstantPaymentSVG, GlobalNetworkSVG, BiometricSecuritySVG, MoneyTransferSVG, PremiumCardSVG } from "@/components/PremiumSVGs";

export default function PremiumDashboard() {
  const [showBalance, setShowBalance] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
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

  // Premium Quick Actions with Glassmorphism and Motion-Rich Effects
  const quickActions = [
    { icon: QrCode, label: "Scan & Pay", href: "/qr-scanner", gradient: "from-purple-500 to-pink-500", animated: true },
    { icon: Send, label: "Send Money", href: "/send-money", gradient: "from-blue-500 to-cyan-500", animated: true },
    { icon: Users, label: "Split Bill", href: "/split-bill", gradient: "from-green-500 to-emerald-500", animated: true },
    { icon: RotateCcw, label: "Request", href: "/request", gradient: "from-orange-500 to-red-500", animated: true },
    { icon: Zap, label: "Recharge", href: "/recharge", gradient: "from-yellow-500 to-orange-500", animated: true },
    { icon: WifiOff, label: "Offline Pay", href: "/offline-payments", gradient: "from-indigo-500 to-purple-500", animated: true },
    { icon: Shield, label: "Insurance", href: "/insurance", gradient: "from-teal-500 to-green-500", animated: true },
    { icon: Gift, label: "Rewards", href: "/rewards", gradient: "from-pink-500 to-rose-500", animated: true }
  ];

  // Premium Recent Transactions with High-Fidelity Design
  const recentTransactions = [
    {
      id: 1,
      merchant: "Zomato",
      icon: ShoppingCart,
      amount: -285,
      status: "success",
      time: "Today, 2:30 PM",
      type: "debit",
      category: "Food & Dining",
      image: "/api/placeholder/40/40"
    },
    {
      id: 2,
      merchant: "Rohit Kumar",
      icon: User,
      amount: 500,
      status: "success",
      time: "Yesterday, 6:15 PM",
      type: "credit",
      category: "Transfer",
      image: "/api/placeholder/40/40"
    },
    {
      id: 3,
      merchant: "BSES Delhi",
      icon: Zap,
      amount: -1200,
      status: "pending",
      time: "Oct 28, 11:30 AM",
      type: "debit",
      category: "Utilities",
      image: "/api/placeholder/40/40"
    },
    {
      id: 4,
      merchant: "Airtel Prepaid",
      icon: Phone,
      amount: -199,
      status: "success",
      time: "Oct 27, 3:45 PM",
      type: "debit",
      category: "Mobile Recharge",
      image: "/api/placeholder/40/40"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-container-lowest via-surface to-surface-container">
      {/* Premium Header with Advanced Glassmorphism */}
      <div className="px-6 pt-12 pb-6 relative">
        <div className="glass-card p-6 mb-8 animate-slide-up-premium">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Avatar className="h-16 w-16 ring-4 ring-white/30 shadow-2xl motion-rich">
                  <AvatarImage src="/api/placeholder/64/64" alt={userName} />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-xl font-bold text-display">
                    {userName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-400 to-green-500 border-4 border-white rounded-full animate-pulse-premium shadow-lg"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-display premium-text-contrast tracking-tight">{getGreeting()}, {userName}!</h1>
                <p className="text-sm text-muted-foreground font-medium tracking-wide">OPPB Premium Member</p>
                <div className="flex items-center mt-1 space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-600 font-medium">Online & Secure</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative h-12 w-12 rounded-2xl glass-card motion-rich glow-effect"
              >
                <Bell className="h-6 w-6 text-foreground" />
                <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-xs text-white p-0 flex items-center justify-center font-bold shadow-xl animate-pulse-premium">
                  2
                </Badge>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-12 w-12 rounded-2xl glass-card motion-rich glow-effect"
                onClick={() => setShowMenu(!showMenu)}
              >
                <Menu className="h-6 w-6 text-foreground" />
              </Button>
            </div>
          </div>
        </div>

        {/* Premium Balance Card - Apple Pay/Revolut Metal Style */}
        <Card className="border-0 overflow-hidden metallic-card gold-card animate-scale-in-premium">
          <CardContent className="p-0 relative">
            {/* Premium Animated Background Effects */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -translate-y-20 translate-x-20 animate-float"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/40 rounded-full translate-y-16 -translate-x-16 animate-float" style={{animationDelay: '1s'}}></div>
              <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-white/20 rounded-full -translate-x-12 -translate-y-12 animate-pulse-premium"></div>
            </div>
            
            <div className="relative z-10 p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm motion-rich">
                    <DollarSign className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <p className="text-white/90 text-sm font-semibold text-headline">Available Balance</p>
                    <p className="text-white/70 text-xs font-medium">Last updated: just now</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowBalance(!showBalance)}
                  className="text-white hover:bg-white/20 rounded-2xl motion-rich h-12 w-12"
                >
                  {showBalance ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
                </Button>
              </div>
              
              <div className="mb-8">
                <p className={`text-5xl font-black text-white text-display transition-premium ${showBalance ? 'balance-visible' : 'balance-hidden'}`}>
                  ₹{showBalance ? balance.toLocaleString() : "••••••"}
                </p>
                <p className="text-white/70 text-sm mt-1 font-medium">Indian Rupees • Premium Account</p>
              </div>
              
              <div className="flex space-x-4">
                <Button className="flex-1 bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm rounded-2xl motion-rich h-12 font-semibold">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Add Money
                </Button>
                <Button className="flex-1 bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm rounded-2xl motion-rich h-12 font-semibold">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Analytics
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Premium Quick Actions Grid - N26 Metal Style */}
      <div className="px-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-display premium-text-contrast">Quick Actions</h2>
          <Button variant="ghost" size="sm" className="text-primary font-semibold">
            View All
          </Button>
        </div>
        
        <div className="grid grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link key={action.label} href={action.href}>
              <div className="quick-action-premium motion-rich glow-effect animate-scale-in-premium" style={{animationDelay: `${index * 0.1}s`}}>
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${action.gradient} mb-3 motion-rich`}>
                  <action.icon className="h-6 w-6 text-white mx-auto" />
                </div>
                <p className="text-xs font-semibold text-center premium-text-contrast">{action.label}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Premium Recent Transactions - Monzo Premium Style */}
      <div className="px-6 mb-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-display premium-text-contrast">Recent Activity</h2>
          <Link href="/transactions">
            <Button variant="ghost" size="sm" className="text-primary font-semibold motion-rich">
              View All
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
        
        <div className="space-y-3">
          {recentTransactions.map((transaction, index) => (
            <div 
              key={transaction.id} 
              className="transaction-item-premium motion-rich animate-slide-up-premium" 
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Avatar className="h-12 w-12 shadow-lg">
                    <AvatarImage src={transaction.image} />
                    <AvatarFallback className="bg-gradient-to-br from-gray-100 to-gray-200">
                      <transaction.icon className="h-6 w-6 text-gray-600" />
                    </AvatarFallback>
                  </Avatar>
                  <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white shadow-sm ${
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
                      <p className="font-semibold text-display premium-text-contrast">{transaction.merchant}</p>
                      <p className="text-sm text-muted-foreground">{transaction.category}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold text-lg ${transaction.amount > 0 ? 'text-green-600' : 'text-foreground'}`}>
                        {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">{transaction.time}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Premium Side Menu with Glassmorphism */}
      {showMenu && (
        <div className="fixed inset-0 z-50 animate-radial-reveal">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowMenu(false)} />
          <div className="absolute right-0 top-0 h-full w-80 glass-card animate-slide-up-premium">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <OPPBLogoSVG className="w-10 h-10" animated />
                  <div>
                    <h3 className="font-bold text-display">OPPB Premium</h3>
                    <p className="text-sm text-muted-foreground">Your Digital Wallet</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setShowMenu(false)} className="motion-rich">
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-2">
                {[
                  { icon: User, label: "Profile", href: "/profile" },
                  { icon: CreditCard, label: "Cards & Banks", href: "/cards" },
                  { icon: Shield, label: "Security", href: "/security" },
                  { icon: BarChart3, label: "Analytics", href: "/analytics" },
                  { icon: Gift, label: "Rewards", href: "/rewards" },
                  { icon: Settings, label: "Settings", href: "/settings" },
                  { icon: HelpCircle, label: "Help & Support", href: "/help" },
                  { icon: LogOut, label: "Sign Out", href: "/logout" }
                ].map((item, index) => (
                  <Link key={item.label} href={item.href}>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start motion-rich rounded-2xl h-12 animate-slide-up-premium"
                      style={{animationDelay: `${index * 0.05}s`}}
                      onClick={() => setShowMenu(false)}
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      {item.label}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <BottomNavigation activeTab="home" />
    </div>
  );
}