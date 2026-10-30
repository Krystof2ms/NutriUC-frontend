import { Service } from '@angular/core';
import { EventChannel } from './base';
import { RecipeEvent } from './types';

@Service()
export class RecipeEventChannel extends EventChannel<RecipeEvent> {}
