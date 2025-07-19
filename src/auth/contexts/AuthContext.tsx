import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { authService } from "../services/auth.service";

import type {
  AuthContextData,
  AuthProviderProps,
  ProfileData,
  LoginData,
  RegisterData,
} from "../types/auth.types";

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!profile;

  const checkAuth = async () => {
    const tokenStorage = authService.getToken();
    if (!tokenStorage) {
      authService.clearAuthData();
      setLoading(false);
      return;
    }
    const profile = await authService.getAuthProfile();
    setProfile(profile);
    authService.saveAuthData(tokenStorage, profile);
    setLoading(false);
  };
  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (data: LoginData) => {
    setLoading(true);
    try {
      const { token } = await authService.login(data);
      if (!token) throw new Error("Token não recebido");

      authService.saveAuthData(token);

      const profile = await authService.getAuthProfile();
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
      const { token, profile } = response;
      if (token) {
        authService.saveAuthData(token, profile);
        setProfile(profile);
        toast.success("Fale sobre você e coloque uma foto!");
      } else {
        toast.success("Conta criada com sucesso!");
      }
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
