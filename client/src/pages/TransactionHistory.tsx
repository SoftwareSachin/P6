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
import { ApplePayMerchantSVG, ApplePaySendMoneySVG, ApplePayWalletSVG, ApplePayPhoneSVG } from "@/components/ApplePaySVGs";

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

  // Enhanced mock transaction data matching dashboard
  const mockTransactions = [
    {
      id: 1,
      merchant: "Zomato",
      icon: "🛒",
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
      icon: "👤",
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
      icon: "⚡",
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
      icon: "📱",
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
      icon: "📞",
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
      icon: "🎬",
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
      icon: "👤",
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
      icon: "🛍️",
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
    <div className="min-h-screen pb-20" style={{ backgroundColor: COLORS.background }}>
      {/* Header - Exact Specification */}
      <div className="flex items-center justify-between p-4" style={{ backgroundColor: COLORS.cardWhite }}>
        <Link href="/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-lg font-semibold" style={{ color: COLORS.textPrimary }}>
          Transaction History
        </h1>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon">
            <Download className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Filter className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Search Bar */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" style={{ color: COLORS.textSecondary }} />
              <Input
                placeholder="🔍 Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-0 bg-gray-50 focus:ring-0"
              />
            </div>
          </CardContent>
        </Card>

        {/* Filter Tabs - Exact PhonePe/GPay Style */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {filterOptions.map((filter) => (
            <Button
              key={filter.id}
              variant={selectedFilter === filter.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter(filter.id)}
              className={`whitespace-nowrap ${
                selectedFilter === filter.id 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-white text-gray-600'
              }`}
            >
              {filter.name} ({filter.count})
            </Button>
          ))}
        </div>

        {/* Summary Card */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="text-center">
              <h2 className="text-sm font-medium mb-2" style={{ color: COLORS.textSecondary }}>
                {selectedFilter === "all" ? "Net Amount" : 
                 selectedFilter === "credit" ? "Total Received" :
                 selectedFilter === "debit" ? "Total Spent" : "Amount"}
              </h2>
              <div 
                className={`text-3xl font-bold ${
                  getTotalAmount() >= 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                ₹{Math.abs(getTotalAmount()).toLocaleString('en-IN')}
              </div>
              <p className="text-sm mt-1" style={{ color: COLORS.textSecondary }}>
                {filteredTransactions.length} transactions
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Transaction List - Exact Specification */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-0">
            {filteredTransactions.map((transaction, index) => (
              <div key={transaction.id}>
                <div 
                  className="flex items-center space-x-4 p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => handleTransactionClick(transaction)}
                >
                  {/* Transaction Icon */}
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-lg">{transaction.icon}</span>
                  </div>
                  
                  {/* Transaction Details */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium" style={{ color: COLORS.textPrimary }}>
                          {transaction.merchant}
                        </h3>
                        {getStatusIcon(transaction.status)}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span 
                          className={`font-semibold ${
                            transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {transaction.type === 'credit' ? '+' : '-'}₹{Math.abs(transaction.amount)}
                        </span>
                        {transaction.type === 'credit' ? (
                          <ArrowDownLeft className="h-4 w-4 text-green-500" />
                        ) : (
                          <ArrowUpRight className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm" style={{ color: COLORS.textSecondary }}>
                        {transaction.description}
                      </p>
                      <p className="text-sm" style={{ color: COLORS.textSecondary }}>
                        UPI: {transaction.upiRef}
                      </p>
                    </div>
                    
                    <p className="text-sm mt-1" style={{ color: COLORS.textSecondary }}>
                      {transaction.time}
                    </p>
                  </div>
                </div>
                {index < filteredTransactions.length - 1 && (
                  <div className="border-b mx-4" style={{ borderColor: COLORS.border }}></div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Empty State */}
        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <BarChart3 className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-2" style={{ color: COLORS.textPrimary }}>
              No transactions found
            </h3>
            <p className="text-sm" style={{ color: COLORS.textSecondary }}>
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* Load More Button */}
        {filteredTransactions.length > 0 && (
          <div className="text-center pt-4">
            <Button variant="outline" className="w-full">
              Load More Transactions
            </Button>
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