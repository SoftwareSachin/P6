import React, { useState, useRef, useCallback, useEffect } from "react";
import { ArrowRight, Check } from "lucide-react";

interface SwipeToSendProps {
  onComplete: () => void;
  text: string;
  variant?: 'primary' | 'secondary' | 'success' | 'glass';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
}

export function SwipeToSend({ 
  onComplete, 
  text, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  className = ""
}: SwipeToSendProps) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [velocity, setVelocity] = useState(0);
  const [lastPosition, setLastPosition] = useState(0);
  const [lastTime, setLastTime] = useState(0);
  const sliderRef = useRef<HTMLButtonElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  const sizes = {
    small: { height: 44, sliderSize: 36, padding: 4, fontSize: '14px' },
    medium: { height: 52, sliderSize: 44, padding: 4, fontSize: '16px' },
    large: { height: 56, sliderSize: 48, padding: 4, fontSize: '18px' }
  };

  const variants = {
    primary: { 
      bg: 'linear-gradient(135deg, rgba(0, 122, 255, 0.8) 0%, rgba(0, 86, 204, 0.9) 100%)', 
      completeBg: 'linear-gradient(135deg, rgba(52, 199, 89, 0.9) 0%, rgba(48, 161, 78, 0.95) 100%)',
      textColor: '#FFFFFF',
      border: 'rgba(255, 255, 255, 0.2)',
      shadow: '0 8px 32px rgba(0, 122, 255, 0.3)'
    },
    secondary: { 
      bg: 'rgba(255, 255, 255, 0.08)', 
      completeBg: 'linear-gradient(135deg, rgba(52, 199, 89, 0.9) 0%, rgba(48, 161, 78, 0.95) 100%)',
      textColor: '#FFFFFF',
      border: 'rgba(255, 255, 255, 0.15)',
      shadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
    },
    success: { 
      bg: 'linear-gradient(135deg, rgba(52, 199, 89, 0.8) 0%, rgba(48, 161, 78, 0.9) 100%)', 
      completeBg: 'linear-gradient(135deg, rgba(48, 209, 88, 0.9) 0%, rgba(50, 215, 75, 0.95) 100%)',
      textColor: '#FFFFFF',
      border: 'rgba(255, 255, 255, 0.2)',
      shadow: '0 8px 32px rgba(52, 199, 89, 0.3)'
    },
    glass: {
      bg: 'rgba(255, 255, 255, 0.05)',
      completeBg: 'linear-gradient(135deg, rgba(52, 199, 89, 0.9) 0%, rgba(48, 161, 78, 0.95) 100%)',
      textColor: '#FFFFFF',
      border: 'rgba(255, 255, 255, 0.1)',
      shadow: '0 8px 32px rgba(0, 0, 0, 0.05)'
    }
  };

  const currentSize = sizes[size];
  const currentVariant = variants[variant];

  const getPosition = useCallback((clientX: number) => {
    if (!trackRef.current) return 0;
    const rect = trackRef.current.getBoundingClientRect();
    const maxMove = rect.width - currentSize.sliderSize - currentSize.padding * 2;
    const rawPosition = clientX - rect.left - currentSize.sliderSize / 2;
    const clampedPosition = Math.min(Math.max(0, rawPosition), maxMove);
    return (clampedPosition / maxMove) * 100;
  }, [currentSize]);

  // Physics-based animation for release
  const animateRelease = useCallback(() => {
    if (isCompleted) return;
    
    const friction = 0.92;
    const threshold = 90;
    
    const animate = () => {
      setProgress(prev => {
        const newVel = velocity * friction;
        setVelocity(newVel);
        
        const newProgress = prev + newVel;
        
        // If we have enough velocity and are close to completion
        if (newProgress >= threshold && Math.abs(newVel) > 0.5) {
          setIsCompleted(true);
          setTimeout(() => onComplete(), 200);
          return 100;
        }
        
        // Snap back with elastic easing
        if (newProgress < threshold && Math.abs(newVel) < 0.1) {
          const snapBackProgress = newProgress * 0.85;
          return snapBackProgress < 1 ? 0 : snapBackProgress;
        }
        
        return Math.max(0, Math.min(100, newProgress));
      });
      
      if (Math.abs(velocity) > 0.1 && !isCompleted) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };
    
    setIsAnimating(true);
    animate();
  }, [velocity, isCompleted, onComplete]);

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (disabled || isCompleted || isAnimating) return;
    e.preventDefault();
    setIsDragging(true);
    
    // Reset physics state
    setVelocity(0);
    setLastPosition(e.clientX);
    setLastTime(Date.now());
    
    // Cancel any ongoing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = Date.now();
      const currentPos = e.clientX;
      const newProgress = getPosition(currentPos);
      
      // Calculate velocity for physics
      const timeDelta = currentTime - lastTime;
      if (timeDelta > 0) {
        const positionDelta = currentPos - lastPosition;
        const newVelocity = (positionDelta / timeDelta) * 16; // Normalize to 60fps
        setVelocity(newVelocity);
        setLastPosition(currentPos);
        setLastTime(currentTime);
      }
      
      setProgress(newProgress);
      
      // Immediate completion with haptic-like feedback
      if (newProgress >= 95) {
        setIsCompleted(true);
        setIsDragging(false);
        setTimeout(() => onComplete(), 150);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      if (progress < 95) {
        animateRelease();
      }
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [disabled, isCompleted, isAnimating, getPosition, progress, onComplete, lastTime, lastPosition, animateRelease]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (disabled || isCompleted || isAnimating) return;
    e.preventDefault();
    setIsDragging(true);
    
    const touch = e.touches[0];
    // Reset physics state
    setVelocity(0);
    setLastPosition(touch.clientX);
    setLastTime(Date.now());
    
    // Cancel any ongoing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const currentTime = Date.now();
      const currentPos = touch.clientX;
      const newProgress = getPosition(currentPos);
      
      // Calculate velocity for physics
      const timeDelta = currentTime - lastTime;
      if (timeDelta > 0) {
        const positionDelta = currentPos - lastPosition;
        const newVelocity = (positionDelta / timeDelta) * 16; // Normalize to 60fps
        setVelocity(newVelocity);
        setLastPosition(currentPos);
        setLastTime(currentTime);
      }
      
      setProgress(newProgress);
      
      // Immediate completion with haptic-like feedback
      if (newProgress >= 95) {
        setIsCompleted(true);
        setIsDragging(false);
        setTimeout(() => onComplete(), 150);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      }
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
      if (progress < 95) {
        animateRelease();
      }
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
  }, [disabled, isCompleted, isAnimating, getPosition, progress, onComplete, lastTime, lastPosition, animateRelease]);

  const sliderLeft = Math.min(progress, 95);
  const trackColor = progress >= 95 ? currentVariant.completeBg : currentVariant.bg;
  const isNearCompletion = progress >= 80;
  const sliderScale = isDragging ? 1.05 : (isNearCompletion ? 1.02 : 1);
  const trackGlow = isNearCompletion ? '0 0 20px rgba(52, 199, 89, 0.4)' : 'none';

  return (
    <div className={`w-full ${className}`}>
      <div
        ref={trackRef}
        style={{
          height: `${currentSize.height}px`,
          background: `${trackColor}, linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)`,
          backgroundBlendMode: 'normal, overlay',
          borderRadius: `${currentSize.height / 2}px`,
          position: 'relative',
          overflow: 'hidden',
          border: `1px solid ${currentVariant.border}`,
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          boxShadow: `${currentVariant.shadow}, ${trackGlow}, inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
          transition: isDragging ? 'none' : 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.6 : 1,
          transform: `scale(${sliderScale})`,
          willChange: 'transform, box-shadow'
        }}
      >
        {/* Progress Fill */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: `${Math.max(sliderLeft + 15, 0)}%`,
            background: progress >= 90 ? 
              `${currentVariant.completeBg}, linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)` :
              'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)',
            backgroundBlendMode: 'normal, overlay',
            borderRadius: `${currentSize.height / 2}px`,
            transition: isDragging ? 'none' : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            opacity: 0.8,
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)'
          }}
        />

        {/* Text */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: currentVariant.textColor,
            fontSize: currentSize.fontSize,
            fontWeight: '600',
            fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
            userSelect: 'none',
            pointerEvents: 'none',
            opacity: isCompleted ? 0 : 1,
            transition: 'opacity 0.3s ease'
          }}
        >
          {text}
        </div>

        {/* Success Text */}
        {isCompleted && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: '#FFFFFF',
              fontSize: currentSize.fontSize,
              fontWeight: '700',
              fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
              userSelect: 'none',
              pointerEvents: 'none',
              opacity: 1,
              transition: 'opacity 0.3s ease'
            }}
          >
            ✓ Complete
          </div>
        )}

        {/* Slider Button */}
        <button
          ref={sliderRef}
          style={{
            position: 'absolute',
            left: `${sliderLeft}%`,
            top: `${currentSize.padding}px`,
            width: `${currentSize.sliderSize}px`,
            height: `${currentSize.sliderSize}px`,
            borderRadius: `${currentSize.sliderSize / 2}px`,
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.8) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            cursor: disabled ? 'not-allowed' : (isCompleted ? 'default' : (isDragging ? 'grabbing' : 'grab')),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: isDragging ? 'none' : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            zIndex: 10,
            transform: `scale(${isDragging ? 0.95 : (isCompleted ? 1.1 : (isNearCompletion ? 1.05 : 1))}) ${isDragging ? 'rotate(5deg)' : 'rotate(0deg)'}`,
            willChange: 'transform, left',
            boxShadow: isDragging ? 
              '0 8px 30px rgba(0, 0, 0, 0.2), 0 4px 12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)' :
              '0 4px 20px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          disabled={disabled || isCompleted}
        >
          {isCompleted ? (
            <Check 
              className="w-5 h-5 text-green-500" 
              style={{
                animation: 'bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
              }}
            />
          ) : (
            <ArrowRight 
              className="w-5 h-5 text-blue-600" 
              style={{ 
                transform: `translateX(${Math.min(progress * 2, 8)}px) scale(${1 + progress * 0.1})`,
                transition: 'transform 0.1s ease',
                opacity: 0.8 + (progress * 0.2)
              }} 
            />
          )}
        </button>

        {/* Shimmer Effect */}
        {!isCompleted && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
              animation: 'shimmer 2s infinite',
              pointerEvents: 'none'
            }}
          />
        )}
      </div>


    </div>
  );
}