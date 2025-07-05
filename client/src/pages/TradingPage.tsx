import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Eye, 
  Plus,
  BarChart3,
  Briefcase,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  IndianRupee,
  Activity,
  Target,
  Zap
} from "lucide-react";

// Trading SVG Icons
function TradingDashboardSVG() {
  return (
    <div className="w-8 h-8 relative">
      <svg viewBox="0 0 32 32" className="w-full h-full">
        <defs>
          <linearGradient id="tradingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00C851" />
            <stop offset="50%" stopColor="#007E33" />
            <stop offset="100%" stopColor="#004D20" />
          </linearGradient>
          <filter id="tradingGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <rect x="2" y="8" width="28" height="20" rx="3" fill="url(#tradingGrad)" filter="url(#tradingGlow)" opacity="0.9"/>
        <rect x="4" y="10" width="24" height="16" rx="2" fill="#FFFFFF" opacity="0.15"/>
        
        {/* Chart lines */}
        <path d="M6 20 L10 16 L14 18 L18 12 L22 14 L26 10" stroke="#FFFFFF" strokeWidth="2" fill="none" opacity="0.9"/>
        <circle cx="6" cy="20" r="2" fill="#FFFFFF"/>
        <circle cx="10" cy="16" r="2" fill="#FFFFFF"/>
        <circle cx="14" cy="18" r="2" fill="#FFFFFF"/>
        <circle cx="18" cy="12" r="2" fill="#FFFFFF"/>
        <circle cx="22" cy="14" r="2" fill="#FFFFFF"/>
        <circle cx="26" cy="10" r="2" fill="#FFFFFF"/>
        
        {/* Arrow indicator */}
        <polygon points="24,4 28,8 24,12" fill="#00C851" opacity="0.8"/>
        <rect x="20" y="6" width="4" height="4" fill="#00C851" opacity="0.6"/>
      </svg>
    </div>
  );
}

function StocksSVG() {
  return (
    <div className="w-6 h-6 relative">
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <defs>
          <linearGradient id="stocksGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="20" height="20" rx="4" fill="url(#stocksGrad)" opacity="0.1"/>
        <path d="M3 12 L7 8 L11 12 L15 6 L21 10" stroke="url(#stocksGrad)" strokeWidth="2" fill="none"/>
        <circle cx="7" cy="8" r="2" fill="#2563EB"/>
        <circle cx="15" cy="6" r="2" fill="#2563EB"/>
      </svg>
    </div>
  );
}

function PortfolioSVG() {
  return (
    <div className="w-6 h-6 relative">
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <defs>
          <linearGradient id="portfolioGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#5B21B6" />
          </linearGradient>
        </defs>
        <rect x="3" y="4" width="18" height="16" rx="3" stroke="url(#portfolioGrad)" strokeWidth="2" fill="none"/>
        <rect x="6" y="8" width="4" height="8" fill="url(#portfolioGrad)" opacity="0.7"/>
        <rect x="11" y="6" width="4" height="10" fill="url(#portfolioGrad)" opacity="0.8"/>
        <rect x="16" y="10" width="4" height="6" fill="url(#portfolioGrad)" opacity="0.6"/>
      </svg>
    </div>
  );
}

function OrdersSVG() {
  return (
    <div className="w-6 h-6 relative">
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <defs>
          <linearGradient id="ordersGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>
        <rect x="4" y="6" width="16" height="12" rx="2" stroke="url(#ordersGrad)" strokeWidth="2" fill="none"/>
        <line x1="8" y1="10" x2="16" y2="10" stroke="url(#ordersGrad)" strokeWidth="1.5"/>
        <line x1="8" y1="14" x2="14" y2="14" stroke="url(#ordersGrad)" strokeWidth="1.5"/>
        <circle cx="6" cy="2" r="2" fill="url(#ordersGrad)"/>
      </svg>
    </div>
  );
}

function WatchlistSVG() {
  return (
    <div className="w-6 h-6 relative">
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <defs>
          <linearGradient id="watchlistGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#991B1B" />
          </linearGradient>
        </defs>
        <circle cx="12" cy="12" r="9" stroke="url(#watchlistGrad)" strokeWidth="2" fill="none"/>
        <circle cx="12" cy="12" r="3" fill="url(#watchlistGrad)"/>
        <line x1="12" y1="6" x2="12" y2="10" stroke="url(#watchlistGrad)" strokeWidth="2"/>
        <line x1="18" y1="12" x2="14" y2="12" stroke="url(#watchlistGrad)" strokeWidth="2"/>
      </svg>
    </div>
  );
}

interface Stock {
  id: number;
  symbol: string;
  name: string;
  exchange: string;
  sector: string;
  industry: string;
  marketCap: string;
  peRatio: string;
  isActive: boolean;
}

interface StockPrice {
  id: number;
  stockId: number;
  price: string;
  open: string;
  high: string;
  low: string;
  volume: string;
  change: string;
  changePercent: string;
  marketStatus: string;
}

interface MarketIndex {
  id: number;
  name: string;
  symbol: string;
  currentValue: string;
  change: string;
  changePercent: string;
  open: string;
  high: string;
  low: string;
}

interface Portfolio {
  id: number;
  name: string;
  totalValue: string;
  totalInvestment: string;
  totalPnl: string;
  totalPnlPercent: string;
}

interface Order {
  id: number;
  orderId: string;
  type: string;
  orderType: string;
  quantity: string;
  price: string;
  status: string;
  totalAmount: string;
  createdAt: string;
}

export default function TradingPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const queryClient = useQueryClient();

  // Fetch market indices
  const { data: indices = [] } = useQuery<MarketIndex[]>({
    queryKey: ["/api/trading/market/indices"],
    refetchInterval: 5000 // Refresh every 5 seconds
  });

  // Fetch stocks
  const { data: stocks = [] } = useQuery<Stock[]>({
    queryKey: ["/api/trading/stocks", { search: searchQuery }],
    refetchInterval: 10000
  });

  // Fetch portfolios
  const { data: portfolios = [] } = useQuery<Portfolio[]>({
    queryKey: ["/api/trading/portfolios"]
  });

  // Fetch orders
  const { data: orders = [] } = useQuery<Order[]>({
    queryKey: ["/api/trading/orders"]
  });

  // Fetch watchlists
  const { data: watchlists = [] } = useQuery({
    queryKey: ["/api/trading/watchlists"]
  });

  const formatCurrency = (amount: string | number) => {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(num);
  };

  const formatNumber = (num: string | number) => {
    const value = typeof num === 'string' ? parseFloat(num) : num;
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)}Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(2)}L`;
    if (value >= 1000) return `₹${(value / 1000).toFixed(2)}K`;
    return `₹${value.toFixed(2)}`;
  };

  const getChangeColor = (change: string) => {
    const changeNum = parseFloat(change);
    return changeNum >= 0 ? "text-green-600" : "text-red-600";
  };

  const getChangeIcon = (change: string) => {
    const changeNum = parseFloat(change);
    return changeNum >= 0 ? ArrowUpRight : ArrowDownRight;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <TradingDashboardSVG />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Trading Dashboard
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Professional stock trading platform
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 px-3 py-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Activity className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800 dark:text-green-300">
                  Market Open
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Market Indices Banner */}
      <div className="px-6 py-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur border-b border-slate-200/30 dark:border-slate-700/30">
        <div className="flex space-x-6 overflow-x-auto">
          {indices.map((index) => {
            const ChangeIcon = getChangeIcon(index.change);
            return (
              <div key={index.id} className="flex items-center space-x-2 min-w-fit">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {index.name}
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {formatNumber(index.currentValue)}
                </span>
                <div className={`flex items-center space-x-1 ${getChangeColor(index.change)}`}>
                  <ChangeIcon className="w-3 h-3" />
                  <span className="text-xs font-medium">
                    {index.change} ({index.changePercent}%)
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="stocks" className="flex items-center space-x-2">
              <StocksSVG />
              <span>Stocks</span>
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="flex items-center space-x-2">
              <PortfolioSVG />
              <span>Portfolio</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center space-x-2">
              <OrdersSVG />
              <span>Orders</span>
            </TabsTrigger>
            <TabsTrigger value="watchlist" className="flex items-center space-x-2">
              <WatchlistSVG />
              <span>Watchlist</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm">Available Balance</p>
                      <p className="text-2xl font-bold">{formatCurrency(75000)}</p>
                    </div>
                    <IndianRupee className="w-8 h-8 text-blue-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm">Total P&L</p>
                      <p className="text-2xl font-bold">+{formatCurrency(5000)}</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm">Invested Value</p>
                      <p className="text-2xl font-bold">{formatCurrency(45000)}</p>
                    </div>
                    <Briefcase className="w-8 h-8 text-purple-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-sm">Day P&L</p>
                      <p className="text-2xl font-bold">+{formatCurrency(1200)}</p>
                    </div>
                    <Zap className="w-8 h-8 text-orange-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top Gainers/Losers */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-green-600">
                    <TrendingUp className="w-5 h-5" />
                    <span>Top Gainers</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {stocks.slice(0, 5).map((stock, index) => (
                      <div key={stock.id} className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">{stock.symbol}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{stock.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-slate-900 dark:text-white">{formatCurrency(2500 + index * 100)}</p>
                          <p className="text-sm text-green-600">+{(2 + index * 0.5).toFixed(2)}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-red-600">
                    <TrendingDown className="w-5 h-5" />
                    <span>Top Losers</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {stocks.slice(5, 10).map((stock, index) => (
                      <div key={stock.id} className="flex items-center justify-between p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">{stock.symbol}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{stock.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-slate-900 dark:text-white">{formatCurrency(1800 + index * 120)}</p>
                          <p className="text-sm text-red-600">-{(1.2 + index * 0.3).toFixed(2)}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Stocks Tab */}
          <TabsContent value="stocks" className="space-y-6 mt-6">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search stocks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50"
                />
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add to Watchlist
              </Button>
            </div>

            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50">
              <CardHeader>
                <CardTitle>All Stocks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stocks.map((stock) => (
                    <div key={stock.id} className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                          {stock.symbol.substring(0, 2)}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">{stock.symbol}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{stock.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-500">{stock.sector} • {stock.exchange}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-slate-900 dark:text-white">{formatCurrency(2500)}</p>
                        <p className="text-sm text-green-600">+2.5%</p>
                        <Badge variant="outline" className="text-xs mt-1">
                          {formatNumber(stock.marketCap)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50">
                <CardHeader>
                  <CardTitle>Your Holdings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {portfolios.map((portfolio) => (
                      <div key={portfolio.id} className="p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-medium text-slate-900 dark:text-white">{portfolio.name}</h3>
                          <Badge variant={parseFloat(portfolio.totalPnl) >= 0 ? "default" : "destructive"}>
                            {portfolio.totalPnlPercent}%
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-slate-600 dark:text-slate-400">Invested</p>
                            <p className="font-medium text-slate-900 dark:text-white">{formatCurrency(portfolio.totalInvestment)}</p>
                          </div>
                          <div>
                            <p className="text-slate-600 dark:text-slate-400">Current</p>
                            <p className="font-medium text-slate-900 dark:text-white">{formatCurrency(portfolio.totalValue)}</p>
                          </div>
                          <div>
                            <p className="text-slate-600 dark:text-slate-400">P&L</p>
                            <p className={`font-medium ${getChangeColor(portfolio.totalPnl)}`}>
                              {formatCurrency(portfolio.totalPnl)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Buy Stocks
                  </Button>
                  <Button variant="outline" className="w-full">
                    <TrendingDown className="w-4 h-4 mr-2" />
                    Sell Holdings
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Target className="w-4 h-4 mr-2" />
                    Set Price Alert
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6 mt-6">
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50">
              <CardHeader>
                <CardTitle>Order Book</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {orders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">{order.orderId}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {order.type} • {order.orderType} • Qty: {order.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-slate-900 dark:text-white">{formatCurrency(order.totalAmount)}</p>
                        <Badge 
                          variant={order.status === 'executed' ? 'default' : order.status === 'pending' ? 'secondary' : 'destructive'}
                        >
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Watchlist Tab */}
          <TabsContent value="watchlist" className="space-y-6 mt-6">
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>My Watchlist</span>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Stock
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stocks.slice(0, 8).map((stock) => (
                    <div key={stock.id} className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">{stock.symbol}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{stock.name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-slate-900 dark:text-white">{formatCurrency(2500)}</p>
                        <p className="text-sm text-green-600">+2.5%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}