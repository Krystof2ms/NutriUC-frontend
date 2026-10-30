import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoryService } from '@app/services/category/category';
import { RecipeService } from '@app/services/recipe/recipe';
import { ErrorClient } from '@app/shared/components/error-client/error-client';
import { FormRecipe, type RecipeSubmit } from '@app/shared/components/form-recipe/form-recipe';
import { getChanges } from '@app/shared/utils/recipe.util';
import { LucideArrowLeft } from '@lucide/angular';
import { filter, firstValueFrom, map, switchMap } from 'rxjs';

@Component({
  imports: [RouterLink, FormRecipe, LucideArrowLeft, ErrorClient],
  selector: 'app-my-recipe-edit',
  templateUrl: './my-recipe-edit.html',
})
export class MyRecipeEdit {
  private readonly route = inject(ActivatedRoute);
  private router = inject(Router);
  private recipeService = inject(RecipeService);
  private categoryService = inject(CategoryService);

  categories = toSignal(this.categoryService.getNames('recipe'), { initialValue: [] });

  readonly recipe = toSignal(
    this.route.paramMap.pipe(
      map((params) => params.get('id')),
      filter((id): id is string => id !== null),
      switchMap((id) => this.recipeService.getById(id)),
    ),
  );

  async onSubmit(form: RecipeSubmit) {
    const recipe = this.recipe();
    if (!recipe?.success) return;
    const id = recipe.data.id;

    try {
      const tasks = [];

      const original = this.recipe();
      if (original && original.success && form.recipe) {
        const changes = getChanges(original.data, form.recipe);
        if (Object.keys(changes).length > 0) {
          tasks.push(firstValueFrom(this.recipeService.updateRecipe(id, changes)));
        }
      }

      const imageBlob = form.image;

      if (imageBlob !== undefined) {
        tasks.push(
          firstValueFrom(
            imageBlob
              ? this.recipeService.updateImage(id, imageBlob)
              : this.recipeService.deleteImage(id),
          ),
        );
      }

      if (tasks.length > 0) {
        const results = await Promise.allSettled(tasks);

        console.log(results);
        this.router.navigate(['..'], { relativeTo: this.route });
      }
    } catch {}
  }
}
