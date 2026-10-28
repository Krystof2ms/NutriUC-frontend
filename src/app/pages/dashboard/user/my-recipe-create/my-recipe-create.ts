import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoryService } from '@app/services/category/category';
import { RecipeService } from '@app/services/recipe/recipe';
import { FormRecipe, type RecipeSubmit } from '@app/shared/components/form-recipe/form-recipe';
import { LucideArrowLeft } from '@lucide/angular';
import { firstValueFrom } from 'rxjs';

@Component({
  imports: [FormRecipe, LucideArrowLeft, RouterLink],
  selector: 'app-my-recipe-create',
  styleUrl: './my-recipe-create.css',
  templateUrl: './my-recipe-create.html',
})
export class MyRecipeCreate {
  private readonly route = inject(ActivatedRoute);
  private router = inject(Router);
  private recipeService = inject(RecipeService);
  private categoryService = inject(CategoryService);

  categories = toSignal(this.categoryService.getNames('recipe'), { initialValue: [] });

  async onSubmit(form: RecipeSubmit) {
    console.log(form);

    try {
      if (!form.recipe) return;
      const resultCreated = await firstValueFrom(this.recipeService.create(form.recipe));

      if (!resultCreated.success) {
        console.error('error create recipe');
        return;
      }

      const id = resultCreated.data.message;

      if (!form.image) {
        console.error('error create recipe image');
        return;
      }

      const result = await firstValueFrom(this.recipeService.updateImage(id, form.image));

      console.log('create image:', result.success);
      this.router.navigate(['..'], { relativeTo: this.route });
    } catch {}
  }
}
