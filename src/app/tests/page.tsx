import type { Metadata } from 'next';
import Link from 'next/link';
import { CLASSIFICATION_LABELS, TESTS } from '@/lib/content';

export const metadata: Metadata = {
	title: 'Public Safety Entrance Exams',
	description:
		'FireTEAM, FrontLine National, ECOMM National, REACT, MedicTEAM, and CPAT — video-based, nationally validated entrance exams for public safety careers.',
	openGraph: {
		title: 'Public Safety Entrance Exams | NTN',
		description:
			'Video-based, nationally validated entrance exams for fire, police, 911, corrections, and EMS careers.',
		url: '/tests',
	},
	alternates: { canonical: '/tests' },
};

export default function TestsPage() {
	return (
		<div className="bg-paper">
			<div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
				<p className="eyebrow text-signal">The exam catalog</p>
				<h1 className="display mt-4 text-5xl sm:text-6xl">
					Tests built from the job itself
				</h1>
				<span className="heading-rule in mt-5" aria-hidden />
				<p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
					Every NTN exam is developed by the industrial-organizational psychologists at
					Ergometrics using video scenarios drawn from real incidents. No trivia, no
					tricks — a fair preview of the work, scored against national benchmarks.
				</p>

				<div className="mt-12 border-t border-line">
					{TESTS.map((t, i) => (
						<Link
							key={t.slug}
							href={`/tests/${t.slug}`}
							className="ink-sweep group -mx-4 grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 border-b border-line px-4 py-7 sm:grid-cols-[6.5rem_1fr_auto] sm:py-8"
						>
							<span className="display num-ghost hidden text-7xl leading-none sm:block">
								{String(i + 1).padStart(2, '0')}
							</span>
							<span className="min-w-0">
								<span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
									<span className="display text-3xl transition-colors duration-500 group-hover:text-paper sm:text-4xl">
										{t.name}
									</span>
									<span className="mono text-xs tracking-widest text-muted transition-colors duration-500 group-hover:text-brass">
										{t.code}
									</span>
									<span className="eyebrow text-signal transition-colors duration-500 group-hover:text-brass">
										{CLASSIFICATION_LABELS[t.classification]}
										{t.virtual ? ' · virtual available' : ''}
									</span>
								</span>
								<span className="mt-1.5 block max-w-2xl text-sm leading-relaxed text-muted transition-colors duration-500 group-hover:text-paper/70">
									{t.summary}
								</span>
							</span>
							<span className="text-right">
								<span className="mono block text-2xl transition-colors duration-500 group-hover:text-brass">
									${t.priceUsd}
								</span>
								<span className="mono mt-0.5 block text-xs text-muted transition-colors duration-500 group-hover:text-paper/60">
									{t.durationMinutes} min
								</span>
							</span>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
