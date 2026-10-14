import { useTranslations } from "next-intl";
import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <Container className="flex min-h-[60vh] flex-col items-start justify-center py-24">
      <p className="text-sm font-semibold text-primary">404</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">{t("title")}</h1>
      <p className="mt-4 text-lg text-muted">{t("text")}</p>
      <ButtonLink href="/" className="mt-8">
        {t("cta")}
      </ButtonLink>
    </Container>
  );
}
