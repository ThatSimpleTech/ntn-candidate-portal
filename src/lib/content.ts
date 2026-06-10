/**
 * Catalog seed content. Single source of truth for the statically generated
 * marketing pages AND the backend seed script (scripts/seed.ts), so the
 * prerendered HTML and the AppSync data never drift in the demo.
 *
 * Test names, prices, and section structures reflect NTN's published catalog
 * (test-pricing.cfm, June 2026). Departments and postings are representative
 * demo data, not live recruitments.
 */

export type Classification =
	| 'FIREFIGHTER'
	| 'LAW_ENFORCEMENT'
	| 'DISPATCH'
	| 'CORRECTIONS'
	| 'EMS'
	| 'TRANSIT';

export const CLASSIFICATION_LABELS: Record<Classification, string> = {
	FIREFIGHTER: 'Fire',
	LAW_ENFORCEMENT: 'Law Enforcement',
	DISPATCH: '911 Dispatch',
	CORRECTIONS: 'Corrections',
	EMS: 'EMS',
	TRANSIT: 'Transit',
};

export interface TestProduct {
	slug: string;
	name: string;
	code: string;
	classification: Classification;
	priceUsd: number;
	durationMinutes: number;
	summary: string;
	audience: string;
	sections: { name: string; description: string }[];
	virtual: boolean;
}

export const TESTS: TestProduct[] = [
	{
		slug: 'fireteam',
		name: 'FireTEAM',
		code: 'FT-01',
		classification: 'FIREFIGHTER',
		priceUsd: 55,
		durationMinutes: 150,
		summary:
			'The national entry-level firefighter exam. Video-based human relations scenarios plus mechanical, reading, and math sections — built around the job, not trivia.',
		audience: 'Entry-level firefighter candidates',
		sections: [
			{
				name: 'Human Relations (Video)',
				description:
					'Realistic crew scenarios test teamwork, public interaction, and judgment under pressure.',
			},
			{
				name: 'Mechanical Reasoning',
				description: 'Tools, machines, and physical principles used on the fireground.',
			},
			{
				name: 'Reading Comprehension',
				description: 'Training-manual style passages and recall.',
			},
			{ name: 'Mathematics', description: 'Applied math: hydraulics, ratios, estimation.' },
		],
		virtual: true,
	},
	{
		slug: 'frontline-national',
		name: 'FrontLine National',
		code: 'FL-01',
		classification: 'LAW_ENFORCEMENT',
		priceUsd: 55,
		durationMinutes: 135,
		summary:
			'The video-based law enforcement exam used by agencies nationwide. Judgment scenarios, report writing, and reading — a realistic preview of patrol work.',
		audience: 'Entry-level police officer and deputy candidates',
		sections: [
			{
				name: 'Video Judgment Scenarios',
				description:
					'Branching patrol situations measure de-escalation instincts and decision quality.',
			},
			{
				name: 'Report Writing',
				description: 'Observe an incident, document it accurately and clearly.',
			},
			{ name: 'Reading Comprehension', description: 'Policy and procedure passages.' },
		],
		virtual: true,
	},
	{
		slug: 'ecomm-national',
		name: 'ECOMM National',
		code: 'EC-01',
		classification: 'DISPATCH',
		priceUsd: 55,
		durationMinutes: 120,
		summary:
			'The 911 telecommunicator exam. Simulated call-taking, statement evaluation, and a dispatcher multitasking simulation that mirrors a live console.',
		audience: '911 call-taker and dispatcher candidates',
		sections: [
			{
				name: 'Call-Taking Simulation (Video)',
				description: 'Extract the right information from distressed callers.',
			},
			{
				name: 'Statement Evaluation',
				description: 'Judge accuracy and completeness of relayed information.',
			},
			{
				name: 'Dispatch Multitasking',
				description: 'Manage simultaneous queues the way a working console does.',
			},
		],
		virtual: true,
	},
	{
		slug: 'react',
		name: 'REACT',
		code: 'RC-01',
		classification: 'CORRECTIONS',
		priceUsd: 41,
		durationMinutes: 105,
		summary:
			'The corrections officer exam. Video scenarios inside a working facility measure situational awareness, rule application, and professional composure.',
		audience: 'Corrections officer candidates (adult facilities)',
		sections: [
			{
				name: 'Facility Scenarios (Video)',
				description: 'Inmate interactions, security procedures, and incident response.',
			},
			{ name: 'Situational Judgment', description: 'Apply policy to ambiguous situations.' },
			{ name: 'Reading & Counting', description: 'Logs, counts, and written procedures.' },
		],
		virtual: true,
	},
	{
		slug: 'medicteam',
		name: 'MedicTEAM',
		code: 'MT-01',
		classification: 'EMS',
		priceUsd: 80,
		durationMinutes: 120,
		summary:
			'The EMT and paramedic selection exam. Patient-interaction video scenarios plus verbal reasoning grounded in BLS protocols.',
		audience: 'EMT and paramedic candidates',
		sections: [
			{
				name: 'Patient Scenarios (Video)',
				description: 'Bedside manner, scene management, and crew coordination.',
			},
			{
				name: 'Verbal Reasoning',
				description: 'BLS-grounded comprehension and protocol application.',
			},
		],
		virtual: true,
	},
	{
		slug: 'cpat',
		name: 'CPAT',
		code: 'CP-01',
		classification: 'FIREFIGHTER',
		priceUsd: 125,
		durationMinutes: 11,
		summary:
			'The Candidate Physical Ability Test — the IAFF/IAFC standard eight-event physical for firefighter candidates, administered at licensed NTN facilities.',
		audience: 'Firefighter candidates (physical ability)',
		sections: [
			{ name: 'Stair Climb', description: 'Weighted StepMill event.' },
			{ name: 'Hose Drag', description: 'Advance and pull a charged line.' },
			{ name: 'Equipment Carry', description: 'Saw carry to and from a tool cache.' },
			{ name: 'Ladder Raise & Extension', description: 'Raise and extend a 24-ft ladder.' },
			{ name: 'Forcible Entry', description: 'Controlled sledge strikes on a measured target.' },
			{ name: 'Search', description: 'Crawl a darkened maze with obstacles.' },
			{ name: 'Rescue Drag', description: 'Drag a 165-lb mannequin.' },
			{ name: 'Ceiling Breach & Pull', description: 'Pike-pole push/pull repetitions.' },
		],
		virtual: false,
	},
];

export interface Department {
	slug: string;
	name: string;
	city: string;
	state: string;
	classification: Classification;
	summary: string;
	salaryRange: string;
}

export const DEPARTMENTS: Department[] = [
	{
		slug: 'cascade-fire-rescue',
		name: 'Cascade Fire & Rescue',
		city: 'Everett',
		state: 'WA',
		classification: 'FIREFIGHTER',
		summary:
			'Career department covering 110 square miles of urban and wildland interface with 12 stations and an ISO Class 2 rating.',
		salaryRange: '$74,200 - $98,600',
	},
	{
		slug: 'lakeview-police',
		name: 'Lakeview Police Department',
		city: 'Lakewood',
		state: 'CO',
		classification: 'LAW_ENFORCEMENT',
		summary:
			'Accredited municipal agency of 210 sworn officers with dedicated traffic, K-9, and community policing units.',
		salaryRange: '$68,500 - $94,300',
	},
	{
		slug: 'tri-county-ecc',
		name: 'Tri-County Emergency Communications',
		city: 'Vancouver',
		state: 'WA',
		classification: 'DISPATCH',
		summary:
			'Consolidated 911 center answering 480,000 calls a year for fire, police, and EMS across three counties.',
		salaryRange: '$54,800 - $76,100',
	},
	{
		slug: 'high-plains-corrections',
		name: 'High Plains Corrections Bureau',
		city: 'Cheyenne',
		state: 'WY',
		classification: 'CORRECTIONS',
		summary:
			'State corrections bureau operating four adult facilities with direct-supervision pods and re-entry programs.',
		salaryRange: '$49,900 - $67,400',
	},
	{
		slug: 'gulf-coast-ems',
		name: 'Gulf Coast EMS Authority',
		city: 'Mobile',
		state: 'AL',
		classification: 'EMS',
		summary:
			'Regional EMS authority running 28 ambulances across two counties with a nationally recognized cardiac care program.',
		salaryRange: '$46,200 - $71,800',
	},
	{
		slug: 'birmingham-metro-fire',
		name: 'Birmingham Metro Fire District',
		city: 'Birmingham',
		state: 'AL',
		classification: 'FIREFIGHTER',
		summary:
			'Metro district protecting 420,000 residents with 31 companies, heavy rescue, and hazmat response.',
		salaryRange: '$52,700 - $79,900',
	},
	{
		slug: 'sound-transit-safety',
		name: 'Sound Regional Transit Police',
		city: 'Seattle',
		state: 'WA',
		classification: 'TRANSIT',
		summary:
			'Transit safety division covering light rail and bus rapid transit across the metro corridor.',
		salaryRange: '$61,000 - $83,500',
	},
	{
		slug: 'front-range-911',
		name: 'Front Range 911 Authority',
		city: 'Fort Collins',
		state: 'CO',
		classification: 'DISPATCH',
		summary:
			'Next-gen 911 center with text-to-911, integrated CAD, and a four-week academy for new telecommunicators.',
		salaryRange: '$51,300 - $72,600',
	},
];

export interface JobPosting {
	slug: string;
	title: string;
	departmentSlug: string;
	classification: Classification;
	testProductSlug: string;
	salary: string;
	location: string;
	closingDate: string;
	description: string;
	requirements: string[];
}

export const JOBS: JobPosting[] = [
	{
		slug: 'cascade-firefighter-emt',
		title: 'Firefighter / EMT',
		departmentSlug: 'cascade-fire-rescue',
		classification: 'FIREFIGHTER',
		testProductSlug: 'fireteam',
		salary: '$74,200 - $98,600',
		location: 'Everett, WA',
		closingDate: '2026-08-14',
		description:
			'Entry-level firefighter/EMT position. Recruits attend a 16-week academy followed by a 12-month probationary assignment. Lateral candidates with IFSAC certifications are encouraged to apply.',
		requirements: [
			'18 years or older at time of hire',
			'High school diploma or GED',
			'Valid driver license',
			'EMT certification (or obtained during academy)',
			'CPAT completion within 12 months of application',
		],
	},
	{
		slug: 'cascade-firefighter-paramedic',
		title: 'Firefighter / Paramedic',
		departmentSlug: 'cascade-fire-rescue',
		classification: 'FIREFIGHTER',
		testProductSlug: 'fireteam',
		salary: '$82,900 - $107,200',
		location: 'Everett, WA',
		closingDate: '2026-07-31',
		description:
			'Firefighter/paramedic position with ALS response duties. $10,000 hiring incentive for currently licensed paramedics.',
		requirements: [
			'State paramedic license',
			'FireTEAM score on file within 12 months',
			'CPAT card at time of conditional offer',
		],
	},
	{
		slug: 'lakeview-police-officer',
		title: 'Police Officer (Entry Level)',
		departmentSlug: 'lakeview-police',
		classification: 'LAW_ENFORCEMENT',
		testProductSlug: 'frontline-national',
		salary: '$68,500 - $94,300',
		location: 'Lakewood, CO',
		closingDate: '2026-09-01',
		description:
			'Entry-level sworn officer position. 24-week POST academy sponsored by the department, followed by 16 weeks of field training.',
		requirements: [
			'21 years or older at time of academy graduation',
			'60 college credit hours or 2 years military service',
			'FrontLine National score on file',
			'No felony convictions',
		],
	},
	{
		slug: 'lakeview-lateral-officer',
		title: 'Police Officer (Lateral)',
		departmentSlug: 'lakeview-police',
		classification: 'LAW_ENFORCEMENT',
		testProductSlug: 'frontline-national',
		salary: '$78,100 - $94,300',
		location: 'Lakewood, CO',
		closingDate: '2026-12-31',
		description:
			'Continuous lateral recruitment for currently certified peace officers. Abbreviated academy and accelerated step placement.',
		requirements: [
			'Current POST certification',
			'2+ years sworn experience',
			'FrontLine National score within 24 months',
		],
	},
	{
		slug: 'tri-county-telecommunicator',
		title: '911 Telecommunicator',
		departmentSlug: 'tri-county-ecc',
		classification: 'DISPATCH',
		testProductSlug: 'ecomm-national',
		salary: '$54,800 - $76,100',
		location: 'Vancouver, WA',
		closingDate: '2026-07-20',
		description:
			'Call-taker/dispatcher position on rotating shifts. Paid 12-week training program with CTO mentorship. Night and weekend differentials.',
		requirements: [
			'Type 35+ WPM',
			'ECOMM National score on file',
			'Ability to work rotating shifts including holidays',
		],
	},
	{
		slug: 'front-range-dispatcher',
		title: 'Emergency Dispatcher',
		departmentSlug: 'front-range-911',
		classification: 'DISPATCH',
		testProductSlug: 'ecomm-national',
		salary: '$51,300 - $72,600',
		location: 'Fort Collins, CO',
		closingDate: '2026-08-05',
		description:
			'Next-gen 911 dispatcher position. Four-week academy plus six months of console training. Text-to-911 and integrated CAD environment.',
		requirements: [
			'High school diploma or GED',
			'ECOMM National score on file',
			'Pass CritiCall skills assessment at interview',
		],
	},
	{
		slug: 'high-plains-corrections-officer',
		title: 'Corrections Officer I',
		departmentSlug: 'high-plains-corrections',
		classification: 'CORRECTIONS',
		testProductSlug: 'react',
		salary: '$49,900 - $67,400',
		location: 'Cheyenne, WY',
		closingDate: '2026-08-28',
		description:
			'Entry-level corrections officer in a direct-supervision facility. Six-week academy with full pay and benefits from day one.',
		requirements: [
			'19 years or older',
			'REACT score on file',
			'No disqualifying criminal history',
		],
	},
	{
		slug: 'gulf-coast-emt',
		title: 'EMT - Basic',
		departmentSlug: 'gulf-coast-ems',
		classification: 'EMS',
		testProductSlug: 'medicteam',
		salary: '$46,200 - $58,900',
		location: 'Mobile, AL',
		closingDate: '2026-07-15',
		description:
			'Full-time EMT position on 12-hour shifts. Tuition assistance toward paramedic licensure after one year of service.',
		requirements: [
			'State EMT-Basic license',
			'MedicTEAM score on file',
			'Clean driving record',
		],
	},
	{
		slug: 'gulf-coast-paramedic',
		title: 'Paramedic',
		departmentSlug: 'gulf-coast-ems',
		classification: 'EMS',
		testProductSlug: 'medicteam',
		salary: '$58,400 - $71,800',
		location: 'Mobile, AL',
		closingDate: '2026-09-30',
		description:
			'ALS paramedic position with $7,500 sign-on bonus. Nationally recognized cardiac and stroke care protocols.',
		requirements: [
			'State paramedic license',
			'MedicTEAM score on file',
			'ACLS and PALS certifications',
		],
	},
	{
		slug: 'birmingham-firefighter-recruit',
		title: 'Firefighter Recruit',
		departmentSlug: 'birmingham-metro-fire',
		classification: 'FIREFIGHTER',
		testProductSlug: 'fireteam',
		salary: '$52,700 - $79,900',
		location: 'Birmingham, AL',
		closingDate: '2026-08-21',
		description:
			'Recruit class of 24 starting January 2027. 20-week academy covering fire suppression, EMS, and technical rescue fundamentals.',
		requirements: [
			'18 years or older',
			'FireTEAM score on file',
			'CPAT completion before conditional offer',
		],
	},
	{
		slug: 'sound-transit-officer',
		title: 'Transit Safety Officer',
		departmentSlug: 'sound-transit-safety',
		classification: 'TRANSIT',
		testProductSlug: 'react',
		salary: '$61,000 - $83,500',
		location: 'Seattle, WA',
		closingDate: '2026-08-10',
		description:
			'Uniformed safety officer for light rail and BRT corridors. Focus on rider assistance, fare compliance, and incident de-escalation.',
		requirements: [
			'21 years or older',
			'REACT or START score on file',
			'Valid driver license',
		],
	},
];

export interface Faq {
	question: string;
	answer: string;
}

export const FAQS: Faq[] = [
	{
		question: 'How does NTN testing work?',
		answer:
			'Test once, apply broadly. You schedule a single exam (in person at 100+ testing centers or virtually from home), and your scores go to every participating department you select. Your base fee includes one department; each additional department is a flat $12.',
	},
	{
		question: 'How much does testing cost?',
		answer:
			'Written exams range from $41 (REACT, IMPACT) to $80 (MedicTEAM); most national exams are $55. The CPAT physical ability test is $125. Fee waivers are available for candidates with financial need — submit the waiver form before scheduling.',
	},
	{
		question: 'Can I take my test from home?',
		answer:
			'Yes. Every written exam is available as a proctored virtual session. You need a computer with a webcam, a wired headset, and a quiet room. Physical ability tests (CPAT, Firefighter Mile) are administered in person at licensed facilities.',
	},
	{
		question: 'How long are my scores valid?',
		answer:
			'Most departments accept scores for 12 months from your test date. Individual departments set their own validity windows, which are shown on each job posting.',
	},
	{
		question: 'What if I want to apply to more departments after testing?',
		answer:
			'Log in to your dashboard at any time and transfer your existing scores to additional departments for $12 each. No retesting required.',
	},
	{
		question: 'Can I retake a test if I am not happy with my score?',
		answer:
			'Yes, after a 90-day waiting period from your previous attempt. Your most recent score is the one reported to departments.',
	},
	{
		question: 'How are my scores calculated?',
		answer:
			'Each exam section is scored against validated national benchmarks developed by industrial-organizational psychologists. Your dashboard shows your performance band per section — Exceptional, Competitive, Passing, or Below Standard — along with concrete next steps.',
	},
	{
		question: 'What happens after I test?',
		answer:
			'Scores are typically released to your dashboard within 2-3 business days and forwarded automatically to your selected departments. Departments contact candidates directly for the next steps in their hiring process.',
	},
];

export const SITE = {
	name: 'National Testing Network',
	shortName: 'NTN',
	url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://candidates.nationaltestingnetwork.com',
	tagline: 'One test. Every department.',
	description:
		'Public safety hiring starts here: schedule one exam, send your scores to fire, police, 911, corrections, and EMS departments nationwide.',
};

export const departmentBySlug = (slug: string) => DEPARTMENTS.find((d) => d.slug === slug);
export const testBySlug = (slug: string) => TESTS.find((t) => t.slug === slug);
export const jobBySlug = (slug: string) => JOBS.find((j) => j.slug === slug);
