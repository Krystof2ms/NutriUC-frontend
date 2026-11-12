import { SearchBar } from '@app/shared/components/search-bar/search-bar';
import { Component, computed, inject, signal } from '@angular/core';
import { TipService } from '@app/services/tip/tip';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { TipCardSkeleton } from '@app/shared/components/tip-card-skeleton/tip-card-skeleton';
import { TipCard } from '@app/shared/components/tip-card/tip-card';
import { NavigationButtons } from '@app/shared/components/navigation-buttons/navigation-buttons';
import { CursorDirection } from '@api/index';
import { toast } from 'ngx-sonner';

@Component({
  imports: [
    SearchBar, 
    TipCardSkeleton, 
    TipCard, 
    NavigationButtons, 
    RouterLink
  ],
  selector: 'app-my-tips',
  templateUrl: './my-tips.html',
})
export class MyTips {
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

  private refreshTrigger = signal(0);

  readonly tips = toSignal(
    toObservable(computed(() => ({ ...this.searchParams(), refresh: this.refreshTrigger() }))).pipe(
      switchMap(({ search, category, cursor, direction }) =>
        this.tipService.search(search, category, cursor, direction, 12, true),
      ),
    ),
  );

  deleteTip(id: number) {
    if (!confirm('¿Estás seguro de que deseas eliminar este tip?')) return;

    this.tipService.delete(id).subscribe((res) => {
      if (res.success) {
        toast.success('Tip eliminado con éxito');
        this.refreshTrigger.update(v => v + 1);
      } else {
        toast.error('Error al eliminar el tip');
      }
    });
  }
}