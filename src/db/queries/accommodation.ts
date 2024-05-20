"use server";

import { revalidatePath, unstable_noStore } from "next/cache";
import { db } from "../index";
import {
  InsertAccommodation,
  accommodationTable,
  InsertImage,
  imagesTable,
} from "../schema/accommodation";
import { users } from "../schema/user";
import { eq, getTableColumns, sql } from "drizzle-orm";
import cloudinary from "@/lib/cloudinary";

export async function createAccommodation(
  data: InsertAccommodation,
  images: string[]
) {
  let response: any = await db.insert(accommodationTable).values(data);
  revalidatePath("/");
  //   return response;
}

export async function getAccommodation() {
  unstable_noStore();
  // get all accommodations with their images and user
  const results = await db
    .select({
      accommodation: accommodationTable,
      user: users,
      images: sql<string>`group_concat(${imagesTable.imagePath})`
    })
    .from(accommodationTable)
    .leftJoin(users, eq(accommodationTable.userId, users.id))
    .leftJoin(
      imagesTable,
      eq(accommodationTable.id, imagesTable.accommodationId,)
    )
    .groupBy(accommodationTable.id)
    .all();

  return results;
}

export async function createAccommodationWithImages(
  accommodationData: InsertAccommodation,
  formData: FormData
) {
  await db.transaction(async (tx) => {
    try {
      const [newAccommodation] = await tx
        .insert(accommodationTable)
        .values(accommodationData)
        .returning();
      const accommodationId = newAccommodation.id;

      let imagesData = [];

      const images = formData.getAll("files") as File[];

      for (const imageFile of images!) {
        const imageBuffer = await imageFile.arrayBuffer();
        const imageArray = Array.from(new Uint8Array(imageBuffer));
        const imageData = Buffer.from(imageArray);
        // Convert the image data to base64
        const imageBase64 = imageData.toString("base64");

        try {
          // Make request to upload to Cloudinary
          const result = await cloudinary.uploader.upload(
            `data:image/png;base64,${imageBase64}`,
            {
              folder: "accommodation",
            }
          );
          imagesData.push({
            imagePath: result.secure_url,
            imagePublicId: result.public_id,
          });
        } catch (error) {
          console.error("Error uploading image to Cloudinary:", error);
          throw error;
        }
      }
      await tx
        .insert(imagesTable)
        .values(imagesData.map((image) => ({ ...image, accommodationId })));
      revalidatePath("/");
    } catch (error) {
      tx.rollback();
      console.error("Error creating accommodation with images:", error);
      throw error;
    }
  });
}
