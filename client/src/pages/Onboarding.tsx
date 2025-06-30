import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, MapPin, MessageSquare, Users, Check } from "lucide-react";
import { COLORS } from "@/lib/constants";

interface OnboardingProps {
  onComplete: () => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [permissions, setPermissions] = useState({
    camera: false,
    location: false,
    sms: false,
    contacts: false
  });

  // Screen 1: Welcome
  if (currentScreen === 0) {
    return (
      <div 
        className="min-h-screen flex flex-col justify-center items-center p-8"
        style={{ 
          background: 'linear-gradient(135deg, #6739B7 0%, #8B5CF6 50%, #3B82F6 100%)'
        }}
      >
        {/* Floating Payment Icons - 3D Animated */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 text-4xl animate-bounce" style={{ animationDelay: '0s' }}>
            💳
          </div>
          <div className="absolute top-32 right-16 text-3xl animate-bounce" style={{ animationDelay: '0.5s' }}>
            📱
          </div>
          <div className="absolute top-1/3 left-1/4 text-5xl animate-bounce" style={{ animationDelay: '1s' }}>
            💰
          </div>
          <div className="absolute bottom-1/3 right-1/3 text-3xl animate-bounce" style={{ animationDelay: '1.5s' }}>
            ⚡
          </div>
          <div className="absolute bottom-20 left-20 text-4xl animate-bounce" style={{ animationDelay: '2s' }}>
            🔒
          </div>
        </div>

        <div className="text-center text-white relative z-10 max-w-sm">
          {/* Brand Logo */}
          <div className="w-32 h-32 mx-auto mb-8 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <span className="text-4xl font-bold text-white">OPPB</span>
          </div>

          {/* Header - Exact Specification */}
          <h1 className="text-3xl font-bold mb-4">
            Welcome to OPPB
          </h1>

          {/* Description - Exact Specification */}
          <p className="text-lg text-white/90 mb-8 leading-relaxed">
            India's most trusted payment app, now works offline too!
          </p>

          {/* CTA Button - Purple Gradient, Rounded Corners */}
          <Button
            onClick={() => setCurrentScreen(1)}
            className="w-full h-14 text-lg font-semibold rounded-xl"
            style={{ 
              background: 'linear-gradient(135deg, #8B5CF6 0%, #6739B7 100%)',
              border: 'none'
            }}
          >
            Get Started
          </Button>
        </div>
      </div>
    );
  }

  // Screen 2: Features Showcase - Carousel Design
  if (currentScreen === 1) {
    const features = [
      {
        id: 1,
        title: "Pay with QR",
        description: "Scan any QR code to pay instantly",
        icon: "📱",
        animation: "QR scanner animation"
      },
      {
        id: 2,
        title: "Send Money",
        description: "Transfer money to friends instantly",
        icon: "💸",
        animation: "Phone-to-phone animation"
      },
      {
        id: 3,
        title: "Pay Bills",
        description: "Recharge & pay bills easily",
        icon: "📄",
        animation: "Utility icons grid"
      },
      {
        id: 4,
        title: "Offline Payments",
        description: "Revolutionary offline payment technology",
        icon: "⚡",
        animation: "Mesh network visualization"
      }
    ];

    const [activeFeature, setActiveFeature] = useState(0);

    return (
      <div className="min-h-screen" style={{ backgroundColor: COLORS.background }}>
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2" style={{ color: COLORS.textPrimary }}>
              Powerful Features
            </h1>
            <p className="text-sm" style={{ color: COLORS.textSecondary }}>
              Everything you need for seamless payments
            </p>
          </div>

          {/* Carousel Design - Swipeable Cards */}
          <div className="mb-8">
            <div className="flex overflow-x-auto space-x-4 pb-4">
              {features.map((feature, index) => (
                <Card 
                  key={feature.id}
                  className={`min-w-[280px] border-0 shadow-lg transition-all duration-300 ${
                    index === activeFeature ? 'scale-105 shadow-xl' : ''
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 flex items-center justify-center">
                      <span className="text-3xl">{feature.icon}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: COLORS.textPrimary }}>
                      {feature.title}
                    </h3>
                    <p className="text-sm" style={{ color: COLORS.textSecondary }}>
                      {feature.description}
                    </p>
                    
                    {/* Feature Animation Placeholder */}
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <div className="animate-pulse">
                        <div className="h-2 bg-gray-200 rounded mb-2"></div>
                        <div className="h-2 bg-gray-200 rounded mb-2"></div>
                        <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Navigation Dots - GPay Style */}
          <div className="flex justify-center space-x-2 mb-8">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveFeature(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeFeature 
                    ? 'bg-purple-600 w-8' 
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Continue Button */}
          <Button
            onClick={() => setCurrentScreen(2)}
            className="w-full h-14 text-lg font-semibold"
            style={{ backgroundColor: COLORS.primary }}
          >
            Continue
          </Button>
        </div>
      </div>
    );
  }

  // Screen 3: Permissions - Exact Specification
  if (currentScreen === 2) {
    const permissionItems = [
      {
        id: 'camera',
        icon: Camera,
        title: 'Camera',
        description: 'Scan QR codes and capture receipts',
        color: COLORS.primary
      },
      {
        id: 'location',
        icon: MapPin,
        title: 'Location',
        description: 'Find nearby merchants and ATMs',
        color: COLORS.success
      },
      {
        id: 'sms',
        icon: MessageSquare,
        title: 'SMS',
        description: 'Auto-read OTP for seamless verification',
        color: COLORS.warning
      },
      {
        id: 'contacts',
        icon: Users,
        title: 'Contacts',
        description: 'Send money to friends easily',
        color: COLORS.secondary
      }
    ];

    const handlePermissionToggle = (permissionId: string) => {
      setPermissions(prev => ({
        ...prev,
        [permissionId]: !prev[permissionId as keyof typeof prev]
      }));
    };

    const handleComplete = () => {
      // Simulate permission requests
      const allGranted = Object.values(permissions).every(p => p);
      if (!allGranted) {
        alert("Please grant all permissions for the best experience");
        return;
      }
      onComplete();
    };

    return (
      <div className="min-h-screen" style={{ backgroundColor: COLORS.background }}>
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2" style={{ color: COLORS.textPrimary }}>
              Allow Permissions
            </h1>
            <p className="text-sm" style={{ color: COLORS.textSecondary }}>
              We need these permissions to provide you the best experience
            </p>
          </div>

          {/* Permission Cards - Material Design 3 Icons */}
          <div className="space-y-4 mb-8">
            {permissionItems.map((item) => (
              <Card key={item.id} className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <button
                    onClick={() => handlePermissionToggle(item.id)}
                    className="w-full flex items-center space-x-4"
                  >
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${item.color}15` }}
                    >
                      <item.icon className="h-6 w-6" style={{ color: item.color }} />
                    </div>
                    
                    <div className="flex-1 text-left">
                      <h3 className="font-semibold" style={{ color: COLORS.textPrimary }}>
                        {item.title}
                      </h3>
                      <p className="text-sm" style={{ color: COLORS.textSecondary }}>
                        {item.description}
                      </p>
                    </div>
                    
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      permissions[item.id as keyof typeof permissions]
                        ? 'bg-green-500 border-green-500'
                        : 'border-gray-300'
                    }`}>
                      {permissions[item.id as keyof typeof permissions] && (
                        <Check className="h-4 w-4 text-white" />
                      )}
                    </div>
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Allow Button - Full-width Primary */}
          <Button
            onClick={handleComplete}
            className="w-full h-14 text-lg font-semibold"
            style={{ backgroundColor: COLORS.primary }}
          >
            Allow All Permissions
          </Button>

          {/* Skip Option */}
          <div className="text-center mt-4">
            <Button
              variant="ghost"
              onClick={onComplete}
              className="text-gray-500"
            >
              Skip for now
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}