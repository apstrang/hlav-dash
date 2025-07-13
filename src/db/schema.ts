import { sql } from "drizzle-orm/sql"
import { foreignKey, pgPolicy, integer, pgTable, varchar, uuid, text, boolean, timestamp } from "drizzle-orm/pg-core"
import { authUsers, authenticatedRole } from "drizzle-orm/supabase"

export const profilesTable = pgTable(
	'profiles',
	{
		id: uuid().primaryKey(),
		name: text().unique(),
		phone: integer(),
		email: varchar(),
		userRole: integer('user_role'),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		rmsId: integer('rms_id'),
	},
	(table) => [
		foreignKey({
			columns: [table.id],
			foreignColumns: [authUsers.id],
			name: 'profiles_id_fk',
		}).onDelete('cascade'),
		foreignKey({
			columns: [table.userRole],
			foreignColumns: [rolesTable.id],
			name: 'profiles_role_fk',
		}).onDelete('cascade'),
		pgPolicy("authenticated users can view all profiles", {
			for: 'select',
			to: authenticatedRole,
			using: sql`true`,
		}),
	]
);

export const rolesTable = pgTable(
	'user_roles',
	{
		id: integer('id').primaryKey(),
		title: text('title'),
		canViewAll: boolean('can_update_all').default(false),
		canUpdateAll: boolean('can_update_all').default(false),
		canInsertAll: boolean('can_insert_all').default(false),
		canViewSelf: boolean('can_view_self').default(true),
		canUpdateSelf: boolean('can_update_self').default(true),
		canDeleteSelf: boolean('can_delete_self').default(true),
		canInsertSelf: boolean('can_insert_self').default(true),
	}
)

export type InsertProfile = typeof profilesTable.$inferInsert;
export type SelectProfile = typeof profilesTable.$inferSelect;

export type InsertRole = typeof rolesTable.$inferInsert;
export type SelectRole = typeof rolesTable.$inferSelect;
