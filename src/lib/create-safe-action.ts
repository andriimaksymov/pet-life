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
      return {
        error: validationResult.error.flatten().fieldErrors[0] || "Invalid input",
      };
    }

    return action(validationResult.data);
  };
};
