import type { Metadata } from 'next';
import Link from 'next/link';
import { DEPARTMENTS } from '@/lib/content';

export const metadata: Metadata = {
	title: 'For Departments & Agencies',
	description:
		'Continuous candidate testing for fire, police, 911, corrections, and EMS agencies. Ranked lists, validated exams, zero proctoring overhead.',
	openGraph: {
		title: 'For Departments & Agencies | NTN',
		description:
			'Continuous candidate testing and ranked lists for public safety agencies.',
		url: '/departments',
	},
	alternates: { canonical: '/departments' },
};

const VALUE_PROPS = [
	{
		title: 'Continuous candidate lists',
		body: 'Candidates test year-round at 100+ locations and virtually. Your ranked list refreshes continuously instead of waiting for an annual exam cycle.',
	},
	{
		title: 'Legally defensible exams',
		body: 'Every exam is developed and validated by Ergometrics industrial-organizational psychologists against national job-analysis benchmarks.',
	},
	{
		title: 'Zero exam logistics',
		body: 'No proctors to hire, no rooms to book, no answer sheets to score. We administer, score, and deliver — you interview and hire.',
	},
	{
		title: 'Wider, more diverse reach',
		body: 'A national candidate pool and virtual testing remove geography from your recruitment funnel. Reach candidates your posting alone never would.',
	},
];

export default function DepartmentsPage() {
	return (
		<div>
			<section className="hero-photo hero-round -mt-19 text-paper">
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img src="/brand/landing-02.jpg" alt="" className="hero-img kenburns" />
				<div className="hero-drift">
					<div className="mx-auto max-w-6xl px-4 pb-20 pt-40 sm:px-6">
						<p className="eyebrow text-brass">For departments & agencies</p>
						<h1 className="display mt-6 max-w-3xl text-[clamp(3rem,6vw,5.5rem)]">
							Your next academy class is already testing
						</h1>
						<p className="mt-6 max-w-xl text-muted-ink">
							Thousands of agencies use NTN to keep ranked, pre-screened candidate
							lists flowing year-round — without running a single exam themselves.
						</p>
						<a
							href="mailto:agencies@nationaltestingnetwork.com"
							className="btn-gold btn-pill eyebrow mt-10 px-7 py-4"
						>
							Talk to the agency team →
						</a>
					</div>
				</div>
			</section>

			<section className="bg-paper">
				<div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
					<div className="grid divide-y divide-line md:grid-cols-2 md:gap-x-16 md:divide-y-0">
						{VALUE_PROPS.map((v, i) => (
							<div
								key={v.title}
								className={`py-10 ${i < 2 ? 'md:border-b md:border-line' : ''}`}
							>
								<p className="display num-ghost text-[clamp(4.5rem,8vw,7rem)] leading-none">
									{String(i + 1).padStart(2, '0')}
								</p>
								<h2 className="display -mt-3 text-3xl">{v.title}</h2>
								<p className="mt-4 max-w-md text-sm leading-relaxed text-muted">{v.body}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="paper-tex border-b-2 border-ink">
				<div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
					<p className="eyebrow text-signal">Currently recruiting through NTN</p>
					<h2 className="display mt-4 text-4xl">Departments on the network</h2>
					<span className="heading-rule in mt-4" aria-hidden />
					<div className="mt-10 grid border-t border-line sm:grid-cols-2">
						{DEPARTMENTS.map((d) => (
							<div
								key={d.slug}
								className="flex items-baseline justify-between gap-4 border-b border-line py-4 sm:odd:pr-10 sm:even:pl-10"
							>
								<p className="display text-xl leading-tight">{d.name}</p>
								<p className="mono whitespace-nowrap text-xs text-muted">
									{d.city}, {d.state}
								</p>
							</div>
						))}
					</div>
					<p className="mt-8 text-sm text-muted">
						Hiring? Your recruitment could be in front of the national candidate pool
						this week.{' '}
						<Link href="/jobs" className="text-signal underline">
							See how candidates find you →
						</Link>
					</p>
				</div>
			</section>
		</div>
	);
}
