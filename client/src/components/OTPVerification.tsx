import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Smartphone, MessageSquare } from "lucide-react";
import { COLORS } from "@/lib/constants";

interface OTPVerificationProps {
  phoneNumber: string;
  onVerify: (otp: string) => void;
  onResend: () => void;
}

export function OTPVerification({ phoneNumber, onVerify, onResend }: OTPVerificationProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  // Auto-focus first input
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Auto-submit when all digits entered
  useEffect(() => {
    const otpString = otp.join("");
    if (otpString.length === 6) {
      handleVerify(otpString);
    }
  }, [otp]);

  const handleInputChange = (index: number, value: string) => {
    // Only allow single digit
    if (value.length > 1) value = value.slice(-1);
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Focus previous input on backspace
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = (otpCode: string) => {
    // Simulate OTP verification
    if (otpCode === "123456") {
      onVerify(otpCode);
    } else {
      // Wrong OTP - shake animation
      setIsShaking(true);
      setOtp(["", "", "", "", "", ""]);
      setTimeout(() => {
        setIsShaking(false);
        inputRefs.current[0]?.focus();
      }, 500);
    }
  };

  const handleResend = () => {
    if (canResend) {
      setTimer(30);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]);
      onResend();
      inputRefs.current[0]?.focus();
    }
  };

  const formatPhoneNumber = (phone: string) => {
    // Format: +91-XXXXX789
    const code = phone.slice(0, 3);
    const number = phone.slice(3);
    return `${code}-XXXXX${number.slice(-3)}`;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen flex flex-col justify-center" style={{ backgroundColor: COLORS.background }}>
      <div className="p-8 max-w-sm mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
            <Smartphone className="h-8 w-8" style={{ color: COLORS.primary }} />
          </div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: COLORS.textPrimary }}>
            Verify OTP
          </h1>
          <p className="text-sm" style={{ color: COLORS.textSecondary }}>
            Enter OTP sent to {formatPhoneNumber(phoneNumber)}
          </p>
        </div>

        {/* OTP Input Boxes - PhonePe Style */}
        <div className="mb-6">
          <div 
            className={`flex justify-center space-x-3 mb-4 ${
              isShaking ? 'animate-bounce' : ''
            }`}
            style={{ 
              animation: isShaking ? 'shake 0.5s ease-in-out' : undefined 
            }}
          >
            {otp.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-12 h-12 text-center text-xl font-bold border-2 rounded-lg transition-all duration-200 ${
                  digit 
                    ? 'border-purple-600 bg-purple-50' 
                    : 'border-gray-300'
                } ${isShaking ? 'border-red-500' : ''}`}
                maxLength={1}
              />
            ))}
          </div>

          {/* Auto-read SMS Info */}
          <p className="text-xs text-center" style={{ color: COLORS.textSecondary }}>
            <div className="flex items-center justify-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <span>We'll automatically detect the SMS</span>
            </div>
          </p>
        </div>

        {/* Timer and Resend */}
        <div className="text-center mb-6">
          {!canResend ? (
            <p className="text-sm" style={{ color: COLORS.textSecondary }}>
              Resend OTP in {formatTime(timer)}
            </p>
          ) : (
            <Button
              variant="ghost"
              onClick={handleResend}
              className="text-purple-600 font-medium"
            >
              Resend OTP
            </Button>
          )}
        </div>

        {/* Verify Button */}
        <Button
          onClick={() => handleVerify(otp.join(""))}
          disabled={otp.some(digit => !digit)}
          className="w-full h-14 text-lg font-semibold"
          style={{ 
            backgroundColor: otp.every(digit => digit) ? COLORS.primary : '#ccc'
          }}
        >
          Verify & Continue
        </Button>

        {/* Help Text */}
        <div className="text-center mt-6">
          <p className="text-xs" style={{ color: COLORS.textSecondary }}>
            Didn't receive OTP?{" "}
            <a href="#" className="text-purple-600 underline">
              Try different number
            </a>
          </p>
        </div>
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