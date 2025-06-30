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
      <div className="min-h-screen" style={{ backgroundColor: COLORS.background }}>
        {/* Header */}
        <div className="flex items-center justify-between p-4" style={{ backgroundColor: COLORS.cardWhite }}>
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold" style={{ color: COLORS.textPrimary }}>
            Offline Payments
          </h1>
          <Button variant="ghost" size="icon">
            <WifiOff className="h-5 w-5" style={{ color: COLORS.offline }} />
          </Button>
        </div>

        {/* Network Status */}
        <div className="p-4">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div 
                className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: `${COLORS.offline}15` }}
              >
                <WifiOff className="h-10 w-10" style={{ color: COLORS.offline }} />
              </div>
              <h2 className="text-xl font-bold mb-2" style={{ color: COLORS.textPrimary }}>
                <div className="flex items-center space-x-2">
                  <WifiOff className="h-5 w-5" />
                  <span>Network Unavailable</span>
                </div>
              </h2>
            </CardContent>
          </Card>
        </div>

        {/* Offline Mode Card */}
        <div className="p-4">
          <Card className="border-0 shadow-lg overflow-hidden">
            <CardContent 
              className="p-6 bg-gradient-to-r from-orange-500 to-red-500 text-white"
              style={{ backgroundImage: 'linear-gradient(135deg, #FF6900 0%, #FF8A50 100%)' }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-red-500" />
                </div>
                <h3 className="text-lg font-bold mb-2">You're offline</h3>
                <p className="text-orange-100 text-sm mb-4">
                  Don't worry! You can still make payments using OPPB's offline technology.
                </p>
                <Button 
                  onClick={handleEnableOffline}
                  className="bg-white/20 hover:bg-white/30 text-white border-0 font-semibold w-full"
                >
                  Enable Offline Payments
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* How it Works */}
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4" style={{ color: COLORS.textPrimary }}>
            How it works:
          </h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${COLORS.primary}15` }}
              >
                <Bluetooth className="h-6 w-6" style={{ color: COLORS.primary }} />
              </div>
              <div>
                <h4 className="font-medium" style={{ color: COLORS.textPrimary }}>
                  <div className="flex items-center space-x-3">
                    <span>1.</span>
                    <Bluetooth className="h-5 w-5" />
                    <span>Connect via Bluetooth</span>
                  </div>
                </h4>
                <p className="text-sm" style={{ color: COLORS.textSecondary }}>
                  Find nearby OPPB devices automatically
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${COLORS.success}15` }}
              >
                <DollarSign className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium" style={{ color: COLORS.textPrimary }}>
                  <div className="flex items-center space-x-3">
                    <span>2.</span>
                    <DollarSign className="h-5 w-5" />
                    <span>Transfer payment data</span>
                  </div>
                </h4>
                <p className="text-sm" style={{ color: COLORS.textSecondary }}>
                  Secure encrypted transaction exchange
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${COLORS.warning}15` }}
              >
                <RefreshCw className="h-6 w-6" style={{ color: COLORS.warning }} />
              </div>
              <div>
                <h4 className="font-medium" style={{ color: COLORS.textPrimary }}>
                  3. 🔄 Auto-sync when online
                </h4>
                <p className="text-sm" style={{ color: COLORS.textSecondary }}>
                  Transactions process when network returns
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 space-y-3">
          <Button 
            onClick={handleEnableOffline}
            className="w-full h-12 font-semibold"
            style={{ backgroundColor: COLORS.offline, color: 'white' }}
          >
            Continue Offline
          </Button>
          <Button variant="outline" className="w-full h-12">
            Retry Connection
          </Button>
        </div>
      </div>
    );
  }

  if (step === 'scanning') {
    return (
      <div className="min-h-screen" style={{ backgroundColor: COLORS.background }}>
        {/* Header */}
        <div className="flex items-center justify-between p-4" style={{ backgroundColor: COLORS.cardWhite }}>
          <Button variant="ghost" size="icon" onClick={() => setStep('detection')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold" style={{ color: COLORS.textPrimary }}>
            Offline Payment
          </h1>
          <div></div>
        </div>

        {/* Scanning Status */}
        <div className="p-4">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="relative w-20 h-20 mx-auto mb-4">
                <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Bluetooth className="h-8 w-8 text-blue-500" />
                </div>
              </div>
              <h2 className="text-lg font-semibold mb-2" style={{ color: COLORS.textPrimary }}>
                <div className="flex items-center space-x-2">
                <Search className="h-5 w-5" />
                <span>Scanning for devices...</span>
              </div>
              </h2>
              <p className="text-sm" style={{ color: COLORS.textSecondary }}>
                Looking for nearby OPPB-enabled devices
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Available Devices */}
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4" style={{ color: COLORS.textPrimary }}>
            Available Payment Devices:
          </h3>
          <div className="space-y-3">
            {nearbyDevices.map((device) => (
              <Card key={device.id} className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <Button
                    variant="ghost"
                    className="w-full h-auto p-0 justify-start"
                    onClick={() => handleDeviceSelect(device)}
                    disabled={device.status === 'connecting'}
                  >
                    <div className="flex items-center space-x-3 w-full">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: COLORS.primary }}
                      >
                        {renderDeviceIcon(device.icon)}
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium" style={{ color: COLORS.textPrimary }}>
                            {device.name}
                          </h3>
                          <div className="flex">
                            {[...Array(device.trustScore)].map((_, i) => (
                              <Star key={i} className="h-3 w-3 text-yellow-500 fill-current" />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm" style={{ color: COLORS.textSecondary }}>
                          {device.type} • {device.distance}
                        </p>
                      </div>
                      <div className="text-right">
                        {device.status === 'available' ? (
                          <Button size="sm" style={{ backgroundColor: COLORS.success }}>
                            Connect
                          </Button>
                        ) : (
                          <div className="animate-pulse text-sm" style={{ color: COLORS.warning }}>
                            Connecting...
                          </div>
                        )}
                      </div>
                    </div>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Scanning Progress */}
        <div className="p-4">
          <div className="flex items-center justify-center space-x-2">
            <RefreshCw className="h-4 w-4 animate-spin" style={{ color: COLORS.primary }} />
            <span className="text-sm" style={{ color: COLORS.textSecondary }}>
              Scanning... (2 of 5 devices)
            </span>
          </div>
        </div>

        {/* Fallback Options */}
        <div className="p-4 space-y-3">
          <p className="text-center text-sm" style={{ color: COLORS.textSecondary }}>
            Can't find device?
          </p>
          <div className="flex space-x-3">
            <Button variant="outline" className="flex-1">
              <QrCode className="h-4 w-4 mr-2" />
              Show QR Code
            </Button>
            <Button variant="outline" className="flex-1">
              <Edit3 className="h-4 w-4 mr-2" />
              Manual Entry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Transaction Screen
  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.background }}>
      {/* Header */}
      <div className="flex items-center justify-between p-4" style={{ backgroundColor: COLORS.cardWhite }}>
        <Button variant="ghost" size="icon" onClick={() => setStep('scanning')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold" style={{ color: COLORS.textPrimary }}>
          Offline Payment to {selectedDevice?.name}
        </h1>
        <div></div>
      </div>

      <div className="p-4 space-y-6">
        {/* Connection Status */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium" style={{ color: COLORS.success }}>
                <div className="flex items-center space-x-2">
                  <LinkIcon className="h-5 w-5" />
                  <span>Connected via Bluetooth</span>
                </div>
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Merchant Info */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
                style={{ backgroundColor: `${COLORS.offline}15` }}
              >
                {selectedDevice?.icon}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold" style={{ color: COLORS.textPrimary }}>
                  {selectedDevice?.name}
                </h2>
                <p className="text-sm" style={{ color: COLORS.textSecondary }}>
                  {selectedDevice?.type}
                </p>
                <p className="text-sm" style={{ color: COLORS.textSecondary }}>
                  Last seen: Online 2h ago
                </p>
                <div className="flex items-center space-x-1 mt-1">
                  <span className="text-sm">Trust Score:</span>
                  <div className="flex">
                    {[...Array(selectedDevice?.trustScore || 0)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Amount Input */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <label className="block text-sm font-medium mb-3" style={{ color: COLORS.textPrimary }}>
              Amount: ₹
            </label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="150"
              className="text-2xl font-bold h-16 border-2 focus:border-orange-500"
            />
          </CardContent>
        </Card>

        {/* Note Input */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <label className="block text-sm font-medium mb-3" style={{ color: COLORS.textPrimary }}>
              Note:
            </label>
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Groceries"
              className="border-2 focus:border-orange-500"
              rows={2}
            />
          </CardContent>
        </Card>

        {/* Offline Warning */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <WifiOff className="h-5 w-5 mt-1" style={{ color: COLORS.warning }} />
              <div>
                <h4 className="font-medium" style={{ color: COLORS.textPrimary }}>
                  ⚠️ Offline Payment
                </h4>
                <p className="text-sm" style={{ color: COLORS.textSecondary }}>
                  This payment will be processed when you're back online
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Confirm Button */}
        <Button 
          onClick={handleOfflinePayment}
          disabled={!amount || parseFloat(amount) <= 0}
          className="w-full h-14 text-lg font-semibold"
          style={{ backgroundColor: COLORS.offline, color: 'white' }}
        >
          Confirm Offline Payment
        </Button>

        {/* Security Badge */}
        <div className="text-center">
          <p className="text-sm" style={{ color: COLORS.textSecondary }}>
            🔒 Secured with digital signature
          </p>
        </div>
      </div>
    </div>
  );
}