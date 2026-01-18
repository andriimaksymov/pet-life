import { z } from "zod";

// Species enum matching Prisma
export const SpeciesEnum = z.enum(["DOG", "CAT", "RABBIT", "BIRD", "REPTILE", "OTHER"]);
export type Species = z.infer<typeof SpeciesEnum>;

// Gender enum matching Prisma
export const GenderEnum = z.enum(["MALE", "FEMALE", "UNKNOWN"]);
export type Gender = z.infer<typeof GenderEnum>;

// Species display info
export const SPECIES_OPTIONS = [
  { value: "DOG", label: "Dog", emoji: "🐕" },
  { value: "CAT", label: "Cat", emoji: "🐈" },
  { value: "RABBIT", label: "Rabbit", emoji: "🐰" },
  { value: "BIRD", label: "Bird", emoji: "🐦" },
  { value: "REPTILE", label: "Reptile", emoji: "🦎" },
  { value: "OTHER", label: "Other", emoji: "🐾" },
] as const;

// Gender display info
export const GENDER_OPTIONS = [
  { value: "MALE", label: "Male", icon: "♂" },
  { value: "FEMALE", label: "Female", icon: "♀" },
  { value: "UNKNOWN", label: "Unknown", icon: "?" },
] as const;

// Step 1 schema: Identity & Visuals
export const PetStep1Schema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  species: SpeciesEnum,
  breed: z.string().optional(),
  photoUrl: z.string().optional(), // Accepts URLs and base64 data URLs
});

export type PetStep1Input = z.infer<typeof PetStep1Schema>;

// Step 2 schema: Medical & Specifics
export const PetStep2Schema = z.object({
  gender: GenderEnum.default("UNKNOWN"),
  birthDate: z.date().optional(),
  weight: z.coerce.number().min(0).optional(),
  isNeutered: z.boolean().default(false),
  allergies: z.array(z.string()).default([]),
});

export type PetStep2Input = z.infer<typeof PetStep2Schema>;

// Combined full schema for creating a pet
export const PetSchema = PetStep1Schema.merge(PetStep2Schema);

export type PetInput = z.infer<typeof PetSchema>;
