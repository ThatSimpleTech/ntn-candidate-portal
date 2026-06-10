import Link from 'next/link';
import { CountUp } from '@/components/CountUp';
import { Reveal } from '@/components/Reveal';
import {
	CLASSIFICATION_LABELS,
	type Classification,
	JOBS,
	SITE,
	TESTS,
} from '@/lib/content';

const STATS = [
	{ to: 100, suffix: '+', label: 'Testing locations nationwide' },
	{ to: 1_000_000, suffix: '+', abbreviate: true, label: 'Candidates tested since 2006' },
	{ to: 1000, suffix: 's', label: 'Participating departments' },
	{ to: 12, prefix: '$', label: 'Per additional department' },
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

/** Real agency seals NTN displays on its current welcome page. */
const SEALS = [
	{ file: 'seattle', name: 'City of Seattle, WA' },
	{ file: 'milwaukee', name: 'City of Milwaukee, WI' },
	{ file: 'aurora', name: 'City of Aurora, CO' },
	{ file: 'denver', name: 'City and County of Denver, CO' },
	{ file: 'baltimore-city', name: 'City of Baltimore, MD' },
	{ file: 'baltimore-county', name: 'Baltimore County, MD' },
];

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

			{/* Hero — NTN photography with a slow ceremonial push-in */}
			<section className="hero-photo text-paper">
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img src="/brand/landing-01.jpg" alt="" className="hero-img kenburns" />
				<div className="mx-auto max-w-6xl px-4 pb-24 pt-20 sm:px-6 lg:pt-28">
					<p className="eyebrow rise rise-1 text-brass">
						Public safety testing &middot; Est. 2006
					</p>
					<h1 className="display rise rise-2 mt-6 max-w-4xl text-6xl sm:text-7xl lg:text-8xl">
						Building stronger
						<br />
						public safety teams.
					</h1>
					<p className="rise rise-3 mt-7 max-w-xl text-lg leading-relaxed text-paper/85">
						One test. Every department. Take a single job-built exam — in person or
						from home — and send your scores to fire, police, 911, corrections, and
						EMS departments hiring across the country.
					</p>
					<div className="rise rise-4 mt-10 flex flex-wrap gap-4">
						<Link href="/jobs" className="btn-gold eyebrow px-7 py-4">
							Browse open jobs →
						</Link>
						<Link
							href="/tests"
							className="eyebrow border border-paper/60 px-7 py-4 text-paper transition-colors hover:border-brass hover:text-brass"
						>
							Explore the exams
						</Link>
					</div>
				</div>
				<div className="border-t border-white/15 bg-ink/75 backdrop-blur-sm">
					<div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-white/10 md:grid-cols-4">
						{STATS.map((s, i) => (
							<div key={s.label} className={`rise rise-${i + 2} px-5 py-6`}>
								<CountUp
									to={s.to}
									prefix={s.prefix}
									suffix={s.suffix}
									abbreviate={s.abbreviate}
									className="display gold-text text-4xl"
								/>
								<p className="mt-1 text-xs text-paper/70">{s.label}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Career tracks */}
			<section className="border-b border-line bg-paper">
				<div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
					<Reveal>
						<div className="flex items-end justify-between gap-6">
							<div>
								<p className="eyebrow text-signal">Where do you serve?</p>
								<h2 className="display mt-3 text-4xl sm:text-5xl">Choose your track</h2>
								<span className="heading-rule mt-4" aria-hidden />
							</div>
							<Link
								href="/jobs"
								className="eyebrow hidden text-signal transition-colors hover:text-signal-deep sm:block"
							>
								All openings →
							</Link>
						</div>
					</Reveal>
					<div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
						{TRACKS.map((t, i) => (
							<Reveal key={t.classification} delay={i * 70}>
								<Link
									href={`/jobs?track=${t.classification}`}
									className="card-lift block h-full border border-line bg-paper p-5"
								>
									<span className="gold-rule block h-1 w-8" aria-hidden />
									<p className="display mt-5 text-xl leading-tight">{t.label}</p>
									<p className="mono mt-2 text-xs text-muted">
										{t.count} open posting{t.count === 1 ? '' : 's'}
									</p>
								</Link>
							</Reveal>
						))}
					</div>
				</div>
			</section>

			{/* How it works */}
			<section className="border-b border-line bg-paper-2">
				<div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
					<Reveal>
						<p className="eyebrow text-signal">How it works</p>
						<h2 className="display mt-3 text-4xl sm:text-5xl">
							Built for the way hiring actually moves
						</h2>
						<span className="heading-rule mt-4" aria-hidden />
					</Reveal>
					<div className="mt-12 grid gap-4 md:grid-cols-3">
						{STEPS.map((step, i) => (
							<Reveal key={step.title} delay={i * 120}>
								<div className="h-full border border-line bg-paper p-8">
									<p className="display gold-text text-5xl">
										{String(i + 1).padStart(2, '0')}
									</p>
									<h3 className="display mt-5 text-2xl">{step.title}</h3>
									<p className="mt-3 text-sm leading-relaxed text-muted">{step.body}</p>
								</div>
							</Reveal>
						))}
					</div>
				</div>
			</section>

			{/* Exam catalog */}
			<section className="border-b border-line bg-paper">
				<div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
					<Reveal>
						<p className="eyebrow text-signal">The exams</p>
						<h2 className="display mt-3 text-4xl sm:text-5xl">
							Job-built, video-based, nationally validated
						</h2>
						<span className="heading-rule mt-4" aria-hidden />
					</Reveal>
					<div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
						{TESTS.map((t, i) => (
							<Reveal key={t.slug} delay={(i % 3) * 100}>
								<Link
									href={`/tests/${t.slug}`}
									className="card-lift group flex h-full flex-col border border-line bg-paper"
								>
									<div className="flex items-center justify-between bg-ink px-5 py-3 text-paper">
										<span className="eyebrow text-paper/60">{t.code}</span>
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
												<span className="text-xs text-muted">incl. one department</span>
											</span>
											<span className="eyebrow text-signal transition-colors group-hover:text-signal-deep">
												Details →
											</span>
										</div>
									</div>
								</Link>
							</Reveal>
						))}
					</div>
				</div>
			</section>

			{/* Agency honor ring — NTN's real agency seals as mounted medallions */}
			<section className="bg-ink text-paper" aria-label="Participating agencies">
				<div className="mx-auto max-w-6xl overflow-hidden px-4 py-16 sm:px-6">
					<Reveal>
						<p className="eyebrow text-center text-brass">
							Trusted by departments nationwide
						</p>
						<h2 className="display mt-3 text-center text-4xl sm:text-5xl">
							In service of cities like yours
						</h2>
					</Reveal>
					<div className="ring-stage mt-14">
						<div className="ring">
							{[...SEALS, ...SEALS].map((s, i) => (
								<div
									key={`${s.file}-${i}`}
									className="ring-item"
									data-dup={i >= SEALS.length}
									aria-hidden={i >= SEALS.length}
									style={{ ['--a' as string]: `${(360 / (SEALS.length * 2)) * i}deg` }}
								>
									<div className="coin-plate" title={s.name}>
										{/* eslint-disable-next-line @next/next/no-img-element */}
										<img
											src={`/brand/seals/${s.file}.png`}
											alt={i < SEALS.length ? `Seal of ${s.name}` : ''}
											width={112}
											height={112}
											loading="lazy"
										/>
									</div>
								</div>
							))}
						</div>
						<div className="ring-floor" aria-hidden />
					</div>
					<p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-relaxed text-paper/60">
						{SEALS.map((s) => s.name).join('  ·  ')}
					</p>
				</div>
			</section>

			{/* Split CTA */}
			<section className="grid md:grid-cols-2">
				<div className="border-b border-line bg-paper p-10 md:border-b-0 md:border-r lg:p-16">
					<Reveal>
						<p className="eyebrow text-signal">Candidates</p>
						<h2 className="display mt-4 text-4xl">Your career starts with one exam</h2>
						<p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
							Create an account, schedule your test, and track scores, applications, and
							department contacts from a single dashboard.
						</p>
						<Link
							href="/dashboard"
							className="eyebrow mt-8 inline-block bg-ink px-6 py-3.5 text-paper transition-colors hover:bg-ink-2"
						>
							Create your account →
						</Link>
					</Reveal>
				</div>
				<div className="hero-photo p-10 text-paper lg:p-16">
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img src="/brand/landing-04.jpg" alt="" className="hero-img" />
					<Reveal>
						<p className="eyebrow text-brass">Departments</p>
						<h2 className="display mt-4 text-4xl">Stronger lists, faster cycles</h2>
						<p className="mt-4 max-w-md text-sm leading-relaxed text-paper/85">
							Continuous testing delivers ranked, pre-screened candidate lists year-round —
							no exam logistics, no proctoring overhead, no waiting for the next cycle.
						</p>
						<Link href="/departments" className="btn-gold eyebrow mt-8 px-6 py-3.5">
							Partner with NTN →
						</Link>
					</Reveal>
				</div>
			</section>
		</>
	);
}
