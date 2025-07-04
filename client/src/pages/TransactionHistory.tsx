import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Filter, Download, ArrowUpRight, ArrowDownLeft, Clock, Check, AlertCircle, WifiOff, BarChart3 } from "lucide-react";

import { BottomNavigation } from "@/components/BottomNavigation";
import { COLORS } from "@/lib/constants";
import { Link } from "wouter";
import { TransactionDetails } from "@/components/TransactionDetails";
import { ApplePayMerchantSVG, ApplePaySendMoneySVG, ApplePayWalletSVG, ApplePayPhoneSVG, ApplePayTelecomSVG, ApplePayEntertainmentSVG, ApplePayPersonSVG, ApplePayShoppingSVG, ApplePayBankSVG } from "@/components/ApplePaySVGs";

export default function TransactionHistory() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [showTransactionDetails, setShowTransactionDetails] = useState(false);

  // Get transactions from API
  const { data: transactions = [] } = useQuery({
    queryKey: ['/api/transactions']
  }) as { data: any[] };

  const handleTransactionClick = (transaction: any) => {
    setSelectedTransaction(transaction);
    setShowTransactionDetails(true);
  };

  const handleCloseTransactionDetails = () => {
    setShowTransactionDetails(false);
    setSelectedTransaction(null);
  };

  const getTransactionIcon = (icon: any) => {
    if (typeof icon === 'string') {
      // If it's a string (emoji), render it as text
      return <span className="text-2xl">{icon}</span>;
    } else {
      // If it's a React component, render it
      const IconComponent = icon;
      return <IconComponent className="h-7 w-7 text-white/80" />;
    }
  };

  // Ultra-premium transaction data with high-end Apple Pay SVG icons
  const mockTransactions = [
    {
      id: 1,
      merchant: "Zomato",
      icon: ApplePayMerchantSVG,
      amount: -285,
      status: "success",
      time: "Today, 2:30 PM",
      type: "debit",
      category: "Food & Dining",
      location: "Connaught Place, Delhi",
      upiRef: "424242424242",
      description: "Food order",
      receiptAvailable: true
    },
    {
      id: 2,
      merchant: "Rohit Kumar",
      icon: ApplePaySendMoneySVG,
      amount: 500,
      status: "success",
      time: "Yesterday, 6:15 PM",
      type: "credit",
      category: "Transfer",
      location: "UPI Transfer",
      upiRef: "424242424243",
      description: "Money received",
      receiptAvailable: false
    },
    {
      id: 3,
      merchant: "BSES Delhi",
      icon: ApplePayWalletSVG,
      amount: -1200,
      status: "pending",
      time: "Oct 28, 11:30 AM",
      type: "debit",
      category: "Utilities",
      location: "Online Payment",
      upiRef: "424242424244",
      description: "Electricity bill",
      receiptAvailable: true
    },
    {
      id: 4,
      merchant: "Airtel Prepaid",
      icon: ApplePayPhoneSVG,
      amount: -199,
      status: "success",
      time: "Oct 27, 3:45 PM",
      type: "debit",
      category: "Telecom",
      location: "Mobile Recharge",
      upiRef: "424242424245",
      description: "Mobile recharge",
      receiptAvailable: true
    },
    {
      id: 5,
      merchant: "Airtel Recharge",
      icon: ApplePayTelecomSVG,
      amount: -199,
      status: "completed",
      time: "Oct 26, 10:15 AM",
      type: "debit",
      category: "recharge",
      upiRef: "424242424246",
      description: "Mobile recharge"
    },
    {
      id: 6,
      merchant: "Netflix",
      icon: ApplePayEntertainmentSVG,
      amount: -699,
      status: "completed",
      time: "Oct 25, 3:45 PM",
      type: "debit",
      category: "entertainment",
      upiRef: "424242424247",
      description: "Netflix subscription"
    },
    {
      id: 7,
      merchant: "Priya Sharma",
      icon: ApplePayPersonSVG,
      amount: 1000,
      status: "completed",
      time: "Oct 24, 12:30 PM",
      type: "credit",
      category: "transfer",
      upiRef: "424242424248",
      description: "Money received"
    },
    {
      id: 8,
      merchant: "Amazon Pay",
      icon: ApplePayShoppingSVG,
      amount: -1599,
      status: "completed",
      time: "Oct 23, 9:20 AM",
      type: "debit",
      category: "shopping",
      upiRef: "424242424249",
      description: "Online shopping"
    }
  ];

  const allTransactions = [...(Array.isArray(transactions) ? transactions : []), ...mockTransactions];

  const filterOptions = [
    { id: "all", name: "All", count: allTransactions.length },
    { id: "credit", name: "Money In", count: allTransactions.filter(t => t.type === 'credit').length },
    { id: "debit", name: "Money Out", count: allTransactions.filter(t => t.type === 'debit').length },
    { id: "pending", name: "Pending", count: allTransactions.filter(t => t.status === 'pending').length },
    { id: "offline", name: "Offline", count: allTransactions.filter(t => t.status === 'offline').length }
  ];

  const filteredTransactions = allTransactions.filter(transaction => {
    const matchesFilter = selectedFilter === "all" || 
                         transaction.type === selectedFilter || 
                         transaction.status === selectedFilter;
    
    const matchesSearch = searchQuery === "" ||
                         transaction.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <Check className="h-4 w-4 text-green-500" />;
      case "pending":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "offline":
        return <WifiOff className="h-4 w-4 text-orange-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTotalAmount = () => {
    return filteredTransactions.reduce((total, transaction) => {
      return total + transaction.amount;
    }, 0);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden pb-20">
      {/* Ultra-Premium Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-indigo-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-to-r from-indigo-500/5 via-blue-500/5 to-indigo-500/5 rounded-full blur-2xl animate-pulse delay-2000" />
      </div>

      {/* Ultra-Premium Header */}
      <div className="relative z-10 px-6 pt-12 pb-6">
        <div className="flex items-center justify-between p-4 backdrop-blur-2xl bg-white/8 rounded-2xl border border-white/15 shadow-xl">
          <Link href="/dashboard">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded-full blur-md" />
              <Button variant="ghost" size="icon" className="relative h-12 w-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <ArrowLeft className="h-6 w-6 text-white" />
              </Button>
            </div>
          </Link>
          
          <div className="text-center">
            <h1 className="text-xl font-bold text-white bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent" style={{ fontFamily: 'SF Pro Display, system-ui' }}>
              Transaction History
            </h1>
            <p className="text-white/60 text-xs font-medium mt-1">Your payment activity</p>
          </div>
          
          <div className="flex space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/15 to-emerald-500/15 rounded-full blur-md" />
              <Button variant="ghost" size="icon" className="relative h-12 w-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <Download className="h-5 w-5 text-white" />
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-md" />
              <Button variant="ghost" size="icon" className="relative h-12 w-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <Filter className="h-5 w-5 text-white" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 px-6 space-y-6">
        {/* Ultra-Premium Search Bar */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 via-gray-400/10 to-gray-500/10 rounded-2xl blur-lg" />
          <div className="relative p-4 backdrop-blur-2xl bg-white/8 rounded-2xl border border-white/15 shadow-xl">
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <Search className="h-5 w-5 text-white/60" />
              </div>
              <Input
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 bg-white/10 border-white/20 rounded-xl text-white placeholder:text-white/50 focus:bg-white/15 focus:border-white/30 transition-all duration-300"
                style={{ fontFamily: 'SF Pro Text, system-ui' }}
              />
            </div>
          </div>
        </div>

        {/* Ultra-Premium Filter Tabs */}
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {filterOptions.map((filter) => (
            <div key={filter.id} className="relative">
              <div className={`absolute inset-0 ${
                selectedFilter === filter.id 
                  ? 'bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20' 
                  : 'bg-gradient-to-r from-gray-500/10 via-gray-400/10 to-gray-500/10'
              } rounded-xl blur-lg transition-all duration-300`} />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedFilter(filter.id)}
                className={`relative whitespace-nowrap px-6 py-3 rounded-xl backdrop-blur-xl border transition-all duration-300 hover:scale-105 ${
                  selectedFilter === filter.id 
                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-white/30 text-white shadow-lg' 
                    : 'bg-white/8 border-white/15 text-white/80 hover:bg-white/15 hover:text-white'
                }`}
                style={{ fontFamily: 'SF Pro Text, system-ui' }}
              >
                {filter.name} ({filter.count})
              </Button>
            </div>
          ))}
        </div>

        {/* Ultra-Premium Summary Card */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-green-500/10 rounded-2xl blur-lg" />
          <div className="relative p-6 backdrop-blur-2xl bg-white/8 rounded-2xl border border-white/15 shadow-xl">
            <div className="text-center">
              <h2 className="text-sm font-medium mb-3 text-white/70" style={{ fontFamily: 'SF Pro Text, system-ui' }}>
                {selectedFilter === "all" ? "Net Amount" : 
                 selectedFilter === "credit" ? "Total Received" :
                 selectedFilter === "debit" ? "Total Spent" : "Amount"}
              </h2>
              <div 
                className={`text-4xl font-bold mb-2 bg-gradient-to-r ${
                  getTotalAmount() >= 0 
                    ? 'from-green-400 via-emerald-400 to-green-400' 
                    : 'from-red-400 via-pink-400 to-red-400'
                } bg-clip-text text-transparent`}
                style={{ fontFamily: 'SF Pro Display, system-ui' }}
              >
                ₹{Math.abs(getTotalAmount()).toLocaleString('en-IN')}
              </div>
              <p className="text-sm text-white/60" style={{ fontFamily: 'SF Pro Text, system-ui' }}>
                {filteredTransactions.length} transactions
              </p>
            </div>
          </div>
        </div>

        {/* Ultra-Premium Transaction List */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-500/5 via-gray-400/5 to-gray-500/5 rounded-2xl blur-lg" />
          <div className="relative backdrop-blur-2xl bg-white/8 rounded-2xl border border-white/15 shadow-xl overflow-hidden">
            {filteredTransactions.map((transaction, index) => (
              <div key={transaction.id}>
                <div 
                  className="flex items-center space-x-4 p-5 hover:bg-white/10 transition-all duration-300 cursor-pointer group border-b border-white/5 last:border-b-0"
                  onClick={() => handleTransactionClick(transaction)}
                >
                  {/* Ultra-Premium Transaction Icon */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 rounded-2xl blur-lg" />
                    <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-white/20 via-white/25 to-white/20 backdrop-blur-xl border border-white/20 shadow-lg flex items-center justify-center">
                      {getTransactionIcon(transaction.icon)}
                    </div>
                  </div>
                  
                  {/* Ultra-Premium Transaction Details */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-semibold text-white group-hover:text-white/90 transition-colors" style={{ fontFamily: 'SF Pro Text, system-ui' }}>
                          {transaction.merchant}
                        </h3>
                        <div className={`flex items-center justify-center w-6 h-6 rounded-full ${
                          transaction.status === 'success' ? 'bg-green-500/20 border border-green-400/30' : 
                          transaction.status === 'pending' ? 'bg-yellow-500/20 border border-yellow-400/30' : 
                          'bg-red-500/20 border border-red-400/30'
                        }`}>
                          {getStatusIcon(transaction.status)}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span 
                          className={`font-bold text-lg ${
                            transaction.type === 'credit' 
                              ? 'text-green-400' 
                              : 'text-white'
                          }`}
                          style={{ fontFamily: 'SF Pro Display, system-ui' }}
                        >
                          {transaction.type === 'credit' ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
                        </span>
                        <div className={`p-1 rounded-full ${
                          transaction.type === 'credit' ? 'bg-green-500/20' : 'bg-gray-500/20'
                        }`}>
                          {transaction.type === 'credit' ? (
                            <ArrowDownLeft className="h-4 w-4 text-green-400" />
                          ) : (
                            <ArrowUpRight className="h-4 w-4 text-white/70" />
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-sm text-white/60" style={{ fontFamily: 'SF Pro Text, system-ui' }}>
                        {transaction.category}
                      </p>
                      <p className="text-xs text-white/50 font-mono">
                        {transaction.upiRef}
                      </p>
                    </div>
                    
                    <p className="text-sm mt-1 text-white/70" style={{ fontFamily: 'SF Pro Text, system-ui' }}>
                      {transaction.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ultra-Premium Empty State */}
        {filteredTransactions.length === 0 && (
          <div className="text-center py-16">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 via-gray-400/10 to-gray-500/10 rounded-2xl blur-lg" />
              <div className="relative w-24 h-24 mx-auto mb-6 rounded-2xl bg-white/8 backdrop-blur-xl border border-white/15 flex items-center justify-center">
                <BarChart3 className="h-12 w-12 text-white/60" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3 text-white" style={{ fontFamily: 'SF Pro Display, system-ui' }}>
              No transactions found
            </h3>
            <p className="text-white/60" style={{ fontFamily: 'SF Pro Text, system-ui' }}>
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* Ultra-Premium Load More Button */}
        {filteredTransactions.length > 0 && (
          <div className="text-center pt-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 rounded-2xl blur-lg" />
              <Button 
                variant="outline" 
                className="relative w-full py-4 bg-white/8 backdrop-blur-xl border border-white/15 text-white hover:bg-white/15 hover:border-white/30 transition-all duration-300 hover:scale-105"
                style={{ fontFamily: 'SF Pro Text, system-ui' }}
              >
                Load More Transactions
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Transaction Details Modal */}
      {showTransactionDetails && selectedTransaction && (
        <TransactionDetails 
          transaction={selectedTransaction} 
          onClose={handleCloseTransactionDetails} 
        />
      )}

      <BottomNavigation activeTab="reports" />
    </div>
  );
}