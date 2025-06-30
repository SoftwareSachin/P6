import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, QrCode, Send, Users, RotateCcw, Zap, Bell, Menu, Smartphone, WifiOff, User, Star, Clock, Check, AlertCircle, DollarSign, ShoppingCart, Receipt, Phone, Gift, Trophy, Shield, Settings, CreditCard, FileText, AtSign, BarChart3, Plus, ArrowRight, Globe, Palette, HelpCircle, BookOpen, Building, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { COLORS } from "@/lib/constants";
import { BottomNavigation } from "@/components/BottomNavigation";
import { Link } from "wouter";
import { useAuth } from "@/hooks/useAuth";

export default function Dashboard() {
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

  const balance = (balanceData as any)?.balance || "12547.50";
  const userName = (user as any)?.name || "Sachin";

  // Helper function to render transaction icons
  const getTransactionIcon = (iconType: string) => {
    const iconClasses = "h-5 w-5";
    switch (iconType) {
      case "shopping-cart":
        return <ShoppingCart className={iconClasses} />;
      case "user":
        return <User className={iconClasses} />;
      case "zap":
        return <Zap className={iconClasses} />;
      case "phone":
        return <Phone className={iconClasses} />;
      default:
        return <Receipt className={iconClasses} />;
    }
  };

  // Mock recent transactions data matching PhonePe/GPay style exactly
  const recentTransactions = [
    {
      id: 1,
      merchant: "Zomato",
      icon: "shopping-cart",
      amount: -285,
      status: "success",
      time: "Today, 2:30 PM",
      type: "debit"
    },
    {
      id: 2,
      merchant: "Rohit Kumar",
      icon: "user",
      amount: 500,
      status: "success",
      time: "Yesterday, 6:15 PM",
      type: "credit"
    },
    {
      id: 3,
      merchant: "Electricity",
      icon: "zap",
      amount: -1200,
      status: "pending",
      time: "Oct 28, 11:30 AM",
      type: "debit"
    },
    {
      id: 4,
      merchant: "Rahul Singh",
      icon: "phone",
      amount: -50,
      status: "offline",
      time: "Oct 27, 4:20 PM (Offline)",
      type: "debit"
    }
  ];

  // Get current time greeting exactly as specified
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  // Exact Quick Actions as specified - 8 icons in 2 rows (4x2)
  const quickActions = [
    { id: 1, name: "Scan & Pay", icon: QrCode, route: "/qr-scanner", color: COLORS.primary, bgColor: `${COLORS.primary}15` },
    { id: 2, name: "To Mobile", icon: Send, route: "/send-money", color: COLORS.success, bgColor: `${COLORS.success}15` },
    { id: 3, name: "Recharge & Bills", icon: FileText, route: "/bills", color: COLORS.warning, bgColor: `${COLORS.warning}15` },
    { id: 4, name: "Request", icon: RotateCcw, route: "/request", color: COLORS.info, bgColor: `${COLORS.info}15` },
    { id: 5, name: "My UPI", icon: AtSign, route: "/upi", color: COLORS.primary, bgColor: `${COLORS.primary}15` },
    { id: 6, name: "Link Card", icon: CreditCard, route: "/cards", color: COLORS.secondary, bgColor: `${COLORS.secondary}15` },
    { id: 7, name: "Transaction History", icon: BarChart3, route: "/transaction-history", color: COLORS.accent, bgColor: `${COLORS.accent}15` },
    { id: 8, name: "Offline Payments", icon: Zap, route: "/offline-payments", color: COLORS.offline, bgColor: `${COLORS.offline}15` }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <Check className="h-4 w-4 text-green-500" />;
      case "pending":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "offline":
        return <WifiOff className="h-4 w-4 text-orange-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.background }}>
      {/* Header Section - Exact PhonePe/GPay Style */}
      <div className="flex items-center justify-between p-4" style={{ backgroundColor: COLORS.cardWhite }}>
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/api/avatar" />
            <AvatarFallback style={{ backgroundColor: COLORS.primary, color: 'white' }}>
              {userName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm" style={{ color: COLORS.textSecondary }}>
              {getGreeting()}!
            </p>
            <p className="font-semibold" style={{ color: COLORS.textPrimary }}>
              Hi {userName}!
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" style={{ color: COLORS.textPrimary }} />
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></div>
          </Button>
          <Button variant="ghost" size="icon">
            <Smartphone className="h-5 w-5" style={{ color: COLORS.success }} />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setShowMenu(true)}>
            <Menu className="h-5 w-5" style={{ color: COLORS.textPrimary }} />
          </Button>
        </div>
      </div>

      {/* Premium Balance Card - Material Design 3.0 */}
      <div className="p-4">
        <Card className="border-0 overflow-hidden balance-card-premium animate-slide-up-premium">
          <CardContent className="p-0 relative">
            {/* Premium Background Effects */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -translate-y-20 translate-x-20 animate-float"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/40 rounded-full translate-y-16 -translate-x-16"></div>
              <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-white/20 rounded-full -translate-x-12 -translate-y-12 animate-pulse-slow"></div>
            </div>
            
            <div className="relative z-10 p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white/80 text-sm font-medium">Available Balance</p>
                    <p className="text-white/60 text-xs">Last updated: just now</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowBalance(!showBalance)}
                  className="text-white hover:bg-white/20 rounded-xl animate-pulse-glow"
                >
                  {showBalance ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </Button>
              </div>
              
              <div className="mb-8">
                <p className={`text-4xl font-bold text-white transition-all duration-300 ${showBalance ? 'balance-visible' : 'balance-hidden'}`}>
                  ₹{showBalance ? balance.toLocaleString() : "••••••"}
                </p>
                <p className="text-white/60 text-sm mt-1">Indian Rupees</p>
              </div>
              
              <div className="flex space-x-3">
                <Button className="btn-primary-premium flex-1 bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Add Money
                </Button>
                <Button className="flex-1 bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm rounded-xl">
                  <Send className="h-4 w-4 mr-2" />
                  Send Money
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Premium Quick Actions Grid - Material Design 3.0 */}
      <div className="p-4">
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((action, index) => (
            <Link key={action.id} href={action.route}>
              <div 
                className="quick-action-premium animate-scale-in flex flex-col items-center space-y-3 relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Premium Icon Container */}
                <div className="relative">
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-card animate-shimmer"
                    style={{ 
                      background: `linear-gradient(135deg, ${action.color}15 0%, ${action.color}25 100%)`,
                      border: `1px solid ${action.color}20`
                    }}
                  >
                    <action.icon 
                      className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" 
                      style={{ color: action.color }} 
                    />
                  </div>
                  
                  {/* Subtle glow effect */}
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-30 transition-opacity duration-300"
                    style={{ 
                      background: `radial-gradient(circle, ${action.color}40 0%, transparent 70%)`,
                      filter: 'blur(8px)'
                    }}
                  ></div>
                </div>
                
                {/* Premium Typography */}
                <span 
                  className="text-xs text-center font-semibold leading-tight tracking-wide"
                  style={{ color: COLORS.textPrimary }}
                >
                  {action.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Premium Recent Transactions - Material Design 3.0 */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold" style={{ color: COLORS.textPrimary }}>
              Recent Transactions
            </h2>
            <p className="text-sm" style={{ color: COLORS.textSecondary }}>
              Last 7 days activity
            </p>
          </div>
          <Link href="/transaction-history">
            <Button className="btn-primary-premium px-4 py-2 bg-gradient-primary hover:shadow-premium">
              View All
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="space-y-3">
          {recentTransactions.map((transaction, index) => (
            <div 
              key={transaction.id} 
              className="transaction-item-premium animate-slide-up-premium"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center space-x-4">
                {/* Premium Transaction Icon */}
                <div className="relative">
                  <div 
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-card ${
                      transaction.status === 'success' ? 'bg-gradient-success' : 
                      transaction.status === 'pending' ? 'bg-gradient-to-br from-orange-400 to-yellow-500' :
                      'bg-gradient-to-br from-orange-500 to-red-500'
                    }`}
                  >
                    {getTransactionIcon(transaction.icon)}
                  </div>
                  
                  {/* Status Indicator */}
                  <div className="absolute -bottom-1 -right-1">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      transaction.status === 'success' ? 'bg-green-500' :
                      transaction.status === 'pending' ? 'bg-yellow-500' :
                      'bg-orange-500'
                    }`}>
                      {getStatusIcon(transaction.status)}
                    </div>
                  </div>
                </div>
                
                {/* Transaction Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-base" style={{ color: COLORS.textPrimary }}>
                        {transaction.merchant}
                      </h3>
                      <p className="text-sm font-medium" style={{ color: COLORS.textSecondary }}>
                        {transaction.time}
                      </p>
                      {transaction.status === 'offline' && (
                        <Badge className="mt-1 bg-orange-100 text-orange-800 text-xs">
                          <WifiOff className="h-3 w-3 mr-1" />
                          Offline Payment
                        </Badge>
                      )}
                    </div>
                    
                    {/* Premium Amount Display */}
                    <div className="text-right">
                      <p 
                        className={`font-bold text-lg ${
                          transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {transaction.type === 'credit' ? '+' : '-'}₹{Math.abs(transaction.amount).toLocaleString()}
                      </p>
                      <p className={`text-xs font-medium ${
                        transaction.status === 'success' ? 'text-green-600' :
                        transaction.status === 'pending' ? 'text-yellow-600' :
                        'text-orange-600'
                      }`}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hamburger Menu Overlay */}
      {showMenu && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="flex items-center justify-between p-4 border-b">
            <Menu className="h-6 w-6" style={{ color: COLORS.textPrimary }} />
            <Button variant="ghost" size="icon" onClick={() => setShowMenu(false)}>
              <span className="text-xl">✖</span>
            </Button>
          </div>
          
          <div className="p-4">
            <div className="flex items-center space-x-4 mb-6">
              <Avatar className="h-16 w-16">
                <AvatarFallback style={{ backgroundColor: COLORS.primary, color: 'white' }}>
                  {userName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-bold" style={{ color: COLORS.textPrimary }}>
                  {userName} Gupta
                </h3>
                <p className="text-sm" style={{ color: COLORS.textSecondary }}>
                  singhal3.sachin7@gmail.com
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  View Profile
                </Button>
              </div>
            </div>

            <div className="border-t pt-4 space-y-4" style={{ borderColor: COLORS.border }}>
              <div className="space-y-3">
                <MenuItem icon={<DollarSign className="h-5 w-5" />} text="Payments & Bank Accounts" />
                <MenuItem icon={<Gift className="h-5 w-5" />} text="Refer & Earn" />
                <MenuItem icon={<Trophy className="h-5 w-5" />} text="Rewards" />
                <MenuItem icon={<Smartphone className="h-5 w-5" />} text="OPPB for Business" />
                <MenuItem icon={<Shield className="h-5 w-5" />} text="Privacy & Security" />
                <MenuItem icon={<Globe className="h-5 w-5" />} text="Language: English" />
                <MenuItem icon={<Palette className="h-5 w-5" />} text="Theme: Auto" />
                <MenuItem icon={<HelpCircle className="h-5 w-5" />} text="Help & Support" />
                <MenuItem icon={<Settings className="h-5 w-5" />} text="Settings" />
              </div>

              <div className="border-t pt-4 space-y-3" style={{ borderColor: COLORS.border }}>
                <MenuItem icon={<BookOpen className="h-5 w-5" />} text="Terms & Conditions" />
                <MenuItem icon={<Shield className="h-5 w-5" />} text="Privacy Policy" />
                <MenuItem icon={<Building className="h-5 w-5" />} text="About OPPB" />
                <MenuItem icon={<LogOut className="h-5 w-5" />} text="Sign Out" />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="pb-20">
        <BottomNavigation activeTab="home" />
      </div>
    </div>
  );
}

// Menu Item Component
function MenuItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
      <div className="w-6 h-6 flex items-center justify-center">
        {icon}
      </div>
      <span style={{ color: COLORS.textPrimary }}>{text}</span>
    </div>
  );
}