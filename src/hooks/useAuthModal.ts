import { useState, useCallback } from "react";

export type AuthModalType = "login" | "register" | null;

export interface UseAuthModalReturn {
  authModalType: AuthModalType;
  isAuthModalOpen: boolean;
  openLoginModal: () => void;
  openRegisterModal: () => void;
  closeAuthModal: () => void;
  switchToLogin: () => void;
  switchToRegister: () => void;
}

export function useAuthModal(): UseAuthModalReturn {
  const [authModalType, setAuthModalType] = useState<AuthModalType>(null);

  const openLoginModal = useCallback(() => {
    setAuthModalType("login");
  }, []);

  const openRegisterModal = useCallback(() => {
    setAuthModalType("register");
  }, []);

  const closeAuthModal = useCallback(() => {
    setAuthModalType(null);
  }, []);

  const switchToLogin = useCallback(() => {
    setAuthModalType("login");
  }, []);

  const switchToRegister = useCallback(() => {
    setAuthModalType("register");
  }, []);

  return {
    authModalType,
    isAuthModalOpen: authModalType !== null,
    openLoginModal,
    openRegisterModal,
    closeAuthModal,
    switchToLogin,
    switchToRegister,
  };
}
