import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { ButtonLink, buttonVariants } from "./ui";

type Variant = keyof typeof buttonVariants;

/**
 * "Book a call" button: opens Calendly when NEXT_PUBLIC_CALENDLY_URL is set,
 * otherwise sends the visitor to the contact page.
 */
export function BookCallButton({
  children,
  variant = "primary",
  className,
  icon = true,
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  icon?: boolean;
}) {
  const content = (
    <>
      {children}
      {icon && (
        <ArrowUpRight
          className="size-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
          aria-hidden
        />
      )}
    </>
  );
  if (site.calendlyUrl) {
    return (
      <a
        href={site.calendlyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(buttonVariants[variant], className)}
      >
        {content}
      </a>
    );
  }
  return (
    <ButtonLink href="/contact" variant={variant} className={className}>
      {content}
    </ButtonLink>
  );
}
