import type { ButtonHTMLAttributes } from "react";
import type { ReactNode } from "react";
import Spinner from "./Spinner";

type SecondaryButtonProps = {
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

export default function SecondaryButton({
  children,
  loading,
  loadingText = "Carregando...",
  icon,
  className,
  variant,
  ...props
}: SecondaryButtonProps) {
  return (
    <button
      className={`
         flex items-center justify-center
    font-medium cursor-pointer
    bg-gray-200 text-gray-800
    hover:bg-gray-300
    transition-colors
    disabled:opacity-70 disabled:cursor-not-allowed 
        ${variantClasses[variant || "default"]}
        ${className || ""}
        `}
      {...props}
    >
      {loading ? (
        <>
          <Spinner size="md" color="gray" />
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
