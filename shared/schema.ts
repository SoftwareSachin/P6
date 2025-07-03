import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  serial,
  integer,
  decimal,
  boolean,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  phoneNumber: varchar("phone_number"),
  balance: decimal("balance", { precision: 10, scale: 2 }).default("0.00"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  merchantName: varchar("merchant_name").notNull(),
  merchantImage: varchar("merchant_image"),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  type: varchar("type").notNull(), // 'debit', 'credit'
  category: varchar("category").notNull(), // 'offline_payment', 'online_payment', 'recharge', 'request'
  status: varchar("status").notNull().default("completed"), // 'pending', 'completed', 'failed'
  note: text("note"),
  transactionId: varchar("transaction_id").notNull().unique(),
  isOffline: boolean("is_offline").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const paymentRequests = pgTable("payment_requests", {
  id: serial("id").primaryKey(),
  fromUserId: varchar("from_user_id").notNull().references(() => users.id),
  toUserId: varchar("to_user_id").notNull().references(() => users.id),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  note: text("note"),
  status: varchar("status").notNull().default("pending"), // 'pending', 'completed', 'rejected'
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const merchants = pgTable("merchants", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  category: varchar("category").notNull(),
  image: varchar("image"),
  address: text("address"),
  verified: boolean("verified").default(false),
  supportsOffline: boolean("supports_offline").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Offline payment devices schema
export const offlineDevices = pgTable("offline_devices", {
  id: serial("id").primaryKey(),
  deviceId: varchar("device_id").notNull().unique(),
  name: varchar("name").notNull(),
  type: varchar("type").notNull(), // 'iOS', 'Android', 'POS'
  model: varchar("model").notNull(),
  macAddress: varchar("mac_address").notNull(),
  bluetoothVersion: varchar("bluetooth_version").default("5.0"),
  batteryLevel: integer("battery_level").default(100),
  signalStrength: integer("signal_strength").default(80),
  distance: decimal("distance", { precision: 5, scale: 2 }).default("0.00"),
  lastSeen: timestamp("last_seen").defaultNow(),
  isOnline: boolean("is_online").default(true),
  trustLevel: varchar("trust_level").default("medium"), // 'low', 'medium', 'high', 'verified'
  transactionCount: integer("transaction_count").default(0),
  totalVolume: decimal("total_volume", { precision: 15, scale: 2 }).default("0.00"),
  encryption: varchar("encryption").default("AES-256"),
  location: text("location"),
  ownerId: varchar("owner_id"),
  ownerPhone: varchar("owner_phone"),
  ownerName: varchar("owner_name"),
  profileImage: varchar("profile_image"),
  rating: decimal("rating", { precision: 3, scale: 2 }).default("0.00"),
  reviewCount: integer("review_count").default(0),
  isVerified: boolean("is_verified").default(false),
  deviceColor: varchar("device_color").default("#1D4ED8"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

// Bank details schema
export const bankAccounts = pgTable("bank_accounts", {
  id: serial("id").primaryKey(),
  deviceId: varchar("device_id").notNull(),
  bankName: varchar("bank_name").notNull(),
  bankCode: varchar("bank_code").notNull(),
  accountNumber: varchar("account_number").notNull(),
  ifscCode: varchar("ifsc_code").notNull(),
  accountType: varchar("account_type").notNull(), // 'savings', 'current', 'business'
  accountHolderName: varchar("account_holder_name").notNull(),
  balance: decimal("balance", { precision: 15, scale: 2 }).default("0.00"),
  dailyLimit: decimal("daily_limit", { precision: 12, scale: 2 }).default("100000.00"),
  monthlyLimit: decimal("monthly_limit", { precision: 15, scale: 2 }).default("1000000.00"),
  isActive: boolean("is_active").default(true),
  isPrimary: boolean("is_primary").default(false),
  upiId: varchar("upi_id"),
  bankLogo: varchar("bank_logo"),
  lastTransactionAt: timestamp("last_transaction_at"),
  createdAt: timestamp("created_at").defaultNow()
});

// OTP verification schema
export const otpVerifications = pgTable("otp_verifications", {
  id: serial("id").primaryKey(),
  fromDeviceId: varchar("from_device_id").notNull(),
  toDeviceId: varchar("to_device_id").notNull(),
  otpCode: varchar("otp_code").notNull(),
  purpose: varchar("purpose").notNull(), // 'connection', 'payment', 'verification'
  status: varchar("status").default("pending"), // 'pending', 'verified', 'expired', 'failed'
  attempts: integer("attempts").default(0),
  maxAttempts: integer("max_attempts").default(3),
  expiresAt: timestamp("expires_at").notNull(),
  verifiedAt: timestamp("verified_at"),
  metadata: jsonb("metadata"), // Additional data like payment amount, etc.
  createdAt: timestamp("created_at").defaultNow()
});

// Offline payment sessions schema
export const offlinePaymentSessions = pgTable("offline_payment_sessions", {
  id: serial("id").primaryKey(),
  sessionId: varchar("session_id").notNull().unique(),
  fromDeviceId: varchar("from_device_id").notNull(),
  toDeviceId: varchar("to_device_id").notNull(),
  connectionType: varchar("connection_type").default("bluetooth"), // 'bluetooth', 'nfc', 'wifi-direct'
  status: varchar("status").default("initiated"), // 'initiated', 'connected', 'otp_sent', 'otp_verified', 'payment_ready', 'processing', 'completed', 'failed'
  encryptionKey: varchar("encryption_key"),
  connectionStrength: integer("connection_strength").default(0),
  connectionEstablishedAt: timestamp("connection_established_at"),
  otpVerifiedAt: timestamp("otp_verified_at"),
  paymentCompletedAt: timestamp("payment_completed_at"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

// Detailed transaction tracking
export const offlineTransactionLogs = pgTable("offline_transaction_logs", {
  id: serial("id").primaryKey(),
  transactionId: varchar("transaction_id").notNull().unique(),
  sessionId: varchar("session_id").notNull(),
  fromDeviceId: varchar("from_device_id").notNull(),
  toDeviceId: varchar("to_device_id").notNull(),
  amount: decimal("amount", { precision: 15, scale: 2 }).notNull(),
  currency: varchar("currency").default("INR"),
  description: text("description"),
  fromBankAccount: integer("from_bank_account").notNull(),
  toBankAccount: integer("to_bank_account").notNull(),
  status: varchar("status").default("pending"), // 'pending', 'processing', 'completed', 'failed', 'cancelled'
  failureReason: text("failure_reason"),
  processingTime: integer("processing_time"), // in milliseconds
  fees: decimal("fees", { precision: 10, scale: 2 }).default("0.00"),
  netAmount: decimal("net_amount", { precision: 15, scale: 2 }).notNull(),
  confirmationCode: varchar("confirmation_code"),
  bankReferenceNumber: varchar("bank_reference_number"),
  initiatedAt: timestamp("initiated_at").defaultNow(),
  completedAt: timestamp("completed_at"),
  syncedAt: timestamp("synced_at") // when synced to online systems
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type InsertTransaction = typeof transactions.$inferInsert;
export type Transaction = typeof transactions.$inferSelect;
export type InsertPaymentRequest = typeof paymentRequests.$inferInsert;
export type PaymentRequest = typeof paymentRequests.$inferSelect;
export type InsertMerchant = typeof merchants.$inferInsert;
export type Merchant = typeof merchants.$inferSelect;

// Offline payment types
export type InsertOfflineDevice = typeof offlineDevices.$inferInsert;
export type OfflineDevice = typeof offlineDevices.$inferSelect;
export type InsertBankAccount = typeof bankAccounts.$inferInsert;
export type BankAccount = typeof bankAccounts.$inferSelect;
export type InsertOtpVerification = typeof otpVerifications.$inferInsert;
export type OtpVerification = typeof otpVerifications.$inferSelect;
export type InsertOfflinePaymentSession = typeof offlinePaymentSessions.$inferInsert;
export type OfflinePaymentSession = typeof offlinePaymentSessions.$inferSelect;
export type InsertOfflineTransactionLog = typeof offlineTransactionLogs.$inferInsert;
export type OfflineTransactionLog = typeof offlineTransactionLogs.$inferSelect;

export const insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true,
  createdAt: true,
});

export const insertPaymentRequestSchema = createInsertSchema(paymentRequests).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
