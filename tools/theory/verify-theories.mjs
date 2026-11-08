import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const read = (rel) => readFile(path.join(root, rel), 'utf8');
const manifest = JSON.parse(await read('content/theory-import.json'));
const theories = JSON.parse(await read('src/data/theory/theories.json'));
const groups = JSON.parse(await read('content/theory-groups.json'));
const company = JSON.parse(await read('src/data/company/company.json'));
assert.equal(theories.length, 171);
assert.equal(new Set(theories.map((t) => t.slug)).size, 171);
assert.deepEqual(
	theories.map((t) => t.n),
	Array.from({ length: 171 }, (_, i) => i + 1),
);
const keys = ['origin', 'core', 'components', 'apply', 'example', 'limits', 'related'];
for (const source of manifest.sources) {
	const bytes = await readFile(path.join(root, 'content/theories', source.file));
	assert.equal(
		createHash('sha256').update(bytes).digest('hex'),
		source.sha256,
		`${source.file}: original changed`,
	);
}
const htmlEscape = (value) =>
	value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;');
for (const theory of theories) {
	assert.equal(
		groups.filter((g) => theory.n >= g.from && theory.n <= g.to).length,
		1,
		`${theory.n}: topic coverage`,
	);
	for (const lang of ['en', 'ua']) {
		assert(theory.title[lang] && theory.short[lang]);
		assert.deepEqual(Object.keys(theory.full[lang]), keys);
		assert.equal(theory.labels[lang].length, 7);
		for (const value of Object.values(theory.full[lang])) assert(value.length > 0);
		for (const match of theory.full[lang].related.matchAll(/\(#(\d+)\)/g))
			assert(theories.some((t) => t.n === +match[1]));
	}
	const route = '/theory/' + theory.slug;
	assert.equal(company.pageSeo[route].title, theory.title.en);
	if (process.argv.includes('--built')) {
		const html = await read('dist/app/browser' + route + '/index.html');
		assert(html.includes(htmlEscape(theory.title.en)), `${route}: title not rendered`);
		assert(
			html.includes(htmlEscape(theory.short.en)),
			`${route}: short explanation not rendered`,
		);
		assert(html.includes('https://physics.webart.work' + route), `${route}: canonical domain`);
	}
}
if (process.argv.includes('--built'))
	await stat(path.join(root, 'dist/app/browser/seo/physics.jpg'));
if (process.argv.includes('--built')) {
	const fullPrint = await read('dist/app/browser/theory/print/full/index.html');
	const shortPrint = await read('dist/app/browser/theory/print/short/index.html');
	for (const theory of theories) {
		assert(
			shortPrint.includes(htmlEscape(theory.short.en)),
			`${theory.n}: short print content`,
		);
		for (const value of Object.values(theory.full.en))
			assert(fullPrint.includes(htmlEscape(value)), `${theory.n}: full print content`);
	}
}
console.log(
	`Verified 171 unchanged Markdown originals, 342 language versions, 18 topic groups, related references and${process.argv.includes('--built') ? ' prerendered' : ''} lesson metadata.`,
);
