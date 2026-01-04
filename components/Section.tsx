/**
 * Section component for vertical spacing and structure
 */
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  size?: "sm" | "md" | "lg";
}

export function Section({ size = "lg", className, ...props }: SectionProps) {
  const sizeStyles = {
    sm: "py-10",
    md: "py-12 sm:py-14",
    lg: "py-12 sm:py-16",
  };

  return <section className={cn(sizeStyles[size], className)} {...props} />;
}
