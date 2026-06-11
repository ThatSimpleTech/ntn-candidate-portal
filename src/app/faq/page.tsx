import type { Metadata } from 'next';
import { FAQS } from '@/lib/content';

export const metadata: Metadata = {
	title: 'Candidate FAQ',
	description:
		'How NTN testing works: scheduling, virtual exams, pricing, score transfers, retakes, and what happens after you test.',
	openGraph: {
		title: 'Candidate FAQ | NTN',
		description: 'How NTN testing works, from scheduling to scores.',
		url: '/faq',
	},
	alternates: { canonical: '/faq' },
};

const faqJsonLd = {
	'@context': 'https://schema.org',
	'@type': 'FAQPage',
	mainEntity: FAQS.map((f) => ({
		'@type': 'Question',
		name: f.question,
		acceptedAnswer: { '@type': 'Answer', text: f.answer },
	})),
};

export default function FaqPage() {
	return (
		<div className="bg-paper">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c'),
				}}
			/>
			<div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
				<p className="eyebrow text-signal">Candidate FAQ</p>
				<h1 className="display mt-4 text-5xl sm:text-6xl">Straight answers</h1>
				<span className="heading-rule in mt-5" aria-hidden />
				<div className="mt-12 space-y-4">
					{FAQS.map((f, i) => (
						<details
							key={f.question}
							className="faq-card card-static border border-line"
							open={i === 0}
						>
							<summary className="flex cursor-pointer list-none items-center gap-4 p-5">
								<span className="display gold-emboss w-8 flex-none text-2xl">
									{String(i + 1).padStart(2, '0')}
								</span>
								<span className="display flex-1 text-2xl">{f.question}</span>
								<span className="faq-toggle" aria-hidden>
									<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-3.5 w-3.5">
										<path d="M8 2v12M2 8h12" strokeLinecap="round" />
									</svg>
								</span>
							</summary>
							<p className="border-t border-line px-5 pb-5 pt-4 pl-17 text-sm leading-relaxed text-muted">
								{f.answer}
							</p>
						</details>
					))}
				</div>
			</div>
		</div>
	);
}
