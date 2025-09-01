import type { ButtonHTMLAttributes } from "react";
import type { ReactNode } from "react";

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
        flex items-center justify-center gap-2 px-6 py-3 rounded-full
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
          <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin " />
          {loadingText}
        </>
      ) : (
        <>
          {icon && <span className="w-5 h-5">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
}
