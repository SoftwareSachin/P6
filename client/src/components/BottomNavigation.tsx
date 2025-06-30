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
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-white/10 px-6 py-3 z-50">
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
                    ? 'bg-blue-600 text-white shadow-2xl scale-110 shadow-blue-500/30' 
                    : 'text-white hover:text-blue-400 hover:bg-white/10'
                }`}
              >
                <IconComponent className={`h-6 w-6 ${isActive ? 'text-white' : 'text-white'}`} />
                <span className={`text-xs font-semibold ${isActive ? 'text-white' : 'text-white'}`}>
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