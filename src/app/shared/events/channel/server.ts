import { Service } from '@angular/core';
import { EventChannel } from './base';
import type { ServerEvent } from '@app/shared/schemas/events'; 

@Service()
export class ServerEventChannel extends EventChannel<ServerEvent> {}
