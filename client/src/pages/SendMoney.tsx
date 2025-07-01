import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Search, Phone, Mail, Plus } from "lucide-react";
import { Link } from "wouter";
import { ApplePaySendMoneySVG, ApplePayContactlessSVG, ApplePayPhoneSVG, ApplePaySecuritySVG, ApplePayBiometricSVG } from "@/components/ApplePaySVGs";
import { PremiumFavoritesSVG, PremiumStarSVG } from "@/components/PremiumSVGs";
import { BottomNavigation } from "@/components/BottomNavigation";
import { SwipeToSend } from "@/components/SwipeToSend";
import authGif from "@assets/fetchpik.com-iconscout-QcuPAs3flx_1751393184609.gif";

export default function SendMoney() {
  const [step, setStep] = useState<'contacts' | 'amount' | 'confirm' | 'success'>('contacts');
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

  // Search functionality with UPI ID detection
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    // Check if it's a UPI ID format (contains @ symbol)
    if (query.includes('@')) {
      setIsUpiSearch(true);
      // Search for UPI ID in all contacts
      const upiResults = allContacts.filter(contact => 
        contact.upiId.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(upiResults);
    } else {
      setIsUpiSearch(false);
      // Regular name/phone search
      if (query.length > 0) {
        const results = allContacts.filter(contact => 
          contact.name.toLowerCase().includes(query.toLowerCase()) ||
          contact.phone.includes(query) ||
          contact.upiId.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    }
  };

  const filteredContacts = searchQuery.length > 0 ? searchResults : recentContacts;

  const handleContactSelect = (contact: any) => {
    setSelectedContact(contact);
    setStep('amount');
  };

  const handleAmountSubmit = () => {
    if (amount && parseFloat(amount) > 0) {
      setStep('confirm');
    }
  };

  const handlePayment = () => {
    setStep('success');
  };

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
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search contacts or enter UPI ID"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-12 h-14 rounded-2xl bg-white/10 border-white/20 text-white placeholder-gray-400 text-lg focus:bg-white/20 focus:border-blue-400 transition-all duration-300"
            />
            
            {/* Search Suggestions - Apple Style */}
            {searchQuery.length > 0 && isUpiSearch && (
              <div className="absolute top-full left-0 right-0 z-50 mt-2 bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden">
                <div className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <Mail className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">UPI ID Search</p>
                      <p className="text-gray-400 text-xs">Enter complete UPI ID (e.g., name@bank)</p>
                    </div>
                  </div>
                  {searchQuery.includes('@') && !searchResults.length && (
                    <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-3">
                      <p className="text-orange-400 text-sm">No matching UPI ID found</p>
                      <p className="text-gray-400 text-xs">Check spelling or try a different UPI ID</p>
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
                onComplete={() => window.location.href = '/'}
                text="Swipe to Complete"
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