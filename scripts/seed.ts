/**
 * Seeds the deployed AppSync API with the catalog content from
 * src/lib/content.ts so the database matches the prerendered pages.
 *
 * Catalog models are API-key READ-ONLY by design; writes require an
 * Admins-group Cognito user (see docs/RUNBOOK.md "Seeding" for the
 * one-time admin-user setup).
 *
 * Usage (after `npx ampx sandbox` or a pipeline deploy has produced
 * amplify_outputs.json):
 *   AMPLIFY_SEED_EMAIL=admin@example.com AMPLIFY_SEED_PASSWORD=... npx tsx scripts/seed.ts
 */
import { Amplify } from 'aws-amplify';
import { signIn, signOut } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../amplify/data/resource';
import outputs from '../amplify_outputs.json';
import { DEPARTMENTS, JOBS, TESTS } from '../src/lib/content';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
Amplify.configure(outputs as any);

const client = generateClient<Schema>({ authMode: 'userPool' });

async function main() {
	const email = process.env.AMPLIFY_SEED_EMAIL;
	const password = process.env.AMPLIFY_SEED_PASSWORD;
	if (!email || !password) {
		throw new Error('Set AMPLIFY_SEED_EMAIL and AMPLIFY_SEED_PASSWORD (Admins-group user).');
	}

	await signOut().catch(() => {});
	const { isSignedIn } = await signIn({ username: email, password });
	if (!isSignedIn) throw new Error('Sign-in did not complete (MFA or confirmation pending?).');

	console.log('Seeding test products...');
	for (const t of TESTS) {
		const { errors } = await client.models.TestProduct.create({
			name: t.name,
			slug: t.slug,
			classification: t.classification,
			priceUsd: t.priceUsd,
			durationMinutes: t.durationMinutes,
			sections: JSON.stringify(t.sections),
			summary: t.summary,
		});
		if (errors?.length) throw new Error(errors[0].message);
	}

	console.log('Seeding departments...');
	const deptIds = new Map<string, string>();
	for (const d of DEPARTMENTS) {
		const { data, errors } = await client.models.Department.create({
			name: d.name,
			slug: d.slug,
			city: d.city,
			state: d.state,
			classification: d.classification,
			summary: d.summary,
			salaryRange: d.salaryRange,
		});
		if (errors?.length) throw new Error(errors[0].message);
		if (data) deptIds.set(d.slug, data.id);
	}

	console.log('Seeding job postings...');
	for (const j of JOBS) {
		const departmentId = deptIds.get(j.departmentSlug);
		if (!departmentId) continue;
		const { errors } = await client.models.JobPosting.create({
			title: j.title,
			slug: j.slug,
			departmentId,
			classification: j.classification,
			testProductSlug: j.testProductSlug,
			salary: j.salary,
			location: j.location,
			closingDate: j.closingDate,
			description: j.description,
			requirements: j.requirements,
			isOpen: true,
		});
		if (errors?.length) throw new Error(errors[0].message);
	}

	console.log(
		`Done: ${TESTS.length} tests, ${DEPARTMENTS.length} departments, ${JOBS.length} jobs.`,
	);
	await signOut();
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
