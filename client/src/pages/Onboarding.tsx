import React, { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { SwipeToSend } from "@/components/SwipeToSend";
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
import oppbGif from "@assets/fetchpik.com-iconscout-HcDJX8k50y_1751288241453.gif";
import secureLockGif from "@assets/fetchpik.com-iconscout-k0urs7I4tM_1751299864960.gif";
import faceIdGif from "@assets/fetchpik.com-iconscout-OgCXD3bivW_1751300056814.gif";
import bankGif from "@assets/fetchpik.com-iconscout-XxqKi5wgpy_1751289691962.gif";

interface OnboardingProps {
  onComplete: () => void;
}



export default function Onboarding({ onComplete }: OnboardingProps) {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  // Remove blocking asset preloading for faster initial load
  // Assets will load progressively as needed

  const nextScreen = () => {
    setIsTransitioning(true);
    
    // Smooth transition delay
    setTimeout(() => {
      if (currentScreen < 4) {
        setCurrentScreen(prev => prev + 1);
      } else {
        onComplete();
      }
      setIsTransitioning(false);
    }, 150);
  };

  const sendOtp = () => {
    if (mobileNumber.length === 10) {
      setIsOtpSent(true);
      // In a real app, this would send an actual OTP
      console.log('OTP sent to:', mobileNumber);
    }
  };

  const verifyOtp = () => {
    if (otp === '123456') { // Demo OTP
      nextScreen();
    } else {
      alert('Invalid OTP. Please use 123456 for demo.');
    }
  };

  // Apple Pay Welcome Screen - 1000% Authentic
  if (currentScreen === 0) {
    return (
      <div className="min-h-screen relative overflow-hidden apple-pay-background" style={{
        background: `
          radial-gradient(circle at 20% 80%, rgba(120, 119, 246, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 119, 246, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(119, 246, 255, 0.1) 0%, transparent 50%),
          linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)
        `,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)'
      }}>
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

          {/* Complete Payment Ecosystem with All GIFs */}
          <div className="flex justify-center items-center" style={{ marginBottom: '32px' }}>
            <div className="flex flex-col items-center space-y-6">
              {/* Bank GIF - Top Center */}
              <div className="flex flex-col items-center">
                <img 
                  src={bankGif} 
                  alt="Bank Animation" 
                  className="w-32 h-32 object-contain"
                  loading="lazy"
                />
              </div>

              {/* Payment Flow - Horizontal */}
              <div className="flex items-center justify-center space-x-8">
                {/* UPI GIF */}
                <div className="flex flex-col items-center">
                  <img 
                    src={upiGif} 
                    alt="UPI Animation" 
                    className="w-20 h-20 object-contain"
                    loading="lazy"
                  />
                  <span className="text-xs font-semibold text-gray-600 mt-2 text-center">UPI</span>
                </div>

                {/* Secure Bridge GIF */}
                <div className="flex flex-col items-center">
                  <img 
                    src={secureGif} 
                    alt="Secure Bridge Animation" 
                    className="w-20 h-20 object-contain"
                    loading="lazy"
                  />
                  <span className="text-xs font-semibold text-gray-600 mt-2 text-center">Secure Bridge</span>
                </div>

                {/* OPPB GIF */}
                <div className="flex flex-col items-center">
                  <img 
                    src={oppbGif} 
                    alt="OPPB Mobile Payment Animation" 
                    className="w-20 h-20 object-contain"
                    loading="lazy"
                  />
                  <span className="text-xs font-semibold text-gray-600 mt-2 text-center">OPPB</span>
                </div>
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
      <div className={`min-h-screen relative overflow-hidden transition-opacity duration-200 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`} style={{
        background: `
          radial-gradient(circle at 30% 70%, rgba(52, 199, 89, 0.12) 0%, transparent 50%),
          radial-gradient(circle at 70% 30%, rgba(120, 119, 246, 0.10) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(255, 119, 246, 0.08) 0%, transparent 50%),
          linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)
        `,
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)'
      }}>
        <div className="flex flex-col h-screen" style={{ paddingTop: '44px', paddingLeft: '16px', paddingRight: '16px', paddingBottom: '34px' }}>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              {/* Privacy Icon */}
              <div className="flex justify-center mb-12">
                <img 
                  src={secureLockGif} 
                  alt="Secure lock animation"
                  className="w-24 h-24 transition-all duration-200"
                  loading="lazy"
                />
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
      <div className={`min-h-screen relative overflow-hidden transition-opacity duration-200 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`} style={{
        background: `
          radial-gradient(circle at 40% 60%, rgba(0, 122, 255, 0.12) 0%, transparent 50%),
          radial-gradient(circle at 60% 40%, rgba(52, 199, 89, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 30% 80%, rgba(255, 119, 246, 0.10) 0%, transparent 50%),
          linear-gradient(135deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.04) 100%)
        `,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)'
      }}>
        <div className="flex flex-col h-screen" style={{ paddingTop: '44px', paddingLeft: '16px', paddingRight: '16px', paddingBottom: '34px' }}>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              {/* Face ID Icon */}
              <div className="flex justify-center mb-12">
                <img 
                  src={faceIdGif} 
                  alt="Face ID animation"
                  className="w-24 h-24 transition-all duration-200"
                  loading="lazy"
                />
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

  // Mobile Number Authentication Screen
  if (currentScreen === 3) {
    return (
      <div className={`min-h-screen relative overflow-hidden transition-opacity duration-200 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`} style={{
        background: `
          radial-gradient(circle at 60% 40%, rgba(255, 119, 246, 0.12) 0%, transparent 50%),
          radial-gradient(circle at 40% 70%, rgba(0, 122, 255, 0.10) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(52, 199, 89, 0.08) 0%, transparent 50%),
          linear-gradient(135deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.04) 100%)
        `,
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)'
      }}>
        <div className="flex flex-col h-screen" style={{ paddingTop: '44px', paddingLeft: '16px', paddingRight: '16px', paddingBottom: '34px' }}>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center w-full max-w-sm mx-auto">
              {/* Phone GIF */}
              <div className="flex justify-center mb-12">
                <img 
                  src="@assets/fetchpik.com-iconscout-riQeVK60Iq_1751389368477.gif" 
                  alt="Mobile Phone Animation" 
                  className="w-24 h-24 object-contain"
                  loading="lazy"
                />
              </div>
              
              {/* Content */}
              <div className="space-y-8">
                <div className="text-center">
                  <h1 
                    className="text-black font-bold mb-4"
                    style={{ 
                      fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                      fontSize: '32px',
                      lineHeight: '38px',
                      letterSpacing: '-0.8px',
                      fontWeight: '700',
                      textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                    }}
                  >
                    {!isOtpSent ? 'Enter your mobile number' : 'Enter verification code'}
                  </h1>
                  <p 
                    className="text-black/70 font-normal max-w-xs mx-auto"
                    style={{ 
                      fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                      fontSize: '18px',
                      lineHeight: '24px',
                      letterSpacing: '-0.2px',
                      fontWeight: '400',
                      textShadow: '0 0.5px 1px rgba(0,0,0,0.08)'
                    }}
                  >
                    {!isOtpSent ? 
                      'We\'ll send you a verification code to secure your account.' :
                      `We sent a 6-digit code to +91 ${mobileNumber}`
                    }
                  </p>
                </div>

                {/* Input Field */}
                {!isOtpSent ? (
                  <div className="space-y-4">
                    <div className="relative">
                      <div className="flex items-center bg-white/10 backdrop-blur-md rounded-16 border border-white/20 shadow-lg">
                        <span className="px-4 py-4 text-black/60 font-medium">+91</span>
                        <input
                          type="tel"
                          placeholder="9876543210"
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                          className="flex-1 px-4 py-4 bg-transparent text-black placeholder-black/40 outline-none font-medium"
                          style={{ 
                            fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                            fontSize: '17px'
                          }}
                        />
                      </div>
                    </div>
                    
                    <SwipeToSend
                      onComplete={sendOtp}
                      text="Swipe to Send OTP"
                      variant="primary"
                      size="medium"
                      disabled={mobileNumber.length !== 10}
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-center space-x-3">
                      {[...Array(6)].map((_, i) => (
                        <input
                          key={i}
                          type="text"
                          maxLength={1}
                          value={otp[i] || ''}
                          onChange={(e) => {
                            const newOtp = otp.split('');
                            newOtp[i] = e.target.value;
                            setOtp(newOtp.join(''));
                            
                            // Auto-focus next input
                            if (e.target.value && i < 5) {
                              const nextInput = e.target.parentElement?.children[i + 1] as HTMLInputElement;
                              nextInput?.focus();
                            }
                          }}
                          className="w-12 h-12 text-center bg-white/10 backdrop-blur-md rounded-12 border border-white/20 shadow-lg text-black font-bold text-xl outline-none focus:border-blue-500 focus:bg-white/20 transition-all"
                          style={{ 
                            fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
                          }}
                        />
                      ))}
                    </div>
                    
                    <div className="text-center">
                      <p className="text-black/60 text-sm mb-4">Demo OTP: 123456</p>
                    </div>
                    
                    <SwipeToSend
                      onComplete={verifyOtp}
                      text="Swipe to Verify"
                      variant="primary"
                      size="medium"
                      disabled={otp.length !== 6}
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
                        onClick={() => {
                          setIsOtpSent(false);
                          setOtp('');
                        }}
                      >
                        Change Number
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Apple Pay Complete Screen - Setup Complete
  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: `
        radial-gradient(circle at 50% 30%, rgba(52, 199, 89, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 20% 70%, rgba(48, 209, 88, 0.12) 0%, transparent 50%),
        radial-gradient(circle at 80% 60%, rgba(0, 122, 255, 0.08) 0%, transparent 50%),
        linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.05) 100%)
      `,
      backdropFilter: 'blur(22px)',
      WebkitBackdropFilter: 'blur(22px)'
    }}>
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