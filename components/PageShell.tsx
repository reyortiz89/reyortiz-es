import { Container } from "./Container";

/** Inner page layout: dark title band (as on the original service pages), then the content. */
export function PageShell({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="relative isolate overflow-hidden bg-(--sidebar) py-14 text-white">
        <div aria-hidden className="dot-grid absolute inset-0 -z-10 opacity-60 [--dot:rgba(255,255,255,0.1)]" />
        <div aria-hidden className="absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-(--accent-2) opacity-30 blur-3xl" />
        <Container>
          <div className="max-w-3xl animate-[hero-in_0.7s_ease-out_both]">
            <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
            {description ? <p className="mt-3 text-base leading-7 text-white/75">{description}</p> : null}
          </div>
        </Container>
      </header>

      <div className="py-16">
        <Container>{children}</Container>
      </div>
    </>
  );
}
