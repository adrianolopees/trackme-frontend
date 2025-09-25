import { useState, useCallback } from "react";

export type AuthModalType = "login" | "register" | null;

export interface UseAuthModalReturn {
  modalType: AuthModalType;
  isOpen: boolean;
  openLogin: () => void;
  openRegister: () => void;
  closeModal: () => void;
  switchToLogin: () => void;
  switchToRegister: () => void;
}

export function useAuthModal(): UseAuthModalReturn {
  const [modalType, setModalType] = useState<AuthModalType>(null);

  const openLogin = useCallback(() => {
    setModalType("login");
  }, []);

  const openRegister = useCallback(() => {
    setModalType("register");
  }, []);

  const closeModal = useCallback(() => {
    setModalType(null);
  }, []);

  const switchToLogin = useCallback(() => {
    setModalType("login");
  }, []);

  const switchToRegister = useCallback(() => {
    setModalType("register");
  }, []);

  return {
    modalType,
    isOpen: modalType !== null,
    openLogin,
    openRegister,
    closeModal,
    switchToLogin,
    switchToRegister,
  };
}
