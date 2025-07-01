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
              onClick={() => setShowAddPass(true)}
              className="border-blue-400/30 text-blue-400 hover:bg-blue-400/10 rounded-xl"
            >
              + Add Pass
            </Button>
          </div>

          <div className="flex space-x-4 overflow-x-auto hide-scrollbar pb-4">
            {transitPasses.map((pass, index) => (
              <Card
                key={pass.id}
                className={`min-w-[300px] cursor-pointer transition-all duration-500 ${
                  selectedPass === index ? 'scale-105 z-10' : 'scale-95 opacity-80'
                }`}
                onClick={() => setSelectedPass(index)}
                style={{
                  background: `
                    linear-gradient(135deg, 
                      rgba(255,255,255,0.15) 0%, 
                      rgba(255,255,255,0.05) 25%, 
                      transparent 50%, 
                      rgba(0,0,0,0.05) 75%, 
                      rgba(0,0,0,0.1) 100%
                    ),
                    ${pass.color}
                  `,
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  boxShadow: selectedPass === index 
                    ? '0 25px 50px -12px rgba(0,0,0,0.5), 0 0 40px rgba(0,122,255,0.3)'
                    : '0 15px 30px -8px rgba(0,0,0,0.3)'
                }}
              >
                <CardContent className="p-6 h-44 relative">
                  {/* Pass Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                        <pass.IconComponent className="w-8 h-8" animated={selectedPass === index} />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-lg">{pass.type}</p>
                        <p className="text-white/70 text-sm">{pass.name}</p>
                      </div>
                    </div>
                    <Badge
                      className={`${
                        pass.status === 'active' ? 'bg-green-500/20 text-green-400' :
                        pass.status === 'low_balance' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {pass.status === 'active' ? 'Active' :
                       pass.status === 'low_balance' ? 'Low Balance' : 'Expired'}
                    </Badge>
                  </div>

                  {/* Balance */}
                  <div className="space-y-2">
                    <p className="text-white/70 text-sm">Balance</p>
                    <p className="text-white text-3xl font-bold">₹{pass.balance.toFixed(2)}</p>
                  </div>

                  {/* Valid Until */}
                  <div className="absolute bottom-6 left-6">
                    <p className="text-white/70 text-xs">Valid until</p>
                    <p className="text-white text-sm font-medium">{pass.validUntil}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action) => (
              <Card
                key={action.id}
                className="ultra-premium-card border-0 cursor-pointer transition-all duration-500 hover:scale-105"
                style={{
                  background: `
                    linear-gradient(135deg, 
                      rgba(255,255,255,0.15) 0%, 
                      rgba(255,255,255,0.08) 50%, 
                      rgba(255,255,255,0.05) 100%
                    ),
                    ${action.gradient}
                  `,
                  backdropFilter: 'blur(25px)',
                  WebkitBackdropFilter: 'blur(25px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  boxShadow: '0 20px 40px -12px rgba(0,0,0,0.4), 0 0 30px rgba(255,255,255,0.1)'
                }}
                onClick={action.action}
              >
                <CardContent className="p-6 h-[120px] flex flex-col justify-center">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/30">
                      <action.IconComponent className="w-8 h-8" animated={action.animated} />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-sm" style={{ fontFamily: 'SF Pro Display, system-ui' }}>
                        {action.title}
                      </h3>
                      <p className="text-white/80 text-xs font-medium">{action.subtitle}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Routes */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Recent Routes</h2>
          <div className="space-y-3">
            {recentRoutes.map((route) => (
              <Card
                key={route.id}
                className="border-0 cursor-pointer hover:scale-[1.02] transition-all duration-300"
                style={{
                  background: `
                    linear-gradient(135deg, 
                      rgba(255,255,255,0.10) 0%, 
                      rgba(255,255,255,0.05) 100%
                    )
                  `,
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-sm border ${
                      route.type === 'metro' 
                        ? 'bg-blue-500/20 border-blue-400/30' 
                        : 'bg-green-500/20 border-green-400/30'
                    }`}>
                      {route.type === 'metro' ? 
                        <MetroIconSVG className="w-8 h-8" animated={true} /> :
                        <BusIconSVG className="w-8 h-8" animated={true} />
                      }
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-white font-semibold">{route.routeName}</h3>
                        <Badge
                          className={`text-xs ${
                            route.status === 'on_time' ? 'bg-green-500/20 text-green-400' :
                            route.status === 'delayed' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }`}
                        >
                          {route.status === 'on_time' ? 'On Time' :
                           route.status === 'delayed' ? 'Delayed' : 'Cancelled'}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span>{route.from} → {route.to}</span>
                        <span>•</span>
                        <span>{route.duration}</span>
                        <span>•</span>
                        <span>₹{route.fare}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 mt-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-400">Next in {route.nextArrival}</span>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl"
                    >
                      Book
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="pb-24" />
      <BottomNavigation activeTab="transit" />
    </div>
  );
}