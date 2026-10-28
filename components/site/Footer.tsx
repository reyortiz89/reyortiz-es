import { site } from "@/data/site";

/** Footer of the original site. */
export function Footer() {
  return (
    <footer className="border-t border-(--border) bg-(--surface) py-8 text-center text-sm text-(--muted)">
      © <span>Copyright</span> <strong className="px-1 text-(--text)">{site.identity.name}</strong>{" "}
      <span>{site.footer.copyright}</span>
    </footer>
  );
}
