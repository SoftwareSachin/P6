import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Bluetooth, Users, Signal, CheckCircle, Smartphone, X, CreditCard, Shield, Battery, Star, MapPin } from "lucide-react";
import { Link } from "wouter";
import { BottomNavigation } from "@/components/BottomNavigation";

export default function OfflinePayments() {
  const [isBluetoothEnabled, setIsBluetoothEnabled] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [nearbyDevices, setNearbyDevices] = useState<any[]>([]);
  const [filteredDevices, setFilteredDevices] = useState<any[]>([]);
  const [paymentStage] = useState<'discovery'>('discovery');
  const [selectedDevice, setSelectedDevice] = useState<any>(null);
  const [showDeviceDetails, setShowDeviceDetails] = useState(false);

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

        {/* Device Details Modal */}
        {showDeviceDetails && selectedDevice && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end">
            <div className="w-full bg-gray-900 rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Device Details</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowDeviceDetails(false)}
                  className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20"
                >
                  <X className="h-5 w-5 text-white" />
                </Button>
              </div>

              {/* Device Header */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                  {selectedDevice.profile_image ? (
                    <img 
                      src={selectedDevice.profile_image} 
                      alt={selectedDevice.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <Smartphone className="w-8 h-8 text-blue-300" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-lg font-bold text-white">{selectedDevice.name}</h3>
                    {selectedDevice.is_verified && (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    )}
                  </div>
                  <p className="text-white/60 text-sm">{selectedDevice.model}</p>
                </div>
              </div>

              {/* Device Info Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Signal className="w-4 h-4 text-green-400" />
                    <span className="text-white/80 text-sm">Signal</span>
                  </div>
                  <p className="text-white font-semibold">{selectedDevice.signal || 'Good'}</p>
                </div>

                <div className="bg-white/5 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    <span className="text-white/80 text-sm">Distance</span>
                  </div>
                  <p className="text-white font-semibold">{selectedDevice.distance || `${(Math.random() * 10).toFixed(1)}m`}</p>
                </div>

                {selectedDevice.battery_level && (
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Battery className="w-4 h-4 text-green-400" />
                      <span className="text-white/80 text-sm">Battery</span>
                    </div>
                    <p className="text-white font-semibold">{selectedDevice.battery_level}%</p>
                  </div>
                )}

                {selectedDevice.rating && (
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-white/80 text-sm">Rating</span>
                    </div>
                    <p className="text-white font-semibold">{selectedDevice.rating}/5</p>
                  </div>
                )}
              </div>

              {/* Security & Trust */}
              <div className="bg-white/5 rounded-xl p-4 mb-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Shield className="w-4 h-4 text-purple-400" />
                  <span className="text-white font-medium">Security & Trust</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedDevice.is_verified && (
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      Verified Device
                    </Badge>
                  )}
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                    Encrypted Connection
                  </Badge>
                  {selectedDevice.transaction_count > 0 && (
                    <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                      {selectedDevice.transaction_count || 0} Transactions
                    </Badge>
                  )}
                </div>
              </div>

              {/* Connect Button */}
              <Button
                className="w-full h-12 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-300 font-semibold rounded-xl"
                onClick={() => {
                  setShowDeviceDetails(false);
                  // Handle connection logic here
                }}
              >
                Connect to {selectedDevice.name}
              </Button>
            </div>
          </div>
        )}
        
        <BottomNavigation activeTab="offline" />
      </div>
    </div>
  );
}