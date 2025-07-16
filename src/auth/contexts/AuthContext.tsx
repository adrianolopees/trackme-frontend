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
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const isAuthenticated =
    !!profile && !isLoggingOut && !!authService.getToken();

  const checkAuth = async () => {
    setIsLoggingOut(false);
    const token = authService.getToken();

    if (!token) {
      authService.clearAuthData();
      setLoading(false);
      return;
    }

    // interceptor cuida de tudo
    const profile = await authService.verifyToken();
    setProfile(profile);
    authService.saveAuthData(token, profile);
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

      const profile = await authService.verifyToken(token);

      setProfile(profile);
      authService.saveAuthData(token, profile);

      toast.success("Login realizado com sucesso!");
      navigate("/profile");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setIsLoggingOut(true);

    authService.logout();

    setProfile(null);
    setIsLoggingOut(false);

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
    } finally {
      setLoading(false);
    }
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
        isLoggingOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Remove useAuth export from this file to comply with Fast Refresh requirements.
export default AuthContext;
export { AuthContext };
