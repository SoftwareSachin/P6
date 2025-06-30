import phoneGif from "@assets/phone-animated.gif";

interface AnimatedPhoneGIFProps {
  className?: string;
  width?: string;
  height?: string;
}

export function AnimatedPhoneGIF({ 
  className = "w-6 h-6", 
  width = "24px", 
  height = "24px" 
}: AnimatedPhoneGIFProps) {
  return (
    <img 
      src={phoneGif} 
      alt="Phone"
      className={className}
      style={{ 
        width, 
        height, 
        objectFit: 'contain' 
      }}
    />
  );
}

export default AnimatedPhoneGIF;