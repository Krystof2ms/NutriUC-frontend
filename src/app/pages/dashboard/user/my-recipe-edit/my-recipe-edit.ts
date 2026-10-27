import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '@app/services/category/category';
import { RecipeService } from '@app/services/recipe/recipe';
import { ErrorClient } from '@app/shared/components/error-client/error-client';
import { FormRecipe } from '@app/shared/components/form-recipe/form-recipe';
import { UpdateRealSchema } from '@app/shared/schemas/recipe';
import { getChanges } from '@app/shared/utils/recipe.util';
import { filter, firstValueFrom, map, switchMap } from 'rxjs';
import { boolean } from 'zod';

@Component({
  imports: [FormRecipe, ErrorClient],
  selector: 'app-my-recipe-edit',
  styleUrl: './my-recipe-edit.css',
  templateUrl: './my-recipe-edit.html',
})
export class MyRecipeEdit {
  private readonly route = inject(ActivatedRoute);
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

  async onSubmit(form: UpdateRealSchema) {
    const original = this.recipe();
    if (original && original.success) {
      const changes = getChanges(original.data, form);
      console.log(changes);
    }

    const recipe = this.recipe();
    if (!recipe?.success) return;

    const result = await firstValueFrom(this.recipeService.updateRecipe(recipe.data.id, form));

    if (result.success) console.log('datos actualizados');
  }

  async onSubmitImage(blob: Blob | null) {
    console.log('update image:', blob);

    const recipe = this.recipe();
    if (!recipe?.success) return;
    const id = recipe.data.id;

    const result = await firstValueFrom(
      blob ? this.recipeService.updateImage(id, blob) : this.recipeService.deleteImage(id),
    );

    if (result.success) console.log('datos actualizados');
  }
}
