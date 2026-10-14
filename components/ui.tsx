import type { ComponentProps, ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)} {...props} />;
}

export function Section({ className, ...props }: ComponentProps<"section">) {
  return <section className={cn("py-16 sm:py-24", className)} {...props} />;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
  as: Heading = "h2",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">{eyebrow}</p>
      )}
      <Heading
        className={cn(
          "text-balance font-semibold tracking-tight text-foreground",
          Heading === "h1" ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl",
        )}
      >
        {title}
      </Heading>
      {subtitle && <p className="mt-4 text-lg leading-relaxed text-muted">{subtitle}</p>}
    </div>
  );
}

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 disabled:cursor-not-allowed disabled:opacity-60";

export const buttonVariants = {
  primary: cn(buttonBase, "bg-primary text-primary-foreground hover:bg-primary-strong"),
  secondary: cn(buttonBase, "border border-border bg-background text-foreground hover:bg-surface-2"),
  ghost: cn(buttonBase, "text-foreground hover:bg-surface-2"),
};

type Variant = keyof typeof buttonVariants;

export function ButtonLink({
  variant = "primary",
  className,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={cn(buttonVariants[variant], className)} {...props} />;
}

export function ExternalButton({
  variant = "primary",
  className,
  ...props
}: ComponentProps<"a"> & { variant?: Variant }) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={cn(buttonVariants[variant], className)}
      {...props}
    />
  );
}

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-surface px-2.5 py-0.5 text-xs font-medium text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("rounded-2xl border border-border bg-surface p-6 transition-colors", className)}
      {...props}
    />
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-foreground">
          <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}
