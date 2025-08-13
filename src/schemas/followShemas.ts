import { z } from "zod";
import { PublicProfileSchema } from "./profileSchemas";

export const PaginationMetaSchema = z.object({
  total: z.number(),
  totalPages: z.number(),
  currentPage: z.number(),
});

export const PaginatedProfilesSchema = z.object({
  profiles: z.array(PublicProfileSchema),
  pagination: PaginationMetaSchema,
});

export type PaginationMeta = z.infer<typeof PaginationMetaSchema>;
export type PaginatedProfiles = z.infer<typeof PaginatedProfilesSchema>;
