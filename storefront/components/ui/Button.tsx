import { ObjectHTMLAttributes } from "react";

export function Button(props: ObjectHTMLAttributes) {
  const { children, className, ...rest } = props;

  return (
    <button {...rest} className={`flex ${className}`}>
      {children}
    </button>
  );
}
