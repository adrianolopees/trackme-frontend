import type { TextareaHTMLAttributes, ForwardedRef } from "react";
import { forwardRef } from "react";

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
      <div className="flex flex-col gap-1">
        {label && (
          <label className="text-sm font-medium text-gray-700">{label}</label>
        )}
        <textarea
          ref={ref}
          className={`bg-gray-100 p-2 border-none rounded outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
            className ?? ""
          }`}
          {...props}
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </div>
    );
  }
);

export default TextAreaField;
