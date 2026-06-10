import type { MetadataRoute } from 'next';
import { JOBS, SITE, TESTS } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
	const staticPages = ['', '/jobs', '/tests', '/pricing', '/departments', '/faq'].map(
		(path) => ({
			url: `${SITE.url}${path}`,
			changeFrequency: 'weekly' as const,
			priority: path === '' ? 1 : 0.8,
		}),
	);

	const jobPages = JOBS.map((job) => ({
		url: `${SITE.url}/jobs/${job.slug}`,
		changeFrequency: 'daily' as const,
		priority: 0.9,
	}));

	const testPages = TESTS.map((test) => ({
		url: `${SITE.url}/tests/${test.slug}`,
		changeFrequency: 'monthly' as const,
		priority: 0.7,
	}));

	return [...staticPages, ...jobPages, ...testPages];
}
