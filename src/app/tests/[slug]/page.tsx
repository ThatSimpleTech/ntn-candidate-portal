import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
	CLASSIFICATION_LABELS,
	JOBS,
	SITE,
	TESTS,
	departmentBySlug,
	testBySlug,
} from '@/lib/content';

interface Props {
	params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
	return TESTS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const test = testBySlug(slug);
	if (!test) return {};
	return {
		title: `${test.name} Exam — $${test.priceUsd}`,
		description: test.summary,
		openGraph: {
			title: `${test.name} Exam | NTN`,
			description: test.summary,
			url: `/tests/${test.slug}`,
		},
		alternates: { canonical: `/tests/${test.slug}` },
	};
}

export default async function TestPage({ params }: Props) {
	const { slug } = await params;
	const test = testBySlug(slug);
	if (!test) notFound();

	const relatedJobs = JOBS.filter((j) => j.testProductSlug === test.slug);

	const serviceJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Service',
		name: `${test.name} Exam`,
		description: test.summary,
		provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
		offers: {
			'@type': 'Offer',
			price: test.priceUsd,
			priceCurrency: 'USD',
		},
		url: `${SITE.url}/tests/${test.slug}`,
	};

	return (
		<article>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(serviceJsonLd).replace(/</g, '\\u003c'),
				}}
			/>

			<header className="ink-tex -mt-19 rounded-b-[2rem] text-paper">
				<div>
					<div className="mx-auto max-w-6xl px-4 pb-16 pt-36 sm:px-6">
						<nav className="eyebrow text-muted-ink" aria-label="Breadcrumb">
							<Link href="/tests" className="hover:text-brass">
								Exams
							</Link>{' '}
							/ {CLASSIFICATION_LABELS[test.classification]}
						</nav>
						<div className="mt-6 flex flex-wrap items-end justify-between gap-6">
							<div>
								<p className="mono text-sm tracking-widest text-brass">{test.code}</p>
								<h1 className="display mt-2 text-6xl sm:text-7xl">{test.name}</h1>
								<p className="mt-4 max-w-xl text-muted-ink">{test.audience}</p>
							</div>
							<div className="glass-ink p-5 text-right">
								<p className="display gold-text text-5xl">${test.priceUsd}</p>
								<p className="mono mt-1 text-xs text-muted-ink">
									includes one department
								</p>
								<p className="mono text-xs text-muted-ink">+$12 each additional</p>
							</div>
						</div>
					</div>
				</div>
			</header>

			<div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
				<p className="max-w-3xl text-lg leading-relaxed">{test.summary}</p>

				<div className="mono mt-8 flex flex-wrap gap-x-10 gap-y-2 text-sm text-muted">
					<span>DURATION: {test.durationMinutes} minutes</span>
					<span>FORMAT: {test.virtual ? 'Testing center or proctored virtual' : 'In person at licensed facilities'}</span>
					<span>SECTIONS: {test.sections.length}</span>
				</div>

				<h2 className="display mt-14 text-4xl">What the exam covers</h2>
				<div className="mt-8 grid gap-4 md:grid-cols-2">
					{test.sections.map((s, i) => (
						<div key={s.name} className="card-static border border-line p-6">
							<p className="mono text-xs text-signal">
								SECTION {String(i + 1).padStart(2, '0')}
							</p>
							<h3 className="display mt-2 text-2xl">{s.name}</h3>
							<p className="mt-2 text-sm leading-relaxed text-muted">{s.description}</p>
						</div>
					))}
				</div>

				{relatedJobs.length > 0 && (
					<>
						<h2 className="display mt-14 text-4xl">
							Departments accepting {test.name} scores
						</h2>
						<ul className="mt-8 space-y-3">
							{relatedJobs.map((job) => {
								const dept = departmentBySlug(job.departmentSlug);
								return (
									<li key={job.slug}>
										<Link
											href={`/jobs/${job.slug}`}
											className="card-lift flex flex-wrap items-center justify-between gap-4 border border-line bg-paper px-5 py-4"
										>
											<span>
												<span className="display text-2xl">{job.title}</span>
												<span className="ml-3 text-sm text-muted">
													{dept?.name} — {job.location}
												</span>
											</span>
											<span className="eyebrow text-signal">View →</span>
										</Link>
									</li>
								);
							})}
						</ul>
					</>
				)}

				<div className="paper-tex mt-14 border border-line p-8 text-center shadow-[0_20px_40px_-24px_rgba(24,24,24,0.3)]">
					<h2 className="display text-3xl">Ready to schedule?</h2>
					<p className="mx-auto mt-3 max-w-md text-sm text-muted">
						Create your account, pick a date, and choose your departments. Most
						candidates are scheduled in under ten minutes.
					</p>
					<Link
						href="/dashboard"
						className="btn-gold btn-pill eyebrow mt-6 inline-block px-8 py-4"
					>
						Schedule the {test.name} →
					</Link>
				</div>
			</div>
		</article>
	);
}
