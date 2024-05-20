"use server"

import { revalidatePath, unstable_noStore } from 'next/cache';
import { db } from '../index'
import { InsertAccommodation, accommodationTable, InsertImage, imagesTable } from '../schema/accommodation'
import {users} from "../schema/user"
import { eq } from "drizzle-orm";

export async function createAccommodation(data: InsertAccommodation, images: string[]) {
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

export async function createAccommodationWithImages(accommodationData: InsertAccommodation, imagesData: 
  {
    imagePath: string;
    imagePublicId: string;
    id?: number | undefined;
    createdAt?: string | undefined;
    updateAt?: Date | null | undefined;
}[]) {
  await db.transaction(async (tx) => {
    try{
      const [newAccommodation] = await tx.insert(accommodationTable).values(accommodationData).returning();
      const accommodationId = newAccommodation.id;
      await tx.insert(imagesTable).values(imagesData.map((image) => ({ ...image, accommodationId })));
      revalidatePath('/');
    } catch (error) {
      tx.rollback();
      console.error('Error creating accommodation with images:', error);
      throw error;
    }
  });
}