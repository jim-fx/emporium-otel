import { ButtonHTMLAttributes } from "react";

export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { children, className, ...rest } = props;

  return (
    <button {...rest} className={`flex items-center justify-center ${className}`}>
      {children}
    </button>
  );
}
