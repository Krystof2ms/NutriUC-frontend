import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
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
import { ImageCropper } from '../image-cropper/image-cropper';
import { API_URL } from '@app/config/api.config';

export interface RecipeSubmit {
  recipe?: UpdateRealSchema;
  image?: Blob | null;
}

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
    ImageCropper,
  ],
  selector: 'app-form-recipe',
  styleUrl: './form-recipe.css',
  templateUrl: './form-recipe.html',
})
export class FormRecipe {
  private readonly apiUrl = inject(API_URL);
  readonly categories = input.required<string[]>();
  readonly initState = input<RecipeDTO>();
  readonly recipeSubmit = output<RecipeSubmit>();

  private readonly fileInput = viewChild.required<ElementRef<HTMLInputElement>>('fileInput');
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
  }, {
    submission: {
      action: async (_) => this.onSubmit()
    }
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

  imageBlob = signal<Blob | null>(null);

  imageResult = signal<string | null>(null);

  imageUrl = signal<string | null>(null);

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    this.imageUrl.set(URL.createObjectURL(file));
  }

  onCropped(blob: Blob): void {
    this.imageBlob.set(blob);
    this.imageUrl.set(null);

    this.imageResult.set(URL.createObjectURL(blob));
  }

  onCropCancel() {
    this.imageUrl.set(null);

    if (!this.imageBlob()) {
      this.fileInput().nativeElement.value = '';
    }
  }

  onImageDelete() {
    this.imageBlob.set(null);
    this.imageUrl.set(null);
    this.imageResult.set(null);
  }

  constructor() {
    effect(() => {
      const state = this.initState();

      if (!state) return;

      this.imageResult.set(
        state.has_image ? `${this.apiUrl}/recipes/recipe/${state.id}/img` : null,
      );

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

  onSubmitData() {
    this.onImageSubmit();

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

    return data;
  }

  onImageSubmit() {
    const imageUrl = this.imageResult();
    if (!this.initState()?.has_image && !imageUrl) return;
    if (imageUrl === `${this.apiUrl}/recipes/recipe/${this.initState()?.id}/img`) return;

    const blob = this.imageBlob();

    if (blob) {
      return blob;
    } else {
      return null;
    }
  }

  onSubmit() {
    const recipe = this.onSubmitData();
    const image = this.onImageSubmit();

    this.recipeSubmit.emit({
      recipe,
      image,
    });
  }
}
