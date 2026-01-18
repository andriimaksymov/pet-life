"use server";

import { auth } from "@/auth";
import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { HealthRecordSchema } from "@/schemas/health-record";
import { revalidatePath } from "next/cache";
import * as z from "zod";

async function createHealthRecordHandler(data: z.infer<typeof HealthRecordSchema>) {
  const session = await auth();

  if (!session?.user || !session.user.id) {
    return {
      error: "Unauthorized",
    };
  }

  const { petId, type, title, date, notes, metadata } = data;

  // Verify pet ownership
  const pet = await db.pet.findUnique({
    where: {
      id: petId,
      userId: session.user.id,
    },
  });

  if (!pet) {
    return {
      error: "Pet not found or unauthorized",
    };
  }

  try {
    const healthRecord = await db.healthRecord.create({
      data: {
        petId,
        type,
        title,
        date,
        notes,
        metadata: metadata ? JSON.stringify(metadata) : undefined,
      },
    });

    revalidatePath(`/dashboard/pets/${petId}`);
    return { data: healthRecord };
  } catch (error) {
    return {
      error: "Failed to create health record.",
    };
  }
}

async function deleteHealthRecordHandler(data: { id: string; petId: string }) {
     const session = await auth();

  if (!session?.user || !session.user.id) {
    return {
      error: "Unauthorized",
    };
  }
  
  const { id, petId } = data;
  
   // Verify pet ownership (indirectly verifies record access rights)
   const pet = await db.pet.findUnique({
    where: {
      id: petId,
      userId: session.user.id,
    },
  });

  if (!pet) {
    return {
      error: "Pet not found or unauthorized",
    };
  }
  
  try {
      await db.healthRecord.delete({
          where: {
              id: id,
          }
      });
      
      revalidatePath(`/dashboard/pets/${petId}`);
      return { data: { success: true }};
  } catch (error) {
      return {
          error: "Failed to delete health record"
      }
  }
}

export const createHealthRecord = createSafeAction(HealthRecordSchema, createHealthRecordHandler);
// We can construct a simple schema for delete if we want to use createSafeAction, or just export a separate function. 
// For now, let's keep it simple or create a mini schema.
const DeleteSchema = z.object({
    id: z.string(),
    petId: z.string()
});
export const deleteHealthRecord = createSafeAction(DeleteSchema, deleteHealthRecordHandler);
