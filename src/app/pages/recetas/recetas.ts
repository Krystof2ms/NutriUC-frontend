import { SearchBar } from '@app/shared/components/search-bar/search-bar';
import { Component, computed, inject } from '@angular/core';
import { RecipeService } from '@app/services/recipe/recipe';
import { ActivatedRoute } from '@angular/router';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { RecipeCardSkeleton } from '@app/shared/components/recipe-card-skeleton/recipe-card-skeleton';
import { RecipeCard } from '@app/shared/components/recipe-card/recipe-card';
import { NavigationButtons } from '@app/shared/components/navigation-buttons/navigation-buttons';
import { CursorDirection } from '@api/index';

@Component({
  imports: [SearchBar, RecipeCardSkeleton, RecipeCard, NavigationButtons],
  selector: 'app-recetas',
  templateUrl: './recetas.html',
})
export class Recetas {
  private readonly route = inject(ActivatedRoute);
  private recipeService = inject(RecipeService);

  readonly queryParams = toSignal(this.route.queryParamMap, {
    initialValue: this.route.snapshot.queryParamMap,
  });

  readonly searchParams = computed(() => ({
    search: this.queryParams().get('search') ?? undefined,
    category: this.queryParams().get('category') ?? undefined,
    cursor: Number(this.queryParams().get('cursor')) ?? undefined,
    direction: (this.queryParams().get('dir') == 'previous'
      ? 'previous'
      : 'next') as CursorDirection,
  }));

  readonly recipes = toSignal(
    toObservable(this.searchParams).pipe(
      switchMap(({ search, category, cursor, direction }) =>
        this.recipeService.search(search, category, cursor, direction, 12),
      ),
    ),
  );
}
