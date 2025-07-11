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
    try {
      await api.post("/auth/logout");
    } catch (error) {
      // Mesmo que dê erro na API, remove localmente
      console.warn("Erro ao fazer logout na API:", error);
    } finally {
      this.clearAuthData();
    }
  }

  async verifyToken(token?: string): Promise<ProfileData> {
    const finalToken = token ?? this.getToken(); // usa o token passado ou pega do localStorage
    const response = await api.get("/profile/me", {
      headers: {
        Authorization: `Bearer ${finalToken}`,
      },
    });

    return response.data.data; // acessa corretamente a estrutura { success, data, message }
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
