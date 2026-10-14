import { z } from "zod";

export const companySizes = ["1-10", "11-50", "51-250", "250+"] as const;

/** Shape of every lead the site captures (contact form today, resources and videos later). */
export const leadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email().trim().max(200),
  phone: z
    .string()
    .trim()
    .max(40)
    .regex(/^[+()\d\s.-]*$/)
    .optional()
    .or(z.literal("")),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  companySize: z.enum(companySizes).optional().or(z.literal("")),
  interest: z.string().trim().max(60).optional().or(z.literal("")),
  message: z.string().trim().min(10).max(5000),
  consent: z.literal(true),
  locale: z.enum(["es", "en"]),
  /** Where the lead came from, e.g. "contact" or "video:meta-ads-claude". */
  source: z.string().trim().max(80),
  pageUrl: z.string().trim().max(500).optional(),
  utm: z.record(z.string(), z.string().max(200)).optional(),
  turnstileToken: z.string().max(4096).optional(),
  /** Honeypot: real users never fill it. */
  website: z.string().max(0).optional(),
});

export type Lead = z.infer<typeof leadSchema>;
