import { Mail, MapPin, Phone } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BookingEmbed } from "@/components/booking-embed";
import { ContactForm } from "@/components/contact-form";
import { ContactTabs } from "@/components/contact-tabs";
import { LinkedInIcon, WhatsAppIcon } from "@/components/icons";
import { Reveal } from "@/components/motion";
import { Container, Eyebrow, SectionHeader } from "@/components/ui";
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
  const steps = t.raw("steps") as string[];

  const channels = [
    { icon: Mail, label: site.email, href: `mailto:${site.email}` },
    { icon: Phone, label: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
    { icon: WhatsAppIcon, label: "WhatsApp", href: site.whatsapp },
    { icon: LinkedInIcon, label: "LinkedIn", href: site.linkedin },
  ];

  return (
    <section className="relative overflow-hidden pb-24 pt-32 sm:pt-44">
      <div aria-hidden className="glow absolute inset-0" />
      <div aria-hidden className="grid-lines absolute inset-0" />
      <Container className="relative grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <Reveal>
            <SectionHeader as="h1" eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-12">
              <Eyebrow>{t("why")}</Eyebrow>
              <ol className="mt-6 space-y-5">
                {steps.map((step, i) => (
                  <li key={step} className="flex items-start gap-4">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full border border-border bg-surface font-mono text-xs">
                      0{i + 1}
                    </span>
                    <span className="pt-1.5 text-lg leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-12">
              <Eyebrow>{t("direct")}</Eyebrow>
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {channels.map(({ icon: Icon, label, href }) => (
                  <li key={href}>
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="group flex items-center gap-3 rounded-2xl border border-border bg-surface/60 px-4 py-3 text-sm transition-colors hover:border-foreground/25"
                    >
                      <Icon className="size-4 shrink-0 text-muted group-hover:text-foreground" aria-hidden />
                      <span className="truncate">{label}</span>
                    </a>
                  </li>
                ))}
                <li className="flex items-center gap-3 px-4 py-3 text-sm text-muted">
                  <MapPin className="size-4 shrink-0" aria-hidden />
                  {site.location.city}
                </li>
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <ContactTabs
            bookLabel={t("tabs.book")}
            messageLabel={t("tabs.message")}
            booking={<BookingEmbed />}
            form={
              <div className="rounded-[2rem] border border-border bg-surface p-6 shadow-2xl shadow-black/5 sm:p-10">
                <ContactForm
                  email={site.email}
                  interests={services.map((s) => ({ value: s.slug, label: s.title[locale] }))}
                />
              </div>
            }
          />
        </Reveal>
      </Container>
    </section>
  );
}
