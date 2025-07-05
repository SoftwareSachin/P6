import { db } from "./db";
import { rwassets, rwaTokens, rwaInvestments, rwaTransactions, rwaMarketData } from "@shared/schema";

// RWA asset data
const rwaAssetData = [
  {
    userId: "dev-user-123",
    name: "Luxury Apartment Complex - Mumbai",
    description: "Prime commercial real estate in Bandra-Kurla Complex with 90% occupancy rate",
    assetType: "real_estate",
    category: "commercial",
    value: "5000000.00",
    location: "Mumbai, Maharashtra",
    imageUrl: "https://example.com/mumbai-complex.jpg",
    verificationStatus: "verified",
    tokenizationStatus: "tokenized"
  },
  {
    userId: "dev-user-123",
    name: "BMW X5 2024",
    description: "Luxury SUV with full insurance and maintenance history",
    assetType: "vehicle",
    category: "luxury_car",
    value: "8500000.00",
    location: "Bangalore, Karnataka",
    imageUrl: "https://example.com/bmw-x5.jpg",
    verificationStatus: "verified",
    tokenizationStatus: "tokenized"
  },
  {
    userId: "dev-user-123",
    name: "Gold Reserves - 10kg",
    description: "Physical gold stored in secure vaults with 99.99% purity",
    assetType: "commodity",
    category: "gold",
    value: "6000000.00",
    location: "Delhi, India",
    imageUrl: "https://example.com/gold-bars.jpg",
    verificationStatus: "verified",
    tokenizationStatus: "tokenized"
  },
  {
    userId: "dev-user-123",
    name: "Vintage Art Collection",
    description: "Curated collection of 18th century Indian paintings",
    assetType: "art",
    category: "vintage",
    value: "2500000.00",
    location: "Chennai, Tamil Nadu",
    imageUrl: "https://example.com/art-collection.jpg",
    verificationStatus: "verified",
    tokenizationStatus: "tokenized"
  },
  {
    userId: "dev-user-123",
    name: "Government Bonds Portfolio",
    description: "Diversified portfolio of Indian government bonds",
    assetType: "bonds",
    category: "government",
    value: "1000000.00",
    location: "Mumbai, Maharashtra",
    imageUrl: "https://example.com/bonds.jpg",
    verificationStatus: "verified",
    tokenizationStatus: "tokenized"
  }
];

// RWA token data
const rwaTokenData = [
  {
    assetId: 1,
    tokenSymbol: "REML",
    tokenName: "Real Estate Mumbai Luxury",
    totalSupply: "10000.00",
    availableSupply: "7500.00",
    pricePerToken: "500.00",
    minimumInvestment: "1000.00",
    yieldRate: "8.50",
    contractAddress: "0x1234567890abcdef1234567890abcdef12345678",
    tradingEnabled: true
  },
  {
    assetId: 2,
    tokenSymbol: "LUXV",
    tokenName: "Luxury Vehicle Token",
    totalSupply: "1000.00",
    availableSupply: "650.00",
    pricePerToken: "8500.00",
    minimumInvestment: "5000.00",
    yieldRate: "12.00",
    contractAddress: "0x2345678901bcdef12345678901bcdef123456789",
    tradingEnabled: true
  },
  {
    assetId: 3,
    tokenSymbol: "GOLD",
    tokenName: "Gold Reserve Token",
    totalSupply: "100.00",
    availableSupply: "78.00",
    pricePerToken: "60000.00",
    minimumInvestment: "10000.00",
    yieldRate: "6.75",
    contractAddress: "0x3456789012cdef123456789012cdef1234567890",
    tradingEnabled: true
  },
  {
    assetId: 4,
    tokenSymbol: "ARTV",
    tokenName: "Vintage Art Token",
    totalSupply: "500.00",
    availableSupply: "320.00",
    pricePerToken: "5000.00",
    minimumInvestment: "2500.00",
    yieldRate: "15.25",
    contractAddress: "0x456789013def123456789013def12345678901a",
    tradingEnabled: true
  },
  {
    assetId: 5,
    tokenSymbol: "GBND",
    tokenName: "Government Bond Token",
    totalSupply: "20000.00",
    availableSupply: "15000.00",
    pricePerToken: "50.00",
    minimumInvestment: "500.00",
    yieldRate: "7.20",
    contractAddress: "0x56789014ef123456789014ef12345678901ab",
    tradingEnabled: true
  }
];

// Sample investment data
const rwaInvestmentData = [
  {
    userId: "dev-user-123",
    tokenId: 1,
    tokensOwned: "5.00",
    totalInvested: "2500.00",
    currentValue: "2750.00",
    yieldEarned: "125.50"
  },
  {
    userId: "dev-user-123",
    tokenId: 3,
    tokensOwned: "2.00",
    totalInvested: "120000.00",
    currentValue: "125000.00",
    yieldEarned: "3200.00"
  },
  {
    userId: "dev-user-123",
    tokenId: 5,
    tokensOwned: "50.00",
    totalInvested: "2500.00",
    currentValue: "2650.00",
    yieldEarned: "89.75"
  }
];

// Market data for tokens
const rwaMarketDataSeeds = [
  {
    tokenId: 1,
    price: "550.00",
    volume24h: "125000.00",
    priceChange24h: "5.25",
    marketCap: "5500000.00",
    liquidity: "450000.00"
  },
  {
    tokenId: 2,
    price: "8750.00",
    volume24h: "2500000.00",
    priceChange24h: "2.94",
    marketCap: "8750000.00",
    liquidity: "1250000.00"
  },
  {
    tokenId: 3,
    price: "62500.00",
    volume24h: "4500000.00",
    priceChange24h: "4.17",
    marketCap: "6250000.00",
    liquidity: "2800000.00"
  },
  {
    tokenId: 4,
    price: "5250.00",
    volume24h: "850000.00",
    priceChange24h: "5.00",
    marketCap: "2625000.00",
    liquidity: "380000.00"
  },
  {
    tokenId: 5,
    price: "53.00",
    volume24h: "650000.00",
    priceChange24h: "6.00",
    marketCap: "1060000.00",
    liquidity: "85000.00"
  }
];

export async function seedRWAData() {
  try {
    console.log("🚀 Starting RWA data seeding...");

    // Clear existing data
    console.log("🧹 Clearing existing RWA data...");
    await db.delete(rwaMarketData);
    await db.delete(rwaTransactions);
    await db.delete(rwaInvestments);
    await db.delete(rwaTokens);
    await db.delete(rwassets);

    // Seed RWA assets
    console.log("🏢 Seeding RWA assets...");
    await db.insert(rwassets).values(rwaAssetData);

    // Seed RWA tokens
    console.log("🪙 Seeding RWA tokens...");
    await db.insert(rwaTokens).values(rwaTokenData);

    // Seed RWA investments
    console.log("📈 Seeding RWA investments...");
    await db.insert(rwaInvestments).values(rwaInvestmentData);

    // Seed RWA market data
    console.log("📊 Seeding RWA market data...");
    await db.insert(rwaMarketData).values(rwaMarketData);

    console.log("✅ RWA data seeding completed successfully!");
    console.log(`📊 Assets: ${rwaAssetData.length}`);
    console.log(`🪙 Tokens: ${rwaTokenData.length}`);
    console.log(`📈 Investments: ${rwaInvestmentData.length}`);
    console.log(`📊 Market Data: ${rwaMarketDataSeeds.length}`);

  } catch (error) {
    console.error("❌ Error seeding RWA data:", error);
    throw error;
  }
}

// Run seeding if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedRWAData()
    .then(() => {
      console.log("🎉 RWA seeding completed!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("💥 RWA seeding failed:", error);
      process.exit(1);
    });
}