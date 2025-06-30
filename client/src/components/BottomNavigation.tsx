import { Home, Send, BarChart3, CreditCard, User } from "lucide-react";
import { Link, useLocation } from "wouter";
import { COLORS } from "@/lib/constants";

interface BottomNavigationProps {
  activeTab: string;
}

export function BottomNavigation({ activeTab }: BottomNavigationProps) {
  const [location] = useLocation();
  
  const tabs = [
    {
      id: "home",
      name: "Home",
      icon: Home,
      route: "/dashboard",
      emoji: "🏠"
    },
    {
      id: "pay",
      name: "Pay", 
      icon: Send,
      route: "/send-money",

    },
    {
      id: "reports",
      name: "Reports",
      icon: BarChart3,
      route: "/transaction-history",
      emoji: "📊"
    },
    {
      id: "cards",
      name: "Cards",
      icon: CreditCard,
      route: "/cards",
      emoji: "💳"
    },
    {
      id: "profile",
      name: "Profile",
      icon: User,
      route: "/profile",

    }
  ];

  const isActive = (route: string) => {
    if (route === "/dashboard") {
      return location === "/" || location === "/dashboard";
    }
    return location === route;
  };

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 border-t bg-white"
      style={{ borderColor: COLORS.border }}
    >
      <div className="flex items-center justify-around py-2 px-4">
        {tabs.map((tab) => {
          const active = isActive(tab.route);
          
          return (
            <Link key={tab.id} href={tab.route}>
              <div className="flex flex-col items-center space-y-1 p-2 min-w-[64px]">
                <div className="relative">
                  {/* Exact PhonePe/GPay style icons */}
                  <div 
                    className={`w-6 h-6 flex items-center justify-center transition-colors ${
                      active ? 'text-purple-600' : 'text-gray-400'
                    }`}
                  >
                    <tab.icon className="h-6 w-6" />
                  </div>
                  
                  {/* Active indicator dot */}
                  {active && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-purple-600 rounded-full"></div>
                  )}
                </div>
                
                <span 
                  className={`text-xs font-medium transition-colors ${
                    active ? 'text-purple-600' : 'text-gray-500'
                  }`}
                >
                  {tab.name}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}