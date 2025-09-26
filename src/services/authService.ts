import api from "./apiService";
import { jwtDecode } from "jwt-decode";

import type {
  LoginFormData,
  RegisterData,
  TokenResponse,
  AuthResponse,
  ProfileResponse,
} from "../schemas/authSchemas";
import type { SafeProfile } from "../schemas/profileSchemas";

import {
  ProfileResponseSchema,
  TokenResponseSchema,
  AuthResponseSchema,
} from "../schemas/authSchemas";
import type { JwtPayload } from "../types/jwtTypes";

const TOKEN_KEY = "@app:token";
const PROFILE_KEY = "@app:profile";

export const authService = {
  async login(data: LoginFormData): Promise<TokenResponse> {
    const response = await api.post("/auth/login", data);
    const validation = TokenResponseSchema.safeParse(response.data);
    if (!validation.success) {
      throw new Error("Credenciais inválidasas");
    }
    return validation.data;
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post("/auth/register", data);
    const validation = AuthResponseSchema.safeParse(response.data);
    if (!validation.success) {
      throw new Error("Resposta de autenticação inválida");
    }
    return validation.data;
  },

  async getAuthProfile(): Promise<ProfileResponse> {
    const response = await api.get("/profiles/me");

    const validation = ProfileResponseSchema.safeParse(response.data);
    if (!validation.success) {
      throw new Error("Resposta de validação do profile inválida!");
    }
    return validation.data;
  },

  isTokenExpired(token: string): boolean {
    if (!token) return true;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const currentTime = Date.now() / 1000;

      return decoded.exp < currentTime;
    } catch (error) {
      return true;
    }
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
