/**
 * Container component for max-width constraint
 */
import { cn } from "@/lib/utils";

export function Container({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mx-auto max-w-5xl px-4 sm:px-6 lg:px-8", className)} {...props} />;
}
