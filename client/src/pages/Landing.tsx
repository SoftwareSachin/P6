import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Star, Check } from "lucide-react";
import { 
  OPPBLogoSVG, 
  SecureShieldSVG, 
  OfflineNetworkSVG, 
  InstantPaymentSVG, 
  GlobalNetworkSVG,
  BiometricSecuritySVG,
  MoneyTransferSVG,
  PremiumCardSVG
} from "@/components/PremiumSVGs";

export default function Landing() {
  const [currentStep, setCurrentStep] = useState(0); // 0: splash, 1: welcome, 2: features, 3: auth
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91");

  useEffect(() => {
    // Premium splash screen timing
    const timer = setTimeout(() => {
      setCurrentStep(1);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  // Premium Splash Screen - Monzo/Revolut Style
  if (currentStep === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 flex items-center justify-center relative overflow-hidden">
        {/* Premium Background Effects - N26 Style */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full blur-2xl animate-pulse-slow"></div>
          <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-gradient-to-r from-indigo-500/25 to-purple-500/25 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
          
          {/* Revolut-style Grid Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
              backgroundSize: '60px 60px'
            }}></div>
          </div>
        </div>
        
        <div className="text-center text-white relative z-10 space-y-12">
          {/* Premium SVG Logo - GPay Style */}
          <div className="relative animate-scale-in">
            <OPPBLogoSVG className="w-48 h-48 mx-auto" animated={true} />
            <div className="absolute -inset-12 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full animate-ping opacity-60"></div>
            <div className="absolute -inset-6 bg-gradient-to-r from-purple-400/30 to-blue-400/30 rounded-full animate-ping opacity-40" style={{ animationDelay: '0.7s' }}></div>
          </div>
          
          {/* Premium Brand Identity - Monzo Style */}
          <div className="space-y-8 animate-slide-up-premium">
            <div className="space-y-4">
              <h1 className="text-7xl font-black tracking-tight bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                OPPB
              </h1>
              <div className="w-32 h-1.5 bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 mx-auto rounded-full animate-shimmer"></div>
            </div>
            <p className="text-2xl font-light text-white/85 tracking-wide max-w-md mx-auto leading-relaxed">
              Offline Peer-to-Peer Payment Bridge
            </p>
            <p className="text-lg text-white/70 font-medium">
              The future of payments, available everywhere
            </p>
          </div>
          
          {/* Premium Loading Animation - NovaPay Style */}
          <div className="mt-20 space-y-6">
            <div className="relative">
              <div className="w-80 h-3 bg-white/10 rounded-full mx-auto overflow-hidden backdrop-blur-sm">
                <div className="h-full bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 rounded-full animate-slide-right shadow-lg"></div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full animate-shimmer"></div>
            </div>
            <div className="space-y-2">
              <p className="text-white/80 text-xl font-semibold">Initializing secure environment</p>
              <p className="text-white/60 text-base">Setting up your premium payment experience</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Premium Welcome Screen with Interactive Elements
  if (currentStep === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8 animate-slide-up-premium">
          {/* Premium Hero Section */}
          <div className="text-center space-y-6">
            <div className="relative">
              <div className="relative bg-white rounded-3xl shadow-premium animate-float p-4">
                <PremiumCardSVG className="w-32 h-20 mx-auto" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-pulse-glow">
                <Check className="w-5 h-5 text-white" />
              </div>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-4xl font-black bg-gradient-primary bg-clip-text text-transparent">
                Welcome to OPPB
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                The future of payments is here. Pay anywhere, anytime - even when you're offline.
              </p>
            </div>

            {/* Premium Feature Highlights - Revolut Style */}
            <div className="grid grid-cols-3 gap-3 mt-8">
              <div className="text-center p-4 bg-white rounded-2xl shadow-card hover:shadow-premium transition-all duration-300 transform hover:scale-105">
                <OfflineNetworkSVG className="w-12 h-12 mx-auto mb-3" />
                <p className="text-sm font-semibold text-gray-800">Offline Ready</p>
              </div>
              <div className="text-center p-4 bg-white rounded-2xl shadow-card hover:shadow-premium transition-all duration-300 transform hover:scale-105">
                <SecureShieldSVG className="w-12 h-12 mx-auto mb-3" />
                <p className="text-sm font-semibold text-gray-800">Ultra Secure</p>
              </div>
              <div className="text-center p-4 bg-white rounded-2xl shadow-card hover:shadow-premium transition-all duration-300 transform hover:scale-105">
                <InstantPaymentSVG className="w-12 h-12 mx-auto mb-3" />
                <p className="text-sm font-semibold text-gray-800">Instant Sync</p>
              </div>
            </div>
          </div>

          {/* Premium CTA Button */}
          <Button 
            onClick={nextStep}
            className="btn-primary-premium w-full h-16 text-xl font-bold bg-gradient-primary hover:shadow-premium group"
          >
            <span className="mr-3">Get Started</span>
            <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
          </Button>

          {/* Trust Indicators */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-sm text-gray-500">Trusted by 1M+ users worldwide</p>
          </div>
        </div>
      </div>
    );
  }

  // Premium Features Showcase with Interactive Cards
  if (currentStep === 2) {
    const features = [
      {
        component: OfflineNetworkSVG,
        title: "Offline Payments",
        description: "Make payments without internet using revolutionary Bluetooth mesh technology",
        gradient: "from-orange-500 to-red-500",
        delay: "0s"
      },
      {
        component: SecureShieldSVG,
        title: "Bank-Grade Security",
        description: "Military-grade encryption with biometric authentication and secure enclaves",
        gradient: "from-green-500 to-emerald-600",
        delay: "0.2s"
      },
      {
        component: InstantPaymentSVG,
        title: "Instant Settlement",
        description: "Real-time transaction processing with automatic reconciliation",
        gradient: "from-blue-500 to-indigo-600",
        delay: "0.4s"
      },
      {
        component: GlobalNetworkSVG,
        title: "Global Network",
        description: "Connect with verified merchants and users across the world",
        gradient: "from-purple-500 to-pink-600",
        delay: "0.6s"
      }
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 p-4">
        <div className="max-w-md mx-auto space-y-8">
          {/* Premium Header */}
          <div className="text-center space-y-6 pt-8 animate-slide-up-premium">
            <div className="w-20 h-20 mx-auto bg-white rounded-2xl flex items-center justify-center shadow-premium p-2">
              <MoneyTransferSVG className="w-16 h-16" />
            </div>
            <div>
              <h1 className="text-3xl font-black bg-gradient-primary bg-clip-text text-transparent mb-3">
                Revolutionary Features
              </h1>
              <p className="text-lg text-gray-600">
                Experience the next generation of digital payments
              </p>
            </div>
          </div>

          {/* Premium Feature Cards */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="border-0 shadow-premium overflow-hidden animate-slide-up-premium hover:shadow-card transition-all duration-500 transform hover:scale-102"
                style={{ animationDelay: feature.delay }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-card flex-shrink-0 p-2`}>
                      <feature.component className="w-12 h-12" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Premium Action Buttons */}
          <div className="space-y-4 pt-4">
            <Button 
              onClick={nextStep}
              className="btn-primary-premium w-full h-16 text-xl font-bold bg-gradient-primary hover:shadow-premium group"
            >
              <span className="mr-3">Continue Setup</span>
              <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setCurrentStep(1)}
              className="w-full h-12 text-lg font-semibold border-2 hover:bg-gray-50"
            >
              Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Premium Authentication Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Premium Header */}
        <div className="text-center space-y-6 animate-slide-up-premium">
          <div className="w-24 h-24 mx-auto bg-white rounded-3xl flex items-center justify-center shadow-premium p-3">
            <BiometricSecuritySVG className="w-18 h-18" />
          </div>
          <div>
            <h1 className="text-3xl font-black bg-gradient-primary bg-clip-text text-transparent mb-3">
              Secure Login
            </h1>
            <p className="text-lg text-gray-600">
              Join the future of digital payments
            </p>
          </div>
        </div>

        {/* Premium Login Card */}
        <Card className="border-0 shadow-premium overflow-hidden">
          <CardContent className="p-8 bg-gradient-card">
            <div className="space-y-6">
              {/* Premium Phone Input */}
              <div className="space-y-4">
                <label className="block text-lg font-semibold text-gray-900">
                  Phone Number
                </label>
                <div className="flex space-x-3">
                  <Select value={countryCode} onValueChange={setCountryCode}>
                    <SelectTrigger className="w-24 h-14 border-2 rounded-2xl text-lg font-semibold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="+91">🇮🇳 +91</SelectItem>
                      <SelectItem value="+1">🇺🇸 +1</SelectItem>
                      <SelectItem value="+44">🇬🇧 +44</SelectItem>
                      <SelectItem value="+86">🇨🇳 +86</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter your phone number"
                    className="flex-1 h-14 border-2 rounded-2xl text-lg px-4"
                  />
                </div>
              </div>

              {/* Premium Login Button */}
              <Button 
                onClick={handleLogin}
                className="btn-primary-premium w-full h-16 text-xl font-bold bg-gradient-primary hover:shadow-premium group"
              >
                <span className="mr-3">🔐</span>
                <span>Continue with Replit Auth</span>
              </Button>

              {/* Security Notice */}
              <div className="text-center space-y-3">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <span>🛡️</span>
                  <span>Protected by enterprise-grade security</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  By continuing, you agree to our Terms of Service and Privacy Policy. 
                  Your data is encrypted and never shared with third parties.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Premium Back Button */}
        <Button 
          variant="outline" 
          onClick={() => setCurrentStep(2)}
          className="w-full h-12 text-lg font-semibold border-2 hover:bg-gray-50"
        >
          Back to Features
        </Button>
      </div>
    </div>
  );
}