import { inject, Service } from '@angular/core';
import {
  RecipeEventChannel,
  UnknownEventChannel,
  UserEventChannel,
  EventParser,
  RecipeEvent,
  UserEvent,
} from '@app/shared/events';
import { KnownEvent } from '@app/shared/schemas/events';

@Service()
export class EventManager {
  private readonly userChannel = inject(UserEventChannel);
  private readonly recipeChannel = inject(RecipeEventChannel);
  private readonly unknownChannel = inject(UnknownEventChannel);

  dispatch(message: MessageEvent): void {
    const result = EventParser.fromMessage(message);

    switch (result.status) {
      case 'valid':
        this.routeKnownEvent(result.event);
        break;

      case 'unknown':
        this.unknownChannel.dispatch(result.event);
        break;

      case 'invalid':
        console.error('invalid event');
        break;
    }
  }

  private routeKnownEvent(event: KnownEvent): void {
    switch (true) {
      case event.event.startsWith('user.'):
        this.userChannel.dispatch(event as UserEvent);
        break;

      case event.event.startsWith('recipe.'):
        this.recipeChannel.dispatch(event as RecipeEvent);
        break;
    }
  }
}
