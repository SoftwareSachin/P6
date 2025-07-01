import React, { useState, useRef, useCallback } from "react";
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
  const sliderRef = useRef<HTMLButtonElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

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
    const position = Math.min(Math.max(0, clientX - rect.left - currentSize.sliderSize / 2), maxMove);
    return (position / maxMove) * 100;
  }, [currentSize]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (disabled || isCompleted) return;
    e.preventDefault();
    setIsDragging(true);

    const handleMouseMove = (e: MouseEvent) => {
      const newProgress = getPosition(e.clientX);
      setProgress(newProgress);
      
      if (newProgress >= 90) {
        setIsCompleted(true);
        setIsDragging(false);
        setTimeout(() => onComplete(), 300);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      if (progress < 90) {
        setProgress(0);
      }
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [disabled, isCompleted, getPosition, progress, onComplete]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (disabled || isCompleted) return;
    e.preventDefault();
    setIsDragging(true);

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const newProgress = getPosition(touch.clientX);
      setProgress(newProgress);
      
      if (newProgress >= 90) {
        setIsCompleted(true);
        setIsDragging(false);
        setTimeout(() => onComplete(), 300);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      }
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
      if (progress < 90) {
        setProgress(0);
      }
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
  }, [disabled, isCompleted, getPosition, progress, onComplete]);

  const sliderLeft = Math.min(progress, 90);
  const trackColor = progress >= 90 ? currentVariant.completeBg : currentVariant.bg;

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
          boxShadow: `${currentVariant.shadow}, inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.6 : 1
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
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
            transition: isDragging ? 'none' : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            zIndex: 10,
            transform: `scale(${isDragging ? 0.95 : (isCompleted ? 1.1 : 1)})`,
            willChange: 'transform, left'
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