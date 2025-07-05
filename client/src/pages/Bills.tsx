import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Zap, Droplets, Wifi, Car, Phone, Building, Check, Clock, AlertCircle, CreditCard } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { BottomNavigation } from "@/components/BottomNavigation";
import { ApplePayContactlessSVG, ApplePaySecuritySVG, ApplePaySuccessSVG } from "@/components/ApplePaySVGs";

// Utility Company SVG Components
const ElectricitySVG = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="electricityGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="50%" stopColor="#FFA500" />
        <stop offset="100%" stopColor="#FF8C00" />
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="16" fill="url(#electricityGradient)" />
    <path d="M32 12 L20 32 L28 32 L24 52 L36 32 L28 32 L32 12 Z" fill="white" />
    <text x="32" y="8" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">POWER</text>
  </svg>
);

const WaterSVG = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="waterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00BFFF" />
        <stop offset="50%" stopColor="#1E90FF" />
        <stop offset="100%" stopColor="#0066CC" />
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="16" fill="url(#waterGradient)" />
    <path d="M32 12 Q40 20 40 32 Q40 44 32 52 Q24 44 24 32 Q24 20 32 12" fill="white" />
    <circle cx="32" cy="28" r="3" fill="url(#waterGradient)" opacity="0.7" />
  </svg>
);

const GasSVG = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gasGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF6B6B" />
        <stop offset="50%" stopColor="#EE5A52" />
        <stop offset="100%" stopColor="#E74C3C" />
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="16" fill="url(#gasGradient)" />
    <circle cx="32" cy="32" r="16" fill="white" opacity="0.9" />
    <path d="M24 24 L40 24 L40 40 L24 40 Z" fill="url(#gasGradient)" />
    <circle cx="28" cy="28" r="2" fill="white" />
    <circle cx="36" cy="28" r="2" fill="white" />
    <circle cx="28" cy="36" r="2" fill="white" />
    <circle cx="36" cy="36" r="2" fill="white" />
  </svg>
);

const InternetSVG = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="internetGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8A2BE2" />
        <stop offset="50%" stopColor="#6A0DAD" />
        <stop offset="100%" stopColor="#4B0082" />
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="16" fill="url(#internetGradient)" />
    <circle cx="32" cy="32" r="18" stroke="white" strokeWidth="3" fill="none" />
    <circle cx="32" cy="32" r="12" stroke="white" strokeWidth="2" fill="none" />
    <circle cx="32" cy="32" r="6" stroke="white" strokeWidth="2" fill="none" />
    <circle cx="32" cy="32" r="2" fill="white" />
  </svg>
);

const InsuranceSVG = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="insuranceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#32CD32" />
        <stop offset="50%" stopColor="#228B22" />
        <stop offset="100%" stopColor="#006400" />
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="16" fill="url(#insuranceGradient)" />
    <path d="M32 12 L44 20 L44 36 Q44 48 32 52 Q20 48 20 36 L20 20 Z" fill="white" />
    <path d="M28 32 L30 34 L36 28" stroke="url(#insuranceGradient)" strokeWidth="3" fill="none" />
  </svg>
);

const CreditCardSVG = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="creditGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF69B4" />
        <stop offset="50%" stopColor="#FF1493" />
        <stop offset="100%" stopColor="#DC143C" />
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="16" fill="url(#creditGradient)" />
    <rect x="8" y="20" width="48" height="24" rx="6" fill="white" />
    <rect x="8" y="26" width="48" height="4" fill="url(#creditGradient)" />
    <rect x="40" y="34" width="12" height="3" fill="url(#creditGradient)" />
    <rect x="40" y="38" width="8" height="2" fill="url(#creditGradient)" />
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
      icon: ElectricitySVG,
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
      icon: WaterSVG,
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
      icon: GasSVG,
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
      icon: InternetSVG,
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
      icon: InsuranceSVG,
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
      icon: CreditCardSVG,
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
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-gradient-to-r from-black via-gray-900 to-black">
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

      <div className="p-6 space-y-6">
        {/* Bill Categories */}
        <Card className="apple-pay-card border-0">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Building className="h-5 w-5 mr-2" />
              Select Bill Category
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {billCategories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => handleCategorySelect(category)}
                  className={`relative group cursor-pointer transition-all duration-300 ${
                    selectedCategory === category.id ? 'scale-105' : ''
                  }`}
                >
                  <div 
                    className={`absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300 ${
                      selectedCategory === category.id ? 'opacity-60' : ''
                    }`}
                    style={{ background: category.gradient }}
                  />
                  
                  <Card
                    className={`relative border-0 overflow-hidden transition-all duration-300 ${
                      selectedCategory === category.id ? 'ring-2 ring-white/20' : ''
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
          <Card className="apple-pay-card border-0">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Building className="h-5 w-5 mr-2" />
                Select Provider
              </h3>
              
              <div className="space-y-3">
                {selectedCategoryData.providers.map((provider) => (
                  <div
                    key={provider.id}
                    onClick={() => handleProviderSelect(provider)}
                    className={`cursor-pointer transition-all duration-300 ${
                      selectedProvider === provider.id ? 'scale-105' : ''
                    }`}
                  >
                    <Card
                      className={`border-0 transition-all duration-300 ${
                        selectedProvider === provider.id ? 'ring-2 ring-blue-400' : ''
                      }`}
                      style={{
                        background: 'linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                        backdropFilter: 'blur(20px)'
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