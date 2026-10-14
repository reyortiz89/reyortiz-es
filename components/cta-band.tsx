import { ArrowRight, Calendar } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { site } from "@/content/site";
import { ButtonLink, Container, ExternalButton } from "./ui";

export async function CtaBand({ title, text }: { title: string; text: string }) {
  const t = await getTranslations("common");
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface px-6 py-12 sm:px-12 sm:py-16">
          <div aria-hidden className="hero-glow absolute inset-0 opacity-80" />
          <div className="relative max-w-2xl">
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
            <p className="mt-4 text-lg text-muted">{text}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {site.bookingUrl ? (
                <ExternalButton href={site.bookingUrl}>
                  <Calendar className="size-4" aria-hidden />
                  {t("bookCall")}
                </ExternalButton>
              ) : null}
              <ButtonLink href="/contact" variant={site.bookingUrl ? "secondary" : "primary"}>
                {t("contactMe")}
                <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
