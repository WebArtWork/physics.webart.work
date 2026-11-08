import { theoryByNumber, THEORY_INDEX } from './theory.catalog';
import { Lang, TheoryIndexItem } from './theory.interface';

export interface RelatedPart {
	/** The theory's title as written, e.g. "Force and Its Units". */
	text: string;
	/** Its slug when the number points to a theory. */
	slug?: string;
}

/** "Force and Its Units (#2); Moment of a Force (#10)" as separate parts, each linked when its number exists. */
export function relatedParts(text: string): RelatedPart[] {
	return text
		.split(/;\s*/)
		.filter(Boolean)
		.map((item) => {
			const match = /^(.*?)\s*\(#(\d+)\)\s*$/.exec(item);
			if (!match) return { text: item };
			return { text: item, slug: theoryByNumber(Number(match[2]))?.slug };
		});
}

export function langOf(code: string | undefined): Lang {
	return code === 'ua' ? 'ua' : 'en';
}

export function neighbours(theory: TheoryIndexItem): {
	prev?: TheoryIndexItem;
	next?: TheoryIndexItem;
} {
	const i = THEORY_INDEX.findIndex((item) => item.slug === theory.slug);
	return { prev: THEORY_INDEX[i - 1], next: THEORY_INDEX[i + 1] };
}
