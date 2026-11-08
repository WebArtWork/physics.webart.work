import indexData from '../../../data/theory/theories-index.json';
import groupData from '../../../data/theory/groups.json';
import { TheoryGroup, TheoryIndexItem } from './theory.interface';

export const THEORY_INDEX = indexData as TheoryIndexItem[];
export const THEORY_GROUPS = groupData as TheoryGroup[];
export function groupOf(n: number): TheoryGroup {
	return THEORY_GROUPS.find((group) => n >= group.from && n <= group.to)!;
}
export function theoryByNumber(n: number): TheoryIndexItem | undefined {
	return THEORY_INDEX.find((theory) => theory.n === n);
}
export const THEORY_INTRO = [
	'Every theory has a short version and a detailed explanation with formulas, a worked example and the limits of the model.',
	'Read the short version first. Try the worked example before checking the explanation.',
];
