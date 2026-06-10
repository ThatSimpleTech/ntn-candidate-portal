'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const NAV = [
	{ href: '/jobs', label: 'Find Jobs' },
	{ href: '/tests', label: 'Exams' },
	{ href: '/pricing', label: 'Pricing' },
	{ href: '/departments', label: 'For Departments' },
	{ href: '/faq', label: 'FAQ' },
];

export function Header() {
	const pathname = usePathname();
	const [open, setOpen] = useState(false);

	return (
		<header className="sticky top-0 z-50 border-b-2 border-ink bg-paper">
			<div className="hazard h-1.5 w-full" aria-hidden />
			<div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
				<Link href="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
					<span className="flex h-9 w-9 items-center justify-center bg-ink text-paper transition-colors group-hover:bg-signal">
						<span className="display text-lg leading-none">N</span>
					</span>
					<span className="leading-tight">
						<span className="display block text-lg tracking-wide">
							National Testing Network
						</span>
						<span className="eyebrow block text-signal">One test. Every department.</span>
					</span>
				</Link>

				<nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
					{NAV.map((item) => {
						const active = pathname.startsWith(item.href);
						return (
							<Link
								key={item.href}
								href={item.href}
								className={`eyebrow px-3 py-2 transition-colors ${
									active ? 'bg-ink text-paper' : 'text-ink hover:bg-paper-2'
								}`}
							>
								{item.label}
							</Link>
						);
					})}
					<Link
						href="/dashboard"
						className="eyebrow ml-3 border-2 border-ink bg-signal px-4 py-2 text-paper transition-colors hover:bg-signal-deep"
					>
						Candidate Login
					</Link>
				</nav>

				<button
					type="button"
					className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 border-2 border-ink lg:hidden"
					aria-expanded={open}
					aria-label="Toggle navigation"
					onClick={() => setOpen((v) => !v)}
				>
					<span
						className={`h-0.5 w-5 bg-ink transition-transform ${open ? 'translate-y-1 rotate-45' : ''}`}
					/>
					<span className={`h-0.5 w-5 bg-ink transition-opacity ${open ? 'opacity-0' : ''}`} />
					<span
						className={`h-0.5 w-5 bg-ink transition-transform ${open ? '-translate-y-1 -rotate-45' : ''}`}
					/>
				</button>
			</div>

			{open && (
				<nav
					className="border-t-2 border-ink bg-paper px-4 pb-4 lg:hidden"
					aria-label="Mobile"
				>
					{NAV.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className="eyebrow block border-b border-line py-3"
							onClick={() => setOpen(false)}
						>
							{item.label}
						</Link>
					))}
					<Link
						href="/dashboard"
						className="eyebrow mt-3 block border-2 border-ink bg-signal px-4 py-3 text-center text-paper"
						onClick={() => setOpen(false)}
					>
						Candidate Login
					</Link>
				</nav>
			)}
		</header>
	);
}
