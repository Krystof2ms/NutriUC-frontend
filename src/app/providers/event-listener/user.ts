import { Injectable } from '@angular/core';
import { UserEvent } from '@app/shared/schemas/events';
import { ToastService } from '@app/services/toast/toast';
import { UserEventChannel } from '@app/shared/events';
import { EventListener } from './base';

@Injectable()
export class UserEventListener extends EventListener {
  constructor(
    userChannel: UserEventChannel,
    private readonly toast: ToastService,
  ) {
    super();

    this.listen(userChannel, (event) => {
      this.handleRecipeEvent(event);
    });
  }

  private handleRecipeEvent(event: UserEvent): void {
    switch (event.event) {
      case 'user.image_changed':
        this.toast.success('Avatar actualizado');
        break;

      case 'user.image_rejected':
        this.toast.error('Avatar rechazado')
        break;

      default:
        this.handleUnknown(event);
    }
  }

  private handleUnknown(_event: UserEvent): void {}
}
