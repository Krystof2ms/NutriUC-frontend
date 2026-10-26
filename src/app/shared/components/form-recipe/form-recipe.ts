import { Component, computed, effect, input, output, signal } from '@angular/core';
import {
  LucideSave,
  LucideUtensilsCrossed,
  LucidePlus,
  LucideTrash,
  LucideListOrdered,
} from '@lucide/angular';
import {
  UpdateRealSchema,
  type UpdateRecipe,
  dynamicEnum,
  updateRecipeDefaultSchema,
} from '@app/shared/schemas/recipe';
import { form, FormField, FormRoot, validateStandardSchema } from '@angular/forms/signals';
import { RecipeDTO } from '@app/types/api';
import { getChanges } from '@app/shared/utils/recipe.util';

type RecipeForm = UpdateRecipe;

@Component({
  imports: [
    LucideSave,
    LucideUtensilsCrossed,
    LucidePlus,
    LucideTrash,
    LucideListOrdered,
    FormField,
    FormRoot,
  ],
  selector: 'app-form-recipe',
  styleUrl: './form-recipe.css',
  templateUrl: './form-recipe.html',
})
export class FormRecipe {
  readonly categories = input.required<string[]>();
  readonly initState = input<RecipeDTO>();
  readonly recipeSubmit = output<UpdateRealSchema>();

  recipeSchema = computed(() => dynamicEnum(this.categories()));

  readonly model = signal<RecipeForm>({
    name: '',
    origin: '',
    description: '',
    instructions: [''],
    ingredients: [{ name: '', quantity: '' }],
    category: '',
  });

  readonly form = form(this.model, (path) => {
    validateStandardSchema(path, updateRecipeDefaultSchema);
  });

  nameError = computed(() =>
    this.form.name().invalid() && this.form.name().touched()
      ? this.form.name().errors()[0].message
      : undefined,
  );

  originError = computed(() =>
    this.form.origin().invalid() && this.form.origin().touched()
      ? this.form.origin().errors()[0].message
      : undefined,
  );

  descriptionError = computed(() =>
    this.form.description().invalid() && this.form.description().touched()
      ? this.form.description().errors()[0].message
      : undefined,
  );

  categoryError = computed(() =>
    this.form.category().invalid() && this.form.category().touched()
      ? this.form.category().errors()[0].message
      : undefined,
  );

  isSubmitDisabled = computed(() => this.form().invalid() || this.form().submitting());

  constructor() {
    effect(() => {
      const state = this.initState();

      if (state === undefined) return;

      this.model.set({
        name: state.name,
        origin: state.origin,
        category: state.category,
        description: state.description,
        ingredients: state.ingredients,
        instructions: state.instructions.map((i) => i.instruction),
      });
    });
  }

  addInstruction(): void {
    this.model.update((value) => ({
      ...value,
      instructions: [...value.instructions, ''],
    }));
  }

  removeInstruction(index: number): void {
    this.model.update((value) => ({
      ...value,
      instructions: value.instructions.filter((_, i) => i !== index),
    }));
  }

  addIngredient(): void {
    this.model.update((value) => ({
      ...value,
      ingredients: [...value.ingredients, { name: '', quantity: '' }],
    }));
  }

  removeIngredient(index: number): void {
    this.model.update((value) => ({
      ...value,
      ingredients: value.ingredients.filter((_, i) => i !== index),
    }));
  }

  onSubmit(): void {
    const result = this.recipeSchema().safeParse(this.model());

    if (!result.success) {
      return;
    }

    const instructions = (result.data.instructions ?? []).map((v, i) => ({
      step: i + 1,
      instruction: v,
    }));

    const data = { ...result.data, instructions };

    const initState = this.initState();
    if (initState) {
      const changes = getChanges(initState, data);

      if (Object.keys(changes).length === 0) return;
    }

    this.recipeSubmit.emit(data);
  }
}
