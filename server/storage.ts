import {
  users,
  transactions,
  paymentRequests,
  merchants,
  type User,
  type UpsertUser,
  type Transaction,
  type InsertTransaction,
  type PaymentRequest,
  type InsertPaymentRequest,
  type Merchant,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, or, like } from "drizzle-orm";

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
}

export const storage = new DatabaseStorage();