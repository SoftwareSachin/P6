import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Search, Star, Phone, Mail, Plus } from "lucide-react";
import { Link } from "wouter";
import { ApplePaySendMoneySVG, ApplePayContactlessSVG, ApplePayPhoneSVG, ApplePaySecuritySVG, ApplePayBiometricSVG } from "@/components/ApplePaySVGs";
import { BottomNavigation } from "@/components/BottomNavigation";

export default function SendMoney() {
  const [step, setStep] = useState<'contacts' | 'amount' | 'confirm' | 'success'>('contacts');
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const recentContacts = [
    {
      id: 1,
      name: "Rohit Kumar",
      phone: "+91 98765 43210",
      avatar: "/api/placeholder/40/40",
      upiId: "rohit@paytm",
      favorite: true,
      lastTransaction: "Yesterday"
    },
    {
      id: 2,
      name: "Priya Sharma",
      phone: "+91 87654 32109",
      avatar: "/api/placeholder/40/40",
      upiId: "priya@gpay",
      favorite: true,
      lastTransaction: "2 days ago"
    },
    {
      id: 3,
      name: "Amit Singh",
      phone: "+91 76543 21098",
      avatar: "/api/placeholder/40/40",
      upiId: "amit@phonepe",
      favorite: false,
      lastTransaction: "1 week ago"
    },
    {
      id: 4,
      name: "Sneha Patel",
      phone: "+91 65432 10987",
      avatar: "/api/placeholder/40/40",
      upiId: "sneha@paytm",
      favorite: false,
      lastTransaction: "2 weeks ago"
    }
  ];

  const quickAmounts = [100, 500, 1000, 2000];

  const filteredContacts = recentContacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone.includes(searchQuery)
  );

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
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 rounded-2xl bg-white/10 border-white/20 text-white placeholder-gray-400 text-lg"
            />
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <Button className="apple-pay-glass h-20 rounded-2xl flex flex-col items-center justify-center space-y-2">
              <Phone className="h-6 w-6" />
              <span className="text-sm">Phone</span>
            </Button>
            <Button className="apple-pay-glass h-20 rounded-2xl flex flex-col items-center justify-center space-y-2">
              <ApplePayContactlessSVG className="h-6 w-6" />
              <span className="text-sm">Nearby</span>
            </Button>
            <Button className="apple-pay-glass h-20 rounded-2xl flex flex-col items-center justify-center space-y-2">
              <Plus className="h-6 w-6" />
              <span className="text-sm">New</span>
            </Button>
          </div>

          {/* Favorites Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Star className="w-5 h-5 text-yellow-400 mr-2" />
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
                      {contact.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-center leading-tight">{contact.name.split(' ')[0]}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Recent Contacts */}
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
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={contact.avatar} />
                        <AvatarFallback className="bg-blue-500 text-white">
                          {contact.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold text-white">{contact.name}</h4>
                          {contact.favorite && <Star className="w-4 h-4 text-yellow-400 fill-current" />}
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
          <div className="space-y-4">
            <Button 
              onClick={handleAmountSubmit}
              disabled={!amount || parseFloat(amount) <= 0}
              className="w-full h-14 rounded-2xl apple-pay-gradient text-white font-semibold text-lg disabled:opacity-50"
            >
              Continue
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => setStep('contacts')}
              className="w-full h-12 rounded-xl apple-pay-glass border-white/20 text-white"
            >
              Change Contact
            </Button>
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
              <div className="w-16 h-16 mx-auto mb-4 rounded-full apple-pay-gradient flex items-center justify-center">
                <ApplePayBiometricSVG className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Authenticate Payment</h4>
              <p className="text-gray-400 text-sm">Use Face ID or Touch ID to confirm</p>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button 
              onClick={handlePayment}
              className="w-full h-14 rounded-2xl apple-pay-gradient text-white font-semibold text-lg"
            >
              Pay ₹{amount}
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => setStep('amount')}
              className="w-full h-12 rounded-xl apple-pay-glass border-white/20 text-white"
            >
              Edit Amount
            </Button>
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
              <Link href="/">
                <Button className="w-full h-14 rounded-2xl apple-pay-gradient text-white font-semibold text-lg">
                  Done
                </Button>
              </Link>
              
              <Button 
                variant="outline"
                onClick={() => {
                  setStep('contacts');
                  setSelectedContact(null);
                  setAmount("");
                  setNote("");
                }}
                className="w-full h-12 rounded-xl apple-pay-glass border-white/20 text-white font-bold"
              >
                Send to Another Contact
              </Button>
            </div>
          </div>
        </div>
      )}

      <BottomNavigation activeTab="send" />
    </div>
  );
}