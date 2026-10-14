import { Mail, MapPin, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { site } from "@/content/site";
import { LinkedInIcon, WhatsAppIcon } from "./icons";
import { Container } from "./ui";

export async function Footer() {
  const t = await getTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <p className="font-semibold text-foreground">Rey Ortiz</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">{t("footer.tagline")}</p>
          <div className="mt-5 flex gap-2">
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="grid size-9 place-items-center rounded-full border border-border text-muted hover:text-foreground"
            >
              <LinkedInIcon className="size-4" />
            </a>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="grid size-9 place-items-center rounded-full border border-border text-muted hover:text-foreground"
            >
              <WhatsAppIcon className="size-4" />
            </a>
          </div>
        </div>

        <nav aria-label={t("footer.explore")}>
          <p className="text-sm font-semibold text-foreground">{t("footer.explore")}</p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li><Link className="hover:text-foreground" href="/services">{t("nav.services")}</Link></li>
            <li><Link className="hover:text-foreground" href="/cases">{t("nav.cases")}</Link></li>
            <li><Link className="hover:text-foreground" href="/resources">{t("nav.resources")}</Link></li>
            <li><Link className="hover:text-foreground" href="/about">{t("nav.about")}</Link></li>
            <li><Link className="hover:text-foreground" href="/contact">{t("nav.contact")}</Link></li>
          </ul>
        </nav>

        <div>
          <p className="text-sm font-semibold text-foreground">{t("footer.contact")}</p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li className="flex items-center gap-2">
              <Mail className="size-4" aria-hidden />
              <a className="hover:text-foreground" href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4" aria-hidden />
              <a className="hover:text-foreground" href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="size-4" aria-hidden />
              {site.location.city}
            </li>
          </ul>
        </div>
      </Container>
      <Container className="flex flex-col gap-3 border-t border-border py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {year} {site.legalName}. {t("footer.rights")}</p>
        <nav aria-label={t("footer.legal")} className="flex flex-wrap gap-4">
          {(["aviso-legal", "privacidad", "cookies"] as const).map((slug) => (
            <Link key={slug} className="hover:text-foreground" href={{ pathname: "/legal/[slug]", params: { slug } }}>
              {t(`legal.${slug}`)}
            </Link>
          ))}
        </nav>
      </Container>
    </footer>
  );
}
