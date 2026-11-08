import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'work.webart.physics',
	appName: 'Physics',
	webDir: 'dist/app/browser',
	plugins: {
		FirebaseAuthentication: {
			skipNativeAuth: true,
			providers: ['apple.com'],
		},
	},
};

export default config;
