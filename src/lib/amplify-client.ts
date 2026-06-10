/* eslint-disable @typescript-eslint/no-explicit-any */
import outputs from '../../amplify_outputs.json';

/**
 * amplify_outputs.json is a committed stub until a backend is deployed
 * (sandbox or pipeline overwrite it). Feature-detect instead of assuming.
 */
export const amplifyOutputs = outputs as Record<string, any>;

export const hasAuthBackend = Boolean(amplifyOutputs.auth?.user_pool_id);
export const hasDataBackend = Boolean(amplifyOutputs.data?.url);
export const pricingQuoteUrl: string | undefined = amplifyOutputs.custom?.pricingQuoteUrl;
