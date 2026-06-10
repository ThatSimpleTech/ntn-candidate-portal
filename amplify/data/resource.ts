import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
import { scoreSummary } from '../functions/score-summary/resource';

/**
 * Authorization model:
 *  - Catalog data (Department, JobPosting, TestProduct) is publicly readable
 *    via API key so the SSR job board and test pages render without auth.
 *  - Application records are owner-scoped: a candidate sees only their own.
 *  - Agencies group can read applications routed to them; Admins manage
 *    catalog content. Group claims ride on the Cognito access token.
 */
const schema = a
	.schema({
		Classification: a.enum([
			'FIREFIGHTER',
			'LAW_ENFORCEMENT',
			'DISPATCH',
			'CORRECTIONS',
			'EMS',
			'TRANSIT',
		]),

		ApplicationStatus: a.enum([
			'STARTED',
			'TEST_SCHEDULED',
			'TEST_COMPLETE',
			'SCORES_RELEASED',
			'FORWARDED_TO_AGENCY',
		]),

		Department: a
			.model({
				name: a.string().required(),
				slug: a.string().required(),
				city: a.string().required(),
				state: a.string().required(),
				classification: a.ref('Classification').required(),
				logoUrl: a.url(),
				summary: a.string(),
				salaryRange: a.string(),
				jobPostings: a.hasMany('JobPosting', 'departmentId'),
			})
			.secondaryIndexes((index) => [index('state').sortKeys(['city'])])
			.authorization((allow) => [
				allow.publicApiKey().to(['read']),
				allow.authenticated().to(['read']),
				allow.group('Admins'),
			]),

		JobPosting: a
			.model({
				title: a.string().required(),
				slug: a.string().required(),
				departmentId: a.id().required(),
				department: a.belongsTo('Department', 'departmentId'),
				classification: a.ref('Classification').required(),
				testProductSlug: a.string().required(),
				salary: a.string(),
				location: a.string().required(),
				closingDate: a.date(),
				description: a.string().required(),
				requirements: a.string().array(),
				isOpen: a.boolean().default(true),
			})
			.secondaryIndexes((index) => [index('classification')])
			.authorization((allow) => [
				allow.publicApiKey().to(['read']),
				allow.authenticated().to(['read']),
				allow.group('Admins'),
			]),

		TestProduct: a
			.model({
				name: a.string().required(),
				slug: a.string().required(),
				classification: a.ref('Classification').required(),
				priceUsd: a.float().required(),
				durationMinutes: a.integer(),
				sections: a.json(),
				summary: a.string(),
			})
			.authorization((allow) => [
				allow.publicApiKey().to(['read']),
				allow.authenticated().to(['read']),
				allow.group('Admins'),
			]),

		Application: a
			.model({
				jobPostingId: a.id().required(),
				jobTitle: a.string().required(),
				departmentName: a.string().required(),
				status: a.ref('ApplicationStatus').required(),
				scheduledFor: a.datetime(),
				scores: a.json(),
				agencySlug: a.string(),
			})
			.authorization((allow) => [
				allow.owner(),
				allow.group('Agencies').to(['read']),
				allow.group('Admins'),
			]),

		/**
		 * Custom query backed by a TypeScript Lambda: turns raw section scores
		 * into a candidate-readable summary (percentile bands, next steps).
		 */
		getScoreSummary: a
			.query()
			.arguments({ applicationId: a.string().required() })
			.returns(a.json())
			.handler(a.handler.function(scoreSummary))
			.authorization((allow) => [allow.authenticated()]),
	})
	.authorization((allow) => [allow.resource(scoreSummary)]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
	schema,
	authorizationModes: {
		defaultAuthorizationMode: 'userPool',
		apiKeyAuthorizationMode: { expiresInDays: 365 },
	},
});
