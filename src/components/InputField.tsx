import type { InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function InputField({ label, ...props }: InputFieldProps) {
  return (
    <div className="flex flex-col">
      {label && (
        <label className="mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        className="bg-gray-100 p-2 border-none rounded outline-none focus:ring-2 focus:ring-blue-500"
        {...props}
      />
    </div>
  );
}
