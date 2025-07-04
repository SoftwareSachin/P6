import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { ArrowLeft, Shield, Lock, Check, X } from 'lucide-react';

export default function PinEntry() {
  const [, setLocation] = useLocation();
  const [pin, setPin] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showError, setShowError] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [paymentDetails, setPaymentDetails] = useState({
    amount: "100",
    recipient: "Unknown",
    contact: null,
    note: ""
  });

  const maxAttempts = 3;
  const correctPin = '1234'; // In real app, this would be verified against secure storage

  // Load payment details from localStorage
  useEffect(() => {
    const storedPayment = localStorage.getItem('pendingPayment');
    if (storedPayment) {
      try {
        const details = JSON.parse(storedPayment);
        setPaymentDetails(details);
      } catch (error) {
        console.error('Failed to parse payment details:', error);
      }
    }
  }, []);

  const handleNumberClick = (num: string) => {
    if (pin.length < 4 && !isProcessing) {
      setPin(prev => prev + num);
      setShowError(false);
    }
  };

  const handleBackspace = () => {
    if (!isProcessing) {
      setPin(prev => prev.slice(0, -1));
      setShowError(false);
    }
  };

  const handleCancel = () => {
    // Clear pending payment and return to send money page
    localStorage.removeItem('pendingPayment');
    setLocation('/send-money');
  };

  const handlePinComplete = async () => {
    if (pin.length === 4) {
      setIsProcessing(true);
      
      // Simulate verification delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (pin === correctPin) {
        // PIN correct - clear pending payment and go to dashboard
        localStorage.removeItem('pendingPayment');
        setLocation('/dashboard');
      } else {
        // PIN incorrect
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        setShowError(true);
        setPin('');
        
        if (newAttempts >= maxAttempts) {
          // Too many attempts - return to send page
          setTimeout(() => {
            setLocation('/send');
          }, 2000);
        }
      }
      
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (pin.length === 4) {
      handlePinComplete();
    }
  }, [pin]);

  const NumberButton = ({ num, letters }: { num: string; letters?: string }) => (
    <button
      onClick={() => handleNumberClick(num)}
      disabled={isProcessing}
      className="w-20 h-20 rounded-full font-bold text-2xl text-white transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)',
        fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
      }}
    >
      <div className="flex flex-col items-center justify-center">
        <span className="text-2xl">{num}</span>
        {letters && (
          <span className="text-xs text-white/60 -mt-1 font-medium">{letters}</span>
        )}
      </div>
    </button>
  );

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Ambient Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-black to-slate-900">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-6 pt-16">
        <button
          onClick={handleCancel}
          className="w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-xl transition-all duration-300 hover:bg-white/10"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        
        <div className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-blue-400" />
          <span className="text-white/80 text-sm font-medium" 
                style={{ fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
            Secure Payment
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8">
        {/* Payment Info */}
        <div className="text-center mb-12">
          <div className="mb-4">
            <span className="text-white/60 text-lg font-medium" 
                  style={{ fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
              Pay
            </span>
          </div>
          
          <div className="mb-2">
            <span className="text-white font-black text-5xl" 
                  style={{ 
                    fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                    letterSpacing: '-0.02em'
                  }}>
              ₹{paymentDetails.amount}
            </span>
          </div>
          
          <div className="mb-8">
            <span className="text-white/70 text-lg font-medium" 
                  style={{ fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
              to {paymentDetails.recipient}
            </span>
          </div>
          
          {/* PIN Status */}
          <div className="mb-4">
            <span className="text-white/80 text-lg font-semibold" 
                  style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
              {showError ? 'Incorrect PIN' : 'Enter PIN'}
            </span>
          </div>
          
          {/* PIN Dots */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index < pin.length 
                    ? (showError ? 'bg-red-400' : 'bg-white') 
                    : 'bg-white/20'
                }`}
                style={{
                  boxShadow: index < pin.length 
                    ? (showError ? '0 0 12px rgba(248,113,113,0.4)' : '0 0 12px rgba(255,255,255,0.3)') 
                    : 'none'
                }}
              />
            ))}
          </div>
          
          {/* Processing/Error State */}
          {isProcessing && (
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span className="text-white/70 text-sm font-medium">Verifying...</span>
            </div>
          )}
          
          {showError && (
            <div className="mb-4">
              <span className="text-red-400 text-sm font-medium">
                {attempts >= maxAttempts ? 'Too many attempts. Returning...' : `Try again (${attempts}/${maxAttempts})`}
              </span>
            </div>
          )}
        </div>

        {/* Number Pad */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Row 1 */}
          <NumberButton num="1" />
          <NumberButton num="2" letters="ABC" />
          <NumberButton num="3" letters="DEF" />
          
          {/* Row 2 */}
          <NumberButton num="4" letters="GHI" />
          <NumberButton num="5" letters="JKL" />
          <NumberButton num="6" letters="MNO" />
          
          {/* Row 3 */}
          <NumberButton num="7" letters="PQRS" />
          <NumberButton num="8" letters="TUV" />
          <NumberButton num="9" letters="WXYZ" />
          
          {/* Row 4 */}
          <div /> {/* Empty space */}
          <NumberButton num="0" />
          <button
            onClick={handleBackspace}
            disabled={isProcessing || pin.length === 0}
            className="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-30"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)'
            }}
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Security Footer */}
        <div className="flex items-center justify-center space-x-2 opacity-60">
          <Lock className="w-4 h-4 text-white" />
          <span className="text-white text-xs font-medium" 
                style={{ fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
            Your PIN is encrypted and secure
          </span>
        </div>
      </div>
    </div>
  );
}