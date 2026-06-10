'use client';

import Image from 'next/image';
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
		<header className="sticky top-0 z-50 bg-ink text-paper">
			<div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
				<Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
					<Image
						src="/brand/logo_white_letters.png"
						alt="National Testing Network"
						width={150}
						height={56}
						priority
						className="h-11 w-auto"
					/>
				</Link>

				<nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
					{NAV.map((item) => {
						const active = pathname.startsWith(item.href);
						return (
							<Link
								key={item.href}
								href={item.href}
								className={`eyebrow px-3 py-2 transition-colors ${
									active
										? 'text-brass'
										: 'text-paper hover:text-brass'
								}`}
							>
								{item.label}
							</Link>
						);
					})}
					<Link
						href="/dashboard"
						className="btn-gold eyebrow ml-3 px-4 py-2.5"
					>
						Candidate Login
					</Link>
				</nav>

				<button
					type="button"
					className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 border border-line-ink lg:hidden"
					aria-expanded={open}
					aria-label="Toggle navigation"
					onClick={() => setOpen((v) => !v)}
				>
					<span
						className={`h-0.5 w-5 bg-paper transition-transform ${open ? 'translate-y-1 rotate-45' : ''}`}
					/>
					<span className={`h-0.5 w-5 bg-paper transition-opacity ${open ? 'opacity-0' : ''}`} />
					<span
						className={`h-0.5 w-5 bg-paper transition-transform ${open ? '-translate-y-1 -rotate-45' : ''}`}
					/>
				</button>
			</div>
			<div className="gold-rule h-0.5 w-full" aria-hidden />

			{open && (
				<nav className="border-t border-line-ink bg-ink px-4 pb-4 lg:hidden" aria-label="Mobile">
					{NAV.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className="eyebrow block border-b border-line-ink py-3 text-paper"
							onClick={() => setOpen(false)}
						>
							{item.label}
						</Link>
					))}
					<Link
						href="/dashboard"
						className="btn-gold eyebrow mt-3 block px-4 py-3 text-center"
						onClick={() => setOpen(false)}
					>
						Candidate Login
					</Link>
				</nav>
			)}
		</header>
	);
}
