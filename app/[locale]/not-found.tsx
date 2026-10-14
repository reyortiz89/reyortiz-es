import { useTranslations } from "next-intl";
import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="glow absolute inset-0" />
      <div aria-hidden className="grid-lines absolute inset-0" />
      <Container className="relative flex min-h-[80vh] flex-col items-start justify-center pb-24 pt-40">
        <p className="font-display text-[8rem] leading-none text-accent-ink sm:text-[12rem]">404</p>
        <h1 className="mt-4 text-4xl font-medium tracking-[-0.035em] sm:text-6xl">{t("title")}</h1>
        <p className="mt-4 max-w-md text-lg text-muted">{t("text")}</p>
        <ButtonLink href="/" className="mt-10">
          {t("cta")}
        </ButtonLink>
      </Container>
    </section>
  );
}
