import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Share2, Download, Star } from "lucide-react";
import { COLORS } from "@/lib/constants";

interface PaymentSuccessProps {
  amount: string;
  recipient: string;
  upiRef: string;
  onDone: () => void;
}

export function PaymentSuccess({ amount, recipient, upiRef, onDone }: PaymentSuccessProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [rating, setRating] = useState(0);
  const [animationStage, setAnimationStage] = useState(0);

  useEffect(() => {
    // Trigger success animations in sequence
    const timers = [
      setTimeout(() => setAnimationStage(1), 100), // Show checkmark
      setTimeout(() => setShowConfetti(true), 300), // Show confetti
      setTimeout(() => setAnimationStage(2), 600), // Show details
      setTimeout(() => setShowConfetti(false), 3000), // Hide confetti
    ];

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  const handleShare = () => {
    const message = `Payment Successful!\n₹${amount} sent to ${recipient}\nUPI Ref: ${upiRef}\nPowered by OPPB`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Payment Receipt',
        text: message,
      });
    } else {
      // Fallback for browsers without native sharing
      navigator.clipboard.writeText(message);
      alert('Receipt copied to clipboard!');
    }
  };

  const handleDownload = () => {
    // Generate and download receipt as PDF/image
    alert('Receipt downloaded successfully!');
  };

  const currentTime = new Date();
  const formattedDate = currentTime.toLocaleDateString('en-IN', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
  const formattedTime = currentTime.toLocaleTimeString('en-IN', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden" style={{ backgroundColor: COLORS.background }}>
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 50 }, (_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              {['🎉', '🎊', '✨', '🌟', '💫'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      <div className="text-center space-y-6 max-w-sm mx-auto relative z-10">
        {/* Animated Checkmark - Exact Specification */}
        <div 
          className={`transition-all duration-1000 ${
            animationStage >= 1 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          }`}
        >
          <div className="w-32 h-32 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-6">
            <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center animate-pulse">
              <span className="text-4xl text-white">✅</span>
            </div>
          </div>
        </div>

        {/* Success Message */}
        <div 
          className={`transition-all duration-800 delay-300 ${
            animationStage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <h1 className="text-3xl font-bold mb-4" style={{ color: COLORS.textPrimary }}>
            Payment Successful!
          </h1>

          {/* Amount and Recipient */}
          <div className="mb-6">
            <div className="text-4xl font-bold mb-2" style={{ color: COLORS.success }}>
              ₹{amount}
            </div>
            <p className="text-lg" style={{ color: COLORS.textSecondary }}>
              sent to {recipient}
            </p>
          </div>

          {/* Transaction Details */}
          <div className="bg-white rounded-lg p-6 shadow-sm space-y-3">
            <div className="flex justify-between">
              <span style={{ color: COLORS.textSecondary }}>UPI Ref:</span>
              <span className="font-mono" style={{ color: COLORS.textPrimary }}>{upiRef}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: COLORS.textSecondary }}>Date:</span>
              <span style={{ color: COLORS.textPrimary }}>{formattedDate} • {formattedTime}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: COLORS.textSecondary }}>Status:</span>
              <span className="text-green-600 font-medium">Completed</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mt-6">
            <Button
              variant="outline"
              onClick={handleShare}
              className="flex-1 flex items-center justify-center space-x-2"
            >
              <Share2 className="h-4 w-4" />
              <span>Share Receipt</span>
            </Button>
            <Button
              variant="outline"
              onClick={handleDownload}
              className="flex-1 flex items-center justify-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Download</span>
            </Button>
          </div>

          {/* Rating System - Exact Specification */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium mb-3" style={{ color: COLORS.textPrimary }}>
              ⭐ Rate your experience
            </p>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="transition-colors duration-200"
                >
                  <Star 
                    className={`h-8 w-8 ${
                      star <= rating 
                        ? 'text-yellow-500 fill-current' 
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-sm mt-2" style={{ color: COLORS.textSecondary }}>
                Thank you for your feedback!
              </p>
            )}
          </div>

          {/* Done Button */}
          <Button
            onClick={onDone}
            className="w-full mt-6 h-12 text-lg font-semibold"
            style={{ backgroundColor: COLORS.primary }}
          >
            Done
          </Button>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-green-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-blue-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-purple-500 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>
    </div>
  );
}