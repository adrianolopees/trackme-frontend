import api from "./api.service";
import type { ProfileData } from "../types/auth.types";
import type {
  LoginFormData,
  RegisterData,
  TokenResponse,
  AuthResponse,
  ProfileResponse,
} from "../../schemas/authSchemas";
import {
  ProfileResponseSchema,
  TokenResponseSchema,
  AuthResponseSchema,
} from "../../schemas/authSchemas";
const TOKEN_KEY = "@app:token";
const PROFILE_KEY = "@app:profile";

// Serviços de autenticação
export const authService = {
  // -- Login
  async login(data: LoginFormData): Promise<TokenResponse> {
    console.log("=== CHAMANDO API LOGIN ===");
    console.log("Dados enviados:", data);
    const response = await api.post("/auth/login", data);
    console.log("=== RESPOSTA RECEBIDA ===");
    console.log("Status:", response.status);
    console.log("Headers:", response.headers);
    console.log(
      "response.data completo:",
      JSON.stringify(response.data, null, 2)
    );

    console.log("=== VALIDANDO COM SCHEMA ===");
    const validation = TokenResponseSchema.safeParse(response.data);
    if (!validation.success) {
      console.log("❌ ERRO DE VALIDAÇÃO:");
      console.log("Dados recebidos:", response.data);
      console.log("Erros do schema:", validation.error.issues);
      console.log(
        "Schema esperado: { success: boolean, data: { token: string }, message: string }"
      );
      throw new Error("Invalid token response");
    }
    console.log("✅ VALIDAÇÃO PASSOU:");
    console.log("validation.data:", validation.data);
    return validation.data;
  },

  // -- Register
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post("/auth/register", data);
    const validation = AuthResponseSchema.safeParse(response.data);
    if (!validation.success) {
      throw new Error("Invalid auth response");
    }
    return validation.data;
  },

  // -- Get profile authenticated
  async getAuthProfile(): Promise<ProfileResponse> {
    console.log("=== CHAMANDO getAuthProfile ===");
    const response = await api.get("/profile/me");
    console.log("=== RESPOSTA getAuthProfile ===");
    console.log("Status:", response.status);
    console.log("response.data:", JSON.stringify(response.data, null, 2));

    console.log("=== VALIDANDO PROFILE COM SCHEMA ===");
    const validation = ProfileResponseSchema.safeParse(response.data);
    if (!validation.success) {
      console.log("❌ ERRO DE VALIDAÇÃO DO PROFILE:");
      console.log("Dados recebidos:", response.data);
      console.log("Erros do schema:", validation.error.issues);
      throw new Error("Invalid profile response");
    }
    console.log("✅ VALIDAÇÃO DO PROFILE PASSOU:");
    console.log("validation.data:", validation.data);
    return validation.data;
  },

  // -- Save authentication data to local storage
  saveAuthData(token: string, profile?: ProfileData) {
    localStorage.setItem(TOKEN_KEY, token);
    if (profile) {
      this.saveProfile(profile);
    }
  },

  // -- Reutilizável para updates de perfil
  saveProfile(profile: ProfileData): void {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  },

  // -- Clear data
  clearAuthData() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(PROFILE_KEY);
  },

  // -- Obter token atual
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  // -- Obter dados do usuário salvos
  getSavedProfile(): ProfileData | null {
    const profileData = localStorage.getItem(PROFILE_KEY);
    return profileData ? JSON.parse(profileData) : null;
  },
};
