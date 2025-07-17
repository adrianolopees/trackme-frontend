import api from "./api.service";
import type {
  LoginData,
  AuthResponse,
  RegisterData,
  ProfileData,
} from "../types/auth.types";

// Serviços de autenticação
export const authService = {
  // -- Login
  async login(data: LoginData): Promise<AuthResponse> {
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
    localStorage.setItem("token", token);
    if (profile) {
      localStorage.setItem("profile", JSON.stringify(profile));
    }
  },

  // -- Clear data
  clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
  },

  // -- Obter token atual
  getToken(): string | null {
    return localStorage.getItem("token");
  },

  // -- Obter dados do usuário salvos
  getSavedProfile(): ProfileData | null {
    const profileData = localStorage.getItem("profile");
    return profileData ? JSON.parse(profileData) : null;
  },
};
