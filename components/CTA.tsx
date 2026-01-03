/**
 * Call-to-Action section component
 */
import { Container } from "./Container";
import { LinkButton } from "./LinkButton";

interface CTAProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
}

export function CTA({
  title = "Ready to work together?",
  description = "Get in touch to discuss how we can solve your challenges and accelerate your goals.",
  primaryButtonText = "Contact me",
  primaryButtonHref = "/contact",
  secondaryButtonText = "View my work",
  secondaryButtonHref = "/work",
}: CTAProps) {
  return (
    <section className="py-16 bg-slate-50 border-t border-slate-200">
      <Container className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{title}</h2>
        <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">{description}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <LinkButton
            href={primaryButtonHref}
            variant="primary"
            size="lg"
          >
            {primaryButtonText}
          </LinkButton>
          <LinkButton
            href={secondaryButtonHref}
            variant="outline"
            size="lg"
          >
            {secondaryButtonText}
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
