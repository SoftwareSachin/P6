import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Check, 
  Clock, 
  AlertCircle, 
  MapPin, 
  Calendar, 
  CreditCard, 
  Receipt, 
  Download, 
  Share2,
  Copy,
  Shield,
  Info,
  Star,
  Building,
  Phone,
  Mail,
  ExternalLink,
  RefreshCw
} from "lucide-react";

interface TransactionDetailsProps {
  transaction: any;
  onClose: () => void;
}

export function TransactionDetails({ transaction, onClose }: TransactionDetailsProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'failed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const generateReceiptData = () => {
    const transactionId = `TXN${transaction.id}${Date.now()}`;
    const upiRef = `${transaction.id}${Date.now()}`;
    const currentDate = new Date().toLocaleString();
    
    return {
      transactionId,
      upiRef,
      merchant: transaction.merchant,
      amount: Math.abs(transaction.amount),
      status: transaction.status,
      category: transaction.category,
      location: transaction.location,
      time: transaction.time,
      date: currentDate,
      type: transaction.amount > 0 ? 'Credit' : 'Debit'
    };
  };

  const downloadReceipt = async () => {
    setIsDownloading(true);
    try {
      const receipt = generateReceiptData();
      const receiptText = `
OPPB Payment Receipt
==================

Transaction ID: ${receipt.transactionId}
UPI Reference: ${receipt.upiRef}
Date: ${receipt.date}

Merchant: ${receipt.merchant}
Category: ${receipt.category}
Location: ${receipt.location}
Type: ${receipt.type}
Amount: ₹${receipt.amount.toLocaleString()}
Status: ${receipt.status.toUpperCase()}

Thank you for using OPPB!
Generated on: ${new Date().toLocaleString()}
      `;

      const blob = new Blob([receiptText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `OPPB_Receipt_${receipt.transactionId}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      // Show success feedback
      setTimeout(() => setIsDownloading(false), 1000);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
      setIsDownloading(false);
    }
  };

  const shareReceipt = async () => {
    setIsSharing(true);
    try {
      const receipt = generateReceiptData();
      const shareText = `OPPB Payment Receipt\n\nMerchant: ${receipt.merchant}\nAmount: ₹${receipt.amount.toLocaleString()}\nStatus: ${receipt.status.toUpperCase()}\nTransaction ID: ${receipt.transactionId}\nDate: ${receipt.date}\n\nPowered by OPPB - Ultra-Premium Digital Wallet`;
      
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'OPPB Payment Receipt',
            text: shareText,
            url: window.location.href
          });
          setIsSharing(false);
        } catch (error) {
          console.log('Error sharing:', error);
          // Fallback to clipboard
          fallbackShare(shareText);
        }
      } else {
        // Fallback to clipboard
        fallbackShare(shareText);
      }
    } catch (error) {
      console.error('Share failed:', error);
      alert('Share failed. Please try again.');
      setIsSharing(false);
    }
  };

  const fallbackShare = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Receipt copied to clipboard!');
      setIsSharing(false);
    }).catch(() => {
      // Last resort - show text in a prompt
      prompt('Copy this receipt text:', text);
      setIsSharing(false);
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <Check className="h-4 w-4 text-white" />;
      case 'pending': return <Clock className="h-4 w-4 text-white" />;
      case 'failed': return <AlertCircle className="h-4 w-4 text-white" />;
      default: return <Info className="h-4 w-4 text-white" />;
    }
  };

  const IconComponent = transaction.icon;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl animate-in fade-in-0 duration-300">
      <div className="absolute inset-0 flex items-center justify-center p-4 pb-24">
        <div className="w-full max-w-md max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900/98 via-gray-800/95 to-black/98 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-2xl animate-in slide-in-from-bottom-8 duration-500">
          
          {/* Premium Header */}
          <div className="relative p-6 pb-4">
            <div className="flex items-center justify-between mb-6">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onClose}
                className="h-10 w-10 rounded-full bg-white/8 backdrop-blur-xl border border-white/15 text-white/80 hover:text-white hover:bg-white/15 transition-all duration-300 hover:scale-105"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              
              <h2 className="text-lg font-bold text-white bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                Transaction Details
              </h2>
              
              <div className="w-10 h-10"></div>
            </div>

            {/* Transaction Header Card */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 rounded-2xl blur-lg" />
              <div className="relative p-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/15">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-gray-700 flex items-center justify-center shadow-lg">
                      <IconComponent className="h-8 w-8 text-gray-300" />
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-black ${getStatusColor(transaction.status)} flex items-center justify-center`}>
                      {getStatusIcon(transaction.status)}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">{transaction.merchant}</h3>
                    <p className="text-gray-400 text-sm">{transaction.category}</p>
                    <Badge 
                      variant="secondary" 
                      className={`mt-2 ${getStatusColor(transaction.status)} text-white border-0`}
                    >
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </Badge>
                  </div>
                  
                  <div className="text-right">
                    <p className={`text-3xl font-bold ${transaction.amount > 0 ? 'text-green-400' : 'text-white'}`}>
                      {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{transaction.time}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Transaction Details */}
          <div className="px-6 pb-24 space-y-4">
            {/* Location & Date */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10">
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-gray-400">Location</span>
                </div>
                <p className="text-white font-medium">{transaction.location}</p>
              </div>
              
              <div className="p-3 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10">
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="h-4 w-4 text-purple-400" />
                  <span className="text-sm text-gray-400">Date</span>
                </div>
                <p className="text-white font-medium">{transaction.time}</p>
              </div>
            </div>

            {/* Transaction ID */}
            <div className="p-3 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-4 w-4 text-green-400" />
                  <span className="text-sm text-gray-400">Transaction ID</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigator.clipboard.writeText(`TXN${transaction.id}${Date.now()}`)}
                  className="h-8 px-2 text-blue-400 hover:text-blue-300"
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
              <p className="text-white font-mono text-sm mt-1">TXN{transaction.id}{Date.now()}</p>
            </div>

            {/* UPI Reference */}
            <div className="p-3 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-orange-400" />
                  <span className="text-sm text-gray-400">UPI Reference</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigator.clipboard.writeText(`${transaction.id}${Date.now()}`)}
                  className="h-8 px-2 text-blue-400 hover:text-blue-300"
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
              <p className="text-white font-mono text-sm mt-1">{transaction.id}{Date.now()}</p>
            </div>

            {/* Receipt & Actions */}
            {transaction.receiptAvailable && (
              <div className="p-3 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10">
                <div className="flex items-center space-x-2 mb-3">
                  <Receipt className="h-4 w-4 text-indigo-400" />
                  <span className="text-sm text-gray-400">Receipt</span>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={downloadReceipt}
                    disabled={isDownloading}
                    className="flex-1 bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30 disabled:opacity-50"
                  >
                    {isDownloading ? (
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Download className="h-4 w-4 mr-2" />
                    )}
                    {isDownloading ? 'Downloading...' : 'Download'}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={shareReceipt}
                    disabled={isSharing}
                    className="flex-1 bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30 disabled:opacity-50"
                  >
                    {isSharing ? (
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Share2 className="h-4 w-4 mr-2" />
                    )}
                    {isSharing ? 'Sharing...' : 'Share'}
                  </Button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              {transaction.status === 'pending' && (
                <Button 
                  variant="outline" 
                  className="flex-1 bg-yellow-500/10 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Check Status
                </Button>
              )}
              
              {transaction.status === 'success' && (
                <Button 
                  variant="outline" 
                  className="flex-1 bg-blue-500/10 border-blue-500/30 text-blue-400 hover:bg-blue-500/20"
                >
                  <Star className="h-4 w-4 mr-2" />
                  Rate & Review
                </Button>
              )}
              
              <Button 
                variant="outline" 
                className="flex-1 bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}