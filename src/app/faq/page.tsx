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
				<div className="mt-12 space-y-4">
					{FAQS.map((f, i) => (
						<details
							key={f.question}
							className="group border border-line bg-paper open:shadow-[6px_6px_0_0_var(--ink)]"
							open={i === 0}
						>
							<summary className="flex cursor-pointer list-none items-baseline gap-4 p-5">
								<span className="mono text-sm text-signal">
									{String(i + 1).padStart(2, '0')}
								</span>
								<span className="display flex-1 text-2xl">{f.question}</span>
								<span
									className="mono text-xl text-muted transition-transform group-open:rotate-45"
									aria-hidden
								>
									+
								</span>
							</summary>
							<p className="border-t border-line px-5 pb-5 pt-4 pl-13 text-sm leading-relaxed text-muted sm:pl-14">
								{f.answer}
							</p>
						</details>
					))}
				</div>
			</div>
		</div>
	);
}
