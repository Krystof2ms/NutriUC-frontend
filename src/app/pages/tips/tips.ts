import { SearchBar } from '@app/shared/components/search-bar/search-bar';
import { Component, computed, inject } from '@angular/core';
import { TipService } from '@app/services/tip/tip';
import { ActivatedRoute } from '@angular/router';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { TipCardSkeleton } from '@app/shared/components/tip-card-skeleton/tip-card-skeleton';
import { TipCard } from '@app/shared/components/tip-card/tip-card';
import { NavigationButtons } from '@app/shared/components/navigation-buttons/navigation-buttons';
import { CursorDirection } from '@api/index';

@Component({
  imports: [SearchBar, TipCardSkeleton, TipCard, NavigationButtons],
  selector: 'app-tips',
  templateUrl: './tips.html',
})
export class Tips {
  private readonly route = inject(ActivatedRoute);
  private tipService = inject(TipService);

  readonly queryParams = toSignal(this.route.queryParamMap, {
    initialValue: this.route.snapshot.queryParamMap,
  });

  readonly searchParams = computed(() => ({
    search: this.queryParams().get('search') ?? undefined,
    category: this.queryParams().get('category') ?? undefined,
    cursor: this.queryParams().get('cursor') ? Number(this.queryParams().get('cursor')) : undefined,
    direction: (this.queryParams().get('dir') == 'previous'
      ? 'previous'
      : 'next') as CursorDirection,
  }));

  readonly tips = toSignal(
    toObservable(this.searchParams).pipe(
      switchMap(({ search, category, cursor, direction }) =>
        this.tipService.search(search, category, cursor, direction, 12, false),
      ),
    ),
  );
}