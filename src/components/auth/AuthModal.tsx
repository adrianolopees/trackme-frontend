import { useEffect } from "react";
import { FiX } from "react-icons/fi";
import { AnimatedWrapper } from "../index";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

export default function AuthModal({
  isOpen,
  onClose,
  children,
  title,
}: AuthModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay transparente com blur */}
      <div
        className="absolute inset-0 bg-transparent backdrop-blur-sm transition-all duration-300 ease-in-out"
        onClick={onClose}
      />

      {/* Modal */}
      <AnimatedWrapper className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto ">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FiX size={20} className="text-gray-500 cursor-pointer" />
          </button>
        </div>

        {/* Resgister form ou login form */}
        <div className="p-6">{children}</div>
      </AnimatedWrapper>
    </div>
  );
}
