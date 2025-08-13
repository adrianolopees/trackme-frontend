import { z } from "zod";

export const SafeProfileSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string().email(),
  name: z.string(),
  bio: z.string().optional(),
  avatar: z.string().optional(), // Base64 string
  profileSetupDone: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export const PublicProfileSchema = SafeProfileSchema.omit({
  email: true,
  profileSetupDone: true,
});
export const ProfileSetupSchema = z.object({
  bio: z
    .string()
    .min(1, "Bio é obrigatória")
    .max(500, "Bio muito longa")
    .optional(),
});
export type PublicProfile = z.infer<typeof PublicProfileSchema>;
export type SafeProfile = z.infer<typeof SafeProfileSchema>;
export type ProfileSetupFormData = z.infer<typeof ProfileSetupSchema>;
