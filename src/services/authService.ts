// src/services/authService.ts
import api from "./api";

// Tipos baseados no seu frontend atual
export interface LoginData {
  identifier: string; // email ou username
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  name?: string; // opcional como no seu form
}

export interface ProfileData {
  id: string;
  username: string;
  email: string;
  name?: string;
  bio?: string;
  avatar?: Blob; // URL da imagem do avatar
}

export interface AuthResponse {
  token: string;
  profile?: ProfileData; // Dados do usuário após login ou registro
}

// Serviços de autenticação
export const authService = {
  // Login
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await api.post("/auth/login", data);
    return response.data.data;
  },

  // Registro
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post("/auth/register", data);
    return response.data.data;
  },

  // Logout
  async logout(): Promise<void> {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      // Mesmo que dê erro na API, remove localmente
      console.warn("Erro ao fazer logout na API:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  },

  // Verificar token e obter dados do usuário
  async verifyToken(): Promise<ProfileData> {
    const response = await api.get("/auth/me");
    return response.data;
  },

  // Verificar se o usuário está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem("token");
  },

  // Obter token atual
  getToken(): string | null {
    return localStorage.getItem("token");
  },

  // Salvar dados de autenticação
  saveAuthData(token: string, profile?: ProfileData): void {
    localStorage.setItem("token", token);
    if (profile) {
      localStorage.setItem("profile", JSON.stringify(profile));
    }
  },

  // Obter dados do usuário salvos
  getSavedProfile(): ProfileData | null {
    const profileData = localStorage.getItem("profile");
    return profileData ? JSON.parse(profileData) : null;
  },
};

export default authService;
