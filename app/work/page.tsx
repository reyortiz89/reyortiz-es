/**
 * Work page - Selected projects and case studies
 */
import type { Metadata } from "next";
import { Container, Section, Card, Badge, CTA } from "@/components";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: `Work | ${profile.identity.name}`,
  description: "Selected projects and work highlights from Reynier Ortiz.",
};

export default function Work() {
  return (
    <>
      {/* Hero Section */}
      <Section size="lg" className="pt-20 pb-12 bg-slate-50 border-b border-slate-200">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">Selected Work</h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              A collection of recent projects and highlights from my career in presales, solution architecture, and technical strategy.
            </p>
          </div>
        </Container>
      </Section>

      {/* Work Items */}
      <Section size="lg">
        <Container>
          <div className="space-y-8">
            {profile.work.map((work) => (
              <Card key={work.id} hover className="border-l-4 border-l-slate-900">
                <div>
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between md:gap-4 mb-4">
                    <div>
                      <h2 className="text-3xl font-bold text-slate-900 mb-2">{work.title}</h2>
                      <Badge variant="outline">{work.category}</Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4 text-slate-600">
                    <div>
                      <h3 className="font-bold text-slate-900 mb-2">Challenge</h3>
                      <p>{work.problem}</p>
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900 mb-2">Approach</h3>
                      <p>{work.approach}</p>
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900 mb-2">Outcome</h3>
                      <p>{work.outcome}</p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-200">
                    {work.tags.map((tag) => (
                      <Badge key={tag} variant="default">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Experience Summary */}
      <Section size="lg" className="bg-slate-50">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-slate-900 mb-2">
                {profile.credibility.experience}+
              </p>
              <p className="text-slate-600">Years of Experience</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-slate-900 mb-2">
                {profile.experience.length}
              </p>
              <p className="text-slate-600">Roles and Positions</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-slate-900 mb-2">
                {profile.credibility.regions.length}
              </p>
              <p className="text-slate-600">Global Regions</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <CTA
        title="Interested in working together?"
        description="Let's discuss how we can collaborate on your next project or initiative."
        primaryButtonText="Get in touch"
        primaryButtonHref="/contact"
        secondaryButtonText="View services"
        secondaryButtonHref="/services"
      />
    </>
  );
}
