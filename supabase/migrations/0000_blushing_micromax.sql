CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text,
	"phone" integer,
	"email" varchar,
	"user_role" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"rms_id" integer,
	CONSTRAINT "profiles_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "profiles" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "user_roles" (
	"id" integer PRIMARY KEY NOT NULL,
	"title" text,
	"can_update_all" boolean DEFAULT false,
	"can_insert_all" boolean DEFAULT false,
	"can_view_self" boolean DEFAULT true,
	"can_update_self" boolean DEFAULT true,
	"can_delete_self" boolean DEFAULT true,
	"can_insert_self" boolean DEFAULT true
);
--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_id_fk" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_role_fk" FOREIGN KEY ("user_role") REFERENCES "public"."user_roles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE POLICY "authenticated users can view all profiles" ON "profiles" AS PERMISSIVE FOR SELECT TO "authenticated" USING (true);