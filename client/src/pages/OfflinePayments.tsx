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
                <div className="space-y-6">
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
                    <div className="flex-1">
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
                    className={`w-full h-12 px-6 rounded-xl font-semibold backdrop-blur-xl border transition-all duration-300 hover:scale-105 ${
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

        {/* Ultra-Premium Apple Pay Device Details Modal */}
        {showDeviceDetails && selectedDevice && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-3xl z-50 flex items-end">
            {/* Premium Ambient Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-16 left-8 w-40 h-40 bg-gradient-to-br from-blue-500/15 via-cyan-400/10 to-blue-600/15 rounded-full blur-3xl animate-pulse" />
              <div className="absolute top-32 right-12 w-32 h-32 bg-gradient-to-br from-purple-500/12 via-pink-400/8 to-purple-600/12 rounded-full blur-2xl animate-float" />
              <div className="absolute bottom-40 left-16 w-24 h-24 bg-gradient-to-br from-emerald-500/10 via-green-400/8 to-emerald-600/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute bottom-20 right-8 w-36 h-36 bg-gradient-to-br from-indigo-500/12 via-blue-400/8 to-indigo-600/12 rounded-full blur-2xl animate-float-slow" />
            </div>

            {/* Ultra-Premium Glass Container */}
            <div className="relative w-full bg-gradient-to-b from-gray-900/98 via-gray-800/99 to-black/98 backdrop-blur-3xl rounded-t-[32px] border-t-2 border-white/15 shadow-[0_-8px_32px_rgba(0,0,0,0.3),0_-1px_1px_rgba(255,255,255,0.1)] max-h-[88vh] overflow-y-auto"
                 style={{ 
                   background: 'linear-gradient(to bottom, rgba(17,24,39,0.98), rgba(31,41,55,0.99), rgba(0,0,0,0.98))',
                   backdropFilter: 'blur(40px) saturate(180%)',
                   WebkitBackdropFilter: 'blur(40px) saturate(180%)'
                 }}>
              {/* Ultra-Premium Apple Pay Modal Header */}
              <div className="sticky top-0 z-20 px-6 pt-8 pb-6"
                   style={{ 
                     background: 'linear-gradient(to bottom, rgba(17,24,39,0.98) 0%, rgba(17,24,39,0.95) 70%, transparent 100%)',
                     backdropFilter: 'blur(24px) saturate(200%)',
                     WebkitBackdropFilter: 'blur(24px) saturate(200%)'
                   }}>
                
                {/* Header Control Bar */}
                <div className="flex items-center justify-center mb-4">
                  <div className="w-10 h-1.5 bg-white/25 rounded-full" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl font-black text-white mb-1" 
                        style={{ 
                          fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                          background: 'linear-gradient(135deg, #ffffff 0%, #e0f2fe 50%, #ffffff 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          textShadow: '0 0 20px rgba(255,255,255,0.1)',
                          letterSpacing: '-0.025em'
                        }}>
                      Device Details
                    </h2>
                    <p className="text-white/70 text-sm font-medium" 
                       style={{ fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                      Enterprise Security • Premium Connection
                    </p>
                  </div>
                  
                  {/* Premium Close Button */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-white/5 rounded-2xl blur-sm" />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowDeviceDetails(false)}
                      className="relative h-12 w-12 rounded-2xl border border-white/20 backdrop-blur-2xl transition-all duration-300 hover:scale-105 hover:border-white/30"
                      style={{ 
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.2)'
                      }}
                    >
                      <X className="h-5 w-5 text-white/90" style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.2))' }} />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-8">
                {/* Ultra-Premium Apple Pay Device Header */}
                <div className="relative mb-10">
                  {/* Ambient Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/8 via-cyan-400/6 to-blue-500/8 rounded-[28px] blur-2xl scale-105" />
                  
                  <div className="relative backdrop-blur-3xl border border-white/20 rounded-[28px] overflow-hidden"
                       style={{ 
                         background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
                         boxShadow: '0 8px 32px rgba(0,0,0,0.2), 0 1px 1px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.15)'
                       }}>
                    <div className="p-8">
                      <div className="flex items-center space-x-6">
                        {/* Premium Avatar */}
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/25 via-cyan-400/15 to-blue-600/25 rounded-[20px] blur-lg scale-110" />
                          <div className="relative w-24 h-24 rounded-[20px] border-2 border-white/25 flex items-center justify-center backdrop-blur-2xl overflow-hidden"
                               style={{ 
                                 background: 'linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(147,51,234,0.15) 100%)',
                                 boxShadow: '0 8px 24px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)'
                               }}>
                            {selectedDevice.profileImage ? (
                              <img 
                                src={selectedDevice.profileImage} 
                                alt={selectedDevice.name}
                                className="w-full h-full object-cover rounded-[18px]"
                                style={{ filter: 'saturate(110%) contrast(105%)' }}
                              />
                            ) : (
                              <Smartphone className="w-12 h-12 text-blue-300/90" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }} />
                            )}
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1 min-w-0 pr-3">
                              <h3 className="text-xl font-black text-white truncate" 
                                  style={{ 
                                    fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                                    background: 'linear-gradient(135deg, #ffffff 0%, #e0f2fe 30%, #ffffff 70%, #f0f9ff 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    letterSpacing: '-0.01em',
                                    textShadow: '0 0 20px rgba(255,255,255,0.1)'
                                  }}>
                                {selectedDevice.name}
                              </h3>
                            </div>
                            {selectedDevice.isVerified && (
                              <div className="relative flex-shrink-0">
                                <div className="absolute inset-0 bg-green-400/30 rounded-full blur-md scale-125" />
                                <div className="relative w-6 h-6 bg-green-400/20 border border-green-400/40 rounded-full flex items-center justify-center backdrop-blur-xl">
                                  <CheckCircle className="w-3.5 h-3.5 text-green-400" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }} />
                                </div>
                              </div>
                            )}
                          </div>
                          
                          <p className="text-white/75 text-sm font-medium mb-3 truncate" 
                             style={{ fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                            {selectedDevice.model}
                          </p>
                          
                          <div className="flex flex-wrap items-center gap-2">
                            <div className="flex items-center space-x-1.5 px-2.5 py-1 bg-green-500/15 border border-green-500/25 rounded-full backdrop-blur-xl">
                              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" 
                                   style={{ boxShadow: '0 0 6px rgba(34,197,94,0.6)' }} />
                              <span className="text-green-400 text-xs font-medium" 
                                    style={{ fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                                Online
                              </span>
                            </div>
                            
                            <div className="flex items-center space-x-1.5 px-2.5 py-1 bg-blue-500/15 border border-blue-500/25 rounded-full backdrop-blur-xl">
                              <MapPin className="w-3 h-3 text-blue-400" />
                              <span className="text-blue-400 text-xs font-medium" 
                                    style={{ fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                                {selectedDevice.distance}m
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ultra-Premium Apple Pay Info Grid */}
                <div className="grid grid-cols-2 gap-5 mb-10">
                  {/* Signal Strength Card */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/12 via-emerald-400/8 to-green-600/12 rounded-[20px] blur-xl scale-105 group-hover:scale-110 transition-all duration-500" />
                    <div className="relative backdrop-blur-3xl border border-white/20 rounded-[20px] group-hover:border-white/25 transition-all duration-300"
                         style={{ 
                           background: 'linear-gradient(135deg, rgba(34,197,94,0.08) 0%, rgba(16,185,129,0.04) 100%)',
                           boxShadow: '0 8px 24px rgba(0,0,0,0.15), 0 1px 1px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.12)'
                         }}>
                      <div className="p-6">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="w-10 h-10 rounded-[14px] flex items-center justify-center"
                               style={{ 
                                 background: 'linear-gradient(135deg, rgba(34,197,94,0.2) 0%, rgba(16,185,129,0.15) 100%)',
                                 boxShadow: '0 4px 12px rgba(34,197,94,0.2), inset 0 1px 0 rgba(255,255,255,0.2)'
                               }}>
                            <Signal className="w-5 h-5 text-green-400" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }} />
                          </div>
                          <span className="text-white/85 text-sm font-medium" 
                                style={{ fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                            Signal
                          </span>
                        </div>
                        <p className="text-white font-bold text-xl mb-3" 
                           style={{ 
                             fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                             letterSpacing: '-0.01em'
                           }}>
                          {selectedDevice.signalStrength}%
                        </p>
                        <div className="flex space-x-1.5">
                          {[...Array(5)].map((_, i) => (
                            <div 
                              key={i}
                              className={`h-2 rounded-full flex-1 transition-all duration-300 ${
                                i < Math.floor(selectedDevice.signalStrength / 20) 
                                  ? 'bg-green-400' 
                                  : 'bg-white/15'
                              }`} 
                              style={{ 
                                boxShadow: i < Math.floor(selectedDevice.signalStrength / 20) 
                                  ? '0 0 8px rgba(34,197,94,0.4)' 
                                  : 'none'
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Distance Card */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/12 via-cyan-400/8 to-blue-600/12 rounded-[20px] blur-xl scale-105 group-hover:scale-110 transition-all duration-500" />
                    <div className="relative backdrop-blur-3xl border border-white/20 rounded-[20px] group-hover:border-white/25 transition-all duration-300"
                         style={{ 
                           background: 'linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(6,182,212,0.04) 100%)',
                           boxShadow: '0 8px 24px rgba(0,0,0,0.15), 0 1px 1px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.12)'
                         }}>
                      <div className="p-6">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="w-10 h-10 rounded-[14px] flex items-center justify-center"
                               style={{ 
                                 background: 'linear-gradient(135deg, rgba(59,130,246,0.2) 0%, rgba(6,182,212,0.15) 100%)',
                                 boxShadow: '0 4px 12px rgba(59,130,246,0.2), inset 0 1px 0 rgba(255,255,255,0.2)'
                               }}>
                            <MapPin className="w-5 h-5 text-blue-400" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }} />
                          </div>
                          <span className="text-white/85 text-sm font-medium" 
                                style={{ fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                            Distance
                          </span>
                        </div>
                        <p className="text-white font-bold text-xl mb-2" 
                           style={{ 
                             fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                             letterSpacing: '-0.01em'
                           }}>
                          {selectedDevice.distance}m
                        </p>
                        <div className="px-3 py-1 bg-blue-500/15 border border-blue-500/25 rounded-full">
                          <p className="text-blue-400 text-xs font-medium" 
                             style={{ fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                            Ultra Close Range
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Battery Card */}
                  {selectedDevice.batteryLevel && (
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/12 via-emerald-400/8 to-green-600/12 rounded-[20px] blur-xl scale-105 group-hover:scale-110 transition-all duration-500" />
                      <div className="relative backdrop-blur-3xl border border-white/20 rounded-[20px] group-hover:border-white/25 transition-all duration-300"
                           style={{ 
                             background: 'linear-gradient(135deg, rgba(34,197,94,0.08) 0%, rgba(16,185,129,0.04) 100%)',
                             boxShadow: '0 8px 24px rgba(0,0,0,0.15), 0 1px 1px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.12)'
                           }}>
                        <div className="p-6">
                          <div className="flex items-center space-x-4 mb-4">
                            <div className="w-10 h-10 rounded-[14px] flex items-center justify-center"
                                 style={{ 
                                   background: 'linear-gradient(135deg, rgba(34,197,94,0.2) 0%, rgba(16,185,129,0.15) 100%)',
                                   boxShadow: '0 4px 12px rgba(34,197,94,0.2), inset 0 1px 0 rgba(255,255,255,0.2)'
                                 }}>
                              <Battery className="w-5 h-5 text-green-400" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }} />
                            </div>
                            <span className="text-white/85 text-sm font-medium" 
                                  style={{ fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                              Battery
                            </span>
                          </div>
                          <p className="text-white font-bold text-xl mb-3" 
                             style={{ 
                               fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                               letterSpacing: '-0.01em'
                             }}>
                            {selectedDevice.batteryLevel}%
                          </p>
                          <div className="w-full bg-white/15 rounded-full h-2 overflow-hidden">
                            <div 
                              className="bg-green-400 h-2 rounded-full transition-all duration-700 ease-out"
                              style={{ 
                                width: `${selectedDevice.batteryLevel}%`,
                                boxShadow: '0 0 8px rgba(34,197,94,0.5)'
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Trust Rating Card */}
                  {selectedDevice.rating && (
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/12 via-amber-400/8 to-yellow-600/12 rounded-[20px] blur-xl scale-105 group-hover:scale-110 transition-all duration-500" />
                      <div className="relative backdrop-blur-3xl border border-white/20 rounded-[20px] group-hover:border-white/25 transition-all duration-300"
                           style={{ 
                             background: 'linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(217,119,6,0.04) 100%)',
                             boxShadow: '0 8px 24px rgba(0,0,0,0.15), 0 1px 1px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.12)'
                           }}>
                        <div className="p-6">
                          <div className="flex items-center space-x-4 mb-4">
                            <div className="w-10 h-10 rounded-[14px] flex items-center justify-center"
                                 style={{ 
                                   background: 'linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(217,119,6,0.15) 100%)',
                                   boxShadow: '0 4px 12px rgba(245,158,11,0.2), inset 0 1px 0 rgba(255,255,255,0.2)'
                                 }}>
                              <Star className="w-5 h-5 text-yellow-400" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }} />
                            </div>
                            <span className="text-white/85 text-sm font-medium" 
                                  style={{ fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                              Trust
                            </span>
                          </div>
                          <p className="text-white font-bold text-xl mb-3" 
                             style={{ 
                               fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                               letterSpacing: '-0.01em'
                             }}>
                            {selectedDevice.rating}/5.0
                          </p>
                          <div className="flex space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i}
                                className={`w-4 h-4 transition-all duration-300 ${
                                  i < Math.floor(selectedDevice.rating) 
                                    ? 'text-yellow-400 fill-current' 
                                    : 'text-white/25'
                                }`} 
                                style={{ 
                                  filter: i < Math.floor(selectedDevice.rating) 
                                    ? 'drop-shadow(0 0 4px rgba(245,158,11,0.4))' 
                                    : 'none'
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
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

                {/* Simple Apple Pay Verification Button */}
                {!otpVerified && !showOTPVerification && (
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 via-cyan-400/10 to-blue-600/15 rounded-[20px] blur-xl scale-105" />
                    <button
                      onClick={handleInitiateOTP}
                      className="relative w-full h-16 rounded-[20px] font-semibold text-lg text-white border-0 overflow-hidden transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                      style={{
                        background: 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 50%, #0EA5E9 100%)',
                        boxShadow: '0 8px 24px rgba(59,130,246,0.3), 0 2px 4px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)',
                        fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                        letterSpacing: '-0.01em'
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                      <span className="relative">Send OTP</span>
                    </button>
                  </div>
                )}

                {/* Ultra-Premium OTP Input Section */}
                {showOTPVerification && !otpVerified && (
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/12 via-amber-400/8 to-orange-600/12 rounded-[28px] blur-2xl scale-105" />
                    
                    <div className="relative backdrop-blur-3xl border border-white/20 rounded-[28px] overflow-hidden"
                         style={{ 
                           background: 'linear-gradient(135deg, rgba(249,115,22,0.08) 0%, rgba(245,158,11,0.04) 100%)',
                           boxShadow: '0 8px 32px rgba(0,0,0,0.2), 0 1px 1px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.15)'
                         }}>
                      <div className="p-8">
                        <div className="flex items-center space-x-5 mb-8">
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/25 via-amber-400/15 to-orange-600/25 rounded-[18px] blur-lg scale-110" />
                            <div className="relative w-14 h-14 rounded-[18px] flex items-center justify-center"
                                 style={{ 
                                   background: 'linear-gradient(135deg, rgba(249,115,22,0.2) 0%, rgba(245,158,11,0.15) 100%)',
                                   boxShadow: '0 8px 24px rgba(249,115,22,0.25), inset 0 1px 0 rgba(255,255,255,0.2)'
                                 }}>
                              <Lock className="w-7 h-7 text-orange-300" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }} />
                            </div>
                          </div>
                          <div>
                            <h4 className="text-white font-black text-xl mb-1" 
                                style={{ 
                                  fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                                  background: 'linear-gradient(135deg, #ffffff 0%, #fed7aa 30%, #ffffff 70%, #fef3c7 100%)',
                                  WebkitBackgroundClip: 'text',
                                  WebkitTextFillColor: 'transparent',
                                  backgroundClip: 'text',
                                  letterSpacing: '-0.01em'
                                }}>
                              Enter Verification Code
                            </h4>
                            <p className="text-white/70 text-sm font-medium" 
                               style={{ fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                              6-digit secure code sent to device
                            </p>
                          </div>
                        </div>

                        <div className="space-y-6">
                          {/* Premium OTP Input */}
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-white/8 via-white/12 to-white/8 rounded-[20px] blur-md" />
                            <input
                              type="text"
                              value={otpCode}
                              onChange={(e) => setOtpCode(formatOTPInput(e.target.value))}
                              placeholder="• • • • • •"
                              maxLength={6}
                              className="relative w-full h-16 rounded-[20px] border border-white/25 backdrop-blur-2xl text-center text-2xl font-black tracking-[0.5em] text-white placeholder:text-white/30 transition-all duration-300 focus:outline-none focus:border-orange-400/50 focus:ring-2 focus:ring-orange-400/20"
                              style={{
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.05) 100%)',
                                boxShadow: '0 8px 24px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.15)',
                                fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                                caretColor: '#fb923c'
                              }}
                            />
                          </div>

                          {/* Timer and Resend */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-6 h-6 rounded-full flex items-center justify-center"
                                   style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.2) 0%, rgba(245,158,11,0.15) 100%)' }}>
                                <Clock className="w-3 h-3 text-orange-400" />
                              </div>
                              <span className="text-white/70 text-sm font-medium" 
                                    style={{ fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                                {canResendOTP ? 'Code expired' : `Auto-resend in ${otpTimer}s`}
                              </span>
                            </div>
                            
                            {canResendOTP && (
                              <button
                                onClick={handleInitiateOTP}
                                className="px-4 py-2 rounded-[12px] font-medium text-orange-400 hover:text-orange-300 transition-all duration-300 hover:bg-orange-500/10"
                                style={{ 
                                  fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                                  background: 'linear-gradient(135deg, rgba(249,115,22,0.08) 0%, rgba(245,158,11,0.04) 100%)'
                                }}
                              >
                                Resend Code
                              </button>
                            )}
                          </div>

                          {/* Premium Verify Button */}
                          <div className="relative group">
                            <div className={`absolute inset-0 rounded-[20px] blur-xl scale-105 transition-all duration-500 ${
                              otpCode.length === 6 && !isVerifyingOTP
                                ? 'bg-gradient-to-r from-orange-500/20 via-amber-400/15 to-orange-500/20 group-hover:scale-110' 
                                : 'bg-gradient-to-r from-gray-500/10 via-gray-400/8 to-gray-500/10'
                            }`} />
                            <button
                              onClick={handleVerifyOTP}
                              disabled={otpCode.length !== 6 || isVerifyingOTP}
                              className={`relative w-full h-16 rounded-[20px] font-bold text-lg text-white border-0 overflow-hidden transition-all duration-500 transform ${
                                otpCode.length === 6 && !isVerifyingOTP
                                  ? 'hover:scale-[1.02] active:scale-[0.98]'
                                  : 'opacity-50 cursor-not-allowed'
                              }`}
                              style={{
                                background: otpCode.length === 6 && !isVerifyingOTP
                                  ? 'linear-gradient(135deg, #F97316 0%, #F59E0B 50%, #EAB308 100%)'
                                  : 'linear-gradient(135deg, #6B7280 0%, #4B5563 50%, #374151 100%)',
                                boxShadow: otpCode.length === 6 && !isVerifyingOTP
                                  ? '0 12px 32px rgba(249,115,22,0.4), 0 2px 4px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)'
                                  : '0 4px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
                                fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                                letterSpacing: '-0.01em'
                              }}
                            >
                              {/* Shimmer Effect */}
                              {otpCode.length === 6 && !isVerifyingOTP && (
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                              )}
                              
                              <div className="relative flex items-center justify-center">
                                {isVerifyingOTP ? (
                                  <>
                                    <div className="mr-3 p-1.5 bg-white/15 rounded-full">
                                      <Loader2 className="w-5 h-5 animate-spin" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }} />
                                    </div>
                                    <span>Authenticating...</span>
                                  </>
                                ) : (
                                  <>
                                    <div className="mr-3 p-1.5 bg-white/15 rounded-full">
                                      <Check className="w-5 h-5" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }} />
                                    </div>
                                    <span>Verify Authentication</span>
                                  </>
                                )}
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
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

                {/* Ultra-Premium Apple Pay Action Buttons */}
                <div className="space-y-5">
                  {otpVerified && (
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-emerald-400/15 to-green-500/20 rounded-[20px] blur-xl scale-105" />
                      <button
                        onClick={() => {
                          console.log('🚀 Navigating to send money with device details:', selectedDevice.ownerName);
                          handleSendPayment();
                        }}
                        className="relative w-full h-16 rounded-[20px] font-bold text-lg text-white border-0 overflow-hidden transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                        style={{
                          background: 'linear-gradient(135deg, #10B981 0%, #059669 50%, #047857 100%)',
                          boxShadow: '0 12px 32px rgba(16,185,129,0.4), 0 2px 4px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)',
                          fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                          letterSpacing: '-0.01em'
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative flex items-center justify-center">
                          <Send className="w-6 h-6 mr-3" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }} />
                          Send Payment to {selectedDevice.ownerName}
                        </div>
                      </button>
                    </div>
                  )}

                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/8 to-white/5 rounded-[18px] blur-md" />
                    <button
                      onClick={() => setShowDeviceDetails(false)}
                      className="relative w-full h-14 rounded-[18px] font-semibold text-white border border-white/25 backdrop-blur-2xl transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] hover:border-white/35"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.15)',
                        fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-[18px]" />
                      <span className="relative" style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.1))' }}>
                        Close Details
                      </span>
                    </button>
                  </div>
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