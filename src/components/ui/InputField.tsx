import { forwardRef, type InputHTMLAttributes } from "react";
import FormField from "./FormField";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <FormField label={label} error={error}>
        <input
          ref={ref}
          className="bg-gray-100 p-2 border-none rounded outline-none focus:ring-2 focus:ring-blue-500"
          {...props}
        />
      </FormField>
    );
  }
);

export default InputField;
