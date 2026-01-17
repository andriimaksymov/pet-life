import { z } from "zod";

export type ActionState<TOutput> = {
  error?: string;
  data?: TOutput;
};

export const createSafeAction = <TInput, TOutput>(
  schema: z.Schema<TInput>,
  action: (data: TInput) => Promise<ActionState<TOutput>>
) => {
  return async (data: TInput): Promise<ActionState<TOutput>> => {
    const validationResult = schema.safeParse(data);

    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors as Record<string, string[]>;
      return {
        error: Object.values(fieldErrors)[0]?.[0] || "Invalid input",
      };
    }

    return action(validationResult.data);
  };
};
