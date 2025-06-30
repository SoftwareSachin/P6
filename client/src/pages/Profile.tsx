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
      {/* Apple Pay Style Header */}
      <div className="flex items-center justify-between p-6 backdrop-blur-xl bg-black/50 relative z-10">
        <Link href="/">
          <Button variant="ghost" size="icon" className="apple-pay-button h-12 w-12 rounded-full">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <div className="text-center">
          <h1 className="text-xl font-bold text-white">Profile</h1>
          <p className="text-gray-400 text-sm">Manage your account</p>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="apple-pay-button h-12 w-12 rounded-full"
          onClick={() => setShowSettings(!showSettings)}
        >
          <Settings className="h-6 w-6" />
        </Button>
      </div>

      <div className="px-6 pb-20">
        {/* Profile Header Card */}
        <Card className="apple-pay-card border-0 mb-6">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative">
                <Avatar className="w-20 h-20 border-4 border-white/20">
                  <AvatarImage src="/api/placeholder/80/80" />
                  <AvatarFallback className="apple-pay-gradient text-white text-2xl font-bold">
                    {userName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 apple-pay-gradient rounded-full flex items-center justify-center">
                  <ApplePayBiometricSVG className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-1">{userName}</h2>
                <p className="text-gray-400 text-sm mb-2">{userEmail}</p>
                <p className="text-gray-500 text-sm">{userPhone}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    <ApplePaySecuritySVG className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                    Premium
                  </Badge>
                </div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {profileStats.map((stat, index) => (
                <div key={index} className="text-center p-3 rounded-xl bg-white/5 backdrop-blur-sm">
                  <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <stat.icon className="w-4 h-4 text-blue-400" />
                  </div>
                  <p className="text-lg font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Menu Sections */}
        {menuSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-4 px-2">{section.title}</h3>
            <Card className="apple-pay-card border-0">
              <CardContent className="p-0">
                {section.items.map((item, itemIndex) => {
                  const IconComponent = item.appleIcon || item.icon;
                  return (
                    <Link key={itemIndex} href={item.href}>
                      <div className={`flex items-center justify-between p-4 hover:bg-white/5 transition-colors duration-200 ${
                        itemIndex !== section.items.length - 1 ? 'border-b border-white/10' : ''
                      }`}>
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                            <IconComponent className="w-5 h-5 text-blue-400" />
                          </div>
                          <div>
                            <p className="font-medium text-white">{item.label}</p>
                            {item.badge && (
                              <Badge className="mt-1 bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs">
                                {item.badge}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </Link>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        ))}

        {/* Quick Actions */}
        <Card className="apple-pay-card border-0 mb-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <Button className="apple-pay-glass h-16 rounded-2xl flex flex-col items-center justify-center space-y-2">
                <Download className="h-6 w-6" />
                <span className="text-sm">Export Data</span>
              </Button>
              <Button className="apple-pay-glass h-16 rounded-2xl flex flex-col items-center justify-center space-y-2">
                <Share className="h-6 w-6" />
                <span className="text-sm">Share App</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Sign Out Section */}
        <Card className="apple-pay-card border-0 border-red-500/20">
          <CardContent className="p-0">
            <Link href="/api/logout">
              <div className="flex items-center justify-center p-4 hover:bg-red-500/10 transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                    <LogOut className="w-5 h-5 text-red-400" />
                  </div>
                  <span className="font-medium text-red-400">Sign Out</span>
                </div>
              </div>
            </Link>
          </CardContent>
        </Card>

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