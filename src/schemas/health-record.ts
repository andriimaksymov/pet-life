import * as z from "zod";

export const HealthRecordTypeEnum = z.enum(["VACCINATION", "MEDICATION", "VISIT", "OTHER"]);

export const HealthRecordSchema = z.object({
  type: HealthRecordTypeEnum,
  title: z.string().min(1, {
    message: "Title is required",
  }),
  date: z.date({
    message: "Date is required",
  }),
  notes: z.string().optional(),
  petId: z.string().min(1, {
    message: "Pet ID is required",
  }),
  // Flexible metadata fields based on type
  metadata: z.object({
    nextDueDate: z.date().optional(),
    dosage: z.string().optional(),
    frequency: z.string().optional(),
    provider: z.string().optional(),
    weight: z.string().optional(),
  }).optional(),
});

export type HealthRecordInput = z.infer<typeof HealthRecordSchema>;
