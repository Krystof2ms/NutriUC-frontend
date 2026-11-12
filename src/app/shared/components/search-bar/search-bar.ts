import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { LucideFunnel, LucideSearch } from '@lucide/angular';
import { CategoryType } from '@api/index';
import { CategoryService } from '@app/services/category/category';
import { debounceTime, distinctUntilChanged, map, skip, switchMap } from 'rxjs';
import { form, FormField, FormRoot } from '@angular/forms/signals';

type Form = {
  search: string;
  category: string;
};

@Component({
  imports: [LucideFunnel, LucideSearch, FormField, FormRoot],
  selector: 'app-search-bar',
  templateUrl: './search-bar.html',
})
export class SearchBar {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly categoryService = inject(CategoryService);

  readonly categories_type = input.required<CategoryType>();

  private readonly filters = signal<Form>({
    search: this.route.snapshot.queryParamMap.get('search') ?? '',
    category: this.route.snapshot.queryParamMap.get('category') ?? '',
  });

  readonly searchForm = form(this.filters);

  readonly categories = toSignal(
    toObservable(this.categories_type).pipe(
      switchMap((type) => this.categoryService.getNames(type)),
    ),
    { initialValue: [] },
  );

  readonly queryParams = toSignal(this.route.queryParamMap, {
    initialValue: this.route.snapshot.queryParamMap,
  });

  readonly currentSearch = computed(() => this.queryParams().get('search') ?? '');

  readonly currentCategory = computed(() => {
    const category = this.queryParams().get('category');

    if (!category) return null;

    return this.categories().find((c) => c === category) ?? null;
  });

  constructor() {
    effect(() => {
      const params = this.queryParams();

      this.filters.set({
        search: params.get('search') ?? '',
        category: params.get('category') ?? '',
      });
    });

    // Debounce de búsqueda
    const searchValue = computed(() => this.filters().search);

    toObservable(searchValue)
      .pipe(
        map((search) => search.trim() || null),
        debounceTime(400),
        distinctUntilChanged(),
        skip(1),
      )
      .subscribe((search) => this.setSearch(search));
  }

  setSearch(search: string | null) {
    const parseSearch = search?.trim() || '';

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        search: parseSearch.length ? parseSearch : null,
        cursor: null,
        dir: null,
      },
      queryParamsHandling: 'merge',
    });
  }

  setCategory(category: string | null) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        category,
        cursor: null,
        dir: null,
      },
      queryParamsHandling: 'merge',
    });
  }

  setFilters(search: string | null, category: string | null) {
    const parseSearch = search?.trim() || '';
    const parseCategory = category ?? '';

    this.filters.set({
      search: parseSearch,
      category: parseCategory,
    });

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        search: parseSearch.length ? parseSearch : null,
        category: parseCategory.length ? parseCategory : null,
        cursor: null,
        dir: null,
      },
      queryParamsHandling: 'merge',
    });
  }

  clearFilters() {
    this.filters.set({
      search: '',
      category: '',
    });

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        search: null,
        category: null,
        cursor: null,
        dir: null,
      },
      queryParamsHandling: 'merge',
    });
  }

  onEnter() {
    const { search, category } = this.filters();

    this.setFilters(search, category);
  }
}
