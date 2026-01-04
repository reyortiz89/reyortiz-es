import Link from "next/link";
import { Mail, Linkedin, MessageCircle } from "lucide-react";

type Props = {
  linkedInHref: string;
  emailHref: string;
  whatsappHref: string;
};

function IconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  const isExternal = href.startsWith("http");

  const className =
    "inline-flex h-10 w-10 items-center justify-center rounded-xl border border-(--border) bg-(--surface) text-(--text) shadow-sm transition hover:-translate-y-px hover:shadow-md";

  if (isExternal) {
    return (
      <a
        href={href}
        className={className}
        aria-label={label}
        title={label}
        target="_blank"
        rel="noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} aria-label={label} title={label}>
      {children}
    </Link>
  );
}

export function SocialRow({ linkedInHref, emailHref, whatsappHref }: Props) {
  return (
    <div className="flex items-center gap-2">
      <IconLink href={linkedInHref} label="LinkedIn">
        <Linkedin size={18} />
      </IconLink>
      <IconLink href={emailHref} label="Email">
        <Mail size={18} />
      </IconLink>
      <IconLink href={whatsappHref} label="WhatsApp">
        <MessageCircle size={18} />
      </IconLink>
    </div>
  );
}
