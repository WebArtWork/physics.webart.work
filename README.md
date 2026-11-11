# Physics

Physics learning at https://physics.webart.work, built with Angular 22 and prerendered pages.

## Content

171 English/Ukrainian theories from the supplied ZIP archives are preserved byte-for-byte in `content/theories/001.md` through `171.md`. Each has short and detailed versions. Topic boundaries are in `content/theory-groups.json`.

Run `npm run theories:import` after editing content, then `npm run build:seo` to build and regenerate metadata and the sitemap.

## Features

Topic navigation, bilingual short/full lesson pages, related theories, previous/next navigation, study marks stored in the browser, and short/full print views. Google/Apple sign-in and appearance/language preferences use the existing shared components. Exercises and virtual experiments are not included in this content release.

## Appearance

Interior light mode and Ember dark mode, selected by the user from Better Design. The app keeps its Angular framework and semantic component classes.

## Development

`npm ci` then `npm start`. Production output: `dist/app/browser`. Source: https://github.com/WebArtWork/physics.webart.work.

## Native apps

The native identities are `work.webart.physics`. Before a native release, provision Physics-specific Firebase clients and supply `android/app/google-services.json` and `ios/App/App/GoogleService-Info.plist`, then run Capacitor sync and the platform builds. The web app uses the shared learning Firebase project (`learning-c2766`). Native signing and native builds were not verified on this Windows host. The native workflow is manual; a web push does not launch the copied chess Fastlane release.

## Content integrity and checks

`npm run check:content` verifies all 171 Markdown originals against the import manifest. The production SEO build also checks all lesson routes and the complete printable English content. One long sentence in lesson 1 is split in generated English display data for readability; its Markdown original and worked example are preserved.

The UI uses Interior light and Ember dark catalog tokens with Angular components and a consistent Iconoir family. Accessibility adjustments darken the light secondary text and use dark text on the orange action fill. Visual review notes are in `.better-design/app-review.md`.
