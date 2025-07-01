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

export interface User {
  id: string;
  username: string;
  email: string;
  name?: string;
}

export interface AuthResponse {
  token: string;
  user?: User;
}

// Serviços de autenticação
export const authService = {
  // Login
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await api.post("/auth/login", data);
    return response.data;
  },

  // Registro
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post("/auth/register", data);
    return response.data;
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
  async verifyToken(): Promise<User> {
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
  saveAuthData(token: string, user?: User): void {
    localStorage.setItem("token", token);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  },

  // Obter dados do usuário salvos
  getSavedUser(): User | null {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  },
};

export default authService;
