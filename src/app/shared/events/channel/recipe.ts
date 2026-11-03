import { Service } from '@angular/core';
import { EventChannel } from './base';
import type { RecipeEvent } from '@app/shared/schemas/events';

@Service()
export class RecipeEventChannel extends EventChannel<RecipeEvent> {}
