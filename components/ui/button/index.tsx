import * as React from "react";

type ButtonProps = {
  selected?: boolean;
};

const variants = {
  selected: "text-white bg-[#2C2D33]",
  base: "p-2 rounded-lg shadow-sm border text-xs  sm:text-sm",
  default: "bg-white border-[#2C2D33] text-black",
};

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps
>(({ selected, className, ...props }, ref) => {

  const combinedClass = `${variants.base} ${
    selected ? variants.selected : variants.default
  } ${className}`;

  return <button className={combinedClass} {...props} ref={ref} />;
});
Button.displayName = "Button";

export { Button };
