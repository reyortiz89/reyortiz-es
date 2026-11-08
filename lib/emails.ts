import "server-only";
import { getAssessment } from "@/content/assessments";
import { site } from "@/content/site";
import { getVideo } from "@/content/videos";
import { scoreAssessment, HOURLY_COST, type AssessmentResult } from "./assessment-score";
import type { Lead } from "./lead-schema";
import { absoluteUrl } from "./metadata";

/*
  Email templates. Plain HTML with inline styles so they render in every
  client, plus a text version.
*/

type Email = { subject: string; text: string; html: string };

const ink = "#0c0c0d";
const muted = "#5d5d57";
const lime = "#c6f24e";

export function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function layout(body: string) {
  return `<!doctype html><html><body style="margin:0;background:#f6f6f1;padding:24px 12px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:${ink}">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td align="center">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border:1px solid #e2e2da;border-radius:20px">
<tr><td style="padding:28px 32px 8px"><span style="display:inline-block;width:10px;height:10px;border-radius:5px;background:${lime};margin-right:8px"></span><strong style="font-size:15px">Rey Ortiz</strong></td></tr>
<tr><td style="padding:8px 32px 32px;font-size:15px;line-height:1.6">${body}</td></tr>
</table>
<p style="font-size:12px;color:${muted};margin:16px 0 0">${site.legalName} · ${site.location.city} · <a href="${site.url}" style="color:${muted}">${site.url.replace(/^https?:\/\//, "")}</a></p>
</td></tr></table></body></html>`;
}

function button(href: string, label: string) {
  return `<a href="${href}" style="display:inline-block;background:${ink};color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:999px;font-weight:600;font-size:14px">${escapeHtml(label)}</a>`;
}

function bar(score: number) {
  const color = score < 50 ? "#b9b9b0" : lime;
  return `<div style="background:#efefe8;border-radius:6px;height:8px;width:100%"><div style="background:${color};border-radius:6px;height:8px;width:${Math.max(4, score)}%"></div></div>`;
}

function reportHtml(title: string, r: AssessmentResult, es: boolean) {
  const areas = r.areas
    .map(
      (a) =>
        `<tr><td style="padding:6px 0;width:42%;font-size:14px">${escapeHtml(a.label)}</td><td style="padding:6px 8px">${bar(a.score)}</td><td style="padding:6px 0;width:36px;text-align:right;font-size:13px;color:${muted}">${a.score}</td></tr>`,
    )
    .join("");
  const weakest = [...r.areas].sort((a, b) => a.score - b.score).slice(0, 2);
  const estimate = r.estimate
    ? `<div style="background:#f6f6f1;border-radius:14px;padding:16px 18px;margin:20px 0">
         <p style="margin:0;font-size:13px;color:${muted}">${es ? "Ahorro potencial estimado" : "Estimated potential savings"}</p>
         <p style="margin:4px 0 0;font-size:22px;font-weight:600">${r.estimate.hoursMonth} ${es ? "h/mes" : "h/month"} · ≈ ${r.estimate.eurosYear.toLocaleString(es ? "es-ES" : "en-US")} €/${es ? "año" : "year"}</p>
         <p style="margin:6px 0 0;font-size:12px;color:${muted}">${es ? `Estimación orientativa con un coste de ${HOURLY_COST} €/h.` : `Rough estimate at ${HOURLY_COST} €/h.`}</p>
       </div>`
    : "";
  return `
    <p style="margin:0 0 4px;font-size:13px;color:${muted}">${escapeHtml(title)}</p>
    <p style="margin:0;font-size:44px;font-weight:600;letter-spacing:-1px">${r.score}<span style="font-size:16px;color:${muted};font-weight:400"> / 100</span></p>
    <p style="margin:4px 0 0;font-size:17px;font-weight:600">${escapeHtml(r.level.label)}</p>
    <p style="margin:8px 0 20px;color:${muted}">${escapeHtml(r.level.text)}</p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">${areas}</table>
    ${estimate}
    ${
      r.priorities.length
        ? `<p style="margin:24px 0 8px;font-weight:600">${es ? "Tus prioridades" : "Your priorities"}</p><ol style="margin:0;padding-left:20px">${r.priorities
            .map((p) => `<li style="margin:4px 0">${escapeHtml(p)}</li>`)
            .join("")}</ol>`
        : ""
    }
    <p style="margin:24px 0 8px;font-weight:600">${es ? "Por dónde empezar" : "Where to start"}</p>
    ${weakest.map((a) => `<p style="margin:0 0 10px"><strong>${escapeHtml(a.label)}.</strong> ${escapeHtml(a.advice)}</p>`).join("")}`;
}

/** Notification to Rey with everything needed to follow up. */
export function notificationEmail(lead: Lead): Email {
  const rows = [
    ["Nombre", lead.name],
    ["Email", lead.email],
    ["Teléfono", lead.phone],
    ["Empresa", lead.company],
    ["Tamaño", lead.companySize],
    ["Interés", lead.interest],
    ["Idioma", lead.locale],
    ["Origen", lead.source],
    ["Página", lead.pageUrl],
    ["UTM", lead.utm && Object.keys(lead.utm).length ? JSON.stringify(lead.utm) : ""],
  ].filter(([, v]) => v) as [string, string][];

  const [kind, slug = ""] = lead.source.split(":");
  let extraText = "";
  let extraHtml = "";
  let label = lead.source === "contact" ? "Formulario de contacto" : lead.source;

  if (kind === "assessment" && lead.assessment) {
    const assessment = getAssessment(lead.assessment.slug);
    if (assessment) {
      const r = scoreAssessment(assessment, lead.assessment.answers, "es");
      label = `${assessment.title.es} · ${r.score}/100`;
      extraText = `\n${assessment.title.es}: ${r.score}/100 (${r.level.label})\n${r.areas.map((a) => `- ${a.label}: ${a.score}`).join("\n")}\nPrioridades: ${r.priorities.join("; ")}${r.estimate ? `\nAhorro estimado: ${r.estimate.hoursMonth} h/mes` : ""}\n`;
      extraHtml = `<hr style="border:0;border-top:1px solid #e2e2da;margin:20px 0"/>${reportHtml(assessment.title.es, r, true)}`;
    }
  } else if (kind === "video" || kind === "video-waitlist") {
    const video = getVideo(slug);
    label = `${kind === "video" ? "Vídeo" : "Lista de espera"}: ${video?.title.es ?? slug}`;
  }

  const table = `<table style="font-size:14px">${rows
    .map(([k, v]) => `<tr><td style="padding:2px 14px 2px 0;color:${muted}">${k}</td><td>${escapeHtml(v)}</td></tr>`)
    .join("")}</table>`;

  return {
    subject: `Nuevo lead · ${label} · ${lead.name}${lead.company ? ` (${lead.company})` : ""}`,
    text: `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n${lead.message ? `\n${lead.message}\n` : ""}${extraText}`,
    html: layout(
      `<p style="margin:0 0 16px;font-size:18px;font-weight:600">${escapeHtml(label)}</p>${table}${
        lead.message ? `<p style="white-space:pre-wrap;margin:20px 0 0">${escapeHtml(lead.message)}</p>` : ""
      }${extraHtml}`,
    ),
  };
}

/** What the visitor receives, depending on where the lead came from. */
export function visitorEmail(lead: Lead): Email {
  const es = lead.locale === "es";
  const firstName = lead.name.split(" ")[0];
  const hi = es ? `Hola ${escapeHtml(firstName)},` : `Hi ${escapeHtml(firstName)},`;
  const signature = es ? "Un saludo,<br/>Rey Ortiz" : "Best,<br/>Rey Ortiz";
  const signatureText = es ? "Un saludo,\nRey Ortiz" : "Best,\nRey Ortiz";
  const book = button(site.bookingUrl, es ? "Agenda una llamada" : "Book a call");
  const [kind, slug = ""] = lead.source.split(":");

  if (kind === "assessment" && lead.assessment) {
    const assessment = getAssessment(lead.assessment.slug);
    if (assessment) {
      const r = scoreAssessment(assessment, lead.assessment.answers, lead.locale);
      const title = assessment.title[lead.locale];
      return {
        subject: es ? `Tu informe: ${title} (${r.score}/100)` : `Your report: ${title} (${r.score}/100)`,
        text: `${es ? `Hola ${firstName},` : `Hi ${firstName},`}\n\n${title}: ${r.score}/100 · ${r.level.label}\n${r.level.text}\n\n${r.areas
          .map((a) => `${a.label}: ${a.score}/100`)
          .join("\n")}\n\n${(es ? "Tus prioridades:\n" : "Your priorities:\n") + r.priorities.map((p, i) => `${i + 1}. ${p}`).join("\n")}\n\n${
          es ? "Si quieres, revisamos el resultado juntos en una llamada de 30 minutos:" : "If you like, we can go through the result together in a 30-minute call:"
        } ${site.bookingUrl}\n\n${signatureText}`,
        html: layout(
          `<p style="margin:0 0 16px">${hi}</p><p style="margin:0 0 24px">${
            es ? "Aquí tienes el informe completo de tu evaluación." : "Here's the full report of your assessment."
          }</p>${reportHtml(title, r, es)}<p style="margin:28px 0 16px">${
            es
              ? "Si quieres, revisamos el resultado juntos en una llamada de 30 minutos y te digo qué haría primero en tu caso."
              : "If you like, we can go through the result together in a 30-minute call and I'll tell you what I'd do first in your case."
          }</p>${book}<p style="margin:28px 0 0">${signature}</p>`,
        ),
      };
    }
  }

  if (kind === "video" || kind === "video-waitlist") {
    const video = getVideo(slug);
    const title = video?.title[lead.locale] ?? "";
    const library = absoluteUrl("/videos", lead.locale);
    const waitlist = kind === "video-waitlist";
    const intro = waitlist
      ? es
        ? `Gracias por apuntarte. Te escribiré en cuanto publique «${title}». Mientras tanto, ya tienes acceso a toda la biblioteca de vídeos desde este navegador.`
        : `Thanks for signing up. I'll write to you as soon as "${title}" is published. Meanwhile, you already have access to the whole video library from this browser.`
      : es
        ? `Ya tienes acceso a «${title}» y a toda la biblioteca de vídeos.`
        : `You now have access to "${title}" and the whole video library.`;
    return {
      subject: waitlist
        ? es
          ? `Te aviso cuando salga: ${title}`
          : `I'll let you know when it's out: ${title}`
        : es
          ? "Tu acceso a los vídeos"
          : "Your access to the videos",
      text: `${es ? `Hola ${firstName},` : `Hi ${firstName},`}\n\n${intro}\n\n${library}\n\n${signatureText}`,
      html: layout(
        `<p style="margin:0 0 16px">${hi}</p><p style="margin:0 0 24px">${escapeHtml(intro)}</p>${button(
          library,
          es ? "Ver los vídeos" : "Watch the videos",
        )}<p style="margin:28px 0 0">${signature}</p>`,
      ),
    };
  }

  const text = es
    ? "Gracias por escribirme. He recibido tu mensaje y te responderé lo antes posible con los siguientes pasos."
    : "Thanks for reaching out. I've received your message and will get back to you as soon as possible with next steps.";
  return {
    subject: es ? "He recibido tu mensaje" : "I've received your message",
    text: `${es ? `Hola ${firstName},` : `Hi ${firstName},`}\n\n${text}\n\n${signatureText}\n${site.url}`,
    html: layout(
      `<p style="margin:0 0 16px">${hi}</p><p style="margin:0 0 24px">${text}</p><p style="margin:0 0 16px">${
        es ? "Si prefieres, reserva directamente una llamada:" : "If you prefer, book a call directly:"
      }</p>${book}<p style="margin:28px 0 0">${signature}</p>`,
    ),
  };
}
