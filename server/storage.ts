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
}

export const storage = new DatabaseStorage();