import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Camera, Image, Flashlight, QrCode, MapPin, Star, Shield, Smartphone, Store, Lock, Loader2, CheckCircle, Zap, Wifi } from "lucide-react";
import { Link, useLocation } from "wouter";
import { ApplePayQRCodeSVG, ApplePayNFCSVG, ApplePayContactlessSVG, ApplePaySecuritySVG, ApplePayMerchantSVG, ApplePayLocationSVG } from "@/components/ApplePaySVGs";
import { BluetoothDiscoverySVG, SecureConnectionSVG, PaymentSuccessSVG } from "@/components/PremiumOfflinePaymentSVGs";
import { BottomNavigation } from "@/components/BottomNavigation";
import { SwipeToSend } from "@/components/SwipeToSend";
import { PinEntry } from "@/components/PinEntry";
import { PaymentSuccess } from "@/components/PaymentSuccess";


export default function QRScanner() {
  const [, setLocation] = useLocation();
  const [scanningStage, setScanningStage] = useState<'scanning' | 'detected' | 'merchant' | 'amount' | 'pin' | 'processing' | 'success' | 'offline'>('scanning');
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [selectedQuickAmount, setSelectedQuickAmount] = useState<number | null>(null);
  const [cameraPermission, setCameraPermission] = useState<'pending' | 'granted' | 'denied'>('pending');
  const [showPinEntry, setShowPinEntry] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [scanProgress, setScanProgress] = useState(0);

  // Mock merchant data as detected from QR scan
  const detectedMerchant = {
    name: "Ramesh General Store",
    upiId: "ramesh@paytm",
    location: "Malviya Nagar, Jaipur",
    rating: 4.8,
    reviews: 127,
    verified: true
  };

  const quickAmounts = [100, 500, 1000, 2000];

  // Request camera permission on component mount
  useEffect(() => {
    const requestCameraPermission = async () => {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: 'environment' } // Use back camera
          });
          setCameraPermission('granted');
          // Stop the stream immediately as we're just checking permission
          stream.getTracks().forEach(track => track.stop());
        } else {
          setCameraPermission('denied');
        }
      } catch (error) {
        console.log('Camera permission denied:', error);
        setCameraPermission('denied');
      }
    };

    requestCameraPermission();
  }, []);

  // Monitor online status
  useEffect(() => {
    const handleOnlineStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);

    return () => {
      window.removeEventListener('online', handleOnlineStatusChange);
      window.removeEventListener('offline', handleOnlineStatusChange);
    };
  }, []);

  // QR scanning simulation with progress tracking
  useEffect(() => {
    if (scanningStage === 'scanning' && cameraPermission === 'granted') {
      console.log('🔍 Starting QR scan simulation');
      const progressInterval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            console.log('✅ QR code detected, moving to merchant stage');
            setScanningStage('detected');
            return 100;
          }
          return prev + 2; // Slower progression for better UX
        });
      }, 80);

      return () => clearInterval(progressInterval);
    }
  }, [scanningStage, cameraPermission]);

  const handleQuickAmount = (amount: number) => {
    setAmount(amount.toString());
    setSelectedQuickAmount(amount);
  };

  const handleFlashToggle = () => {
    setFlashEnabled(!flashEnabled);
    console.log(`Flashlight ${!flashEnabled ? 'enabled' : 'disabled'}`);
  };

  const handleMerchantConfirm = () => {
    setScanningStage('amount');
  };

  const handlePaymentInitiate = () => {
    if (!isOnline) {
      setScanningStage('offline');
      return;
    }
    
    if (amount && parseFloat(amount) > 0) {
      setShowPinEntry(true);
      setScanningStage('pin');
    }
  };

  const handlePinComplete = (pin: string) => {
    setShowPinEntry(false);
    setScanningStage('processing');
    setTransactionId(`QR${Date.now()}`);
    
    setTimeout(() => {
      setScanningStage('success');
    }, 3000);
  };

  const handleOfflinePayment = () => {
    setLocation('/offline-payments');
  };

  // Camera Permission Screen
  if (cameraPermission === 'pending') {
    return (
      <div className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center">
        <div className="text-center space-y-6 px-6">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-blue-600/20 flex items-center justify-center">
            <Camera className="h-12 w-12 text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold">Camera Access Required</h2>
          <p className="text-gray-400 max-w-sm mx-auto">
            We need camera access to scan QR codes for payments. Your camera will only be used for scanning.
          </p>
          <div className="flex justify-center space-x-2 mt-6">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    );
  }

  // Camera Permission Denied Screen
  if (cameraPermission === 'denied') {
    return (
      <div className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center">
        <div className="text-center space-y-6 px-6">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-red-600/20 flex items-center justify-center">
            <Lock className="h-12 w-12 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold">Camera Access Denied</h2>
          <p className="text-gray-400 max-w-sm mx-auto">
            Camera access is required to scan QR codes. Please enable camera permission in your browser settings and refresh the page.
          </p>
          <Link href="/">
            <Button className="apple-pay-glass border-white/20 text-white px-8 py-3 rounded-xl">
              Go Back
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Apple Pay Style Header */}
      <div className="flex items-center justify-between p-6 z-10 relative backdrop-blur-xl bg-black/50">
        <Link href="/">
          <Button variant="ghost" size="icon" className="apple-pay-button h-12 w-12 rounded-full">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <div className="text-center">
          <h1 className="text-xl font-bold text-white">Scan to Pay</h1>
          <p className="text-gray-400 text-sm">Position QR code in the frame</p>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className={`apple-pay-button h-12 w-12 rounded-full ${flashEnabled ? 'bg-yellow-500/20' : ''}`}
          onClick={handleFlashToggle}
        >
          <Flashlight className={`h-6 w-6 ${flashEnabled ? 'text-yellow-400' : 'text-white'}`} />
        </Button>
      </div>

      {/* Scanning Stage */}
      {scanningStage === 'scanning' && (
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          {/* Apple Pay Style Scanner Frame */}
          <div className="relative w-80 h-80 mb-8">
            <div className="absolute inset-0 border-4 border-white/30 rounded-3xl overflow-hidden backdrop-blur-xl bg-white/5">
              {/* Animated scanning line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <ApplePayQRCodeSVG className="w-20 h-20 text-white/60 animate-pulse" />
              </div>
            </div>
            
            {/* Corner markers */}
            <div className="absolute top-2 left-2 w-8 h-8 border-l-4 border-t-4 border-blue-500 rounded-tl-lg"></div>
            <div className="absolute top-2 right-2 w-8 h-8 border-r-4 border-t-4 border-blue-500 rounded-tr-lg"></div>
            <div className="absolute bottom-2 left-2 w-8 h-8 border-l-4 border-b-4 border-blue-500 rounded-bl-lg"></div>
            <div className="absolute bottom-2 right-2 w-8 h-8 border-r-4 border-b-4 border-blue-500 rounded-br-lg"></div>
          </div>

          <div className="text-center space-y-4 max-w-md">
            <h2 className="text-2xl font-bold text-white">Scanning for QR Code</h2>
            <p className="text-gray-400">Point your camera at a QR code to make a payment</p>
            
            {/* Scanning animation */}
            <div className="flex justify-center space-x-2 mt-6">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>

          {/* Quick access buttons */}
          <div className="grid grid-cols-2 gap-4 mt-12 w-full max-w-sm">
            <Button className="apple-pay-glass h-16 rounded-2xl flex flex-col items-center justify-center space-y-2">
              <Image className="h-6 w-6" />
              <span className="text-sm">From Gallery</span>
            </Button>
            <Button className="apple-pay-glass h-16 rounded-2xl flex flex-col items-center justify-center space-y-2">
              <ApplePayContactlessSVG className="h-6 w-6" />
              <span className="text-sm">NFC Payment</span>
            </Button>
          </div>
        </div>
      )}

      {/* QR Code Detected Stage */}
      {scanningStage === 'detected' && (
        <div className="flex-1 px-6 py-8">
          {/* Merchant Information Card - Apple Pay Style */}
          <Card className="apple-pay-card mb-6 border-0">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 rounded-full apple-pay-gradient flex items-center justify-center">
                  <ApplePayMerchantSVG className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white">{detectedMerchant.name}</h3>
                  <p className="text-gray-400 text-sm">{detectedMerchant.upiId}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <ApplePayLocationSVG className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-400 text-xs">{detectedMerchant.location}</p>
                  </div>
                </div>
                {detectedMerchant.verified && (
                  <div className="flex items-center space-x-1 bg-green-500/20 px-3 py-1 rounded-full">
                    <ApplePaySecuritySVG className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-xs font-medium">Verified</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-white font-medium">{detectedMerchant.rating}</span>
                </div>
                <span className="text-gray-400 text-sm">({detectedMerchant.reviews} reviews)</span>
              </div>
            </CardContent>
          </Card>

          {/* Amount Input Section */}
          <Card className="apple-pay-card mb-6 border-0">
            <CardContent className="p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Enter Amount</h4>
              
              {/* Quick Amount Buttons */}
              <div className="grid grid-cols-4 gap-3 mb-4">
                {quickAmounts.map((quickAmount) => (
                  <Button
                    key={quickAmount}
                    variant={selectedQuickAmount === quickAmount ? "default" : "outline"}
                    className={`h-12 rounded-xl ${selectedQuickAmount === quickAmount ? 'apple-pay-gradient text-white' : 'apple-pay-glass text-white border-white/20'}`}
                    onClick={() => handleQuickAmount(quickAmount)}
                  >
                    ₹{quickAmount}
                  </Button>
                ))}
              </div>

              {/* Custom Amount Input */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-white mb-2">Amount (₹)</label>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter custom amount"
                    className="bg-white/20 border-white/30 text-white placeholder-white/60 rounded-xl h-14 text-lg font-bold backdrop-blur-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-white mb-2">Note (Optional)</label>
                  <Textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Add a payment note..."
                    className="bg-white/20 border-white/30 text-white placeholder-white/60 rounded-xl min-h-[60px] resize-none font-medium backdrop-blur-sm"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-4 pb-24">
            <SwipeToSend
              onComplete={handlePaymentInitiate}
              text={`Swipe to Pay ₹${amount || "0"}`}
              variant="primary"
              size="large"
              disabled={!amount || parseFloat(amount) <= 0}
            />
            
            <SwipeToSend
              onComplete={() => setScanningStage('scanning')}
              text="Swipe to Scan Again"
              variant="glass"
              size="medium"
            />
          </div>
        </div>
      )}

      {/* PIN Entry Stage */}
      {scanningStage === 'pin' && (
        <div className="flex-1 px-6 py-8">
          <Card className="apple-pay-card mb-6 border-0">
            <CardContent className="p-6">
              <div className="text-center space-y-6">
                <div className="w-16 h-16 mx-auto apple-pay-gradient rounded-full flex items-center justify-center mb-4">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                
                <h2 className="text-2xl font-bold text-white">Enter PIN</h2>
                <p className="text-gray-400">Please enter your 4-digit PIN to complete the payment</p>
                
                <div className="space-y-4">
                  <p className="text-xl text-white">₹{amount} to {detectedMerchant.name}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <PinEntry 
            onComplete={handlePinComplete}
            onCancel={() => setScanningStage('amount')}
          />
        </div>
      )}

      {/* Payment Processing Stage */}
      {scanningStage === 'processing' && (
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="text-center space-y-6">
            {/* Processing Animation */}
            <div className="w-40 h-40 mx-auto mb-8 flex items-center justify-center">
              <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            
            <h2 className="text-3xl font-bold text-white">Processing Payment...</h2>
            <p className="text-gray-400 text-lg">Please wait while we process your payment to {detectedMerchant.name}</p>
            
            {/* Processing dots animation */}
            <div className="flex justify-center space-x-2 mt-6">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Success Stage */}
      {scanningStage === 'success' && (
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="text-center space-y-6">
            {/* Success Animation */}
            <div className="w-40 h-40 mx-auto mb-8 flex items-center justify-center">
              <CheckCircle className="w-20 h-20 text-green-500 animate-pulse" />
            </div>
            
            <h2 className="text-3xl font-bold text-white">Payment Successful!</h2>
            <p className="text-gray-400 text-lg">₹{amount} paid to {detectedMerchant.name}</p>
            
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 max-w-sm mx-auto">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Transaction ID:</span>
                  <span className="text-white font-mono">TXN123456789</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Date & Time:</span>
                  <span className="text-white">{new Date().toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Payment Method:</span>
                  <span className="text-white">OPPB Wallet</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 mt-8">
              <Link href="/">
                <Button className="w-full h-14 rounded-2xl apple-pay-gradient text-white font-semibold text-lg">
                  Done
                </Button>
              </Link>
              
              <Button 
                variant="outline"
                onClick={() => setScanningStage('scanning')}
                className="w-full h-12 rounded-xl apple-pay-glass border-white/20 text-white"
              >
                Scan Another QR
              </Button>
            </div>
          </div>
        </div>
      )}

      <BottomNavigation activeTab="scan" />
    </div>
  );
}