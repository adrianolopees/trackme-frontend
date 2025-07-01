// src/contexts/AuthContext.tsx
import React, { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { toast } from "react-toastify";
import authService from "../services/authService";
import type { User } from "../services/authService";
import type { LoginData, RegisterData } from "../services/authService";

interface AuthContextData {
  user: User | null;
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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user && !!authService.getToken();

  // Verificar autenticação ao carregar a aplicação
  const checkAuth = async () => {
    try {
      const token = authService.getToken();
      if (token) {
        // Tenta verificar se o token é válido
        const userData = await authService.verifyToken();
        setUser(userData);
        authService.saveAuthData(token, userData);
      } else {
        // Se não tem token, verifica se tem dados salvos
        const savedUser = authService.getSavedUser();
        if (savedUser) {
          localStorage.removeItem("user"); // Remove dados órfãos
        }
      }
    } catch (error) {
      // Token inválido ou expirado
      console.warn("Erro na verificação de autenticação:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
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
      const response = await authService.login(data);

      authService.saveAuthData(response.token, response.user);
      setUser(response.user || null);

      toast.success("Login realizado com sucesso!");
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

      // Se o backend retornar token no registro, faz login automático
      if (response.token) {
        authService.saveAuthData(response.token, response.user);
        setUser(response.user || null);
        toast.success("Conta criada e login realizado com sucesso!");
      } else {
        toast.success("Conta criada com sucesso! Faça login para continuar.");
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
      setUser(null);
      toast.success("Logout realizado com sucesso!");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      // Mesmo com erro, remove os dados locais
      setUser(null);
      toast.success("Logout realizado!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
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
