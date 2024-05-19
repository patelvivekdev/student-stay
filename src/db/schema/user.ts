import { integer, sqliteTable, text, primaryKey } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"; 

export const users = sqliteTable("user", {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text("email").notNull(),
    emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
    image: text("image"),
    gender: text('gender', { enum: ["male", "female"] }),
    address: text('address'),
    home_country: text('home_country'),
    is_looking_for_accommodation: integer('is_looking_for_accommodation', {mode: 'boolean'}).default(false),
    is_looking_for_accommodate: integer('is_looking_for_accommodate' , {mode: 'boolean'}).default(false),
    created_at: integer('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
    updated_at: integer('updated_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
})

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;
