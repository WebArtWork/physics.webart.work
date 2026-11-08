import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TPipe } from '../../feature/i18n/t.pipe';
import { I18nService } from '../../feature/i18n/i18n.service';
import { THEORY_GROUPS, THEORY_INDEX } from '../../feature/theory/theory.catalog';
import { langOf } from '../../feature/theory/theory.util';
import sampleData from '../../../data/theory/sample.json';

@Component({ imports: [RouterLink, TPipe], templateUrl: './dashboard.component.html' })
export class DashboardComponent {
	protected readonly sample = sampleData;
	protected readonly groups = THEORY_GROUPS;
	protected readonly total = THEORY_INDEX.length;
	private readonly i18n = inject(I18nService);
	protected readonly lang = computed(() => langOf(this.i18n.language()));
	protected firstIn(group: { from: number }) {
		return THEORY_INDEX.find((item) => item.n === group.from)!.slug;
	}
}
