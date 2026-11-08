/** Where people reach us about privacy and their data. */
export const CONTACT_EMAIL = 'ceo@webart.work';

/** This app's source code, published under the GPL. */
export const SOURCE_URL = 'https://github.com/WebArtWork/physics.webart.work';

export interface Credit {
	name: string;
	/** What it does in this app. English; the licenses page translates it, like `author`. */
	use: string;
	author: string;
	license: string;
	url: string;
	/** A local copy of the license text, when we ship one. */
	licenseUrl?: string;
}

/** Third-party work the app ships or shows. The full list of bundled packages is in /3rdpartylicenses.txt. */
export const CREDITS: Credit[] = [
	{
		name: 'Iconoir',
		use: 'Interface icons and Physics brand mark.',
		author: 'Luca Burgio and contributors',
		license: 'MIT',
		url: 'https://iconoir.com',
	},
	{
		name: 'Geist',
		use: 'Light theme typography, bundled through Fontsource.',
		author: 'Vercel and contributors',
		license: 'SIL Open Font License 1.1',
		url: 'https://vercel.com/font',
	},
	{
		name: 'Inter and Inter Tight',
		use: 'The fonts, bundled with the app through Fontsource.',
		author: 'Rasmus Andersson',
		license: 'SIL Open Font License 1.1',
		url: 'https://rsms.me/inter/',
	},
	{
		name: 'Angular',
		use: 'The app framework.',
		author: 'Google',
		license: 'MIT',
		url: 'https://angular.dev',
	},
	{
		name: 'Firebase JavaScript SDK',
		use: 'Sign-in and saved data.',
		author: 'Google',
		license: 'Apache-2.0',
		url: 'https://github.com/firebase/firebase-js-sdk',
	},
	{
		name: 'Tailwind CSS',
		use: 'Styling.',
		author: 'Tailwind Labs',
		license: 'MIT',
		url: 'https://tailwindcss.com',
	},
];
