import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { PaymentModal } from "@/components/PaymentModal";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { ArrowLeft, Check, WifiOff, CreditCard } from "lucide-react";

export default function PaymentScreen() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [amount, setAmount] = useState("450");
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("offline");
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const processPaymentMutation = useMutation({
    mutationFn: async (paymentData: any) => {
      return await apiRequest("POST", "/api/payments/process", paymentData);
    },
    onSuccess: () => {
      setShowPaymentModal(true);
    },
    onError: (error) => {
      toast({
        title: "Payment Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleBack = () => {
    setLocation("/qr-scanner");
  };

  const handleProcessPayment = () => {
    const paymentAmount = parseFloat(amount);
    if (paymentAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    processPaymentMutation.mutate({
      merchantName: "Tech Store",
      amount: paymentAmount,
      note,
      isOffline: paymentMethod === "offline",
    });
  };

  const addQuickAmount = (quickAmount: number) => {
    const currentAmount = parseFloat(amount) || 0;
    setAmount((currentAmount + quickAmount).toString());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header with gradient */}
      <div className="phonepe-gradient px-6 py-6 text-white relative">
        <div className="flex items-center justify-between mb-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleBack}
            className="w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div className="text-center">
            <h2 className="font-bold text-xl">Payment</h2>
            <p className="text-white/80 text-sm">Review and confirm</p>
          </div>
          <div className="w-12"></div>
        </div>
      </div>
      
      <div className="px-6 -mt-2 pb-8">
        {/* Enhanced Merchant Card */}
        <Card className="shadow-2xl mb-8 border-none card-hover">
          <CardContent className="p-8">
            <div className="flex items-center gap-6 mb-6">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop"
                  alt="Tech Store" 
                  className="w-20 h-20 rounded-2xl object-cover shadow-lg"
                />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <Check className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-bold text-2xl text-gray-900">Tech Store</h3>
                  <Badge className="bg-green-50 text-green-700 border-green-200 px-3 py-1 font-semibold">
                    Verified
                  </Badge>
                </div>
                <p className="text-gray-600 text-lg mb-1">Electronics & Gadgets</p>
                <p className="text-gray-500">📍 Connaught Place, Delhi</p>
              </div>
            </div>
          </CardContent>
        </Card>
      
        {/* Enhanced Amount Input */}
        <Card className="shadow-xl mb-8 border-none card-hover">
          <CardContent className="p-8">
            <Label className="block text-gray-900 font-bold mb-6 text-xl">Enter Amount</Label>
            <div className="relative mb-8">
              <span className="absolute left-6 top-1/2 transform -translate-y-1/2 text-4xl font-bold text-purple-600">₹</span>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-16 pr-6 py-8 text-5xl font-bold border-2 border-gray-200 rounded-2xl input-enhanced focus:border-purple-500 text-center bg-gray-50"
                placeholder="0"
              />
            </div>
            
            {/* Enhanced Quick Amount Buttons */}
            <div className="grid grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                onClick={() => addQuickAmount(100)}
                className="btn-press-effect py-4 rounded-2xl border-2 border-purple-200 text-purple-700 hover:bg-purple-50 font-semibold text-lg"
              >
                +₹100
              </Button>
              <Button 
                variant="outline" 
                onClick={() => addQuickAmount(500)}
                className="btn-press-effect py-4 rounded-2xl border-2 border-purple-200 text-purple-700 hover:bg-purple-50 font-semibold text-lg"
              >
                +₹500
              </Button>
              <Button 
                variant="outline" 
                onClick={() => addQuickAmount(1000)}
                className="btn-press-effect py-4 rounded-2xl border-2 border-purple-200 text-purple-700 hover:bg-purple-50 font-semibold text-lg"
              >
                +₹1000
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Enhanced Payment Note */}
        <Card className="shadow-xl mb-8 border-none card-hover">
          <CardContent className="p-8">
            <Label className="block text-gray-900 font-bold mb-4 text-lg">Add a note (optional)</Label>
            <Input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What's this payment for?"
              className="input-enhanced text-lg py-4 px-6 rounded-2xl"
            />
          </CardContent>
        </Card>
        
        {/* Enhanced Payment Method */}
        <Card className="shadow-xl mb-10 border-none card-hover">
          <CardContent className="p-8">
            <Label className="block text-gray-900 font-bold mb-6 text-lg">Choose Payment Method</Label>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="space-y-4">
                <Label className={`flex items-center gap-4 p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${
                  paymentMethod === "offline" 
                    ? "border-purple-500 bg-purple-50 shadow-lg transform scale-[1.02]" 
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}>
                  <RadioGroupItem value="offline" className="w-6 h-6" />
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
                      <WifiOff className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-xl text-gray-900">OPPB Offline Payment</p>
                      <p className="text-gray-600 text-lg">Pay without internet connection</p>
                      <p className="text-purple-600 text-sm font-medium">✨ Recommended</p>
                    </div>
                  </div>
                </Label>
                
                <Label className={`flex items-center gap-4 p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${
                  paymentMethod === "online" 
                    ? "border-blue-500 bg-blue-50 shadow-lg transform scale-[1.02]" 
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}>
                  <RadioGroupItem value="online" className="w-6 h-6" />
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-xl text-gray-900">UPI Payment</p>
                      <p className="text-gray-600 text-lg">Pay using UPI network</p>
                      <p className="text-blue-600 text-sm font-medium">🌐 Requires internet</p>
                    </div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
        
        {/* Enhanced Pay Button */}
        <Button 
          onClick={handleProcessPayment}
          disabled={processPaymentMutation.isPending || !amount || parseFloat(amount) <= 0}
          className="w-full phonepe-gradient text-white py-6 rounded-2xl font-bold text-2xl hover:opacity-90 transition-all duration-300 btn-press-effect shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed mb-8"
        >
          {processPaymentMutation.isPending ? (
            <div className="flex items-center gap-3 justify-center">
              <div className="spinner w-6 h-6 border-2 border-white/30 border-t-white"></div>
              <span>Processing Payment...</span>
            </div>
          ) : (
            <div className="flex items-center gap-3 justify-center">
              <span>Pay ₹{amount || '0'}</span>
              {paymentMethod === "offline" && <WifiOff className="w-6 h-6" />}
              {paymentMethod === "online" && <CreditCard className="w-6 h-6" />}
            </div>
          )}
        </Button>
      </div>

      <PaymentModal 
        isOpen={showPaymentModal}
        onClose={() => {
          setShowPaymentModal(false);
          setLocation("/");
        }}
        amount={amount}
        merchantName="Tech Store"
        isOffline={paymentMethod === "offline"}
      />
    </div>
  );
}
