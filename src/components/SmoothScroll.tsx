'use client';

import Lenis from 'lenis';
import { useEffect } from 'react';

/** Inertial wheel scrolling; skipped for reduced-motion users and touch input. */
export function SmoothScroll() {
	useEffect(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const lenis = new Lenis({ duration: 1.1 });
		let id = requestAnimationFrame(function raf(time) {
			lenis.raf(time);
			id = requestAnimationFrame(raf);
		});
		return () => {
			cancelAnimationFrame(id);
			lenis.destroy();
		};
	}, []);
	return null;
}
