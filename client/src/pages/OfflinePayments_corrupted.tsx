import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Wifi, WifiOff, Bluetooth, Users, MapPin, Signal, Smartphone, Monitor, Zap, Shield, CheckCircle, Clock, Loader2, Waves, Radio, Eye, EyeOff, RefreshCw, Battery, Star } from "lucide-react";
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
  const [scanningProgress, setScanningProgress] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'connecting' | 'connected' | 'failed'>('idle');
  const [deviceHistory, setDeviceHistory] = useState<any[]>([]);
  const [scanRange, setScanRange] = useState<'near' | 'medium' | 'far'>('medium');
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);
  const scanIntervalRef = useRef<NodeJS.Timeout>();
  const progressIntervalRef = useRef<NodeJS.Timeout>();

  const mockNearbyDevices = [
    {
      id: 1,
      name: "Rohit's iPhone 15 Pro",
      type: "iOS",
      model: "iPhone 15 Pro",
      distance: "2.1m",
      signal: 88,
      lastSeen: "Just now",
      verified: true,
      upiId: "rohit@paytm",
      battery: 78,
      encryption: "AES-256",
      paymentReady: true,
      trustLevel: "high",
      transactionHistory: 45,
      deviceColor: "#1D4ED8",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rohit"
    },
    {
      id: 2,
      name: "Priya's Galaxy S24",
      type: "Android",
      model: "Samsung Galaxy S24",
      distance: "4.8m",
      signal: 74,
      lastSeen: "25s ago",
      verified: true,
      upiId: "priya@gpay",
      battery: 92,
      encryption: "AES-256",
      paymentReady: true,
      trustLevel: "high",
      transactionHistory: 23,
      deviceColor: "#10B981",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya"
    },
    {
      id: 3,
      name: "CaféBeans Terminal",
      type: "POS",
      model: "Square Terminal",
      distance: "0.8m",
      signal: 95,
      lastSeen: "Just now",
      verified: true,
      upiId: "cafebeans@merchant",
      battery: 100,
      encryption: "AES-256",
      paymentReady: true,
      trustLevel: "verified",
      transactionHistory: 1247,
      deviceColor: "#F59E0B",
      avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=merchant"
    },
    {
      id: 4,
      name: "Amit's OnePlus 12",
      type: "Android",
      model: "OnePlus 12",
      distance: "7.2m",
      signal: 65,
      lastSeen: "1m ago",
      verified: true,
      upiId: "amit@phonepe",
      battery: 45,
      encryption: "AES-256",
      paymentReady: true,
      trustLevel: "medium",
      transactionHistory: 12,
      deviceColor: "#8B5CF6",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=amit"
    },
    {
      id: 5,
      name: "Metro Station Kiosk",
      type: "POS",
      model: "Payment Terminal",
      distance: "12.5m",
      signal: 42,
      lastSeen: "3m ago",
      verified: true,
      upiId: "metro@transport",
      battery: 100,
      encryption: "AES-256",
      paymentReady: true,
      trustLevel: "verified",
      transactionHistory: 8945,
      deviceColor: "#EF4444",
      avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=metro"
    }
  ];

  // Ultra-Premium Bluetooth Scanning Functions
  const handleBluetoothToggle = () => {
    setIsBluetoothEnabled(!isBluetoothEnabled);
    if (!isBluetoothEnabled) {
      startBluetoothScan();
    } else {
      setNearbyDevices([]);
      setIsScanning(false);
      setScanningProgress(0);
    }
  };

  const startBluetoothScan = () => {
    setIsScanning(true);
    setNearbyDevices([]);
    setScanningProgress(0);
    setConnectionStatus('idle');
    
    // Ultra-premium progressive scanning with realistic timing
    progressIntervalRef.current = setInterval(() => {
      setScanningProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressIntervalRef.current);
          return 100;
        }
        return prev + 2;
      });
    }, 80);
    
    // Sophisticated device discovery simulation
    const discoveryTimeline = [
      { delay: 800, devices: [mockNearbyDevices[2]] }, // Nearest POS terminal first
      { delay: 1600, devices: [mockNearbyDevices[2], mockNearbyDevices[0]] }, // High-signal iPhone
      { delay: 2400, devices: [mockNearbyDevices[2], mockNearbyDevices[0], mockNearbyDevices[1]] }, // Android device
      { delay: 3200, devices: [mockNearbyDevices[2], mockNearbyDevices[0], mockNearbyDevices[1], mockNearbyDevices[3]] }, // OnePlus
      { delay: 4000, devices: mockNearbyDevices }, // All devices including distant ones
    ];
    
    discoveryTimeline.forEach(({ delay, devices }) => {
      setTimeout(() => {
        setNearbyDevices([...devices]);
        // Add subtle vibration simulation
        if (navigator.vibrate) {
          navigator.vibrate(50);
        }
      }, delay);
    });
    
    setTimeout(() => {
      setIsScanning(false);
      setScanningProgress(100);
      clearInterval(progressIntervalRef.current);
    }, 4500);
  };

  const connectToDevice = async (device: any) => {
    setSelectedDevice(device);
    setConnectionStatus('connecting');
    
    // Simulate premium connection process
    setTimeout(() => {
      setConnectionStatus('connected');
      setPaymentStage('connect');
      
      // Add to device history
      setDeviceHistory(prev => {
        const updated = [device, ...prev.filter(d => d.id !== device.id)];
        return updated.slice(0, 5); // Keep only last 5 connections
      });
    }, 2000);
  };

  const handleDeviceSelect = (device: any) => {
    connectToDevice(device);
  };

  const handlePaymentComplete = () => {
    setTimeout(() => {
      setPaymentStage('success');
    }, 3000);
  };

  const toggleAdvancedMode = () => {
    setIsAdvancedMode(!isAdvancedMode);
  };

  const setScanRangeHandler = (range: 'near' | 'medium' | 'far') => {
    setScanRange(range);
    if (isScanning) {
      // Restart scan with new range
      startBluetoothScan();
    }
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'iOS': return Smartphone;
      case 'Android': return Smartphone;
      case 'POS': return Monitor;
      default: return Bluetooth;
    }
  };

  const getSignalColor = (signal: number) => {
    if (signal >= 80) return '#10B981'; // Green
    if (signal >= 60) return '#F59E0B'; // Yellow
    if (signal >= 40) return '#EF4444'; // Red
    return '#6B7280'; // Gray
  };

  const getTrustLevelColor = (level: string) => {
    switch (level) {
      case 'verified': return '#10B981';
      case 'high': return '#3B82F6';
      case 'medium': return '#F59E0B';
      case 'low': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const filteredDevices = nearbyDevices.filter(device => {
    const distance = parseFloat(device.distance);
    switch (scanRange) {
      case 'near': return distance <= 3;
      case 'medium': return distance <= 10;
      case 'far': return distance <= 50;
      default: return true;
    }
  });

  useEffect(() => {
    return () => {
      if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, []);

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

          {/* Ultra-Premium Advanced Controls */}
          {isBluetoothEnabled && (
            <div className="mb-6 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-500/5 via-blue-500/5 to-gray-500/5 rounded-2xl blur-lg" />
              
              <Card className="relative backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl shadow-xl overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-semibold text-white/80">Scan Controls</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleAdvancedMode}
                      className="text-white/60 hover:text-white/80 hover:bg-white/10 rounded-xl"
                    >
                      {isAdvancedMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                  
                  {/* Scan Range Selector */}
                  <div className="flex space-x-2 mb-4">
                    {['near', 'medium', 'far'].map((range) => (
                      <Button
                        key={range}
                        variant={scanRange === range ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setScanRangeHandler(range as any)}
                        className={`flex-1 rounded-xl text-xs font-medium transition-all duration-300 ${
                          scanRange === range
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/25'
                            : 'text-white/60 hover:text-white/80 hover:bg-white/10'
                        }`}
                      >
                        <MapPin className="w-3 h-3 mr-1" />
                        {range === 'near' ? '0-3m' : range === 'medium' ? '3-10m' : '10m+'}
                      </Button>
                    ))}
                  </div>
                  
                  {/* Scanning Progress */}
                  {isScanning && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-white/60 font-medium">Scanning progress</span>
                        <span className="text-blue-300 font-semibold">{Math.round(scanningProgress)}%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 rounded-full transition-all duration-300 shadow-lg shadow-blue-500/30"
                          style={{ width: `${scanningProgress}%` }}
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* Manual Refresh */}
                  {!isScanning && (
                    <Button
                      onClick={startBluetoothScan}
                      variant="ghost"
                      size="sm"
                      className="w-full rounded-xl text-white/60 hover:text-white/80 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Refresh Scan
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Ultra-Premium Nearby Devices List */}
          {filteredDevices.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-300" />
                  Nearby Devices ({filteredDevices.length})
                </h3>
                
                {/* Device Count and Status */}
                <div className="flex items-center space-x-2">
                  {isScanning && (
                    <div className="flex items-center space-x-1">
                      <Loader2 className="w-4 h-4 text-blue-300 animate-spin" />
                      <span className="text-xs text-blue-300 font-medium">Scanning...</span>
                    </div>
                  )}
                  <Badge 
                    variant="secondary" 
                    className="bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/25 transition-all duration-300"
                  >
                    {scanRange} range
                  </Badge>
                </div>
              </div>
              
              {/* Ultra-Premium Device Cards */}
              <div className="space-y-3">
                {filteredDevices.map((device, index) => {
                  const DeviceIcon = getDeviceIcon(device.type);
                  const signalColor = getSignalColor(device.signal);
                  const trustColor = getTrustLevelColor(device.trustLevel);
                  
                  return (
                    <div key={device.id} className="relative group">
                      {/* Card entrance animation */}
                      <div 
                        className="relative"
                        style={{ 
                          animation: `slideInUp 0.6s ease-out ${index * 0.1}s both` 
                        }}
                      >
                        {/* Premium glow effect */}
                        <div 
                          className="absolute inset-0 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{ backgroundColor: `${device.deviceColor}15` }}
                        />
                        
                        <Card 
                          className="relative backdrop-blur-2xl bg-white/8 border border-white/15 rounded-2xl shadow-xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:bg-white/12 hover:border-white/25 hover:shadow-2xl"
                          onClick={() => handleDeviceSelect(device)}
                        >
                          <CardContent className="p-5">
                            <div className="flex items-center justify-between">
                              {/* Device Info */}
                              <div className="flex items-center space-x-4 flex-1">
                                {/* Device Avatar */}
                                <div className="relative">
                                  <div 
                                    className="absolute inset-0 rounded-xl blur-md opacity-50"
                                    style={{ backgroundColor: device.deviceColor }}
                                  />
                                  <div 
                                    className="relative w-14 h-14 rounded-xl flex items-center justify-center border backdrop-blur-xl"
                                    style={{ 
                                      backgroundColor: `${device.deviceColor}15`,
                                      borderColor: `${device.deviceColor}30`
                                    }}
                                  >
                                    <DeviceIcon 
                                      className="w-7 h-7" 
                                      style={{ color: device.deviceColor }}
                                    />
                                  </div>
                                  
                                  {/* Connection status indicator */}
                                  {connectionStatus === 'connecting' && selectedDevice?.id === device.id && (
                                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full border-2 border-white/20 flex items-center justify-center">
                                      <Loader2 className="w-3 h-3 text-white animate-spin" />
                                    </div>
                                  )}
                                  
                                  {connectionStatus === 'connected' && selectedDevice?.id === device.id && (
                                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white/20 flex items-center justify-center">
                                      <CheckCircle className="w-3 h-3 text-white" />
                                    </div>
                                  )}
                                </div>
                                
                                {/* Device Details */}
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <h4 className="text-white font-semibold text-sm">{device.name}</h4>
                                    {device.verified && (
                                      <Shield className="w-4 h-4 text-green-400" />
                                    )}
                                    {device.trustLevel === 'verified' && (
                                      <Star className="w-3 h-3 text-yellow-400" />
                                    )}
                                  </div>
                                  
                                  <div className="flex items-center space-x-3 text-xs">
                                    <span className="text-white/60 font-medium">{device.model}</span>
                                    <span className="text-white/40">•</span>
                                    <span className="text-white/60">{device.distance}</span>
                                    <span className="text-white/40">•</span>
                                    <span className="text-white/60">{device.lastSeen}</span>
                                  </div>
                                  
                                  {/* UPI ID */}
                                  {isAdvancedMode && (
                                    <div className="mt-2">
                                      <span className="text-xs text-blue-300 font-medium bg-blue-500/10 px-2 py-1 rounded-lg border border-blue-500/20">
                                        {device.upiId}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              
                              {/* Device Status Indicators */}
                              <div className="flex flex-col items-end space-y-2">
                                {/* Signal Strength */}
                                <div className="flex items-center space-x-1">
                                  <Signal 
                                    className="w-4 h-4" 
                                    style={{ color: signalColor }}
                                  />
                                  <span 
                                    className="text-xs font-semibold"
                                    style={{ color: signalColor }}
                                  >
                                    {device.signal}%
                                  </span>
                                </div>
                                
                                {/* Battery Level (for mobile devices) */}
                                {device.type !== 'POS' && (
                                  <div className="flex items-center space-x-1">
                                    <Battery className="w-4 h-4 text-white/60" />
                                    <span className="text-xs text-white/60 font-medium">
                                      {device.battery}%
                                    </span>
                                  </div>
                                )}
                                
                                {/* Trust Level */}
                                <div className="flex items-center space-x-1">
                                  <div 
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: trustColor }}
                                  />
                                  <span 
                                    className="text-xs font-medium capitalize"
                                    style={{ color: trustColor }}
                                  >
                                    {device.trustLevel}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            {/* Advanced Device Info */}
                            {isAdvancedMode && (
                              <div className="mt-4 pt-4 border-t border-white/10">
                                <div className="grid grid-cols-2 gap-4 text-xs">
                                  <div>
                                    <span className="text-white/40 font-medium">Encryption</span>
                                    <p className="text-green-300 font-semibold">{device.encryption}</p>
                                  </div>
                                  <div>
                                    <span className="text-white/40 font-medium">Transactions</span>
                                    <p className="text-blue-300 font-semibold">{device.transactionHistory}</p>
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            {/* Payment Ready Indicator */}
                            {device.paymentReady && (
                              <div className="mt-3 flex items-center justify-center">
                                <div className="flex items-center space-x-2 px-3 py-1 bg-green-500/15 border border-green-500/25 rounded-full">
                                  <Zap className="w-3 h-3 text-green-400" />
                                  <span className="text-xs text-green-300 font-medium">Payment Ready</span>
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* No Bluetooth Enabled Message */}
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