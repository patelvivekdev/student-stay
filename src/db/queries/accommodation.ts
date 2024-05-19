import { db } from '../index'
import { InsertAccommodation, SelectAccommodation, accommodationTable } from '../schema/accommodation'

export async function createAccommodation(data: InsertAccommodation) {
  await db.insert(accommodationTable).values(data);
}