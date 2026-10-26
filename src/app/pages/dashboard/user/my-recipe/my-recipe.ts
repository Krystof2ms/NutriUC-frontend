import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RecipeService } from '@app/services/recipe/recipe';
import { ErrorClient } from '@app/shared/components/error-client/error-client';
import { UserIcon } from '@app/shared/components/user-icon/user-icon';
import { ErrorResponseMap, RecipeDTO, RecipeGetByIdResponses } from '@app/types/api';
import { ApiError, ApiResult } from '@app/types/http';
import { LucideArrowLeft, LucideLeaf, LucideMapPin, LucidePencil } from '@lucide/angular';
import { map, of, switchMap } from 'rxjs';

type GetErrors = ApiError<ErrorResponseMap<RecipeGetByIdResponses>>;

@Component({
  imports: [
    RouterLink,
    ErrorClient,
    UserIcon,
    LucideArrowLeft,
    LucideLeaf,
    LucideMapPin,
    LucidePencil,
  ],
  selector: 'app-my-recipe',
  templateUrl: './my-recipe.html',
})
export class MyRecipe {
  private readonly route = inject(ActivatedRoute);
  private router = inject(Router);
  private readonly recipeService = inject(RecipeService);

  imageError = signal(false);

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
}
