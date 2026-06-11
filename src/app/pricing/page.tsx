import type { Metadata } from 'next';
import Link from 'next/link';
import { QuoteCalculator } from '@/components/QuoteCalculator';
import { CLASSIFICATION_LABELS, TESTS } from '@/lib/content';

export const metadata: Metadata = {
	title: 'Test Pricing',
	description:
		'Transparent pricing for every NTN exam: $41-$125 per test including one department, $12 for each additional department. Fee waivers available.',
	openGraph: {
		title: 'Test Pricing | NTN',
		description:
			'Transparent pricing for every NTN exam, with a live cost estimator.',
		url: '/pricing',
	},
	alternates: { canonical: '/pricing' },
};

export default function PricingPage() {
	return (
		<div className="bg-paper">
			<div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
				<p className="eyebrow text-signal">Pricing</p>
				<h1 className="display mt-4 text-5xl sm:text-6xl">
					No surprises at checkout
				</h1>
				<span className="heading-rule in mt-5" aria-hidden />
				<p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
					Every exam fee includes score delivery to one department. Add as many more as
					you want — at testing time or months later — for a flat $12 each. Fee waivers
					are available for candidates with financial need.
				</p>

				<div className="card-static mt-12 overflow-x-auto border border-line">
					<table className="w-full min-w-[640px] border-collapse text-left text-sm">
						<thead>
							<tr className="ink-tex text-paper">
								<th className="eyebrow px-5 py-4">Exam</th>
								<th className="eyebrow px-5 py-4">Track</th>
								<th className="eyebrow px-5 py-4">Duration</th>
								<th className="eyebrow px-5 py-4">Format</th>
								<th className="eyebrow px-5 py-4 text-right">Fee</th>
							</tr>
						</thead>
						<tbody>
							{TESTS.map((t, i) => (
								<tr key={t.slug} className={i % 2 ? 'bg-paper-2' : ''}>
									<td className="px-5 py-4">
										<Link
											href={`/tests/${t.slug}`}
											className="display text-xl hover:text-signal"
										>
											{t.name}
										</Link>
										<span className="mono ml-2 text-xs text-muted">{t.code}</span>
									</td>
									<td className="px-5 py-4">{CLASSIFICATION_LABELS[t.classification]}</td>
									<td className="mono px-5 py-4">{t.durationMinutes} min</td>
									<td className="px-5 py-4">
										{t.virtual ? 'Center or virtual' : 'In person'}
									</td>
									<td className="mono px-5 py-4 text-right text-lg">${t.priceUsd}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<div className="mt-12 grid gap-8 lg:grid-cols-[1fr_400px]">
					<QuoteCalculator />
					<div className="divide-y divide-line border-t border-line">
						<div className="py-6">
							<p className="eyebrow text-signal">Score transfers</p>
							<p className="display gold-emboss mt-3 text-5xl">$12</p>
							<p className="mt-2 text-sm leading-relaxed text-muted">
								Already tested? Send your existing scores to any additional
								participating department — no retest, valid for 12 months.
							</p>
						</div>
						<div className="py-6">
							<p className="eyebrow text-signal">Fee waivers</p>
							<p className="mt-3 text-sm leading-relaxed text-muted">
								Financial need shouldn&apos;t end a public safety career before it
								starts. Submit the waiver form before scheduling and our team will
								review it within two business days.
							</p>
						</div>
						<div className="py-6">
							<p className="eyebrow text-signal">Retakes</p>
							<p className="mt-3 text-sm leading-relaxed text-muted">
								Retest after a 90-day waiting period. Your most recent score is the
								one departments see.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
