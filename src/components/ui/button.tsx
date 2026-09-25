import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

// Botones pixel: marco con esquinas cortadas, bisel y "labio" que se aplasta al
// presionar (ver .px-btn en styles.css). Cada variante es un material de color.
const buttonVariants = cva("px-frame px-btn", {
  variants: {
    variant: {
      default: "px-c-gold",
      success: "px-c-green",
      info: "px-c-blue",
      destructive: "px-c-red",
      secondary: "px-c-purple",
      outline: "px-c-night",
      ghost: "px-btn--ghost",
      link: "px-btn--ghost underline underline-offset-4",
    },
    size: {
      default: "",
      sm: "px-btn--sm",
      lg: "px-btn--lg",
      icon: "px-btn--icon",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
