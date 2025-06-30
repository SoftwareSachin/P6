import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wallet, Shield, Smartphone } from "lucide-react";

export default function Landing() {
  const [currentStep, setCurrentStep] = useState(0); // 0: splash, 1: welcome, 2: features, 3: auth
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91");

  useEffect(() => {
    // Authentic splash screen timing like PhonePe/GPay
    const timer = setTimeout(() => {
      setCurrentStep(1);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  // Splash Screen - Authentic PhonePe/GPay style
  if (currentStep === 0) {
    return (
      <div className="min-h-screen phonepe-gradient flex items-center justify-center relative overflow-hidden">
        {/* Background animations */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-white/5 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-5 w-16 h-16 bg-white/5 rounded-full animate-pulse delay-500"></div>
        </div>
        
        <div className="text-center text-white relative z-10">
          {/* Enhanced animated logo */}
          <div className="relative mb-8">
            <div className="w-32 h-32 mx-auto bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm shadow-2xl animate-bounce">
              <Wallet className="w-16 h-16 text-white animate-pulse" />
            </div>
            <div className="absolute -inset-4 bg-white/10 rounded-full animate-ping"></div>
          </div>
          
          {/* Brand name with animation */}
          <h1 className="text-5xl font-black mb-4 tracking-wider animate-fade-in">OPPB</h1>
          <p className="text-white/90 text-xl font-medium mb-8 animate-slide-up">Pay Anywhere, Anytime</p>
          
          {/* Loading indicator */}
          <div className="w-16 h-1 bg-white/30 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-white rounded-full animate-slide-right"></div>
          </div>
          
          <p className="text-white/70 text-sm mt-6">India's Most Trusted Payment App</p>
        </div>
      </div>
    );
  }

  // Welcome Screen
  if (currentStep === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex flex-col">
        <div className="flex-1 flex flex-col justify-center px-8 py-12">
          {/* Welcome illustration */}
          <div className="text-center mb-12">
            <div className="relative mb-8">
              <div className="w-40 h-40 mx-auto bg-gradient-to-br from-purple-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl">
                <Smartphone className="w-20 h-20 text-white" />
              </div>
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                <span className="text-2xl">💰</span>
              </div>
            </div>
            
            <h1 className="text-4xl font-black text-gray-900 mb-4">Welcome to OPPB</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              India's most trusted payment app,<br />
              <span className="text-purple-600 font-semibold">now works offline too!</span>
            </p>
          </div>
          
          <Button 
            onClick={nextStep}
            className="w-full phonepe-gradient text-white py-6 rounded-2xl font-bold text-xl hover:opacity-90 transition-all duration-300 btn-press-effect shadow-xl"
          >
            Get Started
          </Button>
        </div>
      </div>
    );
  }

  // Features Showcase
  if (currentStep === 2) {
    const features = [
      {
        icon: "🔍",
        title: "Pay with QR",
        description: "Scan any QR code to pay instantly",
        bgColor: "from-purple-500 to-purple-600"
      },
      {
        icon: "💸",
        title: "Send Money",
        description: "Transfer money to anyone instantly",
        bgColor: "from-blue-500 to-blue-600"
      },
      {
        icon: "📱",
        title: "Pay Bills",
        description: "Recharge mobile, pay utilities",
        bgColor: "from-green-500 to-green-600"
      },
      {
        icon: "📶",
        title: "Offline Payments",
        description: "Pay even without internet",
        bgColor: "from-orange-500 to-orange-600"
      }
    ];

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
        <div className="flex-1 flex flex-col justify-center px-8 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-4">Everything you need</h2>
            <p className="text-lg text-gray-600">All your payment needs in one app</p>
          </div>
          
          <div className="grid grid-cols-2 gap-6 mb-12">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className={`w-20 h-20 mx-auto bg-gradient-to-br ${feature.bgColor} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                  <span className="text-3xl">{feature.icon}</span>
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
          
          <Button 
            onClick={nextStep}
            className="w-full phonepe-gradient text-white py-6 rounded-2xl font-bold text-xl hover:opacity-90 transition-all duration-300 btn-press-effect shadow-xl"
          >
            Continue
          </Button>
        </div>
      </div>
    );
  }

  // Enhanced Authentication Screen
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      <div className="flex-1 flex flex-col justify-center px-8 py-12">
        <div className="text-center mb-12">
          <div className="w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-4">Secure Login</h2>
          <p className="text-lg text-gray-600">Access your digital wallet securely</p>
        </div>
        
        <Card className="shadow-2xl border-none mb-8">
          <CardContent className="p-8">
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-3 text-gray-900">Sign in to continue</h3>
                <p className="text-gray-600">
                  Secure access to your OPPB account
                </p>
              </div>
              
              <Button 
                onClick={handleLogin}
                className="w-full phonepe-gradient text-white py-6 rounded-2xl font-bold text-xl hover:opacity-90 transition-all duration-300 btn-press-effect shadow-xl"
              >
                <div className="flex items-center justify-center gap-3">
                  <Shield className="w-6 h-6" />
                  Continue Securely
                </div>
              </Button>
              
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span className="text-sm text-gray-500 font-medium">Powered by</span>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl">
                  <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-900">Offline Payments</p>
                    <p className="text-xs text-gray-600">No internet needed</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl">
                  <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-900">Bank Security</p>
                    <p className="text-xs text-gray-600">Military grade</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center">
          <p className="text-sm text-gray-500">
            By continuing, you agree to our{" "}
            <a href="#" className="text-purple-600 font-medium underline">Terms</a> and{" "}
            <a href="#" className="text-purple-600 font-medium underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}
