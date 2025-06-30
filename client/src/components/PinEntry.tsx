import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { COLORS } from "@/lib/constants";

interface PinEntryProps {
  onComplete: (pin: string) => void;
  onCancel: () => void;
  title?: string;
  subtitle?: string;
}

export function PinEntry({ onComplete, onCancel, title = "Enter UPI PIN", subtitle }: PinEntryProps) {
  const [pin, setPin] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [isShaking, setIsShaking] = useState(false);

  const maxAttempts = 3;
  const pinLength = 6;

  useEffect(() => {
    if (pin.length === pinLength) {
      // Simulate PIN validation
      if (pin === "123456") {
        onComplete(pin);
      } else {
        // Wrong PIN - shake animation and reset
        setIsShaking(true);
        setAttempts(prev => prev + 1);
        
        setTimeout(() => {
          setIsShaking(false);
          setPin("");
          
          if (attempts + 1 >= maxAttempts) {
            alert("Too many incorrect attempts. Please try again later.");
            onCancel();
          }
        }, 500);
      }
    }
  }, [pin, attempts, onComplete, onCancel]);

  const handleNumberPress = (digit: string) => {
    if (pin.length < pinLength) {
      setPin(prev => prev + digit);
    }
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
  };

  const handleBiometric = () => {
    // Simulate biometric authentication
    alert("Biometric authentication successful!");
    onComplete("biometric");
  };

  const renderPinDots = () => {
    return Array.from({ length: pinLength }, (_, index) => (
      <div
        key={index}
        className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
          index < pin.length
            ? 'bg-purple-600 border-purple-600 animate-pulse'
            : 'border-gray-300'
        }`}
      />
    ));
  };

  // Randomized keypad (optional security feature)
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: COLORS.background }}>
      {/* Header */}
      <div className="text-center py-8">
        <h1 className="text-2xl font-bold mb-2" style={{ color: COLORS.textPrimary }}>
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm" style={{ color: COLORS.textSecondary }}>
            {subtitle}
          </p>
        )}
      </div>

      {/* PIN Dots - Exact Specification with Animation */}
      <div className="flex items-center justify-center py-8">
        <div 
          className={`flex space-x-4 ${isShaking ? 'animate-bounce' : ''}`}
          style={{ 
            animation: isShaking ? 'shake 0.5s ease-in-out' : undefined 
          }}
        >
          {renderPinDots()}
        </div>
      </div>

      {/* Custom Number Pad - Exact Specification */}
      <div className="flex-1 flex flex-col justify-center px-8">
        <div className="grid grid-cols-3 gap-6 max-w-xs mx-auto">
          {/* First row: 1, 2, 3 */}
          {[1, 2, 3].map((digit) => (
            <Button
              key={digit}
              variant="ghost"
              className="h-16 w-16 text-2xl font-semibold rounded-full hover:bg-gray-100 transition-all duration-200 hover:scale-105"
              onClick={() => handleNumberPress(digit.toString())}
              style={{ color: COLORS.textPrimary }}
            >
              {digit}
            </Button>
          ))}

          {/* Second row: 4, 5, 6 */}
          {[4, 5, 6].map((digit) => (
            <Button
              key={digit}
              variant="ghost"
              className="h-16 w-16 text-2xl font-semibold rounded-full hover:bg-gray-100 transition-all duration-200 hover:scale-105"
              onClick={() => handleNumberPress(digit.toString())}
              style={{ color: COLORS.textPrimary }}
            >
              {digit}
            </Button>
          ))}

          {/* Third row: 7, 8, 9 */}
          {[7, 8, 9].map((digit) => (
            <Button
              key={digit}
              variant="ghost"
              className="h-16 w-16 text-2xl font-semibold rounded-full hover:bg-gray-100 transition-all duration-200 hover:scale-105"
              onClick={() => handleNumberPress(digit.toString())}
              style={{ color: COLORS.textPrimary }}
            >
              {digit}
            </Button>
          ))}

          {/* Fourth row: empty, 0, backspace */}
          <div></div>
          <Button
            variant="ghost"
            className="h-16 w-16 text-2xl font-semibold rounded-full hover:bg-gray-100 transition-all duration-200 hover:scale-105"
            onClick={() => handleNumberPress("0")}
            style={{ color: COLORS.textPrimary }}
          >
            0
          </Button>
          <Button
            variant="ghost"
            className="h-16 w-16 text-2xl font-semibold rounded-full hover:bg-gray-100 transition-all duration-200 hover:scale-105"
            onClick={handleBackspace}
            style={{ color: COLORS.textPrimary }}
          >
            ⌫
          </Button>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="p-8 space-y-4">
        {/* Forgot PIN */}
        <div className="text-center">
          <Button variant="ghost" className="text-purple-600">
            Forgot PIN?
          </Button>
        </div>

        {/* Biometric Option - Exact Specification */}
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={handleBiometric}
            className="flex items-center space-x-2 text-purple-600"
          >
            <span className="text-2xl">👆</span>
            <span>Use Biometric</span>
          </Button>
        </div>

        {/* Attempts Warning */}
        {attempts > 0 && (
          <div className="text-center">
            <p className="text-sm text-red-600">
              Incorrect PIN. {maxAttempts - attempts} attempts remaining.
            </p>
          </div>
        )}

        {/* Cancel Button */}
        <Button
          variant="outline"
          onClick={onCancel}
          className="w-full"
        >
          Cancel
        </Button>
      </div>

      {/* Custom Shake Animation */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
}