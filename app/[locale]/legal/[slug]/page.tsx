import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container, Section } from "@/components/ui";
import { legal, legalSlugs, legalUpdated, type LegalSlug } from "@/content/legal";
import { routing, type Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: Locale; slug: string }> };

const isLegalSlug = (s: string): s is LegalSlug => (legalSlugs as readonly string[]).includes(s);

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => legalSlugs.map((slug) => ({ locale, slug })));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLegalSlug(slug)) return {};
  const t = await getTranslations({ locale, namespace: "legal" });
  return {
    ...pageMetadata({
      locale,
      href: { pathname: "/legal/[slug]", params: { slug } },
      title: t(slug),
      description: t(slug),
    }),
    robots: { index: false, follow: true },
  };
}

export default async function LegalPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLegalSlug(slug)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("legal");

  return (
    <Section>
      <Container className="max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight">{t(slug)}</h1>
        <p className="mt-3 text-sm text-muted">
          {t("updated")}: {new Date(legalUpdated).toLocaleDateString(locale, { dateStyle: "long" })}
        </p>
        <div className="mt-10 space-y-10">
          {legal[slug][locale].map((block) => (
            <section key={block.heading}>
              <h2 className="text-xl font-semibold">{block.heading}</h2>
              {block.body.map((p) => (
                <p key={p} className="mt-3 leading-relaxed text-muted">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>
      </Container>
    </Section>
  );
}
