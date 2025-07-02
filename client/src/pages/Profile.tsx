import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Settings, Shield, Star, ChevronRight, Edit3, Bell, Lock, CreditCard, Download, Share, HelpCircle, LogOut } from "lucide-react";
import { Link } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { ApplePayBiometricSVG, ApplePaySecuritySVG, ApplePayCreditCardSVG, ApplePayPhoneSVG, ApplePayWalletSVG } from "@/components/ApplePaySVGs";
import { BottomNavigation } from "@/components/BottomNavigation";
import { IOSMemojiSVG } from "@/components/iOSMemojiSVG";
import profileImage from "@assets/image_1751300832470.png";

export default function Profile() {
  const [showSettings, setShowSettings] = useState(false);
  const { user } = useAuth();

  const userName = (user as any)?.name || "Sachin Kumar";
  const userEmail = (user as any)?.email || "sachin@example.com";
  const userPhone = "+91 98765 43210";

  const profileStats = [
    { label: "Total Transactions", value: "247", icon: ApplePayWalletSVG },
    { label: "This Month", value: "₹12,450", icon: ApplePayCreditCardSVG },
    { label: "Saved Contacts", value: "18", icon: ApplePayPhoneSVG },
    { label: "Security Score", value: "98%", icon: ApplePaySecuritySVG }
  ];

  const menuSections = [
    {
      title: "Account",
      items: [
        { icon: Edit3, appleIcon: ApplePayBiometricSVG, label: "Personal Information", href: "/profile/edit", badge: null },
        { icon: Shield, appleIcon: ApplePaySecuritySVG, label: "Privacy & Security", href: "/profile/security", badge: "2FA Enabled" },
        { icon: Bell, appleIcon: null, label: "Notifications", href: "/profile/notifications", badge: "3 New" },
        { icon: CreditCard, appleIcon: ApplePayCreditCardSVG, label: "Payment Methods", href: "/profile/cards", badge: null }
      ]
    },
    {
      title: "App Settings",
      items: [
        { icon: Download, appleIcon: null, label: "Transaction History", href: "/profile/history", badge: null },
        { icon: Share, appleIcon: null, label: "Refer & Earn", href: "/profile/refer", badge: "₹500 Bonus" },
        { icon: Star, appleIcon: null, label: "Rate OPPB", href: "/profile/rate", badge: null },
        { icon: HelpCircle, appleIcon: null, label: "Help & Support", href: "/profile/help", badge: null }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background Elements - Matching Dashboard */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-black to-gray-900/50" />
        
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-full blur-xl animate-float" />
        <div className="absolute top-60 right-20 w-24 h-24 bg-gradient-to-br from-purple-500/15 to-pink-600/15 rounded-full blur-lg animate-float-delay" />
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-gradient-to-br from-blue-400/10 to-cyan-500/10 rounded-full blur-lg animate-pulse" />
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-xl animate-float-slow" />
        
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        {/* Subtle light rays */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent" />
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-purple-500/20 to-transparent" />
      </div>
      {/* Ultra-Premium Apple Pay Style Header */}
      <div className="relative z-10 px-4 pt-6">
        {/* Header with glass morphism */}
        <div className="flex items-center justify-between p-3 backdrop-blur-2xl bg-white/8 rounded-2xl border border-white/15 shadow-xl">
          <Link href="/">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded-full blur-md" />
              <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <ArrowLeft className="h-5 w-5 text-white" />
              </Button>
            </div>
          </Link>
          
          <div className="text-center">
            <h1 className="text-xl font-bold text-white bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              Profile
            </h1>
            <p className="text-white/60 text-xs font-medium">Personal Dashboard</p>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/15 to-blue-500/15 rounded-full blur-md" />
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative h-10 w-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 hover:bg-white/15 transition-all duration-300 hover:scale-105"
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings className={`h-5 w-5 text-white transition-transform duration-300 ${showSettings ? 'rotate-45' : ''}`} />
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 pb-24 relative z-10">
        {/* Ultra-Premium Profile Header Card */}
        <div className="mt-4 mb-6 relative">
          {/* Card glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-blue-500/15 rounded-3xl blur-xl" />
          
          <Card className="relative backdrop-blur-2xl bg-white/8 border border-white/15 rounded-3xl shadow-2xl overflow-hidden">
            <CardContent className="p-6">
              {/* Profile Info Section */}
              <div className="flex flex-col items-center text-center mb-6">
                <div className="relative mb-4">
                  {/* Avatar glow ring */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full p-1 animate-pulse">
                    <div className="bg-black rounded-full w-full h-full" />
                  </div>
                  
                  <Avatar className="relative w-24 h-24 border-2 border-transparent">
                    <AvatarImage src={profileImage} className="w-full h-full object-cover rounded-full" />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 via-purple-600 to-blue-500 text-white text-xl font-bold flex items-center justify-center">
                      <IOSMemojiSVG className="w-20 h-20" />
                    </AvatarFallback>
                  </Avatar>
                  
                  {/* Verification badge with animation */}
                  <div className="absolute -bottom-1 -right-1">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-sm animate-pulse" />
                    <div className="relative w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center border border-white/20">
                      <ApplePayBiometricSVG className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
                
                <div className="w-full">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent mb-2">
                    {userName}
                  </h2>
                  <p className="text-white/70 text-sm mb-1 font-medium">{userEmail}</p>
                  <p className="text-white/50 text-xs mb-4">{userPhone}</p>
                  
                  <div className="flex items-center justify-center space-x-2">
                    <div className="relative">
                      <div className="absolute inset-0 bg-green-500/20 rounded-lg blur-sm" />
                      <Badge className="relative bg-green-500/15 text-green-300 border border-green-500/25 backdrop-blur-xl px-2 py-1 text-xs">
                        <ApplePaySecuritySVG className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-0 bg-blue-500/20 rounded-lg blur-sm" />
                      <Badge className="relative bg-blue-500/15 text-blue-300 border border-blue-500/25 backdrop-blur-xl px-2 py-1 text-xs">
                        <Star className="w-3 h-3 mr-1" />
                        Premium
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ultra-Premium Stats Grid */}
              <div className="grid grid-cols-2 gap-3">
                {profileStats.map((stat, index) => (
                  <div key={index} className="relative group">
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/15 to-purple-500/15 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    
                    <div className="relative text-center p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/8 transition-all duration-300">
                      {/* Icon with animated background */}
                      <div className="relative w-10 h-10 mx-auto mb-2">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-sm animate-pulse" 
                             style={{ animationDelay: `${index * 0.2}s` }} />
                        <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/15 to-purple-500/15 flex items-center justify-center border border-white/15">
                          <stat.icon className="w-5 h-5 text-blue-300" />
                        </div>
                      </div>
                      
                      <p className="text-lg font-bold text-white mb-1">{stat.value}</p>
                      <p className="text-xs text-white/60 font-medium leading-tight">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ultra-Premium Menu Sections */}
        {menuSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-6">
            <h3 className="text-lg font-bold text-white mb-4 px-1 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              {section.title}
            </h3>
            
            <div className="relative">
              {/* Section glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/8 via-purple-500/8 to-blue-500/8 rounded-2xl blur-lg" />
              
              <Card className="relative backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl shadow-xl overflow-hidden">
                <CardContent className="p-0">
                  {section.items.map((item, itemIndex) => {
                    const IconComponent = item.appleIcon || item.icon;
                    return (
                      <Link key={itemIndex} href={item.href}>
                        <div className={`group relative flex items-center justify-between p-4 hover:bg-white/8 transition-all duration-300 ${
                          itemIndex !== section.items.length - 1 ? 'border-b border-white/5' : ''
                        }`}>
                          
                          {/* Hover effect background */}
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                          
                          <div className="relative flex items-center space-x-4 flex-1">
                            {/* Enhanced icon with glow */}
                            <div className="relative flex-shrink-0">
                              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-all duration-300" />
                              <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500/12 to-purple-500/12 flex items-center justify-center border border-white/15 group-hover:scale-105 transition-all duration-300">
                                <IconComponent className="w-5 h-5 text-blue-300 group-hover:text-white transition-colors duration-300" />
                              </div>
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-white text-base group-hover:text-blue-100 transition-colors duration-300 truncate">
                                {item.label}
                              </p>
                              {item.badge && (
                                <div className="relative mt-1.5">
                                  <div className="absolute inset-0 bg-orange-500/15 rounded-md blur-sm" />
                                  <Badge className="relative bg-orange-500/12 text-orange-300 border border-orange-500/25 backdrop-blur-xl text-xs px-2 py-0.5">
                                    {item.badge}
                                  </Badge>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* Enhanced chevron */}
                          <div className="relative flex-shrink-0 ml-2">
                            <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300" />
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          </div>
        ))}

        {/* Ultra-Premium Quick Actions */}
        <div className="mb-6 relative">
          <h3 className="text-lg font-bold text-white mb-4 px-1 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
            Quick Actions
          </h3>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/8 via-purple-500/8 to-blue-500/8 rounded-2xl blur-lg" />
            
            <Card className="relative backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl shadow-xl overflow-hidden">
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/15 to-purple-500/15 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <Button className="relative w-full h-16 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/12 transition-all duration-300 flex flex-col items-center justify-center space-y-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/15 to-purple-500/15 flex items-center justify-center">
                        <Download className="h-4 w-4 text-blue-300" />
                      </div>
                      <span className="text-xs font-medium text-white">Export Data</span>
                    </Button>
                  </div>
                  
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/15 to-blue-500/15 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <Button className="relative w-full h-16 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/12 transition-all duration-300 flex flex-col items-center justify-center space-y-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/15 to-blue-500/15 flex items-center justify-center">
                        <Share className="h-4 w-4 text-purple-300" />
                      </div>
                      <span className="text-xs font-medium text-white">Share App</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Ultra-Premium Sign Out Section */}
        <div className="mb-6 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/8 via-orange-500/8 to-red-500/8 rounded-2xl blur-lg" />
          
          <Card className="relative backdrop-blur-2xl bg-red-500/5 border border-red-500/15 rounded-2xl shadow-xl overflow-hidden">
            <CardContent className="p-0">
              <Link href="/api/logout">
                <div className="group flex items-center justify-center p-4 hover:bg-red-500/8 transition-all duration-300">
                  <div className="relative flex items-center space-x-3">
                    <div className="absolute inset-0 bg-red-500/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <div className="relative w-10 h-10 rounded-xl bg-red-500/12 flex items-center justify-center border border-red-500/25 group-hover:scale-105 transition-all duration-300">
                      <LogOut className="w-5 h-5 text-red-400 group-hover:text-red-300 transition-colors duration-300" />
                    </div>
                    <span className="font-semibold text-red-400 text-base group-hover:text-red-300 transition-colors duration-300">
                      Sign Out
                    </span>
                  </div>
                </div>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* App Version Info */}
        <div className="text-center mt-8 mb-4">
          <p className="text-gray-500 text-sm">OPPB Version 2.0.1</p>
          <p className="text-gray-600 text-xs mt-1">Built with ❤️ for secure payments</p>
        </div>
      </div>

      {/* Settings Overlay */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end">
          <div className="w-full bg-gray-900/95 backdrop-blur-xl rounded-t-3xl p-6 animate-slide-up">
            <div className="w-12 h-1 bg-gray-600 rounded-full mx-auto mb-6"></div>
            <h3 className="text-xl font-bold text-white mb-6">Quick Settings</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5">
                <div className="flex items-center space-x-3">
                  <Bell className="w-5 h-5 text-blue-400" />
                  <span className="text-white">Notifications</span>
                </div>
                <div className="w-12 h-6 bg-blue-500 rounded-full flex items-center justify-end pr-1">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5">
                <div className="flex items-center space-x-3">
                  <ApplePaySecuritySVG className="w-5 h-5 text-green-400" />
                  <span className="text-white">Biometric Lock</span>
                </div>
                <div className="w-12 h-6 bg-green-500 rounded-full flex items-center justify-end pr-1">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-purple-400" />
                  <span className="text-white">Auto-Lock</span>
                </div>
                <div className="w-12 h-6 bg-gray-600 rounded-full flex items-center justify-start pl-1">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={() => setShowSettings(false)}
              className="w-full mt-6 h-12 rounded-2xl apple-pay-gradient text-white font-semibold"
            >
              Done
            </Button>
          </div>
        </div>
      )}

      <BottomNavigation activeTab="profile" />
    </div>
  );
}