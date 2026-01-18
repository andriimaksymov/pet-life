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
        name: data.name,
        species: data.species,
        breed: data.breed || null,
        gender: data.gender || "UNKNOWN",
        isNeutered: data.isNeutered || false,
        birthDate: data.birthDate || null,
        weight: data.weight || null,
        photoUrl: data.photoUrl || null,
        allergies: data.allergies || [],
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

// Update pet weight
const UpdateWeightSchema = z.object({
  petId: z.string(),
  weight: z.coerce.number().min(0),
});

async function updatePetWeightHandler(data: z.infer<typeof UpdateWeightSchema>) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  try {
    // Verify pet belongs to user
    const pet = await db.pet.findFirst({
      where: {
        id: data.petId,
        userId: session.user.id,
      },
    });

    if (!pet) {
      return { error: "Pet not found" };
    }

    // Update pet weight
    await db.pet.update({
      where: { id: data.petId },
      data: { weight: data.weight },
    });

    // Also log as a health record for tracking
    await db.healthRecord.create({
      data: {
        type: "VISIT",
        title: "Weight Update",
        date: new Date(),
        notes: `Weight recorded: ${data.weight} kg`,
        metadata: { weight: data.weight.toString() },
        petId: data.petId,
      },
    });

    revalidatePath("/dashboard");
    revalidatePath(`/dashboard/pets/${data.petId}`);
    return { success: true };
  } catch (error) {
    console.error("Database Error:", error);
    return { error: "Failed to update weight" };
  }
}

export const updatePetWeight = createSafeAction(UpdateWeightSchema, updatePetWeightHandler);

// Log medication
const LogMedicationSchema = z.object({
  petId: z.string(),
  medicationName: z.string().min(1),
  notes: z.string().optional(),
});

async function logMedicationHandler(data: z.infer<typeof LogMedicationSchema>) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  try {
    // Verify pet belongs to user
    const pet = await db.pet.findFirst({
      where: {
        id: data.petId,
        userId: session.user.id,
      },
    });

    if (!pet) {
      return { error: "Pet not found" };
    }

    await db.healthRecord.create({
      data: {
        type: "MEDICATION",
        title: data.medicationName,
        date: new Date(),
        notes: data.notes || `${data.medicationName} administered`,
        metadata: { administered: true },
        petId: data.petId,
      },
    });

    revalidatePath("/dashboard");
    revalidatePath(`/dashboard/pets/${data.petId}`);
    return { success: true };
  } catch (error) {
    console.error("Database Error:", error);
    return { error: "Failed to log medication" };
  }
}

export const logMedication = createSafeAction(LogMedicationSchema, logMedicationHandler);
