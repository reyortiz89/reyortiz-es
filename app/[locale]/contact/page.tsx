import { Calendar, Mail, MapPin, Phone } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/contact-form";
import { LinkedInIcon, WhatsAppIcon } from "@/components/icons";
import { Container, ExternalButton, Section, SectionHeader } from "@/components/ui";
import { services } from "@/content/services";
import { site } from "@/content/site";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  const tm = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({ locale, href: "/contact", title: tm("contact"), description: t("subtitle") });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const tc = await getTranslations("common");

  const channels = [
    { icon: Mail, label: site.email, href: `mailto:${site.email}` },
    { icon: Phone, label: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
    { icon: WhatsAppIcon, label: "WhatsApp", href: site.whatsapp },
    { icon: LinkedInIcon, label: "LinkedIn", href: site.linkedin },
  ];

  return (
    <Section>
      <Container className="grid gap-12 lg:grid-cols-[1.4fr_0.6fr]">
        <div>
          <SectionHeader as="h1" title={t("title")} subtitle={t("subtitle")} />
          <div className="mt-10 rounded-3xl border border-border bg-surface p-6 sm:p-8">
            <ContactForm
              email={site.email}
              interests={services.map((s) => ({ value: s.slug, label: s.title[locale] }))}
            />
          </div>
        </div>

        <aside className="space-y-6 lg:pt-4">
          {site.bookingUrl && (
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6">
              <h2 className="font-semibold">{t("bookTitle")}</h2>
              <p className="mt-2 text-sm text-muted">{t("bookText")}</p>
              <ExternalButton href={site.bookingUrl} className="mt-4 w-full">
                <Calendar className="size-4" aria-hidden />
                {tc("bookCall")}
              </ExternalButton>
            </div>
          )}
          <div className="rounded-2xl border border-border p-6">
            <h2 className="font-semibold">{t("direct")}</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {channels.map(({ icon: Icon, label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-3 text-muted hover:text-foreground"
                  >
                    <Icon className="size-4 shrink-0" aria-hidden />
                    {label}
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-3 text-muted">
                <MapPin className="size-4 shrink-0" aria-hidden />
                {site.location.city}
              </li>
            </ul>
          </div>
        </aside>
      </Container>
    </Section>
  );
}
