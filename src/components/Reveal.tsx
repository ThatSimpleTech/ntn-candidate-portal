'use client';

import { type ReactNode, useEffect, useRef } from 'react';

interface Props {
	children: ReactNode;
	/** Stagger offset in milliseconds. */
	delay?: number;
	className?: string;
}

/** Reveals children with a ceremonial rise when scrolled into view. */
export function Reveal({ children, delay = 0, className = '' }: Props) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			el.classList.add('in');
			return;
		}
		const io = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					el.classList.add('in');
					io.disconnect();
				}
			},
			{ threshold: 0.12, rootMargin: '0px 0px -48px 0px' },
		);
		io.observe(el);
		return () => io.disconnect();
	}, []);

	return (
		<div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
			{children}
		</div>
	);
}
