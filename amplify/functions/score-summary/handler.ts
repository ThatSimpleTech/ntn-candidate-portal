import type { Schema } from '../../data/resource';

type SectionScore = { section: string; raw: number; max: number };

type Band = 'EXCEPTIONAL' | 'COMPETITIVE' | 'PASSING' | 'BELOW_STANDARD';

const bandFor = (pct: number): Band => {
	if (pct >= 90) return 'EXCEPTIONAL';
	if (pct >= 75) return 'COMPETITIVE';
	if (pct >= 60) return 'PASSING';
	return 'BELOW_STANDARD';
};

const NEXT_STEPS: Record<Band, string> = {
	EXCEPTIONAL:
		'Your scores place you in the top band. Departments typically contact top-band candidates within 2-4 weeks.',
	COMPETITIVE:
		'Your scores are competitive. Consider transferring scores to additional departments to maximize reach.',
	PASSING:
		'You passed. A practice test before your next attempt can move you into the competitive band.',
	BELOW_STANDARD:
		'You did not meet the standard this cycle. You are eligible to retest after the 90-day waiting period.',
};

/**
 * Translates raw section scores into the candidate-readable summary shown on
 * the dashboard. Scoring weights stay server-side: candidates see bands and
 * guidance, not the proprietary scoring model.
 */
export const handler: Schema['getScoreSummary']['functionHandler'] = async (event) => {
	const { applicationId } = event.arguments;

	// Demo build: section scores are synthesized deterministically from the
	// application ID. Production wires this to the scoring store (Aurora).
	const seed = [...applicationId].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
	const sections: SectionScore[] = [
		{ section: 'Human Relations (Video)', raw: 55 + (seed % 40), max: 100 },
		{ section: 'Reading Comprehension', raw: 60 + ((seed >> 2) % 35), max: 100 },
		{ section: 'Mechanical Reasoning', raw: 50 + ((seed >> 4) % 45), max: 100 },
	];

	const overallPct = Math.round(
		sections.reduce((acc, s) => acc + (s.raw / s.max) * 100, 0) / sections.length,
	);
	const band = bandFor(overallPct);

	return {
		applicationId,
		generatedAt: new Date().toISOString(),
		sections: sections.map((s) => ({
			...s,
			band: bandFor((s.raw / s.max) * 100),
		})),
		overall: { percentile: overallPct, band },
		nextSteps: NEXT_STEPS[band],
	};
};
