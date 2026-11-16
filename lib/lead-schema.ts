import { z } from "zod";

export const companySizes = ["1-10", "11-50", "51-250", "250+"] as const;

const optionalText = (max: number) => z.string().trim().max(max).optional().or(z.literal(""));

/**
 * Shape of every lead the site captures. `source` says where it came from:
 * "contact", "assessment:<slug>", "video:<slug>" or "video-waitlist:<slug>".
 */
export const leadSchema = z
  .object({
    name: z.string().trim().min(2).max(120),
    email: z.email().trim().max(200),
    phone: z
      .string()
      .trim()
      .max(40)
      .regex(/^[+()\d\s.-]*$/)
      .optional()
      .or(z.literal("")),
    company: optionalText(160),
    companySize: z.enum(companySizes).optional().or(z.literal("")),
    interest: optionalText(60),
    message: optionalText(5000),
    consent: z.literal(true),
    locale: z.enum(["es", "en"]),
    source: z.string().trim().max(80),
    pageUrl: z.string().trim().max(500).optional(),
    utm: z.record(z.string(), z.string().max(200)).optional(),
    /** Answers of a self-assessment, to build the report. */
    assessment: z
      .object({
        slug: z.string().max(60),
        answers: z.record(z.string().max(20), z.number().int().min(0).max(3)),
      })
      .optional(),
    turnstileToken: z.string().max(4096).optional(),
    /** Honeypot: real users never fill it. */
    website: z.string().max(0).optional(),
  })
  .superRefine((lead, ctx) => {
    if (lead.source === "contact" && (lead.message ?? "").length < 10) {
      ctx.addIssue({ code: "custom", path: ["message"], message: "required" });
    }
    // Videos ask for a phone number on purpose (follow-up by call or WhatsApp).
    if (lead.source.startsWith("video") && (lead.phone ?? "").replace(/\D/g, "").length < 6) {
      ctx.addIssue({ code: "custom", path: ["phone"], message: "required" });
    }
  });

export type Lead = z.infer<typeof leadSchema>;
