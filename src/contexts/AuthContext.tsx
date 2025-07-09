// src/contexts/AuthContext.tsx
import React, { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { toast } from "react-toastify";
import authService from "../services/authService";
import type { ProfileData } from "../services/authService";
import type { LoginData, RegisterData } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { removeHeavyFields } from "../utils/profileUtils";

interface AuthContextData {
  profile: ProfileData | null;
  loading: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  checkAuth: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

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

        const profileNoAvatar = removeHeavyFields(profileData);
        authService.saveAuthData(token, profileNoAvatar);
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
    try {
      setLoading(true);
      const tokenResponse = await authService.login(data);
      const { token } = tokenResponse;

      if (token) {
        authService.saveAuthData(token);

        const profileData = await authService.verifyToken();

        setProfile(profileData);

        const profileNoAvatar = removeHeavyFields(profileData);
        authService.saveAuthData(token, profileNoAvatar);

        toast.success("Login realizado com sucesso!");
      }
    } catch (error: unknown) {
      let errorMessage = "Erro ao fazer login";
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

  const logout = async () => {
    try {
      setLoading(true);
      await authService.logout();
      setProfile(null);
      toast.success("Logout realizado com sucesso!");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      // Mesmo com erro, remove os dados locais
      setProfile(null);
      toast.success("Logout realizado!");
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
