import { z } from 'zod';
import { UserAvatarChangedSchema, UserAvatarRejectedSchema } from './user';
import { RecipeImageChangedSchema, RecipeImageRejectedSchema } from './recipe';
import {
  serverConnectedSchema,
  serverDisconnectSchema,
  serverErrorSchema,
  serverHeartbeatSchema,
} from './server';

export const KnownEventSchema = z.discriminatedUnion('event', [
  UserAvatarChangedSchema,
  UserAvatarRejectedSchema,
  RecipeImageChangedSchema,
  RecipeImageRejectedSchema,
  serverConnectedSchema,
  serverDisconnectSchema,
  serverErrorSchema,
  serverHeartbeatSchema,
]);

export type KnownEvent = z.infer<typeof KnownEventSchema>;
export type EventByPrefix<Prefix extends string> = Extract<
  KnownEvent,
  { event: `${Prefix}.${string}` }
>;

export type UserEvent = EventByPrefix<'user'>;
export type RecipeEvent = EventByPrefix<'recipe'>;
export type ServerEvent = EventByPrefix<'server'>;
