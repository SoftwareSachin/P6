import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { 
  OPPBLogoSVG, 
  SecureShieldSVG, 
  BiometricSecuritySVG
} from "@/components/PremiumSVGs";
import { 
  ApplePayBiometricSVG, 
  ApplePaySuccessSVG 
} from "@/components/ApplePaySVGs";

interface OnboardingProps {
  onComplete: () => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [currentScreen, setCurrentScreen] = useState(0);

  const nextScreen = () => {
    if (currentScreen < 3) {
      setCurrentScreen(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  // Apple Pay Welcome Screen
  if (currentScreen === 0) {
    return (
      <div className="min-h-screen bg-white relative overflow-hidden">
        <div className="flex flex-col h-screen">
          <div className="flex-1 flex items-center justify-center pt-20">
            <div className="text-center space-y-16">
              <div className="relative">
                <div className="w-32 h-32 mx-auto flex items-center justify-center animate-apple-logo-drop">
                  <OPPBLogoSVG className="w-28 h-28" />
                </div>
              </div>
              
              <div className="space-y-4 max-w-sm mx-auto px-8">
                <h1 className="text-[34px] font-bold text-black leading-tight tracking-tight" style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                  Set up OPPB
                </h1>
                <p className="text-[17px] text-black/50 leading-relaxed font-normal tracking-normal" style={{ fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                  Pay safely and securely with your phone.
                </p>
              </div>
            </div>
          </div>

          <div className="px-6 pb-12 space-y-4">
            <Button 
              onClick={nextScreen}
              className="w-full h-11 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-[17px] rounded-[11px] transition-all duration-200 shadow-sm active:scale-[0.98]"
              style={{ fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}
            >
              Continue
            </Button>
            
            <div className="text-center pt-2">
              <button className="text-blue-500 text-[15px] underline font-normal" style={{ fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Apple Pay Security Screen  
  if (currentScreen === 1) {
    return (
      <div className="min-h-screen bg-white relative overflow-hidden">
        <div className="flex flex-col h-screen">
          <div className="flex-1 flex items-center justify-center pt-16">
            <div className="text-center space-y-12 max-w-sm mx-auto px-8">
              <div className="w-24 h-24 mx-auto">
                <SecureShieldSVG className="w-full h-full text-blue-500" />
              </div>
              
              <div className="space-y-4">
                <h1 className="text-[28px] font-bold text-black leading-tight tracking-tight" style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                  Private and secure
                </h1>
                <p className="text-[17px] text-black/60 leading-relaxed font-normal" style={{ fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                  OPPB doesn't store your payment information on your device or share it with merchants.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-2 pb-8">
            <div className="w-2 h-2 bg-black/20 rounded-full"></div>
            <div className="w-6 h-2 bg-blue-500 rounded-full"></div>
            <div className="w-2 h-2 bg-black/20 rounded-full"></div>
            <div className="w-2 h-2 bg-black/20 rounded-full"></div>
          </div>

          <div className="px-6 pb-12">
            <Button 
              onClick={nextScreen}
              className="w-full h-11 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-[17px] rounded-[11px] transition-all duration-200 shadow-sm active:scale-[0.98]"
              style={{ fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Apple Pay Face ID Screen
  if (currentScreen === 2) {
    return (
      <div className="min-h-screen bg-white relative overflow-hidden">
        <div className="flex flex-col h-screen">
          <div className="flex-1 flex items-center justify-center pt-16">
            <div className="text-center space-y-12 max-w-sm mx-auto px-8">
              <div className="w-24 h-24 mx-auto">
                <BiometricSecuritySVG className="w-full h-full text-blue-500" />
              </div>
              
              <div className="space-y-4">
                <h1 className="text-[28px] font-bold text-black leading-tight tracking-tight" style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                  Use Face ID
                </h1>
                <p className="text-[17px] text-black/60 leading-relaxed font-normal" style={{ fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                  Use Face ID to authorize payments and access your account securely.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-2 pb-8">
            <div className="w-2 h-2 bg-black/20 rounded-full"></div>
            <div className="w-2 h-2 bg-black/20 rounded-full"></div>
            <div className="w-6 h-2 bg-blue-500 rounded-full"></div>
            <div className="w-2 h-2 bg-black/20 rounded-full"></div>
          </div>

          <div className="px-6 pb-12 space-y-3">
            <Button 
              onClick={nextScreen}
              className="w-full h-11 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-[17px] rounded-[11px] transition-all duration-200 shadow-sm active:scale-[0.98]"
              style={{ fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}
            >
              Use Face ID
            </Button>
            <div className="text-center">
              <button className="text-blue-500 text-[17px] font-normal" style={{ fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                Set Up Later in Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Apple Pay Complete Screen
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div className="flex flex-col h-screen">
        <div className="flex-1 flex items-center justify-center pt-16">
          <div className="text-center space-y-12 max-w-sm mx-auto px-8">
            <div className="w-24 h-24 mx-auto">
              <div className="w-full h-full bg-green-500 rounded-full flex items-center justify-center">
                <div className="w-12 h-12 text-white">✓</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-[28px] font-bold text-black leading-tight tracking-tight" style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                You're all set!
              </h1>
              <p className="text-[17px] text-black/60 leading-relaxed font-normal" style={{ fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                OPPB is ready to use. Start making secure payments with confidence.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-2 pb-8">
          <div className="w-2 h-2 bg-black/20 rounded-full"></div>
          <div className="w-2 h-2 bg-black/20 rounded-full"></div>
          <div className="w-2 h-2 bg-black/20 rounded-full"></div>
          <div className="w-6 h-2 bg-blue-500 rounded-full"></div>
        </div>

        <div className="px-6 pb-12">
          <Button 
            onClick={onComplete}
            className="w-full h-11 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-[17px] rounded-[11px] transition-all duration-200 shadow-sm active:scale-[0.98]"
            style={{ fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
}