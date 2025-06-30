import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { 
  OPPBPremiumLogoSVG,
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
        {/* Premium Animated Background */}
        <div className="absolute inset-0 opacity-3">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-br from-purple-500/8 to-indigo-500/8 rounded-full blur-2xl animate-float-reverse"></div>
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-br from-indigo-500/6 to-blue-500/6 rounded-full blur-xl animate-pulse-slow"></div>
        </div>
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-2">
          <div 
            className="w-full h-full" 
            style={{ 
              backgroundImage: `
                linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
          ></div>
        </div>
        
        <div className="flex flex-col h-screen" style={{ paddingTop: '44px', paddingLeft: '16px', paddingRight: '16px', paddingBottom: '34px' }}>
          {/* OPPB Premium Logo - Exact positioning */}
          <div className="flex justify-center" style={{ marginTop: '88px' }}>
            <div className="apple-logo-container">
              <OPPBPremiumLogoSVG className="w-11 h-11 animate-apple-logo-spring" animated={true} />
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

          {/* Swipe to Send Button - Primary CTA */}
          <div className="space-y-3">
            <div className="relative swipe-to-send-container">
              <div 
                className="swipe-to-send-track"
                style={{ 
                  height: '56px',
                  borderRadius: '28px',
                  backgroundColor: 'hsl(215, 100%, 60%)',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(0,122,255,0.3)'
                }}
              >
                {/* Background Text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span 
                    className="swipe-background-text"
                    style={{ 
                      fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                      fontSize: '17px',
                      fontWeight: '600',
                      color: 'rgba(255,255,255,0.8)',
                      letterSpacing: '0.5px'
                    }}
                  >
                    Swipe to Continue
                  </span>
                </div>
                
                {/* Sliding Button */}
                <button
                  onClick={nextScreen}
                  className="swipe-slider"
                  style={{
                    position: 'absolute',
                    left: '4px',
                    top: '4px',
                    width: '48px',
                    height: '48px',
                    borderRadius: '24px',
                    backgroundColor: '#FFFFFF',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    zIndex: 10
                  }}
                >
                  <ArrowRight className="w-5 h-5 text-blue-600 swipe-arrow" />
                </button>
              </div>
            </div>
            
            {/* Swipe to Learn More - Secondary Action */}
            <div className="text-center apple-learn-more-fade" style={{ marginTop: '16px' }}>
              <div 
                className="swipe-to-learn-container"
                style={{ 
                  height: '44px',
                  borderRadius: '22px',
                  backgroundColor: 'rgba(0,122,255,0.1)',
                  position: 'relative',
                  overflow: 'hidden',
                  border: '1px solid rgba(0,122,255,0.2)'
                }}
              >
                {/* Learn More Background Text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span 
                    style={{ 
                      fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                      fontSize: '15px',
                      fontWeight: '500',
                      color: 'hsl(215, 100%, 60%)',
                      letterSpacing: '0.3px'
                    }}
                  >
                    Swipe to Learn More
                  </span>
                </div>
                
                {/* Learn More Sliding Button */}
                <button
                  className="swipe-learn-slider"
                  style={{
                    position: 'absolute',
                    left: '2px',
                    top: '2px',
                    width: '40px',
                    height: '40px',
                    borderRadius: '20px',
                    backgroundColor: 'hsl(215, 100%, 60%)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 1px 4px rgba(0,122,255,0.3)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    zIndex: 10
                  }}
                >
                  <div className="w-3 h-3 bg-white rounded-full swipe-learn-dot"></div>
                </button>
              </div>
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

          {/* Swipe to Continue Button */}
          <div className="relative swipe-to-send-container">
            <div 
              className="swipe-to-send-track"
              style={{ 
                height: '52px',
                borderRadius: '26px',
                backgroundColor: 'hsl(215, 100%, 60%)',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 3px 10px rgba(0,122,255,0.25)'
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span 
                  className="swipe-background-text"
                  style={{ 
                    fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: 'rgba(255,255,255,0.8)',
                    letterSpacing: '0.4px'
                  }}
                >
                  Swipe to Continue
                </span>
              </div>
              
              <button
                onClick={nextScreen}
                className="swipe-slider"
                style={{
                  position: 'absolute',
                  left: '3px',
                  top: '3px',
                  width: '46px',
                  height: '46px',
                  borderRadius: '23px',
                  backgroundColor: '#FFFFFF',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  zIndex: 10
                }}
              >
                <ArrowRight className="w-5 h-5 text-blue-600 swipe-arrow" />
              </button>
            </div>
          </div>
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

          {/* Swipe to Use Face ID */}
          <div className="space-y-4">
            <div className="relative swipe-to-send-container">
              <div 
                className="swipe-to-send-track"
                style={{ 
                  height: '52px',
                  borderRadius: '26px',
                  backgroundColor: 'hsl(215, 100%, 60%)',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 3px 10px rgba(0,122,255,0.25)'
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span 
                    className="swipe-background-text"
                    style={{ 
                      fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                      fontSize: '16px',
                      fontWeight: '600',
                      color: 'rgba(255,255,255,0.8)',
                      letterSpacing: '0.4px'
                    }}
                  >
                    Swipe to Use Face ID
                  </span>
                </div>
                
                <button
                  onClick={nextScreen}
                  className="swipe-slider"
                  style={{
                    position: 'absolute',
                    left: '3px',
                    top: '3px',
                    width: '46px',
                    height: '46px',
                    borderRadius: '23px',
                    backgroundColor: '#FFFFFF',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    zIndex: 10
                  }}
                >
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                </button>
              </div>
            </div>
            
            <div className="text-center">
              <button 
                className="text-blue-600 font-normal swipe-later-link"
                style={{ 
                  fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                  fontSize: '17px',
                  minHeight: '44px',
                  minWidth: '44px',
                  padding: '12px',
                  transition: 'opacity 0.2s ease'
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

        {/* Swipe to Get Started */}
        <div className="relative swipe-to-send-container">
          <div 
            className="swipe-to-send-track swipe-success-track"
            style={{ 
              height: '56px',
              borderRadius: '28px',
              backgroundColor: '#34C759',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(52,199,89,0.3)'
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span 
                className="swipe-background-text"
                style={{ 
                  fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                  fontSize: '17px',
                  fontWeight: '600',
                  color: 'rgba(255,255,255,0.9)',
                  letterSpacing: '0.5px'
                }}
              >
                Swipe to Get Started
              </span>
            </div>
            
            <button
              onClick={onComplete}
              className="swipe-slider swipe-success-slider"
              style={{
                position: 'absolute',
                left: '4px',
                top: '4px',
                width: '48px',
                height: '48px',
                borderRadius: '24px',
                backgroundColor: '#FFFFFF',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                zIndex: 10
              }}
            >
              <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}