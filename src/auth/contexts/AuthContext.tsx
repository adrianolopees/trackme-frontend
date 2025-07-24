import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { authService } from "../services/auth.service";

// Types - Tipagem específica do contexto de autenticação
import type {
  AuthContextData,
  AuthProviderProps,
  ProfileData,
} from "../types/auth.types";

// Schemas - Validação e tipos de formulários
import type { LoginFormData, RegisterData } from "../../schemas/authSchemas";

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!profile;
  const isProfileSetupDone = profile?.profileSetupDone === true;

  const checkAuth = async () => {
    const tokenStorage = authService.getToken();
    if (!tokenStorage) {
      authService.clearAuthData();
      setLoading(false);
      return;
    }
    const validatedProfile = await authService.getAuthProfile();
    const profile = validatedProfile.data.profile;
    setProfile(profile);
    authService.saveAuthData(tokenStorage, profile);
    setLoading(false);
  };
  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (data: LoginFormData) => {
    setLoading(true);
    try {
      const { data: loginData } = await authService.login(data);
      const token = loginData.token;
      authService.saveAuthData(token);

      const { data: profileData } = await authService.getAuthProfile();
      const profile = profileData.profile;
      setProfile(profile);
      authService.saveAuthData(token, profile);

      toast.success("Login realizado com sucesso!");
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setLoading(true);
    try {
      const response = await authService.register(data);
      const {
        data: { token, profile },
      } = response;

      authService.saveAuthData(token, profile);
      setProfile(profile);
      toast.success("Fale sobre você e coloque uma foto!");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.clearAuthData();
    setProfile(null);
    toast.success("Logout realizado com sucesso!");
  };

  return (
    <AuthContext.Provider
      value={{
        profile,
        setProfile,
        loading,
        login,
        register,
        logout,
        isAuthenticated,
        checkAuth,
        isProfileSetupDone,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
