# Physics rebrand review

Seven public page templates measured in both themes at 390, 1440 and 1728 pixels (42 captures). Final measured spacing findings: 0 critical, 0 serious, 12 moderate instances representing two repeated patterns.

## Final implementation

- Interior light mode and Ember dark mode use the selected catalog tokens and material on the existing Angular semantic component system. No React framework migration was performed.
- Iconoir is used consistently in both modes, including the physics brand mark. Geist and Inter are self-hosted and verified loaded in their corresponding themes.
- Chess training pages, game data, exercise import tools and chess-specific public images were removed from the active app and source tree after backup.
- Public pages provide the learning home, searchable theory hub, 171 bilingual short/full lessons, related links, previous/next navigation, print views, privacy, support, credits, sign-in and preferences. Study marks are local to `physics_theory`.

## Checks and fixes

- Measured: 42 real Edge captures showed no visible horizontal overflow or flagged text-contrast problems in the checked viewport text.
- Measured: Better Design spacing inspection completed for all seven public templates in both modes at all three widths. Home, theory hub, lesson, privacy and support scored 100 for geometry. Licenses and sign-in scored 70, with no critical or serious findings. The JSON receipts are in `spacing-review.json`.
- Fixed: standalone text-link targets were enlarged to 44 pixels high, and the brand home link was enlarged to 44 by 44 pixels.
- Fixed: the sign-in route stays available when Firebase session restoration fails; appearance and language are grouped in a disclosure.
- Fixed: the first supplied English short explanation's long model/example sentence is split in generated display data, without changing its source Markdown or numerical example. The lesson comprehension recheck passed.
- Derived: Better Design comprehension checks passed for the home introduction, theory hub controls, lesson explanation and controls, sign-in, appearance and language panels.
- Derived: all 171 source Markdown hashes, 342 language versions, 18 topic boundaries and related references passed the content verifier. All 171 English short and detailed print outputs are checked in the production HTML.
- Measured: browser tests passed for search matching/empty state, short/full disclosure, study-mark persistence, related/adjacent links, real theme switching/reload persistence and Ukrainian preference persistence.
- Measured: print output from dark mode uses ink on white and hides controls. All 171 Ukrainian detailed lessons and their 1197 full sections render intact in the full print view.

## Remaining moderate patterns

1. `spacing/touch-target` (Measured): the Geist external credit link is about 40 by 44 pixels, slightly narrower than the preferred 44 by 44 target (six theme/width instances).
2. `spacing/off-scale-value` (Measured): inherited large sign-in buttons use 22.4-pixel horizontal padding, between the declared spacing steps (six theme/width instances).

## Coverage limits

- The signed-in profile and real Google/Apple OAuth/account deletion flows were not exercised with a real account. No messages, account changes or destructive account actions were performed for testing.
- Both print routes were checked in the browser, including all Ukrainian detailed content. The other 170 lesson records use the same measured template and have full source/HTML data verification; they did not each receive a separate geometry score.
- `review-ui-code` is not exposed by this Better Design connection, so no result from that tool is claimed.
- The product surface built here is a learning landing page and lesson browser. No analytics dashboard or dashboard fixture was built; no dashboard deployment receipt is claimed.
- Production build passes with a roughly 9.6 kB initial-bundle warning over the existing 500 kB warning threshold. No budgets were raised to hide it.
- Native app identities were rebranded, but native Firebase provisioning, signing and Android/iOS release builds remain required before a native release.
