import { z } from "zod";

export const registerDataSchema = z.object({
  name: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(50, "Nome muito longo"),
  username: z
    .string()
    .min(3, "Usuário muito curto")
    .max(20, "Usuário muito longo")
    .regex(/^[a-zA-Z0-9_]+$/, "Apenas letras, números e underscore"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});
// Schema do formulário - estende o base + confirmPassword
export const registerSchema = registerDataSchema
  .extend({
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });
export type RegisterData = z.infer<typeof registerDataSchema>; // Para backend
export type RegisterFormData = z.infer<typeof registerSchema>; // Para formulário

export const loginSchema = z.object({
  identifier: z.string().min(3, "Email ou usuário é obrigatório"),
  password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
});
export type LoginData = z.infer<typeof loginSchema>;
