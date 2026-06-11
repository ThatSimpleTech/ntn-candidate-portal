'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import {
	CLASSIFICATION_LABELS,
	type Classification,
	type Department,
	type JobPosting,
} from '@/lib/content';

interface Props {
	jobs: JobPosting[];
	departments: Department[];
}

const ALL_TRACKS = Object.keys(CLASSIFICATION_LABELS) as Classification[];

export function JobBoard({ jobs, departments }: Props) {
	const searchParams = useSearchParams();
	const initialTrack = searchParams.get('track');
	const [track, setTrack] = useState<Classification | 'ALL'>(
		ALL_TRACKS.includes(initialTrack as Classification)
			? (initialTrack as Classification)
			: 'ALL',
	);
	const [query, setQuery] = useState('');

	const deptBySlug = useMemo(
		() => new Map(departments.map((d) => [d.slug, d])),
		[departments],
	);

	const visible = jobs.filter((job) => {
		if (track !== 'ALL' && job.classification !== track) return false;
		if (!query) return true;
		const haystack =
			`${job.title} ${job.location} ${deptBySlug.get(job.departmentSlug)?.name ?? ''}`.toLowerCase();
		return haystack.includes(query.toLowerCase());
	});

	return (
		<div>
			<div className="card-static flex flex-col gap-4 border border-line p-4 sm:flex-row sm:items-center">
				<label className="flex-1">
					<span className="sr-only">Search jobs</span>
					<input
						type="search"
						placeholder="Search title, department, or city..."
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						className="mono w-full rounded-full border border-line bg-paper px-5 py-3 text-sm outline-none transition-colors focus:border-signal"
					/>
				</label>
				<div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by track">
					<button
						type="button"
						onClick={() => setTrack('ALL')}
						className={`eyebrow rounded-full px-4 py-2 transition-all ${
							track === 'ALL'
								? 'bg-ink text-paper shadow-[inset_0_0_0_1px_var(--brass)]'
								: 'border border-line hover:border-brass hover:text-signal'
						}`}
					>
						All
					</button>
					{ALL_TRACKS.map((c) => (
						<button
							key={c}
							type="button"
							onClick={() => setTrack(c)}
							className={`eyebrow rounded-full px-4 py-2 transition-all ${
								track === c
									? 'bg-ink text-paper shadow-[inset_0_0_0_1px_var(--brass)]'
									: 'border border-line hover:border-brass hover:text-signal'
							}`}
						>
							{CLASSIFICATION_LABELS[c]}
						</button>
					))}
				</div>
			</div>

			<p className="mono mt-6 text-xs text-muted">
				{visible.length} open recruitment{visible.length === 1 ? '' : 's'}
			</p>

			<ul className="mt-4 space-y-3">
				{visible.map((job) => {
					const dept = deptBySlug.get(job.departmentSlug);
					return (
						<li key={job.slug}>
							<Link
								href={`/jobs/${job.slug}`}
								className="card-lift grid gap-4 border border-line bg-paper p-5 sm:grid-cols-[1fr_auto] sm:items-center"
							>
								<div>
									<div className="flex flex-wrap items-center gap-3">
										<span className="eyebrow rounded-full bg-ink px-3 py-1 text-paper">
											{CLASSIFICATION_LABELS[job.classification]}
										</span>
										<span className="mono text-xs text-muted">
											Closes {job.closingDate}
										</span>
									</div>
									<h2 className="display mt-3 text-3xl">{job.title}</h2>
									<p className="mt-1 text-sm text-muted">
										{dept?.name} — {job.location}
									</p>
								</div>
								<div className="text-left sm:text-right">
									<p className="mono text-sm">{job.salary}</p>
									<p className="eyebrow mt-2 text-signal">View posting →</p>
								</div>
							</Link>
						</li>
					);
				})}
				{visible.length === 0 && (
					<li className="border border-dashed border-line p-10 text-center text-sm text-muted">
						No openings match that filter right now. New recruitments post weekly —
						check back soon.
					</li>
				)}
			</ul>
		</div>
	);
}
