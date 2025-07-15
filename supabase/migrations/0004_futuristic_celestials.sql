CREATE TABLE "events" (
	"id" uuid PRIMARY KEY NOT NULL,
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
CREATE TABLE "shift_presets" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"note" varchar,
	"color" varchar,
	"duration" interval NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "shift_presets" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_owned_by_fk" FOREIGN KEY ("owned_by") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_created_by_fk" FOREIGN KEY ("created_by") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE POLICY "authenticated users can view all events" ON "events" AS PERMISSIVE FOR SELECT TO "authenticated" USING (true);--> statement-breakpoint
CREATE POLICY "authenticated admins have full access" ON "shift_presets" AS PERMISSIVE FOR ALL TO "authenticated" USING (exists(select 1 from profiles where auth.uid() = profiles.id and profiles.user_role <= 3)) WITH CHECK (exists(select 1 from profiles where auth.uid() = profiles.id and profiles.user_role <= 3));