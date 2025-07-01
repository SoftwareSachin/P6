import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ApplePayQRCodeSVG } from "@/components/ApplePaySVGs";
import { CheckmarkSuccessSVG } from "@/components/ApplePayAuthenticSVGs";

interface UltraPremiumPaymentButtonProps {
  onPaymentInitiate: () => void;
  isProcessing?: boolean;
  isSuccess?: boolean;
  merchantName: string;
  amount?: number;
  className?: string;
}

export function UltraPremiumPaymentButton({ 
  onPaymentInitiate, 
  isProcessing = false,
  isSuccess = false,
  merchantName,
  amount,
  className = ""
}: UltraPremiumPaymentButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    if (!isProcessing && !isSuccess) {
      setIsPressed(true);
      onPaymentInitiate();
      setTimeout(() => setIsPressed(false), 200);
    }
  };

  return (
    <Button
      onClick={handlePress}
      disabled={isProcessing || isSuccess}
      className={`relative overflow-hidden border-0 transition-all duration-300 ${className}`}
      style={{
        background: isSuccess 
          ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
          : 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
        boxShadow: isPressed
          ? '0 2px 8px rgba(0, 122, 255, 0.4), inset 0 2px 4px rgba(0,0,0,0.1)'
          : isSuccess
          ? '0 8px 24px rgba(16, 185, 129, 0.4), inset 0 1px 0 rgba(255,255,255,0.3)'
          : '0 8px 24px rgba(0, 122, 255, 0.4), inset 0 1px 0 rgba(255,255,255,0.3)',
        transform: isPressed ? 'scale(0.98) translateY(1px)' : 'scale(1)',
        fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
        fontWeight: '600',
        color: 'white',
        fontSize: '16px',
        height: '52px',
        borderRadius: '26px',
        minWidth: '200px'
      }}
    >
      {/* Animated Background Shimmer */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.6) 50%, transparent 70%)',
          animation: isProcessing ? 'shimmer 2s infinite' : 'none',
          transform: 'translateX(-100%)'
        }}
      />
      
      {/* Pulsing Glow Effect */}
      {isProcessing && (
        <div 
          className="absolute inset-0 rounded-full opacity-60"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
            animation: 'premium-pulse 1.5s infinite'
          }}
        />
      )}

      {/* Button Content */}
      <div className="flex items-center justify-center space-x-3 relative z-10">
        {isSuccess ? (
          <CheckmarkSuccessSVG className="w-6 h-6" />
        ) : isProcessing ? (
          <div 
            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
            style={{ animation: 'spin 1s linear infinite' }}
          />
        ) : (
          <ApplePayQRCodeSVG className="w-6 h-6" />
        )}
        
        <span className="font-semibold">
          {isSuccess 
            ? 'Payment Successful'
            : isProcessing 
            ? 'Processing...'
            : amount 
            ? `Pay ₹${amount}`
            : 'Pay Now'
          }
        </span>
      </div>

      {/* Success Confetti Effect */}
      {isSuccess && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-80"
              style={{
                left: `${20 + (i * 10)}%`,
                top: '50%',
                animation: `confetti-${i % 4} 1s ease-out`,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Haptic Feedback Ring */}
      {isPressed && (
        <div 
          className="absolute inset-0 rounded-full border-2 border-white opacity-50"
          style={{
            animation: 'haptic-ring 0.3s ease-out'
          }}
        />
      )}
    </Button>
  );
}

// Add the required CSS animations to index.css via a style tag if needed
const styles = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes confetti-0 {
    0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
    100% { transform: translate(20px, -30px) rotate(180deg); opacity: 0; }
  }

  @keyframes confetti-1 {
    0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
    100% { transform: translate(-20px, -35px) rotate(-180deg); opacity: 0; }
  }

  @keyframes confetti-2 {
    0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
    100% { transform: translate(25px, -25px) rotate(270deg); opacity: 0; }
  }

  @keyframes confetti-3 {
    0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
    100% { transform: translate(-25px, -40px) rotate(-270deg); opacity: 0; }
  }

  @keyframes haptic-ring {
    0% { transform: scale(1); opacity: 0.5; }
    100% { transform: scale(1.2); opacity: 0; }
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
}