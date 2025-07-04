import { useState, useCallback } from "react";
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
import { ErrorHandler, ErrorCode, useErrorHandler } from "@/lib/errorHandler";
import { LoadingWithError, InlineError } from "@/components/ErrorBoundary";
import { ArrowLeft, Check, WifiOff, CreditCard, AlertTriangle } from "lucide-react";

export default function PaymentScreen() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { createError, getUserFriendlyMessage, getRetryStrategy } = useErrorHandler();
  const [amount, setAmount] = useState("450");
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("offline");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [paymentError, setPaymentError] = useState<any>(null);

  const processPaymentMutation = useMutation({
    mutationFn: async (paymentData: any) => {
      try {
        setPaymentError(null);
        const response = await apiRequest("POST", "/api/payments/process", paymentData, {
          timeout: 15000,
          context: { 
            action: 'payment_processing',
            amount: paymentData.amount,
            method: paymentData.method 
          }
        });
        return response;
      } catch (error: any) {
        // Enhanced error handling for payments
        if (error?.code === ErrorCode.INSUFFICIENT_FUNDS) {
          throw createError(
            ErrorCode.INSUFFICIENT_FUNDS,
            'Insufficient balance for this transaction',
            error,
            { context: 'payment_processing', amount: paymentData.amount }
          );
        } else if (error?.code === ErrorCode.MERCHANT_ERROR) {
          throw createError(
            ErrorCode.MERCHANT_ERROR,
            'Merchant is currently unavailable',
            error,
            { context: 'payment_processing' }
          );
        } else if (error?.code === ErrorCode.NETWORK_ERROR) {
          throw createError(
            ErrorCode.NETWORK_ERROR,
            'Connection failed. Please check your internet and try again',
            error,
            { context: 'payment_processing' }
          );
        } else {
          throw createError(
            ErrorCode.PAYMENT_ERROR,
            'Payment processing failed. Please try again',
            error,
            { context: 'payment_processing' }
          );
        }
      }
    },
    onSuccess: () => {
      setShowPaymentModal(true);
      setPaymentError(null);
      
      toast({
        title: "Payment Successful",
        description: `₹${amount} paid successfully`,
        variant: "default",
      });
    },
    onError: (error: any) => {
      setPaymentError(error);
      const friendlyMessage = getUserFriendlyMessage(error);
      
      toast({
        title: "Payment Failed",
        description: friendlyMessage,
        variant: "destructive",
      });

      // Log error for monitoring
      console.error('Payment processing failed:', {
        error,
        amount,
        paymentMethod,
        timestamp: new Date().toISOString()
      });
    },
    retry: (failureCount, error: any) => {
      const strategy = getRetryStrategy(error);
      return strategy.canRetry && failureCount < (strategy.maxRetries || 1);
    },
    retryDelay: (attemptIndex) => {
      return Math.min(1000 * Math.pow(2, attemptIndex), 5000);
    }
  });

  const handleBack = useCallback(() => {
    try {
      setLocation("/qr-scanner");
    } catch (error) {
      createError(
        ErrorCode.UNKNOWN_ERROR,
        'Navigation failed',
        error,
        { context: 'payment_screen_navigation' }
      );
    }
  }, [setLocation, createError]);

  const validatePaymentInput = useCallback(() => {
    const errors: string[] = [];
    const paymentAmount = parseFloat(amount);

    // Amount validation
    if (!amount || amount.trim() === '') {
      errors.push('Please enter an amount');
    } else if (isNaN(paymentAmount) || paymentAmount <= 0) {
      errors.push('Please enter a valid amount greater than 0');
    } else if (paymentAmount > 100000) {
      errors.push('Maximum payment amount is ₹1,00,000');
    } else if (paymentAmount < 1) {
      errors.push('Minimum payment amount is ₹1');
    }

    // Note validation (optional but if provided, should be reasonable)
    if (note && note.length > 100) {
      errors.push('Payment note cannot exceed 100 characters');
    }

    // Payment method validation
    if (!['online', 'offline'].includes(paymentMethod)) {
      errors.push('Please select a valid payment method');
    }

    // Offline payment specific validations
    if (paymentMethod === 'offline' && !navigator.onLine) {
      // This is actually okay for offline payments
    }

    setValidationErrors(errors);
    return errors.length === 0;
  }, [amount, note, paymentMethod]);

  const handleProcessPayment = useCallback(() => {
    try {
      // Clear previous errors
      setPaymentError(null);
      setValidationErrors([]);

      // Validate input
      if (!validatePaymentInput()) {
        createError(
          ErrorCode.VALIDATION_ERROR,
          'Please correct the validation errors',
          { validationErrors },
          { context: 'payment_validation' }
        );
        return;
      }

      const paymentAmount = parseFloat(amount);

      // Additional runtime checks
      if (!navigator.onLine && paymentMethod === 'online') {
        createError(
          ErrorCode.OFFLINE_ERROR,
          'Cannot process online payment while offline. Please use offline payment.',
          null,
          { context: 'payment_offline_check' }
        );
        return;
      }

      processPaymentMutation.mutate({
        merchantName: "Tech Store",
        amount: paymentAmount,
        note: note.trim(),
        isOffline: paymentMethod === "offline",
        timestamp: new Date().toISOString(),
        sessionId: `payment_${Date.now()}`
      });
    } catch (error) {
      createError(
        ErrorCode.UNKNOWN_ERROR,
        'Failed to initiate payment',
        error,
        { context: 'payment_initiation' }
      );
    }
  }, [amount, note, paymentMethod, validatePaymentInput, validationErrors, processPaymentMutation, createError]);

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
