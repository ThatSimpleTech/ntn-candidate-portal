import { defineBackend } from '@aws-amplify/backend';
import { Duration } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { scoreSummary } from './functions/score-summary/resource';

const backend = defineBackend({
	auth,
	data,
	scoreSummary,
});

/**
 * CDK escape hatch: the pricing-quote API is a Python Lambda behind a
 * Function URL, kept on the same runtime/handler conventions as the
 * legacy SAM/Python API layer it stands in for. See docs/adr/0004.
 */
const pythonApiStack = backend.createStack('python-api');

const pricingQuote = new lambda.Function(pythonApiStack, 'PricingQuoteFn', {
	functionName: 'ntn-pricing-quote',
	runtime: lambda.Runtime.PYTHON_3_12,
	architecture: lambda.Architecture.ARM_64,
	handler: 'handler.lambda_handler',
	code: lambda.Code.fromAsset('amplify/python/pricing_quote'),
	timeout: Duration.seconds(10),
	memorySize: 256,
	description: 'Public pricing quote API (Python, stands in for the SAM API layer)',
});

const pricingQuoteUrl = pricingQuote.addFunctionUrl({
	authType: lambda.FunctionUrlAuthType.NONE,
	cors: {
		allowedOrigins: ['*'],
		allowedMethods: [lambda.HttpMethod.GET, lambda.HttpMethod.POST],
		allowedHeaders: ['Content-Type'],
	},
});

backend.addOutput({
	custom: {
		pricingQuoteUrl: pricingQuoteUrl.url,
	},
});
