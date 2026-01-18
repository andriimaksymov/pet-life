import { z } from "zod";

export const PetSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  species: z.string().min(1, {
    message: "Please select a species.",
  }),
  breed: z.string().optional(),
  birthDate: z.date().optional(),
  weight: z.coerce.number().min(0).optional(),
  photoUrl: z.string().url().optional().or(z.literal("")),
});

export type PetInput = z.infer<typeof PetSchema>;
