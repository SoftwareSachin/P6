import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Wifi, WifiOff, Bluetooth, Users, MapPin, Signal } from "lucide-react";
import { Link } from "wouter";
import { ApplePayContactlessSVG, ApplePayNFCSVG, ApplePaySecuritySVG, ApplePayPhoneSVG, ApplePayLocationSVG } from "@/components/ApplePaySVGs";
import { BottomNavigation } from "@/components/BottomNavigation";

export default function OfflinePayments() {
  const [isBluetoothEnabled, setIsBluetoothEnabled] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [nearbyDevices, setNearbyDevices] = useState<any[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<any>(null);
  const [paymentStage, setPaymentStage] = useState<'discovery' | 'connect' | 'payment' | 'success'>('discovery');

  const mockNearbyDevices = [
    {
      id: 1,
      name: "Rohit's iPhone",
      type: "iOS",
      distance: "2m",
      signal: 85,
      lastSeen: "Just now",
      verified: true,
      upiId: "rohit@paytm"
    },
    {
      id: 2,
      name: "Priya Samsung",
      type: "Android",
      distance: "5m",
      signal: 72,
      lastSeen: "30s ago",
      verified: true,
      upiId: "priya@gpay"
    },
    {
      id: 3,
      name: "Store Terminal",
      type: "POS",
      distance: "1m",
      signal: 95,
      lastSeen: "Just now",
      verified: true,
      upiId: "merchant@store"
    }
  ];

  useEffect(() => {
    if (isScanning) {
      const timer = setTimeout(() => {
        setNearbyDevices(mockNearbyDevices);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isScanning]);

  const handleBluetoothToggle = () => {
    setIsBluetoothEnabled(!isBluetoothEnabled);
    if (!isBluetoothEnabled) {
      setIsScanning(true);
    } else {
      setIsScanning(false);
      setNearbyDevices([]);
    }
  };

  const handleDeviceSelect = (device: any) => {
    setSelectedDevice(device);
    setPaymentStage('connect');
  };

  const handlePayment = () => {
    setPaymentStage('payment');
    setTimeout(() => {
      setPaymentStage('success');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Apple Pay Style Header */}
      <div className="flex items-center justify-between p-6 backdrop-blur-xl bg-black/50 relative z-10">
        <Link href="/">
          <Button variant="ghost" size="icon" className="apple-pay-button h-12 w-12 rounded-full">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <div className="text-center">
          <h1 className="text-xl font-bold text-white">Offline Payments</h1>
          <p className="text-gray-400 text-sm">Pay without internet connection</p>
        </div>
        <div className="w-12 h-12 flex items-center justify-center">
          <WifiOff className="w-6 h-6 text-gray-400" />
        </div>
      </div>

      {/* Connection Status Card */}
      <div className="px-6 mb-6">
        <Card className="apple-pay-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full ${isBluetoothEnabled ? 'bg-blue-500' : 'bg-gray-500'}`}></div>
                <span className="text-white font-medium">Bluetooth</span>
              </div>
              <Button
                onClick={handleBluetoothToggle}
                variant="ghost"
                size="sm"
                className={`${isBluetoothEnabled ? 'text-blue-400' : 'text-gray-400'} hover:text-white`}
              >
                <Bluetooth className="w-5 h-5 mr-2" />
                {isBluetoothEnabled ? 'Enabled' : 'Disabled'}
              </Button>
            </div>
            
            {isBluetoothEnabled && (
              <div className="text-sm text-gray-400">
                {isBluetoothEnabled ? 'Ready for offline payments' : 'Enable Bluetooth to start'}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="px-6 flex-1">
        {paymentStage === 'discovery' && (
          <div className="space-y-6">
            {/* Scanning Status */}
            <Card className="apple-pay-card border-0">
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  {isBluetoothEnabled ? (
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <Users className="w-8 h-8 text-blue-400" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-500/20 flex items-center justify-center">
                      <Bluetooth className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">
                  {isScanning ? 'Scanning for devices...' : 'Discover Nearby Devices'}
                </h3>
                <p className="text-gray-400 mb-4">
                  {isScanning ? 'Looking for payment-enabled devices' : 'Find people and merchants nearby for payments'}
                </p>
                
                {isScanning && (
                  <div className="flex justify-center space-x-1 mb-4">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Nearby Devices */}
            {nearbyDevices.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <ApplePayLocationSVG className="w-5 h-5 mr-2" />
                  Nearby Devices ({nearbyDevices.length})
                </h3>
                
                {nearbyDevices.map((device) => (
                  <Card key={device.id} className="apple-pay-card border-0 cursor-pointer hover:scale-105 transition-transform" onClick={() => handleDeviceSelect(device)}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <ApplePayPhoneSVG className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h4 className="font-semibold text-white">{device.name}</h4>
                              {device.verified && (
                                <Badge className="bg-green-500/20 text-green-400 text-xs">Verified</Badge>
                              )}
                            </div>
                            <p className="text-gray-400 text-sm">{device.upiId}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1 mb-1">
                            <MapPin className="w-3 h-3 text-gray-400" />
                            <span className="text-gray-400 text-xs">{device.distance}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Signal className="w-3 h-3 text-gray-400" />
                            <span className="text-gray-400 text-xs">{device.signal}%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Enable Bluetooth Prompt */}
            {!isBluetoothEnabled && (
              <Card className="apple-pay-card border-0">
                <CardContent className="p-6 text-center">
                  <Bluetooth className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                  <h3 className="text-lg font-semibold text-white mb-2">Enable Bluetooth</h3>
                  <p className="text-gray-400 mb-4">Turn on Bluetooth to discover nearby payment devices</p>
                  <Button onClick={handleBluetoothToggle} className="apple-pay-gradient">
                    Enable Bluetooth
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {paymentStage === 'connect' && selectedDevice && (
          <div className="space-y-6">
            <Card className="apple-pay-card border-0">
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <ApplePayPhoneSVG className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Connect to {selectedDevice.name}</h3>
                <p className="text-gray-400 mb-4">Establishing secure connection...</p>
                <Badge className="bg-blue-500/20 text-blue-400 mb-4">{selectedDevice.upiId}</Badge>
                
                <div className="space-y-3">
                  <Button onClick={handlePayment} className="w-full apple-pay-gradient">
                    Send Payment
                  </Button>
                  <Button 
                    onClick={() => setPaymentStage('discovery')} 
                    variant="ghost" 
                    className="w-full text-gray-400 hover:text-white"
                  >
                    Back to Discovery
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {paymentStage === 'payment' && (
          <div className="space-y-6">
            <Card className="apple-pay-card border-0">
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <ApplePayNFCSVG className="w-10 h-10 text-yellow-400 animate-pulse" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Processing Payment...</h3>
                <p className="text-gray-400 mb-4">Securing transaction with {selectedDevice?.name}</p>
                
                <div className="flex justify-center space-x-1 mb-4">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {paymentStage === 'success' && (
          <div className="space-y-6">
            <Card className="apple-pay-card border-0">
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                  <ApplePaySecuritySVG className="w-10 h-10 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Payment Successful!</h3>
                <p className="text-gray-400 mb-4">₹500 sent to {selectedDevice?.name}</p>
                
                <div className="space-y-3">
                  <Button 
                    onClick={() => {
                      setPaymentStage('discovery');
                      setSelectedDevice(null);
                    }} 
                    className="w-full apple-pay-gradient"
                  >
                    Make Another Payment
                  </Button>
                  <Link href="/">
                    <Button variant="ghost" className="w-full text-gray-400 hover:text-white">
                      Back to Home
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <BottomNavigation activeTab="offline" />
    </div>
  );
}