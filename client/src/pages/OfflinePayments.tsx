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
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isBluetoothEnabled ? 'apple-pay-gradient' : 'bg-gray-700'}`}>
                  <Bluetooth className={`w-6 h-6 ${isBluetoothEnabled ? 'text-white' : 'text-gray-400'}`} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Bluetooth Status</h3>
                  <p className={`text-sm ${isBluetoothEnabled ? 'text-green-400' : 'text-gray-400'}`}>
                    {isBluetoothEnabled ? 'Connected & Discoverable' : 'Disabled'}
                  </p>
                </div>
              </div>
              <Button
                onClick={handleBluetoothToggle}
                className={`h-12 px-6 rounded-xl ${isBluetoothEnabled ? 'apple-pay-gradient' : 'apple-pay-glass border-white/20'}`}
              >
                {isBluetoothEnabled ? 'Disable' : 'Enable'}
              </Button>
            </div>
            
            {isBluetoothEnabled && (
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                <div className="text-center">
                  <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <ApplePaySecuritySVG className="w-4 h-4 text-blue-400" />
                  </div>
                  <p className="text-xs text-gray-400">Encrypted</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Signal className="w-4 h-4 text-green-400" />
                  </div>
                  <p className="text-xs text-gray-400">Strong Signal</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <ApplePayContactlessSVG className="w-4 h-4 text-purple-400" />
                  </div>
                  <p className="text-xs text-gray-400">Peer-to-Peer</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Device Discovery Stage */}
      {paymentStage === 'discovery' && (
        <div className="px-6">
          {/* Scanning Status */}
          {isBluetoothEnabled && (
            <Card className="apple-pay-card border-0 mb-6">
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full apple-pay-gradient flex items-center justify-center">
                  <div className={`w-12 h-12 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center ${isScanning ? 'animate-pulse' : ''}`}>
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {isScanning ? 'Scanning for Devices...' : 'Ready to Scan'}
                </h3>
                <p className="text-gray-400 text-sm">
                  {isScanning ? 'Looking for nearby payment-enabled devices' : 'Enable Bluetooth to find nearby devices'}
                </p>
                
                {isScanning && (
                  <div className="flex justify-center space-x-2 mt-6">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Nearby Devices */}
          {nearbyDevices.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <ApplePayLocationSVG className="w-5 h-5 text-blue-400 mr-2" />
                Nearby Devices ({nearbyDevices.length})
              </h3>
              <div className="space-y-3">
                {nearbyDevices.map((device) => (
                  <Card
                    key={device.id}
                    className="apple-pay-card border-0 cursor-pointer hover:scale-[1.02] transition-transform duration-200"
                    onClick={() => handleDeviceSelect(device)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full apple-pay-gradient flex items-center justify-center">
                          {device.type === 'iOS' && <ApplePayPhoneSVG className="w-6 h-6 text-white" />}
                          {device.type === 'Android' && <ApplePayContactlessSVG className="w-6 h-6 text-white" />}
                          {device.type === 'POS' && <ApplePayNFCSVG className="w-6 h-6 text-white" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold text-white">{device.name}</h4>
                            {device.verified && (
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                Verified
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-400 text-sm">{device.upiId}</p>
                          <div className="flex items-center space-x-3 mt-1">
                            <span className="text-gray-500 text-xs flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              {device.distance}
                            </span>
                            <span className="text-gray-500 text-xs flex items-center">
                              <Signal className="w-3 h-3 mr-1" />
                              {device.signal}%
                            </span>
                            <span className="text-gray-500 text-xs">{device.lastSeen}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`w-3 h-3 rounded-full ${device.signal > 80 ? 'bg-green-500' : device.signal > 60 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* No Bluetooth or No Devices */}
          {!isBluetoothEnabled && (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-800/50 flex items-center justify-center">
                <Bluetooth className="w-12 h-12 text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Enable Bluetooth</h3>
              <p className="text-gray-400 max-w-sm mx-auto">
                Turn on Bluetooth to discover nearby devices and make offline payments
              </p>
            </div>
          )}
        </div>
      )}

      {/* Connection Stage */}
      {paymentStage === 'connect' && selectedDevice && (
        <div className="px-6">
          <Card className="apple-pay-card border-0 mb-6">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full apple-pay-gradient flex items-center justify-center">
                  <ApplePayContactlessSVG className="w-10 h-10 text-white animate-pulse" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Connecting to {selectedDevice.name}</h3>
                <p className="text-gray-400">Establishing secure connection...</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-gray-400">Device</span>
                  <span className="text-white font-medium">{selectedDevice.name}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-gray-400">UPI ID</span>
                  <span className="text-white">{selectedDevice.upiId}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-gray-400">Distance</span>
                  <span className="text-white">{selectedDevice.distance}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-400">Signal Strength</span>
                  <span className="text-green-400 font-medium">{selectedDevice.signal}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4 pb-24">
            <Button 
              onClick={handlePayment}
              className="w-full h-14 rounded-2xl apple-pay-gradient text-white font-semibold text-lg"
            >
              Start Payment
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => setPaymentStage('discovery')}
              className="w-full h-12 rounded-xl bg-white/10 backdrop-blur-xl border-white/30 text-white font-semibold hover:bg-white/20 transition-all duration-200"
              style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}
            >
              Choose Different Device
            </Button>
          </div>
        </div>
      )}

      {/* Payment Stage */}
      {paymentStage === 'payment' && (
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="text-center space-y-6">
            <div className="w-32 h-32 mx-auto mb-8 rounded-full apple-pay-gradient flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center">
                <ApplePayNFCSVG className="w-12 h-12 text-white animate-pulse" animated={true} />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-white">Processing Payment</h2>
            <p className="text-gray-400 text-lg">Securely transferring via Bluetooth</p>
            
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 max-w-sm mx-auto">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Method:</span>
                  <span className="text-white">Offline P2P</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Security:</span>
                  <span className="text-green-400">End-to-End Encrypted</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span className="text-yellow-400">Processing...</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-2 mt-6">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      )}

      {/* Success Stage */}
      {paymentStage === 'success' && (
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="text-center space-y-6">
            <div className="w-32 h-32 mx-auto mb-8 rounded-full apple-pay-gradient flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center">
                <ApplePayContactlessSVG className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-white">Offline Payment Successful!</h2>
            <p className="text-gray-400 text-lg">Payment sent to {selectedDevice?.name}</p>
            
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 max-w-sm mx-auto">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Transaction ID:</span>
                  <span className="text-white font-mono">OFF{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Method:</span>
                  <span className="text-white">Bluetooth P2P</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span className="text-green-400 font-medium">Completed Offline</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Sync Status:</span>
                  <span className="text-yellow-400">Will sync when online</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 mt-8 pb-24">
              <Link href="/">
                <Button className="w-full h-14 rounded-2xl apple-pay-gradient text-white font-semibold text-lg">
                  Done
                </Button>
              </Link>
              
              <Button 
                variant="outline"
                onClick={() => {
                  setPaymentStage('discovery');
                  setSelectedDevice(null);
                }}
                className="w-full h-12 rounded-xl bg-white/10 backdrop-blur-xl border-white/30 text-white font-semibold hover:bg-white/20 transition-all duration-200"
                style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}
              >
                Make Another Payment
              </Button>
            </div>
          </div>
        </div>
      )}

      <BottomNavigation activeTab="offline" />
    </div>
  );
}
