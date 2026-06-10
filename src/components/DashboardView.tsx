'use client';

import { useState } from 'react';

export interface AppRecord {
	id: string;
	jobTitle: string;
	departmentName: string;
	status: string;
	scheduledFor?: string | null;
}

export interface ScoreSummary {
	sections: { section: string; raw: number; max: number; band: string }[];
	overall: { percentile: number; band: string };
	nextSteps: string;
}

interface Props {
	candidateName: string;
	applications: AppRecord[];
	onCreateApplication?: () => Promise<void>;
	onFetchScores: (applicationId: string) => Promise<ScoreSummary>;
	mode: 'live' | 'demo';
	onSignOut?: () => void;
}

const STATUS_LABELS: Record<string, string> = {
	STARTED: 'Application started',
	TEST_SCHEDULED: 'Test scheduled',
	TEST_COMPLETE: 'Test complete — scoring',
	SCORES_RELEASED: 'Scores released',
	FORWARDED_TO_AGENCY: 'Forwarded to department',
};

const BAND_COLORS: Record<string, string> = {
	EXCEPTIONAL: 'text-brass',
	COMPETITIVE: 'text-signal',
	PASSING: 'text-ink',
	BELOW_STANDARD: 'text-muted',
};

export function DashboardView({
	candidateName,
	applications,
	onCreateApplication,
	onFetchScores,
	mode,
	onSignOut,
}: Props) {
	const [scores, setScores] = useState<Record<string, ScoreSummary>>({});
	const [busy, setBusy] = useState<string | null>(null);

	const loadScores = async (id: string) => {
		setBusy(id);
		try {
			const summary = await onFetchScores(id);
			setScores((s) => ({ ...s, [id]: summary }));
		} finally {
			setBusy(null);
		}
	};

	return (
		<div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
			<div className="flex flex-wrap items-end justify-between gap-4">
				<div>
					<p className="eyebrow text-signal">Candidate dashboard</p>
					<h1 className="display mt-3 text-5xl">{candidateName}</h1>
				</div>
				<div className="flex items-center gap-3">
					<span
						className={`mono text-xs ${mode === 'live' ? 'text-brass' : 'text-muted'}`}
					>
						{mode === 'live' ? '● LIVE — AppSync + Cognito' : '○ DEMO MODE'}
					</span>
					{onSignOut && (
						<button
							type="button"
							onClick={onSignOut}
							className="eyebrow border border-ink px-4 py-2 transition-colors hover:bg-ink hover:text-paper"
						>
							Sign out
						</button>
					)}
				</div>
			</div>

			{mode === 'demo' && (
				<p className="mt-6 border border-dashed border-signal bg-paper-2 p-4 text-sm text-muted">
					The backend isn&apos;t connected in this build, so you&apos;re seeing sample
					data. Deployed builds gate this page behind Cognito sign-in and read your
					applications from AppSync.
				</p>
			)}

			<div className="mt-10 flex flex-wrap items-center justify-between gap-4">
				<h2 className="display text-3xl">Your applications</h2>
				{onCreateApplication && (
					<button
						type="button"
						onClick={() => onCreateApplication()}
						className="btn-gold eyebrow px-5 py-3"
					>
						+ File demo application
					</button>
				)}
			</div>

			<div className="mt-6 space-y-4">
				{applications.length === 0 && (
					<p className="border border-dashed border-line p-10 text-center text-sm text-muted">
						No applications yet. File one to see the scoring pipeline in action.
					</p>
				)}
				{applications.map((app) => {
					const summary = scores[app.id];
					return (
						<div key={app.id} className="border border-line bg-paper">
							<div className="flex flex-wrap items-center justify-between gap-4 border-b border-line px-5 py-4">
								<div>
									<p className="display text-2xl">{app.jobTitle}</p>
									<p className="mono mt-1 text-xs text-muted">{app.departmentName}</p>
								</div>
								<div className="flex items-center gap-4">
									<span className="eyebrow bg-ink px-3 py-1.5 text-paper">
										{STATUS_LABELS[app.status] ?? app.status}
									</span>
									{!summary && (
										<button
											type="button"
											onClick={() => loadScores(app.id)}
											disabled={busy === app.id}
											className="eyebrow border border-ink px-4 py-1.5 transition-colors hover:bg-ink hover:text-paper disabled:opacity-50"
										>
											{busy === app.id ? 'Scoring...' : 'View scores'}
										</button>
									)}
								</div>
							</div>
							{summary && (
								<div className="grid gap-6 p-5 md:grid-cols-[1fr_280px]">
									<div className="space-y-3">
										{summary.sections.map((s) => (
											<div key={s.section}>
												<div className="flex justify-between text-sm">
													<span>{s.section}</span>
													<span className={`mono text-xs ${BAND_COLORS[s.band] ?? ''}`}>
														{s.raw}/{s.max} — {s.band}
													</span>
												</div>
												<div className="mt-1 h-2 w-full border border-ink bg-paper-2">
													<div
														className="gold-rule h-full"
														style={{ width: `${(s.raw / s.max) * 100}%` }}
													/>
												</div>
											</div>
										))}
									</div>
									<div className="border border-line p-4">
										<p className="eyebrow text-signal">Overall</p>
										<p className="display mt-2 text-5xl">
											{summary.overall.percentile}
											<span className="text-xl text-muted">/100</span>
										</p>
										<p
											className={`mono mt-1 text-sm ${BAND_COLORS[summary.overall.band] ?? ''}`}
										>
											{summary.overall.band}
										</p>
										<p className="mt-3 text-xs leading-relaxed text-muted">
											{summary.nextSteps}
										</p>
									</div>
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}
