import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva("px-frame px-chip", {
  variants: {
    variant: {
      default: "px-c-gold",
      secondary: "px-c-purple",
      success: "px-c-green",
      info: "px-c-blue",
      destructive: "px-c-red",
      outline: "px-c-night",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
