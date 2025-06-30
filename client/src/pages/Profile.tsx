import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, ChevronRight, Edit3, Camera, User, Shield, Bell, Globe, Palette, HelpCircle, Settings, FileText, ExternalLink, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BottomNavigation } from "@/components/BottomNavigation";
import { COLORS } from "@/lib/constants";
import { Link } from "wouter";
import { useAuth } from "@/hooks/useAuth";

export default function Profile() {
  const { user } = useAuth();
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [currentTheme, setCurrentTheme] = useState("auto");

  const userName = (user as any)?.name || "Sachin";
  const userEmail = (user as any)?.email || "singhal3.sachin7@gmail.com";

  // Profile Menu Sections - Exact Specification
  const profileSections = [
    {
      title: "Account",
      items: [
        {
          id: "payments",
          label: "💰 Payments & Bank Accounts",
          description: "Manage your payment methods",
          icon: "💰",
          route: "/payments"
        },
        {
          id: "refer",
          label: "🎁 Refer & Earn",
          description: "Invite friends and earn rewards",
          icon: "🎁",
          route: "/refer"
        },
        {
          id: "rewards",
          label: "🏆 Rewards",
          description: "Check your reward points",
          icon: "🏆",
          route: "/rewards"
        },
        {
          id: "business",
          label: "📱 OPPB for Business",
          description: "Business account features",
          icon: "📱",
          route: "/business"
        }
      ]
    },
    {
      title: "Security & Privacy",
      items: [
        {
          id: "security",
          label: "🔒 Privacy & Security",
          description: "Manage your security settings",
          icon: "🔒",
          route: "/security"
        },
        {
          id: "biometric",
          label: "👆 Biometric Authentication",
          description: "Enable fingerprint/face unlock",
          icon: "👆",
          toggle: true,
          value: biometricEnabled,
          onChange: setBiometricEnabled
        }
      ]
    },
    {
      title: "Preferences",
      items: [
        {
          id: "language",
          label: "🌐 Language: English",
          description: "Change app language",
          icon: "🌐",
          route: "/language"
        },
        {
          id: "theme",
          label: "🎨 Theme: Auto",
          description: "Light, Dark, or Auto mode",
          icon: "🎨",
          route: "/theme"
        },
        {
          id: "notifications",
          label: "🔔 Notifications",
          description: "Manage notification preferences",
          icon: "🔔",
          toggle: true,
          value: notificationsEnabled,
          onChange: setNotificationsEnabled
        }
      ]
    },
    {
      title: "Support",
      items: [
        {
          id: "help",
          label: "📞 Help & Support",
          description: "Get help with your account",
          icon: "📞",
          route: "/help"
        },
        {
          id: "settings",
          label: "⚙️ Settings",
          description: "General app settings",
          icon: "⚙️",
          route: "/settings"
        }
      ]
    },
    {
      title: "Legal",
      items: [
        {
          id: "terms",
          label: "📖 Terms & Conditions",
          description: "Read our terms of service",
          icon: "📖",
          route: "/terms"
        },
        {
          id: "privacy",
          label: "🛡️ Privacy Policy",
          description: "Read our privacy policy",
          icon: "🛡️",
          route: "/privacy"
        },
        {
          id: "about",
          label: "🏢 About OPPB",
          description: "Learn more about OPPB",
          icon: "🏢",
          route: "/about"
        }
      ]
    }
  ];

  const handleSignOut = () => {
    if (confirm("Are you sure you want to sign out?")) {
      window.location.href = "/api/logout";
    }
  };

  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: COLORS.background }}>
      {/* Header */}
      <div className="flex items-center justify-between p-4" style={{ backgroundColor: COLORS.cardWhite }}>
        <Link href="/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-lg font-semibold" style={{ color: COLORS.textPrimary }}>
          Profile
        </h1>
        <Button variant="ghost" size="icon">
          <Edit3 className="h-5 w-5" />
        </Button>
      </div>

      <div className="p-4 space-y-6">
        {/* Profile Header - Exact Specification */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/api/avatar" />
                  <AvatarFallback style={{ backgroundColor: COLORS.primary, color: 'white' }}>
                    {userName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Button 
                  size="icon" 
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                  style={{ backgroundColor: COLORS.primary }}
                >
                  <Camera className="h-4 w-4 text-white" />
                </Button>
              </div>
              
              <div className="flex-1">
                <h2 className="text-2xl font-bold" style={{ color: COLORS.textPrimary }}>
                  👤 {userName} Gupta
                </h2>
                <p className="text-sm" style={{ color: COLORS.textSecondary }}>
                  {userEmail}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600 font-medium">
                    Verified Account
                  </span>
                </div>
              </div>
              
              <Button variant="outline" size="sm">
                <Edit3 className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Profile Statistics */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold" style={{ color: COLORS.primary }}>
                ₹12,547
              </div>
              <p className="text-sm" style={{ color: COLORS.textSecondary }}>
                Balance
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold" style={{ color: COLORS.success }}>
                47
              </div>
              <p className="text-sm" style={{ color: COLORS.textSecondary }}>
                Transactions
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold" style={{ color: COLORS.warning }}>
                850
              </div>
              <p className="text-sm" style={{ color: COLORS.textSecondary }}>
                Rewards
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Menu Sections - Exact Specification */}
        {profileSections.map((section, sectionIndex) => (
          <div key={section.title}>
            <h3 className="text-sm font-semibold mb-3 px-2" style={{ color: COLORS.textSecondary }}>
              {section.title.toUpperCase()}
            </h3>
            
            <Card className="border-0 shadow-sm">
              <CardContent className="p-0">
                {section.items.map((item, index) => (
                  <div key={item.id}>
                    {item.toggle ? (
                      <div className="flex items-center justify-between p-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-lg">{item.icon}</span>
                          <div>
                            <h4 className="font-medium" style={{ color: COLORS.textPrimary }}>
                              {item.label}
                            </h4>
                            <p className="text-sm" style={{ color: COLORS.textSecondary }}>
                              {item.description}
                            </p>
                          </div>
                        </div>
                        <Switch
                          checked={item.value}
                          onCheckedChange={item.onChange}
                        />
                      </div>
                    ) : (
                      <Link href={item.route || "#"}>
                        <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex items-center space-x-3">
                            <span className="text-lg">{item.icon}</span>
                            <div>
                              <h4 className="font-medium" style={{ color: COLORS.textPrimary }}>
                                {item.label}
                              </h4>
                              <p className="text-sm" style={{ color: COLORS.textSecondary }}>
                                {item.description}
                              </p>
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5" style={{ color: COLORS.textSecondary }} />
                        </div>
                      </Link>
                    )}
                    
                    {index < section.items.length - 1 && (
                      <div className="border-b mx-4" style={{ borderColor: COLORS.border }}></div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        ))}

        {/* Sign Out Button */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-0">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center justify-between p-4 hover:bg-red-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">🚪</span>
                <h4 className="font-medium text-red-600">
                  Sign Out
                </h4>
              </div>
              <LogOut className="h-5 w-5 text-red-600" />
            </button>
          </CardContent>
        </Card>

        {/* App Version */}
        <div className="text-center py-4">
          <p className="text-sm" style={{ color: COLORS.textSecondary }}>
            OPPB Version 1.0.0
          </p>
          <p className="text-xs mt-1" style={{ color: COLORS.textSecondary }}>
            Made with ❤️ in India
          </p>
        </div>
      </div>

      <BottomNavigation activeTab="profile" />
    </div>
  );
}