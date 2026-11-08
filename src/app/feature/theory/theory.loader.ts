import { Theory } from './theory.interface';
import { THEORY_LOADERS } from './theory.loaders';

export async function loadTheory(slug: string): Promise<Theory> {
	const loader = THEORY_LOADERS[slug];
	if (!loader) throw new Error('Unknown physics theory');
	return (await loader()).default as Theory;
}
