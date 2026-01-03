/**
 * About page
 */
import type { Metadata } from "next";
import { Container, Section, Card, Badge, CTA } from "@/components";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: `About | ${profile.identity.name}`,
  description: "Learn more about Reynier Ortiz and his background in presales and technical strategy.",
};

export default function About() {
  return (
    <>
      {/* Hero Section */}
      <Section size="lg" className="pt-20 pb-12 bg-slate-50 border-b border-slate-200">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">About Me</h1>
            <p className="text-xl text-slate-600 leading-relaxed">{profile.identity.about}</p>
          </div>
        </Container>
      </Section>

      {/* Bio Section */}
      <Section size="lg">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div>
              <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wide mb-2">
                Location
              </h3>
              <p className="text-lg text-slate-900 font-medium">{profile.identity.location}</p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wide mb-2">
                Languages
              </h3>
              <p className="text-lg text-slate-900 font-medium">
                {profile.identity.languages.join(", ")}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wide mb-2">
                Experience
              </h3>
              <p className="text-lg text-slate-900 font-medium">
                {profile.credibility.experience}+ years
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Experience Timeline */}
      <Section size="lg" className="bg-slate-50">
        <Container>
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Professional Experience</h2>
          </div>
          <div className="space-y-6">
            {profile.experience.map((role) => (
              <Card key={role.id} hover className="relative">
                {/* Timeline dot */}
                <div className="absolute -left-8 top-8 w-4 h-4 rounded-full bg-slate-900 hidden lg:block" />

                <div className="flex flex-col md:flex-row md:items-start md:justify-between md:gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">{role.title}</h3>
                    <p className="text-lg text-slate-600 font-medium">{role.company}</p>
                  </div>
                  <div className="text-sm text-slate-600 md:text-right shrink-0 mt-2 md:mt-0">
                    <p>
                      {role.startDate} – {role.endDate}
                    </p>
                    <p>{role.location}</p>
                  </div>
                </div>

                <p className="text-slate-600 mb-4">{role.description}</p>

                <ul className="space-y-2">
                  {role.highlights.map((highlight, i) => (
                    <li key={i} className="flex gap-3 text-slate-600">
                      <span className="shrink-0 text-slate-400 mt-1">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Education */}
      <Section size="lg">
        <Container>
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Education</h2>
          </div>
          <div className="space-y-6">
            {profile.education.map((edu) => (
              <Card key={edu.id} hover>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">{edu.degree}</h3>
                    <p className="text-lg text-slate-600 font-medium mt-1">{edu.institution}</p>
                  </div>
                  <Badge variant="default" className="shrink-0">
                    {edu.year}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Skills Section */}
      <Section size="lg" className="bg-slate-50">
        <Container>
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Skills & Expertise</h2>
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
        title="Let's work together"
        description="Interested in collaborating? Reach out to discuss your needs."
        primaryButtonText="Get in touch"
        primaryButtonHref="/contact"
        secondaryButtonText="View services"
        secondaryButtonHref="/services"
      />
    </>
  );
}
