import { forwardRef, type InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="text-sm font-medium text-gray-700">{label}</label>
        )}

        <input
          ref={ref}
          className="bg-gray-100 p-2 border-none rounded outline-none focus:ring-2 focus:ring-blue-500"
          {...props}
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}
      </div>
    );
  }
);

export default InputField;
