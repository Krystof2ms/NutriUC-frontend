import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CategoryService } from '@app/services/category/category';
import { RecipeService } from '@app/services/recipe/recipe';
import { FormRecipe } from '@app/shared/components/form-recipe/form-recipe';

@Component({
  imports: [FormRecipe],
  selector: 'app-my-recipe-edit',
  styleUrl: './my-recipe-edit.css',
  templateUrl: './my-recipe-edit.html',
})
export class MyRecipeEdit {
  private recipeService = inject(RecipeService);
  private categoryService = inject(CategoryService);

  categories = toSignal(this.categoryService.getNames('recipe'), { initialValue: [] });

}
