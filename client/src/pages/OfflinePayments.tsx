import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Bluetooth, Users, Signal, CheckCircle, Smartphone, X, CreditCard, Shield, Battery, Star, MapPin, Send, Lock, KeyRound, Zap, Clock, Check, Loader2 } from "lucide-react";
import { Link, useLocation } from "wouter";
import { BottomNavigation } from "@/components/BottomNavigation";

export default function OfflinePayments() {
  const [, setLocation] = useLocation();
  const [isBluetoothEnabled, setIsBluetoothEnabled] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [nearbyDevices, setNearbyDevices] = useState<any[]>([]);
  const [filteredDevices, setFilteredDevices] = useState<any[]>([]);
  const [paymentStage] = useState<'discovery'>('discovery');
  const [selectedDevice, setSelectedDevice] = useState<any>(null);
  const [showDeviceDetails, setShowDeviceDetails] = useState(false);
  
  // OTP and Payment states
  const [showOTPVerification, setShowOTPVerification] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [isVerifyingOTP, setIsVerifyingOTP] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpTimer, setOtpTimer] = useState(30);
  const [canResendOTP, setCanResendOTP] = useState(false);

  const getDeviceIcon = (type: string) => {
    return Smartphone;
  };

  const handleBluetoothToggle = () => {
    if (isBluetoothEnabled) {
      setIsBluetoothEnabled(false);
      setIsScanning(false);
      setNearbyDevices([]);
    } else {
      setIsBluetoothEnabled(true);
      startBluetoothScan();
    }
  };

  const startBluetoothScan = async () => {
    setIsScanning(true);
    setNearbyDevices([]);

    try {
      const response = await fetch('/api/offline/devices');
      const devices = await response.json();
      console.log('📱 Fetched', devices.length, 'offline devices');
      
      setNearbyDevices(devices);
      setFilteredDevices(devices);
      setIsScanning(false);
    } catch (error) {
      console.error('Failed to fetch devices:', error);
      setIsScanning(false);
    }
  };

  const handleDeviceSelect = (device: any) => {
    console.log('Selected device:', device.name);
    setSelectedDevice(device);
    setShowDeviceDetails(true);
    setOtpVerified(false);
    setShowOTPVerification(false);
    setOtpCode('');
  };

  // OTP Timer Effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (showOTPVerification && otpTimer > 0 && !canResendOTP) {
      interval = setInterval(() => {
        setOtpTimer((prev) => {
          if (prev <= 1) {
            setCanResendOTP(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showOTPVerification, otpTimer, canResendOTP]);

  const handleInitiateOTP = async () => {
    setShowOTPVerification(true);
    setOtpTimer(30);
    setCanResendOTP(false);
    
    // Simulate OTP generation
    try {
      const response = await fetch('/api/offline/otp/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fromDeviceId: 'current-device',
          toDeviceId: selectedDevice.deviceId,
          amount: 0 // For verification only
        })
      });
      
      if (response.ok) {
        console.log('📱 OTP verification initiated for device:', selectedDevice.name);
      }
    } catch (error) {
      console.error('Failed to initiate OTP:', error);
    }
  };

  const handleVerifyOTP = async () => {
    if (otpCode.length !== 6) return;
    
    setIsVerifyingOTP(true);
    
    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setOtpVerified(true);
      setIsVerifyingOTP(false);
      setShowOTPVerification(false);
      
      console.log('✅ OTP verified successfully for device:', selectedDevice.name);
    } catch (error) {
      console.error('Failed to verify OTP:', error);
      setIsVerifyingOTP(false);
    }
  };

  const handleSendPayment = () => {
    // Navigate to send money page with device details pre-filled
    setLocation(`/send-money?deviceId=${selectedDevice.deviceId}&deviceName=${encodeURIComponent(selectedDevice.name)}&ownerName=${encodeURIComponent(selectedDevice.ownerName)}&ownerPhone=${selectedDevice.ownerPhone}`);
  };

  const formatOTPInput = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.slice(0, 6);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-black to-gray-900/50" />
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-full blur-xl animate-float" />
        <div className="absolute top-60 right-20 w-24 h-24 bg-gradient-to-br from-purple-500/15 to-pink-600/15 rounded-full blur-lg animate-float-delay" />
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-gradient-to-br from-blue-400/10 to-cyan-500/10 rounded-full blur-lg animate-pulse" />
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-xl animate-float-slow" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 pb-20 min-h-screen">
        {/* Header */}
        <div className="px-4 pt-6 pb-4">
          <div className="flex items-center justify-between p-4 backdrop-blur-2xl bg-white/8 rounded-2xl border border-white/15 shadow-xl">
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
            
            <div className="w-10 h-10"></div>
          </div>
        </div>
        
        {/* Bluetooth Status Card */}
        <div className="px-4 mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-blue-500/15 rounded-2xl blur-lg" />
            
            <Card className="relative backdrop-blur-2xl bg-white/8 border border-white/15 rounded-2xl shadow-xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
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
                  
                  <Button
                    onClick={handleBluetoothToggle}
                    className={`h-12 px-6 rounded-xl font-semibold backdrop-blur-xl border transition-all duration-300 hover:scale-105 ${
                      isBluetoothEnabled 
                        ? 'bg-red-500/15 border-red-500/30 text-red-300 hover:bg-red-500/20' 
                        : 'bg-blue-500/15 border-blue-500/30 text-blue-300 hover:bg-blue-500/20'
                    }`}
                  >
                    {isBluetoothEnabled ? 'Disconnect' : 'Enable Bluetooth'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Instructions when Bluetooth is disabled */}
        {!isBluetoothEnabled && (
          <div className="px-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 via-gray-400/10 to-gray-500/10 rounded-2xl blur-lg" />
              
              <Card className="relative backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl shadow-xl">
                <CardContent className="p-6 text-center">
                  <div className="relative w-16 h-16 mx-auto mb-4">
                    <div className="absolute inset-0 bg-gray-500/20 rounded-full blur-md" />
                    <div className="relative w-16 h-16 rounded-full bg-gray-500/15 backdrop-blur-xl border border-gray-500/25 flex items-center justify-center">
                      <Bluetooth className="w-8 h-8 text-gray-400" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white/80 mb-2">
                    Enable Bluetooth to Discover Devices
                  </h3>
                  <p className="text-white/60 text-sm">
                    Turn on Bluetooth to start scanning for nearby payment devices
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Discovery Stage - Only show when Bluetooth is enabled */}
        {paymentStage === 'discovery' && isBluetoothEnabled && (
          <div className="px-4 space-y-6">
            {/* Nearby Devices List */}
            {filteredDevices.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent flex items-center">
                    <Users className="w-5 h-5 mr-2 text-blue-300" />
                    Nearby Devices ({filteredDevices.length})
                  </h3>
                </div>
                
                {/* Device Cards - Minimal Layout */}
                <div className="space-y-3">
                  {filteredDevices.map((device, index) => (
                    <div key={device.id} className="relative group">
                      <Card 
                        className="relative backdrop-blur-2xl bg-white/8 border border-white/15 rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:bg-white/12"
                        onClick={() => handleDeviceSelect(device)}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between">
                            {/* Device Name */}
                            <div className="flex-1 min-w-0">
                              <h4 className="text-white font-medium text-sm truncate">
                                {device.name}
                              </h4>
                              <p className="text-white/60 text-xs truncate">
                                {device.model} • {device.distance || `${(Math.random() * 10).toFixed(1)}m`}
                              </p>
                            </div>
                            
                            {/* Connect Button */}
                            <Button
                              size="sm"
                              className="h-8 px-4 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-300 text-xs font-medium ml-3"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeviceSelect(device);
                              }}
                            >
                              Connect
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Ultra-Premium Device Details Modal */}
        {showDeviceDetails && selectedDevice && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-2xl z-50 flex items-end">
            {/* Floating Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full blur-2xl animate-pulse" />
              <div className="absolute bottom-32 right-10 w-28 h-28 bg-gradient-to-br from-purple-500/15 to-pink-600/15 rounded-full blur-xl animate-float" />
            </div>

            <div className="relative w-full bg-gradient-to-b from-gray-900/95 via-gray-800/98 to-gray-900/95 backdrop-blur-3xl rounded-t-3xl border-t border-white/10 shadow-2xl max-h-[85vh] overflow-y-auto">
              {/* Premium Modal Header */}
              <div className="sticky top-0 bg-gradient-to-b from-gray-900/98 to-transparent backdrop-blur-xl z-10 px-6 pt-6 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-1 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                      Device Details
                    </h2>
                    <p className="text-white/60 text-sm font-medium">Premium secure connection</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowDeviceDetails(false)}
                    className="h-12 w-12 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-xl transition-all duration-300 hover:scale-105"
                  >
                    <X className="h-6 w-6 text-white" />
                  </Button>
                </div>
              </div>

              <div className="px-6 pb-8">
                {/* Premium Device Header */}
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 rounded-3xl blur-lg" />
                  
                  <Card className="relative backdrop-blur-2xl bg-white/5 border border-white/15 rounded-3xl overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-5">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-600/30 rounded-2xl blur-md" />
                          <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-white/20 flex items-center justify-center backdrop-blur-xl overflow-hidden">
                            {selectedDevice.profileImage ? (
                              <img 
                                src={selectedDevice.profileImage} 
                                alt={selectedDevice.name}
                                className="w-full h-full object-cover rounded-2xl"
                              />
                            ) : (
                              <Smartphone className="w-10 h-10 text-blue-300" />
                            )}
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-bold text-white bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                              {selectedDevice.name}
                            </h3>
                            {selectedDevice.isVerified && (
                              <div className="relative">
                                <div className="absolute inset-0 bg-green-500/30 rounded-full blur-sm" />
                                <CheckCircle className="relative w-6 h-6 text-green-400" />
                              </div>
                            )}
                          </div>
                          <p className="text-white/70 text-sm font-medium mb-1">{selectedDevice.model}</p>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                              <span className="text-green-400 text-xs font-medium">Online</span>
                            </div>
                            <span className="text-white/40">•</span>
                            <span className="text-white/60 text-xs">{selectedDevice.distance}m away</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Premium Info Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-2xl blur-md group-hover:blur-lg transition-all duration-300" />
                    <Card className="relative backdrop-blur-xl bg-white/8 border border-white/15 rounded-2xl hover:bg-white/12 transition-all duration-300">
                      <CardContent className="p-5">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="p-2 bg-green-500/20 rounded-xl">
                            <Signal className="w-5 h-5 text-green-400" />
                          </div>
                          <span className="text-white/80 text-sm font-medium">Signal Strength</span>
                        </div>
                        <p className="text-white font-bold text-lg">{selectedDevice.signalStrength}%</p>
                        <div className="flex space-x-1 mt-2">
                          {[...Array(5)].map((_, i) => (
                            <div 
                              key={i}
                              className={`h-1.5 rounded-full flex-1 ${
                                i < Math.floor(selectedDevice.signalStrength / 20) 
                                  ? 'bg-green-400' 
                                  : 'bg-white/20'
                              }`} 
                            />
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-600/20 rounded-2xl blur-md group-hover:blur-lg transition-all duration-300" />
                    <Card className="relative backdrop-blur-xl bg-white/8 border border-white/15 rounded-2xl hover:bg-white/12 transition-all duration-300">
                      <CardContent className="p-5">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="p-2 bg-blue-500/20 rounded-xl">
                            <MapPin className="w-5 h-5 text-blue-400" />
                          </div>
                          <span className="text-white/80 text-sm font-medium">Distance</span>
                        </div>
                        <p className="text-white font-bold text-lg">{selectedDevice.distance}m</p>
                        <p className="text-blue-400 text-xs font-medium mt-1">Ultra close range</p>
                      </CardContent>
                    </Card>
                  </div>

                  {selectedDevice.batteryLevel && (
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-orange-600/20 rounded-2xl blur-md group-hover:blur-lg transition-all duration-300" />
                      <Card className="relative backdrop-blur-xl bg-white/8 border border-white/15 rounded-2xl hover:bg-white/12 transition-all duration-300">
                        <CardContent className="p-5">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="p-2 bg-green-500/20 rounded-xl">
                              <Battery className="w-5 h-5 text-green-400" />
                            </div>
                            <span className="text-white/80 text-sm font-medium">Battery</span>
                          </div>
                          <p className="text-white font-bold text-lg">{selectedDevice.batteryLevel}%</p>
                          <div className="w-full bg-white/20 rounded-full h-1.5 mt-2">
                            <div 
                              className="bg-green-400 h-1.5 rounded-full transition-all duration-500"
                              style={{ width: `${selectedDevice.batteryLevel}%` }}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {selectedDevice.rating && (
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-amber-600/20 rounded-2xl blur-md group-hover:blur-lg transition-all duration-300" />
                      <Card className="relative backdrop-blur-xl bg-white/8 border border-white/15 rounded-2xl hover:bg-white/12 transition-all duration-300">
                        <CardContent className="p-5">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="p-2 bg-yellow-500/20 rounded-xl">
                              <Star className="w-5 h-5 text-yellow-400" />
                            </div>
                            <span className="text-white/80 text-sm font-medium">Trust Rating</span>
                          </div>
                          <p className="text-white font-bold text-lg">{selectedDevice.rating}/5.0</p>
                          <div className="flex space-x-1 mt-2">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i}
                                className={`w-3 h-3 ${
                                  i < Math.floor(selectedDevice.rating) 
                                    ? 'text-yellow-400 fill-current' 
                                    : 'text-white/30'
                                }`} 
                              />
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </div>

                {/* Premium Security Section */}
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/15 via-pink-500/15 to-purple-500/15 rounded-3xl blur-lg" />
                  
                  <Card className="relative backdrop-blur-2xl bg-white/5 border border-white/15 rounded-3xl">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-5">
                        <div className="p-3 bg-purple-500/20 rounded-2xl">
                          <Shield className="w-6 h-6 text-purple-400" />
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-lg">Security & Trust</h4>
                          <p className="text-white/60 text-sm">Enterprise-grade protection</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-3">
                        {selectedDevice.isVerified && (
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-4 py-2 text-sm font-medium">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Verified Device
                          </Badge>
                        )}
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-4 py-2 text-sm font-medium">
                          <Lock className="w-4 h-4 mr-2" />
                          {selectedDevice.encryption || 'RSA-2048'}
                        </Badge>
                        {selectedDevice.transactionCount > 0 && (
                          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 px-4 py-2 text-sm font-medium">
                            <Zap className="w-4 h-4 mr-2" />
                            {selectedDevice.transactionCount} Transactions
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* OTP Verification Section */}
                {!otpVerified && !showOTPVerification && (
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 via-cyan-500/15 to-blue-500/15 rounded-3xl blur-lg" />
                    
                    <Card className="relative backdrop-blur-2xl bg-white/5 border border-white/15 rounded-3xl">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="p-3 bg-blue-500/20 rounded-2xl">
                            <KeyRound className="w-6 h-6 text-blue-400" />
                          </div>
                          <div>
                            <h4 className="text-white font-bold text-lg">Secure Verification</h4>
                            <p className="text-white/60 text-sm">Verify device before payment</p>
                          </div>
                        </div>
                        
                        <Button
                          onClick={handleInitiateOTP}
                          className="w-full h-14 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-2xl border-0 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
                        >
                          <KeyRound className="w-5 h-5 mr-3" />
                          Initiate OTP Verification
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* OTP Input Section */}
                {showOTPVerification && !otpVerified && (
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/15 via-yellow-500/15 to-orange-500/15 rounded-3xl blur-lg" />
                    
                    <Card className="relative backdrop-blur-2xl bg-white/5 border border-white/15 rounded-3xl">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4 mb-6">
                          <div className="p-3 bg-orange-500/20 rounded-2xl">
                            <Lock className="w-6 h-6 text-orange-400" />
                          </div>
                          <div>
                            <h4 className="text-white font-bold text-lg">Enter Verification Code</h4>
                            <p className="text-white/60 text-sm">6-digit code sent to device</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <Input
                            type="text"
                            value={otpCode}
                            onChange={(e) => setOtpCode(formatOTPInput(e.target.value))}
                            placeholder="Enter 6-digit OTP"
                            className="h-14 bg-white/10 border-white/20 rounded-2xl text-white text-center text-xl font-bold tracking-widest placeholder:text-white/40 focus:bg-white/15 focus:border-blue-500/50 transition-all duration-300"
                            maxLength={6}
                          />

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-white/60" />
                              <span className="text-white/60 text-sm">
                                {canResendOTP ? 'Code expired' : `Resend in ${otpTimer}s`}
                              </span>
                            </div>
                            
                            {canResendOTP && (
                              <Button
                                variant="ghost"
                                onClick={handleInitiateOTP}
                                className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 font-medium"
                              >
                                Resend Code
                              </Button>
                            )}
                          </div>

                          <Button
                            onClick={handleVerifyOTP}
                            disabled={otpCode.length !== 6 || isVerifyingOTP}
                            className="w-full h-14 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold rounded-2xl border-0 shadow-lg transform transition-all duration-300 disabled:transform-none"
                          >
                            {isVerifyingOTP ? (
                              <>
                                <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                                Verifying...
                              </>
                            ) : (
                              <>
                                <Check className="w-5 h-5 mr-3" />
                                Verify Code
                              </>
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Verified Success Section */}
                {otpVerified && (
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/15 via-emerald-500/15 to-green-500/15 rounded-3xl blur-lg" />
                    
                    <Card className="relative backdrop-blur-2xl bg-white/5 border border-green-500/20 rounded-3xl">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-green-500/20 rounded-2xl">
                            <Check className="w-6 h-6 text-green-400" />
                          </div>
                          <div>
                            <h4 className="text-green-400 font-bold text-lg">Device Verified</h4>
                            <p className="text-white/60 text-sm">Secure connection established</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Premium Action Buttons */}
                <div className="space-y-4">
                  {otpVerified && (
                    <Button
                      onClick={() => {
                        console.log('🚀 Navigating to send money with device details:', selectedDevice.ownerName);
                        handleSendPayment();
                      }}
                      className="w-full h-16 bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 hover:from-green-600 hover:via-emerald-600 hover:to-green-600 text-white font-bold text-lg rounded-2xl border-0 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300"
                    >
                      <Send className="w-6 h-6 mr-3" />
                      Send Payment to {selectedDevice.ownerName}
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    onClick={() => setShowDeviceDetails(false)}
                    className="w-full h-14 bg-white/5 hover:bg-white/10 border-white/20 hover:border-white/30 text-white font-semibold rounded-2xl backdrop-blur-xl transition-all duration-300"
                  >
                    Close Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <BottomNavigation activeTab="offline" />
      </div>
    </div>
  );
}