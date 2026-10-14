import type { ComponentProps, ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { Reveal } from "./motion";

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10", className)} {...props} />;
}

export function Section({ className, ...props }: ComponentProps<"section">) {
  return <section className={cn("py-20 sm:py-28", className)} {...props} />;
}

/**
 * Renders a title where `*words*` become the serif italic accent, e.g.
 * "From manual work to systems that *scale*".
 */
export function Accent({ text, accentClassName }: { text: string; accentClassName?: string }) {
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("*") && part.endsWith("*") ? (
          <span key={i} className={cn("font-display", accentClassName)}>
            {part.slice(1, -1)}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-muted",
        className,
      )}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-accent ring-4 ring-accent/20" />
      {children}
    </p>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
  as: Heading = "h2",
  size = Heading === "h1" ? "xl" : "lg",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
  size?: "xl" | "lg" | "md";
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow className="mb-5">{eyebrow}</Eyebrow>}
      <Heading
        className={cn(
          "text-balance font-medium tracking-[-0.035em] text-foreground",
          size === "xl" && "text-5xl leading-[0.98] sm:text-7xl",
          size === "lg" && "text-4xl leading-[1.02] sm:text-6xl",
          size === "md" && "text-4xl leading-[1.05] sm:text-5xl",
        )}
      >
        <Accent text={title} />
      </Heading>
      {subtitle && <p className="mt-6 text-pretty text-lg leading-relaxed text-muted sm:text-xl">{subtitle}</p>}
    </div>
  );
}

const buttonBase =
  "group/btn inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3.5 text-sm font-medium transition-all duration-200 focus-visible:outline-2 disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.98]";

export const buttonVariants = {
  primary: cn(buttonBase, "bg-primary text-primary-foreground hover:bg-primary-strong"),
  accent: cn(buttonBase, "bg-accent text-accent-foreground hover:brightness-95"),
  secondary: cn(buttonBase, "border border-border bg-surface/60 text-foreground backdrop-blur hover:border-foreground/30"),
  ghost: cn(buttonBase, "text-foreground hover:bg-surface-2"),
  inverted: cn(buttonBase, "bg-ink-foreground text-ink hover:opacity-90"),
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
        "inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function CheckList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("space-y-3", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-foreground">
          <svg aria-hidden viewBox="0 0 20 20" className="mt-1 size-4 shrink-0 text-accent-ink" fill="none">
            <path d="M4 10.5l4 4 8-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Top section of inner pages: clears the floating header and sets the tone. */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  back,
  aside,
  size,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  size?: "xl" | "md";
  back?: ReactNode;
  aside?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-14 pt-32 sm:pb-20 sm:pt-44">
      <div aria-hidden className="glow absolute inset-0" />
      <div aria-hidden className="grid-lines absolute inset-0" />
      <Container
        className={cn("relative", aside && "grid items-center gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16")}
      >
        <Reveal>
          {back}
          <SectionHeader as="h1" size={size} eyebrow={eyebrow} title={title} subtitle={subtitle} className="max-w-4xl" />
          {children}
        </Reveal>
        {aside && <Reveal delay={0.1}>{aside}</Reveal>}
      </Container>
    </section>
  );
}

export function BackLink({ href, children }: { href: ComponentProps<typeof Link>["href"]; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
    >
      <span className="grid size-8 place-items-center rounded-full border border-border transition-colors group-hover:border-foreground/30">
        <svg aria-hidden viewBox="0 0 16 16" className="size-3.5" fill="none">
          <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      {children}
    </Link>
  );
}
