import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { site } from "@/content/site";
import { LinkedInIcon, WhatsAppIcon } from "./icons";
import { Container } from "./ui";

export async function Footer() {
  const t = await getTranslations();
  const year = new Date().getFullYear();

  const explore = [
    { href: "/services", label: t("nav.services") },
    { href: "/cases", label: t("nav.cases") },
    { href: "/resources", label: t("nav.resources") },
    { href: "/videos", label: t("nav.videos") },
    { href: "/about", label: t("nav.about") },
    { href: "/contact", label: t("nav.contact") },
  ] as const;

  return (
    <footer className="relative overflow-hidden bg-ink text-ink-foreground dark:border-t dark:border-border">
      <div aria-hidden className="grain absolute inset-0" />
      <Container className="relative grid gap-12 pb-10 pt-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
            {t("footer.tagline")}
          </p>
          <a
            href={`mailto:${site.email}`}
            className="group mt-8 inline-flex items-center gap-2 border-b border-ink-foreground/30 pb-1 text-lg transition-colors hover:border-accent hover:text-accent"
          >
            {site.email}
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </a>
        </div>

        <nav aria-label={t("footer.explore")} className="md:col-span-3 md:col-start-7">
          <p className="text-xs uppercase tracking-[0.18em] text-ink-foreground/50">{t("footer.explore")}</p>
          <ul className="mt-5 space-y-3">
            {explore.map((item) => (
              <li key={item.href}>
                <Link className="text-ink-foreground/80 transition-colors hover:text-accent" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="text-xs uppercase tracking-[0.18em] text-ink-foreground/50">{t("footer.contact")}</p>
          <ul className="mt-5 space-y-3 text-ink-foreground/80">
            <li>
              <a className="transition-colors hover:text-accent" href={`tel:${site.phone.replace(/\s/g, "")}`}>
                {site.phone}
              </a>
            </li>
            <li>{t("footer.location")}</li>
            <li className="flex gap-2 pt-2">
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="grid size-10 place-items-center rounded-full border border-ink-foreground/20 transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"
              >
                <LinkedInIcon className="size-4" />
              </a>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="grid size-10 place-items-center rounded-full border border-ink-foreground/20 transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"
              >
                <WhatsAppIcon className="size-4" />
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <Container className="relative">
        <p
          aria-hidden
          className="select-none whitespace-nowrap pb-6 text-center text-[19vw] font-medium leading-[0.9] tracking-[-0.06em] text-ink-foreground/[0.07] xl:text-[15rem]"
        >
          Rey <span className="font-display">Ortiz</span>
        </p>
      </Container>

      <Container className="relative flex flex-col gap-3 border-t border-ink-foreground/10 py-6 text-xs text-ink-foreground/50 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {site.legalName}. {t("footer.rights")}
        </p>
        <nav aria-label={t("footer.legal")} className="flex flex-wrap gap-5">
          {(["aviso-legal", "privacidad", "cookies"] as const).map((slug) => (
            <Link
              key={slug}
              className="transition-colors hover:text-ink-foreground"
              href={{ pathname: "/legal/[slug]", params: { slug } }}
            >
              {t(`legal.${slug}`)}
            </Link>
          ))}
        </nav>
      </Container>
    </footer>
  );
}
