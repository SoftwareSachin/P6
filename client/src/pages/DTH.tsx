import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Tv, Signal, AlertCircle, Check, Star, Clock, Zap } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { BottomNavigation } from "@/components/BottomNavigation";
import { ApplePayContactlessSVG, ApplePaySecuritySVG, ApplePaySuccessSVG } from "@/components/ApplePaySVGs";

// DTH Provider SVG Components
const TataSkyDTHSVG = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="tataSkyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0066CC" />
        <stop offset="50%" stopColor="#0052A3" />
        <stop offset="100%" stopColor="#003D7A" />
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="16" fill="url(#tataSkyGradient)" />
    <circle cx="32" cy="20" r="6" fill="white" opacity="0.9" />
    <path d="M20 32 Q32 22 44 32 Q32 42 20 32" fill="white" opacity="0.8" />
    <text x="32" y="52" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">TATA</text>
  </svg>
);

const AirtelDTHSVG = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="airtelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ED1C24" />
        <stop offset="50%" stopColor="#C41E3A" />
        <stop offset="100%" stopColor="#8B0000" />
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="16" fill="url(#airtelGradient)" />
    <circle cx="32" cy="24" r="8" fill="white" opacity="0.9" />
    <path d="M16 38 Q32 28 48 38 Q32 48 16 38" fill="white" opacity="0.8" />
    <text x="32" y="56" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">AIRTEL</text>
  </svg>
);

const DishTVSVG = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="dishGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF6B00" />
        <stop offset="50%" stopColor="#E55B00" />
        <stop offset="100%" stopColor="#CC4A00" />
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="16" fill="url(#dishGradient)" />
    <ellipse cx="32" cy="28" rx="14" ry="8" fill="white" opacity="0.9" />
    <rect x="28" y="36" width="8" height="12" fill="white" opacity="0.8" />
    <text x="32" y="56" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">DISH</text>
  </svg>
);

const VideoconDTHSVG = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="videoconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4B0082" />
        <stop offset="50%" stopColor="#6A0DAD" />
        <stop offset="100%" stopColor="#8A2BE2" />
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="16" fill="url(#videoconGradient)" />
    <path d="M20 20 L44 20 L44 35 L32 44 L20 35 Z" fill="white" opacity="0.9" />
    <text x="32" y="56" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">VIDEOCON</text>
  </svg>
);

const SunDirectSVG = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sunDirectGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="50%" stopColor="#FFA500" />
        <stop offset="100%" stopColor="#FF8C00" />
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="16" fill="url(#sunDirectGradient)" />
    <circle cx="32" cy="28" r="10" fill="white" opacity="0.9" />
    <path d="M22 28 L42 28 M32 18 L32 38 M25.5 21.5 L38.5 34.5 M38.5 21.5 L25.5 34.5" stroke="url(#sunDirectGradient)" strokeWidth="2" />
    <text x="32" y="54" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">SUN DIRECT</text>
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

  // DTH Providers
  const dthProviders = [
    {
      id: "tatasky",
      name: "Tata Sky",
      icon: TataSkyDTHSVG,
      color: "#0066CC",
      gradient: "linear-gradient(135deg, #0066CC 0%, #003D7A 100%)",
      popularPlans: [299, 419, 599, 799]
    },
    {
      id: "airtel",
      name: "Airtel Digital TV",
      icon: AirtelDTHSVG,
      color: "#ED1C24",
      gradient: "linear-gradient(135deg, #ED1C24 0%, #8B0000 100%)",
      popularPlans: [329, 449, 649, 849]
    },
    {
      id: "dish",
      name: "Dish TV",
      icon: DishTVSVG,
      color: "#FF6B00",
      gradient: "linear-gradient(135deg, #FF6B00 0%, #CC4A00 100%)",
      popularPlans: [199, 349, 549, 749]
    },
    {
      id: "videocon",
      name: "Videocon d2h",
      icon: VideoconDTHSVG,
      color: "#6A0DAD",
      gradient: "linear-gradient(135deg, #6A0DAD 0%, #4B0082 100%)",
      popularPlans: [269, 389, 589, 789]
    },
    {
      id: "sundirect",
      name: "Sun Direct",
      icon: SunDirectSVG,
      color: "#FFD700",
      gradient: "linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)",
      popularPlans: [239, 359, 519, 719]
    }
  ];

  // Sample DTH Plans
  const dthPlans = [
    {
      id: 1,
      name: "HD Super Pack",
      price: 599,
      duration: "30 days",
      channels: "280+ Channels",
      description: "Premium HD channels with sports and movies",
      popular: true,
      savings: "Save ₹100"
    },
    {
      id: 2,
      name: "Family Entertainment",
      price: 419,
      duration: "30 days",
      channels: "200+ Channels",
      description: "Best family entertainment package",
      popular: false,
      savings: ""
    },
    {
      id: 3,
      name: "Sports Combo",
      price: 799,
      duration: "30 days",
      channels: "320+ Channels",
      description: "All sports channels included",
      popular: false,
      savings: "Save ₹150"
    },
    {
      id: 4,
      name: "Basic Pack",
      price: 299,
      duration: "30 days",
      channels: "150+ Channels",
      description: "Essential channels for daily viewing",
      popular: false,
      savings: ""
    }
  ];

  // DTH Recharge Mutation
  const rechargeMutation = useMutation({
    mutationFn: async (rechargeData: any) => {
      const response = await fetch('/api/dth/recharge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rechargeData),
      });
      if (!response.ok) throw new Error('Recharge failed');
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "DTH Recharge Successful!",
        description: "Your DTH has been recharged successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/user/balance'] });
      setLocation('/dashboard');
    },
    onError: (error: any) => {
      toast({
        title: "Recharge Failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleProviderSelect = (provider: any) => {
    setSelectedProvider(provider.id);
    setShowPlans(false);
  };

  const handleGetPlans = () => {
    if (!subscriberNumber || subscriberNumber.length < 10) {
      toast({
        title: "Invalid Number",
        description: "Please enter a valid subscriber number.",
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
        description: "Please fill all required fields.",
        variant: "destructive",
      });
      return;
    }

    const provider = dthProviders.find(p => p.id === selectedProvider);
    rechargeMutation.mutate({
      provider: provider?.name,
      subscriberNumber,
      amount: parseFloat(amount),
      plan: selectedPlan,
      type: 'dth'
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-gradient-to-r from-black via-gray-900 to-black">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10"
          onClick={() => setLocation('/dashboard')}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        
        <div className="text-center">
          <h1 className="text-xl font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
            DTH Recharge
          </h1>
          <p className="text-sm text-gray-400">Instant DTH top-up</p>
        </div>

        <div className="w-10" />
      </div>

      <div className="p-6 space-y-6">
        {/* DTH Providers */}
        <Card className="apple-pay-card border-0">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Tv className="h-5 w-5 mr-2" />
              Select DTH Provider
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {dthProviders.map((provider) => (
                <div
                  key={provider.id}
                  onClick={() => handleProviderSelect(provider)}
                  className={`relative group cursor-pointer transition-all duration-300 ${
                    selectedProvider === provider.id ? 'scale-105' : ''
                  }`}
                >
                  <div 
                    className={`absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300 ${
                      selectedProvider === provider.id ? 'opacity-60' : ''
                    }`}
                    style={{ background: provider.gradient }}
                  />
                  
                  <Card
                    className={`relative border-0 overflow-hidden transition-all duration-300 ${
                      selectedProvider === provider.id ? 'ring-2 ring-white/20' : ''
                    }`}
                    style={{
                      background: `linear-gradient(145deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05)), ${provider.gradient}`,
                      backdropFilter: 'blur(20px)'
                    }}
                  >
                    <CardContent className="p-4 text-center">
                      <provider.icon className="mx-auto mb-3" />
                      <h4 className="font-semibold text-white text-sm">{provider.name}</h4>
                      {selectedProvider === provider.id && (
                        <Check className="h-4 w-4 text-white mx-auto mt-2" />
                      )}
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Subscriber Number Input */}
        {selectedProvider && (
          <Card className="apple-pay-card border-0">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Signal className="h-5 w-5 mr-2" />
                Subscriber Number
              </h3>
              
              <Input
                type="text"
                placeholder="Enter subscriber number"
                value={subscriberNumber}
                onChange={(e) => setSubscriberNumber(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-14 text-lg rounded-xl"
              />
              
              <Button
                onClick={handleGetPlans}
                className="w-full mt-4 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                disabled={!subscriberNumber || subscriberNumber.length < 10}
              >
                Get Plans
              </Button>
            </CardContent>
          </Card>
        )}

        {/* DTH Plans */}
        {showPlans && (
          <Card className="apple-pay-card border-0">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Star className="h-5 w-5 mr-2" />
                Available Plans
              </h3>
              
              <div className="space-y-3">
                {dthPlans.map((plan) => (
                  <div
                    key={plan.id}
                    onClick={() => handlePlanSelect(plan)}
                    className={`relative group cursor-pointer transition-all duration-300 ${
                      selectedPlan?.id === plan.id ? 'scale-105' : ''
                    }`}
                  >
                    <Card
                      className={`border-0 transition-all duration-300 ${
                        selectedPlan?.id === plan.id ? 'ring-2 ring-blue-400' : ''
                      }`}
                      style={{
                        background: 'linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                        backdropFilter: 'blur(20px)'
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-white">{plan.name}</h4>
                              {plan.popular && (
                                <Badge className="bg-green-500 text-white text-xs">Popular</Badge>
                              )}
                              {plan.savings && (
                                <Badge className="bg-orange-500 text-white text-xs">{plan.savings}</Badge>
                              )}
                            </div>
                            <p className="text-gray-400 text-sm">{plan.description}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-300">
                              <span className="flex items-center gap-1">
                                <Tv className="h-3 w-3" />
                                {plan.channels}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {plan.duration}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-white">₹{plan.price}</div>
                            {selectedPlan?.id === plan.id && (
                              <Check className="h-5 w-5 text-green-400 mx-auto mt-1" />
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Custom Amount */}
        {selectedProvider && subscriberNumber && (
          <Card className="apple-pay-card border-0">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                Recharge Amount
              </h3>
              
              <Input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-14 text-lg rounded-xl mb-4"
              />

              {/* Quick Amounts */}
              <div className="grid grid-cols-4 gap-3 mb-6">
                {selectedProvider && dthProviders.find(p => p.id === selectedProvider)?.popularPlans.map((quickAmount) => (
                  <Button
                    key={quickAmount}
                    onClick={() => setAmount(quickAmount.toString())}
                    className={`h-12 rounded-xl ${
                      amount === quickAmount.toString() 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                        : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                    }`}
                  >
                    ₹{quickAmount}
                  </Button>
                ))}
              </div>

              <Button
                onClick={handleRecharge}
                disabled={!amount || rechargeMutation.isPending}
                className="w-full h-14 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold text-lg"
              >
                {rechargeMutation.isPending ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </div>
                ) : (
                  `Recharge ₹${amount || 0}`
                )}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <BottomNavigation activeTab="dashboard" />
    </div>
  );
}