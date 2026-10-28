import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { PageShell } from "@/components/PageShell";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${profile.identity.name}.`,
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
