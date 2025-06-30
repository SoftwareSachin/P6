import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { 
  AppleLogoSVG,
  FaceIDIconSVG,
  ShieldSecuritySVG,
  CheckmarkSuccessSVG,
  PrivacyLockSVG
} from "@/components/ApplePayAuthenticSVGs";

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

  // Apple Pay Welcome Screen - 1000% Authentic
  if (currentScreen === 0) {
    return (
      <div className="min-h-screen bg-white relative overflow-hidden apple-pay-background">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0px, #000 1px, transparent 1px, transparent 20px)' }}></div>
        </div>
        
        <div className="flex flex-col h-screen" style={{ paddingTop: '44px', paddingLeft: '16px', paddingRight: '16px', paddingBottom: '34px' }}>
          {/* Apple Logo - Exact positioning */}
          <div className="flex justify-center" style={{ marginTop: '88px' }}>
            <div className="apple-logo-container">
              <AppleLogoSVG className="w-11 h-11 animate-apple-logo-spring" />
            </div>
          </div>

          {/* Headline & Subtext - Exact spacing */}
          <div className="text-center" style={{ marginTop: '16px' }}>
            <h1 
              className="text-black font-bold"
              style={{ 
                fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                fontSize: '34px',
                lineHeight: '41px',
                letterSpacing: '-0.5px',
                marginBottom: '8px'
              }}
            >
              Set up OPPB
            </h1>
            <p 
              className="text-black/60 font-normal text-center"
              style={{ 
                fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                fontSize: '17px',
                lineHeight: '22px',
                maxWidth: '300px',
                margin: '0 auto'
              }}
            >
              Pay safely and securely with your iPhone.
            </p>
          </div>

          {/* Spacer */}
          <div className="flex-1"></div>

          {/* Primary CTA - Exact Apple Pay specifications */}
          <div className="space-y-3">
            <div className="relative">
              <Button 
                onClick={nextScreen}
                className="apple-pay-button w-full shadow-apple-pay active:opacity-85 transition-opacity duration-200"
                style={{ 
                  height: '44px',
                  borderRadius: '11px',
                  backgroundColor: 'hsl(215, 100%, 60%)',
                  fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                  fontSize: '17px',
                  fontWeight: '600',
                  color: '#FFFFFF',
                  border: 'none',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                }}
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4 ml-2 swipe-indicator" />
                </span>
              </Button>
            </div>
            
            {/* Secondary Action - Learn More */}
            <div className="text-center apple-learn-more-fade" style={{ marginTop: '12px' }}>
              <button 
                className="text-blue-600 font-semibold underline apple-learn-more-link"
                style={{ 
                  fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                  fontSize: '17px',
                  textDecorationThickness: '1px',
                  textUnderlineOffset: '2px',
                  minHeight: '44px',
                  minWidth: '44px',
                  padding: '12px'
                }}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Apple Pay Security Screen - Private and Secure
  if (currentScreen === 1) {
    return (
      <div className="min-h-screen bg-white relative overflow-hidden">
        <div className="flex flex-col h-screen" style={{ paddingTop: '44px', paddingLeft: '16px', paddingRight: '16px', paddingBottom: '34px' }}>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              {/* Privacy Icon */}
              <div className="flex justify-center mb-12">
                <PrivacyLockSVG className="w-16 h-16" />
              </div>
              
              {/* Content */}
              <div className="space-y-4 max-w-sm mx-auto">
                <h1 
                  className="text-black font-bold"
                  style={{ 
                    fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                    fontSize: '28px',
                    lineHeight: '34px',
                    letterSpacing: '-0.3px'
                  }}
                >
                  Private and secure
                </h1>
                <p 
                  className="text-black/60 font-normal"
                  style={{ 
                    fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                    fontSize: '17px',
                    lineHeight: '22px'
                  }}
                >
                  OPPB doesn't store your payment information on your device or share it with merchants.
                </p>
              </div>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center space-x-2 mb-8">
            <div className="w-2 h-2 bg-black/20 rounded-full"></div>
            <div className="w-6 h-2 bg-blue-600 rounded-full" style={{ backgroundColor: 'hsl(215, 100%, 60%)' }}></div>
            <div className="w-2 h-2 bg-black/20 rounded-full"></div>
            <div className="w-2 h-2 bg-black/20 rounded-full"></div>
          </div>

          {/* Continue Button */}
          <Button 
            onClick={nextScreen}
            className="apple-pay-button w-full active:opacity-85 transition-opacity duration-200"
            style={{ 
              height: '44px',
              borderRadius: '11px',
              backgroundColor: 'hsl(215, 100%, 60%)',
              fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
              fontSize: '17px',
              fontWeight: '600',
              color: '#FFFFFF',
              border: 'none',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
            }}
          >
            Continue
          </Button>
        </div>
      </div>
    );
  }

  // Apple Pay Face ID Screen - Biometric Prompt Flow
  if (currentScreen === 2) {
    return (
      <div className="min-h-screen bg-white relative overflow-hidden">
        <div className="flex flex-col h-screen" style={{ paddingTop: '44px', paddingLeft: '16px', paddingRight: '16px', paddingBottom: '34px' }}>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              {/* Face ID Icon */}
              <div className="flex justify-center mb-12">
                <FaceIDIconSVG className="w-16 h-16" />
              </div>
              
              {/* Content */}
              <div className="space-y-4 max-w-sm mx-auto">
                <h1 
                  className="text-black font-bold"
                  style={{ 
                    fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                    fontSize: '28px',
                    lineHeight: '34px',
                    letterSpacing: '-0.3px'
                  }}
                >
                  Use Face ID
                </h1>
                <p 
                  className="text-black/60 font-normal"
                  style={{ 
                    fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                    fontSize: '17px',
                    lineHeight: '22px'
                  }}
                >
                  Use Face ID to approve payments and access your account securely.
                </p>
              </div>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center space-x-2 mb-8">
            <div className="w-2 h-2 bg-black/20 rounded-full"></div>
            <div className="w-2 h-2 bg-black/20 rounded-full"></div>
            <div className="w-6 h-2 bg-blue-600 rounded-full" style={{ backgroundColor: 'hsl(215, 100%, 60%)' }}></div>
            <div className="w-2 h-2 bg-black/20 rounded-full"></div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              onClick={nextScreen}
              className="apple-pay-button w-full active:opacity-85 transition-opacity duration-200"
              style={{ 
                height: '44px',
                borderRadius: '11px',
                backgroundColor: 'hsl(215, 100%, 60%)',
                fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                fontSize: '17px',
                fontWeight: '600',
                color: '#FFFFFF',
                border: 'none',
                boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
              }}
            >
              Use Face ID
            </Button>
            <div className="text-center">
              <button 
                className="text-blue-600 font-normal"
                style={{ 
                  fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                  fontSize: '17px',
                  minHeight: '44px',
                  minWidth: '44px',
                  padding: '12px'
                }}
              >
                Set Up Later in Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Apple Pay Complete Screen - Setup Complete
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div className="flex flex-col h-screen" style={{ paddingTop: '44px', paddingLeft: '16px', paddingRight: '16px', paddingBottom: '34px' }}>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            {/* Success Icon */}
            <div className="flex justify-center mb-12">
              <CheckmarkSuccessSVG className="w-16 h-16 animate-apple-success" />
            </div>
            
            {/* Content */}
            <div className="space-y-4 max-w-sm mx-auto">
              <h1 
                className="text-black font-bold"
                style={{ 
                  fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                  fontSize: '28px',
                  lineHeight: '34px',
                  letterSpacing: '-0.3px'
                }}
              >
                You're all set!
              </h1>
              <p 
                className="text-black/60 font-normal"
                style={{ 
                  fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                  fontSize: '17px',
                  lineHeight: '22px'
                }}
              >
                OPPB is ready to use. Start making secure payments with confidence.
              </p>
            </div>
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center space-x-2 mb-8">
          <div className="w-2 h-2 bg-black/20 rounded-full"></div>
          <div className="w-2 h-2 bg-black/20 rounded-full"></div>
          <div className="w-2 h-2 bg-black/20 rounded-full"></div>
          <div className="w-6 h-2 bg-blue-600 rounded-full" style={{ backgroundColor: 'hsl(215, 100%, 60%)' }}></div>
        </div>

        {/* Get Started Button */}
        <Button 
          onClick={onComplete}
          className="apple-pay-button w-full active:opacity-85 transition-opacity duration-200"
          style={{ 
            height: '44px',
            borderRadius: '11px',
            backgroundColor: 'hsl(215, 100%, 60%)',
            fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
            fontSize: '17px',
            fontWeight: '600',
            color: '#FFFFFF',
            border: 'none',
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
          }}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}