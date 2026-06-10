import { defineFunction } from '@aws-amplify/backend';

export const scoreSummary = defineFunction({
	name: 'score-summary',
	entry: './handler.ts',
	timeoutSeconds: 10,
	memoryMB: 256,
});
