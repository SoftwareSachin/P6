import { Link } from "wouter";
import { useState, useEffect } from "react";
import { Home, User } from "lucide-react";
import { ApplePayQRCodeSVG, ApplePaySendMoneySVG, ApplePayContactlessSVG, ApplePayBiometricSVG } from "@/components/ApplePaySVGs";

interface BottomNavigationProps {
  activeTab: string;
}

export function BottomNavigation({ activeTab }: BottomNavigationProps) {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [rippleStates, setRippleStates] = useState<{ [key: string]: boolean }>({});

  const navItems = [
    { icon: Home, appleIcon: null, label: "Home", href: "/", key: "home" },
    { icon: ApplePayQRCodeSVG, appleIcon: ApplePayQRCodeSVG, label: "Scan", href: "/qr-scanner", key: "scan" },
    { icon: ApplePaySendMoneySVG, appleIcon: ApplePaySendMoneySVG, label: "Send", href: "/send-money", key: "send" },
    { icon: ApplePayContactlessSVG, appleIcon: ApplePayContactlessSVG, label: "Offline", href: "/offline-payments", key: "offline" },
    { icon: User, appleIcon: ApplePayBiometricSVG, label: "Profile", href: "/profile", key: "profile" }
  ];

  const handleTabClick = (key: string) => {
    setRippleStates(prev => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setRippleStates(prev => ({ ...prev, [key]: false }));
    }, 600);
  };

  return (
    <>
      {/* Ultra-premium background with multiple layers */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        {/* Gradient foundation */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent backdrop-blur-3xl" />
        
        {/* Glass morphism layer */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/5 via-white/3 to-transparent backdrop-blur-2xl" />
        
        {/* Subtle border glow */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        
        {/* Navigation content */}
        <div className="relative px-4 py-2 pt-4">
          {/* Active tab indicator background */}
          <div className="absolute top-0 left-0 right-0 h-1">
            {navItems.map((item, index) => {
              const isActive = activeTab === item.key;
              return (
                <div
                  key={item.key}
                  className={`absolute h-full transition-all duration-500 ease-out ${
                    isActive 
                      ? 'bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 opacity-100 shadow-lg shadow-blue-500/50' 
                      : 'opacity-0'
                  }`}
                  style={{
                    left: `${(index / navItems.length) * 100}%`,
                    width: `${100 / navItems.length}%`,
                    transform: isActive ? 'scaleX(0.6)' : 'scaleX(0)',
                    transformOrigin: 'center'
                  }}
                />
              );
            })}
          </div>

          <div className="flex justify-around items-center relative">
            {navItems.map((item, index) => {
              const IconComponent = item.appleIcon || item.icon;
              const isActive = activeTab === item.key;
              const isHovered = hoveredTab === item.key;
              const hasRipple = rippleStates[item.key];
              
              return (
                <Link key={item.key} href={item.href}>
                  <div
                    className="relative"
                    onMouseEnter={() => setHoveredTab(item.key)}
                    onMouseLeave={() => setHoveredTab(null)}
                    onClick={() => handleTabClick(item.key)}
                  >
                    {/* Ripple effect container */}
                    <div className="absolute inset-0 overflow-hidden rounded-2xl">
                      {hasRipple && (
                        <div className="absolute inset-0 bg-white/20 rounded-2xl animate-ping" />
                      )}
                    </div>

                    {/* Main button */}
                    <div
                      className={`
                        flex flex-col items-center justify-center space-y-1 h-16 w-16 rounded-2xl
                        transition-all duration-500 ease-out relative overflow-hidden
                        ${isActive 
                          ? 'bg-gradient-to-br from-blue-500/90 via-purple-600/90 to-blue-600/90 backdrop-blur-xl shadow-2xl shadow-blue-500/40 scale-110 -translate-y-1' 
                          : isHovered
                            ? 'bg-white/15 backdrop-blur-xl scale-105 shadow-lg shadow-white/10'
                            : 'bg-white/5 backdrop-blur-lg hover:bg-white/10'
                        }
                      `}
                    >
                      {/* Shimmer effect for active tab */}
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-pulse" 
                             style={{ animationDuration: '2s', animationDelay: `${index * 0.2}s` }} />
                      )}

                      {/* Glow effect */}
                      {(isActive || isHovered) && (
                        <div className={`absolute inset-0 rounded-2xl ${
                          isActive 
                            ? 'bg-gradient-to-br from-blue-400/20 via-purple-500/20 to-blue-500/20 blur-xl' 
                            : 'bg-white/10 blur-lg'
                        }`} />
                      )}

                      {/* Icon with advanced styling */}
                      <div className="relative z-10">
                        <IconComponent 
                          className={`
                            h-6 w-6 transition-all duration-300
                            ${isActive 
                              ? 'text-white drop-shadow-lg filter brightness-110' 
                              : 'text-white/90 hover:text-white'
                            }
                            ${isHovered && !isActive ? 'scale-110' : ''}
                          `} 
{...(isActive && item.appleIcon ? { animated: true } : {})}
                        />
                      </div>

                      {/* Label with enhanced typography */}
                      <span className={`
                        text-xs font-semibold transition-all duration-300 relative z-10
                        ${isActive 
                          ? 'text-white drop-shadow-lg tracking-wider' 
                          : 'text-white/80 hover:text-white'
                        }
                        ${isHovered && !isActive ? 'scale-105' : ''}
                      `}>
                        {item.label}
                      </span>

                      {/* Active indicator dot */}
                      {isActive && (
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-lg shadow-green-400/50 animate-pulse" />
                      )}
                    </div>

                    {/* Floating particles for active tab */}
                    {isActive && (
                      <>
                        <div className="absolute -top-2 -left-2 w-1 h-1 bg-blue-400 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '0s', animationDuration: '2s' }} />
                        <div className="absolute -top-1 -right-2 w-1 h-1 bg-purple-400 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '2s' }} />
                        <div className="absolute -bottom-2 -left-1 w-1 h-1 bg-blue-300 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '1s', animationDuration: '2s' }} />
                      </>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Haptic feedback indicator */}
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white/20 rounded-full" />
        </div>
      </div>

      {/* Ultra-subtle ambient lighting */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-500/5 via-purple-500/3 to-transparent pointer-events-none z-40" />
    </>
  );
}