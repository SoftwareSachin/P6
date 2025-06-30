import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, X, Lock, Star, MapPin } from "lucide-react";
import { COLORS } from "@/lib/constants";
import { PinEntry } from "./PinEntry";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: string;
  merchantName: string;
  isOffline: boolean;
}

export function PaymentModal({ isOpen, onClose, amount, merchantName, isOffline }: PaymentModalProps) {
  const [step, setStep] = useState(1); // 1: Details, 2: Review, 3: PIN
  const [paymentAmount, setPaymentAmount] = useState(amount);
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("bank");

  const handleAmountChange = (value: string) => {
    // Only allow numbers and decimal point
    const cleanValue = value.replace(/[^0-9.]/g, '');
    setPaymentAmount(cleanValue);
  };

  const handleProceedToReview = () => {
    if (paymentAmount && parseFloat(paymentAmount) > 0) {
      setStep(2);
    }
  };

  const handlePayWithPin = () => {
    setStep(3);
  };

  const handlePinComplete = (pin: string) => {
    // Simulate payment processing
    setTimeout(() => {
      onClose();
      // Show success screen
      alert("Payment Successful!");
    }, 1000);
  };

  // Step 1: Payment Details
  if (step === 1) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle className="text-lg font-semibold">
              Pay to Merchant
            </DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </DialogHeader>

          <div className="space-y-6">
            {/* Merchant Card - Exact Specification */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-xl">🏪</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold" style={{ color: COLORS.textPrimary }}>
                      {merchantName}
                    </h3>
                    <p className="text-sm" style={{ color: COLORS.textSecondary }}>
                      UPI: {merchantName.toLowerCase().replace(/\s+/g, '')}@paytm
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-500">Malviya Nagar, Jaipur</span>
                    </div>
                    <div className="flex items-center space-x-1 mt-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span className="text-xs text-gray-600">4.8 (127 reviews)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Amount Input - Large, Centered */}
            <div className="text-center">
              <label className="block text-sm font-medium mb-2" style={{ color: COLORS.textPrimary }}>
                Enter Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl font-bold">
                  ₹
                </span>
                <Input
                  type="text"
                  value={paymentAmount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  placeholder="0"
                  className="h-16 text-3xl font-bold text-center pl-12 border-2 border-purple-200 focus:border-purple-600"
                />
              </div>

              {/* Smart Suggestions - Quick Chips */}
              <div className="flex justify-center space-x-2 mt-4">
                {[100, 500, 1000, 2000].map((suggestedAmount) => (
                  <Button
                    key={suggestedAmount}
                    variant="outline"
                    size="sm"
                    onClick={() => setPaymentAmount(suggestedAmount.toString())}
                  >
                    ₹{suggestedAmount}
                  </Button>
                ))}
              </div>
            </div>

            {/* Note Field - Optional with Emoji */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: COLORS.textPrimary }}>
                Add Note (Optional)
              </label>
              <Input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="For groceries... 🛒"
                className="h-12"
                maxLength={100}
              />
              <p className="text-xs mt-1 text-right" style={{ color: COLORS.textSecondary }}>
                {note.length}/100
              </p>
            </div>

            {/* Offline Badge */}
            {isOffline && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <span className="text-orange-600">📶</span>
                  <span className="text-sm font-medium text-orange-700">
                    Offline Payment
                  </span>
                </div>
                <p className="text-xs text-orange-600 mt-1">
                  This payment will be processed when you're online
                </p>
              </div>
            )}

            {/* Pay Button */}
            <Button
              onClick={handleProceedToReview}
              disabled={!paymentAmount || parseFloat(paymentAmount) <= 0}
              className="w-full h-14 text-lg font-semibold"
              style={{ backgroundColor: COLORS.primary }}
            >
              Pay ₹{paymentAmount || "0"} 🔒
            </Button>

            {/* Security Badge */}
            <div className="text-center">
              <p className="text-xs" style={{ color: COLORS.textSecondary }}>
                🔒 Secured by OPPB
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Step 2: Review Screen - Exact Specification
  if (step === 2) {
    const currentTime = new Date();
    const formattedDate = currentTime.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
    const formattedTime = currentTime.toLocaleTimeString('en-IN', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });

    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader className="flex flex-row items-center justify-between">
            <Button variant="ghost" size="icon" onClick={() => setStep(1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <DialogTitle className="text-lg font-semibold">
              Review Payment
            </DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </DialogHeader>

          <div className="space-y-6">
            {/* Transaction Summary - Exact Specification */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4 space-y-3">
                <h3 className="font-semibold text-center" style={{ color: COLORS.textPrimary }}>
                  Transaction Summary
                </h3>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span style={{ color: COLORS.textSecondary }}>From:</span>
                    <span style={{ color: COLORS.textPrimary }}>Your Account</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: COLORS.textSecondary }}>To:</span>
                    <span style={{ color: COLORS.textPrimary }}>{merchantName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: COLORS.textSecondary }}>UPI:</span>
                    <span className="font-mono text-sm" style={{ color: COLORS.textPrimary }}>
                      {merchantName.toLowerCase().replace(/\s+/g, '')}@paytm
                    </span>
                  </div>
                  
                  <div className="border-t pt-2">
                    <div className="flex justify-between">
                      <span style={{ color: COLORS.textSecondary }}>Amount:</span>
                      <span className="text-xl font-bold" style={{ color: COLORS.primary }}>
                        ₹{paymentAmount}
                      </span>
                    </div>
                    {note && (
                      <div className="flex justify-between">
                        <span style={{ color: COLORS.textSecondary }}>Note:</span>
                        <span style={{ color: COLORS.textPrimary }}>{note}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="border-t pt-2">
                    <div className="flex justify-between">
                      <span style={{ color: COLORS.textSecondary }}>Date:</span>
                      <span style={{ color: COLORS.textPrimary }}>{formattedDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: COLORS.textSecondary }}>Time:</span>
                      <span style={{ color: COLORS.textPrimary }}>{formattedTime}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method Selection */}
            <div>
              <h3 className="font-semibold mb-3" style={{ color: COLORS.textPrimary }}>
                Select Payment Method
              </h3>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <RadioGroupItem value="bank" id="bank" />
                    <Label htmlFor="bank" className="flex-1 cursor-pointer">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-medium">Bank Account (HDFC)</span>
                          <p className="text-sm text-gray-500">****1234</p>
                        </div>
                        <span className="text-sm font-medium text-green-600">₹12,547</span>
                      </div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <RadioGroupItem value="upi-lite" id="upi-lite" />
                    <Label htmlFor="upi-lite" className="flex-1 cursor-pointer">
                      <span className="font-medium">UPI Lite</span>
                      <p className="text-sm text-gray-500">Small payments</p>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <Label htmlFor="credit-card" className="flex-1 cursor-pointer">
                      <span className="font-medium">Credit Card</span>
                      <p className="text-sm text-gray-500">****1234</p>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Pay with PIN Button */}
            <Button
              onClick={handlePayWithPin}
              className="w-full h-14 text-lg font-semibold"
              style={{ backgroundColor: COLORS.primary }}
            >
              <Lock className="h-5 w-5 mr-2" />
              Pay with PIN
            </Button>

            {/* Security Message */}
            <div className="text-center">
              <p className="text-xs" style={{ color: COLORS.textSecondary }}>
                🔒 Your payment is secured by 256-bit encryption
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Step 3: PIN Entry
  if (step === 3) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-sm mx-auto p-0">
          <PinEntry
            onComplete={handlePinComplete}
            onCancel={() => setStep(2)}
            title="Enter UPI PIN"
            subtitle={`Pay ₹${paymentAmount} to ${merchantName}`}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return null;
}