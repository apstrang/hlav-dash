ALTER TABLE "user_roles" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE POLICY "authenticated can view" ON "user_roles" AS PERMISSIVE FOR SELECT TO "authenticated" USING (true);