import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Cuéntame tu proyecto de IA, automatización o transformación digital y te respondo con los siguientes pasos.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="Contacto"
      title="Hablemos de tu proyecto"
      description="Cuéntame en qué punto estás y qué quieres conseguir. Te respondo con los siguientes pasos en menos de 48 horas."
    >
      <ContactForm />
    </PageShell>
  );
}
