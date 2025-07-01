CREATE TABLE "merchants" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"category" varchar NOT NULL,
	"image" varchar,
	"address" text,
	"verified" boolean DEFAULT false,
	"supports_offline" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "payment_requests" (
	"id" serial PRIMARY KEY NOT NULL,
	"from_user_id" varchar NOT NULL,
	"to_user_id" varchar NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"note" text,
	"status" varchar DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"sid" varchar PRIMARY KEY NOT NULL,
	"sess" jsonb NOT NULL,
	"expire" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"merchant_name" varchar NOT NULL,
	"merchant_image" varchar,
	"amount" numeric(10, 2) NOT NULL,
	"type" varchar NOT NULL,
	"category" varchar NOT NULL,
	"status" varchar DEFAULT 'completed' NOT NULL,
	"note" text,
	"transaction_id" varchar NOT NULL,
	"is_offline" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "transactions_transaction_id_unique" UNIQUE("transaction_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar PRIMARY KEY NOT NULL,
	"email" varchar,
	"first_name" varchar,
	"last_name" varchar,
	"profile_image_url" varchar,
	"phone_number" varchar,
	"balance" numeric(10, 2) DEFAULT '0.00',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "payment_requests" ADD CONSTRAINT "payment_requests_from_user_id_users_id_fk" FOREIGN KEY ("from_user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payment_requests" ADD CONSTRAINT "payment_requests_to_user_id_users_id_fk" FOREIGN KEY ("to_user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "IDX_session_expire" ON "sessions" USING btree ("expire");