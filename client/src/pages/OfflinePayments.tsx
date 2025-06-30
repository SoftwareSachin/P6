import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Smartphone, CreditCard, CheckCircle, X, Waves, Shield } from "lucide-react";
import { Link } from "wouter";
import { ApplePayContactlessSVG, ApplePayNFCSVG, ApplePaySecuritySVG, ApplePayPhoneSVG, ApplePaySuccessSVG } from "@/components/ApplePaySVGs";
import { BottomNavigation } from "@/components/BottomNavigation";
import { useAuth } from "@/hooks/useAuth";

export default function OfflinePayments() {
  const [isNFCEnabled, setIsNFCEnabled] = useState(false);
  const [paymentStage, setPaymentStage] = useState<'ready' | 'scanning' | 'authenticating' | 'processing' | 'success' | 'error'>('ready');
  const [amount, setAmount] = useState('25.99');
  const [merchantName, setMerchantName] = useState('Apple Store');
  const { user } = useAuth();

  useEffect(() => {
    // Simulate NFC availability check
    const timer = setTimeout(() => {
      setIsNFCEnabled(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleStartPayment = () => {
    setPaymentStage('scanning');
    
    // Simulate payment flow
    setTimeout(() => setPaymentStage('authenticating'), 2000);
    setTimeout(() => setPaymentStage('processing'), 4000);
    setTimeout(() => setPaymentStage('success'), 6000);
  };

  const handleResetPayment = () => {
    setPaymentStage('ready');
  };

  const renderNFCAnimation = () => {
    const rings = [1, 2, 3, 4];
    return (
      <div className="relative w-48 h-48 mx-auto">
        {/* Phone Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-32 bg-white rounded-2xl shadow-2xl flex items-center justify-center">
            <ApplePayNFCSVG className="w-12 h-12 text-blue-600" animated />
          </div>
        </div>
        
        {/* Animated NFC Rings */}
        {rings.map((ring) => (
          <div
            key={ring}
            className={`absolute inset-0 border-2 border-blue-400/30 rounded-full animate-ping`}
            style={{
              animationDelay: `${ring * 0.5}s`,
              animationDuration: '2s',
              transform: `scale(${0.3 + ring * 0.2})`
            }}
          />
        ))}
      </div>
    );
  };

  const renderPaymentStage = () => {
    switch (paymentStage) {
      case 'ready':
        return (
          <div className="text-center space-y-8">
            <div className="w-32 h-32 mx-auto bg-white/10 rounded-full flex items-center justify-center backdrop-blur-xl border border-white/20">
              <ApplePayContactlessSVG className="w-16 h-16 text-white" />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-white">Tap to Pay</h2>
              <p className="text-white/80 text-lg">Hold your iPhone near the payment terminal</p>
              <p className="text-white/60 text-sm">Secure contactless payments without internet</p>
            </div>

            <Button
              onClick={handleStartPayment}
              disabled={!isNFCEnabled}
              className="w-full py-6 text-lg font-semibold bg-white text-black hover:bg-white/90 rounded-2xl transition-all duration-300 disabled:opacity-50"
            >
              {isNFCEnabled ? 'Ready to Pay' : 'Initializing NFC...'}
            </Button>
          </div>
        );

      case 'scanning':
        return (
          <div className="text-center space-y-8">
            {renderNFCAnimation()}
            
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-white">Hold Near Reader</h2>
              <p className="text-white/80 text-lg">Keep your iPhone steady</p>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        );

      case 'authenticating':
        return (
          <div className="text-center space-y-8">
            <div className="w-32 h-32 mx-auto bg-blue-600/20 rounded-full flex items-center justify-center backdrop-blur-xl border border-blue-500/30">
              <Shield className="w-16 h-16 text-blue-400 animate-pulse" />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-white">Authenticating</h2>
              <p className="text-white/80 text-lg">Verifying your identity</p>
            </div>
          </div>
        );

      case 'processing':
        return (
          <div className="text-center space-y-8">
            <div className="w-32 h-32 mx-auto bg-yellow-600/20 rounded-full flex items-center justify-center backdrop-blur-xl border border-yellow-500/30">
              <CreditCard className="w-16 h-16 text-yellow-400 animate-bounce" />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-white">Processing</h2>
              <p className="text-white/80 text-lg">Completing your payment</p>
            </div>
          </div>
        );

      case 'success':
        return (
          <div className="text-center space-y-8">
            <div className="w-32 h-32 mx-auto bg-green-600/20 rounded-full flex items-center justify-center backdrop-blur-xl border border-green-500/30">
              <CheckCircle className="w-16 h-16 text-green-400" />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-white">Payment Complete</h2>
              <p className="text-white/80 text-lg">Successfully paid ${amount}</p>
              <p className="text-white/60 text-sm">to {merchantName}</p>
            </div>

            <Button
              onClick={handleResetPayment}
              className="w-full py-6 text-lg font-semibold bg-white text-black hover:bg-white/90 rounded-2xl transition-all duration-300"
            >
              Make Another Payment
            </Button>
          </div>
        );

      case 'error':
        return (
          <div className="text-center space-y-8">
            <div className="w-32 h-32 mx-auto bg-red-600/20 rounded-full flex items-center justify-center backdrop-blur-xl border border-red-500/30">
              <X className="w-16 h-16 text-red-400" />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-white">Payment Failed</h2>
              <p className="text-white/80 text-lg">Please try again</p>
            </div>

            <Button
              onClick={handleResetPayment}
              className="w-full py-6 text-lg font-semibold bg-white text-black hover:bg-white/90 rounded-2xl transition-all duration-300"
            >
              Try Again
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-20 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between p-6 backdrop-blur-xl bg-black/30 relative z-10">
        <Link href="/">
          <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20">
            <ArrowLeft className="h-6 w-6 text-white" />
          </Button>
        </Link>
        <div className="text-center">
          <h1 className="text-xl font-bold text-white">Tap to Pay</h1>
          <p className="text-gray-400 text-sm">Contactless Payment</p>
        </div>
        <div className="w-12 h-12 flex items-center justify-center">
          <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
            NFC
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 py-8 relative z-10">
        <Card className="bg-black/40 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl overflow-hidden">
          <CardContent className="p-12">
            {renderPaymentStage()}
          </CardContent>
        </Card>

        {/* Features Grid */}
        {paymentStage === 'ready' && (
          <div className="mt-8 grid grid-cols-2 gap-4">
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl">
              <CardContent className="p-4 text-center">
                <ApplePaySecuritySVG className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <h3 className="text-white font-semibold text-sm">Secure</h3>
                <p className="text-white/60 text-xs">End-to-end encrypted</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl">
              <CardContent className="p-4 text-center">
                <Waves className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <h3 className="text-white font-semibold text-sm">Offline</h3>
                <p className="text-white/60 text-xs">No internet required</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl">
              <CardContent className="p-4 text-center">
                <Smartphone className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <h3 className="text-white font-semibold text-sm">Instant</h3>
                <p className="text-white/60 text-xs">Tap and go</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl">
              <CardContent className="p-4 text-center">
                <CreditCard className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                <h3 className="text-white font-semibold text-sm">Universal</h3>
                <p className="text-white/60 text-xs">Works everywhere</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <BottomNavigation activeTab="offline" />
    </div>
  );
}