CREATE TABLE "events" (
	"id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	"owned_by" uuid NOT NULL,
	"created_by" uuid NOT NULL,
	"source" varchar DEFAULT 'internal' NOT NULL,
	"external_id" varchar,
	"title" varchar NOT NULL,
	"starts_at" timestamp NOT NULL,
	"ends_at" timestamp NOT NULL,
	"color" varchar,
	"is_pending" boolean NOT NULL,
	"last_sync" timestamp,
	"sync_status" varchar,
	"ms_etag" varchar,
	"approval_status" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "events" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_owned_by_fk" FOREIGN KEY ("owned_by") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_created_by_fk" FOREIGN KEY ("created_by") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE POLICY "authenticated users can view all events" ON "events" AS PERMISSIVE FOR SELECT TO "authenticated" USING (true);--> statement-breakpoint
CREATE POLICY "users can modify their own data" ON "events" TO authenticated USING (exists(select 1 from profiles where auth.uid() = profiles.id)) WITH CHECK (exists(select 1 from profiles where auth.uid() = profiles.id));--> statement-breakpoint

