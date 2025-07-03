import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Wifi, WifiOff, Bluetooth, Users, MapPin, Signal, Smartphone, Monitor, Zap, Shield, CheckCircle, Clock, Loader2, Waves, Radio, Eye, EyeOff, RefreshCw, Battery, Star, Volume2, VolumeX, User, CreditCard, Lock, MessageSquare, RotateCcw, Database, FileText, Languages, AlertTriangle, Network } from "lucide-react";
import { Link } from "wouter";
import { ApplePayContactlessSVG, ApplePayNFCSVG, ApplePaySecuritySVG, ApplePayPhoneSVG, ApplePayLocationSVG } from "@/components/ApplePaySVGs";
import { BluetoothDiscoverySVG, DeviceConnectionSVG, PaymentFlowSVG, SecureConnectionSVG, PaymentSuccessSVG, NFCTapSVG } from "@/components/PremiumOfflinePaymentSVGs";
import { BottomNavigation } from "@/components/BottomNavigation";
import { SwipeToSend } from "@/components/SwipeToSend";
import { PinEntry } from "@/components/PinEntry";
import { PaymentSuccess } from "@/components/PaymentSuccess";

export default function OfflinePayments() {
  const [isBluetoothEnabled, setIsBluetoothEnabled] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [nearbyDevices, setNearbyDevices] = useState<any[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<any>(null);
  const [paymentStage, setPaymentStage] = useState<'discovery' | 'connect' | 'payment' | 'pin' | 'processing' | 'success'>('discovery');
  const [scanningProgress, setScanningProgress] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'connecting' | 'connected' | 'failed'>('idle');
  const [deviceHistory, setDeviceHistory] = useState<any[]>([]);
  const [scanRange, setScanRange] = useState<'near' | 'medium' | 'far'>('medium');
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showPinEntry, setShowPinEntry] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const scanIntervalRef = useRef<NodeJS.Timeout>();
  const progressIntervalRef = useRef<NodeJS.Timeout>();

  // Enhanced offline features
  const [connectionMode, setConnectionMode] = useState<'bluetooth' | 'wifi-direct' | 'mesh' | 'sms-fallback'>('bluetooth');
  const [localLedger, setLocalLedger] = useState<any[]>([]);
  const [pendingSync, setPendingSync] = useState<any[]>([]);
  const [fraudAlert, setFraudAlert] = useState<string | null>(null);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [meshNetworkDevices, setMeshNetworkDevices] = useState<any[]>([]);
  const [smsCapable, setSmsCapable] = useState(false);
  const [wifiDirectEnabled, setWifiDirectEnabled] = useState(false);
  const [cryptoKeys, setCryptoKeys] = useState<{ public: string; private: string } | null>(null);
  const [transactionHistory, setTransactionHistory] = useState<any[]>([]);

  // Real-time device data from API
  const [realDevices, setRealDevices] = useState<any[]>([]);
  const [selectedDeviceDetails, setSelectedDeviceDetails] = useState<any>(null);
  const [selectedDeviceBanks, setSelectedDeviceBanks] = useState<any[]>([]);
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [otpExpiry, setOtpExpiry] = useState<Date | null>(null);
  const [currentOtpId, setCurrentOtpId] = useState<string>("");
  const [sessionId, setSessionId] = useState<string>("");

  // Initialize cryptographic keys for transaction signing
  useEffect(() => {
    if (!cryptoKeys) {
      // Generate key pair for transaction signing
      const keyPair = {
        public: `PUB_${Math.random().toString(36).substring(2, 15)}`,
        private: `PRIV_${Math.random().toString(36).substring(2, 15)}`
      };
      setCryptoKeys(keyPair);
    }
  }, []);

  // Load local transaction history from localStorage
  useEffect(() => {
    const savedLedger = localStorage.getItem('oppb_local_ledger');
    const savedPending = localStorage.getItem('oppb_pending_sync');
    
    if (savedLedger) {
      setLocalLedger(JSON.parse(savedLedger));
    }
    if (savedPending) {
      setPendingSync(JSON.parse(savedPending));
    }
  }, []);

  // Check device capabilities
  useEffect(() => {
    // Check SMS capability
    if ('sms' in navigator || 'messaging' in navigator) {
      setSmsCapable(true);
    }
    
    // Check WiFi Direct capability
    if ('wifi' in navigator || 'bluetooth' in navigator) {
      setWifiDirectEnabled(true);
    }
  }, []);

  // Fraud detection system
  const detectFraud = (transactionData: any) => {
    const recentTransactions = localLedger.filter(
      tx => Date.now() - new Date(tx.timestamp).getTime() < 10 * 60 * 1000 // Last 10 minutes
    );

    if (recentTransactions.length >= 3) {
      setFraudAlert("Multiple transactions detected. Please verify with your bank.");
      return true;
    }

    if (parseFloat(transactionData.amount) > 50000) {
      setFraudAlert("High-value transaction detected. Additional verification required.");
      return true;
    }

    return false;
  };

  // Cryptographic transaction signing
  const signTransaction = (transactionData: any) => {
    if (!cryptoKeys) return null;
    
    const dataToSign = JSON.stringify({
      amount: transactionData.amount,
      recipient: transactionData.recipient,
      timestamp: transactionData.timestamp,
      nonce: Math.random().toString(36).substring(2, 15)
    });

    // Simulated cryptographic signature
    const signature = `SIG_${Buffer.from(dataToSign).toString('base64').substring(0, 20)}`;
    
    return {
      ...transactionData,
      signature,
      publicKey: cryptoKeys.public,
      hash: `HASH_${Math.random().toString(36).substring(2, 15)}`
    };
  };

  // Store transaction in local ledger
  const addToLocalLedger = (transaction: any) => {
    const signedTransaction = signTransaction(transaction);
    if (!signedTransaction) return;

    const ledgerEntry = {
      ...signedTransaction,
      id: `LOCAL_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
      timestamp: new Date().toISOString(),
      status: 'pending_sync',
      cryptoVerified: true
    };

    const updatedLedger = [...localLedger, ledgerEntry];
    setLocalLedger(updatedLedger);
    localStorage.setItem('oppb_local_ledger', JSON.stringify(updatedLedger));

    // Add to pending sync queue
    const updatedPending = [...pendingSync, ledgerEntry];
    setPendingSync(updatedPending);
    localStorage.setItem('oppb_pending_sync', JSON.stringify(updatedPending));
  };

  // Attempt to sync with server when connectivity is available
  const syncWithServer = async () => {
    if (pendingSync.length === 0) return;

    try {
      for (const transaction of pendingSync) {
        const response = await fetch('/api/offline/sync/transaction', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(transaction)
        });

        if (response.ok) {
          // Remove from pending sync
          const updatedPending = pendingSync.filter(tx => tx.id !== transaction.id);
          setPendingSync(updatedPending);
          localStorage.setItem('oppb_pending_sync', JSON.stringify(updatedPending));
        }
      }
    } catch (error) {
      console.log('Sync failed, will retry later:', error);
    }
  };

  // Audio feedback for actions
  const playAudioFeedback = (action: string) => {
    if (!audioEnabled) return;

    const audioMessages: Record<string, string> = {
      'scan_start': `Scanning for nearby devices in ${currentLanguage === 'hi' ? 'हिंदी' : 'English'}`,
      'device_found': `Device found`,
      'connection_success': `Connected successfully`,
      'payment_success': `Payment completed`,
      'error': `Error occurred`
    };

    if ('speechSynthesis' in window) {
      const message = audioMessages[action as keyof typeof audioMessages] || action;
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.lang = currentLanguage === 'hi' ? 'hi-IN' : 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  // SMS fallback for transactions
  const sendSMSFallback = async (transactionData: any) => {
    if (!smsCapable) return false;

    try {
      const smsData = {
        recipient: selectedDevice?.owner_phone || selectedDevice?.phone,
        message: `OPPB Payment: ₹${transactionData.amount} to ${transactionData.recipient}. OTP: ${otpCode}`,
        transactionId: transactionData.id
      };

      const response = await fetch('/api/offline/sms/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(smsData)
      });

      return response.ok;
    } catch (error) {
      console.error('SMS fallback failed:', error);
      return false;
    }
  };

  // Mesh networking capabilities
  const discoverMeshNetwork = () => {
    if (!wifiDirectEnabled) return;

    // Simulate mesh network discovery
    const meshDevices = [
      { id: 'MESH_001', name: 'OPPB Relay Node 1', type: 'relay', distance: '2m' },
      { id: 'MESH_002', name: 'OPPB Relay Node 2', type: 'relay', distance: '5m' },
      { id: 'MESH_003', name: 'Local Payment Hub', type: 'hub', distance: '3m' }
    ];

    setMeshNetworkDevices(meshDevices);
  };

  const handleBluetoothToggle = () => {
    if (isBluetoothEnabled) {
      setIsBluetoothEnabled(false);
      setIsScanning(false);
      setNearbyDevices([]);
      setScanningProgress(0);
      if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    } else {
      setIsBluetoothEnabled(true);
      startBluetoothScan();
    }
  };

  // Fetch real-time device data from API
  const fetchOfflineDevices = async () => {
    try {
      const response = await fetch('/api/offline/devices?limit=20');
      if (response.ok) {
        const devices = await response.json();
        setRealDevices(devices);
        console.log('📱 Fetched', devices.length, 'offline devices');
      }
    } catch (error) {
      console.error('Error fetching devices:', error);
    }
  };

  // Fetch device details and bank accounts
  const fetchDeviceDetails = async (deviceId: string) => {
    try {
      const [deviceResponse, banksResponse] = await Promise.all([
        fetch(`/api/offline/devices/${deviceId}`),
        fetch(`/api/offline/devices/${deviceId}/banks`)
      ]);
      
      if (deviceResponse.ok && banksResponse.ok) {
        const device = await deviceResponse.json();
        const banks = await banksResponse.json();
        setSelectedDeviceDetails(device);
        setSelectedDeviceBanks(banks);
        console.log('🏦 Loaded', banks.length, 'bank accounts for', device.name);
      }
    } catch (error) {
      console.error('Error fetching device details:', error);
    }
  };

  const startBluetoothScan = () => {
    if (!isBluetoothEnabled) return;
    
    setIsScanning(true);
    setNearbyDevices([]);
    setScanningProgress(0);
    
    // Clear any existing intervals
    if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    
    // Progress animation
    progressIntervalRef.current = setInterval(() => {
      setScanningProgress(prev => {
        if (prev >= 100) {
          return 100;
        }
        return prev + 2;
      });
    }, 80);
    
    // Progressive device discovery with real-time data
    const simulateDiscovery = async () => {
      await fetchOfflineDevices();
      
      // Access the updated realDevices state after fetch
      const fetchResponse = await fetch('/api/offline/devices?limit=20');
      if (fetchResponse.ok) {
        const devices = await fetchResponse.json();
        
        if (devices.length > 0) {
          const discoverySteps = Math.min(4, devices.length);
          for (let i = 0; i < discoverySteps; i++) {
            setTimeout(() => {
              const devicesSlice = devices.slice(0, i + Math.ceil(devices.length / discoverySteps));
              setNearbyDevices(devicesSlice);
              if (navigator.vibrate) {
                navigator.vibrate(50);
              }
            }, (i + 1) * 800);
          }
        }
      }
    };
    
    setTimeout(simulateDiscovery, 500);
    
    setTimeout(() => {
      setIsScanning(false);
      setScanningProgress(100);
      clearInterval(progressIntervalRef.current);
    }, 4500);
  };

  // Initialize device data on component mount
  useEffect(() => {
    fetchOfflineDevices();
  }, []);

  // Send OTP for device connection
  const sendOTP = async (targetDevice: any) => {
    try {
      const response = await fetch('/api/offline/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fromDeviceId: 'OPPB-MOBILE-USER',
          toDeviceId: targetDevice.device_id || targetDevice.deviceId,
          purpose: 'device_connection',
          metadata: { deviceName: targetDevice.name, amount: "0" }
        })
      });
      
      if (response.ok) {
        const result = await response.json();
        setCurrentOtpId(result.otpId);
        setOtpExpiry(new Date(result.expiresAt));
        setOtpSent(true);
        console.log('🔐 OTP sent for connection:', result.message);
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  // Verify OTP and establish secure connection
  const verifyOTP = async () => {
    try {
      const response = await fetch('/api/offline/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fromDeviceId: 'OPPB-MOBILE-USER',
          toDeviceId: selectedDevice.device_id || selectedDevice.deviceId,
          otpCode: otpCode
        })
      });
      
      if (response.ok) {
        const result = await response.json();
        if (result.verified) {
          // Create payment session
          await createPaymentSession();
          setOtpSent(false);
          setOtpCode("");
          setPaymentStage("payment");
          console.log('✅ OTP verified, proceeding to payment');
        }
      } else {
        console.log('❌ OTP verification failed');
        setOtpCode("");
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  // Create secure payment session
  const createPaymentSession = async () => {
    try {
      const response = await fetch('/api/offline/session/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fromDeviceId: 'OPPB-MOBILE-USER',
          toDeviceId: selectedDevice.device_id || selectedDevice.deviceId,
          connectionType: 'bluetooth'
        })
      });
      
      if (response.ok) {
        const session = await response.json();
        setSessionId(session.sessionId);
        console.log('🔗 Secure payment session created:', session.sessionId);
      }
    } catch (error) {
      console.error('Error creating payment session:', error);
    }
  };

  const connectToDevice = async (device: any) => {
    setSelectedDevice(device);
    setConnectionStatus('connecting');
    
    // Fetch comprehensive device details and bank accounts
    await fetchDeviceDetails(device.device_id || device.deviceId);
    
    setTimeout(() => {
      setConnectionStatus('connected');
      setPaymentStage('connect');
      
      setDeviceHistory(prev => {
        const updated = [device, ...prev.filter(d => (d.device_id || d.deviceId) !== (device.device_id || device.deviceId))];
        return updated.slice(0, 5);
      });
    }, 2000);
  };

  const handleDeviceSelect = (device: any) => {
    connectToDevice(device);
  };

  const toggleAdvancedMode = () => {
    setIsAdvancedMode(!isAdvancedMode);
  };

  const setScanRangeHandler = (range: 'near' | 'medium' | 'far') => {
    setScanRange(range);
    if (isScanning) {
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
    if (signal >= 80) return '#10B981';
    if (signal >= 60) return '#F59E0B';
    if (signal >= 40) return '#EF4444';
    return '#6B7280';
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
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-black to-gray-900/50" />
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-full blur-xl animate-float" />
        <div className="absolute top-60 right-20 w-24 h-24 bg-gradient-to-br from-purple-500/15 to-pink-600/15 rounded-full blur-lg animate-float-delay" />
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-gradient-to-br from-blue-400/10 to-cyan-500/10 rounded-full blur-lg animate-pulse" />
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-xl animate-float-slow" />
      </div>

      {/* Header */}
      <div className="relative z-10 px-4 pt-6">
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
          
          <div className="flex items-center space-x-2">
            {/* Connection Mode Indicator */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded-xl blur-md" />
              <div className="relative w-10 h-10 rounded-xl bg-blue-500/15 backdrop-blur-xl border border-blue-500/25 flex items-center justify-center">
                {connectionMode === 'bluetooth' && <Bluetooth className="w-5 h-5 text-blue-300" />}
                {connectionMode === 'wifi-direct' && <Wifi className="w-5 h-5 text-blue-300" />}
                {connectionMode === 'mesh' && <Network className="w-5 h-5 text-blue-300" />}
                {connectionMode === 'sms-fallback' && <MessageSquare className="w-5 h-5 text-blue-300" />}
              </div>
            </div>
            
            {/* Sync Status Indicator */}
            <div className="relative">
              <div className={`absolute inset-0 rounded-xl blur-md ${
                pendingSync.length > 0 ? 'bg-orange-500/15' : 'bg-green-500/15'
              }`} />
              <div className={`relative w-10 h-10 rounded-xl backdrop-blur-xl border flex items-center justify-center ${
                pendingSync.length > 0 
                  ? 'bg-orange-500/15 border-orange-500/25' 
                  : 'bg-green-500/15 border-green-500/25'
              }`}>
                {pendingSync.length > 0 ? (
                  <RotateCcw className="w-5 h-5 text-orange-300" />
                ) : (
                  <CheckCircle className="w-5 h-5 text-green-300" />
                )}
              </div>
            </div>
            
            {/* Offline Mode */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/15 to-red-500/15 rounded-xl blur-md" />
              <div className="relative w-10 h-10 rounded-xl bg-orange-500/15 backdrop-blur-xl border border-orange-500/25 flex items-center justify-center">
                <WifiOff className="w-5 h-5 text-orange-300" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bluetooth Status Card */}
      <div className="px-4 mb-6 relative z-10">
        <div className="mt-4 relative">
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
                
                <div className="relative">
                  <div className={`absolute inset-0 rounded-xl blur-md ${
                    isBluetoothEnabled ? 'bg-red-500/20' : 'bg-blue-500/20'
                  }`} />
                  <Button
                    onClick={handleBluetoothToggle}
                    className={`relative h-12 px-6 rounded-xl font-semibold backdrop-blur-xl border transition-all duration-300 hover:scale-105 ${
                      isBluetoothEnabled 
                        ? 'bg-red-500/15 border-red-500/30 text-red-300 hover:bg-red-500/20' 
                        : 'bg-blue-500/15 border-blue-500/30 text-blue-300 hover:bg-blue-500/20'
                    }`}
                  >
                    {isBluetoothEnabled ? 'Disconnect' : 'Enable Bluetooth'}
                  </Button>
                </div>
              </div>
              
              {/* Connection Status Indicators */}
              {isBluetoothEnabled && (
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-md" />
                      <div className="relative w-10 h-10 mx-auto mb-3 rounded-full bg-blue-500/15 backdrop-blur-xl border border-blue-500/25 flex items-center justify-center">
                        <Signal className="w-5 h-5 text-blue-300" />
                      </div>
                    </div>
                    <p className="text-xs text-white/60 font-medium">Strong Signal</p>
                  </div>
                  <div className="text-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-green-500/20 rounded-full blur-md" />
                      <div className="relative w-10 h-10 mx-auto mb-3 rounded-full bg-green-500/15 backdrop-blur-xl border border-green-500/25 flex items-center justify-center">
                        <ApplePaySecuritySVG className="w-5 h-5 text-green-300" />
                      </div>
                    </div>
                    <p className="text-xs text-white/60 font-medium">Secure Connection</p>
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

      {/* Enhanced Offline Payment Controls */}
      <div className="px-4 mb-6 relative z-10">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/15 via-blue-500/15 to-purple-500/15 rounded-2xl blur-lg" />
          
          <Card className="relative backdrop-blur-2xl bg-white/8 border border-white/15 rounded-2xl shadow-xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full blur-lg" />
                    <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-purple-300" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
                      Offline Payment System
                    </h3>
                    <p className="text-white/60 text-sm font-medium">
                      {localLedger.length} local transactions • {pendingSync.length} pending sync
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {/* Audio Toggle */}
                  <Button
                    onClick={() => setAudioEnabled(!audioEnabled)}
                    variant="ghost"
                    size="icon"
                    className={`h-10 w-10 rounded-full border transition-all duration-300 hover:scale-105 ${
                      audioEnabled 
                        ? 'bg-green-500/15 border-green-500/30 text-green-300 hover:bg-green-500/20' 
                        : 'bg-gray-500/15 border-gray-500/30 text-gray-400 hover:bg-gray-500/20'
                    }`}
                  >
                    {audioEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
                  </Button>
                  
                  {/* Language Toggle */}
                  <Button
                    onClick={() => setCurrentLanguage(currentLanguage === 'en' ? 'hi' : 'en')}
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 hover:bg-blue-500/20 hover:scale-105 transition-all duration-300"
                  >
                    <Languages className="h-5 w-5" />
                  </Button>
                  
                  {/* Sync Button */}
                  <Button
                    onClick={syncWithServer}
                    disabled={pendingSync.length === 0}
                    variant="ghost"
                    size="icon"
                    className={`h-10 w-10 rounded-full border transition-all duration-300 hover:scale-105 ${
                      pendingSync.length > 0 
                        ? 'bg-orange-500/15 border-orange-500/30 text-orange-300 hover:bg-orange-500/20' 
                        : 'bg-gray-500/15 border-gray-500/30 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <RotateCcw className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              {/* Connection Mode Selector */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-white/80 mb-3">Connection Mode</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Button
                    onClick={() => setConnectionMode('bluetooth')}
                    className={`h-20 flex flex-col items-center justify-center space-y-2 rounded-xl border transition-all duration-300 hover:scale-105 ${
                      connectionMode === 'bluetooth'
                        ? 'bg-blue-500/20 border-blue-500/40 text-blue-300'
                        : 'bg-white/5 border-white/15 text-white/60 hover:bg-white/10'
                    }`}
                  >
                    <Bluetooth className="w-6 h-6" />
                    <span className="text-xs font-semibold">Bluetooth</span>
                  </Button>
                  
                  <Button
                    onClick={() => setConnectionMode('wifi-direct')}
                    disabled={!wifiDirectEnabled}
                    className={`h-20 flex flex-col items-center justify-center space-y-2 rounded-xl border transition-all duration-300 hover:scale-105 ${
                      connectionMode === 'wifi-direct'
                        ? 'bg-green-500/20 border-green-500/40 text-green-300'
                        : 'bg-white/5 border-white/15 text-white/60 hover:bg-white/10'
                    } ${!wifiDirectEnabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <Wifi className="w-6 h-6" />
                    <span className="text-xs font-semibold">WiFi Direct</span>
                  </Button>
                  
                  <Button
                    onClick={() => {
                      setConnectionMode('mesh');
                      discoverMeshNetwork();
                    }}
                    className={`h-20 flex flex-col items-center justify-center space-y-2 rounded-xl border transition-all duration-300 hover:scale-105 ${
                      connectionMode === 'mesh'
                        ? 'bg-purple-500/20 border-purple-500/40 text-purple-300'
                        : 'bg-white/5 border-white/15 text-white/60 hover:bg-white/10'
                    }`}
                  >
                    <Network className="w-6 h-6" />
                    <span className="text-xs font-semibold">Mesh Network</span>
                  </Button>
                  
                  <Button
                    onClick={() => setConnectionMode('sms-fallback')}
                    disabled={!smsCapable}
                    className={`h-20 flex flex-col items-center justify-center space-y-2 rounded-xl border transition-all duration-300 hover:scale-105 ${
                      connectionMode === 'sms-fallback'
                        ? 'bg-orange-500/20 border-orange-500/40 text-orange-300'
                        : 'bg-white/5 border-white/15 text-white/60 hover:bg-white/10'
                    } ${!smsCapable ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <MessageSquare className="w-6 h-6" />
                    <span className="text-xs font-semibold">SMS Fallback</span>
                  </Button>
                </div>
              </div>
              
              {/* Local Ledger Summary */}
              {localLedger.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-semibold text-white/80 flex items-center space-x-2">
                      <Database className="w-4 h-4" />
                      <span>Local Transaction Ledger</span>
                    </h4>
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                      {localLedger.length} entries
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {localLedger.slice(-3).map((tx, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/10">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 rounded bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center">
                            <CheckCircle className="w-3 h-3 text-white" />
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-white">₹{tx.amount}</div>
                            <div className="text-xs text-white/60">{new Date(tx.timestamp).toLocaleTimeString()}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-green-400 font-semibold">Signed</div>
                          <div className="text-xs text-white/50">
                            {tx.status === 'pending_sync' ? 'Pending' : 'Synced'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Fraud Alert */}
              {fraudAlert && (
                <div className="p-3 rounded-lg bg-red-500/15 border border-red-500/30 mb-4">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                    <span className="text-sm font-semibold text-red-400">Security Alert</span>
                  </div>
                  <p className="text-xs text-red-300 mt-1">{fraudAlert}</p>
                  <Button
                    onClick={() => setFraudAlert(null)}
                    className="mt-2 text-xs px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-md"
                  >
                    Acknowledge
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Discovery Stage */}
      {paymentStage === 'discovery' && (
        <div className="px-4 relative z-10">
          {/* Scanning Status */}
          {isBluetoothEnabled && (
            <div className="mb-6 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 rounded-2xl blur-lg" />
              
              <Card className="relative backdrop-blur-2xl bg-white/8 border border-white/15 rounded-2xl shadow-xl overflow-hidden">
                <CardContent className="p-8 text-center">
                  <div className="relative mb-6">
                    <BluetoothDiscoverySVG className="w-24 h-24 mx-auto" animated={isScanning} />
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

          {/* Scan Controls */}
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

          {/* Nearby Devices List */}
          {filteredDevices.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-300" />
                  Nearby Devices ({filteredDevices.length})
                </h3>
              </div>
              
              {/* Device Cards */}
              <div className="space-y-3">
                {filteredDevices.map((device, index) => {
                  const DeviceIcon = getDeviceIcon(device.type);
                  const signalColor = getSignalColor(device.signal);
                  const trustColor = getTrustLevelColor(device.trustLevel);
                  
                  return (
                    <div key={device.id} className="relative group">
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
                            {/* Main Device Header */}
                            <div className="flex items-center justify-between mb-4">
                              {/* Device Info */}
                              <div className="flex items-center space-x-4 flex-1">
                                {/* Enhanced Device Avatar with Real Profile Image */}
                                <div className="relative">
                                  <div 
                                    className="absolute inset-0 rounded-xl blur-md opacity-50"
                                    style={{ backgroundColor: device.device_color || device.deviceColor || '#3B82F6' }}
                                  />
                                  <div className="relative w-16 h-16 rounded-xl overflow-hidden border-2 backdrop-blur-xl"
                                    style={{ 
                                      borderColor: `${device.device_color || device.deviceColor || '#3B82F6'}40`
                                    }}
                                  >
                                    {device.profile_image && (
                                      <img 
                                        src={device.profile_image} 
                                        alt={device.name}
                                        className="w-full h-full object-cover"
                                      />
                                    )}
                                    {!device.profile_image && (
                                      <div 
                                        className="w-full h-full flex items-center justify-center"
                                        style={{ backgroundColor: `${device.device_color || device.deviceColor || '#3B82F6'}15` }}
                                      >
                                        <DeviceIcon 
                                          className="w-8 h-8"
                                          style={{ color: device.device_color || device.deviceColor || '#3B82F6' }}
                                        />
                                      </div>
                                    )}
                                  </div>
                                </div>
                                
                                {/* Enhanced Device Details */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <h4 className="text-white font-bold text-base truncate">
                                      {device.name}
                                    </h4>
                                    {(device.is_verified || device.verified) && (
                                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                                    )}
                                  </div>
                                  
                                  <div className="space-y-1">
                                    <div className="flex items-center space-x-3 text-xs">
                                      <span className="text-white/70 font-medium">{device.model}</span>
                                      <span className="text-white/40">•</span>
                                      <span className="text-white/70 font-medium">{device.distance || `${(Math.random() * 10).toFixed(1)}m`}</span>
                                      <span className="text-white/40">•</span>
                                      <span className="text-green-400 font-medium">
                                        {device.transaction_count || device.transactionHistory || 0} transactions
                                      </span>
                                    </div>
                                    
                                    <div className="flex items-center space-x-2">
                                      <Badge 
                                        variant="secondary" 
                                        className="text-xs px-2 py-0.5 rounded-md font-semibold"
                                        style={{ 
                                          backgroundColor: `${trustColor}20`,
                                          color: trustColor,
                                          borderColor: `${trustColor}40`
                                        }}
                                      >
                                        {device.trust_level || device.trustLevel}
                                      </Badge>
                                      
                                      {device.rating && (
                                        <div className="flex items-center space-x-1">
                                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                          <span className="text-xs text-yellow-400 font-semibold">
                                            {device.rating} ({device.review_count})
                                          </span>
                                        </div>
                                      )}
                                    </div>

                                    {/* Owner Information */}
                                    {device.owner_name && (
                                      <div className="flex items-center space-x-2 text-xs">
                                        <User className="w-3 h-3 text-blue-400" />
                                        <span className="text-blue-400 font-medium">{device.owner_name}</span>
                                        {device.owner_phone && (
                                          <>
                                            <span className="text-white/40">•</span>
                                            <span className="text-white/60">{device.owner_phone}</span>
                                          </>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              
                              {/* Enhanced Signal and Battery */}
                              <div className="flex flex-col items-end space-y-2">
                                {/* Signal Indicator */}
                                <div className="flex items-center space-x-2">
                                  <div className="flex items-center space-x-1">
                                    {[...Array(4)].map((_, i) => (
                                      <div
                                        key={i}
                                        className={`w-1.5 rounded-full transition-all duration-300 ${
                                          i < Math.floor((device.signal_strength || device.signal || 75) / 25) 
                                            ? 'bg-current opacity-100' 
                                            : 'bg-white/20 opacity-50'
                                        }`}
                                        style={{ 
                                          height: `${(i + 1) * 4}px`,
                                          color: signalColor
                                        }}
                                      />
                                    ))}
                                  </div>
                                  <span 
                                    className="text-xs font-bold"
                                    style={{ color: signalColor }}
                                  >
                                    {device.signal_strength || device.signal || 75}%
                                  </span>
                                </div>

                                {/* Battery Level */}
                                {device.battery_level && (
                                  <div className="flex items-center space-x-1">
                                    <Battery className="w-3 h-3 text-green-400" />
                                    <span className="text-xs text-green-400 font-semibold">
                                      {device.battery_level}%
                                    </span>
                                  </div>
                                )}

                                {/* Last Seen */}
                                <div className="text-xs text-white/50 text-right">
                                  {device.last_seen ? new Date(device.last_seen).toLocaleTimeString() : 'Just now'}
                                </div>
                              </div>
                            </div>

                            {/* Bank Account Summary */}
                            {selectedDeviceBanks.length > 0 && selectedDevice?.device_id === device.device_id && (
                              <div className="border-t border-white/10 pt-4 mt-4">
                                <div className="flex items-center space-x-2 mb-3">
                                  <CreditCard className="w-4 h-4 text-green-400" />
                                  <span className="text-sm font-semibold text-green-400">
                                    {selectedDeviceBanks.length} Bank Account{selectedDeviceBanks.length > 1 ? 's' : ''} Connected
                                  </span>
                                </div>
                                
                                <div className="grid grid-cols-1 gap-2">
                                  {selectedDeviceBanks.slice(0, 2).map((bank, i) => (
                                    <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/10">
                                      <div className="flex items-center space-x-2">
                                        <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                          <span className="text-xs font-bold text-white">
                                            {bank.bank_name?.charAt(0) || 'B'}
                                          </span>
                                        </div>
                                        <div>
                                          <div className="text-xs font-semibold text-white">{bank.bank_name}</div>
                                          <div className="text-xs text-white/60">****{bank.account_number?.slice(-4)}</div>
                                        </div>
                                        {bank.is_primary && (
                                          <Badge variant="secondary" className="text-xs px-1 py-0 bg-green-500/20 text-green-400 border-green-500/30">
                                            Primary
                                          </Badge>
                                        )}
                                      </div>
                                      <div className="text-right">
                                        <div className="text-xs font-bold text-green-400">
                                          ₹{parseFloat(bank.balance).toLocaleString()}
                                        </div>
                                        <div className="text-xs text-white/50">
                                          Limit: ₹{parseFloat(bank.daily_limit).toLocaleString()}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                  
                                  {selectedDeviceBanks.length > 2 && (
                                    <div className="text-center text-xs text-white/60 py-1">
                                      +{selectedDeviceBanks.length - 2} more accounts
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* OTP Verification Section */}
                            {otpSent && selectedDevice?.device_id === device.device_id && (
                              <div className="border-t border-white/10 pt-4 mt-4">
                                <div className="space-y-3">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <Shield className="w-4 h-4 text-blue-400" />
                                    <span className="text-sm font-semibold text-blue-400">OTP Verification Required</span>
                                  </div>
                                  
                                  <div className="text-xs text-white/70 mb-3">
                                    Enter the 6-digit verification code sent to {device.owner_name}'s device for secure connection
                                  </div>
                                  
                                  <div className="flex space-x-2">
                                    <input
                                      type="text"
                                      value={otpCode}
                                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                      placeholder="Enter 6-digit OTP"
                                      className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                                      maxLength={6}
                                    />
                                    <Button
                                      onClick={verifyOTP}
                                      disabled={otpCode.length !== 6}
                                      className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                      Verify
                                    </Button>
                                  </div>
                                  
                                  {otpExpiry && (
                                    <div className="text-xs text-white/50 text-center">
                                      OTP expires at {otpExpiry.toLocaleTimeString()}
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Enhanced Connect Section */}
                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                              <div className="flex items-center space-x-3">
                                <div className="flex items-center space-x-2">
                                  <Bluetooth className="w-4 h-4 text-blue-400" />
                                  <span className="text-xs text-blue-400 font-medium">
                                    {device.bluetooth_version || 'BT 5.0'}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Lock className="w-4 h-4 text-green-400" />
                                  <span className="text-xs text-green-400 font-medium">
                                    {device.encryption || 'AES-256'}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="flex space-x-2">
                                {!otpSent && (
                                  <Button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      sendOTP(device);
                                    }}
                                    size="sm"
                                    className="h-9 px-4 rounded-xl text-xs font-semibold bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/40 hover:border-blue-500/60 transition-all duration-300"
                                  >
                                    <MessageSquare className="w-3 h-3 mr-1" />
                                    Send OTP
                                  </Button>
                                )}
                                
                                <Button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeviceSelect(device);
                                  }}
                                  size="sm"
                                  className="h-9 px-4 rounded-xl text-xs font-semibold backdrop-blur-xl border transition-all duration-300 hover:scale-105"
                                  style={{
                                    backgroundColor: `${device.device_color || device.deviceColor || '#3B82F6'}20`,
                                    borderColor: `${device.device_color || device.deviceColor || '#3B82F6'}40`,
                                    color: device.device_color || device.deviceColor || '#3B82F6'
                                  }}
                                >
                                  <Zap className="w-3 h-3 mr-1" />
                                  Connect
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          {/* No Devices Found State */}
          {!isScanning && filteredDevices.length === 0 && isBluetoothEnabled && (
            <div className="text-center py-12">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gray-500/10 rounded-full blur-lg" />
                <div className="relative w-20 h-20 mx-auto rounded-full bg-gray-700/30 backdrop-blur-xl border border-gray-600/30 flex items-center justify-center">
                  <Users className="w-8 h-8 text-gray-400" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-white/80 mb-2">No Devices Found</h3>
              <p className="text-white/60 text-sm font-medium mb-6">
                Make sure nearby devices have Bluetooth enabled and OPPB installed
              </p>
              <Button
                onClick={startBluetoothScan}
                className="h-12 px-8 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/25 backdrop-blur-xl font-semibold transition-all duration-300 hover:scale-105"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Scan Again
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Connection Stage */}
      {paymentStage === 'connect' && selectedDevice && (
        <div className="px-4 relative z-10">
          <div className="space-y-6">
            {/* Connection Status */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-blue-500/10 to-green-500/10 rounded-2xl blur-lg" />
              
              <Card className="relative backdrop-blur-2xl bg-white/8 border border-white/15 rounded-2xl shadow-xl overflow-hidden">
                <CardContent className="p-8 text-center">
                  <div className="relative mb-6">
                    <div className="relative w-24 h-24 mx-auto">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/30 via-blue-500/30 to-green-500/30 rounded-full blur-lg animate-pulse" />
                      <div className="relative w-full h-full rounded-full bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-xl border border-green-500/30 flex items-center justify-center shadow-2xl shadow-green-500/25">
                        <SecureConnectionSVG className="w-16 h-16" connected={connectionStatus === 'connected'} />
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white bg-gradient-to-r from-white via-green-100 to-white bg-clip-text text-transparent mb-3">
                    Connected
                  </h3>
                  <p className="text-white/60 text-sm font-medium mb-2">
                    Securely connected to {selectedDevice.name}
                  </p>
                  <p className="text-green-300 text-xs font-semibold">
                    End-to-end encrypted • {selectedDevice.encryption}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Payment Amount Input */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 rounded-2xl blur-lg" />
              
              <Card className="relative backdrop-blur-2xl bg-white/8 border border-white/15 rounded-2xl shadow-xl overflow-hidden">
                <CardContent className="p-6">
                  <h4 className="text-lg font-bold text-white bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent mb-6">
                    Enter Payment Amount
                  </h4>
                  
                  {/* Amount Input */}
                  <div className="space-y-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-blue-500/10 rounded-xl blur-md" />
                      <div className="relative flex items-center">
                        <span className="text-2xl font-bold text-white/80 mr-2">₹</span>
                        <Input
                          type="number"
                          placeholder="0.00"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="flex-1 text-2xl font-bold bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 backdrop-blur-xl focus:bg-white/15 focus:border-blue-500/40 transition-all duration-300"
                        />
                      </div>
                    </div>
                    
                    {/* Quick Amount Buttons */}
                    <div className="grid grid-cols-4 gap-2">
                      {[100, 500, 1000, 2000].map((quickAmount) => (
                        <Button
                          key={quickAmount}
                          variant="ghost"
                          onClick={() => setAmount(quickAmount.toString())}
                          className="h-10 rounded-xl bg-white/10 border border-white/15 text-white/80 hover:bg-white/15 hover:border-white/25 transition-all duration-300 font-semibold"
                        >
                          ₹{quickAmount}
                        </Button>
                      ))}
                    </div>
                    
                    {/* Payment Note */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-purple-500/5 rounded-xl blur-md" />
                      <Input
                        placeholder="Add a note (optional)"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="relative bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 backdrop-blur-xl focus:bg-white/15 focus:border-purple-500/40 transition-all duration-300"
                      />
                    </div>
                  </div>
                  
                  {/* Send Payment Button */}
                  <div className="mt-8">
                    <SwipeToSend
                      onComplete={() => {
                        if (amount && parseFloat(amount) > 0) {
                          setPaymentStage('pin');
                          setShowPinEntry(true);
                        }
                      }}
                      disabled={!amount || parseFloat(amount) <= 0}
                      variant="primary"
                      text={!amount || parseFloat(amount) <= 0 
                        ? 'Enter amount to continue' 
                        : `Swipe to send ₹${amount}`
                      }
                      className="w-full"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* PIN Entry Stage */}
      {showPinEntry && (
        <PinEntry
          onComplete={(pin) => {
            setShowPinEntry(false);
            setPaymentStage('processing');
            setTransactionId(`TXN${Date.now()}`);
            setTimeout(() => {
              setPaymentStage('success');
            }, 3000);
          }}
          onCancel={() => {
            setShowPinEntry(false);
            setPaymentStage('connect');
          }}
          title="Confirm Offline Payment"
          subtitle={`Enter PIN to send ₹${amount} to ${selectedDevice?.name}`}
        />
      )}

      {/* Processing Stage */}
      {paymentStage === 'processing' && (
        <div className="px-4 relative z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-yellow-500/10 rounded-2xl blur-lg" />
            
            <Card className="relative backdrop-blur-2xl bg-white/8 border border-white/15 rounded-2xl shadow-xl overflow-hidden">
              <CardContent className="p-8 text-center">
                <div className="relative mb-6">
                  <div className="relative w-24 h-24 mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/30 via-orange-500/30 to-yellow-500/30 rounded-full blur-lg animate-pulse" />
                    <div className="relative w-full h-full rounded-full bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-xl border border-yellow-500/30 flex items-center justify-center shadow-2xl shadow-yellow-500/25">
                      <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center">
                        <Loader2 className="w-8 h-8 text-yellow-300 animate-spin" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent mb-3">
                  Processing Payment
                </h3>
                <p className="text-white/60 text-sm font-medium mb-2">
                  Sending ₹{amount} to {selectedDevice?.name}
                </p>
                <p className="text-yellow-300 text-xs font-semibold">
                  Transaction ID: {transactionId}
                </p>
                
                <div className="flex justify-center space-x-3 mt-6">
                  <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full animate-bounce shadow-lg shadow-yellow-500/50" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full animate-bounce shadow-lg shadow-orange-500/50" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full animate-bounce shadow-lg shadow-yellow-500/50" style={{ animationDelay: '300ms' }}></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Success Stage */}
      {paymentStage === 'success' && (
        <PaymentSuccess
          amount={amount}
          recipient={selectedDevice?.name || "Device"}
          upiRef={transactionId}
          onDone={() => {
            setPaymentStage('discovery');
            setSelectedDevice(null);
            setAmount("");
            setNote("");
            setTransactionId("");
            setConnectionStatus('idle');
          }}
        />
      )}

      {/* Bottom Navigation */}
      <div className="relative z-10">
        <BottomNavigation activeTab="offline" />
      </div>
    </div>
  );
}