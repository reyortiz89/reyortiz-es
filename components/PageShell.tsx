import { Container } from "./Container";

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
      <header className="py-12 sm:py-16">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-3xl font-semibold tracking-tight text-(--text) sm:text-4xl">
              {title}
            </h1>
            {description ? (
              <p className="mt-3 text-base leading-7 text-(--muted)">{description}</p>
            ) : null}
          </div>
        </Container>
      </header>

      <main className="pb-20">
        <Container>{children}</Container>
      </main>
    </>
  );
}
