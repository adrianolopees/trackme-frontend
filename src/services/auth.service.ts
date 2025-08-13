import api from "../services/api.service";
import type {
  LoginFormData,
  RegisterData,
  TokenResponse,
  AuthResponse,
  ProfileResponse,
  SafeProfile,
} from "../schemas/authSchemas";
import {
  ProfileResponseSchema,
  TokenResponseSchema,
  AuthResponseSchema,
} from "../schemas/authSchemas";
const TOKEN_KEY = "@app:token";
const PROFILE_KEY = "@app:profile";

// Serviços de autenticação
export const authService = {
  async login(data: LoginFormData): Promise<TokenResponse> {
    const response = await api.post("/auth/login", data);
    const validation = TokenResponseSchema.safeParse(response.data);
    if (!validation.success) {
      throw new Error("Resposta de Token inválida");
    }
    return validation.data;
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post("/auth/register", data);
    const validation = AuthResponseSchema.safeParse(response.data);
    if (!validation.success) {
      throw new Error(" Resposta de autenticação inválida");
    }
    return validation.data;
  },

  async getAuthProfile(): Promise<ProfileResponse> {
    const response = await api.get("/profile/me");

    const validation = ProfileResponseSchema.safeParse(response.data);
    if (!validation.success) {
      throw new Error("Resposta de validação do profile inválida!");
    }
    return validation.data;
  },

  saveAuthData(token: string, profile?: SafeProfile) {
    localStorage.setItem(TOKEN_KEY, token);
    if (profile) {
      this.saveProfile(profile);
    }
  },

  saveProfile(profile: SafeProfile): void {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  },

  clearAuthData() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(PROFILE_KEY);
  },

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  getSavedProfile(): SafeProfile | null {
    const profileData = localStorage.getItem(PROFILE_KEY);
    return profileData ? JSON.parse(profileData) : null;
  },
};
