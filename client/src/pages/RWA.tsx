import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
// Premium Progress Component
const Progress = ({ value, className }: { value: number; className?: string }) => (
  <div className={`w-full bg-white/10 rounded-full h-2 ${className}`}>
    <div 
      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
      style={{ width: `${value}%` }}
    />
  </div>
);
import { ArrowLeft, TrendingUp, TrendingDown, Building, Car, Coins, Palette, FileText, Eye, ShoppingCart, BarChart3, Wallet, Target, Activity, DollarSign, PieChart, Star, Zap, Shield, Globe, AlertTriangle, Clock, CheckCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useLocation } from 'wouter';

// Premium SVG Icons for RWA
const RealEstateSVG = () => (
  <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
    <defs>
      <linearGradient id="realEstateGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="50%" stopColor="#1E40AF" />
        <stop offset="100%" stopColor="#1E3A8A" />
      </linearGradient>
      <filter id="realEstateGlow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <rect x="8" y="20" width="48" height="36" rx="4" fill="url(#realEstateGradient)" filter="url(#realEstateGlow)"/>
    <rect x="12" y="16" width="40" height="4" rx="2" fill="#60A5FA"/>
    <rect x="16" y="28" width="8" height="8" rx="1" fill="rgba(255,255,255,0.3)"/>
    <rect x="28" y="28" width="8" height="8" rx="1" fill="rgba(255,255,255,0.3)"/>
    <rect x="40" y="28" width="8" height="8" rx="1" fill="rgba(255,255,255,0.3)"/>
    <rect x="24" y="44" width="16" height="12" rx="2" fill="rgba(255,255,255,0.2)"/>
    <circle cx="32" cy="12" r="3" fill="#FBBF24"/>
  </svg>
);

const VehicleSVG = () => (
  <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
    <defs>
      <linearGradient id="vehicleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#DC2626" />
        <stop offset="50%" stopColor="#B91C1C" />
        <stop offset="100%" stopColor="#991B1B" />
      </linearGradient>
      <filter id="vehicleGlow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <ellipse cx="32" cy="48" rx="28" ry="8" fill="rgba(0,0,0,0.1)"/>
    <path d="M12 32 L52 32 L48 24 L16 24 Z" fill="url(#vehicleGradient)" filter="url(#vehicleGlow)"/>
    <rect x="8" y="32" width="48" height="12" rx="6" fill="url(#vehicleGradient)"/>
    <circle cx="18" cy="44" r="6" fill="#374151"/>
    <circle cx="46" cy="44" r="6" fill="#374151"/>
    <circle cx="18" cy="44" r="3" fill="#9CA3AF"/>
    <circle cx="46" cy="44" r="3" fill="#9CA3AF"/>
    <rect x="20" y="28" width="6" height="4" rx="1" fill="rgba(255,255,255,0.3)"/>
    <rect x="28" y="28" width="6" height="4" rx="1" fill="rgba(255,255,255,0.3)"/>
    <rect x="36" y="28" width="6" height="4" rx="1" fill="rgba(255,255,255,0.3)"/>
  </svg>
);

const GoldSVG = () => (
  <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
    <defs>
      <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FBBF24" />
        <stop offset="50%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
      <filter id="goldGlow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <rect x="12" y="24" width="40" height="20" rx="4" fill="url(#goldGradient)" filter="url(#goldGlow)"/>
    <rect x="16" y="20" width="32" height="8" rx="2" fill="#FDE047"/>
    <rect x="20" y="28" width="24" height="12" rx="2" fill="rgba(255,255,255,0.2)"/>
    <text x="32" y="38" textAnchor="middle" className="text-xs font-bold" fill="#92400E">GOLD</text>
    <circle cx="48" cy="16" r="8" fill="#FDE047" opacity="0.8"/>
    <circle cx="48" cy="16" r="4" fill="#FBBF24"/>
  </svg>
);

const ArtSVG = () => (
  <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
    <defs>
      <linearGradient id="artGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="50%" stopColor="#7C3AED" />
        <stop offset="100%" stopColor="#6D28D9" />
      </linearGradient>
      <filter id="artGlow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <rect x="8" y="12" width="48" height="40" rx="4" fill="url(#artGradient)" filter="url(#artGlow)"/>
    <rect x="12" y="16" width="40" height="32" rx="2" fill="rgba(255,255,255,0.1)"/>
    <circle cx="20" cy="28" r="4" fill="#FBBF24"/>
    <path d="M28 24 L36 32 L44 24 L44 36 L28 36 Z" fill="#EC4899"/>
    <rect x="32" y="40" width="8" height="8" rx="1" fill="#10B981"/>
  </svg>
);

const BondsSVG = () => (
  <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
    <defs>
      <linearGradient id="bondsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#059669" />
        <stop offset="50%" stopColor="#047857" />
        <stop offset="100%" stopColor="#065F46" />
      </linearGradient>
      <filter id="bondsGlow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <rect x="12" y="16" width="40" height="32" rx="4" fill="url(#bondsGradient)" filter="url(#bondsGlow)"/>
    <rect x="16" y="20" width="32" height="4" rx="1" fill="rgba(255,255,255,0.3)"/>
    <rect x="16" y="28" width="24" height="2" rx="1" fill="rgba(255,255,255,0.2)"/>
    <rect x="16" y="32" width="20" height="2" rx="1" fill="rgba(255,255,255,0.2)"/>
    <rect x="16" y="36" width="28" height="2" rx="1" fill="rgba(255,255,255,0.2)"/>
    <circle cx="48" cy="28" r="8" fill="#34D399" opacity="0.8"/>
    <text x="48" y="32" textAnchor="middle" className="text-xs font-bold" fill="#065F46">₹</text>
  </svg>
);

const getAssetIcon = (assetType: string) => {
  switch (assetType) {
    case 'real_estate':
      return <RealEstateSVG />;
    case 'vehicle':
      return <VehicleSVG />;
    case 'commodity':
      return <GoldSVG />;
    case 'art':
      return <ArtSVG />;
    case 'bonds':
      return <BondsSVG />;
    default:
      return <Building className="w-12 h-12 text-blue-500" />;
  }
};

export default function RWA() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<'marketplace' | 'portfolio' | 'assets' | 'analytics'>('marketplace');
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1H' | '1D' | '1W' | '1M' | '1Y'>('1D');
  const [marketTrend, setMarketTrend] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch RWA tokens for marketplace
  const { data: tokens = [], isLoading: tokensLoading } = useQuery({
    queryKey: ['/api/rwa/tokens'],
    enabled: activeTab === 'marketplace'
  });

  // Fetch user's investments for portfolio
  const { data: investments = [], isLoading: investmentsLoading } = useQuery({
    queryKey: ['/api/rwa/investments'],
    enabled: activeTab === 'portfolio'
  });

  // Fetch user's assets
  const { data: assets = [], isLoading: assetsLoading } = useQuery({
    queryKey: ['/api/rwa/assets'],
    enabled: activeTab === 'assets'
  });

  const handleTokenInvest = (tokenId: number) => {
    setLocation(`/rwa/invest/${tokenId}`);
  };

  const handleTokenDetails = (tokenId: number) => {
    setLocation(`/rwa/token/${tokenId}`);
  };

  // Real-time market simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketTrend(prev => {
        const change = (Math.random() - 0.5) * 2;
        return Math.max(-10, Math.min(10, prev + change));
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Premium Market Stats Component
  const MarketStats = () => (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <Card className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 border-green-500/30 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-400 text-xs font-medium">Total Market Cap</p>
              <p className="text-white text-lg font-bold">₹24.2B</p>
              <div className="flex items-center space-x-1 mt-1">
                <ArrowUpRight className="w-3 h-3 text-green-400" />
                <span className="text-green-400 text-xs">+12.5%</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 border-blue-500/30 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-400 text-xs font-medium">24h Volume</p>
              <p className="text-white text-lg font-bold">₹1.8B</p>
              <div className="flex items-center space-x-1 mt-1">
                <Activity className="w-3 h-3 text-blue-400" />
                <span className="text-blue-400 text-xs">Active</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Premium Portfolio Summary
  const PortfolioSummary = () => {
    const totalInvested = investments.reduce((sum: number, inv: any) => sum + parseFloat(inv.totalInvested), 0);
    const totalValue = investments.reduce((sum: number, inv: any) => sum + parseFloat(inv.currentValue), 0);
    const totalYield = investments.reduce((sum: number, inv: any) => sum + parseFloat(inv.yieldEarned), 0);
    const roi = totalInvested > 0 ? ((totalValue - totalInvested) / totalInvested) * 100 : 0;

    return (
      <Card className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-purple-500/30 backdrop-blur-sm mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white text-lg font-bold">Portfolio Overview</h3>
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
              Premium
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-gray-400 text-xs">Total Invested</p>
              <p className="text-white text-xl font-bold">₹{totalInvested.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs">Current Value</p>
              <p className="text-white text-xl font-bold">₹{totalValue.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs">Total Yield</p>
              <p className="text-green-400 text-lg font-bold">₹{totalYield.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs">ROI</p>
              <div className="flex items-center space-x-1">
                {roi >= 0 ? (
                  <ArrowUpRight className="w-4 h-4 text-green-400" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-400" />
                )}
                <p className={`text-lg font-bold ${roi >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {roi > 0 ? '+' : ''}{roi.toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
          
          <div className="mb-3">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Portfolio Performance</span>
              <span>{roi > 0 ? 'Outperforming' : 'Underperforming'}</span>
            </div>
            <Progress value={Math.min(100, Math.max(0, 50 + roi))} className="h-3" />
          </div>
        </CardContent>
      </Card>
    );
  };

  if (tokensLoading || investmentsLoading || assetsLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading RWA data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/3 w-56 h-56 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="relative z-10 p-6 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setLocation('/dashboard')}
            className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold">Real World Assets</h1>
            <p className="text-gray-400 text-sm">Tokenized Asset Investment Platform</p>
          </div>
          
          <div className="w-12" />
        </div>

        {/* Ultra-Premium Market Overview */}
        <div className="mb-8">
          <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border-white/20 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-white text-xl font-bold">RWA Market</h2>
                  <p className="text-gray-400 text-sm">Real-time tokenized asset data</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${marketTrend >= 0 ? 'bg-green-400' : 'bg-red-400'} animate-pulse`} />
                  <span className="text-xs text-gray-400">Live</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-gray-400 text-xs">Market Cap</p>
                  <p className="text-white text-lg font-bold">₹24.2B</p>
                  <div className="flex items-center justify-center space-x-1 mt-1">
                    <ArrowUpRight className="w-3 h-3 text-green-400" />
                    <span className="text-green-400 text-xs">+12.5%</span>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-xs">24h Volume</p>
                  <p className="text-white text-lg font-bold">₹1.8B</p>
                  <div className="flex items-center justify-center space-x-1 mt-1">
                    <Activity className="w-3 h-3 text-blue-400" />
                    <span className="text-blue-400 text-xs">Active</span>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-xs">Assets</p>
                  <p className="text-white text-lg font-bold">5,234</p>
                  <div className="flex items-center justify-center space-x-1 mt-1">
                    <Zap className="w-3 h-3 text-yellow-400" />
                    <span className="text-yellow-400 text-xs">Growing</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-400 mb-2">
                  <span>Market Trend</span>
                  <span>{marketTrend >= 0 ? 'Bullish' : 'Bearish'} {Math.abs(marketTrend).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-1000 ${
                      marketTrend >= 0 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-400' 
                        : 'bg-gradient-to-r from-red-500 to-red-400'
                    }`}
                    style={{ width: `${Math.min(100, Math.max(0, 50 + marketTrend * 2))}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Advanced Tab Navigation */}
        <div className="flex bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-xl rounded-2xl p-1 mb-8 border border-white/10">
          {[
            { id: 'marketplace', label: 'Marketplace', icon: ShoppingCart, color: 'blue' },
            { id: 'portfolio', label: 'Portfolio', icon: Wallet, color: 'purple' },
            { id: 'assets', label: 'Assets', icon: Target, color: 'green' },
            { id: 'analytics', label: 'Analytics', icon: BarChart3, color: 'orange' }
          ].map(({ id, label, icon: Icon, color }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl transition-all duration-300 ${
                activeTab === id
                  ? `bg-gradient-to-r from-${color}-500 to-${color}-600 text-white font-semibold shadow-lg scale-105`
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>

        {/* Marketplace Tab */}
        {activeTab === 'marketplace' && (
          <div className="space-y-6">
            <MarketStats />
            
            {/* Trending Assets Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white mb-2">Trending Assets</h2>
                <p className="text-gray-400 text-sm">Top performing tokenized assets today</p>
              </div>
              <div className="flex space-x-2">
                {['1H', '1D', '1W', '1M'].map((timeframe) => (
                  <button
                    key={timeframe}
                    onClick={() => setSelectedTimeframe(timeframe as any)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300 ${
                      selectedTimeframe === timeframe
                        ? 'bg-blue-500 text-white'
                        : 'bg-white/10 text-gray-400 hover:text-white'
                    }`}
                  >
                    {timeframe}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              {tokens.map((token: any, index: number) => {
                const randomPrice = (Math.random() * 5 + 2).toFixed(2);
                const isPositive = Math.random() > 0.4;
                const priceChange = isPositive ? `+${randomPrice}` : `-${randomPrice}`;
                const liquidityPercentage = ((parseFloat(token.totalSupply) - parseFloat(token.availableSupply)) / parseFloat(token.totalSupply) * 100);
                
                return (
                  <Card 
                    key={token.id} 
                    className="group relative overflow-hidden bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
                    style={{
                      background: `
                        linear-gradient(135deg, 
                          rgba(255,255,255,0.08) 0%, 
                          rgba(255,255,255,0.02) 100%
                        ),
                        linear-gradient(45deg, 
                          rgba(59, 130, 246, 0.1) 0%, 
                          rgba(147, 51, 234, 0.1) 50%,
                          rgba(16, 185, 129, 0.1) 100%
                        )
                      `,
                      boxShadow: '0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1) inset'
                    }}
                  >
                    <CardContent className="p-6 relative z-10">
                      {/* Premium Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-white/20 flex items-center justify-center backdrop-blur-sm">
                              {getAssetIcon(token.assetType || 'real_estate')}
                            </div>
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black animate-pulse" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-white mb-1">
                              {token.tokenName}
                            </h3>
                            <div className="flex items-center space-x-2">
                              <span className="text-gray-400 text-sm font-mono">{token.tokenSymbol}</span>
                              <Badge className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 border-yellow-500/30 text-xs px-2 py-0.5">
                                <Star className="w-3 h-3 mr-1" />
                                {token.yieldRate}% APY
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-white text-xl font-bold">
                            ₹{parseFloat(token.pricePerToken).toLocaleString()}
                          </p>
                          <div className={`flex items-center space-x-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                            {isPositive ? (
                              <ArrowUpRight className="w-3 h-3" />
                            ) : (
                              <ArrowDownRight className="w-3 h-3" />
                            )}
                            <span className="text-sm font-medium">{priceChange}%</span>
                          </div>
                        </div>
                      </div>

                      {/* Advanced Metrics */}
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="bg-white/5 rounded-xl p-3 backdrop-blur-sm">
                          <p className="text-gray-400 text-xs mb-1">Market Cap</p>
                          <p className="text-white font-semibold text-sm">₹{(parseFloat(token.pricePerToken) * parseFloat(token.totalSupply) / 1000000).toFixed(1)}M</p>
                        </div>
                        <div className="bg-white/5 rounded-xl p-3 backdrop-blur-sm">
                          <p className="text-gray-400 text-xs mb-1">Volume 24h</p>
                          <p className="text-white font-semibold text-sm">₹{(Math.random() * 50 + 10).toFixed(1)}K</p>
                        </div>
                        <div className="bg-white/5 rounded-xl p-3 backdrop-blur-sm">
                          <p className="text-gray-400 text-xs mb-1">Supply</p>
                          <p className="text-white font-semibold text-sm">{parseFloat(token.availableSupply).toLocaleString()}</p>
                        </div>
                      </div>
                      
                      {/* Liquidity Progress */}
                      <div className="mb-6">
                        <div className="flex justify-between text-xs text-gray-400 mb-2">
                          <span>Liquidity Pool</span>
                          <span>{liquidityPercentage.toFixed(1)}% Filled</span>
                        </div>
                        <div className="relative w-full bg-gray-800/50 rounded-full h-3 overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 h-3 rounded-full transition-all duration-1000 relative"
                            style={{ width: `${liquidityPercentage}%` }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Premium Action Buttons */}
                      <div className="flex space-x-3">
                        <Button
                          onClick={() => handleTokenDetails(token.id)}
                          variant="outline"
                          className="flex-1 bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/40 backdrop-blur-sm transition-all duration-300"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Analyze
                        </Button>
                        <Button
                          onClick={() => handleTokenInvest(token.id)}
                          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group"
                        >
                          <TrendingUp className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                          Invest Now
                        </Button>
                      </div>
                    </CardContent>
                    
                    {/* Floating Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Portfolio Tab */}
        {activeTab === 'portfolio' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold mb-2">Investment Portfolio</h2>
              <p className="text-gray-400">Track your RWA investments</p>
            </div>

            {investments.length === 0 ? (
              <div className="text-center py-12">
                <Wallet className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">No Investments Yet</h3>
                <p className="text-gray-400 mb-6">Start investing in tokenized real-world assets</p>
                <Button
                  onClick={() => setActiveTab('marketplace')}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  Explore Marketplace
                </Button>
              </div>
            ) : (
              <div className="grid gap-6">
                {investments.map((investment: any) => (
                  <Card key={investment.id} className="bg-white/10 backdrop-blur-sm border-white/20">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white">Investment #{investment.id}</h3>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          Active
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-gray-400 text-xs">Tokens Owned</p>
                          <p className="text-white font-semibold">{parseFloat(investment.tokensOwned).toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs">Current Value</p>
                          <p className="text-white font-semibold">₹{parseFloat(investment.currentValue).toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs">Total Invested</p>
                          <p className="text-white font-semibold">₹{parseFloat(investment.totalInvested).toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs">Yield Earned</p>
                          <p className="text-green-400 font-semibold">₹{parseFloat(investment.yieldEarned).toLocaleString()}</p>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>ROI</span>
                          <span className="text-green-400">
                            +{(((parseFloat(investment.currentValue) - parseFloat(investment.totalInvested)) / parseFloat(investment.totalInvested)) * 100).toFixed(2)}%
                          </span>
                        </div>
                      </div>
                      
                      <Button
                        onClick={() => handleTokenDetails(investment.tokenId)}
                        variant="outline"
                        className="w-full bg-transparent border-white/30 text-white hover:bg-white/10"
                      >
                        <BarChart3 className="w-4 h-4 mr-2" />
                        View Analytics
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold mb-2">Market Analytics</h2>
              <p className="text-gray-400">Advanced insights and performance metrics</p>
            </div>

            {/* Performance Overview */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-gradient-to-br from-green-600/20 to-emerald-700/20 border-green-500/30 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-green-400 text-lg font-bold">Total Returns</h3>
                      <p className="text-green-300 text-2xl font-bold">+₹45,230</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-green-400" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ArrowUpRight className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-sm">+18.5% this month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-600/20 to-purple-700/20 border-blue-500/30 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-blue-400 text-lg font-bold">Risk Score</h3>
                      <p className="text-blue-300 text-2xl font-bold">Medium</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-blue-400" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-400 text-sm">Diversified portfolio</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Market Insights */}
            <Card className="bg-gradient-to-br from-purple-600/20 to-pink-700/20 border-purple-500/30 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-white text-lg font-bold mb-4">Market Insights</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl">
                    <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Real Estate tokens showing strong momentum</p>
                      <p className="text-gray-400 text-sm">Average +12.3% growth in luxury properties</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <Globe className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Government bonds maintain stability</p>
                      <p className="text-gray-400 text-sm">Consistent 8.5% annual returns</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl">
                    <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Luxury vehicle market volatility</p>
                      <p className="text-gray-400 text-sm">Consider diversification strategy</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Recommendations */}
            <Card className="bg-gradient-to-br from-orange-600/20 to-red-700/20 border-orange-500/30 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-orange-400" />
                  </div>
                  <h3 className="text-white text-lg font-bold">AI Recommendations</h3>
                </div>
                <div className="space-y-3">
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-medium">Luxury Apartment Mumbai</h4>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        Buy Signal
                      </Badge>
                    </div>
                    <p className="text-gray-400 text-sm">Expected 15% return based on market analysis</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-yellow-400 text-sm">High confidence</span>
                    </div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-medium">Gold Reserves Token</h4>
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                        Hold
                      </Badge>
                    </div>
                    <p className="text-gray-400 text-sm">Stable asset for portfolio balance</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Shield className="w-4 h-4 text-blue-400" />
                      <span className="text-blue-400 text-sm">Low risk</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Assets Tab */}
        {activeTab === 'assets' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold mb-2">My Tokenized Assets</h2>
              <p className="text-gray-400">Physical assets you have tokenized</p>
            </div>

            <div className="grid gap-6">
              {assets.map((asset: any) => (
                <Card key={asset.id} className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {getAssetIcon(asset.assetType)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-white">{asset.name}</h3>
                          <Badge className={`${
                            asset.tokenizationStatus === 'tokenized'
                              ? 'bg-green-500/20 text-green-400 border-green-500/30'
                              : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                          }`}>
                            {asset.tokenizationStatus.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </div>
                        
                        <p className="text-gray-400 text-sm mb-4">{asset.description}</p>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-gray-400 text-xs">Asset Value</p>
                            <p className="text-white font-semibold">₹{parseFloat(asset.value).toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-xs">Location</p>
                            <p className="text-white font-semibold">{asset.location}</p>
                          </div>
                        </div>
                        
                        <div className="flex space-x-3">
                          <Button
                            variant="outline"
                            className="flex-1 bg-transparent border-white/30 text-white hover:bg-white/10"
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            Documents
                          </Button>
                          {asset.tokenizationStatus === 'tokenized' && (
                            <Button
                              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                            >
                              <Coins className="w-4 h-4 mr-2" />
                              Manage Tokens
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}