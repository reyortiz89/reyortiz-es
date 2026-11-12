import type { Lead } from "./lead-schema";

/**
 * Rule-based priority for a new lead, so the notification says at a glance
 * who to answer first. A = call today, B = answer within the day, C = nurture.
 */

export type LeadScore = { grade: "A" | "B" | "C"; points: number; reasons: string[] };

const FREE_MAIL = /@(gmail|googlemail|hotmail|outlook|live|yahoo|icloud|me|proton|protonmail|gmx|aol|msn)\./i;

const SIZE_POINTS: Record<string, number> = { "1-10": 5, "11-50": 15, "51-250": 25, "250+": 25 };

export function scoreLead(lead: Lead): LeadScore {
  let points = 0;
  const reasons: string[] = [];
  const add = (n: number, reason: string) => {
    points += n;
    reasons.push(reason);
  };

  const [kind] = lead.source.split(":");
  if (kind === "contact") add(35, "Ha escrito por el formulario de contacto");
  else if (kind === "assessment") add(25, "Ha completado una evaluación");
  else if (kind === "video") add(15, "Se ha registrado para ver un vídeo");
  else add(10, "Se ha apuntado a una lista de espera");

  if (lead.companySize && SIZE_POINTS[lead.companySize]) {
    add(SIZE_POINTS[lead.companySize], `Empresa de ${lead.companySize} personas`);
  }
  if (lead.company) add(5, "Indica su empresa");
  if (!FREE_MAIL.test(lead.email)) add(15, "Email corporativo");
  if ((lead.phone ?? "").replace(/\D/g, "").length >= 6) add(10, "Deja teléfono");
  if (lead.interest) add(5, `Interés: ${lead.interest}`);
  if ((lead.message ?? "").length >= 200) add(10, "Mensaje detallado");

  return { grade: points >= 70 ? "A" : points >= 40 ? "B" : "C", points, reasons };
}
