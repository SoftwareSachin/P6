import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BottomNavigation } from "@/components/BottomNavigation";
import { ArrowLeft, Clock } from "lucide-react";
import { Link, useLocation } from "wouter";
import { ApplePayTransitSVG } from "@/components/ApplePaySVGs";
import { MetroIconSVG, BusIconSVG, QRScanIconSVG, TopUpIconSVG, RouteIconSVG, HistoryIconSVG, TrainIconSVG } from "@/components/PremiumTransitSVGs";

interface TransitPass {
  id: number;
  type: string;
  name: string;
  balance: number;
  validUntil: string;
  status: "active" | "expired" | "low_balance";
  IconComponent: React.ComponentType<{className?: string, animated?: boolean}>;
  color: string;
}

interface TransitRoute {
  id: number;
  type: "metro" | "bus";
  routeName: string;
  from: string;
  to: string;
  duration: string;
  fare: number;
  nextArrival: string;
  status: "on_time" | "delayed" | "cancelled";
}

export default function Transit() {
  const [selectedPass, setSelectedPass] = useState(0);
  const [transitPasses, setTransitPasses] = useState<TransitPass[]>([]);
  const [recentRoutes, setRecentRoutes] = useState<TransitRoute[]>([]);
  const [showAddPass, setShowAddPass] = useState(false);
  const [isAddingPass, setIsAddingPass] = useState(false);

  useEffect(() => {
    // Premium transit passes data
    setTransitPasses([
      {
        id: 1,
        type: "Metro Pass",
        name: "Mumbai Metro",
        balance: 247.50,
        validUntil: "Dec 31, 2025",
        status: "active",
        IconComponent: MetroIconSVG,
        color: "linear-gradient(135deg, #007AFF 0%, #5856D6 100%)"
      },
      {
        id: 2,
        type: "Bus Pass",
        name: "BEST Bus",
        balance: 89.20,
        validUntil: "Jan 15, 2026",
        status: "low_balance",
        IconComponent: BusIconSVG,
        color: "linear-gradient(135deg, #30D158 0%, #00C896 100%)"
      },
      {
        id: 3,
        type: "Local Train",
        name: "Western Railway",
        balance: 156.75,
        validUntil: "Mar 10, 2026",
        status: "active",
        IconComponent: TrainIconSVG,
        color: "linear-gradient(135deg, #FF9F0A 0%, #FF6B35 100%)"
      }
    ]);

    // Mock recent routes
    setRecentRoutes([
      {
        id: 1,
        type: "metro",
        routeName: "Blue Line",
        from: "Ghatkopar",
        to: "Versova",
        duration: "28 min",
        fare: 30,
        nextArrival: "3 min",
        status: "on_time"
      },
      {
        id: 2,
        type: "bus",
        routeName: "Route 421",
        from: "Bandra Station",
        to: "Worli Sea Face",
        duration: "15 min",
        fare: 25,
        nextArrival: "7 min",
        status: "delayed"
      },
      {
        id: 3,
        type: "metro",
        routeName: "Red Line",
        from: "Andheri",
        to: "Dahisar",
        duration: "22 min",
        fare: 40,
        nextArrival: "1 min",
        status: "on_time"
      }
    ]);
  }, []);

  const [, setLocation] = useLocation();

  const handleTopUp = () => {
    const selectedTransitPass = transitPasses[selectedPass];
    if (selectedTransitPass) {
      const topUpAmount = 100; // ₹100 top up
      setTransitPasses(prev => prev.map(pass => 
        pass.id === selectedTransitPass.id 
          ? { ...pass, balance: pass.balance + topUpAmount, status: "active" as const }
          : pass
      ));
      console.log(`Topped up ₹${topUpAmount} to ${selectedTransitPass.name}`);
    }
  };

  const handlePlanRoute = () => {
    console.log('Planning route with smart recommendations');
    // In a real app, this would open route planning interface
  };

  const handleBookNow = (route: TransitRoute) => {
    console.log('🚌 Book Now button clicked for route:', route);
    alert(`Book Now clicked for ${route.routeName}! Check console for details.`);
    
    // Store booking information in localStorage for transfer to SendMoney page
    const bookingInfo = {
      type: 'transit_booking',
      route: route,
      merchantName: `${route.type === 'metro' ? 'Metro' : 'Bus'} Service`,
      merchantId: `transit_${route.type}_${route.id}`,
      description: `${route.routeName} - ${route.from} to ${route.to}`,
      amount: route.fare.toString(),
      note: `Transit booking for ${route.routeName} (${route.from} → ${route.to})`
    };
    
    localStorage.setItem('pendingBooking', JSON.stringify(bookingInfo));
    console.log(`📋 Booking stored:`, bookingInfo);
    console.log(`🔄 Navigating to send money page...`);
    
    // Navigate to send money page
    setLocation('/send-money?booking=transit');
  };

  const quickActions = [
    {
      id: 1,
      title: "Scan QR",
      subtitle: "Quick Entry",
      IconComponent: QRScanIconSVG,
      action: () => setLocation('/qr-scanner'),
      gradient: "linear-gradient(135deg, #007AFF 0%, #5856D6 100%)",
      animated: true
    },
    {
      id: 2,
      title: "Top Up",
      subtitle: "Add Money",
      IconComponent: TopUpIconSVG,
      action: () => handleTopUp(),
      gradient: "linear-gradient(135deg, #30D158 0%, #00C896 100%)",
      animated: true
    },
    {
      id: 3,
      title: "Plan Route",
      subtitle: "Journey",
      IconComponent: RouteIconSVG,
      action: () => handlePlanRoute(),
      gradient: "linear-gradient(135deg, #AF52DE 0%, #5856D6 100%)",
      animated: true
    },
    {
      id: 4,
      title: "History",
      subtitle: "Past Trips",
      IconComponent: HistoryIconSVG,
      action: () => setLocation('/transactions'),
      gradient: "linear-gradient(135deg, #FF9F0A 0%, #FF6B35 100%)",
      animated: true
    }
  ];

  const handleAddPass = async () => {
    setIsAddingPass(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newPassOptions = [
      {
        id: Date.now(),
        type: "Express Bus",
        name: "Mumbai Airport Link",
        balance: 200.00,
        validUntil: "Jun 30, 2026",
        status: "active" as const,
        IconComponent: BusIconSVG,
        color: "linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)"
      },
      {
        id: Date.now() + 1,
        type: "Ferry Pass",
        name: "Gateway Ferry",
        balance: 150.00,
        validUntil: "Aug 15, 2026",
        status: "active" as const,
        IconComponent: TrainIconSVG,
        color: "linear-gradient(135deg, #00C896 0%, #007AFF 100%)"
      },
      {
        id: Date.now() + 2,
        type: "Premium Metro",
        name: "Delhi Metro Gold",
        balance: 500.00,
        validUntil: "Dec 31, 2026",
        status: "active" as const,
        IconComponent: MetroIconSVG,
        color: "linear-gradient(135deg, #FFD60A 0%, #FF9F0A 100%)"
      }
    ];
    
    // Add random new pass
    const randomPass = newPassOptions[Math.floor(Math.random() * newPassOptions.length)];
    setTransitPasses(prev => [...prev, randomPass]);
    setSelectedPass(transitPasses.length); // Select the new pass
    setIsAddingPass(false);
    console.log(`Added new pass: ${randomPass.name}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-black/30 border-b border-white/10">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20">
                <ArrowLeft className="h-5 w-5 text-white" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-white" style={{ fontFamily: 'SF Pro Display, system-ui' }}>
                Transit
              </h1>
              <p className="text-sm text-gray-400">Your metro & bus passes</p>
            </div>
          </div>
          <ApplePayTransitSVG className="w-8 h-8 text-blue-400" />
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Transit Passes */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Your Passes</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddPass}
              disabled={isAddingPass}
              className="border-blue-400/40 text-blue-400 hover:bg-blue-400/20 hover:border-blue-400/60 rounded-xl transition-all duration-300 backdrop-blur-sm bg-blue-400/5"
              style={{
                background: isAddingPass 
                  ? 'linear-gradient(135deg, rgba(0,122,255,0.15) 0%, rgba(88,86,214,0.15) 100%)'
                  : 'linear-gradient(135deg, rgba(0,122,255,0.08) 0%, rgba(88,86,214,0.08) 100%)',
                boxShadow: '0 8px 16px -4px rgba(0,122,255,0.2)',
                fontFamily: 'SF Pro Display, system-ui'
              }}
            >
              {isAddingPass ? (
                <>
                  <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mr-2" />
                  Adding...
                </>
              ) : (
                '+ Add Pass'
              )}
            </Button>
          </div>

          <div className="flex space-x-6 overflow-x-auto hide-scrollbar pb-6">
            {transitPasses.map((pass, index) => {
              const isSelected = selectedPass === index;
              return (
                <Card
                  key={pass.id}
                  className={`min-w-[360px] cursor-pointer transition-all duration-700 transform-gpu hover:cursor-pointer ${
                    isSelected ? 'scale-110 z-30 rotate-1' : 'scale-95 opacity-75 hover:scale-100 hover:opacity-90'
                  }`}
                  onClick={() => setSelectedPass(index)}
                  style={{
                    background: `
                      linear-gradient(145deg, 
                        rgba(255,255,255,0.4) 0%, 
                        rgba(255,255,255,0.25) 15%, 
                        rgba(255,255,255,0.15) 30%, 
                        rgba(255,255,255,0.08) 45%, 
                        rgba(255,255,255,0.05) 60%, 
                        rgba(0,0,0,0.08) 75%, 
                        rgba(0,0,0,0.15) 90%, 
                        rgba(0,0,0,0.25) 100%
                      ),
                      ${pass.color}
                    `,
                    backdropFilter: 'blur(40px) saturate(2.0) contrast(1.3) brightness(1.1)',
                    WebkitBackdropFilter: 'blur(40px) saturate(2.0) contrast(1.3) brightness(1.1)',
                    border: isSelected 
                      ? '2px solid rgba(255,255,255,0.6)' 
                      : '1px solid rgba(255,255,255,0.25)',
                    boxShadow: isSelected 
                      ? `0 50px 100px -25px rgba(0,0,0,0.8), 
                         0 25px 50px -10px rgba(0,0,0,0.6), 
                         0 0 120px rgba(0,122,255,0.6), 
                         inset 0 3px 12px rgba(255,255,255,0.4), 
                         inset 0 -3px 12px rgba(0,0,0,0.2),
                         inset 0 0 60px rgba(255,255,255,0.1)`
                      : `0 30px 60px -20px rgba(0,0,0,0.6), 
                         0 15px 30px -8px rgba(0,0,0,0.4), 
                         0 8px 16px -4px rgba(0,0,0,0.3),
                         inset 0 2px 8px rgba(255,255,255,0.2), 
                         inset 0 -2px 8px rgba(0,0,0,0.1)`,
                    borderRadius: '28px',
                    transformStyle: 'preserve-3d',
                    perspective: '1200px',
                    fontFamily: 'SF Pro Display, system-ui',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Ultra-Premium Background Pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/30 to-transparent rounded-full blur-2xl" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/20 to-transparent rounded-full blur-xl" />
                  </div>

                  {/* Holographic Light Effect */}
                  {isSelected && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                  )}

                  <CardContent className="p-8 h-60 relative overflow-hidden">
                    {/* Ultra-Premium Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-4 flex-1 min-w-0">
                        <div 
                          className="w-16 h-16 rounded-3xl flex items-center justify-center backdrop-blur-lg flex-shrink-0"
                          style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.15) 100%)',
                            border: '1.5px solid rgba(255,255,255,0.4)',
                            boxShadow: 'inset 0 3px 8px rgba(255,255,255,0.25), inset 0 -3px 8px rgba(0,0,0,0.1), 0 8px 20px rgba(0,0,0,0.2)'
                          }}
                        >
                          <pass.IconComponent className="w-10 h-10 text-white drop-shadow-lg" animated={isSelected} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-black text-xl tracking-tight drop-shadow-lg truncate" style={{ fontFamily: 'SF Pro Display, system-ui' }}>
                            {pass.type}
                          </p>
                          <p className="text-white/90 text-sm font-semibold drop-shadow-sm truncate">
                            {pass.name}
                          </p>
                        </div>
                      </div>
                      <Badge
                        className={`text-xs font-black px-4 py-2 backdrop-blur-lg border-0 rounded-full ${
                          pass.status === 'active' ? 'bg-green-500/30 text-green-100' :
                          pass.status === 'low_balance' ? 'bg-yellow-500/30 text-yellow-100' :
                          'bg-red-500/30 text-red-100'
                        }`}
                        style={{
                          background: pass.status === 'active' 
                            ? 'linear-gradient(135deg, rgba(34,197,94,0.5) 0%, rgba(34,197,94,0.25) 100%)'
                            : pass.status === 'low_balance'
                            ? 'linear-gradient(135deg, rgba(234,179,8,0.5) 0%, rgba(234,179,8,0.25) 100%)'
                            : 'linear-gradient(135deg, rgba(239,68,68,0.5) 0%, rgba(239,68,68,0.25) 100%)',
                          boxShadow: '0 6px 12px rgba(0,0,0,0.25), inset 0 1px 2px rgba(255,255,255,0.2)'
                        }}
                      >
                        {pass.status === 'active' ? 'ACTIVE' :
                         pass.status === 'low_balance' ? 'LOW BALANCE' : 'EXPIRED'}
                      </Badge>
                    </div>

                    {/* Ultra-Premium Balance Display */}
                    <div className="space-y-3 mb-6">
                      <p className="text-white/80 text-xs font-semibold tracking-wide drop-shadow-sm uppercase">Current Balance</p>
                      <div className="relative">
                        <p 
                          className="text-white text-4xl font-black tracking-tight drop-shadow-lg"
                          style={{
                            textShadow: '0 3px 12px rgba(0,0,0,0.4), 0 0 24px rgba(255,255,255,0.15)',
                            fontFeatureSettings: '"tnum" 1',
                            background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontFamily: 'SF Pro Display, system-ui'
                          }}
                        >
                          ₹{pass.balance.toFixed(2)}
                        </p>
                        {isSelected && (
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer" />
                        )}
                      </div>
                      <p className="text-white/70 text-xs font-medium drop-shadow-sm">Dec 31, 2025</p>
                    </div>

                    {/* Ultra-Premium Footer */}
                    <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                      <div>
                        <p className="text-white/70 text-xs font-semibold tracking-wider uppercase drop-shadow-sm">Valid Until</p>
                        <p className="text-white text-sm font-bold drop-shadow-sm">{pass.validUntil}</p>
                      </div>
                      {isSelected ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse drop-shadow-lg" />
                          <span className="text-green-300 text-xs font-black drop-shadow-sm">SELECTED</span>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          className="h-8 px-4 rounded-xl font-bold text-xs border-0 transition-all duration-300 hover:scale-105"
                          style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 100%)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255,255,255,0.4)',
                            boxShadow: `
                              0 4px 12px rgba(0,0,0,0.2), 
                              inset 0 1px 2px rgba(255,255,255,0.3), 
                              inset 0 -1px 2px rgba(0,0,0,0.1)
                            `,
                            color: 'white',
                            textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                          }}
                          onClick={() => setSelectedPass(pass.id)}
                        >
                          SELECT
                        </Button>
                      )}
                    </div>

                    {/* Apple Pay-style Contactless Symbol */}
                    <div className="absolute top-6 right-6 w-10 h-10 opacity-50">
                      <svg viewBox="0 0 24 24" className="w-full h-full text-white">
                        <path
                          fill="currentColor"
                          d="M6.5 8.5c0-3.3 2.7-6 6-6s6 2.7 6 6v1h1.5c.8 0 1.5.7 1.5 1.5v8c0 .8-.7 1.5-1.5 1.5h-15c-.8 0-1.5-.7-1.5-1.5v-8c0-.8.7-1.5 1.5-1.5H5v-1zm3 1h6v-1c0-1.7-1.3-3-3-3s-3 1.3-3 3v1z"
                        />
                        <circle cx="12" cy="15" r="2" fill="currentColor" opacity="0.6" />
                      </svg>
                    </div>

                    {/* Ultra-Premium Card Shimmer Effect */}
                    {isSelected && (
                      <div 
                        className="absolute inset-0 opacity-30 pointer-events-none"
                        style={{
                          background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
                          animation: 'shimmer 3s infinite'
                        }}
                      />
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Ultra-Premium Quick Actions */}
        <div>
          <h2 className="text-xl font-bold text-white mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent" style={{ fontFamily: 'SF Pro Display, system-ui' }}>
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-5">
            {quickActions.map((action, index) => (
              <div key={action.id} className="relative group">
                {/* Card glow effect */}
                <div 
                  className="absolute inset-0 rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" 
                  style={{
                    background: action.gradient,
                    filter: 'blur(20px)'
                  }}
                />
                
                <Card
                  className="relative border-0 cursor-pointer transition-all duration-500 transform-gpu group-hover:scale-105 group-hover:-translate-y-1"
                  style={{
                    background: `
                      linear-gradient(145deg, 
                        rgba(255,255,255,0.25) 0%, 
                        rgba(255,255,255,0.15) 25%, 
                        rgba(255,255,255,0.08) 50%, 
                        rgba(255,255,255,0.05) 75%, 
                        rgba(0,0,0,0.05) 100%
                      ),
                      ${action.gradient}
                    `,
                    backdropFilter: 'blur(40px) saturate(1.8) contrast(1.2)',
                    WebkitBackdropFilter: 'blur(40px) saturate(1.8) contrast(1.2)',
                    border: '1.5px solid rgba(255,255,255,0.25)',
                    boxShadow: `
                      0 25px 50px -15px rgba(0,0,0,0.6), 
                      0 12px 25px -8px rgba(0,0,0,0.4),
                      0 6px 12px -3px rgba(0,0,0,0.3),
                      inset 0 2px 6px rgba(255,255,255,0.2), 
                      inset 0 -2px 6px rgba(0,0,0,0.1),
                      inset 0 0 40px rgba(255,255,255,0.05)
                    `,
                    borderRadius: '28px',
                    fontFamily: 'SF Pro Display, system-ui'
                  }}
                  onClick={action.action}
                >
                  {/* Holographic shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent animate-shimmer opacity-0 group-hover:opacity-100 rounded-3xl" />
                  
                  {/* Floating background particles */}
                  <div className="absolute top-2 right-2 w-6 h-6 bg-gradient-to-br from-white/30 to-transparent rounded-full blur-sm opacity-50" />
                  <div className="absolute bottom-3 left-3 w-4 h-4 bg-gradient-to-tr from-white/20 to-transparent rounded-full blur-sm opacity-40" />
                  
                  <CardContent className="p-6 h-[140px] flex flex-col justify-center relative z-10">
                    <div className="flex flex-col items-center text-center space-y-4">
                      {/* Ultra-Premium Icon Container */}
                      <div className="relative">
                        <div className="absolute inset-0 rounded-3xl bg-white/30 blur-md" />
                        <div 
                          className="relative w-16 h-16 rounded-3xl flex items-center justify-center backdrop-blur-lg border-2 border-white/40"
                          style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.15) 100%)',
                            boxShadow: `
                              inset 0 3px 8px rgba(255,255,255,0.3), 
                              inset 0 -3px 8px rgba(0,0,0,0.1),
                              0 10px 25px rgba(0,0,0,0.3)
                            `
                          }}
                        >
                          <action.IconComponent 
                            className="w-10 h-10 text-white drop-shadow-lg" 
                            animated={action.animated} 
                          />
                        </div>
                      </div>
                      
                      {/* Enhanced Typography */}
                      <div className="space-y-1">
                        <h3 className="text-white font-black text-base tracking-tight drop-shadow-lg">
                          {action.title}
                        </h3>
                        <p className="text-white/90 text-sm font-semibold drop-shadow-sm">
                          {action.subtitle}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Ultra-Premium Recent Routes */}
        <div>
          <h2 className="text-xl font-bold text-white mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent" style={{ fontFamily: 'SF Pro Display, system-ui' }}>
            Recent Routes
          </h2>
          <div className="space-y-4">
            {recentRoutes.map((route, index) => (
              <div key={route.id} className="relative group">
                {/* Card glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <Card
                  className="relative border-0 cursor-pointer transition-all duration-500 transform-gpu group-hover:scale-[1.02] group-hover:rotate-0.5"
                  style={{
                    background: `
                      linear-gradient(145deg, 
                        rgba(255,255,255,0.15) 0%, 
                        rgba(255,255,255,0.08) 30%, 
                        rgba(255,255,255,0.05) 60%, 
                        rgba(0,0,0,0.05) 100%
                      )
                    `,
                    backdropFilter: 'blur(30px) saturate(1.8) contrast(1.2)',
                    WebkitBackdropFilter: 'blur(30px) saturate(1.8) contrast(1.2)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    boxShadow: `
                      0 20px 40px -15px rgba(0,0,0,0.6), 
                      0 8px 16px -6px rgba(0,0,0,0.4),
                      inset 0 2px 4px rgba(255,255,255,0.15), 
                      inset 0 -2px 4px rgba(0,0,0,0.1)
                    `,
                    borderRadius: '24px',
                    fontFamily: 'SF Pro Display, system-ui'
                  }}
                >
                  {/* Holographic shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer opacity-0 group-hover:opacity-100" />
                  
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-5">
                      {/* Ultra-Premium Icon Container */}
                      <div className="relative">
                        <div className={`absolute inset-0 rounded-2xl blur-md ${
                          route.type === 'metro' 
                            ? 'bg-gradient-to-br from-blue-500/40 to-purple-500/40' 
                            : 'bg-gradient-to-br from-green-500/40 to-emerald-500/40'
                        }`} />
                        <div 
                          className={`relative w-16 h-16 rounded-2xl flex items-center justify-center backdrop-blur-lg border-2 ${
                            route.type === 'metro' 
                              ? 'border-blue-400/40' 
                              : 'border-green-400/40'
                          }`}
                          style={{
                            background: route.type === 'metro' 
                              ? 'linear-gradient(135deg, rgba(59,130,246,0.3) 0%, rgba(147,51,234,0.3) 100%)'
                              : 'linear-gradient(135deg, rgba(34,197,94,0.3) 0%, rgba(16,185,129,0.3) 100%)',
                            boxShadow: `
                              inset 0 2px 8px rgba(255,255,255,0.2), 
                              inset 0 -2px 8px rgba(0,0,0,0.1),
                              0 8px 20px rgba(0,0,0,0.3)
                            `
                          }}
                        >
                          {route.type === 'metro' ? 
                            <MetroIconSVG className="w-10 h-10 text-white drop-shadow-lg" animated={true} /> :
                            <BusIconSVG className="w-10 h-10 text-white drop-shadow-lg" animated={true} />
                          }
                        </div>
                      </div>

                      {/* Ultra-Premium Content */}
                      <div className="flex-1 space-y-3 min-w-0">
                        {/* Route Header */}
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-white font-black text-lg tracking-tight drop-shadow-lg pr-3">
                            {route.routeName}
                          </h3>
                          <Badge
                            className={`text-xs font-black px-3 py-1.5 rounded-full border-0 backdrop-blur-lg flex-shrink-0 ${
                              route.status === 'on_time' ? 'text-green-100' :
                              route.status === 'delayed' ? 'text-yellow-100' :
                              'text-red-100'
                            }`}
                            style={{
                              background: route.status === 'on_time' 
                                ? 'linear-gradient(135deg, rgba(34,197,94,0.5) 0%, rgba(34,197,94,0.25) 100%)'
                                : route.status === 'delayed'
                                ? 'linear-gradient(135deg, rgba(234,179,8,0.5) 0%, rgba(234,179,8,0.25) 100%)'
                                : 'linear-gradient(135deg, rgba(239,68,68,0.5) 0%, rgba(239,68,68,0.25) 100%)',
                              boxShadow: '0 4px 8px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.2)'
                            }}
                          >
                            {route.status === 'on_time' ? 'ON TIME' :
                             route.status === 'delayed' ? 'DELAYED' : 'CANCELLED'}
                          </Badge>
                        </div>
                        
                        {/* Route Details */}
                        <div className="flex items-center space-x-3 text-sm">
                          <span className="text-white/90 font-semibold drop-shadow-sm truncate">
                            {route.from} → {route.to}
                          </span>
                          <div className="w-1 h-1 bg-white/50 rounded-full flex-shrink-0" />
                          <span className="text-white/80 font-medium">{route.duration}</span>
                          <div className="w-1 h-1 bg-white/50 rounded-full flex-shrink-0" />
                          <span className="text-white/80 font-medium">₹{route.fare}</span>
                        </div>
                        
                        {/* Next Arrival */}
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-white/70 drop-shadow-sm flex-shrink-0" />
                          <span className="text-white/80 text-sm font-medium drop-shadow-sm">
                            Next in {route.nextArrival}
                          </span>
                        </div>

                        {/* Ultra-Premium Book Button - Now inside content area */}
                        <div className="pt-2">
                          <Button
                            size="sm"
                            onClick={() => handleBookNow(route)}
                            className="h-10 px-8 rounded-2xl font-bold transition-all duration-300 hover:scale-105 border-0 w-full"
                            style={{
                              background: 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
                              boxShadow: `
                                0 8px 20px rgba(0,122,255,0.4), 
                                inset 0 2px 4px rgba(255,255,255,0.2), 
                                inset 0 -2px 4px rgba(0,0,0,0.1)
                              `,
                              textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                            }}
                          >
                            Book Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pb-24" />
      <BottomNavigation activeTab="transit" />
    </div>
  );
}