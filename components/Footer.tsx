/**
 * Footer component
 */
import Link from "next/link";
import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";
import { Container } from "./Container";
import { profile } from "@/data/profile";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <Container className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Contact</h3>
            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <a
                  href={`mailto:${profile.identity.email}`}
                  className="hover:text-slate-900 transition-colors"
                >
                  {profile.identity.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <a
                  href={`tel:${profile.identity.phone.replace(/\s+/g, "")}`}
                  className="hover:text-slate-900 transition-colors"
                >
                  {profile.identity.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>{profile.identity.location}</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Social</h3>
            <div className="flex gap-4">
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-slate-900 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-slate-900 transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Pages</h3>
            <div className="space-y-2 text-sm">
              <Link
                href="/about"
                className="text-slate-600 hover:text-slate-900 transition-colors block"
              >
                About
              </Link>
              <Link
                href="/work"
                className="text-slate-600 hover:text-slate-900 transition-colors block"
              >
                Work
              </Link>
              <Link
                href="/services"
                className="text-slate-600 hover:text-slate-900 transition-colors block"
              >
                Services
              </Link>
              <Link
                href="/contact"
                className="text-slate-600 hover:text-slate-900 transition-colors block"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-200 pt-8">
          <p className="text-sm text-slate-600 text-center">
            © {currentYear} {profile.identity.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
