'use client';

import dynamic from 'next/dynamic';
import { useCallback, useState } from 'react';
import {
	type AppRecord,
	DashboardView,
	type ScoreSummary,
} from '@/components/DashboardView';
import { hasAuthBackend } from '@/lib/amplify-client';
import { JOBS, departmentBySlug } from '@/lib/content';

/**
 * Live dashboard (Cognito + AppSync) is split into its own chunk so the
 * Amplify libraries never load for visitors who hit demo mode.
 */
const LiveDashboard = dynamic(
	() => import('@/components/LiveDashboard').then((m) => m.LiveDashboard),
	{
		ssr: false,
		loading: () => (
			<p className="mono p-16 text-center text-sm text-muted">Loading secure session...</p>
		),
	},
);

const DEMO_APPLICATIONS: AppRecord[] = [
	{
		id: 'demo-app-001',
		jobTitle: 'Firefighter / EMT',
		departmentName: 'Cascade Fire & Rescue — Everett, WA',
		status: 'SCORES_RELEASED',
	},
	{
		id: 'demo-app-002',
		jobTitle: '911 Telecommunicator',
		departmentName: 'Tri-County Emergency Communications — Vancouver, WA',
		status: 'TEST_SCHEDULED',
	},
];

/** Mirrors amplify/functions/score-summary/handler.ts for demo mode. */
function demoScoreSummary(applicationId: string): ScoreSummary {
	const seed = [...applicationId].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
	const bandFor = (pct: number) =>
		pct >= 90 ? 'EXCEPTIONAL' : pct >= 75 ? 'COMPETITIVE' : pct >= 60 ? 'PASSING' : 'BELOW_STANDARD';
	const sections = [
		{ section: 'Human Relations (Video)', raw: 55 + (seed % 40), max: 100 },
		{ section: 'Reading Comprehension', raw: 60 + ((seed >> 2) % 35), max: 100 },
		{ section: 'Mechanical Reasoning', raw: 50 + ((seed >> 4) % 45), max: 100 },
	];
	const overallPct = Math.round(
		sections.reduce((acc, s) => acc + (s.raw / s.max) * 100, 0) / sections.length,
	);
	const band = bandFor(overallPct);
	return {
		sections: sections.map((s) => ({ ...s, band: bandFor((s.raw / s.max) * 100) })),
		overall: { percentile: overallPct, band },
		nextSteps:
			band === 'COMPETITIVE'
				? 'Your scores are competitive. Consider transferring scores to additional departments to maximize reach.'
				: 'Scores computed by the score-summary Lambda in deployed builds.',
	};
}

function DemoDashboard() {
	const [applications, setApplications] = useState(DEMO_APPLICATIONS);

	const createApplication = useCallback(async () => {
		const job = JOBS[Math.floor(Math.random() * JOBS.length)];
		const dept = departmentBySlug(job.departmentSlug);
		setApplications((apps) => [
			...apps,
			{
				id: `demo-app-${String(apps.length + 1).padStart(3, '0')}-${job.slug}`,
				jobTitle: job.title,
				departmentName: `${dept?.name} — ${job.location}`,
				status: 'STARTED',
			},
		]);
	}, []);

	return (
		<DashboardView
			candidateName="Demo Candidate"
			applications={applications}
			onCreateApplication={createApplication}
			onFetchScores={async (id) => demoScoreSummary(id)}
			mode="demo"
		/>
	);
}

export default function DashboardPage() {
	return hasAuthBackend ? <LiveDashboard /> : <DemoDashboard />;
}
