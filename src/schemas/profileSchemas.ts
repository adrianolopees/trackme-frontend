import { z } from "zod";

export const profileSetupSchema = z.object({
  bio: z
    .string()
    .min(1, "Bio é obrigatória")
    .max(500, "Bio muito longa")
    .optional(),
});
export type ProfileSetupFormData = z.infer<typeof profileSetupSchema>;
