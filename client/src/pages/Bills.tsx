import { useState, useCallback, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check, Clock, AlertCircle, CreditCard, ArrowRight, Star, Shield, Smartphone } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { BottomNavigation } from "@/components/BottomNavigation";
import { ApplePayContactlessSVG, ApplePaySecuritySVG, ApplePaySuccessSVG } from "@/components/ApplePaySVGs";

// Ultra-Premium Apple Pay-Inspired Bill Payment SVG Components
const UltraPremiumElectricitySVG = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ultraElectricityGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="25%" stopColor="#FFA500" />
        <stop offset="50%" stopColor="#FF8C00" />
        <stop offset="75%" stopColor="#FF7F00" />
        <stop offset="100%" stopColor="#FF6B35" />
      </linearGradient>
      <linearGradient id="ultraElectricityShine" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="rgba(255,255,255,0)" />
        <stop offset="50%" stopColor="rgba(255,255,255,0.8)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
      </linearGradient>
      <filter id="electricityGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <filter id="electricityInnerShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="2" result="offset-blur"/>
        <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse"/>
        <feFlood floodColor="rgba(0,0,0,0.3)" floodOpacity="1" result="color"/>
        <feComposite operator="in" in="color" in2="inverse" result="shadow"/>
        <feComposite operator="over" in="shadow" in2="SourceGraphic"/>
      </filter>
    </defs>
    
    {/* Main container with sophisticated gradients */}
    <rect width="100" height="100" rx="24" fill="url(#ultraElectricityGradient)" filter="url(#electricityGlow)"/>
    <rect width="100" height="100" rx="24" fill="url(#ultraElectricityInnerShadow)" opacity="0.6"/>
    
    {/* Lightning bolt with premium effects */}
    <g transform="translate(50,50)">
      <path d="M-8,-20 L-15,0 L-5,0 L-12,20 L8,0 L-2,0 L5,-20 Z" 
            fill="white" 
            stroke="rgba(255,255,255,0.8)" 
            strokeWidth="0.5"
            filter="url(#electricityInnerShadow)"/>
      
      {/* Energy particles */}
      <circle cx="-10" cy="-12" r="1.5" fill="rgba(255,255,255,0.9)" className="animate-ping" />
      <circle cx="8" cy="-8" r="1" fill="rgba(255,255,255,0.7)" className="animate-ping" style={{ animationDelay: '0.5s' }} />
      <circle cx="-6" cy="12" r="1.2" fill="rgba(255,255,255,0.8)" className="animate-ping" style={{ animationDelay: '1s' }} />
    </g>
    
    {/* Shine effect */}
    <rect x="15" y="0" width="30" height="100" rx="24" fill="url(#ultraElectricityShine)" opacity="0.4" className="animate-pulse"/>
    
    {/* Border highlight */}
    <rect width="100" height="100" rx="24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
  </svg>
);

const UltraPremiumWaterSVG = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ultraWaterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00D4FF" />
        <stop offset="25%" stopColor="#00BFFF" />
        <stop offset="50%" stopColor="#1E90FF" />
        <stop offset="75%" stopColor="#0080FF" />
        <stop offset="100%" stopColor="#0066CC" />
      </linearGradient>
      <linearGradient id="ultraWaterShine" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="rgba(255,255,255,0)" />
        <stop offset="50%" stopColor="rgba(255,255,255,0.7)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
      </linearGradient>
      <filter id="waterGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <radialGradient id="waterBubble" cx="30%" cy="30%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
        <stop offset="70%" stopColor="rgba(255,255,255,0.3)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
      </radialGradient>
    </defs>
    
    {/* Main container */}
    <rect width="100" height="100" rx="24" fill="url(#ultraWaterGradient)" filter="url(#waterGlow)"/>
    
    {/* Water drop with premium effects */}
    <g transform="translate(50,50)">
      <path d="M0,-20 Q15,-5 15,5 Q15,20 0,25 Q-15,20 -15,5 Q-15,-5 0,-20" 
            fill="white" 
            stroke="rgba(255,255,255,0.6)" 
            strokeWidth="0.5"/>
      
      {/* Water bubble highlights */}
      <ellipse cx="-3" cy="-8" rx="4" ry="6" fill="url(#waterBubble)" opacity="0.6"/>
      <circle cx="2" cy="-2" r="2" fill="rgba(255,255,255,0.5)"/>
      
      {/* Floating water droplets */}
      <circle cx="-18" cy="-10" r="1.5" fill="rgba(255,255,255,0.8)" className="animate-bounce" />
      <circle cx="18" cy="-5" r="1" fill="rgba(255,255,255,0.6)" className="animate-bounce" style={{ animationDelay: '0.3s' }} />
      <circle cx="-12" cy="15" r="1.2" fill="rgba(255,255,255,0.7)" className="animate-bounce" style={{ animationDelay: '0.6s' }} />
    </g>
    
    {/* Shine effect */}
    <rect x="20" y="0" width="25" height="100" rx="24" fill="url(#ultraWaterShine)" opacity="0.4" className="animate-pulse"/>
    
    {/* Border highlight */}
    <rect width="100" height="100" rx="24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
  </svg>
);

const UltraPremiumInternetSVG = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ultraInternetGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8A2BE2" />
        <stop offset="25%" stopColor="#7B68EE" />
        <stop offset="50%" stopColor="#6A0DAD" />
        <stop offset="75%" stopColor="#5A4FCF" />
        <stop offset="100%" stopColor="#4B0082" />
      </linearGradient>
      <filter id="internetGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <linearGradient id="ultraInternetShine" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="rgba(255,255,255,0)" />
        <stop offset="50%" stopColor="rgba(255,255,255,0.6)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
      </linearGradient>
    </defs>
    
    {/* Main container */}
    <rect width="100" height="100" rx="24" fill="url(#ultraInternetGradient)" filter="url(#internetGlow)"/>
    
    {/* WiFi signal waves */}
    <g transform="translate(50,50)">
      <circle cx="0" cy="0" r="25" stroke="white" strokeWidth="3" fill="none" opacity="0.8" className="animate-pulse"/>
      <circle cx="0" cy="0" r="18" stroke="white" strokeWidth="2.5" fill="none" opacity="0.6" className="animate-pulse" style={{ animationDelay: '0.2s' }}/>
      <circle cx="0" cy="0" r="11" stroke="white" strokeWidth="2" fill="none" opacity="0.7" className="animate-pulse" style={{ animationDelay: '0.4s' }}/>
      <circle cx="0" cy="0" r="4" fill="white" className="animate-ping"/>
      
      {/* Signal particles */}
      <circle cx="-20" cy="-15" r="1" fill="rgba(255,255,255,0.8)" className="animate-ping" />
      <circle cx="18" cy="-12" r="1.2" fill="rgba(255,255,255,0.6)" className="animate-ping" style={{ animationDelay: '0.3s' }} />
      <circle cx="-15" cy="20" r="0.8" fill="rgba(255,255,255,0.7)" className="animate-ping" style={{ animationDelay: '0.6s' }} />
      <circle cx="22" cy="8" r="1" fill="rgba(255,255,255,0.9)" className="animate-ping" style={{ animationDelay: '0.9s' }} />
    </g>
    
    {/* Shine effect */}
    <rect x="20" y="0" width="30" height="100" rx="24" fill="url(#ultraInternetShine)" opacity="0.4" className="animate-pulse"/>
    
    {/* Border highlight */}
    <rect width="100" height="100" rx="24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
  </svg>
);

const UltraPremiumInsuranceSVG = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ultraInsuranceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#32CD32" />
        <stop offset="25%" stopColor="#2ECC71" />
        <stop offset="50%" stopColor="#228B22" />
        <stop offset="75%" stopColor="#27AE60" />
        <stop offset="100%" stopColor="#006400" />
      </linearGradient>
      <filter id="insuranceGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <linearGradient id="ultraInsuranceShine" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="rgba(255,255,255,0)" />
        <stop offset="50%" stopColor="rgba(255,255,255,0.7)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
      </linearGradient>
    </defs>
    
    {/* Main container */}
    <rect width="100" height="100" rx="24" fill="url(#ultraInsuranceGradient)" filter="url(#insuranceGlow)"/>
    
    {/* Shield with premium effects */}
    <g transform="translate(50,50)">
      <path d="M0,-25 L20,-15 L20,10 Q20,25 0,30 Q-20,25 -20,10 L-20,-15 Z" 
            fill="white" 
            stroke="rgba(255,255,255,0.6)" 
            strokeWidth="0.5"/>
      
      {/* Checkmark */}
      <path d="M-8,0 L-2,6 L12,-8" 
            stroke="url(#ultraInsuranceGradient)" 
            strokeWidth="3" 
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"/>
      
      {/* Protection particles */}
      <circle cx="-25" cy="-10" r="1" fill="rgba(255,255,255,0.8)" className="animate-ping" />
      <circle cx="25" cy="-5" r="1.2" fill="rgba(255,255,255,0.6)" className="animate-ping" style={{ animationDelay: '0.4s' }} />
      <circle cx="-18" cy="20" r="0.8" fill="rgba(255,255,255,0.7)" className="animate-ping" style={{ animationDelay: '0.8s' }} />
      <circle cx="22" cy="15" r="1" fill="rgba(255,255,255,0.9)" className="animate-ping" style={{ animationDelay: '1.2s' }} />
    </g>
    
    {/* Shine effect */}
    <rect x="15" y="0" width="35" height="100" rx="24" fill="url(#ultraInsuranceShine)" opacity="0.4" className="animate-pulse"/>
    
    {/* Border highlight */}
    <rect width="100" height="100" rx="24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
  </svg>
);

const UltraPremiumCreditCardSVG = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ultraCreditGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF69B4" />
        <stop offset="25%" stopColor="#FF1493" />
        <stop offset="50%" stopColor="#DC143C" />
        <stop offset="75%" stopColor="#B91372" />
        <stop offset="100%" stopColor="#8B008B" />
      </linearGradient>
      <filter id="creditGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <linearGradient id="ultraCreditShine" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="rgba(255,255,255,0)" />
        <stop offset="50%" stopColor="rgba(255,255,255,0.8)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
      </linearGradient>
    </defs>
    
    {/* Main container */}
    <rect width="100" height="100" rx="24" fill="url(#ultraCreditGradient)" filter="url(#creditGlow)"/>
    
    {/* Credit card with premium effects */}
    <g transform="translate(50,50)">
      <rect x="-25" y="-15" width="50" height="30" rx="6" fill="white" stroke="rgba(255,255,255,0.8)" strokeWidth="0.5"/>
      
      {/* Magnetic stripe */}
      <rect x="-25" y="-5" width="50" height="5" fill="url(#ultraCreditGradient)" opacity="0.8"/>
      
      {/* EMV chip */}
      <rect x="8" y="2" width="8" height="6" rx="1" fill="url(#ultraCreditGradient)" opacity="0.9"/>
      <rect x="9" y="3" width="6" height="4" rx="0.5" fill="rgba(255,215,0,0.8)"/>
      
      {/* Card number dots */}
      <circle cx="-18" cy="8" r="1" fill="url(#ultraCreditGradient)" opacity="0.6"/>
      <circle cx="-14" cy="8" r="1" fill="url(#ultraCreditGradient)" opacity="0.6"/>
      <circle cx="-10" cy="8" r="1" fill="url(#ultraCreditGradient)" opacity="0.6"/>
      <circle cx="-6" cy="8" r="1" fill="url(#ultraCreditGradient)" opacity="0.6"/>
      
      {/* Contactless symbol */}
      <g transform="translate(-20,-8) scale(0.6)">
        <path d="M0,0 Q8,-4 8,4 Q8,12 0,8" stroke="url(#ultraCreditGradient)" strokeWidth="1.5" fill="none"/>
        <path d="M3,2 Q6,1 6,5 Q6,9 3,6" stroke="url(#ultraCreditGradient)" strokeWidth="1.5" fill="none"/>
      </g>
      
      {/* Security particles */}
      <circle cx="-30" cy="-20" r="1" fill="rgba(255,255,255,0.8)" className="animate-ping" />
      <circle cx="30" cy="-18" r="1.2" fill="rgba(255,255,255,0.6)" className="animate-ping" style={{ animationDelay: '0.3s' }} />
      <circle cx="-25" cy="25" r="0.8" fill="rgba(255,255,255,0.7)" className="animate-ping" style={{ animationDelay: '0.6s' }} />
    </g>
    
    {/* Shine effect */}
    <rect x="10" y="0" width="40" height="100" rx="24" fill="url(#ultraCreditShine)" opacity="0.4" className="animate-pulse"/>
    
    {/* Border highlight */}
    <rect width="100" height="100" rx="24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
  </svg>
);

const UltraPremiumGasSVG = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ultraGasGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF6B6B" />
        <stop offset="25%" stopColor="#FF5757" />
        <stop offset="50%" stopColor="#EE5A52" />
        <stop offset="75%" stopColor="#E55039" />
        <stop offset="100%" stopColor="#C44569" />
      </linearGradient>
      <filter id="gasGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <linearGradient id="ultraGasShine" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="rgba(255,255,255,0)" />
        <stop offset="50%" stopColor="rgba(255,255,255,0.6)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
      </linearGradient>
    </defs>
    
    {/* Main container */}
    <rect width="100" height="100" rx="24" fill="url(#ultraGasGradient)" filter="url(#gasGlow)"/>
    
    {/* Gas flame with premium effects */}
    <g transform="translate(50,50)">
      {/* Flame base */}
      <path d="M-8,10 Q-12,5 -10,-5 Q-8,-15 0,-18 Q8,-15 10,-5 Q12,5 8,10 Q0,15 -8,10" 
            fill="white" 
            stroke="rgba(255,255,255,0.6)" 
            strokeWidth="0.5"/>
      
      {/* Inner flame */}
      <path d="M-4,8 Q-6,3 -5,-3 Q-4,-8 0,-10 Q4,-8 5,-3 Q6,3 4,8 Q0,10 -4,8" 
            fill="rgba(255,100,100,0.3)" 
            opacity="0.7"/>
      
      {/* Gas particles */}
      <circle cx="-15" cy="-8" r="1" fill="rgba(255,255,255,0.8)" className="animate-ping" />
      <circle cx="12" cy="-12" r="1.2" fill="rgba(255,255,255,0.6)" className="animate-ping" style={{ animationDelay: '0.4s' }} />
      <circle cx="-10" cy="18" r="0.8" fill="rgba(255,255,255,0.7)" className="animate-ping" style={{ animationDelay: '0.8s' }} />
      
      {/* Heat waves */}
      <path d="M-20,-25 Q-18,-20 -20,-15 Q-22,-10 -20,-5" 
            stroke="rgba(255,255,255,0.4)" 
            strokeWidth="1" 
            fill="none" 
            className="animate-pulse"/>
      <path d="M20,-25 Q22,-20 20,-15 Q18,-10 20,-5" 
            stroke="rgba(255,255,255,0.4)" 
            strokeWidth="1" 
            fill="none" 
            className="animate-pulse" 
            style={{ animationDelay: '0.5s' }}/>
    </g>
    
    {/* Shine effect */}
    <rect x="25" y="0" width="20" height="100" rx="24" fill="url(#ultraGasShine)" opacity="0.4" className="animate-pulse"/>
    
    {/* Border highlight */}
    <rect width="100" height="100" rx="24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
  </svg>
);



export default function Bills() {
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedProvider, setSelectedProvider] = useState<string>("");
  const [consumerNumber, setConsumerNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [billDetails, setBillDetails] = useState<any>(null);
  const [showBillDetails, setShowBillDetails] = useState(false);
  const { toast } = useToast();

  // Bill Categories
  const billCategories = [
    {
      id: "electricity",
      name: "Electricity",
      icon: UltraPremiumElectricitySVG,
      color: "#FFD700",
      gradient: "linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)",
      providers: [
        { id: "bses", name: "BSES Delhi", quickAmounts: [500, 1000, 1500, 2000] },
        { id: "tata", name: "Tata Power", quickAmounts: [600, 1200, 1800, 2400] },
        { id: "adani", name: "Adani Electricity", quickAmounts: [550, 1100, 1650, 2200] },
        { id: "mseb", name: "MSEB Maharashtra", quickAmounts: [400, 800, 1200, 1600] }
      ]
    },
    {
      id: "water",
      name: "Water",
      icon: UltraPremiumWaterSVG,
      color: "#00BFFF",
      gradient: "linear-gradient(135deg, #00BFFF 0%, #0066CC 100%)",
      providers: [
        { id: "djb", name: "Delhi Jal Board", quickAmounts: [200, 400, 600, 800] },
        { id: "bmc", name: "BMC Mumbai", quickAmounts: [250, 500, 750, 1000] },
        { id: "bwssb", name: "BWSSB Bangalore", quickAmounts: [300, 600, 900, 1200] }
      ]
    },
    {
      id: "gas",
      name: "Gas",
      icon: UltraPremiumGasSVG,
      color: "#FF6B6B",
      gradient: "linear-gradient(135deg, #FF6B6B 0%, #E74C3C 100%)",
      providers: [
        { id: "indane", name: "Indane Gas", quickAmounts: [900, 1000, 1100, 1200] },
        { id: "hp", name: "HP Gas", quickAmounts: [850, 950, 1050, 1150] },
        { id: "bharat", name: "Bharat Gas", quickAmounts: [880, 980, 1080, 1180] }
      ]
    },
    {
      id: "internet",
      name: "Internet",
      icon: UltraPremiumInternetSVG,
      color: "#8A2BE2",
      gradient: "linear-gradient(135deg, #8A2BE2 0%, #4B0082 100%)",
      providers: [
        { id: "jio", name: "JioFiber", quickAmounts: [399, 699, 999, 1499] },
        { id: "airtel", name: "Airtel Xstream", quickAmounts: [499, 899, 1299, 1799] },
        { id: "bsnl", name: "BSNL Broadband", quickAmounts: [329, 599, 999, 1299] }
      ]
    },
    {
      id: "insurance",
      name: "Insurance",
      icon: UltraPremiumInsuranceSVG,
      color: "#32CD32",
      gradient: "linear-gradient(135deg, #32CD32 0%, #006400 100%)",
      providers: [
        { id: "lic", name: "LIC Premium", quickAmounts: [5000, 10000, 15000, 25000] },
        { id: "icici", name: "ICICI Lombard", quickAmounts: [3000, 8000, 12000, 20000] },
        { id: "hdfc", name: "HDFC Life", quickAmounts: [4000, 9000, 14000, 22000] }
      ]
    },
    {
      id: "credit",
      name: "Credit Card",
      icon: UltraPremiumCreditCardSVG,
      color: "#FF69B4",
      gradient: "linear-gradient(135deg, #FF69B4 0%, #DC143C 100%)",
      providers: [
        { id: "hdfc", name: "HDFC Credit Card", quickAmounts: [2000, 5000, 10000, 15000] },
        { id: "icici", name: "ICICI Credit Card", quickAmounts: [3000, 6000, 12000, 18000] },
        { id: "sbi", name: "SBI Credit Card", quickAmounts: [2500, 5500, 11000, 16000] }
      ]
    }
  ];

  // Sample Bill Details
  const sampleBillDetails = {
    consumerName: "Rajesh Kumar",
    consumerNumber: "1234567890",
    billingPeriod: "Oct 2024",
    dueDate: "Nov 15, 2024",
    currentCharges: 1245.50,
    previousDue: 0,
    totalAmount: 1245.50,
    units: "450 kWh",
    status: "pending"
  };

  // Bill Payment Mutation
  const billPaymentMutation = useMutation({
    mutationFn: async (paymentData: any) => {
      const response = await fetch('/api/bills/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData),
      });
      if (!response.ok) throw new Error('Payment failed');
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Bill Payment Successful!",
        description: "Your bill has been paid successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/user/balance'] });
      setLocation('/dashboard');
    },
    onError: (error: any) => {
      toast({
        title: "Payment Failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleCategorySelect = (category: any) => {
    setSelectedCategory(category.id);
    setSelectedProvider("");
    setShowBillDetails(false);
  };

  const handleProviderSelect = (provider: any) => {
    setSelectedProvider(provider.id);
    setShowBillDetails(false);
  };

  const handleFetchBill = () => {
    if (!consumerNumber || consumerNumber.length < 8) {
      toast({
        title: "Invalid Number",
        description: "Please enter a valid consumer number.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would fetch actual bill details
    setBillDetails(sampleBillDetails);
    setAmount(sampleBillDetails.totalAmount.toString());
    setShowBillDetails(true);
  };

  const handlePayment = () => {
    if (!selectedCategory || !selectedProvider || !consumerNumber || !amount) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields.",
        variant: "destructive",
      });
      return;
    }

    const category = billCategories.find(c => c.id === selectedCategory);
    const provider = category?.providers.find(p => p.id === selectedProvider);
    
    billPaymentMutation.mutate({
      category: category?.name,
      provider: provider?.name,
      consumerNumber,
      amount: parseFloat(amount),
      billDetails,
      type: 'bill_payment'
    });
  };

  const selectedCategoryData = billCategories.find(c => c.id === selectedCategory);
  const selectedProviderData = selectedCategoryData?.providers.find(p => p.id === selectedProvider);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Ultra-Premium Ambient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-blue-900/20" />
        
        {/* Floating Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse opacity-40" />
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl animate-pulse opacity-30" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-indigo-500/8 rounded-full blur-3xl animate-pulse opacity-25" style={{ animationDelay: '4s' }} />
        
        {/* Geometric Patterns */}
        <div className="absolute top-20 right-20 w-32 h-32 border border-white/5 rounded-lg rotate-45 animate-spin opacity-20" style={{ animationDuration: '20s' }} />
        <div className="absolute bottom-32 left-16 w-24 h-24 border border-purple-500/10 rounded-full animate-ping opacity-30" style={{ animationDuration: '3s' }} />
        
        {/* Premium Particles */}
        <div className="absolute top-10 left-10 w-2 h-2 bg-white/20 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
        <div className="absolute top-40 right-40 w-1 h-1 bg-purple-400/30 rounded-full animate-ping" style={{ animationDelay: '3s' }} />
        <div className="absolute bottom-20 left-1/3 w-1.5 h-1.5 bg-blue-400/25 rounded-full animate-ping" style={{ animationDelay: '5s' }} />
      </div>

      {/* Header */}
      <div className="relative flex items-center justify-between p-6 bg-gradient-to-r from-black/80 via-gray-900/60 to-black/80 backdrop-blur-sm border-b border-white/10 z-10">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10"
          onClick={() => setLocation('/dashboard')}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        
        <div className="text-center">
          <h1 className="text-xl font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
            Pay Bills
          </h1>
          <p className="text-sm text-gray-400">Instant bill payments</p>
        </div>

        <div className="w-10" />
      </div>

      <div className="relative p-6 space-y-6 z-10">
        {/* Bill Categories */}
        <Card className="apple-pay-card border-0 backdrop-blur-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-3">
                <CreditCard className="h-4 w-4 text-white" />
              </div>
              Select Bill Category
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {billCategories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => handleCategorySelect(category)}
                  className={`relative group cursor-pointer transition-all duration-500 hover:scale-105 ${
                    selectedCategory === category.id ? 'scale-105' : ''
                  }`}
                >
                  {/* Glow Effect */}
                  <div 
                    className={`absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-all duration-500 ${
                      selectedCategory === category.id ? 'opacity-80' : ''
                    }`}
                    style={{ background: category.gradient }}
                  />
                  
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  
                  <Card
                    className={`relative border-0 overflow-hidden transition-all duration-500 hover:shadow-2xl ${
                      selectedCategory === category.id ? 'ring-2 ring-white/30 shadow-2xl' : 'hover:ring-1 hover:ring-white/20'
                    }`}
                    style={{
                      background: `linear-gradient(145deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05)), ${category.gradient}`,
                      backdropFilter: 'blur(20px)'
                    }}
                  >
                    <CardContent className="p-4 text-center">
                      <category.icon className="mx-auto mb-3" />
                      <h4 className="font-semibold text-white text-sm">{category.name}</h4>
                      {selectedCategory === category.id && (
                        <Check className="h-4 w-4 text-white mx-auto mt-2" />
                      )}
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Providers */}
        {selectedCategoryData && (
          <Card className="apple-pay-card border-0 backdrop-blur-sm animate-in slide-in-from-bottom duration-500">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center mr-3">
                  <Smartphone className="h-4 w-4 text-white" />
                </div>
                Select Provider
              </h3>
              
              <div className="space-y-3">
                {selectedCategoryData.providers.map((provider, index) => (
                  <div
                    key={provider.id}
                    onClick={() => handleProviderSelect(provider)}
                    className={`relative group cursor-pointer transition-all duration-500 hover:scale-105 ${
                      selectedProvider === provider.id ? 'scale-105' : ''
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Glow Effect */}
                    <div 
                      className={`absolute inset-0 rounded-2xl blur-lg opacity-0 group-hover:opacity-40 transition-all duration-500 ${
                        selectedProvider === provider.id ? 'opacity-60' : ''
                      }`}
                      style={{ background: selectedCategoryData.gradient }}
                    />
                    
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    
                    <Card
                      className={`relative border-0 transition-all duration-500 hover:shadow-xl ${
                        selectedProvider === provider.id ? 'ring-2 ring-white/30 shadow-xl' : 'hover:ring-1 hover:ring-white/20'
                      }`}
                      style={{
                        background: 'linear-gradient(145deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06))',
                        backdropFilter: 'blur(24px)'
                      }}
                    >
                      <CardContent className="p-4 flex items-center justify-between">
                        <h4 className="font-semibold text-white">{provider.name}</h4>
                        {selectedProvider === provider.id && (
                          <Check className="h-5 w-5 text-green-400" />
                        )}
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Consumer Number Input */}
        {selectedProvider && (
          <Card className="apple-pay-card border-0">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Consumer Number
              </h3>
              
              <Input
                type="text"
                placeholder="Enter consumer/account number"
                value={consumerNumber}
                onChange={(e) => setConsumerNumber(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-14 text-lg rounded-xl"
              />
              
              <Button
                onClick={handleFetchBill}
                className="w-full mt-4 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                disabled={!consumerNumber || consumerNumber.length < 8}
              >
                Fetch Bill Details
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Bill Details */}
        {showBillDetails && billDetails && (
          <Card className="apple-pay-card border-0">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Check className="h-5 w-5 mr-2 text-green-400" />
                Bill Details
              </h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Consumer Name:</span>
                  <span className="text-white font-medium">{billDetails.consumerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Billing Period:</span>
                  <span className="text-white">{billDetails.billingPeriod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Due Date:</span>
                  <span className="text-white">{billDetails.dueDate}</span>
                </div>
                {billDetails.units && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Units Consumed:</span>
                    <span className="text-white">{billDetails.units}</span>
                  </div>
                )}
                <div className="border-t border-white/10 pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total Amount:</span>
                    <span className="text-2xl font-bold text-white">₹{billDetails.totalAmount}</span>
                  </div>
                </div>
              </div>

              {/* Quick Amount Buttons */}
              {selectedProviderData && (
                <div className="grid grid-cols-4 gap-3 mb-6">
                  {selectedProviderData.quickAmounts.map((quickAmount) => (
                    <Button
                      key={quickAmount}
                      onClick={() => setAmount(quickAmount.toString())}
                      className={`h-12 rounded-xl ${
                        amount === quickAmount.toString() 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                          : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                      }`}
                    >
                      ₹{quickAmount}
                    </Button>
                  ))}
                </div>
              )}

              <Button
                onClick={handlePayment}
                disabled={!amount || billPaymentMutation.isPending}
                className="w-full h-14 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold text-lg"
              >
                {billPaymentMutation.isPending ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </div>
                ) : (
                  `Pay ₹${amount || 0}`
                )}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <BottomNavigation activeTab="dashboard" />
    </div>
  );
}