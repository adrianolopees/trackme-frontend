/* import { z } from "zod";
import type { SafeProfile } from "./authSchemas";
export const FollowersResponseSchema = z.object({
  followers: z.array(SafeProfile),
  total: z.number(),
  currentPage: z.number(),
  totalPages: z.number(),
});

// Tipo inferido automaticamente para usar na tipagem
export type FollowersResponse = z.infer<typeof FollowersResponseSchema>; */
