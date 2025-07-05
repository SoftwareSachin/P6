import { useState, useCallback, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Tv, Signal, AlertCircle, Check, Star, Clock, Zap, Shield, Smartphone, CreditCard, Sparkles } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { BottomNavigation } from "@/components/BottomNavigation";
import { ApplePayContactlessSVG, ApplePaySecuritySVG, ApplePaySuccessSVG } from "@/components/ApplePaySVGs";

// Ultra-Premium DTH Provider SVG Components with Apple Pay Aesthetics
const UltraPremiumTataSkyDTHSVG = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ultraTataSkyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#007AFF" />
        <stop offset="30%" stopColor="#0066CC" />
        <stop offset="70%" stopColor="#0052A3" />
        <stop offset="100%" stopColor="#003D7A" />
      </linearGradient>
      <filter id="tataSkyGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <linearGradient id="tataSkyShine" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
      </linearGradient>
    </defs>
    <rect width="80" height="80" rx="20" fill="url(#ultraTataSkyGradient)" filter="url(#tataSkyGlow)" />
    <rect width="80" height="80" rx="20" fill="url(#tataSkyShine)" opacity="0.6" />
    <circle cx="40" cy="28" r="8" fill="white" opacity="0.95" />
    <path d="M24 42 Q40 28 56 42 Q40 56 24 42" fill="white" opacity="0.9" />
    <rect x="36" y="56" width="8" height="3" rx="1.5" fill="white" opacity="0.8" />
    <text x="40" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" opacity="0.9">TATA SKY</text>
  </svg>
);

const UltraPremiumAirtelDTHSVG = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ultraAirtelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF3B30" />
        <stop offset="30%" stopColor="#ED1C24" />
        <stop offset="70%" stopColor="#C41E3A" />
        <stop offset="100%" stopColor="#8B0000" />
      </linearGradient>
      <filter id="airtelGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <linearGradient id="airtelShine" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
      </linearGradient>
    </defs>
    <rect width="80" height="80" rx="20" fill="url(#ultraAirtelGradient)" filter="url(#airtelGlow)" />
    <rect width="80" height="80" rx="20" fill="url(#airtelShine)" opacity="0.6" />
    <circle cx="40" cy="30" r="10" fill="white" opacity="0.95" />
    <path d="M20 46 Q40 32 60 46 Q40 60 20 46" fill="white" opacity="0.9" />
    <rect x="36" y="58" width="8" height="3" rx="1.5" fill="white" opacity="0.8" />
    <text x="40" y="72" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" opacity="0.9">AIRTEL</text>
  </svg>
);

const UltraPremiumDishTVSVG = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ultraDishGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF9F0A" />
        <stop offset="30%" stopColor="#FF6B00" />
        <stop offset="70%" stopColor="#E55B00" />
        <stop offset="100%" stopColor="#CC4A00" />
      </linearGradient>
      <filter id="dishGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <linearGradient id="dishShine" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
      </linearGradient>
    </defs>
    <rect width="80" height="80" rx="20" fill="url(#ultraDishGradient)" filter="url(#dishGlow)" />
    <rect width="80" height="80" rx="20" fill="url(#dishShine)" opacity="0.6" />
    <ellipse cx="40" cy="32" rx="16" ry="10" fill="white" opacity="0.95" />
    <rect x="36" y="42" width="8" height="16" rx="2" fill="white" opacity="0.9" />
    <text x="40" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" opacity="0.9">DISH TV</text>
  </svg>
);

const UltraPremiumVideoconDTHSVG = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ultraVideoconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#AF52DE" />
        <stop offset="30%" stopColor="#8A2BE2" />
        <stop offset="70%" stopColor="#6A0DAD" />
        <stop offset="100%" stopColor="#4B0082" />
      </linearGradient>
      <filter id="videoconGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <linearGradient id="videoconShine" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
      </linearGradient>
    </defs>
    <rect width="80" height="80" rx="20" fill="url(#ultraVideoconGradient)" filter="url(#videoconGlow)" />
    <rect width="80" height="80" rx="20" fill="url(#videoconShine)" opacity="0.6" />
    <path d="M24 26 L56 26 L56 44 L40 54 L24 44 Z" fill="white" opacity="0.95" />
    <text x="40" y="70" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold" opacity="0.9">VIDEOCON</text>
  </svg>
);

const UltraPremiumSunDirectSVG = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ultraSunDirectGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD60A" />
        <stop offset="30%" stopColor="#FFD700" />
        <stop offset="70%" stopColor="#FFA500" />
        <stop offset="100%" stopColor="#FF8C00" />
      </linearGradient>
      <filter id="sunDirectGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <linearGradient id="sunDirectShine" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
      </linearGradient>
    </defs>
    <rect width="80" height="80" rx="20" fill="url(#ultraSunDirectGradient)" filter="url(#sunDirectGlow)" />
    <rect width="80" height="80" rx="20" fill="url(#sunDirectShine)" opacity="0.6" />
    <circle cx="40" cy="32" r="12" fill="white" opacity="0.95" />
    <path d="M28 32 L52 32 M40 20 L40 44 M31.5 24.5 L48.5 39.5 M48.5 24.5 L31.5 39.5" stroke="url(#ultraSunDirectGradient)" strokeWidth="3" opacity="0.7" />
    <text x="40" y="68" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold" opacity="0.9">SUN DIRECT</text>
  </svg>
);

export default function DTH() {
  const [, setLocation] = useLocation();
  const [selectedProvider, setSelectedProvider] = useState<string>("");
  const [subscriberNumber, setSubscriberNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [showPlans, setShowPlans] = useState(false);
  const { toast } = useToast();

  // Ultra-Premium DTH Providers with Apple Pay Aesthetics
  const dthProviders = [
    {
      id: "tatasky",
      name: "Tata Sky",
      icon: UltraPremiumTataSkyDTHSVG,
      color: "#007AFF",
      gradient: "linear-gradient(135deg, #007AFF 0%, #5856D6 50%, #003D7A 100%)",
      glowColor: "rgba(0, 122, 255, 0.6)",
      popularPlans: [299, 419, 599, 799],
      description: "Premium HD entertainment with advanced features"
    },
    {
      id: "airtel",
      name: "Airtel Digital TV",
      icon: UltraPremiumAirtelDTHSVG,
      color: "#FF3B30",
      gradient: "linear-gradient(135deg, #FF3B30 0%, #FF2D92 50%, #8B0000 100%)",
      glowColor: "rgba(255, 59, 48, 0.6)",
      popularPlans: [329, 449, 649, 849],
      description: "Next-gen digital television experience"
    },
    {
      id: "dish",
      name: "Dish TV",
      icon: UltraPremiumDishTVSVG,
      color: "#FF9F0A",
      gradient: "linear-gradient(135deg, #FF9F0A 0%, #FF6B35 50%, #CC4A00 100%)",
      glowColor: "rgba(255, 159, 10, 0.6)",
      popularPlans: [199, 349, 549, 749],
      description: "India's leading direct-to-home service"
    },
    {
      id: "videocon",
      name: "Videocon d2h",
      icon: UltraPremiumVideoconDTHSVG,
      color: "#AF52DE",
      gradient: "linear-gradient(135deg, #AF52DE 0%, #BF5AF2 50%, #4B0082 100%)",
      glowColor: "rgba(175, 82, 222, 0.6)",
      popularPlans: [269, 389, 589, 789],
      description: "Revolutionary DTH with smart features"
    },
    {
      id: "sundirect",
      name: "Sun Direct",
      icon: UltraPremiumSunDirectSVG,
      color: "#FFD60A",
      gradient: "linear-gradient(135deg, #FFD60A 0%, #FF9F0A 50%, #FF8C00 100%)",
      glowColor: "rgba(255, 214, 10, 0.6)",
      popularPlans: [239, 359, 519, 719],
      description: "South India's premier DTH service"
    }
  ];

  // Ultra-Premium DTH Plans with Enhanced Features
  const dthPlans = [
    {
      id: 1,
      name: "Ultra HD Premium",
      price: 699,
      originalPrice: 799,
      duration: "30 days",
      channels: "320+ HD Channels",
      description: "Premium 4K channels with Dolby Atmos audio",
      popular: true,
      savings: "Save ₹100",
      features: ["4K Ultra HD", "Dolby Audio", "Sports Pack", "Movie Pack"],
      category: "premium"
    },
    {
      id: 2,
      name: "HD Super Pack",
      price: 599,
      originalPrice: 699,
      duration: "30 days", 
      channels: "280+ HD Channels",
      description: "Complete entertainment with HD channels",
      popular: true,
      savings: "Save ₹100",
      features: ["Full HD", "Sports Channels", "Movie Channels", "Kids Pack"],
      category: "popular"
    },
    {
      id: 3,
      name: "Family Entertainment",
      price: 419,
      originalPrice: 419,
      duration: "30 days",
      channels: "200+ Channels",
      description: "Perfect family entertainment package",
      popular: false,
      savings: "",
      features: ["Family Channels", "News Pack", "Music Channels", "Regional"],
      category: "family"
    },
    {
      id: 4,
      name: "Sports Champion",
      price: 899,
      originalPrice: 999,
      duration: "30 days",
      channels: "350+ Channels",
      description: "Ultimate sports experience with all leagues",
      popular: false,
      savings: "Save ₹100",
      features: ["All Sports", "Live Matches", "Highlights", "Analysis"],
      category: "sports"
    }
  ];



  const handleProviderSelect = (provider: any) => {
    setSelectedProvider(provider.id);
    setShowPlans(false);
    setSelectedPlan(null);
    setAmount("");
  };

  const handleGetPlans = () => {
    if (!subscriberNumber || subscriberNumber.length < 10) {
      toast({
        title: "Invalid Subscriber Number",
        description: "Please enter a valid 10+ digit subscriber number.",
        variant: "destructive",
      });
      return;
    }
    setShowPlans(true);
  };

  const handlePlanSelect = (plan: any) => {
    setSelectedPlan(plan);
    setAmount(plan.price.toString());
  };

  const handleRecharge = () => {
    if (!selectedProvider || !subscriberNumber || !amount) {
      toast({
        title: "Missing Information",
        description: "Please complete all required fields to proceed.",
        variant: "destructive",
      });
      return;
    }

    const provider = dthProviders.find(p => p.id === selectedProvider);
    
    // Store payment details in localStorage for the send page
    localStorage.setItem('paymentDetails', JSON.stringify({
      merchantName: `${provider?.name} DTH`,
      amount: amount,
      note: `DTH Recharge - ${selectedPlan?.name || 'Custom'} plan for ${subscriberNumber}`,
      category: 'dth_recharge',
      fromPage: 'dth'
    }));
    
    // Redirect to send money page
    setLocation('/send');
  };

  return (
    <div 
      className="min-h-screen text-white relative overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 20% 20%, rgba(0, 122, 255, 0.08) 0%, transparent 60%),
          radial-gradient(circle at 80% 80%, rgba(175, 82, 222, 0.08) 0%, transparent 60%),
          radial-gradient(circle at 40% 60%, rgba(255, 159, 10, 0.05) 0%, transparent 60%),
          linear-gradient(135deg, #000000 0%, #0a0a0a 30%, #111111 70%, #000000 100%)
        `
      }}
    >
      {/* Enhanced Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-blue-500/5 rounded-full blur-2xl animate-pulse" />
        <div className="absolute top-60 right-16 w-32 h-32 bg-purple-500/5 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-32 left-16 w-36 h-36 bg-orange-500/4 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 right-8 w-24 h-24 bg-green-500/4 rounded-full blur-lg animate-pulse" style={{ animationDelay: '4.5s' }} />
      </div>

      {/* Ultra-Premium Header */}
      <div className="relative z-10">
        <div 
          className="flex items-center justify-between p-6"
          style={{
            background: `
              linear-gradient(135deg, 
                rgba(255,255,255,0.08) 0%, 
                rgba(255,255,255,0.03) 50%, 
                rgba(0,0,0,0.2) 100%
              )
            `,
            backdropFilter: 'blur(30px)',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
          }}
        >
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10 transition-all duration-300 hover:scale-110 apple-pay-button"
            onClick={() => setLocation('/dashboard')}
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.3)'
            }}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          
          <div className="text-center">
            <h1 
              className="text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent"
              style={{ 
                fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                textShadow: '0 2px 10px rgba(255,255,255,0.1)'
              }}
            >
              DTH Recharge
            </h1>
            <p className="text-sm text-gray-300 mt-1">Premium instant recharge experience</p>
          </div>

          <div className="w-10 flex justify-center">
            <Sparkles className="h-6 w-6 text-yellow-400 animate-pulse" />
          </div>
        </div>
      </div>

      <div className="px-4 py-8 pb-32 space-y-10 relative z-10 max-w-lg mx-auto">
        {/* Ultra-Premium DTH Providers Selection */}
        <Card 
          className="border-0 overflow-hidden"
          style={{
            background: `
              linear-gradient(135deg, 
                rgba(255,255,255,0.12) 0%, 
                rgba(255,255,255,0.08) 50%,
                rgba(255,255,255,0.04) 100%
              ),
              linear-gradient(135deg, 
                rgba(0,0,0,0.4) 0%, 
                rgba(0,0,0,0.6) 100%
              )
            `,
            backdropFilter: 'blur(40px)',
            border: '1px solid rgba(255,255,255,0.15)',
            boxShadow: `
              0 24px 48px rgba(0,0,0,0.5),
              0 12px 24px rgba(0,0,0,0.3),
              inset 0 1px 0 rgba(255,255,255,0.15),
              inset 0 -1px 0 rgba(0,0,0,0.3)
            `
          }}
        >
          <CardContent className="p-8">
            <div className="flex items-center justify-center mb-6">
              <div 
                className="flex items-center gap-3 px-6 py-3 rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,122,255,0.2) 0%, rgba(175,82,222,0.2) 100%)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}
              >
                <Tv className="h-6 w-6 text-blue-400" />
                <h3 
                  className="text-xl font-semibold text-white"
                  style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}
                >
                  Choose Your DTH Provider
                </h3>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {dthProviders.map((provider, index) => (
                <div
                  key={provider.id}
                  onClick={() => handleProviderSelect(provider)}
                  className="relative group cursor-pointer transition-all duration-500 hover:scale-105 active:scale-95"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Provider Glow Effect */}
                  <div 
                    className={`absolute inset-0 rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-all duration-500 ${
                      selectedProvider === provider.id ? 'opacity-80' : ''
                    }`}
                    style={{ background: provider.glowColor }}
                  />
                  
                  <Card
                    className={`relative border-0 overflow-hidden transition-all duration-500 apple-pay-button ${
                      selectedProvider === provider.id ? 'ring-2 ring-white/40 scale-105' : ''
                    }`}
                    style={{
                      background: `
                        linear-gradient(135deg, 
                          rgba(255,255,255,0.15) 0%, 
                          rgba(255,255,255,0.08) 50%,
                          rgba(255,255,255,0.03) 100%
                        ),
                        linear-gradient(135deg, 
                          rgba(0,0,0,0.3) 0%, 
                          rgba(0,0,0,0.5) 100%
                        ),
                        ${provider.gradient}
                      `,
                      backdropFilter: 'blur(30px)',
                      border: `1px solid ${selectedProvider === provider.id ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.15)'}`,
                      boxShadow: `
                        0 16px 32px rgba(0,0,0,0.4),
                        0 8px 16px ${provider.glowColor},
                        inset 0 1px 0 rgba(255,255,255,0.2),
                        inset 0 -1px 0 rgba(0,0,0,0.3)
                      `
                    }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <provider.icon className="transition-transform duration-300 group-hover:scale-110" />
                          {selectedProvider === provider.id && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                              <Check className="h-4 w-4 text-white" />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <h4 
                            className="text-xl font-bold text-white mb-2"
                            style={{ 
                              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                              textShadow: '0 2px 6px rgba(0,0,0,0.8), 0 1px 3px rgba(0,0,0,0.6)'
                            }}
                          >
                            {provider.name}
                          </h4>
                          <p 
                            className="text-white/90 text-sm mb-3 leading-relaxed"
                            style={{ 
                              textShadow: '0 1px 3px rgba(0,0,0,0.6)',
                              fontWeight: '500'
                            }}
                          >
                            {provider.description}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-white/80 font-medium">
                            <div className="flex items-center gap-1">
                              <Shield className="h-4 w-4" />
                              <span style={{ textShadow: '0 1px 2px rgba(0,0,0,0.6)' }}>Secure & Instant</span>
                            </div>
                            <div className="w-1 h-1 bg-white/60 rounded-full" />
                            <div className="flex items-center gap-1">
                              <Zap className="h-4 w-4" />
                              <span style={{ textShadow: '0 1px 2px rgba(0,0,0,0.6)' }}>24/7 Service</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <Badge 
                            className="bg-white/20 text-white text-xs font-medium px-3 py-1"
                            style={{ backdropFilter: 'blur(10px)' }}
                          >
                            Premium
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                    
                    {/* Hover Shimmer Effect */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-3xl"
                      style={{
                        background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.6) 50%, transparent 70%)'
                      }}
                    />
                  </Card>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Ultra-Premium Subscriber Number Input */}
        {selectedProvider && (
          <Card 
            className="border-0 overflow-hidden"
            style={{
              background: `
                linear-gradient(135deg, 
                  rgba(255,255,255,0.12) 0%, 
                  rgba(255,255,255,0.08) 50%,
                  rgba(255,255,255,0.04) 100%
                ),
                linear-gradient(135deg, 
                  rgba(0,0,0,0.4) 0%, 
                  rgba(0,0,0,0.6) 100%
                )
              `,
              backdropFilter: 'blur(40px)',
              border: '1px solid rgba(255,255,255,0.15)',
              boxShadow: `
                0 24px 48px rgba(0,0,0,0.5),
                0 12px 24px rgba(0,0,0,0.3),
                inset 0 1px 0 rgba(255,255,255,0.15),
                inset 0 -1px 0 rgba(0,0,0,0.3)
              `
            }}
          >
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-6">
                <div 
                  className="flex items-center gap-3 px-6 py-3 rounded-2xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0,122,255,0.2) 0%, rgba(175,82,222,0.2) 100%)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                >
                  <Smartphone className="h-6 w-6 text-blue-400" />
                  <h3 
                    className="text-xl font-semibold text-white"
                    style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}
                  >
                    Subscriber Details
                  </h3>
                </div>
              </div>
              
              <div className="space-y-8 mb-24">
                <div>
                  <label 
                    className="block text-white text-base font-semibold mb-4"
                    style={{ 
                      textShadow: '0 1px 3px rgba(0,0,0,0.6)',
                      fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
                    }}
                  >
                    Subscriber Number
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter your subscriber number"
                    value={subscriberNumber}
                    onChange={(e) => setSubscriberNumber(e.target.value)}
                    className="h-16 text-lg rounded-2xl transition-all duration-300 focus:scale-105 font-medium"
                    style={{
                      background: `
                        linear-gradient(135deg, 
                          rgba(255,255,255,0.1) 0%, 
                          rgba(255,255,255,0.05) 100%
                        ),
                        linear-gradient(135deg, 
                          rgba(0,0,0,0.3) 0%, 
                          rgba(0,0,0,0.5) 100%
                        )
                      `,
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: 'white',
                      fontSize: '16px',
                      fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                      textShadow: '0 1px 2px rgba(0,0,0,0.6)',
                      boxShadow: `
                        0 8px 16px rgba(0,0,0,0.3),
                        inset 0 1px 0 rgba(255,255,255,0.1),
                        inset 0 -1px 0 rgba(0,0,0,0.2)
                      `
                    }}
                  />
                </div>
                
                <div className="mb-8">
                  <Button
                    onClick={handleGetPlans}
                    disabled={!subscriberNumber || subscriberNumber.length < 10}
                    className="w-full h-16 rounded-2xl text-lg font-semibold transition-all duration-300 hover:scale-105 active:scale-95 apple-pay-button"
                    style={{
                      background: subscriberNumber && subscriberNumber.length >= 10 
                        ? 'linear-gradient(135deg, #007AFF 0%, #5856D6 50%, #AF52DE 100%)'
                        : 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255,255,255,0.3)',
                      boxShadow: subscriberNumber && subscriberNumber.length >= 10 
                        ? '0 8px 24px rgba(0,122,255,0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
                        : '0 4px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
                      fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
                    }}
                  >
                    <Signal className="h-6 w-6 mr-3" />
                    Get Available Plans
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Ultra-Premium DTH Plans */}
        {showPlans && (
          <Card 
            className="border-0 overflow-hidden"
            style={{
              background: `
                linear-gradient(135deg, 
                  rgba(255,255,255,0.12) 0%, 
                  rgba(255,255,255,0.08) 50%,
                  rgba(255,255,255,0.04) 100%
                ),
                linear-gradient(135deg, 
                  rgba(0,0,0,0.4) 0%, 
                  rgba(0,0,0,0.6) 100%
                )
              `,
              backdropFilter: 'blur(40px)',
              border: '1px solid rgba(255,255,255,0.15)',
              boxShadow: `
                0 24px 48px rgba(0,0,0,0.5),
                0 12px 24px rgba(0,0,0,0.3),
                inset 0 1px 0 rgba(255,255,255,0.15),
                inset 0 -1px 0 rgba(0,0,0,0.3)
              `
            }}
          >
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-6">
                <div 
                  className="flex items-center gap-3 px-6 py-3 rounded-2xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0,122,255,0.2) 0%, rgba(175,82,222,0.2) 100%)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                >
                  <Star className="h-6 w-6 text-yellow-400" />
                  <h3 
                    className="text-xl font-semibold text-white"
                    style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}
                  >
                    Premium Plans Available
                  </h3>
                </div>
              </div>
              
              <div className="space-y-4">
                {dthPlans.map((plan, index) => (
                  <div
                    key={plan.id}
                    onClick={() => handlePlanSelect(plan)}
                    className="relative group cursor-pointer transition-all duration-500 hover:scale-105 active:scale-95"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Card
                      className={`border-0 transition-all duration-500 apple-pay-button ${
                        selectedPlan?.id === plan.id ? 'ring-2 ring-blue-400/50 scale-105' : ''
                      }`}
                      style={{
                        background: `
                          linear-gradient(135deg, 
                            rgba(255,255,255,0.15) 0%, 
                            rgba(255,255,255,0.05) 100%
                          )
                        `,
                        backdropFilter: 'blur(20px)',
                        border: `1px solid ${selectedPlan?.id === plan.id ? 'rgba(0,122,255,0.4)' : 'rgba(255,255,255,0.2)'}`,
                        boxShadow: `
                          0 12px 24px rgba(0,0,0,0.3),
                          0 4px 8px rgba(0,0,0,0.2),
                          inset 0 1px 0 rgba(255,255,255,0.2)
                        `
                      }}
                    >
                      <CardContent className="p-6">
                        <div className="flex flex-col space-y-4">
                          {/* Plan Header with Price */}
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <h4 
                                className="text-lg font-bold text-white mb-2 line-clamp-1"
                                style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}
                              >
                                {plan.name}
                              </h4>
                              
                              {/* Badges Row */}
                              <div className="flex items-center gap-2 mb-3 flex-wrap">
                                {plan.popular && (
                                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-2 py-1 whitespace-nowrap">
                                    <Star className="h-3 w-3 mr-1" />
                                    POPULAR
                                  </Badge>
                                )}
                                {plan.savings && (
                                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-2 py-1 whitespace-nowrap">
                                    {plan.savings}
                                  </Badge>
                                )}
                              </div>
                            </div>
                            
                            {/* Price Section */}
                            <div className="text-right ml-4 flex-shrink-0">
                              <div className="text-3xl font-bold text-white mb-1">
                                ₹{plan.price}
                              </div>
                              {plan.originalPrice > plan.price && (
                                <div className="text-sm text-white/50 line-through">
                                  ₹{plan.originalPrice}
                                </div>
                              )}
                              {selectedPlan?.id === plan.id && (
                                <div className="flex items-center justify-center w-8 h-8 bg-green-500 rounded-full mt-2 mx-auto">
                                  <Check className="h-5 w-5 text-white" />
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* Plan Description */}
                          <p className="text-white/80 text-sm leading-relaxed">{plan.description}</p>
                          
                          {/* Plan Details */}
                          <div className="grid grid-cols-2 gap-4 text-xs text-white/70">
                            <div className="flex items-center gap-2">
                              <Tv className="h-4 w-4 flex-shrink-0" />
                              <span className="truncate">{plan.channels}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 flex-shrink-0" />
                              <span className="truncate">{plan.duration}</span>
                            </div>
                          </div>
                          
                          {/* Features */}
                          <div className="flex flex-wrap gap-2">
                            {plan.features.map((feature, idx) => (
                              <Badge 
                                key={idx}
                                className="text-xs bg-white/10 text-white/80 border border-white/20 whitespace-nowrap"
                                style={{ backdropFilter: 'blur(10px)' }}
                              >
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                      
                      {/* Plan Hover Effect */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-3xl"
                        style={{
                          background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)'
                        }}
                      />
                    </Card>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Ultra-Premium Recharge Button */}
        {selectedPlan && (
          <div className="space-y-6">
            {/* Amount Summary */}
            <Card 
              className="border-0 overflow-hidden"
              style={{
                background: `
                  linear-gradient(135deg, 
                    rgba(0,122,255,0.2) 0%, 
                    rgba(175,82,222,0.2) 100%
                  )
                `,
                backdropFilter: 'blur(30px)',
                border: '1px solid rgba(255,255,255,0.3)',
                boxShadow: `
                  0 20px 40px rgba(0,122,255,0.2),
                  0 8px 16px rgba(0,0,0,0.2),
                  inset 0 1px 0 rgba(255,255,255,0.3)
                `
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm">Recharge Amount</p>
                    <p className="text-3xl font-bold text-white">₹{amount}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/80 text-sm">Plan</p>
                    <p className="text-lg font-semibold text-white">{selectedPlan.name}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ultra-Premium Recharge Button */}
            <Button
              onClick={handleRecharge}
              className="w-full h-20 rounded-3xl text-xl font-bold transition-all duration-500 hover:scale-105 active:scale-95 apple-pay-button"
              style={{
                background: 'linear-gradient(135deg, #007AFF 0%, #5856D6 30%, #AF52DE 70%, #FF2D92 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.3)',
                boxShadow: '0 16px 48px rgba(0,122,255,0.5), 0 8px 24px rgba(175,82,222,0.3), inset 0 1px 0 rgba(255,255,255,0.3)',
                fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
              }}
            >
              <div className="flex items-center gap-4">
                <CreditCard className="h-8 w-8" />
                <span>Proceed to Payment - ₹{amount}</span>
                <ArrowRight className="h-8 w-8" />
              </div>
            </Button>
          </div>
        )}
      </div>

      <BottomNavigation activeTab="home" />
    </div>
  );
}