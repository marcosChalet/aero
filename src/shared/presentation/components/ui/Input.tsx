import type { InputHTMLAttributes } from "react";

interface InputInterface extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
}

export default function Input({
  label,
  className,
  inputClassName,
  labelClassName,
  ...props
}: InputInterface) {
  return (
    <div className={`relative w-80 ${className || ""}`}>
      <input
        {...props}
        type="text"
        id="meu_input"
        placeholder=" "
        className={`peer w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 text-gray-900 transition-all focus:border-blue-600 focus:outline-none ${inputClassName || ""}`}
      />

      <label
        htmlFor="meu_input"
        className={`pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 rounded-md bg-blue-100 p-1 px-2 text-gray-500 transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-600 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs ${labelClassName || ""}`}
      >
        {label}
      </label>
    </div>
  );
}
