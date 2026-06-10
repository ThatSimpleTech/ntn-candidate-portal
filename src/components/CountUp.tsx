'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
	to: number;
	prefix?: string;
	suffix?: string;
	/** Abbreviate millions as 1M, thousands shown with commas. */
	abbreviate?: boolean;
	durationMs?: number;
	className?: string;
}

const format = (value: number, abbreviate: boolean) => {
	if (abbreviate && value >= 1_000_000) {
		const m = value / 1_000_000;
		return `${m >= 10 ? Math.round(m) : Math.round(m * 10) / 10}M`;
	}
	return Math.round(value).toLocaleString('en-US');
};

/** Rolls a stat up from zero when it enters the viewport. */
export function CountUp({
	to,
	prefix = '',
	suffix = '',
	abbreviate = false,
	durationMs = 1600,
	className = '',
}: Props) {
	const ref = useRef<HTMLSpanElement>(null);
	const [value, setValue] = useState(0);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		let raf = 0;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			raf = requestAnimationFrame(() => setValue(to));
			return () => cancelAnimationFrame(raf);
		}
		const io = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return;
				io.disconnect();
				const start = performance.now();
				const tick = (now: number) => {
					const t = Math.min(1, (now - start) / durationMs);
					const eased = 1 - Math.pow(1 - t, 4);
					setValue(to * eased);
					if (t < 1) raf = requestAnimationFrame(tick);
				};
				raf = requestAnimationFrame(tick);
			},
			{ threshold: 0.4 },
		);
		io.observe(el);
		return () => {
			io.disconnect();
			cancelAnimationFrame(raf);
		};
	}, [to, durationMs]);

	return (
		<span ref={ref} className={className}>
			{prefix}
			{format(value, abbreviate)}
			{suffix}
		</span>
	);
}
