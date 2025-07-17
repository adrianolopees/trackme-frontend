import api from "./api.service";
import type {
  LoginData,
  AuthResponse,
  RegisterData,
  ProfileData,
} from "../types/auth.types";

// Serviços de autenticação
class AuthService {
  // Login
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await api.post("/auth/login", data);
    return response.data.data;
  }

  // Registro
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post("/auth/register", data);
    return response.data.data;
  }

  // Logout
  async logout(): Promise<void> {
    this.clearAuthData();
  }

  async getAuthProfile(): Promise<ProfileData> {
    const response = await api.get("/profile/me"); // api intercepta e add o token
    return response.data.data; // estrutura { success, data, message }
  }

  // Salvar dados de autenticação
  saveAuthData(token: string, profile?: ProfileData) {
    localStorage.setItem("token", token);
    if (profile) {
      localStorage.setItem("profile", JSON.stringify(profile));
    }
  }

  // Limpar dados
  clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
  }

  // Verificar se o usuário está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem("token");
  }

  // Obter token atual
  getToken(): string | null {
    return localStorage.getItem("token");
  }

  // Obter dados do usuário salvos
  getSavedProfile(): ProfileData | null {
    const profileData = localStorage.getItem("profile");
    return profileData ? JSON.parse(profileData) : null;
  }
}

export const authService = new AuthService();
