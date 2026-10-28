import { Container } from "./Container";
import { Spotlight } from "./ui/Spotlight";

export function PageShell({
  title,
  description,
  eyebrow,
  children,
}: {
  title: string;
  description?: string;
  eyebrow?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Spotlight className="border-b border-(--border)">
        <header className="py-16 sm:py-20">
          <Container>
            <div className="max-w-3xl">
              {eyebrow ? (
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-(--accent)">{eyebrow}</p>
              ) : null}
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-(--text) sm:text-5xl">{title}</h1>
              {description ? <p className="mt-4 text-lg leading-8 text-(--muted)">{description}</p> : null}
            </div>
          </Container>
        </header>
      </Spotlight>

      <div className="pt-14 pb-8">
        <Container>{children}</Container>
      </div>
    </>
  );
}
