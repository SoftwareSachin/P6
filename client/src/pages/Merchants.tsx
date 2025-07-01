import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BottomNavigation } from "@/components/BottomNavigation";
import { ArrowLeft, Search, MapPin, Clock } from "lucide-react";
import { Link } from "wouter";
import { ApplePayMerchantSVG, ApplePayQRCodeSVG, ApplePayContactlessSVG } from "@/components/ApplePaySVGs";
import { 
  CoffeeSVG, 
  BurgerSVG, 
  SmartphoneSVG, 
  ShoppingCartSVG, 
  ClothingSVG, 
  CinemaSVG, 
  StoreSVG,
  CategoryAllSVG,
  OpenStatusSVG,
  ClosedStatusSVG,
  OfflinePaymentSVG,
  PremiumStarSVG
} from "@/components/PremiumMerchantSVGs";

interface Merchant {
  id: number;
  name: string;
  category: string;
  distance: string;
  rating: number;
  isOpen: boolean;
  acceptsOffline: boolean;
  offers: string[];
  icon: React.ComponentType<{className?: string}>;
  address: string;
  estimatedTime: string;
  categoryType: string;
}

export default function Merchants() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [merchants, setMerchants] = useState<Merchant[]>([]);

  useEffect(() => {
    // Mock merchants data - in real app, this would come from API
    setMerchants([
      {
        id: 1,
        name: "Starbucks Coffee",
        category: "Food & Beverage",
        categoryType: "food",
        distance: "0.2 km",
        rating: 4.5,
        isOpen: true,
        acceptsOffline: true,
        offers: ["20% off", "Free Wi-Fi"],
        icon: CoffeeSVG,
        address: "Phoenix MarketCity, Kurla",
        estimatedTime: "2 min walk"
      },
      {
        id: 2,
        name: "McDonald's",
        category: "Food & Beverage", 
        categoryType: "food",
        distance: "0.5 km",
        rating: 4.2,
        isOpen: true,
        acceptsOffline: false,
        offers: ["Buy 1 Get 1", "App exclusive"],
        icon: BurgerSVG,
        address: "R City Mall, Ghatkopar",
        estimatedTime: "5 min walk"
      },
      {
        id: 3,
        name: "Reliance Digital",
        category: "Electronics",
        categoryType: "electronics",
        distance: "0.8 km",
        rating: 4.3,
        isOpen: true,
        acceptsOffline: true,
        offers: ["Flat ₹500 off", "No cost EMI"],
        icon: SmartphoneSVG,
        address: "Infinity Mall, Malad",
        estimatedTime: "8 min walk"
      },
      {
        id: 4,
        name: "Big Bazaar",
        category: "Grocery",
        categoryType: "grocery",
        distance: "1.2 km",
        rating: 4.0,
        isOpen: false,
        acceptsOffline: true,
        offers: ["Weekend Sale", "Extra 10%"],
        icon: ShoppingCartSVG,
        address: "Hypercity Mall, Thane",
        estimatedTime: "12 min walk"
      },
      {
        id: 5,
        name: "PVR Cinemas",
        category: "Entertainment",
        categoryType: "entertainment",
        distance: "0.3 km",
        rating: 4.6,
        isOpen: true,
        acceptsOffline: false,
        offers: ["Book any show", "Combo offers"],
        icon: CinemaSVG,
        address: "Palladium Mall, Lower Parel",
        estimatedTime: "3 min walk"
      },
      {
        id: 6,
        name: "Shoppers Stop",
        category: "Fashion",
        categoryType: "fashion",
        distance: "0.7 km",
        rating: 4.4,
        isOpen: true,
        acceptsOffline: true,
        offers: ["Flat 40% off", "Extra 20%"],
        icon: ClothingSVG,
        address: "Linking Road, Bandra",
        estimatedTime: "7 min walk"
      }
    ]);
  }, []);

  const categories = [
    { id: "all", name: "All", icon: CategoryAllSVG },
    { id: "food", name: "Food", icon: CoffeeSVG },
    { id: "electronics", name: "Tech", icon: SmartphoneSVG },
    { id: "grocery", name: "Grocery", icon: ShoppingCartSVG },
    { id: "fashion", name: "Fashion", icon: ClothingSVG },
    { id: "entertainment", name: "Fun", icon: CinemaSVG }
  ];

  const filteredMerchants = merchants.filter(merchant => {
    const matchesSearch = merchant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         merchant.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || 
                           merchant.category.toLowerCase().includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-black/30 border-b border-white/10">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20">
                <ArrowLeft className="h-5 w-5 text-white" />
              </Button>
            </Link>
            <div>
              <h1 
                className="text-2xl font-bold text-white leading-tight tracking-tight"
                style={{ 
                  fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                  textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                }}
              >
                Nearby Merchants
              </h1>
              <p 
                className="text-sm font-medium text-gray-400 mt-1"
                style={{ fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}
              >
                Discover & pay at stores near you
              </p>
            </div>
          </div>
          <ApplePayMerchantSVG className="w-8 h-8 text-blue-400" />
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search merchants, categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-4 py-4 bg-white/10 border-white/20 text-white placeholder-gray-400 rounded-2xl backdrop-blur-xl focus:bg-white/15 focus:border-blue-400/50"
            style={{ fontFamily: 'SF Pro Text, system-ui' }}
          />
        </div>

        {/* Category Filter */}
        <div className="flex space-x-3 overflow-x-auto hide-scrollbar">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex-shrink-0 rounded-full px-6 py-3 transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                }`}
                style={{ fontFamily: 'SF Pro Text, system-ui' }}
              >
                <IconComponent className="w-4 h-4 mr-2" />
                {category.name}
              </Button>
            );
          })}
        </div>

        {/* Merchants Grid */}
        <div className="space-y-4">
          {filteredMerchants.map((merchant, index) => (
            <Card
              key={merchant.id}
              className="ultra-premium-merchant-card border-0 overflow-hidden cursor-pointer"
              style={{
                background: `
                  linear-gradient(135deg, 
                    rgba(255,255,255,0.12) 0%, 
                    rgba(255,255,255,0.06) 50%, 
                    rgba(255,255,255,0.04) 100%
                  )
                `,
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.15)',
                animationDelay: `${index * 0.1}s`
              }}
            >
              <CardContent className="p-5">
                <div className="flex items-start space-x-4">
                  {/* Merchant Avatar */}
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))',
                      border: '1px solid rgba(255,255,255,0.2)'
                    }}
                  >
                    <merchant.icon className="w-8 h-8" />
                  </div>

                  {/* Merchant Info */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <h3 
                          className="text-xl font-bold text-white leading-tight tracking-tight"
                          style={{ 
                            fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                            textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                          }}
                        >
                          {merchant.name}
                        </h3>
                        <div className="flex items-center space-x-3">
                          <p 
                            className="text-sm font-medium text-gray-300"
                            style={{ fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}
                          >
                            {merchant.category}
                          </p>
                          <div className="flex items-center space-x-1">
                            {merchant.isOpen ? (
                              <OpenStatusSVG className="w-4 h-4" />
                            ) : (
                              <ClosedStatusSVG className="w-4 h-4" />
                            )}
                            <Badge
                              className={`text-xs font-semibold px-3 py-1 rounded-full ${
                                merchant.isOpen 
                                  ? 'bg-green-500/20 text-green-400 border border-green-400/30' 
                                  : 'bg-red-500/20 text-red-400 border border-red-400/30'
                              }`}
                              style={{ fontFamily: 'SF Pro Text, system-ui' }}
                            >
                              {merchant.isOpen ? 'Open' : 'Closed'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 mb-1">
                          <PremiumStarSVG className="h-4 w-4" filled={true} />
                          <span className="text-sm font-medium text-white" style={{ fontFamily: 'SF Pro Display, system-ui' }}>
                            {merchant.rating}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400" style={{ fontFamily: 'SF Pro Text, system-ui' }}>
                          {merchant.distance}
                        </p>
                      </div>
                    </div>

                    {/* Address & Time */}
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{merchant.address}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{merchant.estimatedTime}</span>
                      </div>
                    </div>

                    {/* Offers */}
                    <div className="flex items-center space-x-2">
                      {merchant.offers.map((offer, idx) => (
                        <Badge
                          key={idx}
                          className="bg-blue-500/20 text-blue-400 text-xs border-blue-400/30"
                        >
                          {offer}
                        </Badge>
                      ))}
                    </div>

                    {/* Ultra-Premium Action Buttons */}
                    <div className="flex items-center space-x-3 mt-6">
                      <Button
                        size="sm"
                        className="flex-1 h-12 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95"
                        style={{
                          background: 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
                          boxShadow: '0 4px 16px rgba(0, 122, 255, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
                          fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
                        }}
                      >
                        <ApplePayQRCodeSVG className="w-5 h-5 mr-2" />
                        Pay Now
                      </Button>
                      {merchant.acceptsOffline && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-12 px-6 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95"
                          style={{
                            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1))',
                            border: '1px solid rgba(16, 185, 129, 0.3)',
                            color: '#10b981',
                            fontFamily: 'SF Pro Text, system-ui'
                          }}
                        >
                          <OfflinePaymentSVG className="w-4 h-4 mr-2" />
                          Offline
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMerchants.length === 0 && (
          <div className="text-center py-16">
            <div 
              className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              <Search className="h-10 w-10 text-gray-400" />
            </div>
            <h3 
              className="text-2xl font-bold text-white mb-3 tracking-tight"
              style={{ 
                fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                textShadow: '0 1px 2px rgba(0,0,0,0.3)'
              }}
            >
              No merchants found
            </h3>
            <p 
              className="text-gray-400 text-lg font-medium"
              style={{ fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}
            >
              Try adjusting your search or category filter
            </p>
          </div>
        )}
      </div>

      <div className="pb-24" />
      <BottomNavigation activeTab="merchants" />
    </div>
  );
}