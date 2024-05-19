"use server"

import { revalidatePath, unstable_noStore } from 'next/cache';
import { db } from '../index'
import { InsertAccommodation, accommodationTable } from '../schema/accommodation'
import {users} from "../schema/user"
import { eq } from "drizzle-orm";

export async function createAccommodation(data: InsertAccommodation) {
  let response:any = await db.insert(accommodationTable).values(data);
  console.log("response", response)
  revalidatePath('/');
//   return response;
}

export async function getAccommodation() {
  unstable_noStore();

  const result = await db.select().from(accommodationTable).innerJoin(users, eq(accommodationTable.userId, users.id))
  return result;
}
