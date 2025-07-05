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

// RWA Tokenization Tables
export const rwassets = pgTable("rwassets", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  name: varchar("name").notNull(),
  description: text("description"),
  assetType: varchar("asset_type").notNull(), // 'real_estate', 'vehicle', 'commodity', 'art', 'bonds', 'stocks'
  category: varchar("category").notNull(), // 'residential', 'commercial', 'luxury_car', 'gold', 'silver'
  value: decimal("value", { precision: 15, scale: 2 }).notNull(),
  location: varchar("location"),
  imageUrl: varchar("image_url"),
  documentUrl: varchar("document_url"),
  verificationStatus: varchar("verification_status").notNull().default("pending"), // 'pending', 'verified', 'rejected'
  tokenizationStatus: varchar("tokenization_status").notNull().default("not_tokenized"), // 'not_tokenized', 'tokenizing', 'tokenized'
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const rwaTokens = pgTable("rwa_tokens", {
  id: serial("id").primaryKey(),
  assetId: integer("asset_id").notNull().references(() => rwassets.id),
  tokenSymbol: varchar("token_symbol").notNull().unique(),
  tokenName: varchar("token_name").notNull(),
  totalSupply: decimal("total_supply", { precision: 15, scale: 2 }).notNull(),
  availableSupply: decimal("available_supply", { precision: 15, scale: 2 }).notNull(),
  pricePerToken: decimal("price_per_token", { precision: 10, scale: 2 }).notNull(),
  minimumInvestment: decimal("minimum_investment", { precision: 10, scale: 2 }).notNull().default("100.00"),
  yieldRate: decimal("yield_rate", { precision: 5, scale: 2 }).default("0.00"), // Annual yield percentage
  contractAddress: varchar("contract_address"),
  tradingEnabled: boolean("trading_enabled").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const rwaInvestments = pgTable("rwa_investments", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  tokenId: integer("token_id").notNull().references(() => rwaTokens.id),
  tokensOwned: decimal("tokens_owned", { precision: 15, scale: 2 }).notNull(),
  totalInvested: decimal("total_invested", { precision: 15, scale: 2 }).notNull(),
  currentValue: decimal("current_value", { precision: 15, scale: 2 }).notNull(),
  yieldEarned: decimal("yield_earned", { precision: 15, scale: 2 }).default("0.00"),
  purchaseDate: timestamp("purchase_date").defaultNow(),
  lastUpdated: timestamp("last_updated").defaultNow(),
});

export const rwaTransactions = pgTable("rwa_transactions", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  tokenId: integer("token_id").notNull().references(() => rwaTokens.id),
  type: varchar("type").notNull(), // 'buy', 'sell', 'yield_payment'
  quantity: decimal("quantity", { precision: 15, scale: 2 }).notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  totalAmount: decimal("total_amount", { precision: 15, scale: 2 }).notNull(),
  status: varchar("status").notNull().default("pending"), // 'pending', 'completed', 'failed'
  transactionHash: varchar("transaction_hash"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const rwaMarketData = pgTable("rwa_market_data", {
  id: serial("id").primaryKey(),
  tokenId: integer("token_id").notNull().references(() => rwaTokens.id),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  volume24h: decimal("volume_24h", { precision: 15, scale: 2 }).default("0.00"),
  priceChange24h: decimal("price_change_24h", { precision: 5, scale: 2 }).default("0.00"),
  marketCap: decimal("market_cap", { precision: 15, scale: 2 }).default("0.00"),
  liquidity: decimal("liquidity", { precision: 15, scale: 2 }).default("0.00"),
  timestamp: timestamp("timestamp").defaultNow(),
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

// RWA Types
export type InsertRWAsset = typeof rwassets.$inferInsert;
export type RWAsset = typeof rwassets.$inferSelect;
export type InsertRWAToken = typeof rwaTokens.$inferInsert;
export type RWAToken = typeof rwaTokens.$inferSelect;
export type InsertRWAInvestment = typeof rwaInvestments.$inferInsert;
export type RWAInvestment = typeof rwaInvestments.$inferSelect;
export type InsertRWATransaction = typeof rwaTransactions.$inferInsert;
export type RWATransaction = typeof rwaTransactions.$inferSelect;
export type InsertRWAMarketData = typeof rwaMarketData.$inferInsert;
export type RWAMarketData = typeof rwaMarketData.$inferSelect;

export const insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true,
  createdAt: true,
});

export const insertPaymentRequestSchema = createInsertSchema(paymentRequests).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertRWAssetSchema = createInsertSchema(rwassets).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertRWATokenSchema = createInsertSchema(rwaTokens).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertRWAInvestmentSchema = createInsertSchema(rwaInvestments).omit({
  id: true,
  purchaseDate: true,
  lastUpdated: true,
});

export const insertRWATransactionSchema = createInsertSchema(rwaTransactions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertRWAMarketDataSchema = createInsertSchema(rwaMarketData).omit({
  id: true,
  timestamp: true,
});

// Stock Trading and Investment Tables
export const stocks = pgTable("stocks", {
  id: serial("id").primaryKey(),
  symbol: varchar("symbol").notNull().unique(), // RELIANCE, TCS, INFY, etc.
  name: varchar("name").notNull(),
  exchange: varchar("exchange").notNull(), // NSE, BSE, NYSE, NASDAQ
  sector: varchar("sector").notNull(), // Technology, Banking, Healthcare, etc.
  industry: varchar("industry").notNull(),
  marketCap: decimal("market_cap", { precision: 15, scale: 2 }).default("0.00"),
  peRatio: decimal("pe_ratio", { precision: 8, scale: 2 }),
  pbRatio: decimal("pb_ratio", { precision: 8, scale: 2 }),
  dividendYield: decimal("dividend_yield", { precision: 5, scale: 2 }),
  week52High: decimal("week_52_high", { precision: 10, scale: 2 }),
  week52Low: decimal("week_52_low", { precision: 10, scale: 2 }),
  avgVolume: decimal("avg_volume", { precision: 15, scale: 2 }),
  beta: decimal("beta", { precision: 5, scale: 2 }),
  eps: decimal("eps", { precision: 8, scale: 2 }),
  logoUrl: varchar("logo_url"),
  description: text("description"),
  website: varchar("website"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const stockPrices = pgTable("stock_prices", {
  id: serial("id").primaryKey(),
  stockId: integer("stock_id").notNull().references(() => stocks.id),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  open: decimal("open", { precision: 10, scale: 2 }).notNull(),
  high: decimal("high", { precision: 10, scale: 2 }).notNull(),
  low: decimal("low", { precision: 10, scale: 2 }).notNull(),
  volume: decimal("volume", { precision: 15, scale: 2 }).notNull(),
  change: decimal("change", { precision: 10, scale: 2 }).notNull(),
  changePercent: decimal("change_percent", { precision: 5, scale: 2 }).notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
  marketStatus: varchar("market_status").notNull().default("open"), // open, closed, pre-market, after-market
});

export const portfolios = pgTable("portfolios", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  name: varchar("name").notNull().default("My Portfolio"),
  type: varchar("type").notNull().default("equity"), // equity, mutual_fund, bonds, commodity
  totalValue: decimal("total_value", { precision: 15, scale: 2 }).default("0.00"),
  totalInvestment: decimal("total_investment", { precision: 15, scale: 2 }).default("0.00"),
  totalPnl: decimal("total_pnl", { precision: 15, scale: 2 }).default("0.00"),
  totalPnlPercent: decimal("total_pnl_percent", { precision: 5, scale: 2 }).default("0.00"),
  isDefault: boolean("is_default").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const holdings = pgTable("holdings", {
  id: serial("id").primaryKey(),
  portfolioId: integer("portfolio_id").notNull().references(() => portfolios.id),
  userId: varchar("user_id").notNull().references(() => users.id),
  stockId: integer("stock_id").notNull().references(() => stocks.id),
  quantity: decimal("quantity", { precision: 10, scale: 2 }).notNull(),
  avgPrice: decimal("avg_price", { precision: 10, scale: 2 }).notNull(),
  currentPrice: decimal("current_price", { precision: 10, scale: 2 }).notNull(),
  investment: decimal("investment", { precision: 15, scale: 2 }).notNull(),
  currentValue: decimal("current_value", { precision: 15, scale: 2 }).notNull(),
  pnl: decimal("pnl", { precision: 15, scale: 2 }).notNull(),
  pnlPercent: decimal("pnl_percent", { precision: 5, scale: 2 }).notNull(),
  dayChange: decimal("day_change", { precision: 10, scale: 2 }).default("0.00"),
  dayChangePercent: decimal("day_change_percent", { precision: 5, scale: 2 }).default("0.00"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  portfolioId: integer("portfolio_id").notNull().references(() => portfolios.id),
  stockId: integer("stock_id").notNull().references(() => stocks.id),
  orderId: varchar("order_id").notNull().unique(),
  type: varchar("type").notNull(), // BUY, SELL
  orderType: varchar("order_type").notNull(), // MARKET, LIMIT, STOP_LOSS, STOP_LOSS_MARKET
  quantity: decimal("quantity", { precision: 10, scale: 2 }).notNull(),
  price: decimal("price", { precision: 10, scale: 2 }),
  triggerPrice: decimal("trigger_price", { precision: 10, scale: 2 }),
  executedQuantity: decimal("executed_quantity", { precision: 10, scale: 2 }).default("0.00"),
  executedPrice: decimal("executed_price", { precision: 10, scale: 2 }),
  status: varchar("status").notNull().default("pending"), // pending, executed, cancelled, rejected, partial
  validity: varchar("validity").notNull().default("DAY"), // DAY, IOC, GTC
  product: varchar("product").notNull().default("CNC"), // CNC, MIS, NRML
  exchange: varchar("exchange").notNull(),
  segment: varchar("segment").notNull().default("EQUITY"), // EQUITY, DERIVATIVES, COMMODITY
  fees: decimal("fees", { precision: 10, scale: 2 }).default("0.00"),
  taxes: decimal("taxes", { precision: 10, scale: 2 }).default("0.00"),
  totalAmount: decimal("total_amount", { precision: 15, scale: 2 }).notNull(),
  executedAt: timestamp("executed_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const watchlists = pgTable("watchlists", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  name: varchar("name").notNull().default("My Watchlist"),
  isDefault: boolean("is_default").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const watchlistItems = pgTable("watchlist_items", {
  id: serial("id").primaryKey(),
  watchlistId: integer("watchlist_id").notNull().references(() => watchlists.id),
  stockId: integer("stock_id").notNull().references(() => stocks.id),
  alertPrice: decimal("alert_price", { precision: 10, scale: 2 }),
  alertType: varchar("alert_type"), // above, below
  isAlertEnabled: boolean("is_alert_enabled").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const tradingAccounts = pgTable("trading_accounts", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  brokerId: varchar("broker_id").notNull(), // zerodha, upstox, angelone, etc.
  brokerName: varchar("broker_name").notNull(),
  accountId: varchar("account_id").notNull(),
  accountType: varchar("account_type").notNull().default("INDIVIDUAL"), // INDIVIDUAL, CORPORATE, PARTNERSHIP
  segment: varchar("segment").notNull().default("EQUITY"), // EQUITY, DERIVATIVES, COMMODITY
  status: varchar("status").notNull().default("active"), // active, inactive, suspended
  availableBalance: decimal("available_balance", { precision: 15, scale: 2 }).default("0.00"),
  utilizedBalance: decimal("utilized_balance", { precision: 15, scale: 2 }).default("0.00"),
  totalBalance: decimal("total_balance", { precision: 15, scale: 2 }).default("0.00"),
  exposureLimit: decimal("exposure_limit", { precision: 15, scale: 2 }).default("0.00"),
  dayTradingLimit: decimal("day_trading_limit", { precision: 15, scale: 2 }).default("0.00"),
  isLinked: boolean("is_linked").default(false),
  apiKey: varchar("api_key"),
  apiSecret: varchar("api_secret"),
  accessToken: varchar("access_token"),
  lastSyncAt: timestamp("last_sync_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const marketIndices = pgTable("market_indices", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(), // NIFTY 50, SENSEX, NIFTY BANK, etc.
  symbol: varchar("symbol").notNull().unique(),
  exchange: varchar("exchange").notNull(),
  currentValue: decimal("current_value", { precision: 10, scale: 2 }).notNull(),
  change: decimal("change", { precision: 10, scale: 2 }).notNull(),
  changePercent: decimal("change_percent", { precision: 5, scale: 2 }).notNull(),
  open: decimal("open", { precision: 10, scale: 2 }).notNull(),
  high: decimal("high", { precision: 10, scale: 2 }).notNull(),
  low: decimal("low", { precision: 10, scale: 2 }).notNull(),
  previousClose: decimal("previous_close", { precision: 10, scale: 2 }).notNull(),
  volume: decimal("volume", { precision: 15, scale: 2 }).default("0.00"),
  timestamp: timestamp("timestamp").defaultNow(),
  isActive: boolean("is_active").default(true),
});

export const mutualFunds = pgTable("mutual_funds", {
  id: serial("id").primaryKey(),
  schemeCode: varchar("scheme_code").notNull().unique(),
  schemeName: varchar("scheme_name").notNull(),
  fundHouse: varchar("fund_house").notNull(),
  category: varchar("category").notNull(), // Equity, Debt, Hybrid, etc.
  subCategory: varchar("sub_category").notNull(),
  nav: decimal("nav", { precision: 10, scale: 4 }).notNull(),
  navDate: timestamp("nav_date").notNull(),
  aum: decimal("aum", { precision: 15, scale: 2 }),
  expenseRatio: decimal("expense_ratio", { precision: 5, scale: 2 }),
  minInvestment: decimal("min_investment", { precision: 10, scale: 2 }).default("100.00"),
  minSip: decimal("min_sip", { precision: 10, scale: 2 }).default("100.00"),
  exitLoad: decimal("exit_load", { precision: 5, scale: 2 }),
  returns1Y: decimal("returns_1y", { precision: 5, scale: 2 }),
  returns3Y: decimal("returns_3y", { precision: 5, scale: 2 }),
  returns5Y: decimal("returns_5y", { precision: 5, scale: 2 }),
  riskLevel: varchar("risk_level").notNull().default("moderate"), // low, moderate, high, very_high
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const mfHoldings = pgTable("mf_holdings", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  portfolioId: integer("portfolio_id").notNull().references(() => portfolios.id),
  fundId: integer("fund_id").notNull().references(() => mutualFunds.id),
  folioNumber: varchar("folio_number").notNull(),
  units: decimal("units", { precision: 10, scale: 4 }).notNull(),
  avgNav: decimal("avg_nav", { precision: 10, scale: 4 }).notNull(),
  currentNav: decimal("current_nav", { precision: 10, scale: 4 }).notNull(),
  investment: decimal("investment", { precision: 15, scale: 2 }).notNull(),
  currentValue: decimal("current_value", { precision: 15, scale: 2 }).notNull(),
  pnl: decimal("pnl", { precision: 15, scale: 2 }).notNull(),
  pnlPercent: decimal("pnl_percent", { precision: 5, scale: 2 }).notNull(),
  sipAmount: decimal("sip_amount", { precision: 10, scale: 2 }),
  sipDate: integer("sip_date"),
  sipStatus: varchar("sip_status").default("inactive"), // active, inactive, paused
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Type definitions for stock trading
export type InsertStock = typeof stocks.$inferInsert;
export type Stock = typeof stocks.$inferSelect;
export type InsertStockPrice = typeof stockPrices.$inferInsert;
export type StockPrice = typeof stockPrices.$inferSelect;
export type InsertPortfolio = typeof portfolios.$inferInsert;
export type Portfolio = typeof portfolios.$inferSelect;
export type InsertHolding = typeof holdings.$inferInsert;
export type Holding = typeof holdings.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;
export type Order = typeof orders.$inferSelect;
export type InsertWatchlist = typeof watchlists.$inferInsert;
export type Watchlist = typeof watchlists.$inferSelect;
export type InsertWatchlistItem = typeof watchlistItems.$inferInsert;
export type WatchlistItem = typeof watchlistItems.$inferSelect;
export type InsertTradingAccount = typeof tradingAccounts.$inferInsert;
export type TradingAccount = typeof tradingAccounts.$inferSelect;
export type InsertMarketIndex = typeof marketIndices.$inferInsert;
export type MarketIndex = typeof marketIndices.$inferSelect;
export type InsertMutualFund = typeof mutualFunds.$inferInsert;
export type MutualFund = typeof mutualFunds.$inferSelect;
export type InsertMfHolding = typeof mfHoldings.$inferInsert;
export type MfHolding = typeof mfHoldings.$inferSelect;

// Insert schemas for stock trading
export const insertStockSchema = createInsertSchema(stocks).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertStockPriceSchema = createInsertSchema(stockPrices).omit({
  id: true,
  timestamp: true,
});

export const insertPortfolioSchema = createInsertSchema(portfolios).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertHoldingSchema = createInsertSchema(holdings).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  orderId: true,
  createdAt: true,
  updatedAt: true,
});

export const insertWatchlistSchema = createInsertSchema(watchlists).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertWatchlistItemSchema = createInsertSchema(watchlistItems).omit({
  id: true,
  createdAt: true,
});

export const insertTradingAccountSchema = createInsertSchema(tradingAccounts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertMarketIndexSchema = createInsertSchema(marketIndices).omit({
  id: true,
  timestamp: true,
});

export const insertMutualFundSchema = createInsertSchema(mutualFunds).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertMfHoldingSchema = createInsertSchema(mfHoldings).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
