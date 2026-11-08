import { Component, computed, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ICONS, IconName } from './icon.data';

/** Decorative Iconoir icons, sourced from trusted static SVG constants in both modes. */
@Component({
	selector: 'app-icon',
	template: ` <span class="icon-iconoir" [innerHTML]="iconoir()" aria-hidden="true"></span> `,
	styles: `
		:host {
			display: inline-flex;
			width: 1.25rem;
			height: 1.25rem;
			font-size: 1.25rem;
			line-height: 1;
			flex: none;
		}
		span {
			display: inline-flex;
		}
	`,
})
export class IconComponent {
	private readonly _sanitizer = inject(DomSanitizer);

	readonly name = input.required<IconName>();
	protected readonly iconoir = computed(() =>
		this._sanitizer.bypassSecurityTrustHtml(ICONS[this.name()].iconoir),
	);
}
