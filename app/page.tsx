/**
 * Single-page home with anchor navigation and icon-based skills
 */
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import {
  Container,
  Section,
  LinkButton,
  Card,
  Badge,
  CTA,
  SkillIcon,
} from "@/components";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: `${profile.identity.name} | ${profile.identity.title}`,
  description: profile.identity.summary,
};

export default function Home() {
  const selectedWork = profile.work.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <Section size="lg" className="pt-20 md:pt-32 pb-12" id="home">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4 leading-tight">
              {profile.identity.name}
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-6 leading-relaxed font-medium">
              {profile.identity.title}
            </p>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-2xl">
              {profile.identity.summary}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <LinkButton
                href="#contact"
                size="lg"
                variant="primary"
              >
                Get in touch <ArrowRight className="ml-2" size={20} />
              </LinkButton>
              <LinkButton
                href="#work"
                size="lg"
                variant="outline"
              >
                View my work
              </LinkButton>
            </div>
          </div>
        </Container>
      </Section>

      {/* Credibility Strip */}
      <Section size="sm" className="bg-slate-50 border-y border-slate-200">
        <Container>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-6 md:gap-8 text-center">
            <div>
              <p className="text-3xl md:text-4xl font-bold text-slate-900">
                {profile.credibility.experience}+
              </p>
              <p className="text-sm md:text-base text-slate-600 mt-1">Years of Experience</p>
            </div>
            <div>
              <p className="text-xl md:text-2xl font-bold text-slate-900">
                {profile.credibility.regions.length}
              </p>
              <p className="text-sm md:text-base text-slate-600 mt-1">Global Regions</p>
            </div>
            <div>
              <p className="text-xl md:text-2xl font-bold text-slate-900">
                {profile.credibility.industries.length}
              </p>
              <p className="text-sm md:text-base text-slate-600 mt-1">Industries</p>
            </div>
            <div className="col-span-3 md:col-span-1">
              <p className="text-lg md:text-xl font-bold text-slate-900">
                {profile.experience.length}
              </p>
              <p className="text-sm md:text-base text-slate-600 mt-1">Roles</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* About Section */}
      <Section size="lg" id="about">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">About</h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-4">
              {profile.identity.about}
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              {profile.identity.summary}
            </p>
          </div>
        </Container>
      </Section>

      {/* Experience Section */}
      <Section size="lg" className="bg-slate-50" id="experience">
        <Container>
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Work Experience</h2>
            <p className="text-lg text-slate-600">My professional journey and key roles</p>
          </div>
          <div className="space-y-6">
            {profile.experience.slice(0, 4).map((role) => (
              <Card key={role.id} hover className="border-l-4 border-l-slate-900">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between md:gap-4 mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{role.title}</h3>
                    <p className="text-slate-600">{role.company}</p>
                  </div>
                  <p className="text-sm text-slate-500 whitespace-nowrap">
                    {role.startDate} - {role.endDate}
                  </p>
                </div>
                <p className="text-slate-600 mb-3">{role.description}</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-slate-600">
                  {role.highlights.slice(0, 2).map((highlight, idx) => (
                    <li key={idx}>{highlight}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Selected Work Preview */}
      <Section size="lg" className="bg-white" id="work">
        <Container>
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Featured Work</h2>
            <p className="text-lg text-slate-600">Selected projects showcasing my expertise and impact</p>
          </div>
          <div className="space-y-6">
            {selectedWork.map((work) => (
              <Card key={work.id} hover className="border-l-4 border-l-slate-900">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between md:gap-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{work.title}</h3>
                    <Badge variant="outline" className="mb-4">
                      {work.category}
                    </Badge>
                    <div className="space-y-3 text-slate-600">
                      <p>
                        <strong>Problem:</strong> {work.problem}
                      </p>
                      <p>
                        <strong>Approach:</strong> {work.approach}
                      </p>
                      <p>
                        <strong>Outcome:</strong> {work.outcome}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {work.tags.map((tag) => (
                        <Badge key={tag} variant="default" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <LinkButton
              href="#contact"
              variant="outline"
            >
              Ready to work together? <ArrowRight className="ml-2" size={18} />
            </LinkButton>
          </div>
        </Container>
      </Section>

      {/* Skills Section with Icons */}
      <Section size="lg" className="bg-slate-50" id="skills">
        <Container>
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Skills & Expertise</h2>
            <p className="text-lg text-slate-600">Specialized capabilities across presales, product, and strategy</p>
          </div>
          <div className="space-y-12">
            {profile.skills.map((skillGroup, idx) => (
              <div key={idx}>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">{skillGroup.category}</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {skillGroup.items.map((item) => (
                    <div
                      key={item}
                      className="flex flex-col items-center gap-3 p-4 rounded-xl bg-white border border-slate-200 hover:shadow-md hover:border-slate-300 transition-all"
                    >
                      <SkillIcon skill={item} size={28} />
                      <p className="text-sm font-medium text-slate-900 text-center">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <CTA
        title="Ready to collaborate?"
        description="Let's discuss how I can help solve your challenges and drive results for your organization."
        primaryButtonText="Get in touch"
        primaryButtonHref="#contact"
        secondaryButtonText="View experience"
        secondaryButtonHref="#experience"
      />

      {/* Contact Section */}
      <Section size="lg" className="bg-slate-50" id="contact">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Get In Touch</h2>
            <p className="text-lg text-slate-600 mb-8">
              Have a project in mind or want to explore how I can help? Let&apos;s connect and discuss your needs.
            </p>
            <div className="space-y-4 mb-8">
              <p className="text-slate-600">
                <strong>Email:</strong>{" "}
                <a href={`mailto:${profile.identity.email}`} className="text-slate-900 hover:underline">
                  {profile.identity.email}
                </a>
              </p>
              <p className="text-slate-600">
                <strong>Phone:</strong>{" "}
                <a href={`tel:${profile.identity.phone}`} className="text-slate-900 hover:underline">
                  {profile.identity.phone}
                </a>
              </p>
              <p className="text-slate-600">
                <strong>Location:</strong> {profile.identity.location}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <LinkButton
                href={`mailto:${profile.identity.email}`}
                size="lg"
                variant="primary"
              >
                Send Email
              </LinkButton>
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white border border-slate-200 text-slate-900 hover:bg-slate-50 focus:ring-slate-900 px-6 py-3 text-base"
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
