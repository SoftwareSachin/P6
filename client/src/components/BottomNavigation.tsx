import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Home, User } from "lucide-react";
import { ApplePayQRCodeSVG, ApplePaySendMoneySVG, ApplePayContactlessSVG, ApplePayBiometricSVG } from "@/components/ApplePaySVGs";

interface BottomNavigationProps {
  activeTab: string;
}

export function BottomNavigation({ activeTab }: BottomNavigationProps) {
  const navItems = [
    { icon: Home, appleIcon: null, label: "Home", href: "/", key: "home" },
    { icon: ApplePayQRCodeSVG, appleIcon: ApplePayQRCodeSVG, label: "Scan", href: "/qr-scanner", key: "scan" },
    { icon: ApplePaySendMoneySVG, appleIcon: ApplePaySendMoneySVG, label: "Send", href: "/send-money", key: "send" },
    { icon: ApplePayContactlessSVG, appleIcon: ApplePayContactlessSVG, label: "Offline", href: "/offline-payments", key: "offline" },
    { icon: User, appleIcon: ApplePayBiometricSVG, label: "Profile", href: "/profile", key: "profile" }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 apple-pay-glass border-t border-white/20 px-6 py-3 z-50">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const IconComponent = item.appleIcon || item.icon;
          const isActive = activeTab === item.key;
          
          return (
            <Link key={item.key} href={item.href}>
              <Button
                variant="ghost"
                size="sm"
                className={`flex flex-col items-center space-y-1 h-16 w-16 rounded-2xl transition-all duration-300 ${
                  isActive 
                    ? 'apple-pay-gradient text-white shadow-2xl scale-110' 
                    : 'text-gray-400 hover:text-white apple-pay-button'
                }`}
              >
                <IconComponent className={`h-6 w-6 ${isActive ? 'text-white drop-shadow-sm' : ''}`} />
                <span className={`text-xs font-medium ${isActive ? 'text-white drop-shadow-sm' : ''}`}>
                  {item.label}
                </span>
              </Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}