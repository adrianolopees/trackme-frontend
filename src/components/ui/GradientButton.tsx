import type { ButtonHTMLAttributes } from "react";
import type { ReactNode } from "react";
import Spinner from "./Spinner";

type GradientButtonProps = {
  children: ReactNode;
  loading?: boolean;
  loadingText?: string;
  icon?: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function GradientButton({
  children,
  loading,
  loadingText = "Carregando...",
  icon,
  className,
  ...props
}: GradientButtonProps) {
  return (
    <button
      className={`flex justify-center items-center px-4 py-1 h-9 gap-2 lg:px-6 rounded-full text-sm
       font-semibold
      text-white
      bg-gradient-to-r from-purple-600 to-blue-500
      hover:from-purple-700 hover:to-blue-600
      transition-colors duration-300
      disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer ${
        className || ""
      }
      `}
      {...props}
    >
      {loading ? (
        <>
          <Spinner size="md" color="white" />
          {loadingText}
        </>
      ) : (
        <>
          {icon && <span className="w-5 h-5 flex items-center">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
}
