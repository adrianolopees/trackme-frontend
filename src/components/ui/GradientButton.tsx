import type { ButtonHTMLAttributes } from "react";
import type { ReactNode } from "react";
import Spinner from "./Spinner";

type GradientButtonProps = {
  children: ReactNode;
  loading?: boolean;
  loadingText?: string;
  icon?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function GradientButton({
  children,
  loading,
  loadingText = "Carregando...",
  icon,
  ...props
}: GradientButtonProps) {
  return (
    <button
      {...props}
      className={`
        flex items-center justify-center cursor-pointer gap-2 w-full py-3 rounded-full
        text-white font-semibold
        bg-gradient-to-r from-purple-600 to-blue-500
        hover:from-purple-700 hover:to-blue-600
        transition-colors duration-300
        disabled:opacity-70 disabled:cursor-not-allowed
        h-9
        `}
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
