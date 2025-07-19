import type { ButtonHTMLAttributes } from "react";
import { FiArrowRight } from "react-icons/fi";

type SkipButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function SkipButton({ ...props }: SkipButtonProps) {
  return (
    <button
      type="button"
      {...props}
      className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg
                  text-gray-700 bg-gray-200 hover:bg-gray-300
                  transition-colors duration-300
                  disabled:opacity-60 disabled:cursor-not-allowed
                  h-12 min-w-[48px]`}
    >
      <FiArrowRight size={20} />
    </button>
  );
}
