import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Plus, QrCode, Send, FileText, RotateCcw, AtSign, CreditCard, BarChart3, Zap, ArrowRight, Bell, Menu, Smartphone, WifiOff, User, MapPin, Star, Clock, Check, AlertCircle, DollarSign, ShoppingCart, Users, Receipt, Phone, Gift, Trophy, Shield, HelpCircle, Settings, Globe, Palette, BookOpen, Building, LogOut } from "lucide-react";
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

      {/* Balance Card - Exact PhonePe/GPay Design */}
      <div className="p-4">
        <Card className="border-0 shadow-lg overflow-hidden">
          <CardContent 
            className="p-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white relative"
            style={{ background: 'linear-gradient(135deg, #6739B7 0%, #8B5CF6 50%, #3B82F6 100%)' }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-6 w-6 text-white" />
                  <span className="text-white/80">Available Balance</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowBalance(!showBalance)}
                  className="text-white hover:bg-white/20"
                >
                  {showBalance ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </Button>
              </div>
              
              <div className="mb-4">
                <p className="text-3xl font-bold">
                  ₹{showBalance ? balance : "••••••"}
                </p>
              </div>
              
              <div className="flex space-x-3">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white border-0"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Show
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white border-0"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Money
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions Grid - Exact 4x2 Layout as Specified */}
      <div className="p-4">
        <div className="grid grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link key={action.id} href={action.route}>
              <div className="flex flex-col items-center space-y-2 p-3 rounded-xl hover:scale-105 transition-transform">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: action.bgColor }}
                >
                  <action.icon className="h-6 w-6" style={{ color: action.color }} />
                </div>
                <span className="text-xs text-center font-medium" style={{ color: COLORS.textPrimary }}>
                  {action.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Transactions - Exact PhonePe/GPay Style */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold" style={{ color: COLORS.textPrimary }}>
            Recent Transactions
          </h2>
          <Link href="/transaction-history">
            <Button variant="ghost" size="sm">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-0">
            {recentTransactions.map((transaction, index) => (
              <div key={transaction.id}>
                <div className="flex items-center space-x-4 p-4">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                    {getTransactionIcon(transaction.icon)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium" style={{ color: COLORS.textPrimary }}>
                        {transaction.merchant}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span 
                          className={`font-semibold ${
                            transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {transaction.type === 'credit' ? '+' : '-'}₹{Math.abs(transaction.amount)}
                        </span>
                        {getStatusIcon(transaction.status)}
                      </div>
                    </div>
                    <p className="text-sm" style={{ color: COLORS.textSecondary }}>
                      {transaction.time}
                    </p>
                  </div>
                </div>
                {index < recentTransactions.length - 1 && (
                  <div className="border-b mx-4" style={{ borderColor: COLORS.border }}></div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
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