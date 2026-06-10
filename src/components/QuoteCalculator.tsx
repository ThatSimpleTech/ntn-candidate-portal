'use client';

import { useEffect, useState } from 'react';
import { pricingQuoteUrl } from '@/lib/amplify-client';
import { TESTS } from '@/lib/content';

const ADDITIONAL_DEPARTMENT_FEE = 12;

interface Quote {
	lineItems: { label: string; amount: number }[];
	total: number;
	source: 'live' | 'local';
}

/** Mirrors amplify/python/pricing_quote/handler.py for offline/demo use. */
function localQuote(testSlug: string, departments: number): Quote {
	const base = TESTS.find((t) => t.slug === testSlug)?.priceUsd ?? 0;
	const additional = (departments - 1) * ADDITIONAL_DEPARTMENT_FEE;
	return {
		lineItems: [
			{ label: 'Test fee (includes one department)', amount: base },
			{
				label: `Additional departments (${departments - 1} x $${ADDITIONAL_DEPARTMENT_FEE})`,
				amount: additional,
			},
		],
		total: base + additional,
		source: 'local',
	};
}

export function QuoteCalculator() {
	const [testSlug, setTestSlug] = useState(TESTS[0].slug);
	const [departments, setDepartments] = useState(3);
	const [live, setLive] = useState<{ key: string; quote: Quote } | null>(null);

	// Local estimate renders immediately; the live API result replaces it
	// when (and only when) it matches the current inputs.
	const inputKey = `${testSlug}:${departments}`;
	const quote = live?.key === inputKey ? live.quote : localQuote(testSlug, departments);

	useEffect(() => {
		if (!pricingQuoteUrl) return;
		let cancelled = false;
		(async () => {
			try {
				const res = await fetch(
					`${pricingQuoteUrl}?test=${encodeURIComponent(testSlug)}&departments=${departments}`,
				);
				if (!res.ok) throw new Error(`quote api ${res.status}`);
				const data = await res.json();
				if (!cancelled) {
					setLive({
						key: inputKey,
						quote: { lineItems: data.lineItems, total: data.total, source: 'live' },
					});
				}
			} catch {
				// keep the local estimate
			}
		})();
		return () => {
			cancelled = true;
		};
	}, [testSlug, departments, inputKey]);

	return (
		<div className="border border-line bg-paper">
			<div className="flex items-center justify-between border-b-2 border-ink bg-ink px-5 py-3 text-paper">
				<span className="eyebrow">Cost estimator</span>
				<span
					className={`mono text-xs ${quote.source === 'live' ? 'text-brass' : 'text-muted-ink'}`}
					title={
						quote.source === 'live'
							? 'Quote served by the live pricing API (Python Lambda)'
							: 'Estimated locally'
					}
				>
					{quote.source === 'live' ? '● LIVE API' : '○ ESTIMATE'}
				</span>
			</div>
			<div className="grid gap-6 p-6 sm:grid-cols-2">
				<div>
					<label className="eyebrow block" htmlFor="quote-test">
						Exam
					</label>
					<select
						id="quote-test"
						value={testSlug}
						onChange={(e) => setTestSlug(e.target.value)}
						className="mono mt-2 w-full border border-line bg-paper px-3 py-3 text-sm outline-none focus:border-signal"
					>
						{TESTS.map((t) => (
							<option key={t.slug} value={t.slug}>
								{t.name} — ${t.priceUsd}
							</option>
						))}
					</select>

					<label className="eyebrow mt-6 block" htmlFor="quote-depts">
						Departments — {departments}
					</label>
					<input
						id="quote-depts"
						type="range"
						min={1}
						max={15}
						value={departments}
						onChange={(e) => setDepartments(Number(e.target.value))}
						className="mt-3 w-full accent-(--brass)"
					/>
					<p className="mt-2 text-xs text-muted">
						Apply to {departments} department{departments === 1 ? '' : 's'} with one
						sitting of the exam.
					</p>
				</div>
				<div className="border-l-0 border-line sm:border-l-2 sm:pl-6">
					<dl className="space-y-3 text-sm">
						{quote.lineItems.map((li) => (
							<div key={li.label} className="flex justify-between gap-4">
								<dt className="text-muted">{li.label}</dt>
								<dd className="mono">${li.amount.toFixed(2)}</dd>
							</div>
						))}
					</dl>
					<div className="mt-5 flex items-baseline justify-between border-t-2 border-ink pt-4">
						<span className="eyebrow">Total</span>
						<span className="mono text-3xl">${quote.total.toFixed(2)}</span>
					</div>
					<p className="mt-3 text-xs text-muted">
						Department-specific fees (if any) are itemized at checkout before payment.
					</p>
				</div>
			</div>
		</div>
	);
}
