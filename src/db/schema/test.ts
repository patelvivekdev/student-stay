// import { sqliteTable, text, integer} from 'drizzle-orm/sqlite-core';

// // New Tables

// const addresses = sqliteTable('addresses', {
//   id: integer('id').primaryKey({ autoIncrement: true }),
//   address: text('address').notNull(),
//   location: text('location'), // Placeholder for GEOGRAPHY(POINT, 4326), as Drizzle does not natively support GEOGRAPHY
//   nearby_bus_ion_station: text('nearby_bus_ion_station'),
//   nearby_grocery_stores: text('nearby_grocery_stores'),
//   created_at: timestamp('created_at').defaultTo('CURRENT_TIMESTAMP'),
//   updated_at: timestamp('updated_at').defaultTo('CURRENT_TIMESTAMP'),
// });

// const accommodations = sqliteTable('accommodations', {
//   id: integer('id').primaryKey({ autoIncrement: true }),
//   type: text('type').notNull().check(['For Lease', 'Have Space']),
//   address_id: integer('address_id').notNull(),
//   num_students_allowed: integer('num_students_allowed').notNull(),
//   rent: integer('rent').notNull(), // Using integer as a placeholder for DECIMAL
//   beds: integer('beds').notNull(),
//   washrooms: integer('washrooms').notNull(),
//   in_house_laundry: boolean('in_house_laundry').defaultTo(false),
//   parking: boolean('parking').defaultTo(false),
//   basement: boolean('basement').defaultTo(false),
//   owner_id: text('owner_id'),
//   is_occupied: boolean('is_occupied').defaultTo(false),
//   have_space_for_accommodate: boolean('have_space_for_accommodate').defaultTo(false),
//   lease_months: integer('lease_months').notNull(),
//   images: text('images'), // Drizzle does not natively support arrays, using text as a placeholder
//   created_at: timestamp('created_at').defaultTo('CURRENT_TIMESTAMP'),
//   updated_at: timestamp('updated_at').defaultTo('CURRENT_TIMESTAMP'),
// }).references('addresses', { columns: 'address_id', referencedColumns: 'id' })
// .references('user', { columns: 'owner_id', referencedColumns: 'id' });
