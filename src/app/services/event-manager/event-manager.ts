import { inject, Service } from '@angular/core';
import {
  RecipeEventChannel,
  UnknownEventChannel,
  UserEventChannel,
  ServerEventChannel,
  EventParser,
} from '@app/shared/events';
import {
  KnownEvent,
  RecipeEvent,
  UserEvent,
  ServerEvent as ServerWS,
} from '@app/shared/schemas/events';
import { ServerEvent } from '@app/types/api';

@Service()
export class EventManager {
  private readonly userChannel = inject(UserEventChannel);
  private readonly recipeChannel = inject(RecipeEventChannel);
  private readonly unknownChannel = inject(UnknownEventChannel);
  private readonly serverChannel = inject(ServerEventChannel);

  dispatch(message: ServerEvent): void {
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
    if (event.event.startsWith('user.')) {
      this.userChannel.dispatch(event as UserEvent);
    } else if (event.event.startsWith('recipe.')) {
      this.recipeChannel.dispatch(event as RecipeEvent);
    } else if (event.event.startsWith('server.')) {
      this.serverChannel.dispatch(event as ServerWS);
    }
  }
}
