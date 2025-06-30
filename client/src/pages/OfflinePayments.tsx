import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Wifi, WifiOff, Bluetooth, RefreshCw, QrCode, Edit3, Star, Store, Smartphone, Coffee, Search, Link as LinkIcon, AlertCircle, DollarSign } from "lucide-react";
import { COLORS } from "@/lib/constants";
import { Link } from "wouter";

export default function OfflinePayments() {
  const [isOffline, setIsOffline] = useState(true);
  const [step, setStep] = useState<'detection' | 'scanning' | 'transaction'>('detection');
  const [selectedDevice, setSelectedDevice] = useState<any>(null);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  // Premium icon renderer for device types
  const renderDeviceIcon = (iconType: string) => {
    switch (iconType) {
      case 'store':
        return <Store className="h-6 w-6 text-white" />;
      case 'smartphone':
        return <Smartphone className="h-6 w-6 text-white" />;
      case 'coffee':
        return <Coffee className="h-6 w-6 text-white" />;
      default:
        return <DollarSign className="h-6 w-6 text-white" />;
    }
  };

  // Mock nearby devices for offline payments
  const nearbyDevices = [
    {
      id: 1,
      name: "Ramesh Store",
      type: "Verified Merchant", 
      distance: "10m",
      icon: "store",
      trustScore: 5,
      status: "available",
    },
    {
      id: 2,
      name: "Priya's Phone",
      type: "OPPB User",
      distance: "5m",
      icon: "smartphone",
      trustScore: 4,
      status: "available",
    },
    {
      id: 3,
      name: "Coffee Corner",
      type: "New Merchant",
      distance: "15m",
      icon: "coffee",
      trustScore: 3,
      status: "connecting",
    },
  ];

  useEffect(() => {
    if (step === 'scanning') {
      const timer = setTimeout(() => {
        setIsScanning(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleEnableOffline = () => {
    setStep('scanning');
    setIsScanning(true);
  };

  const handleDeviceSelect = (device: any) => {
    setSelectedDevice(device);
    setStep('transaction');
  };

  const handleOfflinePayment = () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    
    alert(`Offline payment of ₹${amount} to ${selectedDevice?.name} queued for sync!`);
  };

  if (step === 'detection') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
        {/* Premium Header with Glass Effect */}
        <div className="glass-effect-premium backdrop-blur-xl border-b border-white/20 p-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="hover:bg-white/20 rounded-xl">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Offline Payments
            </h1>
            <Button variant="ghost" size="icon" className="animate-pulse-glow">
              <WifiOff className="h-5 w-5" style={{ color: COLORS.offline }} />
            </Button>
          </div>
        </div>

        {/* Premium Network Status Card */}
        <div className="p-4">
          <Card className="border-0 shadow-card overflow-hidden">
            <CardContent className="p-8 text-center bg-gradient-card">
              <div className="w-24 h-24 rounded-3xl mx-auto mb-6 flex items-center justify-center bg-gradient-to-br from-orange-500 to-red-500 animate-pulse-glow">
                <WifiOff className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-3" style={{ color: COLORS.textPrimary }}>
                Network Unavailable
              </h2>
              <p className="text-base" style={{ color: COLORS.textSecondary }}>
                Don't worry! You can still make payments offline
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Premium Offline Mode Card */}
        <div className="p-4">
          <Card className="border-0 shadow-premium overflow-hidden balance-card-premium">
            <CardContent className="p-8 text-white relative">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16 animate-float"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/40 rounded-full translate-y-12 -translate-x-12"></div>
              </div>
              
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 bg-white/20 rounded-3xl mx-auto mb-6 flex items-center justify-center backdrop-blur-sm">
                  <Bluetooth className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Enable Offline Mode</h3>
                <p className="text-white/80 text-base mb-8 leading-relaxed">
                  Use OPPB's revolutionary peer-to-peer technology to make payments without internet connection
                </p>
                <Button 
                  onClick={handleEnableOffline}
                  className="btn-primary-premium w-full h-14 text-lg font-bold bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm"
                >
                  <Bluetooth className="h-5 w-5 mr-3" />
                  Start Scanning for Devices
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Premium How it Works Section */}
        <div className="p-4">
          <h3 className="text-xl font-bold mb-6" style={{ color: COLORS.textPrimary }}>
            How Offline Payments Work
          </h3>
          <div className="space-y-4">
            <div className="transaction-item-premium">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-primary shadow-card">
                  <Bluetooth className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-lg" style={{ color: COLORS.textPrimary }}>
                    Connect via Bluetooth
                  </h4>
                  <p className="text-base" style={{ color: COLORS.textSecondary }}>
                    Find nearby OPPB devices automatically using secure mesh networking
                  </p>
                </div>
              </div>
            </div>
            
            <div className="transaction-item-premium">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-success shadow-card">
                  <DollarSign className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-lg" style={{ color: COLORS.textPrimary }}>
                    Secure Transaction Exchange
                  </h4>
                  <p className="text-base" style={{ color: COLORS.textSecondary }}>
                    Encrypted payment data transfer with digital signatures
                  </p>
                </div>
              </div>
            </div>
            
            <div className="transaction-item-premium">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-orange-400 to-yellow-500 shadow-card">
                  <RefreshCw className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-lg" style={{ color: COLORS.textPrimary }}>
                    Auto-sync When Online
                  </h4>
                  <p className="text-base" style={{ color: COLORS.textSecondary }}>
                    Transactions automatically process when network returns
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Action Buttons */}
        <div className="p-4 space-y-4">
          <Button 
            onClick={handleEnableOffline}
            className="btn-primary-premium w-full h-14 text-lg font-bold bg-gradient-primary"
          >
            <Bluetooth className="h-5 w-5 mr-3" />
            Continue Offline
          </Button>
          <Button variant="outline" className="w-full h-14 text-lg font-semibold border-2 hover:bg-gray-50">
            <RefreshCw className="h-5 w-5 mr-3" />
            Retry Connection
          </Button>
        </div>
      </div>
    );
  }

  if (step === 'scanning') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
        {/* Premium Header */}
        <div className="glass-effect-premium backdrop-blur-xl border-b border-white/20 p-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={() => setStep('detection')} className="hover:bg-white/20 rounded-xl">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Scanning for Devices
            </h1>
            <Button variant="ghost" size="icon" className="animate-pulse-glow">
              <Bluetooth className="h-5 w-5" style={{ color: COLORS.primary }} />
            </Button>
          </div>
        </div>

        {/* Premium Scanning Animation */}
        <div className="p-4">
          <Card className="border-0 shadow-premium overflow-hidden">
            <CardContent className="p-8 text-center bg-gradient-card">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="absolute inset-0 border-4 border-blue-200 rounded-full animate-ping"></div>
                <div className="absolute inset-2 border-4 border-blue-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                <div className="w-24 h-24 rounded-full mx-auto flex items-center justify-center bg-gradient-primary animate-pulse-glow">
                  <Bluetooth className="h-12 w-12 text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-3" style={{ color: COLORS.textPrimary }}>
                Scanning for nearby devices...
              </h2>
              <p className="text-base" style={{ color: COLORS.textSecondary }}>
                Make sure Bluetooth is enabled on both devices
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Premium Nearby Devices List */}
        <div className="p-4">
          <h3 className="text-xl font-bold mb-6" style={{ color: COLORS.textPrimary }}>
            Available Devices
          </h3>
          <div className="space-y-3">
            {nearbyDevices.map((device, index) => (
              <div 
                key={device.id} 
                className="transaction-item-premium cursor-pointer animate-slide-up-premium"
                style={{ animationDelay: `${index * 0.2}s` }}
                onClick={() => handleDeviceSelect(device)}
              >
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-primary shadow-card">
                      {renderDeviceIcon(device.icon)}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center ${
                      device.status === 'available' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}>
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-lg" style={{ color: COLORS.textPrimary }}>
                          {device.name}
                        </h3>
                        <p className="text-base font-medium" style={{ color: COLORS.textSecondary }}>
                          {device.type} • {device.distance}
                        </p>
                        <div className="flex items-center space-x-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < device.trustScore ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                          <span className="text-sm font-medium ml-2" style={{ color: COLORS.textSecondary }}>
                            Trust Score
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                          device.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {device.status === 'available' ? 'Available' : 'Connecting...'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Transaction Step
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      {/* Premium Header */}
      <div className="glass-effect-premium backdrop-blur-xl border-b border-white/20 p-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => setStep('scanning')} className="hover:bg-white/20 rounded-xl">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Offline Payment
          </h1>
          <Button variant="ghost" size="icon" className="animate-pulse-glow">
            <WifiOff className="h-5 w-5" style={{ color: COLORS.offline }} />
          </Button>
        </div>
      </div>

      {/* Premium Merchant Details */}
      {selectedDevice && (
        <div className="p-4">
          <Card className="border-0 shadow-premium overflow-hidden">
            <CardContent className="p-6 bg-gradient-card">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-20 h-20 rounded-3xl flex items-center justify-center bg-gradient-primary shadow-card">
                  {renderDeviceIcon(selectedDevice.icon)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold" style={{ color: COLORS.textPrimary }}>
                    {selectedDevice.name}
                  </h2>
                  <p className="text-lg" style={{ color: COLORS.textSecondary }}>
                    {selectedDevice.type}
                  </p>
                  <div className="flex items-center space-x-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-5 w-5 ${i < selectedDevice.trustScore ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Premium Amount Input */}
      <div className="p-4">
        <Card className="border-0 shadow-card">
          <CardContent className="p-6 bg-gradient-card">
            <h3 className="text-xl font-bold mb-6" style={{ color: COLORS.textPrimary }}>
              Enter Amount
            </h3>
            
            <div className="mb-6">
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="₹ 0.00"
                className="text-3xl font-bold text-center h-16 border-2 rounded-2xl"
                style={{ fontSize: '2rem' }}
              />
            </div>

            <div className="mb-6">
              <label className="block text-base font-semibold mb-3" style={{ color: COLORS.textPrimary }}>
                Add a note (optional)
              </label>
              <Textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="What's this payment for?"
                className="h-24 border-2 rounded-2xl text-base"
              />
            </div>

            <Button 
              onClick={handleOfflinePayment}
              className="btn-primary-premium w-full h-16 text-xl font-bold bg-gradient-primary"
              disabled={!amount || parseFloat(amount) <= 0}
            >
              <DollarSign className="h-6 w-6 mr-3" />
              Pay ₹{amount || '0'} Offline
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}