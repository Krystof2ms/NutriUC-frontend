import { Service } from '@angular/core';
import { EventChannel } from './base';
import { UserEvent } from './types';

@Service()
export class UserEventChannel extends EventChannel<UserEvent> {}
