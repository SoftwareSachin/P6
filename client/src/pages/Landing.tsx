import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wallet, Shield, Smartphone, Zap, Globe, ArrowRight, Star, Check, Bluetooth, WifiOff, CreditCard } from "lucide-react";

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

  // Premium Splash Screen with Sophisticated Animations
  if (currentStep === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center relative overflow-hidden">
        {/* Premium Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-blue-500/20 rounded-full blur-2xl animate-pulse-slow"></div>
          <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-indigo-500/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
          
          {/* Animated Grid */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:50px_50px] animate-pulse"></div>
          </div>
        </div>
        
        <div className="text-center text-white relative z-10">
          {/* Premium Animated Logo */}
          <div className="relative mb-12">
            <div className="w-40 h-40 mx-auto bg-gradient-primary rounded-3xl flex items-center justify-center backdrop-blur-sm shadow-premium animate-scale-in">
              <Wallet className="w-20 h-20 text-white animate-float" />
            </div>
            <div className="absolute -inset-8 bg-white/10 rounded-full animate-ping opacity-75"></div>
            <div className="absolute -inset-4 bg-white/20 rounded-full animate-ping opacity-50" style={{ animationDelay: '0.5s' }}></div>
          </div>
          
          {/* Premium Brand Identity */}
          <div className="space-y-6 animate-slide-up-premium">
            <h1 className="text-6xl font-black mb-2 tracking-wider bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              OPPB
            </h1>
            <p className="text-2xl font-light text-white/90 tracking-wide">
              Offline Peer-to-Peer Payment Bridge
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto rounded-full animate-shimmer"></div>
          </div>
          
          {/* Loading Animation */}
          <div className="mt-16 space-y-4">
            <div className="w-64 h-2 bg-white/20 rounded-full mx-auto overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-slide-right"></div>
            </div>
            <p className="text-white/70 text-lg font-medium">Initializing secure payment system...</p>
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
              <div className="w-32 h-32 mx-auto bg-gradient-primary rounded-3xl flex items-center justify-center shadow-premium animate-float">
                <Wallet className="w-16 h-16 text-white" />
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

            {/* Premium Feature Highlights */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center p-4 bg-white rounded-2xl shadow-card hover:shadow-premium transition-all duration-300 transform hover:scale-105">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Bluetooth className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-semibold text-gray-800">Offline Ready</p>
              </div>
              <div className="text-center p-4 bg-white rounded-2xl shadow-card hover:shadow-premium transition-all duration-300 transform hover:scale-105">
                <div className="w-12 h-12 bg-gradient-success rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-semibold text-gray-800">Ultra Secure</p>
              </div>
              <div className="text-center p-4 bg-white rounded-2xl shadow-card hover:shadow-premium transition-all duration-300 transform hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6 text-white" />
                </div>
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
        icon: WifiOff,
        title: "Offline Payments",
        description: "Make payments without internet using revolutionary Bluetooth mesh technology",
        gradient: "from-orange-500 to-red-500",
        delay: "0s"
      },
      {
        icon: Shield,
        title: "Bank-Grade Security",
        description: "Military-grade encryption with biometric authentication and secure enclaves",
        gradient: "from-green-500 to-emerald-600",
        delay: "0.2s"
      },
      {
        icon: Zap,
        title: "Instant Settlement",
        description: "Real-time transaction processing with automatic reconciliation",
        gradient: "from-blue-500 to-indigo-600",
        delay: "0.4s"
      },
      {
        icon: Globe,
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
            <div className="w-20 h-20 mx-auto bg-gradient-primary rounded-2xl flex items-center justify-center shadow-premium">
              <Smartphone className="w-10 h-10 text-white" />
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
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-card flex-shrink-0`}>
                      <feature.icon className="w-8 h-8 text-white" />
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
          <div className="w-24 h-24 mx-auto bg-gradient-primary rounded-3xl flex items-center justify-center shadow-premium">
            <CreditCard className="w-12 h-12 text-white" />
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
                <Shield className="w-6 h-6 mr-3" />
                <span>Continue with Replit Auth</span>
              </Button>

              {/* Security Notice */}
              <div className="text-center space-y-3">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <Shield className="w-4 h-4" />
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