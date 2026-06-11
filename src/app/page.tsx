import Link from 'next/link';
import { CountUp } from '@/components/CountUp';
import { Reveal } from '@/components/Reveal';
import { TrackIcon } from '@/components/TrackIcon';
import {
	CLASSIFICATION_LABELS,
	type Classification,
	JOBS,
	SITE,
	TESTS,
} from '@/lib/content';

const STATS = [
	{ to: 100, suffix: '+', label: 'Testing locations nationwide' },
	{ to: 25_000, suffix: '+', label: 'Test sessions every year' },
	{ to: 2500, suffix: '+', label: 'Clients served by test developer Ergometrics' },
	{ to: 15, prefix: '$', label: 'Per additional department' },
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
		body: 'Your scores go to every department you select, instantly. Add more departments any time for $15 — no retesting.',
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

			{/* Warm paper canvas: the hero and every panel float on it */}
			<div className="paper-tex -mt-19 pb-24">

			{/* Hero — NTN photography, cinematic grade, slow ceremonial push-in */}
			<section className="hero-photo hero-round text-paper">
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img src="/brand/landing-01.jpg" alt="" className="hero-img kenburns" />
				<div className="hero-drift mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-center px-4 pb-44 pt-40 sm:px-6">
					<p className="eyebrow rise rise-1 flex items-center gap-3 text-brass">
						<span className="gold-rule h-px w-10" aria-hidden />
						Public safety testing &middot; Est. 2006
					</p>
					<h1 className="display rise rise-2 relative mt-6 max-w-4xl text-[clamp(3.5rem,8vw,7.75rem)]">
						<span className="glow-gold -inset-x-16 -inset-y-8" aria-hidden />
						Building stronger
						<br />
						<span className="gold-text">public safety</span> teams.
					</h1>
					<p className="rise rise-3 mt-7 max-w-xl text-lg leading-relaxed text-paper/85">
						One test. Every department. Take a single job-built exam — in person or
						from home — and send your scores to fire, police, 911, corrections, and
						EMS departments hiring across the country.
					</p>
					<div className="rise rise-4 mt-10 flex flex-wrap gap-4">
						<Link href="/jobs" className="btn-gold btn-pill eyebrow px-8 py-4">
							Browse open jobs →
						</Link>
						<Link
							href="/tests"
							className="eyebrow rounded-full border border-paper/50 px-8 py-4 text-paper backdrop-blur-sm transition-all hover:border-brass hover:text-brass"
						>
							Explore the exams
						</Link>
					</div>
				</div>
				<div
					className="scroll-cue rise rise-5 absolute bottom-36 left-1/2 hidden -translate-x-1/2 sm:block"
					aria-hidden
				>
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6 text-brass">
						<path d="M12 4v14m0 0 6-6m-6 6-6-6" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</div>
			</section>

			{/* Commission record — smoked-glass strip mounted over the hero's foot */}
			<div className="relative z-10 mx-auto -mt-24 max-w-6xl px-4 sm:px-6">
				<div className="glass-ink grid grid-cols-2 text-paper md:grid-cols-4">
					{STATS.map((s, i) => (
						<div
							key={s.label}
							className={`rise rise-${i + 2} border-white/10 px-6 py-7 ${i > 0 ? 'border-l' : ''} ${i === 2 ? 'max-md:border-l-0' : ''} ${i >= 2 ? 'max-md:border-t' : ''}`}
						>
							<CountUp
								to={s.to}
								prefix={s.prefix}
								suffix={s.suffix}
								abbreviate={s.abbreviate}
								className="display gold-text text-4xl lg:text-5xl"
							/>
							<p className="mt-2 text-xs text-paper/70">{s.label}</p>
						</div>
					))}
				</div>
			</div>

			{/* Career tracks */}
			<section>
				<div className="mx-auto max-w-6xl px-4 pb-10 pt-16 sm:px-6">
					<Reveal>
						<div className="flex items-end justify-between gap-6">
							<div>
								<p className="eyebrow text-signal">Where do you serve?</p>
								<h2 className="display mt-3 text-[clamp(2.25rem,4.5vw,3.75rem)]">
									Choose your track
								</h2>
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
					{/* Duty roster: a typographic index, not a card grid */}
					<div className="mt-12 border-t border-line">
						{TRACKS.map((t, i) => (
							<Reveal key={t.classification} delay={i * 50}>
								<Link
									href={`/jobs?track=${t.classification}`}
									className="ink-sweep group -mx-4 flex items-center gap-4 border-b border-line px-4 py-5 sm:gap-8 sm:py-6"
								>
									<span className="mono w-8 text-xs text-muted transition-colors duration-500 group-hover:text-brass">
										{String(i + 1).padStart(2, '0')}
									</span>
									<span className="display flex-1 text-[clamp(1.75rem,4.5vw,3.5rem)] transition-colors duration-500 group-hover:text-paper">
										{t.label}
										<sup className="mono ml-2 align-super text-xs font-normal tracking-normal text-signal transition-colors duration-500 group-hover:text-brass sm:ml-3 sm:text-sm">
											{t.count}
										</sup>
									</span>
									<TrackIcon
										classification={t.classification}
										className="h-8 w-8 text-signal opacity-70 transition-all duration-500 group-hover:translate-x-0 group-hover:text-brass group-hover:opacity-100 sm:h-10 sm:w-10 sm:translate-x-2"
									/>
									<span
										className="hidden text-xl text-muted transition-all duration-500 group-hover:translate-x-1 group-hover:text-brass sm:block"
										aria-hidden
									>
										→
									</span>
								</Link>
							</Reveal>
						))}
					</div>
				</div>
			</section>

			{/* How it works — a dark mounted panel, three stations on one gold thread */}
			<section className="mx-3 mt-8 sm:mx-6 lg:mx-10">
				<div className="panel-ink ink-tex text-paper">
					<div className="mx-auto max-w-6xl px-5 py-20 sm:px-10 lg:py-24">
						<Reveal>
							<p className="eyebrow text-brass">How it works</p>
							<h2 className="display mt-3 text-[clamp(2.25rem,4.5vw,3.75rem)]">
								Built for the way hiring actually moves
							</h2>
							<span className="heading-rule mt-4" aria-hidden />
						</Reveal>
						{/* Three stations divided by hairlines — typography carries it, no boxes */}
						<div className="mt-12 grid divide-y divide-white/10 md:grid-cols-3 md:divide-x md:divide-y-0">
							{STEPS.map((step, i) => (
								<Reveal key={step.title} delay={i * 130}>
									<div className={`h-full py-8 md:py-2 ${i > 0 ? 'md:pl-10' : ''} ${i < 2 ? 'md:pr-10' : ''}`}>
										<p className="display num-ghost-dark text-[clamp(5rem,9vw,8rem)] leading-none">
											{String(i + 1).padStart(2, '0')}
										</p>
										<h3 className="display -mt-4 text-3xl">{step.title}</h3>
										<p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/65">
											{step.body}
										</p>
									</div>
								</Reveal>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Exam catalog */}
			<section>
				<div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
					<Reveal>
						<p className="eyebrow text-signal">The exams</p>
						<h2 className="display mt-3 text-[clamp(2.25rem,4.5vw,3.75rem)]">
							Job-built, video-based, nationally validated
						</h2>
						<span className="heading-rule mt-4" aria-hidden />
					</Reveal>
					{/* The commission's exam ledger: registry rows, hairline rules */}
					<div className="mt-12 border-t border-line">
						{TESTS.map((t, i) => (
							<Reveal key={t.slug} delay={i * 50}>
								<Link
									href={`/tests/${t.slug}`}
									className="ink-sweep group -mx-4 grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 border-b border-line px-4 py-6 sm:grid-cols-[6rem_1fr_auto] sm:py-7"
								>
									<span className="mono hidden text-xs tracking-widest text-muted transition-colors duration-500 group-hover:text-brass sm:block">
										{t.code}
									</span>
									<span className="min-w-0">
										<span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
											<span className="display text-3xl transition-colors duration-500 group-hover:text-paper sm:text-4xl">
												{t.name}
											</span>
											<span className="eyebrow text-signal transition-colors duration-500 group-hover:text-brass">
												{CLASSIFICATION_LABELS[t.classification]}
											</span>
										</span>
										<span className="mt-1.5 block max-w-xl text-sm leading-relaxed text-muted transition-colors duration-500 group-hover:text-paper/70">
											{t.summary}
										</span>
									</span>
									<span className="text-right">
										<span className="mono block text-2xl transition-colors duration-500 group-hover:text-brass">
											${t.priceUsd}
										</span>
										<span className="mono mt-0.5 block text-[0.65rem] text-muted transition-colors duration-500 group-hover:text-paper/60">
											{t.durationMinutes} min · incl. 1 dept
										</span>
									</span>
								</Link>
							</Reveal>
						))}
					</div>
				</div>
			</section>

			{/* Agency honor ring — NTN's real agency seals as mounted medallions */}
			<section className="mx-3 sm:mx-6 lg:mx-10" aria-label="Participating agencies">
				<div className="panel-ink ink-tex text-paper">
				<div className="mx-auto max-w-6xl overflow-hidden px-4 py-20 sm:px-6 lg:py-24">
					<Reveal>
						<p className="eyebrow text-center text-brass">
							Trusted by departments nationwide
						</p>
						<h2 className="display mt-3 text-center text-[clamp(2.25rem,4.5vw,3.75rem)]">
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
				</div>
			</section>

			{/* Split CTA */}
			<section className="mx-3 mt-16 grid gap-5 sm:mx-6 md:grid-cols-2 lg:mx-10">
				<div className="card-static rounded-[2rem] border border-line p-10 lg:p-16">
					<Reveal>
						<p className="eyebrow text-signal">Candidates</p>
						<h2 className="display mt-4 text-4xl">Your career starts with one exam</h2>
						<p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
							Create an account, schedule your test, and track scores, applications, and
							department contacts from a single dashboard.
						</p>
						<Link
							href="/dashboard"
							className="eyebrow mt-8 inline-block rounded-full bg-ink px-7 py-3.5 text-paper shadow-[0_8px_20px_-8px_rgba(24,24,24,0.5)] transition-all hover:-translate-y-0.5 hover:bg-ink-2 hover:shadow-[0_14px_28px_-10px_rgba(24,24,24,0.55)]"
						>
							Create your account →
						</Link>
					</Reveal>
				</div>
				<div className="hero-photo photo-zoom rounded-[2rem] p-10 text-paper shadow-[0_40px_80px_-40px_rgba(24,24,24,0.55)] lg:p-16">
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img src="/brand/landing-04.jpg" alt="" className="hero-img" />
					<Reveal>
						<p className="eyebrow text-brass">Departments</p>
						<h2 className="display mt-4 text-4xl">Stronger lists, faster cycles</h2>
						<p className="mt-4 max-w-md text-sm leading-relaxed text-paper/85">
							Continuous testing delivers ranked, pre-screened candidate lists year-round —
							no exam logistics, no proctoring overhead, no waiting for the next cycle.
						</p>
						<Link href="/departments" className="btn-gold btn-pill eyebrow mt-8 px-7 py-3.5">
							Partner with NTN →
						</Link>
					</Reveal>
				</div>
			</section>

			</div>
		</>
	);
}
