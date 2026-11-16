import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container, Eyebrow } from "@/components/ui";
import { legal, legalSlugs, legalUpdated, type LegalSlug } from "@/content/legal";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";
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
    <section className="pb-24 pt-32 sm:pt-44">
      <Container className="grid gap-12 lg:grid-cols-[0.35fr_1fr]">
        <nav aria-label={t("eyebrow")} className="lg:sticky lg:top-32 lg:self-start">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <ul className="mt-6 flex flex-wrap gap-2 lg:flex-col lg:gap-1">
            {legalSlugs.map((s) => (
              <li key={s}>
                <Link
                  href={{ pathname: "/legal/[slug]", params: { slug: s } }}
                  aria-current={s === slug ? "page" : undefined}
                  className={cn(
                    "inline-block rounded-full px-4 py-2 text-sm transition-colors",
                    s === slug ? "bg-foreground text-background" : "text-muted hover:bg-surface-2 hover:text-foreground",
                  )}
                >
                  {t(s)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <article className="max-w-3xl">
          <h1 className="text-5xl font-medium tracking-[-0.04em] sm:text-6xl">{t(slug)}</h1>
          <p className="mt-4 text-sm text-muted">
            {t("updated")}: {new Date(legalUpdated).toLocaleDateString(locale, { dateStyle: "long" })}
          </p>
          <div className="mt-12 space-y-10 border-t border-border pt-10">
            {legal[slug][locale].map((block) => (
              <section key={block.heading}>
                <h2 className="text-xl font-medium tracking-tight">{block.heading}</h2>
                {block.body.map((p) => (
                  <p key={p} className="mt-3 text-pretty leading-relaxed text-muted">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </article>
      </Container>
    </section>
  );
}
