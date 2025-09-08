import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { authService } from "../services/auth.service";

import type { AuthContextData, AuthProviderProps } from "../types/auth.types";
import type { LoginFormData, RegisterData } from "../schemas/authSchemas";
import type { SafeProfile } from "../schemas/profileSchemas";

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [profile, setProfile] = useState<SafeProfile | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);

  const isAuthenticated = profile !== null;
  const isProfileSetupDone = profile?.profileSetupDone === true;

  const checkAuth = async () => {
    try {
      const tokenStorage = authService.getToken();
      if (!tokenStorage || authService.isTokenExpired(tokenStorage)) {
        authService.clearAuthData();
        return;
      }
      const validatedProfile = await authService.getAuthProfile();
      const profile = validatedProfile.data;
      setProfile(profile);
      authService.saveAuthData(tokenStorage, profile);
    } finally {
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await checkAuth();
      } finally {
        setInitialLoading(false);
      }
    };
    initializeAuth();
  }, []);

  const login = async (data: LoginFormData) => {
    setLoginLoading(true);
    try {
      const { data: loginData } = await authService.login(data);
      const token = loginData.token;
      authService.saveAuthData(token);

      const { data: profileData } = await authService.getAuthProfile();
      const profile = profileData;
      setProfile(profile);
      authService.saveAuthData(token, profile);

      toast.success("Login realizado com sucesso!");
    } finally {
      setLoginLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setRegisterLoading(true);
    try {
      const response = await authService.register(data);
      const {
        data: { token, profile },
      } = response;

      authService.saveAuthData(token, profile);
      setProfile(profile);
      toast.success("Fale mais sobre você e coloque uma foto!");
    } finally {
      setRegisterLoading(false);
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
        loginLoading,
        initialLoading,
        registerLoading,
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
