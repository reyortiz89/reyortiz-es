/**
 * Footer component
 */
import Link from "next/link";
import { profile } from "@/data/profile";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <p>
        <strong>{profile.identity.name}</strong>
      </p>
      <p>
        9 {currentYear} {profile.identity.name}. All rights reserved.
      </p>
      <nav aria-label="Footer">
        <ul>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li>
            <a href="#" aria-label="LinkedIn (placeholder)">
              LinkedIn
            </a>
          </li>
          <li>
            <a href="#" aria-label="GitHub (placeholder)">
              GitHub
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
