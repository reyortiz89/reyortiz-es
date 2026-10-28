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
      title="Contact"
      description="For projects, consulting, or collaboration, share a short brief and Ill reply with next steps."
    >
      <ContactForm />
    </PageShell>
  );
}
