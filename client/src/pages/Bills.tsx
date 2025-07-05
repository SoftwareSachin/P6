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

// Import animated GIF assets
import electricityGif from "@assets/fetchpik.com-iconscout-FZ6hv1bYEM_1751714582814.gif";
import waterGif from "@assets/fetchpik.com-iconscout-19ln0myIkf_1751714737699.gif";
import gasGif from "@assets/fetchpik.com-iconscout-02uV3Iexwc_1751714791611.gif";
import internetGif from "@assets/fetchpik.com-iconscout-JTYtB9K1V5_1751714904995.gif";
import insuranceGif from "@assets/fetchpik.com-iconscout-YjzfiHsFE9_1751714952532.gif";
import creditCardGif from "@assets/fetchpik.com-iconscout-hVBXKMblTj_1751715019536.gif";

// Premium Animated GIF Components
const ElectricityIcon = ({ className = "w-16 h-16" }: { className?: string }) => (
  <img 
    src={electricityGif} 
    alt="Electricity" 
    className={`${className} object-contain drop-shadow-lg`}
  />
);

const WaterIcon = ({ className = "w-16 h-16" }: { className?: string }) => (
  <img 
    src={waterGif} 
    alt="Water" 
    className={`${className} object-contain drop-shadow-lg`}
  />
);

const GasIcon = ({ className = "w-16 h-16" }: { className?: string }) => (
  <img 
    src={gasGif} 
    alt="Gas" 
    className={`${className} object-contain drop-shadow-lg`}
  />
);

const InternetIcon = ({ className = "w-16 h-16" }: { className?: string }) => (
  <img 
    src={internetGif} 
    alt="Internet" 
    className={`${className} object-contain drop-shadow-lg`}
  />
);

const InsuranceIcon = ({ className = "w-16 h-16" }: { className?: string }) => (
  <img 
    src={insuranceGif} 
    alt="Insurance" 
    className={`${className} object-contain drop-shadow-lg`}
  />
);

const CreditCardIcon = ({ className = "w-16 h-16" }: { className?: string }) => (
  <img 
    src={creditCardGif} 
    alt="Credit Card" 
    className={`${className} object-contain drop-shadow-lg`}
  />
);

// Bill Categories with GIF Icons
const billCategories = [
  {
    id: 'electricity',
    name: 'Electricity',
    icon: ElectricityIcon,
    gradient: 'linear-gradient(135deg, #FFD700, #FFA500)',
    providers: [
      { id: 'bescom', name: 'BESCOM', description: 'Bangalore Electricity Supply Company' },
      { id: 'kseb', name: 'KSEB', description: 'Kerala State Electricity Board' },
      { id: 'tneb', name: 'TNEB', description: 'Tamil Nadu Electricity Board' },
      { id: 'msedcl', name: 'MSEDCL', description: 'Maharashtra State Electricity Distribution' }
    ]
  },
  {
    id: 'water',
    name: 'Water',
    icon: WaterIcon,
    gradient: 'linear-gradient(135deg, #00D4FF, #0080FF)',
    providers: [
      { id: 'bwssb', name: 'BWSSB', description: 'Bangalore Water Supply and Sewerage Board' },
      { id: 'kwa', name: 'KWA', description: 'Kerala Water Authority' },
      { id: 'twad', name: 'TWAD', description: 'Tamil Nadu Water and Drainage Board' },
      { id: 'mwd', name: 'MWD', description: 'Maharashtra Water Department' }
    ]
  },
  {
    id: 'gas',
    name: 'Gas',
    icon: GasIcon,
    gradient: 'linear-gradient(135deg, #FF6B6B, #FF4757)',
    providers: [
      { id: 'igl', name: 'IGL', description: 'Indraprastha Gas Limited' },
      { id: 'mgl', name: 'MGL', description: 'Mahanagar Gas Limited' },
      { id: 'adani', name: 'Adani Gas', description: 'Adani Total Gas Limited' },
      { id: 'gail', name: 'GAIL', description: 'Gas Authority of India Limited' }
    ]
  },
  {
    id: 'internet',
    name: 'Internet',
    icon: InternetIcon,
    gradient: 'linear-gradient(135deg, #00D4AA, #00B4D8)',
    providers: [
      { id: 'airtel', name: 'Airtel', description: 'Airtel Broadband' },
      { id: 'jio', name: 'Jio Fiber', description: 'Reliance Jio Fiber' },
      { id: 'bsnl', name: 'BSNL', description: 'Bharat Sanchar Nigam Limited' },
      { id: 'act', name: 'ACT', description: 'ACT Fibernet' }
    ]
  },
  {
    id: 'insurance',
    name: 'Insurance',
    icon: InsuranceIcon,
    gradient: 'linear-gradient(135deg, #A855F7, #7C3AED)',
    providers: [
      { id: 'lic', name: 'LIC', description: 'Life Insurance Corporation of India' },
      { id: 'icici', name: 'ICICI Prudential', description: 'ICICI Prudential Life Insurance' },
      { id: 'hdfc', name: 'HDFC Life', description: 'HDFC Standard Life Insurance' },
      { id: 'sbi', name: 'SBI Life', description: 'SBI Life Insurance' }
    ]
  },
  {
    id: 'credit_card',
    name: 'Credit Card',
    icon: CreditCardIcon,
    gradient: 'linear-gradient(135deg, #FFB800, #FF8C00)',
    providers: [
      { id: 'sbi_card', name: 'SBI Card', description: 'State Bank of India Credit Card' },
      { id: 'hdfc_card', name: 'HDFC Bank', description: 'HDFC Bank Credit Card' },
      { id: 'icici_card', name: 'ICICI Bank', description: 'ICICI Bank Credit Card' },
      { id: 'axis_card', name: 'Axis Bank', description: 'Axis Bank Credit Card' }
    ]
  }
];

export default function Bills() {
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedProvider, setSelectedProvider] = useState<string>("");
  const [consumerNumber, setConsumerNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [billDetails, setBillDetails] = useState<any>(null);
  const [showBillDetails, setShowBillDetails] = useState(false);
  const { toast } = useToast();



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
    
    // Store bill payment details in localStorage to pre-fill Send Money page
    const billPaymentDetails = {
      recipient: provider?.name,
      amount: parseFloat(amount),
      description: `${category?.name} - ${provider?.name} (${consumerNumber})`,
      type: 'bill_payment',
      category: category?.name,
      provider: provider?.name,
      consumerNumber,
      billDetails
    };
    
    localStorage.setItem('billPaymentDetails', JSON.stringify(billPaymentDetails));
    
    // Navigate to Send Money page with pre-filled information
    setLocation('/send');
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

      <div className="relative p-6 space-y-6 z-10 pb-24">
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
              <div className="grid grid-cols-4 gap-3 mb-6">
                {[100, 200, 500, 1000].map((quickAmount) => (
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