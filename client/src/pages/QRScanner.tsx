import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Camera, Image, Flashlight, QrCode, MapPin, Star, Shield, Smartphone, Store, Lock } from "lucide-react";
import { COLORS } from "@/lib/constants";
import { Link } from "wouter";

export default function QRScanner() {
  const [scanningStage, setScanningStage] = useState<'scanning' | 'detected' | 'payment'>('scanning');
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [selectedQuickAmount, setSelectedQuickAmount] = useState<number | null>(null);

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

  useEffect(() => {
    if (scanningStage === 'scanning') {
      // Simulate QR detection after 3 seconds
      const timer = setTimeout(() => {
        setScanningStage('detected');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [scanningStage]);

  const handleAmountSelect = (value: number) => {
    setAmount(value.toString());
    setSelectedQuickAmount(value);
  };

  const handlePayment = () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    
    alert(`Payment of ₹${amount} to ${detectedMerchant.name} successful!`);
    setScanningStage('scanning');
    setAmount("");
    setNote("");
    setSelectedQuickAmount(null);
  };

  // Scanning Interface
  if (scanningStage === 'scanning') {
    return (
      <div className="min-h-screen" style={{ backgroundColor: COLORS.background }}>
        {/* Header */}
        <div className="flex items-center justify-between p-4" style={{ backgroundColor: COLORS.cardWhite }}>
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold" style={{ color: COLORS.textPrimary }}>
            Scan QR Code
          </h1>
          <div className="flex space-x-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setFlashEnabled(!flashEnabled)}
            >
              <Flashlight className={`h-5 w-5 ${flashEnabled ? 'text-yellow-500' : 'text-gray-500'}`} />
            </Button>
            <Button variant="ghost" size="icon">
              <Camera className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Camera Viewfinder */}
        <div className="flex-1 relative bg-black">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Animated Scanning Frame - Exact PhonePe Style */}
            <div className="relative w-64 h-64">
              {/* Corner Brackets */}
              <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-white"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-white"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-white"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-white"></div>
              
              {/* Animated Scanning Line */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse"></div>
              </div>
              
              {/* Focus Animation */}
              <div className="absolute inset-0 border-2 border-green-400 animate-pulse rounded-lg"></div>
              
              {/* QR Focus Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/20 rounded-lg p-4">
                  <QrCode className="h-12 w-12 text-white" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Scanning Text */}
          <div className="absolute bottom-32 left-0 right-0 text-center">
            <div className="flex items-center justify-center space-x-2 text-white text-lg font-medium mb-2">
              <Smartphone className="h-5 w-5" />
              <span>QR FOCUS</span>
            </div>
            <p className="text-white/80">
              Scan merchant QR to pay
            </p>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 space-y-4" style={{ backgroundColor: COLORS.cardWhite }}>
          <div className="flex justify-center space-x-6">
            <Button variant="outline" className="flex flex-col items-center space-y-1 p-4 h-auto">
              <Image className="h-6 w-6" />
              <span className="text-xs">Gallery</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col items-center space-y-1 p-4 h-auto"
              onClick={() => setFlashEnabled(!flashEnabled)}
            >
              <Flashlight className={`h-6 w-6 ${flashEnabled ? 'text-yellow-500' : ''}`} />
              <span className="text-xs">Flash</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center space-y-1 p-4 h-auto">
              <QrCode className="h-6 w-6" />
              <span className="text-xs">My QR</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // QR Detection Result
  if (scanningStage === 'detected') {
    return (
      <div className="min-h-screen" style={{ backgroundColor: COLORS.background }}>
        {/* Header */}
        <div className="flex items-center justify-between p-4" style={{ backgroundColor: COLORS.cardWhite }}>
          <Button variant="ghost" size="icon" onClick={() => setScanningStage('scanning')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold" style={{ color: COLORS.textPrimary }}>
            Pay to Merchant
          </h1>
          <Button variant="ghost" size="icon" onClick={() => setScanningStage('scanning')}>
            <span className="text-xl">✖</span>
          </Button>
        </div>

        <div className="p-4 space-y-6">
          {/* Merchant Card - Exact Specification */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div 
                  className="w-16 h-16 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center"
                >
                  <Store className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h2 className="text-xl font-bold" style={{ color: COLORS.textPrimary }}>
                      {detectedMerchant.name}
                    </h2>
                    {detectedMerchant.verified && (
                      <Shield className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                  <p className="text-sm" style={{ color: COLORS.textSecondary }}>
                    UPI: {detectedMerchant.upiId}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <MapPin className="h-4 w-4" style={{ color: COLORS.textSecondary }} />
                    <p className="text-sm" style={{ color: COLORS.textSecondary }}>
                      {detectedMerchant.location}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium ml-1">
                        {detectedMerchant.rating}
                      </span>
                    </div>
                    <span className="text-sm" style={{ color: COLORS.textSecondary }}>
                      ({detectedMerchant.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Amount Entry */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <label className="block text-sm font-medium mb-3" style={{ color: COLORS.textPrimary }}>
                Enter Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-2xl font-bold">
                  ₹
                </span>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0"
                  className="text-2xl font-bold pl-10 h-16 border-2 focus:border-purple-500"
                />
              </div>
            </CardContent>
          </Card>

          {/* Quick Amount Selection */}
          <div>
            <h3 className="text-sm font-medium mb-3" style={{ color: COLORS.textPrimary }}>
              Quick amounts:
            </h3>
            <div className="grid grid-cols-4 gap-3">
              {quickAmounts.map((value) => (
                <Button
                  key={value}
                  variant={selectedQuickAmount === value ? "default" : "outline"}
                  onClick={() => handleAmountSelect(value)}
                  className="h-12"
                  style={selectedQuickAmount === value ? { backgroundColor: COLORS.primary } : {}}
                >
                  ₹{value}
                </Button>
              ))}
            </div>
          </div>

          {/* Note Field */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <label className="block text-sm font-medium mb-3" style={{ color: COLORS.textPrimary }}>
                Add Note (Optional)
              </label>
              <Textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="For groceries..."
                className="border-2 focus:border-purple-500"
                rows={2}
              />
            </CardContent>
          </Card>

          {/* Payment Button */}
          <Button 
            onClick={handlePayment}
            disabled={!amount || parseFloat(amount) <= 0}
            className="w-full h-14 text-lg font-semibold"
            style={{ backgroundColor: COLORS.primary }}
          >
            <div className="flex items-center justify-center space-x-2">
              <span>Pay ₹{amount || '0'}</span>
              <Lock className="h-4 w-4" />
            </div>
          </Button>

          {/* Security Badge */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 text-sm" style={{ color: COLORS.textSecondary }}>
              <Lock className="h-4 w-4" />
              <span>Secured by OPPB</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}