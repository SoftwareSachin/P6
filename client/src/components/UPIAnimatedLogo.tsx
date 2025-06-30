import upiGif from "@assets/fetchpik.com-iconscout-upcaLHoyqi (1)_1751287545574.gif";

interface UPIAnimatedLogoProps {
  className?: string;
}

export function UPIAnimatedLogo({ className = "w-12 h-12" }: UPIAnimatedLogoProps) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <img 
        src={upiGif} 
        alt="UPI" 
        className="w-10 h-10 object-contain"
      />
      <text className="text-xs font-semibold text-gray-600 mt-1">UPI</text>
    </div>
  );
}