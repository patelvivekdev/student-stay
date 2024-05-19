import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { users } from './user';

export const accommodationTable = sqliteTable('accommodation', {
    id: integer('id', { mode: 'number' }).primaryKey(),
    name: text('name').notNull(),
    type: text("type").notNull(),
    description: text('description'),
    street: text("street"),
    city: text("city"),
    zipcode: text("zipcode"),
    beds: integer("beds", { mode: 'number' }).notNull(),
    baths: integer("baths", { mode: 'number' }).notNull(),
    price: integer('price', { mode: 'number' }).notNull(),
    is_featured: integer("is_featured", { mode: "boolean" }).default(false),
    is_active: integer("is_active", { mode: "boolean" }).default(true),
    userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
    createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`).notNull(),
    updateAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(() => new Date()),
});


export type InsertAccommodation = typeof accommodationTable.$inferInsert;
export type SelectAccommodation = typeof accommodationTable.$inferSelect;
