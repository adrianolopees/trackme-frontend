import type { ReactNode, Dispatch, SetStateAction } from "react";
import {
  type LoginFormData,
  type RegisterData,
} from "../../schemas/authSchemas";

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
  profile: ProfileData;
}

// -- Tipo da interface do Contexto de Autenticação
export interface AuthContextData {
  profile: ProfileData | null;
  setProfile: Dispatch<SetStateAction<ProfileData | null>>;
  loading: boolean;
  login: (data: LoginFormData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  isAuthenticated: boolean;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export * from "./auth.types";
