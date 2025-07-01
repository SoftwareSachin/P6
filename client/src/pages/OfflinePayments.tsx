import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Wifi, WifiOff, Bluetooth, Users, MapPin, Signal } from "lucide-react";
import { Link } from "wouter";
import { ApplePayContactlessSVG, ApplePayNFCSVG, ApplePaySecuritySVG, ApplePayPhoneSVG, ApplePayLocationSVG } from "@/components/ApplePaySVGs";
import { BottomNavigation } from "@/components/BottomNavigation";
import { SwipeToSend } from "@/components/SwipeToSend";

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

  const handleBluetoothToggle = () => {
    setIsBluetoothEnabled(!isBluetoothEnabled);
    if (!isBluetoothEnabled) {
      setIsScanning(true);
      setTimeout(() => {
        setNearbyDevices(mockNearbyDevices);
        setIsScanning(false);
      }, 3000);
    } else {
      setNearbyDevices([]);
      setIsScanning(false);
    }
  };

  const handleDeviceSelect = (device: any) => {
    setSelectedDevice(device);
    setPaymentStage('connect');
    setTimeout(() => {
      setPaymentStage('payment');
    }, 2000);
  };

  const handlePaymentComplete = () => {
    setTimeout(() => {
      setPaymentStage('success');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background Elements - Matching Dashboard */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-black to-gray-900/50" />
        
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-full blur-xl animate-float" />
        <div className="absolute top-60 right-20 w-24 h-24 bg-gradient-to-br from-purple-500/15 to-pink-600/15 rounded-full blur-lg animate-float-delay" />
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-gradient-to-br from-blue-400/10 to-cyan-500/10 rounded-full blur-lg animate-pulse" />
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-xl animate-float-slow" />
        
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        {/* Subtle light rays */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent" />
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-purple-500/20 to-transparent" />
      </div>

      {/* Ultra-Premium Apple Pay Style Header */}
      <div className="relative z-10 px-4 pt-6">
        {/* Header with glass morphism */}
        <div className="flex items-center justify-between p-3 backdrop-blur-2xl bg-white/8 rounded-2xl border border-white/15 shadow-xl">
          <Link href="/">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded-full blur-md" />
              <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <ArrowLeft className="h-5 w-5 text-white" />
              </Button>
            </div>
          </Link>
          
          <div className="text-center">
            <h1 className="text-xl font-bold text-white bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              Offline Payments
            </h1>
            <p className="text-white/60 text-xs font-medium">Pay without internet</p>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/15 to-red-500/15 rounded-xl blur-md" />
            <div className="relative w-10 h-10 rounded-xl bg-orange-500/15 backdrop-blur-xl border border-orange-500/25 flex items-center justify-center">
              <WifiOff className="w-5 h-5 text-orange-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Ultra-Premium Connection Status Card */}
      <div className="px-4 mb-6 relative z-10">
        <div className="mt-4 relative">
          {/* Card glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-blue-500/15 rounded-2xl blur-lg" />
          
          <Card className="relative backdrop-blur-2xl bg-white/8 border border-white/15 rounded-2xl shadow-xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    {/* Icon glow effect */}
                    <div className={`absolute inset-0 rounded-full blur-lg ${
                      isBluetoothEnabled 
                        ? 'bg-gradient-to-r from-blue-500/30 to-purple-500/30' 
                        : 'bg-gray-500/20'
                    }`} />
                    <div className={`relative w-14 h-14 rounded-full flex items-center justify-center border ${
                      isBluetoothEnabled 
                        ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-500/30' 
                        : 'bg-gray-700/30 border-gray-600/30'
                    }`}>
                      <Bluetooth className={`w-7 h-7 ${isBluetoothEnabled ? 'text-blue-300' : 'text-gray-400'}`} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                      Bluetooth Status
                    </h3>
                    <p className={`text-sm font-medium ${isBluetoothEnabled ? 'text-green-300' : 'text-gray-400'}`}>
                      {isBluetoothEnabled ? 'Connected & Discoverable' : 'Disabled'}
                    </p>
                  </div>
                </div>
                
                <div className="relative">
                  <div className={`absolute inset-0 rounded-xl blur-md ${
                    isBluetoothEnabled ? 'bg-red-500/20' : 'bg-blue-500/20'
                  }`} />
                  <Button
                    onClick={handleBluetoothToggle}
                    className={`relative h-12 px-6 rounded-xl backdrop-blur-xl border transition-all duration-300 hover:scale-105 ${
                      isBluetoothEnabled 
                        ? 'bg-red-500/15 border-red-500/30 text-red-300 hover:bg-red-500/20' 
                        : 'bg-blue-500/15 border-blue-500/30 text-blue-300 hover:bg-blue-500/20'
                    }`}
                  >
                    {isBluetoothEnabled ? 'Disable' : 'Enable'}
                  </Button>
                </div>
              </div>
            
              {isBluetoothEnabled && (
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                  <div className="text-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-md" />
                      <div className="relative w-10 h-10 mx-auto mb-3 rounded-full bg-blue-500/15 backdrop-blur-xl border border-blue-500/25 flex items-center justify-center">
                        <ApplePaySecuritySVG className="w-5 h-5 text-blue-300" />
                      </div>
                    </div>
                    <p className="text-xs text-white/60 font-medium">Encrypted</p>
                  </div>
                  <div className="text-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-green-500/20 rounded-full blur-md" />
                      <div className="relative w-10 h-10 mx-auto mb-3 rounded-full bg-green-500/15 backdrop-blur-xl border border-green-500/25 flex items-center justify-center">
                        <Signal className="w-5 h-5 text-green-300" />
                      </div>
                    </div>
                    <p className="text-xs text-white/60 font-medium">Strong Signal</p>
                  </div>
                  <div className="text-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-md" />
                      <div className="relative w-10 h-10 mx-auto mb-3 rounded-full bg-purple-500/15 backdrop-blur-xl border border-purple-500/25 flex items-center justify-center">
                        <ApplePayContactlessSVG className="w-5 h-5 text-purple-300" />
                      </div>
                    </div>
                    <p className="text-xs text-white/60 font-medium">Peer-to-Peer</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Ultra-Premium Device Discovery Stage */}
      {paymentStage === 'discovery' && (
        <div className="px-4 relative z-10">
          {/* Ultra-Premium Scanning Status */}
          {isBluetoothEnabled && (
            <div className="mb-6 relative">
              {/* Card glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 rounded-2xl blur-lg" />
              
              <Card className="relative backdrop-blur-2xl bg-white/8 border border-white/15 rounded-2xl shadow-xl overflow-hidden">
                <CardContent className="p-8 text-center">
                  <div className="relative mb-6">
                    {/* Central scanning icon with advanced effects */}
                    <div className="relative w-24 h-24 mx-auto">
                      <div className={`absolute inset-0 rounded-full ${
                        isScanning 
                          ? 'bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-blue-500/30 animate-pulse' 
                          : 'bg-gradient-to-br from-blue-500/20 to-purple-500/20'
                      } blur-lg`} />
                      <div className={`relative w-full h-full rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-blue-500/30 flex items-center justify-center ${
                        isScanning ? 'animate-pulse shadow-2xl shadow-blue-500/25' : ''
                      }`}>
                        <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center">
                          <Users className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent mb-3">
                    {isScanning ? 'Scanning for Devices...' : 'Ready to Scan'}
                  </h3>
                  <p className="text-white/60 text-sm font-medium mb-6">
                    {isScanning ? 'Looking for nearby payment-enabled devices' : 'Enable Bluetooth to find nearby devices'}
                  </p>
                  
                  {isScanning && (
                    <div className="flex justify-center space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full animate-bounce shadow-lg shadow-blue-500/50" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full animate-bounce shadow-lg shadow-purple-500/50" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full animate-bounce shadow-lg shadow-blue-500/50" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Ultra-Premium Nearby Devices List */}
          {nearbyDevices.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent flex items-center">
                  <ApplePayLocationSVG className="w-5 h-5 text-blue-400 mr-2" />
                  Nearby Devices ({nearbyDevices.length})
                </h3>
              </div>
              
              <div className="space-y-3">
                {nearbyDevices.map((device) => (
                  <div key={device.id} className="relative">
                    {/* Card glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-md" />
                    
                    <Card className="relative backdrop-blur-2xl bg-white/8 border border-white/15 rounded-xl shadow-lg overflow-hidden hover:bg-white/12 transition-all duration-300 hover:scale-[1.02]">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="relative">
                              <div className="absolute inset-0 bg-green-500/20 rounded-full blur-md" />
                              <div className="relative w-12 h-12 rounded-full bg-green-500/15 backdrop-blur-xl border border-green-500/25 flex items-center justify-center">
                                <ApplePayPhoneSVG className="w-6 h-6 text-green-300" />
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <h4 className="font-bold text-white">{device.name}</h4>
                                {device.verified && (
                                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                    <div className="w-2 h-2 bg-white rounded-full" />
                                  </div>
                                )}
                              </div>
                              <p className="text-xs text-white/60">{device.upiId} • {device.distance}</p>
                              <p className="text-xs text-green-300">{device.lastSeen}</p>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="flex items-center space-x-2 mb-2">
                              <Signal className="w-4 h-4 text-blue-400" />
                              <span className="text-sm text-blue-300">{device.signal}%</span>
                            </div>
                            <Button
                              onClick={() => handleDeviceSelect(device)}
                              className="h-10 px-4 rounded-lg bg-blue-500/15 border border-blue-500/30 text-blue-300 hover:bg-blue-500/20 backdrop-blur-xl transition-all duration-300 hover:scale-105"
                            >
                              Connect
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!isBluetoothEnabled && (
            <div className="text-center py-16">
              <div className="relative w-20 h-20 mx-auto mb-4">
                <div className="absolute inset-0 bg-gray-500/20 rounded-full blur-md" />
                <div className="relative w-full h-full rounded-full bg-gray-700/30 border border-gray-600/30 flex items-center justify-center">
                  <Bluetooth className="w-10 h-10 text-gray-400" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-white/80 mb-2">Bluetooth Required</h3>
              <p className="text-white/60 text-sm">Enable Bluetooth to discover nearby payment devices</p>
            </div>
          )}
        </div>
      )}

      {/* Payment Success Stage */}
      {paymentStage === 'success' && (
        <div className="px-4 py-8 text-center relative z-10">
          <div className="relative mb-8">
            {/* Success animation */}
            <div className="relative w-32 h-32 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/30 to-emerald-500/30 rounded-full blur-xl animate-pulse" />
              <div className="relative w-full h-full rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-xl border border-green-500/30 flex items-center justify-center shadow-2xl shadow-green-500/25">
                <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center">
                  <div className="w-12 h-12 text-green-300">✓</div>
                </div>
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-white bg-gradient-to-r from-white via-green-100 to-white bg-clip-text text-transparent mb-4">
            Payment Successful!
          </h2>
          <p className="text-white/60 text-sm mb-8">
            Offline payment completed successfully
          </p>
          
          <div className="space-y-4">
            <SwipeToSend
              onComplete={() => {
                setPaymentStage('discovery');
                setSelectedDevice(null);
              }}
              text="Swipe for Another Payment"
              variant="glass"
              size="medium"
            />
          </div>
        </div>
      )}

      <BottomNavigation activeTab="offline" />
    </div>
  );
}