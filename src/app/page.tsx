import Link from 'next/link';
import {
	CLASSIFICATION_LABELS,
	type Classification,
	DEPARTMENTS,
	JOBS,
	SITE,
	TESTS,
} from '@/lib/content';

const STATS = [
	{ value: '100+', label: 'Testing locations nationwide' },
	{ value: '1M+', label: 'Candidates tested since 2006' },
	{ value: '1,000s', label: 'Participating departments' },
	{ value: '$12', label: 'Per additional department' },
];

const STEPS = [
	{
		title: 'Pick your track',
		body: 'Fire, law enforcement, 911 dispatch, corrections, EMS, or transit. Browse open recruitments from departments hiring right now.',
	},
	{
		title: 'Test once',
		body: 'Schedule one exam — at a testing center near you or proctored virtually from home. Video-based scenarios built around the actual job.',
	},
	{
		title: 'Apply everywhere',
		body: 'Your scores go to every department you select, instantly. Add more departments any time for a flat $12 — no retesting.',
	},
];

const jobCountFor = (c: Classification) => JOBS.filter((j) => j.classification === c).length;

const TRACKS = (Object.keys(CLASSIFICATION_LABELS) as Classification[]).map((c) => ({
	classification: c,
	label: CLASSIFICATION_LABELS[c],
	count: jobCountFor(c),
}));

const orgJsonLd = {
	'@context': 'https://schema.org',
	'@type': 'Organization',
	name: SITE.name,
	url: SITE.url,
	description: SITE.description,
	foundingDate: '2006',
	parentOrganization: {
		'@type': 'Organization',
		name: 'Ergometrics & Applied Personnel Research, Inc.',
	},
	address: {
		'@type': 'PostalAddress',
		addressLocality: 'Lynnwood',
		addressRegion: 'WA',
		addressCountry: 'US',
	},
};

export default function HomePage() {
	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(orgJsonLd).replace(/</g, '\\u003c'),
				}}
			/>

			{/* Hero */}
			<section className="border-b-2 border-ink bg-ink text-paper">
				<div className="blueprint">
					<div className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 lg:pt-24">
						<p className="eyebrow rise rise-1 text-brass">
							Public safety hiring / Est. 2006
						</p>
						<h1 className="display rise rise-2 mt-6 max-w-4xl text-6xl sm:text-7xl lg:text-[7rem]">
							One test.
							<br />
							<span className="text-signal">Every department.</span>
						</h1>
						<p className="rise rise-3 mt-8 max-w-xl text-lg text-muted-ink">
							Stop re-testing for every city. Take one job-built exam — in person or
							from home — and send your scores to fire, police, 911, corrections, and
							EMS departments hiring across the country.
						</p>
						<div className="rise rise-4 mt-10 flex flex-wrap gap-4">
							<Link
								href="/jobs"
								className="eyebrow border-2 border-signal bg-signal px-7 py-4 text-paper transition-colors hover:border-paper hover:bg-signal-deep"
							>
								Browse open jobs →
							</Link>
							<Link
								href="/tests"
								className="eyebrow border-2 border-paper px-7 py-4 text-paper transition-colors hover:bg-paper hover:text-ink"
							>
								Explore the exams
							</Link>
						</div>
					</div>
				</div>
				<div className="border-t-2 border-line-ink">
					<div className="mx-auto grid max-w-6xl grid-cols-2 divide-x-2 divide-line-ink px-0 md:grid-cols-4">
						{STATS.map((s, i) => (
							<div key={s.label} className={`rise rise-${i + 2} px-5 py-6`}>
								<p className="display text-4xl text-brass">{s.value}</p>
								<p className="mt-1 text-xs text-muted-ink">{s.label}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Career tracks */}
			<section className="grain border-b-2 border-ink">
				<div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
					<div className="flex items-end justify-between gap-6">
						<h2 className="display text-4xl sm:text-5xl">Choose your track</h2>
						<Link
							href="/jobs"
							className="eyebrow hidden text-signal hover:underline sm:block"
						>
							All openings →
						</Link>
					</div>
					<div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
						{TRACKS.map((t, i) => (
							<Link
								key={t.classification}
								href={`/jobs?track=${t.classification}`}
								className="card-lift card-lift-signal group border-2 border-ink bg-paper p-4"
							>
								<p className="stencil-no text-3xl text-ink">
									{String(i + 1).padStart(2, '0')}
								</p>
								<p className="display mt-6 text-xl leading-tight">{t.label}</p>
								<p className="mono mt-2 text-xs text-muted">
									{t.count} open posting{t.count === 1 ? '' : 's'}
								</p>
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* How it works */}
			<section className="border-b-2 border-ink bg-paper-2">
				<div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
					<p className="eyebrow text-signal">How it works</p>
					<h2 className="display mt-4 text-4xl sm:text-5xl">
						Built for the way hiring actually moves
					</h2>
					<div className="mt-12 grid gap-px border-2 border-ink bg-ink md:grid-cols-3">
						{STEPS.map((step, i) => (
							<div key={step.title} className="bg-paper p-8">
								<p className="stencil-no text-6xl text-signal">
									{String(i + 1).padStart(2, '0')}
								</p>
								<h3 className="display mt-6 text-2xl">{step.title}</h3>
								<p className="mt-3 text-sm leading-relaxed text-muted">{step.body}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Exam catalog */}
			<section className="border-b-2 border-ink">
				<div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
					<p className="eyebrow text-signal">The exams</p>
					<h2 className="display mt-4 text-4xl sm:text-5xl">
						Job-built, video-based, nationally validated
					</h2>
					<div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
						{TESTS.map((t) => (
							<Link
								key={t.slug}
								href={`/tests/${t.slug}`}
								className="card-lift group flex flex-col border-2 border-ink bg-paper"
							>
								<div className="flex items-center justify-between border-b-2 border-ink bg-ink px-5 py-3 text-paper">
									<span className="mono text-xs tracking-widest">{t.code}</span>
									<span className="eyebrow text-brass">
										{CLASSIFICATION_LABELS[t.classification]}
									</span>
								</div>
								<div className="flex flex-1 flex-col p-5">
									<h3 className="display text-3xl">{t.name}</h3>
									<p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
										{t.summary}
									</p>
									<div className="mono mt-5 flex items-center justify-between border-t border-line pt-4 text-sm">
										<span>
											${t.priceUsd}{' '}
											<span className="text-xs text-muted">/ incl. one dept</span>
										</span>
										<span className="text-signal group-hover:underline">
											Details →
										</span>
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* Department marquee */}
			<section
				className="overflow-hidden border-b-2 border-ink bg-ink py-5 text-paper"
				aria-label="Participating departments"
			>
				<div className="marquee-track flex w-max gap-12">
					{[...DEPARTMENTS, ...DEPARTMENTS].map((d, i) => (
						<span key={`${d.slug}-${i}`} className="display whitespace-nowrap text-2xl">
							{d.name}
							<span className="mono ml-3 text-sm text-brass">
								{d.city}, {d.state}
							</span>
							<span className="ml-12 text-signal" aria-hidden>
								✕
							</span>
						</span>
					))}
				</div>
			</section>

			{/* Split CTA */}
			<section className="grid md:grid-cols-2">
				<div className="grain border-b-2 border-ink p-10 md:border-b-0 md:border-r-2 lg:p-16">
					<p className="eyebrow text-signal">Candidates</p>
					<h2 className="display mt-4 text-4xl">Your career starts with one exam</h2>
					<p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
						Create an account, schedule your test, and track scores, applications, and
						department contacts from a single dashboard.
					</p>
					<Link
						href="/dashboard"
						className="eyebrow mt-8 inline-block border-2 border-ink bg-ink px-6 py-3 text-paper transition-colors hover:border-signal hover:bg-signal"
					>
						Create your account →
					</Link>
				</div>
				<div className="bg-ink p-10 text-paper lg:p-16">
					<p className="eyebrow text-brass">Departments</p>
					<h2 className="display mt-4 text-4xl">Stronger lists, faster cycles</h2>
					<p className="mt-4 max-w-md text-sm leading-relaxed text-muted-ink">
						Continuous testing delivers ranked, pre-screened candidate lists year-round —
						no exam logistics, no proctoring overhead, no waiting for the next cycle.
					</p>
					<Link
						href="/departments"
						className="eyebrow mt-8 inline-block border-2 border-paper px-6 py-3 transition-colors hover:bg-paper hover:text-ink"
					>
						Partner with NTN →
					</Link>
				</div>
			</section>
		</>
	);
}
