import api from "./api.service";
import type { AuthResponse, ProfileData } from "../types/auth.types";
import type { LoginFormData, RegisterData } from "../../schemas/authSchemas";
const TOKEN_KEY = "@app:token";
const PROFILE_KEY = "@app:profile";

// Serviços de autenticação
export const authService = {
  // -- Login
  async login(data: LoginFormData): Promise<AuthResponse> {
    const response = await api.post("/auth/login", data);
    return response.data.data;
  },

  // -- Register
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post("/auth/register", data);
    return response.data.data;
  },

  // -- Get profile authenticated
  async getAuthProfile(): Promise<ProfileData> {
    const response = await api.get("/profile/me"); // api intercepta e add o token
    return response.data.data; // estrutura { success, data, message }
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
