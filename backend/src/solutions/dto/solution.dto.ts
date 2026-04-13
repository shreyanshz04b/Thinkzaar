import { z } from 'zod';

export const CreateSolutionSchema = z.object({
  content: z.string().min(20),
});

export type CreateSolutionDto = z.infer<typeof CreateSolutionSchema>;
