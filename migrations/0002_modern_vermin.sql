CREATE TABLE "rwa_investments" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"token_id" integer NOT NULL,
	"tokens_owned" numeric(15, 2) NOT NULL,
	"total_invested" numeric(15, 2) NOT NULL,
	"current_value" numeric(15, 2) NOT NULL,
	"yield_earned" numeric(15, 2) DEFAULT '0.00',
	"purchase_date" timestamp DEFAULT now(),
	"last_updated" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "rwa_market_data" (
	"id" serial PRIMARY KEY NOT NULL,
	"token_id" integer NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"volume_24h" numeric(15, 2) DEFAULT '0.00',
	"price_change_24h" numeric(5, 2) DEFAULT '0.00',
	"market_cap" numeric(15, 2) DEFAULT '0.00',
	"liquidity" numeric(15, 2) DEFAULT '0.00',
	"timestamp" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "rwa_tokens" (
	"id" serial PRIMARY KEY NOT NULL,
	"asset_id" integer NOT NULL,
	"token_symbol" varchar NOT NULL,
	"token_name" varchar NOT NULL,
	"total_supply" numeric(15, 2) NOT NULL,
	"available_supply" numeric(15, 2) NOT NULL,
	"price_per_token" numeric(10, 2) NOT NULL,
	"minimum_investment" numeric(10, 2) DEFAULT '100.00' NOT NULL,
	"yield_rate" numeric(5, 2) DEFAULT '0.00',
	"contract_address" varchar,
	"trading_enabled" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "rwa_tokens_token_symbol_unique" UNIQUE("token_symbol")
);
--> statement-breakpoint
CREATE TABLE "rwa_transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"token_id" integer NOT NULL,
	"type" varchar NOT NULL,
	"quantity" numeric(15, 2) NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"total_amount" numeric(15, 2) NOT NULL,
	"status" varchar DEFAULT 'pending' NOT NULL,
	"transaction_hash" varchar,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "rwassets" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"name" varchar NOT NULL,
	"description" text,
	"asset_type" varchar NOT NULL,
	"category" varchar NOT NULL,
	"value" numeric(15, 2) NOT NULL,
	"location" varchar,
	"image_url" varchar,
	"document_url" varchar,
	"verification_status" varchar DEFAULT 'pending' NOT NULL,
	"tokenization_status" varchar DEFAULT 'not_tokenized' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "rwa_investments" ADD CONSTRAINT "rwa_investments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rwa_investments" ADD CONSTRAINT "rwa_investments_token_id_rwa_tokens_id_fk" FOREIGN KEY ("token_id") REFERENCES "public"."rwa_tokens"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rwa_market_data" ADD CONSTRAINT "rwa_market_data_token_id_rwa_tokens_id_fk" FOREIGN KEY ("token_id") REFERENCES "public"."rwa_tokens"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rwa_tokens" ADD CONSTRAINT "rwa_tokens_asset_id_rwassets_id_fk" FOREIGN KEY ("asset_id") REFERENCES "public"."rwassets"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rwa_transactions" ADD CONSTRAINT "rwa_transactions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rwa_transactions" ADD CONSTRAINT "rwa_transactions_token_id_rwa_tokens_id_fk" FOREIGN KEY ("token_id") REFERENCES "public"."rwa_tokens"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rwassets" ADD CONSTRAINT "rwassets_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;