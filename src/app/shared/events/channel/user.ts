import { Service } from '@angular/core';
import { EventChannel } from './base';
import type { UserEvent } from '@app/shared/schemas/events';

@Service()
export class UserEventChannel extends EventChannel<UserEvent> {}
