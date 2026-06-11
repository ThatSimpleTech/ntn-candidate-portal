import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
	CLASSIFICATION_LABELS,
	departmentBySlug,
	JOBS,
	jobBySlug,
	SITE,
	testBySlug,
} from '@/lib/content';

interface Props {
	params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
	return JOBS.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const job = jobBySlug(slug);
	if (!job) return {};
	const dept = departmentBySlug(job.departmentSlug);
	return {
		title: `${job.title} — ${dept?.name}`,
		description: job.description,
		openGraph: {
			title: `${job.title} — ${dept?.name}`,
			description: job.description,
			url: `/jobs/${job.slug}`,
		},
		alternates: { canonical: `/jobs/${job.slug}` },
	};
}

export default async function JobPage({ params }: Props) {
	const { slug } = await params;
	const job = jobBySlug(slug);
	if (!job) notFound();
	const dept = departmentBySlug(job.departmentSlug);
	const test = testBySlug(job.testProductSlug);

	const jobJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'JobPosting',
		title: job.title,
		description: job.description,
		datePosted: '2026-06-01',
		validThrough: job.closingDate,
		employmentType: 'FULL_TIME',
		hiringOrganization: {
			'@type': 'Organization',
			name: dept?.name,
		},
		jobLocation: {
			'@type': 'Place',
			address: {
				'@type': 'PostalAddress',
				addressLocality: dept?.city,
				addressRegion: dept?.state,
				addressCountry: 'US',
			},
		},
		baseSalary: {
			'@type': 'MonetaryAmount',
			currency: 'USD',
			value: { '@type': 'QuantitativeValue', value: job.salary, unitText: 'YEAR' },
		},
		url: `${SITE.url}/jobs/${job.slug}`,
	};

	return (
		<article>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(jobJsonLd).replace(/</g, '\\u003c'),
				}}
			/>

			<header className="ink-tex border-b-2 border-brass/60 text-paper">
				<div>
					<div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
						<nav className="eyebrow text-muted-ink" aria-label="Breadcrumb">
							<Link href="/jobs" className="hover:text-brass">
								Find Jobs
							</Link>{' '}
							/ {CLASSIFICATION_LABELS[job.classification]}
						</nav>
						<h1 className="display mt-6 text-5xl sm:text-6xl">{job.title}</h1>
						<p className="mt-3 text-lg text-muted-ink">
							{dept?.name} — {job.location}
						</p>
						<div className="mono mt-8 flex flex-wrap gap-x-10 gap-y-3 text-sm">
							<span>
								<span className="text-brass">SALARY</span> {job.salary}
							</span>
							<span>
								<span className="text-brass">CLOSES</span> {job.closingDate}
							</span>
							<span>
								<span className="text-brass">EXAM</span> {test?.name} (${test?.priceUsd})
							</span>
						</div>
					</div>
				</div>
			</header>

			<div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_360px]">
				<div>
					<h2 className="display text-3xl">About this position</h2>
					<p className="mt-4 leading-relaxed text-muted">{job.description}</p>

					<h2 className="display mt-10 text-3xl">Minimum requirements</h2>
					<ul className="mt-4 space-y-2">
						{job.requirements.map((req) => (
							<li key={req} className="flex gap-3 text-sm leading-relaxed">
								<span className="mt-0.5 text-signal" aria-hidden>
									▸
								</span>
								<span>{req}</span>
							</li>
						))}
					</ul>

					{dept && (
						<>
							<h2 className="display mt-10 text-3xl">About {dept.name}</h2>
							<p className="mt-4 leading-relaxed text-muted">{dept.summary}</p>
						</>
					)}
				</div>

				<aside>
					<div className="card-static sticky top-24 border border-line">
						<div className="gold-rule h-1 w-full" aria-hidden />
						<div className="p-6">
							<p className="eyebrow text-signal">How to apply</p>
							<ol className="mt-4 space-y-4 text-sm leading-relaxed">
								<li className="flex gap-3">
									<span className="mono text-signal">1.</span>
									Create your candidate account.
								</li>
								<li className="flex gap-3">
									<span className="mono text-signal">2.</span>
									Schedule the {test?.name} exam — virtual or at a center near you.
								</li>
								<li className="flex gap-3">
									<span className="mono text-signal">3.</span>
									Select {dept?.name} at checkout. Scores send automatically.
								</li>
							</ol>
							<Link
								href="/dashboard"
								className="btn-gold eyebrow mt-6 block px-5 py-3 text-center"
							>
								Start application →
							</Link>
							{test && (
								<Link
									href={`/tests/${test.slug}`}
									className="eyebrow mt-3 block border border-ink px-5 py-3 text-center transition-colors hover:bg-paper-2"
								>
									About the {test.name}
								</Link>
							)}
						</div>
					</div>
				</aside>
			</div>
		</article>
	);
}
