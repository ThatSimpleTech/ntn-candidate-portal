'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

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
	const [hidden, setHidden] = useState(false);

	// Glide away on scroll down, return on scroll up
	useEffect(() => {
		let last = window.scrollY;
		let ticking = false;
		const onScroll = () => {
			if (ticking) return;
			ticking = true;
			requestAnimationFrame(() => {
				const y = window.scrollY;
				setHidden(y > 160 && y > last + 2);
				last = y;
				ticking = false;
			});
		};
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	return (
		<header
			style={{ viewTransitionName: 'site-header' }}
			className={`sticky top-3 z-50 px-3 pt-3 text-paper transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-6 ${
				hidden && !open ? '-translate-y-[130%]' : ''
			}`}
		>
			<div className="header-glass mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 rounded-full border border-white/10 px-5 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)] sm:px-7">
				<Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
					<Image
						src="/brand/logo_white_letters.png"
						alt="National Testing Network"
						width={150}
						height={56}
						preload
						className="h-10 w-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
					/>
				</Link>

				<nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
					{NAV.map((item) => {
						const active = pathname.startsWith(item.href);
						return (
							<Link
								key={item.href}
								href={item.href}
								data-active={active}
								className={`eyebrow nav-link px-3 py-2 transition-colors ${
									active ? 'text-brass' : 'text-paper hover:text-brass'
								}`}
							>
								{item.label}
							</Link>
						);
					})}
					<Link
						href="/dashboard"
						className="btn-gold btn-pill eyebrow ml-3 px-5 py-2.5"
					>
						Candidate Login
					</Link>
				</nav>

				<button
					type="button"
					className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-white/15 lg:hidden"
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

			{open && (
				<nav
					className="header-glass mx-auto mt-2 max-w-6xl rounded-3xl border border-white/10 px-5 pb-5 pt-2 shadow-[0_24px_48px_-20px_rgba(0,0,0,0.65)] lg:hidden"
					aria-label="Mobile"
				>
					{NAV.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className="eyebrow block border-b border-white/10 py-3.5 text-paper"
							onClick={() => setOpen(false)}
						>
							{item.label}
						</Link>
					))}
					<Link
						href="/dashboard"
						className="btn-gold btn-pill eyebrow mt-4 block px-4 py-3 text-center"
						onClick={() => setOpen(false)}
					>
						Candidate Login
					</Link>
				</nav>
			)}
		</header>
	);
}
