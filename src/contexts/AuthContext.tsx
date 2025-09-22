import React, { createContext, useState, useEffect } from "react";
import { authService } from "../services/authService";
import { useNotification } from "../hooks/useNotification";

import type { AuthContextData, AuthProviderProps } from "../types/auth.types";
import type { LoginFormData, RegisterData } from "../schemas/authSchemas";
import type { SafeProfile } from "../schemas/profileSchemas";

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [profile, setProfile] = useState<SafeProfile | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const { showSuccess, showError } = useNotification();

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
      const loginResponse = await authService.login(data);
      const token = loginResponse.data.token;
      authService.saveAuthData(token);

      const profileResponse = await authService.getAuthProfile();
      const profile = profileResponse.data;
      setProfile(profile);
      authService.saveAuthData(token, profile);
      showSuccess(loginResponse.message);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Erro no login";
      showError(message);
      throw error;
    } finally {
      setLoginLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setRegisterLoading(true);
    try {
      const registerResponse = await authService.register(data);
      const {
        data: { token, profile },
      } = registerResponse;

      authService.saveAuthData(token, profile);
      setProfile(profile);
      showSuccess(registerResponse.message);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Erro no registro";
      showError(message);
      throw error;
    } finally {
      setRegisterLoading(false);
    }
  };

  const logout = () => {
    authService.clearAuthData();
    setProfile(null);
    showSuccess("Logout realizado com sucesso!");
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
