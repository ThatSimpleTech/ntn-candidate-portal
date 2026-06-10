import type { Metadata } from 'next';
import { Suspense } from 'react';
import { JobBoard } from '@/components/JobBoard';
import { DEPARTMENTS, JOBS } from '@/lib/content';

export const metadata: Metadata = {
	title: 'Find Public Safety Jobs',
	description:
		'Open firefighter, police, 911 dispatch, corrections, EMS, and transit recruitments from departments hiring nationwide. Test once, apply to all of them.',
	openGraph: {
		title: 'Find Public Safety Jobs | NTN',
		description:
			'Open recruitments from fire, police, 911, corrections, and EMS departments nationwide.',
		url: '/jobs',
	},
	alternates: { canonical: '/jobs' },
};

export default function JobsPage() {
	return (
		<div className="bg-paper">
			<div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
				<p className="eyebrow text-signal">Open recruitments</p>
				<h1 className="display mt-4 text-5xl sm:text-6xl">Find your department</h1>
				<p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
					Every posting below accepts NTN scores. Take the listed exam once and your
					results go to each department you apply to — add departments any time for $12.
				</p>
				<div className="mt-10">
					<Suspense>
						<JobBoard jobs={JOBS} departments={DEPARTMENTS} />
					</Suspense>
				</div>
			</div>
		</div>
	);
}
