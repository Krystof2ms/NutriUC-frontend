import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { API_URL } from '@app/config/api.config';
import { RecipeService } from '@app/services/recipe/recipe';
import { ToastService } from '@app/services/toast/toast';
import { ErrorClient } from '@app/shared/components/error-client/error-client';
import { ConfirmDialog } from '@app/shared/components/confirm-dialog/confirm-dialog';
import { UserIcon } from '@app/shared/components/user-icon/user-icon';
import { ErrorResponseMap, RecipeDTO, RecipeGetByIdResponses } from '@app/types/api';
import { ApiError, ApiResult } from '@app/types/http';
import {
  LucideArrowLeft,
  LucideLeaf,
  LucideMapPin,
  LucidePencil,
  LucideTrash,
} from '@lucide/angular';
import { map, of, switchMap } from 'rxjs';

type GetErrors = ApiError<ErrorResponseMap<RecipeGetByIdResponses>>;

@Component({
  imports: [
    RouterLink,
    ErrorClient,
    ConfirmDialog,
    UserIcon,
    LucideArrowLeft,
    LucideLeaf,
    LucideMapPin,
    LucidePencil,
    LucideTrash,
  ],
  selector: 'app-my-recipe',
  templateUrl: './my-recipe.html',
})
export class MyRecipe {
  readonly apiUrl = inject(API_URL);
  private readonly route = inject(ActivatedRoute);
  private router = inject(Router);
  private readonly recipeService = inject(RecipeService);
  protected readonly toast = inject(ToastService);

  imageError = signal(false);
  deleting = signal(false);

  response = toSignal(
    this.route.paramMap.pipe(
      map((params) => params.get('id')),
      switchMap((id) =>
        id == null
          ? of<ApiResult<RecipeDTO | null, GetErrors>>({
              success: false,
              error: {
                code: 422,
                body: { code: 'invalid params', message: 'Id invalido', errors: [] },
              },
            })
          : this.recipeService.getById(id),
      ),
    ),
    { initialValue: undefined },
  );

  onImageError() {
    this.imageError.set(true);
  }

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDelete() {
    const response = this.response();

    if (!response?.success || !response.data || this.deleting()) return;

    this.deleting.set(true);
    this.recipeService.delete(response.data.id).subscribe({
      next: (result) => {
        this.deleting.set(false);
        if (result.success) {
          this.toast.success('Receta eliminada con éxito');
          void this.router.navigate(['..'], { relativeTo: this.route });
        } else {
          this.toast.error('No se pudo eliminar la receta');
        }
      },
      error: () => {
        this.deleting.set(false);
        this.toast.error('Ocurrió un error al eliminar la receta');
      },
    });
  }

  get errorReturnRoute() {
    return this.route.parent;
  }
}
