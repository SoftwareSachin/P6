import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, ArrowLeft } from "lucide-react";
import { UltraPremiumPaymentButton } from "./UltraPremiumPaymentButton";
import { ApplePayQRCodeSVG, ApplePayContactlessSVG, ApplePayNFCSVG } from "@/components/ApplePaySVGs";
import { CheckmarkSuccessSVG, ShieldSecuritySVG } from "@/components/ApplePayAuthenticSVGs";

interface PremiumPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  merchantName: string;
  merchantIcon: React.ComponentType<{className?: string}>;
  amount?: number;
  onPaymentComplete?: () => void;
}

export function PremiumPaymentModal({ 
  isOpen, 
  onClose, 
  merchantName, 
  merchantIcon: MerchantIcon,
  amount = 0,
  onPaymentComplete 
}: PremiumPaymentModalProps) {
  const [paymentStep, setPaymentStep] = useState<'method' | 'processing' | 'success'>('method');
  const [selectedMethod, setSelectedMethod] = useState<'qr' | 'nfc' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setPaymentStep('method');
      setSelectedMethod(null);
      setIsProcessing(false);
    }
  }, [isOpen]);

  const handlePaymentInitiate = () => {
    setIsProcessing(true);
    setPaymentStep('processing');
    
    // Simulate payment processing
    setTimeout(() => {
      setPaymentStep('success');
      setIsProcessing(false);
      onPaymentComplete?.();
    }, 3000);
  };

  const handleMethodSelect = (method: 'qr' | 'nfc') => {
    setSelectedMethod(method);
  };

  const handleClose = () => {
    if (paymentStep !== 'processing') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4">
      <Card 
        className="w-full max-w-md border-0 overflow-hidden"
        style={{
          background: `
            linear-gradient(135deg, 
              rgba(255,255,255,0.15) 0%, 
              rgba(255,255,255,0.08) 50%, 
              rgba(255,255,255,0.05) 100%
            )
          `,
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)',
          border: '1px solid rgba(255,255,255,0.2)',
          boxShadow: '0 25px 50px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)'
        }}
      >
        <CardContent className="p-0">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center space-x-3">
              {paymentStep !== 'method' && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setPaymentStep('method')}
                  className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20"
                  disabled={isProcessing}
                >
                  <ArrowLeft className="h-5 w-5 text-white" />
                </Button>
              )}
              <div>
                <h2 
                  className="text-xl font-bold text-white"
                  style={{ fontFamily: 'SF Pro Display, system-ui' }}
                >
                  {paymentStep === 'success' ? 'Payment Complete' : 
                   paymentStep === 'processing' ? 'Processing Payment' : 'Pay Merchant'}
                </h2>
                <p className="text-sm text-gray-400">{merchantName}</p>
              </div>
            </div>
            {paymentStep !== 'processing' && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20"
              >
                <X className="h-5 w-5 text-white" />
              </Button>
            )}
          </div>

          {/* Payment Method Selection */}
          {paymentStep === 'method' && (
            <div className="p-6 space-y-6">
              {/* Merchant Info */}
              <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
                  <MerchantIcon className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">{merchantName}</h3>
                  <p className="text-2xl font-bold text-white">₹{amount.toFixed(2)}</p>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white mb-4">Choose Payment Method</h3>
                
                <Card
                  className={`cursor-pointer transition-all duration-300 border-0 ${
                    selectedMethod === 'qr' 
                      ? 'bg-blue-500/20 border-blue-400' 
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                  onClick={() => handleMethodSelect('qr')}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                        <ApplePayQRCodeSVG className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold">Scan QR Code</h4>
                        <p className="text-sm text-gray-400">Quick and secure payment</p>
                      </div>
                      {selectedMethod === 'qr' && (
                        <CheckmarkSuccessSVG className="w-6 h-6" />
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className={`cursor-pointer transition-all duration-300 border-0 ${
                    selectedMethod === 'nfc' 
                      ? 'bg-green-500/20 border-green-400' 
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                  onClick={() => handleMethodSelect('nfc')}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                        <ApplePayContactlessSVG className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold">Tap to Pay</h4>
                        <p className="text-sm text-gray-400">Contactless payment</p>
                      </div>
                      {selectedMethod === 'nfc' && (
                        <CheckmarkSuccessSVG className="w-6 h-6" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Security Info */}
              <div className="flex items-center space-x-3 p-4 bg-blue-500/10 rounded-2xl">
                <ShieldSecuritySVG className="w-6 h-6" />
                <div>
                  <p className="text-sm font-semibold text-white">Secure Payment</p>
                  <p className="text-xs text-gray-400">Protected by biometric authentication</p>
                </div>
              </div>

              {/* Pay Button */}
              <UltraPremiumPaymentButton
                onPaymentInitiate={handlePaymentInitiate}
                merchantName={merchantName}
                amount={amount}
                className="w-full"
              />
            </div>
          )}

          {/* Processing State */}
          {paymentStep === 'processing' && (
            <div className="p-8 text-center space-y-6">
              <div className="w-24 h-24 mx-auto rounded-full bg-blue-500/20 flex items-center justify-center">
                <div 
                  className="w-8 h-8 border-4 border-white border-t-transparent rounded-full"
                  style={{ animation: 'spin 1s linear infinite' }}
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Processing Payment</h3>
                <p className="text-gray-400">Please wait while we process your payment</p>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <ApplePayNFCSVG className="w-6 h-6" animated />
                <span className="text-sm text-gray-400">Secure connection established</span>
              </div>
            </div>
          )}

          {/* Success State */}
          {paymentStep === 'success' && (
            <div className="p-8 text-center space-y-6">
              <div className="w-24 h-24 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckmarkSuccessSVG className="w-12 h-12" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Payment Successful!</h3>
                <p className="text-gray-400">₹{amount.toFixed(2)} paid to {merchantName}</p>
              </div>
              <Badge className="bg-green-500/20 text-green-400 px-4 py-2">
                Transaction ID: TXN{Date.now().toString().slice(-8)}
              </Badge>
              <Button
                onClick={handleClose}
                className="w-full h-12 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold"
              >
                Done
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}