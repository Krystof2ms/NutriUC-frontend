import { RecipeDTO, RecipeUpdate } from '@app/types/api';
import { UpdateRealSchema } from '../schemas/recipe';

export function getChanges(original: RecipeDTO, current: UpdateRealSchema): RecipeUpdate {
  const changes: RecipeUpdate = {};

  if (original.name !== current.name) {
    changes.name = current.name;
  }

  if (original.origin !== current.origin) {
    changes.origin = current.origin;
  }

  if (original.category !== current.category) {
    changes.category = current.category;
  }

  if (original.description !== current.description) {
    changes.description = current.description;
  }

  if (JSON.stringify(original.ingredients) !== JSON.stringify(current.ingredients)) {
    changes.ingredients = current.ingredients;
  }

  if (JSON.stringify(original.instructions) !== JSON.stringify(current.instructions)) {
    changes.instructions = current.instructions;
  }

  return changes;
}
