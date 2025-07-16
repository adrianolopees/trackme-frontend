import type { ReactNode, Dispatch, SetStateAction } from "react";

export interface LoginData {
  identifier: string; // email ou username
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  name: string;
}

export interface ProfileData {
  id: string;
  username: string;
  email: string;
  name?: string;
  bio?: string;
  avatar?: string;
}

export interface AuthResponse {
  token: string;
  profile?: ProfileData;
}

// -- Tipo da interface do Contexto de Autenticação
export interface AuthContextData {
  profile: ProfileData | null;
  setProfile: Dispatch<SetStateAction<ProfileData | null>>;
  loading: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isLoggingOut: boolean;
  checkAuth: () => Promise<void>;
  isAuthenticated: boolean;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export * from "./auth.types";
