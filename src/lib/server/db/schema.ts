import { pgTable, text, integer, timestamp, serial } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: text('id').primaryKey(),
	age: integer('age'),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull()
});

export type User = typeof users.$inferSelect;

export const sessions = pgTable('sessions', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export type Session = typeof sessions.$inferSelect;

export const names = pgTable('names', {
	id: serial('id').primaryKey(),
	name: text('name').notNull().unique()
});

export type Name = typeof names.$inferSelect;
