import type { ReactNode } from 'react';
import type { Classification } from '@/lib/content';

/** Engraved line icons for the six career tracks, drawn on a 32px grid. */
const PATHS: Record<Classification, ReactNode> = {
	FIREFIGHTER: (
		<g transform="translate(1.7 1.7) scale(1.19)">
			<path
				vectorEffect="non-scaling-stroke"
				d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5Z"
			/>
		</g>
	),
	LAW_ENFORCEMENT: (
		<>
			<path d="M16 3.5 26.5 7v8.3c0 6.6-4.5 11-10.5 13.2C10 26.3 5.5 21.9 5.5 15.3V7L16 3.5Z" />
			<path d="m16 11 1.55 3.15 3.45.5-2.5 2.45.6 3.45L16 18.9l-3.1 1.65.6-3.45-2.5-2.45 3.45-.5L16 11Z" />
		</>
	),
	DISPATCH: (
		<>
			<path d="M6 18v-2.5a10 10 0 0 1 20 0V18" />
			<path d="M6 17.5h3.5V24H7.5A1.5 1.5 0 0 1 6 22.5v-5Z" />
			<path d="M26 17.5h-3.5V24h2a1.5 1.5 0 0 0 1.5-1.5v-5Z" />
			<path d="M26 23v1.5a3.5 3.5 0 0 1-3.5 3.5H18" />
			<path d="M15.5 28h2a1.5 1.5 0 0 0 0-3h-2a1.5 1.5 0 0 0 0 3Z" />
		</>
	),
	CORRECTIONS: (
		<>
			<rect x="7" y="13.5" width="18" height="14" />
			<path d="M11 13.5V9a5 5 0 0 1 10 0v4.5" />
			<path d="M16 19v4" />
			<circle cx="16" cy="18.5" r="1.4" />
		</>
	),
	EMS: (
		<>
			<circle cx="16" cy="16" r="12.5" />
			<path d="M13.5 8.5h5V13H23v5h-4.5v4.5h-5V18H9v-5h4.5V8.5Z" />
		</>
	),
	TRANSIT: (
		<>
			<path d="M7.5 5.5h17a2 2 0 0 1 2 2V22a2.5 2.5 0 0 1-2.5 2.5H8A2.5 2.5 0 0 1 5.5 22V7.5a2 2 0 0 1 2-2Z" />
			<path d="M5.5 10.5h21" />
			<path d="M5.5 18.5h21" />
			<path d="M10 28.5 8.5 24.5M22 28.5l1.5-4" />
			<path d="M9.5 21.5h.01M22.5 21.5h.01" />
		</>
	),
};

interface Props {
	classification: Classification;
	className?: string;
}

export function TrackIcon({ classification, className }: Props) {
	return (
		<svg
			viewBox="0 0 32 32"
			fill="none"
			stroke="currentColor"
			strokeWidth={1.6}
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
			aria-hidden
		>
			{PATHS[classification]}
		</svg>
	);
}
