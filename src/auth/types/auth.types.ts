import type { ReactNode } from "react";

// -- Tipos usados para formulários e chamadas de API
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

// -- Dados do usuário retornados pela API
export interface ProfileData {
  id: string;
  username: string;
  email: string;
  name?: string;
  bio?: string;
  avatar?: Blob;
}

export interface AuthResponse {
  token: string;
  profile?: ProfileData; // Dados do usuário após login ou registro
}

export interface TokenResponse {
  token: string;
}

// -- Tipo da interface do Contexto de Autenticação
export interface AuthContextData {
  profile: ProfileData | null;
  loading: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  checkAuth: () => Promise<void>;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export * from "./auth.types";
