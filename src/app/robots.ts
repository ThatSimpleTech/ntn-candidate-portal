import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/content';

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: '*',
				allow: '/',
				disallow: ['/dashboard'],
			},
			// AI crawlers welcomed explicitly: candidates increasingly ask
			// assistants "how do I become a firefighter" — be the answer.
			{ userAgent: 'GPTBot', allow: '/' },
			{ userAgent: 'ClaudeBot', allow: '/' },
			{ userAgent: 'PerplexityBot', allow: '/' },
			{ userAgent: 'Google-Extended', allow: '/' },
		],
		sitemap: `${SITE.url}/sitemap.xml`,
	};
}
