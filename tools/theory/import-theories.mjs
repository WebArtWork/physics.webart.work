import { readFile, readdir, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const source = path.join(root, 'content/theories');
const target = path.join(root, 'src/data/theory');
const keys = ['origin', 'core', 'components', 'apply', 'example', 'limits', 'related'];
const expected = ['EN: Short', 'EN: Detailed', 'UA: Коротко', 'UA: Детально'];
const files = (await readdir(source)).filter((name) => /^\d{3}\.md$/.test(name)).sort();
if (files.length !== 171) throw new Error(`Expected 171 theories; found ${files.length}`);
const theories = [];
for (const [index, file] of files.entries()) {
	const text = (await readFile(path.join(source, file), 'utf8'))
		.replace(/^\uFEFF/, '')
		.replace(/\r\n/g, '\n');
	const title = /^## (\d+)\. (.+?) \/ (.+)$/m.exec(text);
	if (!title || Number(title[1]) !== index + 1 || Number(file.slice(0, 3)) !== index + 1)
		throw new Error(`${file}: invalid number or title`);
	const headings = [...text.matchAll(/^### (.+)$/gm)].map((match) => match[1]);
	if (JSON.stringify(headings) !== JSON.stringify(expected))
		throw new Error(`${file}: invalid section order`);
	const sections = text
		.split(/^### .+\n/gm)
		.slice(1)
		.map((section) => section.trim());
	// Preserve the Markdown original; split this supplied sentence in display data for readability.
	if (index === 0) {
		sections[0] = sections[0].replace(
			'A model keeps essential features and leaves out others: a 5 m long car can be treated as a point when studying a 100 km trip, but not when parking in a 5.2 m space.',
			'A model keeps essential features and leaves out others. A 5 m long car can be treated as a point when studying a 100 km trip. It cannot be treated as a point when parking in a 5.2 m space.',
		);
	}
	if (sections.some((section) => !section)) throw new Error(`${file}: empty section`);
	const parseFull = (section) => {
		const lines = section.split('\n').filter((line) => line.trim());
		if (lines.length !== 7)
			throw new Error(`${file}: expected seven detailed parts, found ${lines.length}`);
		return lines.map((line) => {
			const match = /^- \*\*(.+?):\*\*\s*(.+)$/.exec(line);
			if (!match) throw new Error(`${file}: invalid detailed part`);
			return { label: match[1], text: match[2] };
		});
	};
	const full = { en: parseFull(sections[1]), ua: parseFull(sections[3]) };
	for (const match of text.matchAll(/\(#(\d+)\)/g))
		if (+match[1] < 1 || +match[1] > 171) throw new Error(`${file}: unknown related theory`);
	theories.push({
		n: index + 1,
		slug:
			file.slice(0, 3) +
			'-' +
			title[2]
				.toLowerCase()
				.replace(/['’]/g, '')
				.replace(/[^a-z0-9]+/g, '-')
				.replace(/^-|-$/g, '')
				.slice(0, 65)
				.replace(/-$/, ''),
		title: { en: title[2], ua: title[3] },
		short: { en: sections[0], ua: sections[2] },
		labels: Object.fromEntries(
			['en', 'ua'].map((lang) => [lang, full[lang].map((item) => item.label)]),
		),
		full: Object.fromEntries(
			['en', 'ua'].map((lang) => [
				lang,
				Object.fromEntries(full[lang].map((item, i) => [keys[i], item.text])),
			]),
		),
	});
}
const groups = JSON.parse(await readFile(path.join(root, 'content/theory-groups.json'), 'utf8'));
for (const theory of theories)
	if (groups.filter((group) => theory.n >= group.from && theory.n <= group.to).length !== 1)
		throw new Error(`Topic coverage: ${theory.n}`);
await mkdir(target, { recursive: true });
await mkdir(path.join(target, 'topics'), { recursive: true });
for (const theory of theories)
	await writeFile(
		path.join(target, 'topics', theory.slug + '.json'),
		JSON.stringify(theory, null, '\t') + '\n',
	);
await writeFile(
	path.join(root, 'src/app/feature/theory/theory.loaders.ts'),
	'export const THEORY_LOADERS: Record<string, () => Promise<{default: unknown}>> = {\n' +
		theories
			.map(
				(theory) =>
					`\t'${theory.slug}': () => import('../../../data/theory/topics/${theory.slug}.json'),`,
			)
			.join('\n') +
		'\n};\n',
);
await writeFile(path.join(target, 'theories.json'), JSON.stringify(theories, null, '\t') + '\n');
const { n, slug, title, short } = theories[0];
await writeFile(
	path.join(target, 'sample.json'),
	JSON.stringify({ n, slug, title, short }, null, '\t') + '\n',
);
await writeFile(
	path.join(target, 'theories-index.json'),
	JSON.stringify(
		theories.map(({ n, slug, title }) => ({ n, slug, title })),
		null,
		'\t',
	) + '\n',
);
await writeFile(path.join(target, 'groups.json'), JSON.stringify(groups, null, '\t') + '\n');
const companyFile = path.join(root, 'src/data/company/company.json');
const company = JSON.parse(await readFile(companyFile, 'utf8'));
const name = 'Physics',
	domain = 'https://physics.webart.work';
const description =
	'171 physics theories in English and Ukrainian, with short explanations, detailed lessons, formulas and worked examples.';
company.name = name;
company.title = 'Physics | Understand how the universe works';
company.description = description;
company.siteUrl = domain;
company.image = domain + '/logo.svg';
company.logo = '/logo.svg';
company.defaultSeo = {
	...company.defaultSeo,
	title: company.title,
	description,
	image: '/seo/physics.jpg',
};
company.pageSeo = {
	'/': { title: company.title, description, image: '/seo/physics.jpg' },
	'/theory': {
		title: 'Physics theories',
		description:
			'Explore all 171 physics theories across 18 topics, from measurement and motion to quantum and nuclear physics.',
		image: '/seo/physics.jpg',
	},
	'/theory/print/short': { title: 'Print short physics theories', robots: 'noindex, nofollow' },
	'/theory/print/full': { title: 'Print full physics theories', robots: 'noindex, nofollow' },
	'/privacy': {
		title: 'Privacy policy',
		description: 'How Physics handles account information and study marks.',
		image: '/seo/physics.jpg',
	},
	'/support': {
		title: 'Support',
		description: 'Contact the Physics learning platform team.',
		image: '/seo/physics.jpg',
	},
	'/licenses': {
		title: 'Licenses and credits',
		description: 'Software licenses and credits for Physics.',
		image: '/seo/physics.jpg',
	},
	'/sign-in': { title: 'Sign in', robots: 'noindex, nofollow', image: '/seo/physics.jpg' },
	'/profile': {
		title: 'Your Physics profile',
		robots: 'noindex, nofollow',
		image: '/seo/physics.jpg',
	},
};
for (const theory of theories)
	company.pageSeo['/theory/' + theory.slug] = {
		title: theory.title.en,
		description: theory.short.en.replace(/\s+/g, ' ').slice(0, 180),
		image: '/seo/physics.jpg',
	};
await writeFile(companyFile, JSON.stringify(company, null, '\t') + '\n');
console.log(
	`Imported ${theories.length} bilingual theories, ${groups.length} topics and physics-only SEO metadata.`,
);
