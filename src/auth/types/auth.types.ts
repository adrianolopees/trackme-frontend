import type { ReactNode, Dispatch, SetStateAction } from "react";
import {
  type LoginFormData,
  type RegisterData,
  type SafeProfile,
} from "../../schemas/authSchemas";

// -- Tipo da interface do Contexto de Autenticação
export interface AuthContextData {
  profile: SafeProfile | null;
  setProfile: Dispatch<SetStateAction<SafeProfile | null>>;
  loading: boolean;
  login: (data: LoginFormData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  isAuthenticated: boolean;
  isProfileSetupDone: boolean;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export * from "./auth.types";
