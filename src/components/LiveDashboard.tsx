'use client';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Schema } from '../../amplify/data/resource';
import {
	type AppRecord,
	DashboardView,
	type ScoreSummary,
} from '@/components/DashboardView';
import { amplifyOutputs } from '@/lib/amplify-client';
import { JOBS, departmentBySlug } from '@/lib/content';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
Amplify.configure(amplifyOutputs as any);

function AuthedDashboard({
	username,
	signOut,
}: {
	username: string;
	signOut: () => void;
}) {
	const client = useMemo(() => generateClient<Schema>(), []);
	const [applications, setApplications] = useState<AppRecord[]>([]);

	const refresh = useCallback(async () => {
		const { data } = await client.models.Application.list();
		return data.map((a) => ({
			id: a.id,
			jobTitle: a.jobTitle,
			departmentName: a.departmentName,
			status: a.status,
			scheduledFor: a.scheduledFor,
		}));
	}, [client]);

	useEffect(() => {
		let cancelled = false;
		refresh().then((apps) => {
			if (!cancelled) setApplications(apps);
		});
		return () => {
			cancelled = true;
		};
	}, [refresh]);

	const createApplication = useCallback(async () => {
		const job = JOBS[Math.floor(Math.random() * JOBS.length)];
		const dept = departmentBySlug(job.departmentSlug);
		await client.models.Application.create({
			jobPostingId: job.slug,
			jobTitle: job.title,
			departmentName: `${dept?.name} — ${job.location}`,
			status: 'SCORES_RELEASED',
			agencySlug: job.departmentSlug,
		});
		setApplications(await refresh());
	}, [client, refresh]);

	const fetchScores = useCallback(
		async (applicationId: string): Promise<ScoreSummary> => {
			const { data, errors } = await client.queries.getScoreSummary({ applicationId });
			if (errors?.length) throw new Error(errors[0].message);
			return (typeof data === 'string' ? JSON.parse(data) : data) as ScoreSummary;
		},
		[client],
	);

	return (
		<DashboardView
			candidateName={username}
			applications={applications}
			onCreateApplication={createApplication}
			onFetchScores={fetchScores}
			mode="live"
			onSignOut={signOut}
		/>
	);
}

export function LiveDashboard() {
	return (
		<div className="auth-shell min-h-[60vh]">
			<div className="auth-intro mx-auto mb-10 max-w-xl text-center text-paper">
				<p className="eyebrow text-brass">Candidate portal</p>
				<h1 className="display mt-4 text-5xl">Report for duty</h1>
				<p className="mt-4 text-sm leading-relaxed text-paper/70">
					Sign in to schedule exams, track scores, and manage the departments
					receiving them — all from one dashboard.
				</p>
			</div>
			<Authenticator signUpAttributes={['given_name', 'family_name']}>
				{({ signOut, user }) => (
					<AuthedDashboard
						username={user?.signInDetails?.loginId ?? 'Candidate'}
						signOut={() => signOut?.()}
					/>
				)}
			</Authenticator>
		</div>
	);
}
