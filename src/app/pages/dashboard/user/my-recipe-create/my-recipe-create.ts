import { Component, inject, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '@app/services/category/category';
import { RecipeService } from '@app/services/recipe/recipe';
import { ToastService } from '@app/services/toast/toast';
import { FormRecipe, type RecipeSubmit } from '@app/shared/components/form-recipe/form-recipe';
import { ConfirmDialog } from '@app/shared/components/confirm-dialog/confirm-dialog';
import { LucideArrowLeft } from '@lucide/angular';
import { firstValueFrom } from 'rxjs';

@Component({
  imports: [FormRecipe, ConfirmDialog, LucideArrowLeft],
  selector: 'app-my-recipe-create',
  templateUrl: './my-recipe-create.html',
})
export class MyRecipeCreate {
  private readonly route = inject(ActivatedRoute);
  private router = inject(Router);
  private recipeService = inject(RecipeService);
  private categoryService = inject(CategoryService);
  protected readonly toast = inject(ToastService);
  private readonly leaveDialog = viewChild.required(ConfirmDialog);

  categories = toSignal(this.categoryService.getNames('recipe'), { initialValue: [] });

  async onSubmit(form: RecipeSubmit) {
    try {
      if (!form.recipe) return;
      const resultCreated = await firstValueFrom(this.recipeService.create(form.recipe));

      if (!resultCreated.success) {
        console.error('error create recipe');
        return;
      }

      const id = resultCreated.data.message;

      if (form.image) {
        await firstValueFrom(this.recipeService.updateImage(id, form.image));
      }

      this.router.navigate(['..'], { relativeTo: this.route });
    } catch {}
  }

  onCancel() {
    this.leaveDialog().open();
  }

  confirmLeave() {
    this.leaveDialog().close();
    void this.router.navigate(['..'], { relativeTo: this.route });
  }
}
