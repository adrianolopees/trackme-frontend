import AuthModal from "./AuthModal";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { type AuthModalType } from "../../hooks/useAuthModal";
import { AnimatePresence } from "framer-motion";
import AnimatedWrapper from "../Layout/AnimatedWrapper";

interface AuthModalContainerProps {
  authType: AuthModalType;
  isAuthModalOpen: boolean;
  onAuthModalClose: () => void;
  onSwitchToLogin: () => void;
  onSwitchToRegister: () => void;
}

export default function AuthModalContainer({
  authType,
  isAuthModalOpen,
  onAuthModalClose,
  onSwitchToLogin,
  onSwitchToRegister,
}: AuthModalContainerProps) {
  const getTitle = () => {
    switch (authType) {
      case "login":
        return "Entrar no TrackMe";
      case "register":
        return "Criar conta no TrackMe";
      default:
        return "";
    }
  };

  const renderContent = () => {
    switch (authType) {
      case "login":
        return (
          <LoginForm
            onSuccess={onAuthModalClose}
            onSwitchToRegister={onSwitchToRegister}
          />
        );
      case "register":
        return (
          <RegisterForm
            onSuccess={onAuthModalClose}
            onSwitchToLogin={onSwitchToLogin}
          />
        );
      default:
        return null;
    }
  };

  return (
    <AuthModal
      isOpen={isAuthModalOpen}
      onClose={onAuthModalClose}
      title={getTitle()}
    >
      <AnimatePresence mode="wait">
        <AnimatedWrapper key={authType} duration={0.3} initialY={20} exitY={20}>
          {renderContent()}
        </AnimatedWrapper>
      </AnimatePresence>
    </AuthModal>
  );
}
