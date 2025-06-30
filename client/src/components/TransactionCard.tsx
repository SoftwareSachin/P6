import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Store, User, Smartphone, Circle } from "lucide-react";
import type { Transaction } from "@shared/schema";

interface TransactionCardProps {
  transaction: Transaction;
  detailed?: boolean;
}

export function TransactionCard({ transaction, detailed = false }: TransactionCardProps) {
  const formatAmount = (amount: string, type: string) => {
    const num = parseFloat(amount);
    const formattedAmount = `₹${num.toLocaleString('en-IN')}`;
    return type === 'credit' ? `+${formattedAmount}` : `-${formattedAmount}`;
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getTransactionIcon = () => {
    switch (transaction.category) {
      case 'offline_payment':
        return <Store className="w-5 h-5 text-success" />;
      case 'recharge':
        return <Smartphone className="w-5 h-5 text-warning" />;
      default:
        return <User className="w-5 h-5 text-accent" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-success';
      case 'pending':
        return 'text-warning';
      case 'failed':
        return 'text-destructive';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return transaction.type === 'credit' ? 'Received' : 'Success';
      case 'pending':
        return 'Pending';
      case 'failed':
        return 'Failed';
      default:
        return status;
    }
  };

  return (
    <Card className="transaction-item">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {transaction.merchantImage ? (
              <img 
                src={transaction.merchantImage}
                alt={transaction.merchantName}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                {getTransactionIcon()}
              </div>
            )}
            <div>
              <p className="font-medium text-gray-800">{transaction.merchantName}</p>
              <p className="text-sm text-gray-500">
                {transaction.isOffline ? 'Offline Payment' : 
                 transaction.category === 'recharge' ? transaction.category.charAt(0).toUpperCase() + transaction.category.slice(1) :
                 'Online Payment'} • {formatTime(transaction.createdAt!)}
              </p>
              {detailed && transaction.note && (
                <p className="text-xs text-gray-400">For: {transaction.note}</p>
              )}
              {detailed && (
                <p className="text-xs text-gray-400">Transaction ID: {transaction.transactionId}</p>
              )}
            </div>
          </div>
          <div className="text-right">
            <p className={`font-semibold ${
              transaction.type === 'credit' ? 'text-success' : 'text-red-600'
            }`}>
              {formatAmount(transaction.amount, transaction.type)}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <Circle className={`w-2 h-2 fill-current ${getStatusColor(transaction.status)}`} />
              <span className={`text-xs ${getStatusColor(transaction.status)}`}>
                {getStatusText(transaction.status)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
