import { defineAuth } from '@aws-amplify/backend';

/**
 * Candidate identity pool. Email sign-in keeps friction low for a public
 * applicant funnel; TOTP MFA is optional so agencies that mandate it can
 * enroll without forcing it on every candidate.
 */
export const auth = defineAuth({
	loginWith: {
		email: {
			verificationEmailSubject: 'Verify your National Testing Network account',
			verificationEmailBody: (createCode: () => string) =>
				`Your NTN verification code is ${createCode()}. It expires in 15 minutes.`,
		},
	},
	multifactor: {
		mode: 'OPTIONAL',
		totp: true,
	},
	userAttributes: {
		givenName: { required: true, mutable: true },
		familyName: { required: true, mutable: true },
		phoneNumber: { required: false, mutable: true },
	},
	groups: ['Admins', 'Agencies'],
});
