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
import { OfflinePaymentFlowSVG } from "@/components/OfflinePaymentFlowSVG";
import { SecureConnectionSVG } from "@/components/SecureConnectionSVG";
import upiGif from "@assets/fetchpik.com-iconscout-upcaLHoyqi (1)_1751287545574.gif";
import secureGif from "@assets/secure_1751287927973.gif";

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
        {/* Animated Blue Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="welcomeGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#3B82F6" strokeWidth="0.5" opacity="0.4">
                  <animate attributeName="opacity" values="0.2;0.6;0.2" dur="4s" repeatCount="indefinite" />
                </path>
              </pattern>
              <pattern id="welcomeDots" width="80" height="80" patternUnits="userSpaceOnUse">
                <circle cx="40" cy="40" r="1" fill="#3B82F6" opacity="0.5">
                  <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="r" values="0.8;1.2;0.8" dur="3s" repeatCount="indefinite" />
                </circle>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#welcomeGrid)" />
            <rect width="100%" height="100%" fill="url(#welcomeDots)" />
          </svg>
          
          {/* Animated Grid Lines */}
          <div className="absolute inset-0">
            {[...Array(10)].map((_, i) => (
              <div
                key={`v-${i}`}
                className="absolute top-0 bottom-0 w-px bg-blue-400"
                style={{
                  left: `${(i + 1) * 10}%`,
                  opacity: 0.12,
                  animation: `gridPulse ${3 + i * 0.2}s ease-in-out infinite`
                }}
              />
            ))}
            {[...Array(8)].map((_, i) => (
              <div
                key={`h-${i}`}
                className="absolute left-0 right-0 h-px bg-blue-400"
                style={{
                  top: `${(i + 1) * 12.5}%`,
                  opacity: 0.12,
                  animation: `gridPulse ${2.5 + i * 0.3}s ease-in-out infinite`
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="flex flex-col h-screen relative z-10" style={{ paddingTop: '44px', paddingLeft: '16px', paddingRight: '16px', paddingBottom: '34px' }}>
          {/* Dynamic Offline Payment Flow SVG - Center positioning */}
          <div className="flex justify-center items-center" style={{ marginTop: '20px', height: '180px' }}>
            <div className="w-full max-w-sm">
              <OfflinePaymentFlowSVG className="w-full h-full" animated={true} />
            </div>
          </div>

          {/* Headline & Subtext - Exact spacing */}
          <div className="text-center" style={{ marginTop: '24px' }}>
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
              Offline Payments
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
              Pay merchants even without internet using Bluetooth technology.
            </p>
          </div>

          {/* Spacer */}
          <div className="flex-1"></div>

          {/* Clean GIF-only Visual - Centered */}
          <div className="flex justify-center items-center" style={{ marginBottom: '32px' }}>
            <div className="flex items-center justify-center space-x-8">
              {/* UPI GIF */}
              <div className="flex flex-col items-center">
                <img 
                  src={upiGif} 
                  alt="UPI Animation" 
                  className="w-20 h-20 object-contain"
                />
                <text className="text-xs font-semibold text-gray-600 mt-2">UPI</text>
              </div>

              {/* Secure Bridge GIF */}
              <div className="flex flex-col items-center">
                <img 
                  src={secureGif} 
                  alt="Secure Bridge Animation" 
                  className="w-16 h-16 object-contain"
                />
                <text className="text-xs font-semibold text-gray-600 mt-2">Secure Bridge</text>
              </div>

              {/* OPPB Text */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">OPPB</span>
                </div>
                <text className="text-xs font-semibold text-gray-600 mt-2">OPPB</text>
              </div>
            </div>
          </div>

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