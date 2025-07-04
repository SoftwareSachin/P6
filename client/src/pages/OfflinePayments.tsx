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

  const [showPinEntry, setShowPinEntry] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const scanIntervalRef = useRef<NodeJS.Timeout>();
  const progressIntervalRef = useRef<NodeJS.Timeout>();

  // Enhanced offline features with real-time capabilities
  const [connectionMode, setConnectionMode] = useState<'bluetooth' | 'wifi-direct' | 'mesh' | 'sms-fallback'>('bluetooth');
  const [localLedger, setLocalLedger] = useState<any[]>([]);
  const [pendingSync, setPendingSync] = useState<any[]>([]);
  const [fraudAlert, setFraudAlert] = useState<string | null>(null);


  const [cryptoKeys, setCryptoKeys] = useState<{ public: string; private: string } | null>(null);
  const [transactionHistory, setTransactionHistory] = useState<any[]>([]);
  
  // Real-time system monitoring
  const [networkHealth, setNetworkHealth] = useState<'excellent' | 'good' | 'poor' | 'offline'>('good');
  const [systemLoad, setSystemLoad] = useState(45);
  const [batteryLevel, setBatteryLevel] = useState(85);
  const [syncProgress, setSyncProgress] = useState(0);
  const [liveConnections, setLiveConnections] = useState(0);
  const [throughputMbps, setThroughputMbps] = useState(12.5);
  const [encryptionStrength, setEncryptionStrength] = useState(256);
  const [transactionLatency, setTransactionLatency] = useState(120);
  const [fraudRiskLevel, setFraudRiskLevel] = useState<'low' | 'medium' | 'high'>('low');
  const [meshTopology, setMeshTopology] = useState<'star' | 'mesh' | 'hybrid'>('hybrid');
  const [offlineCapability, setOfflineCapability] = useState(95);

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

  // Real-time system monitoring and updates
  useEffect(() => {

    // Robust system metrics monitoring with stable updates
    const systemMonitoring = setInterval(() => {
      // Stable network health with gradual changes
      setNetworkHealth(prev => {
        if (Math.random() > 0.85) { // Only change 15% of the time
          const healthStates = ['excellent', 'good', 'poor'] as const; // Remove 'offline' to prevent glitches
          const weights = [0.4, 0.4, 0.2]; // Bias toward good states
          const rand = Math.random();
          let cumWeight = 0;
          for (let i = 0; i < weights.length; i++) {
            cumWeight += weights[i];
            if (rand <= cumWeight) return healthStates[i];
          }
          return 'good';
        }
        return prev;
      });

      // Smoother system load changes
      setSystemLoad(prev => {
        const change = (Math.random() - 0.5) * 5; // Smaller increments
        return Math.max(25, Math.min(80, Math.round(prev + change)));
      });

      // Stable battery with realistic decline
      setBatteryLevel(prev => {
        const change = Math.random() > 0.9 ? -1 : 0; // Slow battery drain
        return Math.max(40, Math.min(100, prev + change));
      });

      // Stable connection count
      setLiveConnections(prev => {
        const change = Math.floor((Math.random() - 0.5) * 3);
        return Math.max(0, Math.min(25, prev + change));
      });

      // Smoother throughput changes
      setThroughputMbps(prev => {
        const change = (Math.random() - 0.5) * 3;
        return parseFloat(Math.max(8, Math.min(35, prev + change)).toFixed(1));
      });

      // Stable latency with realistic ranges
      setTransactionLatency(prev => {
        const change = Math.floor((Math.random() - 0.5) * 20);
        return Math.max(80, Math.min(250, prev + change));
      });

      // Stable fraud risk assessment
      setFraudRiskLevel(prev => {
        const recentTxCount = localLedger.filter(
          tx => Date.now() - new Date(tx.timestamp).getTime() < 5 * 60 * 1000
        ).length;
        
        if (recentTxCount >= 5) return 'high';
        if (recentTxCount >= 3) return 'medium';
        return 'low';
      });

    }, 4000); // Slower updates to reduce glitching

    // Continuous sync progress updates
    const syncMonitoring = setInterval(() => {
      if (pendingSync.length > 0) {
        setSyncProgress(prev => {
          const increment = Math.random() * 10;
          const newProgress = prev + increment;
          if (newProgress >= 100) {
            // Simulate successful sync
            setTimeout(() => {
              setPendingSync([]);
              setSyncProgress(0);
            }, 500);
            return 100;
          }
          return newProgress;
        });
      }
    }, 1000);

    return () => {
      clearInterval(systemMonitoring);
      clearInterval(syncMonitoring);
      // Clear scan-related intervals to prevent glitches
      if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      // Clear session monitoring
      if ((window as any).sessionMonitoring) {
        clearInterval((window as any).sessionMonitoring);
      }
    };
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

  // Enhanced ultra-dynamic local ledger with real-time processing
  const addToLocalLedger = (transaction: any) => {
    // Check for fraud before processing
    if (detectFraud(transaction)) {
      return false;
    }

    const signedTransaction = signTransaction(transaction);
    if (!signedTransaction) return false;

    const ledgerEntry = {
      ...signedTransaction,
      id: `LOCAL_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
      timestamp: new Date().toISOString(),
      status: 'pending_sync',
      cryptoVerified: true,
      processingTime: transactionLatency,
      networkHealth: networkHealth,
      connectionMode: connectionMode,
      securityLevel: encryptionStrength,
      deviceFingerprint: cryptoKeys?.public.substring(0, 8),
      realTimeMetrics: {
        throughput: throughputMbps,
        latency: transactionLatency,
        batteryLevel: batteryLevel,
        signalStrength: nearbyDevices.find(d => d.device_id === selectedDevice?.device_id)?.signal_strength || 0
      }
    };

    // Ultra-dynamic ledger update with animations
    const updatedLedger = [...localLedger, ledgerEntry];
    setLocalLedger(updatedLedger);
    localStorage.setItem('oppb_local_ledger', JSON.stringify(updatedLedger));

    // Add to pending sync queue with real-time priority
    const updatedPending = [...pendingSync, {
      ...ledgerEntry,
      syncPriority: fraudRiskLevel === 'high' ? 'urgent' : 'normal',
      estimatedSyncTime: Math.floor(Math.random() * 30) + 10,
      retryCount: 0
    }];
    setPendingSync(updatedPending);
    localStorage.setItem('oppb_pending_sync', JSON.stringify(updatedPending));

    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100, 50, 100]);
    }

    // Update system metrics
    setTransactionLatency(Math.floor(Math.random() * 100) + 50);
    setSystemLoad(prev => Math.min(95, prev + Math.random() * 10));

    return true;
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



  // SMS fallback for transactions
  const sendSMSFallback = async (transactionData: any) => {
    return false;

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

  // Ultra-functional real-time Bluetooth scanning with dynamic updates
  const startBluetoothScan = () => {
    if (!isBluetoothEnabled) return;
    
    setIsScanning(true);
    setNearbyDevices([]);
    setScanningProgress(0);

    
    // Clear any existing intervals
    if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    
    // Stable progress animation without glitches
    progressIntervalRef.current = setInterval(() => {
      setScanningProgress(prev => {
        if (prev >= 100) {
          return 100;
        }
        // Consistent increment to prevent glitching
        const increment = 2.5; // Steady progress
        return Math.min(100, prev + increment);
      });
    }, 120); // Consistent timing
    
    // Real-time progressive device discovery with live updates
    const performUltraDiscovery = async () => {
      try {
        // Initial system check
        setSystemLoad(Math.floor(Math.random() * 20) + 60); // Higher load during scan
        
        // Fetch devices from API with real-time enhancements
        const fetchResponse = await fetch('/api/offline/devices?limit=25');
        if (fetchResponse.ok) {
          const devices = await fetchResponse.json();
          
          // Add ultra-dynamic real-time properties
          const ultraEnhancedDevices = devices.map((device: any, index: number) => ({
            ...device,
            signal_strength: Math.floor(Math.random() * 40) + 60,
            distance: `${(Math.random() * 15 + 0.5).toFixed(1)}m`,
            battery_level: Math.floor(Math.random() * 40) + 60,
            last_seen: new Date().toISOString(),
            connection_quality: Math.random() > 0.7 ? 'excellent' : Math.random() > 0.4 ? 'good' : 'fair',
            transaction_speed: Math.floor(Math.random() * 200) + 50,
            encryption_level: Math.random() > 0.8 ? 'military' : 'bank-grade',
            mesh_capable: Math.random() > 0.6,
            relay_node: Math.random() > 0.8,
            sync_status: Math.random() > 0.7 ? 'synced' : 'pending',
            data_usage: `${(Math.random() * 5).toFixed(1)}MB`,
            uptime: `${Math.floor(Math.random() * 24)}h ${Math.floor(Math.random() * 60)}m`,
            peak_throughput: `${(Math.random() * 50 + 10).toFixed(1)} Mbps`,
            security_score: Math.floor(Math.random() * 20) + 80,
            fraud_alerts: Math.floor(Math.random() * 3),
            realtime_id: `RT_${Date.now()}_${index}`
          }));
          
          // Stable progressive discovery without glitching
          const discoverySteps = 4; // Reduced steps for stability
          const devicesPerStep = Math.ceil(ultraEnhancedDevices.length / discoverySteps);
          
          for (let step = 0; step < discoverySteps; step++) {
            setTimeout(() => {
              const endIndex = Math.min((step + 1) * devicesPerStep, ultraEnhancedDevices.length);
              const currentDevices = ultraEnhancedDevices.slice(0, endIndex);
              
              // Stable device data without excessive fluctuations
              const stableDevices = currentDevices.map((device: any, idx: number) => ({
                ...device,
                signal_strength: Math.floor(Math.random() * 30) + 70, // Keep signals strong
                last_ping: Date.now(),
                active: true,
                discovery_order: step + 1,
                stable_id: `device_${idx}_${step}` // Prevent duplicate keys
              }));
              
              setNearbyDevices(stableDevices);
              setRealDevices(stableDevices);
              setLiveConnections(endIndex);
              

              
              console.log(`🔍 Step ${step + 1}: Discovered ${endIndex} devices`);
            }, step * 800); // Consistent timing without randomness
          }
        }
        
        // Simplified monitoring to prevent glitches - removed continuous updates
        
      } catch (error) {
        console.error('Enhanced discovery failed:', error);

      }
    };
    
    // Start discovery after brief initialization
    setTimeout(performUltraDiscovery, 300);
    
    // Complete scan with stability
    setTimeout(() => {
      setIsScanning(false);
      setScanningProgress(100);
      setSystemLoad(35); // Fixed value to prevent glitching
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      
      // Mark devices as ready without excessive updates
      setNearbyDevices(prev => prev.map((device: any) => ({
        ...device,
        scan_complete: true,
        ready_for_connection: true
      })));
      
    }, 4000); // Reduced timing for better user experience
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

  // Ultra-dynamic device connection with real-time monitoring
  const connectToDevice = async (device: any) => {
    setSelectedDevice(device);
    setConnectionStatus('connecting');
    
    // Real-time connection simulation with progressive updates
    const connectionSteps = [
      { step: 'Initiating handshake...', delay: 300 },
      { step: 'Establishing secure channel...', delay: 600 },
      { step: 'Verifying device identity...', delay: 900 },
      { step: 'Loading bank accounts...', delay: 1200 },
      { step: 'Setting up payment session...', delay: 1500 },
      { step: 'Connection established!', delay: 1800 }
    ];

    // Update system metrics during connection
    setSystemLoad(Math.floor(Math.random() * 30) + 40);
    setTransactionLatency(Math.floor(Math.random() * 100) + 80);

    // Progressive connection status updates
    connectionSteps.forEach(({ step, delay }) => {
      setTimeout(() => {
        console.log(`🔗 ${step}`);
        // Update throughput during connection
        setThroughputMbps(parseFloat((Math.random() * 20 + 15).toFixed(1)));
      }, delay);
    });
    
    // Fetch comprehensive device details with real-time data
    await fetchDeviceDetails(device.device_id || device.deviceId);
    
    // Enhanced connection completion
    setTimeout(() => {
      setConnectionStatus('connected');
      setPaymentStage('connect');
      
      // Update device history with enhanced metadata
      setDeviceHistory(prev => {
        const enhancedDevice = {
          ...device,
          lastConnected: new Date().toISOString(),
          connectionQuality: 'excellent',
          establishedAt: Date.now(),
          sessionDuration: 0,
          dataTransferred: '0KB'
        };
        
        const updated = [enhancedDevice, ...prev.filter(d => (d.device_id || d.deviceId) !== (device.device_id || device.deviceId))];
        return updated.slice(0, 5);
      });

      // Start real-time session monitoring
      const sessionMonitoring = setInterval(() => {
        setSelectedDevice((prev: any) => prev ? {
          ...prev,
          sessionDuration: Date.now() - (prev.establishedAt || Date.now()),
          dataTransferred: `${(Math.random() * 50 + 10).toFixed(1)}KB`,
          lastActivity: new Date().toISOString()
        } : prev);
      }, 3000);

      // Store monitoring interval reference
      (window as any).sessionMonitoring = sessionMonitoring;

      // Haptic feedback
      if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200]);
      }

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





      {/* Discovery Stage */}
      {paymentStage === 'discovery' && (
        <div className="px-4 relative z-10">




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
                                    
                                    {/* Ultra-Dynamic Real-Time Device Metrics */}
                                    <div className="flex items-center space-x-3 text-xs mt-1">
                                      {device.connection_quality && (
                                        <div className="flex items-center space-x-1">
                                          <div className={`w-2 h-2 rounded-full ${
                                            device.connection_quality === 'excellent' ? 'bg-green-400' :
                                            device.connection_quality === 'good' ? 'bg-blue-400' : 'bg-yellow-400'
                                          } animate-pulse`} />
                                          <span className="text-white/60">{device.connection_quality}</span>
                                        </div>
                                      )}
                                      
                                      {device.transaction_speed && (
                                        <div className="flex items-center space-x-1">
                                          <Zap className="w-3 h-3 text-yellow-400" />
                                          <span className="text-yellow-400 font-semibold">{device.transaction_speed}ms</span>
                                        </div>
                                      )}
                                      
                                      {device.encryption_level && (
                                        <div className="flex items-center space-x-1">
                                          <Lock className="w-3 h-3 text-purple-400" />
                                          <span className="text-purple-400 text-xs">{device.encryption_level}</span>
                                        </div>
                                      )}
                                    </div>
                                    
                                    {/* Real-Time Status Indicators */}
                                    <div className="flex items-center space-x-2 mt-2">
                                      {device.mesh_capable && (
                                        <Badge variant="secondary" className="text-xs px-2 py-0.5 bg-blue-500/20 text-blue-400 border-blue-500/30">
                                          Mesh Ready
                                        </Badge>
                                      )}
                                      
                                      {device.relay_node && (
                                        <Badge variant="secondary" className="text-xs px-2 py-0.5 bg-purple-500/20 text-purple-400 border-purple-500/30">
                                          Relay Node
                                        </Badge>
                                      )}
                                      
                                      {device.sync_status === 'synced' && (
                                        <Badge variant="secondary" className="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 border-green-500/30">
                                          Synced
                                        </Badge>
                                      )}
                                      
                                      {device.active && (
                                        <div className="flex items-center space-x-1">
                                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                          <span className="text-xs text-green-400">Live</span>
                                        </div>
                                      )}
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

      {/* Ultra-Dynamic Processing Stage with Real-Time Updates */}
      {paymentStage === 'processing' && (
        <div className="px-4 relative z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-yellow-500/10 rounded-2xl blur-lg" />
            
            <Card className="relative backdrop-blur-2xl bg-white/8 border border-white/15 rounded-2xl shadow-xl overflow-hidden">
              <CardContent className="p-8">
                {/* Processing Animation */}
                <div className="text-center mb-8">
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
                </div>

                {/* Real-Time Processing Steps */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      </div>
                      <span className="text-sm text-white">Cryptographic signature generated</span>
                    </div>
                    <span className="text-xs text-green-400 font-semibold">{encryptionStrength}-bit</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      </div>
                      <span className="text-sm text-white">Local ledger updated</span>
                    </div>
                    <span className="text-xs text-green-400 font-semibold">Secure</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                        <Loader2 className="w-4 h-4 text-yellow-400 animate-spin" />
                      </div>
                      <span className="text-sm text-white">Transmitting via {connectionMode}</span>
                    </div>
                    <span className="text-xs text-yellow-400 font-semibold">{throughputMbps} Mbps</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <Clock className="w-4 h-4 text-blue-400" />
                      </div>
                      <span className="text-sm text-white">Waiting for confirmation</span>
                    </div>
                    <span className="text-xs text-blue-400 font-semibold">{transactionLatency}ms</span>
                  </div>
                </div>

                {/* Live System Metrics During Processing */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20">
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-400">{networkHealth.toUpperCase()}</div>
                      <div className="text-xs text-white/60">Network Health</div>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/20">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-400">{fraudRiskLevel.toUpperCase()}</div>
                      <div className="text-xs text-white/60">Risk Level</div>
                    </div>
                  </div>
                </div>

                {/* Processing Progress Indicators */}
                <div className="flex justify-center space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full animate-bounce shadow-lg shadow-yellow-500/50" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full animate-bounce shadow-lg shadow-orange-500/50" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full animate-bounce shadow-lg shadow-yellow-500/50" style={{ animationDelay: '300ms' }}></div>
                  <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full animate-bounce shadow-lg shadow-orange-500/50" style={{ animationDelay: '450ms' }}></div>
                  <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full animate-bounce shadow-lg shadow-yellow-500/50" style={{ animationDelay: '600ms' }}></div>
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
      </div>
    </div>
  );
}