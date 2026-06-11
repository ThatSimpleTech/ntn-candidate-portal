import Image from 'next/image';
import Link from 'next/link';
import { CLASSIFICATION_LABELS, TESTS } from '@/lib/content';

export function Footer() {
	return (
		<footer className="ink-tex overflow-hidden rounded-t-[2rem] text-paper">
			<div className="gold-rule h-0.5 w-full" aria-hidden />
			<div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
				<div className="md:col-span-2">
					<Image
						src="/brand/logo_white_letters.png"
						alt="National Testing Network"
						width={180}
						height={67}
						className="h-14 w-auto"
					/>
					<p className="eyebrow mt-4 text-brass">Building stronger public safety teams.</p>
					<p className="mt-4 max-w-md text-sm text-muted-ink">
						Pre-employment testing for fire, law enforcement, 911 dispatch,
						corrections, EMS, and transit — administered nationwide and virtually,
						developed by the industrial-organizational psychologists at Ergometrics.
					</p>
				</div>
				<div>
					<p className="eyebrow mb-4 text-brass">Exams</p>
					<ul className="space-y-2 text-sm">
						{TESTS.map((t) => (
							<li key={t.slug}>
								<Link href={`/tests/${t.slug}`} className="hover:text-brass">
									{t.name}{' '}
									<span className="mono text-xs text-muted-ink">
										/ {CLASSIFICATION_LABELS[t.classification]}
									</span>
								</Link>
							</li>
						))}
					</ul>
				</div>
				<div>
					<p className="eyebrow mb-4 text-brass">Candidates</p>
					<ul className="space-y-2 text-sm">
						<li>
							<Link href="/jobs" className="hover:text-brass">
								Find Jobs
							</Link>
						</li>
						<li>
							<Link href="/pricing" className="hover:text-brass">
								Pricing
							</Link>
						</li>
						<li>
							<Link href="/faq" className="hover:text-brass">
								FAQ
							</Link>
						</li>
						<li>
							<Link href="/dashboard" className="hover:text-brass">
								Candidate Dashboard
							</Link>
						</li>
						<li>
							<Link href="/departments" className="hover:text-brass">
								For Departments
							</Link>
						</li>
					</ul>
				</div>
			</div>
			<div className="border-t border-line-ink">
				<div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-muted-ink sm:flex-row sm:items-center sm:justify-between sm:px-6">
					<p>
						Modernization concept by That Simple Tech. Demo content — not affiliated
						with or endorsed by National Testing Network or Ergometrics.
					</p>
					<p className="mono">EST. 2006 / LYNNWOOD, WA</p>
				</div>
			</div>
		</footer>
	);
}
