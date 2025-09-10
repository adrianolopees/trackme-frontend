import { z } from "zod";
import { SafeProfileSchema } from "./profileSchemas";

export const TokenDataSchema = z.object({
  token: z.string(),
});

export const AuthDataSchema = z.object({
  token: z.string(),
  profile: SafeProfileSchema,
});

export const TokenResponseSchema = z.object({
  success: z.boolean(),
  data: TokenDataSchema,
  message: z.string(),
});

export const AuthResponseSchema = z.object({
  success: z.boolean(),
  data: AuthDataSchema,
  message: z.string(),
  errors: z.array(z.string()).optional(),
});

export const ProfileResponseSchema = z.object({
  success: z.boolean(),
  data: SafeProfileSchema,
  message: z.string(),
});

export const LoginSchema = z.object({
  identifier: z.string().min(3, "Email ou usuário é obrigatório"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export const RegisterDataSchema = z.object({
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

export const RegisterSchema = RegisterDataSchema.extend({
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});
export type RegisterData = z.infer<typeof RegisterDataSchema>;
export type RegisterFormData = z.infer<typeof RegisterSchema>;
export type TokenData = z.infer<typeof TokenDataSchema>;
export type LoginFormData = z.infer<typeof LoginSchema>;
export type ProfileResponse = z.infer<typeof ProfileResponseSchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;
export type TokenResponse = z.infer<typeof TokenResponseSchema>;
export type AuthData = z.infer<typeof AuthDataSchema>;
