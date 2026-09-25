import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-px-twinkle bg-night-700", className)} {...props} />;
}

export { Skeleton };
