import type { ReactNode, Dispatch, SetStateAction } from "react";
import type { LoginFormData, RegisterData } from "../schemas/authSchemas";
import type { SafeProfile } from "../schemas/profileSchemas";

export interface AuthContextData {
  profile: SafeProfile | null;
  setProfile: Dispatch<SetStateAction<SafeProfile | null>>;
  registerLoading: boolean;
  initialLoading: boolean;
  loginLoading: boolean;
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
