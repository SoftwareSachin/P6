import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Wallet, 
  Settings,
  Activity,
  Search,
  Bell
} from "lucide-react";

// Premium Trading SVG Components
function TradingDashboardSVG() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
      <defs>
        <linearGradient id="dashboardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00C851" />
          <stop offset="50%" stopColor="#007E33" />
          <stop offset="100%" stopColor="#004D20" />
        </linearGradient>
      </defs>
      <rect x="4" y="8" width="24" height="16" rx="4" fill="url(#dashboardGradient)" />
      <path d="M8 18 L12 14 L16 16 L20 12 L24 14" stroke="white" strokeWidth="2" fill="none" />
    </svg>
  );
}

function StocksSVG() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="stocksGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#007AFF" />
          <stop offset="100%" stopColor="#0051D5" />
        </linearGradient>
      </defs>
      <rect x="3" y="4" width="18" height="16" rx="3" fill="url(#stocksGradient)" opacity="0.9" />
      <path d="M7 16 L10 13 L13 15 L17 11" stroke="white" strokeWidth="2" fill="none" />
      <circle cx="7" cy="16" r="1.5" fill="white" />
      <circle cx="10" cy="13" r="1.5" fill="white" />
      <circle cx="13" cy="15" r="1.5" fill="white" />
      <circle cx="17" cy="11" r="1.5" fill="white" />
    </svg>
  );
}

function PortfolioSVG() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="portfolioGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#FFA500" />
        </linearGradient>
      </defs>
      <rect x="3" y="6" width="18" height="12" rx="3" fill="url(#portfolioGradient)" />
      <circle cx="8" cy="12" r="2" fill="white" opacity="0.9" />
      <circle cx="16" cy="12" r="1.5" fill="white" opacity="0.7" />
      <circle cx="12" cy="10" r="1" fill="white" opacity="0.8" />
    </svg>
  );
}

function OrdersSVG() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="ordersGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF3B30" />
          <stop offset="100%" stopColor="#D70015" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="16" height="16" rx="3" fill="url(#ordersGradient)" />
      <rect x="7" y="8" width="10" height="2" rx="1" fill="white" opacity="0.9" />
      <rect x="7" y="12" width="6" height="2" rx="1" fill="white" opacity="0.7" />
      <rect x="7" y="16" width="8" height="2" rx="1" fill="white" opacity="0.8" />
    </svg>
  );
}

function WatchlistSVG() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="watchlistGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#AF52DE" />
          <stop offset="100%" stopColor="#8E44AD" />
        </linearGradient>
      </defs>
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
            fill="url(#watchlistGradient)" />
    </svg>
  );
}

// Data Interfaces
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
  const [location, setLocation] = useLocation();

  const { data: stocks = [], isLoading: stocksLoading } = useQuery<Stock[]>({
    queryKey: ['/api/trading/stocks'],
    refetchInterval: 10000
  });

  const { data: stockPrices = [], isLoading: pricesLoading } = useQuery<StockPrice[]>({
    queryKey: ['/api/trading/stocks/prices'],
    refetchInterval: 5000
  });

  const { data: indices = [], isLoading: indicesLoading } = useQuery<MarketIndex[]>({
    queryKey: ['/api/trading/market/indices'],
    refetchInterval: 5000
  });

  const { data: portfolios = [], isLoading: portfoliosLoading } = useQuery<Portfolio[]>({
    queryKey: ['/api/trading/portfolios'],
  });

  const { data: orders = [], isLoading: ordersLoading } = useQuery<Order[]>({
    queryKey: ['/api/trading/orders'],
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

  if (stocksLoading || pricesLoading || indicesLoading || portfoliosLoading || ordersLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/70 font-medium text-lg">Loading Trading Platform...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Ultra-Premium Ambient Background */}
      <div className="fixed inset-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/10 via-blue-900/10 to-purple-900/10"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-3000"></div>
      </div>

      <div className="relative z-10 pb-20">
        {/* Ultra-Premium Header */}
        <div className="sticky top-0 bg-black/80 backdrop-blur-3xl border-b border-white/10 z-50">
          <div className="px-6 py-5">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setLocation('/')}
                className="p-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 transition-all duration-300 group"
              >
                <ArrowLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
              </button>
              
              <div className="text-center">
                <div className="flex items-center gap-3 justify-center mb-1">
                  <TradingDashboardSVG />
                  <h1 className="text-2xl font-bold text-white bg-gradient-to-r from-white via-emerald-200 to-white bg-clip-text text-transparent">
                    Trading Pro
                  </h1>
                </div>
                <p className="text-white/60 text-sm font-medium">Live Market Dashboard</p>
              </div>
              
              <div className="flex items-center gap-3">
                <button className="p-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <Bell className="w-5 h-5 text-white" />
                </button>
                <button className="p-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                  <Settings className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6">
          {/* Ultra-Premium Tab Navigation */}
          <div className="mb-8 pt-6">
            <div className="flex items-center justify-center">
              <div className="bg-white/5 backdrop-blur-3xl rounded-2xl p-2 border border-white/10">
                {[
                  { id: "dashboard", label: "Dashboard", icon: TradingDashboardSVG },
                  { id: "stocks", label: "Stocks", icon: StocksSVG },
                  { id: "portfolio", label: "Portfolio", icon: PortfolioSVG },
                  { id: "orders", label: "Orders", icon: OrdersSVG },
                  { id: "watchlist", label: "Watchlist", icon: WatchlistSVG }
                ].map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                        activeTab === tab.id
                          ? 'bg-white text-black font-semibold shadow-lg'
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <IconComponent />
                      <span className="text-sm font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              {/* Market Overview */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Market Overview</h2>
                  <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-emerald-400 text-sm font-medium">Live</span>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {indices.map((index, idx) => (
                    <div key={index.id} className="group">
                      <div className="bg-white/5 backdrop-blur-3xl rounded-3xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:bg-white/10 hover:scale-[1.01] shadow-2xl">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className={`w-16 h-16 bg-gradient-to-r ${
                              idx === 0 ? 'from-emerald-500 to-teal-500' :
                              idx === 1 ? 'from-blue-500 to-purple-500' :
                              'from-pink-500 to-rose-500'
                            } rounded-2xl flex items-center justify-center shadow-xl`}>
                              <span className="text-white font-bold text-lg">{index.symbol.slice(0, 2)}</span>
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-white">{index.name}</h3>
                              <p className="text-white/60 text-sm font-medium">{index.symbol}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-bold text-white mb-2">{formatNumber(index.currentValue)}</div>
                            <div className={`text-sm font-bold px-4 py-2 rounded-full ${
                              parseFloat(index.change) >= 0 
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                                : 'bg-red-500/20 text-red-300 border border-red-500/30'
                            }`}>
                              {parseFloat(index.change) >= 0 ? '+' : ''}{index.change} ({index.changePercent}%)
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 mt-6">
                          <div className="bg-white/5 rounded-2xl p-4 text-center">
                            <div className="text-white/60 text-sm font-medium mb-1">Open</div>
                            <div className="text-white font-bold">{formatNumber(index.open)}</div>
                          </div>
                          <div className="bg-white/5 rounded-2xl p-4 text-center">
                            <div className="text-white/60 text-sm font-medium mb-1">High</div>
                            <div className="text-emerald-400 font-bold">{formatNumber(index.high)}</div>
                          </div>
                          <div className="bg-white/5 rounded-2xl p-4 text-center">
                            <div className="text-white/60 text-sm font-medium mb-1">Low</div>
                            <div className="text-red-400 font-bold">{formatNumber(index.low)}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Portfolio Summary */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Portfolio Performance</h2>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {portfolios.map((portfolio) => (
                    <div key={portfolio.id} className="group">
                      <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-3xl rounded-3xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-[1.01] shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl">
                              <Wallet className="w-8 h-8 text-white" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-white">{portfolio.name}</h3>
                              <p className="text-white/60 text-sm font-medium">Total Investment: {formatCurrency(portfolio.totalInvestment)}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-bold text-white mb-2">{formatCurrency(portfolio.totalValue)}</div>
                            <div className={`text-sm font-bold px-4 py-2 rounded-full ${
                              parseFloat(portfolio.totalPnl) >= 0 
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                                : 'bg-red-500/20 text-red-300 border border-red-500/30'
                            }`}>
                              {parseFloat(portfolio.totalPnl) >= 0 ? '+' : ''}{formatCurrency(portfolio.totalPnl)} ({portfolio.totalPnlPercent}%)
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-4 gap-4">
                          <div className="bg-white/5 rounded-2xl p-4 text-center">
                            <div className="text-white/60 text-sm font-medium mb-1">Holdings</div>
                            <div className="text-white font-bold text-lg">15</div>
                          </div>
                          <div className="bg-white/5 rounded-2xl p-4 text-center">
                            <div className="text-white/60 text-sm font-medium mb-1">Day P&L</div>
                            <div className="text-emerald-400 font-bold text-lg">+₹3,420</div>
                          </div>
                          <div className="bg-white/5 rounded-2xl p-4 text-center">
                            <div className="text-white/60 text-sm font-medium mb-1">Returns</div>
                            <div className="text-emerald-400 font-bold text-lg">+{portfolio.totalPnlPercent}%</div>
                          </div>
                          <div className="bg-white/5 rounded-2xl p-4 text-center">
                            <div className="text-white/60 text-sm font-medium mb-1">Invested</div>
                            <div className="text-white font-bold text-lg">{formatNumber(portfolio.totalInvestment)}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Stocks */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Top Gainers</h2>
                </div>
                
                <div className="space-y-3">
                  {stocks.slice(0, 6).map((stock, idx) => {
                    const price = stockPrices.find(p => p.stockId === stock.id);
                    return (
                      <div key={stock.id} className="group">
                        <div className="bg-white/5 backdrop-blur-3xl rounded-2xl p-5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10 hover:scale-[1.01] shadow-xl">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className={`w-14 h-14 bg-gradient-to-r ${
                                idx % 5 === 0 ? 'from-blue-500 to-purple-500' :
                                idx % 5 === 1 ? 'from-emerald-500 to-teal-500' :
                                idx % 5 === 2 ? 'from-pink-500 to-rose-500' :
                                idx % 5 === 3 ? 'from-orange-500 to-red-500' :
                                'from-indigo-500 to-purple-500'
                              } rounded-xl flex items-center justify-center shadow-lg`}>
                                <span className="text-white font-bold text-sm">{stock.symbol.slice(0, 2)}</span>
                              </div>
                              <div>
                                <h3 className="text-lg font-bold text-white">{stock.symbol}</h3>
                                <p className="text-white/60 text-sm font-medium">{stock.name}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xl font-bold text-white mb-1">{formatCurrency(price?.price || '0')}</div>
                              <div className={`text-sm font-bold px-3 py-1 rounded-full ${
                                parseFloat(price?.change || '0') >= 0 
                                  ? 'bg-emerald-500/20 text-emerald-300' 
                                  : 'bg-red-500/20 text-red-300'
                              }`}>
                                {parseFloat(price?.change || '0') >= 0 ? '+' : ''}{price?.change || '0'} ({price?.changePercent || '0'}%)
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Stocks Tab */}
          {activeTab === "stocks" && (
            <div className="space-y-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search stocks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-all duration-300"
                />
              </div>
              
              <div className="space-y-3">
                {stocks.map((stock, idx) => {
                  const price = stockPrices.find(p => p.stockId === stock.id);
                  return (
                    <div key={stock.id} className="bg-white/5 backdrop-blur-3xl rounded-2xl p-5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-14 h-14 bg-gradient-to-r ${
                            idx % 4 === 0 ? 'from-blue-500 to-purple-500' :
                            idx % 4 === 1 ? 'from-emerald-500 to-teal-500' :
                            idx % 4 === 2 ? 'from-pink-500 to-rose-500' :
                            'from-orange-500 to-red-500'
                          } rounded-xl flex items-center justify-center shadow-lg`}>
                            <span className="text-white font-bold text-sm">{stock.symbol.slice(0, 2)}</span>
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-white">{stock.symbol}</h3>
                            <p className="text-white/60 text-sm">{stock.name}</p>
                            <p className="text-white/40 text-xs">{stock.sector}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-white">{formatCurrency(price?.price || '0')}</div>
                          <div className={`text-sm font-medium px-3 py-1 rounded-full ${
                            parseFloat(price?.change || '0') >= 0 
                              ? 'bg-emerald-500/20 text-emerald-300' 
                              : 'bg-red-500/20 text-red-300'
                          }`}>
                            {parseFloat(price?.change || '0') >= 0 ? '+' : ''}{price?.change || '0'} ({price?.changePercent || '0'}%)
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Portfolio Tab */}
          {activeTab === "portfolio" && (
            <div className="space-y-6">
              <div className="text-center py-12">
                <Wallet className="w-16 h-16 text-white/40 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Portfolio Coming Soon</h3>
                <p className="text-white/60">Detailed portfolio analytics will be available here</p>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className="space-y-6">
              <div className="text-center py-12">
                <BarChart3 className="w-16 h-16 text-white/40 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">No Orders Yet</h3>
                <p className="text-white/60">Your trading orders will appear here</p>
              </div>
            </div>
          )}

          {/* Watchlist Tab */}
          {activeTab === "watchlist" && (
            <div className="space-y-6">
              <div className="text-center py-12">
                <WatchlistSVG />
                <h3 className="text-xl font-bold text-white mb-2">Create Your Watchlist</h3>
                <p className="text-white/60">Add stocks to track their performance</p>
              </div>
            </div>
          )}

          {/* Ultra-Premium Trading Actions */}
          <div className="grid grid-cols-2 gap-4 mt-8 mb-8">
            <button className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white py-6 px-6 rounded-3xl font-bold text-lg transition-all duration-500 hover:scale-105 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <div className="relative flex items-center justify-center gap-3">
                <TrendingUp className="w-6 h-6" />
                Buy Stocks
              </div>
            </button>
            
            <button className="group relative overflow-hidden bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white py-6 px-6 rounded-3xl font-bold text-lg transition-all duration-500 hover:scale-105 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <div className="relative flex items-center justify-center gap-3">
                <TrendingDown className="w-6 h-6" />
                Sell Stocks
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}