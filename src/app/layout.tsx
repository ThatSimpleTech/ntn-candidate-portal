import type { Metadata } from 'next';
import { Barlow_Condensed, Public_Sans } from 'next/font/google';
import { ViewTransition } from 'react';
import './globals.css';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { SmoothScroll } from '@/components/SmoothScroll';
import { SITE } from '@/lib/content';

const barlow = Barlow_Condensed({
	variable: '--font-barlow',
	subsets: ['latin'],
	weight: ['500', '600', '700', '800'],
});

const publicSans = Public_Sans({
	variable: '--font-public-sans',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	metadataBase: new URL(SITE.url),
	title: {
		default: `${SITE.name} — ${SITE.tagline}`,
		template: `%s | ${SITE.shortName}`,
	},
	description: SITE.description,
	openGraph: {
		type: 'website',
		siteName: SITE.name,
		title: `${SITE.name} — ${SITE.tagline}`,
		description: SITE.description,
		url: '/',
	},
	twitter: {
		card: 'summary_large_image',
		title: `${SITE.name} — ${SITE.tagline}`,
		description: SITE.description,
	},
	robots: { index: true, follow: true },
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${barlow.variable} ${publicSans.variable} h-full antialiased`}
		>
			<body className="flex min-h-full flex-col">
				<SmoothScroll />
				<Header />
				<main className="flex-1">
					<ViewTransition default="page-fade" update="page-fade">
						{children}
					</ViewTransition>
				</main>
				<Footer />
			</body>
		</html>
	);
}
