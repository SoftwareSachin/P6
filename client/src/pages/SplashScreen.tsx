import { useEffect } from "react";
import { COLORS } from "@/lib/constants";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    // Splash screen duration: 2.5 seconds with smooth transitions
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, #6739B7 0%, #8B5CF6 50%, #3B82F6 100%)'
      }}
    >
      {/* Background Gradient Mesh - GPay Style */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-48 h-48 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/15 rounded-full blur-2xl animate-pulse delay-500"></div>
        <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-white/8 rounded-full blur-3xl animate-pulse delay-1500"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center">
        {/* Animated OPPB Logo - Brand Logo */}
        <div className="mb-8">
          <div 
            className="w-32 h-32 mx-auto rounded-3xl flex items-center justify-center animate-bounce"
            style={{ 
              background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.2)'
            }}
          >
            <span className="text-4xl font-bold text-white">OPPB</span>
          </div>
        </div>

        {/* Loading Animation - Circular Progress with Shimmer */}
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-white/30 border-t-white"></div>
          </div>
        </div>

        {/* Tagline with Fade-in Animation */}
        <div className="animate-fade-in">
          <h1 className="text-2xl font-bold text-white mb-2">
            Welcome to OPPB
          </h1>
          <p className="text-lg text-white/90 animate-pulse">
            Pay Anywhere, Anytime
          </p>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/3 text-white/20 text-2xl animate-bounce" style={{ animationDelay: '0s' }}>
            💳
          </div>
          <div className="absolute top-1/3 right-1/4 text-white/20 text-xl animate-bounce" style={{ animationDelay: '0.5s' }}>
            📱
          </div>
          <div className="absolute bottom-1/3 left-1/4 text-white/20 text-2xl animate-bounce" style={{ animationDelay: '1s' }}>
            💰
          </div>
          <div className="absolute bottom-1/4 right-1/3 text-white/20 text-xl animate-bounce" style={{ animationDelay: '1.5s' }}>
            ⚡
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-8 w-64 mx-auto">
          <div className="h-1 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full animate-progress"
              style={{
                animation: 'progress 2.5s ease-out forwards'
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out 0.5s both;
        }
        
        .animate-progress {
          width: 0%;
        }
      `}</style>
    </div>
  );
}