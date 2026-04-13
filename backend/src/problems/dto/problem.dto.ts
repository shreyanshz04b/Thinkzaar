import { z } from 'zod';

export const CreateProblemSchema = z.object({
  title: z.string().min(10).max(100),
  description: z.string().min(20),
});

export type CreateProblemDto = z.infer<typeof CreateProblemSchema>;

export const UpdateProblemSchema = CreateProblemSchema.partial();

export type UpdateProblemDto = z.infer<typeof UpdateProblemSchema>;
