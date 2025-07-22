import { z } from "zod";

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
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});
export type LoginFormData = z.infer<typeof loginSchema>;
