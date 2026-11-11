import { Injectable } from '@angular/core';
import { RecipeEvent } from '@app/shared/schemas/events';
import { ToastService } from '@app/services/toast/toast';
import { RecipeEventChannel } from '@app/shared/events';
import { EventListener } from './base';

@Injectable()
export class RecipeEventListener extends EventListener {
  constructor(
    recipeChannel: RecipeEventChannel,
    private readonly toast: ToastService,
  ) {
    super();

    this.listen(recipeChannel, (event) => {
      this.handleRecipeEvent(event);
    });
  }

  private handleRecipeEvent(event: RecipeEvent): void {
    switch (event.event) {
      case 'recipe.image_changed':
        this.toast.success('Imagen actualizada');
        break;

      case 'recipe.image_rejected':
        this.toast.error('imagen rechazada')
        break;

      default:
        this.handleUnknown(event);
    }
  }

  private handleUnknown(_event: RecipeEvent): void {}
}
