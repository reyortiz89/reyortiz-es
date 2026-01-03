/**
 * Badge component for skill display
 */
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline";
}

export function Badge({ variant = "default", className, ...props }: BadgeProps) {
  const variantStyles = {
    default: "bg-slate-100 text-slate-900",
    outline: "border border-slate-200 text-slate-700",
  };

  return (
    <span
      className={cn("inline-block rounded-full px-3 py-1 text-sm font-medium", variantStyles[variant], className)}
      {...props}
    />
  );
}
