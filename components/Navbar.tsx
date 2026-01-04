/**
 * Navigation bar component with anchor and page navigation
 */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";
import { Container } from "./Container";
import { useTheme } from "./ThemeProvider";

const navItems = [
	{ label: "Home", href: "/" },
	{ label: "About", href: "/about" },
	{ label: "Work", href: "/work" },
	{ label: "Services", href: "/services" },
	{ label: "Contact", href: "/contact" },
];

export function Navbar() {
	const pathname = usePathname();
	const { theme, toggleTheme } = useTheme();

	const isActive = (href: string) => {
		if (href === "/") return pathname === "/";
		return pathname === href;
	};

	return (
		<header className="sticky top-0 z-50 border-b border-(--border) bg-[color-mix(in_srgb,var(--bg)_92%,transparent)] backdrop-blur-md">
			<Container>
				<div className="flex h-14 items-center justify-between gap-4">
					<Link
						href="/"
						className="inline-flex items-center gap-3"
						aria-label="Home"
					>
						<span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-(--border) bg-(--surface) text-sm font-semibold tracking-tight shadow-sm">
							RO
						</span>
						<span className="hidden text-sm font-semibold tracking-tight text-(--text) sm:inline">
							Reynier Ortiz
						</span>
					</Link>

					<nav className="hidden md:block" aria-label="Pages">
						<ul className="flex items-center gap-1">
							{navItems.map((item) => {
								const active = isActive(item.href);
								return (
									<li key={item.href}>
										<Link
											href={item.href}
											aria-current={active ? "page" : undefined}
											className={
												"inline-flex items-center rounded-xl px-3 py-2 text-sm transition " +
												(active
													? "border border-(--border) bg-(--surface) text-(--text)"
													: "text-(--muted) hover:border hover:border-(--border) hover:bg-(--surface) hover:text-(--text)")
											}
										>
											{item.label}
										</Link>
									</li>
								);
							})}
						</ul>
					</nav>

					<div className="flex items-center gap-2">
						<button
							type="button"
							onClick={toggleTheme}
							className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-(--border) bg-(--surface) text-(--text) shadow-sm transition hover:-translate-y-px hover:shadow-md"
							aria-label={
								theme === "dark"
									? "Switch to light theme"
									: "Switch to dark theme"
							}
							title={theme === "dark" ? "Light theme" : "Dark theme"}
						>
							{theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
						</button>

						<Link
							href="/contact"
							className="hidden h-10 items-center justify-center rounded-xl border border-[color-mix(in_srgb,var(--accent)_80%,var(--border))] bg-(--accent) px-4 text-sm font-medium text-white shadow-sm transition hover:bg-[color-mix(in_srgb,var(--accent)_90%,#000)] sm:inline-flex"
						>
							Contact
						</Link>
					</div>
				</div>
			</Container>
		</header>
	);
}
