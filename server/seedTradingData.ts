import { db } from "./db";
import {
  stocks,
  stockPrices,
  marketIndices,
  mutualFunds,
  portfolios,
  holdings,
  watchlists,
  watchlistItems,
  tradingAccounts,
} from "@shared/schema";

// Indian stocks data
const indianStocks = [
  {
    symbol: "RELIANCE",
    name: "Reliance Industries Limited",
    exchange: "NSE",
    sector: "Oil & Gas",
    industry: "Petrochemicals",
    marketCap: "1850000000000",
    peRatio: "25.30",
    pbRatio: "2.80",
    dividendYield: "0.35",
    week52High: "3000.00",
    week52Low: "2200.00",
    avgVolume: "5000000",
    beta: "1.15",
    eps: "95.50",
    description: "India's largest private sector company, engaged in petrochemicals, oil & gas, telecommunications and retail",
    website: "https://www.ril.com",
    isActive: true
  },
  {
    symbol: "TCS",
    name: "Tata Consultancy Services",
    exchange: "NSE",
    sector: "Information Technology",
    industry: "IT Services",
    marketCap: "1250000000000",
    peRatio: "28.50",
    pbRatio: "12.40",
    dividendYield: "1.20",
    week52High: "4200.00",
    week52Low: "3200.00",
    avgVolume: "3000000",
    beta: "0.85",
    eps: "125.30",
    description: "Leading global IT services, consulting and business solutions organization",
    website: "https://www.tcs.com",
    isActive: true
  },
  {
    symbol: "INFY",
    name: "Infosys Limited",
    exchange: "NSE",
    sector: "Information Technology",
    industry: "IT Services",
    marketCap: "750000000000",
    peRatio: "26.80",
    pbRatio: "8.20",
    dividendYield: "2.40",
    week52High: "1900.00",
    week52Low: "1400.00",
    avgVolume: "4500000",
    beta: "0.90",
    eps: "68.20",
    description: "Global leader in next-generation digital services and consulting",
    website: "https://www.infosys.com",
    isActive: true
  },
  {
    symbol: "HDFCBANK",
    name: "HDFC Bank Limited",
    exchange: "NSE",
    sector: "Banking",
    industry: "Private Banks",
    marketCap: "900000000000",
    peRatio: "20.50",
    pbRatio: "3.80",
    dividendYield: "1.00",
    week52High: "1750.00",
    week52Low: "1350.00",
    avgVolume: "6000000",
    beta: "1.20",
    eps: "82.40",
    description: "India's largest private sector bank",
    website: "https://www.hdfcbank.com",
    isActive: true
  },
  {
    symbol: "ICICIBANK",
    name: "ICICI Bank Limited",
    exchange: "NSE",
    sector: "Banking",
    industry: "Private Banks",
    marketCap: "750000000000",
    peRatio: "18.20",
    pbRatio: "2.90",
    dividendYield: "0.80",
    week52High: "1200.00",
    week52Low: "850.00",
    avgVolume: "8000000",
    beta: "1.30",
    eps: "58.60",
    description: "Leading private sector bank in India",
    website: "https://www.icicibank.com",
    isActive: true
  },
  {
    symbol: "HINDUNILVR",
    name: "Hindustan Unilever Limited",
    exchange: "NSE",
    sector: "Consumer Goods",
    industry: "FMCG",
    marketCap: "560000000000",
    peRatio: "65.20",
    pbRatio: "12.80",
    dividendYield: "1.50",
    week52High: "2800.00",
    week52Low: "2200.00",
    avgVolume: "1500000",
    beta: "0.60",
    eps: "42.30",
    description: "Leading FMCG company in India",
    website: "https://www.hul.co.in",
    isActive: true
  },
  {
    symbol: "ITC",
    name: "ITC Limited",
    exchange: "NSE",
    sector: "Consumer Goods",
    industry: "Tobacco & Cigarettes",
    marketCap: "520000000000",
    peRatio: "22.40",
    pbRatio: "5.60",
    dividendYield: "4.20",
    week52High: "480.00",
    week52Low: "380.00",
    avgVolume: "7000000",
    beta: "0.75",
    eps: "18.50",
    description: "Diversified conglomerate with businesses in FMCG, hotels, paperboards & packaging, agri-business and IT",
    website: "https://www.itcportal.com",
    isActive: true
  },
  {
    symbol: "SBIN",
    name: "State Bank of India",
    exchange: "NSE",
    sector: "Banking",
    industry: "Public Banks",
    marketCap: "480000000000",
    peRatio: "12.80",
    pbRatio: "1.20",
    dividendYield: "1.80",
    week52High: "650.00",
    week52Low: "450.00",
    avgVolume: "12000000",
    beta: "1.50",
    eps: "42.80",
    description: "India's largest public sector bank",
    website: "https://www.sbi.co.in",
    isActive: true
  },
  {
    symbol: "BAJFINANCE",
    name: "Bajaj Finance Limited",
    exchange: "NSE",
    sector: "Financial Services",
    industry: "Non-Banking Financial Company",
    marketCap: "420000000000",
    peRatio: "32.50",
    pbRatio: "5.80",
    dividendYield: "0.40",
    week52High: "8200.00",
    week52Low: "6200.00",
    avgVolume: "2000000",
    beta: "1.40",
    eps: "220.30",
    description: "Leading non-banking financial company in India",
    website: "https://www.bajajfinserv.in",
    isActive: true
  },
  {
    symbol: "WIPRO",
    name: "Wipro Limited",
    exchange: "NSE",
    sector: "Information Technology",
    industry: "IT Services",
    marketCap: "320000000000",
    peRatio: "24.60",
    pbRatio: "3.20",
    dividendYield: "1.80",
    week52High: "650.00",
    week52Low: "480.00",
    avgVolume: "3500000",
    beta: "0.95",
    eps: "22.80",
    description: "Global IT services company specializing in consulting, technology and outsourcing",
    website: "https://www.wipro.com",
    isActive: true
  },
  {
    symbol: "MARUTI",
    name: "Maruti Suzuki India Limited",
    exchange: "NSE",
    sector: "Automotive",
    industry: "Passenger Cars",
    marketCap: "350000000000",
    peRatio: "28.90",
    pbRatio: "4.20",
    dividendYield: "1.20",
    week52High: "12500.00",
    week52Low: "9200.00",
    avgVolume: "800000",
    beta: "1.10",
    eps: "325.60",
    description: "India's largest passenger car manufacturer",
    website: "https://www.marutisuzuki.com",
    isActive: true
  },
  {
    symbol: "ASIANPAINT",
    name: "Asian Paints Limited",
    exchange: "NSE",
    sector: "Consumer Goods",
    industry: "Paints",
    marketCap: "290000000000",
    peRatio: "58.40",
    pbRatio: "18.20",
    dividendYield: "0.80",
    week52High: "3600.00",
    week52Low: "2800.00",
    avgVolume: "1200000",
    beta: "0.70",
    eps: "56.80",
    description: "India's largest paint company",
    website: "https://www.asianpaints.com",
    isActive: true
  }
];

// Market indices data
const indianIndices = [
  {
    name: "NIFTY 50",
    symbol: "NIFTY50",
    exchange: "NSE",
    currentValue: "21800.00",
    change: "150.30",
    changePercent: "0.69",
    open: "21750.00",
    high: "21880.00",
    low: "21720.00",
    previousClose: "21649.70",
    volume: "0",
    isActive: true
  },
  {
    name: "SENSEX",
    symbol: "SENSEX",
    exchange: "BSE",
    currentValue: "72500.00",
    change: "485.20",
    changePercent: "0.67",
    open: "72200.00",
    high: "72650.00",
    low: "72150.00",
    previousClose: "72014.80",
    volume: "0",
    isActive: true
  },
  {
    name: "NIFTY BANK",
    symbol: "BANKNIFTY",
    exchange: "NSE",
    currentValue: "48200.00",
    change: "320.50",
    changePercent: "0.67",
    open: "48000.00",
    high: "48350.00",
    low: "47950.00",
    previousClose: "47879.50",
    volume: "0",
    isActive: true
  },
  {
    name: "NIFTY IT",
    symbol: "NIFTYIT",
    exchange: "NSE",
    currentValue: "35800.00",
    change: "-180.30",
    changePercent: "-0.50",
    open: "36000.00",
    high: "36100.00",
    low: "35750.00",
    previousClose: "35980.30",
    volume: "0",
    isActive: true
  }
];

// Mutual funds data
const indianMutualFunds = [
  {
    schemeCode: "120503",
    schemeName: "SBI Bluechip Fund Direct Growth",
    fundHouse: "SBI Mutual Fund",
    category: "Equity",
    subCategory: "Large Cap",
    nav: "68.85",
    navDate: new Date(),
    aum: "25000000000",
    expenseRatio: "0.95",
    minInvestment: "5000.00",
    minSip: "1000.00",
    exitLoad: "1.00",
    returns1Y: "18.50",
    returns3Y: "16.20",
    returns5Y: "14.80",
    riskLevel: "moderate",
    isActive: true
  },
  {
    schemeCode: "119551",
    schemeName: "HDFC Top 100 Fund Direct Growth",
    fundHouse: "HDFC Mutual Fund",
    category: "Equity",
    subCategory: "Large Cap",
    nav: "825.40",
    navDate: new Date(),
    aum: "18000000000",
    expenseRatio: "1.05",
    minInvestment: "5000.00",
    minSip: "1000.00",
    exitLoad: "1.00",
    returns1Y: "17.80",
    returns3Y: "15.90",
    returns5Y: "14.20",
    riskLevel: "moderate",
    isActive: true
  },
  {
    schemeCode: "120716",
    schemeName: "ICICI Prudential Technology Fund Direct Growth",
    fundHouse: "ICICI Prudential Mutual Fund",
    category: "Equity",
    subCategory: "Sectoral/Thematic",
    nav: "156.30",
    navDate: new Date(),
    aum: "8500000000",
    expenseRatio: "1.25",
    minInvestment: "5000.00",
    minSip: "1000.00",
    exitLoad: "1.00",
    returns1Y: "25.60",
    returns3Y: "22.40",
    returns5Y: "18.90",
    riskLevel: "high",
    isActive: true
  },
  {
    schemeCode: "118989",
    schemeName: "Axis Bluechip Fund Direct Growth",
    fundHouse: "Axis Mutual Fund",
    category: "Equity",
    subCategory: "Large Cap",
    nav: "45.20",
    navDate: new Date(),
    aum: "12000000000",
    expenseRatio: "1.15",
    minInvestment: "5000.00",
    minSip: "1000.00",
    exitLoad: "1.00",
    returns1Y: "19.20",
    returns3Y: "16.80",
    returns5Y: "15.10",
    riskLevel: "moderate",
    isActive: true
  },
  {
    schemeCode: "120716",
    schemeName: "Mirae Asset Large Cap Fund Direct Growth",
    fundHouse: "Mirae Asset Mutual Fund",
    category: "Equity",
    subCategory: "Large Cap",
    nav: "98.75",
    navDate: new Date(),
    aum: "15500000000",
    expenseRatio: "0.85",
    minInvestment: "5000.00",
    minSip: "1000.00",
    exitLoad: "1.00",
    returns1Y: "20.10",
    returns3Y: "17.50",
    returns5Y: "15.80",
    riskLevel: "moderate",
    isActive: true
  }
];

function generateStockPrice(basePrice: number, volatility: number = 0.02) {
  const change = (Math.random() - 0.5) * 2 * volatility;
  const price = basePrice * (1 + change);
  const open = price * (1 + (Math.random() - 0.5) * 0.01);
  const high = price * (1 + Math.random() * 0.02);
  const low = price * (1 - Math.random() * 0.02);
  const volume = Math.floor(Math.random() * 10000000) + 1000000;
  const changeAmount = price - basePrice;
  const changePercent = (changeAmount / basePrice) * 100;

  return {
    price: price.toFixed(2),
    open: open.toFixed(2),
    high: high.toFixed(2),
    low: low.toFixed(2),
    volume: volume.toString(),
    change: changeAmount.toFixed(2),
    changePercent: changePercent.toFixed(2),
    marketStatus: "open"
  };
}

export async function seedTradingData() {
  console.log("Seeding trading data...");

  try {
    // Seed market indices
    console.log("Seeding market indices...");
    for (const index of indianIndices) {
      await db.insert(marketIndices).values(index).onConflictDoNothing();
    }

    // Seed stocks
    console.log("Seeding stocks...");
    const stockIds: number[] = [];
    for (const stock of indianStocks) {
      const [insertedStock] = await db.insert(stocks).values(stock).onConflictDoNothing().returning({ id: stocks.id });
      if (insertedStock) {
        stockIds.push(insertedStock.id);
      }
    }

    // Seed stock prices
    console.log("Seeding stock prices...");
    for (let i = 0; i < stockIds.length; i++) {
      const stockId = stockIds[i];
      const basePrice = parseFloat(indianStocks[i].week52High) * 0.85; // Price around 85% of 52-week high
      const priceData = generateStockPrice(basePrice);
      
      await db.insert(stockPrices).values({
        stockId,
        ...priceData
      }).onConflictDoNothing();
    }

    // Seed mutual funds
    console.log("Seeding mutual funds...");
    for (const fund of indianMutualFunds) {
      await db.insert(mutualFunds).values(fund).onConflictDoNothing();
    }

    // Create default portfolio for dev user
    console.log("Creating default portfolio...");
    const [portfolio] = await db.insert(portfolios).values({
      userId: "dev-user-123",
      name: "My Investment Portfolio",
      type: "equity",
      totalValue: "50000.00",
      totalInvestment: "45000.00",
      totalPnl: "5000.00",
      totalPnlPercent: "11.11",
      isDefault: true
    }).onConflictDoNothing().returning();

    // Add some sample holdings if portfolio was created
    if (portfolio && stockIds.length > 0) {
      console.log("Adding sample holdings...");
      const sampleHoldings = [
        {
          portfolioId: portfolio.id,
          userId: "dev-user-123",
          stockId: stockIds[0], // RELIANCE
          quantity: "10.00",
          avgPrice: "2450.00",
          currentPrice: "2580.00",
          investment: "24500.00",
          currentValue: "25800.00",
          pnl: "1300.00",
          pnlPercent: "5.31"
        },
        {
          portfolioId: portfolio.id,
          userId: "dev-user-123",
          stockId: stockIds[1], // TCS
          quantity: "5.00",
          avgPrice: "3800.00",
          currentPrice: "3950.00",
          investment: "19000.00",
          currentValue: "19750.00",
          pnl: "750.00",
          pnlPercent: "3.95"
        }
      ];

      for (const holding of sampleHoldings) {
        await db.insert(holdings).values(holding).onConflictDoNothing();
      }
    }

    // Create default watchlist
    console.log("Creating default watchlist...");
    const [watchlist] = await db.insert(watchlists).values({
      userId: "dev-user-123",
      name: "My Watchlist",
      isDefault: true
    }).onConflictDoNothing().returning();

    // Add some stocks to watchlist
    if (watchlist && stockIds.length > 0) {
      console.log("Adding stocks to watchlist...");
      for (let i = 0; i < Math.min(5, stockIds.length); i++) {
        await db.insert(watchlistItems).values({
          watchlistId: watchlist.id,
          stockId: stockIds[i],
          isAlertEnabled: false
        }).onConflictDoNothing();
      }
    }

    // Create sample trading account
    console.log("Creating sample trading account...");
    await db.insert(tradingAccounts).values({
      userId: "dev-user-123",
      brokerId: "zerodha",
      brokerName: "Zerodha",
      accountId: "ZR123456",
      accountType: "INDIVIDUAL",
      segment: "EQUITY",
      status: "active",
      availableBalance: "75000.00",
      utilizedBalance: "25000.00",
      totalBalance: "100000.00",
      exposureLimit: "200000.00",
      dayTradingLimit: "150000.00",
      isLinked: true
    }).onConflictDoNothing();

    console.log("Trading data seeded successfully!");

  } catch (error) {
    console.error("Error seeding trading data:", error);
    throw error;
  }
}

// Export for direct execution
export default seedTradingData;