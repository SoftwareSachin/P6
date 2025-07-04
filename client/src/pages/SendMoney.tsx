import React, { useState, useEffect, useCallback, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, Phone, Mail, Plus, Check, X, Star, Clock, Shield, Zap, AlertCircle, Users, Hash } from "lucide-react";
import { Link, useLocation } from "wouter";
import { ApplePaySendMoneySVG, ApplePayContactlessSVG, ApplePayPhoneSVG, ApplePaySecuritySVG, ApplePayBiometricSVG, ApplePayWalletSVG } from "@/components/ApplePaySVGs";
import { PremiumFavoritesSVG, PremiumStarSVG } from "@/components/PremiumSVGs";
import { BottomNavigation } from "@/components/BottomNavigation";
import { SwipeToSend } from "@/components/SwipeToSend";
import authGif from "@assets/fetchpik.com-iconscout-QcuPAs3flx_1751393184609.gif";
import paymentProcessingGif from "@assets/fetchpik.com-iconscout-oyH8Q3sTzp_1751390333986.gif";

export default function SendMoney() {
  const [location, setLocation] = useLocation();
  const [step, setStep] = useState<'contacts' | 'amount' | 'confirm' | 'pin' | 'processing' | 'success'>('contacts');
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isUpiSearch, setIsUpiSearch] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const [showNearbyDevices, setShowNearbyDevices] = useState(false);
  const [showNewContact, setShowNewContact] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [newContactName, setNewContactName] = useState("");
  const [newContactUpi, setNewContactUpi] = useState("");
  const [pin, setPin] = useState("");
  const [pinAttempts, setPinAttempts] = useState(0);
  
  // Ultra-Premium Smart Search States
  const [searchType, setSearchType] = useState<'name' | 'phone' | 'upi' | 'mixed'>('name');
  const [upiValidation, setUpiValidation] = useState<{ isValid: boolean; provider: string; type: string } | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<any[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showSmartSuggestions, setShowSmartSuggestions] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const debounceTimer = useRef<NodeJS.Timeout>();

  // Handle URL parameters from offline payments
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const deviceId = urlParams.get('deviceId');
    const deviceName = urlParams.get('deviceName');
    const ownerName = urlParams.get('ownerName');
    const ownerPhone = urlParams.get('ownerPhone');

    if (deviceId && deviceName && ownerName && ownerPhone) {
      // Create a contact from the device information
      const deviceContact = {
        id: 'offline-device-' + deviceId,
        name: ownerName,
        phone: ownerPhone,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${ownerName}`,
        upiId: `${ownerName.toLowerCase().replace(/\s+/g, '')}@upi`,
        favorite: false,
        lastTransaction: 'New contact',
        verified: true,
        deviceInfo: {
          deviceId,
          deviceName,
          isOfflineDevice: true
        }
      };

      // Auto-select this contact and move to amount step
      setSelectedContact(deviceContact);
      setStep('amount');
      setNote(`Payment via ${deviceName}`);
      
      console.log('📱 Pre-filled contact from offline device:', ownerName);
    }
  }, [location]);

  const allContacts = [
    {
      id: 1,
      name: "Rohit Kumar",
      phone: "+91 98765 43210",
      avatar: "/api/placeholder/40/40",
      upiId: "rohit@paytm",
      favorite: true,
      lastTransaction: "Yesterday",
      verified: true
    },
    {
      id: 2,
      name: "Priya Sharma",
      phone: "+91 87654 32109",
      avatar: "/api/placeholder/40/40",
      upiId: "priya@gpay",
      favorite: true,
      lastTransaction: "2 days ago",
      verified: true
    },
    {
      id: 3,
      name: "Amit Singh",
      phone: "+91 76543 21098",
      avatar: "/api/placeholder/40/40",
      upiId: "amit@phonepe",
      favorite: false,
      lastTransaction: "1 week ago",
      verified: true
    },
    {
      id: 4,
      name: "Sneha Patel",
      phone: "+91 65432 10987",
      avatar: "/api/placeholder/40/40",
      upiId: "sneha@paytm",
      favorite: false,
      lastTransaction: "2 weeks ago",
      verified: true
    },
    {
      id: 5,
      name: "Rajesh Gupta",
      phone: "+91 98123 45678",
      avatar: "/api/placeholder/40/40",
      upiId: "rajesh@ybl",
      favorite: false,
      lastTransaction: "3 weeks ago",
      verified: true
    },
    {
      id: 6,
      name: "Kavya Nair",
      phone: "+91 89012 34567",
      avatar: "/api/placeholder/40/40",
      upiId: "kavya@okaxis",
      favorite: false,
      lastTransaction: "1 month ago",
      verified: true
    },
    {
      id: 7,
      name: "Arjun Reddy",
      phone: "+91 78901 23456",
      avatar: "/api/placeholder/40/40",
      upiId: "arjun@icici",
      favorite: false,
      lastTransaction: "2 months ago",
      verified: false
    },
    {
      id: 8,
      name: "Meera Shah",
      phone: "+91 67890 12345",
      avatar: "/api/placeholder/40/40",
      upiId: "meera@hdfc",
      favorite: false,
      lastTransaction: "3 months ago",
      verified: true
    }
  ];

  const recentContacts = allContacts.slice(0, 4);

  // Nearby devices simulation for Apple Pay-style contactless
  const nearbyDevices = [
    {
      id: 'nearby-1',
      name: 'iPhone 15 Pro',
      owner: 'Rahul Sharma',
      distance: '2 meters',
      signal: 'strong',
      upiId: 'rahul.sharma@paytm',
      avatar: '/api/placeholder/40/40',
      lastSeen: 'now'
    },
    {
      id: 'nearby-2',
      name: 'Samsung Galaxy S24',
      owner: 'Aditi Patel',
      distance: '5 meters',
      signal: 'medium',
      upiId: 'aditi@ybl',
      avatar: '/api/placeholder/40/40',
      lastSeen: '2 minutes ago'
    },
    {
      id: 'nearby-3',
      name: 'OPPB Wallet',
      owner: 'Vikram Singh',
      distance: '8 meters',
      signal: 'weak',
      upiId: 'vikram@okaxis',
      avatar: '/api/placeholder/40/40',
      lastSeen: '5 minutes ago'
    }
  ];

  const quickAmounts = [100, 500, 1000, 2000];

  // Ultra-Premium UPI Provider Database with SVG Icons
  const upiProviders: Record<string, { name: string; color: string; iconComponent: any }> = {
    'paytm': { name: 'Paytm', color: '#00BAF2', iconComponent: ApplePayWalletSVG },
    'gpay': { name: 'Google Pay', color: '#4285F4', iconComponent: ApplePayContactlessSVG },
    'phonepe': { name: 'PhonePe', color: '#5F259F', iconComponent: ApplePayPhoneSVG },
    'ybl': { name: 'Yes Bank', color: '#1C4B9C', iconComponent: Shield },
    'okaxis': { name: 'Axis Bank', color: '#A41E36', iconComponent: ApplePaySecuritySVG },
    'icici': { name: 'ICICI Bank', color: '#F37B21', iconComponent: ApplePayBiometricSVG },
    'hdfc': { name: 'HDFC Bank', color: '#004C8F', iconComponent: Shield },
    'sbi': { name: 'SBI', color: '#22409A', iconComponent: Star },
    'kotak': { name: 'Kotak Mahindra', color: '#ED1C24', iconComponent: Zap },
    'upi': { name: 'BHIM UPI', color: '#FF6600', iconComponent: Mail }
  };

  // Ultra-Premium UPI Validation Function
  const validateUpiId = useCallback((upiId: string) => {
    const upiPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/;
    const parts = upiId.split('@');
    
    if (!upiPattern.test(upiId) || parts.length !== 2) {
      return { isValid: false, provider: '', type: 'invalid' };
    }

    const [handle, domain] = parts;
    const provider = Object.keys(upiProviders).find(key => domain.includes(key)) || 'unknown';
    
    return {
      isValid: handle.length >= 3 && handle.length <= 50,
      provider: provider !== 'unknown' ? provider : domain,
      type: provider !== 'unknown' ? 'recognized' : 'custom'
    };
  }, []);

  // Smart Search Type Detection
  const detectSearchType = useCallback((query: string) => {
    if (query.includes('@')) return 'upi';
    if (/^\+?[1-9]\d{1,14}$/.test(query.replace(/\s/g, ''))) return 'phone';
    if (/^[a-zA-Z\s]+$/.test(query)) return 'name';
    return 'mixed';
  }, []);

  // Debounced Search with Ultra-Premium Intelligence
  const handleSmartSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setShowSmartSuggestions(query.length > 0);
    
    // Clear previous debounce
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      const searchType = detectSearchType(query);
      setSearchType(searchType);

      if (query.length === 0) {
        setSearchResults([]);
        setUpiValidation(null);
        setIsValidating(false);
        setSearchSuggestions([]);
        return;
      }

      // UPI ID Validation
      if (searchType === 'upi') {
        setIsValidating(true);
        const validation = validateUpiId(query);
        setUpiValidation(validation);
        setIsUpiSearch(true);
        
        // Simulate server validation delay
        setTimeout(() => {
          setIsValidating(false);
        }, 800);

        // Search in contacts by UPI ID
        const upiResults = allContacts.filter(contact => 
          contact.upiId.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(upiResults);
        
        // Generate smart suggestions for partial UPI IDs
        if (query.length >= 3 && !query.includes('@')) {
          const suggestions = Object.keys(upiProviders).map(provider => ({
            type: 'upi-suggestion',
            text: `${query}@${provider}`,
            provider: upiProviders[provider].name,
            color: upiProviders[provider].color,
            iconComponent: upiProviders[provider].iconComponent
          }));
          setSearchSuggestions(suggestions.slice(0, 3));
        }
      } else {
        setIsUpiSearch(false);
        setUpiValidation(null);
        setIsValidating(false);
        
        // Advanced contact search with fuzzy matching
        const results = allContacts.filter(contact => {
          const nameMatch = contact.name.toLowerCase().includes(query.toLowerCase());
          const phoneMatch = contact.phone.replace(/\D/g, '').includes(query.replace(/\D/g, ''));
          const upiMatch = contact.upiId.toLowerCase().includes(query.toLowerCase());
          
          return nameMatch || phoneMatch || upiMatch;
        });
        
        // Sort by relevance (favorites first, then by name)
        results.sort((a, b) => {
          if (a.favorite && !b.favorite) return -1;
          if (!a.favorite && b.favorite) return 1;
          return a.name.localeCompare(b.name);
        });
        
        setSearchResults(results);
        
        // Generate smart suggestions based on search type
        const suggestions = [];
        if (searchType === 'phone' && query.length >= 4) {
          suggestions.push({
            type: 'phone-suggestion',
            text: `Send to +91 ${query}`,
            action: 'phone'
          });
        }
        if (searchType === 'name' && query.length >= 2) {
          suggestions.push({
            type: 'name-suggestion',
            text: `Search "${query}" in all contacts`,
            action: 'global-search'
          });
        }
        setSearchSuggestions(suggestions);
      }
    }, 300);
  }, [detectSearchType, validateUpiId]);

  // Add to recent searches
  const addToRecentSearches = useCallback((query: string) => {
    if (query.length >= 3) {
      setRecentSearches(prev => {
        const updated = [query, ...prev.filter(item => item !== query)].slice(0, 5);
        return updated;
      });
    }
  }, []);

  const filteredContacts = searchQuery.length > 0 ? searchResults : recentContacts;

  const handleContactSelect = (contact: any) => {
    addToRecentSearches(searchQuery);
    setSelectedContact(contact);
    setStep('amount');
  };

  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion: any) => {
    if (suggestion.type === 'upi-suggestion') {
      setSearchQuery(suggestion.text);
      handleSmartSearch(suggestion.text);
    } else if (suggestion.action === 'phone') {
      setShowPhoneInput(true);
      setPhoneNumber(suggestion.text.replace(/\D/g, ''));
    }
  };

  const handleAmountSubmit = () => {
    if (amount && parseFloat(amount) > 0) {
      setStep('confirm');
    }
  };

  const handlePayment = () => {
    setStep('pin');
  };

  const handlePinInput = (digit: string) => {
    if (pin.length < 4) {
      setPin(prev => prev + digit);
    }
  };

  const handlePinDelete = () => {
    setPin(prev => prev.slice(0, -1));
  };

  const handlePinSubmit = () => {
    if (pin.length === 4) {
      // Simulate PIN verification
      if (pin === "1234") {
        console.log('PIN verified, proceeding to processing');
        setStep('processing');
        setPin("");
      } else {
        setPinAttempts(prev => prev + 1);
        setPin("");
        if (pinAttempts >= 2) {
          // Too many attempts, go back to confirm
          setStep('confirm');
          setPinAttempts(0);
        }
      }
    }
  };

  // Processing stage delay - 3 seconds before showing success
  useEffect(() => {
    if (step === 'processing') {
      const timer = setTimeout(() => {
        setStep('success');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  // Auto-submit PIN when 4 digits are entered
  useEffect(() => {
    if (pin.length === 4 && step === 'pin') {
      const timer = setTimeout(() => {
        handlePinSubmit();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [pin, step]);

  // Handler functions for quick actions
  const handlePhoneAction = () => {
    setShowPhoneInput(true);
    setShowNearbyDevices(false);
    setShowNewContact(false);
  };

  const handleNearbyAction = () => {
    setShowNearbyDevices(true);
    setShowPhoneInput(false);
    setShowNewContact(false);
  };

  const handleNewContactAction = () => {
    setShowNewContact(true);
    setShowPhoneInput(false);
    setShowNearbyDevices(false);
  };

  const handlePhoneSubmit = () => {
    if (phoneNumber.length >= 10) {
      const newContact = {
        id: Date.now(),
        name: `+91 ${phoneNumber}`,
        phone: `+91 ${phoneNumber}`,
        avatar: '/api/placeholder/40/40',
        upiId: `${phoneNumber}@upi`,
        favorite: false,
        lastTransaction: 'New contact',
        verified: false
      };
      handleContactSelect(newContact);
    }
  };

  const handleNewContactSubmit = () => {
    if (newContactName && newContactUpi) {
      const newContact = {
        id: Date.now(),
        name: newContactName,
        phone: '+91 99999 99999',
        avatar: '/api/placeholder/40/40',
        upiId: newContactUpi,
        favorite: false,
        lastTransaction: 'New contact',
        verified: false
      };
      handleContactSelect(newContact);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Apple Pay Style Header */}
      <div className="flex items-center justify-between p-6 backdrop-blur-xl bg-black/50 relative z-10">
        <Link href="/">
          <Button variant="ghost" size="icon" className="apple-pay-button h-12 w-12 rounded-full">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <div className="text-center">
          <h1 className="text-xl font-bold text-white">Send Money</h1>
          <p className="text-gray-400 text-sm">
            {step === 'contacts' && 'Choose a contact'}
            {step === 'amount' && 'Enter amount'}
            {step === 'confirm' && 'Confirm payment'}
            {step === 'pin' && 'Enter PIN'}
            {step === 'processing' && 'Processing...'}
            {step === 'success' && 'Payment sent'}
          </p>
        </div>
        <div className="w-12 h-12 flex items-center justify-center">
          <ApplePaySendMoneySVG className="w-6 h-6 text-blue-400" />
        </div>
      </div>

      {/* Contacts Selection Step */}
      {step === 'contacts' && (
        <div className="px-6 py-4">
          {/* Ultra-Premium Smart Search Bar */}
          <div className="relative mb-6">
            {/* Search Input with Dynamic Visual Feedback */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 rounded-2xl blur-lg animate-pulse opacity-50" />
              <div className="relative">
                {/* Search Icon with Type Indicator */}
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                  {searchType === 'upi' && <Mail className="w-5 h-5 text-blue-400" />}
                  {searchType === 'phone' && <Phone className="w-5 h-5 text-green-400" />}
                  {searchType === 'name' && <Users className="w-5 h-5 text-purple-400" />}
                  {searchType === 'mixed' && <Search className="w-5 h-5 text-gray-400" />}
                  
                  {/* Validation Status Indicator */}
                  {isValidating && (
                    <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                  )}
                  {upiValidation?.isValid && (
                    <Check className="w-4 h-4 text-green-400" />
                  )}
                  {upiValidation && !upiValidation.isValid && (
                    <X className="w-4 h-4 text-red-400" />
                  )}
                </div>

                <Input
                  type="text"
                  placeholder="Search contacts, phone, or UPI ID"
                  value={searchQuery}
                  onChange={(e) => handleSmartSearch(e.target.value)}
                  ref={searchInputRef}
                  className={`pl-16 pr-4 h-16 rounded-2xl backdrop-blur-xl text-white placeholder-gray-400 text-lg font-medium transition-all duration-500 ${
                    searchType === 'upi' ? 'bg-blue-500/15 border-2 border-blue-500/30 focus:border-blue-400' :
                    searchType === 'phone' ? 'bg-green-500/15 border-2 border-green-500/30 focus:border-green-400' :
                    searchType === 'name' ? 'bg-purple-500/15 border-2 border-purple-500/30 focus:border-purple-400' :
                    'bg-white/10 border-2 border-white/20 focus:border-white/40'
                  }`}
                />
              </div>
            </div>

            {/* Ultra-Premium Smart Suggestions Panel */}
            {showSmartSuggestions && (
              <div className="absolute top-full left-0 right-0 z-50 mt-3">
                <div className="bg-black/95 backdrop-blur-2xl border border-white/15 rounded-3xl shadow-2xl overflow-hidden">
                  {/* Search Type Header */}
                  <div className="p-6 border-b border-white/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          searchType === 'upi' ? 'bg-blue-500/20 border border-blue-500/30' :
                          searchType === 'phone' ? 'bg-green-500/20 border border-green-500/30' :
                          searchType === 'name' ? 'bg-purple-500/20 border border-purple-500/30' :
                          'bg-gray-500/20 border border-gray-500/30'
                        }`}>
                          {searchType === 'upi' && <Mail className="w-5 h-5 text-blue-400" />}
                          {searchType === 'phone' && <Phone className="w-5 h-5 text-green-400" />}
                          {searchType === 'name' && <Users className="w-5 h-5 text-purple-400" />}
                          {searchType === 'mixed' && <Hash className="w-5 h-5 text-gray-400" />}
                        </div>
                        <div>
                          <h3 className="text-white font-semibold text-sm">
                            {searchType === 'upi' && 'UPI ID Search'}
                            {searchType === 'phone' && 'Phone Number Search'}
                            {searchType === 'name' && 'Contact Search'}
                            {searchType === 'mixed' && 'Smart Search'}
                          </h3>
                          <p className="text-gray-400 text-xs">
                            {searchType === 'upi' && 'Enter complete UPI ID (e.g., name@bank)'}
                            {searchType === 'phone' && 'Enter mobile number to send money'}
                            {searchType === 'name' && 'Search by contact name'}
                            {searchType === 'mixed' && 'Multiple search formats detected'}
                          </p>
                        </div>
                      </div>
                      
                      {/* UPI Validation Status */}
                      {upiValidation && (
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          upiValidation.isValid ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                          'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                          {upiValidation.isValid ? 'Valid UPI' : 'Invalid Format'}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Smart Suggestions */}
                  {searchSuggestions.length > 0 && (
                    <div className="p-4">
                      <h4 className="text-white/60 text-xs font-medium uppercase tracking-wide mb-3">Smart Suggestions</h4>
                      <div className="space-y-2">
                        {searchSuggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionSelect(suggestion)}
                            className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 text-left group"
                          >
                            <div className="flex items-center space-x-3">
                              <div 
                                className="w-8 h-8 rounded-lg flex items-center justify-center"
                                style={{ backgroundColor: `${suggestion.color}20`, border: `1px solid ${suggestion.color}40` }}
                              >
                                <Mail className="w-4 h-4" style={{ color: suggestion.color }} />
                              </div>
                              <div className="flex-1">
                                <p className="text-white font-medium text-sm group-hover:text-blue-200 transition-colors">
                                  {suggestion.text}
                                </p>
                                {suggestion.provider && (
                                  <p className="text-gray-400 text-xs">{suggestion.provider}</p>
                                )}
                              </div>
                              <Zap className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* UPI Provider Recognition */}
                  {searchType === 'upi' && upiValidation?.provider && upiProviders[upiValidation.provider] && (
                    <div className="p-4 border-t border-white/10">
                      <div className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                          <Shield className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-white font-medium text-sm">
                            {upiProviders[upiValidation.provider].name} Detected
                          </p>
                          <p className="text-blue-300 text-xs">Verified payment provider</p>
                        </div>
                        <Shield className="w-5 h-5 text-green-400 ml-auto" />
                      </div>
                    </div>
                  )}

                  {/* Recent Searches */}
                  {recentSearches.length > 0 && searchQuery.length === 0 && (
                    <div className="p-4 border-t border-white/10">
                      <h4 className="text-white/60 text-xs font-medium uppercase tracking-wide mb-3">Recent Searches</h4>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.slice(0, 3).map((search, index) => (
                          <button
                            key={index}
                            onClick={() => handleSmartSearch(search)}
                            className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/80 text-xs transition-all duration-300"
                          >
                            <Clock className="w-3 h-3 inline mr-1" />
                            {search}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Search Results Summary */}
          {searchQuery.length > 0 && (
            <div className="px-6 mb-4">
              <div className="flex items-center justify-between">
                <p className="text-gray-400 text-sm">
                  {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} for "{searchQuery}"
                </p>
                {isUpiSearch && (
                  <div className="flex items-center space-x-1 bg-blue-500/20 px-2 py-1 rounded-lg">
                    <Mail className="w-3 h-3 text-blue-400" />
                    <span className="text-blue-400 text-xs font-medium">UPI</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Quick Actions - Only show if not searching */}
          {searchQuery.length === 0 && (
            <div className="grid grid-cols-3 gap-4 mb-8">
              <Button 
                onClick={handlePhoneAction}
                className={`apple-pay-glass h-20 rounded-2xl flex flex-col items-center justify-center space-y-2 transition-all duration-300 ${showPhoneInput ? 'apple-pay-gradient scale-105' : ''}`}
              >
                <Phone className="h-6 w-6" />
                <span className="text-sm">Phone</span>
              </Button>
              <Button 
                onClick={handleNearbyAction}
                className={`apple-pay-glass h-20 rounded-2xl flex flex-col items-center justify-center space-y-2 transition-all duration-300 ${showNearbyDevices ? 'apple-pay-gradient scale-105' : ''}`}
              >
                <ApplePayContactlessSVG className="h-6 w-6" />
                <span className="text-sm">Nearby</span>
              </Button>
              <Button 
                onClick={handleNewContactAction}
                className={`apple-pay-glass h-20 rounded-2xl flex flex-col items-center justify-center space-y-2 transition-all duration-300 ${showNewContact ? 'apple-pay-gradient scale-105' : ''}`}
              >
                <Plus className="h-6 w-6" />
                <span className="text-sm">New</span>
              </Button>
            </div>
          )}

          {/* Phone Number Input Feature */}
          {showPhoneInput && (
            <div className="mb-6">
              <div className="apple-pay-card border-0 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Send to Phone Number</h3>
                    <p className="text-gray-400 text-sm">Enter mobile number to send money</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Mobile Number</label>
                    <div className="flex">
                      <div className="flex items-center px-3 bg-white/10 border border-white/20 border-r-0 rounded-l-xl">
                        <span className="text-white text-sm">+91</span>
                      </div>
                      <Input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        placeholder="9876543210"
                        className="flex-1 bg-white/10 border-white/20 border-l-0 text-white placeholder-gray-400 rounded-r-xl rounded-l-none h-12"
                      />
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <SwipeToSend
                      onComplete={handlePhoneSubmit}
                      text="Swipe to Continue"
                      variant="primary"
                      size="medium"
                      disabled={phoneNumber.length < 10}
                    />
                    <Button 
                      onClick={() => setShowPhoneInput(false)}
                      className="apple-pay-glass border-white/20 text-white flex-1 h-12 rounded-xl"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Nearby Devices Feature */}
          {showNearbyDevices && (
            <div className="mb-6">
              <div className="apple-pay-card border-0 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <ApplePayContactlessSVG className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">Nearby Devices</h3>
                    <p className="text-gray-400 text-sm">Contactless payment via Bluetooth</p>
                  </div>
                  <Button 
                    onClick={() => setShowNearbyDevices(false)}
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-white"
                  >
                    ×
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {nearbyDevices.map((device) => (
                    <div
                      key={device.id}
                      onClick={() => handleContactSelect({
                        id: device.id,
                        name: device.owner,
                        phone: '+91 99999 99999',
                        avatar: device.avatar,
                        upiId: device.upiId,
                        favorite: false,
                        lastTransaction: device.lastSeen,
                        verified: device.signal === 'strong'
                      })}
                      className="flex items-center space-x-4 p-4 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 transition-all duration-200"
                    >
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={device.avatar} />
                          <AvatarFallback className="bg-blue-500 text-white">
                            {device.owner.split(' ').map((n: string) => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-black ${
                          device.signal === 'strong' ? 'bg-green-500' : 
                          device.signal === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></div>
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-semibold text-white">{device.owner}</h4>
                        <p className="text-gray-400 text-sm">{device.name}</p>
                        <p className="text-gray-500 text-xs">{device.distance} • {device.lastSeen}</p>
                      </div>
                      
                      <div className="text-right">
                        <div className={`w-2 h-2 rounded-full ${
                          device.signal === 'strong' ? 'bg-green-400' : 
                          device.signal === 'medium' ? 'bg-yellow-400' : 'bg-red-400'
                        } animate-pulse`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* New Contact Feature */}
          {showNewContact && (
            <div className="mb-6">
              <div className="apple-pay-card border-0 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Plus className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Add New Contact</h3>
                    <p className="text-gray-400 text-sm">Create new payment contact</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Contact Name</label>
                    <Input
                      type="text"
                      value={newContactName}
                      onChange={(e) => setNewContactName(e.target.value)}
                      placeholder="Enter full name"
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400 rounded-xl h-12"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">UPI ID</label>
                    <Input
                      type="text"
                      value={newContactUpi}
                      onChange={(e) => setNewContactUpi(e.target.value)}
                      placeholder="name@bank"
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400 rounded-xl h-12"
                    />
                  </div>
                  
                  <div className="flex space-x-3">
                    <SwipeToSend
                      onComplete={handleNewContactSubmit}
                      text="Swipe to Add Contact"
                      variant="primary"
                      size="medium"
                      disabled={!newContactName || !newContactUpi}
                    />
                    <Button 
                      onClick={() => setShowNewContact(false)}
                      className="apple-pay-glass border-white/20 text-white flex-1 h-12 rounded-xl"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Favorites Section - Only show when no special features are active */}
          {!showPhoneInput && !showNearbyDevices && !showNewContact && searchQuery.length === 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <PremiumFavoritesSVG className="w-5 h-5 mr-2" />
                Favorites
              </h3>
            <div className="grid grid-cols-4 gap-4">
              {recentContacts.filter(c => c.favorite).map((contact) => (
                <Button
                  key={contact.id}
                  onClick={() => handleContactSelect(contact)}
                  className="apple-pay-glass h-20 rounded-2xl flex flex-col items-center justify-center space-y-2 p-2"
                >
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={contact.avatar} />
                    <AvatarFallback className="bg-blue-500 text-white text-sm">
                      {contact.name.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-center leading-tight">{contact.name.split(' ')[0]}</span>
                </Button>
              ))}
            </div>
            </div>
          )}

          {/* Recent Contacts - Only show when no special features are active */}
          {!showPhoneInput && !showNearbyDevices && !showNewContact && (
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Recent</h3>
            <div className="space-y-3">
              {filteredContacts.map((contact) => (
                <Card
                  key={contact.id}
                  className="apple-pay-card border-0 cursor-pointer hover:scale-[1.02] transition-transform duration-200"
                  onClick={() => handleContactSelect(contact)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={contact.avatar} />
                          <AvatarFallback className="bg-blue-500 text-white">
                            {contact.name.split(' ').map((n: string) => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {contact.verified && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center border-2 border-black">
                            <ApplePaySecuritySVG className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold text-white">{contact.name}</h4>
                          {contact.favorite && <PremiumStarSVG className="w-4 h-4" filled={true} />}
                          {contact.verified && (
                            <div className="bg-green-500/20 px-2 py-0.5 rounded-lg">
                              <span className="text-green-400 text-xs font-medium">Verified</span>
                            </div>
                          )}
                        </div>
                        <p className="text-gray-400 text-sm">{contact.upiId}</p>
                        <p className="text-gray-500 text-xs">Last sent: {contact.lastTransaction}</p>
                      </div>
                      <div className="text-right">
                        <ApplePayContactlessSVG className="w-6 h-6 text-blue-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          )}
        </div>
      )}

      {/* Amount Entry Step */}
      {step === 'amount' && (
        <div className="px-6 py-4">
          {/* Selected Contact Card */}
          <Card className="apple-pay-card border-0 mb-6">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={selectedContact?.avatar} />
                  <AvatarFallback className="bg-blue-500 text-white text-lg">
                    {selectedContact?.name.split(' ').map((n: string) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white">{selectedContact?.name}</h3>
                  <p className="text-gray-400">{selectedContact?.upiId}</p>
                  <p className="text-gray-500 text-sm">{selectedContact?.phone}</p>
                </div>
                <div className="flex items-center space-x-1 bg-green-500/20 px-3 py-1 rounded-full">
                  <ApplePaySecuritySVG className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 text-xs font-medium">Verified</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Amount Input */}
          <Card className="apple-pay-card border-0 mb-6">
            <CardContent className="p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Enter Amount</h4>
              
              {/* Large Amount Display */}
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-white mb-2">
                  ₹{amount || "0"}
                </div>
                <p className="text-gray-400 text-sm">Enter amount to send</p>
              </div>

              {/* Quick Amount Buttons */}
              <div className="grid grid-cols-4 gap-3 mb-6">
                {quickAmounts.map((quickAmount) => (
                  <Button
                    key={quickAmount}
                    onClick={() => setAmount(quickAmount.toString())}
                    className={`h-12 rounded-xl ${amount === quickAmount.toString() ? 'apple-pay-gradient text-white' : 'apple-pay-glass text-white border-white/20'}`}
                  >
                    ₹{quickAmount}
                  </Button>
                ))}
              </div>

              {/* Custom Amount Input */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-white mb-2">Custom Amount (₹)</label>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0"
                    className="bg-white/20 border-white/30 text-white placeholder-white/60 rounded-xl h-14 text-xl text-center font-bold backdrop-blur-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-white mb-2">Note (Optional)</label>
                  <Input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="What's this for?"
                    className="bg-white/20 border-white/30 text-white placeholder-white/60 rounded-xl h-12 font-medium backdrop-blur-sm"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-4 pb-24">
            <SwipeToSend
              onComplete={handleAmountSubmit}
              text="Swipe to Continue"
              variant="primary"
              size="large"
              disabled={!amount || parseFloat(amount) <= 0}
            />
            
            <SwipeToSend
              onComplete={() => setStep('contacts')}
              text="Swipe to Change Contact"
              variant="glass"
              size="medium"
            />
          </div>
        </div>
      )}

      {/* Confirmation Step */}
      {step === 'confirm' && (
        <div className="px-6 py-4">
          {/* Payment Summary */}
          <Card className="apple-pay-card border-0 mb-6">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Confirm Payment</h3>
                <div className="text-4xl font-bold text-blue-400 mb-2">₹{amount}</div>
                <p className="text-gray-400">to {selectedContact?.name}</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-gray-400">To</span>
                  <div className="text-right">
                    <p className="text-white font-medium">{selectedContact?.name}</p>
                    <p className="text-gray-400 text-sm">{selectedContact?.upiId}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-gray-400">Amount</span>
                  <span className="text-white font-bold">₹{amount}</span>
                </div>
                
                {note && (
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-gray-400">Note</span>
                    <span className="text-white">{note}</span>
                  </div>
                )}
                
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-400">Payment Method</span>
                  <span className="text-white">OPPB Wallet</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Biometric Authentication */}
          <Card className="apple-pay-card border-0 mb-6">
            <CardContent className="p-6 text-center">
              <div className="w-20 h-12 mx-auto mb-4 flex items-center justify-center">
                <img 
                  src={authGif} 
                  alt="Authentication"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <p className="text-gray-400 text-sm">Use Face ID or Touch ID to confirm</p>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-4 pb-24">
            <SwipeToSend
              onComplete={handlePayment}
              text={`Swipe to Pay ₹${amount}`}
              variant="success"
              size="large"
            />
            
            <SwipeToSend
              onComplete={() => setStep('amount')}
              text="Swipe to Edit Amount"
              variant="glass"
              size="medium"
            />
          </div>
        </div>
      )}

      {/* PIN Entry Step */}
      {step === 'pin' && (
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="text-center space-y-6 w-full max-w-sm mx-auto">
            {/* PIN Entry Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Enter PIN</h2>
              <p className="text-gray-400 text-lg">Enter your 4-digit PIN to authorize payment</p>
              <p className="text-blue-400 text-xl font-semibold mt-2">₹{amount} to {selectedContact?.name}</p>
              {pinAttempts > 0 && (
                <p className="text-red-400 text-sm mt-2">
                  Wrong PIN. {3 - pinAttempts} attempts remaining
                </p>
              )}
            </div>
            
            {/* PIN Display */}
            <div className="flex justify-center space-x-4 mb-8">
              {[0, 1, 2, 3].map((index) => (
                <div
                  key={index}
                  className={`w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    index < pin.length 
                      ? 'border-green-400 bg-green-400/20' 
                      : 'border-gray-600 bg-gray-800/50'
                  }`}
                >
                  {index < pin.length && (
                    <div className="w-3 h-3 rounded-full bg-white animate-pulse"></div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Number Pad */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white text-2xl font-bold hover:bg-white/20 active:scale-95 transition-all duration-200"
                  onClick={() => handlePinInput(num.toString())}
                >
                  {num}
                </button>
              ))}
              <div></div>
              <button
                className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white text-2xl font-bold hover:bg-white/20 active:scale-95 transition-all duration-200"
                onClick={() => handlePinInput('0')}
              >
                0
              </button>
              <button
                className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white text-lg font-bold hover:bg-white/20 active:scale-95 transition-all duration-200"
                onClick={handlePinDelete}
              >
                ⌫
              </button>
            </div>
            
            {/* PIN Entry Actions */}
            <div className="space-y-4">
              <SwipeToSend
                onComplete={handlePinSubmit}
                text="Swipe to Confirm PIN"
                variant="success"
                size="large"
                disabled={pin.length !== 4}
              />
              
              <SwipeToSend
                onComplete={() => setStep('confirm')}
                text="Swipe to Go Back"
                variant="glass"
                size="medium"
              />
            </div>
          </div>
        </div>
      )}

      {/* Payment Processing Stage */}
      {step === 'processing' && (
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="text-center space-y-6">
            {/* Processing Animation with Your GIF */}
            <div className="w-40 h-40 mx-auto mb-8 flex items-center justify-center">
              <img 
                src={paymentProcessingGif} 
                alt="Processing Payment" 
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
            
            <h2 className="text-3xl font-bold text-white">Processing Payment...</h2>
            <p className="text-gray-400 text-lg">Please wait while we process your payment to {selectedContact?.name}</p>
            
            {/* Processing dots animation */}
            <div className="flex justify-center space-x-2 mt-6">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      )}

      {/* Success Step */}
      {step === 'success' && (
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="text-center space-y-6">
            {/* Success Animation */}
            <div className="w-32 h-32 mx-auto mb-8 rounded-full apple-pay-gradient flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center">
                <ApplePaySendMoneySVG className="w-12 h-12 text-white animate-pulse" />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-white drop-shadow-lg">Money Sent!</h2>
            <p className="text-white text-lg font-semibold drop-shadow-sm">₹{amount} sent to {selectedContact?.name}</p>
            
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 max-w-sm mx-auto">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Transaction ID:</span>
                  <span className="text-white font-mono">TXN{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Date & Time:</span>
                  <span className="text-white">{new Date().toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span className="text-green-400 font-medium">Completed</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 mt-8 pb-24">
              <SwipeToSend
                onComplete={() => {
                  console.log('💰 Payment confirmed, navigating to PIN entry');
                  // Store payment details in localStorage for PIN entry page
                  localStorage.setItem('pendingPayment', JSON.stringify({
                    amount,
                    recipient: selectedContact?.name || 'Unknown',
                    contact: selectedContact,
                    note
                  }));
                  setLocation('/pin-entry');
                }}
                text={`Swipe to Pay ₹${amount}`}
                variant="success"
                size="large"
              />
              
              <SwipeToSend
                onComplete={() => {
                  setStep('contacts');
                  setSelectedContact(null);
                  setAmount("");
                  setNote("");
                }}
                text="Swipe to Send Again"
                variant="glass"
                size="medium"
              />
            </div>
          </div>
        </div>
      )}

      <BottomNavigation activeTab="send" />
    </div>
  );
}