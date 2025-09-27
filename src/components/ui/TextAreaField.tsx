import type { TextareaHTMLAttributes, ForwardedRef } from "react";
import { forwardRef } from "react";
import FormField from "./FormField";

interface TextAreaFieldProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const TextAreaField = forwardRef(
  (
    { label, error, className, ...props }: TextAreaFieldProps,
    ref: ForwardedRef<HTMLTextAreaElement>
  ) => {
    return (
      <FormField label={label} error={error}>
        <textarea
          ref={ref}
          className={`bg-gray-100 p-2 border-none rounded outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
            className ?? ""
          }`}
          {...props}
        />
      </FormField>
    );
  }
);

export default TextAreaField;
