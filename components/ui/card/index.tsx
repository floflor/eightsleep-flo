import React from "react";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className="bg-[#F9F9FB] border border-[#D8D9E0] shadow-sm rounded-md flex flex-col p-5 gap-y-3"
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export { Card };
