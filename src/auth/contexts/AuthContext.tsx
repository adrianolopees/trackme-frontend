// src/contexts/AuthContext.tsx
import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const isAuthenticated = !!profile && !!authService.getToken();

  // Verificar autenticação ao carregar a aplicação
  const checkAuth = async () => {
    try {
      const token = authService.getToken();

      if (token) {
        // Tenta verificar se o token é válido
        const profileData = await authService.verifyToken();
        setProfile(profileData);

        authService.saveAuthData(token, profileData);
      } else {
        // Se não tem token, verifica se tem dados salvos
        const savedProfile = authService.getSavedProfile();
        if (savedProfile) {
          localStorage.removeItem("profile"); // Remove dados órfãos
        }
      }
    } catch (error) {
      // Token inválido ou expirado
      console.warn("Erro na verificação de autenticação:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("profile");
      setProfile(null);
    } finally {
      setLoading(false);
    }
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

      const profile = await authService.verifyToken(token);

      setProfile(profile);
      authService.saveAuthData(token, profile);

      toast.success("Login realizado com sucesso!");
      navigate("/profile");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);

    await authService.logout();

    setProfile(null);
    setLoading(false);
    navigate("/login");

    toast.success("Logout realizado com sucesso!");
  };

  const register = async (data: RegisterData) => {
    try {
      setLoading(true);

      const response = await authService.register(data);
      const { token, profile } = response;

      // Se o backend retornar token no registro, faz login automático
      if (token) {
        authService.saveAuthData(token, profile);
        setProfile(profile ?? null);
        toast.success("Fale sobre você e coloque uma foto!");
        navigate("/profile-setup"); // Redireciona para configuração de perfil
      } else {
        toast.success("Conta criada com sucesso!");
      }
    } catch (error: unknown) {
      let errorMessage = "Erro ao criar conta";
      interface ApiError {
        response?: {
          data?: {
            message?: string;
          };
        };
      }
      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof (error as ApiError).response?.data?.message === "string"
      ) {
        errorMessage = (error as ApiError).response!.data!.message!;
      }
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        profile,
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

// Remove useAuth export from this file to comply with Fast Refresh requirements.
export default AuthContext;
export { AuthContext };
