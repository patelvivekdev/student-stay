"use server"

import { revalidatePath } from 'next/cache';
import { db } from '../index'
import { InsertAccommodation, SelectAccommodation, accommodationTable } from '../schema/accommodation'

export async function createAccommodation(data: InsertAccommodation) {
  let response:any = await db.insert(accommodationTable).values(data);
  console.log("response", response)
  revalidatePath('/');
//   return response;
}

export async function getAccommodation() {
  let response = await db.select().from(accommodationTable);
  return response;
}
