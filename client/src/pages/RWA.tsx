import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, TrendingUp, Building, Car, Coins, Palette, FileText, Eye, ShoppingCart, BarChart3, Wallet, Target } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState<'marketplace' | 'portfolio' | 'assets'>('marketplace');

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

        {/* Tab Navigation */}
        <div className="flex bg-white/10 backdrop-blur-sm rounded-2xl p-1 mb-8">
          {[
            { id: 'marketplace', label: 'Marketplace', icon: ShoppingCart },
            { id: 'portfolio', label: 'Portfolio', icon: Wallet },
            { id: 'assets', label: 'My Assets', icon: Target }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl transition-all duration-300 ${
                activeTab === id
                  ? 'bg-white text-black font-semibold'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm">{label}</span>
            </button>
          ))}
        </div>

        {/* Marketplace Tab */}
        {activeTab === 'marketplace' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold mb-2">Investment Marketplace</h2>
              <p className="text-gray-400">Discover tokenized real-world assets</p>
            </div>

            <div className="grid gap-6">
              {tokens.map((token: any) => (
                <Card key={token.id} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {getAssetIcon(token.assetType || 'real_estate')}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-white truncate">
                            {token.tokenName}
                          </h3>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            {token.yieldRate}% APY
                          </Badge>
                        </div>
                        
                        <p className="text-gray-400 text-sm mb-4">{token.tokenSymbol}</p>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-gray-400 text-xs">Price per Token</p>
                            <p className="text-white font-semibold">₹{parseFloat(token.pricePerToken).toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-xs">Available Supply</p>
                            <p className="text-white font-semibold">{parseFloat(token.availableSupply).toLocaleString()}</p>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <div className="flex justify-between text-xs text-gray-400 mb-1">
                            <span>Liquidity</span>
                            <span>{((parseFloat(token.totalSupply) - parseFloat(token.availableSupply)) / parseFloat(token.totalSupply) * 100).toFixed(1)}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${((parseFloat(token.totalSupply) - parseFloat(token.availableSupply)) / parseFloat(token.totalSupply) * 100)}%` }}
                            />
                          </div>
                        </div>
                        
                        <div className="flex space-x-3">
                          <Button
                            onClick={() => handleTokenDetails(token.id)}
                            variant="outline"
                            className="flex-1 bg-transparent border-white/30 text-white hover:bg-white/10"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Details
                          </Button>
                          <Button
                            onClick={() => handleTokenInvest(token.id)}
                            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0"
                          >
                            <TrendingUp className="w-4 h-4 mr-2" />
                            Invest
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
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

        {/* Assets Tab */}
        {activeTab === 'assets' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold mb-2">My Assets</h2>
              <p className="text-gray-400">Manage your tokenized assets</p>
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