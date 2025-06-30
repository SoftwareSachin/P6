import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Check, Shield, UserCircle } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { COLORS, MOCK_CONTACTS } from "@/lib/constants";
import { Link } from "wouter";

export default function SendMoney() {
  const [step, setStep] = useState<'contacts' | 'amount' | 'confirmation'>('contacts');
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("Birthday gift 🎂");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter contacts based on search
  const filteredContacts = MOCK_CONTACTS.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone.includes(searchQuery) ||
    contact.upi.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const recentContacts = MOCK_CONTACTS.filter(contact => contact.isRecent);
  const quickAmounts = [100, 500, 1000, 2000];

  const handleContactSelect = (contact: any) => {
    setSelectedContact(contact);
    setStep('amount');
  };

  const handleNumberPad = (digit: string) => {
    if (digit === 'backspace') {
      setAmount(prev => prev.slice(0, -1));
    } else if (digit === '.') {
      if (!amount.includes('.')) {
        setAmount(prev => prev + '.');
      }
    } else {
      setAmount(prev => prev + digit);
    }
  };

  const handleAmountConfirm = () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    setStep('confirmation');
  };

  const handlePayment = () => {
    alert(`₹${amount} sent to ${selectedContact?.name} successfully!`);
    setStep('contacts');
    setAmount("");
    setSelectedContact(null);
  };

  // Contact Selection Screen
  if (step === 'contacts') {
    return (
      <div className="min-h-screen" style={{ backgroundColor: COLORS.background }}>
        {/* Header */}
        <div className="flex items-center justify-between p-4" style={{ backgroundColor: COLORS.cardWhite }}>
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold" style={{ color: COLORS.textPrimary }}>
            Send Money
          </h1>
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-4 space-y-6">
          {/* Recent Contacts - Exact Specification */}
          <div>
            <h2 className="text-sm font-medium mb-3" style={{ color: COLORS.textPrimary }}>
              Recent
            </h2>
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {recentContacts.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => handleContactSelect(contact)}
                  className="flex flex-col items-center space-y-2 min-w-[60px]"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {contact.name.charAt(0)}
                    </span>
                  </div>
                  <span className="text-xs font-medium text-center" style={{ color: COLORS.textPrimary }}>
                    {contact.name.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar - Exact Specification */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" style={{ color: COLORS.textSecondary }} />
                <Input
                  placeholder="Search by name, phone or UPI ID"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-0 bg-gray-50 focus:ring-0"
                />
              </div>
            </CardContent>
          </Card>

          {/* Contacts List - Exact Specification */}
          <div>
            <h2 className="text-sm font-medium mb-3" style={{ color: COLORS.textPrimary }}>
              Contacts
            </h2>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-0">
                {filteredContacts.map((contact, index) => (
                  <div key={contact.id}>
                    <button
                      onClick={() => handleContactSelect(contact)}
                      className="w-full p-4 flex items-center space-x-3 hover:bg-gray-50 transition-colors"
                    >
                      <Avatar className="h-12 w-12">
                        <AvatarFallback style={{ backgroundColor: COLORS.primary, color: 'white' }}>
                          {contact.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 text-left">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium" style={{ color: COLORS.textPrimary }}>
                            <div className="flex items-center space-x-2">
                              <UserCircle className="h-4 w-4" />
                              <span>{contact.name}</span>
                            </div>
                          </h3>
                          {contact.verified && (
                            <Check className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                        <p className="text-sm" style={{ color: COLORS.textSecondary }}>
                          {contact.phone}
                        </p>
                      </div>
                    </button>
                    {index < filteredContacts.length - 1 && (
                      <div className="border-b mx-4" style={{ borderColor: COLORS.border }}></div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* UPI IDs Section - Exact Specification */}
          <div>
            <h2 className="text-sm font-medium mb-3" style={{ color: COLORS.textPrimary }}>
              UPI IDs
            </h2>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-0">
                {MOCK_CONTACTS.slice(0, 2).map((contact, index) => (
                  <div key={contact.id}>
                    <button
                      onClick={() => handleContactSelect(contact)}
                      className="w-full p-4 flex items-center space-x-3 hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                        <span className="text-xl">@</span>
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="font-medium" style={{ color: COLORS.textPrimary }}>
                          @ {contact.upi}
                        </h3>
                        <p className="text-sm" style={{ color: COLORS.textSecondary }}>
                          UPI ID
                        </p>
                      </div>
                    </button>
                    {index < 1 && (
                      <div className="border-b mx-4" style={{ borderColor: COLORS.border }}></div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Amount Entry Screen - Exact Specification with Number Pad
  if (step === 'amount') {
    return (
      <div className="min-h-screen" style={{ backgroundColor: COLORS.background }}>
        {/* Header */}
        <div className="flex items-center justify-between p-4" style={{ backgroundColor: COLORS.cardWhite }}>
          <Button variant="ghost" size="icon" onClick={() => setStep('contacts')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold" style={{ color: COLORS.textPrimary }}>
            To: {selectedContact?.name}
          </h1>
          <Button variant="ghost" size="icon" onClick={() => setStep('contacts')}>
            <span className="text-xl">✖</span>
          </Button>
        </div>

        <div className="p-4 space-y-6">
          {/* Contact Card - Exact Specification */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback style={{ backgroundColor: COLORS.primary, color: 'white' }}>
                    {selectedContact?.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-xl font-bold" style={{ color: COLORS.textPrimary }}>
                    <div className="flex items-center space-x-2">
                      <UserCircle className="h-4 w-4" />
                      <span>{selectedContact?.name}</span>
                    </div>
                  </h2>
                  <p className="text-sm" style={{ color: COLORS.textSecondary }}>
                    {selectedContact?.phone}
                  </p>
                  <p className="text-sm" style={{ color: COLORS.textSecondary }}>
                    {selectedContact?.upi}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Amount Display - Exact Specification */}
          <div className="text-center py-8">
            <h2 className="text-lg font-medium mb-4" style={{ color: COLORS.textPrimary }}>
              Enter Amount
            </h2>
            <div className="text-5xl font-bold" style={{ color: COLORS.textPrimary }}>
              ₹ {amount || '0'}
            </div>
          </div>

          {/* Custom Number Pad - Exact Specification */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
                  <Button
                    key={digit}
                    variant="ghost"
                    className="h-16 text-2xl font-semibold hover:bg-gray-100"
                    onClick={() => handleNumberPad(digit.toString())}
                  >
                    {digit}
                  </Button>
                ))}
                <Button
                  variant="ghost"
                  className="h-16 text-2xl font-semibold hover:bg-gray-100"
                  onClick={() => handleNumberPad('.')}
                >
                  .
                </Button>
                <Button
                  variant="ghost"
                  className="h-16 text-2xl font-semibold hover:bg-gray-100"
                  onClick={() => handleNumberPad('0')}
                >
                  0
                </Button>
                <Button
                  variant="ghost"
                  className="h-16 text-2xl font-semibold hover:bg-gray-100"
                  onClick={() => handleNumberPad('backspace')}
                >
                  ⌫
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Amounts - Exact Specification */}
          <div className="grid grid-cols-4 gap-3">
            {quickAmounts.map((value) => (
              <Button
                key={value}
                variant="outline"
                onClick={() => setAmount(value.toString())}
                className="h-12"
              >
                ₹{value}
              </Button>
            ))}
          </div>

          {/* Note Field */}
          <div>
            <p className="text-sm font-medium mb-2" style={{ color: COLORS.textPrimary }}>
              Note: {note}
            </p>
          </div>

          {/* Proceed Button */}
          <Button 
            onClick={handleAmountConfirm}
            disabled={!amount || parseFloat(amount) <= 0}
            className="w-full h-14 text-lg font-semibold"
            style={{ backgroundColor: COLORS.primary }}
          >
            Proceed to Pay
          </Button>
        </div>
      </div>
    );
  }

  // Confirmation Screen - Exact Specification
  if (step === 'confirmation') {
    return (
      <div className="min-h-screen" style={{ backgroundColor: COLORS.background }}>
        {/* Header */}
        <div className="flex items-center justify-between p-4" style={{ backgroundColor: COLORS.cardWhite }}>
          <Button variant="ghost" size="icon" onClick={() => setStep('amount')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold" style={{ color: COLORS.textPrimary }}>
            Review Payment
          </h1>
          <Button variant="ghost" size="icon" onClick={() => setStep('contacts')}>
            <span className="text-xl">✖</span>
          </Button>
        </div>

        <div className="p-4 space-y-6">
          {/* Transaction Summary - Exact Specification */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-lg font-bold mb-4" style={{ color: COLORS.textPrimary }}>
                Transaction Summary
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span style={{ color: COLORS.textSecondary }}>From:</span>
                  <span style={{ color: COLORS.textPrimary }}>Your Account</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: COLORS.textSecondary }}>To:</span>
                  <span style={{ color: COLORS.textPrimary }}>{selectedContact?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: COLORS.textSecondary }}>UPI:</span>
                  <span style={{ color: COLORS.textPrimary }}>{selectedContact?.upi}</span>
                </div>
                <div className="border-t pt-3" style={{ borderColor: COLORS.border }}>
                  <div className="flex justify-between items-center">
                    <span style={{ color: COLORS.textSecondary }}>Amount:</span>
                    <span className="text-2xl font-bold" style={{ color: COLORS.textPrimary }}>
                      ₹{amount}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: COLORS.textSecondary }}>Note:</span>
                  <span style={{ color: COLORS.textPrimary }}>{note}</span>
                </div>
                <div className="border-t pt-3" style={{ borderColor: COLORS.border }}>
                  <div className="flex justify-between">
                    <span style={{ color: COLORS.textSecondary }}>Date:</span>
                    <span style={{ color: COLORS.textPrimary }}>
                      {new Date().toLocaleDateString('en-IN', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span style={{ color: COLORS.textSecondary }}>Time:</span>
                    <span style={{ color: COLORS.textPrimary }}>
                      {new Date().toLocaleTimeString('en-IN', { 
                        hour: 'numeric', 
                        minute: '2-digit',
                        hour12: true 
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method Selection - Exact Specification */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4" style={{ color: COLORS.textPrimary }}>
                Select Payment Method
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                  <input type="radio" name="payment" defaultChecked className="text-purple-600" />
                  <div className="flex-1">
                    <h4 className="font-medium" style={{ color: COLORS.textPrimary }}>
                      ● Bank Account (HDFC) ₹12,547
                    </h4>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg">
                  <input type="radio" name="payment" />
                  <span style={{ color: COLORS.textSecondary }}>○ UPI Lite</span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg">
                  <input type="radio" name="payment" />
                  <span style={{ color: COLORS.textSecondary }}>○ Credit Card (****1234)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Button */}
          <Button 
            onClick={handlePayment}
            className="w-full h-14 text-lg font-semibold"
            style={{ backgroundColor: COLORS.primary }}
          >
            🔒 Pay with PIN
          </Button>

          {/* Security Badge */}
          <div className="text-center">
            <p className="text-sm" style={{ color: COLORS.textSecondary }}>
              🔒 Your payment is secured by 256-bit encryption
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}