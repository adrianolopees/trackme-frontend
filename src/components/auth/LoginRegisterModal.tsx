import AuthModal from "./AuthModalLayout";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { type AuthModalType } from "../../hooks/useAuthModalController";
import { AnimatePresence, motion } from "framer-motion";

interface AuthModalContainerProps {
  modalType: AuthModalType;
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
  onSwitchToRegister: () => void;
}

export default function AuthModalContainer({
  modalType,
  isOpen,
  onClose,
  onSwitchToLogin,
  onSwitchToRegister,
}: AuthModalContainerProps) {
  const getTitle = () => {
    switch (modalType) {
      case "login":
        return "Entrar no TrackMe";
      case "register":
        return "Criar conta no TrackMe";
      default:
        return "";
    }
  };

  const renderContent = () => {
    switch (modalType) {
      case "login":
        return (
          <LoginForm
            onSuccess={onClose}
            onSwitchToRegister={onSwitchToRegister}
          />
        );
      case "register":
        return (
          <RegisterForm onSuccess={onClose} onSwitchToLogin={onSwitchToLogin} />
        );
      default:
        return null;
    }
  };

  return (
    <AuthModal isOpen={isOpen} onClose={onClose} title={getTitle()}>
      <AnimatePresence mode="wait">
        <motion.div
          key={modalType}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </AuthModal>
  );
}
