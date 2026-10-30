import { Service } from '@angular/core';
import { EventChannel } from './base';
import { UnknownEvent } from '@app/shared/events/parser';

@Service()
export class UnknownEventChannel extends EventChannel<UnknownEvent> {}
