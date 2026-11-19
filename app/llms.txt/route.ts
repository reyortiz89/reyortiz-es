import { assessments } from "@/content/assessments";
import { cases } from "@/content/cases";
import { profile } from "@/content/profile";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { getAllPosts } from "@/lib/blog";
import { blogUrl } from "@/lib/blog-meta";
import { absoluteUrl } from "@/lib/metadata";

export const revalidate = 3600;

/**
 * /llms.txt: a plain-text map of the site for AI assistants (ChatGPT, Claude,
 * Perplexity...), built from the same content as the pages so it never drifts.
 */
export function GET() {
  const es = "es" as const;
  const lines = [
    `# ${site.name}`,
    "",
    `> ${profile.headline[es]}. ${profile.short[es]}`,
    "",
    `${site.legalName} · ${profile.role[es]} · ${site.location.city}`,
    `Contacto: ${absoluteUrl("/contact", es)} · ${site.email}`,
    "",
    "## Servicios",
    ...services.map(
      (s) => `- [${s.title[es]}](${absoluteUrl({ pathname: "/services/[slug]", params: { slug: s.slug } }, es)}): ${s.tagline[es]}`,
    ),
    "",
    "## Casos",
    ...cases.map((c) => `- [${c.client}](${absoluteUrl({ pathname: "/cases/[slug]", params: { slug: c.slug } }, es)})`),
    "",
    "## Recursos gratuitos",
    ...assessments.map(
      (a) =>
        `- [${a.title[es]}](${absoluteUrl({ pathname: "/resources/assessments/[slug]", params: { slug: a.slug } }, es)}): ${a.short[es]}`,
    ),
    `- [Calculadora de ROI](${absoluteUrl("/resources/roi-calculator", es)})`,
    `- [Vídeos y formación](${absoluteUrl("/videos", es)})`,
    "",
    "## Blog",
    ...getAllPosts().map((p) => `- [${p.title}](${blogUrl(p.slug)}): ${p.description}`),
    "",
    "## English",
    `- [Home](${absoluteUrl("/", "en")})`,
    `- [Services](${absoluteUrl("/services", "en")})`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
