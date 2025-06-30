import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, MapPin, MessageSquare, Users, Check, ArrowRight, Lock, Eye } from "lucide-react";
import { COLORS } from "@/lib/constants";
import { 
  OPPBLogoSVG, 
  SecureShieldSVG, 
  OfflineNetworkSVG, 
  InstantPaymentSVG, 
  GlobalNetworkSVG,
  BiometricSecuritySVG,
  MoneyTransferSVG,
  PremiumCardSVG,
  CameraPermissionSVG,
  LocationPermissionSVG,
  SMSPermissionSVG,
  ContactsPermissionSVG
} from "@/components/PremiumSVGs";

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

  const nextScreen = () => {
    if (currentScreen < 3) {
      setCurrentScreen(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const requestPermission = (permission: keyof typeof permissions) => {
    setPermissions(prev => ({ ...prev, [permission]: true }));
  };

  // Premium Welcome Screen with Sophisticated Animations
  if (currentScreen === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        {/* Premium Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-blue-500/20 rounded-full blur-2xl animate-pulse-slow"></div>
          <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-indigo-500/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
          
          {/* Premium Floating SVG Elements */}
          <div className="absolute top-20 left-16 animate-float" style={{ animationDelay: '0s' }}>
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm p-2">
              <PremiumCardSVG className="w-12 h-8" />
            </div>
          </div>
          <div className="absolute top-1/3 right-12 animate-float" style={{ animationDelay: '0.5s' }}>
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm p-1">
              <MoneyTransferSVG className="w-10 h-10" />
            </div>
          </div>
          <div className="absolute bottom-1/3 left-8 animate-float" style={{ animationDelay: '1s' }}>
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm p-2">
              <SecureShieldSVG className="w-10 h-10" />
            </div>
          </div>
          <div className="absolute bottom-20 right-20 animate-float" style={{ animationDelay: '1.5s' }}>
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm p-1">
              <InstantPaymentSVG className="w-8 h-8" />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center min-h-screen p-8 relative z-10">
          <div className="text-center text-white max-w-md space-y-8 animate-slide-up-premium">
            {/* Premium Brand Logo */}
            <div className="relative mb-12">
              <div className="w-40 h-40 mx-auto rounded-3xl flex items-center justify-center shadow-premium animate-scale-in bg-white p-4">
                <OPPBLogoSVG className="w-32 h-32" animated={true} />
              </div>
              <div className="absolute -inset-8 bg-white/10 rounded-full animate-ping opacity-75"></div>
            </div>
            
            {/* Premium Welcome Content */}
            <div className="space-y-6">
              <h1 className="text-5xl font-black text-white drop-shadow-2xl">
                Welcome to OPPB
              </h1>
              <p className="text-xl text-white drop-shadow-lg leading-relaxed font-medium">
                Experience the future of digital payments with revolutionary offline technology
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto rounded-full animate-shimmer"></div>
            </div>

            {/* Premium Feature Highlights */}
            <div className="grid grid-cols-2 gap-4 mt-12">
              <div className="bg-white/20 backdrop-blur-lg p-4 rounded-2xl animate-scale-in border border-white/30" style={{ animationDelay: '0.2s' }}>
                <OfflineNetworkSVG className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm font-bold text-white drop-shadow-md">Offline Ready</p>
              </div>
              <div className="bg-white/20 backdrop-blur-lg p-4 rounded-2xl animate-scale-in border border-white/30" style={{ animationDelay: '0.4s' }}>
                <SecureShieldSVG className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm font-bold text-white drop-shadow-md">Bank Security</p>
              </div>
            </div>

            {/* Premium CTA */}
            <Button 
              onClick={nextScreen}
              className="w-full h-16 text-xl font-bold bg-white/90 hover:bg-white text-gray-900 border-0 backdrop-blur-sm mt-12 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span className="mr-3">Let's Get Started</span>
              <ArrowRight className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Premium Features Overview with Interactive Cards
  if (currentScreen === 1) {
    const features = [
      {
        component: OfflineNetworkSVG,
        title: "Offline Payments",
        description: "Make secure payments without internet using Bluetooth mesh technology",
        gradient: "from-orange-500 to-red-500",
        highlight: "Revolutionary Technology"
      },
      {
        component: SecureShieldSVG,
        title: "Military-Grade Security",
        description: "Advanced encryption with biometric authentication protects your money",
        gradient: "from-green-500 to-emerald-600",
        highlight: "Bank-Level Protection"
      },
      {
        component: InstantPaymentSVG,
        title: "Instant Transactions",
        description: "Lightning-fast payments with real-time settlement and confirmation",
        gradient: "from-blue-500 to-indigo-600",
        highlight: "Zero Waiting Time"
      },
      {
        component: GlobalNetworkSVG,
        title: "Global Network",
        description: "Connect with millions of verified merchants and users worldwide",
        gradient: "from-purple-500 to-pink-600",
        highlight: "Worldwide Acceptance"
      }
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 p-6">
        <div className="max-w-md mx-auto space-y-8">
          {/* Premium Header */}
          <div className="text-center space-y-6 pt-8 animate-slide-up-premium">
            <div className="w-24 h-24 mx-auto bg-white rounded-3xl flex items-center justify-center shadow-premium p-3">
              <MoneyTransferSVG className="w-18 h-18" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-gray-900 mb-3">
                Why Choose OPPB?
              </h1>
              <p className="text-lg text-gray-700 font-medium">
                Discover what makes us different
              </p>
            </div>
          </div>

          {/* Premium Feature Cards */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="border-0 shadow-premium overflow-hidden animate-slide-up-premium hover:shadow-card transition-all duration-500 transform hover:scale-102"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-5">
                    <div className={`w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-card flex-shrink-0 animate-pulse-glow p-2`}>
                      <feature.component className="w-12 h-12" />
                    </div>
                    <div className="flex-1">
                      <div className="mb-2">
                        <span className="text-xs font-bold text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                          {feature.highlight}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed font-medium">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Premium Progress Indicator */}
          <div className="flex justify-center space-x-3 mt-8">
            <div className="w-3 h-3 bg-purple-300 rounded-full"></div>
            <div className="w-8 h-3 bg-gradient-primary rounded-full"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          </div>

          {/* Premium Action Button */}
          <Button 
            onClick={nextScreen}
            className="w-full h-16 text-xl font-bold bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <span className="mr-3">Continue</span>
            <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    );
  }

  // Premium Permissions Screen with Material Design 3 & High-End Animations
  if (currentScreen === 2) {
    const permissionItems = [
      {
        key: 'camera' as keyof typeof permissions,
        icon: Camera,
        title: "Camera Access",
        description: "Scan QR codes for instant payments",
        required: true,
        gradient: "from-blue-500 to-indigo-600",
        svg: "camera"
      },
      {
        key: 'location' as keyof typeof permissions,
        icon: MapPin,
        title: "Location Services", 
        description: "Find nearby merchants for offline payments",
        required: true,
        gradient: "from-green-500 to-emerald-600",
        svg: "location"
      },
      {
        key: 'sms' as keyof typeof permissions,
        icon: MessageSquare,
        title: "SMS Access",
        description: "Auto-read OTP codes for secure verification",
        required: false,
        gradient: "from-orange-500 to-red-500",
        svg: "sms"
      },
      {
        key: 'contacts' as keyof typeof permissions,
        icon: Users,
        title: "Contacts Access",
        description: "Send money to friends and family easily",
        required: false,
        gradient: "from-purple-500 to-pink-600",
        svg: "contacts"
      }
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 relative overflow-hidden">
        {/* Premium Background Effects with Material Design 3 */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/3 right-1/3 w-56 h-56 bg-blue-500/20 rounded-full blur-2xl animate-pulse-slow"></div>
          <div className="absolute top-1/2 right-1/4 w-40 h-40 bg-indigo-500/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1.5s' }}></div>
        </div>

        <div className="relative z-10 p-6">
          <div className="max-w-md mx-auto space-y-8">
            {/* Material Design 3 Header with Premium Animations */}
            <div className="text-center space-y-6 pt-12 animate-slide-up-premium">
              <div className="relative">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 rounded-full flex items-center justify-center shadow-2xl animate-float">
                  <div className="w-28 h-28 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20">
                    <Lock className="w-14 h-14 text-white animate-pulse" />
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-400 rounded-full animate-ping"></div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-black text-white mb-4 drop-shadow-lg animate-slide-up-premium" style={{ animationDelay: '0.2s' }}>
                  Enable Permissions
                </h1>
                <p className="text-xl text-white/80 font-medium leading-relaxed drop-shadow animate-slide-up-premium" style={{ animationDelay: '0.4s' }}>
                  Grant secure access for the ultimate payment experience
                </p>
              </div>
            </div>

            {/* Material Design 3 Permission Cards with Premium Effects */}
            <div className="space-y-6 animate-slide-up-premium" style={{ animationDelay: '0.6s' }}>
              {permissionItems.map((item, index) => (
                <Card 
                  key={item.key} 
                  className={`border-0 bg-white/95 backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-purple-500/25 ${
                    permissions[item.key] ? 'ring-2 ring-green-400 shadow-green-400/30 bg-green-50/95' : 'hover:bg-white'
                  } animate-slide-up-premium`}
                  style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                >
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-6">
                      <div className={`relative w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl flex-shrink-0 group overflow-hidden`}>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm"></div>
                        {item.key === 'camera' && <CameraPermissionSVG className="w-16 h-16 z-10 group-hover:scale-110 transition-transform duration-300" animated={true} />}
                        {item.key === 'location' && <LocationPermissionSVG className="w-16 h-16 z-10 group-hover:scale-110 transition-transform duration-300" animated={true} />}
                        {item.key === 'sms' && <SMSPermissionSVG className="w-16 h-16 z-10 group-hover:scale-110 transition-transform duration-300" animated={true} />}
                        {item.key === 'contacts' && <ContactsPermissionSVG className="w-16 h-16 z-10 group-hover:scale-110 transition-transform duration-300" animated={true} />}
                        {permissions[item.key] && (
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center animate-bounce shadow-lg z-20">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">
                            {item.title}
                          </h3>
                          {item.required && (
                            <span className="text-xs font-bold text-red-600 bg-red-100 px-3 py-1 rounded-full animate-pulse">
                              Required
                            </span>
                          )}
                        </div>
                        <p className="text-gray-700 text-base leading-relaxed mb-4 font-medium">
                          {item.description}
                        </p>
                        <Button
                          onClick={() => requestPermission(item.key)}
                          disabled={permissions[item.key]}
                          className={`h-12 px-6 text-base font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                            permissions[item.key] 
                              ? 'bg-green-500 text-white cursor-default shadow-green-500/30' 
                              : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-purple-500/50'
                          }`}
                        >
                          {permissions[item.key] ? (
                            <>
                              <Check className="w-5 h-5 mr-3 animate-bounce" />
                              Permission Granted
                            </>
                          ) : (
                            <>
                              <Lock className="w-5 h-5 mr-3" />
                              Grant Access
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Material Design 3 Progress Indicator with Animations */}
            <div className="flex justify-center space-x-4 mt-12 animate-slide-up-premium" style={{ animationDelay: '1.2s' }}>
              <div className="w-4 h-4 bg-white/50 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
              <div className="w-4 h-4 bg-white/50 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-12 h-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full shadow-lg animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              <div className="w-4 h-4 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
            </div>

            {/* Material Design 3 Action Button with Premium Effects */}
            <div className="animate-slide-up-premium" style={{ animationDelay: '1.4s' }}>
              <Button 
                onClick={nextScreen}
                disabled={!permissions.camera || !permissions.location}
                className="w-full h-20 text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 text-white shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed rounded-3xl transform hover:scale-105"
              >
                <span className="mr-4 drop-shadow-lg">Continue to Security</span>
                <ArrowRight className="w-8 h-8 transition-transform group-hover:translate-x-2 drop-shadow-lg" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Premium Security Setup Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 p-6">
      <div className="max-w-md mx-auto space-y-8">
        {/* Premium Header */}
        <div className="text-center space-y-6 pt-8 animate-slide-up-premium">
          <div className="w-24 h-24 mx-auto bg-white rounded-3xl flex items-center justify-center shadow-premium p-3">
            <BiometricSecuritySVG className="w-18 h-18" />
          </div>
          <div>
            <h1 className="text-3xl font-black bg-gradient-primary bg-clip-text text-transparent mb-3">
              Secure Your Account
            </h1>
            <p className="text-lg text-gray-600">
              Add an extra layer of security to protect your payments
            </p>
          </div>
        </div>

        {/* Premium Security Options */}
        <div className="space-y-6">
          <Card className="border-0 shadow-premium overflow-hidden animate-slide-up-premium">
            <CardContent className="p-8 text-center bg-gradient-card">
              <div className="w-20 h-20 mx-auto bg-white rounded-3xl flex items-center justify-center shadow-card mb-6 p-3">
                <BiometricSecuritySVG className="w-14 h-14" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Biometric Authentication
              </h3>
              <p className="text-gray-600 leading-relaxed mb-8">
                Use your fingerprint or face ID to secure your transactions and account access
              </p>
              <Button className="btn-primary-premium w-full h-14 text-lg font-bold bg-gradient-primary hover:shadow-premium mb-4">
                <span className="mr-3">🔐</span>
                Enable Biometrics
              </Button>
              <Button variant="outline" className="w-full h-12 text-base font-semibold border-2 hover:bg-gray-50">
                Set Up PIN Instead
              </Button>
            </CardContent>
          </Card>

          {/* Premium Security Features */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="border-0 shadow-card">
              <CardContent className="p-6 text-center">
                <SecureShieldSVG className="w-8 h-8 mx-auto mb-3" />
                <p className="text-sm font-semibold text-gray-800">256-bit Encryption</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-card">
              <CardContent className="p-6 text-center">
                <Eye className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <p className="text-sm font-semibold text-gray-800">Privacy First</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Premium Progress Indicator */}
        <div className="flex justify-center space-x-3 mt-8">
          <div className="w-3 h-3 bg-purple-300 rounded-full"></div>
          <div className="w-3 h-3 bg-purple-300 rounded-full"></div>
          <div className="w-3 h-3 bg-purple-300 rounded-full"></div>
          <div className="w-8 h-3 bg-gradient-primary rounded-full"></div>
        </div>

        {/* Premium Completion Button */}
        <Button 
          onClick={onComplete}
          className="btn-primary-premium w-full h-16 text-xl font-bold bg-gradient-primary hover:shadow-premium group"
        >
          <span className="mr-3">Complete Setup</span>
          <Check className="w-6 h-6" />
        </Button>

        {/* Skip Option */}
        <Button 
          variant="ghost" 
          onClick={onComplete}
          className="w-full h-12 text-base font-medium text-gray-500 hover:text-gray-700"
        >
          Skip for now
        </Button>
      </div>
    </div>
  );
}