import { z } from "zod";
import { SafeProfileSchema } from "../schemas/authSchemas";

export const FollowersResponseSchema = z.object({
  followers: z.array(SafeProfileSchema),
  total: z.number(),
  totalPages: z.number(),
  currentPage: z.number(),
});

export type FollowersResponse = z.infer<typeof FollowersResponseSchema>;

export const FollowingResponseSchema = z.object({
  following: z.array(SafeProfileSchema),
  total: z.number(),
  totalPages: z.number(),
  currentPage: z.number(),
});

export type FollowingResponse = z.infer<typeof FollowingResponseSchema>;
