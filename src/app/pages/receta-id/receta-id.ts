import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '@app/services/recipe/recipe';
import { ErrorClient } from '@app/shared/components/error-client/error-client';
import { UserIcon } from '@app/shared/components/user-icon/user-icon';
import { LucideArrowLeft, LucideLeaf, LucideMapPin } from '@lucide/angular';
import { filter, map, switchMap } from 'rxjs';

@Component({
  imports: [LucideArrowLeft, LucideLeaf, LucideMapPin, ErrorClient, UserIcon],
  selector: 'app-receta-id',
  templateUrl: './receta-id.html',
})
export class RecetaId {
  private readonly route = inject(ActivatedRoute);
  private recipeService = inject(RecipeService);

  imageError = signal(false);

  readonly recipeState = toSignal(
    this.route.paramMap.pipe(
      map((params) => params.get('id')),
      filter((id): id is string => id !== null),
      switchMap((id) => this.recipeService.getById(id)),
    ),
  );

  onImageError(event: Event) {
    this.imageError.set(true);
  }
}
