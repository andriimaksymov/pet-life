"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { createSafeAction } from "@/lib/create-safe-action";
import { PetSchema } from "@/schemas/pet";
import { revalidatePath } from "next/cache";

async function createPetHandler(data: z.infer<typeof PetSchema>) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  try {
    const pet = await db.pet.create({
      data: {
        ...data,
        userId: session.user.id,
      },
    });

    revalidatePath("/dashboard");
    return { data: pet };
  } catch (error) {
    console.error("Database Error:", error);
    return { error: "Failed to create pet" };
  }
}

export const createPet = createSafeAction(PetSchema, createPetHandler);
