/**
 * Services page
 */
import type { Metadata } from "next";
import { Container, Section, Card, Badge, CTA } from "@/components";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: `Services | ${profile.identity.name}`,
  description: "Consulting and technical services offered by Reynier Ortiz.",
};

export default function Services() {
  return (
    <>
      {/* Hero Section */}
      <Section size="lg" className="pt-20 pb-12 bg-slate-50 border-b border-slate-200">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">Services</h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Strategic consulting, technical presales, and solution architecture to accelerate growth and drive results.
            </p>
          </div>
        </Container>
      </Section>

      {/* Services Grid */}
      <Section size="lg">
        <Container>
          <div className="space-y-8">
            {profile.services.map((service) => (
              <Card key={service.id} hover className="border-l-4 border-l-slate-900">
                <div>
                  {/* Header */}
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">{service.name}</h2>
                  <p className="text-lg text-slate-600 font-medium mb-6">{service.outcome}</p>

                  {/* Description */}
                  <p className="text-slate-600 mb-6">{service.description}</p>

                  {/* Deliverables */}
                  <div className="mb-6">
                    <h3 className="font-bold text-slate-900 mb-3">Typical Deliverables</h3>
                    <ul className="space-y-2">
                      {service.deliverables.map((deliverable, idx) => (
                        <li key={idx} className="flex gap-3 text-slate-600">
                          <span className="shrink-0 text-slate-400 mt-1">✓</span>
                          <span>{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Audience */}
                  <div className="pt-6 border-t border-slate-200">
                    <p className="text-sm text-slate-600">
                      <strong>Who it&apos;s for:</strong> {service.audience}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Skills Overview */}
      <Section size="lg" className="bg-slate-50">
        <Container>
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Core Expertise</h2>
            <p className="text-lg text-slate-600">
              Skills and competencies supporting each service
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {profile.skills.map((skillGroup, idx) => (
              <div key={idx}>
                <h3 className="text-lg font-bold text-slate-900 mb-4">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((item) => (
                    <Badge key={item} variant="default">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <CTA
        title="Ready to discuss your needs?"
        description="Get in touch to explore how these services can help achieve your goals."
        primaryButtonText="Contact me"
        primaryButtonHref="/contact"
        secondaryButtonText="View my work"
        secondaryButtonHref="/work"
      />
    </>
  );
}
