import type { ButtonHTMLAttributes } from "react";
import type { ReactNode } from "react";
import Spinner from "./Spinner";

type GradientButtonProps = {
  children: ReactNode;
  loading?: boolean;
  loadingText?: string;
  icon?: ReactNode;
  className?: string;
  variant?: "default" | "navbar" | "mobile";
} & ButtonHTMLAttributes<HTMLButtonElement>;

const variantClasses = {
  default: "w-full py-3 rounded-lg",
  navbar: "px-4 py-1 h-9 gap-2 lg:px-6 rounded-full text-sm",
  mobile: "w-full px-4 py-3 rounded-lg gap-2",
};

export default function GradientButton({
  children,
  loading,
  loadingText = "Carregando...",
  icon,
  className,
  variant,
  ...props
}: GradientButtonProps) {
  return (
    <button
      className={`
        flex justify-center items-center
        font-semibold text-white cursor-pointer
        bg-gradient-to-r from-purple-600 to-blue-500
        hover:from-purple-700 hover:to-blue-600
        transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed
      ${variantClasses[variant || "default"]}
      ${className || ""}
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
