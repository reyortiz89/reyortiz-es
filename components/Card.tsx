/**
 * Card component with consistent styling
 */
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function Card({ className, hover = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm",
        hover && "transition-all hover:shadow-md hover:border-slate-300",
        className
      )}
      {...props}
    />
  );
}
