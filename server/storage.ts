import {
  users,
  transactions,
  paymentRequests,
  merchants,
  offlineDevices,
  bankAccounts,
  otpVerifications,
  offlinePaymentSessions,
  rwassets,
  rwaTokens,
  rwaInvestments,
  rwaTransactions,
  rwaMarketData,
  stocks,
  stockPrices,
  portfolios,
  holdings,
  orders,
  watchlists,
  watchlistItems,
  tradingAccounts,
  marketIndices,
  mutualFunds,
  mfHoldings,
  type User,
  type UpsertUser,
  type Transaction,
  type InsertTransaction,
  type PaymentRequest,
  type InsertPaymentRequest,
  type Merchant,
  type OfflineDevice,
  type BankAccount,
  type InsertOtpVerification,
  type OtpVerification,
  type InsertOfflinePaymentSession,
  type OfflinePaymentSession,
  type RWAsset,
  type InsertRWAsset,
  type RWAToken,
  type InsertRWAToken,
  type RWAInvestment,
  type InsertRWAInvestment,
  type RWATransaction,
  type InsertRWATransaction,
  type RWAMarketData,
  type InsertRWAMarketData,
  type Stock,
  type InsertStock,
  type StockPrice,
  type InsertStockPrice,
  type Portfolio,
  type InsertPortfolio,
  type Holding,
  type InsertHolding,
  type Order,
  type InsertOrder,
  type Watchlist,
  type InsertWatchlist,
  type WatchlistItem,
  type InsertWatchlistItem,
  type TradingAccount,
  type InsertTradingAccount,
  type MarketIndex,
  type InsertMarketIndex,
  type MutualFund,
  type InsertMutualFund,
  type MfHolding,
  type InsertMfHolding,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, or, like, gt, lt, sql } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Balance operations
  addBalance(userId: string, amount: number): Promise<void>;
  updateBalance(userId: string, newBalance: number): Promise<void>;
  
  // Transaction operations
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  getTransaction(id: number): Promise<Transaction | undefined>;
  getUserTransactions(userId: string, limit: number, offset: number): Promise<Transaction[]>;
  
  // Merchant operations
  getMerchants(): Promise<Merchant[]>;
  getMerchant(id: number): Promise<Merchant | undefined>;
  
  // Payment request operations
  getPaymentRequests(userId: string): Promise<PaymentRequest[]>;
  createPaymentRequest(request: InsertPaymentRequest): Promise<PaymentRequest>;
  
  // Offline payment operations
  getOfflineDevices(limit?: number, offset?: number): Promise<OfflineDevice[]>;
  getOfflineDevice(deviceId: string): Promise<OfflineDevice | undefined>;
  getBankAccountsByDevice(deviceId: string): Promise<BankAccount[]>;
  createOtpVerification(otp: InsertOtpVerification): Promise<OtpVerification>;
  verifyOtp(fromDeviceId: string, toDeviceId: string, otpCode: string): Promise<boolean>;
  createPaymentSession(session: InsertOfflinePaymentSession): Promise<OfflinePaymentSession>;
  updatePaymentSession(sessionId: string, updates: Partial<OfflinePaymentSession>): Promise<void>;
  getPaymentSession(sessionId: string): Promise<OfflinePaymentSession | undefined>;
  
  // RWA operations
  getRWAssets(userId: string): Promise<RWAsset[]>;
  createRWAsset(asset: InsertRWAsset): Promise<RWAsset>;
  updateRWAsset(assetId: number, updates: Partial<RWAsset>): Promise<void>;
  getRWATokens(limit?: number, offset?: number): Promise<RWAToken[]>;
  getRWAToken(tokenId: number): Promise<RWAToken | undefined>;
  createRWAToken(token: InsertRWAToken): Promise<RWAToken>;
  getRWAInvestments(userId: string): Promise<RWAInvestment[]>;
  createRWAInvestment(investment: InsertRWAInvestment): Promise<RWAInvestment>;
  updateRWAInvestment(investmentId: number, updates: Partial<RWAInvestment>): Promise<void>;
  createRWATransaction(transaction: InsertRWATransaction): Promise<RWATransaction>;
  getRWATransactions(userId: string): Promise<RWATransaction[]>;
  updateRWAMarketData(marketData: InsertRWAMarketData): Promise<void>;
  getRWAMarketData(tokenId: number): Promise<RWAMarketData | undefined>;
  
  // Stock trading operations
  getStocks(limit?: number, offset?: number): Promise<Stock[]>;
  getStock(stockId: number): Promise<Stock | undefined>;
  getStockBySymbol(symbol: string): Promise<Stock | undefined>;
  createStock(stock: InsertStock): Promise<Stock>;
  updateStock(stockId: number, updates: Partial<Stock>): Promise<void>;
  searchStocks(query: string, limit?: number): Promise<Stock[]>;
  
  // Stock price operations
  getStockPrice(stockId: number): Promise<StockPrice | undefined>;
  getStockPrices(stockId: number, limit?: number): Promise<StockPrice[]>;
  createStockPrice(stockPrice: InsertStockPrice): Promise<StockPrice>;
  updateStockPrice(stockId: number, updates: Partial<StockPrice>): Promise<void>;
  
  // Portfolio operations
  getPortfolios(userId: string): Promise<Portfolio[]>;
  getPortfolio(portfolioId: number): Promise<Portfolio | undefined>;
  createPortfolio(portfolio: InsertPortfolio): Promise<Portfolio>;
  updatePortfolio(portfolioId: number, updates: Partial<Portfolio>): Promise<void>;
  deletePortfolio(portfolioId: number): Promise<void>;
  
  // Holdings operations
  getHoldings(portfolioId: number): Promise<Holding[]>;
  getHolding(holdingId: number): Promise<Holding | undefined>;
  createHolding(holding: InsertHolding): Promise<Holding>;
  updateHolding(holdingId: number, updates: Partial<Holding>): Promise<void>;
  deleteHolding(holdingId: number): Promise<void>;
  
  // Order operations
  getOrders(userId: string, limit?: number, offset?: number): Promise<Order[]>;
  getOrder(orderId: string): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrder(orderId: string, updates: Partial<Order>): Promise<void>;
  cancelOrder(orderId: string): Promise<void>;
  
  // Watchlist operations
  getWatchlists(userId: string): Promise<Watchlist[]>;
  getWatchlist(watchlistId: number): Promise<Watchlist | undefined>;
  createWatchlist(watchlist: InsertWatchlist): Promise<Watchlist>;
  updateWatchlist(watchlistId: number, updates: Partial<Watchlist>): Promise<void>;
  deleteWatchlist(watchlistId: number): Promise<void>;
  
  // Watchlist items operations
  getWatchlistItems(watchlistId: number): Promise<WatchlistItem[]>;
  addToWatchlist(watchlistItem: InsertWatchlistItem): Promise<WatchlistItem>;
  removeFromWatchlist(watchlistId: number, stockId: number): Promise<void>;
  
  // Trading account operations
  getTradingAccounts(userId: string): Promise<TradingAccount[]>;
  getTradingAccount(accountId: number): Promise<TradingAccount | undefined>;
  createTradingAccount(account: InsertTradingAccount): Promise<TradingAccount>;
  updateTradingAccount(accountId: number, updates: Partial<TradingAccount>): Promise<void>;
  deleteTradingAccount(accountId: number): Promise<void>;
  
  // Market index operations
  getMarketIndices(): Promise<MarketIndex[]>;
  getMarketIndex(indexId: number): Promise<MarketIndex | undefined>;
  createMarketIndex(index: InsertMarketIndex): Promise<MarketIndex>;
  updateMarketIndex(indexId: number, updates: Partial<MarketIndex>): Promise<void>;
  
  // Mutual fund operations
  getMutualFunds(limit?: number, offset?: number): Promise<MutualFund[]>;
  getMutualFund(fundId: number): Promise<MutualFund | undefined>;
  createMutualFund(fund: InsertMutualFund): Promise<MutualFund>;
  updateMutualFund(fundId: number, updates: Partial<MutualFund>): Promise<void>;
  searchMutualFunds(query: string, limit?: number): Promise<MutualFund[]>;
  
  // MF holdings operations
  getMfHoldings(portfolioId: number): Promise<MfHolding[]>;
  getMfHolding(holdingId: number): Promise<MfHolding | undefined>;
  createMfHolding(holding: InsertMfHolding): Promise<MfHolding>;
  updateMfHolding(holdingId: number, updates: Partial<MfHolding>): Promise<void>;
  deleteMfHolding(holdingId: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Balance operations
  async addBalance(userId: string, amount: number): Promise<void> {
    const user = await this.getUser(userId);
    const currentBalance = parseFloat(user?.balance || "0");
    const newBalance = currentBalance + amount;
    
    await db
      .update(users)
      .set({ balance: newBalance.toFixed(2) })
      .where(eq(users.id, userId));
  }

  async updateBalance(userId: string, newBalance: number): Promise<void> {
    await db
      .update(users)
      .set({ balance: newBalance.toFixed(2) })
      .where(eq(users.id, userId));
  }

  // Transaction operations
  async createTransaction(transaction: InsertTransaction): Promise<Transaction> {
    const [newTransaction] = await db
      .insert(transactions)
      .values(transaction)
      .returning();
    return newTransaction;
  }

  async getTransaction(id: number): Promise<Transaction | undefined> {
    const [transaction] = await db
      .select()
      .from(transactions)
      .where(eq(transactions.id, id));
    return transaction;
  }

  async getUserTransactions(userId: string, limit: number, offset: number): Promise<Transaction[]> {
    return await db
      .select()
      .from(transactions)
      .where(eq(transactions.userId, userId))
      .orderBy(desc(transactions.createdAt))
      .limit(limit)
      .offset(offset);
  }

  // Merchant operations
  async getMerchants(): Promise<Merchant[]> {
    return await db.select().from(merchants);
  }

  async getMerchant(id: number): Promise<Merchant | undefined> {
    const [merchant] = await db
      .select()
      .from(merchants)
      .where(eq(merchants.id, id));
    return merchant;
  }

  // Payment request operations
  async getPaymentRequests(userId: string): Promise<PaymentRequest[]> {
    return await db
      .select()
      .from(paymentRequests)
      .where(or(
        eq(paymentRequests.fromUserId, userId),
        eq(paymentRequests.toUserId, userId)
      ))
      .orderBy(desc(paymentRequests.createdAt));
  }

  async createPaymentRequest(request: InsertPaymentRequest): Promise<PaymentRequest> {
    const [newRequest] = await db
      .insert(paymentRequests)
      .values(request)
      .returning();
    return newRequest;
  }

  // Offline payment operations implementation
  async getOfflineDevices(limit: number = 50, offset: number = 0): Promise<OfflineDevice[]> {
    return await db
      .select()
      .from(offlineDevices)
      .where(eq(offlineDevices.isOnline, true))
      .orderBy(desc(offlineDevices.lastSeen))
      .limit(limit)
      .offset(offset);
  }

  async getOfflineDevice(deviceId: string): Promise<OfflineDevice | undefined> {
    const [device] = await db
      .select()
      .from(offlineDevices)
      .where(eq(offlineDevices.deviceId, deviceId));
    return device || undefined;
  }

  async getBankAccountsByDevice(deviceId: string): Promise<BankAccount[]> {
    return await db
      .select()
      .from(bankAccounts)
      .where(and(
        eq(bankAccounts.deviceId, deviceId),
        eq(bankAccounts.isActive, true)
      ))
      .orderBy(desc(bankAccounts.isPrimary));
  }

  async createOtpVerification(otp: InsertOtpVerification): Promise<OtpVerification> {
    const [newOtp] = await db
      .insert(otpVerifications)
      .values(otp)
      .returning();
    return newOtp;
  }

  async verifyOtp(fromDeviceId: string, toDeviceId: string, otpCode: string): Promise<boolean> {
    const [verification] = await db
      .select()
      .from(otpVerifications)
      .where(and(
        eq(otpVerifications.fromDeviceId, fromDeviceId),
        eq(otpVerifications.toDeviceId, toDeviceId),
        eq(otpVerifications.otpCode, otpCode),
        eq(otpVerifications.status, "pending"),
        gt(otpVerifications.expiresAt, new Date())
      ));

    if (!verification) {
      return false;
    }

    // Update verification status
    await db
      .update(otpVerifications)
      .set({
        status: "verified",
        verifiedAt: new Date()
      })
      .where(eq(otpVerifications.id, verification.id));

    return true;
  }

  async createPaymentSession(session: InsertOfflinePaymentSession): Promise<OfflinePaymentSession> {
    const [newSession] = await db
      .insert(offlinePaymentSessions)
      .values(session)
      .returning();
    return newSession;
  }

  async updatePaymentSession(sessionId: string, updates: Partial<OfflinePaymentSession>): Promise<void> {
    await db
      .update(offlinePaymentSessions)
      .set({
        ...updates,
        updatedAt: new Date()
      })
      .where(eq(offlinePaymentSessions.sessionId, sessionId));
  }

  async getPaymentSession(sessionId: string): Promise<OfflinePaymentSession | undefined> {
    const [session] = await db
      .select()
      .from(offlinePaymentSessions)
      .where(eq(offlinePaymentSessions.sessionId, sessionId));
    return session || undefined;
  }

  // RWA operations
  async getRWAssets(userId: string): Promise<RWAsset[]> {
    return await db
      .select()
      .from(rwassets)
      .where(eq(rwassets.userId, userId))
      .orderBy(desc(rwassets.createdAt));
  }

  async createRWAsset(asset: InsertRWAsset): Promise<RWAsset> {
    const [newAsset] = await db
      .insert(rwassets)
      .values(asset)
      .returning();
    return newAsset;
  }

  async updateRWAsset(assetId: number, updates: Partial<RWAsset>): Promise<void> {
    await db
      .update(rwassets)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(rwassets.id, assetId));
  }

  async getRWATokens(limit: number = 50, offset: number = 0): Promise<RWAToken[]> {
    return await db
      .select()
      .from(rwaTokens)
      .where(eq(rwaTokens.tradingEnabled, true))
      .orderBy(desc(rwaTokens.createdAt))
      .limit(limit)
      .offset(offset);
  }

  async getRWAToken(tokenId: number): Promise<RWAToken | undefined> {
    const [token] = await db
      .select()
      .from(rwaTokens)
      .where(eq(rwaTokens.id, tokenId));
    return token || undefined;
  }

  async createRWAToken(token: InsertRWAToken): Promise<RWAToken> {
    const [newToken] = await db
      .insert(rwaTokens)
      .values(token)
      .returning();
    return newToken;
  }

  async getRWAInvestments(userId: string): Promise<RWAInvestment[]> {
    return await db
      .select()
      .from(rwaInvestments)
      .where(eq(rwaInvestments.userId, userId))
      .orderBy(desc(rwaInvestments.purchaseDate));
  }

  async createRWAInvestment(investment: InsertRWAInvestment): Promise<RWAInvestment> {
    const [newInvestment] = await db
      .insert(rwaInvestments)
      .values(investment)
      .returning();
    return newInvestment;
  }

  async updateRWAInvestment(investmentId: number, updates: Partial<RWAInvestment>): Promise<void> {
    await db
      .update(rwaInvestments)
      .set({ ...updates, lastUpdated: new Date() })
      .where(eq(rwaInvestments.id, investmentId));
  }

  async createRWATransaction(transaction: InsertRWATransaction): Promise<RWATransaction> {
    const [newTransaction] = await db
      .insert(rwaTransactions)
      .values(transaction)
      .returning();
    return newTransaction;
  }

  async getRWATransactions(userId: string): Promise<RWATransaction[]> {
    return await db
      .select()
      .from(rwaTransactions)
      .where(eq(rwaTransactions.userId, userId))
      .orderBy(desc(rwaTransactions.createdAt));
  }

  async updateRWAMarketData(marketData: InsertRWAMarketData): Promise<void> {
    await db
      .insert(rwaMarketData)
      .values(marketData)
      .onConflictDoUpdate({
        target: rwaMarketData.tokenId,
        set: {
          price: marketData.price,
          volume24h: marketData.volume24h,
          priceChange24h: marketData.priceChange24h,
          marketCap: marketData.marketCap,
          liquidity: marketData.liquidity,
          timestamp: new Date()
        }
      });
  }

  async getRWAMarketData(tokenId: number): Promise<RWAMarketData | undefined> {
    const [data] = await db
      .select()
      .from(rwaMarketData)
      .where(eq(rwaMarketData.tokenId, tokenId))
      .orderBy(desc(rwaMarketData.timestamp))
      .limit(1);
    return data || undefined;
  }

  // Stock trading operations
  async getStocks(limit: number = 50, offset: number = 0): Promise<Stock[]> {
    return await db.select().from(stocks).where(eq(stocks.isActive, true)).limit(limit).offset(offset);
  }

  async getStock(stockId: number): Promise<Stock | undefined> {
    const [stock] = await db.select().from(stocks).where(eq(stocks.id, stockId));
    return stock;
  }

  async getStockBySymbol(symbol: string): Promise<Stock | undefined> {
    const [stock] = await db.select().from(stocks).where(eq(stocks.symbol, symbol));
    return stock;
  }

  async createStock(stock: InsertStock): Promise<Stock> {
    const [newStock] = await db.insert(stocks).values(stock).returning();
    return newStock;
  }

  async updateStock(stockId: number, updates: Partial<Stock>): Promise<void> {
    await db.update(stocks).set({ ...updates, updatedAt: new Date() }).where(eq(stocks.id, stockId));
  }

  async searchStocks(query: string, limit: number = 20): Promise<Stock[]> {
    return await db
      .select()
      .from(stocks)
      .where(
        and(
          eq(stocks.isActive, true),
          or(
            like(stocks.name, `%${query}%`),
            like(stocks.symbol, `%${query}%`),
            like(stocks.sector, `%${query}%`)
          )
        )
      )
      .limit(limit);
  }

  // Stock price operations
  async getStockPrice(stockId: number): Promise<StockPrice | undefined> {
    const [price] = await db
      .select()
      .from(stockPrices)
      .where(eq(stockPrices.stockId, stockId))
      .orderBy(desc(stockPrices.timestamp))
      .limit(1);
    return price;
  }

  async getStockPrices(stockId: number, limit: number = 100): Promise<StockPrice[]> {
    return await db
      .select()
      .from(stockPrices)
      .where(eq(stockPrices.stockId, stockId))
      .orderBy(desc(stockPrices.timestamp))
      .limit(limit);
  }

  async createStockPrice(stockPrice: InsertStockPrice): Promise<StockPrice> {
    const [newPrice] = await db.insert(stockPrices).values(stockPrice).returning();
    return newPrice;
  }

  async updateStockPrice(stockId: number, updates: Partial<StockPrice>): Promise<void> {
    await db
      .insert(stockPrices)
      .values({ stockId, ...updates })
      .onConflictDoUpdate({
        target: [stockPrices.stockId, stockPrices.timestamp],
        set: updates
      });
  }

  // Portfolio operations
  async getPortfolios(userId: string): Promise<Portfolio[]> {
    return await db.select().from(portfolios).where(eq(portfolios.userId, userId));
  }

  async getPortfolio(portfolioId: number): Promise<Portfolio | undefined> {
    const [portfolio] = await db.select().from(portfolios).where(eq(portfolios.id, portfolioId));
    return portfolio;
  }

  async createPortfolio(portfolio: InsertPortfolio): Promise<Portfolio> {
    const [newPortfolio] = await db.insert(portfolios).values(portfolio).returning();
    return newPortfolio;
  }

  async updatePortfolio(portfolioId: number, updates: Partial<Portfolio>): Promise<void> {
    await db.update(portfolios).set({ ...updates, updatedAt: new Date() }).where(eq(portfolios.id, portfolioId));
  }

  async deletePortfolio(portfolioId: number): Promise<void> {
    await db.delete(portfolios).where(eq(portfolios.id, portfolioId));
  }

  // Holdings operations
  async getHoldings(portfolioId: number): Promise<Holding[]> {
    return await db.select().from(holdings).where(eq(holdings.portfolioId, portfolioId));
  }

  async getHolding(holdingId: number): Promise<Holding | undefined> {
    const [holding] = await db.select().from(holdings).where(eq(holdings.id, holdingId));
    return holding;
  }

  async createHolding(holding: InsertHolding): Promise<Holding> {
    const [newHolding] = await db.insert(holdings).values(holding).returning();
    return newHolding;
  }

  async updateHolding(holdingId: number, updates: Partial<Holding>): Promise<void> {
    await db.update(holdings).set({ ...updates, updatedAt: new Date() }).where(eq(holdings.id, holdingId));
  }

  async deleteHolding(holdingId: number): Promise<void> {
    await db.delete(holdings).where(eq(holdings.id, holdingId));
  }

  // Order operations
  async getOrders(userId: string, limit: number = 50, offset: number = 0): Promise<Order[]> {
    return await db
      .select()
      .from(orders)
      .where(eq(orders.userId, userId))
      .orderBy(desc(orders.createdAt))
      .limit(limit)
      .offset(offset);
  }

  async getOrder(orderId: string): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.orderId, orderId));
    return order;
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const orderId = `ORD${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
    const [newOrder] = await db.insert(orders).values({ ...order, orderId }).returning();
    return newOrder;
  }

  async updateOrder(orderId: string, updates: Partial<Order>): Promise<void> {
    await db.update(orders).set({ ...updates, updatedAt: new Date() }).where(eq(orders.orderId, orderId));
  }

  async cancelOrder(orderId: string): Promise<void> {
    await db.update(orders).set({ status: 'cancelled', updatedAt: new Date() }).where(eq(orders.orderId, orderId));
  }

  // Watchlist operations
  async getWatchlists(userId: string): Promise<Watchlist[]> {
    return await db.select().from(watchlists).where(eq(watchlists.userId, userId));
  }

  async getWatchlist(watchlistId: number): Promise<Watchlist | undefined> {
    const [watchlist] = await db.select().from(watchlists).where(eq(watchlists.id, watchlistId));
    return watchlist;
  }

  async createWatchlist(watchlist: InsertWatchlist): Promise<Watchlist> {
    const [newWatchlist] = await db.insert(watchlists).values(watchlist).returning();
    return newWatchlist;
  }

  async updateWatchlist(watchlistId: number, updates: Partial<Watchlist>): Promise<void> {
    await db.update(watchlists).set({ ...updates, updatedAt: new Date() }).where(eq(watchlists.id, watchlistId));
  }

  async deleteWatchlist(watchlistId: number): Promise<void> {
    await db.delete(watchlists).where(eq(watchlists.id, watchlistId));
  }

  // Watchlist items operations
  async getWatchlistItems(watchlistId: number): Promise<WatchlistItem[]> {
    return await db.select().from(watchlistItems).where(eq(watchlistItems.watchlistId, watchlistId));
  }

  async addToWatchlist(watchlistItem: InsertWatchlistItem): Promise<WatchlistItem> {
    const [newItem] = await db.insert(watchlistItems).values(watchlistItem).returning();
    return newItem;
  }

  async removeFromWatchlist(watchlistId: number, stockId: number): Promise<void> {
    await db
      .delete(watchlistItems)
      .where(and(eq(watchlistItems.watchlistId, watchlistId), eq(watchlistItems.stockId, stockId)));
  }

  // Trading account operations
  async getTradingAccounts(userId: string): Promise<TradingAccount[]> {
    return await db.select().from(tradingAccounts).where(eq(tradingAccounts.userId, userId));
  }

  async getTradingAccount(accountId: number): Promise<TradingAccount | undefined> {
    const [account] = await db.select().from(tradingAccounts).where(eq(tradingAccounts.id, accountId));
    return account;
  }

  async createTradingAccount(account: InsertTradingAccount): Promise<TradingAccount> {
    const [newAccount] = await db.insert(tradingAccounts).values(account).returning();
    return newAccount;
  }

  async updateTradingAccount(accountId: number, updates: Partial<TradingAccount>): Promise<void> {
    await db.update(tradingAccounts).set({ ...updates, updatedAt: new Date() }).where(eq(tradingAccounts.id, accountId));
  }

  async deleteTradingAccount(accountId: number): Promise<void> {
    await db.delete(tradingAccounts).where(eq(tradingAccounts.id, accountId));
  }

  // Market index operations
  async getMarketIndices(): Promise<MarketIndex[]> {
    return await db.select().from(marketIndices).where(eq(marketIndices.isActive, true));
  }

  async getMarketIndex(indexId: number): Promise<MarketIndex | undefined> {
    const [index] = await db.select().from(marketIndices).where(eq(marketIndices.id, indexId));
    return index;
  }

  async createMarketIndex(index: InsertMarketIndex): Promise<MarketIndex> {
    const [newIndex] = await db.insert(marketIndices).values(index).returning();
    return newIndex;
  }

  async updateMarketIndex(indexId: number, updates: Partial<MarketIndex>): Promise<void> {
    await db
      .insert(marketIndices)
      .values({ id: indexId, ...updates })
      .onConflictDoUpdate({
        target: marketIndices.id,
        set: { ...updates, timestamp: new Date() }
      });
  }

  // Mutual fund operations
  async getMutualFunds(limit: number = 50, offset: number = 0): Promise<MutualFund[]> {
    return await db.select().from(mutualFunds).where(eq(mutualFunds.isActive, true)).limit(limit).offset(offset);
  }

  async getMutualFund(fundId: number): Promise<MutualFund | undefined> {
    const [fund] = await db.select().from(mutualFunds).where(eq(mutualFunds.id, fundId));
    return fund;
  }

  async createMutualFund(fund: InsertMutualFund): Promise<MutualFund> {
    const [newFund] = await db.insert(mutualFunds).values(fund).returning();
    return newFund;
  }

  async updateMutualFund(fundId: number, updates: Partial<MutualFund>): Promise<void> {
    await db.update(mutualFunds).set({ ...updates, updatedAt: new Date() }).where(eq(mutualFunds.id, fundId));
  }

  async searchMutualFunds(query: string, limit: number = 20): Promise<MutualFund[]> {
    return await db
      .select()
      .from(mutualFunds)
      .where(
        and(
          eq(mutualFunds.isActive, true),
          or(
            like(mutualFunds.schemeName, `%${query}%`),
            like(mutualFunds.fundHouse, `%${query}%`),
            like(mutualFunds.category, `%${query}%`)
          )
        )
      )
      .limit(limit);
  }

  // MF holdings operations
  async getMfHoldings(portfolioId: number): Promise<MfHolding[]> {
    return await db.select().from(mfHoldings).where(eq(mfHoldings.portfolioId, portfolioId));
  }

  async getMfHolding(holdingId: number): Promise<MfHolding | undefined> {
    const [holding] = await db.select().from(mfHoldings).where(eq(mfHoldings.id, holdingId));
    return holding;
  }

  async createMfHolding(holding: InsertMfHolding): Promise<MfHolding> {
    const [newHolding] = await db.insert(mfHoldings).values(holding).returning();
    return newHolding;
  }

  async updateMfHolding(holdingId: number, updates: Partial<MfHolding>): Promise<void> {
    await db.update(mfHoldings).set({ ...updates, updatedAt: new Date() }).where(eq(mfHoldings.id, holdingId));
  }

  async deleteMfHolding(holdingId: number): Promise<void> {
    await db.delete(mfHoldings).where(eq(mfHoldings.id, holdingId));
  }
}

export const storage = new DatabaseStorage();