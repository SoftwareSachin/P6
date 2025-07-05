import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, TrendingUp, TrendingDown, Building, Car, Coins, Palette, FileText, Eye, ShoppingCart, BarChart3, Wallet, Target, Activity, DollarSign, PieChart, Star, Zap, Shield, Globe, AlertTriangle, Clock, CheckCircle, ArrowUpRight, ArrowDownRight, Search, Filter, Percent, Award, Users, Briefcase, Brain, Sparkles, ChevronRight, Info } from 'lucide-react';
import { useLocation } from 'wouter';

// Premium Progress Component
const Progress = ({ value, className }: { value: number; className?: string }) => (
  <div className={`w-full bg-white/10 rounded-full h-2 overflow-hidden ${className}`}>
    <div 
      className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500 ease-out relative"
      style={{ width: `${value}%` }}
    >
      <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
    </div>
  </div>
);

// Ultra-Premium RWA Asset SVG Icons
const RealEstateSVG = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 80" fill="none">
    <defs>
      <linearGradient id="realEstateGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="33%" stopColor="#1E40AF" />
        <stop offset="66%" stopColor="#1E3A8A" />
        <stop offset="100%" stopColor="#1E293B" />
      </linearGradient>
      <linearGradient id="realEstateAccent" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
      <filter id="realEstateGlow">
        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <filter id="realEstateShadow">
        <feDropShadow dx="2" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.3"/>
      </filter>
    </defs>
    <ellipse cx="40" cy="70" rx="32" ry="6" fill="rgba(0,0,0,0.15)" />
    <rect x="10" y="25" width="60" height="40" rx="6" fill="url(#realEstateGradient)" filter="url(#realEstateShadow)" />
    <rect x="14" y="20" width="52" height="8" rx="4" fill="url(#realEstateAccent)" />
    <rect x="18" y="35" width="12" height="12" rx="2" fill="rgba(255,255,255,0.25)" />
    <rect x="34" y="35" width="12" height="12" rx="2" fill="rgba(255,255,255,0.25)" />
    <rect x="50" y="35" width="12" height="12" rx="2" fill="rgba(255,255,255,0.25)" />
    <rect x="26" y="52" width="28" height="13" rx="3" fill="rgba(255,255,255,0.15)" />
    <circle cx="40" cy="58" r="2" fill="rgba(255,255,255,0.8)" />
    <circle cx="40" cy="14" r="4" fill="#FBBF24" filter="url(#realEstateGlow)" />
    <circle cx="40" cy="14" r="2" fill="#F59E0B" />
  </svg>
);

const VehicleSVG = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 80" fill="none">
    <defs>
      <linearGradient id="vehicleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#EF4444" />
        <stop offset="33%" stopColor="#DC2626" />
        <stop offset="66%" stopColor="#B91C1C" />
        <stop offset="100%" stopColor="#991B1B" />
      </linearGradient>
      <linearGradient id="vehicleAccent" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F87171" />
        <stop offset="100%" stopColor="#EF4444" />
      </linearGradient>
      <filter id="vehicleGlow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <filter id="vehicleShadow">
        <feDropShadow dx="2" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.3"/>
      </filter>
    </defs>
    <ellipse cx="40" cy="68" rx="36" ry="8" fill="rgba(0,0,0,0.15)" />
    <path d="M14 38 L66 38 L60 28 L20 28 Z" fill="url(#vehicleAccent)" />
    <rect x="10" y="38" width="60" height="16" rx="8" fill="url(#vehicleGradient)" filter="url(#vehicleShadow)" />
    <circle cx="22" cy="58" r="8" fill="#374151" />
    <circle cx="58" cy="58" r="8" fill="#374151" />
    <circle cx="22" cy="58" r="4" fill="#9CA3AF" />
    <circle cx="58" cy="58" r="4" fill="#9CA3AF" />
    <circle cx="22" cy="58" r="2" fill="#D1D5DB" />
    <circle cx="58" cy="58" r="2" fill="#D1D5DB" />
    <rect x="24" y="32" width="8" height="6" rx="2" fill="rgba(255,255,255,0.4)" />
    <rect x="36" y="32" width="8" height="6" rx="2" fill="rgba(255,255,255,0.4)" />
    <rect x="48" y="32" width="8" height="6" rx="2" fill="rgba(255,255,255,0.4)" />
    <rect x="30" y="42" width="20" height="4" rx="2" fill="rgba(255,255,255,0.2)" />
  </svg>
);

const CommoditySVG = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 80" fill="none">
    <defs>
      <linearGradient id="commodityGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FBBF24" />
        <stop offset="33%" stopColor="#F59E0B" />
        <stop offset="66%" stopColor="#D97706" />
        <stop offset="100%" stopColor="#92400E" />
      </linearGradient>
      <linearGradient id="commodityShine" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDE047" />
        <stop offset="100%" stopColor="#FBBF24" />
      </linearGradient>
      <filter id="commodityGlow">
        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <filter id="commodityShadow">
        <feDropShadow dx="2" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.3"/>
      </filter>
    </defs>
    <ellipse cx="40" cy="68" rx="32" ry="6" fill="rgba(0,0,0,0.15)" />
    <rect x="15" y="30" width="50" height="28" rx="6" fill="url(#commodityGradient)" filter="url(#commodityShadow)" />
    <rect x="19" y="25" width="42" height="10" rx="3" fill="url(#commodityShine)" />
    <rect x="23" y="38" width="34" height="16" rx="3" fill="rgba(255,255,255,0.2)" />
    <text x="40" y="49" textAnchor="middle" className="text-sm font-bold" fill="#92400E">GOLD</text>
    <circle cx="58" cy="18" r="10" fill="url(#commodityShine)" filter="url(#commodityGlow)" />
    <circle cx="58" cy="18" r="6" fill="#FBBF24" />
    <circle cx="58" cy="18" r="3" fill="#FDE047" />
    <path d="M22 18 L28 12 L34 18 L28 24 Z" fill="#FDE047" filter="url(#commodityGlow)" />
  </svg>
);

const ArtSVG = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 80" fill="none">
    <defs>
      <linearGradient id="artGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#A855F7" />
        <stop offset="33%" stopColor="#8B5CF6" />
        <stop offset="66%" stopColor="#7C3AED" />
        <stop offset="100%" stopColor="#6D28D9" />
      </linearGradient>
      <linearGradient id="artFrame" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#C4B5FD" />
        <stop offset="100%" stopColor="#A855F7" />
      </linearGradient>
      <filter id="artGlow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <filter id="artShadow">
        <feDropShadow dx="2" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.3"/>
      </filter>
    </defs>
    <ellipse cx="40" cy="68" rx="32" ry="6" fill="rgba(0,0,0,0.15)" />
    <rect x="10" y="15" width="60" height="48" rx="6" fill="url(#artFrame)" filter="url(#artShadow)" />
    <rect x="14" y="19" width="52" height="40" rx="4" fill="url(#artGradient)" />
    <rect x="18" y="23" width="44" height="32" rx="2" fill="rgba(255,255,255,0.1)" />
    <circle cx="26" cy="35" r="5" fill="#FBBF24" filter="url(#artGlow)" />
    <path d="M35 30 L45 40 L55 30 L55 45 L35 45 Z" fill="#EC4899" filter="url(#artGlow)" />
    <rect x="38" y="48" width="12" height="8" rx="2" fill="#10B981" />
    <circle cx="60" cy="32" r="3" fill="#F59E0B" />
    <circle cx="65" cy="38" r="2" fill="#EF4444" />
  </svg>
);

const BondsSVG = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 80" fill="none">
    <defs>
      <linearGradient id="bondsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="33%" stopColor="#059669" />
        <stop offset="66%" stopColor="#047857" />
        <stop offset="100%" stopColor="#065F46" />
      </linearGradient>
      <linearGradient id="bondsAccent" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6EE7B7" />
        <stop offset="100%" stopColor="#10B981" />
      </linearGradient>
      <filter id="bondsGlow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <filter id="bondsShadow">
        <feDropShadow dx="2" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.3"/>
      </filter>
    </defs>
    <ellipse cx="40" cy="68" rx="32" ry="6" fill="rgba(0,0,0,0.15)" />
    <rect x="15" y="20" width="50" height="40" rx="6" fill="url(#bondsGradient)" filter="url(#bondsShadow)" />
    <rect x="19" y="25" width="42" height="6" rx="2" fill="url(#bondsAccent)" />
    <rect x="19" y="35" width="30" height="3" rx="1" fill="rgba(255,255,255,0.3)" />
    <rect x="19" y="40" width="25" height="3" rx="1" fill="rgba(255,255,255,0.3)" />
    <rect x="19" y="45" width="35" height="3" rx="1" fill="rgba(255,255,255,0.3)" />
    <rect x="19" y="50" width="28" height="3" rx="1" fill="rgba(255,255,255,0.3)" />
    <circle cx="58" cy="35" r="10" fill="#34D399" filter="url(#bondsGlow)" />
    <text x="58" y="39" textAnchor="middle" className="text-sm font-bold" fill="#065F46">₹</text>
    <circle cx="25" cy="10" r="6" fill="#6EE7B7" />
    <circle cx="25" cy="10" r="3" fill="#10B981" />
  </svg>
);

const getAssetIcon = (assetType: string, className?: string) => {
  switch (assetType) {
    case 'real_estate':
      return <RealEstateSVG className={className} />;
    case 'vehicle':
      return <VehicleSVG className={className} />;
    case 'commodity':
      return <CommoditySVG className={className} />;
    case 'art':
      return <ArtSVG className={className} />;
    case 'bonds':
      return <BondsSVG className={className} />;
    default:
      return <Building className={`w-16 h-16 text-blue-500 ${className}`} />;
  }
};

export default function RWA() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<'marketplace' | 'portfolio' | 'assets' | 'analytics'>('marketplace');
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1H' | '1D' | '1W' | '1M' | '1Y'>('1D');
  const [marketTrend, setMarketTrend] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  // Fetch real market data
  const { data: marketData, isLoading: marketDataLoading } = useQuery({
    queryKey: ['/api/rwa/market/overview'],
    refetchInterval: 5000 // Refresh every 5 seconds for real-time feel
  });

  // Fetch portfolio summary
  const { data: portfolioData, isLoading: portfolioLoading } = useQuery({
    queryKey: ['/api/rwa/portfolio/summary'],
    enabled: activeTab === 'portfolio',
    refetchInterval: 10000
  });

  // Fetch RWA tokens for marketplace
  const { data: tokens = [], isLoading: tokensLoading } = useQuery({
    queryKey: ['/api/rwa/tokens'],
    enabled: activeTab === 'marketplace',
    refetchInterval: 30000
  });

  // Fetch user's investments for portfolio
  const { data: investments = [], isLoading: investmentsLoading } = useQuery({
    queryKey: ['/api/rwa/investments'],
    enabled: activeTab === 'portfolio',
    refetchInterval: 15000
  });

  // Fetch user's assets
  const { data: assets = [], isLoading: assetsLoading } = useQuery({
    queryKey: ['/api/rwa/assets'],
    enabled: activeTab === 'assets',
    refetchInterval: 30000
  });

  const handleTokenInvest = (tokenId: number) => {
    // Find the token to get its details
    const tokenArray = Array.isArray(tokens) ? tokens : [];
    const token = tokenArray.find((t: any) => t.id === tokenId);
    
    if (token) {
      // Store investment details in localStorage for the Send Money page
      const investmentDetails = {
        type: 'rwa_investment',
        tokenId: token.id,
        tokenName: token.tokenName,
        tokenSymbol: token.tokenSymbol,
        minInvestment: token.minInvestment || 1000,
        expectedYield: token.expectedYield || 0,
        price: token.marketData?.price || 100
      };
      localStorage.setItem('investmentDetails', JSON.stringify(investmentDetails));
      
      // Navigate to send money page
      setLocation('/send');
    }
  };

  const handleTokenDetails = (tokenId: number) => {
    // For now, show token details in the same page or navigate to a dedicated details view
    alert(`Token Details for ID: ${tokenId}\nThis would show detailed information about the token.`);
  };

  // Real-time market simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketTrend(prev => {
        const change = (Math.random() - 0.5) * 2;
        return Math.max(-15, Math.min(15, prev + change));
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Ultra-Premium Market Overview Header
  const MarketOverview = () => (
    <div className="mb-8">
      <Card className="bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-slate-900/80 border-slate-600/30 backdrop-blur-2xl shadow-2xl">
        <CardContent className="p-8">
          {/* Market Status Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                RWA Market
              </h2>
              <p className="text-slate-400 text-sm mt-1">Real-time tokenized asset ecosystem</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${(marketData as any)?.trendingUp ? 'bg-green-400' : 'bg-red-400'} animate-pulse shadow-lg`} />
                <span className="text-xs text-slate-300 font-medium">Live Market</span>
              </div>
              <Badge className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border-blue-400/30 px-3 py-1">
                <Zap className="w-3 h-3 mr-1" />
                Premium
              </Badge>
            </div>
          </div>

          {/* Market Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-600/20">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-green-400" />
                  <p className="text-slate-300 text-sm font-medium">Market Cap</p>
                </div>
              </div>
              <p className="text-xl font-bold text-white mb-1">
                ₹{(marketData as any)?.totalMarketCap ? ((marketData as any).totalMarketCap / 1000000).toFixed(1) : '0'}M
              </p>
              <div className="flex items-center space-x-1">
                <ArrowUpRight className="w-3 h-3 text-green-400" />
                <span className="text-green-400 text-xs font-medium">
                  +{(marketData as any)?.changePercent ? Math.abs((marketData as any).changePercent).toFixed(1) : '0'}%
                </span>
              </div>
            </div>

            <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-600/20">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-blue-400" />
                  <p className="text-slate-300 text-sm font-medium">24h Volume</p>
                </div>
              </div>
              <p className="text-xl font-bold text-white mb-1">
                ₹{(marketData as any)?.volume24h ? ((marketData as any).volume24h / 1000000).toFixed(1) : '0'}M
              </p>
              <div className="flex items-center space-x-1">
                <Activity className="w-3 h-3 text-blue-400" />
                <span className="text-blue-400 text-xs font-medium">Active</span>
              </div>
            </div>

            <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-600/20">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Percent className="w-4 h-4 text-purple-400" />
                  <p className="text-slate-300 text-sm font-medium">Avg Yield</p>
                </div>
              </div>
              <p className="text-xl font-bold text-white mb-1">
                {(marketData as any)?.avgYield ? (marketData as any).avgYield.toFixed(1) : '0'}%
              </p>
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 text-purple-400" />
                <span className="text-purple-400 text-xs font-medium">Premium</span>
              </div>
            </div>

            <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-600/20">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-orange-400" />
                  <p className="text-slate-300 text-sm font-medium">Assets</p>
                </div>
              </div>
              <p className="text-xl font-bold text-white mb-1">
                {(marketData as any)?.activeTokens || '0'}
              </p>
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-3 h-3 text-orange-400" />
                <span className="text-orange-400 text-xs font-medium">Verified</span>
              </div>
            </div>
          </div>

          {/* Market Trend Visualization */}
          <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-600/20 mb-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-slate-300 font-medium">Market Trend</span>
              <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                marketTrend > 0 ? 'bg-green-500/20 text-green-400' : 
                marketTrend < 0 ? 'bg-red-500/20 text-red-400' : 
                'bg-slate-500/20 text-slate-400'
              }`}>
                {marketTrend > 0 ? 'Bullish' : marketTrend < 0 ? 'Bearish' : 'Neutral'}
              </span>
            </div>
            <div className="relative">
              <Progress value={Math.max(0, Math.min(100, 50 + marketTrend * 2))} className="h-3" />
            </div>
          </div>

          {/* Timeframe Selector */}
          <div className="flex justify-center space-x-2">
            {(['1H', '1D', '1W', '1M', '1Y'] as const).map((timeframe) => (
              <button
                key={timeframe}
                onClick={() => setSelectedTimeframe(timeframe)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  selectedTimeframe === timeframe
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white border border-slate-600/30'
                }`}
              >
                {timeframe}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Ultra-Premium Tab Navigation
  const TabNavigation = () => (
    <div className="mb-8">
      <div className="flex items-center justify-center px-6">
        <div className="bg-black/60 backdrop-blur-2xl rounded-3xl p-1.5 border border-white/10 shadow-2xl">
          <div className="flex space-x-1">
            {([
              { id: 'marketplace', label: 'Market', icon: ShoppingCart },
              { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
              { id: 'assets', label: 'Assets', icon: Building },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 }
            ] as const).map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`relative flex flex-col items-center justify-center px-4 py-4 rounded-2xl text-xs font-medium transition-all duration-500 min-w-[70px] ${
                  activeTab === id
                    ? 'bg-gradient-to-b from-white to-gray-100 text-black shadow-xl transform scale-105'
                    : 'text-white/70 hover:text-white hover:bg-white/5 hover:backdrop-blur-sm'
                }`}
              >
                <Icon className={`w-5 h-5 mb-1.5 ${activeTab === id ? 'text-black' : 'text-white/70'}`} />
                <span className={`font-semibold ${activeTab === id ? 'text-black' : 'text-white/70'}`}>{label}</span>
                {activeTab === id && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Ultra-Premium Portfolio Summary
  const PortfolioSummary = () => {
    const investmentArray = Array.isArray(investments) ? investments : [];
    const totalInvested = investmentArray.reduce((sum: number, inv: any) => sum + parseFloat(inv.totalInvested || 0), 0);
    const totalValue = investmentArray.reduce((sum: number, inv: any) => sum + parseFloat(inv.currentValue || 0), 0);
    const totalYield = investmentArray.reduce((sum: number, inv: any) => sum + parseFloat(inv.yieldEarned || 0), 0);
    const roi = totalInvested > 0 ? ((totalValue - totalInvested) / totalInvested) * 100 : 0;

    return (
      <div className="mb-8 px-6">
        {/* Portfolio Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Portfolio Overview</h2>
            <p className="text-white/60 text-sm">Your investment performance</p>
          </div>
          <div className="flex space-x-2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 px-3 py-1.5 rounded-full">
              <span className="text-white text-xs font-semibold">Premium</span>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-3 py-1.5 rounded-full">
              <span className="text-white text-xs font-semibold">Active</span>
            </div>
          </div>
        </div>

        {/* Main Portfolio Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Total Invested */}
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-blue-500/20 rounded-2xl flex items-center justify-center">
                <Wallet className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-white/50 text-xs font-medium">Total</div>
            </div>
            <div className="mb-2">
              <p className="text-white/60 text-sm font-medium">Invested</p>
              <p className="text-2xl font-bold text-white">₹{totalInvested.toLocaleString()}</p>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
              <span className="text-blue-400 text-xs font-medium">Principal amount</span>
            </div>
          </div>

          {/* Current Value */}
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-purple-500/20 rounded-2xl flex items-center justify-center">
                <Target className="w-5 h-5 text-purple-400" />
              </div>
              <div className="text-white/50 text-xs font-medium">Current</div>
            </div>
            <div className="mb-2">
              <p className="text-white/60 text-sm font-medium">Value</p>
              <p className="text-2xl font-bold text-white">₹{totalValue.toLocaleString()}</p>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
              <span className="text-purple-400 text-xs font-medium">Market value</span>
            </div>
          </div>

          {/* Total Yield */}
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-green-500/20 rounded-2xl flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-400" />
              </div>
              <div className="text-white/50 text-xs font-medium">Total</div>
            </div>
            <div className="mb-2">
              <p className="text-white/60 text-sm font-medium">Yield</p>
              <p className="text-2xl font-bold text-green-400">₹{totalYield.toLocaleString()}</p>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
              <span className="text-green-400 text-xs font-medium">Generated income</span>
            </div>
          </div>

          {/* ROI */}
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 ${roi >= 0 ? 'bg-green-500/20' : 'bg-red-500/20'} rounded-2xl flex items-center justify-center`}>
                {roi >= 0 ? (
                  <ArrowUpRight className="w-5 h-5 text-green-400" />
                ) : (
                  <ArrowDownRight className="w-5 h-5 text-red-400" />
                )}
              </div>
              <div className="text-white/50 text-xs font-medium">ROI</div>
            </div>
            <div className="mb-2">
              <p className="text-white/60 text-sm font-medium">Return</p>
              <p className={`text-2xl font-bold ${roi >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {roi > 0 ? '+' : ''}{roi.toFixed(2)}%
              </p>
            </div>
            <div className="flex items-center space-x-1">
              <div className={`w-1.5 h-1.5 ${roi >= 0 ? 'bg-green-400' : 'bg-red-400'} rounded-full`}></div>
              <span className={`text-xs font-medium ${roi >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {roi >= 0 ? 'Outperforming' : 'Underperforming'}
              </span>
            </div>
          </div>
        </div>

        {/* Performance Bar */}
        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl p-6 border border-white/10">
          <div className="flex justify-between items-center mb-4">
            <span className="text-white font-medium">Portfolio Performance</span>
            <span className={`text-sm font-semibold ${roi >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {roi >= 0 ? 'Excellent' : 'Needs Attention'}
            </span>
          </div>
          <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
            <div 
              className={`absolute left-0 top-0 h-full rounded-full transition-all duration-1000 ${
                roi >= 0 ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gradient-to-r from-red-400 to-red-500'
              }`}
              style={{ width: `${Math.min(100, Math.max(0, 50 + roi))}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Ultra-Premium Token Card
  const TokenCard = ({ token }: { token: any }) => {
    const priceChange = parseFloat(token.marketData?.priceChange24h || 0);
    const isPositive = priceChange >= 0;
    
    return (
      <div className="group relative">
        <div className="bg-gradient-to-br from-white/8 to-white/[0.02] backdrop-blur-2xl rounded-3xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl">
          {/* Asset Icon and Verification */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                  {getAssetIcon(token.assetType, "w-8 h-8")}
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center border-2 border-black">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                  {token.tokenName}
                </h3>
                <p className="text-white/60 text-sm font-medium">{token.tokenSymbol}</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-3 py-1.5 rounded-full border border-blue-500/30">
              <span className="text-blue-300 text-xs font-semibold">Verified</span>
            </div>
          </div>

          {/* Price and Yield */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <p className="text-white/60 text-sm font-medium">Price</p>
                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${
                  isPositive ? 'bg-green-500/20' : 'bg-red-500/20'
                }`}>
                  {isPositive ? (
                    <ArrowUpRight className="w-3 h-3 text-green-400" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3 text-red-400" />
                  )}
                  <span className={`text-xs font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    {isPositive ? '+' : ''}{priceChange.toFixed(2)}%
                  </span>
                </div>
              </div>
              <p className="text-xl font-bold text-white">₹{parseFloat(token.marketData?.price || 0).toLocaleString()}</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <p className="text-white/60 text-sm font-medium">Expected Yield</p>
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
              <p className="text-xl font-bold text-green-400">{token.expectedYield}%</p>
              <p className="text-white/40 text-xs mt-1">Annual return</p>
            </div>
          </div>

          {/* Market Data */}
          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-white/60 text-sm">Market Cap</span>
              <span className="text-white font-semibold">₹{parseFloat(token.marketData?.marketCap || 0).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/60 text-sm">24h Volume</span>
              <span className="text-white font-semibold">₹{parseFloat(token.marketData?.volume24h || 0).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/60 text-sm">Liquidity</span>
              <span className="text-white font-semibold">₹{parseFloat(token.marketData?.liquidity || 0).toLocaleString()}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={() => handleTokenDetails(token.id)}
              className="flex-1 bg-white/10 hover:bg-white/15 backdrop-blur-xl text-white font-semibold py-3 px-4 rounded-2xl border border-white/20 hover:border-white/30 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Eye className="w-4 h-4" />
              <span>Details</span>
            </button>
            <button
              onClick={() => handleTokenInvest(token.id)}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 px-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Invest</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Analytics Dashboard
  const AnalyticsDashboard = () => {
    const insights = [
      {
        title: "AI Investment Recommendation",
        description: "Real estate tokens showing 15% growth potential",
        icon: Brain,
        color: "from-purple-500 to-pink-500",
        action: "Explore"
      },
      {
        title: "Market Opportunity",
        description: "Commodity sector undervalued by 8.5%",
        icon: TrendingUp,
        color: "from-green-500 to-emerald-500",
        action: "Analyze"
      },
      {
        title: "Risk Assessment",
        description: "Portfolio diversification score: 85%",
        icon: Shield,
        color: "from-blue-500 to-cyan-500",
        action: "Review"
      },
      {
        title: "Yield Optimization",
        description: "Potential yield increase of 3.2%",
        icon: Target,
        color: "from-orange-500 to-red-500",
        action: "Optimize"
      }
    ];

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {insights.map((insight, index) => (
            <Card key={index} className="bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-slate-900/80 border-slate-600/30 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 group">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${insight.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <insight.icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border-blue-400/30">
                    <Sparkles className="w-3 h-3 mr-1" />
                    AI Powered
                  </Badge>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                  {insight.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4">{insight.description}</p>
                <Button className="w-full bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white border-none shadow-lg">
                  <ChevronRight className="w-4 h-4 mr-2" />
                  {insight.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-slate-900/80 border-slate-600/30 backdrop-blur-xl shadow-2xl">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Market Insights</h3>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Top Performer</h4>
                <p className="text-slate-400 text-sm">Real Estate tokens leading with 18.5% returns</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Most Popular</h4>
                <p className="text-slate-400 text-sm">Gold tokens with 2.3K active investors</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Trending</h4>
                <p className="text-slate-400 text-sm">Art tokens gaining 45% in volume</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  if (tokensLoading || investmentsLoading || assetsLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Building className="w-8 h-8 text-white" />
          </div>
          <div className="text-white text-xl font-bold mb-2">Loading RWA Platform</div>
          <div className="text-slate-400">Fetching tokenized assets...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2A2D47] via-[#1E1F2E] to-[#0F0F23]">
      <div className="max-w-sm mx-auto min-h-screen">
        {/* Ultra-Premium Header */}
        <div className="px-4 pt-14 pb-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setLocation('/dashboard')}
              className="w-10 h-10 bg-[#2D3748]/80 rounded-xl flex items-center justify-center backdrop-blur-sm"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div className="text-center">
              <h1 className="text-xl font-bold text-white">Real World</h1>
              <h1 className="text-xl font-bold text-white -mt-1">Assets</h1>
              <p className="text-white/50 text-xs mt-1">Premium tokenized</p>
              <p className="text-white/50 text-xs -mt-1">investment platform</p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="w-10 h-10 bg-[#2D3748]/80 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Search className="w-5 h-5 text-white" />
              </button>
              <button className="w-10 h-10 bg-[#2D3748]/80 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Filter className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
          
          {/* Live Status Bar */}
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white/70 text-xs font-medium">Live</span>
            </div>
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-3 py-1 rounded-full border border-purple-500/30">
              <span className="text-purple-300 text-xs font-semibold">Premium</span>
            </div>
          </div>
        </div>

        {/* Premium Market Overview Cards */}
        <div className="px-6 mb-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Market Cap */}
            <div className="bg-gradient-to-br from-gray-600/30 to-gray-700/30 backdrop-blur-2xl rounded-2xl p-4 border border-gray-600/20">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-green-400" />
                </div>
                <div className="bg-green-500/20 px-2 py-1 rounded-full">
                  <span className="text-green-400 text-xs font-semibold">+13%</span>
                </div>
              </div>
              <div className="mb-1">
                <p className="text-white/60 text-xs font-medium">Market Cap</p>
                <p className="text-white text-xl font-bold">₹{(marketData as any)?.totalMarketCap ? ((marketData as any).totalMarketCap / 1000000).toFixed(1) : '24.2'}M</p>
              </div>
            </div>

            {/* 24h Volume */}
            <div className="bg-gradient-to-br from-gray-600/30 to-gray-700/30 backdrop-blur-2xl rounded-2xl p-4 border border-gray-600/20">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <Activity className="w-4 h-4 text-blue-400" />
                </div>
                <div className="bg-blue-500/20 px-2 py-1 rounded-full">
                  <span className="text-blue-400 text-xs font-semibold">Active</span>
                </div>
              </div>
              <div className="mb-1">
                <p className="text-white/60 text-xs font-medium">24h Volume</p>
                <p className="text-white text-xl font-bold">₹{(marketData as any)?.volume24h ? ((marketData as any).volume24h / 1000000).toFixed(1) : '8.6'}M</p>
              </div>
            </div>

            {/* Avg Yield */}
            <div className="bg-gradient-to-br from-gray-600/30 to-gray-700/30 backdrop-blur-2xl rounded-2xl p-4 border border-gray-600/20">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <Percent className="w-4 h-4 text-purple-400" />
                </div>
                <div className="bg-purple-500/20 px-2 py-1 rounded-full">
                  <span className="text-purple-400 text-xs font-semibold">Premium</span>
                </div>
              </div>
              <div className="mb-1">
                <p className="text-white/60 text-xs font-medium">Avg Yield</p>
                <p className="text-white text-xl font-bold">{(marketData as any)?.avgYield ? (marketData as any).avgYield.toFixed(1) : '10.4'}%</p>
              </div>
            </div>

            {/* Assets */}
            <div className="bg-gradient-to-br from-gray-600/30 to-gray-700/30 backdrop-blur-2xl rounded-2xl p-4 border border-gray-600/20">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 bg-orange-500/20 rounded-xl flex items-center justify-center">
                  <Globe className="w-4 h-4 text-orange-400" />
                </div>
                <div className="bg-orange-500/20 px-2 py-1 rounded-full">
                  <span className="text-orange-400 text-xs font-semibold">Verified</span>
                </div>
              </div>
              <div className="mb-1">
                <p className="text-white/60 text-xs font-medium">Assets</p>
                <p className="text-white text-xl font-bold">{(marketData as any)?.activeTokens || '5'}</p>
              </div>
            </div>
          </div>

          {/* Market Trend */}
          <div className="bg-gradient-to-br from-gray-600/30 to-gray-700/30 backdrop-blur-2xl rounded-2xl p-4 border border-gray-600/20 mb-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-white/80 text-sm font-medium">Market Trend</p>
              <div className="bg-red-500/20 px-3 py-1 rounded-full">
                <span className="text-red-400 text-xs font-semibold">Bearish</span>
              </div>
            </div>
            <div className="relative h-2 bg-gray-700/50 rounded-full overflow-hidden">
              <div className="absolute left-0 top-0 h-full w-[35%] bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
            </div>
          </div>

          {/* Timeframe Selector */}
          <div className="flex space-x-2 mb-6">
            {['1H', '1D', '1W', '1M', '1Y'].map((timeframe) => (
              <button
                key={timeframe}
                onClick={() => setSelectedTimeframe(timeframe)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  selectedTimeframe === timeframe
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'bg-gray-700/50 text-white/60 hover:bg-gray-600/50 hover:text-white'
                }`}
              >
                {timeframe}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Navigation */}
        <TabNavigation />

        {/* Market Insights Section */}
        {activeTab === 'analytics' && (
          <div className="px-6 mb-6">
            <h3 className="text-xl font-bold text-white mb-4">Market Insights</h3>
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-2xl p-4 border border-green-500/30">
                <div className="w-10 h-10 bg-green-500/30 rounded-2xl flex items-center justify-center mb-3">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                </div>
                <p className="text-white font-semibold text-sm mb-1">Top Performer</p>
                <p className="text-white/60 text-xs">Real Estate tokens with 18% returns</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl p-4 border border-blue-500/30">
                <div className="w-10 h-10 bg-blue-500/30 rounded-2xl flex items-center justify-center mb-3">
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
                <p className="text-white font-semibold text-sm mb-1">Most Popular</p>
                <p className="text-white/60 text-xs">Gold tokens with 2.3k active investors</p>
              </div>
              <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl p-4 border border-orange-500/30">
                <div className="w-10 h-10 bg-orange-500/30 rounded-2xl flex items-center justify-center mb-3">
                  <Zap className="w-5 h-5 text-orange-400" />
                </div>
                <p className="text-white font-semibold text-sm mb-1">Trending</p>
                <p className="text-white/60 text-xs">Art tokens up 45% in volume</p>
              </div>
            </div>

            {/* AI Powered Cards */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-gray-600/30 to-gray-700/30 backdrop-blur-2xl rounded-2xl p-4 border border-gray-600/20">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Market Opportunity</h4>
                      <p className="text-white/60 text-sm">Commodity sector undervalued by 8.5%</p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-3 py-1.5 rounded-full border border-purple-500/30">
                    <span className="text-purple-300 text-xs font-semibold">AI Powered</span>
                  </div>
                </div>
                <button className="w-full bg-gray-700/50 hover:bg-gray-600/50 text-white font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2">
                  <span>Analyze</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-gradient-to-br from-gray-600/30 to-gray-700/30 backdrop-blur-2xl rounded-2xl p-4 border border-gray-600/20">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Risk Assessment</h4>
                      <p className="text-white/60 text-sm">Portfolio diversification score: 85%</p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-3 py-1.5 rounded-full border border-purple-500/30">
                    <span className="text-purple-300 text-xs font-semibold">AI Powered</span>
                  </div>
                </div>
                <button className="w-full bg-gray-700/50 hover:bg-gray-600/50 text-white font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2">
                  <span>Review</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-gradient-to-br from-gray-600/30 to-gray-700/30 backdrop-blur-2xl rounded-2xl p-4 border border-gray-600/20">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Yield Optimization</h4>
                      <p className="text-white/60 text-sm">Potential yield increase of 3.2%</p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-3 py-1.5 rounded-full border border-purple-500/30">
                    <span className="text-purple-300 text-xs font-semibold">AI Powered</span>
                  </div>
                </div>
                <button className="w-full bg-gray-700/50 hover:bg-gray-600/50 text-white font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2">
                  <span>Optimize</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content Based on Active Tab */}
        <div className="px-6 pb-20">
          {activeTab === 'marketplace' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Trending Assets</h2>
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 px-3 py-1.5 rounded-full border border-green-500/30">
                  <span className="text-green-300 text-xs font-semibold">
                    {Array.isArray(tokens) ? tokens.length : 0} Available
                  </span>
                </div>
              </div>
              {Array.isArray(tokens) && tokens.map((token: any) => (
                <TokenCard key={token.id} token={token} />
              ))}
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div>
              <PortfolioSummary />
              <div className="space-y-4">
                {Array.isArray(investments) && investments.map((investment: any) => (
                  <div key={investment.id} className="bg-gradient-to-br from-gray-600/30 to-gray-700/30 backdrop-blur-2xl rounded-2xl p-4 border border-gray-600/20">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-white">{investment.tokenName}</h3>
                        <p className="text-white/60 text-sm">{investment.tokenSymbol}</p>
                      </div>
                      <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 px-3 py-1.5 rounded-full border border-green-500/30">
                        <span className="text-green-300 text-xs font-semibold">Active</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-700/30 rounded-xl p-3">
                        <p className="text-white/60 text-xs mb-1">Invested</p>
                        <p className="text-white text-lg font-bold">₹{parseFloat(investment.totalInvested || 0).toLocaleString()}</p>
                      </div>
                      <div className="bg-gray-700/30 rounded-xl p-3">
                        <p className="text-white/60 text-xs mb-1">Current</p>
                        <p className="text-white text-lg font-bold">₹{parseFloat(investment.currentValue || 0).toLocaleString()}</p>
                      </div>
                      <div className="bg-gray-700/30 rounded-xl p-3">
                        <p className="text-white/60 text-xs mb-1">Tokens</p>
                        <p className="text-white text-lg font-bold">{parseFloat(investment.tokensOwned || 0).toFixed(2)}</p>
                      </div>
                      <div className="bg-gray-700/30 rounded-xl p-3">
                        <p className="text-white/60 text-xs mb-1">Yield</p>
                        <p className="text-green-400 text-lg font-bold">₹{parseFloat(investment.yieldEarned || 0).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'assets' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">My Assets</h2>
                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-3 py-1.5 rounded-full border border-blue-500/30">
                  <span className="text-blue-300 text-xs font-semibold">
                    {Array.isArray(assets) ? assets.length : 0} Assets
                  </span>
                </div>
              </div>
              {Array.isArray(assets) && assets.map((asset: any) => (
                <div key={asset.id} className="bg-gradient-to-br from-gray-600/30 to-gray-700/30 backdrop-blur-2xl rounded-2xl p-4 border border-gray-600/20">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-gray-700/50 to-gray-600/50 rounded-xl flex items-center justify-center border border-gray-600/20">
                        {getAssetIcon(asset.assetType, "w-5 h-5")}
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{asset.name}</h3>
                        <p className="text-white/60 text-sm">{asset.category}</p>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 px-3 py-1.5 rounded-full border border-green-500/30">
                      <span className="text-green-300 text-xs font-semibold">{asset.verificationStatus}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="bg-gray-700/30 rounded-xl p-3">
                      <p className="text-white/60 text-xs mb-1">Value</p>
                      <p className="text-white text-lg font-bold">₹{parseFloat(asset.value || 0).toLocaleString()}</p>
                    </div>
                    <div className="bg-gray-700/30 rounded-xl p-3">
                      <p className="text-white/60 text-xs mb-1">Location</p>
                      <p className="text-white text-sm">{asset.location}</p>
                    </div>
                  </div>
                  <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2">
                    <Eye className="w-4 h-4" />
                    <span>View Details</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}