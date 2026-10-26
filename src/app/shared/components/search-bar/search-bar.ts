import { Component, computed, inject, input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { LucideFunnel, LucideSearch } from '@lucide/angular';
import { CategoryType } from '@api/index';
import { CategoryService } from '@app/services/category/category';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';

@Component({
  imports: [LucideFunnel, LucideSearch],
  selector: 'app-search-bar',
  templateUrl: './search-bar.html',
})
export class SearchBar {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  private readonly categoryService = inject(CategoryService);

  readonly categories_type = input.required<CategoryType>();

  private searchSubject = new Subject<string | null>();

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
    this.searchSubject.pipe(debounceTime(400), distinctUntilChanged()).subscribe((search) => {
      this.setSearch(search);
    });
  }

  debounceSearch(search: string | null) {
    const result = search?.trim() || null;

    this.searchSubject.next(result);
  }

  setSearch(search: string | null) {
    const result = search?.length ? search : null;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        search: result,
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
        category: category,
        cursor: null,
        dir: null,
      },
      queryParamsHandling: 'merge',
    });
  }

  setFilters(search: string | null, category: string | null) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        search: search || null,
        category: category || null,
      },
      queryParamsHandling: 'merge',
    });
  }

  clearFilters() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        search: null,
        category: null,
      },
      queryParamsHandling: 'merge',
    });
  }

  onEnter() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        search: this.currentSearch(),
        category: this.currentCategory(),
      },
      queryParamsHandling: 'merge',
    });
  }
}
