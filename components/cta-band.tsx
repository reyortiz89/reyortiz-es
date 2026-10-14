import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { site } from "@/content/site";
import { BookCallButton } from "./book-call";
import { Reveal } from "./motion";
import { Accent, ButtonLink, Container } from "./ui";

const dark = "bg-accent-foreground text-accent hover:bg-accent-foreground/90";

/** Big closing call to action shared by every page. */
export async function CtaBand({
  title,
  text,
  contactLabel,
}: {
  title: string;
  text: string;
  /** When set, the main button goes to the contact page with this label instead of booking a call. */
  contactLabel?: string;
}) {
  const t = await getTranslations("common");
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-accent px-6 py-14 text-accent-foreground sm:px-14 sm:py-20">
            <div aria-hidden className="grain absolute inset-0" />
            <div
              aria-hidden
              className="absolute -right-24 -top-24 size-80 rounded-full border-[40px] border-accent-foreground/[0.06] sm:size-[28rem]"
            />
            <div className="relative grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
              <h2 className="text-balance text-4xl font-medium leading-[1] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                <Accent text={title} />
              </h2>
              <div>
                <p className="text-pretty text-lg leading-relaxed text-accent-foreground/75">{text}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {contactLabel ? (
                    <ButtonLink href="/contact" className={dark}>
                      {contactLabel}
                      <ArrowRight className="size-4" aria-hidden />
                    </ButtonLink>
                  ) : (
                    <BookCallButton className={dark}>{t("bookCall")}</BookCallButton>
                  )}
                  {site.bookingUrl && !contactLabel && (
                    <ButtonLink
                      href="/contact"
                      variant="ghost"
                      className="text-accent-foreground hover:bg-accent-foreground/10"
                    >
                      {t("contactMe")}
                      <ArrowRight className="size-4" aria-hidden />
                    </ButtonLink>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
