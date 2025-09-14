interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: "white" | "blue" | "gray";
  className?: string;
}

export default function Spinner({
  size = "md",
  color = "white",
  className = "",
}: SpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-5 h-5 border-4",
    lg: "w-16 h-16 border-4",
  };

  const colorClasses = {
    white: "border-white border-t-transparent",
    blue: "border-blue-600 border-t-transparent",
    gray: "border-gray-400 border-t-transparent",
  };

  return (
    <div
      className={`${sizeClasses[size]}
        ${colorClasses[color]}
        rounded-full animate-spin
        ${className}
        `}
    ></div>
  );
}
