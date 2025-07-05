CREATE TABLE "holdings" (
	"id" serial PRIMARY KEY NOT NULL,
	"portfolio_id" integer NOT NULL,
	"user_id" varchar NOT NULL,
	"stock_id" integer NOT NULL,
	"quantity" numeric(10, 2) NOT NULL,
	"avg_price" numeric(10, 2) NOT NULL,
	"current_price" numeric(10, 2) NOT NULL,
	"investment" numeric(15, 2) NOT NULL,
	"current_value" numeric(15, 2) NOT NULL,
	"pnl" numeric(15, 2) NOT NULL,
	"pnl_percent" numeric(5, 2) NOT NULL,
	"day_change" numeric(10, 2) DEFAULT '0.00',
	"day_change_percent" numeric(5, 2) DEFAULT '0.00',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "market_indices" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"symbol" varchar NOT NULL,
	"exchange" varchar NOT NULL,
	"current_value" numeric(10, 2) NOT NULL,
	"change" numeric(10, 2) NOT NULL,
	"change_percent" numeric(5, 2) NOT NULL,
	"open" numeric(10, 2) NOT NULL,
	"high" numeric(10, 2) NOT NULL,
	"low" numeric(10, 2) NOT NULL,
	"previous_close" numeric(10, 2) NOT NULL,
	"volume" numeric(15, 2) DEFAULT '0.00',
	"timestamp" timestamp DEFAULT now(),
	"is_active" boolean DEFAULT true,
	CONSTRAINT "market_indices_symbol_unique" UNIQUE("symbol")
);
--> statement-breakpoint
CREATE TABLE "mf_holdings" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"portfolio_id" integer NOT NULL,
	"fund_id" integer NOT NULL,
	"folio_number" varchar NOT NULL,
	"units" numeric(10, 4) NOT NULL,
	"avg_nav" numeric(10, 4) NOT NULL,
	"current_nav" numeric(10, 4) NOT NULL,
	"investment" numeric(15, 2) NOT NULL,
	"current_value" numeric(15, 2) NOT NULL,
	"pnl" numeric(15, 2) NOT NULL,
	"pnl_percent" numeric(5, 2) NOT NULL,
	"sip_amount" numeric(10, 2),
	"sip_date" integer,
	"sip_status" varchar DEFAULT 'inactive',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "mutual_funds" (
	"id" serial PRIMARY KEY NOT NULL,
	"scheme_code" varchar NOT NULL,
	"scheme_name" varchar NOT NULL,
	"fund_house" varchar NOT NULL,
	"category" varchar NOT NULL,
	"sub_category" varchar NOT NULL,
	"nav" numeric(10, 4) NOT NULL,
	"nav_date" timestamp NOT NULL,
	"aum" numeric(15, 2),
	"expense_ratio" numeric(5, 2),
	"min_investment" numeric(10, 2) DEFAULT '100.00',
	"min_sip" numeric(10, 2) DEFAULT '100.00',
	"exit_load" numeric(5, 2),
	"returns_1y" numeric(5, 2),
	"returns_3y" numeric(5, 2),
	"returns_5y" numeric(5, 2),
	"risk_level" varchar DEFAULT 'moderate' NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "mutual_funds_scheme_code_unique" UNIQUE("scheme_code")
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"portfolio_id" integer NOT NULL,
	"stock_id" integer NOT NULL,
	"order_id" varchar NOT NULL,
	"type" varchar NOT NULL,
	"order_type" varchar NOT NULL,
	"quantity" numeric(10, 2) NOT NULL,
	"price" numeric(10, 2),
	"trigger_price" numeric(10, 2),
	"executed_quantity" numeric(10, 2) DEFAULT '0.00',
	"executed_price" numeric(10, 2),
	"status" varchar DEFAULT 'pending' NOT NULL,
	"validity" varchar DEFAULT 'DAY' NOT NULL,
	"product" varchar DEFAULT 'CNC' NOT NULL,
	"exchange" varchar NOT NULL,
	"segment" varchar DEFAULT 'EQUITY' NOT NULL,
	"fees" numeric(10, 2) DEFAULT '0.00',
	"taxes" numeric(10, 2) DEFAULT '0.00',
	"total_amount" numeric(15, 2) NOT NULL,
	"executed_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "orders_order_id_unique" UNIQUE("order_id")
);
--> statement-breakpoint
CREATE TABLE "portfolios" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"name" varchar DEFAULT 'My Portfolio' NOT NULL,
	"type" varchar DEFAULT 'equity' NOT NULL,
	"total_value" numeric(15, 2) DEFAULT '0.00',
	"total_investment" numeric(15, 2) DEFAULT '0.00',
	"total_pnl" numeric(15, 2) DEFAULT '0.00',
	"total_pnl_percent" numeric(5, 2) DEFAULT '0.00',
	"is_default" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "stock_prices" (
	"id" serial PRIMARY KEY NOT NULL,
	"stock_id" integer NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"open" numeric(10, 2) NOT NULL,
	"high" numeric(10, 2) NOT NULL,
	"low" numeric(10, 2) NOT NULL,
	"volume" numeric(15, 2) NOT NULL,
	"change" numeric(10, 2) NOT NULL,
	"change_percent" numeric(5, 2) NOT NULL,
	"timestamp" timestamp DEFAULT now(),
	"market_status" varchar DEFAULT 'open' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "stocks" (
	"id" serial PRIMARY KEY NOT NULL,
	"symbol" varchar NOT NULL,
	"name" varchar NOT NULL,
	"exchange" varchar NOT NULL,
	"sector" varchar NOT NULL,
	"industry" varchar NOT NULL,
	"market_cap" numeric(15, 2) DEFAULT '0.00',
	"pe_ratio" numeric(8, 2),
	"pb_ratio" numeric(8, 2),
	"dividend_yield" numeric(5, 2),
	"week_52_high" numeric(10, 2),
	"week_52_low" numeric(10, 2),
	"avg_volume" numeric(15, 2),
	"beta" numeric(5, 2),
	"eps" numeric(8, 2),
	"logo_url" varchar,
	"description" text,
	"website" varchar,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "stocks_symbol_unique" UNIQUE("symbol")
);
--> statement-breakpoint
CREATE TABLE "trading_accounts" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"broker_id" varchar NOT NULL,
	"broker_name" varchar NOT NULL,
	"account_id" varchar NOT NULL,
	"account_type" varchar DEFAULT 'INDIVIDUAL' NOT NULL,
	"segment" varchar DEFAULT 'EQUITY' NOT NULL,
	"status" varchar DEFAULT 'active' NOT NULL,
	"available_balance" numeric(15, 2) DEFAULT '0.00',
	"utilized_balance" numeric(15, 2) DEFAULT '0.00',
	"total_balance" numeric(15, 2) DEFAULT '0.00',
	"exposure_limit" numeric(15, 2) DEFAULT '0.00',
	"day_trading_limit" numeric(15, 2) DEFAULT '0.00',
	"is_linked" boolean DEFAULT false,
	"api_key" varchar,
	"api_secret" varchar,
	"access_token" varchar,
	"last_sync_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "watchlist_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"watchlist_id" integer NOT NULL,
	"stock_id" integer NOT NULL,
	"alert_price" numeric(10, 2),
	"alert_type" varchar,
	"is_alert_enabled" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "watchlists" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"name" varchar DEFAULT 'My Watchlist' NOT NULL,
	"is_default" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "holdings" ADD CONSTRAINT "holdings_portfolio_id_portfolios_id_fk" FOREIGN KEY ("portfolio_id") REFERENCES "public"."portfolios"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "holdings" ADD CONSTRAINT "holdings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "holdings" ADD CONSTRAINT "holdings_stock_id_stocks_id_fk" FOREIGN KEY ("stock_id") REFERENCES "public"."stocks"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mf_holdings" ADD CONSTRAINT "mf_holdings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mf_holdings" ADD CONSTRAINT "mf_holdings_portfolio_id_portfolios_id_fk" FOREIGN KEY ("portfolio_id") REFERENCES "public"."portfolios"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mf_holdings" ADD CONSTRAINT "mf_holdings_fund_id_mutual_funds_id_fk" FOREIGN KEY ("fund_id") REFERENCES "public"."mutual_funds"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_portfolio_id_portfolios_id_fk" FOREIGN KEY ("portfolio_id") REFERENCES "public"."portfolios"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_stock_id_stocks_id_fk" FOREIGN KEY ("stock_id") REFERENCES "public"."stocks"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "portfolios" ADD CONSTRAINT "portfolios_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stock_prices" ADD CONSTRAINT "stock_prices_stock_id_stocks_id_fk" FOREIGN KEY ("stock_id") REFERENCES "public"."stocks"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "trading_accounts" ADD CONSTRAINT "trading_accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "watchlist_items" ADD CONSTRAINT "watchlist_items_watchlist_id_watchlists_id_fk" FOREIGN KEY ("watchlist_id") REFERENCES "public"."watchlists"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "watchlist_items" ADD CONSTRAINT "watchlist_items_stock_id_stocks_id_fk" FOREIGN KEY ("stock_id") REFERENCES "public"."stocks"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "watchlists" ADD CONSTRAINT "watchlists_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;