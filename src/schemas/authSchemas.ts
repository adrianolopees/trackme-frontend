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
export type SafeProfile = z.infer<typeof SafeProfileSchema>;

export const PublicProfileSchema = SafeProfileSchema.omit({
  email: true,
  profileSetupDone: true,
});
export type PublicProfile = z.infer<typeof PublicProfileSchema>;

// Schemas dos dados que vêm no campo 'data' das respostas
export const TokenDataSchema = z.object({
  token: z.string(),
});

export const AuthDataSchema = z.object({
  token: z.string(),
  profile: SafeProfileSchema,
});

// Schemas das respostas completas da API
export const TokenResponseSchema = z.object({
  success: z.boolean(),
  data: TokenDataSchema,
  message: z.string(),
});

export const AuthResponseSchema = z.object({
  success: z.boolean(),
  data: AuthDataSchema,
  message: z.string(),
});

export const ProfileResponseSchema = z.object({
  success: z.boolean(),
  data: SafeProfileSchema,
  message: z.string(),
});

// Schemas para requisições (input data)
export const registerDataSchema = z.object({
  name: z
    .string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(50, "Nome maximo 50 caractere"),
  username: z
    .string()
    .min(3, "Usuário deve ter pelo menos 3 caracteres")
    .max(20, "Usuário maximo 20 caracteres")
    .regex(/^[a-zA-Z0-9]+$/, "Apenas letras e números são permitidos"),
  email: z.email({ message: "Email inválido" }),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

export const registerSchema = registerDataSchema
  .extend({
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  identifier: z.string().min(3, "Email ou usuário é obrigatório"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export type RegisterData = z.infer<typeof registerDataSchema>; // Para backend
export type RegisterFormData = z.infer<typeof registerSchema>; // Para formulário
export type LoginFormData = z.infer<typeof loginSchema>;
export type TokenData = z.infer<typeof TokenDataSchema>;
export type AuthData = z.infer<typeof AuthDataSchema>;
export type TokenResponse = z.infer<typeof TokenResponseSchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;
export type ProfileResponse = z.infer<typeof ProfileResponseSchema>;
