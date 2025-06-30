import React, { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
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

// SwipeToSend Component with full swipe mechanics
interface SwipeToSendProps {
  onComplete: () => void;
  text: string;
  variant?: 'primary' | 'secondary' | 'success';
  size?: 'small' | 'medium' | 'large';
}

function SwipeToSend({ onComplete, text, variant = 'primary', size = 'medium' }: SwipeToSendProps) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const sliderRef = useRef<HTMLButtonElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const sizes = {
    small: { height: 44, sliderSize: 36, padding: 4 },
    medium: { height: 52, sliderSize: 44, padding: 4 },
    large: { height: 56, sliderSize: 48, padding: 4 }
  };

  const variants = {
    primary: { bg: 'hsl(215, 100%, 60%)', completeBg: '#34C759' },
    secondary: { bg: 'rgba(0,122,255,0.1)', completeBg: '#34C759' },
    success: { bg: '#34C759', completeBg: '#30D158' }
  };

  const currentSize = sizes[size];
  const currentVariant = variants[variant];

  const handleStart = useCallback((clientX: number) => {
    if (isCompleted) return;
    setIsDragging(true);
  }, [isCompleted]);

  const handleMove = useCallback((clientX: number) => {
    if (!isDragging || !trackRef.current || isCompleted) return;

    const trackRect = trackRef.current.getBoundingClientRect();
    const maxDistance = trackRect.width - currentSize.sliderSize - (currentSize.padding * 2);
    const currentX = clientX - trackRect.left - currentSize.sliderSize / 2;
    const newProgress = Math.max(0, Math.min(1, currentX / maxDistance));
    
    setProgress(newProgress);

    // Complete when swiped 90% across
    if (newProgress >= 0.9) {
      setIsCompleted(true);
      setIsDragging(false);
      setProgress(1);
      setTimeout(() => {
        onComplete();
      }, 500);
    }
  }, [isDragging, currentSize, isCompleted, onComplete]);

  const handleEnd = useCallback(() => {
    if (!isCompleted && progress < 0.9) {
      setProgress(0);
    }
    setIsDragging(false);
  }, [isCompleted, progress]);

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    handleMove(e.clientX);
  }, [handleMove]);

  const handleMouseUp = useCallback(() => {
    handleEnd();
  }, [handleEnd]);

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = useCallback((e: TouchEvent) => {
    e.preventDefault();
    handleMove(e.touches[0].clientX);
  }, [handleMove]);

  // Event listeners
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleEnd);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleEnd);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleEnd]);

  const sliderLeft = currentSize.padding + (progress * (100 - currentSize.sliderSize - currentSize.padding * 2)) / 100 * 100;

  return (
    <div className="relative w-full">
      <div 
        ref={trackRef}
        style={{
          height: `${currentSize.height}px`,
          borderRadius: `${currentSize.height / 2}px`,
          backgroundColor: isCompleted ? currentVariant.completeBg : currentVariant.bg,
          position: 'relative',
          overflow: 'hidden',
          transition: 'background-color 0.5s ease',
          boxShadow: isCompleted 
            ? `0 4px 12px ${currentVariant.completeBg}40`
            : '0 3px 10px rgba(0,122,255,0.25)',
          cursor: isCompleted ? 'default' : 'grab'
        }}
      >
        {/* Background Progress Fill */}
        <div 
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: `${progress * 100}%`,
            backgroundColor: 'rgba(255,255,255,0.1)',
            transition: isDragging ? 'none' : 'width 0.3s ease',
            borderRadius: `${currentSize.height / 2}px`
          }}
        />
        
        {/* Background Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span 
            style={{ 
              fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
              fontSize: size === 'small' ? '15px' : size === 'large' ? '17px' : '16px',
              fontWeight: '600',
              color: 'rgba(255,255,255,0.8)',
              letterSpacing: '0.4px',
              opacity: progress > 0.7 ? 0 : 1,
              transition: 'opacity 0.2s ease'
            }}
          >
            {isCompleted ? '✓ Complete!' : text}
          </span>
        </div>
        
        {/* Sliding Button */}
        <button
          ref={sliderRef}
          style={{
            position: 'absolute',
            left: `${sliderLeft}%`,
            top: `${currentSize.padding}px`,
            width: `${currentSize.sliderSize}px`,
            height: `${currentSize.sliderSize}px`,
            borderRadius: `${currentSize.sliderSize / 2}px`,
            backgroundColor: '#FFFFFF',
            border: 'none',
            cursor: isCompleted ? 'default' : (isDragging ? 'grabbing' : 'grab'),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            transition: isDragging ? 'none' : 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            zIndex: 10,
            transform: `scale(${isDragging ? 0.95 : 1})`,
            willChange: 'transform, left'
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          disabled={isCompleted}
        >
          {isCompleted ? (
            <Check className="w-5 h-5 text-green-500" />
          ) : (
            <ArrowRight 
              className="w-5 h-5 text-blue-600" 
              style={{ 
                transform: `translateX(${progress * 4}px)`,
                transition: 'transform 0.1s ease'
              }} 
            />
          )}
        </button>
      </div>
    </div>
  );
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
          <div className="space-y-4">
            <SwipeToSend
              onComplete={nextScreen}
              text="Swipe to Continue"
              variant="primary"
              size="large"
            />
            
            {/* Learn More Link */}
            <div className="text-center" style={{ marginTop: '16px' }}>
              <button 
                className="text-blue-600 font-normal"
                style={{ 
                  fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                  fontSize: '17px',
                  minHeight: '44px',
                  minWidth: '44px',
                  padding: '12px',
                  transition: 'opacity 0.2s ease'
                }}
                onClick={() => alert('Learn more about OPPB features')}
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

          <SwipeToSend
            onComplete={nextScreen}
            text="Swipe to Continue"
            variant="primary"
            size="medium"
          />
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
            <SwipeToSend
              onComplete={nextScreen}
              text="Swipe to Use Face ID"
              variant="primary"
              size="medium"
            />
            
            <div className="text-center">
              <button 
                className="text-blue-600 font-normal"
                style={{ 
                  fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                  fontSize: '17px',
                  minHeight: '44px',
                  minWidth: '44px',
                  padding: '12px',
                  transition: 'opacity 0.2s ease'
                }}
                onClick={() => alert('You can set up Face ID later in Settings')}
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

        <SwipeToSend
          onComplete={onComplete}
          text="Swipe to Get Started"
          variant="success"
          size="large"
        />
      </div>
    </div>
  );
}