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

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type InsertTransaction = typeof transactions.$inferInsert;
export type Transaction = typeof transactions.$inferSelect;
export type InsertPaymentRequest = typeof paymentRequests.$inferInsert;
export type PaymentRequest = typeof paymentRequests.$inferSelect;
export type InsertMerchant = typeof merchants.$inferInsert;
export type Merchant = typeof merchants.$inferSelect;

export const insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true,
  createdAt: true,
});

export const insertPaymentRequestSchema = createInsertSchema(paymentRequests).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
