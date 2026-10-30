import { z } from 'zod';

import {
  UserAvatarChangedSchema,
  UserAvatarRejectedSchema,
} from './user';

import {
  RecipeImageChangedSchema,
  RecipeImageRejectedSchema,
} from './recipe';

export const KnownEventSchema = z.discriminatedUnion('event', [
  UserAvatarChangedSchema,
  UserAvatarRejectedSchema,
  RecipeImageChangedSchema,
  RecipeImageRejectedSchema,
]);

export type KnownEvent = z.infer<typeof KnownEventSchema>;