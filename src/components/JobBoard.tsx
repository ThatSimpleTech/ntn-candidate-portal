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

			<ul className="mt-4 border-t border-line">
				{visible.map((job) => {
					const dept = deptBySlug.get(job.departmentSlug);
					return (
						<li key={job.slug}>
							<Link
								href={`/jobs/${job.slug}`}
								className="ink-sweep group -mx-4 grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 border-b border-line px-4 py-6"
							>
								<span className="min-w-0">
									<span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
										<span className="display text-2xl transition-colors duration-500 group-hover:text-paper sm:text-3xl">
											{job.title}
										</span>
										<span className="eyebrow text-signal transition-colors duration-500 group-hover:text-brass">
											{CLASSIFICATION_LABELS[job.classification]}
										</span>
									</span>
									<span className="mt-1 block text-sm text-muted transition-colors duration-500 group-hover:text-paper/70">
										{dept?.name} — {job.location}
									</span>
								</span>
								<span className="text-right">
									<span className="mono block text-xs text-muted transition-colors duration-500 group-hover:text-paper/60">
										closes {job.closingDate}
									</span>
									<span className="eyebrow mt-1 block text-signal transition-colors duration-500 group-hover:text-brass">
										View posting →
									</span>
								</span>
							</Link>
						</li>
					);
				})}
				{visible.length === 0 && (
					<li className="border-b border-line py-12 text-center text-sm text-muted">
						No openings match that filter right now. New recruitments post weekly —
						check back soon.
					</li>
				)}
			</ul>
		</div>
	);
}
