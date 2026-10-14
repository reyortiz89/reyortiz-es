import { ArrowRight, ArrowUpRight, Calculator, Clock, FileText, Gauge, Play, Radar, Route } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/motion";
import { Container, PageHero, Section } from "@/components/ui";
import { VideoMock } from "@/components/video-mock";
import { automationAudit, digitalMaturity } from "@/content/assessments";
import { videos } from "@/content/videos";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: Locale }> };
type Item = { title: string; text: string; tag: string; cta: string };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "resources" });
  const tm = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({ locale, href: "/resources", title: tm("resources"), description: t("subtitle") });
}

function Card({
  href,
  className,
  children,
}: {
  href?: ComponentProps<typeof Link>["href"];
  className?: string;
  children: ReactNode;
}) {
  const base = cn("group relative flex h-full flex-col overflow-hidden rounded-3xl p-7 sm:p-8", className);
  return href ? (
    <Link href={href} className={cn(base, "transition-all hover:-translate-y-1")}>
      {children}
    </Link>
  ) : (
    <div className={base}>{children}</div>
  );
}

function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("rounded-full px-3 py-1 text-xs", className)}>{children}</span>;
}

export default async function ResourcesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("resources");
  const tc = await getTranslations("common");
  const tv = await getTranslations("videos");
  const item = (key: string) => t.raw(`items.${key}`) as Item;
  const audit = item("audit");
  const maturity = item("maturity");
  const roi = item("roi");
  const library = item("videos");
  const soon = [
    { ...item("roadmap"), icon: Route },
    { ...item("templates"), icon: FileText },
  ];
  const cardBorder = "border border-border bg-surface hover:border-foreground/20";
  const go = (label: string) => (
    <span className="relative mt-8 inline-flex items-center gap-2 text-sm font-medium">
      {label}
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
    </span>
  );

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("heroTitle")} subtitle={t("subtitle")} />
      <Section className="pt-0 sm:pt-0">
        <Container>
          <div className="grid gap-4 lg:grid-cols-4">
            {/* Automation audit */}
            <Reveal className="lg:col-span-2 lg:row-span-2">
              <Card
                href={{ pathname: "/resources/assessments/[slug]", params: { slug: automationAudit.slug } }}
                className="bg-ink text-ink-foreground sm:p-10"
              >
                <div aria-hidden className="grain absolute inset-0" />
                <div aria-hidden className="absolute -bottom-24 -right-24 size-80 rounded-full bg-accent/30 blur-3xl" />
                <div className="relative flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-2xl bg-accent text-accent-foreground">
                    <Gauge className="size-5" aria-hidden />
                  </span>
                  <Tag className="bg-ink-foreground/10 text-ink-foreground/80">{audit.tag}</Tag>
                </div>
                <div aria-hidden className="relative my-10 grid grid-cols-[auto_1fr] items-center gap-6 sm:gap-8">
                  <div className="relative size-28 sm:size-32">
                    <svg viewBox="0 0 120 120" className="size-full -rotate-90">
                      <circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" strokeOpacity=".12" strokeWidth="10" />
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        fill="none"
                        stroke="var(--accent)"
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray={2 * Math.PI * 50}
                        strokeDashoffset={2 * Math.PI * 50 * 0.42}
                      />
                    </svg>
                    <span className="absolute inset-0 grid place-items-center text-4xl font-medium tracking-tight">58</span>
                  </div>
                  <ul className="space-y-3">
                    {automationAudit.areas.slice(0, 4).map((area, i) => (
                      <li key={area.key}>
                        <div className="mb-1.5 flex justify-between text-xs text-ink-foreground/60">
                          <span>{area.label[locale]}</span>
                          <span className="tabular-nums">{[72, 38, 55, 64][i]}</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-ink-foreground/10">
                          <div
                            className={cn("h-full rounded-full", i === 1 ? "bg-ink-foreground/40" : "bg-accent")}
                            style={{ width: `${[72, 38, 55, 64][i]}%` }}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <h2 className="relative mt-auto text-3xl font-medium tracking-tight sm:text-5xl">{audit.title}</h2>
                <p className="relative mt-3 max-w-md text-pretty text-lg leading-relaxed text-ink-foreground/70">{audit.text}</p>
                <span className="relative mt-8 inline-flex items-center gap-2 self-start rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-accent-foreground">
                  {audit.cta}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </Card>
            </Reveal>

            {/* Digital maturity */}
            <Reveal delay={0.05} className="lg:col-span-2">
              <Card
                href={{ pathname: "/resources/assessments/[slug]", params: { slug: digitalMaturity.slug } }}
                className={cardBorder}
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-2xl bg-surface-2">
                    <Radar className="size-5" aria-hidden />
                  </span>
                  <Tag className="bg-surface-2 text-muted">{maturity.tag}</Tag>
                </div>
                <div className="mt-8 flex gap-1.5" aria-hidden>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <span
                      key={n}
                      className={cn(
                        "grid h-9 flex-1 place-items-center rounded-xl font-mono text-xs",
                        n <= 3 ? "bg-accent text-accent-foreground" : "bg-surface-2 text-muted",
                      )}
                    >
                      {n}
                    </span>
                  ))}
                </div>
                <h2 className="mt-8 text-2xl font-medium tracking-tight">{maturity.title}</h2>
                <p className="mt-2 flex-1 text-pretty leading-relaxed text-muted">{maturity.text}</p>
                {go(maturity.cta)}
              </Card>
            </Reveal>

            {/* ROI calculator */}
            <Reveal delay={0.1}>
              <Card href="/resources/roi-calculator" className={cardBorder}>
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-2xl bg-surface-2">
                    <Calculator className="size-5" aria-hidden />
                  </span>
                  <Tag className="bg-surface-2 text-muted">{roi.tag}</Tag>
                </div>
                <h2 className="mt-10 text-xl font-medium tracking-tight">{roi.title}</h2>
                <p className="mt-2 flex-1 text-pretty leading-relaxed text-muted">{roi.text}</p>
                {go(roi.cta)}
              </Card>
            </Reveal>

            {/* Coming soon */}
            <Reveal delay={0.15}>
              <Card className="border border-dashed border-border">
                <Tag className="self-start bg-surface-2 text-muted">{tc("comingSoon")}</Tag>
                <ul className="mt-8 flex-1 space-y-6">
                  {soon.map(({ icon: Icon, title, text }) => (
                    <li key={title}>
                      <p className="flex items-center gap-2.5 font-medium">
                        <Icon className="size-4 text-muted" aria-hidden />
                        {title}
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">{text}</p>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>

            {/* Video library */}
            <Reveal delay={0.05} className="lg:col-span-4">
              <Card href="/videos" className="bg-accent p-0 text-accent-foreground sm:p-0">
                <div aria-hidden className="grain absolute inset-0" />
                <div className="relative grid items-center gap-8 p-7 sm:p-10 lg:grid-cols-[0.9fr_1.1fr]">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="grid size-11 place-items-center rounded-2xl bg-accent-foreground text-accent">
                        <Play className="size-5 fill-current" aria-hidden />
                      </span>
                      <Tag className="bg-accent-foreground/10">{library.tag}</Tag>
                    </div>
                    <h2 className="mt-8 text-3xl font-medium tracking-tight sm:text-4xl">{library.title}</h2>
                    <p className="mt-3 max-w-md text-pretty text-lg leading-relaxed text-accent-foreground/70">{library.text}</p>
                    <p className="mt-6 inline-flex items-center gap-2 text-sm text-accent-foreground/70">
                      <Clock className="size-4" aria-hidden />
                      {t("videosCount", { count: videos.length })}
                    </p>
                    <span className="mt-8 flex w-fit items-center gap-2 rounded-full bg-accent-foreground px-6 py-3.5 text-sm font-medium text-accent">
                      {library.cta}
                      <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </div>
                  <div aria-hidden className="grid grid-cols-2 gap-3">
                    {videos.slice(0, 2).map((video, i) => (
                      <div key={video.slug} className={cn("overflow-hidden rounded-2xl shadow-xl shadow-black/15", i === 1 && "translate-y-6")}>
                        <VideoMock
                          visual={video.visual}
                          palette={i === 0 ? "ink" : "stone"}
                          ai={tv("ai")}
                          topLeft={`EP 0${i + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </Reveal>
          </div>
        </Container>
      </Section>
      <CtaBand title={t("ctaTitle")} text={t("ctaText")} />
    </>
  );
}
