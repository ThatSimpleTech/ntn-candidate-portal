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
		<div className="grain">
			<div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
				<p className="eyebrow text-signal">The exam catalog</p>
				<h1 className="display mt-4 text-5xl sm:text-6xl">
					Tests built from the job itself
				</h1>
				<p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
					Every NTN exam is developed by the industrial-organizational psychologists at
					Ergometrics using video scenarios drawn from real incidents. No trivia, no
					tricks — a fair preview of the work, scored against national benchmarks.
				</p>

				<div className="mt-12 space-y-4">
					{TESTS.map((t, i) => (
						<Link
							key={t.slug}
							href={`/tests/${t.slug}`}
							className="card-lift card-lift-signal grid gap-6 border-2 border-ink bg-paper p-6 sm:grid-cols-[80px_1fr_auto] sm:items-center"
						>
							<span className="stencil-no hidden text-6xl text-ink sm:block">
								{String(i + 1).padStart(2, '0')}
							</span>
							<div>
								<div className="flex flex-wrap items-center gap-3">
									<span className="mono text-xs tracking-widest text-muted">
										{t.code}
									</span>
									<span className="eyebrow bg-ink px-2 py-1 text-paper">
										{CLASSIFICATION_LABELS[t.classification]}
									</span>
									{t.virtual && (
										<span className="eyebrow border border-brass px-2 py-1 text-brass">
											Virtual available
										</span>
									)}
								</div>
								<h2 className="display mt-3 text-4xl">{t.name}</h2>
								<p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
									{t.summary}
								</p>
							</div>
							<div className="text-left sm:text-right">
								<p className="mono text-2xl">${t.priceUsd}</p>
								<p className="mono mt-1 text-xs text-muted">{t.durationMinutes} min</p>
								<p className="eyebrow mt-3 text-signal">Details →</p>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
