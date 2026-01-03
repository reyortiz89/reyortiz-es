/**
 * Section component for vertical spacing and structure
 */
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  size?: "sm" | "md" | "lg";
}

export function Section({ size = "lg", className, ...props }: SectionProps) {
  const sizeStyles = {
    sm: "py-8",
    md: "py-12",
    lg: "py-16",
  };

  return (
    <section className={cn(sizeStyles[size], className)} {...props} />
  );
}
