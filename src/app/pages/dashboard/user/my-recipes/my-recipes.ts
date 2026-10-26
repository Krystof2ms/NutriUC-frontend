import { Component, computed, effect, inject } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '@app/services/recipe/recipe';
import { NavigationButtons } from '@app/shared/components/navigation-buttons/navigation-buttons';
import { RecipeCard } from '@app/shared/components/recipe-card/recipe-card';
import { SearchBar } from '@app/shared/components/search-bar/search-bar';
import { CursorDirection } from '@app/types/api';
import { LucideUtensilsCrossed } from '@lucide/angular';
import { switchMap } from 'rxjs';

@Component({
  imports: [SearchBar, RecipeCard, NavigationButtons, LucideUtensilsCrossed],
  selector: 'app-my-recipes',
  styleUrl: './my-recipes.css',
  templateUrl: './my-recipes.html',
})
export class MyRecipes {
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
        this.recipeService.search(search, category, cursor, direction, 12, true),
      ),
    ),
    {
      initialValue: {
        success: true,
        data: {
          data: [],
          next_cursor: null,
          previous_cursor: null,
        },
      },
    },
  );

  constructor() {
    effect(() => {
      console.log('result:', this.recipes());
    });
  }
}
