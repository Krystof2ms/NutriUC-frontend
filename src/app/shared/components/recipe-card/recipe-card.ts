import { Component, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { API_URL } from '@app/config/api.config';

@Component({
  imports: [RouterLink],
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.html',
})
export class RecipeCard {
  readonly apiUrl = inject(API_URL);

  id = input.required<number>();
  name = input.required<string>();
  category = input.required<string>();
  origin = input.required<string>();
  ingredients_count = input.required<number>();
  has_image = input(false);
  href = input('/recetas');

  image = '';
  alt = '';

  constructor() {
    effect(() => {
      const image = this.has_image()
        ? `${this.apiUrl}/recipes/recipe/${this.id()}/img`
        : '/recipe-placeholder.webp';
      const alt = this.has_image() ? this.name() : 'Image placeholder';

      this.image = image;
      this.alt = alt;
    });
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;

    img.onerror = null;
    img.src = '/recipe-placeholder.webp';
    img.alt = 'Image placeholder';
  }
}
